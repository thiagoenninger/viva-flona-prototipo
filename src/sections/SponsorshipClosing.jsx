import { useRef, useState } from 'react'
import { gsap, useGSAP, MQ, img } from '../lib'
import { CONTACT, LEAD_FORM } from '../data/sponsorshipTiers'

const ALL = { motion: MQ.motion, reduce: MQ.reduce, small: MQ.small }
const MAIL = `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.subject)}`

/* Campo de e-mail + envio (FormSubmit). Estados: idle · sending · ok · error */
function LeadForm() {
  const [status, setStatus] = useState('idle')
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form._honey.value) return // anti-spam
    const email = form.email.value.trim()
    if (!email || status === 'sending') return
    setStatus('sending')
    // O FormSubmit só responde depois de entregar o e-mail (pode levar vários segundos).
    // Se a resposta não chegar em ~1,5 s, confirmamos ao visitante; falha explícita depois disso vira erro.
    let settled = false
    const done = (st) => { if (!settled || st === 'error') { settled = true; setStatus(st) } }
    const timer = setTimeout(() => { done('ok'); form.reset() }, 1500)
    try {
      const res = await fetch(LEAD_FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email, _subject: LEAD_FORM.subject, _template: 'box', _captcha: 'false',
          mensagem: LEAD_FORM.message(email),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === 'false' || data.success === false) {
        console.warn('[Viva Flona] Envio de e-mail recusado pelo FormSubmit:', res.status, data)
        throw new Error('send')
      }
      clearTimeout(timer); done('ok'); form.reset()
    } catch (err) {
      clearTimeout(timer)
      if (err.message !== 'send') console.warn('[Viva Flona] Falha de rede no envio de e-mail:', err)
      done('error')
    }
  }
  return (
    <form className="lead" onSubmit={onSubmit} noValidate={false}>
      <label className="sr-only" htmlFor="lead-email">Seu e-mail</label>
      <div className="lead__row">
        <input id="lead-email" name="email" type="email" required autoComplete="email" inputMode="email"
          placeholder="Informe seu e-mail para receber mais informações" disabled={status === 'sending'} />
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="lead__honey" />
        <button type="submit" className="lead__send" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar'}
        </button>
      </div>
      <p className="lead__msg" role="status" aria-live="polite" data-state={status}>
        {status === 'ok' && 'Recebemos o seu contato. Em breve retornaremos com mais informações do projeto.'}
        {status === 'error' && <>Não foi possível enviar agora. Tente novamente ou escreva para <a href={MAIL}>{CONTACT.email}</a>.</>}
      </p>
    </form>
  )
}

/* ───────── Convite final ───────── */
export default function SponsorshipClosing() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(ALL, (ctx) => {
      const k = ctx.conditions.motion ? 1 : 0
      const q = gsap.utils.selector(root)
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom bottom', scrub: 0.6 },
      })
        .fromTo(q('.fim__wash'), { opacity: 0.8 }, { opacity: 0.6, duration: 2.4 }, 0)
        .fromTo(q('.fim__photo img'), { scale: 1 + 0.1 * k }, { scale: 1, duration: 5 }, 0)
        .fromTo(q('.fim__line span'), { yPercent: 115 * k, opacity: k ? 1 : 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.5, ease: 'power3.out' }, 0.2)
        .fromTo(q('.fim__text'), { opacity: 0, y: 24 * k }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 2.0)
        .fromTo(q('.fim__cta'), { opacity: 0, y: 18 * k }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 2.6)
        .fromTo(q('.fim__foot'), { opacity: 0 }, { opacity: 1, duration: 1 }, 3.0)
        .to({}, { duration: 1 })
    })
  }, { scope: root })

  return (
    <section className="fim" ref={root} data-theme="dark">
      <div className="stage fim__stage">
        <div className="fim__photo">
          <img className="cover" src={img('fachada-hero')} loading="lazy" decoding="async"
               alt="Casa da Guarda, Floresta Nacional de Ipanema" />
        </div>
        <div className="fim__wash" aria-hidden="true" />
        <div className="fim__content">
          <h2 className="t-hero fim__title" aria-label="Sua marca pode fazer parte dessa história.">
            <span className="fim__line" aria-hidden="true"><span>Sua marca pode</span></span>
            <span className="fim__line" aria-hidden="true"><span>fazer parte</span></span>
            <span className="fim__line" aria-hidden="true"><span>dessa história.</span></span>
          </h2>
          <p className="fim__text t-sub">
            Conheça as possibilidades de participação e ajude a construir um novo capítulo para a Casa da Guarda.
          </p>
          <div className="fim__cta">
            <LeadForm />
            <a className="btn btn--ghost fim__pdf" href={`${import.meta.env.BASE_URL}viva-flona-casa-da-guarda.pdf`}
             target="_blank" rel="noopener noreferrer">Saiba mais sobre o projeto!<span className="sr-only"> (abre o PDF em nova aba)</span></a>
          </div>
        </div>
        <footer className="fim__foot">
          <p className="fim__brand">Viva Flona <span>Ipanema</span> · Casa da Guarda</p>
          <p className="caption">
            {CONTACT.org} · {CONTACT.person} · <a href={MAIL}>{CONTACT.email}</a> · <a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />
            Iniciativa ICMBio · Realização em parceria com Instituto Cultural Quattro. Perspectivas de restauro são estudos preliminares, sujeitos a aprovações.
          </p>
        </footer>
      </div>
    </section>
  )
}
