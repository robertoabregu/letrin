import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBillingStore } from './billing-store.mjs';

function fixture() {
  let stored = null;
  let listener;
  const events = [];
  const billing = createBillingStore({
    bridge: {
      async addListener(name, callback) { assert.equal(name, 'purchaseUpdated'); listener = callback; },
      async initialize() { return { price: 'USD 2.99' }; },
      async purchase() {},
      async restore() { return { code: 0, purchases: [] }; }
    },
    config: { enabled: true, verificationUrl: 'https://example.test/verify', verificationPublicKey: {}, productId: 'letrin_games_lifetime' },
    storage: { async get() { return stored; }, async set(value) { stored = value; }, async clear() { stored = null; } },
    verify: async token => ({ payload: { token } }),
    emit: state => events.push(state)
  });
  return { billing, events, update: value => listener(value), stored: () => stored };
}

test('restores a verified purchase and revokes it when Play no longer returns it', async () => {
  const { billing, update, stored } = fixture();
  await billing.initialize();
  assert.equal(billing.state.available, true);
  assert.equal(billing.state.owned, false);
  await update({ code: 0, purchases: [{ productId: 'letrin_games_lifetime', state: 1, token: 'token' }] });
  assert.equal(billing.state.owned, true);
  assert.equal(stored().payload.token, 'token');
  await billing.restore();
  assert.equal(billing.state.owned, false);
  assert.equal(stored(), null);
});

test('pending purchases do not unlock the games', async () => {
  const { billing, update } = fixture();
  await billing.initialize();
  await update({ code: 0, purchases: [{ productId: 'letrin_games_lifetime', state: 2, token: 'pending' }] });
  assert.equal(billing.state.owned, false);
  assert.equal(billing.state.status, 'pending');
});

test('billing stays unavailable until its backend is configured', async () => {
  const { billing } = fixture();
  const disabled = createBillingStore({
    bridge: {},
    config: { enabled: false, verificationUrl: '', verificationPublicKey: null },
    storage: {},
    verify: async () => {},
    emit: () => {}
  });
  await disabled.initialize();
  assert.equal(disabled.state.available, false);
  assert.equal(billing.state.available, false);
});

test('a purchase update arriving during restore is not lost', async () => {
  let finishRestore;
  let listener;
  const billing = createBillingStore({
    bridge: {
      async addListener(name, callback) { listener = callback; },
      async initialize() { return { price: 'USD 2.99' }; },
      async restore() { return await new Promise(resolve => { finishRestore = resolve; }); }
    },
    config: { enabled: true, verificationUrl: 'https://example.test/verify', verificationPublicKey: {}, productId: 'letrin_games_lifetime' },
    storage: { async get() { return null; }, async set() {}, async clear() {} },
    verify: async () => ({ payload: {} }),
    emit: () => {}
  });
  const initialization = billing.initialize();
  await new Promise(resolve => setImmediate(resolve));
  const purchase = listener({ code: 0, purchases: [{ productId: 'letrin_games_lifetime', state: 1, token: 'token' }] });
  finishRestore({ code: 0, purchases: [] });
  await Promise.all([initialization, purchase]);
  assert.equal(billing.state.owned, true);
});
