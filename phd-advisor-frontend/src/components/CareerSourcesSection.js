import React from 'react';

const SOURCE_CARDS = [
  {
    title: 'Clean eating basics',
    blurb: 'Whole foods, shorter ingredient lists, and practical swaps — guided by Kitchen Coach.',
    linkLabel: 'Ask Kitchen Coach in chat',
  },
  {
    title: 'Fruits & vegetables',
    blurb: 'Easy prep ideas, tasty produce, and variety without overwhelm from Veggie Chef and Fruit Maven.',
    linkLabel: 'Try a produce question',
  },
  {
    title: 'Books & superfoods',
    blurb: 'Book Advisor shortlists plus Superfoods Superman and Enzyme Explorer for deeper curiosity.',
    linkLabel: 'Browse ideas in chat',
  },
];

const CareerSourcesSection = () => (
  <section className="career-sources-section" aria-labelledby="career-sources-title">
    <h3 id="career-sources-title" className="features-title">What you can explore</h3>
    <p className="career-sources-intro">
      Grounded in Heidi Boudro&apos;s healthy-eating knowledge pack under <code>knowledge/</code>.
      Upload those markdown guides during chat when you want the advisors to cite specific articles or book notes.
    </p>
    <div className="career-sources-grid">
      {SOURCE_CARDS.map((card) => (
        <article key={card.title} className="career-source-card">
          <div
            className="career-source-image"
            style={{ minHeight: 120, background: 'var(--accent-soft, #F5F3FF)' }}
            aria-hidden
          />
          <h4 className="feature-title">{card.title}</h4>
          <p className="feature-description">{card.blurb}</p>
          <p className="career-source-link" style={{ margin: 0 }}>{card.linkLabel}</p>
        </article>
      ))}
    </div>
  </section>
);

export default CareerSourcesSection;
