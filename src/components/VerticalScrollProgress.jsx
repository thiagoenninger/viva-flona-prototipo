import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib'

const N = 25          // quantidade de traços
const SIGMA = 3.2     // largura (em traços) da "onda" de maior comprimento
const MIN = 0.235     // escala mínima (8px / 34px)
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

/**
 * Indicador vertical de progresso: 25 traços fixos na lateral direita. O comprimento (scaleX) de cada
 * traço vem de um decaimento gaussiano em torno da posição atual do scroll (0–1 do documento inteiro).
 * Toda a atualização é feita direto no DOM, no ticker do GSAP — sem estado React por frame.
 */
export default function VerticalScrollProgress() {
  const root = useRef(null)

  useEffect(() => {
    const bars = Array.from(root.current.children)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let max = 1          // altura rolável (documento − viewport), em cache
    let target = 0       // progresso real do scroll
    let shown = -1       // progresso exibido (suavizado)
    let dirty = true

    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      dirty = true
    }
    const paint = (p) => {
      const x = p * (N - 1)
      let top = 0, topF = -1
      for (let i = 0; i < N; i++) {
        const d = i - x
        const f = Math.exp(-(d * d) / (2 * SIGMA * SIGMA))
        bars[i].style.transform = `scaleX(${(MIN + (1 - MIN) * f).toFixed(4)})`
        if (f > topF) { topF = f; top = i }
      }
      // antes / ativo / depois — só reforça a leitura; o comprimento é o destaque
      for (let i = 0; i < N; i++) {
        const st = i === top ? 'on' : i < top ? 'before' : 'after'
        if (bars[i].dataset.s !== st) bars[i].dataset.s = st
      }
    }

    const tick = () => {
      target = clamp(window.scrollY / max)
      if (shown < 0 || reduced.matches) shown = target
      else shown += (target - shown) * 0.16 // interpolação suave; sem saltos entre traços
      if (Math.abs(target - shown) < 0.0002) shown = target
      if (dirty || shown !== (tick.last ?? -1)) { paint(shown); tick.last = shown; dirty = false }
    }

    measure()
    gsap.ticker.add(tick)
    // altura do documento muda com: resize, imagens/fontes, ScrollTrigger.refresh e conteúdo do patrocínio
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    ScrollTrigger.addEventListener('refresh', measure)
    window.addEventListener('load', measure)
    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      ScrollTrigger.removeEventListener('refresh', measure)
    }
  }, [])

  return (
    <div className="vsp" ref={root} aria-hidden="true">
      {Array.from({ length: N }, (_, i) => <span key={i} data-s="after" />)}
    </div>
  )
}
