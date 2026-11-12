import { useState } from 'react'
import { APPLICATIONS, BENEFITS, TIERS, formatValue } from '../data/sponsorshipTiers'

const byId = (id) => BENEFITS.find((b) => b.id === id)

// Linha específica da cota para cada aplicação (vem sempre da tabela do PDF)
function tierLine(app, tierIndex) {
  const b = byId(app.benefit)
  const v = b?.values[tierIndex]
  if (v == null) return null
  if (app.id === 'publicacao') return `${formatValue(b, v)} exemplares`
  if (app.id === 'recepcao') return `Placa no edifício: ${v}`
  if (app.id === 'minidoc') return v
  return `${b.label.split(' da ')[0]}: ${v}`
}

export default function SponsorshipVisuals({ tierIndex }) {
  const [id, setId] = useState('recepcao')
  const tier = TIERS[tierIndex]
  const app = APPLICATIONS.find((a) => a.id === id)
  const extras = ['naming', 'registro'].map(byId).filter((b) => b.values[tierIndex] != null)

  return (
    <div className="sp__vis">
      <figure className="sp__fig">
        <img key={app.id} src={`${import.meta.env.BASE_URL}images/patrocinio/${app.image}.webp`} width={app.w} height={app.h}
          alt={`${app.title}: referência conceitual de aplicação da marca do patrocinador`} loading="lazy" decoding="async" />
        <figcaption>Imagem ilustrativa</figcaption>
      </figure>
      <div className="sp__apps">
        <p className="kicker">Aplicações da marca</p>
        <div role="tablist" aria-label="Aplicações da marca" className="sp__applist"
          onKeyDown={(e) => {
            const i = APPLICATIONS.findIndex((a) => a.id === id)
            const n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % 4 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i + 3) % 4 : -1
            if (n < 0) return
            e.preventDefault(); setId(APPLICATIONS[n].id)
            e.currentTarget.querySelectorAll('[role=tab]')[n]?.focus()
          }}>
          {APPLICATIONS.map((a) => {
            const on = a.id === id
            const line = tierLine(a, tierIndex)
            return (
              <button key={a.id} type="button" role="tab" aria-selected={on} tabIndex={on ? 0 : -1} data-on={on}
                className="sp__app" onClick={() => setId(a.id)}>
                <span className="sp__app-t">{a.title}</span>
                <span className="sp__app-d">{a.text}</span>
                {line && <span className="sp__app-l" key={tier.id}>{tier.name} · {line}</span>}
              </button>
            )
          })}
        </div>
        {extras.length > 0 && (
          <ul className="sp__also" key={tier.id}>
            {extras.map((b) => (
              <li key={b.id}><span>{b.label}</span><b>{formatValue(b, b.values[tierIndex])}</b></li>
            ))}
          </ul>
        )}
        <p className="sp__note">Imagens ilustrativas. Aplicações de marca sujeitas ao desenvolvimento do projeto e às aprovações institucionais necessárias.</p>
      </div>
    </div>
  )
}
