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
  <meta name="description" content="We build custom Azure AI agents, Power Platform automation, and intelligent enterprise systems. Founded by Raushan Ranjan — MCT, 38+ Microsoft certifications, 2,900+ professionals trained across 25 countries."/>
  
  {/* Open Graph - controls WhatsApp/LinkedIn/Twitter previews */}
  <meta property="og:title" content="Shastra AI — Strategic Intelligence for the Enterprise"/>
  <meta property="og:description" content="Custom AI agents. Power Platform automation. POC-first delivery. Founded by Microsoft Certified Trainer Raushan Ranjan — 2,900+ professionals trained across 25 countries."/>
  <meta property="og:url" content="https://shastra-ai-by-rrskillverse.vercel.app"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://shastra-ai-by-rrskillverse.vercel.app/og-image.png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:site_name" content="Shastra AI"/>

  {/* Twitter/X card */}
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="Shastra AI — Strategic Intelligence for the Enterprise"/>
  <meta name="twitter:description" content="Custom AI agents. Power Platform automation. POC-first delivery."/>
  <meta name="twitter:image" content="https://shastra-ai-by-rrskillverse.vercel.app/og-image.png"/>

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
