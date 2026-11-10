import { useCallback, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Comparador antes/depois. A imagem "atual" fica sobreposta à "proposta" e é
 * recortada por clip-path. Mouse, toque (touch-action: pan-y preserva o scroll
 * vertical da página) e teclado (setas, Home, End).
 */
export default function BeforeAfter({ before, after, beforeLabel = 'ATUAL', afterLabel = 'PROPOSTA', alt }) {
  const root = useRef(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(50)
  const reduced = useReducedMotion()
  const clamp = (v) => Math.min(100, Math.max(0, v))

  const fromEvent = useCallback((e) => {
    const r = root.current.getBoundingClientRect()
    setPos(clamp(((e.clientX - r.left) / r.width) * 100))
  }, [])

  const onDown = (e) => {
    dragging.current = true
    root.current.setPointerCapture(e.pointerId)
    fromEvent(e)
  }
  const onMove = (e) => { if (dragging.current) fromEvent(e) }
  const onUp = (e) => {
    dragging.current = false
    if (root.current.hasPointerCapture(e.pointerId)) root.current.releasePointerCapture(e.pointerId)
  }
  const onKey = (e) => {
    const step = e.shiftKey ? 10 : 3
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPos((p) => clamp(p - step))
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPos((p) => clamp(p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  // Pequena varredura inicial quando o comparador entra na tela (começa e termina em 50%).
  useGSAP(() => {
    if (reduced) return
    const proxy = { v: 88 }
    setPos(88)
    gsap.to(proxy, {
      v: 50, duration: 1.8, ease: 'power3.inOut',
      scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      onUpdate: () => { if (!dragging.current) setPos(proxy.v) },
    })
  }, { scope: root, dependencies: [reduced] })

  return (
    <div
      ref={root}
      className="ba"
      style={{ '--pos': `${pos}%` }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
    >
      <img className="ba__img" src={after} alt={`${alt} — ${afterLabel.toLowerCase()} (imagem conceitual)`} loading="lazy" draggable="false" />
      <img className="ba__img ba__img--top" src={before} alt={`${alt} — ${beforeLabel.toLowerCase()}`} loading="lazy" draggable="false" />
      <span className="ba__label ba__label--l">{beforeLabel}</span>
      <span className="ba__label ba__label--r">{afterLabel}</span>
      <div
        className="ba__handle" role="slider" tabIndex={0}
        aria-label="Comparar fachada atual e proposta"
        aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={100}
        aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(pos)}% da imagem atual visível`}
        onKeyDown={onKey}
      >
        <span className="ba__knob" aria-hidden="true">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 1 1 6l5 5M16 1l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  )
}
