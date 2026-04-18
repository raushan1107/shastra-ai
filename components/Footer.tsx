'use client'
import Link from 'next/link'

export default function Footer() {
  const cols = {
    Navigation: [{l:'Home',h:'/'},{l:'Services',h:'/services'},{l:'About Us',h:'/about'},{l:'Our Work',h:'/work'},{l:'Contact',h:'/contact'}],
    Services: [{l:'Azure AI Agents',h:'/services'},{l:'Power Platform',h:'/services'},{l:'AI Strategy',h:'/services'},{l:'MCT Training',h:'/services'},{l:'.NET / Qt Dev',h:'/services'}],
    Connect: [{l:'ask.shastraai@gmail.com',h:'mailto:ask.shastraai@gmail.com'},{l:'WhatsApp',h:'https://wa.me/918285862455'},{l:'Book a Call',h:'/contact'},{l:'Case Studies',h:'/work'}],
  }
  return (
    <footer style={{background:'var(--ink)',borderTop:'1px solid rgba(212,146,10,0.1)'}}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-10">
        <div className="grid md:grid-cols-4 gap-14 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gold"/>
              </div>
              <span style={{fontFamily:'var(--font-display)',fontWeight:600,letterSpacing:'0.05em',fontSize:'1rem'}}>
                Shastra<span className="text-gold">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{color:'var(--warm)',maxWidth:'240px',opacity:0.7}}>
              Strategic Intelligence for the Enterprise. POC-first. Real results. MCT-certified expertise.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="label-mono text-warm/40" style={{fontSize:'0.58rem'}}>All Systems Operational</span>
            </div>
          </div>
          {Object.entries(cols).map(([section,links])=>(
            <div key={section}>
              <div className="label-mono text-gold mb-5" style={{fontSize:'0.6rem'}}>{section}</div>
              <ul className="space-y-3">
                {links.map(l=>(
                  <li key={l.l}><Link href={l.h} className="text-sm hover:text-gold transition-colors duration-200" style={{color:'var(--warm)',opacity:0.6}}>{l.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{borderTop:'1px solid rgba(245,237,224,0.06)'}}>
          <p className="label-mono text-warm/30" style={{fontSize:'0.58rem'}}>© 2026 Shastra AI · Strategic Intelligence for the Enterprise</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"/>
            <span className="label-mono text-gold" style={{fontSize:'0.58rem'}}>shastra.ai</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
