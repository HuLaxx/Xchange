import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
export const metadata:Metadata={
 title:{default:"Xchange One — Pass the story on",template:"%s | Xchange One"},
 description:"Buy, sell and swap pre-loved physical books with readers across India. Discover your next story for less.",
 robots:{index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><Header/>{children}<Footer/></body></html>;
}
