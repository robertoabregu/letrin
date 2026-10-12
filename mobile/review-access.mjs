export function createReviewAccess({ expectedHash, storage, emit }) {
  let active = false;

  async function hashCode(code) {
    const bytes = new TextEncoder().encode(code.trim().toUpperCase());
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  return {
    get available() { return /^[a-f0-9]{64}$/.test(expectedHash); },
    get active() { return active; },
    async initialize() {
      if (!this.available) return;
      active = (await storage.get()) === expectedHash;
      emit(active);
    },
    async activate(code) {
      if (!this.available || !/^CR-[A-F0-9]{32}$/i.test(code.trim())) return false;
      const hash = await hashCode(code);
      if (hash !== expectedHash) return false;
      await storage.set(hash);
      active = true;
      emit(true);
      return true;
    }
  };
}
