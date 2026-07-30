import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface AnalyticsEvent {
  id: string;
  event_type: "whatsapp_order_click" | "product_view" | "category_filter";
  perfume_name: string;
  category: string;
  timestamp: string;
  device?: string;
}

const LOCAL_ANALYTICS_KEY = "ra_fragrance_analytics_v1";

// Initial seed analytics data to render rich graphs out-of-the-box
const initialSeedEvents: AnalyticsEvent[] = [
  { id: "1", event_type: "whatsapp_order_click", perfume_name: "Prime Scent", category: "Unisex", timestamp: new Date(Date.now() - 6 * 86400000).toISOString() },
  { id: "2", event_type: "whatsapp_order_click", perfume_name: "Prime Scent", category: "Unisex", timestamp: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "3", event_type: "whatsapp_order_click", perfume_name: "Everwake", category: "Unisex", timestamp: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "4", event_type: "whatsapp_order_click", perfume_name: "Play Boyz", category: "For Him", timestamp: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: "5", event_type: "whatsapp_order_click", perfume_name: "Prime Scent", category: "Unisex", timestamp: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: "6", event_type: "whatsapp_order_click", perfume_name: "Twinkle Queen", category: "For Her", timestamp: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: "7", event_type: "whatsapp_order_click", perfume_name: "Everwake", category: "Unisex", timestamp: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: "8", event_type: "whatsapp_order_click", perfume_name: "Elegant", category: "For Him", timestamp: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "9", event_type: "whatsapp_order_click", perfume_name: "Glowing Girl", category: "For Her", timestamp: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "10", event_type: "whatsapp_order_click", perfume_name: "Prime Scent", category: "Unisex", timestamp: new Date(Date.now() - 1 * 86400000).toISOString() },
  { id: "11", event_type: "whatsapp_order_click", perfume_name: "Sports Mania", category: "For Him", timestamp: new Date(Date.now() - 1 * 86400000).toISOString() },
  { id: "12", event_type: "whatsapp_order_click", perfume_name: "Everwake", category: "Unisex", timestamp: new Date().toISOString() },
  { id: "13", event_type: "whatsapp_order_click", perfume_name: "Prime Scent", category: "Unisex", timestamp: new Date().toISOString() },
];

export const trackEvent = async (
  event_type: "whatsapp_order_click" | "product_view" | "category_filter",
  perfume_name: string,
  category: string
) => {
  const isMobile = window.innerWidth < 768;
  const newEvent: AnalyticsEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    event_type,
    perfume_name,
    category,
    timestamp: new Date().toISOString(),
    device: isMobile ? "Mobile" : "Desktop",
  };

  // Log to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("analytics_events").insert([
        {
          event_type,
          perfume_name,
          category,
          device: newEvent.device,
        },
      ]);
    } catch (err) {
      console.warn("Supabase analytics logging error:", err);
    }
  }

  // Always sync to local storage fallback
  try {
    const existing = getStoredEvents();
    const updated = [newEvent, ...existing];
    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Local analytics save error:", e);
  }
};

export const getStoredEvents = (): AnalyticsEvent[] => {
  const saved = localStorage.getItem(LOCAL_ANALYTICS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse analytics storage:", e);
    }
  }
  return initialSeedEvents;
};

export const getAnalyticsSummary = (events: AnalyticsEvent[]) => {
  const whatsappClicks = events.filter((e) => e.event_type === "whatsapp_order_click");

  // Rank Perfumes by WhatsApp Order Clicks
  const perfumeCounts: Record<string, number> = {};
  whatsappClicks.forEach((e) => {
    perfumeCounts[e.perfume_name] = (perfumeCounts[e.perfume_name] || 0) + 1;
  });

  const perfumeRankings = Object.entries(perfumeCounts)
    .map(([name, count]) => ({ name, clicks: count }))
    .sort((a, b) => b.clicks - a.clicks);

  // Category Split
  const categoryCounts: Record<string, number> = { Unisex: 0, "For Him": 0, "For Her": 0 };
  whatsappClicks.forEach((e) => {
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
  });

  const categoryBreakdown = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Daily Trend (Last 7 Days)
  const daysMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayKey = d.toLocaleDateString("en-US", { weekday: "short" });
    daysMap[dayKey] = 0;
  }

  whatsappClicks.forEach((e) => {
    const d = new Date(e.timestamp);
    const dayKey = d.toLocaleDateString("en-US", { weekday: "short" });
    if (daysMap[dayKey] !== undefined) {
      daysMap[dayKey] += 1;
    }
  });

  const dailyTrend = Object.entries(daysMap).map(([day, clicks]) => ({
    day,
    orders: clicks,
  }));

  return {
    totalWhatsAppClicks: whatsappClicks.length,
    topPerfume: perfumeRankings[0]?.name || "Prime Scent",
    topPerfumeClicks: perfumeRankings[0]?.clicks || 0,
    perfumeRankings,
    categoryBreakdown,
    dailyTrend,
  };
};
