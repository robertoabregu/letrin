export async function validateGrant(grant, config, token) {
  if (!grant?.payload || !grant.signature || !config.verificationPublicKey) throw Error('grant');
  const decode = value => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), character => character.charCodeAt(0));
  const key = await crypto.subtle.importKey('jwk', config.verificationPublicKey, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, decode(grant.signature), new TextEncoder().encode(JSON.stringify(grant.payload)));
  const payload = grant.payload;
  if (!valid || payload.productId !== config.productId || payload.packageName !== config.packageName || payload.owned !== true || !payload.transactionId) throw Error('signature');
  if (token) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    const hash = Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
    if (hash !== payload.tokenHash) throw Error('token');
  }
  return grant;
}

export async function verifyPurchase(token, config, request = fetch) {
  const response = await request(config.verificationUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }), signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    const error = Error('verification');
    if (response.status === 410) error.code = 'REVOKED';
    throw error;
  }
  return validateGrant(await response.json(), config, token);
}
