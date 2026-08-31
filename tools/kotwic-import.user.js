// ==UserScript==
// @name         KotwicUI Export
// @namespace    kotwicui
// @version      1.6.1
// @description  Fetches the game pages KotwicUI's Kalkulator Postaci needs, trims each one down to just the HTML the parser actually reads, copies the result to your clipboard when small enough, and shows a result popup with a manual JSON download button.
// @author       KotwicUI
// @match        https://r20.bloodwars.pl/*
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // Keep this in sync with the @version header above.
  const SCRIPT_VERSION = '1.6.1';
  const LAST_SEEN_VERSION_KEY = 'kotwicuiImportScriptLastSeenVersion';
  // One entry per version that should notify the user on their first run after updating.
  const CHANGELOG = {
    '1.6.0': 'Dodana obsługa importu ewolucji. Importuje na maksymalnym dostępnym poziomie.',
    '1.6.1': 'Naprawiono import areny (silver) — premia Assasyn nie była wycinana ze strony i przez to nigdy nie trafiała do eksportu.',
  };

  function showUpdateNotice(version, message) {
    const overlay = document.createElement('div');
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:100001',
      'background:rgba(0,0,0,0.6)', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:20px',
    ].join(';');

    const box = document.createElement('div');
    box.style.cssText = [
      'background:#1c2b45', 'color:#fff', 'border:1px solid #4fc3f7',
      'border-radius:8px', 'padding:20px', 'max-width:420px',
      'box-shadow:0 4px 20px rgba(0,0,0,0.6)', 'font-size:13px',
    ].join(';');

    const title = document.createElement('div');
    title.textContent = `KotwicUI Export zaktualizowany do wersji ${version}`;
    title.style.cssText = 'font-weight:bold;margin-bottom:10px;';
    box.appendChild(title);

    const text = document.createElement('div');
    text.textContent = message;
    text.style.cssText = 'white-space:pre-wrap;margin-bottom:16px;line-height:1.4;';
    box.appendChild(text);

    const buttonRow = document.createElement('div');
    buttonRow.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'OK';
    closeBtn.style.cssText = [
      'background:#4fc3f7', 'color:#1c2b45', 'border:none',
      'border-radius:6px', 'padding:8px 14px', 'font-size:13px',
      'cursor:pointer', 'font-weight:bold',
    ].join(';');
    closeBtn.addEventListener('click', () => overlay.remove());

    buttonRow.appendChild(closeBtn);
    box.appendChild(buttonRow);
    overlay.appendChild(box);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  function maybeShowChangelog() {
    let lastSeen = null;
    try { lastSeen = localStorage.getItem(LAST_SEEN_VERSION_KEY); } catch (e) { /* ignore */ }
    if (lastSeen !== SCRIPT_VERSION) {
      const message = CHANGELOG[SCRIPT_VERSION];
      if (message) showUpdateNotice(SCRIPT_VERSION, message);
      try { localStorage.setItem(LAST_SEEN_VERSION_KEY, SCRIPT_VERSION); } catch (e) { /* ignore */ }
    }
  }

  const PAGES = {
    trening: '?a=training',
    main: '?a=main',
    equip: '?a=equip',
    enchant: '?a=enchant',
    talizman: '?a=talizman',
    evo: '?a=training&do=evo',
    build: '?a=build',
    arenaSilver: '?a=newarena&cat=4&t=silver',
    arenaGold: '?a=newarena&cat=4&t=gold',
    clanbld: '?a=clanbld',
    huntClanBonus: '?a=hunt&do=clanBonus',
  };

  function makeButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Eksportuj dane do KotwicUI';
    btn.style.cssText = [
      'position:fixed', 'right:10px', 'bottom:60px', 'z-index:99999',
      'background:#1c2b45', 'color:#fff', 'border:1px solid #4fc3f7',
      'border-radius:6px', 'padding:10px 14px', 'font-size:13px',
      'cursor:pointer', 'box-shadow:0 2px 8px rgba(0,0,0,0.5)',
    ].join(';');
    document.body.appendChild(btn);
    return btn;
  }

  function showResultModal(message, json) {
    const overlay = document.createElement('div');
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:100000',
      'background:rgba(0,0,0,0.6)', 'display:flex',
      'align-items:center', 'justify-content:center', 'padding:20px',
    ].join(';');

    const box = document.createElement('div');
    box.style.cssText = [
      'background:#1c2b45', 'color:#fff', 'border:1px solid #4fc3f7',
      'border-radius:8px', 'padding:20px', 'max-width:420px',
      'box-shadow:0 4px 20px rgba(0,0,0,0.6)', 'font-size:13px',
    ].join(';');

    const text = document.createElement('div');
    text.textContent = message;
    text.style.cssText = 'white-space:pre-wrap;margin-bottom:16px;line-height:1.4;';
    box.appendChild(text);

    const buttonRow = document.createElement('div');
    buttonRow.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;';

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Pobierz jako JSON';
    downloadBtn.style.cssText = [
      'background:#4fc3f7', 'color:#1c2b45', 'border:none',
      'border-radius:6px', 'padding:8px 14px', 'font-size:13px',
      'cursor:pointer', 'font-weight:bold',
    ].join(';');
    downloadBtn.addEventListener('click', () => downloadJson(json));

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Zamknij';
    closeBtn.style.cssText = [
      'background:transparent', 'color:#fff', 'border:1px solid #4fc3f7',
      'border-radius:6px', 'padding:8px 14px', 'font-size:13px', 'cursor:pointer',
    ].join(';');
    closeBtn.addEventListener('click', () => overlay.remove());

    buttonRow.appendChild(downloadBtn);
    buttonRow.appendChild(closeBtn);
    box.appendChild(buttonRow);
    overlay.appendChild(box);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  function downloadJson(json) {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `kotwicui-export-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const DELAY_BETWEEN_REQUESTS_MS = 2000;
  const MAX_CLIPBOARD_CHARS = 200000; // mobile clipboards / window.prompt choke on huge blobs

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchPage(path) {
    const url = new URL(path, location.origin).toString();
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) {
        return { url, error: `HTTP ${res.status}` };
      }
      const html = await res.text();
      return { url, html };
    } catch (e) {
      return { url, error: String(e && e.message ? e.message : e) };
    }
  }

  // Mirrors parseArenaBonuses in game-import.service.ts: finds the "<td colspan=6>Name</td>"
  // header for each wanted bonus, then keeps just its header + "Aktywny poziom" row.
  function extractArenaBonuses(html, names) {
    const headers = [...html.matchAll(/<td colspan="6"[^>]*>([^<]+)<\/td>/g)];
    const results = [];
    for (const name of names) {
      const idx = headers.findIndex(h => h[1].trim().toLowerCase() === name.toLowerCase());
      if (idx === -1) continue;
      const start = headers[idx].index;
      const end = idx + 1 < headers.length ? headers[idx + 1].index : html.length;
      const block = html.slice(start, end);
      const headerMatch = block.match(/<td colspan="6"[^>]*>[^<]+<\/td>/);
      const rowMatch = block.match(/Aktywny poziom<\/td>[\s\S]*?<\/tr>/i);
      if (headerMatch && rowMatch) results.push(headerMatch[0] + '\n' + rowMatch[0]);
    }
    return results.length ? results : null;
  }

  // Each entry mirrors the exact snippet KotwicUI's parser for that page actually reads
  // (see game-import.service.ts), so we only ship the few hundred bytes that matter instead
  // of the whole rendered page. If a pattern doesn't match (site markup changed), we fall
  // back to the full page so the import still works — just bigger.
  const EXTRACTORS = {
    trening: html => html.match(/var\s+baseStats\s*=\s*\{[\s\S]*?\};/),
    main: html => {
      const parts = [];
      const patterns = [
        /id="main-playerLvl">[\s\S]{0,200}/,
        /CAPTION,\s*'POZIOM[\s\S]{0,50}/,
        /<td>RASA<\/td>[\s\S]{0,200}/i,
        /class="server-event">[\s\S]{0,900}/,
      ];
      for (const re of patterns) {
        const m = html.match(re);
        if (m) parts.push(m[0]);
      }
      return parts.length ? [parts.join('\n')] : null;
    },
    equip: html => {
      const start = html.indexOf('EKWIPUNEK');
      if (start === -1) return null;
      const end = html.indexOf('</fieldset>', start);
      const slice = end !== -1 ? html.slice(start, end + '</fieldset>'.length) : html.slice(start);
      return [slice];
    },
    enchant: html => html.match(/<div class="enchantDetailsFrame equipped">[\s\S]*?<\/ul>/g),
    talizman: html => {
      const tal = html.match(/<img[^>]*class="talIconImg"[\s\S]*?alt="[^"]+? poz\. \d+"[^>]*>/g) || [];
      const runes = html.match(/<img src="gfx\/talizman\/srune_\d+\.png"[\s\S]*?CAPTION[\s\S]{0,20}/g) || [];
      const combined = [...tal, ...runes];
      return combined.length ? combined : null;
    },
    evo: html => html.match(/<div class="training-evo-title">[^<]*<\/div>/g),
    build: html => html.match(/<span class="bldheader">[\s\S]*?POZIOM&nbsp;<b>\d+<\/b>/g),
    arenaSilver: html => extractArenaBonuses(html, ['Ninja', 'Myśliwy', 'Assasyn']),
    arenaGold: html => extractArenaBonuses(html, ['Strateg']),
    clanbld: html => html.match(/KAPLICA poziom \d+/),
    huntClanBonus: html => html.match(/<div class="singleBonusContainer">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g),
  };

  function trimHtml(key, html) {
    try {
      const extractor = EXTRACTORS[key];
      if (!extractor) return html;
      const matches = extractor(html);
      if (!matches || !matches.length) return html;
      return Array.isArray(matches) ? matches.join('\n') : matches[0];
    } catch (e) {
      return html;
    }
  }

  async function runExport(btn) {
    const originalText = btn.textContent;
    btn.disabled = true;

    const pages = {};
    const keys = Object.keys(PAGES);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i > 0) {
        for (let s = DELAY_BETWEEN_REQUESTS_MS; s > 0; s -= 1000) {
          btn.textContent = `Czekam ${Math.ceil(s / 1000)}s przed kolejnym pobraniem (${i + 1}/${keys.length})...`;
          await sleep(Math.min(1000, s));
        }
      }
      btn.textContent = `Pobieranie ${i + 1}/${keys.length}: ${key}...`;
      const page = await fetchPage(PAGES[key]);
      if (page.html) {
        page.originalLength = page.html.length;
        page.html = trimHtml(key, page.html);
      }
      pages[key] = page;
    }

    const originalTotal = keys.reduce((sum, k) => sum + (pages[k].originalLength || 0), 0);
    for (const k of keys) delete pages[k].originalLength;

    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      pages,
    };
    const json = JSON.stringify(payload);
    const savingsPct = originalTotal ? Math.round((1 - json.length / originalTotal) * 100) : 0;

    const failed = keys.filter(k => pages[k].error);

    let copied = false;
    if (json.length <= MAX_CLIPBOARD_CHARS) {
      if (typeof GM_setClipboard === 'function') {
        GM_setClipboard(json, 'text');
        copied = true;
      } else {
        try {
          await navigator.clipboard.writeText(json);
          copied = true;
        } catch (e) {
          copied = false;
        }
      }
    }

    btn.disabled = false;
    btn.textContent = originalText;

    const sizeLine = savingsPct > 0 ? ` (dane okrojono o ~${savingsPct}%, ${(json.length / 1024).toFixed(0)} KB)` : '';
    const statusLine = (failed.length
      ? `${keys.length - failed.length}/${keys.length} stron pobrano poprawnie.\nBłędy: ${failed.join(', ')}.\nDane mimo to nadają się do importu — pozostałe sekcje zostaną zaimportowane.`
      : `Wszystkie ${keys.length} stron pobrano poprawnie.`) + sizeLine;

    const message = copied
      ? `Skopiowano do schowka.\n${statusLine}\nWklej w KotwicUI (Kalkulator Postaci → "Wklej z Tampermonkey") — możesz też pobrać dane jako plik JSON poniżej.`
      : `Dane są zbyt duże, by skopiować do schowka.\n${statusLine}\nPobierz je jako plik JSON poniżej i zaimportuj w KotwicUI (Kalkulator Postaci → "Importuj plik").`;

    showResultModal(message, json);
  }

  const button = makeButton();
  button.addEventListener('click', () => runExport(button));
  maybeShowChangelog();
})();
