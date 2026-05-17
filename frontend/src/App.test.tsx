import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

const profilePayload = {
  name: 'Vitor',
  headline: 'Desenvolvedor Back-end Go',
  location: 'Brasil',
  intro: 'Olá, meu nome é Vitor.',
  bio: 'Desenvolvedor independente focado em Go, APIs e sistemas web.',
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
      expect(screen.getByText('Meu nome é')).toBeInTheDocument()
    })

    expect(screen.getByText('Vitor.')).toBeInTheDocument()
    expect(
      screen.getByText('Desenvolvedor Back-end focado em Go no Brasil.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Desenvolvo APIs, automações e sistemas web utilizando Go, Python e Java.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /ENTRAR EM CONTATO/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /VER PROJETOS/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /BAIXAR CURRÍCULO/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Saiba mais sobre mim')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sobre Mim' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Competências' })).toBeInTheDocument()
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

    expect(screen.getByText('Vitor.')).toBeInTheDocument()
    expect(
      screen.getByText('Desenvolvedor Back-end focado em Go no Brasil.'),
    ).toBeInTheDocument()
  })
})
