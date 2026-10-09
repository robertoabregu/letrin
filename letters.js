const LetrinLetters = {
  A: {
    lower:'a', art:'a',
    activityArt:{trace:'actividad-trazar',catch:'actividad-atrapar',paint:'actividad-pintar'},
    words:[{name:'Abeja',asset:'abeja'},{name:'Avión',asset:'avion'},{name:'Árbol',asset:'arbol'},{name:'Araña',asset:'arana'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Barco',asset:'barco'},{name:'Flor',asset:'flor'},{name:'Gato',asset:'gato'},{name:'Banana',asset:'banana'}],
    pool:['A','B','C','A','M','O','A','S','P','A']
  },
  B: {
    lower:'b', art:'b',
    activityArt:{trace:'actividad-trazar-b',catch:'actividad-atrapar-b',paint:'actividad-pintar'},
    words:[{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Ballena',asset:'ballena'},{name:'Bicicleta',asset:'bicicleta'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Flor',asset:'flor'},{name:'Gato',asset:'gato'},{name:'Avión',asset:'avion'}],
    pool:['B','A','C','B','M','O','B','S','P','B']
  },
  C: {
    lower:'c', art:'c',
    activityArt:{trace:'actividad-trazar-c',catch:'actividad-atrapar-c',paint:'actividad-pintar'},
    words:[{name:'Casa',asset:'casa'},{name:'Cama',asset:'cama'},{name:'Conejo',asset:'conejo'},{name:'Corazón',asset:'corazon'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Barco',asset:'barco'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Flor',asset:'flor'},{name:'Gato',asset:'gato'},{name:'Avión',asset:'avion'}],
    pool:['C','B','A','C','M','O','C','S','P','C']
  },
  D: {
    lower:'d', art:'d',
    activityArt:{trace:'actividad-trazar-d',catch:'actividad-atrapar-d',paint:'actividad-pintar'},
    words:[{name:'Dado',asset:'dado'},{name:'Delfín',asset:'delfin'},{name:'Diente',asset:'diente'},{name:'Durazno',asset:'durazno'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Flor',asset:'flor'},{name:'Gato',asset:'gato'},{name:'Avión',asset:'avion'}],
    pool:['D','B','C','D','M','O','D','S','P','D']
  },
  E: {
    lower:'e', art:'e',
    activityArt:{trace:'actividad-trazar-e',catch:'actividad-atrapar-e',paint:'actividad-pintar'},
    words:[{name:'Elefante',asset:'elefante'},{name:'Estrella',asset:'estrella'},{name:'Escoba',asset:'escoba'},{name:'Espejo',asset:'espejo'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Flor',asset:'flor'},{name:'Gato',asset:'gato'},{name:'Avión',asset:'avion'}],
    pool:['E','B','C','E','M','O','E','S','P','E']
  },
  F: {
    lower:'f', art:'f',
    activityArt:{trace:'actividad-trazar-f',catch:'actividad-atrapar-f',paint:'actividad-pintar'},
    words:[{name:'Fuego',asset:'fuego'},{name:'Flor',asset:'flor'},{name:'Frutilla',asset:'frutilla'},{name:'Fantasma',asset:'fantasma'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Gato',asset:'gato'},{name:'Avión',asset:'avion'}],
    pool:['F','B','C','F','M','O','F','S','P','F']
  },
  G: {
    lower:'g', art:'g',
    activityArt:{trace:'actividad-trazar-g',catch:'actividad-atrapar-g',paint:'actividad-pintar'},
    words:[{name:'Gato',asset:'gato'},{name:'Gorila',asset:'gorila'},{name:'Gallina',asset:'gallina'},{name:'Gota',asset:'gota'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['G','B','C','G','M','O','G','S','P','G']
  },
  H: {
    lower:'h', art:'h',
    activityArt:{trace:'actividad-trazar-h',catch:'actividad-atrapar-h',paint:'actividad-pintar'},
    words:[{name:'Helado',asset:'helado'},{name:'Hoja',asset:'hoja'},{name:'Huevo',asset:'huevo'},{name:'Hilo',asset:'hilo'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['H','B','C','H','M','O','H','S','P','H']
  },
  I: {
    lower:'i', art:'i',
    activityArt:{trace:'actividad-trazar-i',catch:'actividad-atrapar-i',paint:'actividad-pintar'},
    words:[{name:'Iguana',asset:'iguana'},{name:'Iglú',asset:'iglu'},{name:'Isla',asset:'isla'},{name:'Imán',asset:'iman'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['I','B','C','I','M','O','I','S','P','I']
  },
  J: {
    lower:'j', art:'j',
    activityArt:{trace:'actividad-trazar-j',catch:'actividad-atrapar-j',paint:'actividad-pintar'},
    words:[{name:'Jirafa',asset:'jirafa'},{name:'Jabón',asset:'jabon'},{name:'Jugo',asset:'jugo'},{name:'Jaula',asset:'jaula'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['J','B','C','J','M','O','J','S','P','J']
  },
  K: {
    lower:'k', art:'k',
    activityArt:{trace:'actividad-trazar-k',catch:'actividad-atrapar-k',paint:'actividad-pintar'},
    words:[{name:'Koala',asset:'koala'},{name:'Kiwi',asset:'kiwi'},{name:'Kiosco',asset:'kiosco'},{name:'Kayak',asset:'kayak'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['K','B','C','K','M','O','K','S','P','K']
  },
  L: {
    lower:'l', art:'l',
    activityArt:{trace:'actividad-trazar-l',catch:'actividad-atrapar-l',paint:'actividad-pintar'},
    words:[{name:'León',asset:'leon'},{name:'Luna',asset:'luna'},{name:'Lápiz',asset:'lapiz'},{name:'Limón',asset:'limon'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Gato',asset:'gato'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['L','B','C','L','M','O','L','S','P','L']
  },
  M: {
    lower:'m', art:'m',
    activityArt:{trace:'actividad-trazar-m',catch:'actividad-atrapar-m',paint:'actividad-pintar'},
    words:[{name:'Mariposa',asset:'mariposa'},{name:'Manzana',asset:'manzana'},{name:'Mono',asset:'mono'},{name:'Moto',asset:'moto'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Gato',asset:'gato'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['M','B','C','M','K','O','M','S','P','M']
  },
  N: {
    lower:'n', art:'n',
    activityArt:{trace:'actividad-trazar-n',catch:'actividad-atrapar-n',paint:'actividad-pintar'},
    words:[{name:'Naranja',asset:'naranja'},{name:'Nube',asset:'nube'},{name:'Nido',asset:'nido'},{name:'Nutria',asset:'nutria'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Gato',asset:'gato'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['N','B','C','N','M','O','N','S','P','N']
  },
  Ñ: {
    lower:'ñ', art:'enie', wordMatch:'contains',
    activityArt:{trace:'actividad-trazar-enie',catch:'actividad-atrapar-enie',paint:'actividad-pintar'},
    words:[{name:'Ñandú',asset:'nandu'},{name:'Ñoquis',asset:'noquis'},{name:'Moño',asset:'mono-lazo'},{name:'Piñata',asset:'pinata'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Oso',asset:'oso'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Gato',asset:'gato'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['Ñ','N','C','Ñ','M','O','Ñ','S','P','Ñ']
  },
  O: {
    lower:'o', art:'o',
    activityArt:{trace:'actividad-trazar-o',catch:'actividad-atrapar-o',paint:'actividad-pintar'},
    words:[{name:'Oso',asset:'oso'},{name:'Oveja',asset:'oveja'},{name:'Oruga',asset:'oruga'},{name:'Oreja',asset:'oreja'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Gato',asset:'gato'},{name:'Casa',asset:'casa'},{name:'Pelota',asset:'pelota'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['O','B','C','O','M','N','O','S','P','O']
  },
  P: {
    lower:'p', art:'p',
    activityArt:{trace:'actividad-trazar-p',catch:'actividad-atrapar-p',paint:'actividad-pintar'},
    words:[{name:'Pelota',asset:'pelota'},{name:'Pato',asset:'pato'},{name:'Pez',asset:'pez'},{name:'Pera',asset:'pera'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Gato',asset:'gato'},{name:'Casa',asset:'casa'},{name:'Oso',asset:'oso'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['P','B','C','P','M','N','P','S','O','P']
  },
  Q: {
    lower:'q', art:'q', wordMatch:'contains',
    activityArt:{trace:'actividad-trazar-q',catch:'actividad-atrapar-q',paint:'actividad-pintar'},
    words:[{name:'Queso',asset:'queso'},{name:'Quena',asset:'quena'},{name:'Mosquito',asset:'mosquito'},{name:'Raqueta',asset:'raqueta'}],
    distractors:[{name:'Sol',asset:'sol'},{name:'Gato',asset:'gato'},{name:'Casa',asset:'casa'},{name:'Oso',asset:'oso'},{name:'Luna',asset:'luna'},{name:'Árbol',asset:'arbol'},{name:'Barco',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Avión',asset:'avion'}],
    pool:['Q','B','C','Q','M','N','Q','S','O','Q']
  }
};
