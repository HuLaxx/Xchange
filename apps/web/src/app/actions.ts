"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/supabase/config";

export type ActionState = { error: string; success?: string };
const errorState = (error:string):ActionState => ({error});
const uuid = z.string().uuid();
const listingSchema = z.object({
 title:z.string().trim().min(3).max(120),
 author:z.string().trim().min(2).max(100),
 description:z.string().trim().max(1500),
 isbn:z.string().trim().max(20),
 category:z.enum(["Fiction","Non-fiction","Academic","Self-help","Comics","Other"]),
 condition:z.enum(["Like new","Good","Fair"]),
 price:z.coerce.number().int().min(0).max(100000),
 city:z.string().trim().min(2).max(80),
 delivery_mode:z.enum(["shipping","pickup","both"])
});
async function reader() {
 if(!isConfigured()) return null;
 const db=await createClient();
 const {data:{user},error}=await db.auth.getUser();
 if(error||!user) return null;
 return {db,user};
}
export async function createListingAction(_prev:ActionState,form:FormData):Promise<ActionState> {
 const session=await reader();
 if(!session) return errorState("Please sign in to publish a book. Configure Supabase to enable accounts.");
 const data=listingSchema.safeParse(Object.fromEntries(["title","author","description","isbn","category","condition","price","city","delivery_mode"].map(k=>[k,String(form.get(k)??"")])));
 if(!data.success) return errorState(data.error.issues[0]?.message??"Please check your listing details.");
 const {db,user}=session;
 let image_url:string|null=null;
 let uploadedPath:string|null=null;
 const cover=form.get("cover");
 if(cover instanceof File && cover.size>0) {
   if(cover.size>5*1024*1024) return errorState("The cover must be under 5 MB.");
   const ext:{[key:string]:string}={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"};
   if(!ext[cover.type]) return errorState("Use a JPG, PNG or WebP photo.");
   const path=`${user.id}/${crypto.randomUUID()}.${ext[cover.type]}`;
   const upload=await db.storage.from("book-covers").upload(path,cover,{contentType:cover.type,upsert:false});
   if(upload.error) return errorState("Could not upload the cover. Please try again.");
   uploadedPath=path;
   image_url=db.storage.from("book-covers").getPublicUrl(path).data.publicUrl;
 }
 const {error}=await db.from("listings").insert({...data.data,isbn:data.data.isbn||null,seller_id:user.id,image_url});
 if(error) {
   if(uploadedPath) await db.storage.from("book-covers").remove([uploadedPath]);
   return errorState("Could not publish your book. Check database setup and try again.");
 }
 revalidatePath("/");revalidatePath("/explore");revalidatePath("/dashboard");
 return {error:"",success:"Your book is published! Visit your library to manage it."};
}
export async function createRequestAction(_prev:ActionState,form:FormData):Promise<ActionState> {
 const session=await reader();
 if(!session) return errorState("Sign in to send a request.");
 const {db,user}=session;
 const listingId=String(form.get("listing_id")??"");
 const offered=String(form.get("offered_listing_id")??"");
 const kind=String(form.get("kind")??"");
 const note=String(form.get("note")??"").trim();
 if(!uuid.safeParse(listingId).success||!["buy","swap"].includes(kind)||note.length>500) return errorState("Invalid request details.");
 if(kind==="swap"&&!uuid.safeParse(offered).success) return errorState("Choose a book from your own library to swap.");
 const {data:listing}=await db.from("listings").select("seller_id,status").eq("id",listingId).single();
 if(!listing||listing.status!=="active") return errorState("This book is no longer available.");
 if(listing.seller_id===user.id) return errorState("You cannot request your own book.");
 const {error}=await db.from("requests").insert({
  buyer_id:user.id,seller_id:listing.seller_id,listing_id:listingId,
  kind,offered_listing_id:kind==="swap"?offered:null,note
 });
 if(error) return errorState("Could not submit. You may already have a pending request for this book.");
 revalidatePath("/dashboard");
 return {error:"",success:"Request sent! Track the status from My library."};
}
export async function respondToRequestAction(form:FormData):Promise<void> {
 const session=await reader();
 if(!session) redirect("/auth");
 const id=String(form.get("request_id")??"");
 const decision=String(form.get("decision")??"");
 if(!uuid.safeParse(id).success||!["accept","decline"].includes(decision)) throw new Error("Invalid request.");
 const {error}=await session.db.rpc("respond_to_request",{p_request_id:id,p_accept:decision==="accept"});
 if(error) throw new Error("Unable to update request. Please reload and try again.");
 revalidatePath("/dashboard");revalidatePath("/explore");revalidatePath("/");
}
export async function markSoldAction(form:FormData):Promise<void> {
 const session=await reader();
 if(!session) redirect("/auth");
 const id=String(form.get("listing_id")??"");
 if(!uuid.safeParse(id).success) throw new Error("Invalid book.");
 const {error}=await session.db.from("listings").update({status:"sold"}).eq("id",id).eq("seller_id",session.user.id);
 if(error) throw new Error("Unable to mark this book as sold.");
 revalidatePath("/dashboard");revalidatePath("/explore");revalidatePath("/");
}
export async function toggleFavoriteAction(form:FormData):Promise<void> {
 const session=await reader();
 if(!session) redirect("/auth");
 const id=String(form.get("listing_id")??"");
 if(!uuid.safeParse(id).success) return;
 const {db,user}=session;
 const {data}=await db.from("favorites").select("listing_id").eq("user_id",user.id).eq("listing_id",id).maybeSingle();
 if(data) await db.from("favorites").delete().eq("user_id",user.id).eq("listing_id",id);
 else await db.from("favorites").insert({user_id:user.id,listing_id:id});
 revalidatePath("/dashboard");revalidatePath("/books/"+id);
}
export async function signOutAction():Promise<void> {
 if(isConfigured()) {const db=await createClient();await db.auth.signOut();}
 redirect("/");
}

export async function sendMessageAction(_prev:ActionState,form:FormData):Promise<ActionState> {
 const session=await reader();
 if(!session) return errorState("Sign in to send messages.");
 const id=String(form.get("request_id")??"");
 const body=String(form.get("body")??"").trim();
 if(!uuid.safeParse(id).success||body.length<1||body.length>1200) return errorState("Write a message of up to 1,200 characters.");
 const {error}=await session.db.from("messages").insert({request_id:id,sender_id:session.user.id,body});
 if(error) return errorState("Message could not be sent. Only participants can message after a request is accepted.");
 revalidatePath("/messages/"+id);
 return {error:"",success:"Message sent."};
}
