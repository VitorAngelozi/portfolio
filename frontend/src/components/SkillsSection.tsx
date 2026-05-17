import type { IconType } from 'react-icons'
import {
  SiDocker,
  SiDjango,
  SiGit,
  SiGo,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { FaJava, FaPaintBrush, FaTools } from 'react-icons/fa'
import { HiCircleStack, HiCog6Tooth } from 'react-icons/hi2'
import SectionIntro from './SectionIntro'
import { useReveal } from '../useReveal'

type SkillItem = {
  name: string
  icon: IconType
}

type SkillGroup = {
  title: string
  description: string
  icon: IconType
  items: SkillItem[]
}

const groups: SkillGroup[] = [
  {
    title: 'Backend',
    description: 'Construcao de APIs, automacoes e logica de negocio.',
    icon: HiCog6Tooth,
    items: [
      { name: 'Go', icon: SiGo },
      { name: 'Python', icon: SiPython },
      { name: 'Django', icon: SiDjango },
      { name: 'Java', icon: FaJava },
    ],
  },
  {
    title: 'Frontend',
    description: 'Interfaces modernas e responsivas.',
    icon: FaPaintBrush,
    items: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
    ],
  },
  {
    title: 'Banco de Dados',
    description: 'Modelagem, consultas e integracao de dados.',
    icon: HiCircleStack,
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    title: 'Ferramentas',
    description: 'Ambiente e infraestrutura de desenvolvimento.',
    icon: FaTools,
    items: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Git', icon: SiGit },
      { name: 'Linux', icon: SiLinux },
      { name: 'JavaScript', icon: SiJavascript },
    ],
  },
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
      <p className="skills-highlight">
        10+ tecnologias utilizadas no desenvolvimento de software.
      </p>
      <div className="skills-grid">
        {groups.map((group) => {
          const GroupIcon = group.icon

          return (
            <article className="surface-card skill-group" key={group.title}>
              <div className="skill-group-header">
                <span className="skill-group-icon" aria-hidden="true">
                  <GroupIcon />
                </span>
                <div className="skill-group-copy">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </div>
              <div className="badge-row">
                {group.items.map((item) => {
                  const ItemIcon = item.icon

                  return (
                    <span className="badge-pill" key={item.name}>
                      <span className="badge-icon" aria-hidden="true">
                        <ItemIcon />
                      </span>
                      <span>{item.name}</span>
                    </span>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsSection
