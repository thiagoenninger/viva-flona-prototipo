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

    // Estado "no topo": o cabeçalho fica transparente durante todo o hero e só ganha o fundo verde
    // quando o verde ocupa a tela inteira (camada .hero__dark opaca) ou quando o hero já saiu de cena.
    const hero = document.getElementById('lugar')
    const dark = hero?.querySelector('.hero__dark')
    let heroPast = false
    let current = null
    if (hero) {
      ScrollTrigger.create({
        trigger: hero, start: 'bottom bottom', end: 'max',
        onToggle: (st) => { heroPast = st.isActive },
      })
    }
    const tick = () => {
      const covered = dark ? Number(gsap.getProperty(dark, 'opacity')) >= 0.98 : true
      const atTop = !(heroPast || covered)
      if (atTop === current) return
      current = atTop
      if (root.current) root.current.dataset.top = atTop ? 'true' : 'false'
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
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
