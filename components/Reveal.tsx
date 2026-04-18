'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props { children: ReactNode; delay?: number; dir?: 'up'|'left'|'right'; className?: string }

export default function Reveal({ children, delay=0, dir='up', className='' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if(!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          el.style.animationDelay = delay+'s'
          el.classList.add('on')
          obs.unobserve(el)
        }
      })
    },{ threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  },[delay])
  const cls = dir==='left'?'rv-l':dir==='right'?'rv-r':'rv'
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>
}
