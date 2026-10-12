import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { createReviewAccess } from './review-access.mjs';

test('review access requires a matching long-lived code and restores it', async () => {
  const code = 'CR-0123456789ABCDEF0123456789ABCDEF';
  const expectedHash = createHash('sha256').update(code).digest('hex');
  let saved = null;
  const storage = { get: async () => saved, set: async value => { saved = value; } };
  const events = [];
  const review = createReviewAccess({ expectedHash, storage, emit: active => events.push(active) });
  await review.initialize();
  assert.equal(review.active, false);
  assert.equal(await review.activate('CR-00000000000000000000000000000000'), false);
  assert.equal(await review.activate(code.toLowerCase()), true);
  assert.equal(review.active, true);
  assert.equal(saved, expectedHash);
  const restored = createReviewAccess({ expectedHash, storage, emit: active => events.push(active) });
  await restored.initialize();
  assert.equal(restored.active, true);
});

test('review access is disabled without a configured hash', async () => {
  const review = createReviewAccess({ expectedHash: '', storage: { get: async () => null }, emit: () => {} });
  assert.equal(review.available, false);
  assert.equal(await review.activate('CR-0123456789ABCDEF0123456789ABCDEF'), false);
});
