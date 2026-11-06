import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { settings } from "@/lib/supabase/config";
export async function createClient() {
  const {url,key} = settings();
  const cookieStore = await cookies();
  return createServerClient(url,key,{cookies:{
    getAll(){return cookieStore.getAll();},
    setAll(items){try{items.forEach(({name,value,options})=>cookieStore.set(name,value,options));}catch{/* Only Proxy can refresh cookies in Server Components. */}}
  }});
}
