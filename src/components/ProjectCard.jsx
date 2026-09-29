function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card-${project.accent}`}>
      <div className="project-card-topline">
        <span>{project.number}</span>
        <span>{project.period}</span>
      </div>
      <div className="project-card-heading">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
      </div>
      <p className="project-description">{project.description}</p>
      <ul className="project-details">
        {project.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <div className="tag-list">
        {project.skills.map((skill) => (
          <span className="tag" key={skill}>{skill}</span>
        ))}
      </div>
      <div className="project-card-footer" aria-hidden="true">
        <span>Case study in progress</span>
        <ArrowIcon />
      </div>
    </article>
  );
}
