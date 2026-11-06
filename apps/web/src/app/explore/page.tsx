import type {Metadata} from "next";
import {Marketplace} from "@/components/marketplace";
import {listBooks} from "@/lib/catalog";
import {isConfigured} from "@/lib/supabase/config";
export const metadata:Metadata={title:"Explore books"};
export default async function Explore(){
 const books=await listBooks();
 return <main><section className="interior-hero"><div className="page-container"><div className="eyebrow">XCHANGE ONE / BOOK MARKETPLACE</div><h1>Something good <em>to read.</em></h1><p>Find real books, at better prices, from readers just like you.</p>{!isConfigured()&&<p className="preview-note">Preview listings — connect a database to go live.</p>}</div></section><div className="page-container"><Marketplace books={books}/></div></main>;
}
