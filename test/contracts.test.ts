import { describe, it, expect } from 'vitest';
import { formatTokenAmount, parseTokenAmount } from '../src/utils/contracts';

describe('contracts utils', () => {
  it('should format a BigInt amount to string with decimals', () => {
  expect(formatTokenAmount('123456789', 6)).toBe('123.456789');
  });

  it('should parse a string amount to BigInt with decimals', () => {
  expect(parseTokenAmount('123.456789', 6)).toBe('123456789');
  });
});
