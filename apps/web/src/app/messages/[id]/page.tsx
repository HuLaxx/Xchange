import type {Metadata} from "next";
import {redirect,notFound} from "next/navigation";
import Link from "next/link";
import {ArrowLeft,LockKeyhole,MessageSquare,Truck} from "lucide-react";
import {currentUser} from "@/lib/catalog";
import {createClient} from "@/lib/supabase/server";
import {isConfigured} from "@/lib/supabase/config";
import {ConversationForm} from "@/components/conversation-form";
export const metadata:Metadata={title:"Private conversation",robots:{index:false,follow:false}};
type Props={params:Promise<{id:string}>};
export default async function Conversation({params}:Props){
 if(!isConfigured())redirect("/auth");
 const user=await currentUser();
 if(!user)redirect("/auth");
 const {id}=await params;
 if(!/^[a-f0-9-]{36}$/i.test(id))notFound();
 const db=await createClient();
 const {data:request}=await db.from("requests").select("id,buyer_id,seller_id,kind,status,listing_id,listings(title)").eq("id",id).maybeSingle();
 if(!request||(request.buyer_id!==user.id&&request.seller_id!==user.id))notFound();
 const {data:messages}=await db.from("messages").select("id,request_id,sender_id,body,created_at").eq("request_id",id).order("created_at",{ascending:true}).limit(250);
 const title=Array.isArray(request.listings)?request.listings[0]?.title:(request.listings as {title?:string}|null)?.title;
 return <main className="page-container chat-page"><Link href="/dashboard" className="back-link"><ArrowLeft size={16}/> Back to My library</Link>
  <div className="chat-header"><div><div className="eyebrow">PRIVATE READER-TO-READER CHAT</div><h1>{title||"Book request"}</h1><p>{request.kind==="swap"?"Exchange conversation":"Purchase conversation"} · {request.status}</p></div><div className="chat-lock"><LockKeyhole size={16}/> Only you and the other reader</div></div>
  {request.status!=="accepted"?<div className="notice">Messaging becomes available after the seller accepts this request.</div>:
  <div className="chat-layout"><div className="chat-main"><div className="message-feed" aria-label="Private messages">{!messages?.length?<div className="chat-start"><MessageSquare size={28}/><h2>Start the conversation</h2><p>Be polite, verify the book's condition, and agree on delivery details.</p></div>:
   messages.map(message=><div key={message.id} className={message.sender_id===user.id?"chat-bubble mine":"chat-bubble"}><span>{message.sender_id===user.id?"You":"Other reader"}</span><p>{message.body}</p><time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</time></div>)}</div>
   <ConversationForm requestId={id}/></div>
   <aside className="chat-tips"><Truck size={22}/><h2>Complete your exchange safely.</h2><p>Confirm the edition and condition. Agree on shipping/pickup and payment using trusted methods. Xchange One does not currently collect payments, issue tracking IDs or guarantee fulfillment.</p><p>Do not share OTPs, passwords or banking credentials.</p></aside>
  </div>}
 </main>;
}
