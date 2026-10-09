const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static('public'));
app.use(express.json({limit:'2mb'}));

const HOST_ID = process.env.HOST_ID || 'admin';
const HOST_PW = process.env.HOST_PW || 'gyan2026';

const DEFAULT_QA = [
 ['જીવને માયામાંથી તારીને ભગવાનના દિવ્ય સ્વરૂપમાં જોડવા માટે સંતો દ્વારા અખંડ કથા-વાર્તા અને વિચરણ કરીને કરવામાં આવતા ભારે આધ્યાત્મિક પરિશ્રમને શું કહેવાય?','દાખડો'],
 ['અંતરમાં અખંડ ટાઢક (શાંતિ) રાખવાના અને મન અશાંત ન થાય તેના સ્વામીએ કેટલા ઉપાયો બતાવ્યા છે?','બે'],
 ['સ્વામીના મતે મોક્ષના દાતા કોણ છે?','ભગવાન અને એકાંતિક સાધુ'],
 ['ભગવાન અને સાધુ જ મોક્ષના દાતા હોવાથી આપણે શું ધ્યાન રાખવું જોઈએ?','અવગુણ ન લેવો'],
 ['સ્વામીના મતે ભવિષ્યમાં સત્સંગ અને મંદિરોનો વિકાસ કેવો થશે?','કરોડ ગણો'],
 ['સ્વામીના મતે સારો સત્સંગી કોણ છે?','ભગવાનના ભક્તમાં આત્મબુદ્ધિ'],
 ['સ્વામી ક્યાં સુધી સત્સંગ કરાવવાની વાત કરે છે?','રાત્રિપ્રલય'],
 ['મનુષ્યના જીવનમાં કયું દુઃખ થોડું અને કયું દુઃખ વધારે (ઝાઝું) હોય છે?','દેહનું અને મનનું'],
 ['સત્સંગમાંથી ક્યારેય ન પડાય (વિમુખ ન થવાય) તે માટે સ્વામીએ કેટલા સારા સાધુ અને કેટલા સારા હરીભક્તો સાથે જીવ બાંધવા કહ્યું છે','બે અને ત્રણ'],
 ['ભગવાન, સંતો, હરિભક્તો કે સત્સંગની વ્યવસ્થાઓ વિશે નકારાત્મક વાતો કરવી કે દોષ જોવાને સત્સંગની ભાષામાં શું કહેવાય?','અભાવ અવગુણ'],
 ['સ્વામીના વચન અનુસાર આપણે આપણા પોતાના સ્વરૂપને કેવું માનવું જોઈએ?','અક્ષર'],
 ['જો પોતાના સ્વરૂપને અક્ષર ન માની શકાય, તો પણ કઈ બાબતની પોતાને ના માનવું?','સ્થૂળ દેહ'],
 ['વિષયો દેહના ભાવ તરીકે એક પડખે રહ્યા હોય, તો પણ જીવે પોતાના આત્માને શું ન માનવો?','નરકનો કીડો'],
 ['સત્સંગમાં ભક્તોના આધ્યાત્મિક વિકાસને સમજાવવા સ્વામીએ કોનું ઉદાહરણ આપ્યું છે?','વામનજીની લાકડી'],
 ['સ્વામીના મતે ભક્ત કથા, કીર્તન કે વાતો કરે પણ કઈ મૂળભૂત જાગૃતિ વિના તે બધું અધૂરું છે?','આ દેહ હું નહિ'],
 ['ભગવાન અને સાધુનો સાચો મહિમા સમજવાનું કારણ (સાધન) શું છે?','ભગવદીનો પ્રસંગ'],
 ['દુષ્કાળ, રોગચાળો, આર્થિક સંકટ, કુદરતી આફતો કે જીવનમાં આવતી કોઈપણ વિપરીત અને પ્રતિકૂળ પરિસ્થિતિને સામાન્ય રીતે શું કહેવાય?','દેશકાળની અવરાઈ'],
 ['દોષ પીડે તેથી સત્સંગમાં શું થઈને રહેવાય ?','દિન આધીન'],
 ['આધ્યાત્મિક માર્ગમાં સૌથી બળવાન તત્વ કયું દર્શાવવામાં આવ્યું છે?','શબ્દ'],
 ['સ્વામીના મતે જીવ સૌથી શ્રેષ્ઠ અને ઉત્તમ રીતે શેનાથી શુદ્ધ થાય છે?','વાતું'],
 ['આધ્યાત્મિક માર્ગમાં જીવને બળવાન બનાવવાનું સૌથી મોટું સાધન કયું છે?','મહિમા'],
 ['દેહના દુશ્મન કોણ કદી હોય નહિ? જેમ કરશે તેમ સુખ જ થાશે.','હરિ'],
 ['દિવ્યભાવ ને મનુષ્યભાવ એ બેને એક સમજે તે શેને તરી રહ્યો છે?','માયા'],
 ['આઠે પહોર ભજન કરવું જે, "હું દેહ નથી ને દેહમાં રહ્યો એવો જે હું કોણ છું?"','આત્મા'],
 ['જેમ નાતનો, નામનો અને ગામનો નિશ્ચય થયો છે, તેમ જ એવું શુ કરવું જોઈએ?, "હું આત્મા છું, બ્રહ્મ છું, સુખરૂપ છું"','અભ્યાસ'],
 ['ભગવાન પુરુષોત્તમ નારાયણ સર્વ અવતારના કોણ છે?','અવતારી'],
 ['ભગવાન જ્યારે પૃથ્વી ઉપર આવે ત્યારે રાજસી, તામસી, સાત્ત્વિક ને શેનો ઉદ્ધાર કરી નાખે છે?','અધમ'],
 ['નિત્યે લાખ રૂપિયા લાવે ને સત્સંગનું શું બોલતો હોય તો તે મને ન ગમે?','ઘસાતું'],
 ['અમારો મત એવો જે, ક્રિયા કરવામાં પણ ક્રિયારૂપ ન થાવું ને ક્રિયા મૂકીને પણ તેના શું ન કરવા?','મનસૂબા'],
 ['ભગવાનના કર્તાપણાની સમજણ ન હોય તો મુશ્કેલ દેશકાળમાં શું નુકસાન થાય છે?','સત્સંગ ચૂંથાઈ જાય'],
 ['સ્વામીના વચન મુજબ, કોઈ વ્યક્તિ રોજ કેટલું કમાઈને લાવે તો પણ જો સત્સંગનું ઘસાતું બોલે તો સ્વામીને ગમતું નથી?','લાખ રૂપિયા'],
 ['મહારાજના વચનામૃતના આધારે, જો ભક્તમાં કામ-લોભ ન હોય પણ ભગવાનના ભક્તમાં જીવન બંધાયો હોય તો તેનું શું પરિણામ આવે છે?','અસુર'],
 ['‘સ્વામિનારાયણ’ મહામંત્રના જાપથી કયા બાહ્ય સંકટનું ઝેર પણ ચડતું નથી?','કાળો નાગ'],
 ['‘સ્વામિનારાયણ’ મંત્ર કયા મોટા બંધનોમાંથી મુક્તિ અપાવે છે?','કાળ, કર્મ, માયા'],
 ['સ્વામીના મતે આજની તારીખે કયો મંત્ર સૌથી વધુ બળિયો (શક્તિશાળી) છે?','સ્વામિનારાયણ'],
 ['સ્વામીના મતે દેહ આપણી પાસે રોજ શું કરાવે છે?','નરક']
];

const LINES = (() => {
  const L = [];
  for (let r = 0; r < 5; r++) L.push([0,1,2,3,4].map(c => r*5+c));
  for (let c = 0; c < 5; c++) L.push([0,1,2,3,4].map(r => r*5+c));
  L.push([0,6,12,18,24]); L.push([4,8,12,16,20]);
  return L;
})();
const WINNER_ORDER = ['line1','line2','line3','line4','line5','full','bonus'];
const WINNER_LABELS = {line1:'1 Line',line2:'2 Line',line3:'3 Line',line4:'4 Line',line5:'5 Line',full:'Full House',bonus:'Bonus Winner'};

function defaultQuestions(){ return DEFAULT_QA.map(([q,a]) => ({q,a})); }
function parseQA(text){
  const lines = (text||'').split('\n').map(l=>l.trim()).filter(Boolean);
  const out = [], bad = [];
  for (const l of lines){
    let parts = null;
    if (l.includes('::')) parts = [l.split('::')[0], l.split('::').slice(1).join('::')];
    else if (l.includes(' - ')) parts = [l.split(' - ')[0], l.split(' - ').slice(1).join(' - ')];
    else if ((l.match(/:/g)||[]).length===1) parts = l.split(':');
    if (parts && parts[0].trim() && parts[1] && parts[1].trim()) out.push({q:parts[0].trim(), a:parts[1].trim()});
    else bad.push(l);
  }
  return { questions: out.length?out:defaultQuestions(), bad, usedDefault: out.length===0 };
}
function shuffle(a){ const arr=a.slice(); for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
function makeCard(questions){
  let pool = shuffle(questions.map(q=>q.a));
  while (pool.length < 25) pool = pool.concat(shuffle(questions.map(q=>q.a)));
  return pool.slice(0,25);
}
function randCode(){ const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s='GYAN'; for(let i=0;i<4;i++) s+=c[Math.floor(Math.random()*c.length)]; return s; }

const rooms = {}; // code -> room object

function playerResults(room, pname){
  const p = room.players[pname];
  const cellState = Array(25).fill('none');
  Object.entries(p.marks).forEach(([ci,qi]) => {
    ci = +ci;
    cellState[ci] = (room.questions[qi] && room.questions[qi].a === p.card[ci]) ? 'green' : 'red';
  });
  const usedAnswers = room.usedIdx.map(i => room.questions[i].a);
  for (let ci=0; ci<25; ci++) if (cellState[ci]==='none' && usedAnswers.includes(p.card[ci])) cellState[ci]='yellow';
  const correctRows = LINES.filter(line => line.every(ci=>cellState[ci]==='green')).length;
  const correctCount = cellState.filter(s=>s==='green').length;
  const wrongCount = cellState.filter(s=>s==='red').length;
  const netScore = correctCount - wrongCount; // negative marking: each wrong click costs 1 point
  const fullHouse = cellState.every(s=>s==='green');
  return { cellState, correctRows, correctCount, wrongCount, netScore, fullHouse };
}
function computeWinners(room){
  const winners = {};
  for (const cat of ['line1','line2','line3','line4','line5','full']){
    let best=null, tied=[];
    for (const [name,p] of Object.entries(room.players)){
      if (!p.claims || !p.claims[cat]) continue;
      const res = playerResults(room,name);
      const need = cat==='full'?null:+cat.replace('line','');
      const valid = cat==='full' ? res.fullHouse : res.correctRows>=need;
      if (valid){
        const ts=p.claims[cat].ts;
        if(!best || ts<best.ts){ best={name,ts}; tied=[name]; }
        else if(ts===best.ts){ tied.push(name); }
      }
    }
    winners[cat] = best?best.name:null;
    winners[cat+'_ts'] = best?best.ts:null;
    winners[cat+'_ms'] = best?Math.max(0,best.ts-(room.startedAt||room.createdAt)):null; // time taken from game start
    winners[cat+'_tie'] = tied.length>1 ? tied : null; // more than one player claimed validly at the exact same moment
  }
  let bonus=null;
  for (const [name,p] of Object.entries(room.players)){
    const res = playerResults(room,name);
    if (!bonus || res.netScore>bonus.score || (res.netScore===bonus.score && p.joinedAt<bonus.ts)) bonus={name,score:res.netScore,ts:p.joinedAt};
  }
  winners.bonus = bonus && bonus.score>0 ? bonus.name : null;
  winners.bonus_score = bonus && bonus.score>0 ? bonus.score : null;
  return winners;
}
function publicRoom(room){
  // strip nothing for now (all data needed client-side for this design); omit heavy fields if needed later
  return room;
}
function broadcast(code){
  if (rooms[code]) io.to(code).emit('state', publicRoom(rooms[code]));
}

setInterval(() => {
  for (const code of Object.keys(rooms)){
    const r = rooms[code];
    if (r.status==='question' && r.timerEnd && Date.now()>=r.timerEnd){
      r.status='locked';
      broadcast(code);
    }
  }
}, 1000);

io.on('connection', (socket) => {
  socket.on('subscribe', ({code}, cb) => {
    if (rooms[code]){ socket.join(code); cb && cb({ok:true, room: publicRoom(rooms[code])}); }
    else cb && cb({ok:false, error:'Room code મળ્યો નહિ.'});
  });

  socket.on('host:login', ({id,pw}, cb) => {
    cb && cb({ok: id===HOST_ID && pw===HOST_PW});
  });

  socket.on('host:create', ({hostName, maxPlayers, qaText}, cb) => {
    const code = randCode();
    const parsed = parseQA(qaText);
    rooms[code] = {
      code, hostName, maxPlayers: maxPlayers||null, status:'lobby',
      questions: parsed.questions, usedIdx:[], curIdx:null, timerEnd:null,
      players:{}, winners:null, revealStep:0, createdAt: Date.now()
    };
    socket.join(code);
    cb && cb({ok:true, code, parseInfo:{count:parsed.questions.length, bad:parsed.bad, usedDefault:parsed.usedDefault}});
    broadcast(code);
  });

  socket.on('host:start', ({code}) => { const r=rooms[code]; if(!r) return; r.status='active'; if(!r.startedAt) r.startedAt=Date.now(); broadcast(code); });

  const REVEAL_MS=1600;       // how long the big number popup stays up before the question appears
  const SPIN_SAFETY_MS=6000;  // safety net only — if host's browser never confirms, auto-advance so the game can't get stuck
  socket.on('host:spin', ({code}) => {
    const r = rooms[code]; if(!r) return;
    if(r.status!=='active' && r.status!=='locked') return; // ignore duplicate/racing spin clicks — fixes skipped questions
    const avail=[]; for(let i=0;i<r.questions.length;i++) if(!r.usedIdx.includes(i)) avail.push(i);
    if (avail.length===0){ r.status='ended'; broadcast(code); return; }
    const idx = avail[Math.floor(Math.random()*avail.length)];
    r.status='spinning'; r.curIdx=idx; r.usedIdx=[...r.usedIdx, idx]; r.timerEnd=null;
    broadcast(code);
    // Safety net only: if the host's own wheel never confirms completion (tab closed, crash, etc.),
    // reveal anyway after a generous timeout so the game never gets permanently stuck.
    setTimeout(()=>{
      const rr=rooms[code]; if(!rr||rr.status!=='spinning'||rr.curIdx!==idx) return;
      advanceToRevealing(code, idx);
    }, SPIN_SAFETY_MS);
  });
  function advanceToRevealing(code, idx){
    const r=rooms[code]; if(!r||r.status!=='spinning'||r.curIdx!==idx) return;
    r.status='revealing'; broadcast(code);
    setTimeout(()=>{
      const rr=rooms[code]; if(!rr||rr.status!=='revealing'||rr.curIdx!==idx) return;
      rr.status='question'; rr.timerEnd=Date.now()+30000; broadcast(code);
    }, REVEAL_MS);
  }
  // Host's own wheel tells us exactly when its CSS animation visually finished — no guessing, no drift.
  socket.on('host:spinComplete', ({code, idx}) => { advanceToRevealing(code, idx); });

  socket.on('host:end', ({code}) => { const r=rooms[code]; if(!r) return; r.status='ended'; broadcast(code); });

  socket.on('host:reveal', ({code}) => {
    const r = rooms[code]; if(!r) return;
    r.winners = computeWinners(r); r.status='revealed'; r.revealStep=1;
    broadcast(code);
  });

  socket.on('host:nextWinner', ({code}) => {
    const r = rooms[code]; if(!r) return;
    r.revealStep = (r.revealStep||0)+1;
    broadcast(code);
  });

  socket.on('player:join', ({code,name,zone,avatar,clientId}, cb) => {
    const r = rooms[code]; if(!r){ cb&&cb({ok:false,error:'Room code મળ્યો નહિ.'}); return; }
    name=(name||'').trim(); zone=(zone||'').trim();
    if(!name){ cb&&cb({ok:false,error:'નામ લખો.'}); return; }
    if(!r.clientMap) r.clientMap = {};
    let key = clientId && r.clientMap[clientId];
    if(key && r.players[key]){
      // same device reconnecting — resume their own card, don't create a new one
      socket.join(code);
      cb && cb({ok:true, room: publicRoom(r), yourKey:key});
      broadcast(code);
      return;
    }
    if (r.maxPlayers && Object.keys(r.players).length>=r.maxPlayers){ cb&&cb({ok:false,error:'Room ભરાઈ ગયો છે.'}); return; }
    key = name;
    if(r.players[key]){
      let n=2; while(r.players[`${name} (${n})`]) n++;
      key = `${name} (${n})`;
    }
    r.players[key] = { card: makeCard(r.questions), zone, avatar: avatar||'🦁', marks:{}, claims:{}, joinedAt: Date.now() };
    if(clientId) r.clientMap[clientId] = key;
    socket.join(code);
    cb && cb({ok:true, room: publicRoom(r), yourKey:key});
    broadcast(code);
  });

  socket.on('player:mark', ({code,name,ci}) => {
    const r = rooms[code]; if(!r || r.status!=='question') return;
    const p = r.players[name]; if(!p) return;
    const already = Object.values(p.marks).includes(r.curIdx);
    if (already || p.marks[ci]!==undefined) return;
    p.marks[ci] = r.curIdx;
    broadcast(code);
  });

  socket.on('player:claim', ({code,name,type}) => {
    const r = rooms[code]; if(!r) return;
    const p = r.players[name]; if(!p) return;
    if(!p.claims) p.claims={};
    const now = Date.now();
    if(!p.claims[type]) p.claims[type] = {ts: now};
    // Claiming "N Line" also auto-registers 1..N-1 Line claims (if not already made),
    // so a player who goes straight for a higher line doesn't lose eligibility for
    // the lower prizes in case only some of their lines turn out correct.
    if(/^line[2-5]$/.test(type)){
      const n = +type.replace('line','');
      for(let k=1;k<n;k++){ const key='line'+k; if(!p.claims[key]) p.claims[key]={ts: now}; }
    }
    broadcast(code);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Gyan Shodh Quiz server running on port '+PORT));
