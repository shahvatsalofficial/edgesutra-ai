import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const pkg=JSON.parse(fs.readFileSync(fileURLToPath(new URL('../../package.json',import.meta.url)),'utf8'));
export const VERSION=pkg.version;
export const TOOL='EdgeSutra AI';
export const ROOT=fileURLToPath(new URL('../../',import.meta.url));
