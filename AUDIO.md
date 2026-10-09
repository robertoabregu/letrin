# Sonido de Letrín

Argentina es la región inicial. Las grabaciones registradas en audio-catalog.js se reproducen antes de usar la voz del dispositivo. El selector de región no traduce el contenido. Las voces de sistema pueden depender de una conexión y de las voces instaladas.

## Música y festejos

Patterns of Play fue proporcionada por el usuario. La copia optimizada está en assets/audio/patterns-of-play.mp3, MP3 estéreo a 96 kb/s, aproximadamente 2,16 MB. El original permanece intacto en Descargas.

soundtrack.js inicia música en bucle después de una interacción, a ganancia 0,14. Durante palabras baja a 0,035; durante fonéticas de una letra baja a 0,008 sin detenerse. Web Audio GainNode evita depender del control de volumen de HTML Audio en dispositivos móviles. El volumen se recupera suavemente al terminar, cancelar o fallar una voz. Un identificador de sesión evita que un callback viejo libere la atenuación de otro audio.

La app pausa música al ocultarse y la reanuda al volver si está habilitada. Música y festejos tienen interruptores independientes, persistidos localmente. El festejo es un arpegio original sintetizado de cuatro notas, sin descarga externa; se activa en todos los carteles de Milo festejando.

## Adultos y privacidad

Para adultos reúne región de voz, música, festejos y privacidad según funcionamiento actual. Entrada con cuenta de multiplicación. Sin traducciones adicionales, cuentas, analítica ni acceso a micrófono. Progreso y preferencias guardados en el navegador. Revisar la política para tiendas al preparar Android.

Los archivos incluidos y música se precargan mediante sw.js. No se envían claves de proveedores de voz al cliente.

Validación: node ../check-soundtrack.cjs desde la carpeta de la app. Cubre atenuación, recuperación, sesiones, cancelación/error, inicio por gesto, bucle, interruptores y visibilidad. Pendiente prueba auditiva en dispositivos reales.
