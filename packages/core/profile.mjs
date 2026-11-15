import os from 'node:os';
import {sealed} from './util.mjs';
export function profileHost(){
 const cpus=os.cpus();
 return sealed({schemaVersion:1,kind:'host-profile',source:'node:os',host:{platform:process.platform,architecture:process.arch,osRelease:os.release(),cpuModel:cpus[0]?.model??'unknown',logicalCores:cpus.length,totalMemoryBytes:os.totalmem(),freeMemoryBytes:os.freemem(),nodeVersion:process.version},accelerators:{gpu:{status:'not-probed'},npu:{status:'not-probed'}},storage:{status:'not-measured'},note:'Host hardware detected only; this does NOT establish the capabilities of an attached or remote target device.'});
}
