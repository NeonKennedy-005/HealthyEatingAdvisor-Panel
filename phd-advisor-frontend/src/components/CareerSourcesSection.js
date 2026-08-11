import React from 'react';

const SOURCE_CARDS = [
  {
    title: 'Clean eating basics',
    blurb: 'Whole foods, shorter ingredient lists, and practical swaps — guided by Kitchen Coach.',
  },
  {
    title: 'Fruits & vegetables',
    blurb: 'Easy prep ideas, tasty produce, and variety without overwhelm from Veggie Chef and Fruit Maven.',
  },
  {
    title: 'Books & deeper topics',
    blurb: 'Book Advisor shortlists, plus Superfoods Superman and Enzyme Explorer when you want to go further.',
  },
];

const CareerSourcesSection = () => (
  <section className="career-sources-section" aria-labelledby="career-sources-title">
    <h3 id="career-sources-title" className="features-title">What you can explore</h3>
    <p className="career-sources-intro">
      Heidi wrote this panel for people who want easy clean eating with real food — not complicated diets.
      Start with the advisors above, then dig into her sites for more guidance:{' '}
      <a
        href="https://getting-started-with-healthy-eating.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Getting Started with Healthy Eating
      </a>
      {' '}and{' '}
      <a
        href="https://foodagainstpain.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Food Against Pain
      </a>
      .
    </p>
    <div className="career-sources-grid">
      {SOURCE_CARDS.map((card) => (
        <article key={card.title} className="career-source-card">
          {/* Intentionally blank — Heidi will add photos later */}
          <div className="career-source-image career-source-image--empty" aria-hidden />
          <h4 className="feature-title">{card.title}</h4>
          <p className="feature-description">{card.blurb}</p>
        </article>
      ))}
    </div>
  </section>
);

export default CareerSourcesSection;
