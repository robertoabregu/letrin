const LetrinSoundtrack = (() => {
  let musicEnabled = true, effectsEnabled = true;
  let context = null, music = null, musicGain = null, unlocked = false;
  let voiceSequence = 0, activeVoice = null, effectTimer = null;
  const notes = new Set();
  try {
    musicEnabled = localStorage.getItem('letrin_music_v1') !== 'off';
    effectsEnabled = localStorage.getItem('letrin_effects_v1') !== 'off';
  } catch {}
  function volume() {
    if (!musicGain) return;
    const target = activeVoice?.phonetic ? .008 : activeVoice ? .035 : notes.size ? .065 : .14;
    musicGain.gain.cancelScheduledValues(context.currentTime);
    musicGain.gain.setTargetAtTime(target, context.currentTime, activeVoice ? .008 : .18);
  }
  function initialize() {
    if (context) return true;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    try {
      context = new AudioContextClass();
      music = new Audio('assets/audio/patterns-of-play.mp3');
      music.loop = true;
      music.preload = 'none';
      musicGain = context.createGain();
      musicGain.gain.value = .14;
      context.createMediaElementSource(music).connect(musicGain);
      musicGain.connect(context.destination);
      volume();
      return true;
    } catch {
      context = null;
      return false;
    }
  }
  async function start() {
    if (!unlocked || document.hidden || (!musicEnabled && !effectsEnabled) || !initialize()) return;
    try {
      if (context.state !== 'running') await context.resume();
      if (musicEnabled && !document.hidden && music.paused) await music.play();
    } catch {}
  }
  function unlock() { unlocked = true; start(); }
  ['pointerdown', 'click', 'keydown'].forEach(event => document.addEventListener(event, unlock, {capture:true}));
  function setMusic(value) {
    musicEnabled = Boolean(value);
    try { localStorage.setItem('letrin_music_v1', musicEnabled ? 'on' : 'off'); } catch {}
    if (!musicEnabled) music?.pause();
    else start();
  }
  function stopCelebration() {
    clearTimeout(effectTimer);
    for (const note of notes) { try { note.stop(); } catch {} }
    notes.clear();
    volume();
  }
  function setEffects(value) {
    effectsEnabled = Boolean(value);
    try { localStorage.setItem('letrin_effects_v1', effectsEnabled ? 'on' : 'off'); } catch {}
    if (!effectsEnabled) stopCelebration();
  }
  function beginVoice(phonetic = false) {
    const token = ++voiceSequence;
    stopCelebration();
    activeVoice = {token, phonetic};
    volume();
    return token;
  }
  function endVoice(token) {
    if (activeVoice?.token !== token) return;
    activeVoice = null;
    volume();
  }
  function celebrate() {
    if (!effectsEnabled || !unlocked || document.hidden || !initialize()) return;
    stopCelebration();
    context.resume().catch(() => {});
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const note = context.createOscillator();
      const gain = context.createGain();
      const time = context.currentTime + index * .1;
      note.type = 'triangle';
      note.frequency.value = frequency;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(.075, time + .015);
      gain.gain.exponentialRampToValueAtTime(.001, time + .28);
      note.connect(gain);
      gain.connect(context.destination);
      notes.add(note);
      note.onended = () => { notes.delete(note); note.disconnect(); gain.disconnect(); volume(); };
      note.start(time);
      note.stop(time + .3);
    });
    volume();
    effectTimer = setTimeout(stopCelebration, 750);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { music?.pause(); stopCelebration(); }
    else start();
  });
  window.addEventListener('pagehide', () => { music?.pause(); stopCelebration(); });
  window.addEventListener('pageshow', () => start());
  return {beginVoice, endVoice, celebrate, stopCelebration, setMusic, setEffects,
    musicEnabled:() => musicEnabled, effectsEnabled:() => effectsEnabled};
})();
