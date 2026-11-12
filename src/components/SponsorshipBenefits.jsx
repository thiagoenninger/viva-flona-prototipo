import { useState } from 'react'
import { Tabs } from './SponsorshipSelector'
import { TIERS, CATEGORIES, BENEFITS, benefitsFor, formatValue } from '../data/sponsorshipTiers'

const cell = (v) => (v == null ? '—' : v === true ? '✓' : typeof v === 'number' ? String(v).padStart(2, '0') : v)

export default function SponsorshipBenefits({ tierIndex }) {
  const [cat, setCat] = useState('marca')
  const [compare, setCompare] = useState(false)
  const tier = TIERS[tierIndex]
  const items = benefitsFor(tierIndex, cat)
  const cats = CATEGORIES.map((c) => ({ id: c.id, label: c.label, n: benefitsFor(tierIndex, c.id).length }))
  const all = BENEFITS.filter((b) => b.cat === cat)

  return (
    <div className="sp__benefits">
      <div className="sp__catbar">
        <Tabs items={cats} value={cat} onChange={setCat} label="Categorias de contrapartidas" className="sp__cats" idPrefix="cat"
          renderLabel={(c) => (<>{c.label}<sup>{String(c.n).padStart(2, '0')}</sup></>)} />
        <button type="button" className="sp__compare" aria-pressed={compare} onClick={() => setCompare((v) => !v)}>
          {compare ? 'Ver só esta cota' : 'Comparar cotas'}
        </button>
      </div>

      <div className="sp__panel" role="tabpanel" id="cat-panel" aria-labelledby={`cat-tab-${cat}`} key={`${tier.id}-${cat}-${compare}`}>
        {compare ? (
          <div className="sp__matrix-wrap" tabIndex={0} aria-label="Comparação entre cotas">
            <table className="sp__matrix">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Contrapartida</span></th>
                  {TIERS.map((t, i) => (
                    <th scope="col" key={t.id} data-on={i === tierIndex}>{t.name}<small>{t.pdfRange}</small></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {all.map((b) => (
                  <tr key={b.id}>
                    <th scope="row">{b.label}</th>
                    {b.values.map((v, i) => (
                      <td key={i} data-on={i === tierIndex} data-empty={v == null}>{cell(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : items.length ? (
          <ul className="sp__list">
            {items.map((b) => (
              <li key={b.id}>
                <span className="sp__label">{b.label}</span>
                <span className="sp__value" data-num={typeof b.values[tierIndex] === 'number'}>{formatValue(b, b.values[tierIndex])}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="sp__none">A cota {tier.name} não inclui contrapartidas nesta categoria.</p>
        )}
      </div>
    </div>
  )
}
