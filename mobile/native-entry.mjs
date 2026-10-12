import { Capacitor, CapacitorHttp, registerPlugin } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { billingConfig, reviewAccessHash } from './billing-config.mjs';
import { createBillingStore } from './billing-store.mjs';
import { createReviewAccess } from './review-access.mjs';
import { validateGrant, verifyPurchase } from './billing-verification.mjs';

if (Capacitor.getPlatform() === 'android') {
  const review = createReviewAccess({
    expectedHash: reviewAccessHash,
    storage: {
      async get() { return (await Preferences.get({ key: 'letrin-review-access' })).value; },
      async set(hash) { await Preferences.set({ key: 'letrin-review-access', value: hash }); }
    },
    emit: () => document.dispatchEvent(new Event('letrinpremiumchange'))
  });
  window.LetrinReview = review;
  review.initialize();
  const billing = createBillingStore({
    bridge: registerPlugin('LetrinBilling'),
    config: billingConfig,
    storage: {
      async get() {
        const { value } = await Preferences.get({ key: 'letrin-verified-purchase' });
        return value ? validateGrant(JSON.parse(value), billingConfig) : null;
      },
      async set(grant) { await Preferences.set({ key: 'letrin-verified-purchase', value: JSON.stringify(grant) }); },
      async clear() { await Preferences.remove({ key: 'letrin-verified-purchase' }); }
    },
    verify: token => verifyPurchase(token, billingConfig, async (url, options) => {
      const response = await CapacitorHttp.request({ url, method: options.method, headers: options.headers, data: JSON.parse(options.body), responseType: 'json', connectTimeout: 15000, readTimeout: 15000 });
      return { ok: response.status >= 200 && response.status < 300, status: response.status, json: async () => response.data };
    }),
    emit: state => document.dispatchEvent(new CustomEvent('letrinbillingchange', { detail: state }))
  });
  window.LetrinBilling = billing;
  billing.initialize();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) billing.restore(); });
}
