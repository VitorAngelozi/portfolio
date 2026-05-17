import { useEffect, useState } from 'react'
import HeroSection from './components/HeroSection'
import PortfolioSections from './components/PortfolioSections'
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
    <main className="portfolio-shell" id="top">
      <HeroSection
        ctaHref={activeProfile.cta.href}
        isLoading={isLoading}
        hasError={hasError}
        name={activeProfile.name}
        subtitle={subtitle}
        description={description}
      />
      <PortfolioSections />
    </main>
  )
}

export default App
