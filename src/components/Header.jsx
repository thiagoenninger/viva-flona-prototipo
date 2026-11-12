import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib'
import useReducedMotion from '../hooks/useReducedMotion'

export default function Header() {
  const root = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    gsap.from(root.current, { opacity: 0, y: -12, duration: 0.9, delay: 0.7, ease: 'power2.out' })

    // Tema do cabeçalho (texto claro/escuro) conforme o fundo da cena sob ele.
    // O tom também vai para <html>: o indicador vertical de scroll usa o mesmo contraste
    const setTheme = (t) => {
      if (root.current) root.current.dataset.tone = t
      document.documentElement.dataset.tone = t
    }
    // querySelectorAll global: gsap.utils.toArray(seletor) ficaria restrito ao escopo do header
    document.querySelectorAll('[data-theme]').forEach((el) => {
      const base = el.dataset.theme
      const to = el.dataset.themeTo
      const at = parseFloat(el.dataset.themeAt || '0.5')
      const pick = (p) => (to && p > at ? to : base)
      ScrollTrigger.create({
        trigger: el, start: 'top 40px', end: 'bottom 40px',
        onToggle: (s) => { if (s.isActive) setTheme(pick(s.progress)) },
        onUpdate: (s) => { if (to) setTheme(pick(s.progress)) },
      })
    })

    // Estado "no topo": cabeçalho transparente sobre o hero; depois ganha fundo + blur
    ScrollTrigger.create({
      trigger: document.body, start: 'top -24',
      onToggle: (st) => { if (root.current) root.current.dataset.top = st.isActive ? 'false' : 'true' },
    })

  }, { scope: root })

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <header className="header" ref={root} data-tone="dark" data-top="true">
      <a className="header__brand" href="#lugar" onClick={(e) => go(e, 'lugar')} aria-label="VIVA FLONA IPANEMA — início">
        <img src={`${import.meta.env.BASE_URL}images/logo/logo-header.png`} alt="" width="400" height="291" decoding="async" />
      </a>
    </header>
  )
}
