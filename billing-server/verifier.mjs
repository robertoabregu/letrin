import { createHash, createPrivateKey, sign } from 'node:crypto';

export const PRODUCT = 'letrin_games_lifetime';
export const PACKAGE = 'app.letrin.learning';

export async function verifyAndGrant(token, { request, privateKey }) {
  if (typeof token !== 'string' || token.length < 10 || token.length > 4096) throw Object.assign(Error('invalid token'), { status: 400 });
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE}/purchases/products/${PRODUCT}/tokens/${encodeURIComponent(token)}`;
  const { data: purchase } = await request({ url });
  if (purchase.purchaseState !== 0 || purchase.consumptionState !== 0) throw Object.assign(Error('not purchased'), { status: purchase.purchaseState === 1 ? 410 : 409 });
  if (purchase.acknowledgementState !== 1) await request({ url: `${url}:acknowledge`, method: 'POST', data: {} });
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const payload = {
    owned: true,
    productId: PRODUCT,
    packageName: PACKAGE,
    tokenHash,
    transactionId: purchase.orderId || tokenHash,
    verifiedAt: Date.now()
  };
  return { payload, signature: sign('RSA-SHA256', Buffer.from(JSON.stringify(payload)), createPrivateKey(privateKey)).toString('base64url') };
}

