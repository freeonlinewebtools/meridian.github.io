/* ════════════════════════════════
   CONSTANTS
════════════════════════════════ */
const KEY='mer_v4', SKEY='mer_sync', AUTH_KEY='mer_authed';

// Subject topics — pre-loaded per subject code
const SUBJECT_TOPICS = {
  '11MAX2': ['Permutations','Combinations','Binomial Theorem','Pascal\'s Triangle','Proof by Induction','Mathematical Induction','Counting Techniques','Pigeonhole Principle'],
  '11MAE2': ['Functions','Trigonometry','Differentiation','Integration','Polynomials','Logarithms','Exponentials','Sequences & Series','Financial Maths','Statistics'],
  '11CHE4': ['Atomic Structure','Chemical Bonding','Stoichiometry','Gases','Solutions','Equilibrium','Acids & Bases','Electrochemistry','Organic Chemistry','Thermodynamics'],
  '11BIO1': ['Cell Biology','Genetics','Evolution','Ecology','Human Biology','Classification','Biochemistry','Reproduction','Nervous System','Immune System'],
  '11PHY6': ['Kinematics','Dynamics','Forces','Energy','Waves','Thermodynamics','Electricity','Magnetism','Nuclear Physics','Relativity'],
  '11ENA5b':['Essay Writing','Creative Writing','Close Reading','Textual Analysis','Module A','Module B','Module C','Common Module','Belonging','Discovery'],
  '11EST3': ['Engineering Principles','Design Process','Structures','Materials','Mechanisms','Electronics','Hydraulics','CAD','Project Management','Testing'],
  // Generic fallbacks by subject name keywords
  '_math':   ['Algebra','Calculus','Trigonometry','Statistics','Proof','Functions','Series','Vectors','Complex Numbers','Geometry'],
  '_science':['Theory','Practical','Lab Report','Equations','Diagrams','Module Content','Past Papers','Practice Questions'],
  '_english':['Essay','Close Study','Analysis','Creative','Module A','Module B','Module C','Techniques','Themes'],
  '_default':['Revision','New Content','Practice Questions','Past Papers','Summary Notes','Concept Review','Problem Sets','Exam Prep'],
};

function getTopicsForSubject(sub) {
  if(!sub) return SUBJECT_TOPICS['_default'];
  if(SUBJECT_TOPICS[sub.icsCode]) return SUBJECT_TOPICS[sub.icsCode];
  const name = (sub.name||'').toLowerCase();
  if(name.includes('math')||name.includes('ext')) return SUBJECT_TOPICS['_math'];
  if(name.includes('chem')||name.includes('bio')||name.includes('phys')) return SUBJECT_TOPICS['_science'];
  if(name.includes('english')) return SUBJECT_TOPICS['_english'];
  // Also use subject's custom topics if defined
  if(sub.topics && sub.topics.length) return sub.topics;
  return SUBJECT_TOPICS['_default'];
}
const CONF=['Lost','Shaky','OK','Solid','Nailed'];
const CE=['😵','😟','🙂','💪','🔥'];
const PRESETS=[10,15,20,30,45,60,90,120];

const EXAM_DATES={
  7:{name:'Year 7 Exams',date:'2025-11-07'},8:{name:'Year 8 Exams',date:'2025-11-07'},
  9:{name:'Year 9 Exams',date:'2025-11-07'},10:{name:'SC Yearly',date:'2025-11-07'},
  11:{name:'Year 11 Yearly',date:'2025-10-31'},12:{name:'HSC 2026',date:'2026-10-13'},
};

// Default subjects auto-matched from ICS
const DEFAULT_SUBS=[
  {id:'chem',name:'Chemistry',        abbr:'CH',target:60,icsCode:'11CHE4', color:0},
  {id:'bio', name:'Biology',          abbr:'BI',target:60,icsCode:'11BIO1', color:1},
  {id:'phys',name:'Physics',          abbr:'PH',target:60,icsCode:'11PHY6', color:2},
  {id:'max', name:'Maths Ext 1',      abbr:'MX',target:60,icsCode:'11MAX2', color:3},
  {id:'mae', name:'Maths Advanced',   abbr:'MA',target:60,icsCode:'11MAE2', color:4},
  {id:'eng', name:'English Advanced', abbr:'EN',target:45,icsCode:'11ENA5b',color:5},
  {id:'est', name:'Engineering',      abbr:'ES',target:45,icsCode:'11EST3', color:6},
];

/* ════════════════════════════════
   DATE UTILS
════════════════════════════════ */
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function localDate(d){const z=n=>String(n).padStart(2,'0');return`${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`;}
const today=()=>localDate(new Date());
function prevDay(d){const x=new Date(d+'T12:00:00');x.setDate(x.getDate()-1);return localDate(x);}
function addDays(d,n){const x=new Date(d+'T12:00:00');x.setDate(x.getDate()+n);return localDate(x);}
function daysUntil(d){return Math.ceil((new Date(d+'T00:00:00')-new Date(today()+'T00:00:00'))/86400000);}
function fmtDate(d){if(d===today())return'Today';if(d===prevDay(today()))return'Yesterday';return new Date(d+'T12:00:00').toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'});}
function fmtShort(d){return new Date(d+'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'short'});}
function fmtDur(m){if(!m||m<=0)return'—';if(m<60)return m+'m';const h=Math.floor(m/60),r=m%60;return r?`${h}h ${r}m`:`${h}h`;}
function fmtTime(d){const h=d.getHours(),m=d.getMinutes();const ampm=h>=12?'pm':'am';return`${h%12||12}:${String(m).padStart(2,'0')}${ampm}`;}
function fmtMins(m){if(m<60)return`${m}m`;const h=Math.floor(m/60),r=m%60;return r?`${h}h ${r}m`:`${h}h`;}
function weekMon(){const d=new Date();const day=d.getDay()||7;d.setDate(d.getDate()-day+1);return localDate(d);}
function getLast7(){const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push({date:localDate(d),label:['S','M','T','W','T','F','S'][d.getDay()]});}return days;}
function isWeekend(dateStr){const d=new Date(dateStr+'T12:00:00');return d.getDay()===0||d.getDay()===6;}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36);}
function getExamDate(yr){const b=EXAM_DATES[yr]||EXAM_DATES[12];const d=new Date(b.date+'T00:00:00');if(d<new Date())d.setFullYear(d.getFullYear()+1);return{name:b.name,date:localDate(d)};}

/* ════════════════════════════════
   ICS PARSER
════════════════════════════════ */
function parseICSDate(s){
  if(!s)return null;
  const clean=s.replace(/[^0-9TZ]/g,'');
  const y=clean.slice(0,4),mo=clean.slice(4,6),d=clean.slice(6,8),h=clean.slice(9,11)||'00',m=clean.slice(11,13)||'00',sec=clean.slice(13,15)||'00';
  const iso=`${y}-${mo}-${d}T${h}:${m}:${sec}${s.includes('Z')?'Z':''}`;
  return new Date(iso);
}

function parseICS(text){
  // Unfold continuation lines per RFC 5545
  const raw=text.replace(/\r\n/g,'\n').replace(/\r/g,'\n').split('\n');
  const lines=[];
  for(const line of raw){
    if((line.startsWith(' ')||line.startsWith('\t'))&&lines.length>0){
      lines[lines.length-1]+=line.slice(1);
    }else{lines.push(line);}
  }
  const evts=[];let cur=null;
  for(const line of lines){
    if(line==='BEGIN:VEVENT'){cur={};continue;}
    if(line==='END:VEVENT'){if(cur&&cur.summary&&cur.start)evts.push(cur);cur=null;continue;}
    if(!cur)continue;
    const ci=line.indexOf(':');if(ci<0)continue;
    const k=line.slice(0,ci).split(';')[0], v=line.slice(ci+1);
    if(k==='DTSTART')cur.start=parseICSDate(v);
    else if(k==='DTEND')cur.end=parseICSDate(v);
    else if(k==='SUMMARY')cur.summary=v.trim();
    else if(k==='DESCRIPTION')cur.description=v.replace(/\\n/g,'\n');
    else if(k==='LOCATION')cur.location=v.trim();
    else if(k==='UID')cur.uid=v.trim();
  }
  return evts;
}

function icsEventsToTimetable(evts, subjects){
  const tt=[];
  for(const ev of evts){
    if(!ev.start||!ev.end)continue;
    const m=ev.summary.match(/^(\S+):\s*(.+?)(?:\s+\d+\s+unit.*)?$/);
    const icsCode=m?m[1]:ev.summary;
    const subjectName=m?m[2].trim():ev.summary;
    if(subjectName.toLowerCase().includes('mentor'))continue;
    const sub=subjects.find(s=>s.icsCode===icsCode)||subjects.find(s=>subjectName.toLowerCase().includes(s.name.toLowerCase().split(' ')[0].toLowerCase()));
    const teacherM=ev.description?.match(/Teacher:\s*(.+?)(?:\n|$)/);
    const periodM=ev.description?.match(/Period:\s*(.+?)(?:\n|$)/);
    const roomM=ev.location?.match(/Room:\s*(.+)/);
    tt.push({uid:ev.uid||uid(),date:localDate(ev.start),start:ev.start.toISOString(),end:ev.end.toISOString(),subjectId:sub?.id||null,icsCode,subjectName,room:roomM?roomM[1].trim():(ev.location||''),teacher:teacherM?teacherM[1].trim():'',period:periodM?periodM[1].trim():''});
  }
  // Also create subjects for any unmapped ICS codes
  const newSubs=[];
  const usedCodes=new Set(subjects.map(s=>s.icsCode));
  for(const entry of tt){
    if(!entry.subjectId&&!usedCodes.has(entry.icsCode)){
      const words=entry.subjectName.split(' ').filter(w=>w.length>1);
      const abbr=words.length>=2?(words[0][0]+words[1][0]).toUpperCase():entry.subjectName.slice(0,2).toUpperCase();
      const newSub={id:uid(),name:entry.subjectName,abbr,target:45,icsCode:entry.icsCode,color:subjects.length+newSubs.length};
      newSubs.push(newSub);
      usedCodes.add(entry.icsCode);
      // Update entries with this code
      tt.filter(e=>e.icsCode===entry.icsCode).forEach(e=>{e.subjectId=newSub.id;});
    }
  }
  return{timetable:tt,newSubs};
}

/* ════════════════════════════════
   DATA
════════════════════════════════ */
function loadLocal(){try{const r=localStorage.getItem(KEY);return r?JSON.parse(r):null;}catch{return null;}}
function saveLocal(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch{}}
function loadSync(){try{const r=localStorage.getItem(SKEY);return r?JSON.parse(r):{apiKey:'',binId:'',lastSynced:null,status:'idle'};}catch{return{apiKey:'',binId:'',lastSynced:null,status:'idle'};}}
function saveSync(s){try{localStorage.setItem(SKEY,JSON.stringify(s));}catch{}}
function newAccount(name,pin,year,subs){return{name:name.trim(),pin,joined:today(),year,subjects:subs||ALL_PRESET_SUBS.slice(0,7),sessions:[],tests:[],timetable:[],graceUsed:null};}
function exportCode(d){const s={n:d.name,p:d.pin,j:d.joined,y:d.year,subs:d.subjects,s:d.sessions,tests:d.tests||[],tt:d.timetable||[],g:d.graceUsed};return btoa(unescape(encodeURIComponent(JSON.stringify(s))));}
function importCode(code){try{const s=JSON.parse(decodeURIComponent(escape(atob(code.trim()))));return{name:s.n,pin:s.p,joined:s.j||today(),year:s.y||11,subjects:s.subs||DEFAULT_SUBS,sessions:s.s||[],tests:s.tests||[],timetable:s.tt||[],graceUsed:s.g||null};}catch{return null;}}

/* ════════════════════════════════
   COMPUTED
════════════════════════════════ */
function getStreak(sessions){
  if(!sessions.length)return 0;
  const logged=new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date));
  sessions.filter(s=>s.subject==='grace').forEach(s=>logged.add(s.date));
  let cur=logged.has(today())?today():prevDay(today()),n=0;
  while(logged.has(cur)){n++;cur=prevDay(cur);}
  return n;
}
function getBest(sessions){
  const days=[...new Set(sessions.map(s=>s.date))].sort();
  if(!days.length)return 0;
  let best=1,cur=1;
  for(let i=1;i<days.length;i++){
    if((new Date(days[i]+'T12:00:00')-new Date(days[i-1]+'T12:00:00'))/86400000===1){cur++;best=Math.max(best,cur);}else cur=1;
  }
  return best;
}
function todaySess(sessions){return sessions.filter(s=>s.date===today()&&s.subject!=='grace');}
function subMinsToday(sessions,id){return todaySess(sessions).filter(s=>s.subject===id).reduce((a,s)=>a+s.duration,0);}
function subMinsAll(sessions,id){return sessions.filter(s=>s.subject===id).reduce((a,s)=>a+s.duration,0);}
function totalMins(sessions){return sessions.filter(s=>s.subject!=='grace').reduce((a,s)=>a+s.duration,0);}
function weekMins(sessions){const m=weekMon();return sessions.filter(s=>s.date>=m&&s.date<=today()&&s.subject!=='grace').reduce((a,s)=>a+s.duration,0);}
function dayMins(sessions,d){return sessions.filter(s=>s.date===d&&s.subject!=='grace').reduce((a,s)=>a+s.duration,0);}
function isRisk(sessions){return new Date().getHours()>=17&&!todaySess(sessions).length;}
function graceAvail(data){if(!data.graceUsed)return true;return new Date(data.graceUsed+'T12:00:00')<new Date(weekMon()+'T12:00:00');}

/* ════════════════════════════════
   SCORE PREDICTION ENGINE
════════════════════════════════ */
function getSubjectTests(tests,subId){return(tests||[]).filter(t=>t.subject===subId).sort((a,b)=>a.date.localeCompare(b.date));}

function getSubjectScorePct(tests,subId){
  const ts=getSubjectTests(tests,subId);
  if(!ts.length)return null;
  // Exponentially weighted recent scores — more recent = more weight
  let wSum=0,vSum=0;
  ts.forEach((t,i)=>{const w=Math.pow(1.4,i);const pct=t.score/t.outOf*100;wSum+=w;vSum+=w*pct;});
  return Math.round(vSum/wSum*10)/10;
}

function predictNextScore(data,subId,daysUntilTest){
  const{sessions,tests,subjects}=data;
  const sub=subjects.find(s=>s.id===subId);
  if(!sub)return null;
  const subTests=getSubjectTests(tests,subId);
  const subSess=sessions.filter(s=>s.subject===subId&&s.subject!=='grace');

  // Need at least 1 past test to predict
  if(!subTests.length)return null;

  // ── Base: weighted average of recent test scores ──
  const base=getSubjectScorePct(tests,subId)||50;

  // ── Study intensity factor ──
  // Hours studied in last 2 weeks for this subject
  const cutoff=addDays(today(),-14);
  const recentSess=subSess.filter(s=>s.date>=cutoff);
  const recentHrs=recentSess.reduce((a,s)=>a+s.duration,0)/60;
  // Average hrs/2weeks historically
  const totalHrs=subSess.reduce((a,s)=>a+s.duration,0)/60;
  const weeksActive=Math.max(1,new Set(subSess.map(s=>s.date)).size/5);
  const avgHrs2wk=totalHrs/(weeksActive/2);
  const studyFactor=avgHrs2wk>0?Math.min(1.08,1+(Math.log(1+recentHrs/Math.max(avgHrs2wk,1))*0.06)):1;

  // ── Confidence trend factor ──
  const confSess=subSess.filter(s=>s.confidence>0).slice(-8);
  let confFactor=1;
  if(confSess.length>=3){
    const early=confSess.slice(0,Math.floor(confSess.length/2));
    const recent2=confSess.slice(-Math.floor(confSess.length/2));
    const avgE=early.reduce((a,s)=>a+s.confidence,0)/early.length;
    const avgR=recent2.reduce((a,s)=>a+s.confidence,0)/recent2.length;
    const trend=(avgR-avgE)/5;
    confFactor=1+trend*0.06; // ±6% based on confidence trend
  }

  // ── Topic coverage factor ──
  const topics=getTopicsForSubject(sub);
  const studiedTopics=new Set(subSess.filter(s=>s.topic).map(s=>s.topic));
  const coverage=topics.length?studiedTopics.size/topics.length:0.5;
  const topicFactor=0.96+coverage*0.08; // 0.96 to 1.04

  // ── Time pressure factor ──
  // More days → more opportunity to study → slight boost
  // Less days → depends on recent intensity
  const days=Math.max(0,daysUntilTest||7);
  let timeFactor=1;
  if(days>30) timeFactor=1.03;       // plenty of time
  else if(days>14) timeFactor=1.01;  // healthy runway
  else if(days>7) timeFactor=0.99;   // getting close
  else if(days>3) timeFactor=0.97;   // crunch
  else timeFactor=0.95;              // last minute

  // ── Recency of study (last 3 days before test) ──
  const veryRecent=subSess.filter(s=>s.date>=addDays(today(),-3));
  const vrBoost=veryRecent.length>0?1.02:1;

  // ── Score trend (trajectory of test scores themselves) ──
  let scoreTrend=0;
  if(subTests.length>=2){
    const last=subTests[subTests.length-1];
    const prev=subTests[subTests.length-2];
    const lastPct=last.score/last.outOf*100;
    const prevPct=prev.score/prev.outOf*100;
    scoreTrend=(lastPct-prevPct)*0.15; // 15% of the score trend carries forward
  }

  // ── Compose prediction ──
  let pred=base*studyFactor*confFactor*topicFactor*timeFactor*vrBoost+scoreTrend;

  // Hard cap: never above 96%, never below 20%
  // Psychological: always room to improve
  pred=Math.min(96,Math.max(20,pred));

  // ── Confidence interval (±range based on volatility) ──
  const scores=subTests.map(t=>t.score/t.outOf*100);
  const variance=scores.length>1?scores.reduce((a,v)=>a+Math.pow(v-base,2),0)/(scores.length-1):100;
  const stddev=Math.sqrt(variance);
  const range=Math.round(Math.min(12,Math.max(3,stddev*0.7)));

  const lo=Math.max(15,Math.round(pred-range));
  const hi=Math.min(96,Math.round(pred+range));
  const point=Math.round(pred);

  // ── Factors breakdown for display ──
  const factors=[
    {label:'Base (test history)', value:Math.round(base)+'%', icon:'📝'},
    {label:'Study intensity', value:studyFactor>=1?`+${Math.round((studyFactor-1)*100*base/100)}%`:`${Math.round((studyFactor-1)*100*base/100)}%`, icon:'⏱', positive:studyFactor>=1},
    {label:'Confidence trend', value:confFactor>=1?`+${Math.round((confFactor-1)*100*base/100)}%`:`${Math.round((confFactor-1)*100*base/100)}%`, icon:'💪', positive:confFactor>=1},
    {label:'Topic coverage', value:Math.round(coverage*100)+'%', icon:'📚', positive:coverage>0.5},
    {label:'Time until test', value:days>0?days+'d away':'Today', icon:'📅', positive:timeFactor>=1},
  ];

  return{point,lo,hi,base,studyFactor,confFactor,topicFactor,timeFactor,coverage,factors,days};
}

function getTestGrade(pct){
  if(pct>=90)return{letter:'A+',color:'var(--ok)'};
  if(pct>=80)return{letter:'A',color:'var(--ok)'};
  if(pct>=70)return{letter:'B',color:'var(--acc)'};
  if(pct>=60)return{letter:'C',color:'var(--warn)'};
  return{letter:'D',color:'var(--err)'};
}

/* ════════════════════════════════
   TIMETABLE COMPUTED
════════════════════════════════ */
function getTodayTT(timetable){
  return(timetable||[]).filter(e=>e.date===today()&&e.subjectId).sort((a,b)=>new Date(a.start)-new Date(b.start));
}
function getDayTT(timetable,dateStr){
  return(timetable||[]).filter(e=>e.date===dateStr&&e.subjectId).sort((a,b)=>new Date(a.start)-new Date(b.start));
}
function getNowNext(timetable){
  const now=new Date();
  const todayEvents=getTodayTT(timetable);
  if(!todayEvents.length){
    // Find next school day
    let d=addDays(today(),1);
    for(let i=0;i<8;i++){
      const evs=getDayTT(timetable,d);
      if(evs.length){const dayName=new Date(d+'T12:00:00').toLocaleDateString('en-AU',{weekday:'long'});return{type:'no-school',nextDate:d,nextDayName:dayName,nextFirst:evs[0]};}
      d=addDays(d,1);
    }
    return{type:'no-tt'};
  }
  for(const ev of todayEvents){
    const s=new Date(ev.start),e=new Date(ev.end);
    if(now>=s&&now<e){const mLeft=Math.ceil((e-now)/60000);return{type:'in-class',ev,mLeft};}
  }
  for(const ev of todayEvents){
    const s=new Date(ev.start);
    if(now<s){const mUntil=Math.ceil((s-now)/60000);return{type:'next',ev,mUntil};}
  }
  return{type:'done',todayEvents};
}
function getSmartSubject(timetable,subjects){
  // Return subjectId for smart pre-fill: current class > last ended class (within 45m) > next class
  const now=new Date();
  const todayEvs=getTodayTT(timetable);
  for(const ev of todayEvs){
    const s=new Date(ev.start),e=new Date(ev.end);
    if(now>=s&&now<e&&ev.subjectId)return ev.subjectId;
  }
  const pastEvs=[...todayEvs].reverse();
  for(const ev of pastEvs){
    const e=new Date(ev.end);
    if(now>e&&(now-e)/60000<45&&ev.subjectId)return ev.subjectId;
  }
  for(const ev of todayEvs){
    if(new Date(ev.start)>now&&ev.subjectId)return ev.subjectId;
  }
  return null;
}
function getSubjColor(sub){const c=sub?.color??0;return{bg:`var(--c${c%8}-bg)`,bd:`var(--c${c%8}-bd)`,tx:`var(--c${c%8}-tx)`};}

/* ════════════════════════════════
   JSONBIN SYNC
════════════════════════════════ */
const JB='https://api.jsonbin.io/v3';
let syncDebounce=null;
async function syncPush(data,sc){
  if(!sc.apiKey)return{ok:false,err:'No API key'};
  const hdrs={'Content-Type':'application/json','X-Master-Key':sc.apiKey,'X-Bin-Private':'true'};
  try{
    if(!sc.binId){
      const r=await fetch(`${JB}/b`,{method:'POST',headers:hdrs,body:JSON.stringify({meridian:data,v:2})});
      if(!r.ok)return{ok:false,err:'Create failed (check API key)'};
      const j=await r.json();sc.binId=j.metadata.id;saveSync(sc);return{ok:true,binId:sc.binId};
    }else{
      const r=await fetch(`${JB}/b/${sc.binId}`,{method:'PUT',headers:hdrs,body:JSON.stringify({meridian:data,v:2})});
      if(!r.ok)return{ok:false,err:`Sync failed (${r.status})`};return{ok:true};
    }
  }catch{return{ok:false,err:'Network error'};}
}
async function syncPull(sc){
  if(!sc.apiKey||!sc.binId)return{ok:false,err:'No API key or Bin ID'};
  try{
    const r=await fetch(`${JB}/b/${sc.binId}/latest`,{headers:{'X-Master-Key':sc.apiKey}});
    if(!r.ok)return{ok:false,err:`Pull failed (${r.status})`};
    const j=await r.json();if(!j.record?.meridian)return{ok:false,err:'No data in bin'};
    return{ok:true,data:j.record.meridian};
  }catch{return{ok:false,err:'Network error'};}
}
function triggerSync(){clearTimeout(syncDebounce);syncDebounce=setTimeout(async()=>{const sc=loadSync();if(!sc.apiKey)return;sc.status='syncing';saveSync(sc);updateSyncDot();const r=await syncPush(S.data,sc);sc.status=r.ok?'ok':'err';sc.lastSynced=r.ok?Date.now():sc.lastSynced;if(r.binId)sc.binId=r.binId;saveSync(sc);updateSyncDot();},1200);}
function updateSyncDot(){const d=document.querySelector('.sync-dot');if(!d)return;const sc=loadSync();if(!sc.apiKey){d.style.display='none';return;}d.style.display='';d.className='sync-dot'+({ok:' ok',err:' err',syncing:' ing'}[sc.status]||'');}

/* ════════════════════════════════
   TIMER STATE
════════════════════════════════ */
let timerInt=null,timerStart=0,timerElap=0,timerRunning=false,timerTarget=25*60;
function startTimer(){timerStart=Date.now()-timerElap*1000;timerRunning=true;clearInterval(timerInt);timerInt=setInterval(()=>{timerElap=Math.floor((Date.now()-timerStart)/1000);if(timerElap>=timerTarget){timerElap=timerTarget;clearInterval(timerInt);timerRunning=false;renderTimerFast();showToast('Timer done — log your session','⏱');}else renderTimerFast();},500);}
function pauseTimer(){clearInterval(timerInt);timerRunning=false;timerElap=Math.floor((Date.now()-timerStart)/1000);}
function resetTimer(){clearInterval(timerInt);timerRunning=false;timerElap=0;renderTimerFast();}
function renderTimerFast(){const rem=Math.max(0,timerTarget-timerElap),m=Math.floor(rem/60),s=rem%60;const t=document.getElementById('tt-time');if(t){t.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;t.className='timer-num'+(timerRunning?' run':'');}const b=document.getElementById('tt-bar');if(b)b.style.width=`${Math.min(100,(timerElap/timerTarget)*100)}%`;const l=document.getElementById('tt-lbl');if(l)l.textContent=timerRunning?'Running…':timerElap>0?'Paused':'Ready';}

/* ════════════════════════════════
   LIVE UPDATE TICKER
════════════════════════════════ */
let liveTickInt=null;
function startLiveTick(){clearInterval(liveTickInt);liveTickInt=setInterval(()=>{if(S.data&&(S.view==='dashboard'||S.view==='timetable')){renderLiveElements();}},15000);}
function renderLiveElements(){
  // Update Now/Next card
  const nn=document.getElementById('nownext');
  if(nn&&S.data){nn.outerHTML=renderNowNext();}
  // Update period progress bars
  document.querySelectorAll('[data-period-prog]').forEach(el=>{
    const s=new Date(el.dataset.start),e=new Date(el.dataset.end),now=new Date();
    const pct=Math.min(100,Math.max(0,((now-s)/(e-s))*100));
    el.style.width=pct+'%';
  });
  // Update live countdown
  const cd=document.getElementById('live-countdown');
  if(cd&&S.data?.timetable){
    const nn2=getNowNext(S.data.timetable);
    if(nn2.type==='in-class')cd.textContent=`${nn2.mLeft}m left`;
    else if(nn2.type==='next')cd.textContent=`in ${fmtMins(nn2.mUntil)}`;
  }
}

/* ════════════════════════════════
   STATE
════════════════════════════════ */
let S={
  view:'login',loginMode:'login',loginName:'',loginPin:'',loginErr:'',showImport:false,importCode:'',
  data:null,
  modal:null,
  logSub:null,logDur:45,logConf:3,logNote:'',logCustom:'',logErr:'',logFromTT:null,
  logTopic:null,
  newName:'',newAbbr:'',newTarget:60,
  ttTab:0,
  progTab:0,
  showExport:false,
  showPinEntry:false,
  testSub:null,testScore:'',testOutOf:100,testName:'',testType:'test',testDate:today(),testNextDate:'',
  regStep:1,regPin1:'',regPin2:'',regYear:11,
  regSubjects:['chem','bio','phys','max','mae','eng'],
  tutStep:0,showOnboardComplete:false,
  googleUser:null,
  // Papers library
  papersSubFilter:'All',    // subject filter
  papersYrFilter:'All',     // 'All' / 'Yr 11' / 'Yr 12'
  papersSrcFilter:'All',    // 'All' / 'Mine' / 'thsconline' / 'HSC Official'
  papersTypeFilter:'All',   // 'All' / 'Paper' / 'Assignment' / 'Test' / 'Marking Scheme'
  papersSearch:'',
  papersSort:'date',        // 'date' / 'subject' / 'title'
  papersData:null,          // loaded papers cache {local:[], thsc:[], hsc:[]}
  papersLoading:false,
};

/* ════════════════════════════════
   RENDER
════════════════════════════════ */
function render(){
  const root=document.getElementById('app');
  if(!S.data){root.innerHTML=renderLogin();return;}
  root.innerHTML=renderShell();
  requestAnimationFrame(()=>{
    document.querySelectorAll('[data-bw]').forEach(el=>{el.style.width=el.dataset.bw+'%';});
    // Streak ring animation
    const rf=document.getElementById('ring-fill');
    if(rf){const v=parseFloat(rf.dataset.v)||0,full=parseFloat(rf.dataset.full);rf.style.strokeDashoffset=full-v;}
    renderTimerFast();
    updateSyncDot();
    // Period progress
    document.querySelectorAll('[data-period-prog]').forEach(el=>{
      const s=new Date(el.dataset.start),e=new Date(el.dataset.end),now=new Date();
      const pct=Math.min(100,Math.max(0,((now-s)/(e-s))*100));
      el.style.width=pct+'%';
    });
    // PDF thumbnails (Papers view)
    if(S.view==='papers') setTimeout(renderPaperThumbs, 150);
  });
}

/* ════════════════════════════════
   LOGIN
════════════════════════════════ */
/* ════════════════════════════════
   PRESET SUBJECTS FOR ONBOARDING
════════════════════════════════ */
const ALL_PRESET_SUBS = [
  {id:'chem', name:'Chemistry',        abbr:'CH', target:60, icsCode:'11CHE4',  color:0},
  {id:'bio',  name:'Biology',          abbr:'BI', target:60, icsCode:'11BIO1',  color:1},
  {id:'phys', name:'Physics',          abbr:'PH', target:60, icsCode:'11PHY6',  color:2},
  {id:'max',  name:'Maths Ext 1',      abbr:'MX', target:60, icsCode:'11MAX2',  color:3},
  {id:'mae',  name:'Maths Advanced',   abbr:'MA', target:60, icsCode:'11MAE2',  color:4},
  {id:'eng',  name:'English Advanced', abbr:'EN', target:45, icsCode:'11ENA5b', color:5},
  {id:'est',  name:'Engineering',      abbr:'ES', target:45, icsCode:'11EST3',  color:6},
  {id:'legal',name:'Legal Studies',    abbr:'LS', target:45, icsCode:'',        color:7},
  {id:'eco',  name:'Economics',        abbr:'EC', target:45, icsCode:'',        color:0},
  {id:'mod',  name:'Modern History',   abbr:'MH', target:45, icsCode:'',        color:1},
  {id:'anc',  name:'Ancient History',  abbr:'AH', target:45, icsCode:'',        color:2},
  {id:'sdd',  name:'Software Design',  abbr:'SD', target:45, icsCode:'',        color:3},
  {id:'vis',  name:'Visual Arts',      abbr:'VA', target:45, icsCode:'',        color:4},
  {id:'pdhpe',name:'PDHPE',            abbr:'PE', target:45, icsCode:'',        color:5},
  {id:'mus',  name:'Music',            abbr:'MU', target:45, icsCode:'',        color:6},
];

function renderLogin(){
  if(S.showOnboardComplete) return renderOnboardComplete();
  // Auto-login: if account exists and authed flag set, show quick-resume screen
  const d = loadLocal();
  if(d && !S.showPinEntry) return renderAutoAuth(d);
  const isR = S.loginMode === 'register';
  if(isR) return renderRegister();
  return renderLoginForm();
}

function renderAutoAuth(d) {
  const streak = getStreak(d.sessions||[]);
  const exam = getExamDate(d.year||11);
  const dLeft = Math.max(0, daysUntil(exam.date));
  const initial = (d.name||'?')[0].toUpperCase();
  return`
  <div class="autoauth">
    <div class="autoauth-card">
      <div class="autoauth-avatar">${initial}</div>
      <div class="autoauth-name">${esc(d.name)}</div>
      <div class="autoauth-sub">${dLeft} days until ${exam.name}</div>
      <div class="autoauth-streak">
        <span style="font-size:16px;">${streak>=7?'🔥':streak>=3?'✦':'◇'}</span>
        <span class="autoauth-streak-num">${streak} day streak</span>
      </div>
      <div class="autoauth-btn" data-action="auto-login">Continue studying →</div>
      <div class="autoauth-pin-toggle" data-action="show-pin-entry">Use PIN instead</div>
    </div>
  </div>`;
}

function renderLoginForm(){
  return`
  <div class="auth-wrap-new">
    <div class="auth-left dsk" style="display:flex;">
      <div class="auth-left-logo">Meri<b>d</b>ian</div>
      <div class="auth-left-features">
        <div class="auth-feature">
          <div class="auth-feature-icon">📅</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">Live timetable</div>
            <div class="auth-feature-sub">Import from Sentral. See your next class in real time.</div>
          </div>
        </div>
        <div class="auth-feature">
          <div class="auth-feature-icon">🔥</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">Streak tracking</div>
            <div class="auth-feature-sub">Daily streaks, grace days, milestone badges. Stay consistent.</div>
          </div>
        </div>
        <div class="auth-feature">
          <div class="auth-feature-icon">↗</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">HSC projection</div>
            <div class="auth-feature-sub">See your total study hours by exam day based on current pace.</div>
          </div>
        </div>
        <div class="auth-feature">
          <div class="auth-feature-icon">☁</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">Cross-device sync</div>
            <div class="auth-feature-sub">JSONBin cloud sync. Same data on phone and desktop.</div>
          </div>
        </div>
      </div>
      <div class="auth-left-quote">"The secret of getting ahead<br>is getting started."</div>
    </div>
    <div class="auth-right">
      <div class="auth-form">
        <div class="auth-logo-sm">Meri<b>d</b>ian</div>
        <div class="auth-tagline">Your study tracker for the HSC.<br>Track sessions, streaks, and progress.</div>
        <div class="fld"><label class="flbl">PIN</label>
          <input class="fi" id="li-pin" type="password" inputmode="numeric" maxlength="6" placeholder="Enter your PIN" value="${esc(S.loginPin)}" autocomplete="current-password">
        </div>
        ${S.loginErr?`<div class="aerr">${S.loginErr}</div>`:''}
        <button class="abtn" data-action="login">Enter →</button>
        <div class="asw" data-action="toggle-login">New here? <span>Create account</span></div>
        <div class="auth-or">or</div>
        <div class="auth-social-row">
          <div class="google-btn" data-action="google-login">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </div>
          <div class="github-btn" data-action="github-login">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/></svg>
            GitHub
          </div>
        </div>
        <div class="import-tog" data-action="toggle-import">↓ Import from another device</div>
        ${S.showImport?`<div style="margin-top:10px;display:flex;flex-direction:column;gap:8px;">
          <textarea class="fi" id="import-code" placeholder="Paste sync code…" rows="3" style="resize:none;font-family:'DM Mono',monospace;font-size:11px;">${S.importCode}</textarea>
          <button class="abtn" data-action="do-import" style="margin-top:0;">Import & log in →</button>
        </div>`:''}
      </div>
    </div>
  </div>`;
}

function renderRegister(){
  const step = S.regStep;
  const steps = 4;
  const dotsHtml = Array.from({length:steps},(_,i)=>`<div class="auth-step${i<step-1?' done':i===step-1?' active':''}"></div>`).join('');

  let stepContent = '';

  if(step===1){
    stepContent = `
      <div class="auth-step-panel">
        <div style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px;">Step 1 of 4 — Your name</div>
        <div style="font-family:'Cormorant',serif;font-size:28px;font-weight:300;color:var(--tx);margin-bottom:6px;">What should we call you?</div>
        <div style="font-size:13px;color:var(--tx3);font-weight:300;margin-bottom:24px;line-height:1.5;">This shows on your dashboard greeting and won't be shared with anyone.</div>
        <div class="fld">
          <label class="flbl">First name</label>
          <input class="fi" id="reg-name" type="text" placeholder="Ames" value="${esc(S.loginName)}" autocomplete="off" autocorrect="off" autocapitalize="words" style="font-size:18px;padding:14px 16px;">
        </div>
        ${S.loginErr?`<div class="aerr">${S.loginErr}</div>`:''}
        <button class="abtn" data-action="reg-next" style="margin-top:12px;">Continue →</button>
        <div class="auth-or">or</div>
        <div class="auth-social-row">
          <div class="google-btn" data-action="google-login">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </div>
          <div class="github-btn" data-action="github-login">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/></svg>
            GitHub
          </div>
        </div>
      </div>`;

  } else if(step===2){
    stepContent = `
      <div class="auth-step-panel">
        <div style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px;">Step 2 of 4 — Security</div>
        <div style="font-family:'Cormorant',serif;font-size:28px;font-weight:300;color:var(--tx);margin-bottom:6px;">Create a PIN</div>
        <div style="font-size:13px;color:var(--tx3);font-weight:300;margin-bottom:28px;line-height:1.5;">4 digits to unlock Meridian on this device.</div>
        <div class="pin-row">
          ${[0,1,2,3].map(i=>`<input class="pin-digit" id="pd-${i}" type="password" inputmode="numeric" maxlength="1" placeholder="·" data-idx="${i}">`).join('')}
        </div>
        <div class="pin-hint">Your data stays on this device — PIN is just a local lock.</div>
        ${S.loginErr?`<div class="aerr">${S.loginErr}</div>`:''}
        <button class="abtn" data-action="reg-next">Continue →</button>
      </div>`;

  } else if(step===3){
    stepContent = `
      <div class="auth-step-panel">
        <div style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px;">Step 3 of 4 — School year</div>
        <div style="font-family:'Cormorant',serif;font-size:28px;font-weight:300;color:var(--tx);margin-bottom:6px;">What year are you in?</div>
        <div style="font-size:13px;color:var(--tx3);font-weight:300;margin-bottom:24px;line-height:1.5;">Sets your exam countdown and study targets.</div>
        <div class="year-grid">
          ${[7,8,9,10,11,12].map(y=>`<div class="year-btn${S.regYear===y?' on':''}" data-action="sel-year" data-year="${y}">Year ${y}</div>`).join('')}
        </div>
        <button class="abtn" data-action="reg-next">Continue →</button>
      </div>`;

  } else if(step===4){
    const selSet = new Set(S.regSubjects);
    stepContent = `
      <div class="auth-step-panel">
        <div style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3);margin-bottom:10px;">Step 4 of 4 — Your subjects</div>
        <div style="font-family:'Cormorant',serif;font-size:28px;font-weight:300;color:var(--tx);margin-bottom:6px;">What are you studying?</div>
        <div style="font-size:13px;color:var(--tx3);font-weight:300;margin-bottom:18px;line-height:1.5;">Select all your subjects. You can add custom ones later.</div>
        <div class="subj-select-grid" style="max-height:min(320px,50vh);overflow-y:auto;-webkit-overflow-scrolling:touch;">
          ${ALL_PRESET_SUBS.map(sub=>{
            const c = getSubjColor(sub);
            return`<div class="subj-sel-row${selSet.has(sub.id)?' on':''}" data-action="toggle-reg-subj" data-id="${sub.id}">
              <div class="subj-sel-check">${selSet.has(sub.id)?'✓':''}</div>
              <div class="subj-sel-abb" style="background:${c.bg};color:${c.tx};border:1px solid ${c.bd};">${sub.abbr}</div>
              <div class="subj-sel-name">${sub.name}</div>
            </div>`;
          }).join('')}
        </div>
        ${S.loginErr?`<div class="aerr">${S.loginErr}</div>`:''}
        <button class="abtn" data-action="reg-finish" style="margin-top:12px;">Create account →</button>
      </div>`;
  }

  return`
  <div class="auth-wrap-new">
    <div class="auth-left dsk" style="display:flex;">
      <div class="auth-left-logo">Meri<b>d</b>ian</div>
      <div class="auth-left-features">
        <div class="auth-feature">
          <div class="auth-feature-icon">📊</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">Subject breakdown</div>
            <div class="auth-feature-sub">See exactly how much time you spend on each subject.</div>
          </div>
        </div>
        <div class="auth-feature">
          <div class="auth-feature-icon">⏱</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">Built-in timer</div>
            <div class="auth-feature-sub">Study, stop the timer, log it. Duration auto-fills.</div>
          </div>
        </div>
        <div class="auth-feature">
          <div class="auth-feature-icon">⌨</div>
          <div class="auth-feature-text">
            <div class="auth-feature-title">Keyboard shortcut</div>
            <div class="auth-feature-sub">Press <strong style="color:#fff;">L</strong> anywhere to instantly open the log modal.</div>
          </div>
        </div>
      </div>
      <div class="auth-left-quote">"Success is the sum of small efforts,<br>repeated day in and day out."</div>
    </div>
    <div class="auth-right">
      <div class="auth-form">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;">
          <div class="auth-logo-sm" style="font-size:22px;">Meri<b>d</b>ian</div>
          <div class="auth-step-indicator">${dotsHtml}</div>
        </div>
        ${stepContent}
        <div class="asw" style="margin-top:16px;" data-action="toggle-login">Already have an account? <span>Log in</span></div>
      </div>
    </div>
  </div>`;
}

function renderOnboardComplete(){
  const name = S.data?.name || 'there';
  const exam = getExamDate(S.data?.year||11);
  const dLeft = daysUntil(exam.date);
  return`
  <div class="onboard-complete">
    <div class="onboard-icon">🎯</div>
    <div class="onboard-headline">You're set up, ${esc(name)}.</div>
    <div class="onboard-sub">Meridian is ready. Log your first session today to start your streak — even 15 minutes counts.</div>
    <div class="onboard-stats-preview" style="border:1px solid var(--bd);background:var(--srf);border-radius:var(--rm);padding:20px 28px;box-shadow:var(--sh);">
      <div class="onboard-stat"><div class="onboard-stat-v">${dLeft}</div><div class="onboard-stat-l">Days to ${exam.name}</div></div>
      <div class="onboard-stat"><div class="onboard-stat-v">${S.data?.subjects?.length||0}</div><div class="onboard-stat-l">Subjects tracked</div></div>
      <div class="onboard-stat"><div class="onboard-stat-v">0</div><div class="onboard-stat-l">Day streak</div></div>
    </div>
    <div class="onboard-start" data-action="start-app">Start studying →</div>
    <div style="font-size:12px;color:var(--tx3);margin-top:18px;text-align:center;font-weight:300;line-height:1.6;">Tip: Press <kbd style="font-family:'DM Mono',monospace;font-size:10px;padding:1px 6px;background:var(--srf2);border:1px solid var(--bd);border-radius:3px;">L</kbd> on desktop anytime to log a session instantly.</div>
  </div>`;
}

/* ════════════════════════════════
   SHELL
════════════════════════════════ */
function renderShell(){
  const vs={dashboard:renderDash,timetable:renderTimetable,history:renderHistory,progress:renderProgress,stats:renderStats,papers:renderPapers,timer:renderTimer,settings:renderSettings};
  const sc=loadSync();
  const hasTT=(S.data?.timetable||[]).length>0;
  const todayClasses=getTodayTT(S.data?.timetable||[]).length;
  return`
  <div class="topbar">
    <div class="logo">Meri<b>d</b>ian</div>
    <div class="topbar-r">
      <button class="ib" data-action="open-log" title="Log (L)" style="font-size:20px;color:var(--tx);font-weight:300;">＋</button>
      <button class="ib" data-action="sync-now" title="Sync">↻<div class="sync-dot" style="display:${sc.apiKey?'':'none'}"></div></button>
      <button class="ib" data-action="nav-settings">⚙</button>
    </div>
  </div>
  <div class="wrap">
    <nav class="side dsk">
      ${[['dashboard','⊞','Dashboard'],['timetable','▦','Timetable'],['history','◫','History'],['progress','↑','Progress'],['stats','↗','Stats'],['papers','📄','Papers'],['timer','◷','Timer']].map(([v,i,l])=>`
        <div class="si${S.view===v?' on':''}" data-action="nav-${v}"><span class="ico">${i}</span>${l}${v==='timetable'&&hasTT&&todayClasses>0?`<span class="si-badge">${todayClasses}</span>`:''}</div>`).join('')}
      <div class="si-sec">Account</div>
      <div class="si${S.view==='settings'?' on':''}" data-action="nav-settings"><span class="ico">⚙</span>Settings</div>
      <div class="side-logbtn" data-action="open-log">＋ Log Session</div>
    </nav>
    <div class="content" id="page-content">
      <div class="inner">${(vs[S.view]||renderDash)()}</div>
    </div>
  </div>
  <nav class="bnav mob">
    <div class="bni${S.view==='dashboard'?' on':''}" data-action="nav-dashboard"><span class="bni-ic">⊞</span>Home<div class="bni-dot"></div></div>
    <div class="bni${S.view==='timetable'?' on':''}" data-action="nav-timetable"><span class="bni-ic">▦</span>Schedule<div class="bni-dot"></div></div>
    <div class="fab-wrap">
      <div class="fab" data-action="open-log">＋</div>
    </div>
    <div class="bni${S.view==='papers'?' on':''}" data-action="nav-papers"><span class="bni-ic">📄</span>Papers<div class="bni-dot"></div></div>
    <div class="bni${S.view==='progress'?' on':''}" data-action="nav-progress"><span class="bni-ic">↑</span>Progress<div class="bni-dot"></div></div>
  </nav>
  ${S.modal?renderModal():''}
  ${pdfViewerState?renderPdfViewer():''}`;
}

/* ════════════════════════════════
   DASHBOARD
════════════════════════════════ */
function renderNowNext(){
  const tt=S.data?.timetable||[];
  if(!tt.length){
    return`<div id="nownext" class="live-card no-school" style="cursor:pointer;" data-action="nav-settings">
      <div class="live-dot"></div>
      <div class="live-info">
        <div class="live-badge">Timetable</div>
        <div class="live-subj">Import your Sentral timetable</div>
        <div class="live-detail">Get live class info, smart suggestions &amp; more</div>
      </div>
      <div style="font-size:13px;color:var(--acc);">Import →</div>
    </div>`;
  }
  const nn=getNowNext(tt);
  const getSubName=ev=>{const s=S.data.subjects.find(x=>x.id===ev.subjectId);return s?.name||ev.subjectName;};
  if(nn.type==='in-class'){
    const s=new Date(nn.ev.start),e=new Date(nn.ev.end);
    const pct=Math.min(100,((new Date()-s)/(e-s))*100);
    return`<div id="nownext" class="live-card in-class">
      <div class="live-dot"></div>
      <div class="live-info">
        <div class="live-badge">NOW IN CLASS</div>
        <div class="live-subj">${getSubName(nn.ev)}</div>
        <div class="live-detail">Period ${nn.ev.period} · ${nn.ev.room} · ends ${fmtTime(e)}</div>
        <div style="height:3px;background:rgba(58,120,85,.2);border-radius:2px;margin-top:8px;overflow:hidden;"><div style="width:${pct}%;height:100%;background:var(--ok);border-radius:2px;"></div></div>
      </div>
      <div id="live-countdown" class="live-time">${nn.mLeft}m<br><span style="font-size:12px;font-family:'DM Sans',sans-serif;font-weight:300;color:var(--ok);">left</span></div>
      <div class="live-action" data-action="quick-log" data-subject="${nn.ev.subjectId}">Log it</div>
    </div>`;
  }
  if(nn.type==='next'){
    return`<div id="nownext" class="live-card next">
      <div class="live-dot"></div>
      <div class="live-info">
        <div class="live-badge">UP NEXT</div>
        <div class="live-subj">${getSubName(nn.ev)}</div>
        <div class="live-detail">Period ${nn.ev.period} · ${nn.ev.room} · ${fmtTime(new Date(nn.ev.start))}</div>
      </div>
      <div id="live-countdown" class="live-time">${fmtMins(nn.mUntil)}<br><span style="font-size:12px;font-family:'DM Sans',sans-serif;font-weight:300;color:var(--acc);">away</span></div>
    </div>`;
  }
  if(nn.type==='no-school'){
    return`<div id="nownext" class="live-card no-school">
      <div class="live-dot"></div>
      <div class="live-info">
        <div class="live-badge">Next school day</div>
        <div class="live-subj">${nn.nextDayName}</div>
        <div class="live-detail">First up: ${S.data.subjects.find(x=>x.id===nn.nextFirst.subjectId)?.name||nn.nextFirst.subjectName} · ${fmtTime(new Date(nn.nextFirst.start))}</div>
      </div>
      <div style="font-size:13px;color:var(--tx3);">${fmtShort(nn.nextDate)}</div>
    </div>`;
  }
  if(nn.type==='done'){
    const covered=new Set(todaySess(S.data.sessions).map(s=>s.subject));
    return`<div id="nownext" class="live-card between">
      <div class="live-dot"></div>
      <div class="live-info">
        <div class="live-badge">Done for today</div>
        <div class="live-subj">${covered.size===S.data.subjects.length?'All subjects covered ✓':'Keep studying'}</div>
        <div class="live-detail">${covered.size}/${S.data.subjects.length} subjects covered today</div>
      </div>
      <div class="live-action" data-action="open-log">Log study</div>
    </div>`;
  }
  return'';
}

function renderDash(){
  const{sessions,subjects,name,year,timetable}=S.data;
  const streak=getStreak(sessions),best=getBest(sessions),risk=isRisk(sessions);
  const done=subjects.filter(sub=>subMinsToday(sessions,sub.id)>0);
  const tMins=dayMins(sessions,today()),wMins=weekMins(sessions),tSess=sessions.filter(s=>s.subject!=='grace').length;
  const exam=getExamDate(year),dLeft=daysUntil(exam.date);
  const h=new Date().getHours();
  const eName=esc(name);
  const greet=h<5?`Up late, ${eName}.`:h<12?`Morning, ${eName}.`:h<17?`Afternoon, ${eName}.`:`Evening, ${eName}.`;
  const sMsg=streak===0?'Start your streak today.':risk?'Log before midnight — streak at risk.':streak===1?'Day 1. Come back tomorrow.':streak<7?`${streak} days straight.`:`${streak} days. Don't stop.`;
  const R=37,CIRC=2*Math.PI*R,pct=Math.min(1,streak/30),dashVal=pct*CIRC;
  const daysActive=new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date)).size;
  const avgHpd=daysActive>0?totalMins(sessions)/60/daysActive:0;
  const cvPct=Math.round((done.length/subjects.length)*100);
  const recent=[...sessions].filter(s=>s.subject!=='grace').sort((a,b)=>b.ts-a.ts).slice(0,5);
  const todayTT=getTodayTT(timetable||[]);
  const hasTT=(timetable||[]).length>0;

  // Week dots — last 7 days
  const weekDays=['M','T','W','T','F','S','S'];
  const last7Dates=[];
  for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);last7Dates.push(localDate(d));}
  const sessSet=new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date));
  const weekDotsHtml=last7Dates.map((dt,i)=>{
    const isT=dt===today();
    const hasSess=sessSet.has(dt);
    const dayIdx=(new Date(dt+'T12:00:00').getDay()+6)%7; // Mon=0
    return`<div class="wdot${hasSess?' has-session':''}${isT?' is-today':''}" title="${fmtDate(dt)}">${weekDays[dayIdx]}</div>`;
  }).join('');

  return`
  <div class="dash-greet">
    <div class="dash-date">${new Date().toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long'})}</div>
    <div class="dash-name">${greet}</div>
  </div>

  ${renderNowNext()}

  ${avgHpd>0?`<div class="hsc-strip">
    <span class="hsc-lbl">Projection</span>
    <span class="hsc-days">~${Math.round((totalMins(sessions)/60+avgHpd*dLeft)*10)/10}h</span>
    <span class="hsc-txt">by ${exam.name} at current pace${dLeft<=0?' · <strong>Go!</strong>':''}</span>
  </div>`:''}

  <div class="streak-card${risk?' risk':''}">
    <div class="streak-body">
      <div class="ring-wrap">
        <svg class="ring-svg" width="88" height="88" viewBox="0 0 88 88">
          <circle class="ring-bg-c" cx="44" cy="44" r="${R}"/>
          <circle class="ring-fg" id="ring-fill" cx="44" cy="44" r="${R}" data-v="${dashVal}" data-full="${CIRC}" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}"/>
        </svg>
        <div class="ring-center">
          <div class="ring-n">${streak}</div>
          <div class="ring-u">${streak===1?'day':'days'}</div>
        </div>
      </div>
      <div class="streak-r">
        <div class="streak-badge-tag">${risk?'⚠ STREAK AT RISK':'STREAK'}</div>
        <div class="streak-headline">${sMsg}</div>
        <div class="streak-sub">Best: ${best} days · ${tSess} sessions total</div>
        <div class="streak-extras">
          ${graceAvail(S.data)&&streak>2&&!todaySess(sessions).length?`<div class="stag stag-grace" data-action="use-grace">✦ Grace day</div>`:''}
          ${streak>=7?`<div class="stag stag-fire">🔥 ${streak}+ days</div>`:''}
        </div>
        <div class="week-dots">${weekDotsHtml}</div>
      </div>
    </div>
  </div>

  ${[7,14,21,30,50,100].includes(streak)?`<div class="streak-milestone">🎯 <strong>${streak}-day milestone!</strong> You're in the top tier. Keep it going.</div>`:''}

  <div class="today-overview">
    <div class="ov-tile${tMins>=120?' green':''}">
      <div class="ov-lbl">Today</div>
      <div class="ov-val">${tMins?fmtDur(tMins):'—'}</div>
      <div class="ov-sub">${todaySess(sessions).length} session${todaySess(sessions).length!==1?'s':''}</div>
    </div>
    <div class="ov-tile">
      <div class="ov-lbl">This week</div>
      <div class="ov-val">${wMins?fmtDur(wMins):'—'}</div>
      <div class="ov-sub">${Math.round(wMins/60*10)/10}h logged</div>
    </div>
    <div class="ov-tile">
      <div class="ov-lbl">All time</div>
      <div class="ov-val">${fmtDur(totalMins(sessions))||'—'}</div>
      <div class="ov-sub">${tSess} sessions</div>
    </div>
    <div class="ov-tile${dLeft<=30?' accent':''}">
      <div class="ov-lbl">${exam.name}</div>
      <div class="ov-val">${Math.max(0,dLeft)}</div>
      <div class="ov-sub">days left</div>
    </div>
  </div>

  ${hasTT&&todayTT.length?`
  <div class="sec mb8"><span class="sec-lbl">Today's classes</span><span class="sec-link" data-action="nav-timetable">Full schedule →</span></div>
  <div class="schedule-strip mb16">
    ${todayTT.map(ev=>{
      const now=new Date(),s=new Date(ev.start),e=new Date(ev.end);
      const isCur=now>=s&&now<e,isPast=now>=e;
      const sub=S.data.subjects.find(x=>x.id===ev.subjectId);
      const pct=isCur?Math.min(100,((now-s)/(e-s))*100):0;
      return`<div class="period-card${isCur?' current':isPast?' past':' upcoming'}">
        <div class="pc-num">P${ev.period}</div>
        <div class="pc-subj">${sub?.name||ev.subjectName}</div>
        <div class="pc-room">${ev.room}</div>
        <div class="pc-time">${fmtTime(s)}–${fmtTime(e)}</div>
        ${isCur?`<div class="pc-bar"><div class="pc-bar-fill" data-period-prog data-start="${ev.start}" data-end="${ev.end}" style="width:${pct}%"></div></div>`:''}
        <div class="pc-log" data-action="quick-log" data-subject="${ev.subjectId}">+</div>
      </div>`;
    }).join('')}
  </div>`:hasTT?`
  <div class="sec mb8"><span class="sec-lbl">Schedule</span><span class="sec-link" data-action="nav-timetable">See week →</span></div>
  <div style="font-size:13px;color:var(--tx3);margin-bottom:14px;padding:10px 14px;background:var(--srf);border:1px solid var(--bd);border-radius:var(--rm);">No classes today — ${isWeekend(today())?'enjoy the weekend':'check your schedule'}.</div>`:''}

  <div class="cov-card">
    <div class="cov-top">
      <span class="cov-lbl">${done.length===subjects.length?'All subjects covered 🎯':done.length===0?'Tap a subject below to log':`${subjects.length-done.length} subject${subjects.length-done.length!==1?'s':''} left`}</span>
      <span class="cov-frac">${done.length}<small>/${subjects.length}</small></span>
    </div>
    <div class="cov-track"><div class="cov-fill${done.length===subjects.length?' done':''}" data-bw="${cvPct}" style="width:0%"></div></div>
  </div>

  <div class="sec"><span class="sec-lbl">Subjects</span><span class="sec-link" data-action="open-log">+ Log</span></div>
  <div class="sub-grid mb16">
    ${subjects.map(sub=>{
      const m=subMinsToday(sessions,sub.id),pct=Math.min(100,Math.round((m/sub.target)*100));
      const hasClassToday=hasTT&&todayTT.some(e=>e.subjectId===sub.id);
      const c=getSubjColor(sub);
      return`<div class="sub-tile${m>0?' done':hasClassToday?' has-class':''}" data-action="quick-log" data-subject="${sub.id}" style="${m>0?'':''}">
        <div class="sub-check">✓</div>
        ${hasClassToday&&m===0?`<div class="sub-class-dot"></div>`:''}
        <div class="sub-abb">${sub.abbr}</div>
        <div class="sub-name">${sub.name}</div>
        <div class="sub-time">${m>0?fmtDur(m)+' today':'Tap to log'}</div>
        <div class="sub-bar"><div class="sub-bar-f" data-bw="${pct}" style="width:0%"></div></div>
      </div>`;
    }).join('')}
  </div>

  <div class="sec"><span class="sec-lbl">Recent sessions</span><span class="sec-link" data-action="nav-history">All →</span></div>
  ${recent.length===0?`<div class="empty"><div class="empty-e">◎</div><div class="empty-t">Nothing logged yet</div><div class="empty-s">Even 15 minutes counts. Tap + below to log your first session, or press <kbd style="font-family:'DM Mono',monospace;font-size:10px;padding:1px 5px;background:var(--srf2);border:1px solid var(--bd);border-radius:3px;">L</kbd> on desktop.</div></div>`
  :`<div class="sess-list">${recent.map(renderSessRow).join('')}</div>`}`;
}

/* ════════════════════════════════
   TIMETABLE VIEW
════════════════════════════════ */
function renderTimetable(){
  const tt=S.data?.timetable||[];
  if(!tt.length){
    return`<div class="pg-title">Timetable</div>
    <div class="no-tt-card">
      <div class="no-tt-icon">📅</div>
      <div class="no-tt-t">No timetable imported yet</div>
      <div class="no-tt-s">Import your ICS from Sentral to get live class info, smart study suggestions, automatic subject pre-fill when logging, and a full weekly schedule view.</div>
      <label class="import-btn" for="ics-file-input">↑ Import .ics from Sentral</label>
    </div>`;
  }

  const tabs=['Today','Tomorrow','This week'];
  const now=new Date();
  let daysToShow=[];
  if(S.ttTab===0){daysToShow=[today()];}
  else if(S.ttTab===1){daysToShow=[addDays(today(),1)];}
  else{
    // Next 5 weekdays
    let d=today();
    for(let i=0;i<14&&daysToShow.length<5;i++){if(!isWeekend(d))daysToShow.push(d);d=addDays(d,1);}
  }

  function renderDay(dateStr){
    const evs=getDayTT(tt,dateStr);
    const dayName=dateStr===today()?'Today':dateStr===addDays(today(),1)?'Tomorrow':new Date(dateStr+'T12:00:00').toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'short'});
    return`<div class="tt-day">
      <div class="tt-day-hd"><span${dateStr===today()?' class="today-mark"':''}>${dayName}</span><span>${evs.reduce((a,e)=>a+(new Date(e.end)-new Date(e.start))/60000,0)/60|0}h ${evs.length} classes</span></div>
      ${evs.length===0?`<div style="padding:12px 0;font-size:13px;color:var(--tx3);">No classes${isWeekend(dateStr)?' — weekend':' scheduled'}.</div>`:`
      <div class="tt-list">${evs.map(ev=>{
        const s=new Date(ev.start),e=new Date(ev.end);
        const isCur=now>=s&&now<e,isPast=now>=e;
        const sub=S.data.subjects.find(x=>x.id===ev.subjectId);
        const c=getSubjColor(sub||{color:0});
        const pct=isCur?Math.min(100,((now-s)/(e-s))*100):0;
        const alreadyLogged=todaySess(S.data.sessions).some(sess=>sess.subject===ev.subjectId&&sess.date===dateStr);
        return`<div class="tt-item${isCur?' now':isPast?' past':''}">
          <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:${c.tx}"></div>
          <div class="tt-period">${ev.period}</div>
          <div class="tt-info">
            <div class="tt-name">${sub?.name||ev.subjectName}</div>
            <div class="tt-meta">${ev.room}${ev.teacher?' · '+ev.teacher:''}</div>
          </div>
          <div class="tt-times">${fmtTime(s)}<br><span style="color:var(--tx3)">${fmtTime(e)}</span></div>
          ${(isCur||isPast)&&!alreadyLogged?`<div class="tt-log" data-action="quick-log" data-subject="${ev.subjectId}">Log</div>`:''}
          ${alreadyLogged?`<div style="font-size:12px;color:var(--ok);">✓ Logged</div>`:''}
          ${isCur?`<div class="tt-progress"><div class="tt-progress-fill" data-period-prog data-start="${ev.start}" data-end="${ev.end}" style="width:${pct}%"></div></div>`:''}
        </div>`;
      }).join('')}</div>`}
    </div>`;
  }

  return`<div class="pg-title">Timetable</div>
  <div class="tt-tabs">${tabs.map((t,i)=>`<div class="tt-tab${S.ttTab===i?' on':''}" data-action="tt-tab" data-tab="${i}">${t}</div>`).join('')}</div>
  ${daysToShow.map(renderDay).join('')}
  <div style="margin-top:18px;">
    <label class="import-btn" for="ics-file-input" style="display:inline-flex;background:transparent;color:var(--tx2);border:1.5px solid var(--bd);padding:9px 16px;font-size:13px;cursor:pointer;border-radius:var(--r);">↻ Re-import ICS</label>
  </div>`;
}

/* ════════════════════════════════
   HISTORY
════════════════════════════════ */
function renderHistory(){
  const{sessions}=S.data;
  const cells=[];
  for(let i=111;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const ds=localDate(d);cells.push({date:ds,mins:dayMins(sessions,ds),isT:ds===today()});}
  const byDate={};
  sessions.filter(s=>s.subject!=='grace').forEach(s=>{if(!byDate[s.date])byDate[s.date]=[];byDate[s.date].push(s);});
  const sorted=Object.keys(byDate).sort((a,b)=>b.localeCompare(a));
  return`
  <div class="pg-title">History</div>
  <div class="stat3 mb16">
    <div class="stile"><div class="stile-l">Streak</div><div class="stile-v">${getStreak(sessions)}</div><div class="stile-s">days</div></div>
    <div class="stile"><div class="stile-l">Best streak</div><div class="stile-v">${getBest(sessions)}</div><div class="stile-s">days</div></div>
    <div class="stile"><div class="stile-l">Active days</div><div class="stile-v">${new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date)).size}</div><div class="stile-s">total</div></div>
  </div>
  <div class="sec mb8"><span class="sec-lbl">Activity · 16 weeks</span></div>
  <div class="hmap">
    <div class="hmap-grid">${cells.map(c=>{let cl='h0';if(c.mins>=10&&c.mins<30)cl='h1';else if(c.mins>=30&&c.mins<60)cl='h2';else if(c.mins>=60&&c.mins<120)cl='h3';else if(c.mins>=120)cl='h4';return`<div class="hc ${cl}${c.isT?' htoday':''}" title="${fmtShort(c.date)}: ${c.mins>0?fmtDur(c.mins):'—'}"></div>`;}).join('')}</div>
    <div class="hleg"><span>Less</span>${['h0','h1','h2','h3','h4'].map(c=>`<div class="hlc ${c}"></div>`).join('')}<span>More</span></div>
  </div>
  <div class="sec-lbl mb12">All sessions</div>
  ${sorted.length===0?`<div class="empty"><div class="empty-e">◎</div><div class="empty-t">No sessions yet</div><div class="empty-s">Your study history appears here once you start logging. Press + or <kbd style="font-family:'DM Mono',monospace;font-size:10px;padding:1px 5px;background:var(--srf2);border:1px solid var(--bd);border-radius:3px;">L</kbd> to log a session.</div></div>`:
  sorted.map(date=>{
    const ds=byDate[date].sort((a,b)=>b.ts-a.ts);
    return`<div style="margin-bottom:12px;">
      <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);padding-bottom:6px;display:flex;justify-content:space-between;"><span>${fmtDate(date)}</span><span>${fmtDur(ds.reduce((a,s)=>a+s.duration,0))}</span></div>
      <div class="sess-list">${ds.map(renderSessRow).join('')}</div>
    </div>`;
  }).join('')}`;
}

/* ════════════════════════════════
   STATS
════════════════════════════════ */
function renderStats(){
  const{sessions,subjects,year}=S.data;
  const wMins=weekMins(sessions);
  const tm=totalMins(sessions),th=Math.round(tm/60*10)/10;
  const ts=sessions.filter(s=>s.subject!=='grace').length;
  const avg=ts>0?Math.round(tm/ts):0;
  const dA=new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date)).size;
  const avgHpd=dA>0?tm/60/dA:0;
  const dLeft=Math.max(0,daysUntil(getExamDate(year).date));
  const proj=Math.round((th+avgHpd*dLeft)*10)/10;
  const ss=subjects.map(sub=>({...sub,mins:subMinsAll(sessions,sub.id),ct:sessions.filter(s=>s.subject===sub.id).length})).sort((a,b)=>b.mins-a.mins);
  const maxM=ss[0]?.mins||1;
  const last7=getLast7(),maxD=Math.max(...last7.map(d=>dayMins(sessions,d.date)),1);
  return`
  <div class="pg-title">Stats</div>
  <div class="stat-hero">
    <div><div class="sbv">${th}h</div><div class="sbl">Total hours</div></div>
    <div><div class="sbv">${ts}</div><div class="sbl">Sessions</div></div>
    <div><div class="sbv">${getBest(sessions)}</div><div class="sbl">Best streak</div></div>
    <div><div class="sbv">${avg}m</div><div class="sbl">Avg session</div></div>
  </div>
  <div class="proj-card mb16">
    <div class="proj-lbl">Exam projection</div>
    <div class="proj-v">~${proj} hours by ${getExamDate(year).name}</div>
    <div class="proj-s">At ${Math.round(avgHpd*10)/10}h/day avg · ${dA} active days · ${dLeft} days left</div>
  </div>
  <div class="card mb16" style="padding:16px 18px;">
    <div class="sec"><span class="sec-lbl">This week</span><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--tx3);">${fmtDur(wMins)} total</span></div>
    <div class="wk-chart">${last7.map(d=>{const m=dayMins(sessions,d.date);const isT=d.date===today();const pct=Math.max(m>0?6:0,Math.round((m/maxD)*100));return`<div class="wkbw"><div class="wkb${isT?' tod':''}" style="height:${pct}%" title="${fmtDur(m)}"></div><div class="wkd${isT?' tod':''}">${d.label}</div></div>`;}).join('')}</div>
  </div>
  <div class="card" style="padding:16px 18px;">
    <div class="sec"><span class="sec-lbl">By subject</span><span style="font-size:12px;color:var(--tx3);">All time</span></div>
    <div class="sub-stat-bars">${ss.map(sub=>{const pct=Math.round((sub.mins/maxM)*100);const h=Math.round(sub.mins/60*10)/10;const c=getSubjColor(sub);return`<div class="ssb-row">
        <div class="ssb-av" style="background:${c.bg};border-color:${c.bd};color:${c.tx};">${sub.abbr}</div>
        <div class="ssb-info">
          <div class="ssb-top"><span class="ssb-name">${sub.name}</span><span class="ssb-stat">${h}h · ${sub.ct} sess</span></div>
          <div class="ssb-track"><div class="ssb-fill" data-bw="${pct}" style="width:0%;background:${c.tx};"></div></div>
        </div>
      </div>`;}).join('')}</div>
  </div>`;
}

/* ════════════════════════════════
   PROGRESS VIEW
════════════════════════════════ */
function renderProgress(){
  const{sessions,subjects}=S.data;
  const real=sessions.filter(s=>s.subject!=='grace');

  function renderConfidenceTab(){
    if(real.length<3) return`<div class="empty"><div class="empty-e">📈</div><div class="empty-t">Not enough data yet</div><div class="empty-s">Log a few sessions with confidence ratings — your trends will appear here.</div></div>`;
    const cards = subjects.map(sub=>{
      const subSess=real.filter(s=>s.subject===sub.id&&s.confidence>0).sort((a,b)=>a.ts-b.ts);
      if(subSess.length<2) return null;
      const recent=subSess.slice(-10);
      const avg=v=>Math.round(v.reduce((a,s)=>a+s.confidence,0)/v.length*10)/10;
      const avgAll=avg(subSess);
      const avgRecent=avg(recent.slice(-3));
      const avgOld=avg(recent.slice(0,3));
      const delta=Math.round((avgRecent-avgOld)*10)/10;
      const c=getSubjColor(sub);
      const maxH=36;
      const bars=recent.map(s=>{
        const h=Math.round((s.confidence/5)*maxH);
        const col=s.confidence>=4?'var(--ok)':s.confidence>=3?'var(--acc)':'var(--err)';
        return`<div class="conf-bar" style="height:${h}px;background:${col};flex:1;" title="${CONF[s.confidence-1]} — ${fmtDate(s.date)}"></div>`;
      }).join('');
      const deltaClass=delta>0?'up':delta<0?'down':'flat';
      const deltaLabel=delta>0?`↑ ${delta}`:`${delta}`;
      return`<div class="conf-trend-card">
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:12px;">
          <div style="width:28px;height:28px;border-radius:6px;background:${c.bg};border:1px solid ${c.bd};display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:9px;color:${c.tx};font-weight:500;">${sub.abbr}</div>
          <div class="conf-subject-name" style="margin-bottom:0;">${sub.name}</div>
          <div class="conf-trend-delta ${deltaClass}" style="margin-left:auto;">${deltaLabel}</div>
        </div>
        <div class="conf-trend-row">${bars}</div>
        <div class="conf-legend" style="margin-top:10px;">
          <div><div class="conf-trend-val">${avgAll}</div><div class="conf-trend-label">Avg confidence</div></div>
          <div><div class="conf-trend-val">${subSess.length}</div><div class="conf-trend-label">Sessions</div></div>
          <div><div class="conf-trend-val">${avgRecent}</div><div class="conf-trend-label">Recent 3</div></div>
        </div>
      </div>`;
    }).filter(Boolean);
    // Weak areas
    const weak=subjects.filter(sub=>{
      const s=real.filter(x=>x.subject===sub.id&&x.confidence>0);
      if(s.length<2) return false;
      const avg=s.slice(-5).reduce((a,x)=>a+x.confidence,0)/Math.min(5,s.length);
      return avg<3;
    });
    const insightHtml=weak.length?`
    <div class="insight-card warn">
      <div class="insight-icon">⚠</div>
      <div class="insight-text">
        <div class="insight-title">Weak areas: ${weak.map(s=>s.name).join(', ')}</div>
        <div class="insight-body">Your recent confidence in ${weak.length===1?'this subject':'these subjects'} is low. Prioritise them this week.</div>
      </div>
    </div>`:'';
    const topSub=subjects.find(sub=>{
      const s=real.filter(x=>x.subject===sub.id&&x.confidence>0);
      if(s.length<3) return false;
      const avg=s.slice(-5).reduce((a,x)=>a+x.confidence,0)/Math.min(5,s.length);
      return avg>=4;
    });
    const goodHtml=topSub?`
    <div class="insight-card good">
      <div class="insight-icon">💪</div>
      <div class="insight-text">
        <div class="insight-title">Strong in ${topSub.name}</div>
        <div class="insight-body">Consistently confident. Don't neglect it but you've got this one.</div>
      </div>
    </div>`:'';
    return insightHtml+goodHtml+(cards.length?cards.join(''):`<div class="empty"><div class="empty-e">📊</div><div class="empty-t">Rate your sessions</div><div class="empty-s">Tap an emoji when logging to track confidence trends.</div></div>`);
  }

  function renderTopicsTab(){
    const subjectsWithSessions=subjects.filter(sub=>real.some(s=>s.subject===sub.id));
    if(!subjectsWithSessions.length) return`<div class="empty"><div class="empty-e">📚</div><div class="empty-t">No sessions yet</div><div class="empty-s">Log sessions with topics selected to track your coverage.</div></div>`;
    return subjectsWithSessions.map(sub=>{
      const topics=getTopicsForSubject(sub);
      const studiedTopics=new Set(real.filter(s=>s.subject===sub.id&&s.topic).map(s=>s.topic));
      const c=getSubjColor(sub);
      const coverage=topics.length?Math.round((studiedTopics.size/topics.length)*100):0;
      const topicTags=topics.map(t=>`<div class="topic-tag ${studiedTopics.has(t)?'studied':'unstudied'}">${t}</div>`).join('');
      return`<div class="topic-coverage-card">
        <div class="topic-sub-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:26px;height:26px;border-radius:5px;background:${c.bg};border:1px solid ${c.bd};display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:9px;color:${c.tx};font-weight:500;">${sub.abbr}</div>
            <span class="topic-sub-name">${sub.name}</span>
          </div>
          <span class="topic-sub-count">${studiedTopics.size}/${topics.length} topics · ${coverage}%</span>
        </div>
        <div style="height:4px;background:var(--srf2);border-radius:2px;overflow:hidden;margin-bottom:10px;">
          <div style="height:100%;width:${coverage}%;background:${coverage>=70?'var(--ok)':'var(--acc)'};border-radius:2px;transition:width .5s cubic-bezier(.4,0,.2,1);"></div>
        </div>
        <div class="topic-tags-list">${topicTags}</div>
      </div>`;
    }).join('');
  }

  function renderMomentumTab(){
    // Last 8 weeks of data
    const weeks=[];
    for(let i=7;i>=0;i--){
      const mon=new Date();mon.setDate(mon.getDate()-(mon.getDay()||7)+1-i*7);
      const monStr=mon.toISOString().split('T')[0];
      const sun=new Date(mon);sun.setDate(sun.getDate()+6);
      const sunStr=sun.toISOString().split('T')[0];
      const wSess=real.filter(s=>s.date>=monStr&&s.date<=sunStr);
      const mins=wSess.reduce((a,s)=>a+s.duration,0);
      const isCur=i===0;
      const label=isCur?'This wk':mon.toLocaleDateString('en-AU',{day:'numeric',month:'short'});
      weeks.push({mins,label,isCur,sessions:wSess.length});
    }
    const maxMins=Math.max(...weeks.map(w=>w.mins),1);
    const thisWeek=weeks[7];
    const lastWeek=weeks[6];
    const trendPct=lastWeek.mins>0?Math.round(((thisWeek.mins-lastWeek.mins)/lastWeek.mins)*100):null;
    const avgWeekly=Math.round(weeks.slice(0,7).reduce((a,w)=>a+w.mins,0)/7);
    const best=weeks.reduce((b,w)=>w.mins>b.mins?w:b,{mins:0});
    // Is current pace above average?
    const aboveAvg=thisWeek.mins>avgWeekly;
    const totalSessions=real.length;
    const avgSessLen=totalSessions>0?Math.round(totalMins(sessions)/totalSessions):0;
    const bars=weeks.map((w,i)=>{
      const pct=Math.max(w.mins>0?4:0,Math.round((w.mins/maxMins)*100));
      const cls=w.isCur?'cur':w.mins>=avgWeekly?'improv':'past';
      return`<div class="mom-bar-w">
        <div class="mom-bar ${cls}" style="height:${pct}%" title="${fmtDur(w.mins)}"></div>
        <div class="mom-label${w.isCur?' cur':''}">${w.isCur?'Now':String(i+1)}</div>
      </div>`;
    }).join('');
    const trendInsight=trendPct!==null?`
    <div class="insight-card ${trendPct>=0?'good':'warn'}">
      <div class="insight-icon">${trendPct>=0?'📈':'📉'}</div>
      <div class="insight-text">
        <div class="insight-title">${trendPct>=0?`Up ${trendPct}% vs last week`:`Down ${Math.abs(trendPct)}% vs last week`}</div>
        <div class="insight-body">${trendPct>=10?'Strong momentum. Keep it going.':trendPct>=0?'Slight improvement. Build on it.':trendPct>=-15?'A bit less than last week. Normal fluctuation.':'Significantly less than last week. Get back on track.'}</div>
      </div>
    </div>`:'';
    return`
    <div class="card mb12" style="padding:16px 18px;">
      <div class="sec mb12"><span class="sec-lbl">Weekly hours — 8 weeks</span></div>
      <div class="momentum-chart">${bars}</div>
      <div class="momentum-summary">
        <div><div class="mom-stat-v">${fmtDur(thisWeek.mins)||'—'}</div><div class="mom-stat-l">This week</div></div>
        <div><div class="mom-stat-v">${fmtDur(avgWeekly)||'—'}</div><div class="mom-stat-l">Weekly avg</div></div>
        <div><div class="mom-stat-v">${fmtDur(best.mins)||'—'}</div><div class="mom-stat-l">Best week</div></div>
      </div>
    </div>
    ${trendInsight}
    <div class="card" style="padding:16px 18px;">
      <div class="sec-lbl mb12">Patterns</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="stile"><div class="stile-l">Avg session</div><div class="stile-v">${avgSessLen}m</div><div class="stile-s">per study block</div></div>
        <div class="stile"><div class="stile-l">Sessions/week</div><div class="stile-v">${Math.round(totalSessions/Math.max(1,weeks.filter(w=>w.mins>0).length)*10)/10}</div><div class="stile-s">avg active weeks</div></div>
        <div class="stile"><div class="stile-l">Most studied</div><div class="stile-v" style="font-size:18px;">${(()=>{const top=subjects.map(s=>({s,m:subMinsAll(sessions,s.id)})).sort((a,b)=>b.m-a.m)[0];return top?.s.abbr||'—';})()}</div><div class="stile-s">by time</div></div>
        <div class="stile${aboveAvg?' green':''}"><div class="stile-l">This week</div><div class="stile-v" style="font-size:18px;">${aboveAvg?'↑':'↓'}</div><div class="stile-s">${aboveAvg?'above avg':'below avg'}</div></div>
      </div>
    </div>`;
  }

  function renderScoresTab(){
    const{tests=[],subjects,sessions}=S.data;
    const real=sessions.filter(s=>s.subject!=='grace');
    if(!tests.length) return`
    <div class="empty">
      <div class="empty-e">📝</div>
      <div class="empty-t">No test scores yet</div>
      <div class="empty-s">Tap "＋ Log Test Score" to record a result. Once you have scores, Meridian will predict your next one.</div>
    </div>
    <button class="log-submit" data-action="open-log-test" style="margin-top:12px;">＋ Log Test Score</button>`;

    // Next upcoming test (from tests with nextTestDate set)
    const upcoming=tests.filter(t=>t.nextTestDate&&t.nextTestDate>today()).sort((a,b)=>a.nextTestDate.localeCompare(b.nextTestDate));
    const nextTest=upcoming[0];
    const nextDays=nextTest?daysUntil(nextTest.nextTestDate):null;
    const nextSub=nextTest?subjects.find(s=>s.id===nextTest.subject):null;

    const upcomingHtml=nextTest?`
    <div class="next-test-card">
      <div class="ntc-days">${nextDays}</div>
      <div class="ntc-info">
        <div class="ntc-label">Next test</div>
        <div class="ntc-name">${nextTest.nextTestName||nextSub?.name||'Test'}</div>
        <div class="ntc-sub">${nextSub?.name||''} · ${new Date(nextTest.nextTestDate+'T12:00:00').toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'})}</div>
      </div>
      <div class="ntc-action" data-action="open-log-test">Log score</div>
    </div>`:'';

    // Prediction cards for each subject with tests
    const subjectsWithTests=subjects.filter(sub=>tests.some(t=>t.subject===sub.id));
    const predCards=subjectsWithTests.map(sub=>{
      const subTests=getSubjectTests(tests,sub.id);
      const nextT=upcoming.find(t=>t.subject===sub.id);
      const daysToNext=nextT?daysUntil(nextT.nextTestDate):30;
      const pred=predictNextScore(S.data,sub.id,daysToNext);
      const c=getSubjColor(sub);
      const avgPct=getSubjectScorePct(tests,sub.id);
      const grade=avgPct?getTestGrade(avgPct):{letter:'—',color:'var(--tx3)'};

      // Mini bar chart of test history
      const maxScore=Math.max(...subTests.map(t=>t.score/t.outOf*100),1);
      const bars=subTests.slice(-6).map(t=>{
        const pct=t.score/t.outOf*100;
        const g=getTestGrade(pct);
        const h=Math.max(4,Math.round((pct/100)*36));
        return`<div class="thm-bar" style="height:${h}px;background:${g.color};" title="${pct.toFixed(0)}% — ${t.name}"></div>`;
      }).join('');

      // Improvement tip
      let tip='';
      if(pred){
        const gap=pred.point-avgPct;
        if(pred.coverage<0.5){tip=`Cover more topics — you've studied ${Math.round(pred.coverage*100)}% of the ${sub.name} curriculum.`;}
        else if(pred.confFactor<1){tip=`Confidence is trending down in ${sub.name}. Review the basics — could be a gap in fundamentals.`;}
        else if(pred.studyFactor<1){tip=`Study hours are below your average for ${sub.name} lately. Bump it up in the next ${pred.days||14} days.`;}
        else if(gap>0){tip=`You're on track to improve by ~${gap.toFixed(0)} points. Keep the current pace.`;}
      }

      return`<div class="scores-subject-block">
        <div class="scores-subject-hd">
          <div style="width:30px;height:30px;border-radius:7px;background:${c.bg};border:1px solid ${c.bd};display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:9px;color:${c.tx};font-weight:500;">${sub.abbr}</div>
          <div style="flex:1;">
            <div style="font-size:13.5px;font-weight:500;color:var(--tx);letter-spacing:-.01em;">${sub.name}</div>
            <div style="font-size:11px;color:var(--tx3);">${subTests.length} test${subTests.length!==1?'s':''} · avg <span style="color:${grade.color};font-weight:500;">${avgPct?.toFixed(0)||'—'}%</span></div>
          </div>
          <div class="test-history-mini">${bars}</div>
        </div>

        ${pred?`<div class="pred-card">
          <div class="pred-label">Predicted next score${nextT?' · '+nextDays+'d away':''}</div>
          <div class="pred-range-row">
            <div class="pred-main">${pred.point}<span class="pred-pct">%</span></div>
            <div class="pred-range">${pred.lo}–${pred.hi}%</div>
          </div>
          <div class="pred-sub">Range based on ${subTests.length} past test${subTests.length!==1?'s':''}, study pace &amp; topic coverage. Never shown above 96%.</div>
          <div class="pred-bar-track">
            <div class="pred-bar-fill" style="width:${pred.point}%;background:linear-gradient(90deg,rgba(255,255,255,.3),rgba(255,255,255,.7));"></div>
          </div>
          <div class="pred-factors">
            ${pred.factors.map(f=>`<div class="pred-factor-row">
              <div class="pred-factor-icon">${f.icon}</div>
              <div class="pred-factor-label">${f.label}</div>
              <div class="pred-factor-val${f.positive===true?' pos':f.positive===false?' neg':''}">${f.value}</div>
            </div>`).join('')}
          </div>
        </div>`:
        `<div class="insight-card info"><div class="insight-icon">💡</div><div class="insight-text"><div class="insight-title">Log more data for predictions</div><div class="insight-body">Need at least 1 test score and some study sessions to generate a prediction for ${sub.name}.</div></div></div>`}

        ${subTests.slice().reverse().map(t=>{
          const pct=t.score/t.outOf*100;
          const g=getTestGrade(pct);
          return`<div class="test-card">
            <div class="test-score-circle" style="border-color:${g.color};color:${g.color};">
              <div class="test-score-pct">${pct.toFixed(0)}%</div>
              <div class="test-score-grade">${g.letter}</div>
            </div>
            <div class="test-info">
              <div class="test-name">${t.name}</div>
              <div class="test-meta">${fmtDate(t.date)} · ${t.type}</div>
            </div>
            <div class="test-raw">${t.score}/${t.outOf}</div>
            <div class="del-btn" data-action="del-test" data-id="${t.id}">✕</div>
          </div>`;
        }).join('')}

        ${tip?`<div class="improve-tip">💡 <strong>To improve:</strong> ${tip}</div>`:''}
      </div>`;
    }).join('');

    return`
    ${upcomingHtml}
    ${predCards}
    <button class="log-submit" data-action="open-log-test">＋ Log Test Score</button>`;
  }

  const content=[renderConfidenceTab,renderScoresTab,renderTopicsTab,renderMomentumTab][S.progTab]?.();
  const progTabs=['Confidence','Scores','Topics','Momentum'];
  return`
  <div class="pg-title">Progress</div>
  <div class="prog-tabs">${progTabs.map((t,i)=>`<div class="prog-tab${S.progTab===i?' on':''}" data-action="prog-tab" data-tab="${i}">${t}</div>`).join('')}</div>
  ${content}`;
}

/* ════════════════════════════════
   PAPERS LIBRARY
════════════════════════════════ */

// thsconline subject map — codes that matter for Ames's subjects
const THSC_SUBJECTS = [
  {code:'5330', label:'Maths Ext 1', unit:'Yr 11/12', color:3},
  {code:'5340', label:'Maths Ext 2', unit:'Yr 12', color:3},
  {code:'5320', label:'Maths Advanced', unit:'Yr 11/12', color:4},
  {code:'1370', label:'Biology', unit:'Yr 11/12', color:1},
  {code:'6520', label:'Physics', unit:'Yr 11/12', color:2},
];

// HSCpapers.json course names to match Ames's subjects
const HSC_COURSE_MAP = {
  'Chemistry':'Chemistry',
  'Biology':'Biology',
  'Physics':'Physics',
  'Mathematics Advanced':'Maths Advanced',
  'Mathematics Extension 1':'Maths Ext 1',
  'Mathematics Extension 2':'Maths Ext 2',
  'English Advanced':'English Advanced',
  'Engineering Studies':'Engineering',
};

let papersCache = null; // {local, thsc, hsc}
let pdfViewerState = null; // {url, title}

async function loadPapersData(force=false){
  if(papersCache && !force) return papersCache;
  const result = {local:[], thsc:[], hsc:[]};

  // 1. Load local papers/index.json (optional — skip if folder doesn't exist)
  try {
    const head = await fetch(window.PAPERS_DIR + 'index.json', {method:'HEAD'});
    if(head.ok){
      const r = await fetch(window.PAPERS_DIR + 'index.json', {cache:'no-cache'});
      const items = await r.json();
      result.local = items.map(p=>({
        ...p,
        id: 'local-'+p.file,
        url: window.PAPERS_DIR + p.file,
        source: 'mine',
        thumbUrl: null,
      }));
    }
  } catch(e){}

  // 2. Load thsconline numbered JSONs (official HSC papers per subject)
  const thscFetches = THSC_SUBJECTS.map(async s=>{
    try {
      const r = await fetch(`https://raw.githubusercontent.com/thsconline/json/master/${s.code}.json`);
      if(!r.ok) return [];
      const data = await r.json();
      const entries = [];
      for(const [key,val] of Object.entries(data)){
        if(key === 'header') continue;
        if(!val.pdfData) continue;
        // Parse year from key like "2023 HSC"
        const yearMatch = key.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : '';
        const isMarkingScheme = key.toLowerCase().includes('marking') || key.toLowerCase().includes('solution');
        entries.push({
          id: `thsc-${s.code}-${key}`,
          title: val.title || key,
          url: val.pdfData,
          subject: s.label,
          unit: s.unit,
          source: 'thsconline',
          year,
          type: isMarkingScheme ? 'Marking Scheme' : 'HSC Paper',
          hasSolutions: isMarkingScheme,
          color: s.color,
        });
      }
      return entries;
    } catch(e){ return []; }
  });
  const thscResults = await Promise.all(thscFetches);
  result.thsc = thscResults.flat();

  // 3. Load HSCpapers.json for Chemistry + English Advanced (not in numbered files)
  try {
    const r = await fetch('https://raw.githubusercontent.com/thsconline/json/master/HSCpapers.json');
    if(r.ok){
      const courses = await r.json();
      for(const course of courses){
        const mappedName = HSC_COURSE_MAP[course.course_name];
        if(!mappedName) continue;
        // Only add subjects NOT already covered by numbered files
        const alreadyCovered = THSC_SUBJECTS.some(s=>s.label===mappedName);
        const colorIdx = {Chemistry:0, 'English Advanced':5}[mappedName] ?? 6;
        for(const pack of (course.packs||[])){
          for(const doc of (pack.docs||[])){
            if(!doc.doc_link) continue;
            const isMS = doc.doc_name.toLowerCase().includes('marking') || doc.doc_name.toLowerCase().includes('solution') || doc.doc_name.toLowerCase().includes('notes');
            result.hsc.push({
              id: `hsc-${course.course_name}-${pack.year}-${doc.doc_name}`,
              title: `${course.course_name} ${pack.year} — ${doc.doc_name}`,
              url: doc.doc_link,
              subject: mappedName,
              unit: 'Yr 12',
              source: alreadyCovered ? 'thsconline' : 'HSC Official',
              year: pack.year,
              type: isMS ? 'Marking Scheme' : 'HSC Paper',
              hasSolutions: isMS,
              color: colorIdx,
            });
          }
        }
      }
    }
  } catch(e){}

  papersCache = result;
  return result;
}

function renderPapers(){
  const data = S.papersData;

  // Trigger load if not yet done
  if(!data && !S.papersLoading){
    S.papersLoading = true;
    loadPapersData().then(d=>{
      S.papersData = d;
      S.papersLoading = false;
      if(S.view==='papers') render();
    });
  }

  if(S.papersLoading || !data){
    return`
    <div class="pg-title">Papers</div>
    <div class="papers-loading">
      <div class="papers-spinner"></div>
      Loading papers from thsconline…
    </div>`;
  }

  // Merge and flatten all papers
  const all = [
    ...data.local,
    ...data.thsc,
    ...data.hsc,
  ];

  // Filter
  let filtered = all.filter(p=>{
    if(S.papersSubFilter !== 'All' && p.subject !== S.papersSubFilter) return false;
    if(S.papersYrFilter !== 'All'){
      const yr = S.papersYrFilter; // 'Yr 11' or 'Yr 12'
      if(p.unit && !p.unit.includes(yr.replace('Yr ',''))) return false;
    }
    if(S.papersSrcFilter !== 'All' && p.source !== S.papersSrcFilter) return false;
    if(S.papersTypeFilter !== 'All' && (p.type||'Paper') !== S.papersTypeFilter) return false;
    if(S.papersSearch){
      const q = S.papersSearch.toLowerCase();
      const haystack = (p.title+' '+(p.subject||'')+' '+(p.topics||[]).join(' ')+' '+(p.year||'')).toLowerCase();
      if(!haystack.includes(q)) return false;
    }
    // Default: hide marking schemes unless explicitly searching
    if(!S.papersSearch && (p.type==='Marking Scheme')) return false;
    return true;
  });

  // Sort
  if(S.papersSort==='subject') filtered.sort((a,b)=>(a.subject||'').localeCompare(b.subject||''));
  else if(S.papersSort==='title') filtered.sort((a,b)=>a.title.localeCompare(b.title));
  else filtered.sort((a,b)=>(b.year||'0').localeCompare(a.year||'0')); // newest first

  // Subject options from data
  const allSubjects = [...new Set(all.map(p=>p.subject).filter(Boolean))].sort();

  // Filter dropdowns
  const subjectOpts = ['All',...allSubjects].map(s=>
    `<option value="${s}"${S.papersSubFilter===s?' selected':''}>${s}</option>`
  ).join('');

  const srcOpts = ['All','mine','thsconline','HSC Official'].map(s=>
    `<option value="${s}"${S.papersSrcFilter===s?' selected':''}>${s==='All'?'All sources':s==='mine'?'My Papers':s==='thsconline'?'thsconline':'HSC Official'}</option>`
  ).join('');

  const yrOpts = ['All','Yr 11','Yr 12'].map(y=>
    `<option value="${y}"${S.papersYrFilter===y?' selected':''}>${y==='All'?'All years':y}</option>`
  ).join('');

  const allTypes = [...new Set(all.map(p=>p.type||'Paper').filter(Boolean))].sort();
  const typeOpts = ['All',...allTypes].map(t=>
    `<option value="${t}"${S.papersTypeFilter===t?' selected':''}>${t==='All'?'All types':t}</option>`
  ).join('');

  const hasLocal = data.local.length > 0;
  const localSection = !hasLocal ? `
  <div class="papers-upload-prompt">
    <div class="papers-upload-icon">📂</div>
    <div class="papers-upload-title">Add your own PDFs</div>
    <div class="papers-upload-sub">Create a <code style="font-family:'DM Mono',monospace;background:var(--srf3);padding:1px 5px;border-radius:3px;">papers/</code> folder next to your HTML file, add your PDFs, and create <code style="font-family:'DM Mono',monospace;background:var(--srf3);padding:1px 5px;border-radius:3px;">papers/index.json</code> to describe them. PDFs you make with Claude automatically get thumbnails rendered from page 1.</div>
    <div class="papers-upload-code">[
  {
    "file": "math-ext1-perms-t1.pdf",
    "title": "Perms &amp; Combs — Set 1",
    "subject": "Maths Ext 1",
    "unit": "Yr 11",
    "topics": ["Permutations","Combinations"],
    "source": "mine",
    "date": "2025-03"
  }
]</div>
  </div>` : '';

  const cards = filtered.map(p=>{
    const c = p.color!==undefined ? getSubjColor({color:p.color}) : {bg:'var(--srf2)',tx:'var(--tx3)',bd:'var(--bd)'};
    const srcBadge = p.source==='mine'
      ? `<div class="paper-src-badge badge-mine">Mine</div>`
      : p.source==='thsconline'
      ? `<div class="paper-src-badge badge-thsc">thsconline</div>`
      : `<div class="paper-src-badge badge-hsc">HSC</div>`;
    const solDot = p.hasSolutions ? `<div class="paper-sol-dot" title="Solutions available"></div>` : '';
    const topicTags = (p.topics||[]).slice(0,4).map(t=>`<span class="paper-topic-tag">${t}</span>`).join('');

    return`<div class="paper-card" data-action="open-paper" data-url="${p.url}" data-title="${p.title.replace(/"/g,'&quot;')}" data-id="${p.id}">
      <div class="paper-thumb" id="thumb-${p.id}">
        ${p.source==='mine'
          ? `<canvas id="canvas-${p.id}" data-pdf-url="${p.url}"></canvas>`
          : `<div class="paper-thumb-placeholder">
              <div class="ptp-subject" style="background:${c.bg};color:${c.tx};border:1px solid ${c.bd};">${p.subject||'HSC'}</div>
              <div class="ptp-year">${p.year||''}</div>
              <div class="ptp-type">${p.type||'Paper'}</div>
              <div class="ptp-icon">📄</div>
            </div>`
        }
        ${srcBadge}
        ${solDot}
      </div>
      <div class="paper-info">
        <div class="paper-title">${p.title}</div>
        <div class="paper-meta">
          ${p.unit?`<span class="pm-tag" style="background:${c.bg};color:${c.tx};border-color:${c.bd};">${p.unit}</span>`:''}
          ${p.year?`<span class="pm-tag" style="background:var(--srf2);color:var(--tx3);border-color:var(--bd);">${p.year}</span>`:''}
        </div>
        ${topicTags?`<div class="paper-topics">${topicTags}</div>`:''}
      </div>
    </div>`;
  }).join('');

  return`
  <div class="pg-title">Papers</div>
  <div class="papers-bar">
    <div class="papers-search">
      <span class="papers-search-icon">🔍</span>
      <input id="papers-search-inp" type="search" placeholder="Search papers, topics, year…" value="${S.papersSearch}" data-action="papers-search">
    </div>
    <div class="filter-row">
      <select class="papers-filter-dd" id="pf-subject">${subjectOpts}</select>
      <select class="papers-filter-dd" id="pf-year">${yrOpts}</select>
      <select class="papers-filter-dd" id="pf-type">${typeOpts}</select>
      <select class="papers-filter-dd" id="pf-source">${srcOpts}</select>
    </div>
  </div>
  <div class="papers-sort-row">
    <span class="papers-count">${filtered.length} paper${filtered.length!==1?'s':''}</span>
    <div class="sort-chips">
      ${['date','subject','title'].map(s=>`<div class="filter-chip${S.papersSort===s?' on':''}" data-action="papers-sort-chip" data-val="${s}">${s==='date'?'Newest':s==='subject'?'Subject':'Title'}</div>`).join('')}
    </div>
  </div>
  ${localSection}
  ${filtered.length===0
    ? `<div class="empty"><div class="empty-e">📄</div><div class="empty-t">No papers match</div><div class="empty-s">Try clearing some filters or searching differently.</div></div>`
    : `<div class="papers-grid">${cards}</div>`
  }
  <div style="height:16px;"></div>`;
}

// Render PDF thumbnails via PDF.js after the view is painted
function renderPaperThumbs(){
  if(!window.pdfjsReady || !window.pdfjsLib) return;
  document.querySelectorAll('canvas[data-pdf-url]').forEach(async canvas=>{
    if(canvas.dataset.rendered) return;
    canvas.dataset.rendered = '1';
    try {
      const url = canvas.dataset.pdfUrl;
      const pdf = await window.pdfjsLib.getDocument({url, withCredentials:false}).promise;
      const page = await pdf.getPage(1);
      const vp = page.getViewport({scale:1});
      const scale = canvas.parentElement.offsetWidth / vp.width || 1;
      const vp2 = page.getViewport({scale: scale * 2}); // 2x for retina
      canvas.width = vp2.width;
      canvas.height = vp2.height;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.objectFit = 'cover';
      await page.render({canvasContext:canvas.getContext('2d'), viewport:vp2}).promise;
    } catch(e){
      // Fallback: show placeholder
      const par = canvas.parentElement;
      if(par) par.innerHTML = `<div class="paper-thumb-placeholder"><div class="ptp-icon" style="opacity:.3;font-size:28px;">📄</div><div class="ptp-type" style="margin-top:8px;">Preview unavailable</div></div>`;
    }
  });
}

function renderPdfViewer(){
  if(!pdfViewerState) return '';
  const src=esc(pdfViewerState.viewUrl||pdfViewerState.url);
  return`<div class="pdf-viewer-overlay" id="pdf-viewer">
    <div class="pdf-viewer-bar">
      <div class="pdf-close" data-action="close-pdf">✕</div>
      <div class="pdf-viewer-title">${esc(pdfViewerState.title)}</div>
      <div class="pdf-viewer-actions">
        <div class="pdf-viewer-btn" data-action="pdf-print" title="Print">🖨</div>
        <div class="pdf-viewer-btn" data-action="pdf-download" title="Download">↓</div>
        <div class="pdf-viewer-btn" data-action="pdf-newtab" title="Open in new tab">↗</div>
      </div>
    </div>
    <div class="pdf-viewer-frame">
      <iframe src="${src}" title="${esc(pdfViewerState.title)}"></iframe>
    </div>
  </div>`;
}

/* ════════════════════════════════
   TIMER VIEW
════════════════════════════════ */
function renderTimer(){
  const rem=Math.max(0,timerTarget-timerElap),m=Math.floor(rem/60),s=rem%60;
  return`
  <div class="pg-title">Timer</div>
  <div class="card" style="padding:0 20px 20px;">
    <div class="timer-face">
      <div class="timer-num${timerRunning?' run':''}" id="tt-time">${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</div>
      <div class="timer-status" id="tt-lbl">${timerRunning?'Running…':timerElap>0?'Paused — tap Resume':'Ready'}</div>
    </div>
    <div class="tprog"><div class="tbar" id="tt-bar" style="width:${Math.min(100,(timerElap/timerTarget)*100)}%"></div></div>
    <div class="tbtns">
      ${timerRunning
        ?`<button class="tbtn tbtn-s" data-action="timer-pause">⏸ Pause</button>`
        :`<button class="tbtn tbtn-p" data-action="timer-start">${timerElap>0?'▶ Resume':'▶ Start'}</button>`}
      <button class="tbtn tbtn-s" data-action="timer-reset">Reset</button>
      ${timerElap>0&&!timerRunning?`<button class="tbtn tbtn-p" style="background:var(--ok);border-color:var(--ok);" data-action="open-log">Log it →</button>`:''}
    </div>
    <div class="row-divider"></div>
    <div class="sec mb8"><span class="sec-lbl">Presets</span></div>
    <div class="dur-grid">${[15,20,25,30,45,60,90].map(t=>`<div class="dur-pill${timerTarget===t*60&&!timerRunning?' on':''}" data-action="set-timer" data-dur="${t}">${t}m</div>`).join('')}</div>
  </div>
  <div class="card" style="padding:14px 17px;margin-top:10px;border-left:3px solid var(--acc);">
    <div style="font-size:13px;color:var(--tx2);font-weight:300;line-height:1.65;"><strong style="font-weight:500;color:var(--tx);">How to use:</strong> Set a preset → start → study without distraction → tap <strong style="font-weight:500;color:var(--ok);">Log it</strong> when done. Your duration auto-fills.</div>
  </div>`;
}

/* ════════════════════════════════
   SETTINGS VIEW
════════════════════════════════ */
function renderSettings(){
  const{name,joined,sessions,subjects,year}=S.data;
  const sc=loadSync();
  const hasTT=(S.data.timetable||[]).length>0;
  return`
  <div class="pg-title">Settings</div>
  <div class="sset">
    <div class="sset-t">Account</div>
    <div class="srow"><span class="srow-l">Name</span><input type="text" id="sname" class="srow-v" value="${esc(name)}" maxlength="30" style="text-align:right;border:none;background:transparent;outline:none;font-family:'DM Mono',monospace;font-size:12px;color:var(--tx);"></div>
    <div class="srow"><span class="srow-l">Year</span><select id="syear" style="font-family:'DM Mono',monospace;font-size:12px;color:var(--tx);border:none;background:transparent;outline:none;cursor:pointer;appearance:none;">${[7,8,9,10,11,12].map(y=>`<option value="${y}"${y===year?' selected':''}>Year ${y}</option>`).join('')}</select></div>
    <div class="srow"><span class="srow-l">Exam target</span><span class="srow-v">${getExamDate(year).name} · ${Math.max(0,daysUntil(getExamDate(year).date))}d</span></div>
    <div class="srow"><span class="srow-l">Sessions logged</span><span class="srow-v">${sessions.filter(s=>s.subject!=='grace').length}</span></div>
    <div class="srow"><span class="srow-l">Total study time</span><span class="srow-v">${fmtDur(totalMins(sessions))}</span></div>
    <div class="srow"><span class="srow-l">Member since</span><span class="srow-v">${fmtShort(joined)}</span></div>
    <button class="m-submit" style="font-size:13.5px;padding:11px;" data-action="save-account">Save changes →</button>
  </div>

  <div class="sset">
    <div class="sset-t">Timetable (Sentral ICS)</div>
    <div class="srow" style="flex-direction:column;align-items:flex-start;gap:5px;">
      <span class="srow-l">Import your .ics file from Sentral</span>
      <span style="font-size:12px;color:var(--tx3);font-weight:300;">Settings → Calendar → Download ICS. Re-import whenever your timetable changes. Current: <b style="font-weight:500;">${hasTT?(S.data.timetable.length+' events'):'Not imported'}</b></span>
    </div>
    <label class="import-btn" for="ics-file-input" style="display:flex;margin-top:8px;">↑ ${hasTT?'Re-import':'Import'} ICS file</label>
  </div>

  <div class="sset">
    <div class="sset-t">Subjects</div>
    <div class="subj-mgr">
      ${subjects.map(sub=>`<div class="subj-item"><span class="subj-abb-s">${sub.abbr}</span><span class="subj-nm">${sub.name}</span><span class="srow-v">${sub.target}m/day</span><span class="subj-del" data-action="del-subj" data-id="${sub.id}">✕</span></div>`).join('')}
      <button class="add-subj" data-action="open-add-subj">＋ Add subject</button>
    </div>
  </div>

  <div class="sset">
    <div class="sset-t">Social login (Firebase)</div>
    <div class="firebase-setup">
      <strong style="color:var(--tx);">1. Firebase project setup:</strong><ol style="padding-left:16px;margin-top:4px;">
      <li>Go to <a href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a></li>
      <li>Create project → Authentication → Sign-in method</li>
      <li>Enable <strong>Google</strong> (just flip the toggle)</li>
      <li>Project settings → Your apps → Add web app → Copy config</li>
      <li>Open <code style="font-family:'DM Mono',monospace;background:var(--srf3);padding:1px 5px;border-radius:3px;">index.html</code>, find <code style="font-family:'DM Mono',monospace;background:var(--srf3);padding:1px 5px;border-radius:3px;">window.FIREBASE_CONFIG = null</code> and replace <code style="font-family:'DM Mono',monospace;background:var(--srf3);padding:1px 5px;border-radius:3px;">null</code> with your config object</li>
      <li>Add your domain to Firebase → Authentication → Authorised domains</li>
      </ol>
      <div style="margin-top:10px;"><strong style="color:var(--tx);">2. Enable GitHub login (optional):</strong></div>
      <ol style="padding-left:16px;margin-top:4px;">
      <li>Go to <a href="https://github.com/settings/developers" target="_blank">github.com/settings/developers</a> → OAuth Apps → New</li>
      <li>Set Homepage URL to your site (e.g. <code style="font-family:'DM Mono',monospace;background:var(--srf3);padding:1px 5px;border-radius:3px;">https://you.github.io/meridian</code>)</li>
      <li>Set Authorization callback URL — copy it from Firebase: Authentication → Sign-in method → GitHub → callback URL</li>
      <li>Copy the <strong>Client ID</strong> and <strong>Client secret</strong> from GitHub into the Firebase GitHub provider config</li>
      <li>Enable the GitHub provider in Firebase</li>
      </ol>
      <div style="margin-top:6px;color:var(--ok);">✓ Both providers are free. Works on GitHub Pages with zero server.</div>
    </div>
  </div>
  <div class="sset">
    <div class="sset-t">Cloud sync (JSONBin — free)</div>
    <div class="jbi-inst"><ol><li>Go to <a href="https://jsonbin.io" target="_blank">jsonbin.io</a> → create free account</li><li>API Keys → copy your Master Key</li><li>Paste below → Save & push</li></ol><div style="margin-top:5px;color:var(--tx3);">On another device: same key → Pull from cloud.</div></div>
    <div class="srow"><span class="srow-l">API Key</span><input type="password" id="sync-key" placeholder="$2a$10…" value="${sc.apiKey}" maxlength="80" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--tx);border:none;background:transparent;outline:none;text-align:right;width:150px;cursor:text;"></div>
    ${sc.binId?`<div class="srow"><span class="srow-l">Bin ID</span><span class="srow-v">${sc.binId.slice(-10)}…</span></div>`:''}
    <div class="sync-row"><div class="syncd${sc.status==='ok'?' ok':sc.status==='err'?' err':sc.status==='syncing'?' ing':''}"></div><span>${sc.status==='ok'?`Last synced ${sc.lastSynced?new Date(sc.lastSynced).toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'}):'—'}`:sc.status==='err'?'Sync error':'Not configured'}</span></div>
    <div style="display:flex;gap:8px;margin-top:6px;">
      <button class="cpbtn" data-action="save-sync" style="flex:1;">Save & push →</button>
      <button class="cpbtn" data-action="pull-cloud" style="flex:1;">↓ Pull</button>
    </div>
  </div>

  <div class="sset">
    <div class="sset-t">Offline backup</div>
    <button class="cpbtn" data-action="toggle-export">${S.showExport?'Hide':'Show export code'}</button>
    ${S.showExport?`<div style="margin-top:8px;"><div class="syncbox">${exportCode(S.data)}</div><button class="cpbtn" data-action="copy-export">Copy to clipboard</button></div>`:''}
  </div>

  <div class="sset">
    <div class="sset-t">Danger</div>
    <button class="dbtn" data-action="logout">Log out & clear data</button>
  </div>`;
}

/* ════════════════════════════════
   SESSION ROW
════════════════════════════════ */
function renderSessRow(s){
  const sub=S.data.subjects.find(x=>x.id===s.subject)||{name:s.subject,abbr:'?',color:0};
  const c=getSubjColor(sub);
  const dots=Array.from({length:5},(_,i)=>`<div class="cdot${i<s.confidence?' on':''}"></div>`).join('');
  const topicBadge=s.topic?`<span class="sess-topic">${s.topic}</span>`:'';
  return`<div class="sess-row">
    <div class="sess-av" style="background:${c.bg};border-color:${c.bd};color:${c.tx};">${sub.abbr}</div>
    <div class="sess-inf">
      <div class="sess-n">${sub.name}${topicBadge}</div>
      <div class="sess-m">${fmtDate(s.date)}${s.note?' · '+s.note:''}</div>
    </div>
    <div class="sess-right"><div class="sess-dur">${fmtDur(s.duration)}</div><div class="cdots">${dots}</div></div>
    <div class="del-btn" data-action="del-sess" data-id="${s.id}">✕</div>
  </div>`;
}

/* ════════════════════════════════
   MODALS
════════════════════════════════ */
function renderModal(){
  if(S.modal==='log')return renderLogModal();
  if(S.modal==='addsubj')return renderAddSubjModal();
  if(S.modal==='logscore')return renderLogTestModal();
  return'';
}

function renderLogTestModal(){
  const{subjects}=S.data;
  const score=parseInt(S.testScore)||0;
  const outOf=parseInt(S.testOutOf)||100;
  const pct=outOf>0&&score>0?Math.round(score/outOf*100):null;
  const grade=pct?getTestGrade(pct):{letter:'—',color:'var(--tx3)'};
  const TEST_TYPES=['Quiz','Test','Assessment','Exam','Assignment','Trial'];
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="mtitle">Log test score</div>
        <div class="msub">Record a result. Meridian will use it to predict your next score.</div>
      </div>
      <div class="modal-body">
        <div class="mlbl">Subject</div>
        <div class="sub-chips-grid" style="margin-bottom:16px;">
          ${subjects.map(sub=>{const c=getSubjColor(sub);return`<div class="sub-chip-item${S.testSub===sub.id?' on':''}" data-action="sel-test-sub" data-sub="${sub.id}">
            <div class="sub-chip-abb" style="${S.testSub===sub.id?'':'background:'+c.bg+';color:'+c.tx+';border-color:'+c.bd+';'}">${sub.abbr}</div>
            <div class="sub-chip-name">${sub.name}</div>
          </div>`;}).join('')}
        </div>

        <div class="mlbl">Test name</div>
        <input class="minp" id="test-name" type="text" placeholder="e.g. Term 2 Assessment Task" value="${S.testName}" maxlength="60">

        <div class="mlbl">Type</div>
        <div class="test-type-grid">
          ${TEST_TYPES.map(t=>`<div class="test-type-btn${S.testType===t?' on':''}" data-action="sel-test-type" data-type="${t}">${t}</div>`).join('')}
        </div>

        <div class="mlbl">Score</div>
        <div class="score-input-row">
          <input type="number" id="test-score" placeholder="72" min="0" value="${S.testScore}" inputmode="decimal">
          <div class="score-divider">/</div>
          <input type="number" id="test-outof" placeholder="100" min="1" value="${S.testOutOf}" inputmode="decimal">
        </div>
        ${pct?`<div class="score-preview">
          <div class="score-preview-pct" style="color:${grade.color};">${pct}%</div>
          <div class="score-preview-grade" style="color:${grade.color};">${grade.letter}</div>
        </div>`:''}

        <div class="mlbl">Test date</div>
        <input class="minp" id="test-date" type="date" value="${S.testDate}">

        <div class="mlbl">Next test date <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional — enables countdown & prediction</span></div>
        <input class="minp" id="test-next-date" type="date" value="${S.testNextDate}" min="${today()}">

        <div class="mlbl">Next test name <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional</span></div>
        <input class="minp" id="test-next-name" type="text" placeholder="e.g. Trial HSC" value="" maxlength="60" style="margin-bottom:18px;">

        ${S.logErr?`<div class="merr">${S.logErr}</div>`:''}
        <button class="log-submit" data-action="submit-test">Save Score</button>
        <div class="mcancel" data-action="close-modal">Cancel</div>
      </div>
    </div>
  </div>`;
}

function renderLogModal(){
  const{subjects}=S.data;
  const tElap=timerElap>0&&!timerRunning?Math.max(5,Math.ceil(timerElap/60)):null;
  const selSub=subjects.find(s=>s.id===S.logSub);
  const topics=selSub?getTopicsForSubject(selSub):[];
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div style="display:flex;align-items:baseline;justify-content:space-between;">
          <div class="mtitle">Log a session</div>
          <div style="font-family:'DM Mono',monospace;font-size:10px;color:var(--tx3);letter-spacing:.08em;">${new Date().toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'})}</div>
        </div>
        <div class="msub">${tElap?`⏱ Timer ran for <strong>${fmtDur(tElap)}</strong> — duration pre-filled.`:'Even 15 minutes. Just log it.'}</div>
      </div>
      <div class="modal-body">
        <div class="mlbl">Subject</div>
        <div class="sub-chips-grid">
          ${subjects.map(sub=>{
            const c=getSubjColor(sub);
            return`<div class="sub-chip-item${S.logSub===sub.id?' on':''}" data-action="sel-sub" data-sub="${sub.id}">
              <div class="sub-chip-abb" style="${S.logSub===sub.id?'':'background:'+c.bg+';color:'+c.tx+';border-color:'+c.bd+';'}">${sub.abbr}</div>
              <div class="sub-chip-name">${sub.name}</div>
            </div>`;
          }).join('')}
        </div>

        ${selSub&&topics.length?`
        <div class="mlbl">Topic <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional</span></div>
        <div class="topic-section">
          <div class="topic-scroll" id="topic-scroll">
            <div class="topic-chip${!S.logTopic?' on':''}" data-action="sel-topic" data-topic="">— Any</div>
            ${topics.map(t=>`<div class="topic-chip${S.logTopic===t?' on':''}" data-action="sel-topic" data-topic="${t}">${t}</div>`).join('')}
          </div>
        </div>`:''}

        <div class="mlbl">Duration</div>
        <div class="dur-grid">
          ${PRESETS.map(d=>`<div class="dur-pill${S.logDur===d&&!S.logCustom?' on':''}" data-action="sel-dur" data-dur="${d}">${fmtDur(d)}</div>`).join('')}
        </div>
        <div class="sl-row">
          <input type="range" min="5" max="240" step="5" value="${S.logDur}" id="dur-sl">
          <div class="slval" id="dur-disp">${fmtDur(S.logDur)}</div>
        </div>
        <div class="cust-row">
          <input type="number" id="cust-dur" placeholder="—" min="1" max="600" value="${S.logCustom}">
          <span>min (exact)</span>
        </div>

        <div class="mlbl" style="margin-top:2px;">How did it go?</div>
        <div class="conf-grid">
          ${CE.map((e,i)=>`<div class="conf-btn${S.logConf===i+1?' on':''}" data-action="sel-conf" data-conf="${i+1}">
            <span class="conf-emoji">${e}</span>
            <span class="conf-word">${CONF[i]}</span>
          </div>`).join('')}
        </div>

        <div class="mlbl">Note <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional</span></div>
        <textarea class="noteinp" id="log-note" placeholder="What did you cover? Any blockers?" maxlength="200">${S.logNote}</textarea>

        ${S.logErr?`<div class="merr">${S.logErr}</div>`:''}
        <button class="log-submit" data-action="submit-log">Log Session</button>
        <div class="mcancel" data-action="close-modal">Cancel</div>
      </div>
    </div>
  </div>`;
}

function renderAddSubjModal(){
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="mtitle">Add subject</div>
        <div class="msub">Track any subject — appears on your dashboard immediately.</div>
      </div>
      <div class="modal-body">
        <div class="mlbl">Subject name</div>
        <input class="minp" id="ns-name" type="text" placeholder="e.g. Legal Studies" value="${S.newName}" maxlength="40" autocorrect="off">
        <div class="mlbl">Abbreviation</div>
        <input class="minp" id="ns-abbr" type="text" placeholder="LS" maxlength="3" value="${S.newAbbr}" style="text-transform:uppercase;">
        <div class="mlbl">Daily study target (minutes)</div>
        <input class="minp" id="ns-target" type="number" placeholder="60" min="5" max="600" value="${S.newTarget}" style="margin-bottom:18px;">
        ${S.logErr?`<div class="merr">${S.logErr}</div>`:''}
        <button class="log-submit" data-action="save-subj">Add Subject</button>
        <div class="mcancel" data-action="close-modal">Cancel</div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════
   TOAST + FLASH
════════════════════════════════ */
let toastTm=null;
function showToast(msg,icon='✓'){
  const t=document.getElementById('toast');if(!t)return;
  document.getElementById('ti').textContent=icon;document.getElementById('tt').textContent=msg;
  t.classList.add('show');clearTimeout(toastTm);toastTm=setTimeout(()=>t.classList.remove('show'),2800);
}
function flashGreen(){const el=document.getElementById('flash');if(!el)return;el.classList.remove('go');requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('go')));}

/* ════════════════════════════════
   ACTIONS
════════════════════════════════ */
const A={
  'toggle-login':()=>{
    S.loginMode=S.loginMode==='login'?'register':'login';
    S.loginErr='';S.showImport=false;
    S.regStep=1;S.loginName='';S.loginPin='';S.regPin1='';
    render();
    setTimeout(()=>{
      document.getElementById('li-pin')?.focus();
      document.getElementById('reg-name')?.focus();
    },50);
  },
  'toggle-import':()=>{S.showImport=!S.showImport;render();},

  // ── Multi-step registration ──
  'reg-next':()=>{
    const step=S.regStep;
    S.loginErr='';
    if(step===1){
      const name=document.getElementById('reg-name')?.value?.trim();
      if(!name||name.length<1){S.loginErr='Enter your name.';render();return;}
      S.loginName=name;S.regStep=2;render();
      // Auto-focus first pin digit
      setTimeout(()=>document.getElementById('pd-0')?.focus(),80);
    } else if(step===2){
      // Collect pin from digit boxes
      const pin=[0,1,2,3].map(i=>document.getElementById('pd-'+i)?.value||'').join('');
      if(pin.length<4){S.loginErr='Enter a 4-digit PIN.';render();return;}
      S.regPin1=pin;S.regStep=3;render();
    } else if(step===3){
      S.regStep=4;render();
    }
  },

  'sel-year':(btn)=>{
    S.regYear=parseInt(btn.dataset.year);
    document.querySelectorAll('.year-btn').forEach(el=>el.classList.toggle('on',parseInt(el.dataset.year)===S.regYear));
  },

  'toggle-reg-subj':(btn)=>{
    const id=btn.dataset.id;
    const sel=new Set(S.regSubjects);
    if(sel.has(id))sel.delete(id);else sel.add(id);
    S.regSubjects=[...sel];
    // Update UI without full re-render
    btn.classList.toggle('on',sel.has(id));
    const chk=btn.querySelector('.subj-sel-check');
    if(chk)chk.textContent=sel.has(id)?'✓':'';
  },

  'reg-finish':()=>{
    S.loginErr='';
    if(S.regSubjects.length===0){S.loginErr='Select at least one subject.';render();return;}
    if(loadLocal()){S.loginErr='Account already exists. Log in instead.';S.loginMode='login';S.regStep=1;render();return;}
    const subs=ALL_PRESET_SUBS.filter(s=>S.regSubjects.includes(s.id));
    const acct=newAccount(S.loginName,S.regPin1,S.regYear,subs);
    S.data=acct;saveLocal(S.data);
    localStorage.setItem(AUTH_KEY,'1');
    S.showOnboardComplete=true;
    render();
  },

  'start-app':()=>{
    S.showOnboardComplete=false;S.view='dashboard';
    render();startLiveTick();
    // Start tutorial after short delay
    setTimeout(()=>{S.tutStep=1;renderTutorial();},600);
  },

  'login':()=>{
    const pin=document.getElementById('li-pin')?.value?.trim();
    const d=loadLocal();
    if(!d){S.loginErr='No account found — create one below.';render();return;}
    if(d.pin!==pin){S.loginErr='Wrong PIN. Try again.';render();return;}
    localStorage.setItem(AUTH_KEY,'1');
    S.data=d;S.view='dashboard';S.loginErr='';S.showPinEntry=false;
    render();startLiveTick();
  },

  // 'register' is now multi-step via reg-next / reg-finish
  // kept as alias for any legacy calls
  'register':()=>{S.loginMode='register';S.regStep=1;render();},

  'do-import':()=>{
    const code=document.getElementById('import-code')?.value;
    const d=importCode(code);
    if(!d){S.loginErr='Invalid code. Try copying again.';render();return;}
    saveLocal(d);S.data=d;S.view='dashboard';render();startLiveTick();
    showToast('Data imported. Welcome back, '+d.name+'.');
  },

  'lock-app':()=>{
    localStorage.removeItem(AUTH_KEY);
    S.data=null;S.view='login';S.showPinEntry=false;
    clearInterval(liveTickInt);render();
    showToast('App locked.','🔒');
  },
  'logout':()=>{
    if(!confirm('Log out and clear all local data?'))return;
    localStorage.removeItem(KEY);
    localStorage.removeItem(AUTH_KEY);
    S.data=null;S.view='login';S.loginMode='login';S.loginErr='';
    S.regStep=1;S.loginName='';S.loginPin='';S.regPin1='';S.showOnboardComplete=false;S.showPinEntry=false;
    clearInterval(liveTickInt);
    document.getElementById('tut-overlay')?.remove();
    render();
  },

  'nav-dashboard':()=>{S.view='dashboard';S.modal=null;render();},
  'nav-timetable':()=>{S.view='timetable';S.modal=null;render();},
  'nav-history':()=>{S.view='history';S.modal=null;render();},
  'nav-stats':()=>{S.view='stats';S.modal=null;render();},
  'nav-timer':()=>{S.view='timer';S.modal=null;render();},
  'nav-settings':()=>{S.view='settings';S.modal=null;render();},

  'tt-tab':(btn)=>{S.ttTab=parseInt(btn.dataset.tab);render();},

  'open-log':()=>{
    S.modal='log';S.logNote='';S.logErr='';S.logCustom='';S.logTopic=null;
    S.logDur=timerElap>0&&!timerRunning?Math.max(5,Math.ceil(timerElap/60)):45;
    S.logSub=S.data.timetable?getSmartSubject(S.data.timetable,S.data.subjects):null;
    render();
  },
  'quick-log':(btn)=>{S.modal='log';S.logSub=btn.dataset.subject;S.logDur=45;S.logConf=3;S.logNote='';S.logErr='';S.logCustom='';S.logTopic=null;render();},
  'close-modal':()=>{S.modal=null;render();},
  'close-modal-out':(btn,e)=>{if(e.target.classList.contains('overlay')){S.modal=null;render();}},

  'sel-sub':(btn)=>{
    S.logSub=btn.dataset.sub;S.logTopic=null;
    document.querySelectorAll('[data-action=sel-sub]').forEach(el=>el.classList.toggle('on',el.dataset.sub===S.logSub));
    document.querySelectorAll('.sub-chip-abb').forEach(el=>{
      const item=el.closest('[data-action=sel-sub]');
      if(!item)return;
      const sub=S.data.subjects.find(s=>s.id===item.dataset.sub);
      if(!sub)return;
      const c=getSubjColor(sub);
      if(item.dataset.sub===S.logSub){el.style.background='var(--acc)';el.style.color='#fff';el.style.borderColor='var(--acc)';}
      else{el.style.background=c.bg;el.style.color=c.tx;el.style.borderColor=c.bd;}
    });
    // Re-render topic section only
    const modal=document.querySelector('.modal-body');
    if(modal){
      // Update topic section visibility by re-rendering the modal
      // Simple approach: re-render the modal
      const overlay=document.querySelector('.overlay');
      if(overlay){overlay.outerHTML=renderLogModal();}
    }
  },
  'sel-dur':(btn)=>{
    S.logDur=parseInt(btn.dataset.dur);S.logCustom='';
    document.querySelectorAll('.dchip,.dur-pill').forEach(el=>el.classList.toggle('on',parseInt(el.dataset.dur)===S.logDur));
    const sl=document.getElementById('dur-sl');if(sl)sl.value=S.logDur;
    const dd=document.getElementById('dur-disp');if(dd)dd.textContent=fmtDur(S.logDur);
    const ci=document.getElementById('cust-dur');if(ci)ci.value='';
  },
  'sel-conf':(btn)=>{S.logConf=parseInt(btn.dataset.conf);document.querySelectorAll('[data-action=sel-conf]').forEach(el=>el.classList.toggle('on',parseInt(el.dataset.conf)===S.logConf));},

  'sel-topic':(btn)=>{
    S.logTopic=btn.dataset.topic||null;
    document.querySelectorAll('.topic-chip').forEach(el=>el.classList.toggle('on',el.dataset.topic===btn.dataset.topic));
  },

  'submit-log':()=>{
    if(!S.logSub){
      document.querySelector('.sub-chips-grid,.chips')?.animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-5px)'},{transform:'translateX(0)'}],{duration:280});
      return;
    }
    const note=document.getElementById('log-note')?.value?.trim()||'';
    const cust=document.getElementById('cust-dur')?.value;
    const dur=cust&&parseInt(cust)>0?parseInt(cust):S.logDur;
    const sess={id:uid(),date:today(),subject:S.logSub,duration:dur,confidence:S.logConf,note,topic:S.logTopic||null,ts:Date.now()};
    S.data.sessions.push(sess);saveLocal(S.data);triggerSync();
    S.modal=null;S.logTopic=null;
    const sub=S.data.subjects.find(x=>x.id===S.logSub);
    const topicStr=sess.topic?` · ${sess.topic}`:'';
    const msgs=[
      `${sub?.name}${topicStr} — ${fmtDur(dur)} logged.`,
      `${fmtDur(dur)} of ${sub?.name}. Streak: ${getStreak(S.data.sessions)} days.`,
      `${sub?.name} ✓${topicStr}`,
      `${fmtDur(dur)} closer to 99.95.`
    ];
    render();flashGreen();showToast(msgs[Math.floor(Math.random()*msgs.length)]);
  },

  // Auto-login actions
  'auto-login':()=>{
    const d=loadLocal();
    if(!d){render();return;}
    localStorage.setItem(AUTH_KEY,'1');
    S.data=d;S.view='dashboard';
    render();startLiveTick();
  },
  'show-pin-entry':()=>{S.showPinEntry=true;S.loginMode='login';render();setTimeout(()=>document.getElementById('li-pin')?.focus(),60);},

  'nav-progress':()=>{S.view='progress';S.modal=null;render();},
  'prog-tab':(btn)=>{S.progTab=parseInt(btn.dataset.tab);render();},

  // ── Papers library ──
  'nav-papers':()=>{
    S.view='papers';S.modal=null;
    // Kick off load if not cached
    if(!S.papersData && !S.papersLoading){
      S.papersLoading=true;
      loadPapersData().then(d=>{S.papersData=d;S.papersLoading=false;if(S.view==='papers')render();});
    }
    render();
    // Render thumbs after paint
    setTimeout(renderPaperThumbs, 200);
  },
  'papers-filter-sub':(btn)=>{S.papersSubFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-filter-yr':(btn)=>{S.papersYrFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-filter-src':(btn)=>{S.papersSrcFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-sort-chip':(btn)=>{S.papersSort=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-filter-type':(btn)=>{S.papersTypeFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-search':()=>{/* handled by input listener */},
  'papers-reload':()=>{papersCache=null;S.papersData=null;S.papersLoading=true;render();loadPapersData(true).then(d=>{S.papersData=d;S.papersLoading=false;render();setTimeout(renderPaperThumbs,200);});},

  'open-paper':(btn)=>{
    const url=btn.dataset.url;
    let viewUrl=url;
    // External URLs — proxy through Google Docs viewer for iframe
    try{
      const u=new URL(url,location.href);
      if(u.origin!==location.origin){
        viewUrl='https://docs.google.com/gview?url='+encodeURIComponent(url)+'&embedded=true';
      }
    }catch(e){}
    pdfViewerState={url,viewUrl,title:btn.dataset.title};
    const app=document.getElementById('app');
    if(app) app.insertAdjacentHTML('beforeend', renderPdfViewer());
    setTimeout(()=>document.querySelector('.pdf-close')?.focus(),50);
  },
  'pdf-print':()=>{
    const iframe=document.querySelector('.pdf-viewer-frame iframe');
    if(iframe){try{iframe.contentWindow.print();}catch(e){window.open(pdfViewerState?.url,'_blank');}}
  },
  'pdf-download':()=>{
    if(!pdfViewerState?.url)return;
    const a=document.createElement('a');a.href=pdfViewerState.url;a.download='';a.target='_blank';a.rel='noopener';
    document.body.appendChild(a);a.click();a.remove();
  },
  'pdf-newtab':()=>{
    if(pdfViewerState?.url) window.open(pdfViewerState.url,'_blank','noopener');
  },
  'close-pdf':()=>{
    pdfViewerState=null;
    document.getElementById('pdf-viewer')?.remove();
  },

  // ── Test score actions ──
  'open-log-test':()=>{
    S.modal='logscore';
    S.testSub=null;S.testScore='';S.testOutOf=100;
    S.testName='';S.testType='Test';S.testDate=today();
    S.testNextDate='';S.logErr='';
    render();
  },

  'sel-test-sub':(btn)=>{
    S.testSub=btn.dataset.sub;
    document.querySelectorAll('[data-action=sel-test-sub]').forEach(el=>el.classList.toggle('on',el.dataset.sub===S.testSub));
    // Update abbr colours same as study modal
    document.querySelectorAll('[data-action=sel-test-sub] .sub-chip-abb').forEach(el=>{
      const item=el.closest('[data-action=sel-test-sub]');
      const sub=S.data.subjects.find(s=>s.id===item?.dataset.sub);
      if(!sub)return;
      const c=getSubjColor(sub);
      if(item.dataset.sub===S.testSub){el.style.background='var(--acc)';el.style.color='#fff';el.style.borderColor='var(--acc)';}
      else{el.style.background=c.bg;el.style.color=c.tx;el.style.borderColor=c.bd;}
    });
  },

  'sel-test-type':(btn)=>{
    S.testType=btn.dataset.type;
    document.querySelectorAll('.test-type-btn').forEach(el=>el.classList.toggle('on',el.dataset.type===S.testType));
  },

  'submit-test':()=>{
    S.logErr='';
    if(!S.testSub){S.logErr='Select a subject.';let m=document.querySelector('.merr');if(m)m.textContent=S.logErr;return;}
    const name=document.getElementById('test-name')?.value?.trim()||'Test';
    const score=parseFloat(document.getElementById('test-score')?.value);
    const outOf=parseFloat(document.getElementById('test-outof')?.value)||100;
    const date=document.getElementById('test-date')?.value||today();
    const nextDate=document.getElementById('test-next-date')?.value||'';
    const nextName=document.getElementById('test-next-name')?.value?.trim()||'';
    if(isNaN(score)||score<0){S.logErr='Enter your score.';let m=document.querySelector('.merr');if(m)m.textContent=S.logErr;return;}
    if(score>outOf){S.logErr='Score can\'t exceed max marks.';let m=document.querySelector('.merr');if(m)m.textContent=S.logErr;return;}
    if(!S.data.tests)S.data.tests=[];
    const pct=Math.round(score/outOf*100);
    const t={
      id:uid(),subject:S.testSub,name,score,outOf,date,
      type:S.testType,ts:Date.now(),
      nextTestDate:nextDate||null,nextTestName:nextName||null,
    };
    S.data.tests.push(t);
    saveLocal(S.data);triggerSync();
    S.modal=null;
    const sub=S.data.subjects.find(x=>x.id===S.testSub);
    const g=getTestGrade(pct);
    render();
    showToast(`${sub?.name} · ${pct}% (${g.letter}) saved.`,'📝');
    // Switch to scores tab to show the result
    if(S.view==='progress')S.progTab=1;
    else{S.view='progress';S.progTab=1;}
    render();
  },

  'del-test':(btn)=>{
    if(!confirm('Delete this test score?'))return;
    S.data.tests=(S.data.tests||[]).filter(t=>t.id!==btn.dataset.id);
    saveLocal(S.data);triggerSync();render();showToast('Score removed.','✕');
  },

  // ── Google auth ──
  'google-login':async()=>{
    if(!window.FIREBASE_CONFIG){showToast('Set FIREBASE_CONFIG first — see Settings.','!');return;}
    try{
      const fbApp=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const{getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const app=fbApp.getApps().length?fbApp.getApp():fbApp.initializeApp(window.FIREBASE_CONFIG);
      const auth=getAuth(app);
      const provider=new GoogleAuthProvider();
      try{
        const result=await signInWithPopup(auth,provider);
        window._meridianHandleAuthResult(result);
      }catch(popupErr){
        if(popupErr.code==='auth/popup-blocked'||popupErr.code==='auth/cancelled-popup-request'||popupErr.message?.includes('Cross-Origin-Opener-Policy')){
          await signInWithRedirect(auth,provider);
        }else throw popupErr;
      }
    }catch(e){
      showToast(e.code==='auth/popup-closed-by-user'?'Sign-in cancelled.':'Google sign-in failed: '+e.message,'!');
    }
  },

  // ── GitHub auth ──
  'github-login':async()=>{
    if(!window.FIREBASE_CONFIG){showToast('Set FIREBASE_CONFIG first — see Settings.','!');return;}
    try{
      const fbApp=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const{getAuth,GithubAuthProvider,signInWithPopup,signInWithRedirect}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const app=fbApp.getApps().length?fbApp.getApp():fbApp.initializeApp(window.FIREBASE_CONFIG);
      const auth=getAuth(app);
      const provider=new GithubAuthProvider();
      try{
        const result=await signInWithPopup(auth,provider);
        window._meridianHandleAuthResult(result,'GitHub');
      }catch(popupErr){
        if(popupErr.code==='auth/popup-blocked'||popupErr.code==='auth/cancelled-popup-request'||popupErr.message?.includes('Cross-Origin-Opener-Policy')){
          await signInWithRedirect(auth,provider);
        }else throw popupErr;
      }
    }catch(e){
      showToast(e.code==='auth/popup-closed-by-user'?'Sign-in cancelled.':'GitHub sign-in failed: '+e.message,'!');
    }
  },

  'del-sess':(btn)=>{
    if(!confirm('Delete this session?'))return;
    S.data.sessions=S.data.sessions.filter(s=>s.id!==btn.dataset.id);saveLocal(S.data);triggerSync();render();showToast('Removed.','✕');
  },

  'use-grace':()=>{
    if(!confirm('Use your weekly grace day? Streak protected today.'))return;
    S.data.graceUsed=today();
    S.data.sessions.push({id:uid(),date:today(),subject:'grace',duration:0,confidence:3,note:'Grace day',ts:Date.now()});
    saveLocal(S.data);triggerSync();render();showToast('Grace day used. Back at it tomorrow.');
  },

  // Timer
  'set-timer':(btn)=>{timerTarget=parseInt(btn.dataset.dur)*60;resetTimer();render();},
  'timer-start':()=>{startTimer();renderTimerFast();},
  'timer-pause':()=>{pauseTimer();render();},
  'timer-reset':()=>{resetTimer();render();},

  // Settings
  'save-account':()=>{
    const name=document.getElementById('sname')?.value?.trim();
    const year=parseInt(document.getElementById('syear')?.value||'11');
    if(!name)return;
    S.data.name=name;S.data.year=year;saveLocal(S.data);triggerSync();render();showToast('Saved.');
  },

  'open-add-subj':()=>{S.modal='addsubj';S.newName='';S.newAbbr='';S.newTarget=60;S.logErr='';render();},
  'save-subj':()=>{
    const name=document.getElementById('ns-name')?.value?.trim();
    const abbr=document.getElementById('ns-abbr')?.value?.trim().toUpperCase();
    const target=parseInt(document.getElementById('ns-target')?.value||'60');
    if(!name||!abbr){S.logErr='Fill in name and abbreviation.';let m=document.querySelector('.merr');if(m)m.textContent=S.logErr;else render();return;}
    S.data.subjects.push({id:uid(),name,abbr,target:isNaN(target)?60:target,color:S.data.subjects.length});
    saveLocal(S.data);triggerSync();S.modal=null;render();showToast(name+' added.');
  },
  'del-subj':(btn)=>{
    if(S.data.subjects.length<=1){showToast("Can't delete last subject.",'!');return;}
    if(!confirm('Delete subject? Past sessions stay.'))return;
    S.data.subjects=S.data.subjects.filter(s=>s.id!==btn.dataset.id);saveLocal(S.data);triggerSync();render();showToast('Removed.');
  },

  // Sync
  'sync-now':async()=>{
    const sc=loadSync();if(!sc.apiKey){showToast('Set up sync in Settings first.','↻');A['nav-settings']();return;}
    sc.status='syncing';saveSync(sc);updateSyncDot();
    const r=await syncPush(S.data,sc);
    sc.status=r.ok?'ok':'err';sc.lastSynced=r.ok?Date.now():sc.lastSynced;if(r.binId)sc.binId=r.binId;
    saveSync(sc);updateSyncDot();showToast(r.ok?'Synced ✓':'Sync failed',r.ok?'↻':'!');
  },
  'save-sync':async()=>{
    const key=document.getElementById('sync-key')?.value?.trim();
    if(!key){showToast('Enter API key first.','!');return;}
    const sc=loadSync();sc.apiKey=key;sc.status='syncing';saveSync(sc);showToast('Pushing…','↻');
    const r=await syncPush(S.data,sc);
    sc.status=r.ok?'ok':'err';sc.lastSynced=r.ok?Date.now():sc.lastSynced;if(r.binId)sc.binId=r.binId;
    saveSync(sc);render();showToast(r.ok?'Cloud sync enabled ✓':'Failed — check API key',r.ok?'✓':'!');
  },
  'pull-cloud':async()=>{
    const sc=loadSync();const key=document.getElementById('sync-key')?.value?.trim()||sc.apiKey;
    if(!key){showToast('Enter API key first.','!');return;}
    sc.apiKey=key;if(!sc.binId){showToast('Push first to create a bin.','!');return;}
    showToast('Pulling…','↓');const r=await syncPull(sc);
    if(!r.ok){showToast('Pull failed: '+r.err,'!');return;}
    S.data={...r.data};saveLocal(S.data);saveSync(sc);render();showToast('Updated from cloud ✓','↓');
  },

  'toggle-export':()=>{S.showExport=!S.showExport;render();},
  'copy-export':()=>{
    navigator.clipboard?.writeText(exportCode(S.data)).then(()=>showToast('Copied!','⧉')).catch(()=>showToast('Select the code manually.','⧉'));
  },
};

/* ════════════════════════════════
   ICS FILE IMPORT
════════════════════════════════ */
function handleICSFile(file){
  if(!file||!file.name.endsWith('.ics')){showToast('Please select a .ics file.','!');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    const text=e.target.result;
    const evts=parseICS(text);
    if(!evts.length){showToast('No events found in file.','!');return;}
    const{timetable,newSubs}=icsEventsToTimetable(evts,S.data.subjects);
    S.data.timetable=timetable;
    if(newSubs.length){
      S.data.subjects=[...S.data.subjects,...newSubs];
      showToast(`Timetable imported. ${newSubs.length} new subject${newSubs.length>1?'s':''} added.`,'📅');
    }else{
      showToast(`Timetable imported — ${timetable.length} classes.`,'📅');
    }
    saveLocal(S.data);triggerSync();
    S.view='timetable';render();
  };
  reader.readAsText(file);
}

/* ════════════════════════════════
   EVENT DELEGATION
════════════════════════════════ */
/* ════════════════════════════════
   TUTORIAL SYSTEM
════════════════════════════════ */
const TUTORIAL_STEPS = [
  {
    title:'Your dashboard',
    body:'This is mission control. Your streak, today\'s classes, subjects covered, and recent sessions — all at a glance.',
    target:null,pos:'center',
  },
  {
    title:'Log a session',
    body:'Tap + (or press <kbd style="font-family:\'DM Mono\',monospace;font-size:10px;padding:1px 5px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:3px;">L</kbd> on desktop) to log study time. Pick your subject, set the duration, done.',
    target:'.fab,.side-logbtn',pos:'above',
  },
  {
    title:'Subject tiles',
    body:'Each tile shows time logged today. Green means covered. Dashed border means you have a class today but haven\'t logged study for it yet.',
    target:'.sub-grid',pos:'above',
  },
  {
    title:'Your streak',
    body:'The most important number. Log at least once per day to keep it alive. Grace days let you skip once a week without losing it.',
    target:'.streak-card',pos:'below',
  },
  {
    title:'Import your timetable',
    body:'Go to Settings → Import ICS from Sentral. Meridian will show your live class schedule and smart-suggest the right subject when you log.',
    target:null,pos:'center',
  },
  {
    title:'You\'re good to go.',
    body:'Start small — log 15 minutes today. Come back tomorrow. The streak builds itself.',
    target:null,pos:'center',
  },
];

function renderTutorial(){
  if(!S.tutStep||S.tutStep<1)return;
  const step=TUTORIAL_STEPS[S.tutStep-1];
  if(!step)return;
  const total=TUTORIAL_STEPS.length;
  const dotsHtml=Array.from({length:total},(_,i)=>`<div class="tutorial-dot${i===S.tutStep-1?' on':''}"></div>`).join('');

  // Position the card
  let cardStyle='';
  let targetEl=null;
  if(step.target){
    targetEl=document.querySelector(step.target);
  }
  if(!targetEl||step.pos==='center'){
    cardStyle='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:502;';
  } else {
    const r=targetEl.getBoundingClientRect();
    if(step.pos==='above'){
      cardStyle=`position:fixed;bottom:${window.innerHeight-r.top+16}px;left:${Math.max(12,Math.min(r.left,window.innerWidth-320))}px;z-index:502;`;
    } else {
      cardStyle=`position:fixed;top:${r.bottom+16}px;left:${Math.max(12,Math.min(r.left,window.innerWidth-320))}px;z-index:502;`;
    }
  }

  const tut=document.createElement('div');
  tut.className='tutorial-overlay';
  tut.id='tut-overlay';
  tut.innerHTML=`
    <div class="tutorial-backdrop" id="tut-backdrop"></div>
    <div class="tutorial-card" style="${cardStyle}">
      <div class="tutorial-step-num">Step ${S.tutStep} of ${total}</div>
      <div class="tutorial-title">${step.title}</div>
      <div class="tutorial-body">${step.body}</div>
      <div class="tutorial-actions">
        <div class="tutorial-dots">${dotsHtml}</div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="tutorial-skip" id="tut-skip">Skip</div>
          <div class="tutorial-next" id="tut-next">${S.tutStep<total?'Next →':'Done ✓'}</div>
        </div>
      </div>
    </div>`;

  // Remove existing if any
  document.getElementById('tut-overlay')?.remove();
  document.body.appendChild(tut);

  document.getElementById('tut-next')?.addEventListener('click',()=>{
    if(S.tutStep<total){S.tutStep++;renderTutorial();}
    else{S.tutStep=0;document.getElementById('tut-overlay')?.remove();}
  });
  document.getElementById('tut-skip')?.addEventListener('click',()=>{
    S.tutStep=0;document.getElementById('tut-overlay')?.remove();
  });
  document.getElementById('tut-backdrop')?.addEventListener('click',()=>{
    S.tutStep=0;document.getElementById('tut-overlay')?.remove();
  });
}

function attach(){
  const root=document.getElementById('app');

  root.addEventListener('click',e=>{
    const btn=e.target.closest('[data-action]');
    if(btn&&A[btn.dataset.action])A[btn.dataset.action](btn,e);
  });

  // PIN digit boxes — auto-advance on input
  root.addEventListener('input',e=>{
    // PIN digit boxes
    if(e.target.classList.contains('pin-digit')){
      const val=e.target.value.replace(/\D/g,'').slice(-1);
      e.target.value=val?'•':'';
      if(val){
        const idx=parseInt(e.target.dataset.idx||'0');
        // Store in S.regPin1
        const chars=S.regPin1.split('');chars[idx]=val;S.regPin1=chars.join('');
        const next=document.getElementById('pd-'+(idx+1));
        if(next)next.focus();
      }
      return;
    }
    if(e.target.id==='dur-sl'){
      S.logDur=parseInt(e.target.value);S.logCustom='';
      const d=document.getElementById('dur-disp');if(d)d.textContent=fmtDur(S.logDur);
      document.querySelectorAll('.dchip,.dur-pill').forEach(el=>el.classList.toggle('on',parseInt(el.dataset.dur)===S.logDur));
      const ci=document.getElementById('cust-dur');if(ci)ci.value='';
    }
    if(e.target.id==='cust-dur'){
      S.logCustom=e.target.value;const v=parseInt(e.target.value);
      if(v>0){document.querySelectorAll('.dchip,.dur-pill').forEach(el=>el.classList.remove('on'));const d=document.getElementById('dur-disp');if(d)d.textContent=fmtDur(v);const sl=document.getElementById('dur-sl');if(sl)sl.value=Math.min(240,v);}
    }
    if(e.target.id==='log-note')S.logNote=e.target.value;
    if(e.target.id==='li-pin')S.loginPin=e.target.value;
    if(e.target.id==='import-code'){S.importCode=e.target.value;}
    if(e.target.id==='reg-name')S.loginName=e.target.value;
    if(e.target.id==='sname'){}// handled on save
    // Live score preview
    if(e.target.id==='test-score'||e.target.id==='test-outof'){
      const sc=parseFloat(document.getElementById('test-score')?.value)||0;
      const oo=parseFloat(document.getElementById('test-outof')?.value)||100;
      S.testScore=document.getElementById('test-score')?.value||'';
      S.testOutOf=document.getElementById('test-outof')?.value||'100';
      const prev=document.querySelector('.score-preview');
      if(prev&&sc>0&&oo>0){
        const pct=Math.round(sc/oo*100);
        const g=getTestGrade(pct);
        prev.innerHTML=`<div class="score-preview-pct" style="color:${g.color};">${pct}%</div><div class="score-preview-grade" style="color:${g.color};">${g.letter}</div>`;
        prev.style.display='block';
      } else if(prev){prev.style.display='none';}
    }
    if(e.target.id==='test-name')S.testName=e.target.value;
    // Papers filter dropdowns
    if(e.target.id==='pf-subject'){S.papersSubFilter=e.target.value;render();setTimeout(renderPaperThumbs,200);return;}
    if(e.target.id==='pf-year'){S.papersYrFilter=e.target.value;render();setTimeout(renderPaperThumbs,200);return;}
    if(e.target.id==='pf-type'){S.papersTypeFilter=e.target.value;render();setTimeout(renderPaperThumbs,200);return;}
    if(e.target.id==='pf-source'){S.papersSrcFilter=e.target.value;render();setTimeout(renderPaperThumbs,200);return;}
    // Papers search — debounced
    if(e.target.id==='papers-search-inp'){
      S.papersSearch=e.target.value;
      clearTimeout(window._papersSearchTm);
      window._papersSearchTm=setTimeout(()=>{if(S.view==='papers'){render();setTimeout(renderPaperThumbs,200);}},200);
    }
  });

  // PIN digit — backspace goes back
  root.addEventListener('keydown',e=>{
    if(e.target.classList.contains('pin-digit')&&e.key==='Backspace'&&!e.target.value){
      const idx=parseInt(e.target.dataset.idx||'0');
      if(idx>0){
        const prev=document.getElementById('pd-'+(idx-1));
        if(prev){prev.value='';prev.focus();}
        const chars=S.regPin1.split('');chars[idx-1]='';S.regPin1=chars.join('');
      }
      return;
    }
    if(e.key==='Enter'){
      if(document.getElementById('li-pin')){A['login']();return;}
      if(document.getElementById('reg-name')||document.querySelector('.pin-digit')){A['reg-next']();return;}
    }
    if(e.key==='l'&&!S.modal&&S.data&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){A['open-log']();}
    if(e.key==='Escape'){
      if(pdfViewerState){A['close-pdf']();return;}
      if(S.modal){S.modal=null;render();}
      if(S.tutStep){S.tutStep=0;document.getElementById('tut-overlay')?.remove();}
    }
  });

  // ICS file input
  const icsInput=document.getElementById('ics-file-input');
  icsInput.addEventListener('change',e=>{const f=e.target.files?.[0];if(f)handleICSFile(f);icsInput.value='';});
}

// Shared auth result handler (used by popup and redirect flows)
window._meridianHandleAuthResult=function(result,provider='Google'){
  const user=result.user;
  S.googleUser={name:user.displayName,email:user.email,photo:user.photoURL};
  if(S.loginMode==='register'&&!S.loginName){S.loginName=user.displayName?.split(' ')[0]||user.email?.split('@')[0]||'';}
  const d=loadLocal();
  if(d){
    localStorage.setItem(AUTH_KEY,'1');
    S.data=d;S.view='dashboard';render();startLiveTick();
    showToast('Signed in with '+provider+'.','✓');
  } else {
    // No local account — switch to register flow with name pre-filled
    S.loginMode='register';
    S.loginName=user.displayName?.split(' ')[0]||user.email?.split('@')[0]||'';
    S.regStep=2; // skip name step since we got it from Google
    showToast('Signed in with '+provider+'. Finish setup below.','✓');
    render();
  }
};

/* ════════════════════════════════
   INIT
════════════════════════════════ */
(async function init(){
  const d=loadLocal();
  const authed=localStorage.getItem(AUTH_KEY);
  if(d){
    if(!d.timetable)d.timetable=[];
    if(!d.tests)d.tests=[];
    // Auto-login: if authed flag set, go straight to dashboard
    if(authed){
      S.data=d;S.view='dashboard';
    }
    // else: show auto-auth screen (already handled in renderLogin)
  }
  render();attach();
  if(S.data)startLiveTick();
  // Check for redirect sign-in result
  if(window.FIREBASE_CONFIG){
    try{
      const fbApp=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const{getAuth,getRedirectResult}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const app=fbApp.getApps().length?fbApp.getApp():fbApp.initializeApp(window.FIREBASE_CONFIG);
      const result=await getRedirectResult(getAuth(app));
      if(result&&result.user) window._meridianHandleAuthResult(result);
    }catch(e){/* no redirect result */}
  }
  // Auto-pull if on fresh device with no local data
  if(!d){
    const sc=loadSync();
    if(sc.apiKey&&sc.binId){
      syncPull(sc).then(r=>{
        if(r.ok&&r.data){
          S.data=r.data;
          if(!S.data.timetable)S.data.timetable=[];
          saveLocal(S.data);
          localStorage.setItem(AUTH_KEY,'1');
          S.view='dashboard';
          render();startLiveTick();
          showToast('Data loaded from cloud.','↓');
        }
      });
    }
  }
})();
