import { useCallback, useMemo, useState } from 'react'
import SectionIntro from './SectionIntro'
import ProjectModal from './ProjectModal'
import { projects } from './projectData'
import { useReveal } from '../useReveal'
import './ProjectsSection.css'

function ProjectsSection() {
  const { ref, isVisible } = useReveal<HTMLElement>()
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  )

  const openProject = useCallback((projectId: string, initialSlideIndex = 0) => {
    setActiveProjectId(projectId)
    setActiveSlideIndex(initialSlideIndex)
  }, [])

  const closeProject = useCallback(() => {
    setActiveProjectId(null)
    setActiveSlideIndex(0)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setActiveSlideIndex(index)
  }, [])

  const goToPreviousSlide = useCallback(() => {
    setActiveSlideIndex((currentIndex) => {
      if (!activeProject) {
        return currentIndex
      }

      return currentIndex === 0 ? activeProject.gallery.length - 1 : currentIndex - 1
    })
  }, [activeProject])

  const goToNextSlide = useCallback(() => {
    setActiveSlideIndex((currentIndex) => {
      if (!activeProject) {
        return currentIndex
      }

      return currentIndex === activeProject.gallery.length - 1 ? 0 : currentIndex + 1
    })
  }, [activeProject])

  return (
    <section
      id="projects"
      ref={ref}
      className={`content-section reveal${isVisible ? ' is-visible' : ''}`}
    >
      <SectionIntro
        title="Projeto em Destaque"
        description="Uma apresentacao focada no produto, na experiencia e na arquitetura do projeto que melhor representa meu trabalho atual."
      />

      <div className="showcase-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="surface-card showcase-card"
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={activeProjectId === project.id}
            aria-controls={`${project.id}-modal`}
            onClick={() => openProject(project.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openProject(project.id)
              }
            }}
          >
            <div className="showcase-card__media">
              <div className="showcase-card__cover">
                <img src={project.gallery[0].src} alt={project.gallery[0].alt} />
                <div className="showcase-card__overlay">
                  <span className="showcase-card__overlay-kicker">Preview do produto</span>
                  <strong>Clique para abrir o projeto completo</strong>
                </div>
              </div>

              <div className="showcase-card__thumb-grid">
                {project.gallery.slice(1, 4).map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    className="showcase-card__thumb"
                    onClick={(event) => {
                      event.stopPropagation()
                      openProject(project.id, index + 1)
                    }}
                  >
                    <img src={item.src} alt={item.alt} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="showcase-card__content">
              <div className="showcase-card__heading">
                <p className="showcase-card__eyebrow">{project.name}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>

              <div className="showcase-card__meta-grid">
                {project.meta.map((item) => (
                  <div key={item.label} className="showcase-card__meta-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className="badge-row showcase-card__badge-row">
                {project.highlights.map((item) => (
                  <span key={item} className="badge-pill">
                    {item}
                  </span>
                ))}
              </div>

              <div className="showcase-card__actions">
                <a
                  className="btn btn-ghost"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  Ver repositorio
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeProject ? (
        <ProjectModal
          project={activeProject}
          activeSlideIndex={activeSlideIndex}
          onClose={closeProject}
          onSelectSlide={goToSlide}
          onPreviousSlide={goToPreviousSlide}
          onNextSlide={goToNextSlide}
        />
      ) : null}
    </section>
  )
}

export default ProjectsSection
