import "server-only";
import {demoBooks} from "@/lib/demo";
import {createClient} from "@/lib/supabase/server";
import {isConfigured} from "@/lib/supabase/config";
import type {BookListing} from "@/lib/types";
export async function listBooks(): Promise<BookListing[]> {
  if(!isConfigured()) return demoBooks;
  const supabase=await createClient();
  const {data,error}=await supabase.from("listings").select("*").eq("status","active").order("created_at",{ascending:false}).limit(60);
  if(error) throw new Error("Unable to load listings. Ensure the Supabase migration has run.");
  return (data??[]) as BookListing[];
}
export async function findBook(id:string):Promise<BookListing|null> {
  if(!isConfigured()) return demoBooks.find(x=>x.id===id)??null;
  if(!/^[a-f0-9-]{36}$/i.test(id)) return null;
  const supabase=await createClient();
  const {data}=await supabase.from("listings").select("*").eq("id",id).maybeSingle();
  return data as BookListing|null;
}
export async function currentUser() {
  if(!isConfigured()) return null;
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  return user;
}
