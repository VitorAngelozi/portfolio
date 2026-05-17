export type ProjectGalleryItem = {
  src: string
  alt: string
  label: string
}

export type ProjectRecord = {
  id: string
  name: string
  title: string
  summary: string
  modalSummary: string
  repositoryUrl: string
  highlights: string[]
  meta: Array<{
    label: string
    value: string
  }>
  about: string
  architecturePoints: string[]
  stack: string[]
  gallery: ProjectGalleryItem[]
}

export const projects: ProjectRecord[] = [
  {
    id: 'codado',
    name: 'Codado',
    title: 'Plataforma gamificada para pratica de programacao',
    summary:
      'Plataforma educacional interativa inspirada em terminais de linha de comando, criada para ensinar programacao com desafios de logica, depuracao de codigo e execucao de scripts em ambiente isolado.',
    modalSummary:
      'Interface inspirada em terminal, desafios progressivos e arquitetura full stack com execucao segura de codigo.',
    repositoryUrl: 'https://github.com/VitorAngelozi/CODADO',
    highlights: ['Go', 'Chi', 'React', 'TypeScript', 'Docker', 'OpenAPI', 'Python'],
    meta: [
      {
        label: 'Experiencia',
        value: 'Terminal retro com trilhas, niveis, XP, ranking e comandos',
      },
      {
        label: 'Arquitetura',
        value: 'Monorepo full stack com OpenAPI como contrato central',
      },
      {
        label: 'Execucao segura',
        value: 'Sandbox Docker para rodar scripts Python com isolamento',
      },
    ],
    about:
      'A proposta combina interface inspirada em terminal, desafios progressivos e feedback visual para manter o estudo mais ativo. O usuario navega por trilhas, resolve questoes, depura scripts e acompanha sua evolucao por XP, ranking e progresso por protocolo.',
    architecturePoints: [
      'Monorepo full stack com frontend em React + TypeScript e backend em Go.',
      'API REST em Go com Chi e contrato OpenAPI como fonte central da aplicacao.',
      'Geracao automatica de tipos TypeScript a partir da especificacao da API.',
      'Sandbox com Docker para execucao controlada de scripts Python.',
      'Separacao modular entre dominio, camada HTTP, dados e infraestrutura.',
      'Testes de contrato entre frontend e backend para validacao automatica da API.',
    ],
    stack: [
      'Go',
      'Chi',
      'React',
      'TypeScript',
      'Vite',
      'Docker',
      'OpenAPI',
      'Axios',
      'Python',
      'npm Workspaces',
    ],
    gallery: [
      {
        src: '/projects/codado/codado-01-home.png',
        alt: 'Tela inicial do Codado com trilhas, progresso e status em estilo terminal.',
        label: 'Visao geral da plataforma',
      },
      {
        src: '/projects/codado/codado-02-terminal.png',
        alt: 'Modo terminal do Codado com comandos e navegacao textual.',
        label: 'Terminal por comandos',
      },
      {
        src: '/projects/codado/codado-03-trilhas.png',
        alt: 'Tela de trilhas e niveis da jornada de logica de programacao.',
        label: 'Trilhas e progressao',
      },
      {
        src: '/projects/codado/codado-04-desafio.png',
        alt: 'Tela de desafio com questao de multipla escolha em interface escura.',
        label: 'Desafios interativos',
      },
      {
        src: '/projects/codado/codado-05-debug.png',
        alt: 'Tela de depuracao de codigo com editor e desafio de correcao.',
        label: 'Modo debug',
      },
    ],
  },
]
