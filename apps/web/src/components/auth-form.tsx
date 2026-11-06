"use client";
import {useState,type FormEvent} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {ArrowRight,BookOpen,LockKeyhole,Mail,UserRound} from "lucide-react";
import {createClient} from "@/lib/supabase/browser";
export function AuthForm({configured}:{configured:boolean}) {
 const router=useRouter();
 const [mode,setMode]=useState<"login"|"signup">("login");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [busy,setBusy]=useState(false);
 const [feedback,setFeedback]=useState("");
 const [ok,setOk]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if(!configured)return;
  setBusy(true);setFeedback("");setOk(false);
  const db=createClient();
  try{
   if(mode==="login"){
    const {error}=await db.auth.signInWithPassword({email,password});
    if(error)throw error;
    router.push("/dashboard");router.refresh();
   }else{
    const {data,error}=await db.auth.signUp({email,password,options:{
      emailRedirectTo:`${window.location.origin}/auth/callback`,data:{display_name:name.trim()||"Reader"}
    }});
    if(error)throw error;
    if(data.session){router.push("/dashboard");router.refresh();}
    else{setOk(true);setFeedback("Check your email for a verification link, then sign in.");}
   }
  }catch(error){setFeedback(error instanceof Error?error.message:"Authentication failed. Please try again.");}
  finally{setBusy(false);}
 }
 return <div className="auth-card"><div className="auth-icon"><BookOpen size={25}/></div><div className="eyebrow">WELCOME TO THE READER'S CLUB</div><h1>{mode==="login"?"Welcome":"Join the"}<br/><em>{mode==="login"?"back.":"community."}</em></h1><p>{mode==="login"?"Sign in to manage your books, offers and exchanges.":"Make some shelf space. Your next great story starts here."}</p>
  <div className="auth-tabs"><button type="button" className={mode==="login"?"active":""} onClick={()=>{setMode("login");setFeedback("")}}>Sign in</button><button type="button" className={mode==="signup"?"active":""} onClick={()=>{setMode("signup");setFeedback("")}}>Create account</button></div>
  <form onSubmit={submit} className="stack-form">
   {mode==="signup"&&<label>Display name<div className="input-wrap"><UserRound size={18}/><input required minLength={2} maxLength={60} value={name} onChange={e=>setName(e.target.value)} placeholder="How should we call you?"/></div></label>}
   <label>Email address<div className="input-wrap"><Mail size={18}/><input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div></label>
   <label>Password<div className="input-wrap"><LockKeyhole size={18}/><input type="password" required minLength={6} autoComplete={mode==="login"?"current-password":"new-password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></div></label>
   {feedback&&<p role="status" className={ok?"form-success":"form-error"}>{feedback}</p>}
   {!configured&&<p className="form-note">Preview mode: account creation is disabled until Supabase is connected.</p>}
   <button type="submit" className="primary-btn full-btn" disabled={!configured||busy}>{busy?"Working...":mode==="login"?"Sign in":"Create my account"}<ArrowRight size={18}/></button>
  </form>
  <div className="auth-footer">Your books. Your space. Your next chapter. <Link href="/explore">Explore first ↗</Link></div>
 </div>;
}
