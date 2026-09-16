import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const body = req.body ?? {};
  const entry = {
    ts: new Date().toISOString(),
    action: body.action,       // 'single' | 'bulk'
    tower: body.tower,         // ExpeditionTower.id, e.g. 'tower-2'
    mob: body.mob,             // mob name
    star: body.star,           // 1-12
    variant: body.variant,     // 'min' | 'max'
    players: body.players,     // saved-character names used in the fight
    runs: body.runs,           // bulk only
  };
  res.status(204).end();
}
