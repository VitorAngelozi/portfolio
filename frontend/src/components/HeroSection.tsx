import type { CSSProperties } from 'react'
import ScrollIndicator from './ScrollIndicator'

type HeroSectionProps = {
  ctaHref: string
  isLoading: boolean
  hasError: boolean
  subtitle: string
  description: string
}

function renderWaveText(text: string) {
  return (
    <span className="wave-text" aria-hidden="true">
      {text.split('').map((char, index) => (
        <span
          className="wave-char"
          style={{ '--char-index': index } as CSSProperties}
          key={`${char}-${index}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

function HeroSection({
  ctaHref,
  isLoading,
  hasError,
  subtitle,
  description,
}: HeroSectionProps) {
  return (
    <section className="portfolio-card hero-section">
      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-name" aria-label="vitor angelozi">
            {renderWaveText('vitor angelozi')}
          </span>
        </div>
        <a className="hire-link" href={ctaHref} aria-label="entre em contato">
          {renderWaveText('entre em contato')}
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
          <p className="intro">Olá, me chamo Vitor Angelozi.</p>
          <h1>
            <strong>Backend Developer</strong>
          </h1>
          <p className="subtitle">{subtitle}</p>
          <p className="description">{description}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
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

      <ScrollIndicator />
    </section>
  )
}

export default HeroSection
