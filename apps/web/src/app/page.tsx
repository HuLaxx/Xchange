import Link from "next/link";
import {ArrowRight,ArrowUpRight,BookOpen,PackageCheck,Repeat2,ShieldCheck,Sparkles,Truck} from "lucide-react";
import {Marketplace} from "@/components/marketplace";
import {listBooks} from "@/lib/catalog";
import {isConfigured} from "@/lib/supabase/config";
export default async function Home(){
 const books=await listBooks();
 return <main>
  {!isConfigured()&&<div className="preview-banner">PREVIEW MODE · Sample listings only. Connect Supabase to activate real accounts and requests.</div>}
  <section className="hero"><div className="hero-copy"><div className="hero-label"><span className="tiny-circle"/> THE NEXT CHAPTER STARTS HERE</div>
   <h1>Every book<br/>deserves a <em>second</em><br/>story<span className="hero-dot">.</span></h1>
   <p>Discover pre-loved books. Give your old favorites a new home. A better way to read, share and repeat—one book at a time.</p>
   <div className="hero-actions"><Link href="/explore" className="primary-btn">Explore books <ArrowUpRight size={19}/></Link><Link href="/list" className="secondary-btn">Sell a book <ArrowRight size={18}/></Link></div>
   <div className="hero-trust"><span className="tiny-star">✳</span><span>Real books. Real readers. Endless possibilities.</span></div>
  </div>
  <div className="hero-art" aria-label="Illustration of physical books being shared" role="img"><div className="hero-halo"/><div className="hero-circle-tag">READ<br/>REPEAT<br/>↗</div><div className="hero-book hero-book-back"><span>GOOD THINGS</span><strong>BETTER<br/>TOGETHER</strong><small>THE READER'S CLUB</small></div><div className="hero-book hero-book-main"><span>XCHANGE ONE — NO. 01</span><strong>PASS<br/>THE<br/>STORY<br/>ON.</strong><small>EVERY BOOK HAS A NEXT CHAPTER</small></div><div className="hero-book-spine"><span>THE BOOKS WE SHARE · XCHANGE ONE</span></div><div className="hero-art-caption"><span>01 — 06</span><span>GOOD STORIES TRAVEL</span></div></div>
 </section>
 <div className="proof-strip"><div><BookOpen size={19}/><strong>Discover hidden gems</strong><span>Find your next great read</span></div><div><Repeat2 size={19}/><strong>Exchange with readers</strong><span>Swap, share, save more</span></div><div><Truck size={19}/><strong>Across India</strong><span>Shipping-ready marketplace</span></div></div>
 <div className="page-container"><Marketplace books={books}/></div>
 <section className="how-section" id="how-it-works"><div className="how-inner"><div><div className="eyebrow light-eyebrow">THREE SIMPLE STEPS</div><h2>More stories.<br/><em>Less waste.</em></h2><p>A book you no longer need could be exactly what someone else is looking for.</p><Link href="/list" className="light-cta">Give a book a new chapter <ArrowUpRight size={16}/></Link></div><div className="steps-grid"><article><span className="step-number">01 / DISCOVER</span><BookOpen/><h3>Find your read</h3><p>Explore unique pre-loved books from other readers.</p></article><article><span className="step-number">02 / CONNECT</span><Sparkles/><h3>Buy or swap</h3><p>Request a purchase or propose a book-for-book exchange.</p></article><article><span className="step-number">03 / DELIVER</span><PackageCheck/><h3>Pass it on</h3><p>Arrange shipping or pickup once the owner accepts.</p></article></div></div></section>
 <section className="bottom-cta"><div className="eyebrow">MAKE ROOM FOR A NEW CHAPTER</div><h2>Your shelf is full of<br/><em>someone else's favorites.</em></h2><Link href="/list" className="primary-btn">List your first book <ArrowUpRight size={18}/></Link></section>
 </main>;
}
