import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectRecord } from './projectData'

type ProjectModalProps = {
  project: ProjectRecord
  activeSlideIndex: number
  onClose: () => void
  onSelectSlide: (index: number) => void
  onPreviousSlide: () => void
  onNextSlide: () => void
}

function ProjectModal({
  project,
  activeSlideIndex,
  onClose,
  onSelectSlide,
  onPreviousSlide,
  onNextSlide,
}: ProjectModalProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const [imageViewerProjectId, setImageViewerProjectId] = useState<string | null>(null)
  const isImageViewerOpen = imageViewerProjectId === project.id

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isImageViewerOpen) {
          setImageViewerProjectId(null)
        } else {
          onClose()
        }
      }

      if (event.key === 'ArrowLeft') {
        onPreviousSlide()
      }

      if (event.key === 'ArrowRight') {
        onNextSlide()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isImageViewerOpen, onClose, onNextSlide, onPreviousSlide])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0
    }
  }, [project.id])

  const activeSlide = project.gallery[activeSlideIndex]

  return createPortal(
    <div
      className="showcase-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do projeto ${project.name}`}
      onClick={onClose}
    >
      <div className="showcase-modal__panel" onClick={(event) => event.stopPropagation()}>
        <header className="showcase-modal__header">
          <div className="showcase-modal__header-copy">
            <p className="showcase-card__eyebrow">{project.name}</p>
            <h3>{project.title}</h3>
            <p>{project.modalSummary}</p>
          </div>

          <div className="showcase-modal__header-actions">
            <a
              className="btn btn-ghost showcase-modal__repo"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver repositório
            </a>
            <button
              type="button"
              className="showcase-modal__close"
              onClick={onClose}
              aria-label="Fechar projeto"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4L13.4 12l5.3 5.3-1.4 1.4L12 13.4l-5.3 5.3-1.4-1.4L10.6 12 5.3 6.7z" />
              </svg>
            </button>
          </div>
        </header>

        <div className="showcase-modal__body" ref={bodyRef}>
          <section className="showcase-modal__stage surface-card">
            <div className="showcase-modal__stage-top">
              <div>
                <span className="showcase-modal__stage-kicker">Galeria interativa</span>
                <strong>{activeSlide.label}</strong>
              </div>
              <span className="showcase-modal__counter">
                {activeSlideIndex + 1} / {project.gallery.length}
              </span>
            </div>

            <div className="showcase-modal__image-frame">
              <button
                type="button"
                className="showcase-modal__nav showcase-modal__nav--prev"
                onClick={onPreviousSlide}
                aria-label="Imagem anterior"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m14.7 5.3 1.4 1.4L10.8 12l5.3 5.3-1.4 1.4L8.1 12z" />
                </svg>
              </button>

              <button
                type="button"
                className="showcase-modal__image-zoom"
                onClick={() => setImageViewerProjectId(project.id)}
                aria-label="Abrir imagem em tamanho completo"
              >
                <img src={activeSlide.src} alt={activeSlide.alt} />
              </button>

              <button
                type="button"
                className="showcase-modal__nav showcase-modal__nav--next"
                onClick={onNextSlide}
                aria-label="Próxima imagem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9.3 18.7-1.4-1.4 5.3-5.3-5.3-5.3 1.4-1.4 6.6 6.7z" />
                </svg>
              </button>
            </div>

            <p className="showcase-modal__caption">{activeSlide.label}</p>
          </section>

          <section className="showcase-modal__filmstrip" aria-label={`Miniaturas de ${project.name}`}>
            {project.gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={`showcase-modal__thumb${index === activeSlideIndex ? ' is-active' : ''}`}
                onClick={() => onSelectSlide(index)}
              >
                <img src={item.src} alt={item.alt} />
                <span>{item.label}</span>
              </button>
            ))}
          </section>

          <section className="showcase-modal__details">
            <article className="surface-card showcase-modal__info-card">
              <p className="showcase-card__eyebrow">Sobre o projeto</p>
              <h4>{project.name} transforma prática de programação em progressão jogável.</h4>
              <p>{project.about}</p>
            </article>

            <article className="surface-card showcase-modal__info-card">
              <p className="showcase-card__eyebrow">Destaques técnicos</p>
              <div className="showcase-card__meta-grid">
                {project.meta.map((item) => (
                  <div key={item.label} className="showcase-card__meta-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card showcase-modal__info-card showcase-modal__info-card--wide">
              <p className="showcase-card__eyebrow">Arquitetura e responsabilidades</p>
              <ul className="showcase-modal__list">
                {project.architecturePoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="surface-card showcase-modal__info-card showcase-modal__info-card--wide">
              <p className="showcase-card__eyebrow">Stack utilizada</p>
              <div className="badge-row showcase-card__badge-row">
                {project.stack.map((item) => (
                  <span key={item} className="badge-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>

      {isImageViewerOpen ? (
        <div
          className="showcase-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada de ${project.name}`}
          onClick={() => setImageViewerProjectId(null)}
        >
          <button
            type="button"
            className="showcase-lightbox__close"
            onClick={() => setImageViewerProjectId(null)}
            aria-label="Fechar imagem ampliada"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4L13.4 12l5.3 5.3-1.4 1.4L12 13.4l-5.3 5.3-1.4-1.4L10.6 12 5.3 6.7z" />
            </svg>
          </button>

          <button
            type="button"
            className="showcase-lightbox__nav showcase-lightbox__nav--prev"
            onClick={(event) => {
              event.stopPropagation()
              onPreviousSlide()
            }}
            aria-label="Imagem anterior"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14.7 5.3 1.4 1.4L10.8 12l5.3 5.3-1.4 1.4L8.1 12z" />
            </svg>
          </button>

          <figure className="showcase-lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img src={activeSlide.src} alt={activeSlide.alt} />
            <figcaption>{activeSlide.label}</figcaption>
          </figure>

          <button
            type="button"
            className="showcase-lightbox__nav showcase-lightbox__nav--next"
            onClick={(event) => {
              event.stopPropagation()
              onNextSlide()
            }}
            aria-label="Próxima imagem"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9.3 18.7-1.4-1.4 5.3-5.3-5.3-5.3 1.4-1.4 6.6 6.7z" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>,
    document.body,
  )
}

export default ProjectModal
