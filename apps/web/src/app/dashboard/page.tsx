import type {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import {ArrowUpRight,BookOpen,Heart,Inbox,PackageCheck,Plus,Repeat2,ShoppingBag,LogOut} from "lucide-react";
import {isConfigured} from "@/lib/supabase/config";
import {currentUser} from "@/lib/catalog";
import {createClient} from "@/lib/supabase/server";
import {rupees} from "@/lib/format";
import type {BookListing,BookRequest} from "@/lib/types";
import {respondToRequestAction,markSoldAction,signOutAction} from "@/app/actions";
export const metadata:Metadata={title:"My library"};
type JoinedRequest=BookRequest&{listings:{title:string;price:number}|null};
function statusClass(status:string){return `status-badge status-${status}`;}
export default async function Dashboard(){
 const configured=isConfigured();
 const user=await currentUser();
 if(configured&&!user)redirect("/auth");
 if(!configured)return <main className="page-container content-page"><div className="eyebrow">YOUR READER SPACE</div><h1>Make it <em>yours.</em></h1><div className="notice">Preview mode: connect Supabase to use your personal library, saved books and real requests. Setup instructions are in the GitHub branch README.</div><Link href="/explore" className="primary-btn">Explore preview books <ArrowUpRight size={17}/></Link></main>;
 const db=await createClient();
 const id=user!.id;
 const [{data:mine},{data:incoming},{data:outgoing},{data:favorites}]=await Promise.all([
  db.from("listings").select("*").eq("seller_id",id).order("created_at",{ascending:false}),
  db.from("requests").select("*,listings(title,price)").eq("seller_id",id).order("created_at",{ascending:false}),
  db.from("requests").select("*,listings(title,price)").eq("buyer_id",id).order("created_at",{ascending:false}),
  db.from("favorites").select("listing_id,listings(id,title,author,price)").eq("user_id",id).limit(50)
 ]);
 const listings=(mine??[]) as BookListing[];
 const received=(incoming??[]) as JoinedRequest[],sent=(outgoing??[]) as JoinedRequest[];
 const saved=(favorites??[]) as unknown as {listing_id:string;listings:{id:string;title:string;author:string;price:number}|null}[];
 return <main className="page-container dashboard-page">
  <div className="dashboard-head"><div><div className="eyebrow">YOUR PERSONAL READER SPACE</div><h1>My <em>library.</em></h1><p>Welcome back, {user!.email?.split("@")[0]}. Your books have stories to tell.</p></div><div className="dash-head-actions"><Link href="/list" className="primary-btn"><Plus size={18}/> List a book</Link><form action={signOutAction}><button type="submit" className="outline-btn"><LogOut size={16}/> Sign out</button></form></div></div>
  <div className="dashboard-stats"><div><BookOpen/><span>My listings</span><strong>{listings.length}</strong></div><div><Inbox/><span>Received offers</span><strong>{received.length}</strong></div><div><Repeat2/><span>My requests</span><strong>{sent.length}</strong></div><div><Heart/><span>Saved books</span><strong>{saved.length}</strong></div></div>
  <section className="dash-section"><div className="dash-title"><h2>Books on my shelf</h2><Link href="/list">List another <ArrowUpRight size={16}/></Link></div>
  {listings.length?<div className="library-list">{listings.map(b=><div className="library-row" key={b.id}><div className="list-thumb">✳</div><div className="row-text"><Link href={`/books/${b.id}`} className="row-title">{b.title}</Link><span>{b.author} · {b.city}</span></div><strong>{rupees(b.price)}</strong><span className={statusClass(b.status)}>{b.status}</span>{b.status!=="sold"&&<form action={markSoldAction}><input type="hidden" name="listing_id" value={b.id}/><button className="small-action" type="submit">Mark sold</button></form>}</div>)}</div>:
  <div className="dash-empty"><BookOpen/><h3>Your shelf is waiting for its first story.</h3><p>List a book you have finished and share it with another reader.</p><Link href="/list" className="text-button">List a book ↗</Link></div>}
  </section>
  <div className="dashboard-columns"><section className="dash-section"><div className="dash-title"><h2>Received requests</h2><span className="muted">From other readers</span></div>
   {received.length?<div className="requests-list">{received.map(r=><div className="request-row" key={r.id}><div className="request-row-top"><span className="request-kind">{r.kind==="buy"?"Purchase request":"Exchange offer"}</span><span className={statusClass(r.status)}>{r.status}</span></div><strong>{r.listings?.title??"Book listing"}</strong><small>{r.note||"No message added"}</small>{r.status==="pending"&&<div className="inline-actions"><form action={respondToRequestAction}><input name="request_id" type="hidden" value={r.id}/><input name="decision" type="hidden" value="accept"/><button type="submit" className="small-action primary-small">Accept</button></form><form action={respondToRequestAction}><input name="request_id" type="hidden" value={r.id}/><input name="decision" type="hidden" value="decline"/><button type="submit" className="small-action">Decline</button></form></div>}</div>)}</div>:<div className="dash-empty compact"><Inbox/><p>Received offers will appear here.</p></div>}
  </section><section className="dash-section"><div className="dash-title"><h2>Sent requests</h2><span className="muted">Your purchase & swap activity</span></div>
   {sent.length?<div className="requests-list">{sent.map(r=><div className="request-row" key={r.id}><div className="request-row-top"><span className="request-kind">{r.kind==="buy"?"Request to buy":"Exchange proposal"}</span><span className={statusClass(r.status)}>{r.status}</span></div><strong>{r.listings?.title??"Book listing"}</strong><small>{r.note||"No message added"}</small></div>)}</div>:<div className="dash-empty compact"><ShoppingBag/><p>Books you request will appear here.</p><Link href="/explore" className="text-button">Find books ↗</Link></div>}
  </section></div>
  <section className="dash-section"><div className="dash-title"><h2>Saved books</h2><Link href="/explore">Browse more <ArrowUpRight size={16}/></Link></div>
  {saved.filter(s=>s.listings).length?<div className="saved-grid">{saved.filter(s=>s.listings).map(s=><Link href={`/books/${s.listing_id}`} key={s.listing_id} className="saved-link"><Heart size={18}/><span>{s.listings!.title}<small>{s.listings!.author}</small></span><strong>{rupees(s.listings!.price)}</strong></Link>)}</div>:<div className="dash-empty compact"><Heart/><p>Save books you love for later.</p></div>}
  </section>
  <div className="dashboard-notice"><PackageCheck/><p><strong>About transactions:</strong> Accepted requests reserve a book. Payment, buyer-seller contact, shipping labels and courier tracking are not implemented yet. Do not include personal contact details in request notes.</p></div>
 </main>;
}
