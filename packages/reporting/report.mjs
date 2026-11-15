import {validateHash} from '../core/util.mjs';
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const cell=s=>String(s??'').replaceAll('|','\\|').replaceAll('\n',' ');
const fmt=n=>typeof n==='number'&&Number.isFinite(n)?n.toFixed(4):'n/a';
const title=r=>r.kind==='audit-report'?'EdgeSutra AI — Edge Readiness Audit Report':`EdgeSutra AI — ${r.kind||'Evidence'} Report`;

// Each renderer returns neutral blocks so Markdown and HTML always carry identical content.
function blocks(r){
 const b=[];const valid=validateHash(r);
 b.push({t:'meta',rows:[['Creator','Vatsal Shah'],['Status',r.status||'Reported'],['Integrity',valid?'verified (SHA-256 recomputed)':'INVALID'],...(r.toolVersion?[['Tool version',r.toolVersion]]:[]),...(r.recordedAt?[['Recorded',r.recordedAt]]:[])]});
 if(r.kind==='audit-report'){
  b.push({t:'verdict',v:r.verdict,note:r.verdictRule});
  b.push({t:'meta',rows:[['Model',r.subject.modelId],['Device',r.subject.deviceId],['Runtime',r.subject.runtimeId],['Inputs',r.subject.inputs],['Static compatibility',r.compatibilityStatus],['Environment',`Node ${r.environment.node} · ${r.environment.platform}/${r.environment.architecture}`]]});
  b.push({t:'h',x:'Findings'},{t:'table',head:['ID','Severity','Finding','Detail'],rows:r.findings.map(f=>[f.id,f.severity,f.title,f.detail])});
  b.push({t:'h',x:'Evidence tiers'},{t:'table',head:['Artifact','Tier','Proves','Does not prove'],rows:r.evidence.map(e=>[e.artifact,e.tier,e.proves,e.doesNotProve])});
  b.push({t:'h',x:'Not tested'},{t:'list',items:r.notTested});
  b.push({t:'h',x:'Artifact hashes'},{t:'table',head:['File','SHA-256','Embedded integrity'],rows:Object.entries(r.artifacts).map(([n,a])=>[n,a.sha256,a.integrity])});
  b.push({t:'note',x:'Human approval is required before any deployment. SHA-256 detects corruption; it is not a signature and does not prove origin.'});
 }else if(r.kind==='compatibility-report'){
  b.push({t:'meta',rows:[['Model',r.modelId],['Device',r.deviceId],['Runtime',r.runtimeId],['Device execution',r.deviceExecution]]});
  b.push({t:'table',head:['Check','Result','Evidence'],rows:r.checks.map(c=>[c.name,c.result,c.detail])});
  b.push({t:'note',x:r.explanation});
 }else if(r.kind==='toy-benchmark'){
  b.push({t:'meta',rows:[['Actual execution location',r.host.id],['Target device',r.targetDevice.status],['Energy','NOT_MEASURED'],['Carbon','NOT_MEASURED']]});
  b.push({t:'table',head:['Variant','Median wall-clock (ms)','p95 (ms)'],rows:['baseline','candidate'].map(k=>[r[k].variant,fmt(r[k].timing.wallClock.p50),fmt(r[k].timing.wallClock.p95)])});
  b.push({t:'meta',rows:[['Quality MAE',r.quality.meanAbsoluteError.toPrecision(5)],['Max abs error',r.quality.maxAbsoluteError.toPrecision(5)]]});
  b.push({t:'h',x:'Limitations'},{t:'list',items:r.limitations});
 }else if(r.kind==='conversion-plan'){
  b.push({t:'meta',rows:[['Conversion executed',String(r.conversionExecuted)],['Requested precision',r.requestedPrecision]]});
  b.push({t:'table',head:['#','Action','Status','Description'],rows:r.stages.map((x,i)=>[i+1,x.action,x.status,x.description])});
  b.push({t:'note',x:r.limitations});
 }else if(r.kind==='model-inspection'){
  b.push({t:'meta',rows:[['File',r.sourceFile],['SHA-256',r.sha256],['Nodes',r.nodeCount],['Inspection',r.inspection],['Semantic validation',r.semanticValidation]]});
  b.push({t:'h',x:'Operators'},{t:'list',items:r.operators});
 }else if(r.kind==='benchmark-comparison'){
  b.push({t:'meta',rows:[['Comparison',r.status],['Change %',r.performanceChangePercent==null?'n/a':fmt(r.performanceChangePercent)]]});
  b.push({t:'note',x:r.disclaimer||r.reason||''});
 }else b.push({t:'code',x:JSON.stringify(r,null,2)});
 return b;
}
export function markdownReport(r){
 const out=[`# ${title(r)}`,''];
 for(const x of blocks(r)){
  if(x.t==='meta')out.push(...x.rows.map(([k,v])=>`**${k}:** ${v}  `),'');
  else if(x.t==='verdict')out.push(`> **Verdict: ${x.v}** — ${x.note}`,'');
  else if(x.t==='h')out.push(`## ${x.x}`,'');
  else if(x.t==='table')out.push(`| ${x.head.join(' | ')} |`,`|${x.head.map(()=>'---').join('|')}|`,...x.rows.map(row=>`| ${row.map(cell).join(' | ')} |`),'');
  else if(x.t==='list')out.push(...x.items.map(i=>`- ${i}`),'');
  else if(x.t==='note')out.push(`_${x.x}_`,'');
  else out.push('```json',x.x,'```','');
 }
 return out.join('\n');
}
const CSS=`:root{--bg:#f6f8fb;--card:#fff;--ink:#14202b;--mute:#566574;--line:#d8e0e9;--brand:#0d6b7c;--ok:#13795b;--warn:#a15c00;--bad:#b3261e}@media(prefers-color-scheme:dark){:root{--bg:#0e141a;--card:#16202a;--ink:#e6edf3;--mute:#9fb0bf;--line:#2a3846;--brand:#4cc3d6;--ok:#4cd6a3;--warn:#f0b254;--bad:#ff8a80}}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}main{max-width:1000px;margin:0 auto;padding:2rem 1rem 4rem}h1{font-size:1.6rem;margin:.2rem 0 1rem}h2{font-size:1.15rem;margin:2rem 0 .6rem;border-bottom:1px solid var(--line);padding-bottom:.3rem}.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:1rem 1.25rem;margin:1rem 0}dl{display:grid;grid-template-columns:max-content 1fr;gap:.25rem 1rem;margin:0}dt{color:var(--mute)}dd{margin:0;overflow-wrap:anywhere}.scroll{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:.92rem}th,td{text-align:left;padding:.5rem .6rem;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--mute);font-weight:600}td{overflow-wrap:anywhere}.verdict{border-left:6px solid var(--warn);font-size:1.05rem}.verdict.BLOCKED{border-color:var(--bad)}.verdict b{font-size:1.4rem}.pill{display:inline-block;padding:.05rem .55rem;border-radius:99px;font-size:.8rem;border:1px solid currentColor}.pill.pass{color:var(--ok)}.pill.fail,.pill.blocker{color:var(--bad)}.pill.unknown,.pill.review{color:var(--warn)}.note{color:var(--mute);font-style:italic}pre{overflow:auto;background:var(--card);border:1px solid var(--line);padding:1rem;border-radius:8px}footer{color:var(--mute);font-size:.85rem;margin-top:2rem}a{color:var(--brand)}`;
const pill=v=>['pass','fail','unknown','blocker','review'].includes(String(v))?`<span class="pill ${esc(v)}">${esc(v)}</span>`:esc(v);
export function htmlReport(r){
 const body=blocks(r).map(x=>{
  if(x.t==='meta')return `<section class="card"><dl>${x.rows.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></section>`;
  if(x.t==='verdict')return `<section class="card verdict ${esc(x.v)}" role="status"><b>Verdict: ${esc(x.v)}</b><br>${esc(x.note)}</section>`;
  if(x.t==='h')return `<h2>${esc(x.x)}</h2>`;
  if(x.t==='table')return `<div class="scroll"><table><thead><tr>${x.head.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${x.rows.map(row=>`<tr>${row.map(c=>`<td>${pill(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if(x.t==='list')return `<ul>${x.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
  if(x.t==='note')return `<p class="note">${esc(x.x)}</p>`;
  return `<pre>${esc(x.x)}</pre>`;
 }).join('\n');
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${esc(title(r))}</title><style>${CSS}</style></head><body><main><h1>${esc(title(r))}</h1>\n${body}\n<footer>EdgeSutra AI · evidence-first edge AI engineering · created by Vatsal Shah · Apache-2.0</footer></main></body></html>`;
}
