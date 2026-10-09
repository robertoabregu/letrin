const LetrinGameRules = {
  initial(name){const first=name.toUpperCase().charAt(0);return first==='Ñ'?first:first.normalize('NFD').replace(/[\u0300-\u036f]/g,'');},
  trainWords(letters){
    return Object.entries(letters).flatMap(([letter,data])=>data.words.filter(word=>this.initial(word.name)===letter).map(word=>({...word,letter})));
  },
  sounds(letters,clips,english){
    const ambiguous=english?new Set():new Set(['V','Z','K','Q','H','W','X','Y','G']);
    return Object.keys(letters).filter(letter=>clips[letter]&&!ambiguous.has(letter));
  },
  pieces(strokes,count){
    const segments=strokes.flatMap(points=>points.slice(1).map((end,index)=>({start:points[index],end,length:Math.hypot(end.x-points[index].x,end.y-points[index].y)})));
    const total=segments.reduce((sum,segment)=>sum+segment.length,0),size=total/count;
    const pieces=Array.from({length:count},()=>[]);
    let traveled=0;
    for(const segment of segments){
      let used=0;
      while(used<segment.length-.0001){
        const index=Math.min(count-1,Math.floor((traveled+.00001)/size));
        const length=Math.min(segment.length-used,(index+1)*size-traveled);
        const point=distance=>({x:segment.start.x+(segment.end.x-segment.start.x)*distance/segment.length,y:segment.start.y+(segment.end.y-segment.start.y)*distance/segment.length});
        pieces[index].push([point(used),point(used+length)]);
        used+=length;traveled+=length;
      }
    }
    return pieces;
  }
};

const LetrinExtraGames = (()=>{
  const text=(spanish,english)=>LetrinLanguage.current()==='en'?english:spanish;
  const shuffle=items=>items.map(value=>({value,key:Math.random()})).sort((first,second)=>first.key-second.key).map(item=>item.value);
  function shell(title,instruction,body,restart){
    openModal(`<header class="activity-header"><h2 class="modal-title">${title}</h2><p class="helper">${instruction}</p></header><div class="extra-controls"><label>${text('Nivel','Level')} <select id="extraLevel"><option value="2">${text('Fácil','Easy')}</option><option value="3">${text('Medio','Medium')}</option><option value="4">${text('Desafío','Challenge')}</option></select></label><span id="extraProgress" role="status"></span></div>${body}<p id="extraHint" class="extra-hint" role="status" aria-live="polite"></p><footer class="word-footer"><button class="btn secondary" id="extraRestart">${text('Volver a empezar','Start again')}</button></footer>`);
    modal.classList.add('activity-modal','extra-modal');
    qs('#extraRestart').onclick=restart;
  }
  function hint(message){qs('#extraHint').textContent=message;}
  function finish(title,restart){
    openModal(`<h2 class="modal-title">${title}</h2><div class="activity-celebration"><img src="assets/milo-fiesta-0.webp" alt="${text('Milo festeja','Milo celebrates')}"><p role="status">${text('¡Desafío completado!','Challenge complete!')}</p></div><div class="word-footer memory-finish"><button id="extraAgain" class="btn secondary">${text('Jugar de nuevo','Play again')}</button><button id="extraClose" class="btn secondary">${text('Continuar','Continue')}</button></div>`);
    qs('#extraAgain').onclick=restart;qs('#extraClose').onclick=()=>modal.close();
  }
  function interactions(items,targets,accept){
    let selected=null,dragging=null;
    function select(item){selected=item.dataset.piece;items.forEach(button=>{button.classList.toggle('selected',button===item);button.setAttribute('aria-pressed',String(button===item));});}
    items.forEach(item=>{
      item.onclick=()=>select(item);
      item.onpointerdown=event=>{if(event.button!==0)return;dragging={id:event.pointerId,item};select(item);item.setPointerCapture(event.pointerId);};
      item.onpointerup=event=>{
        if(!dragging||dragging.id!==event.pointerId)return;
        const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-target]');
        if(target&&targets.includes(target))accept(selected,target,event);
        dragging=null;
      };
      item.onpointercancel=()=>{dragging=null;};
    });
    targets.forEach(target=>target.onclick=event=>{if(selected!==null)accept(selected,target,event);else hint(text('Primero elegí una pieza o letra.','Choose a piece or letter first.'));});
  }
  function train(level=2){
    const words=shuffle(LetrinGameRules.trainWords(languageLetters()));
    const chosen=[];
    for(const word of words){if(!chosen.some(item=>item.letter===word.letter))chosen.push(word);if(chosen.length===level)break;}
    const count=chosen.length;
    shell(text('Tren de las letras','Letter train'),text('Subí al tren la letra con la que empieza cada dibujo.','Match each picture with its first letter.'),`<div class="train-scene"><div class="train-engine" aria-hidden="true"><img src="assets/milo-peeking.webp" alt=""><img class="engine-art" src="assets/tren.webp" alt=""></div><div class="train-wagons">${chosen.map((word,index)=>`<div class="train-wagon"><button class="train-picture" data-word="${index}" aria-label="${text('Escuchar','Hear')} ${word.name}">${wordArt(word)}<span>🔊</span></button><button class="train-slot" data-target="${word.letter}" aria-label="${text('Vagón para','Wagon for')} ${word.name}">?</button></div>`).join('')}</div></div><div class="extra-bank">${shuffle(chosen).map(word=>`<button class="letter-tile" data-piece="${word.letter}" aria-pressed="false">${word.letter}</button>`).join('')}</div>`,()=>train(level));
    const session=modalSession;let completed=0;
    qs('#extraLevel').value=String(level);qs('#extraLevel').onchange=event=>train(Number(event.target.value));
    const update=()=>qs('#extraProgress').textContent=`${completed} / ${count}`;update();
    qsa('[data-word]').forEach(button=>button.onclick=()=>speak(chosen[Number(button.dataset.word)].name));
    interactions(qsa('[data-piece]'),qsa('[data-target]'),(letter,target)=>{
      if(target.disabled||qs(`[data-piece="${letter}"]`).disabled)return;
      if(letter!==target.dataset.target){hint(text('Escuchá el dibujo y probá otra letra.','Listen to the picture and try another letter.'));return;}
      target.textContent=letter;target.disabled=true;qs(`[data-piece="${letter}"]`).disabled=true;completed++;update();hint(text('¡Muy bien!','Well done!'));speak(letter);
      if(completed===count){qs('.train-scene').classList.add('train-leaving');setTimeout(()=>{if(modal.open&&modalSession===session)finish(text('¡El tren está listo!','The train is ready!'),()=>train(level));},1800);}
    });
  }
  function puzzle(level=2){
    const count=level+1,pieces=LetrinGameRules.pieces(LetterPath.forLetter(currentLetter).strokes,count);
    shell(text('Rompecabezas de letras','Letter puzzle'),text(`Armá la letra ${currentLetter}.`,`Build letter ${currentLetter}.`),`<div class="puzzle-board">${pieces.map((piece,index)=>`<button class="puzzle-slot" data-target="${index}" aria-label="${text('Lugar de la pieza','Piece slot')} ${index+1}" style="--piece:${index}"><canvas width="420" height="420"></canvas></button>`).join('')}</div><div class="extra-bank puzzle-bank">${shuffle(pieces.map((piece,index)=>index)).map(index=>`<button class="puzzle-piece" data-piece="${index}" aria-label="${text('Pieza','Piece')} ${index+1}" aria-pressed="false"><canvas width="420" height="420"></canvas></button>`).join('')}</div>`,()=>puzzle(level));
    const session=modalSession;let completed=0;
    qs('#extraLevel').value=String(level);qs('#extraLevel').onchange=event=>puzzle(Number(event.target.value));
    qs('#extraProgress').textContent=`0 / ${count}`;
    function draw(canvas,index,color){const context=canvas.getContext('2d');context.clearRect(0,0,420,420);const gradient=context.createLinearGradient(0,0,300,420);gradient.addColorStop(0,color==='#36c52c'?'#96ed39':color);gradient.addColorStop(1,color);context.strokeStyle=gradient;context.lineWidth=48;context.lineCap='round';pieces[index].forEach(points=>strokePath(context,points));}
    qsa('[data-target]').forEach(button=>{
      const index=Number(button.dataset.target);
      draw(button.querySelector('canvas'),index,'#cbeaf8');
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 420 420');svg.setAttribute('aria-hidden','true');
      pieces[index].forEach(points=>{const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`);svg.appendChild(path);});button.appendChild(svg);
    });
    qsa('[data-piece]').forEach(button=>draw(button.querySelector('canvas'),Number(button.dataset.piece),'#36c52c'));
    interactions(qsa('[data-piece]'),qsa('[data-target]'),(index,target,event)=>{
      if(event.detail||event.type==='pointerup'){
        const bounds=qs('.puzzle-board').getBoundingClientRect(),scale=Math.min(bounds.width,bounds.height);
        const point={x:(event.clientX-bounds.left-(bounds.width-scale)/2)*420/scale,y:(event.clientY-bounds.top-(bounds.height-scale)/2)*420/scale};
        const matches=pieces[Number(index)].some(points=>{
          const start=points[0],end=points[1],deltaX=end.x-start.x,deltaY=end.y-start.y;
          const fraction=Math.max(0,Math.min(1,((point.x-start.x)*deltaX+(point.y-start.y)*deltaY)/(deltaX*deltaX+deltaY*deltaY||1)));
          return Math.hypot(point.x-start.x-fraction*deltaX,point.y-start.y-fraction*deltaY)<=32;
        });
        if(matches)target=qs(`[data-target="${index}"]`);
      }
      if(target.disabled||qs(`[data-piece="${index}"]`).disabled)return;
      if(index!==target.dataset.target){hint(text('Buscá la misma forma en la letra.','Find the matching shape in the letter.'));return;}
      target.disabled=true;draw(target.querySelector('canvas'),Number(index),'#36c52c');qs(`[data-piece="${index}"]`).disabled=true;completed++;qs('#extraProgress').textContent=`${completed} / ${count}`;hint(text('¡Encajó!','It fits!'));
      if(completed===count){speak(currentLetter);setTimeout(()=>{if(modal.open&&modalSession===session)finish(text('¡Armaste la letra!','You built the letter!'),()=>puzzle(level));},1600);}
    });
  }
  function detective(level=2){
    const english=LetrinLanguage.current()==='en',clips=LetrinAudioCatalog[english?'en-US':'es-AR'].clips;
    const pool=LetrinGameRules.sounds(languageLetters(),clips,english);
    let round=0,last=null;
    function play(){
      const target=shuffle(pool.filter(letter=>letter!==last))[0];last=target;
      const options=shuffle([target,...shuffle(pool.filter(letter=>letter!==target)).slice(0,level-1)]);
      shell(text('Detective de sonidos','Sound detective'),text('Escuchá y elegí la letra.','Listen and choose the letter.'),`<div class="detective-scene"><img src="assets/milo-peeking.webp" alt="Milo"><button id="detectiveListen" class="sound-mystery">🔊<span>${text('Escuchar sonido','Hear the sound')}</span></button></div><div class="extra-bank">${options.map(letter=>`<button class="letter-tile" data-answer="${letter}">${letter}</button>`).join('')}</div><button id="detectiveHint" class="btn secondary">${text('Una pista','A hint')}</button>`,()=>detective(level));
      qs('#extraLevel').value=String(level);qs('#extraLevel').onchange=event=>detective(Number(event.target.value));
      qs('#extraProgress').textContent=`${text('Ronda','Round')} ${round+1} / 3`;
      qs('#detectiveListen').onclick=()=>speak(target);
      qs('#detectiveHint').onclick=()=>{const word=languageLetters()[target].words.find(item=>LetrinGameRules.initial(item.name)===target);if(word){qs('#extraHint').innerHTML=`<img class="detective-clue" src="assets/${word.asset}.webp" alt=""> ${word.name}`;speak(word.name);}};
      qsa('[data-answer]').forEach(button=>button.onclick=()=>{
        if(button.dataset.answer!==target){hint(text('Escuchá otra vez y probá de nuevo.','Listen again and try again.'));speak(target);return;}
        qsa('[data-answer]').forEach(item=>item.disabled=true);button.classList.add('correct');hint(text('¡Sonido encontrado!','Sound found!'));round++;
        const session=modalSession;setTimeout(()=>{if(!modal.open||modalSession!==session)return;if(round===3)finish(text('¡Excelente detective!','Great detective!'),()=>detective(level));else play();},1000);
      });
    }
    play();
  }
  return {train,puzzle,detective};
})();
