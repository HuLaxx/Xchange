import Link from "next/link";
import {BookOpen,ArrowUpRight} from "lucide-react";
export function Footer(){
 return <footer className="footer"><div className="footer-inner">
 <div><Link href="/" className="brand footer-brand"><span className="brand-mark"><BookOpen size={18}/></span><span>Xchange<span className="brand-accent">One</span>.</span></Link><p>Good books deserve another chapter.<br/>Buy, sell & swap pre-loved books across India.</p></div>
 <div className="footer-links"><Link href="/explore">Explore marketplace</Link><Link href="/list">Sell a book</Link><Link href="/dashboard">My library</Link><a href="https://github.com/HuLaxx/Xchange" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></div>
 </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Xchange One. Made for readers, by readers.</span><span>Physical books. Bigger stories.</span></div></footer>;
}
