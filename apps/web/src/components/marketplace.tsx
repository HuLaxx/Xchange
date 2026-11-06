"use client";
import {useMemo,useState} from "react";
import {Search,SlidersHorizontal,ArrowDownUp} from "lucide-react";
import {BookCard} from "@/components/book-card";
import {categories} from "@/lib/format";
import type {BookListing} from "@/lib/types";
export function Marketplace({books}:{books:BookListing[]}) {
 const [search,setSearch]=useState("");
 const [category,setCategory]=useState<string>("All books");
 const [sort,setSort]=useState("new");
 const [condition,setCondition]=useState("all");
 const result=useMemo(()=>{
  const q=search.trim().toLowerCase();
  const filtered=books.filter(b=>(!q||[b.title,b.author,b.city,b.category].join(" ").toLowerCase().includes(q))&&(category==="All books"||b.category===category)&&(condition==="all"||b.condition===condition));
  if(sort==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="high") filtered.sort((a,b)=>b.price-a.price);
  return filtered;
 },[books,search,category,condition,sort]);
 return <section className="marketplace" id="discover">
  <div className="section-heading"><div><div className="eyebrow">THE MARKETPLACE <span className="eyebrow-line"/></div><h2>Find your next <em>favorite.</em></h2><p>One person&apos;s finished read is another person&apos;s new beginning.</p></div><span className="result-count">{result.length} books on the shelf</span></div>
  <div className="category-strip" role="group" aria-label="Book categories">{categories.map(c=><button type="button" key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?"category active":"category"}>{c}</button>)}</div>
  <div className="filter-bar">
   <label className="search-field"><Search size={19}/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search title, author, city..." aria-label="Search books"/></label>
   <label className="filter-select"><SlidersHorizontal size={17}/><select aria-label="Book condition" value={condition} onChange={e=>setCondition(e.target.value)}><option value="all">Any condition</option><option>Like new</option><option>Good</option><option>Fair</option></select></label>
   <label className="filter-select"><ArrowDownUp size={17}/><select aria-label="Sort by" value={sort} onChange={e=>setSort(e.target.value)}><option value="new">Newest first</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label>
  </div>
  {result.length?<div className="listing-grid">{result.map(b=><BookCard book={b} key={b.id}/>)}</div>:
   <div className="empty-state"><div className="empty-spark">✳</div><h3>No books found on this shelf.</h3><p>Try a different search or category. Or be the first to list something.</p><button className="text-button" type="button" onClick={()=>{setCategory("All books");setSearch("");setCondition("all")}}>Clear filters ↗</button></div>}
 </section>;
}
