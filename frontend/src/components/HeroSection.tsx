import type { CSSProperties } from 'react'
import ScrollIndicator from './ScrollIndicator'

type HeroSectionProps = {
  cta: {
    label: string
    href: string
  }
  subtitle: string
  description: string
}

const terminalLines = [
  { prompt: '$', command: 'whoami', output: 'vitor_angelozi' },
  { prompt: '$', command: 'scan --stack', output: 'go node python react typescript' },
  { prompt: '$', command: 'status --focus', output: 'apis automations backend systems' },
]

const modules = [
  { label: 'API', value: 'REST + integrações', level: 92 },
  { label: 'CORE', value: 'Go / Node / Python', level: 88 },
  { label: 'UI', value: 'React + TypeScript', level: 76 },
]

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

function HeroSection({ cta, subtitle, description }: HeroSectionProps) {
  return (
    <section className="portfolio-card hero-section">
      <header className="topbar">
        <a className="brand-name" href="#top" aria-label="voltar ao topo">
          {renderWaveText('VITOR.EXE')}
          <span className="brand-badge">PORTFOLIO</span>
        </a>

        <nav className="topnav" aria-label="Navegação principal">
          <a href="#about">SOBRE</a>
          <a href="#skills">STACK</a>
          <a href="#projects">PROJETOS</a>
        </nav>

        <a className="hire-link" href={cta.href} aria-label={cta.label}>
          {renderWaveText('[ CONTATO ]')}
        </a>
      </header>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="intro">:: sistema iniciado / perfil detectado</p>
          <h1>
            <span>VITOR</span>
            <strong>ANGELOZI</strong>
          </h1>
          <p className="role-line">Backend Developer</p>
          <p className="subtitle">{subtitle}</p>
          <p className="description">{description}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              <span aria-hidden="true">&gt;</span>
              VER PROJETOS
            </a>
            <a className="btn btn-ghost" href="/curriculo-vitor.pdf" download>
              <span aria-hidden="true">#</span>
              BAIXAR CURRÍCULO
            </a>
          </div>
        </div>

        <aside className="terminal-preview" aria-label="Resumo técnico em formato terminal">
          <div className="terminal-preview__bar">
            <span>portfolio.term</span>
            <span className="terminal-preview__status">ONLINE</span>
          </div>

          <div className="terminal-preview__screen">
            <div className="terminal-preview__scanline" aria-hidden="true"></div>

            <div className="terminal-block terminal-block--profile">
              <p className="terminal-kicker">USER PROFILE</p>
              <h2>BACKEND_DEV</h2>
              <p>Local modules ready. Building APIs, automations and web systems.</p>
            </div>

            <div className="terminal-log">
              {terminalLines.map((line) => (
                <div className="terminal-log__row" key={line.command}>
                  <span>{line.prompt}</span>
                  <code>{line.command}</code>
                  <strong>{line.output}</strong>
                </div>
              ))}
            </div>

            <div className="terminal-modules">
              {modules.map((module) => (
                <div className="terminal-module" key={module.label}>
                  <div>
                    <span>{module.label}</span>
                    <strong>{module.value}</strong>
                  </div>
                  <div className="terminal-meter" aria-label={`${module.label} ${module.level}%`}>
                    <span style={{ width: `${module.level}%` }}></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="terminal-stats">
              <div>
                <span>STACK</span>
                <strong>10+</strong>
              </div>
              <div>
                <span>MODE</span>
                <strong>BUILD</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong>READY</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <ScrollIndicator />
    </section>
  )
}

export default HeroSection
