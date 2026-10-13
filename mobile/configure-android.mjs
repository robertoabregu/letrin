import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./', import.meta.url));
const app = `${root}android/app/`;
const java = `${app}src/main/java/app/letrin/learning/`;
const gradlePath = `${app}build.gradle`;
const manifestPath = `${app}src/main/AndroidManifest.xml`;

await copyFile(`${root}android-source/MainActivity.java`, `${java}MainActivity.java`);
await copyFile(`${root}android-source/LetrinBillingPlugin.java`, `${java}LetrinBillingPlugin.java`);

let gradle = await readFile(gradlePath, 'utf8');
if (!/versionCode 1\b/.test(gradle)) throw Error('Android version template changed');
gradle = gradle.replace(/versionCode 1\b/, 'versionCode 3');
if (!gradle.includes('com.android.billingclient:billing:9.1.0')) {
  if (!gradle.includes('dependencies {')) throw Error('Android Gradle template changed');
  gradle = gradle.replace('dependencies {', 'dependencies {\n    implementation "com.android.billingclient:billing:9.1.0"');
  await writeFile(gradlePath, gradle);
}

let manifest = await readFile(manifestPath, 'utf8');
if (!manifest.includes('com.android.vending.BILLING')) {
  if (!manifest.includes('<application')) throw Error('Android manifest template changed');
  manifest = manifest.replace('<application', '<uses-permission android:name="com.android.vending.BILLING" />\n\n    <application');
  await writeFile(manifestPath, manifest);
}
console.log('Google Play Billing registered in Android project.');
