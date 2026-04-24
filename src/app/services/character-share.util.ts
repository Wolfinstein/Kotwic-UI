import { Character } from '../models/character';

export interface SharedCharacterEntry {
  name: string;
  character: Character;
}

/** gzip when the browser supports it (shrinks a handful of characters to a shareable-length URL), otherwise raw JSON — still correct, just a longer link. */
const COMPRESSED_PREFIX = 'g1.';
const RAW_PREFIX = 'r1.';

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(b64url: string): Uint8Array {
  const padded = b64url.replace(/-/g, '+').replace(/_/g, '/').padEnd(b64url.length + (4 - (b64url.length % 4)) % 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function readAllChunks(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let total = 0;
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.length;
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

async function gzip(bytes: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream('gzip');
  const writer = cs.writable.getWriter();
  writer.write(bytes as BufferSource);
  writer.close();
  return readAllChunks(cs.readable);
}

async function gunzip(bytes: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('gzip');
  const writer = ds.writable.getWriter();
  writer.write(bytes as BufferSource);
  writer.close();
  return readAllChunks(ds.readable);
}

const supportsCompression = typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

/** Packs a handful of characters into one URL-safe code — meant to be dropped into a `?share=` query param so someone else can open the link and simulate fights with them. */
export async function encodeCharactersToShareCode(entries: SharedCharacterEntry[]): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(entries));
  if (supportsCompression) {
    return COMPRESSED_PREFIX + bytesToBase64Url(await gzip(bytes));
  }
  return RAW_PREFIX + bytesToBase64Url(bytes);
}

/** Reverses `encodeCharactersToShareCode`. Throws if the code is malformed or was produced by a browser that supports gzip while this one doesn't (or vice versa is handled — decompression always matches the encoded prefix). */
export async function decodeShareCode(code: string): Promise<SharedCharacterEntry[]> {
  const isCompressed = code.startsWith(COMPRESSED_PREFIX);
  const isRaw = code.startsWith(RAW_PREFIX);
  if (!isCompressed && !isRaw) throw new Error('Nieznany format linku.');
  const payload = base64UrlToBytes(code.slice(3));
  const bytes = isCompressed ? await gunzip(payload) : payload;
  const parsed = JSON.parse(new TextDecoder().decode(bytes));
  if (!Array.isArray(parsed)) throw new Error('Nieprawidłowa zawartość linku.');
  return parsed as SharedCharacterEntry[];
}
