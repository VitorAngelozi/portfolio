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
    title: 'Plataforma gamificada para prática de programação',
    summary:
      'Plataforma educacional interativa inspirada em terminais de linha de comando, criada para ensinar programação com desafios de lógica, depuração de código e execução de scripts em ambiente isolado.',
    modalSummary:
      'Interface inspirada em terminal, desafios progressivos e arquitetura full stack com execução segura de código.',
    repositoryUrl: 'https://github.com/VitorAngelozi/CODADO',
    highlights: ['Go', 'Chi', 'React', 'TypeScript', 'Docker', 'OpenAPI', 'Python'],
    meta: [
      {
        label: 'Experiência',
        value: 'Terminal retro com trilhas, níveis, XP, ranking e comandos',
      },
      {
        label: 'Arquitetura',
        value: 'Monorepo full stack com OpenAPI como contrato central',
      },
      {
        label: 'Execução segura',
        value: 'Sandbox Docker para rodar scripts Python com isolamento',
      },
    ],
    about:
      'A proposta combina interface inspirada em terminal, desafios progressivos e feedback visual para manter o estudo mais ativo. O usuário navega por trilhas, resolve questões, depura scripts e acompanha sua evolução por XP, ranking e progresso por protocolo.',
    architecturePoints: [
      'Monorepo full stack com frontend em React + TypeScript e backend em Go.',
      'API REST em Go com Chi e contrato OpenAPI como fonte central da aplicação.',
      'Geração automática de tipos TypeScript a partir da especificação da API.',
      'Sandbox com Docker para execução controlada de scripts Python.',
      'Separação modular entre domínio, camada HTTP, dados e infraestrutura.',
      'Testes de contrato entre frontend e backend para validação automática da API.',
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
        label: 'Visão geral da plataforma',
      },
      {
        src: '/projects/codado/codado-02-terminal.png',
        alt: 'Modo terminal do Codado com comandos e navegação textual.',
        label: 'Terminal por comandos',
      },
      {
        src: '/projects/codado/codado-03-trilhas.png',
        alt: 'Tela de trilhas e níveis da jornada de lógica de programação.',
        label: 'Trilhas e progressão',
      },
      {
        src: '/projects/codado/codado-04-desafio.png',
        alt: 'Tela de desafio com questão de múltipla escolha em interface escura.',
        label: 'Desafios interativos',
      },
      {
        src: '/projects/codado/codado-05-debug.png',
        alt: 'Tela de depuração de código com editor e desafio de correção.',
        label: 'Modo debug',
      },
    ],
  },
]
