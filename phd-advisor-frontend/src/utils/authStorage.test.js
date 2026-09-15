import { formatApiDetail } from './authStorage';

describe('formatApiDetail', () => {
  test('returns string details as-is', () => {
    expect(formatApiDetail('No account found for this email.', 'fallback'))
      .toBe('No account found for this email.');
  });

  test('flattens FastAPI validation lists', () => {
    const detail = [
      { loc: ['body', 'email'], msg: 'value is not a valid email address' },
    ];
    expect(formatApiDetail(detail, 'fallback')).toMatch(/email/i);
    expect(formatApiDetail(detail, 'fallback')).toMatch(/valid email/i);
  });

  test('uses fallback for empty detail', () => {
    expect(formatApiDetail(null, 'Login failed')).toBe('Login failed');
  });
});
