'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Reveal from '@/components/Reveal'

const HeroBg = dynamic(()=>import('@/components/HeroBg'),{ssr:false})

// Terminal
const LINES = ['Initializing Shastra AI...','Azure AI Foundry: connected','Power Platform: operational','2,900+ enterprise professionals trained','MCT certification: verified','Agent intelligence: online']

// Stats — real numbers from Raushan's profile
const STATS = [
  { n:'2,900', suf:'+', l:'Enterprise professionals trained' },
  { n:'25', suf:'+', l:'Countries reached globally' },
  { n:'38', suf:'+', l:'Microsoft certifications held' },
  { n:'10', suf:'+', l:'Years of enterprise expertise' },
]

// Services preview
const SVCS = [
  { n:'01', t:'Azure AI Agents', d:'Autonomous agents built on Azure AI Foundry — integrated with your enterprise data, deployed to production.', tag:'Azure OpenAI · Semantic Kernel · AI Foundry' },
  { n:'02', t:'Power Platform', d:'End-to-end Copilot Studio, Power Automate, Power Apps, Power BI — connected to your real environment.', tag:'Copilot Studio · Power Automate · Dataverse' },
  { n:'03', t:'AI Strategy', d:'Prioritized AI roadmap with ROI calculations. Working POC delivered before full commitment.', tag:'Roadmapping · Process Mining · ROI Analysis' },
  { n:'04', t:'Azure Cloud', d:'Enterprise infrastructure, DevOps pipelines, Entra ID, Azure Synapse — AI-ready from day one.', tag:'Azure DevOps · Entra ID · AKS · Synapse' },
  { n:'05', t:'MCT Training', d:'Certified bootcamps built around your actual tech stack. Real code. Real use cases. Real results.', tag:'Bootcamps · Workshops · Custom Curricula' },
  { n:'06', t:'Enterprise Integration', d:'Connect ERP, CRM, HRMS, and legacy systems through Azure Logic Apps and API Management.', tag:'Logic Apps · API Mgmt · Service Bus' },
]

// Work
const WORK = [
  { tag:'Banking · Azure AI', t:'Loan Processing Agent', r:'94% faster · 78% cost cut', n:'01' },
  { tag:'Healthcare · Power Platform', t:'Clinical Workflow System', r:'60% admin time saved', n:'02' },
  { tag:'Retail · Copilot Studio', t:'Enterprise Knowledge Agent', r:'45% ticket deflection · $280K saved', n:'03' },
  { tag:'Manufacturing · AI Strategy', t:'AI Transformation Roadmap', r:'$4.2M savings identified', n:'04' },
]

function Terminal() {
  const [txt, setTxt] = useState('')
  const [li, setLi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const line = LINES[li]
    const delay = del ? 18 : 52
    const id = setTimeout(() => {
      if (!del) {
        setTxt(line.slice(0, ci+1))
        if (ci+1===line.length) { setTimeout(()=>setDel(true),2000); return }
        setCi(c=>c+1)
      } else {
        setTxt(line.slice(0, ci-1))
        if (ci-1===0) { setDel(false); setLi(i=>(i+1)%LINES.length); setCi(0); return }
        setCi(c=>c-1)
      }
    }, delay)
    return ()=>clearTimeout(id)
  },[txt,li,ci,del])

  return (
    <div style={{background:'rgba(13,11,26,0.92)',border:'1px solid rgba(212,146,10,0.15)',borderRadius:'16px',overflow:'hidden',backdropFilter:'blur(20px)',width:'300px'}}>
      <div className="flex items-center gap-1.5 px-4 py-2.5" style={{borderBottom:'1px solid rgba(212,146,10,0.1)'}}>
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]"/>
        <span className="w-2 h-2 rounded-full bg-[#febc2e]"/>
        <span className="w-2 h-2 rounded-full bg-[#28c840]"/>
        <span className="label-mono ml-2 text-warm/30" style={{fontSize:'0.55rem'}}>shastra-ai · agent-core</span>
      </div>
      <div className="px-4 py-3">
        <span className="label-mono text-warm/30 mr-1" style={{fontSize:'0.65rem'}}>$</span>
        <span className="label-mono text-gold" style={{fontSize:'0.65rem'}}>{txt}</span>
        <span className="inline-block w-1.5 h-3 bg-gold ml-0.5 animate-pulse align-middle"/>
      </div>
    </div>
  )
}

export default function Home() {
  // Count-up
  const statsRef = useRef<HTMLDivElement>(null)
  const [counted, setCounted] = useState(false)
  const [counts, setCounts] = useState(STATS.map(()=>0))

  useEffect(()=>{
    const el = statsRef.current; if(!el) return
    const obs = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && !counted){
        setCounted(true)
        STATS.forEach((s,i)=>{
          const target = parseFloat(s.n.replace(',',''))
          let start:number|null=null
          const step = (ts:number)=>{
            if(!start) start=ts
            const p = Math.min((ts-start)/1800,1)
            const val = Math.floor((1-Math.pow(1-p,3))*target)
            setCounts(c=>{ const nc=[...c]; nc[i]=val; return nc })
            if(p<1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      }
    },{threshold:0.3})
    obs.observe(el)
    return ()=>obs.disconnect()
  },[counted])

  const fmtNum = (i:number) => counts[i].toLocaleString()

  // Letter animation for SHASTRA
  const letters = 'SHASTRA AI'.split('')

  return (
    <div className="page-in">

      {/* ══════════════════════════════════════════════
          HERO — full viewport, split editorial layout
      ══════════════════════════════════════════════ */}
      <section id="hero-wrap" className="relative h-screen overflow-hidden flex flex-col justify-end">
        <HeroBg/>

        {/* Dark vignette on left so text reads */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{background:'linear-gradient(105deg, rgba(6,5,15,0.92) 0%, rgba(6,5,15,0.6) 50%, rgba(6,5,15,0.2) 100%)'}}/>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
          style={{background:'linear-gradient(to top, var(--void), transparent)'}}/>

        {/* ── MAIN HERO CONTENT ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 pb-16">

          {/* Label */}
          <motion.div
            initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
            transition={{delay:0.3,duration:0.8,ease:[0.16,1,0.3,1]}}
            className="label-mono mb-8 flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"/>
            Enterprise AI Intelligence · Operational
          </motion.div>

          {/* GIANT EDITORIAL TITLE */}
          <div style={{perspective:'1000px'}}>
            <h1 className="display-giant gold-text mb-2 leading-none"
              style={{fontSize:'clamp(5rem,13vw,14rem)',display:'block'}}>
              {letters.map((l,i)=>(
                <motion.span
                  key={i}
                  className="hero-letter"
                  style={{animationDelay:`${0.5+i*0.05}s`,display:l===' '?'inline':'inline-block'}}
                >
                  {l===''?' ':l}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{delay:1.2,duration:0.8}}
              className="display-serif mb-10"
              style={{fontSize:'clamp(1.2rem,2.5vw,2.2rem)',color:'var(--warm)',fontWeight:300,maxWidth:'680px',lineHeight:1.3}}
            >
              Strategic Intelligence for the Enterprise —<br/>
              <em style={{fontStyle:'italic',color:'rgba(200,184,154,0.6)',fontWeight:300}}>founded by Raushan Ranjan · MCT · 38+ certifications · 2,900+ professionals trained</em>
            </motion.p>
          </div>

          {/* CTAs + Terminal side by side */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <motion.div
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
              transition={{delay:1.3,duration:0.7}}
              className="flex gap-3 flex-wrap"
            >
              <Link href="/contact" className="btn-gold px-8 py-4 text-sm rounded-full inline-flex items-center gap-2">
                Deploy Intelligence <span>→</span>
              </Link>
              <Link href="/work" className="btn-ghost px-8 py-4 text-sm rounded-full inline-flex items-center gap-2">
                View Case Studies
              </Link>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>
              <Terminal/>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue — right edge */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
          className="absolute bottom-10 right-16 z-10 flex flex-col items-center gap-3"
        >
          <span className="label-mono text-gold/30" style={{fontSize:'0.55rem',writingMode:'vertical-rl'}}>SCROLL · SHAPE MORPHS</span>
          <motion.div animate={{scaleY:[0.3,1,0.3]}} transition={{duration:2.4,repeat:Infinity}}
            className="w-px h-14" style={{background:'linear-gradient(to bottom, var(--gold), transparent)'}}/>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS — Bloomberg terminal aesthetic
      ══════════════════════════════════════════════ */}
      <div ref={statsRef} style={{borderTop:'1px solid rgba(212,146,10,0.1)',borderBottom:'1px solid rgba(212,146,10,0.1)',background:'var(--ink)'}}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4" style={{gap:0}}>
          {STATS.map((s,i)=>(
            <Reveal key={s.l} delay={i*0.07}>
              <div className="px-10 py-16 text-center liquid-border group" style={{borderLeft:i>0?'1px solid rgba(212,146,10,0.08)':'none'}}>
                <div className="ticker leading-none mb-3" style={{fontSize:'clamp(3rem,5vw,4.5rem)',color:'var(--gold-light)'}}>
                  {fmtNum(i)}<span style={{fontSize:'0.45em',color:'var(--gold)'}}>{s.suf}</span>
                </div>
                <div className="label-mono text-warm/40" style={{fontSize:'0.6rem'}}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ABOUT — large editorial statement
      ══════════════════════════════════════════════ */}
      <section className="py-36 px-8 md:px-16" style={{background:'var(--void)'}}>
        <div className="max-w-7xl mx-auto">
          {/* Giant pull quote */}
          <Reveal>
            <p className="display-giant mb-16"
              style={{fontSize:'clamp(2.4rem,5vw,5rem)',lineHeight:1.05,color:'var(--cream)',maxWidth:'900px'}}>
              "Enterprises don't need more{' '}
              <span className="gold-text">theory.</span>{' '}
              They need AI that{' '}
              <em>actually solves</em>{' '}
              their problems."
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <div className="label-mono stag mb-6">Our Approach</div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-serif mb-6" style={{fontSize:'clamp(2rem,3.5vw,3.2rem)'}}>
                  POC-First.<br/>Always.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-5 leading-relaxed" style={{color:'var(--warm)',fontSize:'1.05rem',opacity:0.8}}>
                  Shastra AI is led by <strong style={{color:'var(--cream)'}}>Raushan Ranjan</strong> — an MCT with <strong style={{color:'var(--cream)'}}>38+ Microsoft certifications</strong>, who has trained 2,900+ enterprise professionals at Nokia, TCS, Deloitte, Microsoft, KPMG, Wipro, Cognizant, Capgemini, and ING Global across 25+ countries.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mb-8 leading-relaxed" style={{color:'var(--warm)',fontSize:'1.05rem',opacity:0.8}}>
                  Every engagement starts with a <strong style={{color:'var(--cream)'}}>working POC built around your real use case</strong> — not a slide deck or a demo environment.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-2">
                  {['MCT · 38+ Certifications','Azure AI Engineer','Power Platform Dev','Copilot Studio','.NET / C#','Qt / QML'].map(t=>(
                    <span key={t} className="label-mono px-3 py-1.5 rounded-full" style={{fontSize:'0.6rem',border:'1px solid rgba(212,146,10,0.2)',color:'var(--gold)',background:'rgba(212,146,10,0.06)'}}>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Process steps — vertical timeline aesthetic */}
            <div className="space-y-0">
              {[
                {n:'01',t:'Understand the real problem',s:'Deep discovery — not pitching.'},
                {n:'02',t:'Design the right architecture',s:'Right stack for your context.'},
                {n:'03',t:'Build a working POC',s:'Live proof before you commit.'},
                {n:'04',t:'Deploy & enable your team',s:'You own it. Permanently.'},
              ].map((step,i)=>(
                <Reveal key={step.n} delay={i*0.08}>
                  <div className="flex gap-6 py-7 liquid-border group" style={{borderLeft:'none',borderRight:'none',borderTop:'none',borderRadius:0}}>
                    <div className="ticker text-4xl leading-none w-14 shrink-0 group-hover:text-gold transition-colors duration-300" style={{color:'rgba(212,146,10,0.2)'}}>
                      {step.n}
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{color:'var(--cream)',fontSize:'0.95rem'}}>{step.t}</div>
                      <div className="label-mono text-warm/40" style={{fontSize:'0.6rem'}}>{step.s}</div>
                    </div>
                    <div className="ml-auto text-warm/20 group-hover:text-gold transition-colors">→</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES — horizontal film strip
      ══════════════════════════════════════════════ */}
      <section className="py-28 overflow-hidden" style={{background:'var(--ink)',borderTop:'1px solid rgba(212,146,10,0.08)'}}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 mb-14">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <div className="label-mono stag mb-4">Capabilities</div>
                <h2 className="display-serif" style={{fontSize:'clamp(2.5rem,5vw,4.5rem)'}}>
                  What We<br/><span className="gold-text">Deploy</span>
                </h2>
              </div>
              <Link href="/services" className="btn-ghost px-6 py-3 text-sm rounded-full hidden md:inline-flex items-center gap-2">
                All 9 Services →
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Horizontal scroll strip */}
        <div className="px-8 md:px-16 overflow-x-auto pb-6" style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>
          <div className="film-track" style={{minWidth:'max-content'}}>
            {SVCS.map((s,i)=>(
              <Reveal key={s.n} delay={i*0.06}>
                <Link href="/services" className="svc-panel block p-8" style={{borderRadius:'24px',minWidth:'320px'}}>
                  <div className="label-mono text-gold mb-3" style={{fontSize:'0.6rem'}}>{s.n}</div>
                  <h3 className="display-serif mb-4" style={{fontSize:'1.3rem'}}>{s.t}</h3>
                  <p className="mb-5 leading-relaxed" style={{color:'var(--warm)',fontSize:'0.88rem',opacity:0.7}}>{s.d}</p>
                  <div className="label-mono" style={{fontSize:'0.58rem',color:'rgba(212,146,10,0.5)'}}>{s.tag}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WORK — asymmetric grid
      ══════════════════════════════════════════════ */}
      <section className="py-32 px-8 md:px-16" style={{background:'var(--void)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <Reveal>
              <div>
                <div className="label-mono stag mb-4">Results</div>
                <h2 className="display-serif" style={{fontSize:'clamp(2.5rem,5vw,4.5rem)'}}>
                  Real Work.<br/><span className="gold-text">Real Impact.</span>
                </h2>
              </div>
            </Reveal>
          </div>

          {/* 2+2 grid with one big card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large card */}
            <Reveal className="md:col-span-2">
              <Link href="/work" className="work-card block p-10 h-full" style={{borderRadius:'24px',background:'rgba(17,15,34,0.5)',minHeight:'280px',position:'relative',overflow:'hidden'}}>
                <div className="absolute bottom-8 right-10 ticker" style={{fontSize:'8rem',color:'rgba(212,146,10,0.04)',lineHeight:1}}>01</div>
                <div className="label-mono text-gold mb-5" style={{fontSize:'0.6rem'}}>{WORK[0].tag}</div>
                <h3 className="display-serif mb-5" style={{fontSize:'1.8rem'}}>{WORK[0].t}</h3>
                <div className="label-mono" style={{fontSize:'0.68rem',color:'var(--gold-light)'}}>{WORK[0].r}</div>
              </Link>
            </Reveal>
            {/* Small cards */}
            <div className="space-y-4">
              {WORK.slice(1,3).map((w,i)=>(
                <Reveal key={w.n} delay={(i+1)*0.08}>
                  <Link href="/work" className="work-card block p-7" style={{borderRadius:'20px',background:'rgba(17,15,34,0.5)',position:'relative',overflow:'hidden'}}>
                    <div className="absolute bottom-4 right-6 ticker" style={{fontSize:'4rem',color:'rgba(212,146,10,0.04)',lineHeight:1}}>{w.n}</div>
                    <div className="label-mono text-gold mb-3" style={{fontSize:'0.58rem'}}>{w.tag}</div>
                    <h3 className="font-semibold mb-3" style={{fontSize:'0.95rem',color:'var(--cream)'}}>{w.t}</h3>
                    <div className="label-mono" style={{fontSize:'0.62rem',color:'var(--gold-light)'}}>{w.r}</div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Link href="/work" className="btn-ghost px-8 py-4 text-sm rounded-full inline-flex items-center gap-2">
                View All Case Studies →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — oversized editorial
      ══════════════════════════════════════════════ */}
      <section className="py-36 px-8 md:px-16 relative overflow-hidden" style={{background:'var(--ink)',borderTop:'1px solid rgba(212,146,10,0.1)'}}>
        <div className="absolute inset-0 pointer-events-none"
          style={{background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,146,10,0.05), transparent)'}}/>
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="display-giant select-none" style={{fontSize:'clamp(8rem,20vw,22rem)',color:'rgba(212,146,10,0.03)',lineHeight:1,whiteSpace:'nowrap'}}>SHASTRA</span>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="label-mono stag mb-6 justify-center flex items-center gap-3">
              <span>Ready to Begin</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-giant mb-6"
              style={{fontSize:'clamp(3rem,7vw,8rem)',color:'var(--cream)'}}>
              Let's build<br/><span className="gold-text">something real.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-12 font-light" style={{color:'var(--warm)',fontSize:'1.15rem',opacity:0.7,maxWidth:'480px',margin:'0 auto 3rem'}}>
              Tell us your challenge. We'll respond with a working POC scope — not a generic sales deck.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-gold px-10 py-5 text-base rounded-full inline-flex items-center gap-3">
                Start a Conversation <span>→</span>
              </Link>
              <Link href="/services" className="btn-ghost px-10 py-5 text-base rounded-full">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
