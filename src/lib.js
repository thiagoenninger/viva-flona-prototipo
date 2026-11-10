import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

// Condições usadas com gsap.matchMedia: a animação é recriada quando mudam.
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  small: '(max-width: 767px)',
}

export const img = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`

export const IMAGES = [
  'fachada-hero', 'portao', 'salao', 'proposta-salao', 'complexo', 'escada', 'arco',
  'corredor', 'janela-lateral', 'fachada-atual', 'proposta-fachada',
]

// Revelação simples (fade + deslocamento) disparada pelo scroll, reversível.
export function reveal(targets, { y = 40, start = 'top 88%' } = {}) {
  gsap.utils.toArray(targets).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start, toggleActions: 'play none none reverse' },
      }
    )
  })
}

export { gsap, ScrollTrigger, useGSAP }
