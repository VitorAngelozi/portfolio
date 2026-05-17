import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

const experiences = [
  'Estagiário em Desenvolvimento de Sistemas',
  'Técnico de TI',
]

function ExperienceSection() {
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      id="experience"
      ref={ref}
      className={`content-section reveal${isVisible ? ' is-visible' : ''}`}
    >
      <SectionIntro title="Experiência Profissional" />
      <div className="experience-list">
        {experiences.map((role) => (
          <article className="surface-card experience-item" key={role}>
            <span className="timeline-dot" aria-hidden="true"></span>
            <div>
              <h3>{role}</h3>
              <p>Placeholder para resumo de atividades, entregas e tecnologias utilizadas.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
