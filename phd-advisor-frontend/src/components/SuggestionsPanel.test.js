import { FormattedTitle } from '../components/SuggestionsPanel';
import { render } from '@testing-library/react';

test('renders added title words as strong, not raw markdown', () => {
  const { container } = render(
    <h3><FormattedTitle title="Let's learn about you **Where do I start?**" /></h3>
  );
  expect(container.textContent).toBe("Let's learn about you Where do I start?");
  expect(container.querySelector('strong').textContent).toBe('Where do I start?');
  expect(container.textContent).not.toMatch(/\*\*/);
});

test('renders a fully added title as strong', () => {
  const { container } = render(
    <h3><FormattedTitle title="**Try New Foods**" /></h3>
  );
  expect(container.textContent).toBe('Try New Foods');
  expect(container.querySelector('strong').textContent).toBe('Try New Foods');
});
