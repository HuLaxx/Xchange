import Link from "next/link";
import {ArrowUpRight,BookOpen,UserRound} from "lucide-react";
import {currentUser} from "@/lib/catalog";
export async function Header() {
 const user=await currentUser();
 return <header className="site-header"><div className="nav-wrap">
  <Link href="/" className="brand" aria-label="Xchange One home"><span className="brand-mark"><BookOpen size={20} strokeWidth={2.3}/></span><span>Xchange<span className="brand-accent">One</span></span><span className="brand-period">.</span></Link>
  <nav className="main-nav" aria-label="Main navigation"><Link href="/explore">Explore books</Link><Link href="/#how-it-works">How it works</Link><Link href="/dashboard">My library</Link></nav>
  <div className="nav-actions"><Link href={user?"/dashboard":"/auth"} className="header-account"><UserRound size={18}/><span>{user?"Account":"Sign in"}</span></Link><Link href="/list" className="nav-cta">List a book <ArrowUpRight size={16}/></Link></div>
 </div></header>;
}
