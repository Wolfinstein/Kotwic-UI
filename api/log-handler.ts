import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.data;
  const dataStr = Array.isArray(raw) ? raw[0] : raw;

  let entry: Record<string, unknown>;
  try {
    entry = dataStr ? JSON.parse(dataStr) : {};
  } catch {
    entry = { raw: dataStr };
  }
  entry['ts'] = new Date().toISOString();
  res.status(204).end();
}
