#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {profileHost} from '../core/profile.mjs';
import {readJson,writeJson,validateHash} from '../core/util.mjs';
import {checkCompatibility} from '../core/compat.mjs';
import {makePlan} from '../core/plan.mjs';
import {benchmarkToy,compareBenchmarks} from '../core/benchmark.mjs';
import {installSkills} from '../core/install.mjs';
import {markdownReport,htmlReport} from '../reporting/report.mjs';
import {startServer} from '../server/index.mjs';
import {inspectOnnx} from '../core/onnx.mjs';
import {runAudit} from '../core/audit.mjs';
import {VERSION} from '../core/version.mjs';
import {sha256} from '../core/util.mjs';
const cwd=process.cwd();
function parse(args){const o={};for(let i=0;i<args.length;i++){const k=args[i];if(!k.startsWith('--')||k==='--')throw new Error(`Unexpected option: ${k}`);if(i+1>=args.length||args[i+1].startsWith('--'))throw new Error(`Missing value for ${k}`);o[k.slice(2)]=args[++i];}return o;}
const must=(o,k)=>{if(!o[k])throw new Error(`Missing --${k}`);return o[k];};
const write=(p,o)=>{if(p)writeJson(p,o);else console.log(JSON.stringify(o,null,2));};
async function main(){const [cmd,...rest]=process.argv.slice(2);const o=parse(rest);
 switch(cmd){
 case '--version':case 'version':return console.log(VERSION);
 case 'audit':{
  const dir=path.resolve(must(o,'out'));
  const n=(k,d)=>o[k]===undefined?d:Number(o[k]);
  const {summary,artifacts}=await runAudit({model:o.model,device:o.device,runtime:o.runtime,onnx:o.onnx,bench:{runs:n('runs',5),iterations:n('iterations',60),inputs:n('inputs',16)}});
  fs.mkdirSync(dir,{recursive:true});
  const sums=[];
  const put=(name,text)=>{fs.writeFileSync(path.join(dir,name),text,{mode:0o600});sums.push(`${sha256(Buffer.from(text))}  ${name}`);};
  for(const [name,a] of Object.entries(artifacts))put(name,JSON.stringify(a,null,2)+'\n');
  put('audit-report.json',JSON.stringify(summary,null,2)+'\n');
  put('audit-report.md',markdownReport(summary));
  put('audit-report.html',htmlReport(summary));
  fs.writeFileSync(path.join(dir,'SHA256SUMS.txt'),sums.join('\n')+'\n',{mode:0o600});
  console.log(JSON.stringify({verdict:summary.verdict,compatibility:summary.compatibilityStatus,outputDirectory:dir,files:[...Object.keys(artifacts),'audit-report.json','audit-report.md','audit-report.html','SHA256SUMS.txt']},null,2));
  if(summary.verdict==='BLOCKED')process.exitCode=1;
  return;}
 case 'doctor':return write(o.out,{tool:'EdgeSutra AI',version:VERSION,runtime:process.version,capabilities:['host-profile','manifest-compatibility','conversion-plan','toy-cpu-benchmark','bench-compare','audit-md-html','report','localhost-server','skill-install'],noKey:true,verifiedIdeActivation:false,nativeOnnxRuntime:false});
 case 'profile':return write(o.out,profileHost());
 case 'inspect':return write(o.out,await inspectOnnx(must(o,'input')));
 case 'check':{const r=checkCompatibility(readJson(must(o,'model')),readJson(must(o,'device')),readJson(must(o,'runtime')));write(o.out,r);if(r.status==='INCOMPATIBLE')process.exitCode=1;return;}
 case 'plan':{const model=readJson(must(o,'model')),device=readJson(must(o,'device')),rt=readJson(must(o,'runtime'));return write(o.out,makePlan(model,device,rt,checkCompatibility(model,device,rt),{targetPrecision:o.precision||'int8'}));}
 case 'benchmark':return write(o.out,benchmarkToy({runs:o.runs===undefined?7:Number(o.runs),iterations:o.iterations===undefined?80:Number(o.iterations),inputs:o.inputs===undefined?16:Number(o.inputs)}));
 case 'compare':return write(o.out,compareBenchmarks(readJson(must(o,'baseline')),readJson(must(o,'candidate'))));
 case 'verify':{const body=readJson(must(o,'input'));const valid=validateHash(body);console.log(JSON.stringify({verified:valid,kind:body.kind||'unknown'}));if(!valid)process.exitCode=2;return;}
 case 'render':{const input=readJson(must(o,'input')),output=must(o,'out'),format=o.format||'md';if(!validateHash(input))throw new Error('Report integrity invalid');if(!['md','html'].includes(format))throw new Error('Format must be md or html');fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,format==='md'?markdownReport(input):htmlReport(input),{mode:0o600});console.log(`Wrote ${output}`);return;}
 case 'install':return write(null,installSkills(must(o,'ide'),must(o,'project')));
 case 'serve':{const token=process.env.EDGESUTRA_BEARER_TOKEN;const srv=await startServer({reports:must(o,'reports'),token,port:o.port===undefined?8847:Number(o.port)});console.log(`Local read-only report server on ${srv.host}:${srv.port}`);return;}
 default:console.log(`EdgeSutra AI — created by Vatsal Shah\n\nCommands:\n  doctor [--out file]\n  profile [--out file]\n  inspect --input model.onnx [--out file]\n  check --model file --device file --runtime file [--out file]\n  plan --model file --device file --runtime file [--precision int8|float16] [--out file]\n  benchmark [--runs 7] [--iterations 80] [--out file]\n  compare --baseline json --candidate json [--out file]\n  verify --input json\n  render --input json --format md|html --out file\n  install --ide claude|cursor|codex|gemini|copilot|opencode|antigravity --project directory\n  audit --out directory [--model f --device f --runtime f | --onnx model.onnx] [--runs n]  (writes JSON + MD + HTML)
  version | --version
  serve --reports directory [--port 8847] (EDGESUTRA_BEARER_TOKEN required)\n\nExit codes: 0 ok · 1 blocked/incompatible · 2 invalid input or tool error.
All model compatibility checks use declared manifests. The toy benchmark runs on THIS host CPU only.`);if(cmd && !['help','--help','-h'].includes(cmd))process.exitCode=2;
 }
}
main().catch(err=>{console.error(`EdgeSutra error: ${err.message}`);process.exitCode=2;});
