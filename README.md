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

## Letra G
Gato, Gorila, Gallina y Gota: cinco actividades y tres juegos adicionales, progreso independiente y navegación F/G. Trazado de dos pasos: curva y barra interior. Gg roja y verde, íconos G en tarjetas y actividades. Incluye los dibujos y las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Ilustraciones realizadas con la herramienta integrada, fondo transparente, optimizadas en assets/: gorila.webp (gorila gris sonriente sentado, sin cola); gallina.webp (gallina crema con cresta roja, pico y patas amarillos); gota.webp (gota azul brillante sonriente); letra-g-roja.webp y letra-g-verde.webp (par Gg inflado, minúscula de un piso con descendente, mismo estilo de Aa); actividad-trazar-g.webp (lápiz amarillo junto a G azul con guía punteada); actividad-atrapar-g.webp (globo rojo con G blanca y cuerda dorada). Gato reutiliza gato.webp.

## Letra H y título del abecedario
Helado, Hoja, Huevo e Hilo: cinco actividades y tres juegos adicionales, progreso independiente y navegación G/H. Trazado de tres pasos: dos verticales y barra horizontal. Hh roja y verde, íconos H en tarjetas y actividades. La H es muda; su grabación debe decir «hache», no inventar un fonema. Incluye las cuatro grabaciones de palabras del usuario, disponibles sin conexión junto con los dibujos. Falta la grabación «hache»; por ahora el botón de la H pronuncia explícitamente «hache» con la voz del dispositivo, que puede necesitar internet. Encabezado del abecedario centrado respecto de todo el cuadro mediante columnas laterales iguales, en celular y escritorio.

Ilustraciones generadas con la herramienta integrada, fondo transparente, optimizadas en assets/: helado.webp (cono de waffle con bochas rosa y vainilla sonrientes); hoja.webp (hoja verde con nervaduras y rostro alegre); huevo.webp (huevo entero crema, sin romper, sonriente); hilo.webp (carrete de madera con hilo turquesa y hebra suelta, sin aguja); letra-h-roja.webp y letra-h-verde.webp (Hh inflada redondeada, mismo estilo de Aa, rojo y verde); actividad-trazar-h.webp (lápiz amarillo junto a H azul con guías punteadas); actividad-atrapar-h.webp (globo rojo con H blanca y cuerda dorada).

## Letra I
Iguana, Iglú, Isla e Imán: cinco actividades y tres juegos adicionales, progreso independiente y navegación H/I. I mayúscula con barras superior e inferior, i minúscula con punto separado; mismo estilo inflado rojo/verde. Trazado en tres pasos: vertical central, barra superior y barra inferior. Íconos propios en tarjetas y actividades, incluidos sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Ilustraciones realizadas con la herramienta integrada, fondo transparente, optimizadas en assets/: iguana.webp (iguana verde sonriente, cuatro patas, cresta y cola completa); iglu.webp (iglú de bloques azul hielo con entrada abovedada); isla.webp (isla de arena con palmeras rodeada por agua turquesa); iman.webp (imán rojo en herradura con extremos plateados y sonrisa); letra-i-roja.webp y letra-i-verde.webp (Ii inflada con barras en mayúscula y punto separado en minúscula); actividad-trazar-i.webp (lápiz amarillo junto a I azul con guía punteada); actividad-atrapar-i.webp (globo rojo con I blanca y cuerda dorada).

## Letra J
Jirafa, Jabón, Jugo y Jaula: cinco actividades y tres juegos adicionales, progreso independiente y navegación I/J. Trazado de dos pasos: vertical con gancho curvo y barra superior. Jj inflada roja/verde, minúscula con punto separado; íconos propios en tarjetas y dentro de las actividades. Dibujos incluidos sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Ilustraciones realizadas con la herramienta integrada, fondo transparente, optimizadas en assets/: jirafa.webp (jirafa bebé amarilla con manchas marrones y cuerpo completo); jabon.webp (jabón rosa sonriente con espuma y burbujas); jugo.webp (vaso de jugo naranja con rodaja y sorbete turquesa); jaula.webp (jaula turquesa vacía con puerta abierta, aro dorado y percha de madera); letra-j-roja.webp y letra-j-verde.webp (Jj inflada, barra superior y gancho, punto separado en minúscula); actividad-trazar-j.webp (lápiz amarillo junto a J azul con guía punteada); actividad-atrapar-j.webp (globo rojo con J blanca y cuerda dorada).

## Letra K

Vocabulario: Koala, Kiwi, Kiosco y Kayak. Cinco actividades y tres juegos extra adaptados; trazado K en tres recorridos completos. Sin cambios al fondo ni a Milo.

Imágenes generadas con la herramienta integrada, fondo transparente, guardadas en `assets/`: `koala.webp`, `kiwi.webp`, `kiosco.webp`, `kayak.webp`, `letra-k-roja.webp`, `letra-k-verde.webp`, `actividad-trazar-k.webp`, `actividad-atrapar-k.webp`.

Prompts: koala gris simpático sentado de cuerpo entero; kiwi entero marrón junto a mitad verde con semillas; kiosco argentino de golosinas con toldo azul y blanco sin texto; kayak naranja con asiento azul y remo doble amarillo. Estilo infantil 3D suave, objeto centrado aislado. Kk roja inflada siguiendo Aa, misma base y composición centrada; variante verde conservando formas. Ícono de trazado K azul con guía blanca y lápiz amarillo, e ícono de globo rojo con K blanca y hilo dorado siguiendo los originales.

Incluye las cinco grabaciones argentinas del usuario, disponibles sin conexión después de la descarga inicial. El archivo original `kiosko.wav` se integra como `kiosco.mp3`, manteniendo la escritura Kiosco en la app.

## Letra L

León, Luna, Lápiz y Limón: cinco actividades y tres juegos extra, progreso independiente y navegación K/L. Trazado de dos pasos: vertical hacia abajo y base corta hacia la derecha. Ll roja y verde e íconos L en tarjetas y actividades. Dibujos incluidos en la descarga sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Imágenes creadas con la herramienta integrada, fondo transparente, guardadas en `assets/`: `leon.webp`, `lapiz.webp`, `limon.webp`, `letra-l-roja.webp`, `letra-l-verde.webp`, `actividad-trazar-l.webp`, `actividad-atrapar-l.webp`. Se reutiliza `luna.webp` sin modificarla.

Prompts: león sonriente sentado con melena naranja y pelaje dorado; lápiz escolar amarillo con punta de grafito y goma rosa en diagonal; limón amarillo entero con hoja verde. Ilustración infantil 3D suave, centrada y aislada. Ll roja inflada siguiendo Aa, L de base corta y l minúscula vertical sin punto; variante verde manteniendo formas. Trazado: L azul con guía blanca discontinua y lápiz amarillo; globo rojo con L blanca e hilo dorado, siguiendo los originales.

## Letra M

Mariposa, Manzana, Mono y Moto: cinco actividades y tres juegos extra, progreso independiente y navegación L/M. Trazado de cuatro pasos: vertical izquierda, diagonal al centro, diagonal arriba y vertical derecha. Mm roja y verde e íconos M en tarjetas y actividades. Dibujos incluidos en la descarga sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Imágenes creadas con la herramienta integrada y fondo transparente, guardadas en `assets/`: `mariposa.webp`, `mono.webp`, `moto.webp`, `letra-m-roja.webp`, `letra-m-verde.webp`, `actividad-trazar-m.webp`, `actividad-atrapar-m.webp`. `manzana.webp` reutiliza una copia del dibujo existente `actividad-elegir.webp`, sin modificar el original.

Prompts: mariposa sonriente con alas abiertas simétricas violetas rosas azules y amarillas; mono marrón sentado con cola curvada; moto azul y roja de dos ruedas sin conductor ni marcas. Ilustración infantil 3D suave, objeto centrado aislado. Mm roja inflada siguiendo Aa, M de dos verticales y V interior, m minúscula de dos arcos; variante verde conservando formas. Ícono de trazado M azul con guía blanca y lápiz amarillo; globo rojo con M blanca e hilo dorado, siguiendo los originales.

## Letra N

Naranja, Nube, Nido y Nutria: cinco actividades y tres juegos extra, progreso independiente y navegación M/N. Trazado de tres pasos: vertical izquierda, diagonal hacia abajo a la derecha y vertical derecha. Nn roja y verde e íconos N en tarjetas y actividades. Dibujos incluidos en la descarga sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial.

Imágenes creadas con la herramienta integrada, fondo transparente, guardadas en `assets/`: `naranja.webp`, `nube.webp`, `nido.webp`, `nutria.webp`, `letra-n-roja.webp`, `letra-n-verde.webp`, `actividad-trazar-n.webp`, `actividad-atrapar-n.webp`.

Prompts: naranja entera redonda con hoja verde; nube blanca sonriente con sombras celestes; nido de ramitas con tres huevos celestes; nutria marrón sentada con bigotes y cola larga afinada. Ilustración infantil 3D suave, objeto centrado aislado. Nn roja inflada siguiendo Aa, N de dos verticales y una diagonal, n minúscula de un arco; variante verde conservando formas. Ícono de trazado N azul con guía blanca y lápiz amarillo; globo rojo con N blanca e hilo dorado siguiendo los originales.

## Letra Ñ

Ñandú, Ñoquis, Moño y Piñata. Solo esta letra usa «Palabras con Ñ» y «¿Cuál tiene Ñ?», pues puede aparecer al principio o dentro de la palabra. Cinco actividades y tres juegos extra, progreso independiente y navegación N/Ñ. Trazado de cuatro pasos, incluida la virgulilla curva separada; no se completa sin trazarla. Ññ roja/verde e íconos Ñ en tarjetas y actividades, globos y burbujas distinguibles de N. Dibujos incluidos sin conexión. Incluye las cinco grabaciones argentinas suministradas por el usuario, disponibles sin conexión después de la descarga inicial. `leter-nn-fonetic.wav` corresponde a Ñ, `monno.wav` a Moño y `pinnata.wav` a Piñata; el audio de Moño se guarda como `mono-lazo.mp3`, separado del Mono de la M.

Imágenes creadas con la herramienta integrada, fondo transparente, guardadas en `assets/`: `nandu.webp`, `noquis.webp`, `mono-lazo.webp` (moño, para no sobrescribir el mono de M), `pinata.webp`, `letra-enie-roja.webp`, `letra-enie-verde.webp`, `actividad-trazar-enie.webp`, `actividad-atrapar-enie.webp`.

Prompts: ñandú gris de cuerpo entero con cuello y patas largos; plato de ñoquis acanalados con salsa roja y queso; moño rosa de dos lazos y dos cintas; piñata estrella de papel multicolor con flecos. Ilustración infantil 3D suave centrada y aislada. Ññ roja inflada siguiendo Nn, virgulilla separada sobre ambas letras; variante verde conservando formas. Ícono Ñ azul con guías blancas incluyendo virgulilla y lápiz amarillo; globo rojo con Ñ blanca e hilo dorado, siguiendo los originales.

## Letra O — v57

Palabras: Oso, Oveja, Oruga y Oreja. Cinco actividades y tres juegos adicionales configurados. Trazado oval cerrado en un solo recorrido; requiere cubrir toda la vuelta. Se reutiliza el oso existente. Ilustraciones nuevas en assets/oveja.webp, assets/oruga.webp y assets/oreja.webp; letras roja/verde e iconos específicos de O.

Imágenes generadas con fondo transparente, estilo infantil 3D suave: oveja blanca de cuerpo entero; oruga verde segmentada sonriente; oreja humana externa simplificada color durazno. Letras Oo de juguete rojo/verde; O azul con guía punteada y lápiz; globo rojo con O blanca.

Audios incorporados: oso.wav, oveja.wav, oruga.wav, oreja.wav y leter-o-fonetic.wav, optimizados a MP3 mono 24 kHz / 96 kbps e incluidos para uso sin conexión.

## Letra P — v58

Palabras: Pelota, Pato, Pez y Pera. Cinco actividades y tres juegos adicionales; trazado P en dos recorridos (palo y curva superior). Se reutiliza assets/pelota.webp. Nuevos archivos: assets/pato.webp, assets/pez.webp, assets/pera.webp, assets/letra-p-roja.webp, assets/letra-p-verde.webp, assets/actividad-trazar-p.webp y assets/actividad-atrapar-p.webp. Audios incorporados para los cinco elementos.

Generación con herramienta integrada de imágenes, fondo transparente. Prompts: pato amarillo de cuerpo entero con pico y patas naranjas, ojos amigables; pez naranja de cuerpo entero con aletas y cola claramente visibles, sonrisa; pera verde reconocible con tallo marrón y hoja. Estilo infantil 3D suave de juguete, iluminación suave, centrado y sin texto. Pp roja redondeada brillante con contadores abiertos; variante verde conservando formas y disposición. P azul con guía blanca punteada y lápiz amarillo; globo rojo con P blanca y cinta dorada. Referencias del mismo estilo de la app.

Audios incorporados: pelota.wav, pato.wav, pez.wav, pera.wav y leter-p-fonetic.wav, optimizados a MP3 mono 24 kHz / 96 kbps y disponibles sin conexión.

## Letra Q — v59

Palabras: Queso, Quena, Mosquito y Raqueta. Consignas de reconocimiento por letra contenida, como en Ñ: Palabras con Q / ¿Cuál tiene Q? Cinco actividades y tres juegos adicionales; trazado Q en dos recorridos (óvalo completo y cola diagonal). Audios incorporados para los cinco elementos.

Recursos guardados en assets/queso.webp, assets/quena.webp, assets/mosquito.webp, assets/raqueta.webp, assets/letra-q-roja.webp, assets/letra-q-verde.webp, assets/actividad-trazar-q.webp y assets/actividad-atrapar-q.webp.

Generados con la herramienta integrada de imágenes, fondo transparente. Prompts: cuña de queso amarillo con agujeros y sonrisa; quena de madera con seis orificios y muesca U superior; mosquito amigable de cuerpo entero con seis patas, dos alas y probóscide; raqueta azul/naranja con cuerdas blancas. Estilo infantil 3D suave, iluminación suave, centrado sin texto. Par Qq rojo de juguete brillante redondeado con contadores abiertos y cola correcta, variante verde con mismas formas. Q azul con guía blanca punteada y lápiz amarillo; globo rojo con Q blanca y cinta dorada, tomando referencias del estilo de la app.

Audios incorporados: queso.wav, quena.wav, mosquito.wav, raqueta.wav y leter-q-fonetic.wav, optimizados a MP3 mono 24 kHz / 96 kbps y disponibles sin conexión.

## Letra R — v60

Palabras: Rana, Ratón, Reloj y Rosa. Consignas Empieza con R. Cinco actividades y tres juegos adicionales; trazado R en tres recorridos (palo, curva superior y diagonal). Audios incorporados para los cinco elementos.

Recursos guardados en assets/rana.webp, assets/raton.webp, assets/reloj.webp, assets/rosa.webp, assets/letra-r-roja.webp, assets/letra-r-verde.webp, assets/actividad-trazar-r.webp y assets/actividad-atrapar-r.webp.

Generados con la herramienta integrada de imágenes, fondo transparente. Prompts: rana verde amigable sentada de cuerpo entero con cuatro extremidades; ratón gris de cuerpo entero con orejas y cola rosadas; reloj despertador azul redondo con esfera crema, marcas simples y dos agujas; rosa roja de pétalos en espiral, tallo verde y dos hojas. Estilo infantil 3D suave de juguete, luz suave, centrado sin texto. Rr roja brillante redondeada con contador abierto y diagonal correcta, variante verde conservando formas y disposición. R azul con guía blanca punteada y lápiz amarillo; globo rojo con R blanca y cinta dorada, usando referencias del estilo de la app.

Audios incorporados: rana.wav, raton.wav, reloj.wav, rosa.wav y leter-r-fonetic.wav, optimizados a MP3 mono 24 kHz / 96 kbps y disponibles sin conexión.

## Letra S — v61

Palabras: Sol, Sapo, Sandía y Sombrero. Consignas Empieza con S. Cinco actividades y tres juegos adicionales; trazado S en un recorrido continuo de arriba hacia abajo. Se reutiliza assets/sol.webp. Audios incorporados para los cinco elementos.

Recursos nuevos en assets/sapo.webp, assets/sandia.webp, assets/sombrero.webp, assets/letra-s-roja.webp, assets/letra-s-verde.webp, assets/actividad-trazar-s.webp y assets/actividad-atrapar-s.webp.

Generados con la herramienta integrada de imágenes, fondo transparente. Prompts: sapo amigable marrón oliva de cuerpo robusto y piel con pequeños bultos, distinto de la rana verde; porción triangular de sandía roja con semillas negras y cáscara verde; sombrero amarillo de ala ancha y cinta azul. Estilo infantil 3D suave de juguete, luz suave, centrado sin texto. Ss roja brillante con curvas y puntas redondeadas, variante verde conservando formas y disposición. S azul con guía blanca punteada y lápiz amarillo; globo rojo con S blanca y cinta dorada, usando referencias de la app.

Audios incorporados: sol.wav, sapo.wav, sandia.wav, sombrero.wav y leter-s-fonetic.wav, optimizados a MP3 mono 24 kHz / 96 kbps y disponibles sin conexión.

## Letra T — v62

Palabras: Tortuga, Tren, Tomate y Tigre. Consignas Empieza con T. Cinco actividades y tres juegos adicionales; trazado T en dos recorridos (palo vertical y barra superior). Incluye las cinco grabaciones argentinas del usuario, disponibles sin conexión después de la descarga inicial.

Recursos nuevos en assets/tortuga.webp, assets/tren.webp, assets/tomate.webp, assets/tigre.webp, assets/letra-t-roja.webp, assets/letra-t-verde.webp, assets/actividad-trazar-t.webp y assets/actividad-atrapar-t.webp.

Generados con la herramienta integrada de imágenes, fondo transparente. Prompts: tortuga terrestre verde amigable de cuerpo entero con caparazón abovedado marrón-verde; locomotora roja/azul con vagón amarillo y ruedas visibles; tomate rojo redondo con cáliz verde estrellado y sonrisa; tigre cachorro naranja de cuerpo entero, rayas negras, pecho blanco y cola curva. Estilo infantil 3D suave de juguete, luz suave, centrado sin texto. Tt roja brillante con barra superior y palo centrado, minúscula con barra corta y base curva, variante verde conservando formas y disposición. T azul con guía blanca punteada y lápiz amarillo; globo rojo con T blanca y cinta dorada, usando referencias de la app.

Audios incorporados: tortuga.wav, tren.wav, tomate.wav, tigre.wav y leter-t-fonetic.wav (letra-t.mp3).

## Letra U — v63

Uva, Unicornio, Uno y Uña. Cinco actividades y tres juegos adicionales, progreso independiente y navegación T/U. Trazado de un recorrido continuo: baja por la izquierda, curva inferior y sube por la derecha. Uu roja/verde e íconos propios en tarjetas y actividades. Recursos incluidos sin conexión. Incluye los cuatro audios y la fonética de U suministrados por el usuario, disponibles sin conexión. unna.wav corresponde a Uña y se guarda como unia.mp3; leter-u-fonetic.wav se guarda como letra-u.mp3.

Recursos: assets/uva.webp, assets/unicornio.webp, assets/uno.webp, assets/unia.webp, assets/letra-u-roja.webp, assets/letra-u-verde.webp, assets/actividad-trazar-u.webp, assets/actividad-atrapar-u.webp.

Herramienta integrada de imágenes, fondo transparente. Prompts: racimo de uvas moradas sonriente con hoja verde; unicornio blanco bebé con crin arcoíris y cuerno dorado; numeral 1 amarillo sonriente para Uno; dedo redondeado con uña natural rosa claramente visible, sin esmalte ni herramientas. Estilo 3D infantil de juguete, luz suave, centrado. Uu infladas rojas con extremos redondeados, variante verde preservando composición; U azul con guía blanca punteada y lápiz amarillo; globo rojo con U blanca y cinta dorada. Referencias visuales de los recursos T de la app.

## Letra V — v64

Vaca, Vaso, Vela y Violín. Cinco actividades y tres juegos adicionales, progreso independiente y navegación U/V. Trazado en dos diagonales: baja desde arriba a la izquierda hasta el vértice y sube a la derecha. Vv roja/verde e íconos propios en tarjetas y actividades. Recursos incluidos sin conexión. Incluye las cinco grabaciones del usuario optimizadas a MP3 mono 24 kHz / 96 kbps y disponibles sin conexión después de la descarga inicial. leter-v-fonetic.wav corresponde a letra-v.mp3.

Recursos: assets/vaca.webp, assets/vaso.webp, assets/vela.webp, assets/violin.webp, assets/letra-v-roja.webp, assets/letra-v-verde.webp, assets/actividad-trazar-v.webp, assets/actividad-atrapar-v.webp.

Generados con la herramienta integrada de imágenes, fondo transparente. Prompts: vaca blanca y negra sonriente de cuerpo entero con hocico rosa; vaso transparente azulado con agua, sin asa y cara sonriente; vela amarilla con llama naranja y portavela azul; violín marrón-anaranjado con cuatro cuerdas y arco. Estilo 3D infantil de juguete, iluminación suave, objeto completo centrado. Vv infladas rojas con dos diagonales y vértice inferior, variante verde preservando formas y composición; V azul con guía blanca punteada y lápiz amarillo; globo rojo con V blanca y cinta dorada. Referencias de estilo: recursos U de la app.

## Letra W — v65

Waffle, Wok, Kiwi y Sándwich. Consignas «Palabras con W» y «¿Cuál tiene W?» porque W puede aparecer dentro de la palabra. Cinco actividades y tres juegos adicionales, progreso independiente y navegación V/W. Trazado de cuatro diagonales con extremos completos. Ww roja/verde e íconos propios en tarjetas y actividades. Recursos incluidos sin conexión. Se reutiliza la imagen de Kiwi de K, sin duplicarla. Incluye los cinco audios suministrados por el usuario, disponibles sin conexión después de descargar el contenido. kiwii.wav actualiza kiwi.mp3, compartido con K; leter-w-fonetic.wav se guarda como letra-w.mp3.

Recursos: assets/waffle.webp, assets/wok.webp, assets/sandwich.webp, assets/letra-w-roja.webp, assets/letra-w-verde.webp, assets/actividad-trazar-w.webp, assets/actividad-atrapar-w.webp, assets/kiwi.webp (existente).

Herramienta integrada de imágenes, fondo transparente. Prompts: waffle cuadrado dorado con rejilla, manteca y sonrisa; wok negro profundo con mango de madera, verduras y cara sonriente; sándwich triangular con pan, lechuga, tomate y queso. Estilo infantil 3D de juguete, luz suave, objeto completo centrado. Ww roja inflada de cuatro diagonales y dos vértices inferiores, variante verde preservando formas; W azul con guía blanca punteada y lápiz amarillo; globo rojo con W blanca y cinta dorada. Referencias visuales: recursos V de la app.

## Letra X — v66

Xilófono, Taxi, Excavadora y Saxofón. Consignas «Palabras con X» y «¿Cuál tiene X?» porque puede aparecer al principio o dentro de la palabra. Cinco actividades y tres juegos adicionales, progreso independiente y navegación W/X. Trazado de dos diagonales cruzadas, de arriba hacia abajo. Xx roja/verde e íconos propios en tarjetas y actividades. Recursos incluidos sin conexión. Incluye las cinco grabaciones del usuario, optimizadas a MP3 mono 24 kHz / 96 kbps y disponibles sin conexión después de descargar el contenido. leter-x-fonetic.wav se guarda como letra-x.mp3.

Recursos: assets/xilofono.webp, assets/taxi.webp, assets/excavadora.webp, assets/saxofon.webp, assets/letra-x-roja.webp, assets/letra-x-verde.webp, assets/actividad-trazar-x.webp, assets/actividad-atrapar-x.webp.

Herramienta integrada de imágenes, fondo transparente. Prompts: xilófono de juguete con barras arcoíris y dos baquetas; taxi amarillo sonriente con cartel y franja de cuadros; excavadora amarilla simpática con orugas, brazo articulado y pala visibles; saxofón dorado con llaves, boquilla negra y campana. Estilo infantil 3D de juguete, luz suave, objeto completo centrado. Xx rojas infladas, dos diagonales cruzadas con extremos redondeados, variante verde preservando composición; X azul con guía blanca punteada y lápiz amarillo; globo rojo con X blanca y cinta dorada. Referencias visuales de los recursos W de la app.

## Letra Y — v67

Yacaré, Yate, Yoyó y Yogur. Cinco actividades y tres juegos adicionales, progreso independiente y navegación X/Y. Trazado en tres pasos: tallo vertical, diagonal izquierda y diagonal derecha. Yy roja/verde e íconos propios en tarjetas y actividades. Incluye los cuatro audios y la fonética de Y suministrados por el usuario, disponibles sin conexión después de la descarga inicial.

Recursos: assets/yacare.webp, assets/yate.webp, assets/yoyo.webp, assets/yogur.webp, assets/letra-y-roja.webp, assets/letra-y-verde.webp, assets/actividad-trazar-y.webp, assets/actividad-atrapar-y.webp.

Herramienta integrada de imágenes, fondo transparente. Prompts: yacaré verde amigable de cuerpo entero; yate blanco y azul con cabina y cara sonriente; yoyó rojo y azul con cuerda; yogur rosado con tapa abierta y cuchara. Estilo infantil 3D de juguete, luz suave, objeto completo centrado. Yy rojas infladas con brazos diagonales y tallo/cola, variante verde preservando composición; Y azul con guía blanca punteada y lápiz amarillo; globo rojo con Y blanca y cinta dorada. Referencias visuales de los recursos X de la app.



















