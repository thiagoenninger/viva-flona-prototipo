import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib'
import useReducedMotion from '../hooks/useReducedMotion'

const CHAPTERS = [
  // `target` = âncora narrativa: primeira cena já composta e legível (não o início técnico do container)
  { id: 'lugar', target: 'lugar', n: '01', label: 'O lugar' },
  { id: 'patrimonio', target: 'patrimonio-intro', n: '02', label: 'O patrimônio' },
  { id: 'transformacao', target: 'transformacao-intro', n: '03', label: 'A transformação' },
]

export default function Header() {
  const root = useRef(null)
  const bar = useRef(null)
  const [active, setActive] = useState(1)
  const reduced = useReducedMotion()

  useGSAP(() => {
    gsap.from(root.current, { opacity: 0, y: -12, duration: 0.9, delay: 0.7, ease: 'power2.out' })

    // Tema do cabeçalho (texto claro/escuro) conforme o fundo da cena sob ele.
    const setTheme = (t) => { if (root.current) root.current.dataset.tone = t }
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

    // Capítulo ativo
    document.querySelectorAll('[data-chapter]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el, start: 'top 50%', end: 'bottom 50%',
        onToggle: (s) => { if (s.isActive) setActive(Number(el.dataset.chapter)) },
      })
    })

    // Estado "no topo": cabeçalho transparente sobre o hero; depois ganha fundo + blur
    ScrollTrigger.create({
      trigger: document.body, start: 'top -24',
      onToggle: (st) => { if (root.current) root.current.dataset.top = st.isActive ? 'false' : 'true' },
    })

    // Progresso geral
    gsap.to(bar.current, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    })
  }, { scope: root })

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <header className="header" ref={root} data-tone="dark" data-top="true">
      <a className="header__brand" href="#lugar" onClick={(e) => go(e, 'lugar')} aria-label="VIVA FLONA IPANEMA — início">
        Viva Flona <span>Ipanema</span>
      </a>
      <nav className="header__nav" aria-label="Capítulos">
        {CHAPTERS.map((c, i) => (
          <a key={c.id} className="header__link" href={`#${c.target}`}
             aria-current={active === i + 1} onClick={(e) => go(e, c.target)}>
            <b>{c.n}</b><span>{c.label}</span>
          </a>
        ))}
      </nav>
      <div className="header__progress" aria-hidden="true"><div className="header__bar" ref={bar} /></div>
    </header>
  )
}
