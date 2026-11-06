"use client";
import { createBrowserClient } from "@supabase/ssr";
import { settings } from "@/lib/supabase/config";
export function createClient() {
 const {url,key}=settings();
 return createBrowserClient(url,key);
}
