
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
modal.addEventListener('close', () => { modalSession++; window.speechSynthesis?.cancel(); });

function go(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
qsa('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));

function speak(text, onEnd){
  if(!('speechSynthesis' in window)) { showToast('Este navegador no permite reproducir las palabras'); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-AR';
  u.rate = .9;
  u.onend = () => onEnd?.();
  u.onerror = event => { if (!['canceled', 'interrupted'].includes(event.error)) showToast('No se pudo reproducir el audio. Probá de nuevo.'); };
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

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
function pawMarkup(count){
  return activityIds.map((activity,index) => `<svg class="paw${index<count?' earned':''}" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="9" cy="14" rx="4" ry="6" transform="rotate(-25 9 14)"/><ellipse cx="17" cy="8" rx="4" ry="6"/><ellipse cx="26" cy="9" rx="4" ry="6"/><ellipse cx="33" cy="16" rx="4" ry="6" transform="rotate(25 33 16)"/><path d="M10 30C10 25 15 19 20 19S31 26 31 31C31 37 25 35 21 34C17 35 10 37 10 30Z"/></svg>`).join('');
}
function refreshProgress(){
  const done = activityIds.filter(activity => progress.A.includes(activity));
  const counter = qs('#pawProgress');
  counter.setAttribute('aria-label', `${done.length} de 5 actividades completas`);
  counter.innerHTML = pawMarkup(done.length);
  qsa('[data-letter]').forEach(button => {
    const letter = button.dataset.letter;
    const count = activityIds.filter(activity => (progress[letter] || []).includes(activity)).length;
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
  openModal(`<div class="confetti">${tracing?'✍️':'🎨'}</div><h2 class="modal-title">${tracing?'Trazar':'Pintar'} la letra A</h2><p class="helper">${tracing?'Seguí los dos lados y la rayita del medio. ¡Milo festeja cuando terminás!':'Elegí un color y pintá adentro de la letra.'}</p>${tracing?'':'<div class="palette" id="palette"></div>'}<div class="canvas-wrap"><div class="trace-stage"><canvas id="letterCanvas" width="420" height="420" aria-label="${tracing?'Trazar':'Pintar'} la letra A"></canvas></div>${tracing?'<div class="progressbar" role="progressbar" aria-label="Recorrido trazado" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="traceFill"></div></div>':''}<div class="complete-row"><button id="clearLetter" class="btn secondary">Borrar</button>${tracing?'':'<button id="finishPaint" class="btn secondary" disabled>¡Terminé!</button>'}</div></div>`);
  const canvas=qs('#letterCanvas'), context=canvas.getContext('2d'), mask=letterMask();
  const ink=document.createElement('canvas'); ink.width=420; ink.height=420;
  const brush=ink.getContext('2d'); brush.lineWidth=tracing?22:32; brush.lineCap='round';
  let color='#ff5f73', drawing=false, last=null, tracker=LetterPath.coverage();
  const maskPixels=mask.getContext('2d').getImageData(0,0,420,420).data;
  const redraw=()=>{context.clearRect(0,0,420,420);context.drawImage(mask,0,0);context.drawImage(ink,0,0);};
  redraw();
  if(!tracing){
    ['#ff5f73','#ff9b1f','#ffd447','#35cc76','#2c9fff','#8f67ff','#ff85be'].forEach((value,index)=>{
      const button=document.createElement('button');button.className='color'+(index===0?' active':'');button.style.background=value;button.setAttribute('aria-label',['Rosa coral','Naranja','Amarillo','Verde','Azul','Violeta','Rosa'][index]);
      button.onclick=()=>{qsa('.color').forEach(item=>item.classList.remove('active'));button.classList.add('active');color=value;};qs('#palette').appendChild(button);
    });
    qs('#finishPaint').onclick=()=>celebrate('paint','¡Qué lindo dibujo!');
  }
  const position=event=>{const bounds=canvas.getBoundingClientRect();return {x:(event.clientX-bounds.left)*420/bounds.width,y:(event.clientY-bounds.top)*420/bounds.height};};
  function draw(point){
    brush.globalCompositeOperation='source-over';brush.strokeStyle=color;brush.beginPath();brush.moveTo(last.x,last.y);brush.lineTo(point.x,point.y);brush.stroke();
    brush.globalCompositeOperation='destination-in';brush.drawImage(mask,0,0);brush.globalCompositeOperation='source-over';redraw();
    if(tracing){
      const result=tracker.add(last,point);qs('#traceFill').style.width=result.percent+'%';qs('.progressbar').setAttribute('aria-valuenow',result.percent);
      if(result.complete){drawing=false;celebrate('trace','¡Trazado listo!');}
    } else {
      const pixels=brush.getImageData(0,0,420,420).data;
      const painted=pixels.some((value,index)=>index%4===3 && value>128 && maskPixels[index]>128);
      qs('#finishPaint').disabled=!painted;
    }
    last=point;
  }
  canvas.onpointerdown=event=>{drawing=true;last=position(event);canvas.setPointerCapture(event.pointerId);draw({x:last.x+.01,y:last.y});};
  canvas.onpointermove=event=>{if(drawing){event.preventDefault();draw(position(event));}};
  canvas.onpointerup=event=>{if(drawing)draw(position(event));drawing=false;};
  canvas.onpointercancel=()=>{drawing=false;};
  qs('#clearLetter').onclick=()=>{drawing=false;brush.clearRect(0,0,420,420);tracker=LetterPath.coverage();redraw();if(tracing){qs('#traceFill').style.width='0%';qs('.progressbar').setAttribute('aria-valuenow','0');}else qs('#finishPaint').disabled=true;};
}
function openModal(html){
  modalSession++;
  modal.classList.remove('word-modal');
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
      <img class="word-heading-art" src="assets/abeja.webp" alt="">
      <h2 class="modal-title">Empieza con la letra A</h2>
      <p class="helper word-instruction">Tocá cada imagen para escuchar cómo se pronuncia.</p>
      <div class="word-list" id="wordChoices"></div>
      <div class="word-footer"><button id="continueWords" class="btn secondary">Continuar</button></div>
    `);
    modal.classList.add('word-modal');
    const session = modalSession;
    const heard = new Set();
    let completed = false;
    const words = [{name:'Abeja',asset:'abeja'}, {name:'Avión',asset:'avion'}, {name:'Árbol',asset:'arbol'}, {name:'Araña',asset:'arana'}];
    words.forEach(word => {
      const button = document.createElement('button');
      button.className = 'word-chip';
      button.setAttribute('aria-label', `Escuchar ${word.name}`);
      button.innerHTML = `<img src="assets/${word.asset}.webp" alt=""><b>${word.name}</b><span class="word-speaker" aria-hidden="true">🔊</span>`;
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
        <h2 class="modal-title">¿Cuál empieza con A?</h2>
        <div class="status-line"><span>Pregunta ${round+1} de 3</span><span>⭐ ${score}</span></div>
        <div class="choice-grid" id="choices"></div>
      `);
      const container = qs('#choices');
      const session = modalSession;
      let answered = false;
      rounds[round].forEach(item => {
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
      <h2 class="modal-title">Atrapa la letra</h2>
      <div class="status-line"><span>Tiempo: <b id="time">15</b>s</span><span>⭐ <b id="score">0</b></span></div>
      <div id="catchBoard" class="catch-board"></div>
      <p class="helper">Tocá solo las letras A.</p>
    `);

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
        if(y > 380){
          clearInterval(timer);
          el.remove();
        }
      }, 28);
      falls.push(timer);

      el.onclick = () => {
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
    <h2 class="modal-title">${title} 🔒</h2>
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
    premiumShell('Memotest', `<div class="memory-grid" id="memgrid"></div>`);
    const values = ['A','🐝','A','🐝'].sort(() => Math.random() - .5);
    const grid = qs('#memgrid');
    let open = [], lock = false, matched = 0;
    const session = modalSession;
    values.forEach(val => {
      const card = document.createElement('button');
      card.className = 'memcard';
      card.textContent = '?';
      card.dataset.val = val;
      card.onclick = () => {
        if(lock || card.classList.contains('matched') || card.classList.contains('open')) return;
        card.classList.add('open');
        card.textContent = val;
        open.push(card);
        if(open.length === 2){
          lock = true;
          setTimeout(() => {
            if (!modal.open || session !== modalSession) return;
            const set = open.map(x => x.dataset.val).sort().join('');
            const ok = set === 'A🐝';
            if(ok){
              open.forEach(x => x.classList.add('matched'));
              matched += 2;
            } else {
              open.forEach(x => { x.classList.remove('open'); x.textContent = '?'; });
            }
            open = [];
            lock = false;
          }, 600);
        }
      };
      grid.appendChild(card);
    });
  },

  bubbles(){
    premiumShell('Burbujas', `<div id="bubbleBoard" class="bubble-board"></div><p>⭐ <b id="bubbleScore">0</b>/5</p>`);
    const board = qs('#bubbleBoard');
    let score = 0;
    for(let i=0;i<14;i++){
      const bubble = document.createElement('button');
      bubble.className = 'bubble';
      const good = i < 5 || Math.random() > .45;
      bubble.textContent = good ? 'A' : ['B','C','M','S'][Math.floor(Math.random()*4)];
      const size = 46 + Math.random() * 26;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 82 + '%';
      bubble.style.top = Math.random() * 72 + '%';
      bubble.onclick = () => {
        if(good){ score = Math.min(5, score + 1); qs('#bubbleScore').textContent = score; bubble.remove(); }
        else bubble.animate([{transform:'scale(1)'},{transform:'scale(.85)'},{transform:'scale(1)'}], {duration:180});
      };
      board.appendChild(bubble);
    }
  },

  word(){
    premiumShell('Construí la palabra', `
      <div class="word-builder">
        <p>Armá la palabra <strong>ALA</strong>.</p>
        <div class="slots"><div class="slot"></div><div class="slot"></div><div class="slot"></div></div>
        <div class="bank"></div>
        <p id="wordState" class="helper"></p>
      </div>
    `);
    const tiles = ['A','L','A'].sort(() => Math.random() - .5);
    const bank = qs('.bank');
    const slots = qsa('.slot');
    let index = 0;
    tiles.forEach(val => {
      const tile = document.createElement('button');
      tile.className = 'tile';
      tile.textContent = val;
      tile.onclick = () => {
        if(index >= slots.length) return;
        slots[index].textContent = val;
        tile.disabled = true;
        index++;
        if(index === slots.length){
          const result = slots.map(s => s.textContent).join('');
          qs('#wordState').innerHTML = result === 'ALA' ? '<strong>⭐ ¡Muy bien!</strong>' : '<strong>Probá de nuevo</strong>';
        }
      };
      bank.appendChild(tile);
    });
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

