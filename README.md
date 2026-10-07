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
Las letras A, B y C tienen cinco actividades y tres juegos adicionales, con progreso independiente. La C usa Casa, Cama, Conejo y Corazón, todas con sonido inicial /k/, y un trazado curvo continuo de un paso.

La C y sus cuatro palabras incluyen las grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial. Validar en la tablet Android real antes del empaquetado para Play Store. La versión web sigue disponible para iPhone.

### Ilustraciones de C
Generadas con la herramienta integrada de imágenes, con fondo transparente, y optimizadas a WebP en `assets/`. Prompts: cama de madera con manta azul y almohada crema en estilo infantil 3D (`cama.webp`); conejo blanco y beige sentado, ojos grandes y sonrisa (`conejo.webp`); corazón rojo sonriente y redondeado (`corazon.webp`); par Cc inflado rojo con el estilo de Aa, y variante idéntica verde (`letra-c-roja.webp`, `letra-c-verde.webp`); lápiz amarillo junto a C azul con guía punteada (`actividad-trazar-c.webp`); globo rojo con C blanca y cuerda dorada (`actividad-atrapar-c.webp`). Casa reutiliza la ilustración existente.
