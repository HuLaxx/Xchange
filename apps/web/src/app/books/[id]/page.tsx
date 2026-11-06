import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft,ArrowRight,ArrowUpRight,Heart,MapPin,PackageCheck,ShieldCheck,Truck} from "lucide-react";
import {BookCover} from "@/components/book-cover";
import {RequestForm} from "@/components/request-form";
import {findBook,currentUser} from "@/lib/catalog";
import {createClient} from "@/lib/supabase/server";
import {isConfigured} from "@/lib/supabase/config";
import {isDemoBook} from "@/lib/demo";
import {rupees} from "@/lib/format";
import {toggleFavoriteAction} from "@/app/actions";
type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const b=await findBook(id);return {title:b?.title??"Book not found",description:b?`Buy or swap ${b.title} by ${b.author}.`:undefined};}
export default async function BookDetail({params}:Props){
 const {id}=await params;const book=await findBook(id);
 if(!book) notFound();
 const user=await currentUser();
 const configured=isConfigured()&&!isDemoBook(id);
 const mine=!!user&&user.id===book.seller_id;
 let myBooks:{id:string;title:string}[]=[];
 let favorite=false;
 if(configured&&user){
  const db=await createClient();
  if(!mine){
   const {data}=await db.from("listings").select("id,title").eq("seller_id",user.id).eq("status","active").limit(30);
   myBooks=data??[];
  }
  const {data:saved}=await db.from("favorites").select("listing_id").eq("user_id",user.id).eq("listing_id",id).maybeSingle();
  favorite=!!saved;
 }
 return <main className="page-container detail-page"><Link href="/explore" className="back-link"><ArrowLeft size={17}/> Back to marketplace</Link><div className="detail-layout"><div><div className="product-photo"><BookCover book={book} large/></div><div className="product-extras"><ShieldCheck size={18}/><span>Pre-loved with care</span><span className="bullet">·</span><PackageCheck size={18}/><span>Physical book</span></div></div>
 <div className="product-panel"><div className="eyebrow">XCHANGE ONE / {book.category.toUpperCase()}</div><h1>{book.title}</h1><p className="detail-author">by {book.author}</p>
  <div className="product-price">{rupees(book.price)} <span>Listed price · shipping extra</span></div>
  <div className="product-tags"><span>{book.condition}</span><span><MapPin size={14}/>{book.city}</span><span><Truck size={15}/>{book.delivery_mode==="pickup"?"Local pickup only":book.delivery_mode==="shipping"?"Shipping available":"Shipping & pickup"}</span></div>
  <div className="product-description"><h2>About this copy</h2><p>{book.description||"The seller hasn't added a description yet. Ask about condition and edition before confirming."}</p>{book.isbn&&<p>ISBN: {book.isbn}</p>}</div>
  <div className="product-actions">
  {!configured?<div className="notice">This is a preview listing. Connect Supabase to publish real books and send requests.</div>:
  mine?<div className="notice">This is your listing. <Link href="/dashboard">Manage it in My library ↗</Link></div>:
  !user?<div><p className="muted">Sign in to contact the seller with a purchase or swap request.</p><Link className="primary-btn full-btn" href="/auth">Sign in to continue <ArrowRight size={18}/></Link></div>:
  <RequestForm id={book.id} myBooks={myBooks}/>}
  {configured&&user&&<form action={toggleFavoriteAction}><input name="listing_id" type="hidden" value={id}/><button type="submit" className="favorite-btn"><Heart size={17} fill={favorite?"currentColor":"none"}/>{favorite?"Saved to your library":"Save to wishlist"}</button></form>}
  </div>
  <div className="buyer-note"><Truck size={19}/><div><strong>Delivery across India</strong><p>Owners can arrange courier shipping or local pickup with interested readers. Integrated checkout and tracking are planned—not live yet.</p></div></div>
 </div></div></main>;
}
