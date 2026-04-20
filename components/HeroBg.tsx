'use client'
import { useEffect, useRef } from 'react'

export default function HeroBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, t = 0, raf = 0
    const N = 90

    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Mouse
    let mx = W * 0.5, my = H * 0.5
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY }, { passive: true })

    const GOLDS = ['#d4920a', '#f0b429', '#a06010', '#c8b89a']

    interface Node {
      x: number; y: number; vx: number; vy: number
      tx: number; ty: number
      r: number; alpha: number; pulse: number; color: string
    }

    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 800),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      tx: 0, ty: 0,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.25,
      pulse: Math.random() * Math.PI * 2,
      color: GOLDS[Math.floor(Math.random() * GOLDS.length)],
    }))

    // 4 attractor shapes — purely scroll-driven
    const shapes = [
      // sphere
      (i: number, cx: number, cy: number) => {
        const phi = Math.acos(Math.max(-1, Math.min(1, 1 - 2 * (i + 0.5) / N)))
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const R = Math.min(W, H) * 0.2
        return { tx: cx + R * Math.sin(phi) * Math.cos(theta), ty: cy + R * Math.cos(phi) }
      },
      // figure-8
      (i: number, cx: number, cy: number) => {
        const a = (i / N) * Math.PI * 2
        const R = Math.min(W, H) * 0.22
        return { tx: cx + R * Math.cos(a), ty: cy + R * Math.sin(a) * Math.cos(a) }
      },
      // grid
      (i: number, cx: number, cy: number) => {
        const cols = Math.ceil(Math.sqrt(N))
        const R = Math.min(W, H) * 0.2
        const denom = Math.max(cols - 1, 1)
        return { tx: cx + ((i % cols) / denom - 0.5) * R * 2, ty: cy + (Math.floor(i / cols) / denom - 0.5) * R * 2 }
      },
      // spiral
      (i: number, cx: number, cy: number) => {
        const angle = (i / N) * Math.PI * 8
        const r = (i / N) * Math.min(W, H) * 0.22
        return { tx: cx + r * Math.cos(angle), ty: cy + r * Math.sin(angle) }
      },
    ]

    // ── SCROLL: read hero height for morph progress ──
    const getScroll = () => {
      const el = document.getElementById('hero-wrap')
      if (!el) return 0
      return Math.min(window.scrollY / Math.max(el.offsetHeight, 1), 1)
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // ── ANIMATION STARTS IMMEDIATELY on mount ──
    function loop() {
      // Use actual W,H every frame in case resize happened
const cW = canvas!.width, cH = canvas!.height      t += 0.011
      ctx.clearRect(0, 0, cW, cH)

      const scroll = getScroll()
      const cx = cW * 0.5, cy = cH * 0.5

      // Background gold nebula
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(cW, cH) * 0.7)
      bg.addColorStop(0, 'rgba(18,12,6,0.35)')
      bg.addColorStop(1, 'rgba(6,5,15,0.88)')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, cW, cH)

      const nebula = ctx.createRadialGradient(
        cx + Math.sin(t * 0.28) * 50, cy + Math.cos(t * 0.18) * 35,
        0, cx, cy, Math.min(cW, cH) * 0.44
      )
      nebula.addColorStop(0, 'rgba(212,146,10,0.05)')
      nebula.addColorStop(0.6, 'rgba(100,50,10,0.02)')
      nebula.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula; ctx.fillRect(0, 0, cW, cH)

      // Morph between shapes based on scroll
      const sp = Math.min(Math.max(scroll * 3.99, 0), 3.99)
      const stA = Math.min(Math.floor(sp), 3)
      const stB = Math.min(stA + 1, 3)
      const lt = sp - stA

      // Mouse attraction offset
      const mfx = ((mx || cx) - cx) * 0.012
      const mfy = ((my || cy) - cy) * 0.012

      // Update nodes — spring toward target shape
      for (let i = 0; i < N; i++) {
        nodes[i].pulse += 0.017
        const sA = shapes[stA](i, cx, cy)
        const sB = shapes[stB](i, cx, cy)
        nodes[i].tx = lerp(sA.tx, sB.tx, lt) + mfx
        nodes[i].ty = lerp(sA.ty, sB.ty, lt) + mfy
        nodes[i].x += (nodes[i].tx - nodes[i].x) * 0.04 + nodes[i].vx * 0.25
        nodes[i].y += (nodes[i].ty - nodes[i].y) * 0.04 + nodes[i].vy * 0.25
        nodes[i].vx *= 0.97; nodes[i].vy *= 0.97
        if (nodes[i].x < 0 || nodes[i].x > cW) nodes[i].vx *= -0.5
        if (nodes[i].y < 0 || nodes[i].y > cH) nodes[i].vy *= -0.5

        const sz = nodes[i].r * (0.8 + Math.sin(nodes[i].pulse) * 0.28)
        ctx.save()
        ctx.globalAlpha = nodes[i].alpha * (0.8 + Math.sin(nodes[i].pulse) * 0.2)
        ctx.fillStyle = nodes[i].color
        ctx.shadowColor = nodes[i].color; ctx.shadowBlur = sz * 9
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, sz, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      // Edges
      const eDist = [110, 130, 90, 105][Math.min(stA, 3)]
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < eDist) {
            ctx.save(); ctx.globalAlpha = (1 - d / eDist) * 0.2
            const gr = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            gr.addColorStop(0, '#d4920a'); gr.addColorStop(1, '#6b3a0a')
            ctx.strokeStyle = gr; ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Orbiting accent particles
      for (let i = 0; i < 3; i++) {
        const angle = t * 0.7 + i * (Math.PI * 2 / 3)
        const R = Math.min(cW, cH) * (0.16 + i * 0.03)
        const px = cx + R * Math.cos(angle), py = cy + R * Math.sin(angle)
        ctx.save(); ctx.globalAlpha = 0.55
        ctx.fillStyle = '#f0b429'; ctx.shadowColor = '#f0b429'; ctx.shadowBlur = 14
        ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      // Subtle parallax scroll
      const scrollY = window.scrollY || 0
      canvas.style.transform = `translateY(${scrollY * 0.18}px)`

      raf = requestAnimationFrame(loop)
    }

    // Start immediately — no delay, no scroll needed
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} id="hero-bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
