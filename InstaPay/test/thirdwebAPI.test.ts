import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mapThirdwebStatusToInternal, isInsufficientFundsResponse, createPayment, completePayment } from '../src/utils/thirdwebAPI';

describe('thirdwebAPI utils', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('maps thirdweb statuses to internal statuses correctly', () => {
    expect(mapThirdwebStatusToInternal('QUEUED')).toBe('pending');
    expect(mapThirdwebStatusToInternal('SUBMITTED')).toBe('pending');
    expect(mapThirdwebStatusToInternal('CONFIRMED')).toBe('confirmed');
    expect(mapThirdwebStatusToInternal('FAILED')).toBe('failed');
    expect(mapThirdwebStatusToInternal(null)).toBe('pending');
  });

  it('detects insufficient funds response shape', () => {
    const insuf = { result: { link: 'https://fund.me' } };
    expect(isInsufficientFundsResponse(insuf as any)).toBe(true);
    const tx = { result: { transactionId: 'tx123', status: 'CONFIRMED' } };
    expect(isInsufficientFundsResponse(tx as any)).toBe(false);
  });

  it('createPayment returns id and link when API responds ok', async () => {
    const mockResponse = {
      result: {
        id: 'payment123',
        link: 'https://thirdweb/pay/123'
      }
    };

    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) } as any));

    const res = await createPayment('name', 'desc', '0xabc', '0xtoken', '100', 8453, 'usertoken');
    expect(res).toEqual({ id: 'payment123', link: 'https://thirdweb/pay/123' });
  });

  it('completePayment returns insufficient funds response when status 402', async () => {
    const mockBody = { result: { link: 'https://fund.me', rawQuote: {} } };
    global.fetch = vi.fn(() => Promise.resolve({ status: 402, json: () => Promise.resolve(mockBody) } as any));

    const res = await completePayment('pid', '0xfrom', 'userToken');
    // should be identified as insufficient funds structure
    expect(isInsufficientFundsResponse(res as any)).toBe(true);
  });
});
