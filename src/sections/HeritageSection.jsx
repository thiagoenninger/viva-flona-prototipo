import { useRef } from 'react'
import { gsap, useGSAP, reveal, MQ, img } from '../lib'
import ChapterTitle from '../components/ChapterTitle'

const ALL = { motion: MQ.motion, reduce: MQ.reduce, small: MQ.small }

/* ───────── Cena 04 — Memória nas paredes ───────── */
function Memoria() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const { motion, small } = ctx.conditions
      const k = motion ? 1 : 0
      const q = gsap.utils.selector(root)
      const final = small ? 'inset(7% 6% 52% 6%)' : 'inset(13% 45% 13% 7%)'
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      tl.fromTo(q('.mem__veil'), { opacity: 1 }, { opacity: 0, duration: 0.9 }, 0)
        .fromTo(q('.mem__img'), { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: final, duration: 3, ease: 'power2.inOut' }, 1.0)
        .fromTo(q('.mem__img img'), { scale: 1 + 0.16 * k }, { scale: 1, duration: 3 }, 1.0)
        .fromTo(q('.stage'), { backgroundColor: '#202722' }, { backgroundColor: '#EDE5D7', duration: 2.4 }, 1.4)
        .fromTo(q('.mem__copy > *'), { opacity: 0, y: 40 * k }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.45, ease: 'power2.out' }, 3.2)
        .to({}, { duration: 0.8 })
    })
  }, { scope: root })

  return (
    <section className="mem" ref={root} data-theme="dark" data-theme-to="light" data-theme-at="0.5">
      {/* Âncora narrativa do capítulo 02: ponto em que imagem, título e texto já estão compostos (~88% da cena) */}
      <span id="patrimonio-intro" className="anchor" aria-hidden="true" style={{ top: 'calc((100% - 100svh) * 0.88)' }} />
      <div className="stage mem__stage">
        <div className="mem__img">
          <img className="cover" src={img('salao')} loading="lazy" decoding="async"
               alt="Grande salão da Casa da Guarda, com paredes de pedra, colunas de ferro e vigas de madeira" />
        </div>
        <div className="mem__veil" aria-hidden="true" />
        <div className="mem__copy">
          <ChapterTitle n="02" label="O patrimônio" />
          <h2 className="t-chapter">As paredes guardam histórias.</h2>
          <p className="body-text">
            Pedra, ferro e madeira preservam marcas de diferentes momentos da história deste território.
            A Casa da Guarda integra um conjunto arquitetônico que testemunha as origens da industrialização brasileira.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ───────── Cena 05 — Berço da siderurgia ───────── */
function Berco() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0
      const q = gsap.utils.selector(root)
      const st = (trigger, start, end, scrub = true) => ({ trigger, start, end, scrub })
      const photo = q('.berco__photo')[0]

      // Palavras de fundo: decorativas, deslocam-se em sentidos opostos
      q('.berco__words span').forEach((w, i) => {
        gsap.fromTo(w, { xPercent: (i % 2 ? -10 : 6) * k }, {
          xPercent: (i % 2 ? 4 : -8) * k, ease: 'none',
          scrollTrigger: st(root.current, 'top bottom', 'bottom top'),
        })
      })
      // Foto principal: revelação por máscara + paralaxe interna
      gsap.fromTo(q('.berco__frame'), { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: st(photo, 'top 92%', 'top 48%', 0.5),
      })
      gsap.fromTo(q('.berco__frame img'), { yPercent: -8 * k }, {
        yPercent: 8 * k, ease: 'none', scrollTrigger: st(photo, 'top bottom', 'bottom top'),
      })
      reveal(q('.berco__copy > *'), { y: 28 * k })
    })
  }, { scope: root })

  return (
    <section className="berco" ref={root} data-theme="light">
      <div className="berco__words" aria-hidden="true">
        <span>História</span><span>Indústria</span><span>Memória</span>
      </div>
      <div className="berco__inner">
        <div className="berco__copy">
          <ChapterTitle n="02" label="Berço da siderurgia" />
          <h2 className="t-chapter">O berço da siderurgia brasileira.</h2>
          <p className="body-text">
            A Floresta Nacional de Ipanema preserva parte importante da história industrial brasileira,
            incluindo o conjunto da Real Fábrica de Ferro São João de Ipanema.
          </p>
          <p className="body-text body-text--soft">
            Sob gestão do ICMBio, o local reúne patrimônio industrial, histórico, arqueológico e arquitetônico,
            áreas preservadas de Mata Atlântica, ciência e visitação pública.
          </p>
          <dl className="facts">
            <div><dt>120 km</dt><dd>da capital paulista</dd></div>
            <div><dt>Iperó e Araçoiaba da Serra</dt><dd>São Paulo</dd></div>
            <div><dt>ICMBio</dt><dd>unidade de conservação federal</dd></div>
          </dl>
        </div>
        <div className="berco__visual">
          <figure className="berco__photo">
            <div className="berco__frame">
              <img src={img('complexo')} loading="lazy" decoding="async"
                   alt="Edificações históricas de pedra e tijolo na Floresta Nacional de Ipanema" />
            </div>
            <figcaption className="caption">Floresta Nacional de Ipanema — Iperó, SP</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ───────── Cena 06 — Ferro e pedra ───────── */
const DETAILS = [
  { cls: 'f1', word: 'Ferro', src: 'escada', n: '01',
    alt: 'Escada helicoidal de ferro fundido que dá acesso ao segundo piso',
    cap: 'Escada histórica em ferro fundido, que dá acesso ao segundo piso.' },
  { cls: 'f2', word: 'Pedra', src: 'arco', n: '02',
    alt: 'Salão do segundo piso visto através de um arco de pedra',
    cap: 'Salão do segundo piso, visto através de um arco de pedra.' },
  { cls: 'f3', word: 'Memória', src: 'corredor', n: '03',
    alt: 'Corredor térreo com arcos e paredes históricas',
    cap: 'Corredor térreo, com estrutura histórica preservada.' },
]

function Ferro() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0
      const q = gsap.utils.selector(root)
      reveal(q('.ferro__head > *'), { y: 24 * k })
      // Sequência: 1ª e 3ª quase juntas; depois a central, de baixo para cima. Estado final = layout do grid.
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1 },
        scrollTrigger: { trigger: q('.ferro__grid')[0], start: 'top 78%', toggleActions: 'play none none reverse' },
      })
      const from = (y) => ({ opacity: 0, y: y * k, clipPath: k ? 'inset(14% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)' })
      const to = { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
      tl.fromTo(q('.f1'), from(36), to, 0)
        .fromTo(q('.f3'), from(36), to, 0.12)
        .fromTo(q('.f2'), from(56), { ...to, duration: 1.1 }, 0.65)
    })
  }, { scope: root })

  return (
    <section className="ferro" ref={root} data-theme="dark">
      <div className="ferro__head">
        <ChapterTitle n="02" label="Detalhes" />
        <h2 className="t-sub ferro__title">Ferro, pedra e memória.</h2>
      </div>
      <div className="ferro__grid">
        {DETAILS.map((d, i) => (
          <span key={d.word} className={`ferro__word word--${i}`} aria-hidden="true">{d.word}</span>
        ))}
        {DETAILS.map((d) => (
          <figure key={d.cls} className={`ferro__fig ${d.cls}`}>
            <div className="ferro__frame">
              <img src={img(d.src)} loading="lazy" decoding="async" alt={d.alt} />
            </div>
            <figcaption className="caption"><b>{d.n}</b> {d.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ───────── Cena 07 — Natureza pelas janelas ─────────
   A fotografia vertical aparece inteira (proporção 2:3, sem recorte), ocupando ~60% da largura.
   O texto fica fixo (sticky) na área escura adjacente enquanto a foto rola. */
function Janela() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0
      const q = gsap.utils.selector(root)
      const photo = q('.janela__photo')[0]
      // Revelação a partir da escuridão: o véu preto se dissolve e a imagem se acomoda (escala mínima)
      gsap.fromTo(q('.janela__veil'), { opacity: 0.9 }, {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: photo, start: 'top 85%', end: 'center 50%', scrub: 0.6 },
      })
      gsap.fromTo(q('.janela__frame img'), { scale: 1 + 0.03 * k }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: photo, start: 'top 85%', end: 'center 50%', scrub: 0.6 },
      })
      reveal(q('.janela__copy > *'), { y: 28 * k })
    })
  }, { scope: root })

  return (
    <section className="janela" ref={root} data-theme="black">
      <div className="janela__grid">
        <div className="janela__copy">
          <ChapterTitle n="02" label="A paisagem" />
          <h2 className="t-sub">A história também vive do lado de fora.</h2>
          <p className="body-text">
            Preservar a Casa da Guarda é também criar novas formas de conhecer o território, sua paisagem e sua história.
          </p>
        </div>
        <figure className="janela__photo">
          <div className="janela__frame">
            <img className="cover" src={img('janela-lateral')} loading="lazy" decoding="async"
                 alt="Vista por uma janela do primeiro andar: vegetação e uma árvore florida" />
            <div className="janela__veil" aria-hidden="true" />
          </div>
          <figcaption className="caption">Vista pela janela lateral esquerda, primeiro andar</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function HeritageSection() {
  return (
    <div id="patrimonio" data-chapter="2">
      <Memoria />
      <Berco />
      <Ferro />
      <Janela />
    </div>
  )
}
