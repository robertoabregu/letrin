# Letrín para Android

Identificador de Play Store: `app.letrin.learning`.
Ficha creada en Google Play Console en la cuenta personal del propietario. Proyecto de Google Cloud separado: `letrin-learning-2026`.

La copia Android se genera desde `../letrin` con `npm run build`. La app web publicada no se modifica al generar esta copia.

Preparación local (Node.js, Android Studio y SDK instalados):

1. `npm install`
2. `npm run build`
3. `npx cap add android`
4. `npm run configure:android`
5. `npm run sync`

El proyecto **todavía no está listo para subir a Play Store**. El producto único `letrin_games_lifetime` no se puede crear hasta que Play reciba un AAB con permiso de facturación. La integración nativa y el verificador están preparados pero deshabilitados hasta que el servidor esté desplegado, se configure su URL y clave pública, y se prueben compra, restauración y reembolso en pruebas internas. No se reutiliza el producto, la clave privada ni el verificador de Colorín. El precio se configura en Play Console; la interfaz muestra el precio localizado que devuelve Google Play.

El flujo remoto de compilación está en `.github/workflows/android-smoke.yml` del repositorio de Letrín. Genera un APK de diagnóstico, no un AAB firmado apto para subir a Play.
