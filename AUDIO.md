# Audio regional

La preferencia inicial es Argentina. El modo automático usa el idioma del navegador, no la ubicación física. Los textos todavía permanecen en español argentino.

El motor selecciona una voz explícita: primero la región solicitada, después variantes latinoamericanas. No usa una voz es-ES como respaldo para Latinoamérica. Las voces dependen del sistema y su disponibilidad no garantiza un acento argentino en todos los dispositivos.

## Paquetes grabados

Todavía no se incluyen grabaciones. Para agregar una, guardar por ejemplo `assets/audio/es-AR/abeja.mp3` y registrar en `audio-catalog.js`, dentro de `es-AR.clips`, la entrada `Abeja: 'assets/audio/es-AR/abeja.mp3'`.

Las claves coinciden exactamente con el texto solicitado. Usar Abeja, Avión, Árbol y Araña para el contenido actual. Verificar pronunciación, calidad, derechos de uso y ausencia de silencios largos antes de publicar.

Los clips registrados se reproducen antes de recurrir a la voz del dispositivo. Se descargan al usarlos y el service worker los guarda para usos posteriores sin conexión. No se descargan todas las regiones. La descarga completa voluntaria de paquetes todavía no está implementada; agregarla cuando existan archivos reales y tamaños conocidos. Al actualizar el cache de la app, las grabaciones utilizadas pueden necesitar descargarse nuevamente.

El cierre o un nuevo audio cancela la reproducción anterior. Solo el evento de reproducción terminada confirma una palabra escuchada; errores o cancelaciones no completan actividades.

No agregar claves de servicios de voz al navegador. Los archivos pueden producirse previamente y alojarse en GitHub Pages sin servidor adicional. Traducciones y vocabulario regional deben agregarse como catálogos de contenido separados, no solo cambiando la voz.