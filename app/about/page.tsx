'use client'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const TL = [
  { y: '2014-20', e: 'Founded RR Education — secondary-school-grade classroom training for students and classroom environments' },
  { y: '2021', e: 'First major corporate training — C#, .NET and Azure for enterprise developers at global firms' },
  { y: '2022', e: 'Earned first batch of Microsoft certifications; began Azure cloud architecture specialization' },
  { y: '2023', e: 'Attained Microsoft Certified Trainer (MCT) status. Began international training engagements across 10+ countries. Trained professionals at Nokia, TCS, Deloitte, Microsoft, KPMG, Wipro, Cognizant, Capgemini, ING Global. 38+ certifications earned.' },
  { y: '2024-25', e: 'Founded RR Skillverse — enterprise-grade technology education platform. Deep specialization in Azure AI and Copilot Studio' },
  { y: '2026', e: 'Founded Shastra AI — bringing a decade of enterprise AI expertise into a focused solutions firm' },
]

const VALUES = [
  { n: '01', t: 'POC-First Always', d: 'We never present a solution without building it first. Working systems — not presentations.' },
  { n: '02', t: 'Context Over Templates', d: 'We understand your industry, workflows, and constraints before writing a single line of code.' },
  { n: '03', t: 'Ownership Transfer', d: 'Every project ends with your team trained and owning the system. No long-term dependency.' },
  { n: '04', t: 'Honest Assessment', d: "If AI isn't the right solution, we'll tell you. We'd rather lose a deal than build something that doesn't work." },
]

const CERTS = [
  'Microsoft Certified Trainer (MCT)', 'Azure AI Engineer (AI-102)', 'Azure Developer (AZ-204)',
  'Power BI Data Analyst (PL-300)', 'Copilot Studio Specialist', 'Azure Solutions Architect',
  'AI Fundamentals (AI-900)', 'Power Platform Developer', 'CCNA',
  '38+ Microsoft Certifications Total',
]

const CLIENTS = ['Nokia', 'TCS', 'Deloitte', 'Microsoft', 'KPMG', 'Wipro', 'Cognizant', 'Capgemini', 'ING Global']

export default function AboutPage() {
  return (
    <div className="page-in">
      {/* Hero */}
      <section className="pt-44 pb-20 px-8 md:px-16" style={{ borderBottom: '1px solid rgba(212,146,10,0.1)', background: 'var(--ink)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-end">
          <div>
            <Reveal><div className="label-mono stag mb-5">Our Story</div></Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-giant" style={{ fontSize: 'clamp(3.5rem,8vw,9rem)' }}>
                Built on<br /><span className="gold-text">Expertise.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.15} dir="right">
            <p style={{ color: 'var(--warm)', fontSize: '1.1rem', lineHeight: 1.75, opacity: 0.75 }}>
              Shastra AI was born from a simple frustration: enterprises pay for AI training and consulting, but leave with theory and no working systems. We fix that.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: 'var(--void)', borderBottom: '1px solid rgba(212,146,10,0.08)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { n: '2,900+', l: 'Professionals Trained' },
            { n: '25+', l: 'Countries Reached' },
            { n: '38+', l: 'Microsoft Certifications' },
            { n: '10+', l: 'Years of Expertise' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.07}>
              <div className="px-10 py-16 text-center" style={{ borderLeft: i > 0 ? '1px solid rgba(212,146,10,0.08)' : 'none' }}>
                <div className="ticker mb-2 leading-none" style={{ fontSize: 'clamp(2.5rem,4vw,4rem)', color: 'var(--gold-light)' }}>{s.n}</div>
                <div className="label-mono text-warm/40" style={{ fontSize: '0.6rem' }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CEO Profile — the main section */}
      <section className="py-32 px-8 md:px-16" style={{ background: 'var(--ink)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="label-mono stag mb-6">Founder & CEO</div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-20 mb-20">
            {/* Left: Bio */}
            <div>
              <Reveal delay={0.05}>
                <div className="flex items-center gap-5 mb-8">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(212,146,10,0.2), rgba(100,50,10,0.3))', border: '1px solid rgba(212,146,10,0.3)' }}>
                    <span className="display-serif text-3xl text-gold" style={{ color: '#d4920a' }}>RR</span>
                  </div>
                  <div>
                    <h2 className="display-serif mb-1" style={{ fontSize: '1.8rem' }}>Raushan Ranjan</h2>
                    <div className="label-mono" style={{ fontSize: '0.62rem', color: '#d4920a' }}>Founder & CEO · Shastra AI</div>
                    <div className="label-mono mt-1" style={{ fontSize: '0.58rem', color: 'rgba(200,184,154,0.4)' }}>Noida, India · Remote Global</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mb-5 leading-relaxed" style={{ color: 'var(--warm)', opacity: 0.8, fontSize: '1.02rem' }}>
                  Raushan Ranjan is a <strong style={{ color: 'var(--cream)' }}>Microsoft Certified Trainer (MCT)</strong> and enterprise technology specialist with 10+ years of experience. He has trained <strong style={{ color: 'var(--cream)' }}>2,900+ enterprise professionals across 25+ countries</strong> — from freshers to 35-year industry veterans.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mb-5 leading-relaxed" style={{ color: 'var(--warm)', opacity: 0.8, fontSize: '1.02rem' }}>
                  He holds <strong style={{ color: 'var(--cream)' }}>38+ Microsoft certifications</strong> spanning Azure AI, Power Platform, .NET development, and enterprise cloud architecture. He is one of fewer than 6,000 active MCTs globally.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-8 leading-relaxed" style={{ color: 'var(--warm)', opacity: 0.8, fontSize: '1.02rem' }}>
                  His defining quality: in every training engagement, he asks for the client's real use cases and builds live POCs on the spot. That philosophy — <em style={{ color: 'var(--cream)', fontStyle: 'italic' }}>build first, talk later</em> — is the DNA of Shastra AI.
                </p>
              </Reveal>

              {/* Social links */}
              <Reveal delay={0.25}>
                <div className="flex gap-3">
                  {[
                    { l: 'LinkedIn', h: 'https://www.linkedin.com/in/raushanranjan' },
                    { l: 'GitHub', h: 'https://github.com/raushan1107' },
                    { l: 'YouTube', h: 'https://www.youtube.com/@RaushanRanjan' },
                  ].map(s => (
                    <a key={s.l} href={s.h} target="_blank" rel="noreferrer"
                      className="label-mono px-4 py-2 rounded-full transition-all duration-200"
                      style={{ fontSize: '0.6rem', border: '1px solid rgba(212,146,10,0.2)', color: 'rgba(200,184,154,0.6)', textDecoration: 'none' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,146,10,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#d4920a' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,146,10,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,184,154,0.6)' }}>
                      {s.l} ↗
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Timeline */}
            <div>
              <Reveal><div className="label-mono stag mb-8">Journey</div></Reveal>
              <div className="relative" style={{ borderLeft: '1px solid rgba(212,146,10,0.15)', paddingLeft: '2rem' }}>
                {TL.map((item, i) => (
                  <Reveal key={item.y} delay={i * 0.07}>
                    <div className="pb-8 relative group">
                      <div className="absolute -left-8 top-1 w-3 h-3 rounded-full border flex items-center justify-center transition-all duration-300"
                        style={{ borderColor: 'rgba(212,146,10,0.3)', background: 'var(--ink)' }}>
                        <div className="w-1 h-1 rounded-full transition-colors duration-300" style={{ background: 'rgba(212,146,10,0.5)' }} />
                      </div>
                      <div className="label-mono mb-1" style={{ fontSize: '0.6rem', color: 'rgba(212,146,10,0.5)' }}>{item.y}</div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--warm)', opacity: 0.7 }}>{item.e}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Clients trained at */}
          <Reveal>
            <div className="mb-6 label-mono stag" style={{ fontSize: '0.6rem' }}>Enterprise clients trained at</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-16">
              {CLIENTS.map(c => (
                <span key={c} className="label-mono px-4 py-2.5 rounded-full" style={{ fontSize: '0.62rem', border: '1px solid rgba(212,146,10,0.2)', color: 'rgba(200,184,154,0.7)', background: 'rgba(212,146,10,0.04)' }}>
                  {c}
                </span>
              ))}
              <span className="label-mono px-4 py-2.5 rounded-full" style={{ fontSize: '0.62rem', border: '1px solid rgba(212,146,10,0.1)', color: 'rgba(200,184,154,0.4)' }}>
                + 20 more global organisations
              </span>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal>
            <div className="mb-6 label-mono stag" style={{ fontSize: '0.6rem' }}>38+ certifications including</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {CERTS.map(c => (
                <span key={c} className="label-mono px-3 py-1.5 rounded-full" style={{ fontSize: '0.6rem', border: '1px solid rgba(212,146,10,0.2)', color: '#d4920a', background: 'rgba(212,146,10,0.06)' }}>
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 md:px-16" style={{ background: 'var(--void)', borderTop: '1px solid rgba(212,146,10,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="label-mono stag mb-6">What Drives Us</div></Reveal>
          <Reveal delay={0.1}><h2 className="display-serif mb-14" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>Values that shape<br /><span className="gold-text">every engagement</span></h2></Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.08}>
                <div className="liquid-border p-9 group" style={{ borderRadius: '24px', background: 'rgba(17,15,34,0.5)' }}>
                  <div className="ticker mb-4 leading-none" style={{ fontSize: '4rem', color: 'rgba(212,146,10,0.1)', transition: 'color 0.4s' }}>{v.n}</div>
                  <h3 className="display-serif mb-3" style={{ fontSize: '1.2rem' }}>{v.t}</h3>
                  <p style={{ color: 'var(--warm)', fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.7 }}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 text-center" style={{ background: 'var(--ink)', borderTop: '1px solid rgba(212,146,10,0.08)' }}>
        <div className="max-w-xl mx-auto">
          <Reveal><h2 className="display-serif mb-5" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Ready to work together?<br /><span className="gold-text">Let's talk.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mb-10 font-light" style={{ color: 'var(--warm)', opacity: 0.6, lineHeight: 1.7 }}>Free 60-minute discovery call with Raushan directly. No sales team. No commitment.</p></Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className="btn-gold px-10 py-5 text-base rounded-full inline-flex items-center gap-2">
              Book a Discovery Call →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
