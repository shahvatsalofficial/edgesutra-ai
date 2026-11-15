import fs from 'node:fs';
// Windows without Developer Mode / admin cannot create symlinks (EPERM). Skip, never fake a pass.
export function trySymlink(t,target,link,type){
 try{fs.symlinkSync(target,link,type);return true;}
 catch(e){if(['EPERM','EACCES','ENOSYS'].includes(e.code)){t.skip(`symlink creation not permitted here (${e.code})`);return false;}throw e;}
}
