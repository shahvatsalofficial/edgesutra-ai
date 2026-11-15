import os from 'node:os';
import {performance} from 'node:perf_hooks';
import {sha256,stable,sealed,pctl,assert,isNonNeg} from './util.mjs';

function randomWeights(rows=10,cols=18){let seed=341237;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return (seed/4294967296)*2-1;};return Array.from({length:rows},()=>Array.from({length:cols},()=>rnd()*.15));}
export function toyModel(){return {type:'toy-dense-float32',weights:randomWeights(),bias:Array.from({length:10},(_,i)=>(i-5)*.003)};}
function dataset(n=16,dim=18){let seed=394711;return Array.from({length:n},()=>Array.from({length:dim},()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296*2-1;}));}
export function quantizeToy(model){return {type:'toy-dense-int8-sim',rows:model.weights.map(row=>{const largest=Math.max(...row.map(Math.abs),1e-12);const scale=largest/127;return {scale,quantized:row.map(x=>Math.max(-127,Math.min(127,Math.round(x/scale))))};}),bias:model.bias};}
export function inferToy(model,input){
 const rows=model.type==='toy-dense-int8-sim'?model.rows:model.weights;
 return rows.map((row,i)=>{let s=model.bias[i];for(let j=0;j<input.length;j++)s+=input[j]*(model.type==='toy-dense-int8-sim'?row.quantized[j]*row.scale:row[j]);return Math.max(0,s);});
}
function timing(model,inputs,runs,iterations){
 for(let k=0;k<5;k++)for(const x of inputs)inferToy(model,x);
 const wall=[],cpu=[],rss=[];
 for(let r=0;r<runs;r++){const before=process.cpuUsage(),start=performance.now();let guard=0;for(let z=0;z<iterations;z++)for(const x of inputs)guard+=inferToy(model,x)[z%model.bias.length];const ms=performance.now()-start;const usage=process.cpuUsage(before);wall.push(ms);cpu.push((usage.user+usage.system)/1000);rss.push(process.memoryUsage().rss);if(!Number.isFinite(guard))throw new Error('Nonfinite inference result');}
 const ordered=[...wall].sort((a,b)=>a-b);return {wallClock:{unit:'ms',samples:wall,mean:wall.reduce((a,b)=>a+b,0)/runs,p50:pctl(ordered,.5),p95:pctl(ordered,.95),min:ordered[0],max:ordered.at(-1)},cpu:{unit:'process-cpu-ms',samples:cpu},memory:{unit:'process-rss-bytes-after-run',samples:rss,notPeak:true}};
}
export function benchmarkToy({runs=7,iterations=80,inputs=16}={}){
 assert(Number.isInteger(runs)&&runs>=2&&runs<=100,'runs must be 2..100');assert(Number.isInteger(iterations)&&iterations>=1&&iterations<=10000,'iterations must be 1..10000');assert(Number.isInteger(inputs)&&inputs>=2&&inputs<=100,'inputs must be 2..100');
 const base=toyModel(),candidate=quantizeToy(base),data=dataset(inputs),ref=data.map(x=>inferToy(base,x)),out=data.map(x=>inferToy(candidate,x));
 let n=0,sum=0,max=0,good=0;for(let i=0;i<data.length;i++){let norm=0;for(let j=0;j<ref[i].length;j++){const err=Math.abs(ref[i][j]-out[i][j]);sum+=err;max=Math.max(max,err);n++;norm+=err;}if(norm/ref[i].length<=.001)good++;}
 const a=timing(base,data,runs,iterations),b=timing(candidate,data,runs,iterations);
 const workload={id:'edgesutra-toy-dense-v1',inputs,iterationsPerRun:iterations,inputDimension:18,outputDimension:10,inputHash:sha256(stable(data)),modelHash:sha256(stable(base))};
 const baseMetric={variant:'float32',timing:a},quantMetric={variant:'int8-sim',timing:b};
 return sealed({schemaVersion:1,kind:'toy-benchmark',status:'HOST_ONLY_TEST',recordedAt:new Date().toISOString(),host:{id:`host-${sha256(os.hostname()).slice(0,10)}-${process.platform}-${process.arch}`,platform:process.platform,architecture:process.arch,nodeVersion:process.version,logicalCores:os.cpus().length},targetDevice:{status:'NOT_TESTED',note:'This demo executes a tiny JavaScript model on the current host CPU, not an edge runtime or physical target device.'},runtime:'nodejs-toy-js',runs,workload,baseline:baseMetric,candidate:quantMetric,quality:{metric:'elementwise-absolute-error',reference:'toy float32',meanAbsoluteError:sum/n,maxAbsoluteError:max,examplesBelowMeanError001:good,totalExamples:inputs},measurements:{energyWh:{status:'NOT_MEASURED'},carbonGrams:{status:'NOT_MEASURED'},peakMemoryBytes:{status:'NOT_MEASURED'},targetLatency:{status:'NOT_MEASURED'}},limitations:['Small synthetic dense layer, not ONNX/LiteRT/CoreML/ExecuTorch execution','Process RSS is after-run and not model-exclusive or peak usage','Wall-clock timings do not establish energy, speed on a target device or optimized performance']});
}
export function compareBenchmarks(baseline,candidate){
 assert(baseline?.kind==='toy-benchmark'&&candidate?.kind==='toy-benchmark','Both reports must be toy benchmarks');
 const same=baseline.workload.inputHash===candidate.workload.inputHash && baseline.workload.modelHash===candidate.workload.modelHash && baseline.workload.iterationsPerRun===candidate.workload.iterationsPerRun && baseline.host.id===candidate.host.id && baseline.runtime===candidate.runtime;
 if(!same)return sealed({schemaVersion:1,kind:'benchmark-comparison',status:'NOT_COMPARABLE',reason:'Different inputs/model/iterations/host/runtime; host IDs are coarse and further environmental checks are still needed',performanceChangePercent:null});
 const p0=baseline.candidate.timing.wallClock.p50,p1=candidate.candidate.timing.wallClock.p50;
 return sealed({schemaVersion:1,kind:'benchmark-comparison',status:'COMPARABLE_WITH_CAVEATS',performanceChangePercent:100*(p1-p0)/Math.max(1e-12,p0),baselineP50Ms:p0,candidateP50Ms:p1,qualityDeltaMeanAbs:candidate.quality.meanAbsoluteError-baseline.quality.meanAbsoluteError,qualityAndLatencyAreSeparate:true,disclaimer:'Natural variation can dominate short synthetic measurements. A formal significance test is not included.'});
}
