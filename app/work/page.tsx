'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/Reveal'

const CASES = [
  {n:'01',tag:'Azure AI · Banking & Finance',t:'Automated Loan Processing Agent',color:'#d4920a',summary:'2,400+ applications/day. 14-person manual team. 4.2 days average. We fixed all three.',challenge:'A major private bank processing 2,400+ loan applications daily through a 14-person manual review team. Average processing time: 4.2 days. Error rates climbing. Compliance documentation inconsistent.',solution:'End-to-end Azure AI Foundry agent: extracts application data, validates underwriting rules, scores creditworthiness, routes edge cases to human reviewers with pre-filled summaries, auto-generates compliance documentation.',results:['94% reduction in processing time','78% cost reduction in review operations','Zero compliance violations in 8 months post-launch','Human review only for genuinely complex edge cases'],stack:['Azure AI Foundry','Azure OpenAI','Document Intelligence','Semantic Kernel']},
  {n:'02',tag:'Power Platform · Healthcare',t:'Clinical Workflow Automation',color:'#f0b429',summary:'6 hospital facilities. 6 disconnected systems. Zero integration. Unified in 10 weeks.',challenge:'Hospital group across 6 facilities with zero integration between patient records, scheduling, billing, pharmacy, lab results, and compliance. Staff copying data between systems. 40+ hours monthly compliance reporting.',solution:'Power Automate integration layer connecting all 6 systems. Unified Power Apps dashboard for nursing. Automated billing triggers from discharge events. Real-time compliance monitoring in Power BI.',results:['60% admin time reduction per staff member','Zero compliance gaps since deployment','Billing errors down 91% in first quarter','Compliance reports generated automatically'],stack:['Power Automate','Power Apps','Power BI','Azure Logic Apps','API Management']},
  {n:'03',tag:'Copilot Studio · Retail',t:'Enterprise Knowledge Copilot',color:'#d4920a',summary:'3,400 employees. 8 years of siloed knowledge. 40% YoY ticket growth. Solved on Day 1.',challenge:'Retail enterprise with 3,400+ employees. Knowledge siloed across SharePoint, Teams, Confluence. Support tickets up 40% YoY. New employees taking 6+ weeks to become productive.',solution:'Custom Copilot Studio agent trained on 8 years of internal documentation — HR policies, IT procedures, product knowledge, compliance guides — deployed enterprise-wide on Teams and SharePoint on Day 1.',results:['45% support ticket deflection from Day 1','$280,000 estimated annual savings','Onboarding time reduced from 6 weeks to 3 weeks','HR redirected 30% capacity to strategic work'],stack:['Copilot Studio','SharePoint','Microsoft Teams','Power Automate','Azure AI Search']},
  {n:'04',tag:'AI Strategy · Manufacturing',t:'AI Transformation Roadmap',color:'#f0b429',summary:'$4.2M in identified savings. Phase 1 POC delivered 6 weeks ahead of schedule.',challenge:'Manufacturing group wanting to understand AI value across 4 factories and 2 logistics hubs. No internal AI capability. Needed a clear, prioritized plan with concrete ROI before making any investment.',solution:'12-week engagement: process mining across 6 facilities, workflow analysis, opportunity prioritization, technology selection, business case development. Phase 1 POC (predictive maintenance) delivered in week 8.',results:['23 automation opportunities identified','$4.2M annualized savings across all initiatives','Phase 1 POC live in week 8 (6 weeks ahead)','Board-approved AI investment program initiated'],stack:['Process Mining','Azure ML','Power BI','Azure IoT Hub','Python']},
  {n:'05',tag:'Power BI · Logistics',t:'Unified Operations Intelligence',color:'#d4920a',summary:'14 reporting tools → 1 unified platform. 6 hours of daily reporting → automated.',challenge:'Logistics operator with 14 different reporting tools across operations, finance, and fleet. None integrated. 6+ hours daily manual reporting. No real-time fleet visibility.',solution:'Unified Power BI ecosystem with Azure Synapse backend. Single data model consolidating all 14 source systems. Real-time fleet tracking. Predictive maintenance alerts. Automated stakeholder reporting.',results:['14 tools consolidated into 1 platform','6 hours daily reporting fully eliminated','23% vehicle downtime reduction','Real-time visibility across 340 vehicles'],stack:['Power BI','Azure Synapse','Data Factory','Azure ML','Azure IoT Hub']},
  {n:'06',tag:'MCT Training · Technology',t:'Enterprise Developer Enablement',color:'#f0b429',summary:'320 developers. 8 countries. 90 days. 97% certification pass rate.',challenge:'Global software firm needing 320 developers across 8 countries trained on Azure AI and Power Platform within 90 days. Previous standard training providers had failed to create measurable competency.',solution:'Custom 3-track bootcamp curriculum (Beginner / Intermediate / Advanced). 12 modules. Real use-case POC sessions using scenarios from the client\'s own codebase. Live virtual sessions with recording access.',results:['320 developers trained in 90 days','97% certification pass rate (vs 64% industry avg)','All participants deployed one production automation within 30 days','12 new internal AI tools built within 60 days'],stack:['Azure AI','Power Platform','Copilot Studio','.NET / C#','Azure DevOps']},
]

const TESTIS = [
  {q:"Shastra AI didn't pitch us a solution — they built one in the first meeting. The POC they showed on Day 1 became our production system. That's the difference.",a:'VP of Digital Transformation',r:'Private Banking Group, India'},
  {q:"We've worked with 3 AI consulting firms before Shastra AI. None left us with working systems. These guys left us with a fully operational agent and a team that can maintain it.",a:'CTO',r:'Healthcare Technology Company, UAE'},
  {q:"The Power Platform training was unlike anything we'd experienced. Real use cases, real code, real solutions. Our team went from zero to production workflows in 5 days.",a:'Head of IT Operations',r:'Manufacturing Enterprise, Germany'},
  {q:"The AI strategy engagement was worth every rupee. We went from 'AI sounds interesting' to a clear roadmap with ROI for every initiative. Phase 1 is already delivering.",a:'CEO',r:'Logistics Technology Group, Singapore'},
  {q:"I've trained with MCTs globally. The depth of real-world application in Shastra AI's training is genuinely different. You leave with code you can actually deploy.",a:'Senior Azure Architect',r:'Global Software Company, UK'},
  {q:"The Copilot Studio agent deflects 45% of our support tickets — and that number is now at 68% after 6 months. The system keeps getting smarter.",a:'Director of Customer Operations',r:'Retail Enterprise, India'},
]

function CaseCard({ c }: { c: typeof CASES[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="work-card" style={{borderRadius:'24px',background:'rgba(17,15,34,0.5)',overflow:'hidden'}}>
      <div style={{height:'2px',background:`linear-gradient(90deg,${c.color},transparent)`,opacity: open?1:0.4,transition:'opacity 0.3s'}}/>
      <div className="p-8">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="label-mono mb-2" style={{fontSize:'0.58rem',color:c.color}}>{c.tag}</div>
            <h3 className="display-serif" style={{fontSize:'1.35rem',lineHeight:1.2}}>{c.t}</h3>
          </div>
          <div className="ticker" style={{fontSize:'3.5rem',color:'rgba(212,146,10,0.08)',lineHeight:1}}>{c.n}</div>
        </div>
        <p className="mb-6 text-sm leading-relaxed" style={{color:'var(--warm)',opacity:0.65}}>{c.summary}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {c.results.slice(0,2).map(r=>(
            <span key={r} className="label-mono px-3 py-1.5 rounded-full" style={{fontSize:'0.58rem',background:`${c.color}10`,border:`1px solid ${c.color}20`,color:c.color}}>→ {r}</span>
          ))}
        </div>
        <button onClick={()=>setOpen(!open)} className="label-mono flex items-center gap-2 transition-colors duration-200" style={{fontSize:'0.6rem',color: open?c.color:'rgba(200,184,154,0.35)'}}>
          {open?'Close case study':'Read full case study'}
          <motion.span animate={{rotate:open?180:0}} transition={{duration:0.3}}>↓</motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              transition={{duration:0.4,ease:[0.16,1,0.3,1]}} className="overflow-hidden">
              <div className="mt-8 pt-8 space-y-5" style={{borderTop:`1px solid ${c.color}15`}}>
                <div><div className="label-mono mb-2" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.35)'}}>Challenge</div><p className="text-sm leading-relaxed" style={{color:'rgba(245,237,224,0.6)'}}>{c.challenge}</p></div>
                <div><div className="label-mono mb-2" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.35)'}}>Solution</div><p className="text-sm leading-relaxed" style={{color:'rgba(245,237,224,0.6)'}}>{c.solution}</p></div>
                <div><div className="label-mono mb-2" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.35)'}}>Results</div>
                  {c.results.map(r=><div key={r} className="text-sm mb-1.5" style={{color:'rgba(245,237,224,0.65)'}}><span style={{color:c.color}}>→ </span>{r}</div>)}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map(s=><span key={s} className="label-mono px-2.5 py-1 rounded-full" style={{fontSize:'0.55rem',background:`${c.color}08`,border:`1px solid ${c.color}20`,color:c.color}}>{s}</span>)}
                </div>
                <Link href="/contact" className="label-mono inline-flex items-center gap-2 px-5 py-3 rounded-full transition-colors" style={{background:`${c.color}10`,border:`1px solid ${c.color}25`,color:c.color,fontSize:'0.6rem'}} onClick={e=>e.stopPropagation()}>Need a similar result? →</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function WorkPage() {
  return (
    <div className="page-in">
      <section className="pt-44 pb-20 px-8 md:px-16" style={{borderBottom:'1px solid rgba(212,146,10,0.1)',background:'var(--ink)'}}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="label-mono stag mb-5">Case Studies</div></Reveal>
          <Reveal delay={0.1}><h1 className="display-giant mb-5" style={{fontSize:'clamp(3.5rem,9vw,10rem)'}}>Our Work</h1></Reveal>
          <Reveal delay={0.2}><p style={{color:'var(--warm)',fontSize:'1.1rem',maxWidth:'540px',lineHeight:1.7,opacity:0.7}}>Every project started with a specific business problem — not a technology. Here's what we built and what it achieved.</p></Reveal>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16" style={{background:'var(--void)'}}>
        <div className="max-w-7xl mx-auto">
          <p className="label-mono text-warm/30 mb-8" style={{fontSize:'0.6rem'}}>Click any card to expand the full case study →</p>
          <div className="grid md:grid-cols-2 gap-4">
            {CASES.map((c,i)=><Reveal key={c.n} delay={i*0.06}><CaseCard c={c}/></Reveal>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-16" style={{background:'var(--ink)',borderTop:'1px solid rgba(212,146,10,0.08)'}}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="label-mono stag mb-5">Testimonials</div></Reveal>
          <Reveal delay={0.1}><h2 className="display-serif mb-14" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>What clients<br/><span className="gold-text">actually say</span></h2></Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIS.map((t,i)=>(
              <Reveal key={i} delay={i*0.07}>
                <div className="testi p-7 h-full flex flex-col" style={{background:'rgba(17,15,34,0.4)',borderRadius:'0 20px 20px 0'}}>
                  <div className="display-serif text-4xl mb-4 leading-none" style={{color:'rgba(212,146,10,0.25)'}}>"</div>
                  <div className="flex gap-0.5 mb-4">{Array(5).fill(0).map((_,s)=><span key={s} className="text-gold text-xs">★</span>)}</div>
                  <p className="text-sm leading-relaxed italic flex-1 mb-5" style={{color:'var(--warm)',opacity:0.7}}>{t.q}</p>
                  <div>
                    <div className="font-semibold text-sm" style={{color:'var(--cream)'}}>{t.a}</div>
                    <div className="label-mono mt-1" style={{fontSize:'0.58rem',color:'rgba(200,184,154,0.4)'}}>{t.r}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 text-center" style={{background:'var(--void)'}}>
        <div className="max-w-xl mx-auto">
          <Reveal><h2 className="display-serif mb-5" style={{fontSize:'clamp(2rem,4vw,3rem)'}}>Need a similar result?<br/><span className="gold-text">Let's build it.</span></h2></Reveal>
          <Reveal delay={0.1}><Link href="/contact" className="btn-gold px-10 py-5 text-base rounded-full inline-flex items-center gap-2">Start a Conversation →</Link></Reveal>
        </div>
      </section>
    </div>
  )
}
