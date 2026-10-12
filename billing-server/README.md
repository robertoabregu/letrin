# Verificador de compras de Letrín

Proyecto de Google Cloud: `letrin-learning-2026`. Paquete Android: `app.letrin.learning`. Producto único no consumible: `letrin_games_lifetime`.

Este servicio recibe un token de compra en `POST /verify`, consulta Google Play Developer API, confirma la compra y devuelve un comprobante firmado. No almacena el token ni requiere una cuenta infantil. La clave privada debe permanecer exclusivamente en Secret Manager; el cliente Android solo incluye la clave pública.

Para activarlo:

1. Vincular una cuenta de facturación al proyecto Cloud y crear un presupuesto/alertas.
2. Habilitar Android Publisher API, Cloud Run, Cloud Build y Secret Manager.
3. Crear una identidad de servicio exclusiva para Letrín y concederle en Play Console solo los permisos necesarios para consultar y confirmar compras de Letrín.
4. Generar un par RSA nuevo para Letrín. Montar el PEM privado como archivo en Cloud Run y definir `LETRIN_SIGNING_KEY_FILE` con esa ruta. No subir el PEM al repositorio.
5. Desplegar el servicio por HTTPS y añadir controles de tasa y tamaño de solicitud. No registrar tokens de compra.
6. Configurar la URL `/verify` y el JWK público en `../letrin-mobile/billing-config.mjs`; habilitar la facturación solo en la versión de prueba interna.
7. Probar compra, compra pendiente, cancelación, restauración, reinstalación, falta de conexión y reembolso con una cuenta de pruebas de licencia. No publicar en producción antes de completar estas pruebas.

`node --test verifier.test.mjs` ejecuta las pruebas unitarias sin credenciales ni llamadas reales a Google Play.

