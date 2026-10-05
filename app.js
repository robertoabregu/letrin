
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const screens = qsa('.screen');
const modal = qs('#modal');
const modalContent = qs('#modalContent');
const toast = qs('#toast');
let progress = {A: []};
try {
  const saved = JSON.parse(localStorage.getItem('letrin_progress_v03') || '{}');
  if (Array.isArray(saved?.A)) progress.A = [...new Set(saved.A)].filter(activity => ['know','repeat','trace','paint','starts','catch'].includes(activity));
} catch {}
let modalSession = 0;
modal.addEventListener('close', () => { modalSession++; window.speechSynthesis?.cancel(); });

function go(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
qsa('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));

function speak(text){
  if(!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-AR';
  u.rate = .9;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
qs('#speakA').onclick = () => speak('A. Abeja. Árbol. Avión. Araña.');

const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const alphabet = qs('#alphabet');
letters.forEach(letter => {
  const btn = document.createElement('button');
  btn.className = 'letter-btn' + (letter === 'A' ? ' a' : '');
  btn.textContent = letter;
  btn.setAttribute('aria-label', letter === 'A' ? 'Letra A: jugar' : `Letra ${letter}: próximamente gratis`);
  btn.onclick = () => letter === 'A' ? go('letterA') : showInfo(letter);
  alphabet.appendChild(btn);
});

function saveProgress(){
  try { localStorage.setItem('letrin_progress_v03', JSON.stringify(progress)); } catch { showToast('El progreso no se puede guardar en este navegador'); }
  refreshProgress();
}
function refreshProgress(){
  const done = progress.A || [];
  qs('#progressText').textContent = `${done.length} de 6 actividades completas`;
  qsa('[data-activity]').forEach(btn => btn.classList.toggle('done', done.includes(btn.dataset.activity)));
}
function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
function markDone(activity, title='¡Muy bien!'){
  progress.A = progress.A || [];
  if(!progress.A.includes(activity)){
    progress.A.push(activity);
    saveProgress();
  }
  showToast(`${title} ⭐ Actividad completada`);
}
function finishButton(activity, title){
  const row = document.createElement('div');
  row.className = 'complete-row';
  const done = document.createElement('button');
  done.className = 'btn primary';
  done.textContent = '⭐ Marcar como completa';
  done.onclick = () => {
    markDone(activity, title);
    modal.close();
  };
  const later = document.createElement('button');
  later.className = 'btn secondary';
  later.textContent = 'Seguir mirando';
  later.onclick = () => {};
  row.append(done, later);
  return row;
}
function openModal(html){
  modalSession++;
  modalContent.innerHTML = html;
  if (!modal.open) modal.showModal();
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
      <div class="confetti">🔤✨</div>
      <h2 class="modal-title">Conocer la letra A</h2>
      <p class="helper">La A puede verse en mayúscula y minúscula. Escuchala y asociála con palabras simples.</p>
      <div class="word-list">
        <div class="word-chip">🐝 Abeja</div>
        <div class="word-chip">✈️ Avión</div>
        <div class="word-chip">🌳 Árbol</div>
        <div class="word-chip">🕷️ Araña</div>
      </div>
      <button id="listenExamples" class="btn secondary">🔊 Escuchar ejemplos</button>
    `);
    modalContent.appendChild(finishButton('know', '¡Genial!'));
    qs('#listenExamples').onclick = () => speak('A. Abeja. Avión. Árbol. Araña.');
  },

  repeat(){
    openModal(`
      <div class="confetti">🎧💬</div>
      <h2 class="modal-title">Escuchar y repetir</h2>
      <p class="helper">Primero escuchá la letra y una palabra ejemplo. Después repetila a tu ritmo.</p>
      <div class="game-panel">
        <button id="playRepeat" class="btn primary">🔊 A — Abeja</button>
        <p class="helper">En esta versión inicial no evaluamos la pronunciación: la idea es practicar sin presión.</p>
      </div>
    `);
    modalContent.appendChild(finishButton('repeat', '¡Muy bien!'));
    qs('#playRepeat').onclick = () => speak('A. Abeja.');
  },

  trace(){
    openModal(`
      <div class="confetti">✍️🌟</div>
      <h2 class="modal-title">Trazar la letra A</h2>
      <p class="helper">Seguí el recorrido con el dedo o el mouse. Cuando llenes la barra, podrás completar la actividad.</p>
      <div class="canvas-wrap">
        <div class="trace-stage">
          <div class="guide">A</div>
          <canvas id="traceCanvas" width="420" height="420"></canvas>
        </div>
        <div class="progressbar"><div id="traceFill"></div></div>
        <div class="complete-row">
          <button id="clearTrace" class="btn secondary">Borrar</button>
        </div>
      </div>
    `);
    const canvas = qs('#traceCanvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ff6f7d';
    let drawing = false, last = null, score = 0, finished = false;
    const pos = e => {
      const r = canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return {x:(p.clientX-r.left)*canvas.width/r.width, y:(p.clientY-r.top)*canvas.height/r.height};
    };
    function down(e){ drawing = true; last = pos(e); canvas.setPointerCapture(e.pointerId); }
    function move(e){
      if(!drawing) return;
      e.preventDefault();
      const p = pos(e);
      ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke();
      last = p;
      score = Math.min(100, score + .65);
      qs('#traceFill').style.width = score + '%';
      if(score >= 92 && !finished){
        finished = true;
        modalContent.appendChild(finishButton('trace', '¡Trazado listo!'));
      }
    }
    function up(){ drawing = false; }
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    qs('#clearTrace').onclick = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      score = 0; finished = false;
      qs('#traceFill').style.width = '0%';
      modalContent.querySelector(':scope > .complete-row')?.remove();
    };
  },

  paint(){
    openModal(`
      <div class="confetti">🎨🖍️</div>
      <h2 class="modal-title">Pintar la letra A</h2>
      <p class="helper">Elegí un color y pintá libremente sobre la letra.</p>
      <div class="palette" id="palette"></div>
      <div class="canvas-wrap">
        <div class="paint-stage">
          <div class="guide">A</div>
          <canvas id="paintCanvas" width="420" height="420"></canvas>
        </div>
        <div class="complete-row">
          <button id="clearPaint" class="btn secondary">Borrar</button>
        </div>
      </div>
    `);
    const colors = ['#ff5f73','#ff9b1f','#ffd447','#35cc76','#2c9fff','#8f67ff','#ff85be'];
    const palette = qs('#palette');
    let color = colors[0];
    colors.forEach((c,i) => {
      const b = document.createElement('button');
      b.className = 'color' + (i===0 ? ' active' : '');
      b.style.background = c;
      b.onclick = () => {
        qsa('.color').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        color = c;
      };
      palette.appendChild(b);
    });
    const canvas = qs('#paintCanvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    let drawing = false, last = null;
    const pos = e => {
      const r = canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      return {x:(p.clientX-r.left)*canvas.width/r.width, y:(p.clientY-r.top)*canvas.height/r.height};
    };
    canvas.addEventListener('pointerdown', e => { drawing = true; last = pos(e); canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', e => {
      if(!drawing) return;
      const p = pos(e);
      ctx.strokeStyle = color;
      ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke();
      last = p;
    });
    canvas.addEventListener('pointerup', () => drawing = false);
    canvas.addEventListener('pointercancel', () => drawing = false);
    qs('#clearPaint').onclick = () => ctx.clearRect(0,0,canvas.width,canvas.height);
    modalContent.appendChild(finishButton('paint', '¡Qué lindo dibujo!'));
  },

  starts(){
    const rounds = [
      [{emoji:'✈️', word:'Avión', ok:true}, {emoji:'☀️', word:'Sol', ok:false}, {emoji:'🐻', word:'Oso', ok:false}, {emoji:'🏠', word:'Casa', ok:false}],
      [{emoji:'🌳', word:'Árbol', ok:true}, {emoji:'⚽', word:'Pelota', ok:false}, {emoji:'🌙', word:'Luna', ok:false}, {emoji:'🚢', word:'Barco', ok:false}],
      [{emoji:'🕷️', word:'Araña', ok:true}, {emoji:'🌸', word:'Flor', ok:false}, {emoji:'🐱', word:'Gato', ok:false}, {emoji:'🍌', word:'Banana', ok:false}]
    ];
    let round = 0, score = 0;

    const render = () => {
      const done = round >= rounds.length;
      if(done){
        openModal(`
          <div class="confetti">🍎⭐🎉</div>
          <h2 class="modal-title">¡Juego terminado!</h2>
          <p class="helper">Acertaste <strong>${score}</strong> de 3.</p>
        `);
        modalContent.appendChild(finishButton('starts', '¡Excelente!'));
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
        b.innerHTML = `<div class="emoji">${item.emoji}</div><div>${item.word}</div>`;
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
        board.innerHTML = '';
        modalContent.insertAdjacentHTML('beforeend', `
          <div class="confetti">🎈⭐🎉</div>
          <p><strong>¡Tiempo!</strong> Atrapaste ${score} letras A.</p>
        `);
        modalContent.appendChild(finishButton('catch', '¡Buen trabajo!'));
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
              if(matched === 4) showToast('Demo completada');
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
        if(good){ score = Math.min(5, score + 1); qs('#bubbleScore').textContent = score; bubble.remove(); if(score >= 5) showToast('Demo completada'); }
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
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => showToast('La versión sin conexión no está disponible todavía')));
}
