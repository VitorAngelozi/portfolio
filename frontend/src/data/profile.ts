export type Profile = {
  headline: string
  cta: {
    label: string
    href: string
  }
  description: string
}

export const profile: Profile = {
  headline: 'focado em Go, Node.js e Python.',
  cta: {
    label: 'Entre em contato',
    href: '#contact',
  },
  description:
    'Desenvolvo aplicações full stack, criando APIs, integrações e automações para transformar processos e ideias em soluções escaláveis.',
}
