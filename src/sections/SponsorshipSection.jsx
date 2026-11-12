import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger, useGSAP, reveal, MQ, img } from '../lib'
import SponsorshipSelector from '../components/SponsorshipSelector'
import SponsorshipBenefits from '../components/SponsorshipBenefits'
import SponsorshipVisuals from '../components/SponsorshipVisuals'
import SponsorshipClosing from './SponsorshipClosing'
import { TIERS, FISCAL, countFor } from '../data/sponsorshipTiers'

const ALL = { motion: MQ.motion, reduce: MQ.reduce, small: MQ.small }

/* ───────── Cena 01 — Transição ───────── */
function Intro() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0
      const q = gsap.utils.selector(root)
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
        // 0–3.7: o salão (capítulo 03) sobe e sai; a imagem fica fixa. O conteúdo novo só entra depois.
        .fromTo(q('.spi__photo img'), { scale: 1 + 0.05 * k }, { scale: 1 + 0.1 * k, duration: 10 }, 0)
        .fromTo(q('.spi__shade0'), { opacity: 1 }, { opacity: 0, duration: 1.1 }, 3.9)
        .fromTo(q('.spi__shade'), { opacity: 0 }, { opacity: 0.86, duration: 1.1 }, 3.9)
        .fromTo(q('.spi__kicker'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 4.8)
        .fromTo(q('.spi__title'), { opacity: 0, y: 50 * k }, { opacity: 1, y: 0, duration: 1.3, ease: 'power2.out' }, 5.0)
        .fromTo(q('.spi__sub'), { opacity: 0, y: 20 * k }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 6.0)
        .to(q('.spi__content'), { opacity: 0, y: -30 * k, duration: 0.8 }, 9.2)
        .to(q('.spi__shade'), { opacity: 1, duration: 0.8 }, 9.2)
    })
  }, { scope: root })

  return (
    <section className="spi" ref={root} data-theme="dark">
      <div className="stage spi__stage">
        <div className="spi__photo"><img className="cover" src={img('proposta-salao')} alt="" loading="lazy" decoding="async" /></div>
        <div className="st__shade spi__shade0" aria-hidden="true" />
        <div className="spi__shade" aria-hidden="true" />
        <div className="spi__content">
          <p className="spi__kicker kicker">04 — Faça parte dessa história</p>
          <h2 className="spi__title t-hero">Toda transformação precisa de quem acredite nela.</h2>
          <p className="spi__sub t-sub">Uma oportunidade de associar sua empresa à preservação do patrimônio, à cultura e à educação.</p>
        </div>
      </div>
    </section>
  )
}

/* ───────── Cenas 02–04 — Seleção, contrapartidas e aplicações ───────── */
function Board() {
  const root = useRef(null)
  const [tierId, setTierId] = useState('prata')
  const tierIndex = TIERS.findIndex((t) => t.id === tierId)
  const tier = TIERS[tierIndex]
  const total = countFor(tierIndex)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0
      const q = gsap.utils.selector(root)
      reveal(q('.sp__head > *'), { y: 30 * k })
      reveal(q('.sp__fiscal > *'), { y: 24 * k })
    })
  }, { scope: root })

  // A altura da lista muda com a cota: recalcula as posições dos ScrollTriggers seguintes
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 380)
    return () => clearTimeout(id)
  }, [tierId])

  return (
    <section className="sp" ref={root} data-theme="dark" id="patrocinio-selecao">
      <header className="sp__head">
        <p className="kicker">04 — Modalidades de patrocínio</p>
        <h2 className="t-chapter">Escolha como participar.</h2>
        <p className="body-text">Conheça as modalidades de patrocínio e descubra as oportunidades de participação no VIVA FLONA IPANEMA.</p>
      </header>

      <div className="sp__board">
        <SponsorshipSelector tiers={TIERS} value={tierId} onChange={setTierId} />

        <div className="sp__grid" role="region" aria-live="polite" aria-label={`Cota ${tier.name}`}>
          <aside className="sp__id" key={tier.id}>
            <p className="kicker">Cota</p>
            <h3 className="sp__name t-hero">{tier.name}</h3>
            <p className="sp__range">{tier.range}</p>
            <p className="sp__ctx">{total} contrapartidas previstas nesta cota, organizadas em cinco categorias: marca, conteúdo, pessoas, impacto e extras.</p>
          </aside>
          <SponsorshipBenefits tierIndex={tierIndex} />
        </div>

        <div className="sp__fiscal">
          <div>
            <p className="kicker">Em todas as cotas</p>
            <h3 className="t-sub">{FISCAL.title}</h3>
          </div>
          <div>
            <p className="sp__fiscal-text">{FISCAL.text}</p>
            <p className="sp__fiscal-note">{FISCAL.note}</p>
          </div>
          <dl className="sp__total">
            <dt>{FISCAL.total.label}</dt>
            <dd>{FISCAL.total.value}</dd>
            <dd className="sp__total-d">{FISCAL.total.detail}</dd>
          </dl>
        </div>

        <SponsorshipVisuals tierIndex={tierIndex} />
      </div>
    </section>
  )
}

export default function SponsorshipSection() {
  return (
    <div id="patrocinio">
      <Intro />
      <Board />
      <SponsorshipClosing />
    </div>
  )
}
