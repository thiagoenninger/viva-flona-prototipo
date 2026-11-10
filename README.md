# VIVA FLONA IPANEMA — Casa da Guarda (protótipo digital imersivo)

Experiência de página única (React + Vite + GSAP/ScrollTrigger) em três capítulos conduzidos pelo scroll.

## Executar
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção em dist/ (abre em qualquer servidor estático)
npm run preview
```

## Estrutura
- `src/sections/HeroSection.jsx` — Cap. 01 (cenas 01–03)
- `src/sections/HeritageSection.jsx` — Cap. 02 (cenas 04–07)
- `src/sections/TransformationSection.jsx` — Cap. 03 (cenas 08–11)
- `src/components/BeforeAfter.jsx` — comparador (mouse, toque, teclado)
- `public/images/` — imagens otimizadas (WebP). Originais em `referencias/`.

## Origem das imagens
As fotos de fachada em perspectiva, portão e salão atual foram extraídas **do PDF** (maior resolução embutida), pois os arquivos originais não estavam disponíveis. Perspectivas de restauro (fachada, salão) também vêm do PDF, sempre identificadas como "Proposta · imagem conceitual".

## Pendências
- Substituir `fachada-atual` pelo original em alta resolução (o disponível tem só 545 px e foi ampliado com Lanczos).
- Substituir fachada/portão/salão pelos arquivos originais (`CASA DA GUARDA - …jpg`), se desejado.
- Logotipo oficial: usada assinatura tipográfica provisória.
- Perspectivas de corredor, escada, arco e janela do PDF foram extraídas, mas não usadas.
