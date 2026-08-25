import React from 'react';

const SOURCE_CARDS = [
  {
    title: 'Clean eating basics',
    blurb: 'Whole foods, shorter ingredient lists, and practical swaps — guided by Kitchen Coach.',
    image: '/home/01_left_clean_eating-pexels-yelenaodintsova-15792419-c.jpg',
    alt: 'Fresh vegetables and clean eating ingredients on a kitchen surface',
  },
  {
    title: 'Fruits & vegetables',
    blurb: 'Easy prep ideas, tasty produce, and variety without overwhelm from Veggie Chef and Fruit Maven.',
    image: '/home/02_center_fruits-pexels-kristina-snowasp-81019562-9986228-c.jpg',
    alt: 'Colorful fresh fruits and vegetables',
  },
  {
    title: 'Books & deeper topics',
    blurb: 'Book Advisor shortlists, plus Superfoods Superman and Enzyme Explorer when you want to go further.',
    image: '/home/03_right_books-pexels-yaroslav-shuraev-8844888-c.jpg',
    alt: 'Stack of cookbooks and food reference books',
  },
];

/**
 * Homepage explore cards with Heidi's 1920×1080 topic photos.
 */
const CareerSourcesSection = () => (
  <section className="career-sources-section" aria-labelledby="career-sources-title">
    <h3 id="career-sources-title" className="features-title">What you can explore</h3>
    <div className="career-sources-grid">
      {SOURCE_CARDS.map((card) => (
        <article key={card.title} className="career-source-card">
          <img
            className="career-source-image"
            src={card.image}
            alt={card.alt}
            loading="lazy"
            width={1920}
            height={1080}
          />
          <h4 className="feature-title">{card.title}</h4>
          <p className="feature-description">{card.blurb}</p>
        </article>
      ))}
    </div>
  </section>
);

export default CareerSourcesSection;
