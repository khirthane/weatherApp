import { describe, expect, it } from 'vitest';
import { getFormatDate } from '../getFormatDate';

describe('getFormatDate', () => {
  it('formats a valid date string correctly', () => {
    expect(getFormatDate('2024-12-25')).toBe('Wed, 25 Dec');
  });

  it('returns "Invalid Date" for malformed input', () => {
    expect(getFormatDate('bad-input')).toBe('Invalid Date');
  });

  it('formats ISO date strings properly', () => {
    expect(getFormatDate('2025-07-27T00:00:00Z')).toBe('Sun, 27 Jul');
  });

  it('produces different outputs for different dates', () => {
    const d1 = getFormatDate('2024-01-01');
    const d2 = getFormatDate('2024-12-31');
    expect(d1).not.toBe(d2);
  });
  it('handles leap years correctly', () => {
    expect(getFormatDate('2020-02-29')).toBe('Sat, 29 Feb');
    expect(getFormatDate('2021-02-28')).toBe('Sun, 28 Feb');
  });
});
