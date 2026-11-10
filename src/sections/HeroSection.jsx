import { useRef } from 'react'
import { gsap, useGSAP, MQ, img } from '../lib'

/**
 * Capítulo 01 — O lugar. Cenas 01 (primeiro encontro), 02 (aproximação) e 03 (a passagem).
 * Uma única timeline controlada pelo scroll sobre um palco sticky:
 * fachada → aproximação da entrada → crossfade para o Portão da Maioridade → escurecimento.
 */
export default function HeroSection() {
  const root = useRef(null)

  useGSAP(() => {
    const el = (s) => root.current.querySelector(s)

    // Entrada inicial (independente do scroll)
    gsap.from('.hero__reveal', { opacity: 0, y: 36, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.25 })

    const mm = gsap.matchMedia()
    mm.add({ motion: MQ.motion, reduce: MQ.reduce, small: MQ.small }, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0 // 0 = movimento reduzido: só opacidade
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })

      // Cena 01 — zoom 1 → 1.12, título some
      tl.fromTo(el('.hero__facade img'), { scale: 1 }, { scale: 1 + 0.12 * k, duration: 3 }, 0)
        .fromTo(el('.hero__scene--1'), { opacity: 1, y: 0 }, { opacity: 0, y: -40 * k, duration: 1.6 }, 0.3)
        .fromTo(el('.hero__scroll'), { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0)
        // Cena 02 — aproximação em direção à entrada (escala limitada p/ não perder resolução)
        .fromTo(el('.hero__facade img'), { scale: 1 + 0.12 * k }, { scale: 1 + 0.25 * k, duration: 3.2 }, 3)
        .fromTo(el('.hero__scene--2'), { opacity: 0, y: 40 * k }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 3.2)
        .to(el('.hero__scene--2'), { opacity: 0, y: -30 * k, duration: 1 }, 5.1)
        // Crossfade para o Portão da Maioridade
        .fromTo(el('.hero__gate'), { opacity: 0 }, { opacity: 1, duration: 1.5 }, 5.4)
        .fromTo(el('.hero__gate img'), { scale: 1 }, { scale: 1 + 0.08 * k, duration: 3.2 }, 5.4)
        // Cena 03 — a passagem
        .fromTo(el('.hero__scene--3'), { opacity: 0, y: 40 * k }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 7.2)
        .to(el('.hero__scene--3'), { opacity: 0, duration: 0.9 }, 8.3)
        // Aproximação do arco e escurecimento → ambiente interno
        .fromTo(el('.hero__gate img'), { scale: 1 + 0.08 * k }, { scale: 1 + 0.2 * k, duration: 1.2 }, 8.4)
        .fromTo(el('.hero__dark'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 8.4)
    })
  }, { scope: root })

  return (
    <section id="lugar" className="hero" ref={root} data-chapter="1" data-theme="dark" aria-label="Capítulo 1 — O lugar">
      <div className="stage hero__stage">
        <div className="hero__layer hero__facade">
          <img className="cover" src={img('fachada-hero')} fetchPriority="high" decoding="async"
               alt="Casa da Guarda vista em perspectiva, com duas faces, cobertura e paredes históricas de pedra" />
        </div>
        <div className="hero__layer hero__gate">
          <img className="cover" src={img('portao')} loading="eager" decoding="async"
               alt="Portão da Maioridade: arco de pedra e porta azul da Casa da Guarda" />
        </div>
        <div className="hero__layer hero__shade" aria-hidden="true" />

        <div className="hero__scene hero__scene--1">
          <h1 className="t-hero hero__reveal">Uma história que<br />merece continuar.</h1>
          <p className="hero__sub hero__reveal">Casa da Guarda — Floresta Nacional de Ipanema</p>
        </div>

        <div className="hero__scene hero__scene--2">
          <p className="t-lead">Um lugar onde a história da indústria brasileira encontra a natureza.</p>
        </div>

        <div className="hero__scene hero__scene--3">
          <p className="t-lead">Algumas histórias não devem ficar apenas no passado.</p>
        </div>

        <div className="hero__scroll hero__reveal" aria-hidden="true">
          <span>Role</span><i />
        </div>
        <div className="hero__layer hero__dark" aria-hidden="true" />
      </div>
    </section>
  )
}
