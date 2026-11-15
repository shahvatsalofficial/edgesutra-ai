import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {assert} from './util.mjs';
const HERE=path.dirname(fileURLToPath(import.meta.url));
export const SKILLS=path.resolve(HERE,'../../skills');
export const TARGETS={claude:'.claude/skills',cursor:'.cursor/skills',codex:'.agents/skills',gemini:'.gemini/skills',copilot:'.github/skills',opencode:'.opencode/skills',antigravity:'.agent/skills'};
export function installSkills(ide,project){
 assert(Object.hasOwn(TARGETS,ide),`Unsupported IDE: ${ide}`);
 const root=fs.realpathSync(project);assert(fs.statSync(root).isDirectory(),'Project must be an existing directory');
 const paths=fs.readdirSync(SKILLS,{withFileTypes:true}).filter(x=>x.isDirectory()&&fs.existsSync(path.join(SKILLS,x.name,'SKILL.md'))).map(x=>x.name);
 assert(paths.length>=10,'Source skills missing');
 const sub=TARGETS[ide].split('/');let current=root;
 for(const part of sub){const next=path.join(current,part);if(fs.existsSync(next)){assert(!fs.lstatSync(next).isSymbolicLink(),'Refuse symlinked destination');assert(fs.statSync(next).isDirectory(),'Destination must be a directory');}current=next;}
 for(const name of paths){const dest=path.join(current,name);assert(!fs.existsSync(dest),`Existing skill would be overwritten: ${name}`);}
 fs.mkdirSync(current,{recursive:true});
 for(const name of paths){fs.mkdirSync(path.join(current,name));fs.copyFileSync(path.join(SKILLS,name,'SKILL.md'),path.join(current,name,'SKILL.md'));}
 return {ide,count:paths.length,path:current,projectScoped:true,nativeActivation:'NOT_TESTED'};
}
