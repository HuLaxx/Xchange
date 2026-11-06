import type {BookListing} from "@/lib/types";
const hues=["cover-peach","cover-sage","cover-lavender","cover-cream","cover-blue","cover-rose"];
export function BookCover({book,large=false}:{book:BookListing;large?:boolean}) {
 const tone=hues[[...book.title].reduce((n,c)=>n+c.charCodeAt(0),0)%hues.length];
 return <div className={`book-cover ${tone} ${large?"book-cover-large":""}`}>
  {book.image_url ? <img className="real-cover" src={book.image_url} alt={`Photograph of ${book.title}`} loading="lazy"/>:
   <div className="illustrated-book" aria-label={book.title}><span className="cover-overline">THE READER'S EDITION</span><strong>{book.title}</strong><span className="cover-author">{book.author}</span><span className="cover-decoration">✳</span></div>}
 </div>;
}
