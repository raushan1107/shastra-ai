'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/Reveal'

const SERVICES = ['Azure AI Agent Development','Copilot Studio / Power Platform','Azure Cloud Architecture','AI Strategy & Consulting','Data & Analytics Intelligence','Enterprise MCT Training','.NET / C# Development','Qt / QML Development','Enterprise Integration','Something else']
const BUDGETS = ['Under ₹5L / $6K','₹5–15L / $6K–$18K','₹15–50L / $18K–$60K','₹50L+ / $60K+','Let\'s discuss']
const TIMELINES = ['ASAP','Within 1 month','1–3 months','3–6 months','Just exploring']

export default function ContactPage() {
  const [form, setForm] = useState({name:'',email:'',company:'',phone:'',service:'',budget:'',timeline:'',message:'',via:'email' as 'email'|'whatsapp'|'both'})
  const [files, setFiles] = useState<File[]>([])
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const onDrop = useCallback((acc: File[]) => setFiles(p=>[...p,...acc].slice(0,5)),[])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxSize:10*1024*1024, accept:{'application/pdf':['.pdf'],'image/*':['.png','.jpg','.jpeg'],'application/msword':['.doc','.docx'],'text/plain':['.txt']} })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p=>({...p,[k]:e.target.value}))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true); setErr('')
    try {
      const body = new FormData()
      Object.entries(form).forEach(([k,v])=>body.append(k,v))
      files.forEach(f=>body.append('files',f))
      const res = await fetch('/api/contact',{method:'POST',body})
      const d = await res.json()
      if(d.ok){
        setDone(true)
        if(form.via==='whatsapp'||form.via==='both'){
          const msg = encodeURIComponent(`Hi! I'm ${form.name} from ${form.company}.\n\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nRequirement:\n${form.message}\n\nEmail: ${form.email}`)
          setTimeout(()=>window.open(`https://wa.me/918285862455?text=${msg}`,'_blank'),800)
        }
      } else setErr(d.message||'Failed. Please email hello@shastra.ai directly.')
    } catch { setErr('Network error. Please email hello@shastra.ai') }
    setSending(false)
  }

  const ic = "inp w-full px-5 py-4 text-sm"
  const lc = "label-mono block mb-2" as const

  return (
    <div className="page-in">
      {/* Hero */}
      <section className="pt-44 pb-20 px-8 md:px-16" style={{borderBottom:'1px solid rgba(212,146,10,0.1)',background:'var(--ink)'}}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="label-mono stag mb-5">Get in Touch</div></Reveal>
          <Reveal delay={0.1}><h1 className="display-giant mb-5" style={{fontSize:'clamp(3rem,8vw,9rem)'}}>Let's build<br/><span className="gold-text">something real.</span></h1></Reveal>
          <Reveal delay={0.2}><p style={{color:'var(--warm)',fontSize:'1.1rem',maxWidth:'500px',lineHeight:1.7,opacity:0.7}}>Tell us your challenge. We'll respond with a working POC scope — not a generic sales deck.</p></Reveal>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16" style={{background:'var(--void)'}}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16">

          {/* Left: info */}
          <div className="md:col-span-2">
            <Reveal><div className="label-mono stag mb-8">Contact Details</div></Reveal>
            <div className="space-y-4 mb-10">
              {[
                {icon:'📧',l:'Email',v:'ask.shastraai@gmail.com',h:'mailto:ask.shastraai@gmail.com'},
                {icon:'💬',l:'WhatsApp',v:'+91 82858 62455',h:'https://wa.me/918285862455'},
                {icon:'⚡',l:'Response',v:'Within 24h — typically same day',h:null},
                {icon:'🌍',l:'Timezone',v:'IST · Global async-friendly',h:null},
                {icon:'🤝',l:'First Call',v:'Free 60-min discovery. No commitment.',h:null},
              ].map((item,i)=>(
                <Reveal key={item.l} delay={i*0.06}>
                  <div className="liquid-border flex gap-4 items-start p-5" style={{borderRadius:'18px',background:'rgba(17,15,34,0.5)'}}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0" style={{background:'rgba(212,146,10,0.1)',border:'1px solid rgba(212,146,10,0.2)'}}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="label-mono mb-1" style={{fontSize:'0.58rem',color:'rgba(200,184,154,0.4)'}}>{item.l}</div>
                      {item.h
                        ? <a href={item.h} target="_blank" rel="noreferrer" className="text-sm hover:text-gold transition-colors" style={{color:'var(--cream)'}}>{item.v}</a>
                        : <div className="text-sm" style={{color:'var(--cream)'}}>{item.v}</div>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="liquid-border p-6" style={{borderRadius:'20px',background:'rgba(17,15,34,0.5)'}}>
                <div className="label-mono text-gold mb-5" style={{fontSize:'0.6rem'}}>How it works</div>
                {['Submit form or message us','Response within 24h with call invite','Free 60-min discovery call','Proposal + POC scope in 48h','POC phase — see results first'].map((s,i)=>(
                  <div key={s} className="flex gap-4 mb-4 last:mb-0">
                    <div className="label-mono text-gold/40 w-5 shrink-0" style={{fontSize:'0.6rem'}}>0{i+1}</div>
                    <div className="text-sm" style={{color:'var(--warm)',opacity:0.65}}>{s}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="md:col-span-3">
            <Reveal delay={0.1}><div className="label-mono stag mb-8">Send Your Requirement</div></Reveal>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
                  className="text-center py-16" style={{borderRadius:'24px',border:'1px solid rgba(212,146,10,0.25)',background:'rgba(212,146,10,0.04)'}}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6" style={{border:'2px solid rgba(212,146,10,0.4)',background:'rgba(212,146,10,0.08)'}}>✓</div>
                  <h3 className="display-serif text-2xl mb-3 gold-text">Message Received</h3>
                  <p style={{color:'var(--warm)',opacity:0.7}}>We'll be in touch within 24 hours.</p>
                  {(form.via==='whatsapp'||form.via==='both')&&<p className="label-mono text-gold mt-4" style={{fontSize:'0.6rem'}}>Opening WhatsApp...</p>}
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lc} style={{fontSize:'0.58rem'}}>Your Name *</label><input required value={form.name} onChange={set('name')} placeholder="Your name" className={ic} style={{borderRadius:'14px'}}/></div>
                    <div><label className={lc} style={{fontSize:'0.58rem'}}>Company *</label><input required value={form.company} onChange={set('company')} placeholder="Company name" className={ic} style={{borderRadius:'14px'}}/></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lc} style={{fontSize:'0.58rem'}}>Email *</label><input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={ic} style={{borderRadius:'14px'}}/></div>
                    <div><label className={lc} style={{fontSize:'0.58rem'}}>Phone / WhatsApp</label><input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" className={ic} style={{borderRadius:'14px'}}/></div>
                  </div>

                  <div><label className={lc} style={{fontSize:'0.58rem'}}>Service Area *</label>
                    <select required value={form.service} onChange={set('service')} className={ic} style={{borderRadius:'14px',appearance:'none'}}>
                      <option value="">Select service...</option>
                      {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lc} style={{fontSize:'0.58rem'}}>Budget Range</label>
                      <select value={form.budget} onChange={set('budget')} className={ic} style={{borderRadius:'14px',appearance:'none'}}>
                        <option value="">Select...</option>{BUDGETS.map(b=><option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div><label className={lc} style={{fontSize:'0.58rem'}}>Timeline</label>
                      <select value={form.timeline} onChange={set('timeline')} className={ic} style={{borderRadius:'14px',appearance:'none'}}>
                        <option value="">Select...</option>{TIMELINES.map(t=><option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div><label className={lc} style={{fontSize:'0.58rem'}}>Describe Your Challenge *</label>
                    <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="What problem are you solving? What does success look like? What's your current process? The more detail, the better." className={ic} style={{borderRadius:'14px',resize:'vertical'}}/>
                  </div>

                  {/* File upload */}
                  <div>
                    <label className={lc} style={{fontSize:'0.58rem'}}>Reference Documents (Optional)</label>
                    <div {...getRootProps()} className={`border rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer ${isDragActive?'border-gold bg-gold/5':'border-border2 hover:border-gold/30'}`} style={{border:`1px dashed ${isDragActive?'var(--gold)':'rgba(245,237,224,0.1)'}`}}>
                      <input {...getInputProps()}/>
                      <div className="text-2xl mb-2">📎</div>
                      <div className="text-sm mb-1" style={{color:'var(--warm)',opacity:0.6}}>{isDragActive?'Drop files here...':'Drag & drop, or click to browse'}</div>
                      <div className="label-mono" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.3)'}}>PDF · DOCX · PNG · JPG · Max 10MB · Up to 5 files</div>
                    </div>
                    {files.length>0&&<div className="mt-3 space-y-2">
                      {files.map((f,i)=>(
                        <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl" style={{background:'rgba(17,15,34,0.8)',border:'1px solid rgba(212,146,10,0.1)'}}>
                          <div className="flex items-center gap-3">
                            <span>📄</span>
                            <span className="text-sm truncate max-w-xs" style={{color:'var(--warm)',opacity:0.7}}>{f.name}</span>
                            <span className="label-mono" style={{fontSize:'0.55rem',color:'rgba(200,184,154,0.3)'}}>{(f.size/1024).toFixed(0)}KB</span>
                          </div>
                          <button type="button" onClick={()=>setFiles(p=>p.filter((_,j)=>j!==i))} className="text-warm/30 hover:text-cream transition-colors text-sm">✕</button>
                        </div>
                      ))}
                    </div>}
                  </div>

                  {/* Via selector */}
                  <div>
                    <label className={lc} style={{fontSize:'0.58rem'}}>How should we respond?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['email','whatsapp','both'] as const).map(v=>(
                        <button key={v} type="button" onClick={()=>setForm(p=>({...p,via:v}))}
                          className="py-3 text-sm label-mono rounded-2xl transition-all duration-200"
                          style={{border:`1px solid ${form.via===v?'rgba(212,146,10,0.5)':'rgba(245,237,224,0.07)'}`,background:form.via===v?'rgba(212,146,10,0.08)':'transparent',color:form.via===v?'var(--gold)':'rgba(200,184,154,0.35)',fontSize:'0.58rem'}}>
                          {v==='email'?'📧 Email':v==='whatsapp'?'💬 WhatsApp':'⚡ Both'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {err&&<div className="px-5 py-4 rounded-2xl text-sm" style={{border:'1px solid rgba(239,68,68,0.3)',background:'rgba(239,68,68,0.06)',color:'rgba(252,165,165,0.8)'}}>{err}</div>}

                  <motion.button type="submit" disabled={sending} whileHover={{scale:1.01}} whileTap={{scale:0.98}}
                    className="w-full py-5 text-base font-semibold rounded-2xl transition-all disabled:opacity-50 btn-gold">
                    {sending?<span className="flex items-center justify-center gap-3">
                      <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin"/>Sending...
                    </span>:`Send via ${form.via==='email'?'Email':form.via==='whatsapp'?'WhatsApp':'Email & WhatsApp'} →`}
                  </motion.button>
                  <p className="label-mono text-center" style={{fontSize:'0.58rem',color:'rgba(200,184,154,0.3)'}}>Response within 24h. Your details are never shared.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
