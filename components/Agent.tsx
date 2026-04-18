'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const SYSTEM = `You are the official AI assistant for Shastra AI (shastra.ai). You ONLY answer questions about Shastra AI. For anything unrelated, politely redirect to Shastra AI topics.

== COMPANY ==
Name: Shastra AI
Tagline: Strategic Intelligence for the Enterprise
Type: Boutique enterprise AI solutions firm
Approach: POC-first — we always build a working proof of concept before full commitment. No slide decks. No generic demos.

== FOUNDER & CEO ==
Name: Raushan Ranjan
Title: Founder & CEO, Shastra AI
Background:
- 10+ years in enterprise technology
- Microsoft Certified Trainer (MCT) — one of fewer than 6,000 active MCTs globally
- 38+ Microsoft certifications including PL-300, AZ-204, AI-102, Copilot Studio, CCNA
- Trained 2,900+ enterprise professionals across 25+ countries
- Clients include: Nokia, TCS, Deloitte, Microsoft, KPMG, Wipro, Cognizant, Capgemini, ING Global, and many more
- Founder of RR Skillverse — enterprise-grade technology education platform
- Based in Noida, India. Active on LinkedIn: linkedin.com/in/raushanranjan

== SERVICES (9 total) ==
1. Azure AI Agent Development — autonomous agents on Azure AI Foundry, Azure OpenAI, Semantic Kernel
2. Copilot Studio & Power Platform — Power Apps, Power Automate, Power BI, Power Pages, Dataverse
3. Azure Cloud Architecture — DevOps, Entra ID, AKS, Azure Synapse, Terraform
4. AI Strategy & Consulting — roadmapping, ROI analysis, process mining, opportunity identification
5. Data & Analytics Intelligence — Power BI, Synapse, ML, real-time intelligence pipelines
6. Enterprise MCT Training — custom bootcamps, workshops, certification prep (all levels)
7. C# / .NET Development — ASP.NET Core, Blazor, WPF, WinForms, REST APIs
8. Qt / QML Development — cross-platform C++ desktop and embedded Linux applications
9. Enterprise Integration — Azure Logic Apps, API Management, Service Bus, Event Grid

== PROCESS ==
Step 1: Discovery — deep listening, understand real workflow and pain points
Step 2: Architecture — select right stack for the specific problem
Step 3: POC First — build a working proof of concept before full commitment
Step 4: Deploy & Enable — full deployment + team training so client owns it permanently

== RESULTS / CASE STUDIES ==
- Banking: Loan processing agent → 94% faster, 78% cost reduction, zero compliance violations
- Healthcare: Clinical workflow automation → 60% admin time saved, billing errors down 91%
- Retail: Enterprise Copilot (Copilot Studio) → 45% ticket deflection, $280K annual savings
- Manufacturing: AI transformation roadmap → $4.2M savings identified, Phase 1 live in 8 weeks
- Logistics: Power BI unified dashboard → 14 tools → 1 platform, 6 hours daily reporting eliminated
- Technology: MCT training for 320 developers across 8 countries → 97% certification pass rate

== PRICING ==
- Custom scoping per engagement (no fixed packages)
- Free 60-minute discovery call — no commitment required
- POC phase before full investment
- Response within 24 hours (typically same day)

== CONTACT ==
Email: ask.shastraai@gmail.com
WhatsApp: +91 8285862455
Timezone: IST, async-friendly, global clients welcome
LinkedIn: linkedin.com/in/raushanranjan

== HOW TO GET STARTED ==
1. Fill the contact form at shastra.ai/contact OR
2. Email ask.shastraai@gmail.com OR
3. WhatsApp directly
4. Free 60-min discovery call → proposal + POC scope in 48h → POC phase → full deployment

== YOUR BEHAVIOR ==
- Be warm, direct, and expert-level
- Short answers unless detail is specifically needed
- Always end with a clear next step or CTA
- If someone describes their problem, empathize then suggest the relevant service
- If someone wants to get started, offer to help autofill the contact form
- Never discuss competitors or make claims outside this knowledge base
- If asked anything outside Shastra AI scope: "I can only help with questions about Shastra AI. For that I'd suggest searching online — but if you have any questions about how we can help your enterprise, I'm here!"`

interface Msg { r: 'u' | 'a'; t: string; action?: 'autofill' }

const QUICK = [
  'What services do you offer?',
  'Tell me about the founder',
  'How does the POC process work?',
  'Show me case studies',
  'Help me get started',
]

// Parse autofill intent from response
function extractAutofill(text: string): Record<string, string> | null {
  const lower = text.toLowerCase()
  if (!lower.includes('autofill') && !lower.includes('fill') && !lower.includes('form')) return null
  const fields: Record<string, string> = {}
  const serviceMatch = text.match(/service[:\s]+([^\n.]+)/i)
  if (serviceMatch) fields.service = serviceMatch[1].trim()
  return Object.keys(fields).length ? fields : null
}

export default function Agent() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{
    r: 'a',
    t: "Hello! I'm the Shastra AI assistant. I can answer questions about our services, our founder Raushan Ranjan, our case studies, and how to get started. What would you like to know?"
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAutofill, setShowAutofill] = useState(false)
  const msgsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<{ role: string; content: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [msgs])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const goToContact = useCallback((prefill?: Record<string, string>) => {
    if (prefill) {
      const params = new URLSearchParams(prefill)
      router.push('/contact?' + params.toString())
    } else {
      router.push('/contact')
    }
    setOpen(false)
  }, [router])

  const send = async (text?: string) => {
    const q = (text || input).trim()
    if (!q || loading) return
    setInput('')
    setShowAutofill(false)

    const userMsg: Msg = { r: 'u', t: q }
    setMsgs(p => [...p, userMsg])
    historyRef.current.push({ role: 'user', content: q })
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 600,
          system: SYSTEM,
          messages: historyRef.current,
        }),
      })

      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm having trouble connecting. Please email ask.shastraai@gmail.com directly!"

      historyRef.current.push({ role: 'assistant', content: reply })

      // Check if reply suggests getting started or filling form
      const lowerReply = reply.toLowerCase()
      const suggestsForm = lowerReply.includes('contact') || lowerReply.includes('form') ||
        lowerReply.includes('get started') || lowerReply.includes('discovery call') ||
        lowerReply.includes('fill') || q.toLowerCase().includes('start') ||
        q.toLowerCase().includes('contact') || q.toLowerCase().includes('connect')

      setMsgs(p => [...p, { r: 'a', t: reply }])
      if (suggestsForm) setShowAutofill(true)

    } catch (err) {
      console.error('Agent error:', err)
      setMsgs(p => [...p, {
        r: 'a',
        t: 'I\'m having trouble connecting right now. Please reach us directly at ask.shastraai@gmail.com or WhatsApp +91 8285862455.'
      }])
    }
    setLoading(false)
  }

  // Extract service from conversation for autofill
  const getAutofillData = () => {
    const allText = historyRef.current.map(m => m.content).join(' ').toLowerCase()
    const data: Record<string, string> = {}
    if (allText.includes('azure ai') || allText.includes('agent')) data.service = 'Azure AI Agent Development'
    else if (allText.includes('power platform') || allText.includes('copilot studio')) data.service = 'Copilot Studio / Power Platform'
    else if (allText.includes('strategy') || allText.includes('roadmap')) data.service = 'AI Strategy & Consulting'
    else if (allText.includes('training') || allText.includes('mct')) data.service = 'Enterprise MCT Training'
    else if (allText.includes('azure cloud') || allText.includes('devops')) data.service = 'Azure Cloud Architecture'
    return data
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 180 }}
            className="fixed bottom-24 right-6 z-[900] w-[370px] flex flex-col"
            style={{
              background: 'rgba(13,11,26,0.98)',
              border: '1px solid rgba(212,146,10,0.2)',
              borderRadius: '20px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 60px rgba(212,146,10,0.06)',
              backdropFilter: 'blur(24px)',
              maxHeight: '80vh',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: '1px solid rgba(212,146,10,0.12)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'rgba(212,146,10,0.12)', border: '1px solid rgba(212,146,10,0.3)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" style={{ background: '#d4920a' }} />
                  <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-30" style={{ borderColor: 'rgba(212,146,10,0.2)' }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#f5ede0' }}>Shastra AI Assistant</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(200,184,154,0.4)', textTransform: 'uppercase' }}>
                    ● Online · Powered by Claude
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ color: 'rgba(200,184,154,0.4)', background: 'rgba(255,255,255,0.04)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f5ede0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,184,154,0.4)')}>
                ✕
              </button>
            </div>

            {/* Quick questions */}
            <div className="px-4 py-3 flex flex-wrap gap-1.5 shrink-0" style={{ borderBottom: '1px solid rgba(212,146,10,0.07)' }}>
              {QUICK.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(212,146,10,0.14)', color: 'rgba(200,184,154,0.45)', background: 'transparent', padding: '5px 10px', borderRadius: '100px', cursor: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,146,10,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#d4920a' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,146,10,0.14)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(200,184,154,0.45)' }}>
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div ref={msgsRef} className="flex flex-col gap-3 p-4 overflow-y-auto" style={{ flex: 1, minHeight: '160px', maxHeight: '320px' }}>
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="max-w-[87%] text-sm leading-relaxed"
                  style={{
                    alignSelf: m.r === 'u' ? 'flex-end' : 'flex-start',
                    padding: '10px 14px',
                    borderRadius: m.r === 'u' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.r === 'u' ? '#d4920a' : 'rgba(17,15,34,0.95)',
                    border: m.r === 'a' ? '1px solid rgba(212,146,10,0.12)' : 'none',
                    color: m.r === 'u' ? '#06050f' : '#f5ede0',
                    fontWeight: m.r === 'u' ? 500 : 300,
                  }}>
                  {m.t}
                </motion.div>
              ))}

              {loading && (
                <div style={{ alignSelf: 'flex-start', padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(17,15,34,0.95)', border: '1px solid rgba(212,146,10,0.12)' }}>
                  <div className="flex gap-1.5">
                    {[0, 160, 320].map(d => (
                      <span key={d} className="rounded-full animate-bounce" style={{ width: '5px', height: '5px', background: 'rgba(212,146,10,0.5)', display: 'block', animationDelay: d + 'ms' }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Autofill CTA */}
              {showAutofill && !loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ alignSelf: 'flex-start', padding: '12px 14px', borderRadius: '18px 18px 18px 4px', background: 'rgba(212,146,10,0.08)', border: '1px solid rgba(212,146,10,0.25)' }}>
                  <p style={{ fontSize: '0.8rem', color: '#c8b89a', marginBottom: '10px' }}>Want to get in touch? I can take you to the contact form right now.</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => goToContact(getAutofillData())}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#d4920a', color: '#06050f', border: 'none', padding: '7px 14px', borderRadius: '100px', cursor: 'none', fontWeight: 600 }}>
                      Open Contact Form →
                    </button>
                    <button onClick={() => setShowAutofill(false)}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(200,184,154,0.4)', border: '1px solid rgba(212,146,10,0.2)', padding: '7px 14px', borderRadius: '100px', cursor: 'none' }}>
                      Not yet
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 flex gap-2 shrink-0" style={{ borderTop: '1px solid rgba(212,146,10,0.08)' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask anything about Shastra AI..."
                style={{
                  flex: 1, background: 'rgba(17,15,34,0.8)', border: '1px solid rgba(212,146,10,0.15)',
                  color: '#f5ede0', padding: '10px 14px', fontSize: '0.875rem',
                  outline: 'none', borderRadius: '12px', fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(212,146,10,0.45)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(212,146,10,0.15)')}
              />
              <button onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  background: input.trim() && !loading ? '#d4920a' : 'rgba(212,146,10,0.2)',
                  border: 'none', color: '#06050f', padding: '10px 16px',
                  borderRadius: '12px', fontWeight: 700, fontSize: '1rem',
                  cursor: 'none', transition: 'background 0.2s', minWidth: '44px',
                }}>
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[901] w-14 h-14 rounded-full flex items-center justify-center agent-glow transition-colors duration-300"
        style={{ background: 'rgba(13,11,26,0.96)', border: '1px solid rgba(212,146,10,0.35)', cursor: 'none' }}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} style={{ color: '#d4920a', fontSize: '1.1rem', lineHeight: 1 }}>✕</motion.span>
            : <motion.div key="o" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(212,146,10,0.45)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#d4920a' }} />
            </motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </>
  )
}
