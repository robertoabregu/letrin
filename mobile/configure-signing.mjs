import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const gradlePath = fileURLToPath(new URL('./android/app/build.gradle', import.meta.url));
let gradle = await readFile(gradlePath, 'utf8');
const buildTypes = /([ \t]*)buildTypes\s*\{\s*release\s*\{/;
const match = gradle.match(buildTypes);
if (!match) throw Error('Android Gradle release template changed');
const indent = match[1];
gradle = gradle.replace(buildTypes, `${indent}signingConfigs {
${indent}    release {
${indent}        storeFile file('letrin-upload.p12')
${indent}        storePassword System.getenv('LETRIN_UPLOAD_PASSWORD')
${indent}        keyAlias System.getenv('LETRIN_UPLOAD_ALIAS')
${indent}        keyPassword System.getenv('LETRIN_UPLOAD_PASSWORD')
${indent}        storeType 'pkcs12'
${indent}    }
${indent}}
${indent}buildTypes {
${indent}    release {
${indent}        signingConfig signingConfigs.release`);
await writeFile(gradlePath, gradle);
console.log('Android release signing configured.');
