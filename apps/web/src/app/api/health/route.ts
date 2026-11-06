import {NextResponse} from "next/server";
import {isConfigured} from "@/lib/supabase/config";
export const dynamic="force-dynamic";
export function GET(){return NextResponse.json({status:"ok",app:"xchange-one",databaseConfigured:isConfigured()},{headers:{"Cache-Control":"no-store"}});}
