import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

const projects = [
  {
    name: 'Integração JACAD',
    description:
      'Placeholder para um projeto focado em integrações, automações e fluxo de dados entre sistemas.',
  },
  {
    name: 'Codado',
    description:
      'Placeholder para uma aplicação web com foco em produtividade, organização e experiência consistente.',
  },
  {
    name: 'Banco de Talentos',
    description:
      'Placeholder para uma plataforma de cadastro, busca e gerenciamento de perfis profissionais.',
  },
]

function ProjectsSection() {
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      id="projects"
      ref={ref}
      className={`content-section reveal${isVisible ? ' is-visible' : ''}`}
    >
      <SectionIntro title="Projetos em Destaque" />
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="surface-card project-card" key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="card-actions">
              <a className="btn btn-ghost btn-small" href="#contact">
                GitHub
              </a>
              <a className="btn btn-primary btn-small" href="#contact">
                Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
