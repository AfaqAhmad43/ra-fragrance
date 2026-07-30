import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/ra-fragrance-logo.png";
import { usePerfumes } from "@/hooks/usePerfumes";
import { Perfume, PerfumeInput } from "@/types/perfume";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  Plus,
  Trash2,
  Edit,
  LogOut,
  Sparkles,
  Upload,
  Search,
  CheckCircle,
  AlertCircle,
  Database,
  ExternalLink,
  RotateCcw,
  X,
  Package,
  Copy,
  CopyCheck,
  Image as ImageIcon,
  Star,
  DollarSign,
  Tag,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    perfumes,
    loading,
    addPerfume,
    updatePerfume,
    deletePerfume,
    resetPerfumes,
  } = usePerfumes();

  // Auth Protection Check
  useEffect(() => {
    const isAuth = sessionStorage.getItem("ra_admin_auth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("ra_admin_auth");
    navigate("/admin/login");
  };

  // Search, Filter, Toast
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<"Unisex" | "For Him" | "For Her">("Unisex");
  const [tagline, setTagline] = useState("");
  const [topNotes, setTopNotes] = useState("");
  const [heartNotes, setHeartNotes] = useState("");
  const [baseNotes, setBaseNotes] = useState("");
  const [badge, setBadge] = useState("");
  const [price, setPrice] = useState("PKR 3,500");
  const [inStock, setInStock] = useState(true);

  // Image & Gallery Management
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filtered perfumes list
  const filteredPerfumes = perfumes.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Open modal for Adding
  const handleOpenAddModal = () => {
    setEditingPerfume(null);
    setName("");
    setCategory("Unisex");
    setTagline("");
    setTopNotes("");
    setHeartNotes("");
    setBaseNotes("");
    setBadge("");
    setPrice("PKR 3,500");
    setInStock(true);
    setMainImageUrl("");
    setGalleryImages([]);
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEditModal = (p: Perfume) => {
    setEditingPerfume(p);
    setName(p.name);
    setCategory(p.category);
    setTagline(p.tagline);
    setTopNotes(p.notes.top);
    setHeartNotes(p.notes.heart);
    setBaseNotes(p.notes.base);
    setBadge(p.badge || "");
    setPrice(p.price || "PKR 3,500");
    setInStock(p.in_stock !== false);
    setMainImageUrl(p.image_url);
    setGalleryImages(p.gallery_images || []);
    setIsModalOpen(true);
  };

  // Clone / Duplicate Perfume
  const handleClonePerfume = (p: Perfume) => {
    setEditingPerfume(null);
    setName(`${p.name} (Copy)`);
    setCategory(p.category);
    setTagline(p.tagline);
    setTopNotes(p.notes.top);
    setHeartNotes(p.notes.heart);
    setBaseNotes(p.notes.base);
    setBadge(p.badge || "");
    setPrice(p.price || "PKR 3,500");
    setInStock(true);
    setMainImageUrl(p.image_url);
    setGalleryImages(p.gallery_images || []);
    setIsModalOpen(true);
    setActionMessage(`Cloned settings from '${p.name}'!`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Handle Main File Selection (Cloudinary upload)
  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setMainImageUrl(uploadedUrl);
      setActionMessage("Main bottle image uploaded successfully!");
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error("Failed to upload main image:", err);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Gallery Image File Selection
  const handleGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setGalleryImages((prev) => [...prev, uploadedUrl]);
      setActionMessage("Gallery image added!");
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error("Failed to upload gallery image:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete an image from gallery
  const handleDeleteGalleryImage = (indexToRemove: number) => {
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Set a gallery image as main cover
  const handleSetAsMainImage = (url: string) => {
    setMainImageUrl(url);
    setActionMessage("Set as primary cover image!");
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mainImageUrl) {
      alert("Please fill in Perfume Name and provide a Cover Image.");
      return;
    }

    const perfumeData: PerfumeInput = {
      name,
      category,
      tagline,
      notes: {
        top: topNotes,
        heart: heartNotes,
        base: baseNotes,
      },
      image_url: mainImageUrl,
      gallery_images: galleryImages,
      price: price.trim() || undefined,
      in_stock: inStock,
      badge: badge.trim() || undefined,
    };

    if (editingPerfume) {
      await updatePerfume(editingPerfume.id, perfumeData);
      setActionMessage(`Updated '${name}' successfully!`);
    } else {
      await addPerfume(perfumeData);
      setActionMessage(`Added '${name}' to catalog!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Handle Delete Perfume
  const handleDelete = async (p: Perfume) => {
    if (confirm(`Are you sure you want to delete '${p.name}' from the catalog?`)) {
      await deletePerfume(p.id);
      setActionMessage(`Deleted '${p.name}'`);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  // Copy Image URL to clipboard
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 font-body">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Top Header Bar */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full p-0.5 border border-primary/40 bg-card">
              <img src={logo} alt="RA Fragrance" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="font-display text-gold-gradient text-2xl md:text-3xl font-bold tracking-wide">
                Admin Control Center
              </h1>
              <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
                Manage Perfumes, Media Gallery & Stock Status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/collection"
              target="_blank"
              className="btn-outline text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span>View Public Store</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-destructive/40 text-destructive hover:bg-destructive/10 text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Database Status Indicator */}
        <div className="mb-8 p-4 rounded-2xl glass-card flex items-center justify-between gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-primary" />
            <span>Database Backend:</span>
            {isSupabaseConfigured ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle size={12} /> Supabase PostgreSQL (Live Sync)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <AlertCircle size={12} /> Local Client Storage (Connect Supabase via .env)
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (confirm("Reset catalog to initial flagship perfumes?")) {
                resetPerfumes();
                setActionMessage("Catalog reset to initial products.");
                setTimeout(() => setActionMessage(null), 3000);
              }
            }}
            className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Toast Notification */}
        {actionMessage && (
          <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/40 text-primary text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-lg">
            <Sparkles size={16} />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5 border border-primary/20">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total Perfumes</p>
            <p className="font-display text-gold-gradient text-3xl font-bold">{perfumes.length}</p>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-primary/20">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Unisex</p>
            <p className="font-display text-primary text-3xl font-bold">
              {perfumes.filter((p) => p.category === "Unisex").length}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-primary/20">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">For Him</p>
            <p className="font-display text-primary text-3xl font-bold">
              {perfumes.filter((p) => p.category === "For Him").length}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-primary/20">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">For Her</p>
            <p className="font-display text-primary text-3xl font-bold">
              {perfumes.filter((p) => p.category === "For Her").length}
            </p>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search & Category Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search perfumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-card/80 border border-border/60 rounded-xl pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-card/80 border border-border/60 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Unisex">Unisex</option>
              <option value="For Him">For Him</option>
              <option value="For Her">For Her</option>
            </select>
          </div>

          {/* Add New Button */}
          <button
            onClick={handleOpenAddModal}
            className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <Plus size={16} />
            <span>Add New Perfume</span>
          </button>
        </div>

        {/* Perfumes Catalog Grid */}
        {loading ? (
          <div className="py-16 text-center text-muted-foreground text-sm">
            Loading perfumes catalog...
          </div>
        ) : filteredPerfumes.length === 0 ? (
          <div className="glass-card rounded-2xl py-16 px-6 text-center">
            <Package size={36} className="mx-auto text-muted-foreground mb-3 opacity-40" />
            <h3 className="font-display text-foreground text-lg mb-1">No Perfumes Found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
              No products match your search. Add a new perfume to update your catalog.
            </p>
            <button onClick={handleOpenAddModal} className="btn-primary text-xs px-6 py-2.5">
              Add First Perfume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPerfumes.map((p) => (
              <div
                key={p.id}
                className="glass-card rounded-2xl overflow-hidden border border-primary/20 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    
                    {/* Primary Image preview */}
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-primary/30 shrink-0 bg-card group">
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleCopyUrl(p.image_url, p.id)}
                        title="Copy Image URL"
                        className="absolute bottom-1 right-1 p-1 rounded bg-black/70 text-primary hover:bg-black transition-colors"
                      >
                        {copiedId === p.id ? <CopyCheck size={12} /> : <Copy size={12} />}
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] tracking-widest uppercase font-bold text-primary bg-primary/10 border border-primary/30 px-2.5 py-0.5 rounded-full">
                          {p.category}
                        </span>
                        {p.badge && (
                          <span className="text-[10px] tracking-widest uppercase font-bold text-background bg-primary px-2 py-0.5 rounded-full">
                            {p.badge}
                          </span>
                        )}
                        {p.in_stock === false && (
                          <span className="text-[10px] tracking-widest uppercase font-bold text-destructive bg-destructive/10 border border-destructive/30 px-2 py-0.5 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-display text-foreground text-xl font-semibold leading-tight mt-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted-foreground italic mt-0.5">{p.tagline}</p>
                      {p.price && (
                        <p className="text-xs font-semibold text-primary mt-1">{p.price}</p>
                      )}
                    </div>
                  </div>

                  {/* Notes breakdown */}
                  <div className="space-y-1 text-[11px] text-muted-foreground pt-3 border-t border-border/40 mb-3">
                    <p><strong className="text-primary font-normal">Top:</strong> {p.notes.top}</p>
                    <p><strong className="text-primary font-normal">Heart:</strong> {p.notes.heart}</p>
                    <p><strong className="text-primary font-normal">Base:</strong> {p.notes.base}</p>
                  </div>

                  {/* Image Gallery thumbnails */}
                  {p.gallery_images && p.gallery_images.length > 0 && (
                    <div className="pt-2 pb-3 flex items-center gap-2 border-t border-border/30 overflow-x-auto">
                      <span className="text-[10px] uppercase text-muted-foreground flex items-center gap-1">
                        <ImageIcon size={12} /> Gallery:
                      </span>
                      {p.gallery_images.map((gUrl, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-lg overflow-hidden border border-primary/20 shrink-0">
                          <img src={gUrl} alt="Gallery view" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/40">
                  <button
                    onClick={() => handleClonePerfume(p)}
                    title="Clone Perfume Settings"
                    className="px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-white/5 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Copy size={12} />
                    <span>Clone</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="px-3 py-1.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(p)}
                      className="px-3 py-1.5 rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ADD / EDIT PERFUME & IMAGE GALLERY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-primary/40 shadow-2xl relative my-8 animate-fade-in max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-primary/20">
              <h2 className="font-display text-gold-gradient text-2xl font-bold">
                {editingPerfume ? `Edit '${editingPerfume.name}'` : "Add New Perfume"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-full border border-border/40"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-body">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Perfume Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Oud"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="For Him">For Him</option>
                    <option value="For Her">For Her</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Tagline / Short Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. A Memory in Every Drop"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Display Price Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PKR 3,500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-primary mb-1 font-medium">
                    Top Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bergamot, Saffron"
                    value={topNotes}
                    onChange={(e) => setTopNotes(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-primary mb-1 font-medium">
                    Heart Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Turkish Rose"
                    value={heartNotes}
                    onChange={(e) => setHeartNotes(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-primary mb-1 font-medium">
                    Base Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amber, Vanilla"
                    value={baseNotes}
                    onChange={(e) => setBaseNotes(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Badge & Stock Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Special Badge (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flagship, Bestseller"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Stock Availability
                  </label>
                  <button
                    type="button"
                    onClick={() => setInStock(!inStock)}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs tracking-wider uppercase font-semibold flex items-center justify-between transition-colors ${
                      inStock
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
                        : "bg-destructive/15 border-destructive/40 text-destructive"
                    }`}
                  >
                    <span>Status: {inStock ? "In Stock" : "Out of Stock"}</span>
                    <span>{inStock ? "✓ Active" : "✕ Disabled"}</span>
                  </button>
                </div>
              </div>

              {/* IMAGE MANAGEMENT & GALLERY SECTION */}
              <div className="p-4 rounded-2xl border border-primary/30 bg-card/40 space-y-4">
                <h3 className="font-display text-primary text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  <ImageIcon size={16} />
                  <span>Perfume Image Management & Media Gallery</span>
                </h3>

                {/* Primary Cover Image Controls */}
                <div>
                  <label className="block uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Primary Cover Bottle Image *
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <label className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 cursor-pointer shrink-0">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Upload Cover Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>

                    {mainImageUrl ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-xl overflow-hidden border border-primary/50 relative shadow-md">
                          <img src={mainImageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => setMainImageUrl("")}
                          className="px-2.5 py-1 rounded bg-destructive/20 border border-destructive/40 text-destructive text-[11px] hover:bg-destructive/30 transition-colors"
                        >
                          Delete Cover
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-400 italic">No primary image selected</span>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Or paste image URL (https://...)"
                    value={mainImageUrl}
                    onChange={(e) => setMainImageUrl(e.target.value)}
                    className="w-full bg-card/90 border border-border/60 rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary mt-2"
                  />
                </div>

                {/* Gallery Images List */}
                <div className="pt-2 border-t border-border/40">
                  <label className="block uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                    Additional Gallery Angles / Photos
                  </label>

                  <div className="flex items-center gap-2 mb-3">
                    <label className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Plus size={14} />
                      <span>Upload Gallery Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {galleryImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {galleryImages.map((gUrl, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-primary/30 aspect-square bg-card">
                          <img src={gUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSetAsMainImage(gUrl)}
                              title="Set as Main Cover"
                              className="p-1.5 rounded-full bg-primary text-background font-bold"
                            >
                              <Star size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteGalleryImage(idx)}
                              title="Delete Image"
                              className="p-1.5 rounded-full bg-destructive text-white"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-muted-foreground italic">No additional gallery photos added yet.</p>
                  )}
                </div>

              </div>

              {/* Modal Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline text-xs px-6 py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="btn-primary text-xs px-8 py-2.5 flex items-center gap-2"
                >
                  <Sparkles size={15} />
                  <span>{editingPerfume ? "Save Changes" : "Create Perfume"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default AdminDashboard;
