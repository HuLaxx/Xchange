import type { BookListing } from "@/lib/types";
const shared = { seller_id: "preview", isbn: null, image_url: null, delivery_mode: "shipping" as const, status: "active" as const, created_at: "2026-11-01T12:00:00Z" };
export const demoBooks: BookListing[] = [
  { ...shared, id: "demo-1", title: "The Psychology of Money", author: "Morgan Housel", category: "Non-fiction", condition: "Like new", price: 249, city: "Pune", description: "A beautifully kept copy, with no annotations. An ideal read on personal finance." },
  { ...shared, id: "demo-2", title: "Atomic Habits", author: "James Clear", category: "Self-help", condition: "Good", price: 299, city: "Mumbai", description: "A gently used paperback with a few highlighted passages." },
  { ...shared, id: "demo-3", title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", condition: "Like new", price: 179, city: "Nagpur", description: "An inspiring read, ready for its next chapter." },
  { ...shared, id: "demo-4", title: "Introduction to Algorithms", author: "Cormen et al.", category: "Academic", condition: "Fair", price: 549, city: "Bengaluru", description: "A useful reference copy with neatly written notes on a few pages." },
  { ...shared, id: "demo-5", title: "Ikigai", author: "Héctor García & Francesc Miralles", category: "Non-fiction", condition: "Good", price: 199, city: "Delhi", description: "A paperback in good condition, packed with ideas." },
  { ...shared, id: "demo-6", title: "Sapiens", author: "Yuval Noah Harari", category: "Non-fiction", condition: "Good", price: 359, city: "Hyderabad", description: "Well cared for; only gentle wear to the corners." }
];
export const isDemoBook = (id: string) => id.startsWith("demo-");
