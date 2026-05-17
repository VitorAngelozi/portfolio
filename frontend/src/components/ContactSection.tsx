import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

const contacts = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vitorangelozi/',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/VitorAngelozi',
  },
  {
    label: 'Email',
    href: 'mailto:vitorangelozi2013@gmail.com',
  },
]

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
          <a
            className="surface-card contact-link"
            href={item.href}
            key={item.label}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ContactSection
