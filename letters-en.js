const LetrinEnglishLetters = {
  A: {
    ...LetrinLetters.A,
    words:[{name:'Apple',asset:'manzana'},{name:'Ant',asset:'en-ant'},{name:'Airplane',asset:'avion'},{name:'Anchor',asset:'en-anchor'}],
    distractors:[{name:'Sun',asset:'sol'},{name:'Bear',asset:'oso'},{name:'House',asset:'casa'},{name:'Ball',asset:'pelota'},{name:'Moon',asset:'luna'},{name:'Boat',asset:'barco'},{name:'Flower',asset:'flor'},{name:'Cat',asset:'gato'},{name:'Banana',asset:'banana'}]
  },
  B: {
    ...LetrinLetters.B,
    words:[{name:'Ball',asset:'pelota'},{name:'Bear',asset:'oso'},{name:'Boat',asset:'barco'},{name:'Banana',asset:'banana'}],
    distractors:[{name:'Apple',asset:'manzana'},{name:'Ant',asset:'en-ant'},{name:'Airplane',asset:'avion'},{name:'Anchor',asset:'en-anchor'},{name:'Sun',asset:'sol'},{name:'House',asset:'casa'},{name:'Moon',asset:'luna'},{name:'Flower',asset:'flor'},{name:'Cat',asset:'gato'}]
  },
  C: {
    ...LetrinLetters.C,
    words:[{name:'Cat',asset:'gato'},{name:'Car',asset:'en-car'},{name:'Cow',asset:'vaca'},{name:'Cake',asset:'en-cake'}],
    distractors:[{name:'Apple',asset:'manzana'},{name:'Ant',asset:'en-ant'},{name:'Airplane',asset:'avion'},{name:'Ball',asset:'pelota'},{name:'Bear',asset:'oso'},{name:'Boat',asset:'barco'},{name:'Banana',asset:'banana'},{name:'Sun',asset:'sol'},{name:'Moon',asset:'luna'}]
  },
  D: {
    ...LetrinLetters.D,
    words:[{name:'Dog',asset:'milo'},{name:'Duck',asset:'pato'},{name:'Dolphin',asset:'delfin'},{name:'Door',asset:'en-door'}],
    distractors:[{name:'Cat',asset:'gato'},{name:'Car',asset:'en-car'},{name:'Cow',asset:'vaca'},{name:'Cake',asset:'en-cake'},{name:'Apple',asset:'manzana'},{name:'Ball',asset:'pelota'},{name:'Bear',asset:'oso'},{name:'Sun',asset:'sol'},{name:'Moon',asset:'luna'}]
  },
  E: {
    ...LetrinLetters.E,
    words:[{name:'Elephant',asset:'elefante'},{name:'Egg',asset:'huevo'},{name:'Elbow',asset:'en-elbow'},{name:'Envelope',asset:'en-envelope'}],
    distractors:[{name:'Dog',asset:'milo'},{name:'Duck',asset:'pato'},{name:'Dolphin',asset:'delfin'},{name:'Door',asset:'en-door'},{name:'Cat',asset:'gato'},{name:'Car',asset:'en-car'},{name:'Apple',asset:'manzana'},{name:'Ball',asset:'pelota'},{name:'Bear',asset:'oso'}]
  },
  F: {
    ...LetrinLetters.F,
    words:[{name:'Fish',asset:'pez'},{name:'Flower',asset:'flor'},{name:'Frog',asset:'rana'},{name:'Fire',asset:'fuego'}],
    distractors:[{name:'Dog',asset:'milo'},{name:'Duck',asset:'pato'},{name:'Elephant',asset:'elefante'},{name:'Egg',asset:'huevo'},{name:'Cat',asset:'gato'},{name:'Car',asset:'en-car'},{name:'Apple',asset:'manzana'},{name:'Ball',asset:'pelota'},{name:'Bear',asset:'oso'}]
  },
  G: {
    ...LetrinLetters.G,
    words:[{name:'Goat',asset:'en-goat'},{name:'Gorilla',asset:'gorila'},{name:'Guitar',asset:'en-guitar'},{name:'Gift',asset:'en-gift'}],
    distractors:[{name:'Fish',asset:'pez'},{name:'Flower',asset:'flor'},{name:'Frog',asset:'rana'},{name:'Fire',asset:'fuego'},{name:'Dog',asset:'milo'},{name:'Duck',asset:'pato'},{name:'Cat',asset:'gato'},{name:'Apple',asset:'manzana'},{name:'Ball',asset:'pelota'}]
  },
  H: {
    ...LetrinLetters.H,
    words:[{name:'House',asset:'casa'},{name:'Hand',asset:'en-hand'},{name:'Hat',asset:'sombrero'},{name:'Heart',asset:'corazon'}],
    distractors:[{name:'Goat',asset:'en-goat'},{name:'Gorilla',asset:'gorila'},{name:'Guitar',asset:'en-guitar'},{name:'Gift',asset:'en-gift'},{name:'Fish',asset:'pez'},{name:'Flower',asset:'flor'},{name:'Frog',asset:'rana'},{name:'Fire',asset:'fuego'},{name:'Dog',asset:'milo'}]
  },
  I: {
    ...LetrinLetters.I,
    words:[{name:'Igloo',asset:'iglu'},{name:'Iguana',asset:'iguana'},{name:'Insect',asset:'abeja'},{name:'Ink',asset:'en-ink'}],
    distractors:[{name:'House',asset:'casa'},{name:'Hand',asset:'en-hand'},{name:'Hat',asset:'sombrero'},{name:'Heart',asset:'corazon'},{name:'Goat',asset:'en-goat'},{name:'Guitar',asset:'en-guitar'},{name:'Fish',asset:'pez'},{name:'Flower',asset:'flor'},{name:'Dog',asset:'milo'}]
  },
  J: {
    ...LetrinLetters.J,
    words:[{name:'Juice',asset:'jugo'},{name:'Jelly',asset:'en-jelly'},{name:'Jacket',asset:'en-jacket'},{name:'Jet',asset:'en-jet'}],
    distractors:[{name:'Igloo',asset:'iglu'},{name:'Iguana',asset:'iguana'},{name:'Insect',asset:'abeja'},{name:'Ink',asset:'en-ink'},{name:'House',asset:'casa'},{name:'Hand',asset:'en-hand'},{name:'Hat',asset:'sombrero'},{name:'Heart',asset:'corazon'},{name:'Goat',asset:'en-goat'}]
  },
  K: {
    ...LetrinLetters.K,
    words:[{name:'Kite',asset:'en-kite'},{name:'Key',asset:'en-key'},{name:'Kiwi',asset:'kiwi'},{name:'Koala',asset:'koala'}],
    distractors:[{name:'Juice',asset:'jugo'},{name:'Jelly',asset:'en-jelly'},{name:'Jacket',asset:'en-jacket'},{name:'Jet',asset:'en-jet'},{name:'Igloo',asset:'iglu'},{name:'Iguana',asset:'iguana'},{name:'Insect',asset:'abeja'},{name:'Ink',asset:'en-ink'},{name:'House',asset:'casa'}]
  },
  L: {
    ...LetrinLetters.L,
    words:[{name:'Lion',asset:'leon'},{name:'Lemon',asset:'limon'},{name:'Leaf',asset:'hoja'},{name:'Lamp',asset:'en-lamp'}],
    distractors:[{name:'Kite',asset:'en-kite'},{name:'Key',asset:'en-key'},{name:'Kiwi',asset:'kiwi'},{name:'Koala',asset:'koala'},{name:'Juice',asset:'jugo'},{name:'Jelly',asset:'en-jelly'},{name:'Jacket',asset:'en-jacket'},{name:'Jet',asset:'en-jet'},{name:'Igloo',asset:'iglu'}]
  },
  M: {
    ...LetrinLetters.M,
    words:[{name:'Monkey',asset:'mono'},{name:'Moon',asset:'luna'},{name:'Milk',asset:'en-milk'},{name:'Mouse',asset:'raton'}],
    distractors:[{name:'Lion',asset:'leon'},{name:'Lemon',asset:'limon'},{name:'Leaf',asset:'hoja'},{name:'Lamp',asset:'en-lamp'},{name:'Kite',asset:'en-kite'},{name:'Key',asset:'en-key'},{name:'Kiwi',asset:'kiwi'},{name:'Koala',asset:'koala'},{name:'Juice',asset:'jugo'}]
  },
  N: {
    ...LetrinLetters.N,
    words:[{name:'Nest',asset:'nido'},{name:'Nose',asset:'en-nose'},{name:'Net',asset:'en-net'},{name:'Nut',asset:'en-nut'}],
    distractors:[{name:'Monkey',asset:'mono'},{name:'Moon',asset:'luna'},{name:'Milk',asset:'en-milk'},{name:'Mouse',asset:'raton'},{name:'Lion',asset:'leon'},{name:'Lemon',asset:'limon'},{name:'Leaf',asset:'hoja'},{name:'Lamp',asset:'en-lamp'},{name:'Kite',asset:'en-kite'}]
  },
  O: {
    ...LetrinLetters.O,
    words:[{name:'Orange',asset:'naranja'},{name:'Owl',asset:'en-owl'},{name:'Octopus',asset:'en-octopus'},{name:'Onion',asset:'en-onion'}],
    distractors:[{name:'Nest',asset:'nido'},{name:'Nose',asset:'en-nose'},{name:'Net',asset:'en-net'},{name:'Nut',asset:'en-nut'},{name:'Monkey',asset:'mono'},{name:'Moon',asset:'luna'},{name:'Milk',asset:'en-milk'},{name:'Mouse',asset:'raton'},{name:'Lion',asset:'leon'}]
  },
  P: {
    ...LetrinLetters.P,
    words:[{name:'Pear',asset:'pera'},{name:'Pencil',asset:'lapiz'},{name:'Penguin',asset:'en-penguin'},{name:'Pizza',asset:'en-pizza'}],
    distractors:[{name:'Orange',asset:'naranja'},{name:'Owl',asset:'en-owl'},{name:'Octopus',asset:'en-octopus'},{name:'Onion',asset:'en-onion'},{name:'Nest',asset:'nido'},{name:'Nose',asset:'en-nose'},{name:'Net',asset:'en-net'},{name:'Nut',asset:'en-nut'},{name:'Monkey',asset:'mono'}]
  },
  Q: {
    ...LetrinLetters.Q,
    wordMatch:'starts',
    words:[{name:'Queen',asset:'en-queen'},{name:'Quilt',asset:'en-quilt'},{name:'Quail',asset:'en-quail'},{name:'Quartz',asset:'en-quartz'}],
    distractors:[{name:'Pear',asset:'pera'},{name:'Pencil',asset:'lapiz'},{name:'Penguin',asset:'en-penguin'},{name:'Pizza',asset:'en-pizza'},{name:'Orange',asset:'naranja'},{name:'Owl',asset:'en-owl'},{name:'Octopus',asset:'en-octopus'},{name:'Onion',asset:'en-onion'},{name:'Nest',asset:'nido'}]
  },
  R: {
    ...LetrinLetters.R,
    words:[{name:'Rabbit',asset:'conejo'},{name:'Rose',asset:'rosa'},{name:'Robot',asset:'en-robot'},{name:'Rocket',asset:'en-rocket'}],
    distractors:[{name:'Queen',asset:'en-queen'},{name:'Quilt',asset:'en-quilt'},{name:'Quail',asset:'en-quail'},{name:'Quartz',asset:'en-quartz'},{name:'Pear',asset:'pera'},{name:'Pencil',asset:'lapiz'},{name:'Penguin',asset:'en-penguin'},{name:'Pizza',asset:'en-pizza'},{name:'Orange',asset:'naranja'}]
  },
  S: {
    ...LetrinLetters.S,
    words:[{name:'Sun',asset:'sol'},{name:'Sandwich',asset:'sandwich'},{name:'Shoe',asset:'zapato'},{name:'Snake',asset:'en-snake'}],
    distractors:[{name:'Rabbit',asset:'conejo'},{name:'Rose',asset:'rosa'},{name:'Robot',asset:'en-robot'},{name:'Rocket',asset:'en-rocket'},{name:'Queen',asset:'en-queen'},{name:'Quilt',asset:'en-quilt'},{name:'Quail',asset:'en-quail'},{name:'Quartz',asset:'en-quartz'},{name:'Pear',asset:'pera'}]
  },
  T: {
    ...LetrinLetters.T,
    words:[{name:'Tree',asset:'arbol'},{name:'Turtle',asset:'tortuga'},{name:'Tomato',asset:'tomate'},{name:'Truck',asset:'en-truck'}],
    distractors:[{name:'Sun',asset:'sol'},{name:'Sandwich',asset:'sandwich'},{name:'Shoe',asset:'zapato'},{name:'Snake',asset:'en-snake'},{name:'Rabbit',asset:'conejo'},{name:'Rose',asset:'rosa'},{name:'Robot',asset:'en-robot'},{name:'Rocket',asset:'en-rocket'},{name:'Queen',asset:'en-queen'}]
  },
  U: {
    ...LetrinLetters.U,
    words:[{name:'Umbrella',asset:'en-umbrella'},{name:'Unicorn',asset:'unicornio'},{name:'Ukulele',asset:'en-ukulele-v2'},{name:'Uniform',asset:'en-uniform'}],
    distractors:[{name:'Tree',asset:'arbol'},{name:'Turtle',asset:'tortuga'},{name:'Tomato',asset:'tomate'},{name:'Truck',asset:'en-truck'},{name:'Sun',asset:'sol'},{name:'Sandwich',asset:'sandwich'},{name:'Shoe',asset:'zapato'},{name:'Snake',asset:'en-snake'},{name:'Rabbit',asset:'conejo'}]
  },
  V: {
    ...LetrinLetters.V,
    words:[{name:'Violin',asset:'violin'},{name:'Van',asset:'en-van'},{name:'Vase',asset:'en-vase'},{name:'Volcano',asset:'en-volcano'}],
    distractors:[{name:'Umbrella',asset:'en-umbrella'},{name:'Unicorn',asset:'unicornio'},{name:'Ukulele',asset:'en-ukulele-v2'},{name:'Uniform',asset:'en-uniform'},{name:'Tree',asset:'arbol'},{name:'Turtle',asset:'tortuga'},{name:'Tomato',asset:'tomate'},{name:'Truck',asset:'en-truck'},{name:'Sun',asset:'sol'}]
  }
};
