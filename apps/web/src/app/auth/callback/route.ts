import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";
import {isConfigured} from "@/lib/supabase/config";
export async function GET(request:Request) {
 const url=new URL(request.url);
 const code=url.searchParams.get("code");
 const next=url.searchParams.get("next")||"/dashboard";
 const safeNext=next.startsWith("/")&&!next.startsWith("//")?next:"/dashboard";
 if(!code||!isConfigured())return NextResponse.redirect(new URL("/auth?error=verification",url.origin));
 const db=await createClient();
 const {error}=await db.auth.exchangeCodeForSession(code);
 return NextResponse.redirect(new URL(error?"/auth?error=verification":safeNext,url.origin));
}
