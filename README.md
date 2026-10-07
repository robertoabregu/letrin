# Letrín — Web estática

## Estado
Versión web basada en Letrín 0.4 predeploy, con rediseño inspirado en la referencia visual: logo multicolor, jardín, Milo, tarjetas crema y juegos premium en violeta.

## Publicación gratuita en GitHub Pages
El proyecto no necesita instalación, compilación, backend ni claves. Los archivos se sirven directamente desde la raíz de `main`; `.nojekyll` evita el procesamiento con Jekyll. Todas las rutas son relativas y funcionan bajo `/letrin/`.

Si Pages todavía no está activado, el único paso manual es abrir **Settings → Pages**, elegir **Deploy from a branch**, seleccionar **main** y **/(root)** y pulsar **Save**.

URL prevista: https://robertoabregu.github.io/letrin/ (disponible después de que Pages complete el despliegue).

Los cambios futuros en `main` se publican automáticamente. Para probar localmente, servir esta carpeta con un servidor HTTP y abrirla en el navegador.

## Límites actuales
- Solo la A tiene actividades implementadas. Las otras letras se muestran como próximas y gratuitas.
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
Prioridad: lanzamiento en Play Store de Android. Todavía falta preparar íconos, empaquetado Android, revisión de privacidad y requisitos de la tienda. Completar audios, validar en modo avión en Android real y separar el contenido por letra antes de sumar la B. La versión web sigue disponible para iPhone; no se prevé publicar allí por ahora.
