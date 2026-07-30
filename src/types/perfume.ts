export interface Perfume {
  id: string;
  name: string;
  category: "Unisex" | "For Him" | "For Her";
  tagline: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  image_url: string;
  gallery_images?: string[];
  price?: string;
  in_stock?: boolean;
  badge?: string;
  created_at?: string;
}

export type PerfumeInput = Omit<Perfume, "id" | "created_at">;
