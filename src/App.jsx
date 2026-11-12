import { useEffect } from 'react'
import { ScrollTrigger, IMAGES, img } from './lib'
import Header from './components/Header'
import VerticalScrollProgress from './components/VerticalScrollProgress'
import HeroSection from './sections/HeroSection'
import HeritageSection from './sections/HeritageSection'
import TransformationSection from './sections/TransformationSection'
import SponsorshipSection from './sections/SponsorshipSection'

export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    // Após o carregamento, pré-carrega as demais imagens (evita "piscar" nas cenas sticky)
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200))
    const onLoad = () => idle(() => IMAGES.forEach((n) => { new Image().src = img(n) }))
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <>
      <Header />
      <VerticalScrollProgress />
      <main>
        <HeroSection />
        <HeritageSection />
        <TransformationSection />
        <SponsorshipSection />
      </main>
    </>
  )
}
