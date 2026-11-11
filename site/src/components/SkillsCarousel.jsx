const SKILLS = [
  "AEO",
  "GEO",
  "Technical SEO",
  "Local SEO",
  "Content Strategy",
  "Schema",
  "GA4",
  "Google Search Console",
  "Semrush",
  "Internal Linking",
];

export default function SkillsCarousel() {
  return (
    <div className="skills-carousel">
      <div className="skills-carousel__viewport">
        <div className="skills-carousel__track">
          <div className="skills-carousel__set">
            {SKILLS.map((skill) => (
              <div className="skills-carousel__cell" key={skill}>
                <span className="skills-carousel__dot" aria-hidden="true" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
          <div className="skills-carousel__set" aria-hidden="true">
            {SKILLS.map((skill) => (
              <div className="skills-carousel__cell" key={`${skill}-dup`}>
                <span className="skills-carousel__dot" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
