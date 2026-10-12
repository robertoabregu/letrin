import assert from 'node:assert/strict';
import { generateKeyPairSync, verify } from 'node:crypto';
import { test } from 'node:test';
import { PACKAGE, PRODUCT, verifyAndGrant } from './verifier.mjs';

const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' });
const token = 'test-purchase-token';

test('verifies and acknowledges a purchased non-consumable', async () => {
  const calls = [];
  const grant = await verifyAndGrant(token, {
    privateKey: privatePem,
    request: async options => {
      calls.push(options);
      return { data: { purchaseState: 0, consumptionState: 0, acknowledgementState: 0, orderId: 'order-1' } };
    }
  });
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, new RegExp(`${PACKAGE}/purchases/products/${PRODUCT}/tokens/`));
  assert.equal(calls[1].method, 'POST');
  assert.equal(grant.payload.owned, true);
  assert.equal(grant.payload.productId, PRODUCT);
  assert.equal(verify('RSA-SHA256', Buffer.from(JSON.stringify(grant.payload)), publicKey, Buffer.from(grant.signature, 'base64url')), true);
});

test('rejects pending and consumed purchases', async () => {
  for (const purchase of [{ purchaseState: 2, consumptionState: 0 }, { purchaseState: 0, consumptionState: 1 }]) {
    await assert.rejects(verifyAndGrant(token, { privateKey: privatePem, request: async () => ({ data: purchase }) }), /not purchased/);
  }
});

test('rejects invalid tokens', async () => {
  await assert.rejects(verifyAndGrant('short', { privateKey: privatePem, request: async () => {} }), /invalid token/);
});

