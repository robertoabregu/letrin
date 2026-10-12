export function createBillingStore({ bridge, config, storage, verify, emit }) {
  let state = { available: false, owned: false, busy: false, price: '', status: 'unavailable' };
  let queue = Promise.resolve();
  let subscribed = false;
  const publish = change => { state = { ...state, ...change }; emit({ ...state }); };
  const enabled = () => config.enabled && config.verificationUrl.startsWith('https://') && config.verificationPublicKey;

  function reconcile(update) {
    const task = queue.then(async () => {
      publish({ busy: true });
      try {
        if (update?.code === 1) { publish({ status: 'canceled' }); return; }
        if (update && update.code !== 0 && update.code !== 7) throw Error('store');
        const result = update?.code === 0 ? update : await bridge.restore();
        const purchases = result.purchases.filter(purchase => purchase.productId === config.productId);
        const purchased = purchases.find(purchase => purchase.state === 1);
        if (purchased) {
          const grant = await verify(purchased.token);
          await storage.set(grant);
          publish({ owned: true, status: 'purchased' });
        } else if (purchases.some(purchase => purchase.state === 2)) publish({ status: 'pending' });
        else { await storage.clear(); publish({ owned: false, status: 'empty' }); }
      } catch (error) {
        if (error.code === 'REVOKED') { await storage.clear(); publish({ owned: false, status: 'empty' }); }
        else publish({ status: 'error' });
      } finally { publish({ busy: false }); }
    });
    queue = task.catch(() => {});
    return task;
  }

  return {
    get state() { return { ...state }; },
    async initialize() {
      if (!enabled()) return;
      try { if (await storage.get()) publish({ owned: true }); } catch { await storage.clear(); }
      try {
        if (!subscribed) { await bridge.addListener('purchaseUpdated', update => reconcile(update)); subscribed = true; }
        const product = await bridge.initialize();
        publish({ available: !!product.price, price: product.price || '', status: 'ready' });
        await reconcile();
      } catch { publish({ status: 'error' }); }
    },
    restore() { return enabled() ? reconcile() : Promise.resolve(); },
    async buy() {
      if (!state.available || state.owned || state.busy) return;
      publish({ busy: true, status: 'buying' });
      try { await bridge.purchase(); } catch (error) { publish({ busy: false, status: String(error.code) === '1' ? 'canceled' : 'error' }); }
    }
  };
}
