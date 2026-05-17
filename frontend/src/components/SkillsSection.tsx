import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

const groups = [
  { title: 'Backend', items: ['Go', 'Python', 'Django', 'Java'] },
  { title: 'Frontend', items: ['React', 'TypeScript'] },
  { title: 'Banco de Dados', items: ['PostgreSQL', 'MySQL'] },
  { title: 'Ferramentas', items: ['Docker', 'Git', 'Linux'] },
]

function SkillsSection() {
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      id="skills"
      ref={ref}
      className={`content-section reveal${isVisible ? ' is-visible' : ''}`}
    >
      <SectionIntro title="Competências" />
      <div className="skills-grid">
        {groups.map((group) => (
          <article className="surface-card skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="badge-row">
              {group.items.map((item) => (
                <span className="badge-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
