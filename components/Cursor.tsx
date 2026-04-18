'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>()
  const frameRef = useRef(0)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Trail dots
    const TRAIL = 4
    const trails: HTMLDivElement[] = []
    const tPos = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }))

    for (let i = 0; i < TRAIL; i++) {
      const el = document.createElement('div')
      el.style.cssText = `position:fixed;border-radius:50%;pointer-events:none;z-index:9993;
        left:-100px;top:-100px;transform:translate(-50%,-50%);
        width:${3 - i * 0.5}px;height:${3 - i * 0.5}px;
        background:rgba(212,146,10,${0.08 - i * 0.015});`
      document.body.appendChild(el)
      trails.push(el)
    }

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onDown = () => { dot.style.transform = 'translate(-50%,-50%) scale(0.5)'; ring.style.transform = 'translate(-50%,-50%) scale(0.8)' }
    const onUp = () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.transform = 'translate(-50%,-50%) scale(1)' }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const resetRing = () => {
      ring.style.width = '28px'; ring.style.height = '28px'
      ring.style.borderColor = 'rgba(212,146,10,0.4)'
      ring.style.background = 'transparent'
      ring.style.borderRadius = '50%'
      dot.style.background = '#f0b429'
    }

    const bindInteractions = () => {
      document.querySelectorAll('a, button').forEach(el => {
        const e = el as HTMLElement
        if (e.dataset.cb) return; e.dataset.cb = '1'
        e.addEventListener('mouseenter', () => {
          ring.style.width = '50px'; ring.style.height = '50px'
          ring.style.borderColor = 'rgba(212,146,10,0.6)'
          ring.style.background = 'rgba(212,146,10,0.04)'
          dot.style.background = '#d4920a'
        })
        e.addEventListener('mouseleave', resetRing)
      })
      document.querySelectorAll('.work-card, .liquid-border, .svc-panel, [data-cursor="hover"]').forEach(el => {
        const e = el as HTMLElement
        if (e.dataset.cb2) return; e.dataset.cb2 = '1'
        e.addEventListener('mouseenter', () => {
          ring.style.width = '64px'; ring.style.height = '64px'
          ring.style.borderColor = 'rgba(212,146,10,0.35)'
          ring.style.borderRadius = '8px'
        })
        e.addEventListener('mouseleave', resetRing)
      })
    }

    bindInteractions()
    const mo = new MutationObserver(bindInteractions)
    mo.observe(document.body, { childList: true, subtree: true })

    const animate = () => {
      // Ring lags
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.1
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'

      // Trails cascade
      tPos[0].x += (posRef.current.x - tPos[0].x) * 0.45
      tPos[0].y += (posRef.current.y - tPos[0].y) * 0.45
      trails[0].style.left = tPos[0].x + 'px'; trails[0].style.top = tPos[0].y + 'px'
      for (let i = 1; i < TRAIL; i++) {
        tPos[i].x += (tPos[i-1].x - tPos[i].x) * 0.4
        tPos[i].y += (tPos[i-1].y - tPos[i].y) * 0.4
        trails[i].style.left = tPos[i].x + 'px'; trails[i].style.top = tPos[i].y + 'px'
      }

      // Gentle breathe on ring
      frameRef.current++
      const sc = 1 + Math.sin(frameRef.current * 0.04) * 0.05
      if (ring.style.width === '28px') ring.style.transform = `translate(-50%,-50%) scale(${sc})`

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      mo.disconnect()
      trails.forEach(el => el.remove())
    }
  }, [])

  return (
    <>
      {/* Core dot — snaps instantly */}
      <div ref={dotRef} style={{
        position:'fixed', width:'5px', height:'5px',
        background:'#f0b429', borderRadius:'50%',
        pointerEvents:'none', zIndex:9999,
        transform:'translate(-50%,-50%)',
        left:'-100px', top:'-100px',
        boxShadow:'0 0 8px rgba(240,180,41,0.8)',
        transition:'width 0.2s, height 0.2s, background 0.2s, transform 0.1s',
      }}/>
      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position:'fixed', width:'28px', height:'28px',
        border:'1px solid rgba(212,146,10,0.4)',
        borderRadius:'50%', pointerEvents:'none',
        zIndex:9997, transform:'translate(-50%,-50%)',
        left:'-100px', top:'-100px',
        transition:'width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background 0.3s, border-radius 0.3s',
      }}/>
    </>
  )
}
