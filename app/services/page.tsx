'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/Reveal'

const SVCS = [
  { id:'azure-ai', n:'01', t:'Azure AI Agent Development', tag:'Azure OpenAI · Semantic Kernel · AI Foundry', color:'#d4920a',
    s:'Autonomous agents that perceive, reason, and act on your enterprise data.',
    l:'We design, build, and deploy fully autonomous AI agents using Azure AI Foundry, Semantic Kernel, and OpenAI. Every agent is built around your specific workflow, trained on your domain data, and shipped as a production-ready system.',
    stack:['Azure AI Foundry','Azure OpenAI','Semantic Kernel','LangChain','Python / C#'],
    uses:['Loan processing automation','HR onboarding agents','Sales intelligence','Document pipelines'] },
  { id:'power', n:'02', t:'Copilot Studio & Power Platform', tag:'Copilot Studio · Power Automate · Power BI', color:'#f0b429',
    s:'Complete Power Platform deployments — not demo tenants. Real environment, real data.',
    l:'We build complete Power Platform ecosystems: Copilot Studio agents trained on your internal knowledge, Power Automate flows connecting your ERP and CRM, Power BI dashboards with live operational intelligence.',
    stack:['Copilot Studio','Power Automate','Power Apps','Power BI','Dataverse'],
    uses:['Enterprise knowledge agents','Approval automation','Live KPI dashboards','Customer portals'] },
  { id:'cloud', n:'03', t:'Azure Cloud Architecture', tag:'DevOps · Entra ID · AKS · Synapse', color:'#c8b89a',
    s:'Enterprise-grade cloud foundations built to be AI-ready from day one.',
    l:'We design and implement Azure architectures from the ground up — CI/CD pipelines with Azure DevOps, identity management with Entra ID, scalable data platforms with Synapse, container orchestration with AKS.',
    stack:['Azure DevOps','Entra ID','Azure Synapse','AKS','Data Lake','Terraform'],
    uses:['Cloud migration','CI/CD pipelines','Identity modernization','Data lakehouse'] },
  { id:'strategy', n:'04', t:'AI Strategy & Consulting', tag:'Roadmapping · ROI Analysis · Process Mining', color:'#d4920a',
    s:'Clarity before code — ROI-prioritized AI roadmap with a working POC included.',
    l:'Strategic engagements including process mining, ROI modeling for each initiative, technology selection, and change management. We always deliver a working POC before the strategy engagement closes.',
    stack:['Process Mining','ROI Modeling','Azure AI','Power Platform','Workshop Facilitation'],
    uses:['Enterprise AI roadmapping','Build vs buy decisions','Governance frameworks','Capability assessment'] },
  { id:'data', n:'05', t:'Data & Analytics Intelligence', tag:'Power BI · Synapse · Azure ML', color:'#f0b429',
    s:'Scattered enterprise data transformed into unified strategic intelligence.',
    l:'Power BI ecosystems with live Synapse backends, predictive models surfacing anomalies before they become problems, and AI-driven reporting that eliminates manual data gathering entirely.',
    stack:['Power BI','Azure Synapse','Data Factory','Azure ML','Python','SQL Server'],
    uses:['Executive dashboards','Predictive maintenance','Revenue forecasting','Supply chain visibility'] },
  { id:'training', n:'06', t:'Enterprise MCT Training', tag:'Bootcamps · Workshops · Custom Curricula', color:'#c8b89a',
    s:'Microsoft Certified Trainer bootcamps built around your actual tech stack. Real code.',
    l:'As an MCT with 4+ years of certification and 4,000+ enterprise developers trained across 19 countries, our training is genuinely different: real use cases, real code, real systems your team can deploy on Monday.',
    stack:['Azure AI','Power Platform','Copilot Studio','.NET / C#','Qt / QML','Azure DevOps'],
    uses:['Azure AI developer bootcamp','Power Platform intensive','Copilot Studio workshop','Custom multi-day curricula'] },
  { id:'dotnet', n:'07', t:'C# / .NET Development', tag:'ASP.NET · Blazor · WPF · APIs', color:'#d4920a',
    s:'Enterprise .NET applications built to production standards — APIs, Blazor, WPF.',
    l:'High-performance .NET solutions using C# — REST and gRPC APIs, Blazor web applications, WPF and WinForms desktop systems. All built with clean architecture, comprehensive testing, and Azure-ready deployment.',
    stack:['C# / .NET 8','ASP.NET Core','Blazor','WPF / WinForms','Entity Framework'],
    uses:['Enterprise API platforms','Internal tooling','Blazor dashboards','Legacy modernization'] },
  { id:'qt', n:'08', t:'Qt / QML Development', tag:'Qt 6 · QML · C++ · Embedded Linux', color:'#f0b429',
    s:'Cross-platform C++ for industrial, medical, and high-performance environments.',
    l:'High-performance cross-platform applications using Qt 6 and QML — deployable across Windows, Linux, macOS, and embedded Linux. Used in industrial control systems and medical devices where reliability is critical.',
    stack:['Qt 6','QML','C++','CMake','Embedded Linux','OpenGL'],
    uses:['Industrial HMI panels','Medical device UIs','Cross-platform desktop','Embedded Linux apps'] },
  { id:'integration', n:'09', t:'Enterprise Integration', tag:'Logic Apps · API Mgmt · Service Bus', color:'#c8b89a',
    s:'Connect everything. ERP, CRM, HRMS, legacy — unified into a coherent data fabric.',
    l:'Integration architectures connecting disparate enterprise systems — ERP, CRM, HRMS, legacy databases — into a unified data and workflow fabric using Azure Integration Services.',
    stack:['Azure Logic Apps','API Management','Service Bus','Event Grid','Azure Functions'],
    uses:['ERP + CRM sync','Event-driven architecture','Legacy modernization','Multi-cloud connectivity'] },
]

function SvcCard({ s }: { s: typeof SVCS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      onHoverStart={()=>setOpen(true)} onHoverEnd={()=>setOpen(false)}
      className="liquid-border"
      style={{borderRadius:'24px',cursor:'none',background:'linear-gradient(135deg,rgba(17,15,34,0.9),rgba(13,11,26,0.7))'}}
      animate={{ y: open ? -6 : 0, boxShadow: open ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${s.color}10` : '0 0 0 rgba(0,0,0,0)' }}
      transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
    >
      {/* Top accent */}
      <motion.div style={{height:'1px',background:`linear-gradient(90deg,transparent,${s.color},transparent)`,borderRadius:'24px 24px 0 0'}}
        animate={{opacity: open ? 1 : 0.3}} transition={{duration:0.3}}/>

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="label-mono mb-2" style={{fontSize:'0.58rem',color:s.color}}>{s.n}</div>
            <h3 className="display-serif" style={{fontSize:'1.15rem',lineHeight:1.2}}>{s.t}</h3>
          </div>
          <motion.div animate={{rotate: open?45:0}} transition={{duration:0.3}} style={{color: open?s.color:'rgba(245,237,224,0.2)',fontSize:'1.2rem',marginTop:'4px'}}>↗</motion.div>
        </div>

        <div className="label-mono mb-5" style={{fontSize:'0.58rem',color:`${s.color}70`}}>{s.tag}</div>
        <p style={{color:'var(--warm)',fontSize:'0.88rem',lineHeight:1.65,opacity:0.75}}>{s.s}</p>

        <AnimatePresence>
          {open && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              transition={{duration:0.4,ease:[0.16,1,0.3,1]}} className="overflow-hidden">
              <div className="mt-6 pt-6" style={{borderTop:`1px solid ${s.color}15`}}>
                <p style={{color:'rgba(245,237,224,0.65)',fontSize:'0.85rem',lineHeight:1.7,marginBottom:'1.25rem'}}>{s.l}</p>

                <div className="mb-5">
                  <div className="label-mono mb-2" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.4)'}}>Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.stack.map(t=>(
                      <span key={t} className="label-mono px-2.5 py-1 rounded-full" style={{fontSize:'0.55rem',background:`${s.color}10`,border:`1px solid ${s.color}25`,color:s.color}}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="label-mono mb-2" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.4)'}}>Use Cases</div>
                  {s.uses.map(u=>(
                    <div key={u} className="text-sm mb-1" style={{color:'rgba(245,237,224,0.55)'}}>
                      <span style={{color:s.color}}>›</span> {u}
                    </div>
                  ))}
                </div>

                <Link href={`/contact?service=${s.id}`}
                  className="inline-flex items-center gap-2 label-mono px-5 py-3 rounded-full transition-colors duration-300"
                  style={{background:`${s.color}12`,border:`1px solid ${s.color}30`,color:s.color,fontSize:'0.6rem'}}
                  onClick={e=>e.stopPropagation()}>
                  Connect for this service →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <div className="page-in">
      {/* Hero */}
      <section className="pt-44 pb-20 px-8 md:px-16" style={{borderBottom:'1px solid rgba(212,146,10,0.1)',background:'var(--ink)'}}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="label-mono stag mb-5">Capabilities</div></Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-giant mb-5" style={{fontSize:'clamp(3.5rem,9vw,10rem)'}}>
              Services
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{color:'var(--warm)',fontSize:'1.1rem',maxWidth:'560px',lineHeight:1.7,opacity:0.7}}>
              Nine service areas. One approach: understand the exact problem, engineer the exact solution. Hover any card to see the full picture.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-8 md:px-16" style={{background:'var(--void)'}}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SVCS.map((s,i)=>(
            <Reveal key={s.id} delay={i*0.05}><SvcCard s={s}/></Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-16 text-center" style={{background:'var(--ink)',borderTop:'1px solid rgba(212,146,10,0.08)'}}>
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="display-serif mb-5" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Don't see what you need?<br/><span className="gold-text">Tell us.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mb-10 font-light" style={{color:'var(--warm)',fontSize:'1.05rem',opacity:0.7}}>Every engagement is scoped to your specific problem.</p></Reveal>
          <Reveal delay={0.2}><Link href="/contact" className="btn-gold px-10 py-5 text-base rounded-full inline-flex items-center gap-2">Start a Conversation →</Link></Reveal>
        </div>
      </section>
    </div>
  )
}
