import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export const stable = value => JSON.stringify(normalize(value));
function normalize(v) { if (Array.isArray(v)) return v.map(normalize); if (v !== null && typeof v === 'object') return Object.fromEntries(Object.keys(v).sort().map(k => [k, normalize(v[k])])); return v; }
export const integrity = payload => sha256(stable(payload));
export function readJson(file, max = 2_000_000) {
 const stat = fs.lstatSync(file); if (!stat.isFile() || stat.isSymbolicLink() || stat.size > max) throw new Error('Unsafe, missing, or oversized JSON input');
 try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { throw new Error(`Invalid JSON: ${e.message}`); }
}
export function writeJson(file, obj) { fs.mkdirSync(path.dirname(path.resolve(file)), {recursive:true}); fs.writeFileSync(file, JSON.stringify(obj, null, 2)+'\n', {mode:0o600}); }
export function validateHash(body) { return Boolean(body && typeof body === 'object' && /^[0-9a-f]{64}$/.test(body.integrity) && integrity(Object.fromEntries(Object.entries(body).filter(([k])=>k!=='integrity'))) === body.integrity); }
export function sealed(body) { return {...body, integrity: integrity(body)}; }
export const isNonEmpty = v => typeof v==='string' && v.trim().length>0;
export const isNonNeg = n => typeof n==='number' && Number.isFinite(n) && n>=0;
export function assert(condition, msg) {if (!condition) throw new Error(msg);}
export function pctl(sorted, p) {if (!sorted.length) return null; const idx=(sorted.length-1)*p, lo=Math.floor(idx), hi=Math.ceil(idx);return sorted[lo]+(sorted[hi]-sorted[lo])*(idx-lo);}
