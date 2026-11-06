"use client";
import {useActionState} from "react";
import Link from "next/link";
import {ArrowRight,ImagePlus,Package,ShieldCheck} from "lucide-react";
import {createListingAction,type ActionState} from "@/app/actions";
const initial:ActionState={error:""};
export function ListingForm({configured}:{configured:boolean}) {
 const [state,formAction,pending]=useActionState(createListingAction,initial);
 return <div className="form-shell"><form action={formAction} className="listing-form">
  <div className="form-section-label">01 / ABOUT THE BOOK</div>
  <div className="field-grid"><label className="field full-field">Book title <input name="title" required minLength={3} maxLength={120} placeholder="e.g. The Psychology of Money"/></label>
  <label className="field">Author <input name="author" required minLength={2} maxLength={100} placeholder="e.g. Morgan Housel"/></label>
  <label className="field">ISBN (optional) <input name="isbn" maxLength={20} placeholder="e.g. 9780857197689"/></label>
  <label className="field">Category <select name="category" defaultValue="Fiction">{["Fiction","Non-fiction","Academic","Self-help","Comics","Other"].map(c=><option key={c}>{c}</option>)}</select></label>
  <label className="field">Book condition <select name="condition" defaultValue="Good"><option>Like new</option><option>Good</option><option>Fair</option></select></label>
  <label className="field full-field">Tell us about this copy <textarea name="description" rows={4} maxLength={1500} placeholder="Mention edition, highlights, missing pages, defects, or what makes it special."/></label></div>
  <div className="form-section-label">02 / PRICE & DELIVERY</div>
  <div className="field-grid"><label className="field">Your price (₹) <input name="price" type="number" min={0} max={100000} step={1} required placeholder="249"/></label><label className="field">City <input name="city" required minLength={2} maxLength={80} placeholder="e.g. Pune"/></label>
  <label className="field full-field">How can you hand it over? <select name="delivery_mode" defaultValue="shipping"><option value="shipping">Ship across India (arranged manually)</option><option value="pickup">Local pickup</option><option value="both">Shipping or pickup</option></select></label></div>
  <div className="form-section-label">03 / MAKE IT STAND OUT</div>
  <label className="upload-zone"><ImagePlus size={25}/><strong>Add a photo of your book (optional)</strong><span>Clear front-cover photos attract more readers. JPG, PNG or WebP · 5 MB max.</span><input name="cover" type="file" accept="image/jpeg,image/png,image/webp" /></label>
  {state.error&&<div className="form-error" role="alert">{state.error}</div>}
  {state.success&&<div className="form-success" role="status">{state.success} <Link href="/dashboard">Go to My library ↗</Link></div>}
  {!configured&&<div className="form-note">Demo mode: connect Supabase before publishing real listings.</div>}
  <button type="submit" className="primary-btn full-btn" disabled={pending||!configured}>{pending?"Publishing...":"Publish my book"}<ArrowRight size={18}/></button>
  <p className="legal-note"><ShieldCheck size={14}/> Your contact information stays private. Payments and shipping are not processed by Xchange One yet.</p>
 </form><aside className="form-aside"><div className="aside-card"><span className="small-spark">✳</span><h3>Every book has<br/>a next reader.</h3><p>Be clear about your book's condition, take a good photo, and set a fair price.</p><div className="aside-line"><Package size={18}/> Physical copies only</div><div className="aside-line"><ShieldCheck size={18}/> Secure seller accounts</div></div></aside></div>;
}
