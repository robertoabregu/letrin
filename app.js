
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const screens = qsa('.screen');
const modal = qs('#modal');
const modalContent = qs('#modalContent');
const toast = qs('#toast');
let progress = {A: []};
const activityIds = ['know','trace','paint','starts','catch'];
try {
  const saved = JSON.parse(localStorage.getItem('letrin_progress_v03') || '{}');
  if (Array.isArray(saved?.A)) progress.A = [...new Set(saved.A)].filter(activity => activityIds.includes(activity));
} catch {}
let modalSession = 0;
let letterWasComplete = null;
let letterCelebrationPending = false;
modal.addEventListener('close', () => { modalSession++; LetrinAudio.cancel(); celebrateLetter(); });

function celebrateLetter(){
  if (!letterCelebrationPending || modal.open) return;
  letterCelebrationPending = false;
  const hero = qs('#letterA .letter-hero');
  hero.classList.add('letter-complete');
  window.scrollTo({top:0,behavior:'auto'});
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const confetti = document.createElement('div');
  confetti.className = 'letter-confetti';
  confetti.setAttribute('aria-hidden', 'true');
  const colors = ['#ff4965','#ffc928','#35d975','#29baff','#a366ff','#ff8c32'];
  for (let index = 0; index < 72; index++) {
    const piece = document.createElement('span');
    piece.className = index % 4 === 0 ? 'party-star' : 'party-piece';
    piece.textContent = index % 4 === 0 ? '★' : '';
    piece.style.setProperty('--x', `${8 + Math.random() * 84}%`);
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 240}px`);
    piece.style.setProperty('--delay', `${Math.random() * .75}s`);
    piece.style.setProperty('--spin', `${(Math.random() - .5) * 1080}deg`);
    piece.style.setProperty('--color', colors[index % colors.length]);
    confetti.appendChild(piece);
  }
  hero.appendChild(confetti);
  hero.classList.add('letter-celebrating');
  setTimeout(() => { hero.classList.remove('letter-celebrating'); confetti.remove(); }, 3800);
}

function go(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
qsa('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
qs('#homePlay').onclick=()=>go(progress.A.some(activity=>activityIds.includes(activity))?'letterA':'letters');

function speak(text, onEnd){
  LetrinAudio.speak(text, onEnd, showToast);
}
qs('#audioSettings').onclick = () => {
  openModal(`<h2 class="modal-title">Audio y acento</h2><p class="helper">Preferencia para adultos. Cambiar el acento no modifica el progreso ni traduce los textos.</p><label class="audio-label" for="audioLocale">Español y región</label><select id="audioLocale"><option value="auto">Según el idioma del dispositivo</option>${Object.entries(LetrinAudioCatalog).map(([value,pack]) => `<option value="${value}">${pack.label}</option>`).join('')}</select><p id="audioVoiceStatus" class="helper" role="status"></p><div class="word-footer"><button id="testVoice" class="btn secondary">Escuchar una prueba</button></div>`);
  qs('#audioLocale').value = LetrinAudio.getPreference();
  const update = () => { qs('#audioVoiceStatus').textContent = LetrinAudio.status(); };
  qs('#audioLocale').onchange = event => { LetrinAudio.setPreference(event.target.value); update(); };
  qs('#testVoice').onclick = () => speak('Abeja. Avión. Árbol. Araña.');
  const session = modalSession;
  const synth = window.speechSynthesis;
  const changed = () => { if (modal.open && session === modalSession) update(); };
  synth?.addEventListener?.('voiceschanged', changed);
  modal.addEventListener('close', () => synth?.removeEventListener?.('voiceschanged', changed), {once:true});
  update();
};

const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const alphabet = qs('#alphabet');
letters.forEach(letter => {
  const btn = document.createElement('button');
  btn.className = 'letter-btn' + (letter === 'A' ? ' a' : '');
  btn.dataset.letter = letter;
  btn.innerHTML = `<span class="letter-label">${letter}</span><span class="letter-paws" aria-hidden="true"></span>`;
  btn.setAttribute('aria-label', letter === 'A' ? 'Letra A: jugar' : `Letra ${letter}: próximamente gratis`);
  btn.onclick = () => letter === 'A' ? go('letterA') : showInfo(letter);
  alphabet.appendChild(btn);
});

function saveProgress(){
  try { localStorage.setItem('letrin_progress_v03', JSON.stringify(progress)); } catch { showToast('El progreso no se puede guardar en este navegador'); }
  refreshProgress();
}
function pawIcon(earned=false){
  return `<svg class="paw${earned?' earned':''}" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><ellipse cx="9" cy="14" rx="4" ry="6" transform="rotate(-25 9 14)"/><ellipse cx="17" cy="8" rx="4" ry="6"/><ellipse cx="26" cy="9" rx="4" ry="6"/><ellipse cx="33" cy="16" rx="4" ry="6" transform="rotate(25 33 16)"/><path d="M10 30C10 25 15 19 20 19S31 26 31 31C31 37 25 35 21 34C17 35 10 37 10 30Z"/></svg>`;
}
function pawMarkup(count){
  return activityIds.map((activity,index) => pawIcon(index<count)).join('');
}
function uiIcon(name){
  return `<svg class="ui-icon" aria-hidden="true" focusable="false"><use href="assets/ui-icons.svg#${name}"/></svg>`;
}
function refreshProgress(){
  const done = activityIds.filter(activity => progress.A.includes(activity));
  const complete = done.length === activityIds.length;
  qs('#homeProgress').hidden=done.length===0;
  qs('#homePaws').innerHTML=pawMarkup(done.length);
  qs('#homeProgressText').textContent=complete?'¡Completaste las 5 actividades!':`${done.length} de 5 actividades completadas`;
  qs('#homeProgressText').classList.toggle('complete',complete);
  qs('#homeHeading').textContent=done.length?'¿Seguimos jugando?':'¿Jugamos con las letras?';
  qs('#homePlayLabel').textContent=complete?'Volver a jugar':done.length?'Seguir jugando':'¡A jugar!';
  qs('#homeLetterArt').src=`assets/letra-a-${complete?'verde':'roja'}.webp`;
  if (complete && letterWasComplete === false) letterCelebrationPending = true;
  qs('#letterA .letter-hero').classList.toggle('letter-complete', complete && !letterCelebrationPending);
  qs('#letterA .big-letter').setAttribute('aria-label', `A mayúscula y a minúscula${complete?': todas las actividades completas':''}`);
  letterWasComplete = complete;
  const counter = qs('#pawProgress');
  counter.setAttribute('aria-label', `${done.length} de 5 actividades completas`);
  counter.innerHTML = pawMarkup(done.length);
  qsa('[data-letter]').forEach(button => {
    const letter = button.dataset.letter;
    const count = activityIds.filter(activity => (progress[letter] || []).includes(activity)).length;
    button.classList.toggle('completed', count === activityIds.length);
    button.querySelector('.letter-paws').innerHTML = pawMarkup(count);
    button.setAttribute('aria-label', `Letra ${letter}: ${letter==='A'?'jugar':'próximamente gratis'}, ${count} de 5 actividades completas`);
  });
  qsa('[data-activity]').forEach(btn => btn.classList.toggle('done', done.includes(btn.dataset.activity)));
}
function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
function markDone(activity){
  progress.A = progress.A || [];
  if(!progress.A.includes(activity)){
    progress.A.push(activity);
    saveProgress();
  }
}
function celebrate(activity, title){
  markDone(activity);
  const poses = {know:'milo-fiesta-0',trace:'milo-fiesta-1',paint:'milo-fiesta-2',starts:'milo-fiesta-3',catch:'milo-fiesta-4'};
  openModal(`<h2 class="modal-title">${title}</h2><div class="activity-celebration"><img src="assets/${poses[activity]}.webp" alt="Milo festeja tu logro"><p role="status">¡Actividad completada!</p></div><div class="word-footer"><button class="btn secondary" id="continueActivity">Continuar</button></div>`);
  qs('#continueActivity').onclick=()=>modal.close();
}
function letterMask(){
  const mask=document.createElement('canvas');
  mask.width=420; mask.height=420;
  const context=mask.getContext('2d');
  context.strokeStyle='#d5eaf5'; context.lineWidth=54; context.lineCap='round'; context.lineJoin='round';
  LetterPath.strokes.forEach(([start,end])=>{context.beginPath();context.moveTo(start.x,start.y);context.lineTo(end.x,end.y);context.stroke();});
  return mask;
}
function drawingActivity(activity){
  const tracing=activity==='trace';
  openModal(`<div class="drawing-header"><img class="word-heading-art" src="assets/actividad-${tracing?'trazar':'pintar'}.webp" alt=""><h2 class="modal-title">${tracing?'Trazar':'Pintar'} la letra A</h2><p class="helper">${tracing?'Seguí el camino, paso a paso.':'¡Dale color a tu letra!'}</p></div>${tracing?'<ol class="trace-steps" aria-label="Pasos del trazado"><li class="current" aria-current="step">1</li><li>2</li><li>3</li></ol>':'<div class="palette" id="palette" role="group" aria-label="Elegí un color"></div>'}<div class="canvas-wrap drawing-board ${tracing?'tracing-board':'painting-board'}"><div class="drawing-workspace">${tracing?'<img class="drawing-milo trace-milo" src="assets/milo-trazar.webp" alt="Milo chusmea el trazado desde el borde izquierdo">':''}<div class="trace-stage"><canvas id="letterCanvas" width="420" height="420" aria-label="${tracing?'Trazar la letra A siguiendo las guías numeradas':'Pintar dentro de la letra A con el color elegido'}"></canvas></div></div><div class="drawing-feedback">${tracing?`<div class="trace-rewards" aria-hidden="true">${pawIcon()}${pawIcon()}${pawIcon()}</div><p id="drawingStatus" role="status">0 de 3 trazos</p>`:'<p id="drawingStatus" role="status">Elegí un color y empezá a pintar</p><img class="drawing-milo paint-milo" src="assets/milo-pintar.webp" alt="Milo se asoma por el borde inferior derecho">'}</div><div class="progressbar" role="progressbar" aria-label="${tracing?'Recorrido trazado':'Superficie pintada'}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="traceFill"></div></div><div class="complete-row"><button id="clearLetter" class="btn secondary">Borrar</button>${tracing?'':'<button id="finishPaint" class="btn paint-finish" disabled>¡Terminé!</button>'}</div></div>`);
  modal.classList.add('drawing-modal');
  modal.classList.add('activity-modal');
  if(tracing)qs('.trace-stage').appendChild(qs('.trace-milo'));
  const canvas=qs('#letterCanvas'), context=canvas.getContext('2d'), mask=letterMask();
  const ink=document.createElement('canvas'); ink.width=420; ink.height=420;
  const brush=ink.getContext('2d'); brush.lineWidth=tracing?22:32; brush.lineCap='round';
  let color=tracing?'#20b9ed':'#ff5f73', drawing=false, last=null, tracker=LetterPath.coverage(), ratios=[0,0,0];
  const maskPixels=mask.getContext('2d').getImageData(0,0,420,420).data;
  const maskCount=maskPixels.filter((value,index)=>index%4===3 && value>128).length;
  function redraw(){
    context.clearRect(0,0,420,420);
    context.strokeStyle=tracing?'#e0f4fc':'#addcf3';context.lineWidth=tracing?58:62;context.lineCap='round';
    LetterPath.strokes.forEach(([start,end])=>{context.beginPath();context.moveTo(start.x,start.y);context.lineTo(end.x,end.y);context.stroke();});
    if(!tracing){context.strokeStyle='#fff';context.lineWidth=54;LetterPath.strokes.forEach(([start,end])=>{context.beginPath();context.moveTo(start.x,start.y);context.lineTo(end.x,end.y);context.stroke();});}
    context.drawImage(ink,0,0);
    if(tracing){
      const active=ratios.findIndex(value=>value<1);
      LetterPath.strokes.forEach(([start,end],index)=>{
        if(ratios[index]===1)return;
        context.strokeStyle=index===active?'#237fb1':'#8bafc3';context.lineWidth=4;context.setLineDash([3,11]);
        context.beginPath();context.moveTo(start.x,start.y);context.lineTo(end.x,end.y);context.stroke();context.setLineDash([]);
        const angle=Math.atan2(end.y-start.y,end.x-start.x);
        context.beginPath();context.moveTo(end.x-12*Math.cos(angle-.6),end.y-12*Math.sin(angle-.6));context.lineTo(end.x,end.y);context.lineTo(end.x-12*Math.cos(angle+.6),end.y-12*Math.sin(angle+.6));context.stroke();
        context.beginPath();context.arc(start.x,start.y,15,0,Math.PI*2);context.fillStyle=index===active?'#168dd4':'#8bafc3';context.fill();context.strokeStyle='#fff';context.lineWidth=3;context.stroke();
        context.fillStyle='#fff';context.font='900 18px Nunito, sans-serif';context.textAlign='center';context.textBaseline='middle';context.fillText(String(index+1),start.x,start.y+1);
      });
    }
  }
  redraw();
  if(!tracing){
    ['#ff5f73','#ff9b1f','#ffd447','#35cc76','#2c9fff','#8f67ff','#ff85be'].forEach((value,index)=>{
      const button=document.createElement('button');button.className='color'+(index===0?' active':'');button.style.setProperty('--paint-color',value);button.setAttribute('aria-label',['Rosa coral','Naranja','Amarillo','Verde','Azul','Violeta','Rosa'][index]);button.setAttribute('aria-pressed',String(index===0));
      button.onclick=()=>{qsa('.color').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-pressed','false');});button.classList.add('active');button.setAttribute('aria-pressed','true');color=value;};qs('#palette').appendChild(button);
    });
    qs('#finishPaint').onclick=()=>celebrate('paint','¡Qué lindo dibujo!');
  }
  const position=event=>{const bounds=canvas.getBoundingClientRect();return {x:(event.clientX-bounds.left)*420/bounds.width,y:(event.clientY-bounds.top)*420/bounds.height};};
  function draw(point){
    brush.globalCompositeOperation='source-over';brush.strokeStyle=color;brush.beginPath();brush.moveTo(last.x,last.y);brush.lineTo(point.x,point.y);brush.stroke();
    brush.globalCompositeOperation='destination-in';brush.drawImage(mask,0,0);brush.globalCompositeOperation='source-over';redraw();
    if(tracing){
      const result=tracker.add(last,point);ratios=result.ratios;redraw();qs('#traceFill').style.width=result.percent+'%';qs('.drawing-board .progressbar').setAttribute('aria-valuenow',result.percent);
      const completed=ratios.filter(value=>value===1).length, active=ratios.findIndex(value=>value<1);
      qs('#drawingStatus').textContent=`${completed} de 3 trazos`;
      qsa('.trace-steps li').forEach((step,index)=>{step.classList.toggle('finished',ratios[index]===1);step.classList.toggle('current',index===active);step.textContent=ratios[index]===1?'✓':String(index+1);if(index===active)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});
      qsa('.trace-rewards .paw').forEach((paw,index)=>paw.classList.toggle('earned',ratios[index]===1));
      if(result.complete){drawing=false;celebrate('trace','¡Trazado listo!');}
    } else {
      const pixels=brush.getImageData(0,0,420,420).data;
      let painted=0;
      for(let index=3;index<pixels.length;index+=4){if(pixels[index]>128 && maskPixels[index]>128)painted++;}
      const percent=Math.round(painted/maskCount*100);
      qs('#traceFill').style.width=percent+'%';qs('.drawing-board .progressbar').setAttribute('aria-valuenow',percent);
      qs('#drawingStatus').textContent=painted?'¡Tu obra va tomando color!':'Elegí un color y empezá a pintar';
      qs('#finishPaint').disabled=!painted;
    }
    last=point;
  }
  canvas.onpointerdown=event=>{drawing=true;last=position(event);canvas.setPointerCapture(event.pointerId);draw({x:last.x+.01,y:last.y});};
  canvas.onpointermove=event=>{if(drawing){event.preventDefault();draw(position(event));}};
  canvas.onpointerup=event=>{if(drawing)draw(position(event));drawing=false;};
  canvas.onpointercancel=()=>{drawing=false;};
  qs('#clearLetter').onclick=()=>{drawing=false;brush.clearRect(0,0,420,420);tracker=LetterPath.coverage();ratios=[0,0,0];redraw();qs('#traceFill').style.width='0%';qs('.drawing-board .progressbar').setAttribute('aria-valuenow','0');qs('#drawingStatus').textContent=tracing?'0 de 3 trazos':'Elegí un color y empezá a pintar';if(tracing){qsa('.trace-steps li').forEach((step,index)=>{step.classList.remove('finished');step.classList.toggle('current',index===0);step.textContent=String(index+1);if(index===0)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});qsa('.trace-rewards .paw').forEach(paw=>paw.classList.remove('earned'));}else qs('#finishPaint').disabled=true;};
}
function openModal(html){
  LetrinAudio.cancel();
  modalSession++;
  modal.classList.remove('word-modal');
  modal.classList.remove('memory-modal');
  modal.classList.remove('bubbles-modal');
  modal.classList.remove('builder-modal');
  modal.classList.remove('drawing-modal');
  modal.classList.remove('activity-modal');
  modal.classList.remove('choice-modal');
  modal.classList.remove('catch-modal');
  modalContent.innerHTML = html;
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
}
qs('#closeModal').onclick = () => modal.close();

function showInfo(letter){
  openModal(`
    <h2 class="modal-title">Letra ${letter}</h2>
    <p class="helper">La ${letter} llegará gratis en una próxima actualización. Mientras tanto, ¡podés jugar con la A!</p>
  `);
}

const actions = {
  know(){ 
    openModal(`
      <header class="activity-header"><img class="word-heading-art" src="assets/abeja.webp" alt="">
      <h2 class="modal-title">Empieza con la letra A</h2>
      <p class="helper word-instruction">Tocá cada imagen para escuchar cómo se pronuncia.</p></header>
      <div class="word-list" id="wordChoices"></div>
      <div class="word-footer"><button id="continueWords" class="btn secondary">Continuar</button></div>
    `);
    modal.classList.add('word-modal','activity-modal');
    const session = modalSession;
    const heard = new Set();
    let completed = false;
    const words = [{name:'Abeja',asset:'abeja'}, {name:'Avión',asset:'avion'}, {name:'Árbol',asset:'arbol'}, {name:'Araña',asset:'arana'}];
    words.forEach(word => {
      const button = document.createElement('button');
      button.className = 'word-chip';
      button.setAttribute('aria-label', `Escuchar ${word.name}`);
      button.innerHTML = `<img src="assets/${word.asset}.webp" alt=""><b>${word.name}</b><span class="word-speaker" aria-hidden="true">${uiIcon('sound')}</span>`;
      button.onclick = () => {
        speak(word.name, () => {
          if (!modal.open || session !== modalSession) return;
          heard.add(word.asset);
          button.classList.add('heard');
          button.setAttribute('aria-label', `Escuchar ${word.name}, escuchada`);
          if (heard.size === words.length && !completed) {
            completed = true;
            celebrate('know', '¡Escuchaste las cuatro palabras!');
          }
        });
      };
      qs('#wordChoices').appendChild(button);
    });
    qs('#continueWords').onclick = () => modal.close();
  },

  trace(){ drawingActivity('trace'); },
  paint(){ drawingActivity('paint'); },

  starts(){
    const rounds = [
      [{asset:'avion', word:'Avión', ok:true}, {asset:'sol', word:'Sol', ok:false}, {asset:'oso', word:'Oso', ok:false}, {asset:'casa', word:'Casa', ok:false}],
      [{asset:'arbol', word:'Árbol', ok:true}, {asset:'pelota', word:'Pelota', ok:false}, {asset:'luna', word:'Luna', ok:false}, {asset:'barco', word:'Barco', ok:false}],
      [{asset:'arana', word:'Araña', ok:true}, {asset:'flor', word:'Flor', ok:false}, {asset:'gato', word:'Gato', ok:false}, {asset:'banana', word:'Banana', ok:false}]
    ];
    let round = 0, score = 0;

    const render = () => {
      const done = round >= rounds.length;
      if(done){
        celebrate('starts','¡Excelente! Acertaste las tres.');
        return;
      }
      openModal(`
        <header class="activity-header"><img class="word-heading-art" src="assets/actividad-elegir.webp" alt="">
        <h2 class="modal-title">¿Cuál empieza con A?</h2>
        <p class="helper activity-instruction">Elegí la imagen que empieza con A.</p></header>
        <div class="status-line"><span>Pregunta ${round+1} de 3</span><span class="paw-score"><span class="sr-only">Patitas doradas:</span>${pawIcon(true)} ${score}</span></div>
        <div class="choice-grid" id="choices"></div>
      `);
      modal.classList.add('activity-modal','choice-modal');
      const container = qs('#choices');
      const session = modalSession;
      let answered = false;
      const options = [...rounds[round]];
      for (let index = options.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
      }
      options.forEach(item => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.innerHTML = `<img class="choice-art" src="assets/${item.asset}.webp" alt=""><span>${item.word}</span>`;
        b.onclick = () => {
          if (answered) return;
          if(item.ok){
            answered = true;
            b.classList.add('good');
            score++;
            setTimeout(() => { if (modal.open && session === modalSession) { round++; render(); } }, 500);
          } else {
            b.classList.add('bad');
            setTimeout(() => b.classList.remove('bad'), 420);
          }
        };
        container.appendChild(b);
      });
    };
    render();
  },

  catch(){
    openModal(`
      <header class="activity-header"><img class="word-heading-art" src="assets/actividad-atrapar.webp" alt="">
      <h2 class="modal-title">Atrapa la letra</h2>
      <p class="helper activity-instruction">Tocá solo las letras A.</p></header>
      <div class="status-line"><span>Tiempo: <b id="time">15</b>s</span><span class="paw-score"><span class="sr-only">Patitas doradas:</span>${pawIcon(true)} <b id="score">0</b></span></div>
      <div id="catchBoard" class="catch-board"></div>
    `);
    modal.classList.add('activity-modal','catch-modal');

    const board = qs('#catchBoard');
    let time = 15, score = 0, active = true;
    const pool = ['A','B','C','A','M','O','A','S','P','A'];
    const falls = [];

    function spawn(){
      if(!active) return;
      const el = document.createElement('button');
      const val = pool[Math.floor(Math.random()*pool.length)];
      el.className = 'fall';
      el.textContent = val;
      el.style.left = Math.random() * 84 + '%';
      el.style.top = '-60px';
      el.style.background = val === 'A' ? '#fff1a9' : '#dbedff';
      board.appendChild(el);

      let y = -60;
      const timer = setInterval(() => {
        y += 4;
        el.style.top = y + 'px';
        if(y > board.clientHeight){
          clearInterval(timer);
          el.remove();
        }
      }, 28);
      falls.push(timer);

      el.onclick = () => {
        if(el.disabled || !active)return;
        el.disabled=true;
        const burst=document.createElement('div');
        burst.className='balloon-burst';burst.setAttribute('aria-hidden','true');
        burst.style.left=(el.offsetLeft+el.offsetWidth/2)+'px';burst.style.top=(el.offsetTop+el.offsetHeight/2)+'px';
        burst.style.setProperty('--burst-color',getComputedStyle(el).backgroundColor);
        for(let index=0;index<8;index++){
          const fragment=document.createElement('i'),angle=index*Math.PI/4;
          fragment.style.setProperty('--dx',Math.cos(angle)*46+'px');fragment.style.setProperty('--dy',Math.sin(angle)*46+'px');fragment.style.setProperty('--turn',index*71+'deg');burst.appendChild(fragment);
        }
        board.appendChild(burst);setTimeout(()=>burst.remove(),550);
        if(val === 'A'){ score++; qs('#score').textContent = score; }
        else{ score = Math.max(0, score-1); qs('#score').textContent = score; }
        el.remove();
        clearInterval(timer);
      };
    }

    const spawner = setInterval(spawn, 520);
    spawn();
    const timer = setInterval(() => {
      time--;
      qs('#time').textContent = time;
      if(time <= 0){
        clearInterval(timer); clearInterval(spawner); active = false;
        falls.forEach(id => clearInterval(id));
        if(score>0) celebrate('catch',`¡Atrapaste ${score} ${score===1?'letra':'letras'} A!`);
        else {board.innerHTML='';modalContent.insertAdjacentHTML('beforeend','<p class="helper">¡Intentá atrapar una A! Podés volver a jugar.</p>');}
      }
    }, 1000);

    modal.addEventListener('close', () => {
      active = false;
      clearInterval(timer);
      clearInterval(spawner);
      falls.forEach(id => clearInterval(id));
    }, {once:true});
  }
};

qsa('[data-activity]').forEach(btn => btn.addEventListener('click', () => actions[btn.dataset.activity]()));

function premiumShell(title, inner){
  openModal(`
    <h2 class="modal-title">${title} ${uiIcon('lock')}</h2>
    <p class="helper">Demo breve para mostrar el valor del juego antes de comprar.</p>
    ${inner}
    <div class="cta">
      <strong>Desbloqueá todos los juegos premium para todas las letras</strong>
      <ul class="checks">
        <li>El abecedario base sigue incluido</li>
        <li>Pago único</li>
        <li>Sin anuncios</li>
        <li>Funciona sin conexión</li>
      </ul>
      <div class="complete-row">
        <button class="btn primary" id="buyPremium">Desbloquear juegos premium</button>
        <button class="btn secondary" id="restorePremium">Restaurar compra</button>
      </div>
    </div>
  `);
  qs('#buyPremium').textContent = 'Compras disponibles próximamente';
  qs('#buyPremium').disabled = true;
  qs('#restorePremium').textContent = 'Esta versión incluye demos gratuitas';
  qs('#restorePremium').disabled = true;
}

const premium = {
  memory(){
    openModal(`<div class="memory-heading"><span class="memory-art"><img src="assets/abeja.webp" alt=""><img src="assets/avion.webp" alt=""></span><h2 class="modal-title">Memotest de la A</h2></div><p class="helper memory-instruction">Encontrá las cuatro parejas de imágenes iguales.</p><div class="memory-status"><span class="paw-score"><span class="sr-only">Parejas encontradas:</span>${pawIcon(true)} <b id="memoryPairs">0</b>/4</span><span>Intentos: <b id="memoryMoves">0</b></span></div><div class="memory-grid" id="memgrid"></div><div class="word-footer"><button class="btn secondary" id="restartMemory">Volver a empezar</button></div>`);
    modal.classList.add('memory-modal');
    const words = [{asset:'abeja',name:'Abeja'},{asset:'avion',name:'Avión'},{asset:'arbol',name:'Árbol'},{asset:'arana',name:'Araña'}];
    const values = [...words,...words];
    for (let index = values.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
    const grid = qs('#memgrid');
    let open = [], lock = false, matched = 0, moves = 0;
    const session = modalSession;
    qs('#restartMemory').onclick = () => premium.memory();
    values.forEach((word,index) => {
      const card = document.createElement('button');
      card.className = 'memcard';
      card.innerHTML = `<span class="memory-back">${pawIcon(true)}</span><span class="memory-front"><img src="assets/${word.asset}.webp" alt=""><b>${word.name}</b></span>`;
      card.dataset.val = word.asset;
      card.setAttribute('aria-label', `Carta ${index+1}, boca abajo`);
      card.setAttribute('aria-pressed', 'false');
      card.onclick = () => {
        if(!modal.open || session !== modalSession || lock || card.classList.contains('matched') || card.classList.contains('open')) return;
        card.classList.add('open');
        card.setAttribute('aria-label', word.name);
        card.setAttribute('aria-pressed', 'true');
        open.push(card);
        if(open.length === 2){
          lock = true;
          moves++;
          qs('#memoryMoves').textContent = moves;
          setTimeout(() => {
            if (!modal.open || session !== modalSession) return;
            const ok = open[0].dataset.val === open[1].dataset.val;
            if(ok){
              open.forEach(item => { item.classList.add('matched'); item.disabled = true; item.setAttribute('aria-label', `${item.getAttribute('aria-label')}, pareja encontrada`); });
              matched++;
              qs('#memoryPairs').textContent = matched;
              if (matched === words.length) {
                openModal(`<h2 class="modal-title">¡Encontraste las cuatro parejas!</h2><div class="activity-celebration"><img src="assets/milo-fiesta-0.webp" alt="Milo festeja tu logro"><p role="status">¡Memotest completado!</p></div><p class="helper memory-instruction">Lo lograste en ${moves} ${moves===1?'intento':'intentos'}.</p><div class="word-footer memory-finish"><button class="btn secondary" id="playMemoryAgain">Jugar de nuevo</button><button class="btn secondary" id="continueMemory">Continuar</button></div>`);
                qs('#playMemoryAgain').onclick = () => premium.memory();
                qs('#continueMemory').onclick = () => modal.close();
              }
            } else {
              open.forEach(item => { item.classList.remove('open'); item.setAttribute('aria-label', 'Carta boca abajo'); item.setAttribute('aria-pressed', 'false'); });
            }
            open = [];
            lock = false;
          }, 850);
        }
      };
      grid.appendChild(card);
    });
  },

  bubbles(){
    openModal(`<div class="bubble-heading-art">${uiIcon('bubbles')}</div><h2 class="modal-title">Burbujas de la A</h2><p class="helper memory-instruction">Tocá las burbujas con A y juntá cinco patitas doradas.</p><div class="bubble-status"><div id="bubblePaws" class="paw-progress" role="img" aria-label="0 de 5 patitas doradas">${pawMarkup(0)}</div><span><b id="bubbleScore">0</b>/5</span></div><div id="bubbleBoard" class="bubble-board"></div><p id="bubbleHint" class="bubble-hint" role="status">¡Buscá las cinco letras A!</p><div class="word-footer"><button class="btn secondary" id="restartBubbles">Volver a empezar</button></div>`);
    modal.classList.add('bubbles-modal');
    const board = qs('#bubbleBoard');
    const session = modalSession;
    const values = ['A','A','A','A','A','B','C','M','S','O','L','P'];
    for (let index = values.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
    let score = 0;
    let complete = false;
    qs('#restartBubbles').onclick = () => premium.bubbles();
    values.forEach((letter,index) => {
      const slot = document.createElement('div');
      slot.className = 'bubble-slot';
      const bubble = document.createElement('button');
      bubble.className = 'bubble';
      bubble.textContent = letter;
      bubble.setAttribute('aria-label', `Burbuja con la letra ${letter}`);
      bubble.style.setProperty('--float-delay', `${index * -.31}s`);
      bubble.onclick = () => {
        if (!modal.open || session !== modalSession || complete || bubble.disabled) return;
        if (letter === 'A') {
          bubble.disabled = true;
          bubble.classList.add('popping');
          score++;
          qs('#bubbleScore').textContent = score;
          qs('#bubblePaws').innerHTML = pawMarkup(score);
          qs('#bubblePaws').setAttribute('aria-label', `${score} de 5 patitas doradas`);
          qs('#bubbleHint').textContent = score === 5 ? '¡Juntaste las cinco patitas!' : '¡Muy bien! Encontraste una A.';
          const finished = score === 5;
          if (finished) complete = true;
          setTimeout(() => {
            if (!modal.open || session !== modalSession) return;
            bubble.remove();
            if (finished) {
              openModal(`<h2 class="modal-title">¡Explotaste las cinco A!</h2><div class="activity-celebration"><img src="assets/milo-fiesta-4.webp" alt="Milo festeja tu logro"><p role="status">¡Burbujas completado!</p></div><div class="bubble-win-paws" aria-hidden="true">${pawMarkup(5)}</div><div class="word-footer memory-finish"><button class="btn secondary" id="playBubblesAgain">Jugar de nuevo</button><button class="btn secondary" id="continueBubbles">Continuar</button></div>`);
              qs('#playBubblesAgain').onclick = () => premium.bubbles();
              qs('#continueBubbles').onclick = () => modal.close();
            }
          }, 350);
        } else {
          qs('#bubbleHint').textContent = `Esa es la ${letter}. ¡Buscá una A!`;
          bubble.classList.add('bubble-wrong');
          setTimeout(() => { if (session === modalSession) bubble.classList.remove('bubble-wrong'); }, 450);
        }
      };
      slot.appendChild(bubble);
      board.appendChild(slot);
    });
  },

  word(){
    const words = [{name:'Abeja',letters:'ABEJA',asset:'abeja'},{name:'Avión',letters:'AVIÓN',asset:'avion'},{name:'Árbol',letters:'ÁRBOL',asset:'arbol'}];
    let round = 0, completed = 0;
    const paws = () => words.map((word,index) => pawIcon(index < completed)).join('');
    const render = () => {
      const word = words[round];
      openModal(`<img class="word-heading-art" src="assets/letra-a-roja.webp" alt=""><h2 class="modal-title">Construí la palabra</h2><p class="helper memory-instruction">Tocá las letras en orden. Podés tocar una letra colocada para devolverla.</p><div class="builder-status"><span>Palabra ${round+1} de 3</span><div id="builderPaws" class="paw-progress" role="img" aria-label="${completed} de 3 palabras completas">${paws()}</div></div><div class="builder-picture"><img src="assets/${word.asset}.webp" alt="${word.name}"><strong>${word.letters}</strong><button class="btn secondary" id="hearWord" aria-label="Escuchar ${word.name}">${uiIcon('sound')} Escuchar</button></div><div class="slots" id="wordSlots" aria-label="Letras colocadas"></div><div class="bank" id="letterBank" aria-label="Letras para elegir"></div><p id="wordState" class="bubble-hint" role="status">¡Armá ${word.letters}!</p><div class="word-footer memory-finish"><button class="btn secondary" id="restartBuilder">Volver a empezar</button><button class="btn secondary" id="nextWord" disabled>Siguiente palabra</button></div>`);
      modal.classList.add('builder-modal');
      const session = modalSession;
      const letters = [...word.letters];
      for (let index = letters.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [letters[index], letters[randomIndex]] = [letters[randomIndex], letters[index]];
      }
      const placed = Array(letters.length).fill(null);
      const slots = [], tiles = [];
      let solved = false;
      const active = () => modal.open && session === modalSession && !solved;
      qs('#hearWord').onclick = () => speak(word.name);
      qs('#restartBuilder').onclick = () => { LetrinAudio.cancel(); premium.word(); };
      qs('#nextWord').onclick = () => { if (!solved || session !== modalSession) return; LetrinAudio.cancel(); round++; render(); };
      letters.forEach((letter,index) => {
        const slot = document.createElement('button');
        slot.className = 'slot';
        slot.disabled = true;
        slot.setAttribute('aria-label', `Espacio ${index+1}, vacío`);
        slot.onclick = () => {
          if (!active() || placed[index] === null) return;
          tiles[placed[index]].disabled = false;
          placed[index] = null;
          slot.textContent = '';
          slot.disabled = true;
          slot.setAttribute('aria-label', `Espacio ${index+1}, vacío`);
          qs('#wordState').textContent = '¡Podés seguir probando!';
        };
        slots.push(slot);
        qs('#wordSlots').appendChild(slot);
      });
      letters.forEach((letter,index) => {
        const tile = document.createElement('button');
        tile.className = 'tile';
        tile.textContent = letter;
        tile.setAttribute('aria-label', `Elegir la letra ${letter}`);
        tile.onclick = () => {
          if (!active() || tile.disabled) return;
          const position = placed.indexOf(null);
          if (position < 0) return;
          placed[position] = index;
          slots[position].textContent = letter;
          slots[position].disabled = false;
          slots[position].setAttribute('aria-label', `Devolver la letra ${letter} del espacio ${position+1}`);
          tile.disabled = true;
          if (placed.every(value => value !== null)) {
            const result = placed.map(value => letters[value]).join('');
            if (result !== word.letters) { qs('#wordState').textContent = '¡Casi! Tocá una letra colocada para corregirla.'; return; }
            solved = true;
            completed++;
            slots.forEach(item => { item.disabled = true; item.classList.add('word-correct'); });
            qs('#builderPaws').innerHTML = paws();
            qs('#builderPaws').setAttribute('aria-label', `${completed} de 3 palabras completas`);
            qs('#wordState').textContent = `¡Muy bien! Armaste ${word.letters}.`;
            if (completed < words.length) { qs('#nextWord').disabled = false; return; }
            setTimeout(() => {
              if (!modal.open || session !== modalSession) return;
              LetrinAudio.cancel();
              openModal(`<h2 class="modal-title">¡Armaste las tres palabras!</h2><div class="activity-celebration"><img src="assets/milo-fiesta-2.webp" alt="Milo festeja tu logro"><p role="status">¡Desafío completado!</p></div><div class="bubble-win-paws" aria-hidden="true">${paws()}</div><div class="word-footer memory-finish"><button class="btn secondary" id="playBuilderAgain">Jugar de nuevo</button><button class="btn secondary" id="continueBuilder">Continuar</button></div>`);
              qs('#playBuilderAgain').onclick = () => premium.word();
              qs('#continueBuilder').onclick = () => modal.close();
            }, 650);
          }
        };
        tiles.push(tile);
        qs('#letterBank').appendChild(tile);
      });
    };
    render();
  }
};
qsa('[data-premium]').forEach(btn => btn.addEventListener('click', () => premium[btn.dataset.premium]()));

refreshProgress();

if('serviceWorker' in navigator){
  const alreadyControlled = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (alreadyControlled) window.location.reload();
  }, {once:true});
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js', {updateViaCache:'none'}).catch(() => showToast('La versión sin conexión no está disponible todavía')));
}
