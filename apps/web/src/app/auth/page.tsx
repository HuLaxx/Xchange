import type {Metadata} from "next";
import {AuthForm} from "@/components/auth-form";
import {isConfigured} from "@/lib/supabase/config";
export const metadata:Metadata={title:"Sign in or join"};
export default function Auth(){return <main className="auth-layout"><div className="auth-illustration"><div className="eyebrow light-eyebrow">THE READER'S SPACE</div><h2>Stories are better<br/>when they're <em>shared.</em></h2><div className="auth-quote">“A reader lives a thousand lives before he dies.”</div><div className="auth-art-book">STORIES<br/>TRAVEL<br/>FARTHER<span>✳</span></div></div><AuthForm configured={isConfigured()}/></main>}
