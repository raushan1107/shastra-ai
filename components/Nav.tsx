'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 md:px-16 ${scrolled ? 'scrolled py-4' : 'py-7'}`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center relative">
            <div className="w-2 h-2 rounded-full bg-gold"/>
            <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-30"/>
          </div>
          <span style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:'1.05rem',letterSpacing:'0.05em'}}>
            Shastra<span className="text-gold">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href}
                className={`label-mono hover:text-gold transition-colors duration-200 relative ${path===l.href?'text-gold':'text-warm/60'}`}
                style={{fontSize:'0.65rem'}}>
                {l.label}
                {path===l.href && <motion.div layoutId="nav-pill" className="absolute -bottom-1 left-0 right-0 h-px bg-gold"/>}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact"
          className="hidden md:inline-flex items-center gap-2 btn-gold px-6 py-2.5 text-sm rounded-full">
          Get Started
        </Link>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={()=>setOpen(!open)}>
          <span className={`block w-5 h-px bg-cream transition-all ${open?'rotate-45 translate-y-2':''}`}/>
          <span className={`block w-5 h-px bg-cream transition-all ${open?'opacity-0':''}`}/>
          <span className={`block w-5 h-px bg-cream transition-all ${open?'-rotate-45 -translate-y-2':''}`}/>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            className="fixed top-16 inset-x-0 z-[499] bg-void/97 backdrop-blur-2xl border-b border-border px-8 py-8 md:hidden"
          >
            {links.map(l=>(
              <Link key={l.href} href={l.href} onClick={()=>setOpen(false)}
                className="block label-mono py-4 border-b border-border2 text-warm/60 hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
