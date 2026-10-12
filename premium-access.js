const LetrinPremium = (() => {
  const games = ['memory', 'bubbles', 'word', 'train', 'puzzle', 'detective'];
  const storageKey = 'letrin_premium_trials_v1';
  let completed = {};
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object') completed = saved;
  } catch {}

  const owned = () => window.LetrinBilling?.state?.owned === true || window.LetrinReview?.active === true;
  const canPlay = game => games.includes(game) && (owned() || completed[game] !== true);
  const trialComplete = game => completed[game] === true;

  function complete(game) {
    if (!games.includes(game) || owned() || completed[game] === true) return;
    completed[game] = true;
    try { localStorage.setItem(storageKey, JSON.stringify(completed)); } catch {}
    document.dispatchEvent(new Event('letrinpremiumchange'));
  }

  return {games, owned, canPlay, trialComplete, complete};
})();
