import { useState, useEffect } from "react";
import { Perfume, PerfumeInput } from "@/types/perfume";
import { initialPerfumes } from "@/lib/initialPerfumes";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const LOCAL_STORAGE_KEY = "ra_fragrance_perfumes_v1";

export const usePerfumes = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved perfumes:", e);
      }
    }
    return initialPerfumes;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch perfumes on mount
  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      setError(null);

      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error: sbError } = await supabase
            .from("perfumes")
            .select("*")
            .order("created_at", { ascending: false });

          if (sbError) {
            console.error("Supabase fetch error:", sbError);
            setError(sbError.message);
          } else if (data && data.length > 0) {
            // Map Supabase columns to Perfume model
            const mapped: Perfume[] = data.map((item) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              tagline: item.tagline || "",
              notes: {
                top: item.top_notes || "",
                heart: item.heart_notes || "",
                base: item.base_notes || "",
              },
              image_url: item.image_url,
              badge: item.badge || undefined,
              created_at: item.created_at,
            }));
            setPerfumes(mapped);
          }
        } catch (err: any) {
          console.error("Failed to connect to Supabase:", err);
        }
      }
      setLoading(false);
    };

    fetchPerfumes();
  }, []);

  // Sync to local storage for local fallback persistence
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(perfumes));
  }, [perfumes]);

  // Add perfume
  const addPerfume = async (input: PerfumeInput): Promise<Perfume> => {
    const newId = `perfume_${Date.now()}`;
    const newPerfume: Perfume = {
      ...input,
      id: newId,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error: sbError } = await supabase
          .from("perfumes")
          .insert([
            {
              name: input.name,
              category: input.category,
              tagline: input.tagline,
              top_notes: input.notes.top,
              heart_notes: input.notes.heart,
              base_notes: input.notes.base,
              image_url: input.image_url,
              badge: input.badge,
            },
          ])
          .select()
          .single();

        if (sbError) throw sbError;

        if (data) {
          const created: Perfume = {
            id: data.id,
            name: data.name,
            category: data.category,
            tagline: data.tagline || "",
            notes: {
              top: data.top_notes || "",
              heart: data.heart_notes || "",
              base: data.base_notes || "",
            },
            image_url: data.image_url,
            badge: data.badge || undefined,
            created_at: data.created_at,
          };
          setPerfumes((prev) => [created, ...prev]);
          return created;
        }
      } catch (err: any) {
        console.error("Supabase insert error:", err);
      }
    }

    // Local fallback
    setPerfumes((prev) => [newPerfume, ...prev]);
    return newPerfume;
  };

  // Update perfume
  const updatePerfume = async (id: string, input: PerfumeInput): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: sbError } = await supabase
          .from("perfumes")
          .update({
            name: input.name,
            category: input.category,
            tagline: input.tagline,
            top_notes: input.notes.top,
            heart_notes: input.notes.heart,
            base_notes: input.notes.base,
            image_url: input.image_url,
            badge: input.badge,
          })
          .eq("id", id);

        if (sbError) throw sbError;
      } catch (err: any) {
        console.error("Supabase update error:", err);
      }
    }

    setPerfumes((prev) =>
      prev.map((p) => (p.id === id ? { ...input, id } : p))
    );
  };

  // Delete perfume
  const deletePerfume = async (id: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: sbError } = await supabase
          .from("perfumes")
          .delete()
          .eq("id", id);

        if (sbError) throw sbError;
      } catch (err: any) {
        console.error("Supabase delete error:", err);
      }
    }

    setPerfumes((prev) => prev.filter((p) => p.id !== id));
  };

  // Reset to initial defaults
  const resetPerfumes = () => {
    setPerfumes(initialPerfumes);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    perfumes,
    loading,
    error,
    addPerfume,
    updatePerfume,
    deletePerfume,
    resetPerfumes,
  };
};
