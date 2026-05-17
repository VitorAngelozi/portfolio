import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

const contacts = ['GitHub', 'LinkedIn', 'Email']

function ContactSection() {
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      id="contact"
      ref={ref}
      className={`content-section reveal${isVisible ? ' is-visible' : ''}`}
    >
      <SectionIntro title="Entre em Contato" />
      <div className="contact-links">
        {contacts.map((item) => (
          <a className="surface-card contact-link" href="#top" key={item}>
            <span>{item}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ContactSection
