import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {assert} from '../core/util.mjs';
const safeEq=(a,b)=>{const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y);};
export async function startServer({reports,token,port=0}={}){
 assert(typeof token==='string'&&token.length>=16,'A bearer token of at least 16 characters is required');
 assert(Number.isInteger(port)&&port>=0&&port<65536,'Invalid port');
 const root=fs.realpathSync(reports);assert(fs.statSync(root).isDirectory(),'Reports folder must exist');
 const server=http.createServer((req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Content-Security-Policy',"default-src 'none'; frame-ancestors 'none'");
  const fail=(status,msg)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify({error:msg}));};
  if(req.method!=='GET')return fail(405,'GET only');
  let u;try{u=new URL(req.url,'http://127.0.0.1');}catch{return fail(400,'Invalid URL');}
  if(u.pathname==='/health') {res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify({status:'ok',binding:'localhost'}));}
  if(!safeEq(req.headers.authorization||'',`Bearer ${token}`))return fail(401,'Authentication required');
  if(u.pathname!=='/report')return fail(404,'Unknown endpoint');
  const name=u.searchParams.get('file')||'';
  if(!/^[a-zA-Z0-9_.-]{1,80}\.(json|md|html)$/.test(name)||name.includes('..'))return fail(400,'Invalid report name');
  const file=path.join(root,name);
  try{const st=fs.lstatSync(file);if(!st.isFile()||st.isSymbolicLink()||st.size>2_000_000)return fail(404,'Unavailable');
   const ext=path.extname(name);res.writeHead(200,{'Content-Type':ext==='.json'?'application/json':ext==='.md'?'text/markdown; charset=utf-8':'text/html; charset=utf-8'});fs.createReadStream(file).pipe(res);
  }catch{return fail(404,'Not found');}
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
 return {server,port:server.address().port,host:'127.0.0.1'};
}
