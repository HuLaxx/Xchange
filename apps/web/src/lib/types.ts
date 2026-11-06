export type BookCondition = "Like new" | "Good" | "Fair";
export type BookCategory = "Fiction" | "Non-fiction" | "Academic" | "Self-help" | "Comics" | "Other";
export type DeliveryMode = "shipping" | "pickup" | "both";
export type ListingStatus = "active" | "reserved" | "sold";
export type BookListing = {
  id: string;
  seller_id: string;
  title: string;
  author: string;
  category: BookCategory;
  condition: BookCondition;
  price: number;
  city: string;
  description: string;
  isbn: string | null;
  image_url: string | null;
  delivery_mode: DeliveryMode;
  status: ListingStatus;
  created_at: string;
};
export type BookRequest = {
  id:string;
  listing_id:string;
  buyer_id:string;
  seller_id:string;
  offered_listing_id:string|null;
  kind:"buy"|"swap";
  status:"pending"|"accepted"|"declined"|"cancelled";
  note:string;
  created_at:string;
};

export type BookMessage = {id:string;request_id:string;sender_id:string;body:string;created_at:string};
