# Letrín — Web estática

## Estado
Versión web basada en Letrín 0.4 predeploy, con rediseño inspirado en la referencia visual: logo multicolor, jardín, Milo, tarjetas crema y juegos premium en violeta.

## Publicación gratuita en GitHub Pages
El proyecto no necesita instalación, compilación, backend ni claves. Los archivos se sirven directamente desde la raíz de `main`; `.nojekyll` evita el procesamiento con Jekyll. Todas las rutas son relativas y funcionan bajo `/letrin/`.

Si Pages todavía no está activado, el único paso manual es abrir **Settings → Pages**, elegir **Deploy from a branch**, seleccionar **main** y **/(root)** y pulsar **Save**.

URL prevista: https://robertoabregu.github.io/letrin/ (disponible después de que Pages complete el despliegue).

Los cambios futuros en `main` se publican automáticamente. Para probar localmente, servir esta carpeta con un servidor HTTP y abrirla en el navegador.

## Límites actuales
- A y B tienen cinco actividades y tres juegos adicionales. El contenido por letra está separado en letters.js; se reutiliza una única pantalla. El progreso se guarda por letra y se conserva el anterior de la A.
- B usa Barco, Banana, Ballena y Bicicleta. Sus cuatro imágenes y cinco grabaciones argentinas (letra y palabras) están incluidas en la descarga inicial.
- Las compras y la restauración todavía no están integradas: los botones informan que no están disponibles y no cobran dinero.
- Cuatro palabras tienen grabaciones argentinas incluidas: Abeja, Avión, Árbol y Araña. El resto depende de las voces del dispositivo y puede necesitar conexión.
- El modo sin conexión requiere una primera descarga con internet y un navegador compatible. Incluye las cuatro grabaciones sin necesidad de escucharlas primero; el inicio indica cuando está listo. El almacenamiento puede ser eliminado por el usuario o el sistema. El progreso es local al dispositivo.
- El trazado de A requiere completar sus tres recorridos, incluidos los extremos, con tolerancia para el dedo.
- La pintura queda recortada dentro de la A, respetando también su hueco. «¡Terminé!» se habilita después de pintar.
- Las cinco actividades usan distintas poses de Milo con la misma pantalla de festejo y entrada animada; se respeta la preferencia de movimiento reducido.
- El encabezado muestra cinco patitas: vacías al comenzar y doradas a medida que se completan actividades. El progreso anterior se conserva, excluyendo «Escuchar y repetir», que fue retirada.
- La tipografía redonda Nunito está incluida localmente con su licencia SIL OFL en `assets/fonts/OFL.txt`.

## Ajustes incluidos
- Mascota oficial actualizada con la nueva versión ilustrada de Milo.
- Se mantiene la regla comercial principal:
  - La A está disponible. Las demás letras se anuncian como próximas y gratuitas.
  - No hay compras habilitadas. La monetización futura está pendiente de definición.
- Letra A completa y pulida.
- Demos premium de Memotest, Burbujas y Construí la palabra.
- Progreso local guardado en el dispositivo.
- Sin anuncios.
- Funciona offline con service worker.

## Alcance del checkpoint
### Gratis
- Conocer la letra
- Trazar la letra
- Pintar la letra
- ¿Cuál empieza con A?
- Atrapa la letra

### Juegos adicionales para probar sin costo
- Memotest
- Burbujas de letras
- Construí la palabra

## Checklist pre-deploy
- [x] Identidad base de Letrín
- [x] Mensaje claro para padres
- [x] Mascota basada en Milo
- [x] Regla freemium clara
- [x] Cinco actividades de la letra A
- [x] Demos premium
- [x] Offline
- [x] Sin anuncios
- [x] Archivos preparados para GitHub Pages en main
- [ ] Revisión final en navegador publicado

## Siguiente paso
Las letras A, B, C, D y E tienen cinco actividades y tres juegos adicionales, con progreso independiente. La C usa Casa, Cama, Conejo y Corazón, todas con sonido inicial /k/, y un trazado curvo continuo de un paso.

La C y sus cuatro palabras incluyen las grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial. Validar en la tablet Android real antes del empaquetado para Play Store. La versión web sigue disponible para iPhone.

### Ilustraciones de C
Generadas con la herramienta integrada de imágenes, con fondo transparente, y optimizadas a WebP en `assets/`. Prompts: cama de madera con manta azul y almohada crema en estilo infantil 3D (`cama.webp`); conejo blanco y beige sentado, ojos grandes y sonrisa (`conejo.webp`); corazón rojo sonriente y redondeado (`corazon.webp`); par Cc inflado rojo con el estilo de Aa, y variante idéntica verde (`letra-c-roja.webp`, `letra-c-verde.webp`); lápiz amarillo junto a C azul con guía punteada (`actividad-trazar-c.webp`); globo rojo con C blanca y cuerda dorada (`actividad-atrapar-c.webp`). Casa reutiliza la ilustración existente.

## Letra D
Dado, Delfín, Diente y Durazno: cinco actividades y tres juegos adicionales con progreso independiente. Trazado de dos pasos, íconos propios en tarjetas y actividades, Dd roja y verde. Incluye las cinco grabaciones argentinas del usuario y todos los dibujos en la descarga sin conexión.

## Letra E
Elefante, Estrella, Escoba y Espejo: cinco actividades y tres juegos adicionales, progreso independiente y navegación D/E. Trazado de cuatro pasos, Ee roja y verde, íconos propios en tarjetas y encabezados. Los dibujos se incluyen en la descarga sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Ilustraciones generadas con la herramienta integrada, fondo transparente, optimizadas en assets/: elefante.webp (elefante gris sonriente, orejas rosadas, cuerpo entero); estrella.webp (estrella amarilla de cinco puntas sonriente); escoba.webp (escoba de madera y paja dorada, atadura turquesa); espejo.webp (espejo de mano ovalado con marco turquesa y cristal plateado); letra-e-roja.webp y letra-e-verde.webp (Ee inflada con el estilo de Aa, colores rojo y verde); actividad-trazar-e.webp (lápiz amarillo junto a E azul con guía punteada); actividad-atrapar-e.webp (globo rojo con E blanca y cuerda dorada).

## Letra F
Fuego, Flor, Frutilla y Fantasma: cinco actividades y tres juegos adicionales, progreso independiente y navegación E/F. Trazado de tres pasos con extremos completos, Ff roja y verde e íconos F tanto en tarjetas como dentro de las actividades. Dibujos incluidos sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Ilustraciones generadas con la herramienta integrada y optimizadas en assets/: fuego.webp (llama naranja y amarilla sonriente, sin objetos peligrosos); frutilla.webp (frutilla roja con hojas verdes y rostro amigable); fantasma.webp (fantasma blanco alegre, no aterrador); letra-f-roja.webp y letra-f-verde.webp (Ff inflada, mismo estilo de Aa, rojo y verde); actividad-trazar-f.webp (lápiz amarillo junto a F azul con guía punteada); actividad-atrapar-f.webp (globo rojo con F blanca y cuerda dorada). Flor reutiliza flor.webp. Todos con fondo transparente.
