/*
 * Cotas de patrocínio e contrapartidas — fonte: "VIVA FLONA IPANEMA / Casa da Guarda"
 * (viva-flona-casa-da-guarda.pdf), páginas 14, 17, 18, 19, 20, 21 e 24.
 * Não inclua valores ou benefícios fora do PDF. `null` = a cota NÃO possui a contrapartida ("—" no PDF).
 * `true` = contrapartida incluída, sem nível/quantidade (✓ no PDF).
 */

export const TIERS = [
  { id: 'apoiador', name: 'Apoiador', range: 'R$ 100 mil a R$ 249 mil', pdfRange: 'R$ 100–249 mil' },
  { id: 'bronze', name: 'Bronze', range: 'R$ 250 mil a R$ 499 mil', pdfRange: 'R$ 250–499 mil' },
  { id: 'prata', name: 'Prata', range: 'R$ 500 mil a R$ 999 mil', pdfRange: 'R$ 500–999 mil' },
  { id: 'ouro', name: 'Ouro', range: 'R$ 1 milhão a R$ 1,999 milhão', pdfRange: 'R$ 1 mi–1,999 mi' },
  { id: 'diamante', name: 'Diamante', range: 'Acima de R$ 2 milhões', pdfRange: 'Acima de R$ 2 mi' },
]

export const CATEGORIES = [
  { id: 'marca', label: 'Marca', page: 18 },
  { id: 'conteudo', label: 'Conteúdo', page: 19 },
  { id: 'pessoas', label: 'Pessoas', page: 19 },
  { id: 'impacto', label: 'Impacto', page: 20 },
  { id: 'extras', label: 'Extras', page: 20 },
]

// values: [Apoiador, Bronze, Prata, Ouro, Diamante]
export const BENEFITS = [
  // ── MARCA (p. 18)
  { id: 'naming', cat: 'marca', label: 'Naming na exposição: “Ministério da Cultura e [empresa] apresentam”',
    values: [null, null, null, true, 'Maior destaque'] },
  { id: 'placa', cat: 'marca', label: 'Reconhecimento em placa no edifício',
    values: ['Nome', 'Marca', 'Marca', 'Marca em destaque', 'Maior destaque'] },
  { id: 'divulgacao', cat: 'marca', label: 'Marca na divulgação da exposição e atividades educativas',
    values: [true, true, 'Destaque', 'Destaque maior', 'Destaque principal'] },
  { id: 'registro', cat: 'marca', label: 'Marca em ponto de registro fotográfico',
    values: [null, null, null, 'Marca em destaque', 'Maior destaque'] },
  { id: 'posts', cat: 'marca', label: 'Posts sobre o patrocínio, o projeto e as atividades',
    values: [true, true, true, 'Destaque', 'Destaque principal'] },
  { id: 'releases', cat: 'marca', label: 'Citação nos releases da assessoria de imprensa',
    values: ['Relação de apoiadores', 'Relação de patrocinadores', 'Citação', 'Destaque no texto', 'Destaque principal no texto'] },

  // ── CONTEÚDO (p. 19)
  { id: 'minidoc', cat: 'conteudo', label: 'Minidocumentário sobre o Restauro (disponibilizado para utilização)',
    values: ['Nome nos créditos', 'Marca nos créditos', 'Marca nos créditos', 'Destaque nos créditos', 'Destaque principal + depoimento da empresa'] },
  { id: 'publicacao', cat: 'conteudo', label: 'Publicação com a história do prédio e o processo de Restauro (exemplares)',
    values: [5, 8, 10, 15, 20] },
  { id: 'nucleo', cat: 'conteudo', label: 'Patrocínio de um núcleo permanente da exposição',
    values: [null, null, null, null, 'Marca apresenta'] },

  // ── PESSOAS (p. 19)
  { id: 'visitas', cat: 'pessoas', label: 'Visitas institucionais para convidados', values: [null, 1, 1, 2, 3] },
  { id: 'trilha', cat: 'pessoas', label: 'Trilha guiada para colaboradores', values: [null, 1, 1, 2, 3] },
  { id: 'voluntariado', cat: 'pessoas', label: 'Dia do voluntariado', values: [null, null, 1, 1, 2] },
  { id: 'integracao', cat: 'pessoas', label: 'Ações de integração da equipe', values: [null, null, null, 1, 2] },

  // ── IMPACTO (p. 20)
  { id: 'relatorio', cat: 'impacto', label: 'Relatório de impacto',
    values: ['Resumo', 'Resumo', 'Completo', 'Completo + apresentação à equipe', 'Completo + apresentação à diretoria'] },
  { id: 'escolas', cat: 'impacto', label: 'Indicação de escolas para visitas e participação em oficinas', values: [1, 1, 2, 2, 4] },
  { id: 'acao', cat: 'impacto', label: 'Possibilidade de propor ação cultural no espaço', values: [null, null, 1, 1, 2] },

  // ── EXTRAS (p. 20)
  { id: 'orquestra', cat: 'extras', label: 'Convites para apresentação da Orquestra em espaço reservado', values: [3, 5, 8, 10, 15] },
  { id: 'kits', cat: 'extras', label: 'Kits VIVA FLONA IPANEMA', values: [2, 5, 8, 10, 20] },
]

// Base comum às cinco cotas (p. 18, linha BASE; p. 14 e p. 17)
export const FISCAL = {
  title: 'Incentivo fiscal',
  text: 'Projeto da Lei Rouanet (PRONAC 269447), enquadrado no artigo 18, que permite dedução de 100% do valor do patrocínio no imposto de renda devido, observados os limites legais.',
  note: 'A dedução está sujeita aos requisitos e limites legais aplicáveis a cada empresa. Esta apresentação não constitui promessa de resultado tributário.',
  total: { label: 'Investimento total previsto', value: 'R$ 4.143.139,69', detail: 'Restauro e atividades culturais · PRONAC 269447' },
}

// Aplicações ilustrativas da marca (p. 21). Imagens extraídas do próprio PDF.
export const APPLICATIONS = [
  { id: 'recepcao', title: 'Recepção', image: 'recepcao', w: 446, h: 363,
    text: 'Painel de boas-vindas com reconhecimento dos patrocinadores.', benefit: 'placa' },
  { id: 'minidoc', title: 'Minidocumentário', image: 'minidocumentario', w: 398, h: 233,
    text: 'Marca do patrocinador nos créditos e disponibilização para uso institucional.', benefit: 'minidoc' },
  { id: 'publicacao', title: 'Publicação', image: 'publicacao', w: 494, h: 237,
    text: 'Marca do patrocinador nos créditos e disponibilização para uso institucional.', benefit: 'publicacao' },
  { id: 'totem', title: 'Totem de conteúdo', image: 'totem', w: 404, h: 375,
    text: 'Identificação do patrocinador em núcleos temáticos da exposição.', benefit: 'nucleo' },
]

export const VISUALS_NOTE =
  'Imagens meramente ilustrativas, apresentadas como referências conceituais. Os layouts e as aplicações das marcas serão definidos posteriormente, conforme o desenvolvimento do projeto e as aprovações institucionais necessárias.'

export const CONTACT = {
  org: 'Instituto Cultural Quattro',
  person: 'Flavio Enninger',
  email: 'flavio@quattroprojetos.com.br',
  phone: '51 99675 5546',
  phoneHref: 'tel:+5551996755546',
  subject: 'VIVA FLONA IPANEMA — Patrocínio da Casa da Guarda',
}

// Envio do e-mail de interesse (site estático, sem backend próprio): serviço FormSubmit.
// O primeiro envio dispara um e-mail de ativação para o endereço abaixo; é preciso confirmá-lo uma vez.
export const LEAD_FORM = {
  to: 'quattroprojetos@gmail.com',
  endpoint: 'https://formsubmit.co/ajax/quattroprojetos@gmail.com',
  subject: 'Contato pelo site Viva Flona Ipanema',
  message: (email) => `O e-mail ${email} entrou em contato pelo site Viva Flona Ipanema e gostaria de receber mais informações do projeto.`,
}

// ── Utilitários ──
export const benefitsFor = (tierIndex, catId) =>
  BENEFITS.filter((b) => b.cat === catId && b.values[tierIndex] != null)

export const countFor = (tierIndex) => BENEFITS.filter((b) => b.values[tierIndex] != null).length

export function formatValue(b, v) {
  if (v === true) return 'Incluído'
  if (typeof v === 'number') return String(v).padStart(2, '0')
  return v
}
