import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reveal, MQ, img } from "../lib";
import ChapterTitle from "../components/ChapterTitle";
import BeforeAfter from "../components/BeforeAfter";

const ALL = { motion: MQ.motion, reduce: MQ.reduce, small: MQ.small };

/* ───────── Ponte — TRANSFORMAR ───────── */
function Transformar() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ALL, (ctx) => {
        const k = ctx.conditions.motion ? 1 : 0;
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
        // O verde sobe a partir da base; a palavra emerge junto, sem esperar a cor terminar
        tl.fromTo(
          q(".tr__green"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "power2.inOut",
          },
          0,
        )
          .fromTo(
            q(".tr__word"),
            { opacity: 0, y: 60 * k },
            { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
            0.3,
          )
          .fromTo(
            q(".tr__sub"),
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            1.4,
          )
          .to({}, { duration: 0.6 });
      });
    },
    { scope: root },
  );

  return (
    <section className="tr" ref={root} data-theme="dark">
      {/* Âncora narrativa do capítulo 03: verde completo, título e subtítulo já visíveis */}
      <span
        id="transformacao-intro"
        className="anchor"
        aria-hidden="true"
        style={{ top: "calc((100% - 100svh) * 0.9)" }}
      />
      <div className="stage tr__stage">
        <div className="tr__green" aria-hidden="true" />
        <div className="tr__content">
          <p className="tr__word t-hero" aria-hidden="true">
            Transformar
          </p>
          <p className="tr__sub kicker">03 — A transformação</p>
        </div>
      </div>
    </section>
  );
}

/* ───────── Cena 08 — O ponto de partida ───────── */
const STEPS = [
  {
    n: "01",
    t: "Planejar",
    d: "Projetos executivos, levantamentos e aprovações.",
  },
  {
    n: "02",
    t: "Restaurar",
    d: "Recuperação arquitetônica, acessibilidade e infraestrutura.",
  },
  { n: "03", t: "Ativar", d: "Exposições, atividades culturais e educativas." },
];

function Partida() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ALL, (ctx) => {
        const k = ctx.conditions.motion ? 1 : 0;
        const q = gsap.utils.selector(root);
        reveal(q(".partida__head > *"), { y: 30 * k });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".steps")[0],
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
        tl.fromTo(
          q(".steps__fill"),
          { scaleY: 0 },
          { scaleY: 1, duration: 3 },
          0,
        );
        q(".step").forEach((s, i) => {
          tl.fromTo(
            s,
            { opacity: 0.12, x: -14 * k },
            { opacity: 1, x: 0, duration: 0.7, ease: "power1.out" },
            i * 1.1,
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="partida" ref={root} data-theme="dark">
      <div className="partida__grid">
        <div className="partida__head">
          <ChapterTitle n="03" label="A transformação" />
          <h2 className="t-chapter">
            Preservar a história. Criar novos encontros.
          </h2>
          <p className="body-text">
            O projeto prevê a recuperação do edifício histórico e sua ativação
            como espaço cultural e educativo aberto à visitação.
          </p>
        </div>
        <div className="steps">
          <div className="steps__line" aria-hidden="true">
            <i className="steps__fill" />
          </div>
          <ol className="steps__list">
            {STEPS.map((s) => (
              <li className="step" key={s.n}>
                <span className="step__n">{s.n}</span>
                <h3 className="t-sub step__t">{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────── Cena 09 — Transformação da fachada ───────── */
function Fachada() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ALL, (ctx) => {
        const k = ctx.conditions.motion ? 1 : 0;
        const q = gsap.utils.selector(root);
        reveal(q(".fachada__copy > *"), { y: 30 * k });
        gsap.fromTo(
          q(".fachada__compare"),
          { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: q(".fachada__compare")[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="fachada" ref={root} data-theme="light">
      <div className="fachada__grid">
        <div className="fachada__copy">
          <ChapterTitle n="03" label="Fachada" />
          <h2 className="t-chapter">
            Uma arquitetura histórica preparada para receber novos usos.
          </h2>
          <p className="hint">
            <i aria-hidden="true" />
            Arraste o controle
          </p>
          <p className="caption fachada__note">
            Proposta: imagem conceitual (estudo preliminar), sujeita a ajustes,
            detalhamento técnico e aprovações dos órgãos responsáveis.
          </p>
        </div>
        <div className="fachada__compare">
          <BeforeAfter
            before={img("fachada-atual")}
            after={img("proposta-fachada")}
            alt="Fachada da Casa da Guarda"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────── Cena 10 — Transformação do interior ───────── */
const USES = [
  "Recepção de visitantes",
  "Exposição sobre o patrimônio",
  "Recursos informativos e audiovisuais",
  "Atividades culturais e educativas",
];

function SalaoTransforma() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ALL, (ctx) => {
        const k = ctx.conditions.motion ? 1 : 0;
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
        tl.fromTo(
          q(".st__title"),
          { opacity: 0, y: 30 * k },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          0,
        )
          .fromTo(
            q(".st__hint"),
            { opacity: 1 },
            { opacity: 0, duration: 0.6 },
            1,
          )
          .fromTo(
            q(".st__imgs img"),
            { scale: 1 },
            { scale: 1 + 0.05 * k, duration: 6 },
            0,
          )
          // Revelação da proposta — reversível ao rolar para cima
          .fromTo(
            q(".st__prop"),
            { opacity: 0 },
            { opacity: 1, duration: 2.8, ease: "power1.inOut" },
            1.4,
          )
          .fromTo(
            q(".st__tag--now"),
            { opacity: 1 },
            { opacity: 0, duration: 0.6 },
            2.1,
          )
          .fromTo(
            q(".st__tag--prop"),
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            3.2,
          )
          .fromTo(
            q(".st__note"),
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            3.6,
          )
          .fromTo(
            q(".st__uses li"),
            { opacity: 0, y: 20 * k },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.4,
              ease: "power2.out",
            },
            4.4,
          )
          .to({}, { duration: 0.5 });
      });
    },
    { scope: root },
  );

  return (
    <section className="st" ref={root} data-theme="dark">
      <div className="stage st__stage">
        <div className="st__imgs">
          <img
            className="cover"
            src={img("salao")}
            loading="lazy"
            decoding="async"
            alt="Salão principal da Casa da Guarda hoje: paredes de pedra, colunas de ferro e vigas de madeira"
          />
          <img
            className="cover st__prop"
            src={img("proposta-salao")}
            loading="lazy"
            decoding="async"
            alt="Proposta conceitual: salão com recepção, balcão de atendimento, painéis informativos e exposição"
          />
        </div>
        <div className="st__shade" aria-hidden="true" />
        <div className="st__title">
          <ChapterTitle n="03" label="Salão principal" />
          <h2 className="t-chapter">
            De edifício histórico a espaço de cultura e conhecimento.
          </h2>
        </div>
        <div className="st__tags" aria-live="polite">
          <span className="st__tag st__tag--now">Atual</span>
          <span className="st__tag st__tag--prop">
            Proposta · imagem conceitual
          </span>
        </div>
        <ul className="st__uses">
          {USES.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <p className="caption st__note">
          Estudo preliminar, sujeito a ajustes, detalhamento técnico e
          aprovações dos órgãos responsáveis.
        </p>
        <p className="st__hint caption" aria-hidden="true">
          Role para revelar a proposta
        </p>
      </div>
    </section>
  );
}

/* ───────── Cena 11 — A história continua ───────── */
function Fim() {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ALL, (ctx) => {
        const k = ctx.conditions.motion ? 1 : 0;
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
        tl.fromTo(
          q(".fim__wash"),
          { opacity: 0.8 },
          { opacity: 0.6, duration: 2.4 },
          0,
        )
          .fromTo(
            q(".fim__photo img"),
            { scale: 1 + 0.1 * k },
            { scale: 1, duration: 5 },
            0,
          )
          .fromTo(
            q(".fim__line span"),
            { yPercent: 115 * k, opacity: k ? 1 : 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.5,
              ease: "power3.out",
            },
            0.2,
          )
          .fromTo(
            q(".fim__text"),
            { opacity: 0, y: 24 * k },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            2.2,
          )
          .fromTo(
            q(".fim__foot"),
            { opacity: 0 },
            { opacity: 1, duration: 1 },
            3.0,
          )
          .to({}, { duration: 1 });

        // botão "Saiba mais": só aparece quando a página não pode mais rolar
        const btn = q(".fim__more")[0];
        if (btn) {
          ScrollTrigger.create({
            start: () => Math.max(0, ScrollTrigger.maxScroll(window) - 4),
            end: () => ScrollTrigger.maxScroll(window) + 100000,
            onToggle: (self) =>
              btn.classList.toggle("is-visible", self.isActive),
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section className="fim" ref={root} data-theme="dark">
      <div className="stage fim__stage">
        <div className="fim__photo">
          <img
            className="cover"
            src={img("fachada-hero")}
            loading="lazy"
            decoding="async"
            alt="Casa da Guarda, Floresta Nacional de Ipanema"
          />
        </div>
        <div className="fim__wash" aria-hidden="true" />
        <div className="fim__content">
          <h2
            className="t-hero fim__title"
            aria-label="O futuro deste patrimônio começa com a sua preservação."
          >
            <span className="fim__line" aria-hidden="true">
              <span>O futuro deste patrimônio</span>
            </span>
            <span className="fim__line" aria-hidden="true">
              <span>começa com a sua</span>
            </span>
            <span className="fim__line" aria-hidden="true">
              <span>preservação.</span>
            </span>
          </h2>
          <p className="fim__text t-sub">
            Restauro, história, cultura e natureza em um novo espaço de encontro
            com a Floresta Nacional de Ipanema.
          </p>
        </div>
        <footer className="fim__foot">
          <p className="fim__brand">
            Viva Flona <span>Ipanema</span> · Casa da Guarda
          </p>
          <p className="caption">
            Iniciativa ICMBio · Realização em parceria com Instituto Cultural
            Quattro
            <br />
          </p>
          <a
            className="fim__more"
            href={`${import.meta.env.BASE_URL}viva-flona-casa-da-guarda.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-label="Saiba mais (abre o PDF em nova aba)"
          >
            Saiba mais
          </a>
        </footer>
      </div>
    </section>
  );
}

export default function TransformationSection() {
  return (
    <div id="transformacao" data-chapter="3">
      <Transformar />
      <Partida />
      <Fachada />
      <SalaoTransforma />
      <Fim />
    </div>
  );
}
