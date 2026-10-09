const LetrinLanguage = (() => {
  const key = 'letrin_language_v1';
  let preference = 'auto';
  try {
    const saved = localStorage.getItem(key);
    if (['auto','es','en'].includes(saved)) preference = saved;
    else if (localStorage.getItem('letrin_progress_v03') || localStorage.getItem('letrin_last_letter')) preference = 'es';
  } catch {}
  const current = () => preference === 'auto' ? ((navigator.languages?.[0] || navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es') : preference;
  const entries = [
    ['Aprendé jugando con Milo','Learn and play with Milo'],
    ['¿Jugamos con las letras?',"Let's play with letters!"],
    ['¿Seguimos jugando?',"Ready to keep playing?"],
    ['¡A jugar!',"Let's play!"],['Volver a jugar','Play again'],['Seguir jugando','Keep playing'],
    ['Elegir una letra','Choose a letter'],['Elegí una letra','Choose a letter'],
    ['Para adultos','For grown-ups'],['Solo para adultos','Grown-ups only'],
    ['Ajustá el sonido y las preferencias de la app.','Adjust sound and app preferences.'],
    ['Sonido','Sound'],['Música de fondo','Background music'],
    ['Suave, con volumen más bajo durante las voces.','Soft music that gets quieter during speech.'],
    ['Sonidos de festejo','Celebration sounds'],['Un pequeño festejo cuando Milo celebra.','A little cheer when Milo celebrates.'],
    ['Idioma y acento','Language and accent'],['Idioma de la app','App language'],
    ['Según el idioma del dispositivo','Use device language'],['Español de Argentina','Spanish (Argentina)'],
    ['Inglés · en preparación','English · in progress'],
    ['La versión inglesa está en preparación. Por ahora podés probar de la A a la D.','The English version is in progress. You can try A through D.'],
    ['El progreso se guarda por separado para cada idioma.','Progress is saved separately for each language.'],
    ['Español y región','Spanish voice and region'],['Detalles de la voz','Voice details'],
    ['Escuchar una prueba','Play a sample'],['Información','Information'],
    ['Política de privacidad','Privacy policy'],['Volver a ajustes','Back to settings'],
    ['Datos en tu dispositivo','Data on your device'],['Conexión y voces','Connection and voices'],['Preferencias','Preferences'],
    ['Letrín no solicita nombres, cuentas, ubicación, cámara ni micrófono. Esta versión no incluye anuncios ni herramientas de seguimiento analítico.','Letrín does not request names, accounts, location, camera or microphone access. This version has no ads or analytics trackers.'],
    ['El progreso, la última letra y las preferencias de sonido y región se guardan en este navegador. El contenido descargado se conserva para jugar sin conexión. No se sincroniza el progreso con un servidor. Podés eliminar estos datos desde los ajustes del navegador; eso también elimina tu progreso.','Progress, your last letter and sound and language preferences are stored in this browser. Downloaded content is saved for offline play. Progress is not synced with a server. You can remove this data in your browser settings; this also removes your progress.'],
    ['Al abrir o actualizar la app, se descargan archivos desde su alojamiento web. El proveedor del alojamiento recibe los datos técnicos habituales de una conexión. Las grabaciones incluidas se reproducen desde la app. Cuando se usa una voz del dispositivo, esa voz puede requerir internet según el sistema y proveedor que tengas configurados.','Opening or updating the app downloads files from its web host. The host receives the usual technical connection data. Included recordings play from the app. Device voices may need internet, depending on your system and voice provider.'],
    ['Podés desactivar la música y los festejos por separado. La región de la voz se elige manualmente o según el idioma del navegador, no según tu ubicación.','You can switch music and celebration sounds off separately. Language is chosen manually or from your browser language, not your location.'],
    ['Para entrar a los ajustes, resolvé esta cuenta.','Solve this problem to open settings.'],
    ['Entrar','Enter'],['Probá de nuevo con ayuda de un adulto.','Try again with help from a grown-up.'],
    ['Sin anuncios · Abecedario completo','No ads · English alphabet in progress'],
    ['¡Jugá con todas las letras del abecedario, de la A a la Z!','Try A through D in English. More letters are on the way!'],
    ['Preparando el juego sin conexión…','Preparing offline play…'],
    ['Juego descargado · Algunas voces pueden necesitar internet','Game downloaded · Device voices may need internet'],
    ['Descarga pendiente · Volvé a abrir con internet','Download pending · Open again with internet'],
    ['Este navegador necesita conexión para jugar','This browser needs internet to play'],
    ['El progreso no se puede guardar en este navegador','This browser cannot save your progress'],
    ['Actividades','Activities'],['Trazar la letra','Trace the letter'],['Pintar la letra','Color the letter'],
    ['Seguí el recorrido','Follow the path'],['Colores y creatividad','Colors and creativity'],
    ['Elegí la imagen correcta','Choose the right picture'],['Atrapa la letra','Catch the letter'],
    ['Más juegos para explorar','More games to explore'],['Memotest','Matching game'],['Encontrá las parejas','Find the pairs'],
    ['Burbujas','Bubbles'],['Construí la palabra','Build the word'],['Armá palabras simples','Build simple words'],
    ['Podés probar estos tres juegos sin costo. Esta versión no tiene compras habilitadas.','Try these three games for free. Purchases are not enabled in this version.'],
    ['Continuar','Continue'],['¡Actividad completada!','Activity complete!'],['¡Escuchaste las cuatro palabras!','You listened to all four words!'],
    ['¡Qué lindo dibujo!','What a lovely picture!'],['¡Trazado listo!','Tracing complete!'],
    ['Rosa coral','Coral pink'],['Naranja','Orange'],['Amarillo','Yellow'],['Verde','Green'],['Azul','Blue'],['Violeta','Purple'],['Rosa','Pink'],
    ['Carta boca abajo','Face-down card'],
    ['Tocá cada imagen para escuchar cómo se pronuncia.','Tap each picture to hear the word.'],
    ['Seguí el camino, paso a paso.','Follow the path, step by step.'],['¡Dale color a tu letra!','Give your letter some color!'],
    ['Pasos del trazado','Tracing steps'],['Elegí un color','Choose a color'],
    ['Elegí un color y empezá a pintar','Choose a color and start coloring'],['¡Tu obra va tomando color!','Your picture is getting colorful!'],
    ['Recorrido trazado','Path traced'],['Superficie pintada','Area colored'],['Borrar','Clear'],['¡Terminé!',"I'm done!"],
    ['¡Excelente! Acertaste las tres.','Great! You got all three right!'],
    ['Patitas doradas:','Golden paws:'],['Tiempo:','Time:'],
    ['Encontrá las cuatro parejas de imágenes iguales.','Find the four matching pairs.'],
    ['Parejas encontradas:','Pairs found:'],['Intentos:','Attempts:'],['Volver a empezar','Start over'],
    ['¡Encontraste las cuatro parejas!','You found all four pairs!'],['¡Memotest completado!','Matching game complete!'],
    ['Jugar de nuevo','Play again'],['¡Juntaste las cinco patitas!','You collected all five paws!'],
    ['¡Burbujas completado!','Bubbles complete!'],['¡Armaste las tres palabras!','You built all three words!'],
    ['¡Desafío completado!','Challenge complete!'],['¡Podés seguir probando!','Keep trying!'],
    ['¡Casi! Tocá una letra colocada para corregirla.','Almost! Tap a placed letter to change it.'],
    ['Tocá las letras en orden. Podés tocar una letra colocada para devolverla.','Tap the letters in order. Tap a placed letter to put it back.'],
    ['Letras colocadas','Placed letters'],['Letras para elegir','Letters to choose'],['Escuchar','Listen'],['Siguiente palabra','Next word'],
    ['Cerrar actividad','Close activity'],['Volver al inicio','Back to home'],['Ir a la pantalla principal','Go to home'],
    ['Ver todas las letras','See all letters'],['Navegación de letras','Letter navigation'],['No hay letra anterior','No previous letter'],['No hay letra siguiente','No next letter'],
    ['Milo te saluda con su patita','Milo waves hello'],['Milo te saluda','Milo says hello'],['Milo te acompaña','Milo is here with you'],['Milo festeja tu logro','Milo celebrates your achievement'],
    ['Milo chusmea el trazado desde el borde izquierdo','Milo peeks from the left edge'],['Milo se asoma por el borde inferior derecho','Milo peeks from the bottom right edge'],
    ['¡Completaste las 5 actividades!','You completed all 5 activities!']
  ];
  const exact = new Map(entries);
  const patterns = [
    [/^Escuchar (el nombre|el sonido) de la letra (.+?)(; todas las actividades completas)?$/,'Hear letter $2'],
    [/^Trazar la letra (.+) siguiendo las guías numeradas$/,'Trace $1 following the numbered guides'],
    [/^Pintar dentro de la letra (.+) con el color elegido$/,'Color inside $1 with your chosen color'],
    [/^Letra ([A-ZÑ])$/,'Letter $1'],[/^Ir a la letra (.+)$/,'Go to letter $1'],
    [/^Empieza con la letra (.+)$/,'Starts with $1'],[/^Empieza con '(.+)'$/,'Starts with $1'],
    [/^Palabras con (.+)$/,'Words with $1'],[/^¿Cuál empieza con (.+)\?$/,'Which starts with $1?'],[/^¿Cuál tiene (.+)\?$/,'Which has $1?'],
    [/^Tocá solo las ([A-ZÑ])$/,'Tap only $1'],[/^Explotá solo las ([A-ZÑ])$/,'Pop only $1'],
    [/^Tocá solo las letras (.+)\.$/,'Tap only the letter $1.'],
    [/^(\d+) de (\d+) actividades (?:completadas?|completas?)$/,'$1 of $2 activities complete'],
    [/^(\d+) de (\d+) patitas doradas$/,'$1 of $2 golden paws'],
    [/^(\d+) de (\d+) palabras completas$/,'$1 of $2 words complete'],
    [/^(\d+) de (\d+) trazos?$/,'$1 of $2 strokes'],
    [/^(Trazar|Pintar) la letra (.+)$/,(match,action,letter)=>`${action==='Trazar'?'Trace':'Color'} the letter ${letter}`],
    [/^¿Cuánto es (.+)\?$/,'What is $1?'],[/^Pregunta (.+) de (.+)$/,'Question $1 of $2'],
    [/^Palabra (.+) de (.+)$/,'Word $1 of $2'],[/^Escuchar (.+), escuchada$/,'Listen to $1, already heard'],[/^Escuchar (.+)$/,'Listen to $1'],
    [/^Elegí la imagen que empieza con (.+)\.$/,'Choose the picture that starts with $1.'],[/^Elegí la palabra que tiene (.+)\.$/,'Choose the word with $1.'],
    [/^Memotest de la (.+)$/,'$1 matching game'],[/^Burbujas de la (.+)$/,'$1 bubbles'],
    [/^Lo lograste en (.+) intentos?\.$/,'You did it in $1 attempts.'],
    [/^Tocá las burbujas con (.+) y juntá cinco patitas doradas\.$/,'Tap the $1 bubbles and collect five golden paws.'],
    [/^¡Buscá las cinco letras (.+)!$/,'Find the five $1 letters!'],
    [/^¡Muy bien! Encontraste una (.+)\.$/,'Great! You found $1.'],[/^Esa es la (.+)\. ¡Buscá una (.+)!$/,'That is $1. Look for $2!'],
    [/^¡Explotaste las cinco (.+)!$/,'You popped all five $1 letters!'],
    [/^¡Armá (.+)!$/,'Build $1!'],[/^¡Muy bien! Armaste (.+)\.$/,'Great! You built $1.'],
    [/^¡Intentá atrapar una (.+)! Podés volver a jugar\.$/,'Try catching $1! You can play again.'],
    [/^¡Atrapaste (\d+) letras? (.+)!$/,'You caught $1 $2 letters!'],
    [/^Carta (\d+), boca abajo$/,'Card $1, face down'],
    [/^(.+), pareja encontrada$/,'$1, pair found'],
    [/^Burbuja con la letra (.+)$/,'Bubble with letter $1'],
    [/^Espacio (\d+), vacío$/,'Slot $1, empty'],
    [/^Elegir la letra (.+)$/,'Choose letter $1'],
    [/^Devolver la letra (.+) del espacio (\d+)$/,'Return letter $1 from slot $2'],
    [/^Letra (.+): jugar, (.+) de 5 actividades completas$/,'Letter $1: play, $2 of 5 activities complete'],
    [/^(.+), juego para probar sin costo$/,(match,title)=>`${text(title)}, free game to try`],
    [/^Escuchar (el nombre|el sonido) de la letra (.+?)(; todas las actividades completas)?$/,'Hear letter $2'],
    [/^Trazar la letra (.+) siguiendo las guías numeradas$/,'Trace $1 following the numbered guides'],
    [/^Pintar dentro de la letra (.+) con el color elegido$/,'Color inside $1 with your chosen color']
  ];
  function text(value){
    if (current() !== 'en' || typeof value !== 'string') return value;
    const trimmed = value.trim();
    let translated = exact.get(trimmed);
    if (translated === undefined) {
      const entry = patterns.find(([pattern]) => pattern.test(trimmed));
      if (entry) translated = trimmed.replace(entry[0],entry[1]);
    }
    return translated === undefined ? value : value.replace(trimmed,translated);
  }
  function apply(root){
    if (current() !== 'en') return;
    const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;
    while ((node=walker.nextNode())) {
      if (node.parentElement?.closest('script,style')) continue;
      const translated=text(node.nodeValue);
      if (translated!==node.nodeValue) node.nodeValue=translated;
    }
    const elements = root.querySelectorAll?.('[aria-label],[alt]') || [];
    elements.forEach(element=>['aria-label','alt'].forEach(attribute=>{
      const value=element.getAttribute(attribute);
      if (value && text(value)!==value) element.setAttribute(attribute,text(value));
    }));
  }
  function setPreference(value){
    if (!['auto','es','en'].includes(value)) return;
    localStorage.setItem(key,value);
    preference=value;
  }
  return {current,text,apply,setPreference,getPreference:()=>preference,progressKey:()=>current()==='es'?'letrin_progress_v03':'letrin_progress_en_v1',lastLetterKey:()=>current()==='es'?'letrin_last_letter':'letrin_last_letter_en_v1'};
})();
