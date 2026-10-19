import { createStore } from './data.js';

(function(){
const CFG=window.STK_CONFIG||{};const $=id=>document.getElementById(id),root=document.documentElement,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const local={get(k,d){try{const v=localStorage.getItem('stk-loja-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('stk-loja-'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const ICON={
 wallet:'M19 7V4a1 1 0 00-1-1H5a2 2 0 000 4h15a1 1 0 011 1v4h-3a2 2 0 000 4h3a1 1 0 001-1v-2a1 1 0 00-1-1M3 5v14a2 2 0 002 2h15a1 1 0 001-1v-4',
 bitcoin:'M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727',
 lock:'M3 11h18v11H3zM7 11V7a5 5 0 0110 0v4',
 eye:'M2.062 12.348a1 1 0 010-.696 10.75 10.75 0 0119.876 0 1 1 0 010 .696 10.75 10.75 0 01-19.876 0M12 15a3 3 0 100-6 3 3 0 000 6z',
 eyeOff:'M10.733 5.076a10.744 10.744 0 0111.205 6.575 1 1 0 010 .696 10.747 10.747 0 01-1.444 2.49M14.084 14.158a3 3 0 01-4.242-4.242M17.479 17.499a10.75 10.75 0 01-15.417-5.151 1 1 0 010-.696 10.75 10.75 0 014.446-5.143M2 2l20 20',
 user:'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
 x:'M18 6L6 18M6 6l12 12',
 feedback:'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
 github:'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
 caixa:'M4 5h16v14H4zM4 10h16M8 15h4',cripto:'M9 8h5a2.5 2.5 0 010 5H9zM9 13h6a2.5 2.5 0 010 5H9zM9 6v14M12 6V4M12 20v-2',
 cambio:'M4 8h13l-3-3M20 16H7l3 3',casa:'M3 11l9-7 9 7v9H3zM9 20v-6h6v6',agenda:'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4M8 14h2M12 14h2',
 predio:'M4 21V5l8-2v18M12 9h8v12M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2',carro:'M5 17h14M6 17l1.5-6h9L18 17M7 11l1-4h8l1 4M8 21v-2M16 21v-2',
 chave:'M15 7a4 4 0 11-3.5 6L5 19.5V22H2v-3l1.5-1.5M14 10h.01',escudo:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',cracha:'M6 3h12v18H6zM10 3v3h4V3M9 16h6M10 11a2 2 0 104 0 2 2 0 00-4 0',
 grafico:'M4 19V5M4 19h16M8 15l4-4 3 3 5-6',loja:'M6 8h12l-1.2 12H7.2zM9 8a3 3 0 016 0',mensagem:'M4 5h16v11H8l-4 4z',
 coracao:'M12 21s-7-4.4-9.3-9A5 5 0 0112 6a5 5 0 019.3 6C19 16.6 12 21 12 21z',foto:'M4 7h4l2-3h4l2 3h4v13H4zM12 17a4 4 0 100-8 4 4 0 000 8z',iot:'M5 12a7 7 0 0114 0M8 12a4 4 0 018 0M12 12v8M9 20h6',
 lamp:'M9 18h6M10 22h4M12 2a7 7 0 00-7 7c0 2.4 1.2 4.5 3 5.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 00-7-7z',alerta:'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z'};
const ST={ok:['ok','Disponível'],beta:['beta','Beta'],lab:['lab','Experimental']};
const CAT_H={'Finanças':212,'Casa':18,'Negócios':328,'Identidade':186};

let SUP={},SUGS=[],supTab='pix',supAmt=10,APPS=[],status='loading',store=null,me=null,NAMES={},deferredInstall=null,swWaiting=null,isAdmin=false,assets=null,RV={},REP={},myId=null,userNS=null,myRevDoc=null,tabApp=null,rvApp=null,rvStars=0,pendingRender=false;
let favs=local.get('favs',[]),rates=local.get('rates',{}),cat=null,q='',tab='geral',auto=null,draft=null,lastDel=null;
const pub=()=>APPS.filter(a=>a.visible!==false);
const byId=id=>APPS.find(a=>a.id===id);
const DAY=864e5,fmt1=n=>n.toFixed(1).replace('.',','),dbr=iso=>{const d=new Date(iso);return isNaN(d)?'':d.toLocaleDateString('pt-BR')};
const isRecent=(a,days)=>!!a.versionAt&&(Date.now()-Date.parse(a.versionAt))<(days||14)*DAY;
const revs=id=>(RV[id]||[]).slice().sort((a,b)=>String(b.at).localeCompare(String(a.at)));
const avg=id=>{const r=RV[id]||[];return r.length?r.reduce((s,x)=>s+(+x.stars||0),0)/r.length:0};
const STAR='M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z';
const sline=n=>'<span class="sline" aria-label="'+fmt1(n)+' de 5 estrelas">'+[1,2,3,4,5].map(k=>'<svg viewBox="0 0 24 24" class="'+(k<=Math.round(n)?'':'off')+'"><path d="'+STAR+'"/></svg>').join('')+'</span>';
const replied=(uid,id)=>!!(REP[uid]&&REP[uid][id]&&REP[uid][id].text);
const cats=()=>{const m=[];pub().forEach(a=>{if(a.cat&&!m.includes(a.cat))m.push(a.cat)});return m};
const catInfo=c=>{const f=pub().find(a=>a.cat===c)||{};return{h:CAT_H[c]!=null?CAT_H[c]:(f.h||210),ic:f.ic||'loja'}};

let tT;function toast(m){$('toastT').textContent=m;$('toast').classList.add('show');clearTimeout(tT);tT=setTimeout(()=>$('toast').classList.remove('show'),2600)}
let sT;function snack(m,undo){$('snackT').textContent=m;lastDel=undo;$('snack').classList.add('show');clearTimeout(sT);sT=setTimeout(()=>{$('snack').classList.remove('show');lastDel=null},6000)}
$('undoBtn').onclick=async()=>{const u=lastDel;$('snack').classList.remove('show');lastDel=null;if(u){try{await u();toast('App restaurado')}catch(e){toast('Não foi possível restaurar')}}};
let onYes=null;function confirmBox(t,p,yes,fn){$('mT').textContent=t;$('mP').textContent=p;$('mYes').textContent=yes;onYes=fn;$('scrim').classList.add('open');$('modal').classList.add('open');setTimeout(()=>$('mNo').focus(),150)}
function closeModal(){$('scrim').classList.remove('open');$('modal').classList.remove('open')}
$('mNo').onclick=closeModal;$('scrim').onclick=()=>{closeModal();closeShare()};$('mYes').onclick=()=>{closeModal();onYes&&onYes()};
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeShare();const lb=$('lb');if(lb)lb.classList.remove('open')}});

const svg=(p,c)=>'<svg'+(c?' class="'+c+'"':'')+' viewBox="0 0 24 24"><path d="'+(p||ICON.loja)+'"/></svg>';
const okId=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{6,64}$/.test(id);
const BLANKGIF='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const imgEl=(id,alt)=>'<img data-img="'+esc(id)+'" alt="'+esc(alt||'')+'" src="'+BLANKGIF+'">';
const aico=(a,s)=>{if(!a)return'';const pv=a._preview,b64=a.iconBase64,id=okId(a.imgId)?a.imgId:'';const hasImg=pv||b64||id;return '<span class="aico'+(hasImg?' img':'')+'" style="--h:'+(+a.h||0)+(s?';--s:'+s+'px':'')+'" aria-hidden="true">'+(pv?'<img src="'+esc(pv)+'" alt="">':b64?'<img src="'+esc(b64)+'" alt="">':id?imgEl(id,''):svg(ICON[a.ic]||ICON.loja))+'</span>'};
function hydrate(root){if(!store)return;(root||document).querySelectorAll('img[data-img]:not([data-done])').forEach(im=>{im.dataset.done='1';store.getImage(im.dataset.img).then(u=>{if(u)im.src=u}).catch(()=>{})})}
new MutationObserver(()=>hydrate()).observe(document.body,{childList:true,subtree:true});
const mini=a=>'<button class="mini" data-app="'+esc(a.id)+'">'+aico(a,60)+'<span class="t"><b>'+esc(a.name)+(isRecent(a)?'<span class="tag new">Atualizado</span>':'')+'</b><small>'+((RV[a.id]||[]).length?'★ '+fmt1(avg(a.id))+' · ':'')+esc(a.short)+'</small></span><span class="get">'+(a.status==='ok'?'Abrir':'Ver')+'</span></button>';
function shelf(title,sub,arr,more){if(!arr.length)return'';const cols=[];for(let i=0;i<arr.length;i+=3)cols.push(arr.slice(i,i+3));
  return '<div class="shelf-h"><div><h2>'+esc(title)+'</h2>'+(sub?'<p>'+esc(sub)+'</p>':'')+'</div>'+(more?'<button class="more" data-cat="'+esc(more)+'">Ver tudo</button>':'')+'</div><div class="hscroll">'+cols.map(c=>'<div class="col">'+c.map(mini).join('')+'</div>').join('')+'</div>'}
const dateStr=()=>new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});
const skel=()=>'<div class="glass list">'+[1,2,3].map(()=>'<div class="mini" style="cursor:default"><span class="sk" style="width:60px;height:60px;border-radius:17px"></span><span class="t" style="gap:6px"><span class="sk" style="height:13px;width:60%"></span><span class="sk" style="height:11px;width:80%"></span></span><span></span></div>').join('')+'</div>';
function gate(){if(status==='loading')return skel();
  if(status==='off')return '<div class="glass state"><span class="bi">'+svg(ICON.loja,'i')+'</span><b>Catálogo indisponível</b><p>Não foi possível conectar ao banco da loja. Verifique a configuração do Firebase.</p></div>';
  if(status==='err')return '<div class="glass state"><span class="bi">'+svg('M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z','i')+'</span><b>Não foi possível carregar</b><p>Recarregue a página em instantes.</p></div>';
  if(!pub().length)return '<div class="glass state"><span class="bi">'+svg(ICON.loja,'i')+'</span><b>Nenhum app publicado ainda</b><p>'+(isAdmin?'Cadastre o primeiro app na Gestão.':'Volte em breve.')+'</p>'+(isAdmin?'<button class="btn" style="margin-top:8px" data-nav="novo">Cadastrar app</button>':'')+'</div>';
  return null}

const V={
 inicio(){const g=gate();if(g)return{eyebrow:dateStr(),title:'Destaques',html:g};
  const st=pub().filter(a=>a.featured);const C=cats();
  return{eyebrow:dateStr(),title:'Destaques',html:
  (st.length?'<div class="hscroll" id="hero">'+st.map(a=>'<button class="story" style="--h:'+(+a.h||0)+'" data-app="'+esc(a.id)+'"><span class="beam"></span><span class="orb o-a"></span><span class="float">'+aico(a)+'</span>'+
   '<span class="cap"><span class="k">'+esc(a.cat||'Destaque')+'</span><span class="h3">'+esc(a.storyTitle||a.name)+'</span><span class="p">'+esc(a.storyText||a.short)+'</span><span class="row">'+aico(a)+'<span class="t"><b>'+esc(a.name)+'</b><small>'+esc(ST[a.status]?ST[a.status][1]:'')+'</small></span><span class="go">'+(a.status==='ok'?'Abrir':'Ver')+'</span></span></span></button>').join('')+'</div>'+
   (st.length>1?'<div class="dots" id="dots">'+st.map((s,i)=>'<button aria-label="Destaque '+(i+1)+'" aria-current="'+(i===0)+'" data-i="'+i+'"></button>').join('')+'</div>':''):'')+
  (()=>{const up=pub().filter(a=>isRecent(a,30)).sort((a,b)=>String(b.versionAt).localeCompare(String(a.versionAt)));return up.length?'<div class="shelf-h"><div><h2>Novidades recentes</h2><p>Apps atualizados nos últimos 30 dias</p></div></div><div class="hscroll">'+up.map(a=>'<button class="upd glass" data-app="'+esc(a.id)+'"><span class="hd">'+aico(a,48)+'<span><b>'+esc(a.name)+'</b><small>'+(a.version?'v'+esc(a.version)+' · ':'')+dbr(a.versionAt)+'</small></span></span><span class="p">'+esc(a.news||a.short)+'</span></button>').join('')+'</div>':''})()+
  C.slice(0,1).map(c=>shelf(c,'',pub().filter(a=>a.cat===c),c)).join('')+
  (pub().some(a=>a.status!=='ok')?'<div class="shelf-h"><div><h2>Coleção</h2></div></div><button class="collection glass" data-cat="__teste"><span><span class="eyebrow">Em teste</span><span class="h3">Experimente antes de todo mundo</span><span class="p">Versões beta e experimentais que ainda estão sendo lapidadas.</span></span><span class="stack">'+pub().filter(a=>a.status!=='ok').slice(0,4).map(a=>aico(a,46)).join('')+'</span></button>':'')+
  C.slice(1).map(c=>shelf(c,'',pub().filter(a=>a.cat===c),c)).join('')+supportCard(),
  after:startHero}},
 apps(){const g=gate();if(g)return{eyebrow:'Catálogo',title:'Apps',html:g};
  const list=cat==='__teste'?pub().filter(a=>a.status!=='ok'):cat?pub().filter(a=>a.cat===cat):pub();
  return{eyebrow:pub().length+' apps Systekna',title:'Apps',html:'<div class="tiles" id="tiles">'+cats().map(c=>{const ci=catInfo(c);return '<button class="tile" style="--h:'+ci.h+'" data-c="'+esc(c)+'" aria-pressed="'+(cat===c)+'">'+svg(ICON[ci.ic])+'<span><b>'+esc(c)+'</b><small>'+pub().filter(a=>a.cat===c).length+' apps</small></span></button>'}).join('')+'</div>'+
  '<div class="shelf-h"><div><h2>'+esc(cat==='__teste'?'Em teste':cat||'Todos os apps')+'</h2><p>'+list.length+' apps</p></div>'+(cat?'<button class="more" id="clr">Mostrar todos</button>':'')+'</div><div class="glass list">'+list.map(mini).join('')+'</div>',
  after(){$('tiles').onclick=e=>{const b=e.target.closest('.tile');if(!b)return;cat=cat===b.dataset.c?null:b.dataset.c;render(true)};if($('clr'))$('clr').onclick=()=>{cat=null;render(true)}}}},
 buscar(){const g=gate();if(g)return{eyebrow:'Encontre o app certo',title:'Buscar',html:g};
  return{eyebrow:'Encontre o app certo',title:'Buscar',html:'<label class="search"><svg class="i" viewBox="0 0 24 24" style="color:var(--faint)"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="q" placeholder="Apps, categorias, recursos" aria-label="Buscar apps" value="'+esc(q)+'" autocomplete="off"></label><div id="res"></div>',
  after(){const inp=$('q'),run=()=>{q=inp.value;const t=q.trim().toLowerCase();
   if(!t){$('res').innerHTML='<div class="shelf-h" style="margin-top:10px"><div><h2>Categorias</h2></div></div><div class="sugs">'+cats().map(s=>'<button class="sug" data-s="'+esc(s)+'">'+esc(s)+'</button>').join('')+'</div>';
    $('res').querySelectorAll('.sug').forEach(b=>b.onclick=()=>{inp.value=b.dataset.s;run()});return}
   const arr=pub().filter(a=>[a.name,a.short,a.cat,a.desc,(a.feats||[]).join(' ')].join(' ').toLowerCase().includes(t));
   $('res').innerHTML=arr.length?'<div class="glass list">'+arr.map(mini).join('')+'</div>':'<div class="glass state"><span class="bi"><svg class="i" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></span><b>Nenhum app para “'+esc(q)+'”</b><p>Tente uma categoria.</p></div>'};
   inp.oninput=run;run()}}},
 biblioteca(){const arr=pub().filter(a=>favs.includes(a.id));
  return{eyebrow:arr.length?arr.length+' favorito'+(arr.length>1?'s':''):'Seus apps',title:'Biblioteca',html:status==='loading'?skel():arr.length?'<div class="glass list">'+arr.map(mini).join('')+'</div>':
  '<div class="glass state"><span class="bi">'+svg(ICON.coracao,'i')+'</span><b>Sua biblioteca está vazia</b><p>Abra um app e toque no coração para guardá-lo aqui.</p><button class="get dark" style="height:44px;padding:0 22px;border:0;cursor:pointer;margin-top:10px" data-nav="inicio">Explorar destaques</button></div>'}},
 app(id){const a=byId(id);if(!a||(a.visible===false&&!isAdmin))return{eyebrow:'',title:'App',sub:true,html:status==='loading'?skel():'<div class="glass state"><b>App não encontrado</b><p>Ele pode ter saído do catálogo.</p></div>'};
  const fav=favs.includes(a.id);
  return{eyebrow:a.cat||'',title:a.name,sub:true,html:(a.visible===false?'<div class="ro">Este app está oculto. Só você vê esta página.</div>':'')+
  '<section class="banner" style="--h:'+(+a.h||0)+'"><span class="beam"></span><div class="hd">'+aico(a)+'<div><h2>'+esc(a.name)+'</h2><span class="dev">Systekna</span><br><span class="badge '+(ST[a.status]||ST.ok)[0]+'"><i></i>'+(ST[a.status]||ST.ok)[1]+'</span>'+(isRecent(a)?' <span class="badge beta"><i></i>Atualizado</span>':'')+'</div></div>'+
  '<div class="cta"><button class="bopen" id="openB">'+(a.status==='ok'?'Abrir app':'Testar versão '+(ST[a.status]||ST.ok)[1].toLowerCase())+'</button><button class="bfav" id="favB" aria-pressed="'+fav+'" aria-label="'+(fav?'Remover dos favoritos':'Adicionar aos favoritos')+'">'+svg(ICON.coracao,'i')+'</button></div>'+
  '<div class="facts"><div><b>'+((RV[a.id]||[]).length?'★ '+fmt1(avg(a.id)):'—')+'</b><small>'+((RV[a.id]||[]).length?(RV[a.id].length+(RV[a.id].length>1?' avaliações':' avaliação')):'Sem avaliações')+'</small></div><div><b>Web · PWA</b><small>Plataforma</small></div><div><b>'+esc(a.version||'—')+'</b><small>Versão</small></div></div></section>'+
  '<div class="acts2">'+
 (a.repoUrl?'<a class="btn sec" href="'+esc(a.repoUrl)+'" target="_blank" rel="noopener">'+svg(ICON.github,'i')+'GitHub</a>':'')+
 '<button class="btn sec" data-share-app="'+esc(a.id)+'">'+svg('M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14','i')+'Compartilhar</button><button class="btn sec" data-nav="apoiar">'+svg(ICON.coracao,'i')+'Apoiar</button></div>'+
  (isAdmin?'<button class="btn sec full" style="margin-top:12px" data-nav="editar-'+esc(a.id)+'">'+svg('M4 20h4L19 9l-4-4L4 16zM14 6l4 4','i')+'Editar este app</button>':'')+
  '<div class="tabs" role="tablist" id="tabs"><span class="ind" id="tind"></span><button role="tab" data-t="geral">Visão geral</button><button role="tab" data-t="priv">Privacidade</button><button role="tab" data-t="aval">Avaliações</button></div><div id="panel"></div>',
  after(){$('favB').onclick=()=>{const on=favs.includes(a.id);favs=on?favs.filter(x=>x!==a.id):favs.concat(a.id);local.set('favs',favs);$('favB').setAttribute('aria-pressed',!on);toast(on?'Removido da biblioteca':'Guardado na biblioteca')};
   $('openB').onclick=()=>{if(/^https:\/\//.test(a.url||'')){const l=document.createElement('a');l.href=a.url;l.target='_blank';l.rel='noopener';l.click()}else toast(isAdmin?'Defina o link deste app na Gestão':'Este app ainda não tem link')};
   $('tabs').onclick=e=>{const b=e.target.closest('[data-t]');if(b){tab=b.dataset.t;panel(a)}};if(tabApp!==a.id){tab='geral';tabApp=a.id}panel(a)}}},
 sobre(){return{eyebrow:'Loja Systekna',title:'Sobre a loja',sub:true,html:'<div class="glass about"><span class="mark" style="display:grid">'+svg(ICON.loja,'i')+'</span><h2>Todos os apps Systekna</h2><p>Abra, favorite e avalie. Os apps rodam direto no navegador e podem ser instalados na tela inicial, como qualquer app.</p>'+
  '<div class="copyline"><code id="mail">'+esc(CFG.contactEmail||'')+'</code><button class="link" id="cpm">Copiar</button></div></div>'+
  supportCard()+'<div class="shelf-h"><div><h2>Compartilhe a loja</h2><p>Mande a Loja Systekna para quem pode gostar dos apps.</p></div></div><button class="btn sec full" data-share-store>'+svg('M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14','i')+'Compartilhar a Loja Systekna</button>'+
  '<div class="shelf-h"><div><h2>Como instalar um app</h2></div></div><ol class="steps glass"><li><span><b>Abra o app</b> pela loja.</span></li><li><span>No Android, toque em <b>⋮ → Instalar app</b>. No iPhone, toque em <b>Compartilhar → Adicionar à Tela de Início</b>.</span></li><li><span>Pronto: ele abre como app, inclusive sem internet.</span></li></ol>'+
  '<div class="shelf-h"><div><h2>Instalar a Loja</h2><p>Tenha a Loja Systekna na tela inicial, como um app.</p></div></div><div class="glass fsec" style="margin-top:0">'+(deferredInstall?'<button class="btn full" id="instB">Instalar a Loja Systekna</button>':matchMedia('(display-mode: standalone)').matches?'<p style="margin:0;color:var(--soft)">A loja já está instalada neste aparelho.</p>':'<p style="margin:0;color:var(--soft)">Use o menu do navegador: <b>Instalar app</b> no Android ou <b>Compartilhar → Adicionar à Tela de Início</b> no iPhone.</p>')+'<p style="margin:0;font:12px var(--mono);color:var(--faint)">Versão '+esc(CFG.appVersion||'')+' · '+(store&&store.mode==='firebase'?'online':'demonstração')+'</p></div>'+
  '<div class="shelf-h"><div><h2>Em breve na Google Play</h2><p>Os apps disponíveis serão publicados também na Google Play, com o nome de desenvolvedor Systekna.</p></div></div>',
  after(){if($('instB'))$('instB').onclick=async()=>{const p=deferredInstall;deferredInstall=null;p.prompt();const r=await p.userChoice;toast(r.outcome==='accepted'?'Instalando a Loja Systekna':'Instalação cancelada');render(true)}}}},

 apoiar(){const ok=supOk(),pix=!!(SUP.pixKey||'').trim(),btc=!!(SUP.btcAddress||'').trim();if(supTab==='btc'&&!btc)supTab='pix';if(supTab==='pix'&&!pix&&btc)supTab='btc';
  return{eyebrow:'Systekna',title:'Apoie a Systekna',sub:true,html:
  '<div class="glass sup-hero"><span class="sup-ic">'+svg(ICON.coracao,'i')+'</span><h2>Os apps são gratuitos</h2><p>'+esc(SUP.message||'Se algum app da Systekna facilita o seu dia, considere apoiar. Toda contribuição ajuda a manter e criar novos apps.')+'</p></div>'+
  (!ok?'<div class="glass state"><b>Doação ainda não disponível</b><p>'+(isAdmin?'Cadastre a chave Pix e o endereço Bitcoin na Gestão.':'Volte em breve.')+'</p>'+(isAdmin?'<button class="btn" data-nav="gestao" style="margin-top:8px">Configurar na Gestão</button>':'')+'</div>':
   ((pix&&btc)?'<div class="segc sup-seg" id="supSeg"><button data-st="pix" aria-pressed="'+(supTab==='pix')+'">Pix</button><button data-st="btc" aria-pressed="'+(supTab==='btc')+'">Bitcoin</button></div>':'')+
   '<div id="supBox"></div>'),
  after(){if(!ok)return;const draw=()=>{$('supBox').innerHTML=supTab==='pix'?pixBox():btcBox();bindSupBox()};
   if($('supSeg'))$('supSeg').onclick=e=>{const b=e.target.closest('[data-st]');if(!b)return;supTab=b.dataset.st;$('supSeg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()};draw()}}},
 conta(){const demo=store&&store.mode==='demo';
  if(!me)return{eyebrow:'Autenticação',title:'Minha conta',sub:true,html:
   '<div class="glass about" style="text-align:left;max-width:440px;margin:0 auto">'+
   '<div style="text-align:center"><span class="mark" style="display:inline-grid;margin:0 auto 12px">'+svg(ICON.escudo,'i')+'</span>'+
   '<h2>Entre na Loja Systekna</h2><p style="color:var(--soft);font-size:14px">Acesse como Administrador para gerenciar os apps ou como Visitante para avaliar.</p></div>'+
   '<div class="feed-box" style="margin-top:14px;background:var(--surface)">'+
   '<b style="font-size:15px;display:flex;align-items:center;gap:6px">'+svg(ICON.lock,'i')+'Acesso do Gestor / Administrador</b>'+
   '<div class="fld"><span class="lbl"><span>E-mail</span></span><input type="email" id="authEmail" placeholder="admin@systekna.com.br" value="admin@systekna.com.br"></div>'+
   '<div class="fld"><span class="lbl"><span>PIN ou Senha</span></span>'+
   '<div class="pass-box"><input type="password" id="authPass" placeholder="Digite o PIN (ex: 123456)"><button type="button" class="pass-btn" id="passToggle" aria-label="Mostrar senha">'+svg(ICON.eye)+'</button></div></div>'+
   '<button class="btn full" id="authBtn" style="margin-top:6px">'+svg(ICON.lock,'i')+'Entrar como Administrador</button>'+
   '</div>'+
   '<div class="feed-box" style="margin-top:12px;background:var(--surface)">'+
   '<b style="font-size:15px;display:flex;align-items:center;gap:6px">'+svg(ICON.user,'i')+'Acesso Rápido de Visitante</b>'+
   '<p style="color:var(--soft);font-size:13px;margin:0">Avalie e favorite apps informando apenas seu nome ou apelido:</p>'+
   '<div class="fld"><input type="text" id="guestName" placeholder="Seu nome ou apelido" maxlength="30"></div>'+
   '<button class="btn sec full" id="guestBtn">'+svg(ICON.user,'i')+'Entrar como Visitante</button>'+
   '</div>'+
   '<div style="text-align:center;margin-top:16px"><p style="font-size:12px;color:var(--faint);margin-bottom:8px">Ou use autenticação Google federada:</p>'+
   '<button class="btn sec full" data-signin>'+svg('M21 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.1a4.4 4.4 0 01-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1zM12 21c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4c-.8.6-1.9.9-3.2.9-2.5 0-4.6-1.7-5.3-3.9H3.5v2.5A9.5 9.5 0 0012 21z','i')+'Entrar com Google</button></div></div>',
   after(){
     const pIn=$('authPass'),pBtn=$('passToggle');
     if(pBtn&&pIn){
       pBtn.onclick=()=>{
         const isPass=pIn.type==='password';
         pIn.type=isPass?'text':'password';
         pBtn.setAttribute('aria-label',isPass?'Ocultar senha':'Mostrar senha');
         pBtn.innerHTML=svg(isPass?ICON.eyeOff:ICON.eye);
       };
     }
     if($('authBtn'))$('authBtn').onclick=async()=>{
       const email=($('authEmail').value||'').trim(),pass=($('authPass').value||'').trim();
       if(!pass){toast('Informe o PIN ou senha');return}
       $('authBtn').disabled=true;
       try{
         await store.signInWithCredentials(email,pass);
         toast('Autenticado com sucesso!');
         if(isAdmin)location.hash='#gestao';else render(true);
       }catch(e){
         toast('Falha na autenticação: '+(e&&e.message||'Credenciais incorretas'));
         $('authBtn').disabled=false;
       }
     };
     if($('guestBtn'))$('guestBtn').onclick=async()=>{
       const n=($('guestName').value||'').trim();
       if(n.length<2){toast('Informe ao menos 2 letras');return}
       await store.signInAsGuest(n);
       toast('Bem-vindo, '+n+'!');
       render(true);
     };
   }};
  return{eyebrow:demo?'Modo local-first':'Sua conta',title:'Minha conta',sub:true,html:'<div class="glass about">'+(me.photo&&/^https:\/\//.test(me.photo)?'<img src="'+esc(me.photo)+'" alt="" style="width:72px;height:72px;border-radius:50%;margin:0 auto 12px;display:block">':'<span class="mark" style="display:grid">'+svg(ICON.user,'i')+'</span>')+'<h2>'+esc(me.name||'Usuário')+'</h2>'+(me.email?'<p>'+esc(me.email)+'</p>':'')+'<p><span class="badge '+(isAdmin?'beta':'ok')+'"><i></i>'+(isAdmin?'Administrador':'Visitante')+'</span></p>'+
   (demo?'<p style="margin-top:12px;font-size:13px;color:var(--soft)">Você está no modo demonstração/local-first: dados persistidos no navegador.</p>':'')+
   '<div class="mrow" style="margin-top:18px"><button class="btn sec" id="outB">Sair da conta</button>'+(isAdmin?'<button class="btn" data-nav="gestao">Abrir Gestão</button>':'')+'</div></div>'+
   (demo&&isAdmin?'<div class="shelf-h"><div><h2>Dados da demonstração</h2></div></div><div class="glass fsec" style="margin-top:0"><button class="btn sec full" id="seedDemo">Restaurar catálogo inicial</button><button class="btn danger full" id="resetDemo">Apagar tudo e recomeçar</button></div>':''),
   after(){if($('outB'))$('outB').onclick=async()=>{await store.signOut();toast('Você saiu da conta');go('inicio')};
    if($('seedDemo'))$('seedDemo').onclick=async()=>{await store.seed();toast('Catálogo inicial restaurado')};
    if($('resetDemo'))$('resetDemo').onclick=()=>confirmBox('Apagar a demonstração?','Catálogo, imagens e avaliações deste aparelho serão apagados.','Apagar',async()=>{await store.resetDemo();location.hash='';location.reload()})}}},

 /* ---------- GESTÃO ---------- */
 gestao(){if(!isAdmin)return noAccess();
  const all=APPS,vis=all.filter(a=>a.visible!==false).length,fe=all.filter(a=>a.featured).length;
  return{eyebrow:'Administrador',title:'Gestão',html:
  '<div class="stats"><div class="glass stat"><small>Apps</small><b>'+all.length+'</b></div><div class="glass stat"><small>Publicados</small><b>'+vis+'</b></div><div class="glass stat"><small>Avaliações</small><b>'+Object.keys(RV).reduce((n,k)=>n+RV[k].length,0)+'</b></div></div>'+
  '<div class="shelf-h"><div><h2>Catálogo</h2><p>Toque num app para editar. A ordem vale para toda a loja.</p></div><button class="btn" data-nav="novo">'+svg('M12 5v14M5 12h14','i')+'Novo app</button></div>'+
  (status==='loading'?skel():all.length?'<div class="glass list" id="alist">'+all.map((a,i)=>'<div class="arow'+(a.visible===false?' off':'')+'">'+
    '<button class="mini-b" style="width:auto;height:auto;border:0;background:none;padding:0" data-nav="editar-'+esc(a.id)+'" aria-label="Editar '+esc(a.name)+'">'+aico(a,48)+'</button>'+
    '<button class="t" style="border:0;background:none;text-align:left;cursor:pointer;padding:0" data-nav="editar-'+esc(a.id)+'"><b>'+esc(a.name)+'</b><small><span class="tag '+(ST[a.status]||ST.ok)[0]+'">'+(ST[a.status]||ST.ok)[1]+'</span>'+(a.featured?'<span class="tag star">Destaque</span>':'')+'<span>'+esc(a.cat)+'</span>'+(a.version?'<span>· v'+esc(a.version)+'</span>':'')+(a.url?'':'<span>· sem link</span>')+'</small></button>'+
    '<span class="ctl"><button class="mini-b" data-mv="'+i+'" data-d="-1" aria-label="Subir" '+(i===0?'disabled':'')+'>'+svg('M12 19V5M6 11l6-6 6 6','i')+'</button><button class="mini-b" data-mv="'+i+'" data-d="1" aria-label="Descer" '+(i===all.length-1?'disabled':'')+'>'+svg('M12 5v14M6 13l6 6 6-6','i')+'</button>'+
    '<button class="sw" role="switch" data-vis="'+esc(a.id)+'" aria-checked="'+(a.visible!==false)+'" aria-label="Publicado na loja"></button></span></div>').join('')+'</div>':
   '<div class="glass state"><b>Catálogo vazio</b><p>Cadastre o primeiro app ou importe o catálogo inicial da Systekna.</p><button class="btn sec" id="seedB" style="margin-top:8px">Importar catálogo inicial</button></div>')+
  (()=>{const L=[];Object.keys(RV).forEach(k=>{const ap=byId(k);if(ap)RV[k].forEach(r=>L.push(Object.assign({app:ap},r)))});L.sort((x,y)=>String(y.at).localeCompare(String(x.at)));const pend=L.filter(r=>!replied(r.uid,r.app.id)).length;
   return '<div class="shelf-h"><div><h2>Avaliações recentes</h2><p>'+(L.length?(pend?pend+' sem resposta':'Todas respondidas'):'Nenhuma avaliação ainda')+'</p></div></div>'+(L.length?'<div class="glass list">'+L.slice(0,12).map(r=>{const done=replied(r.uid,r.app.id);return '<button class="arow rvrow" data-rvgo="'+esc(r.app.id)+'">'+aico(r.app,40)+'<span class="t"><b>'+esc(r.app.name)+'</b><small>'+sline(r.stars)+'<span>'+dbr(r.at)+'</span></small>'+(r.text?'<small style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px">'+esc(r.text)+'</small>':'')+'</span><span class="tag '+(done?'ok':'lab')+'">'+(done?'Respondida':'Responder')+'</span></button>'}).join('')+'</div>':'')})()+(()=>{
    const L=SUGS.slice().sort((x,y)=>String(y.criadoEm||y.at||'').localeCompare(String(x.criadoEm||x.at||'')));
    const pend=L.filter(s=>!s.lida).length;
    return '<div class="shelf-h"><div><h2>Sugestões e Feedbacks (Base da Systekna)</h2><p>'+(L.length?(pend?pend+' não lida(s)':'Todas marcadas como lidas'):'Nenhuma sugestão recebida ainda')+'</p></div></div>'+
     (L.length?'<div class="glass list" id="sugList">'+L.slice(0,16).map(s=>{
       const ap=byId(s.app)||{name:s.app||"Geral"};
       return '<div class="arow" style="align-items:flex-start;padding:12px 14px;gap:12px">'+
         '<div style="flex:1;min-width:0"><b>'+esc(ap.name)+'</b> <span class="tag '+(s.tipo||'sugestao')+'">'+esc(s.tipo||'sugestão')+'</span>'+
         (s.lida?'':' <span class="tag lab">Nova</span>')+
         '<p style="margin:4px 0;font-size:13px;color:var(--ink)">'+esc(s.texto)+'</p>'+
         '<small style="color:var(--faint)">'+dbr(s.criadoEm||s.at)+(s.email?' · '+esc(s.email):'')+'</small></div>'+
         '<div class="ctl" style="flex-direction:column;gap:6px">'+
         '<button class="btn sec" style="height:32px;padding:0 10px;font-size:12px" data-sug-lida="'+esc(s.id)+'">'+(s.lida?'Não lida':'Lida')+'</button>'+
         '<button class="mini-b" data-sug-del="'+esc(s.id)+'" aria-label="Excluir">'+svg(ICON.x,'i')+'</button></div>'+
         '</div>';
     }).join('')+'</div>':'');
  })()+supportAdmin(),
  after(){bindSupportAdmin();
   const SL=$('sugList');if(SL){
     SL.onclick=async e=>{
       const bL=e.target.closest('[data-sug-lida]');
       if(bL){const id=bL.dataset.sugLida,s=SUGS.find(x=>x.id===id);if(s){await store.updateSuggestion(id,{lida:!s.lida});toast(s.lida?'Marcada como não lida':'Marcada como lida')}return}
       const bD=e.target.closest('[data-sug-del]');
       if(bD){const id=bD.dataset.sugDel;confirmBox('Excluir sugestão?','Esta mensagem será apagada permanentemente.','Excluir',async()=>{await store.deleteSuggestion(id);toast('Sugestão excluída')})}
     };
   };if($('seedB'))$('seedB').onclick=async()=>{$('seedB').disabled=true;try{await store.seed();toast('Catálogo inicial importado')}catch(err){toast(errMsg(err));$('seedB').disabled=false}};
   const L=$('alist');if(!L)return;L.onclick=async e=>{
    const v=e.target.closest('[data-vis]');if(v){const a=byId(v.dataset.vis),nv=a.visible===false;v.setAttribute('aria-checked',nv);v.disabled=true;
      try{await store.updateApp(a.id,{visible:nv,updatedAt:new Date().toISOString()});toast(nv?a.name+' publicado':a.name+' oculto da loja')}catch(err){v.setAttribute('aria-checked',!nv);toast(errMsg(err))}v.disabled=false;return}
    const m=e.target.closest('[data-mv]');if(m){const i=+m.dataset.mv,j=i+(+m.dataset.d),A=APPS[i],B=APPS[j];if(!B)return;
      L.querySelectorAll('[data-mv]').forEach(b=>b.disabled=true);
      try{await normalizeOrder();const oa=A.order,ob=B.order;await store.updateApp(A.id,{order:ob});await store.updateApp(B.id,{order:oa})}catch(err){toast(errMsg(err));render(true)}}}}}},
 novo(){return form(null)},
 editar(id){return form(byId(id)||'missing')}
};
/* ---------- compartilhar ---------- */
const shareBase=()=>location.origin+location.pathname;
function openShare(title,text,url){closeShare();const full=text+'\n'+url;const can=!!navigator.share;
  const el=document.createElement('div');el.className='sheetx';el.id='shareSheet';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Compartilhar');
  el.innerHTML='<div class="grab"></div><h3>'+esc(title)+'</h3><div class="shprev"><b>'+esc(text)+'</b><small>'+esc(url)+'</small></div>'+
   '<div class="shgrid"><a class="shopt wa" href="https://wa.me/?text='+encodeURIComponent(full)+'" target="_blank" rel="noopener"><span>'+svg('M3 21l1.6-4.8A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.2-1.1zM8.5 9.5c.3 2.5 2.6 5 5.5 5.6l1.3-1.3 2 .9c-.3 1.3-1.4 2-2.7 1.8C10.8 16 8 13.2 7.6 9.4 7.5 8.1 8.2 7 9.5 6.7l.9 2z','i')+'</span>WhatsApp</a>'+
   '<button class="shopt" data-sh="copy"><span>'+svg('M8 8h11v13H8zM5 16V3h11','i')+'</span>Copiar link</button>'+
   (can?'<button class="shopt" data-sh="more"><span>'+svg('M5 12h.01M12 12h.01M19 12h.01','i')+'</span>Mais opções</button>':'')+'</div>'+
   '<button class="btn sec full" data-sh="close">Fechar</button>';
  document.body.appendChild(el);$('scrim').classList.add('open');requestAnimationFrame(()=>el.classList.add('open'));
  el.onclick=async e=>{const b=e.target.closest('[data-sh]');if(e.target.closest('.wa')){setTimeout(closeShare,300);return}if(!b)return;const k=b.dataset.sh;
    if(k==='close')closeShare();
    else if(k==='copy'){try{await navigator.clipboard.writeText(url);toast('Link copiado')}catch(_){const sm=el.querySelector('.shprev small');const r=document.createRange();r.selectNodeContents(sm);const se=getSelection();se.removeAllRanges();se.addRange(r);toast('Link selecionado. Copie manualmente.')}}
    else if(k==='more'){try{await navigator.share({title,text,url});closeShare()}catch(_){}}};
  const wa=el.querySelector('.wa');if(wa)wa.focus()}
function closeShare(){const el=$('shareSheet');if(!el)return;el.classList.remove('open');if(!$('modal').classList.contains('open'))$('scrim').classList.remove('open');setTimeout(()=>el.remove(),300)}

/* ---------- apoio (Pix e Bitcoin) ---------- */
const supOk=()=>!!((SUP.pixKey||'').trim()||(SUP.btcAddress||'').trim());
function supportCard(){if(!supOk()&&!isAdmin)return'';return '<div class="shelf-h"><div><h2>Apoie a Systekna</h2></div></div><button class="collection glass sup-card" data-nav="apoiar"><span><span class="eyebrow" style="color:var(--accent)">Pix ou Bitcoin</span><span class="h3" style="display:block;margin:6px 0 4px;font:650 19px/1.2 var(--font);letter-spacing:-.025em">Gostou dos apps? Ajude a manter</span><span class="p" style="display:block;color:var(--soft);font-size:14px">Os apps são gratuitos. Toda contribuição ajuda a criar os próximos.</span></span><span class="sup-ic">'+svg(ICON.coracao,'i')+'</span></button>'}
const asciiPix=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9 .\-]/g,'').toUpperCase().trim();
const emv=(id,v)=>id+String(v.length).padStart(2,'0')+v;
function crc16(t){let c=0xFFFF;for(let i=0;i<t.length;i++){c^=t.charCodeAt(i)<<8;for(let j=0;j<8;j++)c=(c&0x8000)?((c<<1)^0x1021)&0xFFFF:(c<<1)&0xFFFF}return c.toString(16).toUpperCase().padStart(4,'0')}
function pixPayload(o){const ma=emv('00','br.gov.bcb.pix')+emv('01',String(o.key).trim());
  let p=emv('00','01')+emv('26',ma)+emv('52','0000')+emv('53','986')+(o.amount>0?emv('54',o.amount.toFixed(2)):'')+emv('58','BR')+emv('59',asciiPix(o.name).slice(0,25)||'SYSTEKNA')+emv('60',asciiPix(o.city).slice(0,15)||'SAO PAULO')+emv('62',emv('05','***'))+'6304';
  return p+crc16(p)}
function qrSvg(text){try{const q=qrcode(0,'M');q.addData(text);q.make();return q.createSvgTag({cellSize:4,margin:2,scalable:true})}catch(e){return ''}}
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function pixBox(){const code=pixPayload({key:SUP.pixKey,name:SUP.pixName,city:SUP.pixCity,amount:supAmt});
  return '<div class="glass sup-box"><div class="lbl2">Escolha um valor</div><div class="amts" id="amts">'+[5,10,20,50].map(v=>'<button class="cx2" data-amt="'+v+'" aria-pressed="'+(supAmt===v)+'">'+brl(v)+'</button>').join('')+'<button class="cx2" data-amt="0" aria-pressed="'+(supAmt===0)+'">Livre</button></div>'+
   '<div class="qr">'+qrSvg(code)+'</div><p class="qcap">'+(supAmt?'Pix de '+brl(supAmt):'Valor livre: você escolhe no app do banco')+' para <b>'+esc(SUP.pixName||'Systekna')+'</b></p>'+
   '<div class="lbl2">Pix copia e cola</div><div class="codebox" id="pixCode">'+esc(code)+'</div><button class="btn full" data-copy="pix">'+svg('M8 8h11v13H8zM5 16V3h11','i')+'Copiar código Pix</button>'+
   '<p class="note2">Abra o app do seu banco, escolha Pix e leia o QR code ou cole o código.</p></div>'}
function btcBox(){const ad=(SUP.btcAddress||'').trim();
  return '<div class="glass sup-box"><div class="qr">'+qrSvg('bitcoin:'+ad)+'</div><p class="qcap">Endereço Bitcoin da Systekna</p><div class="codebox" id="btcCode">'+esc(ad)+'</div><button class="btn full" data-copy="btc">'+svg('M8 8h11v13H8zM5 16V3h11','i')+'Copiar endereço</button>'+
   '<p class="note2">Envie apenas Bitcoin (BTC) na rede principal. Confira os primeiros e os últimos caracteres do endereço antes de confirmar.</p></div>'}
function bindSupBox(){const B=$('supBox');B.onclick=async e=>{const a=e.target.closest('[data-amt]');if(a){supAmt=+a.dataset.amt;B.innerHTML=pixBox();return}
  const c=e.target.closest('[data-copy]');if(!c)return;const el=$(c.dataset.copy==='pix'?'pixCode':'btcCode');
  try{await navigator.clipboard.writeText(el.textContent);toast(c.dataset.copy==='pix'?'Código Pix copiado':'Endereço copiado')}catch(_){const r=document.createRange();r.selectNodeContents(el);const se=getSelection();se.removeAllRanges();se.addRange(r);toast('Texto selecionado. Copie manualmente.')}}}
function supportAdmin(){if(!isAdmin)return'';const f=(id,l,v,ph,extra)=>'<label class="fld" id="f-'+id+'"><span class="lbl"><span>'+l+'</span></span><input type="text" id="s-'+id+'" value="'+esc(v||'')+'" placeholder="'+esc(ph)+'" autocomplete="off">'+(extra||'')+'</label>';
  return '<div class="shelf-h"><div><h2>Apoio (Pix e Bitcoin)</h2><p>'+(supOk()?'Ativo na loja':'Ainda não configurado')+'</p></div></div><form class="glass fsec" id="supForm" style="margin-top:0" novalidate>'+
   f('pixKey','Chave Pix',SUP.pixKey,'e-mail, telefone, CPF/CNPJ ou chave aleatória')+
   '<div class="pair">'+f('pixName','Nome do recebedor',SUP.pixName,'Celso A Leite')+f('pixCity','Cidade',SUP.pixCity,'Sao Paulo')+'</div>'+
   f('btcAddress','Endereço Bitcoin',SUP.btcAddress,'bc1q...','<span class="err">Endereço Bitcoin inválido.</span>')+
   '<label class="fld"><span class="lbl"><span>Mensagem da página de apoio</span></span><textarea id="s-message" maxlength="240" placeholder="Se algum app facilita o seu dia, considere apoiar.">'+esc(SUP.message||'')+'</textarea></label>'+
   '<p class="hint" style="margin:0">Deixe em branco o que não quiser oferecer. O código Pix é gerado no padrão do Banco Central com nome e cidade do recebedor.</p>'+
   '<div class="factions" style="margin-top:0"><button type="button" class="btn sec" data-nav="apoiar">Ver página</button><button type="submit" class="btn" id="supSave">Salvar apoio</button></div></form>'}
function bindSupportAdmin(){const F=$('supForm');if(!F)return;F.onsubmit=async e=>{e.preventDefault();
  const v=k=>($('s-'+k).value||'').trim();const btc=v('btcAddress');const okB=!btc||/^(bc1[ac-hj-np-z02-9]{11,71}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(btc);
  $('f-btcAddress').classList.toggle('bad',!okB);if(!okB){$('s-btcAddress').focus();return}
  const body={pixKey:v('pixKey').slice(0,77),pixName:v('pixName').slice(0,25),pixCity:v('pixCity').slice(0,15),btcAddress:btc,message:v('message').slice(0,240),updatedAt:new Date().toISOString()};
  $('supSave').disabled=true;try{await store.setSettings(body);toast('Apoio salvo')}catch(err){toast(errMsg(err))}$('supSave').disabled=false}}

function noAccess(){return{eyebrow:'',title:'Gestão',sub:true,html:'<div class="glass state"><span class="bi">'+svg('M5 11h14v10H5zM8 11V7a4 4 0 018 0v4','i')+'</span><b>Área do administrador</b><p>Só o dono da loja pode cadastrar e editar apps.</p></div>'}}
function errMsg(e){const c=e&&e.code;return c==='quota'?'Espaço do navegador cheio. Apague dados da demonstração.':c==='permission'?'Sem permissão. Entre com a conta de administrador.':c==='offline'?'Sem conexão. Tente de novo quando estiver online.':c==='too_large'?'Imagem grande demais.':'Não foi possível salvar. Tente de novo.'}
async function normalizeOrder(){for(let k=0;k<APPS.length;k++){const a=APPS[k];if(a.order!==k+1){await store.updateApp(a.id,{order:k+1});a.order=k+1}}}

/* ---------- formulário ---------- */
const BLANK={imgId:'',name:'',short:'',cat:'',status:'ok',desc:'',feats:[],url:'',data:'Fica no aparelho',h:212,ic:'loja',version:'',news:'',visible:true,featured:false,storyTitle:'',storyText:''};
function form(a){if(!isAdmin)return noAccess();
  if(a==='missing')return{eyebrow:'Gestão',title:'Editar app',sub:true,html:status==='loading'?skel():'<div class="glass state"><b>App não encontrado</b><p>Ele pode ter sido excluído.</p><button class="btn sec" data-nav="gestao">Voltar à Gestão</button></div>'};
  const isNew=!a;draft=Object.assign({},BLANK,a?JSON.parse(JSON.stringify(a)):{});draft.feats=Array.isArray(draft.feats)?draft.feats:[];draft.shots=(Array.isArray(draft.shots)?draft.shots:[]).filter(x=>x&&x.id).map(x=>({id:x.id}));
  const C=Array.from(new Set(Object.keys(CAT_H).concat(APPS.map(x=>x.cat).filter(Boolean))));
  const catOpts=C.map(c=>'<option'+(c===draft.cat?' selected':'')+'>'+esc(c)+'</option>').join('')+'<option value="__nova"'+(draft.cat&&!C.includes(draft.cat)?' selected':'')+'>Nova categoria…</option>';
  const fld=(id,label,inner,extra)=>'<label class="fld" id="f-'+id+'"><span class="lbl"><span>'+label+'</span>'+(extra||'')+'</span>'+inner+'</label>';
  return{eyebrow:isNew?'Gestão · novo app':'Gestão · editar',title:isNew?'Novo app':draft.name,sub:true,html:
  '<div class="glass preview" id="pv"></div>'+
  '<form id="af" novalidate>'+
  '<section class="glass fsec"><h3>Identidade<small>Como o app aparece na vitrine</small></h3>'+
   fld('name','Nome','<input type="text" id="i-name" maxlength="30" value="'+esc(draft.name)+'" placeholder="Ex.: Livro-Caixa" autocomplete="off"><span class="err">Dê um nome com pelo menos 2 letras.</span>','<span class="cnt" id="c-name"></span>')+
   fld('short','Descrição curta','<input type="text" id="i-short" maxlength="80" value="'+esc(draft.short)+'" placeholder="Ex.: Receitas, despesas, cartão e dívidas" autocomplete="off"><span class="err">Escreva uma frase curta sobre o app.</span>','<span class="cnt" id="c-short"></span>')+
   '<div class="pair">'+fld('cat','Categoria','<select id="i-cat">'+catOpts+'</select>')+fld('newcat','Nova categoria','<input type="text" id="i-newcat" maxlength="24" value="'+esc(draft.cat&&!C.includes(draft.cat)?draft.cat:'')+'" placeholder="Ex.: Saúde"><span class="err">Informe o nome da categoria.</span>')+'</div>'+
   '<div class="fld"><span class="lbl"><span>Status</span></span><div class="segc" id="i-status">'+Object.keys(ST).map(k=>'<button type="button" data-s="'+k+'" aria-pressed="'+(draft.status===k)+'">'+ST[k][1]+'</button>').join('')+'</div></div></section>'+
  '<section class="glass fsec"><h3>Visual<small>Sua imagem ou um ícone da galeria</small></h3>'+
   '<div class="fld"><span class="lbl"><span>Ícone personalizado</span></span><div class="upbox"><span id="upPrev"></span><div><div class="acts">'+(assets?'<label class="btn sec" style="cursor:pointer">'+svg('M12 21V9M7 14l5-5 5 5M5 3h14','i')+'Escolher imagem<input type="file" id="i-file" class="vis" accept="image/png,image/jpeg,image/webp,image/svg+xml"></label><button type="button" class="btn sec" id="rmImg"'+(draft.imgId?'':' hidden')+'>Remover</button>':'<span class="hint">Envio de imagem indisponível neste acesso.</span>')+'</div><p>PNG, JPG, WebP ou SVG. A imagem é recortada em quadrado.</p></div></div></div>'+
   '<div class="fld"><span class="lbl"><span>Cor</span><span class="cnt" id="c-h"></span></span><input type="range" class="hue" id="i-h" min="0" max="359" value="'+(+draft.h||0)+'" aria-label="Cor do app"></div>'+
   '<div class="fld" id="galBox"><span class="lbl"><span>Ou escolha da galeria</span><span class="hint">usado quando não há imagem</span></span><div class="icgrid" id="i-ic">'+Object.keys(ICON).map(k=>'<button type="button" data-ic="'+k+'" aria-pressed="'+(draft.ic===k)+'" aria-label="Ícone '+k+'">'+svg(ICON[k])+'</button>').join('')+'</div></div></section>'+
  '<section class="glass fsec"><h3>Telas do app<small>Prints que aparecem na página do app (até 8)</small></h3><div class="shotgrid" id="shotGrid"></div>'+(assets?'':'<span class="hint">Envio de imagens indisponível neste acesso.</span>')+'</section>'+
  '<section class="glass fsec"><h3>Conteúdo<small>Página do app</small></h3>'+
   fld('desc','Descrição completa','<textarea id="i-desc" maxlength="1200" placeholder="O que o app faz e para quem é">'+esc(draft.desc)+'</textarea>','<span class="cnt" id="c-desc"></span>')+
   fld('feats','Recursos <span class="hint">(um por linha)</span>','<textarea id="i-feats" placeholder="Lançamentos com categorias&#10;Modo claro e escuro">'+esc(draft.feats.join('\n'))+'</textarea>')+
   fld('data','Onde ficam os dados','<input type="text" id="i-data" maxlength="60" value="'+esc(draft.data)+'" placeholder="Ex.: Fica no aparelho">')+'</section>'+
  '<section class="glass fsec"><h3>Publicação<small>Link, versão e novidades</small></h3>'+
   fld('url','Link do app (PWA / Web)','<input type="url" id="i-url" value="'+esc(draft.url)+'" placeholder="https://celsoalmeidalf.github.io/livro-caixa/" autocomplete="off" inputmode="url"><span class="err">Use um endereço que comece com https://</span>')+
   fld('repoUrl','Repositório no GitHub','<input type="url" id="i-repoUrl" value="'+esc(draft.repoUrl||'')+'" placeholder="https://github.com/CelsoAlmeidaLF/..." autocomplete="off">')+
   '<div class="pair">'+fld('version','Versão','<input type="text" id="i-version" maxlength="16" value="'+esc(draft.version)+'" placeholder="Ex.: 1.2.0">')+'<div class="fld"><span class="lbl"><span>Na loja</span></span><div class="togrow" style="min-height:46px"><span>Publicado<small>Visível para todos</small></span><button type="button" class="sw" role="switch" id="i-visible" aria-checked="'+(draft.visible!==false)+'" aria-label="Publicado na loja"></button></div></div></div>'+
   fld('news','Novidades desta versão','<textarea id="i-news" maxlength="600" placeholder="O que mudou nesta versão">'+esc(draft.news)+'</textarea>')+'</section>'+
  '<section class="glass fsec"><h3>Destaque<small>Card grande no carrossel da página inicial</small></h3>'+
   '<div class="togrow"><span>Mostrar nos destaques</span><button type="button" class="sw" role="switch" id="i-featured" aria-checked="'+!!draft.featured+'" aria-label="Mostrar nos destaques"></button></div>'+
   '<div id="storyBox"'+(draft.featured?'':' hidden')+' style="display:grid;gap:16px">'+fld('storyTitle','Título do destaque','<input type="text" id="i-storyTitle" maxlength="48" value="'+esc(draft.storyTitle)+'" placeholder="Ex.: Seu dinheiro, sob controle">','<span class="cnt" id="c-storyTitle"></span>')+
   fld('storyText','Chamada','<input type="text" id="i-storyText" maxlength="120" value="'+esc(draft.storyText)+'" placeholder="Uma frase que convide a abrir o app">')+'</div></section>'+
  '<div class="factions"><button type="button" class="btn sec" id="cancelB">Cancelar</button><button type="submit" class="btn" id="saveB">'+(isNew?'Cadastrar app':'Salvar alterações')+'</button>'+(isNew?'':'<button type="button" class="btn danger del" id="delB">Excluir app</button>')+'</div></form>',
  after(){bindForm(isNew,a)}}}
function squareBlob(file){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();
  im.onload=()=>{const S=384,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');const w=im.naturalWidth||S,h=im.naturalHeight||S,m=Math.min(w,h);
    x.drawImage(im,(w-m)/2,(h-m)/2,m,m,0,0,S,S);URL.revokeObjectURL(u);c.toBlob(b=>b?res(b):rej(),'image/png')};
  im.onerror=()=>{URL.revokeObjectURL(u);rej()};im.src=u})}
function fitBlob(file,max){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();
  im.onload=()=>{let w=im.naturalWidth,h=im.naturalHeight;const k=Math.min(1,max/Math.max(w,h));w=Math.round(w*k);h=Math.round(h*k);const c=document.createElement('canvas');c.width=w;c.height=h;
    c.getContext('2d').drawImage(im,0,0,w,h);URL.revokeObjectURL(u);c.toBlob(b=>b?res(b):rej(),'image/jpeg',.86)};
  im.onerror=()=>{URL.revokeObjectURL(u);rej()};im.src=u})}
function slug(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'app'}
function bindForm(isNew,orig){const F=$('af');
  const pv=()=>{const st=ST[draft.status]||ST.ok;$('upPrev').innerHTML=aico(draft);$('pv').innerHTML=aico(draft,64)+'<span class="t"><b>'+esc(draft.name||'Nome do app')+'</b><small>'+esc(draft.short||'Descrição curta')+'</small><small style="margin-top:4px"><span class="tag '+st[0]+'">'+st[1]+'</span> '+(draft.visible===false?'<span class="tag">Oculto</span>':'')+(draft.featured?' <span class="tag star">Destaque</span>':'')+'</small></span>';
    [['name',30],['short',80],['desc',1200],['storyTitle',48]].forEach(([k,m])=>{const c=$('c-'+k);if(c){const n=(draft[k]||'').length;c.textContent=n+'/'+m}});$('c-h').textContent=draft.h+'°'};
  const catSync=()=>{const nv=$('i-cat').value==='__nova';$('f-newcat').hidden=!nv;draft.cat=nv?$('i-newcat').value.trim():$('i-cat').value};
  F.addEventListener('input',e=>{const t=e.target;if(!t.id||!t.id.startsWith('i-'))return;const k=t.id.slice(2);if(k==='file'||k==='shots')return;
    if(k==='h')draft.h=+t.value;else if(k==='feats')draft.feats=t.value.split('\n').map(s=>s.trim()).filter(Boolean);else if(k==='cat'||k==='newcat')catSync();else draft[k]=t.value;
    const f=$('f-'+k);if(f)f.classList.remove('bad');pv()});
  $('i-cat').addEventListener('change',()=>{catSync();pv()});
  $('i-status').onclick=e=>{const b=e.target.closest('[data-s]');if(!b)return;draft.status=b.dataset.s;$('i-status').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));pv()};
  $('i-ic').onclick=e=>{const b=e.target.closest('[data-ic]');if(!b)return;draft.ic=b.dataset.ic;$('i-ic').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));pv()};
  if($('i-file'))$('i-file').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
    if(!/^image\/(png|jpeg|webp|svg\+xml)$/.test(f.type)){toast('Use uma imagem PNG, JPG, WebP ou SVG');return}
    if(f.size>8*1024*1024){toast('Imagem muito grande. Use até 8 MB.');return}
    try{const b=await squareBlob(f);if(draft._preview)URL.revokeObjectURL(draft._preview);draft._blob=b;draft._preview=URL.createObjectURL(b);draft._removed=false;$('rmImg').hidden=false;pv()}catch(_){toast('Não foi possível ler esta imagem')}};
  if($('rmImg'))$('rmImg').onclick=()=>{if(draft._preview)URL.revokeObjectURL(draft._preview);draft._blob=null;draft._preview='';draft.imgId='';draft._removed=true;$('rmImg').hidden=true;pv()};
  const rs=()=>{const G=$('shotGrid');const n=draft.shots.length;G.innerHTML=draft.shots.map((x,k)=>'<div class="sitem">'+(x.preview?'<img src="'+esc(x.preview)+'" alt="Tela '+(k+1)+'">':imgEl(x.id,'Tela '+(k+1)))+'<div class="c"><button type="button" class="mini-b" data-sm="'+k+'" data-d="-1" aria-label="Mover para a esquerda" '+(k===0?'disabled':'')+'>'+svg('M15 18l-6-6 6-6','i')+'</button><button type="button" class="mini-b" data-sx="'+k+'" aria-label="Remover tela">'+svg('M6 6l12 12M18 6L6 18','i')+'</button><button type="button" class="mini-b" data-sm="'+k+'" data-d="1" aria-label="Mover para a direita" '+(k===n-1?'disabled':'')+'>'+svg('M9 6l6 6-6 6','i')+'</button></div></div>').join('')+
     (assets&&n<8?'<label class="sadd">'+svg('M12 5v14M5 12h14','i')+'Adicionar telas<input type="file" id="i-shots" class="vis" accept="image/png,image/jpeg,image/webp" multiple></label>':'');
    const fi=$('i-shots');if(fi)fi.onchange=async e=>{const fs=[...e.target.files].slice(0,8-draft.shots.length);e.target.value='';
      for(const f of fs){if(!/^image\/(png|jpeg|webp)$/.test(f.type)||f.size>15e6){toast('Use PNG, JPG ou WebP de até 15 MB');continue}
        try{const b=await fitBlob(f,1080);draft.shots.push({blob:b,preview:URL.createObjectURL(b)})}catch(_){toast('Não foi possível ler uma das imagens')}}rs()}};
  $('shotGrid').onclick=e=>{const m=e.target.closest('[data-sm]');if(m){const k=+m.dataset.sm,j=k+(+m.dataset.d),t=draft.shots[k];if(!draft.shots[j])return;draft.shots[k]=draft.shots[j];draft.shots[j]=t;rs();return}
    const x=e.target.closest('[data-sx]');if(x){const it=draft.shots.splice(+x.dataset.sx,1)[0];if(it&&it.preview)URL.revokeObjectURL(it.preview);rs()}};
  rs();
  $('i-visible').onclick=()=>{draft.visible=draft.visible===false;$('i-visible').setAttribute('aria-checked',draft.visible);pv()};
  $('i-featured').onclick=()=>{draft.featured=!draft.featured;$('i-featured').setAttribute('aria-checked',draft.featured);$('storyBox').hidden=!draft.featured;pv()};
  $('cancelB').onclick=()=>history.length>1?history.back():go('gestao');
  if($('delB'))$('delB').onclick=()=>confirmBox('Excluir '+orig.name+'?','O app sai da loja para todos. Você pode desfazer logo em seguida.','Excluir',async()=>{
    const backup=JSON.parse(JSON.stringify(orig));delete backup.id;
    try{await store.deleteApp(orig.id);draft=null;go('gestao');snack(orig.name+' excluído',()=>store.setApp(orig.id,backup))}catch(err){toast(errMsg(err))}});
  F.onsubmit=async e=>{e.preventDefault();catSync();let ok=true;const bad=(k,c)=>{$('f-'+k).classList.toggle('bad',c);if(c&&ok){ok=false;$('i-'+k).focus()}};
    draft.name=draft.name.trim();draft.short=draft.short.trim();draft.url=(draft.url||'').trim();
    bad('name',draft.name.length<2);bad('short',draft.short.length<3);
    if($('i-cat').value==='__nova')bad('newcat',!draft.cat);
    bad('url',!!draft.url&&!/^https:\/\/[^\s.]+\.[^\s]+$/.test(draft.url));
    if(!ok)return;if(!draft.cat)draft.cat='Outros';
    const body={name:draft.name,short:draft.short,cat:draft.cat,status:draft.status,desc:draft.desc.trim(),feats:draft.feats,url:draft.url,repoUrl:(draft.repoUrl||'').trim(),iconBase64:draft.iconBase64||'',data:draft.data.trim(),h:+draft.h,ic:draft.ic,
      version:draft.version.trim(),news:draft.news.trim(),visible:draft.visible!==false,featured:!!draft.featured,storyTitle:draft.storyTitle.trim(),storyText:draft.storyText.trim(),updatedAt:new Date().toISOString()};
    let id=orig&&orig.id;
    if(isNew){let base=slug(draft.name),n=2;id=base;while(byId(id))id=base+'-'+(n++);body.order=APPS.reduce((m,x)=>Math.max(m,+x.order||0),0)+1}else body.order=orig.order;
    $('saveB').disabled=true;$('saveB').textContent='Salvando…';
    let newImg=draft.imgId||'';
    if(draft._blob){if(!assets){toast('Envio de imagem indisponível');$('saveB').disabled=false;$('saveB').textContent=isNew?'Cadastrar app':'Salvar alterações';return}
      $('saveB').textContent='Enviando imagem…';
      try{const up=await assets.upload(draft._blob,{type:'image/png'});newImg=up.id;try{const r=new FileReader();r.onload=()=>{body.iconBase64=r.result};r.readAsDataURL(draft._blob)}catch(_){}}catch(err){const c=err&&err.code;toast(c==='too_large'?'Imagem grande demais':c==='quota_or_state'?'Espaço de imagens esgotado':'Não foi possível enviar a imagem');$('saveB').disabled=false;$('saveB').textContent=isNew?'Cadastrar app':'Salvar alterações';return}
      $('saveB').textContent='Salvando…'}
    body.imgId=newImg;
    const shotsOut=[];for(const x of draft.shots){if(x.id){shotsOut.push({id:x.id});continue}
      $('saveB').textContent='Enviando telas…';
      try{const up=await assets.upload(x.blob,{type:'image/jpeg'});x.id=up.id;shotsOut.push({id:up.id})}catch(err){toast(err&&err.code==='quota_or_state'?'Espaço de imagens esgotado':'Não foi possível enviar uma das telas');$('saveB').disabled=false;$('saveB').textContent=isNew?'Cadastrar app':'Salvar alterações';return}}
    body.shots=shotsOut;$('saveB').textContent='Salvando…';
    const ov=orig?(orig.version||''):'';body.versionAt=(body.version&&body.version!==ov)?new Date().toISOString():((orig&&orig.versionAt)||'');
    try{await store.setApp(id,body);
      if(assets&&orig){const keep=new Set(shotsOut.map(x=>x.id));for(const x of (orig.shots||[])){if(x&&x.id&&!keep.has(x.id)){try{await assets.delete(x.id)}catch(_){}}}}
      draft.shots.forEach(x=>{if(x.preview)URL.revokeObjectURL(x.preview)});
      const oldImg=orig&&orig.imgId;if(assets&&oldImg&&oldImg!==newImg&&!APPS.some(x=>x.id!==id&&x.imgId===oldImg)){try{await assets.delete(oldImg)}catch(_){}}
      if(draft._preview)URL.revokeObjectURL(draft._preview);draft=null;toast(isNew?body.name+' cadastrado':'Alterações salvas');location.hash='app-'+id}
    catch(err){toast(errMsg(err));$('saveB').disabled=false;$('saveB').textContent=isNew?'Cadastrar app':'Salvar alterações'}};
  pv();catSync()}

function panel(a){const i=['geral','priv','aval'].indexOf(tab);$('tind').style.transform='translateX('+(i*100)+'%)';$('tabs').querySelectorAll('[data-t]').forEach(b=>b.setAttribute('aria-selected',b.dataset.t===tab));
  let h='';
  const S=(a.shots||[]).filter(x=>x&&okId(x.id));
  if(tab==='geral'){const scr=[['Início','big'],['Lista','ln'],['Detalhe','big'],['Ajustes','ln']];
   h='<div class="hscroll" style="margin-top:6px">'+(S.length?S.map((x,k)=>'<figure class="fig"><button class="rshot" data-shot="'+k+'" aria-label="Ampliar tela '+(k+1)+'">'+imgEl(x.id,'Tela '+(k+1)+' do '+a.name)+'</button></figure>').join(''):scr.map(([n,k])=>'<figure class="fig"><div class="shot" style="--h:'+(+a.h||0)+'"><div class="scr"><i class="t1"></i><i class="t2"></i>'+(k==='big'?'<i class="big"></i><div class="gr"><i></i><i></i><i></i><i></i></div><i class="ln"></i>':'<i class="ln"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i>')+'<i class="dk"></i></div></div><figcaption>'+n+'</figcaption></figure>').join(''))+'</div>'+
    '<div class="glass copy"><p>'+esc(a.desc||a.short)+'</p>'+((a.feats||[]).length?'<ul class="feats">'+a.feats.map(f=>'<li><span class="ck">'+svg('M5 12l5 5 9-10','i')+'</span>'+esc(f)+'</li>').join('')+'</ul>':'')+'</div>'+
    (a.news?'<div class="shelf-h"><div><h2>Novidades'+(a.version?' da versão '+esc(a.version):'')+'</h2></div></div><div class="glass copy"><p style="white-space:pre-line">'+esc(a.news)+'</p></div>':'')}
  else if(tab==='priv'){const pv=[[ICON.escudo,'Onde ficam os dados',a.data||'Fica no aparelho'],['M4 12h16M12 4v16','Compartilhamento com terceiros','Nenhum'],['M12 3v12M7 10l5 5 5-5M5 21h14','Exportar e apagar','Disponível em Ajustes, a qualquer momento'],['M5 11h14v10H5zM8 11V7a4 4 0 018 0v4','Anúncios e rastreamento','Não contém']];
   h='<div class="priv">'+pv.map(([p,t,s])=>'<div class="glass pv"><span class="pi">'+svg(p,'i')+'</span><span><b>'+t+'</b><small>'+esc(s)+'</small></span></div>').join('')+'</div>'}
  else{const L=revs(a.id),n=L.length,av=avg(a.id),mine=myId?L.find(r=>r.uid===myId):null;
   if(rvApp!==a.id){rvStars=mine?mine.stars:0;rvApp=a.id}
   const dist=[5,4,3,2,1].map(k=>[k,L.filter(r=>r.stars===k).length]);
   h='<div class="glass rsum"><div><div class="big">'+(n?fmt1(av):'—')+'</div>'+sline(av)+'<div class="sm">'+(n?n+(n>1?' avaliações':' avaliação'):'Sem avaliações ainda')+'</div></div><div class="bars">'+dist.map(([k,c])=>'<div><span>'+k+'</span><i><b style="width:'+(n?c/n*100:0)+'%"></b></i><span>'+c+'</span></div>').join('')+'</div></div>'+
    (myId&&store?'<div class="glass compose"><h3>'+(mine?'Sua avaliação':'Avalie este app')+'</h3><div class="stars" id="stars">'+[1,2,3,4,5].map(k=>'<button data-r="'+k+'" class="'+(rvStars>=k?'on':'')+'" aria-label="'+k+' estrela'+(k>1?'s':'')+'"><svg viewBox="0 0 24 24"><path d="'+STAR+'"/></svg></button>').join('')+'</div><textarea id="rvT" maxlength="500" placeholder="Conte o que achou (opcional)" aria-label="Comentário">'+esc(mine?mine.text:'')+'</textarea><div class="row2">'+(mine?'<button class="btn sec" id="rvDel">Excluir</button>':'')+'<button class="btn" id="rvPub">'+(mine?'Atualizar':'Publicar avaliação')+'</button></div></div>':'<div class="ro" style="margin-top:12px">Para avaliar, entre com sua conta.<br><button class="btn" data-nav="conta" style="margin-top:10px">Entrar na conta</button></div>')+
 '<div class="glass feed-box"><h3>'+svg(ICON.feedback,'i')+'Enviar sugestão ou relatar problema</h3><p style="color:var(--soft);font-size:13px;margin:0">Envie ideias, sugestões ou relate falhas diretamente para a equipe.</p>'+
 '<div class="feed-seg" id="feedTipo"><button type="button" data-tp="sugestao" aria-pressed="true">'+svg(ICON.lamp,'i')+'Sugestão</button><button type="button" data-tp="problema" aria-pressed="false">'+svg(ICON.alerta,'i')+'Problema</button><button type="button" data-tp="elogio" aria-pressed="false">'+svg(ICON.coracao,'i')+'Elogio</button></div>'+
 '<textarea id="feedTxt" maxlength="1000" placeholder="Escreva aqui seu comentário ou problema (mínimo de 3 caracteres)..." style="min-height:76px"></textarea>'+
 '<input type="email" id="feedMail" placeholder="Seu e-mail para contato (opcional)" value="'+esc(me&&me.email||'')+'">'+
 '<button class="btn" id="feedSend">Enviar para o desenvolvedor</button></div>'+
    (n?'<div class="shelf-h"><div><h2>Comentários</h2></div></div><div class="glass list" id="rvList">'+L.map(r=>{const rp=REP[r.uid]&&REP[r.uid][a.id];return '<div class="rv"><div class="who"><img alt="" data-av="'+esc(r.uid)+'" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><span><b data-nm="'+esc(r.uid)+'">'+(r.uid===myId?'Você':'Visitante')+'</b><small>'+dbr(r.at)+'</small></span></div>'+sline(r.stars)+(r.text?'<p>'+esc(r.text)+'</p>':'')+(rp&&rp.text?'<div class="reply"><b>Resposta da Systekna</b><p>'+esc(rp.text)+'</p></div>':'')+(isAdmin?'<button class="rbtn" data-rep="'+esc(r.uid)+'">'+(rp&&rp.text?'Editar resposta':'Responder')+'</button>':'')+'</div>'}).join('')+'</div>':'')}
  $('panel').innerHTML='<div class="panel">'+h+'</div>';
  if(tab==='geral'&&S.length)$('panel').querySelectorAll('[data-shot]').forEach(b=>b.onclick=()=>openLB(S,+b.dataset.shot));
  if(tab==='aval'){
   if($('stars'))$('stars').onclick=e=>{const b=e.target.closest('button');if(!b)return;rvStars=+b.dataset.r;$('stars').querySelectorAll('button').forEach(x=>x.classList.toggle('on',+x.dataset.r<=rvStars))};
   if($('rvPub'))$('rvPub').onclick=()=>saveReview(a);
   if($('rvDel'))$('rvDel').onclick=()=>confirmBox('Excluir sua avaliação?','Sua nota e seu comentário saem deste app.','Excluir',()=>saveReview(a,true));
   const RL=$('rvList');if(RL){fillNames(RL);RL.onclick=e=>{const b=e.target.closest('[data-rep]');if(b)openReply(a,b)}};
   let feedTp='sugestao';const fSeg=$('feedTipo');
   if(fSeg)fSeg.onclick=e=>{const b=e.target.closest('[data-tp]');if(!b)return;feedTp=b.dataset.tp;fSeg.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))};
   if($('feedSend'))$('feedSend').onclick=async()=>{
     const txt=(($('feedTxt')||{}).value||'').trim(),mail=(($('feedMail')||{}).value||'').trim();
     if(txt.length<3){toast('Escreva ao menos 3 caracteres');return}
     $('feedSend').disabled=true;
     try{
       await store.addSuggestion({app:a.id,tipo:feedTp,texto:txt,email:mail});
       toast('Sugestão enviada com sucesso! Obrigado.');
       $('feedTxt').value='';
     }catch(err){toast('Erro ao enviar: '+errMsg(err))}
     $('feedSend').disabled=false;
   }}}
function fillNames(el){el.querySelectorAll('[data-nm]').forEach(x=>{const p=NAMES[x.dataset.nm]||{};x.textContent=x.dataset.nm===myId?((p.name||'Você')+' (você)'):(p.name||'Visitante')});
  el.querySelectorAll('[data-av]').forEach(x=>{const p=NAMES[x.dataset.av];if(p&&/^https:\/\//.test(p.photo||''))x.src=p.photo})}
async function saveReview(a,del){if(!myId||!store)return;const txt=(($('rvT')||{}).value||'').trim().slice(0,500);
  if(!del&&!rvStars){toast('Escolha de 1 a 5 estrelas');return}
  const cur=Object.assign({},(myRevDoc&&myRevDoc.apps)||{});if(del)delete cur[a.id];else cur[a.id]={stars:rvStars,text:txt,at:new Date().toISOString()};
  const b=$('rvPub');if(b)b.disabled=true;
  try{await store.setReview(myId,{apps:cur,name:(me&&me.name)||'',photo:(me&&me.photo)||'',at:new Date().toISOString()});if(del)rvStars=0;toast(del?'Avaliação excluída':'Obrigado pela avaliação!');if(document.activeElement)document.activeElement.blur();render(true)}
  catch(err){toast(errMsg(err));if(b)b.disabled=false}}
function openReply(a,btn){const uid=btn.dataset.rep,cur=REP[uid]&&REP[uid][a.id];const box=document.createElement('div');box.className='rbox';
  box.innerHTML='<textarea maxlength="600" placeholder="Escreva a resposta da Systekna" aria-label="Resposta">'+esc(cur&&cur.text||'')+'</textarea><div class="row2">'+(cur&&cur.text?'<button class="btn sec" data-x="rm">Remover</button>':'')+'<button class="btn sec" data-x="no">Cancelar</button><button class="btn" data-x="ok">Publicar resposta</button></div>';
  btn.replaceWith(box);const ta=box.querySelector('textarea');ta.focus();
  box.onclick=async e=>{const k=e.target.closest('[data-x]');if(!k)return;const act=k.dataset.x;if(act==='no'){pendingRender=false;render(true);return}
    const t=act==='rm'?'':ta.value.trim();if(act==='ok'&&!t){toast('Escreva a resposta');return}
    const all=Object.assign({},REP[uid]||{});if(t)all[a.id]={text:t.slice(0,600),at:new Date().toISOString()};else delete all[a.id];
    k.disabled=true;try{await store.setReply(uid,{apps:all});toast(t?'Resposta publicada':'Resposta removida');ta.blur();pendingRender=false;render(true)}catch(err){toast(errMsg(err));k.disabled=false}}}
function openLB(S,k){let lb=$('lb');if(!lb){lb=document.createElement('div');lb.id='lb';lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Telas do app');document.body.appendChild(lb)}
  lb.innerHTML='<button class="x" aria-label="Fechar">'+svg('M6 6l12 12M18 6L6 18','i')+'</button><div class="hs">'+S.map((x,i)=>imgEl(x.id,'Tela '+(i+1))).join('')+'</div><div class="lbc" id="lbc">'+(k+1)+' / '+S.length+'</div>';
  lb.classList.add('open');const hs=lb.querySelector('.hs');
  const center=()=>{const im=hs.children[k];if(im)hs.scrollLeft=im.offsetLeft-(hs.clientWidth-im.clientWidth)/2};requestAnimationFrame(center);setTimeout(center,250);
  hs.onscroll=()=>{let best=0,bd=1e9;[...hs.children].forEach((im,i)=>{const d=Math.abs(im.offsetLeft+im.clientWidth/2-hs.scrollLeft-hs.clientWidth/2);if(d<bd){bd=d;best=i}});$('lbc').textContent=(best+1)+' / '+S.length};
  const close=()=>lb.classList.remove('open');lb.querySelector('.x').onclick=close;lb.onclick=e=>{if(e.target===lb||e.target===hs)close()};lb.querySelector('.x').focus()}
function safeRender(){if(isForm())return;const ae=document.activeElement;if(ae&&$('view').contains(ae)&&/^(TEXTAREA|INPUT)$/.test(ae.tagName)){pendingRender=true;return}render(true)}
document.addEventListener('focusout',()=>{if(!pendingRender)return;setTimeout(()=>{const ae=document.activeElement;if(pendingRender&&!(ae&&/^(TEXTAREA|INPUT)$/.test(ae.tagName))){pendingRender=false;if(!isForm())render(true)}},300)});

function startHero(){const hero=$('hero'),dots=$('dots');clearInterval(auto);if(!hero||!dots)return;
  const cards=[...hero.children];let idx=0;
  const setDot=i=>{idx=i;dots.querySelectorAll('button').forEach((d,k)=>d.setAttribute('aria-current',k===i))};
  hero.addEventListener('scroll',()=>{const w=cards[0].offsetWidth+14;setDot(Math.min(cards.length-1,Math.round(hero.scrollLeft/w)))},{passive:true});
  const to=i=>hero.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft,behavior:RM?'auto':'smooth'});
  const stop=()=>{clearInterval(auto);auto=null};
  dots.onclick=e=>{const b=e.target.closest('button');if(b){to(+b.dataset.i);stop()}};
  ['pointerdown','touchstart','wheel'].forEach(ev=>hero.addEventListener(ev,stop,{passive:true}));
  if(!RM)auto=setInterval(()=>{if(!document.body.contains(hero))return stop();to((idx+1)%cards.length)},6000)}

/* ---------- roteador ---------- */
function parse(){const h=(location.hash||'#inicio').slice(1);let m=h.match(/^app-([a-z0-9-]+)$/);if(m)return{n:'app',a:m[1]};m=h.match(/^editar-([a-z0-9-]+)$/);if(m)return{n:'editar',a:m[1]};return{n:V[h]?h:'inicio'}}
const isForm=()=>{const n=parse().n;return n==='novo'||n==='editar'};
function render(stay,dir){const r=parse(),o=V[r.n](r.a);
  $('eyebrow').textContent=o.eyebrow;$('title').textContent=o.title;$('backBtn').hidden=!o.sub;
  const v=$('view');v.className=stay?'':'view'+(dir?' '+dir:'');v.innerHTML=o.html;o.after&&o.after();
  const navKey=(r.n==='novo'||r.n==='editar')?'gestao':r.n;banners();
  document.querySelectorAll('.dock [data-nav],.side [data-nav]').forEach(b=>b.dataset.nav===navKey?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
  if(!stay)scrollTo(0,0)}
function go(h){if(location.hash==='#'+h)render(true);else location.hash=h}
addEventListener('hashchange',()=>render(false,['app','editar','novo'].includes(parse().n)?'fwd':''));
document.addEventListener('click',e=>{const n=e.target.closest('[data-nav]');if(n){go(n.dataset.nav);return}
  const c=e.target.closest('[data-cat]');if(c){cat=c.dataset.cat;go('apps');return}
  if(e.target.closest('[data-signin]')){signIn();return}
  const sa=e.target.closest('[data-share-app]');if(sa){const a=byId(sa.dataset.shareApp);if(a)openShare('Compartilhar '+a.name,'Conheça o '+a.name+', da Systekna: '+(a.short?a.short.charAt(0).toLowerCase()+a.short.slice(1):'')+'.',shareBase()+'#app-'+a.id);return}
  if(e.target.closest('[data-share-store]')){openShare('Compartilhar a loja','Conheça a Loja Systekna: apps gratuitos para organizar o dia a dia.',shareBase());return}
  const rg=e.target.closest('[data-rvgo]');if(rg){tab='aval';tabApp=rg.dataset.rvgo;location.hash='app-'+rg.dataset.rvgo;return}
  const a=e.target.closest('[data-app]');if(a){location.hash='app-'+a.dataset.app;return}
  if(e.target.closest('#cpm')){const m=$('mail');try{navigator.clipboard.writeText(m.textContent).then(()=>toast('E-mail copiado'),()=>{sel(m);toast('Texto selecionado. Copie manualmente.')})}catch(_){sel(m)}}});
function sel(el){const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)}
$('backBtn').onclick=()=>history.length>1?history.back():go('inicio');

/* ---------- tema ---------- */
const curDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme=local.get('theme',null);if(savedTheme)root.dataset.theme=savedTheme;
$('themeBtn').onclick=()=>{const t=curDark()?'light':'dark';root.dataset.theme=t;local.set('theme',t);toast(t==='dark'?'Tema escuro':'Tema claro')};

/* ---------- avisos (offline, demo, atualização) ---------- */
function banners(){const B=$('banners');if(!B)return;let h='';
  if(!navigator.onLine)h+='<div class="ro" style="margin-bottom:14px">Sem conexão. Você está vendo a última versão salva da loja.</div>';
  if(swWaiting)h+='<div class="ro" style="margin-bottom:14px;display:flex;align-items:center;gap:10px;justify-content:space-between"><span>Nova versão da loja disponível.</span><button class="link" id="swUp">Atualizar</button></div>';
  if(store&&store.mode==='demo'&&!local.get('demoOk',false))h+='<div class="ro" style="margin-bottom:14px;display:flex;align-items:center;gap:10px;justify-content:space-between"><span>Modo demonstração: dados só neste aparelho.</span><button class="link" id="demoOk">Entendi</button></div>';
  B.innerHTML=h;
  if($('swUp'))$('swUp').onclick=()=>{swWaiting.postMessage('skipWaiting')};
  if($('demoOk'))$('demoOk').onclick=()=>{local.set('demoOk',true);banners()}}
addEventListener('online',()=>{banners();toast('Conexão restabelecida')});addEventListener('offline',banners);
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;if(parse().n==='sobre')render(true)});
addEventListener('appinstalled',()=>{deferredInstall=null;toast('Loja Systekna instalada')});
if('serviceWorker' in navigator&&location.protocol!=='file:'){
  navigator.serviceWorker.register('sw.js').then(reg=>{
    const watch=w=>{w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller){swWaiting=w;banners()}})};
    if(reg.waiting&&navigator.serviceWorker.controller){swWaiting=reg.waiting;banners()}
    reg.addEventListener('updatefound',()=>reg.installing&&watch(reg.installing));
  }).catch(()=>{});
  let reloaded=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!reloaded){reloaded=true;location.reload()}});
}

/* ---------- conta ---------- */
async function signIn(){if(!store)return;try{await store.signIn()}catch(err){toast(errMsg(err))}}
let lastRev=[];
function applyUser(u){me=u;myId=u?u.uid:null;myRevDoc=lastRev.find(d=>d.id===myId)||null;rvApp=null;isAdmin=!!(u&&u.isAdmin);assets=isAdmin?{upload:async b=>({id:await store.putImage(b)}),delete:id=>store.deleteImage(id)}:null;
  document.querySelectorAll('.adm').forEach(b=>b.hidden=!isAdmin);$('dock').classList.toggle('admin',isAdmin);
  const ab=$('acctBtn');ab.innerHTML=u&&/^https:\/\//.test(u.photo||'')?'<img src="'+esc(u.photo)+'" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">':u?esc((u.name||'').replace(/[^\p{L}\s]/gu,'').trim().split(/\s+/).filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase()||'?'):svg('M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0','i');
  ab.setAttribute('aria-label',u?'Minha conta':'Entrar');
  if(isForm()){if(!isAdmin){if(me)location.hash='inicio'}else if(!draft)render(true)}else safeRender()}

/* ---------- dados ---------- */
$('sideVer').textContent='Loja Systekna · v'+(CFG.appVersion||'1.0');
render(true);
(async()=>{
  try{store=await createStore(CFG)}catch(e){status='off';render(true);return}
  store.onAuth(applyUser);
  store.onApps(list=>{APPS=list.sort((a,b)=>(+a.order||999)-(+b.order||999)||String(a.name).localeCompare(String(b.name)));status='ok';if(isForm()&&!draft)render(true);else safeRender()},
    ()=>{status='err';if(!isForm())render(true)});
  store.onReviews(list=>{lastRev=list;const m={},nm={};let mine=null;list.forEach(d=>{const ap=d.apps||{};nm[d.id]={name:String(d.name||'').slice(0,60),photo:String(d.photo||'')};if(d.id===myId)mine=d;
      Object.keys(ap).forEach(k=>{const r=ap[k];if(!r||!(+r.stars>=1&&+r.stars<=5))return;(m[k]=m[k]||[]).push({uid:d.id,stars:Math.round(+r.stars),text:String(r.text||'').slice(0,500),at:String(r.at||'')})})});
    RV=m;NAMES=nm;myRevDoc=mine;safeRender()},()=>{});
  store.onSettings(d=>{SUP=d||{};safeRender()},()=>{});
  store.onReplies(list=>{const m={};list.forEach(d=>{m[d.id]=d.apps||{}});REP=m;safeRender()},()=>{});
  store.onSuggestions(list=>{SUGS=list||[];safeRender()},()=>{});
  hydrate();
})();
})();
