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
- La voz utiliza la síntesis del navegador; depende de las voces instaladas y puede necesitar conexión.
- El modo sin conexión requiere una primera visita completa con internet y un navegador compatible. El progreso es local al dispositivo.
- El trazado de A se aprueba automáticamente al cubrir al menos el 80 % de cada uno de sus tres recorridos, con tolerancia para el dedo.
- La pintura queda recortada dentro de la A, respetando también su hueco. «¡Terminé!» se habilita después de pintar.
- Las seis actividades usan distintas poses de Milo con entrada animada al completarse; se respeta la preferencia de movimiento reducido.
- La tipografía redonda Nunito está incluida localmente con su licencia SIL OFL en `assets/fonts/OFL.txt`.

## Ajustes incluidos
- Mascota oficial actualizada con la nueva versión ilustrada de Milo.
- Se mantiene la regla comercial principal:
  - Todo el abecedario está incluido en la versión base.
  - El pago único desbloquea únicamente juegos premium.
- Letra A completa y pulida.
- Demos premium de Memotest, Burbujas y Construí la palabra.
- Progreso local guardado en el dispositivo.
- Sin anuncios.
- Funciona offline con service worker.

## Alcance del checkpoint
### Gratis
- Conocer la letra
- Escuchar y repetir
- Trazar la letra
- Pintar la letra
- ¿Cuál empieza con A?
- Atrapa la letra

### Premium
- Memotest
- Burbujas de letras
- Construí la palabra

## Checklist pre-deploy
- [x] Identidad base de Letrín
- [x] Mensaje claro para padres
- [x] Mascota basada en Milo
- [x] Regla freemium clara
- [x] Seis actividades de la letra A
- [x] Demos premium
- [x] Offline
- [x] Sin anuncios
- [x] Archivos preparados para GitHub Pages en main
- [ ] Revisión final en navegador publicado

## Siguiente paso
Activar Pages si hace falta, revisar la URL publicada y continuar con nuevas letras e integración real de compras premium.

