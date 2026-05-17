import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

const profilePayload = {
  headline: 'focado em Go, Node.js e Python.',
  cta: {
    label: 'Me contrate',
    href: '#contato',
  },
}

describe('App hero', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading state while waiting profile request', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () =>
        new Promise<Response>(() => {
          // Keeps pending to assert loading state.
        }),
    )

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando perfil...')
  })

  it('renders professional hero content on successful request', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => profilePayload,
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    })

    expect(screen.getByText('Olá, me chamo Vitor Angelozi.')).toBeInTheDocument()
    expect(
      screen.getByText('focado em Go, Node.js e Python.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Desenvolvo aplicações full stack, criando APIs, integrações e automações para transformar processos e ideias em soluções escaláveis.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /entre em contato/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /VER PROJETOS/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /BAIXAR CURRÍCULO/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Saiba mais sobre mim')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sobre Mim' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Competências' })).toBeInTheDocument()
    expect(
      screen.getByText('10+ tecnologias utilizadas no desenvolvimento de software.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Backend' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Banco de Dados' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ferramentas' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Projetos em Destaque' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Experiência Profissional' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Entre em Contato' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Integração JACAD')).toBeInTheDocument()
    expect(screen.getByText('Codado')).toBeInTheDocument()
    expect(screen.getByText('Banco de Talentos')).toBeInTheDocument()
    expect(screen.getByText('Go')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getAllByText('GitHub').length).toBeGreaterThan(0)
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders fallback and error message when request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'API indisponível no momento. Exibindo conteúdo padrão.',
      )
    })

    expect(screen.getByText('Olá, me chamo Vitor Angelozi.')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    expect(screen.getByText('focado em Go, Node.js e Python.')).toBeInTheDocument()
  })
})
