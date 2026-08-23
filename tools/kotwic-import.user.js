// ==UserScript==
// @name         KotwicUI Export
// @namespace    kotwicui
// @version      1.1.0
// @description  Fetches the game pages KotwicUI's Kalkulator Postaci needs and copies them as one JSON blob to your clipboard.
// @author       KotwicUI
// @match        https://r20.bloodwars.pl/*
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const PAGES = {
    trening: '?a=training',
    main: '?a=main',
    equip: '?a=equip',
    enchant: '?a=enchant',
    talizman: '?a=talizman',
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

  const DELAY_BETWEEN_REQUESTS_MS = 3000;

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
      pages[key] = await fetchPage(PAGES[key]);
    }

    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      pages,
    };
    const json = JSON.stringify(payload);

    const failed = keys.filter(k => pages[k].error);

    if (typeof GM_setClipboard === 'function') {
      GM_setClipboard(json, 'text');
    } else {
      try {
        await navigator.clipboard.writeText(json);
      } catch (e) {
        window.prompt('Skopiuj poniższy tekst ręcznie (Ctrl+C):', json);
        btn.disabled = false;
        btn.textContent = originalText;
        return;
      }
    }

    btn.disabled = false;
    btn.textContent = originalText;

    if (failed.length) {
      alert(`Skopiowano do schowka (${keys.length - failed.length}/${keys.length} stron pobrano poprawnie).\nBłędy: ${failed.join(', ')}.\nWklej dane w KotwicUI mimo to — pozostałe sekcje zostaną zaimportowane.`);
    } else {
      alert(`Skopiowano do schowka! Wszystkie ${keys.length} stron pobrano poprawnie.\nWklej teraz w KotwicUI (Kalkulator Postaci → "Wklej z Tampermonkey").`);
    }
  }

  const button = makeButton();
  button.addEventListener('click', () => runExport(button));
})();
