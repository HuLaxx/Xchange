"use client";
import {useActionState,useState} from "react";
import Link from "next/link";
import {ArrowRight,ArrowLeftRight,ShoppingBag,Info} from "lucide-react";
import {createRequestAction,type ActionState} from "@/app/actions";
const initial:ActionState={error:""};
export function RequestForm({id,myBooks}:{id:string;myBooks:{id:string;title:string}[]}) {
 const [mode,setMode]=useState<"buy"|"swap">("buy");
 const [state,action,pending]=useActionState(createRequestAction,initial);
 return <div className="request-form"><div className="request-switch"><button type="button" className={mode==="buy"?"active":""} onClick={()=>setMode("buy")}><ShoppingBag size={16}/> Buy</button><button type="button" className={mode==="swap"?"active":""} onClick={()=>setMode("swap")}><ArrowLeftRight size={16}/> Exchange</button></div>
  <form action={action}><input type="hidden" name="listing_id" value={id}/><input type="hidden" name="kind" value={mode}/>
   {mode==="swap"&&(myBooks.length?<label className="field">Offer one of your books<select name="offered_listing_id" required defaultValue=""><option value="" disabled>Select a book to exchange</option>{myBooks.map(b=><option key={b.id} value={b.id}>{b.title}</option>)}</select></label>:<p className="request-explainer">To exchange a book, <Link href="/list">list one of your own first ↗</Link></p>)}
   <label className="field">Message to the owner (optional)<textarea name="note" rows={3} maxLength={500} placeholder={mode==="buy"?"Hi! Is the book still available for shipping?":"Hi! Would you be interested in exchanging our books?"}/></label>
   {state.error&&<p className="form-error" role="alert">{state.error}</p>}{state.success&&<p className="form-success" role="status">{state.success} <Link href="/dashboard">My library ↗</Link></p>}
   <button className="primary-btn full-btn" type="submit" disabled={pending||(mode==="swap"&&myBooks.length===0)}>{pending?"Sending request...":mode==="buy"?"Request to buy":"Propose an exchange"}<ArrowRight size={17}/></button>
  </form><div className="request-disclaimer"><Info size={15}/> No payment is collected here. Shipping and payment must be arranged after acceptance, using a trusted method.</div></div>;
}
