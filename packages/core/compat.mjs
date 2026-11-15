import {assert,isNonEmpty,isNonNeg,sealed} from './util.mjs';
export function validateManifest(model, device, runtime){
 assert(model && model.schemaVersion===1 && isNonEmpty(model.id) && isNonEmpty(model.format) && Array.isArray(model.operators) && model.operators.every(isNonEmpty), 'Model manifest must include id, format and declared operators');
 assert(device && device.schemaVersion===1 && isNonEmpty(device.id) && isNonEmpty(device.architecture) && isNonNeg(device.availableMemoryMB), 'Device manifest missing architecture or availableMemoryMB');
 assert(runtime && runtime.schemaVersion===1 && isNonEmpty(runtime.id) && Array.isArray(runtime.formats) && Array.isArray(runtime.operators) && Array.isArray(runtime.precisions), 'Runtime capabilities missing required arrays');
 if(model.requiredMemoryMB!==undefined) assert(isNonNeg(model.requiredMemoryMB),'Invalid model requiredMemoryMB');
}
export function checkCompatibility(model,device,runtime){
 validateManifest(model,device,runtime);
 const checks=[];const add=(name,result,detail)=>checks.push({name,result,detail});
 add('model-format',runtime.formats.includes(model.format)?'pass':'fail',`Model ${model.format}; runtime ${runtime.formats.join(', ')}`);
 const missing=model.operators.filter(x=>!runtime.operators.includes(x));
 add('operators',missing.length?'fail':'pass',missing.length?`Missing declared ops: ${missing.join(', ')}`:'All declared operators listed by runtime');
 const precision=model.precision||'float32';
 add('precision',runtime.precisions.includes(precision)?'pass':'fail',`Model ${precision}; runtime ${runtime.precisions.join(', ')}`);
 const mem=model.requiredMemoryMB;
 add('memory-estimate',mem==null?'unknown':mem<=device.availableMemoryMB?'pass':'fail',mem==null?'No declared model memory requirement':`Declared ${mem} MB; available ${device.availableMemoryMB} MB`);
 const arches=Array.isArray(runtime.architectures)?runtime.architectures:[];
 add('architecture',!arches.length?'unknown':arches.includes('any')||arches.includes(device.architecture)?'pass':'fail',`Target ${device.architecture}; runtime ${arches.join(', ')||'unspecified'}`);
 const oses=Array.isArray(runtime.os)?runtime.os:[];
 add('os',!oses.length||!device.os?'unknown':oses.includes('any')||oses.includes(device.os)?'pass':'fail',`Target ${device.os||'unknown'}; runtime ${oses.join(', ')||'unspecified'}`);
 const runtimeInstalled=device.installedRuntimes?.includes(runtime.id);
 add('runtime-present',runtimeInstalled?'pass':'unknown',runtimeInstalled?'Target manifest claims runtime installed; not executed':'Installation not verified on target');
 add('real-device-execution','unknown','No model execution or performance measurement on this target has occurred');
 const staticChecks=checks.filter(x=>x.name!=='real-device-execution');
 const status=staticChecks.some(x=>x.result==='fail')?'INCOMPATIBLE':staticChecks.some(x=>x.result==='unknown')?'REQUIRES_VERIFICATION':'STATICALLY_COMPATIBLE';
 return sealed({schemaVersion:1,kind:'compatibility-report',modelId:model.id,deviceId:device.id,runtimeId:runtime.id,status,checks,deviceExecution:'NOT_RUN',explanation:'Static manifest-based checks only. Does not parse ONNX graph or certify an actual edge device.'});
}
