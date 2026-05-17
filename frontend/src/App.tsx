import { useEffect, useState } from 'react'
import './App.css'

type ProfileResponse = {
  name: string
  headline: string
  location: string
  intro: string
  bio: string
  cta: {
    label: string
    href: string
  }
}

const fallbackProfile: ProfileResponse = {
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

function App() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProfile() {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await fetch('/api/profile', { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Falha ao carregar perfil')
        }

        const data = (await response.json()) as ProfileResponse
        setProfile(data)
      } catch {
        if (controller.signal.aborted) {
          return
        }
        setProfile(fallbackProfile)
        setHasError(true)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProfile()

    return () => {
      controller.abort()
    }
  }, [])

  const activeProfile = profile ?? fallbackProfile
  const subtitle = `Desenvolvedor Back-end focado em Go no ${activeProfile.location}.`
  const description =
    'Desenvolvo APIs, automações e sistemas web utilizando Go, Python e Java.'

  return (
    <main className="portfolio-shell">
      <section className="portfolio-card">
        <header className="topbar">
          <div className="brand-wrap">
            <span className="brand-mark" aria-hidden="true"></span>
            <span className="brand-name">VITOR DEV</span>
          </div>
          <a className="hire-link" href={activeProfile.cta.href}>
            <span className="hire-icon" aria-hidden="true"></span>
            ENTRAR EM CONTATO
          </a>
        </header>

        {isLoading ? (
          <p className="status" role="status">
            Carregando perfil...
          </p>
        ) : null}

        {hasError ? (
          <p className="status status-error" role="alert">
            API indisponível no momento. Exibindo conteúdo padrão.
          </p>
        ) : null}

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="intro">Olá, meu nome é Vitor.</p>
            <h1>
              <span>Meu nome é</span>
              <strong>{activeProfile.name}.</strong>
            </h1>
            <p className="subtitle">{subtitle}</p>
            <p className="description">{description}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projetos">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6 5l-3 5 3 5h3l-3-5 3-5H6zm8 0l3 5-3 5h-3l3-5-3-5h3z" />
                </svg>
                VER PROJETOS
              </a>
              <a className="btn btn-ghost" href="/curriculo-vitor.pdf" download>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9 3h2v7l2.5-2.5 1.4 1.4L10 14l-4.9-5.1 1.4-1.4L9 10V3zm-5 12h12v2H4v-2z" />
                </svg>
                BAIXAR CURRÍCULO
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <figure className="portrait">
              {/* The original avatar file had a baked-in light background, so the hero now uses a transparent PNG cutout. */}
              <img
                src="/img-of-my-self-transparent-v2.png"
                alt="Foto de Vitor estilizada em duotone azul"
              />
            </figure>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
