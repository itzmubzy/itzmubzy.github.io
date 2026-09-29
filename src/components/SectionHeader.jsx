export default function SectionHeader({ label, title, description, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'right' ? 'section-heading-right' : ''}`}>
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

