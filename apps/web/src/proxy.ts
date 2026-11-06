import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isConfigured, settings } from "@/lib/supabase/config";
export async function proxy(request: NextRequest) {
  if (!isConfigured()) return NextResponse.next({request});
  let response = NextResponse.next({request});
  const {url,key} = settings();
  const supabase = createServerClient(url,key,{cookies:{
    getAll(){return request.cookies.getAll();},
    setAll(items){
      items.forEach(({name,value})=>request.cookies.set(name,value));
      response=NextResponse.next({request});
      items.forEach(({name,value,options})=>response.cookies.set(name,value,options));
    }
  }});
  await supabase.auth.getClaims();
  return response;
}
export const config = {matcher:["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]};
