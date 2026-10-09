const LetrinAudio = (() => {
  const key = 'letrin_audio_locale_v1';
  let preference = 'es-AR', sequence = 0, player = null, duckToken = null;
  try { const saved = localStorage.getItem(key); if (saved === 'auto' || LetrinAudioCatalog[saved]) preference = saved; } catch {}
  const normalize = value => (value || '').replace(/_/g,'-').toLowerCase();
  function locale(){
    if (LetrinLanguage.current()==='en') return 'en-US';
    if (preference !== 'auto') return preference;
    const language = (navigator.languages || [navigator.language]).find(value => normalize(value).startsWith('es'));
    const exact = Object.keys(LetrinAudioCatalog).find(value => normalize(value) === normalize(language));
    return exact || (language && normalize(language) !== 'es' ? 'es-419' : 'es-AR');
  }
  function voice(){
    const target = normalize(locale());
    const voices = window.speechSynthesis?.getVoices?.() || [];
    if (LetrinLanguage.current()==='en') {
      return voices.filter(item=>normalize(item.lang)==='en' || normalize(item.lang).startsWith('en-')).sort((first,second)=>(normalize(first.lang)==='en-us'?0:2)+(first.localService?0:1)-(normalize(second.lang)==='en-us'?0:2)-(second.localService?0:1))[0] || null;
    }
    const candidates = voices.filter(item => {
      const language = normalize(item.lang);
      return language === 'es' || language.startsWith('es-');
    }).filter(item => target === 'es-es' || !['es-es','es'].includes(normalize(item.lang)));
    const rank = item => {
      const language = normalize(item.lang);
      const preferred = target === 'es-419' ? ['es-419','es-ar','es-mx','es-us','es-uy','es-cl','es-co'] : [target,'es-ar','es-419','es-mx','es-us','es-uy','es-cl','es-co'];
      const index = preferred.indexOf(language);
      return (index < 0 ? 20 : index) * 2 + (item.localService ? 0 : 1);
    };
    return candidates.sort((first,second) => rank(first) - rank(second))[0] || null;
  }
  function cancel(){
    sequence++;
    LetrinSoundtrack.endVoice(duckToken);
    duckToken = null;
    if (player) { player.onended = null; player.onerror = null; player.pause(); player = null; }
    window.speechSynthesis?.cancel();
  }
  function setPreference(value){
    if (value !== 'auto' && !LetrinAudioCatalog[value]) return;
    cancel(); preference = value;
    try { localStorage.setItem(key, value); } catch {}
  }
  function speak(text,onEnd,onError){
    cancel();
    const session = sequence;
    duckToken = LetrinSoundtrack.beginVoice(Array.from(text).length === 1);
    const token = duckToken;
    let ended = false;
    const finish = () => { if (session === sequence && !ended) { ended = true; LetrinSoundtrack.endVoice(token); onEnd?.(); } };
    const fail = () => { if (session === sequence) { LetrinSoundtrack.endVoice(token); onError?.(LetrinLanguage.current()==='en'?'No English voice is available. Check your device voice settings.':'No hay una voz compatible disponible. Revisá Para adultos o instalá una voz latinoamericana en el dispositivo.'); } };
    const synthesize = () => {
      if (session !== sequence) return;
      const selected = voice();
      if (!selected || !window.speechSynthesis) { fail(); return; }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selected;
      utterance.lang = selected.lang;
      utterance.rate = .9;
      utterance.onend = finish;
      utterance.onerror = event => { if (session === sequence) { LetrinSoundtrack.endVoice(token); if (!['canceled','interrupted'].includes(event.error)) onError?.(LetrinLanguage.current()==='en'?'Audio could not play. Please try again.':'No se pudo reproducir el audio. Probá de nuevo.'); } };
      window.speechSynthesis.speak(utterance);
    };
    let fallbackStarted = false;
    const fallback = () => {
      if (session !== sequence) return;
      if (fallbackStarted) return;
      fallbackStarted = true;
      const synth = window.speechSynthesis;
      if (synth && !synth.getVoices?.().length && synth.addEventListener) {
        let waiting = true;
        const ready = () => { if (!waiting) return; waiting = false; synth.removeEventListener('voiceschanged', ready); clearTimeout(timer); synthesize(); };
        const timer = setTimeout(ready, 1000);
        synth.addEventListener('voiceschanged', ready);
      } else synthesize();
    };
    const clips = LetrinAudioCatalog[locale()]?.clips || {};
    const source = clips[text];
    if (source && typeof Audio !== 'undefined') {
      player = new Audio(source);
      player.onended = finish;
      player.onerror = fallback;
      player.play().catch(fallback);
    } else fallback();
  }
  function status(){
    const selected = voice();
    if (LetrinLanguage.current()==='en') return `English A includes five recordings, available offline after download.${selected?` Other text uses ${selected.name} (${selected.lang}); this voice may need internet.`:' No English device voice is available for other text.'}`;
    const pack = LetrinAudioCatalog[locale()];
    const label = pack.label;
    const recordings = Object.keys(pack.clips).length;
    const recordedStatus = recordings ? ` ${recordings} grabaciones de letras y palabras; los demás textos usan la voz del dispositivo.` : ' No hay grabaciones disponibles para esta región.';
    if (!selected) return `${label}.${recordedStatus} No se encontró una voz compatible para los textos sin grabación.`;
    return `${label}. Voz del dispositivo: ${selected.name} (${selected.lang}).${normalize(selected.lang) !== normalize(locale()) ? ' Se usa un acento alternativo disponible.' : ''}${selected.localService ? ' Voz local; probá también sin conexión.' : ' Esta voz puede necesitar internet.'}${recordedStatus}`;
  }
  return {speak,cancel,setPreference,status,getPreference:() => preference,locale};
})();
