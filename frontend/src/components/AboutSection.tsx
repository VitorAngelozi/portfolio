import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

function AboutSection() {
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={ref}
      className={`content-section reveal${isVisible ? ' is-visible' : ''}`}
    >
      <SectionIntro
        title="Sobre Mim"
        description="Sou desenvolvedor de software com foco em backend, criação de APIs, automações e sistemas web. Trabalho principalmente com Go, Node.js,Python e PostgreSQL."
      />
    </section>
  )
}

export default AboutSection
