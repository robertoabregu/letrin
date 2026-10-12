import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { GoogleAuth } from 'google-auth-library';
import { verifyAndGrant } from './verifier.mjs';

if (!process.env.LETRIN_SIGNING_KEY_FILE) throw Error('LETRIN_SIGNING_KEY_FILE is required');
const privateKey = await readFile(process.env.LETRIN_SIGNING_KEY_FILE, 'utf8');
const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/androidpublisher'] });
const client = await auth.getClient();

createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json');
  const origin = request.headers.origin;
  if (origin && origin !== 'https://localhost') { response.writeHead(403); response.end('{}'); return; }
  if (origin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  if (request.method === 'OPTIONS' && request.url === '/verify') {
    response.setHeader('Access-Control-Allow-Methods', 'POST');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.writeHead(204);
    response.end();
    return;
  }
  if (request.method !== 'POST' || request.url !== '/verify') { response.writeHead(404); response.end('{}'); return; }
  try {
    let body = '';
    let size = 0;
    for await (const chunk of request) {
      size += chunk.length;
      if (size > 8192) throw Object.assign(Error('too large'), { status: 413 });
      body += chunk;
    }
    let input;
    try { input = JSON.parse(body); } catch { throw Object.assign(Error('invalid json'), { status: 400 }); }
    const grant = await verifyAndGrant(input.token, { request: options => client.request({ ...options, timeout: 10000 }), privateKey });
    response.end(JSON.stringify(grant));
  } catch (error) {
    response.writeHead(error.status || 503);
    response.end(JSON.stringify({ error: 'verification_failed' }));
  }
}).listen(Number(process.env.PORT || 8080));

