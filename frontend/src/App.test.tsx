import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('App hero', () => {
  it('renders professional static portfolio content', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    })

    expect(screen.getByText(':: sistema iniciado / perfil detectado')).toBeInTheDocument()
    expect(screen.getByText('VITOR')).toBeInTheDocument()
    expect(screen.getByText('ANGELOZI')).toBeInTheDocument()
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
      screen.getByRole('heading', { name: 'Projeto em Destaque' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Experiência Profissional' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Entre em Contato' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Codado')).toBeInTheDocument()
    expect(screen.getAllByText('Go').length).toBeGreaterThan(0)
    expect(screen.getAllByText('React').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Docker').length).toBeGreaterThan(0)
    expect(screen.getAllByText('GitHub').length).toBeGreaterThan(0)
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })
})
