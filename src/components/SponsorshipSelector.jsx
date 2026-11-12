import { useRef } from 'react'

// Tablist acessível (setas, Home/End). Usado para cotas e categorias.
export function Tabs({ items, value, onChange, label, className, idPrefix, renderLabel }) {
  const refs = useRef([])
  const onKey = (e) => {
    const i = items.findIndex((it) => it.id === value)
    let n = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % items.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + items.length) % items.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = items.length - 1
    if (n < 0) return
    e.preventDefault()
    onChange(items[n].id)
    refs.current[n]?.focus()
  }
  return (
    <div className={className} role="tablist" aria-label={label} onKeyDown={onKey}>
      {items.map((it, i) => {
        const on = it.id === value
        return (
          <button key={it.id} ref={(el) => (refs.current[i] = el)} type="button" role="tab"
            id={`${idPrefix}-tab-${it.id}`} aria-selected={on} aria-controls={`${idPrefix}-panel`}
            tabIndex={on ? 0 : -1} className="sp__tab" data-on={on} onClick={() => onChange(it.id)}>
            {renderLabel ? renderLabel(it, i) : it.label}
          </button>
        )
      })}
    </div>
  )
}

export default function SponsorshipSelector({ tiers, value, onChange }) {
  return (
    <div className="sp__selector">
      <Tabs items={tiers.map((t) => ({ id: t.id, label: t.name }))} value={value} onChange={onChange}
        label="Modalidades de patrocínio" className="sp__tiers" idPrefix="tier"
        renderLabel={(it, i) => (<><i>{String(i + 1).padStart(2, '0')}</i>{it.label}</>)} />
    </div>
  )
}
