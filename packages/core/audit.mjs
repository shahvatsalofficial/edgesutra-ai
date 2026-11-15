import path from 'node:path';
import {readJson,sealed,sha256,stable} from './util.mjs';
import {profileHost} from './profile.mjs';
import {checkCompatibility} from './compat.mjs';
import {makePlan} from './plan.mjs';
import {benchmarkToy} from './benchmark.mjs';
import {inspectOnnx} from './onnx.mjs';
import {VERSION,TOOL,ROOT} from './version.mjs';

// Evidence tiers follow the master spec. Only tiers actually produced here are ever emitted.
const TIER={host:'MEASURED_HOST_ONLY',static:'STATIC_MATCH',planned:'NOT_RUN'};
const fx=p=>path.join(ROOT,'fixtures',p);

export async function runAudit({model,device,runtime,onnx,bench={}}={}){
 const usingFixtures=!model&&!device&&!runtime&&!onnx;
 const dev=readJson(device||fx('device-cpu.json'));
 let mdl,rt,inspection=null;
 if(onnx){inspection=await inspectOnnx(onnx);mdl=inspection;rt=readJson(runtime||fx('runtime-onnx-cpu.json'));}
 else{mdl=readJson(model||fx('model-compatible.json'));rt=readJson(runtime||fx('runtime-toy.json'));}
 const profile=profileHost(),compat=checkCompatibility(mdl,dev,rt),plan=makePlan(mdl,dev,rt,compat),benchmark=benchmarkToy(bench);
 const artifacts={'host-profile.json':profile,'compatibility.json':compat,'conversion-plan.json':plan,'benchmark-results.json':benchmark};
 if(inspection)artifacts['model-inspection.json']=inspection;
 const findings=[];const add=(id,severity,title,detail)=>findings.push({id,severity,title,detail});
 for(const c of compat.checks){
  if(c.result==='fail')add(`ES-COMPAT-${c.name.toUpperCase()}`,'blocker',`Check failed: ${c.name}`,c.detail);
  else if(c.result==='unknown')add(`ES-UNKNOWN-${c.name.toUpperCase()}`,'review',`Unverified: ${c.name}`,c.detail);
 }
 add('ES-NOT-RUN-DEVICE','review','No target-device execution','No model was executed on the target device. Static manifest checks and a host-only toy benchmark do not prove device support.');
 add('ES-NOT-MEASURED-ENERGY','info','Energy, carbon and peak memory not measured','Reported as NOT_MEASURED; never estimated or substituted.');
 add('ES-SYNTHETIC-INPUT','info',usingFixtures?'Bundled synthetic fixtures used':'User-supplied manifests are declarations','Manifests are declared claims, not observations.');
 const blocked=findings.some(f=>f.severity==='blocker');
 const verdict=blocked?'BLOCKED':'REVIEW_REQUIRED';
 const evidence=[
  {artifact:'compatibility.json',tier:TIER.static,proves:'Declared model/runtime/device contracts agree or disagree',doesNotProve:'That the model runs on the device'},
  {artifact:'benchmark-results.json',tier:TIER.host,proves:'A toy Node.js model ran on this host CPU with timed samples',doesNotProve:'Target-device latency, energy, peak memory or edge-runtime behavior'},
  {artifact:'conversion-plan.json',tier:TIER.planned,proves:'A reviewable plan exists',doesNotProve:'That any conversion was executed'}];
 if(inspection)evidence.push({artifact:'model-inspection.json',tier:'METADATA_ONLY',proves:'Operator names, opsets and SHA-256 were read from ONNX protobuf bytes',doesNotProve:'ONNX validity, shape inference or inference correctness'});
 const notTested=['Physical or virtual target-device inference','ONNX Runtime / LiteRT / ExecuTorch execution','Quantized-model task quality on held-out data','Energy, thermal and battery behavior','Offline reliability under interruption','Package signing and provenance beyond SHA-256'];
 const files=Object.fromEntries(Object.entries(artifacts).map(([n,o])=>[n,{sha256:sha256(stable(o)),integrity:o.integrity}]));
 const summary=sealed({schemaVersion:1,kind:'audit-report',tool:TOOL,toolVersion:VERSION,status:verdict,recordedAt:new Date().toISOString(),environment:{node:process.version,platform:process.platform,architecture:process.arch},subject:{modelId:mdl.id,deviceId:dev.id,runtimeId:rt.id,modelSha256:inspection?.sha256??null,inputs:usingFixtures?'bundled-synthetic-fixtures':'user-supplied'},compatibilityStatus:compat.status,verdict,verdictRule:'BLOCKED on any failed static check; REVIEW_REQUIRED otherwise; GO_CANDIDATE needs verified on-device evidence plus human sign-off, which this tool cannot produce.',findings,evidence,notTested,artifacts:files,humanApprovalRequired:true});
 return {summary,artifacts};
}
