'use client'
import '../styles/globals.css'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Agent from '@/components/Agent'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Shastra AI — Strategic Intelligence for the Enterprise</title>
        <meta name="description" content="Shastra AI builds custom AI agents, automation workflows, and intelligent enterprise systems. Microsoft Certified Trainer. Azure AI. Power Platform. POC-first delivery."/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%23d4920a'/></svg>"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,400&family=Figtree:wght@300;400;500;600&family=Martian+Mono:wght@300;400&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <div id="progress"/>
        <Cursor/>
        <Nav/>
        <main>{children}</main>
        <Footer/>
        <Agent/>
        <script dangerouslySetInnerHTML={{__html:`
          // Scroll progress
          window.addEventListener('scroll',()=>{
            const el=document.getElementById('progress');
            if(!el)return;
            const h=document.body.scrollHeight-window.innerHeight;
            el.style.width=(window.scrollY/Math.max(h,1)*100)+'%';
          },{passive:true});
        `}}/>
      </body>
    </html>
  )
}
