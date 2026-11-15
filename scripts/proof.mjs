// Regenerates docs/proof/*: real test run (TAP + summary), environment, CLI transcripts. Nothing is hand-edited.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {sha256} from '../packages/core/util.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'docs','proof');fs.mkdirSync(out,{recursive:true});
const run=(args)=>spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:300000});
const tap=run(['--test','--test-reporter=tap',...fs.readdirSync(path.join(root,'tests')).filter(f=>f.endsWith('.test.mjs')).sort().map(f=>'tests/'+f)]);
fs.writeFileSync(path.join(out,'test-run.tap'),tap.stdout);
const n=k=>Number((tap.stdout.match(new RegExp(`^# ${k} (\\d+)`,'m'))||[])[1]??NaN);
const results={tests:n('tests'),pass:n('pass'),fail:n('fail'),skipped:n('skipped'),exitCode:tap.status};
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const env={tool:pkg.name,version:pkg.version,node:process.version,platform:`${process.platform}/${process.arch}`,os:os.release(),recordedAt:new Date().toISOString(),...results};
fs.writeFileSync(path.join(out,'environment.json'),JSON.stringify(env,null,2)+'\n');
const sample=(name,args)=>{const r=run(['packages/cli/index.mjs',...args]);fs.writeFileSync(path.join(out,name),`$ edgesutra ${args.join(' ')}\n(exit ${r.status})\n\n${r.stdout}${r.stderr}`);return r.status;};
sample('cli-version.txt',['--version']);
sample('cli-doctor.txt',['doctor']);
sample('cli-check-compatible.txt',['check','--model','fixtures/model-compatible.json','--device','fixtures/device-cpu.json','--runtime','fixtures/runtime-toy.json']);
sample('cli-check-incompatible.txt',['check','--model','fixtures/model-unsupported.json','--device','fixtures/device-cpu.json','--runtime','fixtures/runtime-toy.json']);
sample('cli-inspect-onnx.txt',['inspect','--input','fixtures/models/tiny.onnx']);
const fuzz={cases:0,rejectedCleanly:0,crashed:0};
const {inspectOnnxBuffer}=await import('../packages/core/onnx.mjs');
let seed=7;const rnd=()=>(seed=(seed*1664525+1013904223)>>>0)/4294967296;
const base=fs.readFileSync(path.join(root,'fixtures/models/tiny.onnx'));
for(let i=0;i<2000;i++){const b=Buffer.from(base);const k=1+Math.floor(rnd()*4);for(let j=0;j<k;j++)b[Math.floor(rnd()*b.length)]=Math.floor(rnd()*256);const cut=rnd()<.4?b.subarray(0,Math.floor(rnd()*b.length)):b;fuzz.cases++;try{inspectOnnxBuffer(cut);fuzz.rejectedCleanly++;}catch(e){if(e instanceof Error&&!(e instanceof RangeError)&&!(e instanceof TypeError))fuzz.rejectedCleanly++;else fuzz.crashed++;}}
fuzz.note='Mutated/truncated copies of fixtures/models/tiny.onnx. "rejectedCleanly" counts both accepted-as-parseable and thrown Error; "crashed" counts unexpected TypeError/RangeError. Deterministic seed 7. Not a substitute for a coverage-guided fuzzer.';
fs.writeFileSync(path.join(out,'fuzz-results.json'),JSON.stringify(fuzz,null,2)+'\n');
const files=fs.readdirSync(out).filter(f=>f!=='SHA256SUMS.txt'&&f!=='README.md').sort();
fs.writeFileSync(path.join(out,'SHA256SUMS.txt'),files.map(f=>`${sha256(fs.readFileSync(path.join(out,f)))}  ${f}`).join('\n')+'\n');
fs.writeFileSync(path.join(out,'README.md'),`# Proof of the recorded run

Regenerate: \`npm run proof\`. These files are machine output, not hand-written.

| Field | Value |
|---|---|
| Tool | ${env.tool} ${env.version} |
| Node / platform | ${env.node} · ${env.platform} |
| Recorded | ${env.recordedAt} |
| Tests | ${results.tests} |
| Passed | ${results.pass} |
| Failed | ${results.fail} |
| Skipped | ${results.skipped} (symlink tests skip on hosts that forbid symlinks; they execute on Linux/macOS CI) |
| Parser fuzz | ${fuzz.cases} mutated inputs, ${fuzz.crashed} unexpected crashes |

Files: \`test-run.tap\`, \`environment.json\`, \`fuzz-results.json\`, \`cli-*.txt\`, \`SHA256SUMS.txt\`.

**Limits:** one machine, one run. It shows the software behaves as documented on that host; it does not show target-device performance. CI results on other OSes are in the GitHub Actions history.
`);
console.log(JSON.stringify(env,null,2),JSON.stringify(fuzz));
process.exit(tap.status??1);
