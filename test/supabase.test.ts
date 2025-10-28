import { describe, it, expect, vi } from 'vitest';

// Mock the supabase client before importing the module under test
vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: () => {
      return {
        from: (table: string) => {
          if (table === 'users') {
            return {
              upsert: (_data: any, _opts: any) => ({
                select: () => ({ single: () => Promise.resolve({ data: { id: 'user-1', email: 'a@b.com', wallet_address: '0xabc' }, error: null }) })
              }),
              select: () => ({ single: () => Promise.resolve({ data: { id: 'user-1', email: 'a@b.com', wallet_address: '0xabc' }, error: null }) }),
            };
          }

          if (table === 'transactions') {
            return {
              insert: (_obj: any) => ({
                select: () => ({ single: () => Promise.resolve({ data: { id: 'tx-1', amount: '100', status: 'pending' }, error: null }) })
              }),
              update: (_updates: any) => ({
                eq: (_field: string, _val: string) => ({
                  select: () => ({ single: () => Promise.resolve({ data: { id: 'tx-1', status: _updates.status || 'confirmed' }, error: null }) })
                })
              }),
              select: () => Promise.resolve({ data: [], error: null }),
            };
          }

          return {
            select: () => Promise.resolve({ data: [], error: null })
          };
        }
      };
    }
  };
});

import { createOrUpdateUser, createTransaction, updateTransactionStatus } from '../src/utils/supabase';

describe('supabase utils', () => {
  it('createOrUpdateUser returns created user data', async () => {
    const user = await createOrUpdateUser('a@b.com', '0xabc');
    expect(user).toHaveProperty('id', 'user-1');
    expect(user).toHaveProperty('email', 'a@b.com');
  });

  it('createTransaction returns inserted transaction', async () => {
    const tx = await createTransaction('u1', 'u2', '0xfrom', '0xto', '100', '0xtoken', 'USDC', 8453);
    expect(tx).toHaveProperty('id', 'tx-1');
    expect(tx).toHaveProperty('status', 'pending');
  });

  it('updateTransactionStatus updates and returns transaction', async () => {
    const updated = await updateTransactionStatus('tx-1', 'confirmed', '0xhash');
    expect(updated).toHaveProperty('id', 'tx-1');
    expect(updated).toHaveProperty('status', 'confirmed');
  });
});
