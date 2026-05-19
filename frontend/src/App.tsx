import HeroSection from './components/HeroSection'
import PortfolioSections from './components/PortfolioSections'
import { profile } from './data/profile'
import './App.css'

function App() {
  return (
    <main className="portfolio-shell" id="top">
      <HeroSection
        cta={profile.cta}
        subtitle={profile.headline}
        description={profile.description}
      />
      <PortfolioSections />
    </main>
  )
}

export default App
