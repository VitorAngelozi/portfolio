import { useEffect, useState } from 'react'
import HeroSection from './components/HeroSection'
import PortfolioSections from './components/PortfolioSections'
import './App.css'

type ProfileResponse = {
  headline: string
  cta: {
    label: string
    href: string
  }
}

const fallbackProfile: ProfileResponse = {
  headline: 'focado em Go, Node.js e Python.',
  cta: {
    label: 'Me contrate',
    href: '#contact',
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

        const data = (await response.json()) as Partial<ProfileResponse>
        setProfile({
          headline: data.headline ?? fallbackProfile.headline,
          cta: data.cta ?? fallbackProfile.cta,
        })
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
  const description =
    'Desenvolvo aplicações full stack, criando APIs, integrações e automações para transformar processos e ideias em soluções escaláveis.'

  return (
    <main className="portfolio-shell" id="top">
      <HeroSection
        ctaHref={activeProfile.cta.href}
        isLoading={isLoading}
        hasError={hasError}
        subtitle={activeProfile.headline}
        description={description}
      />
      <PortfolioSections />
    </main>
  )
}

export default App
