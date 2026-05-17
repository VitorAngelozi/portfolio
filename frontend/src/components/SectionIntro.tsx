type SectionIntroProps = {
  title: string
  description?: string
}

function SectionIntro({ title, description }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  )
}

export default SectionIntro
