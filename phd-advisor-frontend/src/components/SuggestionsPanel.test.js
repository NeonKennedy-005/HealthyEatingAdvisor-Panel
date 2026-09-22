import { FormattedTitle } from '../components/SuggestionsPanel';
import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';

test('renders added title words as strong, not raw markdown', () => {
  const { container } = render(
    <h3><FormattedTitle title="Where do I start?" /></h3>
  );
  expect(container.textContent).toBe('Where do I start?');
  expect(container.textContent).not.toMatch(/\*\*/);
});

test('strips leftover markdown from a fully marked title', () => {
  const { container } = render(
    <h3 className="category-title"><FormattedTitle title="**More**" /></h3>
  );
  expect(container.textContent).toBe('More');
  expect(container.querySelector('strong').textContent).toBe('More');
});

test('category-title CSS is bold and not italic', () => {
  const cssPath = path.join(__dirname, '../styles/components.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  const block = css.match(/\.category-title\s*\{[^}]+\}/);
  expect(block).not.toBeNull();
  expect(block[0]).toMatch(/font-weight:\s*600/);
  expect(block[0]).toMatch(/font-style:\s*normal/);
  expect(block[0]).not.toMatch(/font-style:\s*italic/);
});
