import Link from "next/link";
import {ArrowUpRight,MapPin,Truck} from "lucide-react";
import type {BookListing} from "@/lib/types";
import {rupees} from "@/lib/format";
import {BookCover} from "@/components/book-cover";
export function BookCard({book}:{book:BookListing}) {
 return <Link className="listing-card" href={`/books/${book.id}`} aria-label={`View ${book.title}`}>
  <div className="listing-image"><BookCover book={book}/><span className="condition-pill">{book.condition}</span></div>
  <div className="listing-info"><div className="listing-meta">{book.category}<span>·</span>{book.delivery_mode==="pickup"?"Pickup":"Delivery available"}</div>
  <div className="book-title-row"><h3>{book.title}</h3><ArrowUpRight size={17}/></div>
  <p className="book-author">by {book.author}</p>
  <div className="listing-foot"><span className="book-price">{rupees(book.price)}</span><span className="muted inline-icon"><MapPin size={13}/>{book.city}</span></div></div>
 </Link>;
}
