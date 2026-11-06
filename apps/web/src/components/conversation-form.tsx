"use client";
import {useActionState} from "react";
import {Send} from "lucide-react";
import {sendMessageAction,type ActionState} from "@/app/actions";
const initial:ActionState={error:""};
export function ConversationForm({requestId}:{requestId:string}){
 const [state,action,pending]=useActionState(sendMessageAction,initial);
 return <form className="conversation-form" action={action}><input type="hidden" name="request_id" value={requestId}/>
  <label htmlFor="chat-message">Write a private message to the other reader</label>
  <textarea id="chat-message" name="body" rows={3} maxLength={1200} placeholder="Hi! Let's arrange a safe way to ship or hand over our books." required/>
  {state.error&&<p className="form-error" role="alert">{state.error}</p>}
  {state.success&&<p className="form-success" role="status">{state.success}</p>}
  <button type="submit" className="primary-btn" disabled={pending}>Send message <Send size={17}/></button>
 </form>;
}
