#!/usr/bin/env node
/**
 * Converts the raw expedition report dump (pretty-printed, ~67 MB) into a compact dataset the
 * "Raporty z ekspedycji" page can load. Writes two files to public/data/ (git-ignored):
 *   - expedition-reports.json     — used by `npm start` when EXPEDITION_REPORTS_URL isn't set
 *   - expedition-reports.json.gz  — upload THIS one to Vercel Blob, then set its public URL as the
 *                                   EXPEDITION_REPORTS_URL env var on the Vercel project and redeploy.
 *
 * Usage: node scripts/build-expedition-reports.js <path-to-report.json>
 *
 * Compact format (v1) — every repeated string lives once in `s` and is referenced by index,
 * and every report/player/enemy is a positional array instead of an object with keys:
 *   report: [date, event, mid, key, location, boss, stars, difficulty, won(0|1), players[], enemies[]]
 *   player: [name, level, hpMax, initiative, talismans[], evolutions[], arcanes[], huntBonuses[],
 *            silverBonuses[], goldBonuses[], race, weapons[], experience|null, ...STATS]
 *   enemy:  [name, hpMax, initiative, ...STATS]
 *   STATS:  strength, agility, resistance, looks, charisma, influence, perception, intelligence, wisdom, luck, defence
 * Strings (date, event, location, boss, difficulty, names, bonuses...) are indexes into `s`.
 * The field order here must match src/app/data/expedition-reports.ts.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/build-expedition-reports.js <path-to-report.json>');
  process.exit(1);
}

const STATS = ['strength', 'agility', 'resistance', 'looks', 'charisma', 'influence', 'perception', 'intelligence', 'wisdom', 'luck', 'defence'];
const URL_RE = /^https:\/\/r20\.bloodwars\.pl\/showmsg\.php\?mid=(\d+)&key=([0-9a-f]+)$/;

const strings = [];
const stringIndex = new Map();
const str = (value) => {
  const v = String(value ?? '');
  let i = stringIndex.get(v);
  if (i === undefined) {
    i = strings.length;
    strings.push(v);
    stringIndex.set(v, i);
  }
  return i;
};
// Evolution/arcane entries come split from one comma-joined string, so they carry stray
// leading spaces and a trailing '.' on the last element.
const clean = (s) => String(s).trim().replace(/\.$/, '');
const list = (arr) => (arr ?? []).map(x => str(clean(x)));

const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
const reports = raw.map(r => {
  const m = URL_RE.exec(r.url ?? '');
  return [
    str(r.date),
    str(r.eventName),
    m ? Number(m[1]) : 0,
    m ? str(m[2]) : str(''),
    str(r.expedition.location),
    str(r.expedition.bossName),
    r.expedition.stars,
    str(r.expedition.difficulty),
    r.expedition.result === 'W' ? 1 : 0,
    r.players.map(p => [
      str(p.name), p.level, p.hpMax, p.initiative,
      list(p.talismans), list(p.evolutions), list(p.arcanes), list(p.huntBonuses),
      list(p.silverBonuses), list(p.goldBonuses), str(p.race), list(p.weapons),
      p.experience ?? null,
      ...STATS.map(k => p[k]),
    ]),
    r.enemies.map(e => [str(e.name), e.hpMax, e.initiative, ...STATS.map(k => e[k])]),
  ];
});
// Newest first — the page shows the latest reports on top by default.
reports.sort((a, b) => strings[b[0]].localeCompare(strings[a[0]]));

const out = path.join(__dirname, '..', 'public', 'data', 'expedition-reports.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
const json = JSON.stringify({ v: 1, s: strings, r: reports });
fs.writeFileSync(out, json);
const gz = zlib.gzipSync(json, { level: 9 });
fs.writeFileSync(out + '.gz', gz);
const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
console.log(`Wrote ${reports.length} reports, ${strings.length} unique strings`);
console.log(`  ${out} (${mb(Buffer.byteLength(json))})`);
console.log(`  ${out}.gz (${mb(gz.length)}) <- upload this one to Vercel Blob`);
