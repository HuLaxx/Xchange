import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {ListingForm} from "@/components/listing-form";
import {currentUser} from "@/lib/catalog";
import {isConfigured} from "@/lib/supabase/config";
export const metadata:Metadata={title:"List a book"};
export default async function ListBook(){
 const configured=isConfigured();
 if(configured&&!(await currentUser())) redirect("/auth");
 return <main className="page-container content-page"><div className="eyebrow">SELL OR SWAP / YOUR BOOKS</div><h1>Give your book a<br/><em>new chapter.</em></h1><p className="page-lede">List a physical book in minutes. Connect with readers who'll appreciate it as much as you did.</p><ListingForm configured={configured}/></main>;
}
