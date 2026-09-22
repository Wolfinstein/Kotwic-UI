import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

/** Set on the Vercel project by the Neon integration ("NEON_DB" resource). */
const CONNECTION_STRING = process.env.NEON_DB_DATABASE_URL;

/** Gates reading back saved runs (Dziennik page) — writes stay open since every player's simulation logs one automatically. Not meant as real security, just a casual keep-strangers-out gate. Set on the Vercel project as an env var so it isn't sitting in the repo in plaintext. */
const DZIENNIK_PASSWORD = process.env.DZIENNIK_PASSWORD;

interface ExpeditionLogBody {
  action: 'single' | 'bulk';
  tower: string;
  mob: string;
  star: number;
  variant: string;
  players: string[];
  /** Share-code-encoded characters that took part in the run (see character-share.util.ts on the client) — lets the exact builds be re-imported later. */
  charactersCode: string;
  runs?: number;
  winPct?: number;
  lossPct?: number;
  drawPct?: number;
}

function isValidBody(body: unknown): body is ExpeditionLogBody {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (b['action'] === 'single' || b['action'] === 'bulk')
    && typeof b['tower'] === 'string'
    && typeof b['mob'] === 'string'
    && typeof b['star'] === 'number'
    && typeof b['variant'] === 'string'
    && Array.isArray(b['players']) && b['players'].every(p => typeof p === 'string')
    && typeof b['charactersCode'] === 'string';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!CONNECTION_STRING) {
    res.status(500).json({ error: 'NEON_DB_DATABASE_URL is not configured.' });
    return;
  }
  const sql = neon(CONNECTION_STRING);

  await sql`
    CREATE TABLE IF NOT EXISTS expedition_logs (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      action TEXT NOT NULL,
      tower TEXT NOT NULL,
      mob TEXT NOT NULL,
      star INTEGER NOT NULL,
      variant TEXT NOT NULL,
      players TEXT[] NOT NULL,
      characters_code TEXT NOT NULL,
      runs INTEGER,
      win_pct INTEGER,
      loss_pct INTEGER,
      draw_pct INTEGER
    )
  `;

  if (req.method === 'POST') {
    const body = req.body;
    if (!isValidBody(body)) {
      res.status(400).json({ error: 'Invalid expedition log payload.' });
      return;
    }
    await sql`
      INSERT INTO expedition_logs
        (action, tower, mob, star, variant, players, characters_code, runs, win_pct, loss_pct, draw_pct)
      VALUES
        (${body.action}, ${body.tower}, ${body.mob}, ${body.star}, ${body.variant}, ${body.players},
         ${body.charactersCode}, ${body.runs ?? null}, ${body.winPct ?? null}, ${body.lossPct ?? null}, ${body.drawPct ?? null})
    `;
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    if (!DZIENNIK_PASSWORD || req.headers['x-dziennik-key'] !== DZIENNIK_PASSWORD) {
      res.status(401).json({ error: 'Nieprawidłowe hasło.' });
      return;
    }
    const rows = await sql`
      SELECT
        id, created_at AS "createdAt", action, tower, mob, star, variant, players,
        characters_code AS "charactersCode", runs, win_pct AS "winPct", loss_pct AS "lossPct", draw_pct AS "drawPct"
      FROM expedition_logs
      ORDER BY created_at DESC
      LIMIT 200
    `;
    res.status(200).json(rows);
    return;
  }

  res.status(405).json({ error: 'Method not allowed.' });
}
