import {assert,isNonEmpty,sealed,integrity} from './util.mjs';
export function makePlan(model,device,runtime,compatibility,settings={}){
 assert(model && isNonEmpty(model.id) && model.schemaVersion===1,'Invalid model manifest');
 assert(device && isNonEmpty(device.id) && runtime && isNonEmpty(runtime.id),'Invalid device/runtime manifest');
 assert(['int8','float16'].includes(settings.targetPrecision||'int8'),'Unsupported proposed target precision');
 const targetPrecision=settings.targetPrecision||'int8';
 return sealed({schemaVersion:1,kind:'conversion-plan',modelId:model.id,deviceId:device.id,runtimeId:runtime.id,requestedPrecision:targetPrecision,sourceManifestHash:integrity(model),targetManifestHash:integrity(device),runtimeManifestHash:integrity(runtime),compatibilityStatus:compatibility.status,stages:[
 {action:'validate-export',status:'PLANNED',description:'Inspect actual model graph with format-specific converter; manifest alone is insufficient'},
 {action:'calibration',status:'PLANNED',description:'Collect licensed representative input data with consent; record dataset version and distribution'},
 {action:'convert',status:'PLANNED',description:`Run supported conversion to ${targetPrecision} in an approved isolated toolchain`},
 {action:'correctness',status:'PLANNED',description:'Compare original/converted model outputs on held-out task-relevant examples'},
 {action:'target-device-benchmark',status:'PLANNED',description:'Measure warm/cold latency, memory, thermal and energy where sensors are available'},
 {action:'release-gate',status:'PLANNED',description:'Require verified accuracy, latency, memory, signed artifact provenance and human approval'}],
 approvalRequired:true,conversionExecuted:false,noHardwareBenchmarks:true,limitations:'This is a planning artifact. No model conversion or device deployment has occurred.'});
}
