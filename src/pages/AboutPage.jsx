function AboutPage() {
  const cards = [
    {
      title: "Student Module",
      text: "Students can log in, enter rank, choose branches, and track their result.",
    },
    {
      title: "Admin Module",
      text: "Admin manages branches, checks student entries, and runs seat allocation.",
    },
    {
      title: "Allocation Logic",
      text: "Students are sorted by rank and assigned the first available preferred branch.",
    },
  ];

  return (
    <div className="page-shell">
      <section className="info-hero">
        <span className="section-kicker">About Us</span>
        <h1>Simple, fair, and demo-ready counselling portal</h1>
        <p>
          This project shows a realistic counselling flow for college
          presentation use with student and admin modules.
        </p>
      </section>

      <section className="info-section">
        <div className="section-heading">
          <span className="section-kicker">Project Info</span>
          <h2>Core parts of the system</h2>
        </div>

        <div className="feature-grid simple-grid">
          {cards.map((card) => (
            <article key={card.title} className="feature-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
