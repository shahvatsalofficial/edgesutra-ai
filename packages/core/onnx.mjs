import { readFile, stat, lstat } from 'node:fs/promises';
import { sha256, sealed } from './util.mjs';

// Bounded wire-format reader. This extracts metadata ONLY, not ONNX semantic validation.
function varint(buf,start,stop){let x=0n,s=0n,i=start;for(let k=0;k<10;k++){
 if(i>=stop)throw new Error('Truncated protobuf varint');const b=buf[i++];x|=BigInt(b&127)<<s;
 if(!(b&128)){if(x>BigInt(Number.MAX_SAFE_INTEGER))throw new Error('Varint exceeds safe integer');return [Number(x),i];}s+=7n;
}throw new Error('Overlong protobuf varint');}
function fields(buf,start,end,visitor){let i=start,seen=0;
 while(i<end){if(++seen>200000)throw new Error('Too many protobuf fields');let key;[key,i]=varint(buf,i,end);let field=key>>3,wire=key&7;
 if(!field)throw new Error('Invalid field number');
 if(wire===0){let v;[v,i]=varint(buf,i,end);visitor(field,wire,v);}
 else if(wire===1){if(i+8>end)throw new Error('Truncated fixed64');visitor(field,wire,null);i+=8;}
 else if(wire===2){let size;[size,i]=varint(buf,i,end);if(size>end-i)throw new Error('Truncated length-delimited field');visitor(field,wire,buf.subarray(i,i+size));i+=size;}
 else if(wire===5){if(i+4>end)throw new Error('Truncated fixed32');visitor(field,wire,null);i+=4;}
 else throw new Error(`Unsupported protobuf wire type ${wire}`);
 }}
function utf8(buf){if(buf.length>1024)throw new Error('Protobuf string too long');try{return new TextDecoder('utf-8',{fatal:true}).decode(buf);}catch{throw new Error('Invalid UTF-8 in protobuf string');}}
function parseNode(buf){let opType='',domain='',name='';fields(buf,0,buf.length,(f,w,v)=>{if(w===2){if(f===4)opType=utf8(v);if(f===7)domain=utf8(v);if(f===3)name=utf8(v);}});return {opType,domain,name};}
function parseOpset(buf){let domain='',version=null;fields(buf,0,buf.length,(f,w,v)=>{if(f===1&&w===2)domain=utf8(v);if(f===2&&w===0)version=v;});return {domain,version};}
function parseGraph(buf){const nodes=[];fields(buf,0,buf.length,(f,w,v)=>{if(f===1&&w===2){if(nodes.length>=10000)throw new Error('ONNX node count exceeded');nodes.push(parseNode(v));}});return nodes;}
export function inspectOnnxBuffer(buf){if(!Buffer.isBuffer(buf)||buf.length<3)throw new Error('Invalid ONNX input');if(buf.length>32*1024*1024)throw new Error('ONNX metadata scan file limit is 32 MiB');
 let foundGraph=false, nodes=[],opsets=[];
 fields(buf,0,buf.length,(f,w,v)=>{if(f===7&&w===2){if(foundGraph)throw new Error('Duplicate graph');foundGraph=true;nodes=parseGraph(v);}if(f===8&&w===2){if(opsets.length>=100)throw new Error('Too many opsets');opsets.push(parseOpset(v));}});
 if(!foundGraph)throw new Error('ONNX model graph field not found');
 if(nodes.some(n=>!n.opType))throw new Error('ONNX node missing op_type');
 const ops=[...new Set(nodes.map(n=>(n.domain?`${n.domain}::`:'')+n.opType))].sort();
 return {format:'onnx',fileBytes:buf.length,operators:ops,nodeCount:nodes.length,opsets,inspection:'protobuf-metadata-only',runtimeExecution:'not_run',semanticValidation:'not_run'};
}
export async function inspectOnnx(file){const st=await lstat(file);if(st.isSymbolicLink()||!st.isFile()||st.size>32*1024*1024)throw new Error('Unsafe or over-limit ONNX inspection input');const buf=await readFile(file);const info=inspectOnnxBuffer(buf);return sealed({schemaVersion:1,kind:'model-inspection',id:String(file).split(/[/\\]/).pop(),sourceFile:String(file).split(/[/\\]/).pop(),sha256:sha256(buf),...info});}
