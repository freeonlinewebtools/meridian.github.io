/* ════════════════════════════════
   CONSTANTS
════════════════════════════════ */
const KEY='mer_v4', SKEY='mer_sync', AUTH_KEY='mer_authed';
const IS_LOCAL = location.hostname==='localhost'||location.hostname==='127.0.0.1'||location.hostname==='0.0.0.0'||location.protocol==='file:';

// Subject modules — per subject code, each module has inquiry questions
const SUBJECT_MODULES = {
  '11PHY6': [
    {name:'Module 1 — Kinematics', iqs:['IQ: How is the motion of an object moving in a straight line described and predicted?','IQ: How is the motion of an object that changes its direction of movement on a plane described?']},
    {name:'Module 2 — Dynamics', iqs:['IQ: How are forces produced between objects and what effects do forces produce?','IQ: How does the net force on an object determine the motion of the object?']},
    {name:'Module 3 — Waves & Thermodynamics', iqs:['IQ: What are the properties of all waves and wave motion?','IQ: How do thermodynamic principles apply in the real world?']},
    {name:'Module 4 — Electricity & Magnetism', iqs:['IQ: How do charged particles interact with electric and magnetic fields?','IQ: How do the processes of the transfer and transformation of energy occur in electric circuits?','IQ: How does magnetism interact with electricity?']},
    {name:'Module 5 — Advanced Mechanics', iqs:['IQ: How can models that are used to explain projectile motion be used to analyse and make predictions?','IQ: Why do objects move in circles?','IQ: How does the force of gravity determine the motion of planets and satellites?']},
    {name:'Module 6 — Electromagnetism', iqs:['IQ: What happens to stationary and moving charged particles when placed in an electric and/or magnetic field?','IQ: How are electric and magnetic fields related?','IQ: How has knowledge about the electromagnetic spectrum been applied?']},
    {name:'Module 7 — The Nature of Light', iqs:['IQ: What is light?','IQ: How is light explained by the quantum model?']},
    {name:'Module 8 — From the Universe to the Atom', iqs:['IQ: What evidence exists for the Big Bang theory?','IQ: How do the nuclei of atoms change?','IQ: How can the properties of the nucleus be used?']},
  ],
  '_physics': [
    {name:'Module 1 — Kinematics', iqs:['IQ: How is the motion of an object moving in a straight line described and predicted?','IQ: How is the motion of an object that changes its direction of movement on a plane described?']},
    {name:'Module 2 — Dynamics', iqs:['IQ: How are forces produced between objects and what effects do forces produce?','IQ: How does the net force on an object determine the motion of the object?']},
    {name:'Module 3 — Waves & Thermodynamics', iqs:['IQ: What are the properties of all waves and wave motion?','IQ: How do thermodynamic principles apply in the real world?']},
    {name:'Module 4 — Electricity & Magnetism', iqs:['IQ: How do charged particles interact with electric and magnetic fields?','IQ: How do the processes of the transfer and transformation of energy occur in electric circuits?','IQ: How does magnetism interact with electricity?']},
    {name:'Module 5 — Advanced Mechanics', iqs:['IQ: How can models that are used to explain projectile motion be used to analyse and make predictions?','IQ: Why do objects move in circles?','IQ: How does the force of gravity determine the motion of planets and satellites?']},
    {name:'Module 6 — Electromagnetism', iqs:['IQ: What happens to stationary and moving charged particles when placed in an electric and/or magnetic field?','IQ: How are electric and magnetic fields related?','IQ: How has knowledge about the electromagnetic spectrum been applied?']},
    {name:'Module 7 — The Nature of Light', iqs:['IQ: What is light?','IQ: How is light explained by the quantum model?']},
    {name:'Module 8 — From the Universe to the Atom', iqs:['IQ: What evidence exists for the Big Bang theory?','IQ: How do the nuclei of atoms change?','IQ: How can the properties of the nucleus be used?']},
  ],
  '11CHE4': [
    {name:'Module 1 — Properties & Structure of Matter', iqs:['IQ: How do the properties of substances help us classify them?','IQ: How does the atomic structure of elements determine the identity and properties of elements and compounds?']},
    {name:'Module 2 — Introduction to Quantitative Chemistry', iqs:['IQ: How are measurements made in chemistry?','IQ: How do we determine the mass and amounts in chemical reactions?']},
    {name:'Module 3 — Reactive Chemistry', iqs:['IQ: What are the products of a chemical reaction?','IQ: What determines the rate of a chemical reaction?']},
    {name:'Module 4 — Drivers of Reactions', iqs:['IQ: What energy changes occur in chemical reactions?','IQ: How is the rate of a chemical reaction controlled?']},
    {name:'Module 5 — Equilibrium & Acid Reactions', iqs:['IQ: What happens when chemical reactions do not go to completion?','IQ: How do the definitions of acids and bases help us to understand the nature of these substances?']},
    {name:'Module 6 — Acid/Base Reactions', iqs:['IQ: How are the characteristics and properties of acids and bases explained?','IQ: What is the role of water in reactions of acids and bases?']},
    {name:'Module 7 — Organic Chemistry', iqs:['IQ: How are the structures of organic compounds represented?','IQ: What are the properties and uses of organic compounds?']},
    {name:'Module 8 — Applying Chemical Ideas', iqs:['IQ: How are the chemical properties of a substance identified?','IQ: How are chemical techniques applied in society?']},
  ],
  '_chem': [
    {name:'Module 1 — Properties & Structure of Matter', iqs:['IQ: How do the properties of substances help us classify them?','IQ: How does the atomic structure of elements determine the identity and properties of elements and compounds?']},
    {name:'Module 2 — Introduction to Quantitative Chemistry', iqs:['IQ: How are measurements made in chemistry?','IQ: How do we determine the mass and amounts in chemical reactions?']},
    {name:'Module 3 — Reactive Chemistry', iqs:['IQ: What are the products of a chemical reaction?','IQ: What determines the rate of a chemical reaction?']},
    {name:'Module 4 — Drivers of Reactions', iqs:['IQ: What energy changes occur in chemical reactions?','IQ: How is the rate of a chemical reaction controlled?']},
  ],
  '11BIO1': [
    {name:'Module 1 — Cells as the Basis of Life', iqs:['IQ: What distinguishes one cell from another?','IQ: How do cells coordinate activities within their internal environment and the external environment?']},
    {name:'Module 2 — Organisation of Living Things', iqs:['IQ: How are cells arranged in a multicellular organism?','IQ: How do the systems of a multicellular organism interact to ensure the survival of the organism?']},
    {name:'Module 3 — Biological Diversity', iqs:['IQ: How can the origins and diversity of living things be explained?','IQ: What is the relationship between evolution and biodiversity?']},
    {name:'Module 4 — Ecosystem Dynamics', iqs:['IQ: What effect do changing ecosystems have on biodiversity?','IQ: How do selection pressures within an ecosystem influence evolutionary change?']},
    {name:'Module 5 — Heredity', iqs:['IQ: How is genetic material inherited?','IQ: How can the inheritance of characteristics be predicted?']},
    {name:'Module 6 — Genetic Change', iqs:['IQ: How does mutation introduce new alleles into a population?','IQ: How does genetic variation lead to evolutionary change in a population?']},
    {name:'Module 7 — Infectious Disease', iqs:['IQ: How are diseases transmitted?','IQ: How does the human immune system respond to exposure to a pathogen?']},
    {name:'Module 8 — Non-Infectious Disease & Disorders', iqs:['IQ: How are non-infectious diseases different from infectious diseases?','IQ: What are the causes and effects of non-infectious disease?']},
  ],
  '_bio': [
    {name:'Module 1 — Cells as the Basis of Life', iqs:['IQ: What distinguishes one cell from another?','IQ: How do cells coordinate activities?']},
    {name:'Module 2 — Organisation of Living Things', iqs:['IQ: How are cells arranged in a multicellular organism?']},
    {name:'Module 3 — Biological Diversity', iqs:['IQ: How can the origins and diversity of living things be explained?']},
    {name:'Module 4 — Ecosystem Dynamics', iqs:['IQ: What effect do changing ecosystems have on biodiversity?']},
  ],
  '11MAX2': [
    {name:'Functions', iqs:['Graphing Techniques','Polynomials','Inequalities']},
    {name:'Trigonometric Functions', iqs:['Trig Identities','Inverse Trig','Trig Equations']},
    {name:'Calculus', iqs:['Rates of Change','Integration Techniques','Differential Equations']},
    {name:'Combinatorics', iqs:['Permutations','Combinations','Pascal\'s Triangle','Binomial Theorem']},
    {name:'Proof', iqs:['Proof by Induction','Proof by Contradiction']},
    {name:'Vectors', iqs:['2D Vectors','Geometric Proofs']},
    {name:'Statistical Analysis', iqs:['Discrete Random Variables','Bernoulli & Binomial']},
  ],
  '11MAE2': [
    {name:'Functions', iqs:['Graphs & Equations','Trigonometry','Exponentials & Logarithms']},
    {name:'Calculus', iqs:['Differentiation','Applications of Differentiation','Integration','Applications of Integration']},
    {name:'Financial Maths', iqs:['Sequences & Series','Financial Applications']},
    {name:'Statistical Analysis', iqs:['Descriptive Statistics','Bivariate Data','Probability']},
  ],
  '11ENA5b': [
    {name:'Common Module — Reading to Write', iqs:['Textual Analysis','Close Reading','Narrative Craft']},
    {name:'Module A — Language, Identity & Culture', iqs:['Language & Meaning','Representation','Cultural Context']},
    {name:'Module B — Close Study of Literature', iqs:['Prescribed Text','Detailed Analysis','Authorial Craft']},
    {name:'Module C — Craft of Writing', iqs:['Creative Writing','Discursive Writing','Reflective Writing']},
  ],
  '11EST3': [
    {name:'Engineering Fundamentals', iqs:['Engineering Principles','Materials & Structures','Mechanisms']},
    {name:'Engineering Application', iqs:['Civil Structures','Personal & Public Transport','Biomedical Engineering','Aeronautical Engineering']},
  ],
  '_hms':    [{name:'Hospitality', iqs:['Food Safety','Nutrition','Menu Planning','Kitchen Operations','Catering','Events','Service Styles']}],
  '_sac':    [{name:'Core', iqs:['Personal & Social Identity','Intercultural Communication','Social Inclusion & Exclusion']},{name:'Depth Studies', iqs:['Belief Systems','Popular Culture','Surf Culture']},{name:'PIP', iqs:['Research Methods','Cross-Cultural Comparisons']}],
  '_bus':    [{name:'Operations', iqs:['Operations Management']},{name:'Marketing', iqs:['Marketing Strategies']},{name:'Finance', iqs:['Financial Management']},{name:'Human Resources', iqs:['HR Management']}],
  '_legal':  [{name:'Core', iqs:['Crime','Human Rights','Family','Workplace','Shelter','World Order']},{name:'Options', iqs:['Legal Processes','Law Reform']}],
  '_geo':    [{name:'Core', iqs:['Biophysical Interactions','Ecosystems at Risk','Urban Places']},{name:'Options', iqs:['People & Economic Activity','Megacities']}],
  '_drama':  [{name:'Core', iqs:['Australian Drama','Group Performance','Individual Project']},{name:'Studies', iqs:['Studies in Drama','Theatrical Traditions']}],
  '_cafs':   [{name:'Core', iqs:['Research Methodology','Groups in Context','Parenting & Caring']},{name:'Options', iqs:['Social Impact of Technology','Individuals & Work']}],
  '_sor':    [{name:'Core', iqs:['Religion & Belief Systems','Religious Tradition Depth Study']},{name:'Options', iqs:['Religion & Peace','Religion & Ethics','Sacred Texts']}],
  '_dt':     [{name:'Core', iqs:['Design & Technology Projects','Innovation & Emerging Tech','Designing & Producing']},{name:'Skills', iqs:['Sketching & CAD','Material Properties']}],
  '_food':   [{name:'Core', iqs:['Food Availability','Nutrition','Food Quality','Food Manufacture','Food Product Development']}],
  '_txtl':   [{name:'Core', iqs:['Design','Properties of Textiles','Colouration','Construction','Textile Arts']}],
  '_ag':     [{name:'Core', iqs:['Farm Case Study','Plant Production','Animal Production','Farm Product Study']}],
  '_lang':   [{name:'Core', iqs:['Prescribed Text','Listening','Reading','Writing','Speaking']},{name:'Skills', iqs:['Grammar','Vocabulary','Culture']}],
  '_esci':   [{name:'Module 1', iqs:['Earth\'s Resources','Plate Tectonics']},{name:'Module 2', iqs:['Hazards','Climate Science']},{name:'Module 3', iqs:['Renewable Energy','The Carbon Cycle']},{name:'Module 4', iqs:['Water','Atmosphere']}],
  '_inv':    [{name:'Core', iqs:['Cause & Effect','Scientific Models','Theories & Laws','Science & Technology','Practical Investigations']}],
  '_math':   [{name:'Algebra & Functions', iqs:['Algebra','Functions','Trigonometry']},{name:'Calculus', iqs:['Differentiation','Integration']},{name:'Statistics & Probability', iqs:['Statistics','Probability']},{name:'Other', iqs:['Proof','Vectors','Complex Numbers','Geometry']}],
  '_science':[{name:'Theory', iqs:['Module Content','Equations','Diagrams']},{name:'Practical', iqs:['Lab Report','Practice Questions','Past Papers']}],
  '_english':[{name:'Common Module', iqs:['Essay','Close Study','Analysis']},{name:'Modules', iqs:['Module A','Module B','Module C']},{name:'Writing', iqs:['Creative','Techniques','Themes']}],
  '_default':[{name:'Study', iqs:['Revision','New Content','Practice Questions','Past Papers','Summary Notes','Concept Review','Exam Prep']}],
};

function getModulesForSubject(sub) {
  if(!sub) return SUBJECT_MODULES['_default'];
  if(SUBJECT_MODULES[sub.icsCode]) return SUBJECT_MODULES[sub.icsCode];
  const name = (sub.name||'').toLowerCase();
  if(name.includes('phys')) return SUBJECT_MODULES['_physics'];
  if(name.includes('chem')) return SUBJECT_MODULES['_chem'];
  if(name.includes('bio')) return SUBJECT_MODULES['_bio'];
  if(name.includes('math')||name.includes('ext 1')||name.includes('ext 2')||name.includes('standard')) return SUBJECT_MODULES['_math'];
  if(name.includes('earth')||name.includes('environmental')) return SUBJECT_MODULES['_esci'];
  if(name.includes('investigating science')) return SUBJECT_MODULES['_inv'];
  if(name.includes('english')||name.includes('eal')) return SUBJECT_MODULES['_english'];
  if(name.includes('hms')||name.includes('hospitality')) return SUBJECT_MODULES['_hms'];
  if(name.includes('society')||name.includes('culture')) return SUBJECT_MODULES['_sac'];
  if(name.includes('business')) return SUBJECT_MODULES['_bus'];
  if(name.includes('legal')) return SUBJECT_MODULES['_legal'];
  if(name.includes('geography')) return SUBJECT_MODULES['_geo'];
  if(name.includes('drama')) return SUBJECT_MODULES['_drama'];
  if(name.includes('cafs')) return SUBJECT_MODULES['_cafs'];
  if(name.includes('religion')) return SUBJECT_MODULES['_sor'];
  if(name.includes('design & tech')) return SUBJECT_MODULES['_dt'];
  if(name.includes('food tech')) return SUBJECT_MODULES['_food'];
  if(name.includes('textil')) return SUBJECT_MODULES['_txtl'];
  if(name.includes('agricul')) return SUBJECT_MODULES['_ag'];
  if(name.includes('japanese')||name.includes('french')||name.includes('german')||name.includes('italian')||name.includes('chinese')||name.includes('korean')||name.includes('latin')||name.includes('spanish')||name.includes('arabic')||name.includes('greek')||name.includes('indonesian')) return SUBJECT_MODULES['_lang'];
  if(sub.topics && sub.topics.length) return [{name:'Topics', iqs:sub.topics}];
  return SUBJECT_MODULES['_default'];
}
// Backwards-compat: flatten modules into a flat topic list for coverage tracking
function getTopicsForSubject(sub) {
  const mods=getModulesForSubject(sub);
  const all=[];
  for(const m of mods){all.push(m.name);for(const iq of m.iqs)all.push(iq);}
  return all;
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
  {id:'hms', name:'HMS',              abbr:'HM',target:45,icsCode:'',      color:7},
  {id:'sac', name:'Society & Culture',abbr:'SC',target:45,icsCode:'',      color:8},
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
function loadLocal(){try{const r=localStorage.getItem(KEY);if(!r)return null;const d=JSON.parse(r);if(!d||typeof d!=='object')return null;if(!d.name)return null;d.sessions=Array.isArray(d.sessions)?d.sessions:[];d.subjects=Array.isArray(d.subjects)?d.subjects:[];d.tests=Array.isArray(d.tests)?d.tests:[];d.timetable=Array.isArray(d.timetable)?d.timetable:[];if(!d.joined)d.joined=today();if(!d.year)d.year=11;return d;}catch{return null;}}
function saveLocal(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){console.error('Save failed:',e);showToast('Storage full — data not saved! Export a backup now.','⚠');}}
function loadSync(){try{const r=localStorage.getItem(SKEY);return r?JSON.parse(r):{apiKey:'',binId:'',lastSynced:null,status:'idle'};}catch{return{apiKey:'',binId:'',lastSynced:null,status:'idle'};}}
// Patch missing fields for existing accounts loaded from storage
function migrateData(d){if(!d)return d;if(!d.assessments)d.assessments=[];if(!d.todos)d.todos=[];return d;}
function saveSync(s){try{localStorage.setItem(SKEY,JSON.stringify(s));}catch(e){console.error('Sync save failed:',e);}}
function newAccount(name,pin,year,subs){return{name:name.trim(),pin,joined:today(),year,subjects:subs||ALL_PRESET_SUBS.slice(0,7),sessions:[],tests:[],timetable:[],graceUsed:null,assessments:[],todos:[]};}
function exportCode(d){const s={n:d.name,p:d.pin,j:d.joined,y:d.year,subs:d.subjects,s:d.sessions,tests:d.tests||[],tt:d.timetable||[],g:d.graceUsed};const bytes=new TextEncoder().encode(JSON.stringify(s));let bin='';for(const b of bytes)bin+=String.fromCharCode(b);return btoa(bin);}
function importCode(code){try{const bin=atob(code.trim());const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);const s=JSON.parse(new TextDecoder().decode(bytes));return{name:s.n,pin:s.p,joined:s.j||today(),year:s.y||11,subjects:s.subs||DEFAULT_SUBS,sessions:s.s||[],tests:s.tests||[],timetable:s.tt||[],graceUsed:s.g||null};}catch{return null;}}

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
   PSYCHOLOGY ENGINE
════════════════════════════════ */

// ── 1. Spaced repetition: topics due for review ──
function getReviewTopics(sessions, subjects){
  const thresholds=[1,3,7,14,30]; // days since last study
  const real=sessions.filter(s=>s.subject!=='grace'&&s.topic);
  const topicMap=new Map(); // key: "subId|topic" → {lastDate, subject, topic, daysSince}
  real.forEach(s=>{
    const k=s.subject+'|'+s.topic;
    if(!topicMap.has(k)||s.date>topicMap.get(k).lastDate)
      topicMap.set(k,{lastDate:s.date,subId:s.subject,topic:s.topic});
  });
  const t=today();
  const due=[];
  topicMap.forEach(v=>{
    const diff=Math.floor((new Date(t+'T12:00:00')-new Date(v.lastDate+'T12:00:00'))/86400000);
    const threshold=thresholds.find(th=>diff>=th);
    if(threshold&&diff>=3){ // only flag if 3+ days
      const sub=subjects.find(s=>s.id===v.subId);
      due.push({...v,daysSince:diff,subName:sub?.name||'',urgency:diff>=14?'high':diff>=7?'med':'low'});
    }
  });
  due.sort((a,b)=>b.daysSince-a.daysSince);
  return due.slice(0,5);
}

// ── 2. Interleaving: detect blocked practice ──
function getInterleaveSuggestion(sessions, subjects){
  const todayS=todaySess(sessions).sort((a,b)=>a.ts-b.ts);
  if(todayS.length<2)return null;
  const last2=todayS.slice(-2);
  if(last2[0].subject!==last2[1].subject)return null;
  const blockedSub=subjects.find(s=>s.id===last2[0].subject);
  const blockedMins=todayS.filter(s=>s.subject===last2[0].subject).reduce((a,s)=>a+s.duration,0);
  // Suggest least-studied subject this week
  const mon=weekMon();
  const weekSess=sessions.filter(s=>s.date>=mon&&s.date<=today()&&s.subject!=='grace');
  const subMins=new Map();
  subjects.forEach(s=>subMins.set(s.id,0));
  weekSess.forEach(s=>{if(subMins.has(s.subject))subMins.set(s.subject,subMins.get(s.subject)+s.duration);});
  let least=null,leastMins=Infinity;
  subjects.forEach(s=>{if(s.id!==last2[0].subject&&(subMins.get(s.id)||0)<leastMins){leastMins=subMins.get(s.id)||0;least=s;}});
  if(!least)return null;
  return{blockedSub:blockedSub?.name,blockedMins,suggestSub:least.name,suggestId:least.id};
}

// ── 3. Growth mindset messages ──
function getEncouragement(context){
  const msgs={
    lowConf:[
      "This is tough right now — that's where growth happens.",
      "Struggling means your brain is building new connections.",
      "You haven't mastered this yet. The 'yet' is everything.",
    ],
    brokenStreak:[
      "Streaks reset, but your knowledge doesn't. Pick up where you left off.",
      "A break isn't failure — what matters is starting again.",
      "The best students aren't perfect. They're persistent.",
    ],
    scoreDip:[
      "One score doesn't define your trajectory. Zoom out.",
      "Dips are data, not verdicts. Adjust and keep going.",
      "Your recent study sessions show you're putting in the work — it'll click.",
    ],
    milestone:[
      "Consistency beats intensity. You're proving it.",
      "This kind of discipline compounds. Future you will thank you.",
      "Most people don't make it this far. You did.",
    ],
    comeback:[
      "Welcome back. Every session forward counts.",
      "You showed up again — that's the hardest part done.",
    ],
    highEffort:[
      "Effort is the one thing fully in your control. You're using it well.",
      "Hard work isn't glamorous, but it's what separates the top 10%.",
    ],
  };
  const pool=msgs[context]||msgs.highEffort;
  return pool[Math.floor(Math.random()*pool.length)];
}

// ── 4. Competence trend: 2-week rolling comparison ──
function getSubjectTrends(sessions, subjects){
  const t=new Date(today()+'T12:00:00');
  const d14=new Date(t);d14.setDate(d14.getDate()-14);
  const d28=new Date(t);d28.setDate(d28.getDate()-28);
  const d14s=localDate(d14),d28s=localDate(d28);
  return subjects.map(sub=>{
    const all=sessions.filter(s=>s.subject===sub.id&&s.subject!=='grace');
    // Study time trend
    const recent=all.filter(s=>s.date>d14s&&s.date<=today());
    const prev=all.filter(s=>s.date>d28s&&s.date<=d14s);
    const recentMins=recent.reduce((a,s)=>a+s.duration,0);
    const prevMins=prev.reduce((a,s)=>a+s.duration,0);
    // Confidence trend
    const confRecent=recent.filter(s=>s.confidence>0);
    const confPrev=prev.filter(s=>s.confidence>0);
    const avgConfR=confRecent.length?confRecent.reduce((a,s)=>a+s.confidence,0)/confRecent.length:null;
    const avgConfP=confPrev.length?confPrev.reduce((a,s)=>a+s.confidence,0)/confPrev.length:null;
    const confDelta=avgConfR!=null&&avgConfP!=null?Math.round((avgConfR-avgConfP)*10)/10:null;
    const minsDelta=recentMins-prevMins;
    return{sub,recentMins,prevMins,minsDelta,avgConfR,confDelta};
  }).filter(t=>t.recentMins>0||t.prevMins>0);
}

// ── 5. Variable rewards ──
const BONUS_MESSAGES=[
  {type:'fact',msg:'The HSC has been running since 1967 — over 55 years of students before you.'},
  {type:'fact',msg:'Spaced repetition can boost retention by up to 200% compared to cramming.'},
  {type:'fact',msg:'The testing effect: quizzing yourself beats re-reading notes by 50%+.'},
  {type:'fact',msg:'Interleaving subjects (mixing them up) outperforms blocked study by 43%.'},
  {type:'fact',msg:'Your brain consolidates learning during sleep. Rest is part of the process.'},
  {type:'fact',msg:'Peak focus for most students lasts 25-35 minutes. Then take a break.'},
  {type:'fact',msg:'Writing by hand activates more brain regions than typing.'},
  {type:'fact',msg:'Teaching a concept to someone else is the fastest way to master it.'},
  {type:'challenge',msg:'Challenge: Study 3 different subjects today.'},
  {type:'challenge',msg:'Challenge: Try explaining what you just studied out loud.'},
  {type:'challenge',msg:'Challenge: Write 3 practice questions on what you just covered.'},
  {type:'challenge',msg:'Challenge: Do one past paper question before your next session.'},
  {type:'celebrate',msg:'This session just pushed your weekly total even higher.'},
  {type:'celebrate',msg:'You\'re building momentum. Each session makes the next one easier.'},
  {type:'celebrate',msg:'Consistency is the cheat code. You\'re using it.'},
];

function getVariableReward(){
  if(Math.random()>0.25)return null; // 25% chance
  return BONUS_MESSAGES[Math.floor(Math.random()*BONUS_MESSAGES.length)];
}

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
  const diff=getSubjectDifficulty(sub);
  const days=Math.max(0,daysUntilTest||30);
  const todayStr=today();

  // ── Study signals (shared by cold-start and normal path) ──
  const cutoff14=addDays(todayStr,-14);
  const cutoff28=addDays(todayStr,-28);
  const recentSess=subSess.filter(s=>s.date>=cutoff14);
  const recentHrs=recentSess.reduce((a,s)=>a+s.duration,0)/60;
  const totalHrs=subSess.reduce((a,s)=>a+s.duration,0)/60;
  const weeksActive=Math.max(1,new Set(subSess.map(s=>s.date)).size/5);
  const avgHrs2wk=totalHrs/(weeksActive/2);

  // ── Cram detection: >55% of 28d sessions crammed into last 7d ──
  const last7Sess=subSess.filter(s=>s.date>=addDays(todayStr,-7));
  const last28Sess=subSess.filter(s=>s.date>=cutoff28);
  const cramRatio=last28Sess.length>3?last7Sess.length/last28Sess.length:0;
  const cramPenalty=cramRatio>0.6?-(cramRatio-0.6)*8:0; // up to -3.2 pts

  // ── Session efficiency: confidence per hour (decay-weighted) ──
  // Ebbinghaus-style: sessions decay with half-life ~21 days
  let effNumer=0,effDenom=0;
  subSess.forEach(s=>{
    const ageDays=Math.max(0,(new Date(todayStr)-new Date(s.date))/(86400000));
    const decay=Math.exp(-ageDays/21);
    if(s.confidence>0){effNumer+=s.confidence*decay;effDenom+=decay;}
  });
  const decayedAvgConf=effDenom>0?effNumer/effDenom:3;

  // ── Confidence trajectory: linear regression slope on last 6 sessions ──
  const confSess=subSess.filter(s=>s.confidence>0).slice(-8);
  let confFactor=1,confMomentum=0;
  if(confSess.length>=3){
    const n=confSess.length;
    const xs=confSess.map((_,i)=>i);
    const ys=confSess.map(s=>s.confidence);
    const meanX=xs.reduce((a,v)=>a+v,0)/n;
    const meanY=ys.reduce((a,v)=>a+v,0)/n;
    const slope=(xs.reduce((a,v,i)=>a+(v-meanX)*(ys[i]-meanY),0))/(xs.reduce((a,v)=>a+(v-meanX)**2,0)||1);
    confMomentum=slope; // positive = trending up
    const early=confSess.slice(0,Math.floor(n/2));
    const late=confSess.slice(-Math.floor(n/2));
    const avgE=early.reduce((a,s)=>a+s.confidence,0)/early.length;
    const avgR=late.reduce((a,s)=>a+s.confidence,0)/late.length;
    const trend=(avgR-avgE)/5;
    confFactor=1+trend*0.06*Math.min(1,1/diff); // harder subjects: confidence matters less (floor effects)
  }

  // ── Topic coverage ──
  const topics=getTopicsForSubject(sub);
  const studiedTopics=new Set(subSess.filter(s=>s.topic).map(s=>s.topic));
  const coverage=topics.length?studiedTopics.size/topics.length:0.5;
  const topicFactor=0.96+coverage*0.08;

  // ── Time pressure ──
  let timeFactor=1;
  if(days>30)timeFactor=1.03;
  else if(days>14)timeFactor=1.01;
  else if(days>7)timeFactor=0.99;
  else if(days>3)timeFactor=0.97;
  else timeFactor=0.95;

  // ── Study recency ──
  const veryRecent=subSess.filter(s=>s.date>=addDays(todayStr,-3));
  const vrBoost=veryRecent.length>0?1.02:1;

  // ── COLD START: no test history but has study sessions ──
  if(!subTests.length){
    if(subSess.length<2)return null;
    // Difficulty-calibrated baseline: harder subjects → naturally lower raw scores
    // A student who studies hard can realistically start at 65/diff%
    const baseline=Math.max(30,Math.min(72,62/Math.sqrt(diff)));
    // Study intensity signal
    const studySignal=avgHrs2wk>0?Math.min(1.1,1+(Math.log(1+recentHrs/Math.max(avgHrs2wk,1))*0.05)):1;
    // Confidence signal (raw, not trend — no history to trend against)
    const confSignal=decayedAvgConf>0?0.9+(decayedAvgConf/5)*0.2:1;
    let pred=baseline*studySignal*confSignal*topicFactor*timeFactor;
    pred=Math.min(88/diff*1.1,Math.max(20,pred+cramPenalty));
    const point=Math.round(pred);
    // Wide CI for cold start
    const range=Math.round(15+diff*4);
    const lo=Math.max(10,point-range);
    const hi=Math.min(Math.round(92/diff*1.05),point+range);
    const studyFactor=studySignal;
    const factors=[
      {label:'Estimated baseline', value:Math.round(baseline)+'%', icon:'📊'},
      {label:'Study intensity', value:studyFactor>=1?`+${Math.round((studyFactor-1)*100)}%`:`${Math.round((studyFactor-1)*100)}%`, icon:'⏱', positive:studyFactor>=1},
      {label:'Session confidence', value:decayedAvgConf.toFixed(1)+'/5', icon:'💪', positive:decayedAvgConf>=3},
      {label:'Topic coverage', value:Math.round(coverage*100)+'%', icon:'📚', positive:coverage>0.4},
      {label:'Subject difficulty', value:diff>=1.2?'Hard':diff>=1.05?'Challenging':'Standard', icon:'⚡', positive:false},
    ];
    return{point,lo,hi,base:baseline,studyFactor,confFactor:confSignal,topicFactor,timeFactor,coverage,factors,days,coldStart:true,diff};
  }

  // ── NORMAL PATH: has test history ──
  const base=getSubjectScorePct(tests,subId)||50;

  // Study intensity factor — dampened by difficulty (hard subjects: more study = smaller margin gain)
  const studyFactor=avgHrs2wk>0
    ?Math.min(1+(0.08/diff),1+(Math.log(1+recentHrs/Math.max(avgHrs2wk,1))*(0.06/Math.sqrt(diff))))
    :1;

  // ── Score trend (trajectory of past test results) ──
  let scoreTrend=0;
  if(subTests.length>=2){
    const last=subTests[subTests.length-1];
    const prev=subTests[subTests.length-2];
    const lastPct=last.score/last.outOf*100;
    const prevPct=prev.score/prev.outOf*100;
    scoreTrend=(lastPct-prevPct)*0.12;
  }
  // With 4+ tests, use regression over all data for a more stable trend
  if(subTests.length>=4){
    const ys=subTests.map(t=>t.score/t.outOf*100);
    const n=ys.length;
    const xs=ys.map((_,i)=>i);
    const meanX=(n-1)/2, meanY=ys.reduce((a,v)=>a+v,0)/n;
    const slope=(xs.reduce((a,v,i)=>a+(v-meanX)*(ys[i]-meanY),0))/(xs.reduce((a,v)=>a+(v-meanX)**2,0)||1);
    scoreTrend=Math.max(-8,Math.min(8,slope*0.6));
  }

  // ── Bayesian regression to mean: volatile histories shrink toward mean ──
  const scores=subTests.map(t=>t.score/t.outOf*100);
  const variance=scores.length>1?scores.reduce((a,v)=>a+Math.pow(v-base,2),0)/(scores.length-1):100;
  const stddev=Math.sqrt(variance);
  // Small sample + high volatility → pull toward mean more
  const shrinkage=Math.min(0.35,stddev/(stddev+15))*(1-Math.min(1,(subTests.length-1)/6));
  const regressed=base*(1-shrinkage)+50*shrinkage;

  // ── Compose prediction ──
  let pred=regressed*studyFactor*confFactor*topicFactor*timeFactor*vrBoost+scoreTrend+cramPenalty;

  // Cap scaled to difficulty — harder subjects have lower realistic ceilings
  const hardCap=Math.min(96,Math.round(94/Math.pow(diff,0.5)));
  const softFloor=Math.max(15,Math.round(20/Math.pow(diff,0.3)));
  pred=Math.min(hardCap,Math.max(softFloor,pred));

  // ── Confidence interval ──
  const ciBase=Math.min(14,Math.max(3,stddev*0.65));
  // Wider CI for fewer tests, high difficulty
  const ciScale=1+Math.max(0,(4-subTests.length)*0.15)+(diff-1)*0.3;
  const range=Math.round(ciBase*ciScale);
  const lo=Math.max(softFloor-2,Math.round(pred-range));
  const hi=Math.min(hardCap,Math.round(pred+range));
  const point=Math.round(pred);

  // ── Factors breakdown ──
  const factors=[
    {label:'Base (test history)', value:Math.round(base)+'%', icon:'📝'},
    {label:'Study intensity', value:studyFactor>=1?`+${Math.round((studyFactor-1)*100*base/100)}%`:`${Math.round((studyFactor-1)*100*base/100)}%`, icon:'⏱', positive:studyFactor>=1},
    {label:'Confidence trend', value:confFactor>=1?`+${Math.round((confFactor-1)*100*base/100)}%`:`${Math.round((confFactor-1)*100*base/100)}%`, icon:'💪', positive:confFactor>=1},
    {label:'Topic coverage', value:Math.round(coverage*100)+'%', icon:'📚', positive:coverage>0.5},
    {label:'Time until test', value:days>0?days+'d away':'Today', icon:'📅', positive:timeFactor>=1},
    ...(cramRatio>0.5?[{label:'Study spread', value:'Cramming detected', icon:'⚠', positive:false}]:[]),
  ];

  return{point,lo,hi,base,studyFactor,confFactor,topicFactor,timeFactor,coverage,factors,days,diff,stddev,confMomentum};
}

function getTestGrade(pct){
  if(pct>=90)return{letter:'A+',color:'var(--ok)'};
  if(pct>=80)return{letter:'A',color:'var(--ok)'};
  if(pct>=70)return{letter:'B',color:'var(--acc)'};
  if(pct>=60)return{letter:'C',color:'var(--warn)'};
  return{letter:'D',color:'var(--err)'};
}
// Grade adjusted for subject difficulty — shows what the score really means
function getDifficultyGrade(pct,diff){
  if(diff<1.05)return getTestGrade(pct);
  const adj=pct*Math.pow(diff,0.65); // softer scaling than raw diff
  if(adj>=90)return{letter:'A+',color:'var(--ok)'};
  if(adj>=80)return{letter:'A',color:'var(--ok)'};
  if(adj>=70)return{letter:'B',color:'var(--acc)'};
  if(adj>=60)return{letter:'C',color:'var(--warn)'};
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
function triggerSync(){
  if(IS_LOCAL)return;
  triggerFirebaseDataSync();
  clearTimeout(syncDebounce);
  syncDebounce=setTimeout(async()=>{const sc=loadSync();if(!sc.apiKey)return;sc.status='syncing';saveSync(sc);updateSyncDot();const r=await syncPush(S.data,sc);sc.status=r.ok?'ok':'err';sc.lastSynced=r.ok?Date.now():sc.lastSynced;if(r.binId)sc.binId=r.binId;saveSync(sc);updateSyncDot();},1200);
}

/* ════════════════════════════════
   FIRESTORE LEADERBOARD
════════════════════════════════ */
let _fbDb=null,_fbInitPromise=null;
async function getFirestoreDb(){
  if(_fbDb)return _fbDb;
  if(!window.FIREBASE_CONFIG)return null;
  if(_fbInitPromise)return _fbInitPromise;
  _fbInitPromise=(async()=>{
    try{
      const fbApp=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const{getFirestore}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
      const{getAuth,signInAnonymously}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const app=fbApp.getApps().length?fbApp.getApp():fbApp.initializeApp(window.FIREBASE_CONFIG);
      const auth=getAuth(app);
      if(!auth.currentUser){try{await signInAnonymously(auth);}catch(e){console.warn('Anon auth failed:',e);}}
      _fbDb=getFirestore(app);
      return _fbDb;
    }catch(e){console.warn('Firestore init failed:',e);return null;}
    finally{_fbInitPromise=null;}
  })();
  return _fbInitPromise;
}

function getLbUserId(){
  let id=localStorage.getItem('mer_lb_uid');
  if(!id){id=uid();localStorage.setItem('mer_lb_uid',id);}
  return id;
}

// ── Firebase user data sync ──
// Stores full S.data in Firestore `users/{googleUid}`. Enables cross-device restore without JSONBin.
async function saveUserData(googleUid){
  if(!window.FIREBASE_CONFIG||!googleUid||!S.data)return;
  const db=await getFirestoreDb();if(!db)return;
  const{doc,setDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  try{
    await setDoc(doc(db,'users',googleUid),{
      data:S.data,
      lbUid:getLbUserId(),
      name:S.data.name||'',
      updated:Date.now()
    },{merge:true});
  }catch(e){console.warn('User data save failed:',e);}
}

async function loadUserData(googleUid){
  if(!window.FIREBASE_CONFIG||!googleUid)return null;
  const db=await getFirestoreDb();if(!db)return null;
  const{doc,getDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  try{
    const snap=await getDoc(doc(db,'users',googleUid));
    return snap.exists()?snap.data():null;
  }catch(e){console.warn('User data load failed:',e);return null;}
}

let _fbSyncDebounce=null;
function triggerFirebaseDataSync(){
  if(!S.googleUser?.uid||IS_LOCAL)return;
  clearTimeout(_fbSyncDebounce);
  _fbSyncDebounce=setTimeout(()=>saveUserData(S.googleUser.uid),3000);
}

function buildLbStats(data){
  if(!data)return null;
  const sess=data.sessions||[];
  const tests=data.tests||[];
  const scoredTests=tests.filter(t=>t.score!=null&&t.outOf>0);
  const avgScore=scoredTests.length?Math.round(scoredTests.reduce((a,t)=>a+(t.score/t.outOf)*100,0)/scoredTests.length):null;
  // Per-subject stats for team filtering
  const subs=data.subjects||[];
  const mon=weekMon(),td=today();
  const subjectStats={};
  subs.forEach(sub=>{
    const subSess=sess.filter(s=>s.subject===sub.id);
    const subTests=tests.filter(t=>t.subject===sub.id&&t.score!=null&&t.outOf>0);
    const wm=subSess.filter(s=>s.date>=mon&&s.date<=td).reduce((a,s)=>a+s.duration,0);
    const tm=subSess.reduce((a,s)=>a+s.duration,0);
    const avg=subTests.length?Math.round(subTests.reduce((a,t)=>a+(t.score/t.outOf)*100,0)/subTests.length):null;
    if(wm>0||tm>0||subTests.length>0){
      subjectStats[sub.name]={weekMins:wm,totalMins:tm,avgScore:avg,testCount:subTests.length,sessCount:subSess.length};
    }
  });
  // Last week's study minutes (Mon–Sun of the previous week)
  const lastMon=addDays(mon,-7),lastSun=addDays(mon,-1);
  const lastWeekMins=sess.filter(s=>s.date>=lastMon&&s.date<=lastSun&&s.subject!=='grace').reduce((a,s)=>a+s.duration,0);
  return{
    name:data.name||'Anonymous',
    totalMins:totalMins(sess),
    weekMins:weekMins(sess),
    weekKey:weekMon(),
    lastWeekMins,
    streak:getStreak(sess),
    bestStreak:getBest(sess),
    sessCount:sess.filter(s=>s.subject!=='grace').length,
    avgScore,
    testCount:scoredTests.length,
    year:data.year||11,
    lastUpdated:Date.now(),
    subjectStats
  };
}

let _lbPushDebounce=null;
function triggerLbPush(){
  clearTimeout(_lbPushDebounce);
  _lbPushDebounce=setTimeout(()=>lbPush(),2000);
}

async function lbPush(){
  if(!S.data||!window.FIREBASE_CONFIG)return;
  const db=await getFirestoreDb();if(!db)return;
  const{doc,setDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const stats=buildLbStats(S.data);if(!stats)return;
  const userId=getLbUserId();
  try{await setDoc(doc(db,'leaderboard',userId),{...stats,userId});}catch(e){console.warn('LB push failed:',e);showToast('Leaderboard update failed — check your connection.','!');}
}

async function lbFetchAll(){
  const db=await getFirestoreDb();if(!db)return[];
  const{collection,getDocs,query,orderBy}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  try{
    const snap=await getDocs(query(collection(db,'leaderboard'),orderBy('totalMins','desc')));
    const currentWeekKey=weekMon();
    const rows=[];
    snap.forEach(d=>{
      const row={id:d.id,...d.data()};
      // Zero out weekMins for any record that wasn't pushed this week
      if(row.weekKey!==currentWeekKey)row.weekMins=0;
      rows.push(row);
    });
    return rows;
  }catch(e){console.warn('LB fetch failed:',e);showToast('Could not load leaderboard — check your connection.','!');return[];}
}

let _lbCache=null,_lbCacheTime=0;
async function lbGetCached(force){
  if(!force&&_lbCache&&Date.now()-_lbCacheTime<30000)return _lbCache;
  _lbCache=await lbFetchAll();_lbCacheTime=Date.now();return _lbCache;
}
/* ── Teams (Firestore) ── */
function genTeamCode(){
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c='';for(let i=0;i<6;i++)c+=chars[Math.floor(Math.random()*chars.length)];
  return c;
}

function saveTeamsList(){localStorage.setItem('mer_teams',JSON.stringify(S.lbTeams));}

async function createTeam(name,subject){
  const db=await getFirestoreDb();if(!db)return null;
  const{doc,setDoc,collection:col}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const userId=getLbUserId();
  const userName=S.data?.name||'Anonymous';
  const code=genTeamCode();
  const teamId=uid();
  const team={name,code,subject:subject||null,createdBy:userId,createdAt:Date.now(),members:[{userId,name:userName,joinedAt:Date.now()}]};
  try{
    await setDoc(doc(db,'teams',teamId),team);
    S.lbTeams.push({id:teamId,name,code});saveTeamsList();
    S.lbTeamData[teamId]={...team};
    return{id:teamId,...team};
  }catch(e){console.warn('Create team failed:',e);return null;}
}

async function updateTeamSubject(teamId,subject){
  const db=await getFirestoreDb();if(!db)return false;
  const{doc,updateDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  try{
    await updateDoc(doc(db,'teams',teamId),{subject:subject||null});
    if(S.lbTeamData[teamId])S.lbTeamData[teamId].subject=subject||null;
    return true;
  }catch(e){console.warn('Update team subject failed:',e);return false;}
}

async function joinTeam(code){
  const db=await getFirestoreDb();if(!db)return{ok:false,msg:'No database'};
  const{collection:col,getDocs,query,where,doc,updateDoc,arrayUnion}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const userId=getLbUserId();
  const userName=S.data?.name||'Anonymous';
  try{
    const snap=await getDocs(query(col(db,'teams'),where('code','==',code.toUpperCase())));
    if(snap.empty)return{ok:false,msg:'No team found with that code'};
    const teamDoc=snap.docs[0];
    const team=teamDoc.data();
    if(team.members.some(m=>m.userId===userId))return{ok:false,msg:'You\'re already in this team'};
    if((team.members||[]).length>=10)return{ok:false,msg:'This team is full (max 10 members)'};
    await updateDoc(doc(db,'teams',teamDoc.id),{members:arrayUnion({userId,name:userName,joinedAt:Date.now()})});
    S.lbTeams.push({id:teamDoc.id,name:team.name,code:team.code});saveTeamsList();
    team.members.push({userId,name:userName,joinedAt:Date.now()});
    S.lbTeamData[teamDoc.id]=team;
    return{ok:true,team:{id:teamDoc.id,...team}};
  }catch(e){console.warn('Join team failed:',e);return{ok:false,msg:'Failed to join'};}
}

async function leaveTeam(teamId){
  const db=await getFirestoreDb();if(!db)return false;
  const{doc,getDoc,updateDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  const userId=getLbUserId();
  try{
    const snap=await getDoc(doc(db,'teams',teamId));
    if(!snap.exists())return false;
    const team=snap.data();
    const newMembers=team.members.filter(m=>m.userId!==userId);
    if(newMembers.length===0){
      const{deleteDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
      await deleteDoc(doc(db,'teams',teamId));
    }else{
      await updateDoc(doc(db,'teams',teamId),{members:newMembers});
    }
    S.lbTeams=S.lbTeams.filter(t=>t.id!==teamId);saveTeamsList();
    delete S.lbTeamData[teamId];
    return true;
  }catch(e){console.warn('Leave team failed:',e);return false;}
}

async function fetchTeam(teamId){
  const db=await getFirestoreDb();if(!db)return null;
  const{doc,getDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
  try{
    const snap=await getDoc(doc(db,'teams',teamId));
    if(!snap.exists())return null;
    const team={id:snap.id,...snap.data()};
    S.lbTeamData[teamId]=team;
    return team;
  }catch(e){console.warn('Fetch team failed:',e);return null;}
}

async function fetchAllUserTeams(){
  const promises=S.lbTeams.map(t=>fetchTeam(t.id));
  const results=await Promise.allSettled(promises);
  // Clean up any teams that no longer exist
  const valid=[];
  results.forEach((r,i)=>{
    if(r.status==='fulfilled'&&r.value){
      valid.push(S.lbTeams[i]);
      // Check if user is still a member
      const userId=getLbUserId();
      if(!r.value.members?.some(m=>m.userId===userId)){
        delete S.lbTeamData[S.lbTeams[i].id];
        return;
      }
      valid[valid.length-1]=S.lbTeams[i];
    }
  });
  S.lbTeams=valid;saveTeamsList();
}

function updateSyncDot(){const d=document.querySelector('.sync-dot');if(!d)return;const sc=loadSync();if(!sc.apiKey){d.style.display='none';return;}d.style.display='';d.className='sync-dot'+({ok:' ok',err:' err',syncing:' ing'}[sc.status]||'');}

/* ════════════════════════════════
   TIMER STATE
════════════════════════════════ */
let timerInt=null,timerStart=0,timerElap=0,timerRunning=false,timerTarget=25*60;
let breakInt=null,breakElap=0,breakTarget=5*60;
function fireNotif(title,body){if('Notification' in window&&Notification.permission==='granted'){new Notification(title,{body,icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="%2328221A"/><text x="16" y="22" text-anchor="middle" font-size="18">📚</text></svg>'});}}
function startTimer(){
  // Request notification permission when a timer is started
  if('Notification' in window&&Notification.permission==='default')Notification.requestPermission();
  timerStart=Date.now()-timerElap*1000;timerRunning=true;clearInterval(timerInt);
  timerInt=setInterval(()=>{
    timerElap=Math.floor((Date.now()-timerStart)/1000);
    if(timerElap>=timerTarget){
      timerElap=timerTarget;clearInterval(timerInt);timerRunning=false;Ambient.stop();
      S.pomodoroCount++;S.pomodoroBreak=true;breakElap=0;
      breakTarget=S.pomodoroCount%4===0?20*60:5*60;
      startBreak();renderTimerFast();
      showToast('Timer done — take a break, then log your session','⏱');
      fireNotif('Meridian — session complete!',`${Math.round(timerTarget/60)} min session done. Time for a ${S.pomodoroCount%4===0?'20':'5'}-min break.`);
    }else renderTimerFast();
  },500);
}
function startBreak(){
  clearInterval(breakInt);
  breakInt=setInterval(()=>{
    breakElap++;
    if(breakElap>=breakTarget){
      clearInterval(breakInt);S.pomodoroBreak=false;
      showToast('Break over — log your session or start another round','🔔');
      fireNotif('Meridian — break over!','Time to get back to it. Log your session or start another round.');
      if(S.view==='timer')render();
    }else if(S.view==='timer')renderBreakFast();
  },1000);
}
function renderBreakFast(){const rem=Math.max(0,breakTarget-breakElap),m=Math.floor(rem/60),s=rem%60;const el=document.getElementById('break-timer');if(el)el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
function skipBreak(){clearInterval(breakInt);S.pomodoroBreak=false;render();}
function pauseTimer(){clearInterval(timerInt);timerRunning=false;timerElap=Math.floor((Date.now()-timerStart)/1000);}
function resetTimer(){clearInterval(timerInt);timerRunning=false;timerElap=0;renderTimerFast();}
function renderTimerFast(){const rem=Math.max(0,timerTarget-timerElap),m=Math.floor(rem/60),s=rem%60;const pct=Math.min(100,(timerElap/timerTarget)*100);const t=document.getElementById('tt-time');if(t){t.innerHTML=`${String(m).padStart(2,'0')}<span class="timer-colon" id="tt-colon">:</span>${String(s).padStart(2,'0')}`;t.className='timer-num'+(timerRunning?' run':'');}const l=document.getElementById('tt-lbl');if(l){const focusLabels=['Ready','Focus time','In the zone','Deep focus','Unstoppable'];const fi=timerRunning?Math.min(4,Math.floor(timerElap/600)):0;l.textContent=timerRunning?focusLabels[fi]:timerElap>0?'Paused':'Ready';}const pc=document.getElementById('tt-pct');if(pc)pc.textContent=Math.round(pct)+'%';const R=88,CIRC=2*Math.PI*R;const ring=document.getElementById('tt-ring');if(ring){const themed=document.querySelector('.timer-themed');ring.style.strokeDashoffset=CIRC-(pct/100)*CIRC;ring.style.stroke=timerRunning?'url(#ring-grad)':(themed?'rgba(255,255,255,.25)':'var(--bdS)');ring.setAttribute('filter',timerRunning?'url(#ring-glow)':'');}const dotAngle=((pct/100)*360-90)*Math.PI/180;const dotX=110+R*Math.cos(dotAngle),dotY=110+R*Math.sin(dotAngle);const dot=document.getElementById('tt-dot');if(dot){dot.setAttribute('cx',dotX.toFixed(1));dot.setAttribute('cy',dotY.toFixed(1));}const dotG=document.getElementById('tt-dot-glow');if(dotG){dotG.setAttribute('cx',dotX.toFixed(1));dotG.setAttribute('cy',dotY.toFixed(1));}}

/* ════════════════════════════════
   AMBIENT AUDIO ENGINE
════════════════════════════════ */
const Ambient=(()=>{
  let ctx=null,master=null,nodes=[],timeouts=[],playing=false,theme=null;
  function init(){
    if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();
    if(ctx.state==='suspended')ctx.resume();
    master=ctx.createGain();master.gain.value=0.25;master.connect(ctx.destination);
  }
  function makeNoise(dur,type){
    const sr=ctx.sampleRate,len=sr*dur,buf=ctx.createBuffer(1,len,sr),d=buf.getChannelData(0);
    let last=0;
    for(let i=0;i<len;i++){
      const w=Math.random()*2-1;
      if(type==='brown'){d[i]=(last+0.02*w)/1.02;last=d[i];d[i]*=3.5;}
      else if(type==='pink'){d[i]=last*0.99+w*0.1;last=d[i];d[i]*=5;}
      else d[i]=w;
    }
    return buf;
  }
  function loopNoise(buf,gain,freq,fType){
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const g=ctx.createGain();g.gain.value=gain;
    const f=ctx.createBiquadFilter();f.type=fType||'lowpass';f.frequency.value=freq;
    src.connect(f);f.connect(g);g.connect(master);src.start();
    nodes.push(src,g,f);return{src,gain:g,filter:f};
  }
  function scheduleChirp(){
    if(!playing||theme!=='forest')return;
    const base=1800+Math.random()*2500;
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.type='sine';osc.frequency.setValueAtTime(base,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(base*(0.7+Math.random()*0.6),ctx.currentTime+0.12);
    g.gain.setValueAtTime(0,ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.025+Math.random()*0.02,ctx.currentTime+0.015);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.18);
    osc.connect(g);g.connect(master);osc.start();osc.stop(ctx.currentTime+0.22);
    if(Math.random()<0.4){
      timeouts.push(setTimeout(()=>{
        if(!playing||theme!=='forest')return;
        const o2=ctx.createOscillator(),g2=ctx.createGain();
        o2.type='sine';o2.frequency.value=base*1.25;
        g2.gain.setValueAtTime(0,ctx.currentTime);
        g2.gain.linearRampToValueAtTime(0.018,ctx.currentTime+0.01);
        g2.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.12);
        o2.connect(g2);g2.connect(master);o2.start();o2.stop(ctx.currentTime+0.15);
      },180+Math.random()*120));
    }
    timeouts.push(setTimeout(scheduleChirp,2500+Math.random()*5500));
  }
  function scheduleClink(){
    if(!playing||theme!=='cafe')return;
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.type='sine';osc.frequency.value=3500+Math.random()*2500;
    g.gain.setValueAtTime(0,ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.012,ctx.currentTime+0.004);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.07);
    osc.connect(g);g.connect(master);osc.start();osc.stop(ctx.currentTime+0.09);
    timeouts.push(setTimeout(scheduleClink,5000+Math.random()*9000));
  }
  function playForest(){
    const brown=makeNoise(4,'brown');
    loopNoise(brown,0.12,280,'lowpass');
    const white=makeNoise(4,'white');
    loopNoise(white,0.015,2500,'highpass');
    timeouts.push(setTimeout(scheduleChirp,800));
    timeouts.push(setTimeout(scheduleChirp,3500));
  }
  function playCafe(){
    const pink=makeNoise(4,'pink');
    loopNoise(pink,0.08,350,'lowpass');
    const white=makeNoise(4,'white');
    loopNoise(white,0.04,1800,'highpass');
    timeouts.push(setTimeout(scheduleClink,2000));
  }
  function playOcean(){
    const brown=makeNoise(4,'brown');
    const{gain:wg}=loopNoise(brown,0.18,220,'lowpass');
    const lfo=ctx.createOscillator(),lg=ctx.createGain();
    lfo.type='sine';lfo.frequency.value=0.07;lg.gain.value=0.09;
    lfo.connect(lg);lg.connect(wg.gain);lfo.start();nodes.push(lfo,lg);
    const white=makeNoise(4,'white');
    const{gain:sg}=loopNoise(white,0.035,700,'bandpass');
    const lfo2=ctx.createOscillator(),lg2=ctx.createGain();
    lfo2.type='sine';lfo2.frequency.value=0.11;lg2.gain.value=0.025;
    lfo2.connect(lg2);lg2.connect(sg.gain);lfo2.start();nodes.push(lfo2,lg2);
  }
  return{
    play(t){
      this.stop();init();theme=t;playing=true;
      if(t==='forest')playForest();
      else if(t==='cafe')playCafe();
      else if(t==='ocean')playOcean();
    },
    stop(){
      timeouts.forEach(t=>clearTimeout(t));timeouts=[];
      nodes.forEach(n=>{try{n.stop?.();}catch(e){}try{n.disconnect();}catch(e){}});
      nodes=[];
      if(master)try{master.disconnect();}catch(e){}
      master=null;playing=false;theme=null;
    },
    get playing(){return playing;}
  };
})();

/* ════════════════════════════════
   TIMER BACKGROUNDS (SVG)
════════════════════════════════ */
function _srand(s){return()=>{s=(s*16807)%2147483647;return s/2147483647;};}

function renderTimerBg(theme){
  if(theme==='forest')return _renderForestBg();
  if(theme==='cafe')return _renderCafeBg();
  if(theme==='ocean')return _renderOceanBg();
  return'';
}

function _renderForestBg(){
  const r=_srand(42);
  const layer=(n,baseY,minH,maxH,w)=>{
    let d='';
    for(let i=0;i<n;i++){
      const x=(i/(n-1))*860-30+(r()-0.5)*28;
      const h=minH+r()*(maxH-minH);
      const tw=w+(r()-0.5)*12;
      d+=`M${x-tw/2},${baseY} L${x},${baseY-h} L${x+tw/2},${baseY} Z `;
    }
    return d;
  };
  return`<svg class="tbg-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9BAF97"/>
        <stop offset="100%" stop-color="#889E84"/>
      </linearGradient>
      <linearGradient id="ffog" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(155,175,151,0)"/>
        <stop offset="100%" stop-color="rgba(155,175,151,.4)"/>
      </linearGradient>
    </defs>
    <rect width="800" height="300" fill="url(#fsky)"/>
    <g class="tbg-layer" style="--dx:-6px;--dur:22s;">
      <path d="${layer(18,265,70,155,42)}" fill="#7D9D78" opacity=".65"/>
    </g>
    <g class="tbg-layer" style="--dx:5px;--dur:28s;">
      <path d="${layer(22,278,55,125,36)}" fill="#5C7F58" opacity=".8"/>
    </g>
    <g class="tbg-layer" style="--dx:-3px;--dur:35s;">
      <path d="${layer(26,290,45,105,30)}" fill="#3D6039"/>
    </g>
    <g class="tbg-layer" style="--dx:2px;--dur:40s;">
      <path d="${layer(14,300,65,135,48)}" fill="#264026"/>
    </g>
    <rect width="800" height="80" y="230" fill="url(#ffog)" class="tbg-fog"/>
    <rect width="800" height="50" y="255" fill="url(#ffog)" class="tbg-fog" style="animation-delay:3s;animation-duration:18s;"/>
    <ellipse cx="200" cy="45" rx="120" ry="25" fill="rgba(180,200,180,.06)" class="tbg-cloud" style="--cx:60px;--cd:45s;"/>
    <ellipse cx="580" cy="30" rx="90" ry="18" fill="rgba(180,200,180,.05)" class="tbg-cloud" style="--cx:50px;--cd:55s;animation-delay:8s;"/>
    <ellipse cx="400" cy="55" rx="70" ry="14" fill="rgba(180,200,180,.04)" class="tbg-cloud" style="--cx:40px;--cd:50s;animation-delay:15s;"/>
    <circle cx="680" cy="40" r="4" fill="rgba(255,255,200,.18)" class="tbg-firefly" style="--fy:-20px;--fx:8px;--fd:4s;"/>
    <circle cx="150" cy="60" r="3" fill="rgba(255,255,200,.14)" class="tbg-firefly" style="--fy:-15px;--fx:-6px;--fd:5s;animation-delay:1.5s;"/>
    <circle cx="400" cy="50" r="3.5" fill="rgba(255,255,200,.1)" class="tbg-firefly" style="--fy:-25px;--fx:10px;--fd:6s;animation-delay:3s;"/>
    <circle cx="550" cy="80" r="2.5" fill="rgba(255,255,200,.13)" class="tbg-firefly" style="--fy:-18px;--fx:-5px;--fd:4.5s;animation-delay:2s;"/>
    <circle cx="80" cy="95" r="2" fill="rgba(255,255,200,.1)" class="tbg-firefly" style="--fy:-22px;--fx:12px;--fd:5.5s;animation-delay:4s;"/>
    <circle cx="720" cy="100" r="3" fill="rgba(255,255,200,.09)" class="tbg-firefly" style="--fy:-12px;--fx:-8px;--fd:7s;animation-delay:6s;"/>
    <path d="M120,80 Q125,90 130,82 Q132,78 128,80 Z" fill="rgba(90,130,60,.3)" class="tbg-leaf" style="--lx:80px;--ly:200px;--lr:400deg;--ld:8s;"/>
    <path d="M350,60 Q355,70 360,62 Q362,58 358,60 Z" fill="rgba(120,100,40,.25)" class="tbg-leaf" style="--lx:-50px;--ly:220px;--lr:-350deg;--ld:10s;animation-delay:3s;"/>
    <path d="M600,70 Q605,80 610,72 Q612,68 608,70 Z" fill="rgba(80,120,50,.3)" class="tbg-leaf" style="--lx:60px;--ly:210px;--lr:380deg;--ld:9s;animation-delay:6s;"/>
    <path d="M250,50 Q253,58 258,52 Q259,48 255,50 Z" fill="rgba(140,110,30,.2)" class="tbg-leaf" style="--lx:-40px;--ly:230px;--lr:-420deg;--ld:11s;animation-delay:9s;"/>
    <path d="M500,90 Q504,98 508,92 Q509,88 505,90 Z" fill="rgba(100,130,50,.25)" class="tbg-leaf" style="--lx:70px;--ly:190px;--lr:360deg;--ld:7.5s;animation-delay:1.5s;"/>
  </svg>`;
}

function _renderCafeBg(){
  // City skyline
  const bldgs=[
    {x:0,w:45,h:65},{x:50,w:35,h:100},{x:90,w:55,h:75},{x:150,w:28,h:120},
    {x:182,w:60,h:85},{x:248,w:30,h:110},{x:282,w:50,h:70},{x:336,w:40,h:130},
    {x:380,w:55,h:90},{x:440,w:35,h:105},{x:480,w:60,h:65},{x:545,w:30,h:115},
    {x:580,w:50,h:80},{x:635,w:40,h:100},{x:680,w:45,h:70},{x:730,w:35,h:95},{x:770,w:40,h:60}
  ];
  const baseY=200;
  let skyline='M0,'+baseY;
  for(const b of bldgs)skyline+=` L${b.x},${baseY} L${b.x},${baseY-b.h} L${b.x+b.w},${baseY-b.h} L${b.x+b.w},${baseY}`;
  skyline+=` L800,${baseY} L800,300 L0,300 Z`;
  // Windows: small glowing rectangles on buildings
  let windows='';
  const wr=_srand(77);
  for(const b of bldgs){
    const cols=Math.floor(b.w/14);
    const rows=Math.floor(b.h/18);
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      if(wr()<0.45)continue;
      const wx=b.x+6+c*14,wy=baseY-b.h+8+r*18;
      const bright=0.3+wr()*0.6;
      windows+=`<rect x="${wx}" y="${wy}" width="8" height="10" rx="1" fill="rgba(255,200,100,${bright.toFixed(2)})" class="${wr()<0.15?'tbg-win-flicker':''}"/>`;
    }
  }
  // Rain
  let rain='';
  const rr=_srand(99);
  for(let i=0;i<40;i++){
    const rx=rr()*800,ry=rr()*250,rl=8+rr()*16;
    rain+=`<line x1="${rx}" y1="${ry}" x2="${rx-1}" y2="${ry+rl}" stroke="rgba(180,200,220,.15)" stroke-width=".8" class="tbg-rain" style="animation-delay:${(rr()*2).toFixed(1)}s;"/>`;
  }
  // Steam
  const steam=`<path d="M720,260 Q725,240 718,225 Q712,210 718,195 Q724,180 720,165" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="2" stroke-linecap="round" class="tbg-steam"/>
  <path d="M730,262 Q735,245 728,230 Q722,215 728,200" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="1.5" stroke-linecap="round" class="tbg-steam" style="animation-delay:.8s;"/>`;
  return`<svg class="tbg-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="csky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1420"/>
        <stop offset="100%" stop-color="#2a1e14"/>
      </linearGradient>
      <radialGradient id="cwarm" cx="70%" cy="80%" r="50%">
        <stop offset="0%" stop-color="rgba(200,140,60,.08)"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
    </defs>
    <rect width="800" height="300" fill="url(#csky)"/>
    <rect width="800" height="300" fill="url(#cwarm)"/>
    ${rain}
    <path d="${skyline}" fill="#0e0a08"/>
    ${windows}
    ${steam}
    <ellipse cx="700" cy="275" rx="40" ry="8" fill="rgba(200,140,60,.05)"/>
    <rect x="330" y="82" width="50" height="14" rx="3" fill="none" stroke="rgba(255,100,80,.12)" stroke-width="1" class="tbg-neon"/>
    <text x="355" y="93" text-anchor="middle" font-size="8" fill="rgba(255,100,80,.18)" class="tbg-neon" font-family="sans-serif">OPEN</text>
    <rect x="328" y="80" width="54" height="18" rx="4" fill="rgba(255,100,80,.02)" class="tbg-neon"/>
    <ellipse cx="355" cy="200" rx="30" ry="3" fill="rgba(255,100,80,.03)" class="tbg-neon"/>
    <g class="tbg-puddle" style="--pd:6s;">
      <ellipse cx="200" cy="250" rx="35" ry="4" fill="rgba(255,200,100,.02)"/>
      <ellipse cx="200" cy="250" rx="20" ry="2.5" fill="rgba(255,200,100,.03)" class="tbg-puddle-shimmer"/>
    </g>
    <g class="tbg-puddle" style="--pd:8s;">
      <ellipse cx="500" cy="260" rx="40" ry="4.5" fill="rgba(180,200,220,.02)"/>
      <ellipse cx="500" cy="260" rx="22" ry="2" fill="rgba(180,200,220,.03)" class="tbg-puddle-shimmer" style="animation-delay:2s;"/>
    </g>
    <g class="tbg-puddle" style="--pd:7s;">
      <ellipse cx="680" cy="245" rx="28" ry="3" fill="rgba(255,200,100,.02)"/>
      <ellipse cx="680" cy="245" rx="15" ry="2" fill="rgba(255,200,100,.03)" class="tbg-puddle-shimmer" style="animation-delay:4s;"/>
    </g>
    <line x1="-50" y1="270" x2="850" y2="268" stroke="rgba(255,220,150,.0)" stroke-width="3" class="tbg-headlight"/>
    <line x1="-50" y1="272" x2="850" y2="270" stroke="rgba(255,220,150,.0)" stroke-width="2" class="tbg-headlight" style="animation-delay:8s;"/>
  </svg>`;
}

function _renderOceanBg(){
  const wave=(y,amp,freq,w)=>{
    let d=`M0,${y}`;
    for(let x=0;x<=w;x+=8){
      const wy=y+Math.sin((x/w)*Math.PI*2*freq)*amp;
      d+=` L${x},${wy.toFixed(1)}`;
    }
    d+=` L${w},310 L0,310 Z`;return d;
  };
  // Stars
  let stars='';const sr=_srand(55);
  for(let i=0;i<35;i++){
    const sx=sr()*800,sy=sr()*120,so=0.2+sr()*0.6,ss=0.8+sr()*1.5;
    stars+=`<circle cx="${sx}" cy="${sy}" r="${ss.toFixed(1)}" fill="rgba(255,255,255,${so.toFixed(2)})"${sr()<0.2?' class="tbg-star-twinkle"':''}/>`;
  }
  return`<svg class="tbg-svg" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="osky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0e1a"/>
        <stop offset="40%" stop-color="#12203a"/>
        <stop offset="100%" stop-color="#1a3050"/>
      </linearGradient>
    </defs>
    <rect width="800" height="300" fill="url(#osky)"/>
    ${stars}
    <ellipse cx="250" cy="25" rx="80" ry="12" fill="rgba(200,210,230,.03)" class="tbg-cloud" style="--cx:100px;--cd:60s;"/>
    <ellipse cx="100" cy="40" rx="60" ry="10" fill="rgba(200,210,230,.025)" class="tbg-cloud" style="--cx:80px;--cd:70s;animation-delay:10s;"/>
    <ellipse cx="500" cy="18" rx="50" ry="8" fill="rgba(200,210,230,.02)" class="tbg-cloud" style="--cx:70px;--cd:55s;animation-delay:20s;"/>
    <line x1="180" y1="30" x2="140" y2="55" stroke="rgba(255,255,255,.5)" stroke-width=".8" stroke-linecap="round" class="tbg-shootstar"/>
    <line x1="180" y1="30" x2="160" y2="42" stroke="rgba(255,255,255,.3)" stroke-width="2" stroke-linecap="round" class="tbg-shootstar" style="filter:blur(1px);"/>
    <circle cx="650" cy="55" r="22" fill="rgba(255,250,230,.9)" class="tbg-moon"/>
    <circle cx="650" cy="55" r="35" fill="rgba(255,250,230,.04)"/>
    <circle cx="650" cy="55" r="50" fill="rgba(255,250,230,.02)"/>
    <ellipse cx="650" cy="220" rx="4" ry="50" fill="rgba(255,250,230,.04)" class="tbg-moonreflect"/>
    <ellipse cx="650" cy="240" rx="2" ry="35" fill="rgba(255,250,230,.06)" class="tbg-moonreflect" style="animation-delay:.8s;"/>
    <ellipse cx="650" cy="260" rx="6" ry="20" fill="rgba(255,250,230,.03)" class="tbg-moonreflect" style="animation-delay:1.6s;"/>
    <g class="tbg-wave" style="--wy:6px;--dur:6s;">
      <path d="${wave(210,12,2.5,800)}" fill="rgba(20,55,100,.6)"/>
    </g>
    <g class="tbg-wave" style="--wy:8px;--dur:4.5s;animation-delay:.5s;">
      <path d="${wave(230,10,3,800)}" fill="rgba(25,75,130,.5)"/>
    </g>
    <g class="tbg-wave" style="--wy:5px;--dur:5.5s;animation-delay:1s;">
      <path d="${wave(250,8,3.5,800)}" fill="rgba(30,95,160,.5)"/>
    </g>
    <g class="tbg-wave" style="--wy:4px;--dur:3.5s;animation-delay:1.5s;">
      <path d="${wave(268,6,4,800)}" fill="rgba(40,110,175,.6)"/>
    </g>
    <path d="${wave(285,4,5,800)}" fill="rgba(50,130,190,.7)"/>
    <line x1="50" y1="282" x2="120" y2="282" stroke="rgba(255,255,255,.06)" stroke-width=".5" stroke-linecap="round" class="tbg-foam" style="--fd:5s;"/>
    <line x1="300" y1="275" x2="390" y2="275" stroke="rgba(255,255,255,.05)" stroke-width=".5" stroke-linecap="round" class="tbg-foam" style="--fd:6s;animation-delay:1.5s;"/>
    <line x1="550" y1="280" x2="610" y2="280" stroke="rgba(255,255,255,.07)" stroke-width=".5" stroke-linecap="round" class="tbg-foam" style="--fd:4.5s;animation-delay:3s;"/>
    <line x1="700" y1="270" x2="750" y2="270" stroke="rgba(255,255,255,.04)" stroke-width=".5" stroke-linecap="round" class="tbg-foam" style="--fd:5.5s;animation-delay:2s;"/>
    <line x1="150" y1="260" x2="200" y2="260" stroke="rgba(255,255,255,.05)" stroke-width=".5" stroke-linecap="round" class="tbg-foam" style="--fd:7s;animation-delay:4s;"/>
  </svg>`;
}

/* ════════════════════════════════
   LIVE UPDATE TICKER
════════════════════════════════ */
let liveTickInt=null;
function startLiveTick(){clearInterval(liveTickInt);liveTickInt=setInterval(()=>{if(S.data&&(S.view==='dashboard'||S.view==='timetable')){renderLiveElements();}checkStreakReminder();},2000);}

// ── Browser notifications ──
function requestNotifPermission(){if('Notification' in window&&Notification.permission==='default'){Notification.requestPermission();}}
let _lastStreakNotif='';
function checkStreakReminder(){
  if(!S.data||!('Notification' in window)||Notification.permission!=='granted')return;
  const h=new Date().getHours();
  if(h<21||h>=23)return; // Only 9-11pm
  const tKey='mer_notif_'+today();
  if(localStorage.getItem(tKey))return;
  const tSess=S.data.sessions.filter(s=>s.date===today()&&s.subject!=='grace');
  if(tSess.length>0)return; // Already studied today
  const streak=getStreak(S.data.sessions);
  if(streak<1)return;
  localStorage.setItem(tKey,'1');
  new Notification('Meridian — streak at risk',{body:`Your ${streak}-day streak ends at midnight. Even 10 minutes saves it.`,icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="%2328221A"/><text x="16" y="22" text-anchor="middle" font-size="18">🔥</text></svg>'});
}
function renderLiveElements(){
  // Update Now/Next card — swap innerHTML (not outerHTML) so the element stays in the DOM and animations don't replay
  const nn=document.getElementById('nownext');
  if(nn&&S.data){
    nn.classList.add('no-anim');
    const html=renderNowNext();
    const tmp=document.createElement('div');tmp.innerHTML=html;const fresh=tmp.firstElementChild;
    if(fresh){
      // Update class list if card type changed
      nn.className=fresh.className+' no-anim';
      // Swap inner content only
      nn.innerHTML=fresh.innerHTML;
    }
  }
  // Update period progress bars
  document.querySelectorAll('[data-period-prog]').forEach(el=>{
    const s=new Date(el.dataset.start),e=new Date(el.dataset.end),now=new Date();
    const pct=Math.min(100,Math.max(0,((now-s)/(e-s))*100));
    el.style.width=pct+'%';
  });
  // Live countdown is already patched above via innerHTML diff
  // Update vertical day progress bar (timetable view)
  const dpBar=document.getElementById('day-prog-bar');
  if(dpBar){
    const ds=new Date(dpBar.dataset.dayStart),de=new Date(dpBar.dataset.dayEnd),now2=new Date();
    const span=de-ds;
    if(span>0){
      const pct=Math.min(100,Math.max(0,((now2-ds)/span)*100));
      const fill=dpBar.querySelector('.day-progress-bar-fill');
      if(fill){
        fill.style.height=pct+'%';
        if(pct>=100)fill.classList.add('done');
      }
      const lbl=document.getElementById('day-prog-pct');
      if(lbl){
        if(pct>=100){lbl.textContent='Complete';lbl.classList.add('done');}
        else lbl.textContent=Math.round(pct)+'% through';
      }
    }
  }
  // Update dashboard day progress bar
  const dashFill=document.getElementById('dash-day-prog-fill');
  if(dashFill){
    const ds2=new Date(dashFill.dataset.dayStart),de2=new Date(dashFill.dataset.dayEnd),now3=new Date();
    const span2=de2-ds2;
    if(span2>0){
      const pct2=Math.min(100,Math.max(0,((now3-ds2)/span2)*100));
      dashFill.style.width=pct2+'%';
      if(pct2>=100){dashFill.style.background='var(--ok)';}
      const dashLbl=document.getElementById('dash-day-prog-pct');
      if(dashLbl){dashLbl.textContent=pct2>=100?'✓':Math.round(pct2)+'%';}
    }
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
  testSub:null,testScore:'',testOutOf:100,testName:'',testType:'Test',testDate:today(),testNextDate:'',testNextName:'',editTestId:null,
  editSessId:null,logDate:'',
  regStep:1,regPin1:'',regPin2:'',regYear:11,
  regSubjects:['chem','bio','phys','max','mae','eng'],
  tutStep:0,showOnboardComplete:false,
  googleUser:null,
  _authRestoring:false,
  // Papers library
  papersSubFilter:'All',    // subject filter
  papersYrFilter:'All',     // 'All' / 'Yr 11' / 'Yr 12'
  papersSrcFilter:'All',    // 'All' / 'Mine' / 'thsconline' / 'HSC Official'
  papersTypeFilter:'All',   // 'All' / 'Paper' / 'Assignment' / 'Test' / 'Marking Scheme'
  papersSearch:'',
  papersSort:'date',        // 'date' / 'subject' / 'title'
  papersData:null,          // loaded papers cache {local:[], thsc:[], hsc:[]}
  papersLoading:false,
  // History filters
  histSubFilter:'All',
  histConfFilter:'All',
  // Stats range
  statsRange:'all',
  moreMenu:false,           // mobile "more" menu open
  // Leaderboard
  lbTab:0,                   // 0=rankings, 1=head-to-head, 2=teams
  lbSort:'totalMins',        // totalMins, weekMins, streak, avgScore
  lbData:null,               // cached leaderboard rows
  lbLoading:false,
  lbRival:null,              // selected rival userId for h2h
  lbH2hMode:'weekMins',     // h2h comparison mode
  // Teams
  lbTeams:JSON.parse(localStorage.getItem('mer_teams')||'[]'), // [{id,name,code}]
  lbTeamData:{},             // {teamId: {name,code,members:[{userId,name}]}}
  lbTeamView:null,           // teamId being viewed, null=list
  lbTeamVs:null,             // [teamIdA, teamIdB] for comparison
  lbTeamLoading:false,
  darkMode:localStorage.getItem('mer_dark')==='1',
  pomodoroBreak:false,       // true when in break phase
  pomodoroCount:0,           // completed pomodoros this session
  timerBg:localStorage.getItem('mer_timer_bg')||'none',  // 'none'|'forest'|'cafe'|'ocean'
  timerAudio:localStorage.getItem('mer_timer_audio')!=='0', // sound on/off
  timerFont:localStorage.getItem('mer_timer_font')||'default', // timer number font
  timerFocus:false, // fullscreen focus mode
};

/* ════════════════════════════════
   RENDER
════════════════════════════════ */
function navTo(view){
  const prev=S.view;
  S.view=view;S.modal=null;S.moreMenu=false;
  const content=document.getElementById('page-content');
  if(content&&prev!==view){
    content.classList.add('view-exit');
    setTimeout(()=>{render();},120);
  } else render();
}

function render(){
  const root=document.getElementById('app');
  if(!S.data){root.innerHTML=renderLogin();return;}
  if(S.view!=='timer')Ambient.stop();
  if(S.timerFocus&&S.view==='timer'){root.innerHTML=renderTimerFocus();renderTimerFast();return;}
  root.innerHTML=renderShell();
  // Scroll to top on view change
  const content=document.getElementById('page-content');
  if(content)content.scrollTop=0;
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
  // Sciences
  {id:'chem', name:'Chemistry',            abbr:'CH', target:60, icsCode:'11CHE4',  color:0},
  {id:'bio',  name:'Biology',              abbr:'BI', target:60, icsCode:'11BIO1',  color:1},
  {id:'phys', name:'Physics',              abbr:'PH', target:60, icsCode:'11PHY6',  color:2},
  {id:'esci', name:'Earth & Environmental',abbr:'EE', target:45, icsCode:'',        color:3},
  {id:'inv',  name:'Investigating Science',abbr:'IS', target:45, icsCode:'',        color:4},
  // Maths
  {id:'max',  name:'Maths Ext 1',          abbr:'MX', target:60, icsCode:'11MAX2',  color:3},
  {id:'mx2',  name:'Maths Ext 2',          abbr:'X2', target:60, icsCode:'',        color:4},
  {id:'mae',  name:'Maths Advanced',       abbr:'MA', target:60, icsCode:'11MAE2',  color:5},
  {id:'mst',  name:'Maths Standard 2',     abbr:'MS', target:45, icsCode:'',        color:6},
  {id:'ms1',  name:'Maths Standard 1',     abbr:'M1', target:45, icsCode:'',        color:7},
  // English
  {id:'eng',  name:'English Advanced',     abbr:'EN', target:45, icsCode:'11ENA5b', color:5},
  {id:'ens',  name:'English Standard',     abbr:'ES', target:45, icsCode:'',        color:6},
  {id:'ex1',  name:'English Ext 1',        abbr:'E1', target:45, icsCode:'',        color:7},
  {id:'ex2',  name:'English Ext 2',        abbr:'E2', target:45, icsCode:'',        color:0},
  {id:'esl',  name:'EAL/D',               abbr:'ED', target:45, icsCode:'',        color:1},
  // HSIE
  {id:'eco',  name:'Economics',            abbr:'EC', target:45, icsCode:'',        color:0},
  {id:'bus',  name:'Business Studies',     abbr:'BS', target:45, icsCode:'',        color:1},
  {id:'legal',name:'Legal Studies',        abbr:'LS', target:45, icsCode:'',        color:2},
  {id:'mod',  name:'Modern History',       abbr:'MH', target:45, icsCode:'',        color:3},
  {id:'anc',  name:'Ancient History',      abbr:'AH', target:45, icsCode:'',        color:4},
  {id:'hext', name:'History Extension',    abbr:'HX', target:45, icsCode:'',        color:5},
  {id:'geo',  name:'Geography',            abbr:'GE', target:45, icsCode:'',        color:6},
  {id:'sac',  name:'Society & Culture',    abbr:'SC', target:45, icsCode:'',        color:7},
  {id:'sor1', name:'Studies of Religion I', abbr:'R1', target:45, icsCode:'',       color:0},
  {id:'sor2', name:'Studies of Religion II',abbr:'R2', target:45, icsCode:'',       color:1},
  {id:'ab',   name:'Aboriginal Studies',   abbr:'AB', target:45, icsCode:'',        color:2},
  // TAS
  {id:'est',  name:'Engineering Studies',  abbr:'EG', target:45, icsCode:'11EST3',  color:6},
  {id:'sdd',  name:'Software Design',      abbr:'SD', target:45, icsCode:'',        color:7},
  {id:'ipt',  name:'Info Processes & Tech',abbr:'IT', target:45, icsCode:'',        color:0},
  {id:'dt',   name:'Design & Technology',  abbr:'DT', target:45, icsCode:'',        color:1},
  {id:'food', name:'Food Technology',      abbr:'FT', target:45, icsCode:'',        color:2},
  {id:'txtl', name:'Textiles & Design',    abbr:'TX', target:45, icsCode:'',        color:3},
  {id:'ind',  name:'Industrial Technology',abbr:'IN', target:45, icsCode:'',        color:4},
  {id:'ag',   name:'Agriculture',          abbr:'AG', target:45, icsCode:'',        color:5},
  // PDHPE
  {id:'pdhpe',name:'PDHPE',               abbr:'PE', target:45, icsCode:'',        color:5},
  {id:'cafs', name:'CAFS',                abbr:'CF', target:45, icsCode:'',        color:6},
  {id:'spls', name:'Sport Lifestyle Rec',  abbr:'SL', target:45, icsCode:'',        color:7},
  // Creative Arts
  {id:'vis',  name:'Visual Arts',          abbr:'VA', target:45, icsCode:'',        color:0},
  {id:'mus',  name:'Music 1',             abbr:'M1', target:45, icsCode:'',        color:1},
  {id:'mus2', name:'Music 2',             abbr:'M2', target:45, icsCode:'',        color:2},
  {id:'dra',  name:'Drama',               abbr:'DR', target:45, icsCode:'',        color:3},
  // VET / Other
  {id:'hms',  name:'Hospitality (HMS)',    abbr:'HM', target:45, icsCode:'',        color:4},
  {id:'vet',  name:'VET Entertainment',    abbr:'VE', target:45, icsCode:'',        color:5},
  {id:'vetc', name:'VET Construction',     abbr:'VC', target:45, icsCode:'',        color:6},
  // Languages
  {id:'jpn',  name:'Japanese',            abbr:'JP', target:45, icsCode:'',        color:0},
  {id:'fre',  name:'French',              abbr:'FR', target:45, icsCode:'',        color:1},
  {id:'ger',  name:'German',              abbr:'GR', target:45, icsCode:'',        color:2},
  {id:'ita',  name:'Italian',             abbr:'IT', target:45, icsCode:'',        color:3},
  {id:'chn',  name:'Chinese',             abbr:'CN', target:45, icsCode:'',        color:4},
  {id:'kor',  name:'Korean',              abbr:'KR', target:45, icsCode:'',        color:5},
  {id:'lat',  name:'Latin',               abbr:'LA', target:45, icsCode:'',        color:6},
  {id:'span', name:'Spanish',             abbr:'SP', target:45, icsCode:'',        color:7},
  {id:'arb',  name:'Arabic',              abbr:'AR', target:45, icsCode:'',        color:0},
  {id:'grk',  name:'Greek',               abbr:'GK', target:45, icsCode:'',        color:1},
  {id:'indo', name:'Indonesian',           abbr:'ID', target:45, icsCode:'',        color:2},
];

// Subject inherent difficulty coefficient (1.0 = standard; higher = harder to score high)
// Based on NSW HSC statistical distributions and general academic consensus
const SUBJECT_DIFFICULTY = {
  mx2:1.65, max:1.38, phys:1.32, chem:1.28, hext:1.22, ex2:1.22, esci:1.15,
  ex1:1.15, mae:1.12, chn:1.18, jpn:1.12, fre:1.1, ger:1.1, ita:1.1,
  kor:1.1, lat:1.18, eco:1.06, bio:1.02, eng:1.0, legal:1.0, mod:1.0,
  anc:1.0, geo:0.97, sac:0.97, ens:0.93, mst:0.95, ms1:0.88,
  sor1:0.95, sor2:0.95, bus:0.95, pdhpe:0.9, cafs:0.9, est:1.05,
  sdd:1.0, ipt:0.98, vis:0.88, mus:0.88, mus2:0.92, dra:0.9,
  hms:0.85, vet:0.85, vetc:0.82, food:0.87, txtl:0.87, ind:0.88, ag:0.9,
};
function getSubjectDifficulty(sub){
  if(!sub)return 1.0;
  const d=SUBJECT_DIFFICULTY[sub.id];
  if(d)return d;
  const n=(sub.name||'').toLowerCase();
  if(/ext(ension)?\s*2|4u/i.test(n))return 1.65;
  if(/ext(ension)?\s*1|3u/i.test(n))return 1.38;
  if(/physics/i.test(n))return 1.32;
  if(/chem/i.test(n))return 1.28;
  if(/math.*(adv|ext)|ext.*math/i.test(n))return 1.12;
  if(/english.*ext|ext.*english/i.test(n))return 1.15;
  if(/history.*ext|extension.*hist/i.test(n))return 1.22;
  if(/economics/i.test(n))return 1.06;
  return 1.0;
}
// Returns a contextual label for a score given subject difficulty
function getDifficultyContext(pct, diff){
  if(diff<1.05)return null; // only contextualise genuinely hard subjects
  // Adjust thresholds upward by difficulty — e.g. in Ext2 (1.65), 55% ≈ "good"
  const adj=pct*diff;
  if(adj>=90)return 'outstanding for this subject';
  if(adj>=80)return 'excellent for this subject';
  if(adj>=70)return 'strong result';
  if(adj>=60)return 'solid — above average for this subject';
  if(adj>=50)return 'respectable — this subject is genuinely hard';
  return null;
}

function renderLogin(){
  if(S.showOnboardComplete) return renderOnboardComplete();
  if(S._authRestoring) return`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:80vh;gap:16px;">
    <div class="lb-spinner" style="width:32px;height:32px;border-width:3px;"></div>
    <div style="font-size:14px;color:var(--tx2);">Restoring your account…</div>
  </div>`;
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
          <input class="fi" id="li-pin" type="password" inputmode="numeric" maxlength="4" placeholder="4-digit PIN" value="${esc(S.loginPin)}" autocomplete="current-password">
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
        <div class="reg-step-label">Step 1 of 4 — Your name</div>
        <div class="reg-step-title">What should we call you?</div>
        <div class="reg-step-desc mb24">This shows on your dashboard greeting and won't be shared with anyone.</div>
        <div class="fld">
          <label class="flbl">First name</label>
          <input class="fi" id="reg-name" type="text" placeholder="Name Here" value="${esc(S.loginName)}" autocomplete="off" autocorrect="off" autocapitalize="words" style="font-size:18px;padding:14px 16px;">
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
        <div class="reg-step-label">Step 2 of 4 — Security</div>
        <div class="reg-step-title">Create a PIN</div>
        <div class="reg-step-desc mb28">4 digits to unlock Meridian on this device. Your data stays local — use Cloud Sync in Settings to access it elsewhere.</div>
        <div class="pin-row">
          ${[0,1,2,3].map(i=>`<input class="pin-digit" id="pd-${i}" type="password" inputmode="numeric" maxlength="1" placeholder="·" data-idx="${i}">`).join('')}
        </div>
        <div class="pin-hint">PIN is a local lock — it doesn't leave this device.</div>
        ${S.loginErr?`<div class="aerr">${S.loginErr}</div>`:''}
        <button class="abtn" data-action="reg-next">Continue →</button>
      </div>`;

  } else if(step===3){
    stepContent = `
      <div class="auth-step-panel">
        <div class="reg-step-label">Step 3 of 4 — School year</div>
        <div class="reg-step-title">What year are you in?</div>
        <div class="reg-step-desc mb24">Sets your exam countdown and study targets.</div>
        <div class="year-grid">
          ${[7,8,9,10,11,12].map(y=>`<div class="year-btn${S.regYear===y?' on':''}" data-action="sel-year" data-year="${y}">Year ${y}</div>`).join('')}
        </div>
        <button class="abtn" data-action="reg-next">Continue →</button>
      </div>`;

  } else if(step===4){
    const selSet = new Set(S.regSubjects);
    stepContent = `
      <div class="auth-step-panel">
        <div class="reg-step-label">Step 4 of 4 — Your subjects</div>
        <div class="reg-step-title">What are you studying?</div>
        <div class="reg-step-desc mb18">Pick at least one subject. You can add or remove them later in Settings.</div>
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
        <button class="abtn${S.regSubjects.length===0?' disabled':''}" data-action="reg-finish" style="margin-top:12px;"${S.regSubjects.length===0?' disabled':''}>${S.regSubjects.length===0?'Select at least one subject':`Create account (${S.regSubjects.length} subject${S.regSubjects.length!==1?'s':''})`} →</button>
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
  const vs={dashboard:renderDash,timetable:renderTimetable,history:renderHistory,progress:renderProgress,stats:renderStats,papers:renderPapers,timer:renderTimer,settings:renderSettings,leaderboard:renderLeaderboard,assess:renderAssess,todo:renderTodo};
  const sc=loadSync();
  const hasTT=(S.data?.timetable||[]).length>0;
  const todayClasses=getTodayTT(S.data?.timetable||[]).length;
  return`
  <div class="topbar">
    <div class="logo">Meri<b>d</b>ian</div>
    <div class="topbar-r">
      <button class="ib" data-action="open-log" title="Log (L)" style="font-size:18px;color:var(--tx);font-weight:400;">+</button>
      <button class="ib" data-action="sync-now" title="Sync" style="font-size:15px;">↻<div class="sync-dot" style="display:${sc.apiKey?'':'none'}"></div></button>
      <button class="ib" data-action="nav-settings" style="font-size:15px;">⚙</button>
    </div>
  </div>
  <div class="wrap">
    <nav class="side dsk">
      ${[['dashboard','◉','Dashboard'],['timetable','☰','Timetable'],['assess','◫','Assessments'],['todo','✓','To-Do'],['leaderboard','◈','Leaderboard'],['history','◔','History'],['progress','△','Progress'],['stats','◇','Stats'],['papers','◧','Papers'],['timer','◷','Timer']].map(([v,i,l])=>{
        const pendingTodos=(S.data?.todos||[]).filter(t=>!t.done&&(!t.due||t.due<=today())).length;
        const upcomingAssess=(S.data?.assessments||[]).filter(a=>!a.done&&a.date>=today()&&daysUntil(a.date)<=7).length;
        return`<div class="si${S.view===v?' on':''}" data-action="nav-${v}"><span class="ico">${i}</span>${l}${v==='timetable'&&hasTT&&todayClasses>0?`<span class="si-badge">${todayClasses}</span>`:''}${v==='todo'&&pendingTodos>0?`<span class="si-badge">${pendingTodos}</span>`:''}${v==='assess'&&upcomingAssess>0?`<span class="si-badge si-badge-warn">${upcomingAssess}</span>`:''}</div>`;
      }).join('')}
      <div class="si-sec">Account</div>
      <div class="si${S.view==='settings'?' on':''}" data-action="nav-settings"><span class="ico">⚙</span>Settings</div>
      <div class="side-logbtn" data-action="open-log">+ Log Session</div>
    </nav>
    <div class="content" id="page-content">
      <div class="inner">${(vs[S.view]||renderDash)()}</div>
    </div>
  </div>
  <nav class="bnav mob">
    <div class="bni${S.view==='dashboard'?' on':''}" data-action="nav-dashboard"><span class="bni-ic">◉</span>Home<div class="bni-dot"></div></div>
    <div class="bni${S.view==='timer'?' on':''}" data-action="nav-timer"><span class="bni-ic">◷</span>Timer<div class="bni-dot"></div></div>
    <div class="fab-wrap">
      <div class="fab${todaySess(S.data?.sessions||[]).length===0?' fab-nudge':''}" data-action="open-log">＋</div>
    </div>
    <div class="bni${S.view==='progress'?' on':''}" data-action="nav-progress"><span class="bni-ic">△</span>Progress<div class="bni-dot"></div></div>
    <div class="bni${['timetable','papers','history','stats','settings','leaderboard','assess','todo'].includes(S.view)?' on':''}" data-action="toggle-more"><span class="bni-ic">⋯</span>More<div class="bni-dot"></div></div>
  </nav>
  ${S.moreMenu?`<div class="more-menu-overlay" data-action="close-more"></div>
  <div class="more-menu" id="more-sheet">
    <div class="more-menu-handle" data-action="close-more"></div>
    <div class="more-item${S.view==='timetable'?' on':''}" data-action="more-nav" data-view="timetable"><span class="more-item-ic">☰</span>Schedule</div>
    <div class="more-item${S.view==='assess'?' on':''}" data-action="more-nav" data-view="assess"><span class="more-item-ic">◫</span>Assessments</div>
    <div class="more-item${S.view==='todo'?' on':''}" data-action="more-nav" data-view="todo"><span class="more-item-ic">✓</span>To-Do</div>
    <div class="more-item${S.view==='leaderboard'?' on':''}" data-action="more-nav" data-view="leaderboard"><span class="more-item-ic">◈</span>Leaderboard</div>
    <div class="more-item${S.view==='papers'?' on':''}" data-action="more-nav" data-view="papers"><span class="more-item-ic">◧</span>Papers</div>
    <div class="more-item${S.view==='history'?' on':''}" data-action="more-nav" data-view="history"><span class="more-item-ic">◔</span>History</div>
    <div class="more-item${S.view==='stats'?' on':''}" data-action="more-nav" data-view="stats"><span class="more-item-ic">◇</span>Stats</div>
    <div class="more-item${S.view==='settings'?' on':''}" data-action="more-nav" data-view="settings"><span class="more-item-ic">⚙</span>Settings</div>
  </div>`:''}
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
        <div style="height:3px;background:rgba(58,120,85,.2);border-radius:2px;margin-top:8px;overflow:hidden;"><div data-period-prog data-start="${nn.ev.start}" data-end="${nn.ev.end}" style="width:${pct}%;height:100%;background:var(--ok);border-radius:2px;transition:width 2s linear;"></div></div>
      </div>
      <div id="live-countdown" class="live-time">${nn.mLeft}m<br><span style="font-size:12px;font-family:'DM Sans',sans-serif;font-weight:300;color:var(--ok);">left</span></div>
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

function getMotivation(sessions,streak){
  const h=new Date().getHours();
  const dow=new Date().getDay();
  const tMin=todaySess(sessions).reduce((a,s)=>a+s.duration,0);
  const tSess=todaySess(sessions).length;
  // Achievement-based (priority)
  if(tMin>=180)return'Incredible effort today. Your brain needs rest now — consolidation happens during downtime.';
  if(tMin>=120)return'Two hours of deep work. That\'s more than most people manage in a week.';
  if(tMin>=60&&tSess>=3)return'Multiple subjects covered. This kind of breadth makes a difference.';
  if(tMin>=60)return'Solid hour logged. Every session like this brings you closer.';
  // Streak-based
  if(streak>=50)return'50+ days of discipline. You\'re in a league of your own.';
  if(streak>=30)return'A full month. This isn\'t motivation anymore — it\'s habit.';
  if(streak>=14)return'Two weeks of consistency. That\'s when real progress starts compounding.';
  if(streak>=7)return'One week locked in. Consistency always beats intensity.';
  // Weekend
  if((dow===0||dow===6)&&tMin===0)return'Weekend session? Even 30 minutes today puts you ahead on Monday.';
  if((dow===0||dow===6)&&tMin>0)return'Weekend study pays off. Monday-you will be grateful.';
  // Time-of-day
  if(h<9)return'Early start. Morning focus is a competitive advantage.';
  if(h<12)return'Peak cognitive hours. Make them count.';
  if(h<15)return'Afternoon is prime time for practice problems and active recall.';
  if(h<18)return'Good time to review today\'s content while it\'s still fresh.';
  if(h<21)return'Evening study locks in long-term memory. Stay focused.';
  // Streak at risk
  if(tMin===0&&streak>3)return'Your streak is at risk. Even 10 minutes keeps it alive.';
  if(tMin===0&&streak>0)return'Don\'t break the chain. A quick session is all it takes.';
  if(tMin===0)return'The hardest part is starting. Just 15 minutes.';
  return'Every session compounds. Keep going.';
}

function renderDash(){
  const{sessions,subjects,name,year,timetable}=S.data;
  const streak=getStreak(sessions),best=getBest(sessions),risk=isRisk(sessions);
  const done=subjects.filter(sub=>subMinsToday(sessions,sub.id)>0);
  const tMins=dayMins(sessions,today()),wMins=weekMins(sessions),tSess=sessions.filter(s=>s.subject!=='grace').length;
  const exam=getExamDate(year),dLeft=daysUntil(exam.date);
  const h=new Date().getHours();
  const eName=esc(name);
  const greet=h<5?`Burning the midnight oil, ${eName}.`:h<12?`Good morning, ${eName}.`:h<17?`Good afternoon, ${eName}.`:h<21?`Good evening, ${eName}.`:`Night owl mode, ${eName}.`;
  const sMsg=streak===0?'Start your streak today.':risk&&streak>=7?`Your ${streak}-day streak ends tonight. Even 10 minutes saves it.`:risk?'Log before midnight — streak at risk.':streak===1?'Day 1. Come back tomorrow.':streak<7?`${streak} days straight.`:`${streak} days. Don't stop.`;
  const R=37,CIRC=2*Math.PI*R,pct=Math.min(1,streak/30),dashVal=pct*CIRC;
  const daysActive=new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date)).size;
  const avgHpd=daysActive>0?totalMins(sessions)/60/daysActive:0;
  const cvPct=Math.round((done.length/subjects.length)*100);
  const recent=[...sessions].filter(s=>s.subject!=='grace').sort((a,b)=>b.ts-a.ts).slice(0,5);
  const todayTT=getTodayTT(timetable||[]);
  const hasTT=(timetable||[]).length>0;

  // Compute day progress for dashboard
  let dashDayProg='';
  if(hasTT&&todayTT.length){
    const dFirst=new Date(todayTT[0].start),dLast=new Date(todayTT[todayTT.length-1].end);
    const dSpan=dLast-dFirst;
    if(dSpan>0){
      const dElapsed=Math.max(0,new Date()-dFirst);
      const dPct=Math.min(100,Math.max(0,Math.round((dElapsed/dSpan)*100)));
      const dDone=new Date()>=dLast;
      dashDayProg=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:10px 14px;background:var(--srf);border:1px solid var(--bd);border-radius:var(--rm);">
        <div style="flex:1;display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${dDone?'var(--ok)':'var(--acc)'};">${dDone?'Day complete':'Day progress'}</span>
            <span style="font-family:'DM Mono',monospace;font-size:9px;color:var(--tx3);">${fmtTime(dFirst)} – ${fmtTime(dLast)}</span>
          </div>
          <div style="height:4px;background:var(--srf2);border-radius:3px;overflow:hidden;">
            <div id="dash-day-prog-fill" data-day-start="${todayTT[0].start}" data-day-end="${todayTT[todayTT.length-1].end}" style="height:100%;width:${dPct}%;background:${dDone?'var(--ok)':'var(--acc)'};border-radius:3px;transition:width .8s cubic-bezier(.4,0,.2,1);"></div>
          </div>
        </div>
        <span id="dash-day-prog-pct" style="font-family:'DM Mono',monospace;font-size:11px;font-weight:500;color:${dDone?'var(--ok)':'var(--acc)'};flex-shrink:0;">${dDone?'✓':dPct+'%'}</span>
      </div>`;
    }
  }

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

  const motivation=getMotivation(sessions,streak);
  // Quick actions — contextual shortcuts
  const qaItems=[];
  qaItems.push({icon:'＋',label:'Log',action:'open-log',cls:''});
  qaItems.push({icon:'◷',label:'Timer',action:'nav-timer',cls:''});
  if(hasTT)qaItems.push({icon:'☰',label:'Schedule',action:'nav-timetable',cls:''});
  qaItems.push({icon:'◧',label:'Papers',action:'nav-papers',cls:''});
  if(risk&&streak>=2)qaItems.push({icon:'✦',label:'Grace',action:'use-grace',cls:'qa-warn'});

  return`
  <div class="dash-greet">
    <div class="dash-date">${new Date().toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long'})}</div>
    <div class="dash-name">${greet}</div>
    <div class="dash-motive">${motivation}</div>
  </div>

  <div class="qa-strip">${qaItems.map(q=>`<div class="qa-btn ${q.cls}" data-action="${q.action}"><span class="qa-ico">${q.icon}</span><span class="qa-lbl">${q.label}</span></div>`).join('')}</div>

  ${renderNowNext()}

  ${dashDayProg}

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

  ${[7,14,21,30,50,100].includes(streak)?`<div class="streak-milestone">🎯 <strong>${streak}-day milestone!</strong> ${streak>=50?'Elite consistency. This is what separates the top 1%.':streak>=30?'A full month. The habit is locked in now.':streak>=14?'Two weeks proves it\'s not luck — it\'s discipline.':streak>=7?'One week down. Most people don\'t make it this far.':'Keep it going.'}</div>`:''}

  <div class="today-overview">
    <div class="ov-tile${tMins>=120?' green':''}">
      <div class="ov-ico">◷</div>
      <div class="ov-lbl">Today</div>
      <div class="ov-val">${tMins?fmtDur(tMins):'0m'}</div>
      <div class="ov-sub">${todaySess(sessions).length} session${todaySess(sessions).length!==1?'s':''}</div>
    </div>
    <div class="ov-tile">
      <div class="ov-ico">◔</div>
      <div class="ov-lbl">This week</div>
      <div class="ov-val">${wMins?fmtDur(wMins):'0m'}</div>
      <div class="ov-sub">${Math.round(wMins/60*10)/10}h logged</div>
    </div>
    <div class="ov-tile">
      <div class="ov-ico">◇</div>
      <div class="ov-lbl">All time</div>
      <div class="ov-val">${totalMins(sessions)?fmtDur(totalMins(sessions)):'0m'}</div>
      <div class="ov-sub">${tSess} session${tSess!==1?'s':''}</div>
    </div>
    <div class="ov-tile${dLeft<=14?' urg-red':dLeft<=30?' urg-amber':dLeft<=60?' accent':''}">
      <div class="ov-ico">△</div>
      <div class="ov-lbl">${exam.name}</div>
      <div class="ov-val">${Math.max(0,dLeft)}</div>
      <div class="ov-sub">${dLeft<=0?'Exams now':'day'+(dLeft!==1?'s':'')+' to go'}</div>
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
  <div style="font-size:13px;color:var(--tx3);margin-bottom:18px;padding:14px 16px;background:var(--srf);border:1px solid var(--bd);border-radius:14px;">No classes today — ${isWeekend(today())?'enjoy the weekend. Perfect time for independent study.':'good day to get ahead on revision.'}.</div>`:''}

  <div class="cov-card${done.length===subjects.length?' cov-done':''}">
    <div class="cov-top">
      <span class="cov-lbl">${done.length===subjects.length?'All subjects covered today — well done':done.length===0?'No subjects covered yet — tap one below':`${subjects.length-done.length} subject${subjects.length-done.length!==1?'s':''} remaining today`}</span>
      <span class="cov-frac">${done.length}<small>/${subjects.length}</small></span>
    </div>
    <div class="cov-track"><div class="cov-fill${done.length===subjects.length?' done':''}" data-bw="${cvPct}" style="width:0%"></div></div>
    <div class="cov-dots">${subjects.map(sub=>{
      const isDone=done.some(d=>d.id===sub.id);
      const c=getSubjColor(sub);
      return`<div class="cov-sub-dot${isDone?' done':''}" title="${sub.name}${isDone?' ✓':''}" data-action="quick-log" data-subject="${sub.id}" style="--dot-bg:${c.bg};--dot-bd:${c.bd};--dot-tx:${c.tx};${isDone?'--dot-fill:var(--ok);':''}"><span class="cov-sub-abbr">${sub.abbr}</span></div>`;
    }).join('')}</div>
  </div>

  ${(()=>{
    const tests=S.data.tests||[];
    const upcoming=tests.filter(t=>t.nextTestDate&&t.nextTestDate>today()).sort((a,b)=>a.nextTestDate.localeCompare(b.nextTestDate)).slice(0,3);
    if(!upcoming.length)return'';
    return`<div class="dash-upcoming mb12">
      <div class="sec mb6"><span class="sec-lbl">Upcoming tests</span><span class="sec-link" data-action="prog-tab" data-tab="1">Scores →</span></div>
      ${upcoming.map(t=>{
        const d=daysUntil(t.nextTestDate);
        const sub=subjects.find(s=>s.id===t.subject);
        const c=sub?getSubjColor(sub):{bg:'var(--srf2)',tx:'var(--tx3)',bd:'var(--bd)'};
        const urgCls=d<=7?'urg-red':d<=14?'urg-amber':'';
        return`<div class="upcoming-test-row ${urgCls}">
          <div class="upt-days">${d}<span>d</span></div>
          <div class="upt-info">
            <div class="upt-name">${t.nextTestName||sub?.name||'Test'}</div>
            <div class="upt-sub">${sub?.name||''} · ${fmtShort(t.nextTestDate)}</div>
          </div>
          <div class="upt-action" data-action="quick-log" data-subject="${t.subject}">Study</div>
        </div>`;
      }).join('')}
    </div>`;
  })()}

  ${(()=>{
    const hCells=[];for(let i=55;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const ds=localDate(d);hCells.push({date:ds,mins:dayMins(sessions,ds),isT:ds===today()});}
    return`<div class="dash-heatmap" data-action="nav-history">
      <div class="sec mb6"><span class="sec-lbl">8-week activity</span><span class="sec-link">History →</span></div>
      <div class="dash-hmap-grid">${hCells.map(c=>{let cl='h0';if(c.mins>=10&&c.mins<30)cl='h1';else if(c.mins>=30&&c.mins<60)cl='h2';else if(c.mins>=60&&c.mins<120)cl='h3';else if(c.mins>=120)cl='h4';return`<div class="dhc ${cl}${c.isT?' htoday':''}" title="${fmtShort(c.date)}: ${c.mins>0?fmtDur(c.mins):'—'}"></div>`;}).join('')}</div>
    </div>`;
  })()}

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
        <div class="sub-time">${m>0?fmtDur(m)+' / '+sub.target+'m':hasClassToday?'In class today':'—'}</div>
        <div class="sub-bar"><div class="sub-bar-f" data-bw="${pct}" style="width:0%"></div></div>
      </div>`;
    }).join('')}
  </div>

  ${renderDashPsych(sessions,subjects)}

  <div class="sec"><span class="sec-lbl">Recent sessions</span><span class="sec-link" data-action="nav-history">All →</span></div>
  ${recent.length===0?`<div class="empty"><div class="empty-e">📚</div><div class="empty-t">Your study journey starts here</div><div class="empty-s">Log your first session to start tracking progress. Even 15 minutes a day builds real momentum over time.</div><div class="empty-action" data-action="open-log">+ Log your first session</div></div>`
  :`<div class="sess-list">${recent.map(renderSessRow).join('')}</div>`}

  ${renderDashLb()}`;
}

function renderDashPsych(sessions,subjects){
  let html='';

  // ── Spaced repetition: topics due for review ──
  const reviewTopics=getReviewTopics(sessions,subjects);
  if(reviewTopics.length){
    html+=`<div class="sec mb8"><span class="sec-lbl">Topics to review</span><span style="font-family:'DM Mono',monospace;font-size:9px;color:var(--tx3);letter-spacing:.06em;">SPACED REPETITION</span></div>
    <div class="psych-review-card mb16">
      ${reviewTopics.map(r=>{
        const urgCol=r.urgency==='high'?'var(--err)':r.urgency==='med'?'var(--acc)':'var(--tx3)';
        return`<div class="review-row">
          <div class="review-dot" style="background:${urgCol};"></div>
          <div class="review-info">
            <div class="review-topic">${r.topic}</div>
            <div class="review-sub">${r.subName} · ${r.daysSince}d ago</div>
          </div>
          <div class="review-action" data-action="quick-log" data-subject="${r.subId}">Study</div>
        </div>`;
      }).join('')}
      <div class="review-hint">Reviewing at spaced intervals boosts retention by up to 200%.</div>
    </div>`;
  }

  // ── Interleaving nudge ──
  const interleave=getInterleaveSuggestion(sessions,subjects);
  if(interleave){
    html+=`<div class="psych-nudge mb16">
      <div class="nudge-icon">🔀</div>
      <div class="nudge-text">
        <div class="nudge-title">Try switching subjects</div>
        <div class="nudge-body">You've done ${fmtDur(interleave.blockedMins)} of ${interleave.blockedSub} today. Mixing in <strong data-action="quick-log" data-subject="${interleave.suggestId}" style="color:var(--acc);cursor:pointer;">${interleave.suggestSub}</strong> next could boost long-term retention.</div>
      </div>
    </div>`;
  }

  // ── Growth mindset: contextual encouragement ──
  const real=sessions.filter(s=>s.subject!=='grace');
  const recentConf=real.filter(s=>s.confidence>0).slice(-5);
  const avgRecentConf=recentConf.length?recentConf.reduce((a,s)=>a+s.confidence,0)/recentConf.length:3;
  const streak=getStreak(sessions);
  let encourageCtx=null;
  if(avgRecentConf<2.5&&recentConf.length>=3)encourageCtx='lowConf';
  else if(streak===0&&real.length>10)encourageCtx='comeback';
  else if(streak>=7)encourageCtx='milestone';
  if(encourageCtx){
    html+=`<div class="psych-encourage mb16">${getEncouragement(encourageCtx)}</div>`;
  }

  return html;
}

function renderDashLb(){
  const rows=S.lbData;
  if(!rows||!rows.length||!window.FIREBASE_CONFIG)return'';
  const myId=getLbUserId();
  const sorted=[...rows].sort((a,b)=>(b.weekMins||0)-(a.weekMins||0));
  const top3=sorted.slice(0,3);
  const myRank=sorted.findIndex(r=>r.userId===myId);
  const medals=['🥇','🥈','🥉'];
  return`
  <div class="sec" style="margin-top:4px;"><span class="sec-lbl">Leaderboard</span><span class="sec-link" data-action="nav-leaderboard">Full board →</span></div>
  <div class="dash-lb">
    ${top3.map((r,i)=>{
      const isMe=r.userId===myId;
      return`<div class="dash-lb-row${isMe?' dash-lb-me':''}" data-action="nav-leaderboard">
        <span class="dash-lb-medal">${medals[i]}</span>
        <div class="dash-lb-av" style="background:${isMe?'var(--acc)':'var(--srf3)'};color:${isMe?'#fff':'var(--tx2)'};">${esc((r.name||'?')[0].toUpperCase())}</div>
        <span class="dash-lb-name">${esc(r.name)}${isMe?' <span class="lb-you">you</span>':''}</span>
        <span class="dash-lb-val">${fmtDur(r.weekMins||0)}</span>
      </div>`;
    }).join('')}
    ${myRank>2?`<div class="dash-lb-row dash-lb-me" data-action="nav-leaderboard">
      <span class="dash-lb-medal" style="font-size:11px;font-weight:600;">#${myRank+1}</span>
      <div class="dash-lb-av" style="background:var(--acc);color:#fff;">${esc((S.data?.name||'Y')[0].toUpperCase())}</div>
      <span class="dash-lb-name">${esc(S.data?.name||'You')} <span class="lb-you">you</span></span>
      <span class="dash-lb-val">${fmtDur(sorted[myRank]?.weekMins||0)}</span>
    </div>`:''}
  </div>`;
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
      <div class="no-tt-s">Import your ICS from Sentral to see your schedule, get smart study suggestions, and auto-fill subjects when logging.</div>
      <label class="import-btn" for="ics-file-input">↑ Import .ics from Sentral</label>
    </div>`;
  }

  const tabs=[{label:'Today',icon:'◉'},{label:'Tomorrow',icon:'→'},{label:'This week',icon:'▦'}];
  const now=new Date();
  let daysToShow=[];
  if(S.ttTab===0){daysToShow=[today()];}
  else if(S.ttTab===1){daysToShow=[addDays(today(),1)];}
  else{
    let d=today();
    for(let i=0;i<14&&daysToShow.length<5;i++){if(!isWeekend(d))daysToShow.push(d);d=addDays(d,1);}
  }

  function dayProgress(dateStr){
    const evs=getDayTT(tt,dateStr);
    if(!evs.length)return{total:0,done:0,cur:0,pct:0};
    const done=evs.filter(ev=>now>=new Date(ev.end)).length;
    const cur=evs.filter(ev=>now>=new Date(ev.start)&&now<new Date(ev.end)).length;
    const effective=done+(cur?0.5:0);
    return{total:evs.length,done,cur,pct:evs.length?Math.round((effective/evs.length)*100):0};
  }

  function renderFocusCard(){
    const nn=getNowNext(tt);
    const sessions=S.data.sessions||[];
    const todayEvs=getDayTT(tt,today());
    const dp=dayProgress(today());
    const logged=todaySess(sessions).length;

    if(nn.type==='done'){
      const totalLogged=todaySess(sessions).reduce((a,s)=>a+s.duration,0);
      return`<div class="tt-focus tt-focus-done">
        <div class="tt-focus-icon">✓</div>
        <div class="tt-focus-body">
          <div class="tt-focus-label">Day complete</div>
          <div class="tt-focus-title">All ${dp.total} classes finished</div>
          <div class="tt-focus-sub">${logged?`${logged} session${logged>1?'s':''} logged · ${fmtDur(totalLogged)} studied`:'Log what you learned to lock it in'}</div>
        </div>
      </div>`;
    }

    if(nn.type==='in-class'){
      const sub=S.data.subjects.find(x=>x.id===nn.ev.subjectId);
      const c=getSubjColor(sub||{color:0});
      const s=new Date(nn.ev.start),e=new Date(nn.ev.end);
      const pct=Math.min(100,((now-s)/(e-s))*100);
      const alreadyLogged=todaySess(sessions).some(sess=>sess.subject===nn.ev.subjectId&&sess.date===today());
      return`<div class="tt-focus tt-focus-now" style="--fc-tx:${c.tx};--fc-bg:${c.bg};--fc-bd:${c.bd}">
        <div class="tt-focus-dot" style="background:${c.tx}"></div>
        <div class="tt-focus-body">
          <div class="tt-focus-label" style="color:${c.tx}">Right now · ${nn.mLeft}m left</div>
          <div class="tt-focus-title" style="color:${c.tx}">${sub?.name||nn.ev.subjectName}</div>
          <div class="tt-focus-sub">${nn.ev.room}${nn.ev.teacher?' · '+nn.ev.teacher:''}</div>
          <div class="tt-focus-progress">
            <div class="tt-focus-progress-fill" data-period-prog data-start="${nn.ev.start}" data-end="${nn.ev.end}" style="width:${pct}%;background:${c.tx}"></div>
          </div>
        </div>
        ${!alreadyLogged?`<div class="tt-focus-act" data-action="quick-log" data-subject="${nn.ev.subjectId}" style="background:${c.tx}">Log</div>`:`<div class="tt-focus-check" style="color:${c.tx}">✓</div>`}
      </div>`;
    }

    if(nn.type==='next'){
      const sub=S.data.subjects.find(x=>x.id===nn.ev.subjectId);
      const c=getSubjColor(sub||{color:0});
      const gap=nn.mUntil;
      const studyHint=gap>=15&&logged<todayEvs.length?`<div class="tt-focus-hint">You have ${fmtMins(gap)} free — review something from earlier?</div>`:'';
      return`<div class="tt-focus tt-focus-next">
        <div class="tt-focus-accent" style="background:${c.tx}"></div>
        <div class="tt-focus-body">
          <div class="tt-focus-label">Up next · in ${fmtMins(nn.mUntil)}</div>
          <div class="tt-focus-title">${sub?.name||nn.ev.subjectName}</div>
          <div class="tt-focus-sub">${nn.ev.room}${nn.ev.teacher?' · '+nn.ev.teacher:''}</div>
          ${studyHint}
        </div>
      </div>`;
    }

    if(nn.type==='no-school'){
      const sub=nn.nextFirst?S.data.subjects.find(x=>x.id===nn.nextFirst.subjectId):null;
      return`<div class="tt-focus tt-focus-free">
        <div class="tt-focus-body">
          <div class="tt-focus-label">No classes today</div>
          <div class="tt-focus-title">Free day — good time to get ahead</div>
          <div class="tt-focus-sub">Next: ${nn.nextDayName}${sub?' starts with '+sub.name:''}</div>
        </div>
      </div>`;
    }

    return'';
  }

  function renderDayProgress(dateStr){
    const dp=dayProgress(dateStr);
    if(!dp.total)return'';
    const evs=getDayTT(tt,dateStr);
    const loggedCount=evs.filter(ev=>{
      const isPast=now>=new Date(ev.end);
      return isPast&&S.data.sessions.some(s=>s.subject===ev.subjectId&&s.date===dateStr);
    }).length;
    const allDone=dp.done===dp.total;
    return`<div class="tt-day-prog">
      <div class="tt-day-prog-bar"><div class="tt-day-prog-fill${allDone?' done':''}" style="width:${dp.pct}%"></div></div>
      <span class="tt-day-prog-text">${dp.done}/${dp.total} done${loggedCount?` · ${loggedCount} logged`:''}</span>
    </div>`;
  }

  function renderDayProgressBar(dateStr){
    const evs=getDayTT(tt,dateStr);
    if(!evs.length)return'';
    const isT=dateStr===today();
    if(!isT)return'';
    const first=new Date(evs[0].start),last=new Date(evs[evs.length-1].end);
    const totalSpan=last-first;
    if(totalSpan<=0)return'';
    const elapsed=Math.max(0,now-first);
    const pct=Math.min(100,Math.max(0,(elapsed/totalSpan)*100));
    const allDone=now>=last;
    return`<div class="day-progress-bar" id="day-prog-bar" data-day-start="${evs[0].start}" data-day-end="${evs[evs.length-1].end}">
      <div class="day-progress-bar-fill${allDone?' done':''}" style="height:${pct}%"></div>
    </div>`;
  }

  function renderDayProgressLabel(dateStr){
    const evs=getDayTT(tt,dateStr);
    if(!evs.length)return'';
    const isT=dateStr===today();
    if(!isT)return'';
    const first=new Date(evs[0].start),last=new Date(evs[evs.length-1].end);
    const totalSpan=last-first;
    if(totalSpan<=0)return'';
    const elapsed=Math.max(0,now-first);
    const pct=Math.min(100,Math.max(0,Math.round((elapsed/totalSpan)*100)));
    const allDone=now>=last;
    return`<div class="day-progress-label">
      <span class="day-progress-pct${allDone?' done':''}" id="day-prog-pct">${allDone?'Complete':pct+'% through'}</span>
      <span class="day-progress-time-range">${fmtTime(first)} – ${fmtTime(last)}</span>
    </div>`;
  }

  function renderDay(dateStr){
    const evs=getDayTT(tt,dateStr);
    const isToday=dateStr===today();
    const dayName=isToday?'Today':dateStr===addDays(today(),1)?'Tomorrow':new Date(dateStr+'T12:00:00').toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'short'});
    const totalHrs=evs.reduce((a,e)=>a+(new Date(e.end)-new Date(e.start))/60000,0)/60;
    const dayOfWeek=new Date(dateStr+'T12:00:00').getDay();
    const isMon=dayOfWeek===1&&!isToday;
    const hasProgressBar=isToday&&evs.length>0;

    return`<div class="tt-day${isToday?' tt-day-today':''}">
      <div class="tt-day-hd">
        <span${isToday?' class="today-mark"':''}>${isMon?'Fresh week · ':''}${dayName}</span>
        <span>${totalHrs.toFixed(1).replace('.0','')}h · ${evs.length} class${evs.length!==1?'es':''}</span>
      </div>
      ${renderDayProgressLabel(dateStr)}
      ${hasProgressBar?'<div class="day-progress-wrapper">'+renderDayProgressBar(dateStr)+'<div class="day-progress-content">':''}
      ${renderDayProgress(dateStr)}
      ${evs.length===0?`<div class="tt-empty">No classes${isWeekend(dateStr)?' — enjoy your weekend':' scheduled'}.</div>`:`
      <div class="tt-list">${evs.map((ev,idx)=>{
        const s=new Date(ev.start),e=new Date(ev.end);
        const isCur=now>=s&&now<e,isPast=now>=e;
        const sub=S.data.subjects.find(x=>x.id===ev.subjectId);
        const c=getSubjColor(sub||{color:0});
        const pct=isCur?Math.min(100,((now-s)/(e-s))*100):0;
        const alreadyLogged=S.data.sessions.some(sess=>sess.subject===ev.subjectId&&sess.date===dateStr);
        const durMins=Math.round((e-s)/60000);
        const isNextUp=!isPast&&!isCur&&idx>0&&now>=new Date(evs[idx-1]?.end);

        return`<div class="tt-item${isCur?' now':isPast&&alreadyLogged?' past logged':isPast?' past':''}${isNextUp?' next-up':''}">
          <div class="tt-item-accent" style="background:${c.tx}"></div>
          <div class="tt-item-abb" style="background:${c.bg};color:${c.tx};border-color:${c.bd}">${sub?.abbr||ev.period||'—'}</div>
          <div class="tt-info">
            <div class="tt-name">${sub?.name||ev.subjectName}</div>
            <div class="tt-meta">${ev.room}${ev.teacher?' · '+ev.teacher:''}${!isCur&&!isPast?` · ${durMins}m`:''}</div>
          </div>
          <div class="tt-right">
            <div class="tt-times">${fmtTime(s)}<span class="tt-time-sep">–</span>${fmtTime(e)}</div>
            ${isCur&&!alreadyLogged?`<div class="tt-log tt-log-now" data-action="quick-log" data-subject="${ev.subjectId}" style="background:${c.tx}">Log</div>`:''}
            ${isPast&&!alreadyLogged?`<div class="tt-log" data-action="quick-log" data-subject="${ev.subjectId}">Log</div>`:''}
            ${alreadyLogged?`<div class="tt-logged-badge" style="background:${c.bg};color:${c.tx}">✓</div>`:''}
          </div>
          ${isCur?`<div class="tt-progress"><div class="tt-progress-fill" data-period-prog data-start="${ev.start}" data-end="${ev.end}" style="width:${pct}%;background:${c.tx}"></div></div>`:''}
        </div>`;
      }).join('')}</div>`}
      ${hasProgressBar?'</div></div>':''}
    </div>`;
  }

  function renderMotto(){
    const h=now.getHours();
    const dp=dayProgress(today());
    if(dp.total===0)return'';
    if(dp.done===dp.total)return`<div class="tt-motto">You showed up today. That matters.</div>`;
    if(h<10)return`<div class="tt-motto">Small steps compound. Just start.</div>`;
    if(dp.pct>=50)return`<div class="tt-motto">Past halfway — keep the momentum.</div>`;
    return'';
  }

  // Today stats summary for timetable
  function renderTodayStats(){
    const sessions=S.data.sessions||[];
    const tMins=dayMins(sessions,today());
    const dp=dayProgress(today());
    if(!dp.total&&!tMins)return'';
    const sessCount=todaySess(sessions).length;
    return`<div class="tt-stats">
      <div class="tt-stat"><span class="tt-stat-v">${tMins?fmtDur(tMins):'—'}</span><span class="tt-stat-l">studied</span></div>
      <div class="tt-stat"><span class="tt-stat-v">${sessCount}</span><span class="tt-stat-l">session${sessCount!==1?'s':''}</span></div>
      <div class="tt-stat"><span class="tt-stat-v">${dp.done}/${dp.total}</span><span class="tt-stat-l">classes done</span></div>
    </div>`;
  }

  return`<div class="pg-title">Timetable</div>
  <div class="tt-tabs">${tabs.map((t,i)=>`<div class="tt-tab${S.ttTab===i?' on':''}" data-action="tt-tab" data-tab="${i}"><span class="tt-tab-ic">${t.icon}</span>${t.label}</div>`).join('')}</div>
  ${S.ttTab===0?renderFocusCard():''}
  ${S.ttTab===0?renderTodayStats():''}
  ${daysToShow.map(renderDay).join('')}
  ${S.ttTab===0?renderMotto():''}
  <label class="tt-reimport" for="ics-file-input">↻ Re-import timetable</label>`;
}

/* ════════════════════════════════
   HISTORY
════════════════════════════════ */
function renderHistory(){
  const{sessions,subjects}=S.data;
  const real=sessions.filter(s=>s.subject!=='grace');

  // Filter chips data
  const subjNames=[...new Set(real.map(s=>{const sub=subjects.find(x=>x.id===s.subject);return sub?sub.name:null;}).filter(Boolean))].sort();
  const subjMap={};subjects.forEach(s=>{subjMap[s.name]=s.id;});

  // Apply filters
  const filtered=real.filter(s=>{
    if(S.histSubFilter!=='All'){const sid=subjMap[S.histSubFilter];if(sid&&s.subject!==sid)return false;if(!sid)return false;}
    if(S.histConfFilter!=='All'&&s.confidence!==parseInt(S.histConfFilter))return false;
    return true;
  });

  // Heatmap uses filtered data
  const cells=[];
  for(let i=111;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const ds=localDate(d);
    const dayS=filtered.filter(s=>s.date===ds);const mins=dayS.reduce((a,s)=>a+s.duration,0);
    cells.push({date:ds,mins,isT:ds===today()});
  }
  const byDate={};
  filtered.forEach(s=>{if(!byDate[s.date])byDate[s.date]=[];byDate[s.date].push(s);});
  const sorted=Object.keys(byDate).sort((a,b)=>b.localeCompare(a));
  const totalHrs=Math.round(filtered.reduce((a,s)=>a+s.duration,0)/60*10)/10;
  const activeDays=new Set(real.map(s=>s.date)).size;
  const isFiltered=S.histSubFilter!=='All'||S.histConfFilter!=='All';
  const CONF_LABELS=['😰','🤔','😐','👍','💪'];
  return`
  <div class="pg-title">History</div>
  <div class="stat3 mb16">
    <div class="stile"><div class="stile-l">Streak</div><div class="stile-v">${getStreak(sessions)}</div><div class="stile-s">days</div></div>
    <div class="stile"><div class="stile-l">Best</div><div class="stile-v">${getBest(sessions)}</div><div class="stile-s">days</div></div>
    <div class="stile"><div class="stile-l">Active</div><div class="stile-v">${activeDays}</div><div class="stile-s">days</div></div>
  </div>
  <div class="papers-filter-section mb12">
    <div class="pf-group">
      <div class="pf-label">Subject</div>
      <div class="pf-chips pf-chips-scroll">
        ${chipFilter('All','All','hist-filter-sub',S.histSubFilter,null)}
        ${subjNames.map(n=>chipFilter(n,n,'hist-filter-sub',S.histSubFilter,real.filter(s=>s.subject===subjMap[n]).length)).join('')}
      </div>
    </div>
    <div class="pf-group">
      <div class="pf-label">Confidence</div>
      <div class="pf-chips">
        ${chipFilter('All','All','hist-filter-conf',S.histConfFilter,null)}
        ${[1,2,3,4,5].map(c=>chipFilter(CONF_LABELS[c-1]+' '+c,''+c,'hist-filter-conf',S.histConfFilter,real.filter(s=>s.confidence===c).length)).join('')}
      </div>
    </div>
  </div>
  <div class="card mb16" style="padding:16px 18px;">
    <div class="sec mb8"><span class="sec-lbl">Activity · 16 weeks${isFiltered?' (filtered)':''}</span><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--tx3);">${totalHrs}h${isFiltered?' filtered':' total'}</span></div>
    <div class="hmap">
      <div class="hmap-labels">
        <div class="hmap-inner">
          <div class="hmap-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
          <div class="hmap-grid">${cells.map(c=>{let cl='h0';if(c.mins>=10&&c.mins<30)cl='h1';else if(c.mins>=30&&c.mins<60)cl='h2';else if(c.mins>=60&&c.mins<120)cl='h3';else if(c.mins>=120)cl='h4';return`<div class="hc ${cl}${c.isT?' htoday':''}" title="${fmtShort(c.date)}: ${c.mins>0?fmtDur(c.mins):'—'}"></div>`;}).join('')}</div>
        </div>
      </div>
      <div class="hleg"><span>Less</span>${['h0','h1','h2','h3','h4'].map(c=>`<div class="hlc ${c}"></div>`).join('')}<span>More</span></div>
    </div>
  </div>
  <div class="sec mb12"><span class="sec-lbl">${isFiltered?'Filtered sessions':'All sessions'}</span><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--tx3);">${filtered.length} total</span></div>
  ${sorted.length===0?`<div class="empty"><div class="empty-e">◎</div><div class="empty-t">${isFiltered?'No matching sessions':'No sessions yet'}</div><div class="empty-s">${isFiltered?'Try adjusting your filters.':'Your study history will appear here once you start logging.'}</div></div>`:
  sorted.map(date=>{
    const ds=byDate[date].sort((a,b)=>b.ts-a.ts);
    return`<div class="hist-group">
      <div class="hist-date"><span>${fmtDate(date)}</span><span>${fmtDur(ds.reduce((a,s)=>a+s.duration,0))}</span></div>
      <div class="sess-list">${ds.map(renderSessRow).join('')}</div>
    </div>`;
  }).join('')}`;
}

/* ════════════════════════════════
   STATS
════════════════════════════════ */
function filterByRange(sessions,range){
  if(range==='all')return sessions;
  const days={7:'7',30:'30',90:'90'}[range]||0;
  if(!days)return sessions;
  const cutoff=new Date();cutoff.setDate(cutoff.getDate()-parseInt(days));
  const cutStr=localDate(cutoff);
  return sessions.filter(s=>s.date>=cutStr);
}

function renderStats(){
  const{sessions:allSessions,subjects,year}=S.data;
  const sessions=filterByRange(allSessions,S.statsRange);
  const rangeLabel={7:'7 days',30:'30 days',90:'90 days',all:'All time'}[S.statsRange]||'All time';
  const wMins=weekMins(sessions);
  const tm=totalMins(sessions),th=Math.round(tm/60*10)/10;
  const ts=sessions.filter(s=>s.subject!=='grace').length;
  const avg=ts>0?Math.round(tm/ts):0;
  const dA=new Set(sessions.filter(s=>s.subject!=='grace').map(s=>s.date)).size;
  const avgHpd=dA>0?tm/60/dA:0;
  const dLeft=Math.max(0,daysUntil(getExamDate(year).date));
  const proj=Math.round((th+avgHpd*dLeft)*10)/10;
  const ss=subjects.map(sub=>{const f=sessions.filter(s=>s.subject===sub.id);return{...sub,mins:f.reduce((a,s)=>a+s.duration,0),ct:f.length};}).sort((a,b)=>b.mins-a.mins);
  const maxM=ss[0]?.mins||1;
  const last7=getLast7(),maxD=Math.max(...last7.map(d=>dayMins(sessions,d.date)),1);
  // Consistency: % of last 14 days with a session
  const consistDays=14;
  let consistCount=0;
  for(let i=0;i<consistDays;i++){const d=new Date();d.setDate(d.getDate()-i);const ds=localDate(d);if(sessions.some(s=>s.date===ds&&s.subject!=='grace'))consistCount++;}
  const consistPct=Math.round((consistCount/consistDays)*100);

  return`
  <div class="pg-title">Stats</div>
  <div class="stats-range-row">
    ${['7','30','90','all'].map(r=>
      `<div class="stats-range-chip${S.statsRange===r?' on':''}" data-action="sel-statsRange" data-val="${r}">${r==='all'?'All':r+'d'}</div>`
    ).join('')}
  </div>
  <div class="stat-hero">
    <div><div class="sbv">${th}h</div><div class="sbl">Total hours</div></div>
    <div><div class="sbv">${ts}</div><div class="sbl">Sessions</div></div>
    <div><div class="sbv">${consistPct}%</div><div class="sbl">Consistency</div></div>
    <div><div class="sbv">${avg}m</div><div class="sbl">Avg session</div></div>
  </div>
  ${S.statsRange==='all'?`<div class="proj-card mb16">
    <div class="proj-lbl">Exam projection</div>
    <div class="proj-v">~${proj} hours by ${getExamDate(year).name}</div>
    <div class="proj-s">At ${Math.round(avgHpd*10)/10}h/day avg · ${dA} active days · ${dLeft} days left</div>
  </div>`:''}
  <div class="card mb16" style="padding:16px 18px;">
    <div class="sec"><span class="sec-lbl">This week</span><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--tx3);">${fmtDur(wMins)} total</span></div>
    <div class="wk-chart">${last7.map(d=>{const m=dayMins(sessions,d.date);const isT=d.date===today();const pct=Math.max(m>0?6:0,Math.round((m/maxD)*100));return`<div class="wkbw"><div class="wkb${isT?' tod':''}" style="height:${pct}%" title="${fmtDur(m)}"></div><div class="wkd${isT?' tod':''}">${d.label}</div></div>`;}).join('')}</div>
  </div>
  <div class="card" style="padding:16px 18px;">
    <div class="sec"><span class="sec-lbl">By subject</span><span style="font-size:12px;color:var(--tx3);">${rangeLabel}</span></div>
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
      const confEmoji=avgAll>=4?'💪':avgAll>=3?'👍':avgAll>=2?'🤔':'😰';
      return`<div class="conf-trend-card">
        <div class="conf-trend-header">
          <div class="conf-subj-badge" style="background:${c.bg};border-color:${c.bd};color:${c.tx};">${sub.abbr}</div>
          <div class="conf-trend-info">
            <div class="conf-subject-name">${sub.name}</div>
            <div class="conf-subject-meta">${subSess.length} sessions · last ${fmtDate(subSess[subSess.length-1].date)}</div>
          </div>
          <div class="conf-trend-delta ${deltaClass}">${delta>0?'+':''}${deltaLabel}</div>
        </div>
        <div class="conf-trend-row">${bars}</div>
        <div class="conf-legend">
          <div class="conf-legend-item">
            <div class="conf-trend-val">${confEmoji} ${avgAll}</div>
            <div class="conf-trend-label">Average</div>
          </div>
          <div class="conf-legend-item">
            <div class="conf-trend-val">${avgRecent}</div>
            <div class="conf-trend-label">Recent 3</div>
          </div>
          <div class="conf-legend-item">
            <div class="conf-trend-val">${subSess.length}</div>
            <div class="conf-trend-label">Sessions</div>
          </div>
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
    // Competence trend summary
    const trends=getSubjectTrends(sessions,subjects);
    const trendHtml=trends.filter(t=>t.confDelta!==null).length?`
    <div class="psych-trends-card mb16">
      <div class="trends-title">2-week trends</div>
      <div class="trends-grid">${trends.filter(t=>t.confDelta!==null||t.minsDelta!==0).map(t=>{
        const confArrow=t.confDelta>0?'↑':t.confDelta<0?'↓':'→';
        const confCol=t.confDelta>0?'var(--ok)':t.confDelta<0?'var(--err)':'var(--tx3)';
        const minsArrow=t.minsDelta>0?'↑':t.minsDelta<0?'↓':'→';
        const minsCol=t.minsDelta>0?'var(--ok)':t.minsDelta<0?'var(--err)':'var(--tx3)';
        return`<div class="trend-row">
          <span class="trend-sub">${t.sub.abbr}</span>
          ${t.confDelta!==null?`<span class="trend-badge" style="color:${confCol};">${confArrow} ${Math.abs(t.confDelta)} conf</span>`:''}
          <span class="trend-badge" style="color:${minsCol};">${minsArrow} ${Math.abs(Math.round(t.minsDelta/60*10)/10)}h study</span>
        </div>`;
      }).join('')}</div>
    </div>`:'';

    const insightHtml=weak.length?`
    <div class="insight-card warn">
      <div class="insight-icon">⚠</div>
      <div class="insight-text">
        <div class="insight-title">Weak areas: ${weak.map(s=>s.name).join(', ')}</div>
        <div class="insight-body">${getEncouragement('lowConf')}</div>
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
    return trendHtml+insightHtml+goodHtml+(cards.length?cards.join(''):`<div class="empty"><div class="empty-e">📊</div><div class="empty-t">Rate your sessions</div><div class="empty-s">Tap an emoji when logging to track confidence trends.</div></div>`);
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
      const covColor=coverage>=80?'var(--ok)':coverage>=50?'var(--acc)':'var(--err)';
      return`<div class="topic-coverage-card">
        <div class="topic-sub-header">
          <div class="topic-sub-left">
            <div class="conf-subj-badge" style="background:${c.bg};border-color:${c.bd};color:${c.tx};">${sub.abbr}</div>
            <div>
              <div class="topic-sub-name">${sub.name}</div>
              <div class="topic-sub-meta">${studiedTopics.size} of ${topics.length} topics</div>
            </div>
          </div>
          <div class="topic-pct" style="color:${covColor};">${coverage}%</div>
        </div>
        <div class="topic-progress-track">
          <div class="topic-progress-fill" style="width:${coverage}%;background:${covColor};"></div>
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
    // Average line position
    const avgPctLine=maxMins>0?Math.round((avgWeekly/maxMins)*100):0;

    return`
    <div class="card mom-chart-card">
      <div class="mom-chart-header">
        <div class="sec-lbl">Weekly study — 8 weeks</div>
        ${trendPct!==null?`<div class="mom-trend-badge ${trendPct>=0?'up':'down'}">${trendPct>=0?'↑':'↓'} ${Math.abs(trendPct)}%</div>`:''}
      </div>
      <div class="momentum-chart-wrap">
        <div class="mom-avg-line" style="bottom:${avgPctLine}%;"><span class="mom-avg-tag">avg</span></div>
        <div class="momentum-chart">${bars}</div>
      </div>
      <div class="momentum-summary">
        <div class="mom-summary-item"><div class="mom-stat-v">${fmtDur(thisWeek.mins)||'—'}</div><div class="mom-stat-l">This week</div></div>
        <div class="mom-summary-item"><div class="mom-stat-v">${fmtDur(avgWeekly)||'—'}</div><div class="mom-stat-l">Weekly avg</div></div>
        <div class="mom-summary-item"><div class="mom-stat-v">${fmtDur(best.mins)||'—'}</div><div class="mom-stat-l">Best week</div></div>
      </div>
    </div>
    ${trendInsight}
    <div class="card mom-patterns-card">
      <div class="sec-lbl" style="margin-bottom:12px;">Patterns</div>
      <div class="mom-pattern-grid">
        <div class="mom-pattern">
          <div class="mom-pattern-icon">◷</div>
          <div class="mom-pattern-body">
            <div class="mom-pattern-v">${avgSessLen}m</div>
            <div class="mom-pattern-l">Avg session length</div>
          </div>
        </div>
        <div class="mom-pattern">
          <div class="mom-pattern-icon">↻</div>
          <div class="mom-pattern-body">
            <div class="mom-pattern-v">${Math.round(totalSessions/Math.max(1,weeks.filter(w=>w.mins>0).length)*10)/10}</div>
            <div class="mom-pattern-l">Sessions per week</div>
          </div>
        </div>
        <div class="mom-pattern">
          <div class="mom-pattern-icon">★</div>
          <div class="mom-pattern-body">
            <div class="mom-pattern-v">${(()=>{const top=subjects.map(s=>({s,m:subMinsAll(sessions,s.id)})).sort((a,b)=>b.m-a.m)[0];return top?.s.name||'—';})()}</div>
            <div class="mom-pattern-l">Most studied subject</div>
          </div>
        </div>
        <div class="mom-pattern${aboveAvg?' mom-pattern-good':''}">
          <div class="mom-pattern-icon">${aboveAvg?'↑':'↓'}</div>
          <div class="mom-pattern-body">
            <div class="mom-pattern-v">${aboveAvg?'Above':'Below'} avg</div>
            <div class="mom-pattern-l">This week's pace</div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderScoresTab(){
    const{tests=[],subjects,sessions}=S.data;
    const real=sessions.filter(s=>s.subject!=='grace');
    // Check if there are any subjects with enough data (tests OR 2+ sessions) for predictions
    const hasPredData=subjects.some(sub=>tests.some(t=>t.subject===sub.id)||real.filter(s=>s.subject===sub.id).length>=2);
    if(!hasPredData) return`
    <div class="empty">
      <div class="empty-e">📝</div>
      <div class="empty-t">No scores or study data yet</div>
      <div class="empty-s">Log a test score, or study a few sessions — Meridian will start predicting your next result.</div>
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

    // Prediction cards: subjects with tests + subjects with sessions but no tests (cold start)
    const subjectsWithData=subjects.filter(sub=>{
      const hasSess=sessions.filter(s=>s.subject===sub.id&&s.subject!=='grace').length>=2;
      const hasTest=tests.some(t=>t.subject===sub.id);
      return hasTest||hasSess;
    });
    const predCards=subjectsWithData.map(sub=>{
      const subTests=getSubjectTests(tests,sub.id);
      const nextT=upcoming.find(t=>t.subject===sub.id);
      const daysToNext=nextT?daysUntil(nextT.nextTestDate):30;
      const pred=predictNextScore(S.data,sub.id,daysToNext);
      const c=getSubjColor(sub);
      const avgPct=getSubjectScorePct(tests,sub.id);
      const subDiff=getSubjectDifficulty(sub);
      // Use difficulty-adjusted grade for display
      const grade=avgPct?getDifficultyGrade(avgPct,subDiff):{letter:'—',color:'var(--tx3)'};
      const diffCtx=avgPct?getDifficultyContext(avgPct,subDiff):null;
      const hardBadge=subDiff>=1.2?'Hard':subDiff>=1.08?'Challenging':null;

      // Mini bar chart of test history
      const bars=subTests.slice(-6).map(t=>{
        const pct=t.score/t.outOf*100;
        const g=getDifficultyGrade(pct,subDiff);
        const h=Math.max(4,Math.round((pct/100)*36));
        return`<div class="thm-bar" style="height:${h}px;background:${g.color};" title="${pct.toFixed(0)}% — ${t.name}"></div>`;
      }).join('');

      // Improvement tip — richer, difficulty-aware
      let tip='';
      if(pred&&!pred.coldStart){
        const gap=pred.point-(avgPct||50);
        if(pred.coverage<0.5){
          tip=`Cover more topics — you've studied ${Math.round(pred.coverage*100)}% of the ${sub.name} curriculum.`;
        } else if(pred.confFactor<0.97){
          tip=`Confidence is trending down in ${sub.name}. Try doing past papers or re-reading core concepts — could be a knowledge gap.`;
        } else if(pred.studyFactor<0.98){
          tip=`Study hours are below your average for ${sub.name} lately. Bump it up over the next ${pred.days||14} days.`;
        } else if(pred.confMomentum&&pred.confMomentum>0.3){
          tip=`Your confidence is accelerating in ${sub.name} — momentum is real. Keep the consistency.`;
        } else if(gap>3){
          tip=`On track to improve by ~${gap.toFixed(0)}%. Keep the current pace.`;
        } else if(subDiff>=1.2&&avgPct>=55){
          tip=`${Math.round(avgPct)}% in ${sub.name} is a genuinely strong result — this is one of the hardest subjects. Don't underestimate it.`;
        }
      } else if(pred?.coldStart){
        tip=`First prediction — log a test result to sharpen this estimate.`;
      }

      // Difficulty-adjusted pred description
      const predLabel=pred?.coldStart?'Estimated first result':'Predicted next score';
      const predSub=pred?.coldStart
        ?`Study-based estimate — no test history yet. Wide range is normal.`
        :`Based on ${subTests.length} test${subTests.length!==1?'s':''}, study pace, topic coverage &amp; consistency.`;

      return`<div class="scores-subject-block">
        <div class="scores-subject-hd">
          <div style="width:30px;height:30px;border-radius:7px;background:${c.bg};border:1px solid ${c.bd};display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:9px;color:${c.tx};font-weight:500;">${sub.abbr}</div>
          <div style="flex:1;">
            <div style="font-size:13.5px;font-weight:500;color:var(--tx);letter-spacing:-.01em;">${sub.name}${hardBadge?` <span style="font-size:9px;font-weight:600;padding:1px 5px;border-radius:4px;background:rgba(255,180,0,.15);color:#d4900a;vertical-align:middle;">${hardBadge}</span>`:''}</div>
            <div style="font-size:11px;color:var(--tx3);">${subTests.length?`${subTests.length} test${subTests.length!==1?'s':''} · avg `:'No tests yet · '}${avgPct!=null?`<span style="color:${grade.color};font-weight:500;">${avgPct.toFixed(0)}%${diffCtx?` <span style="font-weight:400;color:var(--tx3);">— ${diffCtx}</span>`:''}</span>`:'<span style="color:var(--tx3);">studying</span>'}</div>
          </div>
          <div class="test-history-mini">${bars}</div>
        </div>

        ${pred?`<div class="pred-card${pred.coldStart?' pred-card-cold':''}">
          <div class="pred-label">${predLabel}${nextT?' · '+daysToNext+'d away':''}</div>
          <div class="pred-range-row">
            <div class="pred-main">${pred.point}<span class="pred-pct">%</span></div>
            <div class="pred-range">${pred.lo}–${pred.hi}%</div>
          </div>
          <div class="pred-sub">${predSub}</div>
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
        `<div class="insight-card info"><div class="insight-icon">💡</div><div class="insight-text"><div class="insight-title">Log more data for predictions</div><div class="insight-body">Need at least 2 study sessions to generate an estimate for ${sub.name}.</div></div></div>`}

        ${subTests.slice().reverse().map(t=>{
          const pct=t.score/t.outOf*100;
          const g=getTestGrade(pct);
          const dg=getDifficultyGrade(pct,subDiff);
          const ctx=getDifficultyContext(pct,subDiff);
          return`<div class="test-card">
            <div class="test-score-circle" style="border-color:${dg.color};color:${dg.color};">
              <div class="test-score-pct">${pct.toFixed(0)}%</div>
              <div class="test-score-grade">${dg.letter}</div>
            </div>
            <div class="test-info">
              <div class="test-name">${t.name}</div>
              <div class="test-meta">${fmtDate(t.date)} · ${t.type}${ctx?` · <em style="font-style:normal;color:var(--acc);">${ctx}</em>`:''}</div>
            </div>
            <div class="test-raw">${t.score}/${t.outOf}</div>
            <div class="test-actions">
              <div class="edit-btn" data-action="edit-test" data-id="${t.id}" title="Edit">✎</div>
              <div class="del-btn" data-action="del-test" data-id="${t.id}" title="Delete">✕</div>
            </div>
          </div>`;
        }).join('')}

        ${tip?`<div class="improve-tip">💡 <strong>${pred?.coldStart?'Tip':'To improve'}:</strong> ${tip}</div>`:''}
      </div>`;
    }).join('');

    return`
    ${upcomingHtml}
    ${predCards}
    <button class="log-submit" data-action="open-log-test">＋ Log Test Score</button>`;
  }

  const content=[renderConfidenceTab,renderScoresTab,renderTopicsTab,renderMomentumTab][S.progTab]?.();
  const progTabs=[{label:'Confidence',icon:'◈'},{label:'Scores',icon:'◉'},{label:'Topics',icon:'▦'},{label:'Momentum',icon:'↗'}];

  // Quick summary stats
  const totalStudied=totalMins(sessions);
  const avgConf=real.filter(s=>s.confidence>0).length?Math.round(real.filter(s=>s.confidence>0).reduce((a,s)=>a+s.confidence,0)/real.filter(s=>s.confidence>0).length*10)/10:null;
  const topicsCovered=new Set(real.filter(s=>s.topic).map(s=>s.topic)).size;
  const testCount=(S.data.tests||[]).length;

  return`
  <div class="pg-title">Progress</div>
  <div class="prog-summary">
    <div class="prog-summary-stat">
      <div class="prog-summary-v">${fmtDur(totalStudied)}</div>
      <div class="prog-summary-l">total study</div>
    </div>
    <div class="prog-summary-stat">
      <div class="prog-summary-v">${avgConf||'—'}</div>
      <div class="prog-summary-l">avg confidence</div>
    </div>
    <div class="prog-summary-stat">
      <div class="prog-summary-v">${topicsCovered}</div>
      <div class="prog-summary-l">topics covered</div>
    </div>
    <div class="prog-summary-stat">
      <div class="prog-summary-v">${testCount}</div>
      <div class="prog-summary-l">test${testCount!==1?'s':''} logged</div>
    </div>
  </div>
  <div class="prog-tabs">${progTabs.map((t,i)=>`<div class="prog-tab${S.progTab===i?' on':''}" data-action="prog-tab" data-tab="${i}"><span class="prog-tab-icon">${t.icon}</span>${t.label}</div>`).join('')}</div>
  ${content}`;
}

/* ════════════════════════════════
   PAPERS LIBRARY
════════════════════════════════ */

// thsconline subject map — codes for HSC subjects
const THSC_SUBJECTS = [
  {code:'5330', label:'Maths Ext 1', unit:'Yr 11/12', color:3},
  {code:'5340', label:'Maths Ext 2', unit:'Yr 12', color:3},
  {code:'5320', label:'Maths Advanced', unit:'Yr 11/12', color:4},
  {code:'1370', label:'Biology', unit:'Yr 11/12', color:1},
  {code:'6520', label:'Physics', unit:'Yr 11/12', color:2},
  {code:'1480', label:'Chemistry', unit:'Yr 11/12', color:0},
  {code:'2670', label:'Engineering Studies', unit:'Yr 11/12', color:6},
  {code:'2250', label:'English Advanced', unit:'Yr 11/12', color:5},
  // Additional subjects from thsconline numbered JSONs
  {code:'1170', label:'Ancient History', unit:'Yr 11/12', color:7},
  {code:'1570', label:'Business Studies', unit:'Yr 11/12', color:6},
  {code:'2470', label:'Economics', unit:'Yr 11/12', color:2},
  {code:'5520', label:'Modern History', unit:'Yr 11/12', color:7},
  {code:'5020', label:'Legal Studies', unit:'Yr 11/12', color:3},
  {code:'2420', label:'Earth & Env Science', unit:'Yr 11/12', color:1},
  {code:'5310', label:'General Maths', unit:'Yr 11/12', color:4},
];

// Bored of Studies resource category IDs per subject
const BOS_CATEGORIES = {
  'Maths Ext 1':{slug:'mathematics-extension-1',id:489},
  'Maths Ext 2':{slug:'mathematics-extension-2',id:498},
  'Maths Advanced':{slug:'mathematics-advanced',id:481},
  'Biology':{slug:'biology',id:500},
  'Physics':{slug:'physics',id:507},
  'Chemistry':{slug:'chemistry',id:503},
  'Engineering Studies':{slug:'engineering-studies',id:540},
  'English Advanced':{slug:'english-advanced',id:462},
  'Ancient History':{slug:'ancient-history',id:510},
  'Modern History':{slug:'modern-history',id:516},
  'Business Studies':{slug:'business-studies',id:522},
  'Economics':{slug:'economics',id:525},
  'Legal Studies':{slug:'legal-studies',id:528},
  'PDHPE':{slug:'pdhpe',id:532},
  'Geography':{slug:'geography',id:535},
  'General Maths':{slug:'mathematics-standard',id:480},
  'Earth & Env Science':{slug:'earth-and-environmental-science',id:537},
};

function getBosEntries(){
  // Generate BoS category links for each subject + try scraping individual resources
  const entries=[];
  for(const[label,cat] of Object.entries(BOS_CATEGORIES)){
    const thsc=THSC_SUBJECTS.find(s=>s.label===label);
    const color=thsc?thsc.color:6;
    entries.push({
      id:`bos-cat-${cat.id}`,
      title:`${label} — Notes, Trials & Resources`,
      url:`https://boredofstudies.org/resources/categories/${cat.slug}.${cat.id}/`,
      subject:label,
      unit:thsc?.unit||'Yr 11/12',
      source:'boredofstudies',
      year:'',
      type:'Notes & Trials',
      hasSolutions:false,
      color,
      external:true,
    });
  }
  return entries;
}

async function loadAllBosData(){
  const fallback=getBosEntries();
  // Try scraping individual resources from each category page
  const scraped=[];
  const fetches=Object.entries(BOS_CATEGORIES).map(async([label,cat])=>{
    const thsc=THSC_SUBJECTS.find(s=>s.label===label);
    const color=thsc?thsc.color:6;
    try{
      const r=await fetch(`https://boredofstudies.org/resources/categories/${cat.slug}.${cat.id}/?page=1`);
      if(!r.ok)return;
      const html=await r.text();
      const parser=new DOMParser();
      const doc=parser.parseFromString(html,'text/html');
      const rows=doc.querySelectorAll('.dataList-row');
      rows.forEach(row=>{
        const a=row.querySelector('h3 a, .contentRow-title a');
        if(!a)return;
        const title=a.textContent.trim();
        const href=a.getAttribute('href');
        if(!title||!href||href.includes('/categories/'))return;
        const url='https://boredofstudies.org'+(href.startsWith('/')?href:'/'+href);
        const tl=title.toLowerCase();
        let type='Notes';
        if(tl.includes('trial'))type='Trial Paper';
        else if(tl.includes('past paper')||tl.includes('hsc paper'))type='HSC Paper';
        else if(tl.includes('solution')||tl.includes('marking'))type='Solutions';
        else if(tl.includes('assessment')||tl.includes('exam')||tl.includes('test')||tl.includes('skills test'))type='Assessment';
        scraped.push({
          id:'bos-'+cat.id+'-'+href,
          title,url,subject:label,
          unit:thsc?.unit||'Yr 11/12',
          source:'boredofstudies',year:'',type,
          hasSolutions:false,color,external:true,
        });
      });
    }catch(e){}
  });
  await Promise.all(fetches);
  // If scraping worked, return individual resources; otherwise return category links
  return scraped.length>0?scraped:fallback;
}

// HSCpapers.json course names to match subjects
const HSC_COURSE_MAP = {
  'Chemistry':'Chemistry',
  'Biology':'Biology',
  'Physics':'Physics',
  'Mathematics Advanced':'Maths Advanced',
  'Mathematics Extension 1':'Maths Ext 1',
  'Mathematics Extension 2':'Maths Ext 2',
  'English Advanced':'English Advanced',
  'English Standard':'English Standard',
  'Engineering Studies':'Engineering Studies',
  'Ancient History':'Ancient History',
  'Modern History':'Modern History',
  'Business Studies':'Business Studies',
  'Economics':'Economics',
  'Legal Studies':'Legal Studies',
  'Geography':'Geography',
  'PDHPE':'PDHPE',
  'Software Design and Development':'Software Design',
  'Information Processes and Technology':'IPT',
  'Earth and Environmental Science':'Earth & Env Science',
  'General Mathematics':'General Maths',
  'Society and Culture':'Society & Culture',
  'Studies of Religion I':'Studies of Religion',
  'Studies of Religion II':'Studies of Religion',
  'Visual Arts':'Visual Arts',
  'Agriculture':'Agriculture',
  'Senior Science':'Senior Science',
};

let papersCache = null; // {local, thsc, hsc}
let pdfViewerState = null; // {url, title}

async function loadPapersData(force=false){
  if(papersCache && !force) return papersCache;
  const result = {local:[], thsc:[], hsc:[]};

  // 1. Load local papers/index.json (optional — skip if folder doesn't exist)
  try {
    const r = await fetch(window.PAPERS_DIR + 'index.json', {cache:'no-cache'});
    if(r.ok){
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
        const kl = key.toLowerCase();
        let docType = 'HSC Paper';
        if(kl.includes('sample answer')) docType = 'Sample Answers';
        else if(kl.includes('solution')) docType = 'Solutions';
        else if(kl.includes('marking feedback') || kl.includes('marking feed')) docType = 'Marking Feedback';
        else if(kl.includes('marking')) docType = 'Marking Guidelines';
        const isSup = docType !== 'HSC Paper';
        entries.push({
          id: `thsc-${s.code}-${key}`,
          title: val.title || key,
          url: val.pdfData,
          subject: s.label,
          unit: s.unit,
          source: 'thsconline',
          year,
          type: docType,
          hasSolutions: isSup,
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
            const dl = doc.doc_name.toLowerCase();
            let hscType = 'HSC Paper';
            if(dl.includes('sample answer') || dl.includes('sample writing')) hscType = 'Sample Answers';
            else if(dl.includes('solution')) hscType = 'Solutions';
            else if(dl.includes('notes from')) hscType = 'Marking Feedback';
            else if(dl.includes('marking')) hscType = 'Marking Guidelines';
            const isSup2 = hscType !== 'HSC Paper';
            result.hsc.push({
              id: `hsc-${course.course_name}-${pack.year}-${doc.doc_name}`,
              title: `${course.course_name} ${pack.year} — ${doc.doc_name}`,
              url: doc.doc_link,
              subject: mappedName,
              unit: 'Yr 12',
              source: alreadyCovered ? 'thsconline' : 'HSC Official',
              year: pack.year,
              type: hscType,
              hasSolutions: isSup2,
              color: colorIdx,
            });
          }
        }
      }
    }
  } catch(e){}

  // 4. Load Bored of Studies resources (notes, trials, assessments)
  try{
    const bosEntries=await loadAllBosData();
    result.bos=bosEntries;
  }catch(e){result.bos=[];}

  papersCache = result;
  return result;
}

function chipFilter(label, val, action, currentVal, count){
  return`<div class="filter-chip${currentVal===val?' on':''}" data-action="${action}" data-val="${val}">${label}${count!=null?' <span class="fc-count">'+count+'</span>':''}</div>`;
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
    ...(data.bos||[]),
  ];

  // Filter
  let filtered = all.filter(p=>{
    if(S.papersSubFilter !== 'All' && p.subject !== S.papersSubFilter) return false;
    if(S.papersYrFilter !== 'All'){
      if(S.papersYrFilter === 'Yr 11' && p.unit && !p.unit.includes('11')) return false;
      if(S.papersYrFilter === 'Yr 12' && p.unit && !p.unit.includes('12')) return false;
    }
    if(S.papersSrcFilter !== 'All' && p.source !== S.papersSrcFilter) return false;
    if(S.papersTypeFilter !== 'All' && (p.type||'Paper') !== S.papersTypeFilter) return false;
    if(S.papersSearch){
      const q = S.papersSearch.toLowerCase();
      const haystack = (p.title+' '+(p.subject||'')+' '+(p.topics||[]).join(' ')+' '+(p.year||'')+' '+(p.type||'')).toLowerCase();
      if(!haystack.includes(q)) return false;
    }
    // Default: hide THSC supplementary docs (marking guides etc.) unless explicitly filtering or searching
    if(!S.papersSearch && S.papersTypeFilter==='All' && (p.source==='thsconline'||p.source==='HSC Official') && p.type && p.type!=='HSC Paper') return false;
    return true;
  });

  // Sort
  if(S.papersSort==='subject') filtered.sort((a,b)=>(a.subject||'').localeCompare(b.subject||''));
  else if(S.papersSort==='title') filtered.sort((a,b)=>a.title.localeCompare(b.title));
  else filtered.sort((a,b)=>(b.year||'0').localeCompare(a.year||'0')); // newest first

  // Unique values for chip filters
  const allSubjects = [...new Set(all.map(p=>p.subject).filter(Boolean))].sort();
  const allTypes = [...new Set(all.map(p=>p.type||'Paper').filter(Boolean))].sort();

  // Count papers per year level
  const yr11Count = all.filter(p=>p.unit&&p.unit.includes('11')).length;
  const yr12Count = all.filter(p=>p.unit&&p.unit.includes('12')).length;

  const cards = filtered.map(p=>{
    const c = p.color!==undefined ? getSubjColor({color:p.color}) : {bg:'var(--srf2)',tx:'var(--tx3)',bd:'var(--bd)'};
    const srcBadge = p.source==='mine'
      ? `<div class="paper-src-badge badge-mine">Mine</div>`
      : p.source==='boredofstudies'
      ? `<div class="paper-src-badge badge-bos">BoS</div>`
      : p.source==='thsconline'
      ? `<div class="paper-src-badge badge-thsc">thsc</div>`
      : `<div class="paper-src-badge badge-hsc">HSC</div>`;
    const solDot = p.hasSolutions ? `<div class="paper-sol-dot" title="Solutions available"></div>` : '';
    const topicTags = (p.topics||[]).slice(0,4).map(t=>`<span class="paper-topic-tag">${t}</span>`).join('');

    return`<div class="paper-card" data-action="${p.external?'open-paper-ext':'open-paper'}" data-url="${p.url}" data-title="${p.title.replace(/"/g,'&quot;')}" data-id="${p.id}">
      <div class="paper-thumb" id="thumb-${p.id}">
        ${p.source==='mine'
          ? `<canvas id="canvas-${p.id}" data-pdf-url="${p.url}"></canvas>`
          : `<div class="paper-thumb-placeholder">
              <div class="ptp-subject" style="background:${c.bg};color:${c.tx};border:1px solid ${c.bd};">${p.subject||'HSC'}</div>
              <div class="ptp-year">${p.year||''}</div>
              <div class="ptp-type">${p.type||'Paper'}</div>
              <div class="ptp-icon">${p.external?'↗':'📄'}</div>
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
          ${p.type&&p.type!=='HSC Paper'?`<span class="pm-tag" style="background:var(--srf2);color:var(--tx3);border-color:var(--bd);">${p.type}</span>`:''}
        </div>
        ${topicTags?`<div class="paper-topics">${topicTags}</div>`:''}
      </div>
    </div>`;
  }).join('');

  // Active filter count for clear button
  const activeFilters = [S.papersSubFilter!=='All',S.papersYrFilter!=='All',S.papersTypeFilter!=='All',S.papersSrcFilter!=='All',!!S.papersSearch].filter(Boolean).length;

  return`
  <div class="pg-title">Papers</div>
  <div class="papers-bar">
    <div class="papers-search">
      <span class="papers-search-icon">🔍</span>
      <input id="papers-search-inp" type="search" placeholder="Search by name, subject, year, type…" value="${S.papersSearch}" data-action="papers-search">
    </div>
  </div>

  <div class="papers-filter-section">
    <div class="pf-group">
      <div class="pf-label">Year level</div>
      <div class="pf-chips">
        ${chipFilter('All','All','papers-filter-yr',S.papersYrFilter,null)}
        ${chipFilter('Yr 11','Yr 11','papers-filter-yr',S.papersYrFilter,yr11Count)}
        ${chipFilter('Yr 12','Yr 12','papers-filter-yr',S.papersYrFilter,yr12Count)}
      </div>
    </div>
    <div class="pf-group">
      <div class="pf-label">Subject</div>
      <div class="pf-chips pf-chips-scroll">
        ${chipFilter('All','All','papers-filter-sub',S.papersSubFilter,null)}
        ${allSubjects.map(s=>chipFilter(s,s,'papers-filter-sub',S.papersSubFilter,all.filter(p=>p.subject===s).length)).join('')}
      </div>
    </div>
    <div class="pf-group">
      <div class="pf-label">Type</div>
      <div class="pf-chips">
        ${chipFilter('All','All','papers-filter-type',S.papersTypeFilter,null)}
        ${allTypes.map(t=>chipFilter(t,t,'papers-filter-type',S.papersTypeFilter,all.filter(p=>(p.type||'Paper')===t).length)).join('')}
      </div>
    </div>
    <div class="pf-group">
      <div class="pf-label">Source</div>
      <div class="pf-chips">
        ${chipFilter('All','All','papers-filter-src',S.papersSrcFilter,null)}
        ${chipFilter('My Papers','mine','papers-filter-src',S.papersSrcFilter,all.filter(p=>p.source==='mine').length)}
        ${chipFilter('thsconline','thsconline','papers-filter-src',S.papersSrcFilter,all.filter(p=>p.source==='thsconline').length)}
        ${chipFilter('HSC Official','HSC Official','papers-filter-src',S.papersSrcFilter,all.filter(p=>p.source==='HSC Official').length)}
        ${chipFilter('BoredOfStudies','boredofstudies','papers-filter-src',S.papersSrcFilter,all.filter(p=>p.source==='boredofstudies').length)}
      </div>
    </div>
  </div>

  <div class="papers-sort-row">
    <span class="papers-count">${filtered.length} paper${filtered.length!==1?'s':''}${activeFilters?` <span class="papers-clear-filters" data-action="papers-clear-filters">Clear filters</span>`:''}</span>
    <div class="sort-chips">
      ${['date','subject','title'].map(s=>`<div class="filter-chip${S.papersSort===s?' on':''}" data-action="papers-sort-chip" data-val="${s}">${s==='date'?'Newest':s==='subject'?'Subject':'Title'}</div>`).join('')}
    </div>
  </div>
  ${filtered.length===0
    ? `<div class="empty"><div class="empty-e">📄</div><div class="empty-t">No papers match</div><div class="empty-s">Try clearing some filters or searching differently.</div></div>`
    : `<div class="papers-grid">${cards}</div>`
  }
  <div style="height:16px;"></div>`;
}

// Render PDF thumbnails via PDF.js after the view is painted
async function renderPaperThumbs(){
  if(!window.pdfjsReady || !window.pdfjsLib) return;
  const canvases = document.querySelectorAll('canvas[data-pdf-url]');
  for(const canvas of canvases){
    if(canvas.dataset.rendered) continue;
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
  }
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
   TIMER FOCUS MODE
════════════════════════════════ */
function renderTimerFocus(){
  const rem=Math.max(0,timerTarget-timerElap),m=Math.floor(rem/60),s=rem%60;
  const pct=Math.min(100,(timerElap/timerTarget)*100);
  const timerFontMap={default:"'Cormorant',serif",mono:"'DM Mono',monospace",space:"'Space Mono',monospace",playfair:"'Playfair Display',serif",outfit:"'Outfit',sans-serif",jetbrains:"'JetBrains Mono',monospace"};
  const tFont=timerFontMap[S.timerFont]||timerFontMap.default;
  const R=88,CIRC=2*Math.PI*R;
  const offset=CIRC-(pct/100)*CIRC;
  const themed=S.timerBg&&S.timerBg!=='none';
  const focusLabels=['Ready','Focus time','In the zone','Deep focus','Unstoppable'];
  const focusIdx=timerRunning?Math.min(4,Math.floor(timerElap/600)):0;
  const statusLabel=timerRunning?focusLabels[focusIdx]:timerElap>0?'Paused':'Ready';
  const dotAngle=((pct/100)*360-90)*Math.PI/180;
  const dotX=110+R*Math.cos(dotAngle),dotY=110+R*Math.sin(dotAngle);

  // Colors — always use themed style in focus mode (white on dark bg or themed bg)
  const useThemed=themed;
  const trackCol=useThemed?'rgba(255,255,255,.12)':'var(--srf2)';
  const tickOff=useThemed?'rgba(255,255,255,.08)':'var(--bd)';
  const tickOn=useThemed?(timerRunning?'rgba(255,255,255,.7)':'rgba(255,255,255,.35)'):(timerRunning?'var(--acc)':'var(--bdS)');
  const tickMajorOff=useThemed?'rgba(255,255,255,.15)':'.4';
  const thTicks=Array.from({length:60},(_,i)=>{
    const angle=(i/60)*360-90,rad=angle*Math.PI/180,isMajor=i%5===0;
    const outerR=97,innerR=isMajor?91:93;
    const x1=110+outerR*Math.cos(rad),y1=110+outerR*Math.sin(rad);
    const x2=110+innerR*Math.cos(rad),y2=110+innerR*Math.sin(rad);
    const filled=pct>0&&(i/60)*100<=pct;
    return`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${filled?tickOn:tickOff}" stroke-width="${isMajor?'1.5':'0.8'}" stroke-linecap="round" opacity="${filled?'1':isMajor?tickMajorOff:'.2'}"/>`;
  }).join('');

  // Pomodoro dots
  const pomoDots=Array.from({length:4},(_,i)=>`<div class="pomo-dot${i<(S.pomodoroCount||0)%4?' done':''}"></div>`).join('');
  const pomoCount=S.pomodoroCount||0;

  // Duration presets for when not running
  const presets=[15,20,25,30,45,60,90];

  return`<div class="tf-wrap${useThemed?' tf-themed':''}">
    ${useThemed?`<div class="tf-bg">${renderTimerBg(S.timerBg)}</div>`:''}
    <div class="tf-exit" data-action="timer-exit-focus" title="Exit fullscreen (Esc / F)">✕</div>
    <div class="tf-body">
      <div class="tf-ring-wrap">
        <svg class="timer-ring-svg" width="280" height="280" viewBox="0 0 220 220">
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${useThemed?'rgba(255,255,255,.9)':'var(--acc)'}"/>
              <stop offset="100%" stop-color="${useThemed?(pct>50?'rgba(180,230,180,.9)':'rgba(255,200,150,.9)'):(pct>50?'var(--ok)':'var(--accD)')}"/>
            </linearGradient>
            <filter id="ring-glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          ${thTicks}
          <circle cx="110" cy="110" r="${R}" fill="none" stroke="${trackCol}" stroke-width="4.5" opacity=".5"/>
          <circle cx="110" cy="110" r="${R}" fill="none" stroke="${timerRunning?'url(#ring-grad)':(useThemed?'rgba(255,255,255,.25)':'var(--bdS)')}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}" id="tt-ring" style="transition:stroke-dashoffset .5s linear,stroke .3s;transform:rotate(-90deg);transform-origin:center;"${timerRunning?' filter="url(#ring-glow)"':''}/>
          ${(timerRunning||timerElap>0)&&pct>0?`<circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="${timerRunning?'5':'3.5'}" fill="${timerRunning?(useThemed?'#fff':'var(--acc)'):(useThemed?'rgba(255,255,255,.4)':'var(--bdS)')}" id="tt-dot" class="${timerRunning?'tt-dot-pulse':''}" style="transition:cx .5s linear,cy .5s linear,r .2s ease;"/>
          ${timerRunning?`<circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="10" fill="${useThemed?'rgba(255,255,255,.12)':'var(--acc)'}" opacity=".15" id="tt-dot-glow" style="transition:cx .5s linear,cy .5s linear;"/>`:''}`:''
          }
        </svg>
        <div class="timer-ring-center">
          <div class="timer-num tf-num${timerRunning?' run':''}" id="tt-time" style="font-family:${tFont};">${String(m).padStart(2,'0')}<span class="timer-colon" id="tt-colon">:</span>${String(s).padStart(2,'0')}</div>
          <div class="timer-status tf-status" id="tt-lbl">${statusLabel}</div>
          ${timerElap>0?`<div class="timer-pct tf-pct" id="tt-pct">${Math.round(pct)}%</div>`:''}
        </div>
      </div>
      <div class="tf-controls">
        ${timerRunning
          ?`<button class="tf-btn tf-btn-pause" data-action="timer-pause"><span class="timer-btn-icon">❚❚</span>Pause</button>`
          :`<button class="tf-btn tf-btn-start" data-action="timer-start"><span class="timer-btn-icon">▶</span>${timerElap>0?'Resume':'Start'}</button>`}
        <button class="tf-btn tf-btn-reset" data-action="timer-reset"><span class="timer-btn-icon">↺</span>Reset</button>
      </div>
      ${timerElap>0&&!timerRunning?`<button class="tf-log-cta" data-action="open-log">Log ${fmtDur(Math.ceil(timerElap/60))} session →</button>`:''}
      ${!timerRunning&&timerElap===0?`<div class="tf-presets">${presets.map(t=>{
        const active=timerTarget===t*60;
        return`<div class="tf-preset${active?' on':''}" data-action="set-timer" data-dur="${t}">${t}m</div>`;
      }).join('')}</div>`:''}
      ${pomoCount>0?`<div class="tf-pomo"><div class="pomo-dots">${pomoDots}</div><span class="tf-pomo-count">${pomoCount} pomodoro${pomoCount!==1?'s':''}</span></div>`:''}
    </div>
  </div>`;
}

/* ════════════════════════════════
   TIMER VIEW
════════════════════════════════ */
function renderTimer(){
  const pomoDots=Array.from({length:4},(_,i)=>`<div class="pomo-dot${i<(S.pomodoroCount||0)%4?' done':''}${i<(S.pomodoroCount||0)%4&&i===(S.pomodoroCount||0)%4-1?' latest':''}"></div>`).join('');
  const pomoCount=S.pomodoroCount||0;

  if(S.pomodoroBreak){
    const brem=Math.max(0,breakTarget-breakElap),bm=Math.floor(brem/60),bs=brem%60;
    const isLong=pomoCount%4===0;
    const bPct=Math.min(100,(breakElap/breakTarget)*100);
    return`
    <div class="pg-title">Timer</div>
    <div class="card timer-break-card">
      <div class="pomo-break">
        <div class="pomo-break-icon">${isLong?'🧘':'☕'}</div>
        <div class="pomo-break-title">${isLong?'Long break — you earned it':'Take a break'}</div>
        <div class="pomo-break-sub">${isLong?'Stand up, stretch, grab water. Your brain consolidates learning during rest.':'Step away from the screen. Look at something 20 feet away for 20 seconds.'}</div>
        <div class="pomo-break-timer" id="break-timer">${String(bm).padStart(2,'0')}:${String(bs).padStart(2,'0')}</div>
        <div class="break-progress"><div class="break-progress-fill" style="width:${bPct}%;"></div></div>
        <div class="pomo-tracker">
          <div class="pomo-dots">${pomoDots}</div>
          <span class="pomo-count">${pomoCount} pomodoro${pomoCount!==1?'s':''}</span>
        </div>
        <div class="tbtns">
          <button class="tbtn tbtn-log" data-action="open-log">Log session →</button>
          <button class="tbtn tbtn-s" data-action="skip-break">Skip break</button>
        </div>
      </div>
    </div>`;
  }

  const rem=Math.max(0,timerTarget-timerElap),m=Math.floor(rem/60),s=rem%60;
  const pct=Math.min(100,(timerElap/timerTarget)*100);
  const timerFontMap={default:"'Cormorant',serif",mono:"'DM Mono',monospace",space:"'Space Mono',monospace",playfair:"'Playfair Display',serif",outfit:"'Outfit',sans-serif",jetbrains:"'JetBrains Mono',monospace"};
  const tFont=timerFontMap[S.timerFont]||timerFontMap.default;
  const R=88,CIRC=2*Math.PI*R;
  const offset=CIRC-(pct/100)*CIRC;
  const presets=[15,20,25,30,45,60,90];
  const presetLabels={15:'Quick',25:'Pomodoro',45:'Deep',60:'Marathon',90:'Ultra'};

  // Progress dot at tip of ring
  const dotAngle=((pct/100)*360-90)*Math.PI/180;
  const dotX=110+R*Math.cos(dotAngle),dotY=110+R*Math.sin(dotAngle);

  // Today's timer sessions
  const td=today();
  const todaySess=(S.data?.sessions||[]).filter(s=>s.date===td&&s.subject!=='grace');
  const todayMins=todaySess.reduce((a,s)=>a+s.duration,0);

  // Motivational label based on elapsed
  const focusLabels=['Ready','Focus time','In the zone','Deep focus','Unstoppable'];
  const focusIdx=timerRunning?Math.min(4,Math.floor(timerElap/600)):0;
  const statusLabel=timerRunning?focusLabels[focusIdx]:timerElap>0?'Paused':'Ready';

  const themed=S.timerBg&&S.timerBg!=='none';
  const trackCol=themed?'rgba(255,255,255,.12)':'var(--srf2)';
  const tickOff=themed?'rgba(255,255,255,.08)':'var(--bd)';
  const tickOn=themed?(timerRunning?'rgba(255,255,255,.7)':'rgba(255,255,255,.35)'):(timerRunning?'var(--acc)':'var(--bdS)');
  const tickMajorOff=themed?'rgba(255,255,255,.15)':'.4';
  // Rebuild ticks with theme-aware colors
  const thTicks=Array.from({length:60},(_,i)=>{
    const angle=(i/60)*360-90,rad=angle*Math.PI/180,isMajor=i%5===0;
    const outerR=97,innerR=isMajor?91:93;
    const x1=110+outerR*Math.cos(rad),y1=110+outerR*Math.sin(rad);
    const x2=110+innerR*Math.cos(rad),y2=110+innerR*Math.sin(rad);
    const filled=pct>0&&(i/60)*100<=pct;
    return`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${filled?tickOn:tickOff}" stroke-width="${isMajor?'1.5':'0.8'}" stroke-linecap="round" opacity="${filled?'1':isMajor?tickMajorOff:'.2'}"/>`;
  }).join('');

  return`
  <div class="pg-title">Timer<button class="tf-toggle" data-action="timer-enter-focus" title="Fullscreen timer (F)">⛶ Fullscreen</button></div>
  <div class="card timer-card${timerRunning?' timer-active':''}${timerElap>0&&!timerRunning?' timer-paused':''}${themed?' timer-themed':''}">
    <div class="timer-bg">${themed?renderTimerBg(S.timerBg):''}</div>
    <div class="timer-face">
      <div class="timer-ring-wrap">
        <svg class="timer-ring-svg" width="220" height="220" viewBox="0 0 220 220">
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${themed?'rgba(255,255,255,.9)':'var(--acc)'}"/>
              <stop offset="100%" stop-color="${themed?(pct>50?'rgba(180,230,180,.9)':'rgba(255,200,150,.9)'):(pct>50?'var(--ok)':'var(--accD)')}"/>
            </linearGradient>
            <filter id="ring-glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          ${thTicks}
          <circle cx="110" cy="110" r="${R}" fill="none" stroke="${trackCol}" stroke-width="4.5" opacity=".5"/>
          <circle cx="110" cy="110" r="${R}" fill="none" stroke="${timerRunning?'url(#ring-grad)':(themed?'rgba(255,255,255,.25)':'var(--bdS)')}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}" id="tt-ring" style="transition:stroke-dashoffset .5s linear,stroke .3s;transform:rotate(-90deg);transform-origin:center;"${timerRunning?' filter="url(#ring-glow)"':''}/>
          ${(timerRunning||timerElap>0)&&pct>0?`<circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="${timerRunning?'5':'3.5'}" fill="${timerRunning?(themed?'#fff':'var(--acc)'):(themed?'rgba(255,255,255,.4)':'var(--bdS)')}" id="tt-dot" class="${timerRunning?'tt-dot-pulse':''}" style="transition:cx .5s linear,cy .5s linear,r .2s ease;"/>
          ${timerRunning?`<circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="10" fill="${themed?'rgba(255,255,255,.12)':'var(--acc)'}" opacity=".15" id="tt-dot-glow" style="transition:cx .5s linear,cy .5s linear;"/>`:''}`:''
          }
        </svg>
        <div class="timer-ring-center">
          <div class="timer-num${timerRunning?' run':''}" id="tt-time" style="font-family:${tFont};">${String(m).padStart(2,'0')}<span class="timer-colon" id="tt-colon">:</span>${String(s).padStart(2,'0')}</div>
          <div class="timer-status" id="tt-lbl">${statusLabel}</div>
          ${timerElap>0?`<div class="timer-pct" id="tt-pct">${Math.round(pct)}%</div>`:''}
        </div>
      </div>
    </div>
    <div class="timer-controls">
      ${timerRunning
        ?`<button class="timer-btn timer-btn-pause${themed?' themed':''}" data-action="timer-pause"><span class="timer-btn-icon">❚❚</span>Pause</button>`
        :`<button class="timer-btn timer-btn-start${themed?' themed':''}" data-action="timer-start"><span class="timer-btn-icon">▶</span>${timerElap>0?'Resume':'Start'}</button>`}
      <button class="timer-btn timer-btn-reset${themed?' themed':''}" data-action="timer-reset"><span class="timer-btn-icon">↺</span>Reset</button>
    </div>
    ${timerElap>0&&!timerRunning?`<button class="timer-log-cta" data-action="open-log">Log ${fmtDur(Math.ceil(timerElap/60))} session →</button>`:''}
  </div>

  <div class="card timer-presets-card">
    <div class="sec mb8"><span class="sec-lbl">Duration</span></div>
    <div class="timer-preset-grid">${presets.map(t=>{
      const active=timerTarget===t*60&&!timerRunning;
      const label=presetLabels[t]||'';
      return`<div class="timer-preset${active?' on':''}" data-action="set-timer" data-dur="${t}">
        <span class="timer-preset-num">${t}</span><span class="timer-preset-unit">min</span>
        ${label?`<span class="timer-preset-label">${label}</span>`:''}
      </div>`;
    }).join('')}</div>
  </div>

  ${pomoCount>0?`<div class="card timer-pomo-card">
    <div class="sec mb8"><span class="sec-lbl">Pomodoros</span></div>
    <div class="pomo-tracker">
      <div class="pomo-dots">${pomoDots}</div>
      <span class="pomo-count">${pomoCount} done${pomoCount%4===0?' — long break earned!':` — ${4-pomoCount%4} until long break`}</span>
    </div>
  </div>`:''}

  <div class="card timer-today-card">
    <div class="sec mb8"><span class="sec-lbl">Today</span></div>
    ${todaySess.length?`<div class="timer-today-stats">
      <div class="timer-today-stat">
        <div class="timer-today-v">${fmtDur(todayMins)}</div>
        <div class="timer-today-l">studied</div>
      </div>
      <div class="timer-today-stat">
        <div class="timer-today-v">${todaySess.length}</div>
        <div class="timer-today-l">session${todaySess.length!==1?'s':''}</div>
      </div>
    </div>
    <div class="timer-today-list">${todaySess.slice(-3).reverse().map(ss=>{
      const sub=S.data.subjects.find(x=>x.id===ss.subject)||{name:ss.subject,abbr:'?',color:0};
      const c=getSubjColor(sub);
      return`<div class="timer-today-row">
        <div class="timer-today-dot" style="background:${c.bg};border:1px solid ${c.bd};"></div>
        <span class="timer-today-name">${esc(sub.name)}</span>
        <span class="timer-today-dur">${fmtDur(ss.duration)}</span>
      </div>`;
    }).join('')}</div>`
    :`<div class="timer-today-empty">No sessions yet today — start your first one above</div>`}
  </div>

  <div class="card timer-ambiance-card">
    <div class="sec mb8"><span class="sec-lbl">Ambiance</span>${S.timerBg!=='none'?`<span class="amb-sound-toggle" data-action="toggle-timer-audio">${S.timerAudio?'🔊 Sound on':'🔇 Sound off'}</span>`:''}</div>
    <div class="amb-grid">
      <div class="amb-opt${S.timerBg==='none'?' on':''}" data-action="set-timer-bg" data-bg="none">
        <div class="amb-icon">◯</div><div class="amb-label">None</div>
      </div>
      <div class="amb-opt${S.timerBg==='forest'?' on':''}" data-action="set-timer-bg" data-bg="forest">
        <div class="amb-preview amb-prev-forest"></div>
        <div class="amb-label">Forest</div>
      </div>
      <div class="amb-opt${S.timerBg==='cafe'?' on':''}" data-action="set-timer-bg" data-bg="cafe">
        <div class="amb-preview amb-prev-cafe"></div>
        <div class="amb-label">Jazz Cafe</div>
      </div>
      <div class="amb-opt${S.timerBg==='ocean'?' on':''}" data-action="set-timer-bg" data-bg="ocean">
        <div class="amb-preview amb-prev-ocean"></div>
        <div class="amb-label">Ocean</div>
      </div>
    </div>
  </div>

  <div class="card timer-font-card">
    <div class="sec mb8"><span class="sec-lbl">Clock font</span></div>
    <div class="timer-font-grid">
      ${[
        {id:'default',label:'Default',family:"'Cormorant',serif",sample:'08:25'},
        {id:'mono',label:'Mono',family:"'DM Mono',monospace",sample:'08:25'},
        {id:'space',label:'Space',family:"'Space Mono',monospace",sample:'08:25'},
        {id:'playfair',label:'Playfair',family:"'Playfair Display',serif",sample:'08:25'},
        {id:'outfit',label:'Outfit',family:"'Outfit',sans-serif",sample:'08:25'},
        {id:'jetbrains',label:'JetBrains',family:"'JetBrains Mono',monospace",sample:'08:25'},
      ].map(f=>`<div class="timer-font-opt${S.timerFont===f.id?' on':''}" data-action="set-timer-font" data-font="${f.id}">
        <div class="timer-font-sample" style="font-family:${f.family};">${f.sample}</div>
        <div class="timer-font-label">${f.label}</div>
      </div>`).join('')}
    </div>
  </div>

  ${!timerRunning&&timerElap===0?`<div class="card timer-tip">
    <div class="timer-tip-icon">◷</div>
    <div><strong>Pick a duration</strong> → start → study with focus → tap <strong style="color:var(--ok);">Log it</strong> when done.</div>
  </div>`:''}`;
}

/* ════════════════════════════════
   ASSESSMENT TRACKER VIEW
════════════════════════════════ */
const ASSESS_TYPES=['Quiz','Test','Assessment','Exam','Assignment','Task','Trial','Report','Presentation'];
function renderAssess(){
  const{subjects=[],sessions=[],assessments=[]}=S.data;
  const todayStr=today();

  const upcoming=assessments.filter(a=>!a.done&&a.date>=todayStr).sort((a,b)=>a.date.localeCompare(b.date));
  const overdue=assessments.filter(a=>!a.done&&a.date<todayStr).sort((a,b)=>b.date.localeCompare(a.date));
  const done=assessments.filter(a=>a.done).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);

  function studyRec(a){
    const sub=subjects.find(s=>s.id===a.subject);
    if(!sub)return null;
    const daysLeft=daysUntil(a.date);
    const subSess=sessions.filter(s=>s.subject===a.subject&&s.subject!=='grace').sort((a,b)=>b.date.localeCompare(a.date));
    const lastSess=subSess[0];
    const daysSince=lastSess?Math.max(0,Math.round((new Date(todayStr)-new Date(lastSess.date))/86400000)):null;
    const topics=getTopicsForSubject(sub);
    const studiedTopics=new Set(subSess.filter(s=>s.topic).map(s=>s.topic));
    const uncovered=topics.filter(t=>!studiedTopics.has(t));
    const urgent=daysLeft<=7||(daysSince!=null&&daysSince>5&&daysLeft<=14);
    const verySoon=daysLeft<=3;
    let rec='';
    if(verySoon&&(daysSince==null||daysSince>2)){rec=`${daysSince>2?`Haven't studied in ${daysSince}d — it`:'It'}'s ${daysLeft<=1?'tomorrow':'in '+daysLeft+'d'}. Review core concepts now.`;}
    else if(urgent&&uncovered.length>0){rec=`${uncovered.length} topic${uncovered.length>1?'s':''} not yet covered — ${daysLeft}d to go.`;}
    else if(daysSince>7&&daysLeft<=21){rec=`Last studied ${daysSince}d ago. Don't leave it too long.`;}
    else if(uncovered.length>0&&daysLeft<=30){rec=`Topics to cover: ${uncovered.slice(0,2).join(', ')}${uncovered.length>2?`, +${uncovered.length-2} more`:''}.`;}
    return{rec,urgent,verySoon,daysSince,uncovered,daysLeft};
  }

  // ── Horizontal 14-day scrollable day strip ──
  function renderDayStrip(){
    const days=[];
    for(let i=0;i<14;i++)days.push(addDays(todayStr,i));
    const assessDates=new Map();
    assessments.filter(a=>!a.done&&a.date>=todayStr).forEach(a=>{
      if(!assessDates.has(a.date))assessDates.set(a.date,[]);
      assessDates.get(a.date).push(a);
    });
    const dayLetters=['Su','Mo','Tu','We','Th','Fr','Sa'];
    return`<div class="assess-strip-wrap">
      <div class="assess-strip">
        ${days.map(d=>{
          const isToday=d===todayStr;
          const as=assessDates.get(d)||[];
          const hasA=as.length>0;
          const dt=new Date(d+'T12:00:00');
          const dayNum=dt.getDate();
          const dayLetter=dayLetters[dt.getDay()];
          return`<div class="assess-strip-day${isToday?' is-today':''}${hasA?' has-assess':''}">
            <div class="asd-letter">${dayLetter}</div>
            <div class="asd-num">${dayNum}</div>
            <div class="asd-dots">${as.slice(0,3).map(a=>{const sub=subjects.find(s=>s.id===a.subject);const c=getSubjColor(sub||{color:0});return`<div class="asd-dot" style="background:${c.bd}" title="${esc(a.name)}"></div>`;}).join('')}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function renderAssessCard(a,past=false){
    const sub=subjects.find(s=>s.id===a.subject);
    const c=sub?getSubjColor(sub):{bg:'var(--srf2)',bd:'var(--bdS)',tx:'var(--tx3)'};
    const dLeft=daysUntil(a.date);
    const dLabel=past?null:(dLeft===0?'Today':dLeft===1?'Tmrw':null);
    const rec=past?null:studyRec(a);
    const urgentClass=rec?.verySoon?' ac-urgent':rec?.urgent?' ac-warn':'';
    return`<div class="ac${urgentClass}${a.done?' ac-done':''}">
      <div class="ac-left">
        ${past
          ?`<div class="ac-past-date">${fmtDate(a.date)}</div>`
          :dLabel
            ?`<div class="ac-day-label${dLeft===0?' ac-today':''}">${dLabel}</div>`
            :`<div class="ac-day-num">${dLeft}</div><div class="ac-day-unit">days</div>`}
        ${a.weight?`<div class="ac-weight">${a.weight}%</div>`:''}
      </div>
      <div class="ac-body">
        <div class="ac-name">${esc(a.name)}</div>
        <div class="ac-meta">
          ${sub?`<span class="assess-sub-tag" style="background:${c.bg};border-color:${c.bd};color:${c.tx};">${esc(sub.abbr)}</span>`:''}
          <span class="ac-type">${a.type}</span>
          ${a.notes?`<span class="ac-notes-p">· ${esc(a.notes.slice(0,40))}${a.notes.length>40?'…':''}</span>`:''}
        </div>
        ${rec?.rec?`<div class="ac-rec${rec.verySoon?' ac-rec-urgent':rec.urgent?' ac-rec-warn':''}">${rec.rec}</div>`:''}
      </div>
      <div class="ac-actions">
        ${!past?`<div class="assess-done-btn" data-action="assess-done" data-id="${a.id}" title="Mark done">✓</div>`:''}
        <div class="edit-btn" data-action="assess-edit" data-id="${a.id}" title="Edit">✎</div>
        <div class="del-btn" data-action="assess-del" data-id="${a.id}" title="Delete">✕</div>
      </div>
    </div>`;
  }

  const overallRecs=upcoming.map(a=>({a,r:studyRec(a)})).filter(x=>x.r?.urgent).sort((a,b)=>a.r.daysLeft-b.r.daysLeft);

  return`<div class="pg-header-row">
    <div class="pg-title">Assessments</div>
    <button class="icon-add-btn" data-action="open-add-assess">＋ Add</button>
  </div>
  ${overallRecs.length?`<div class="assess-banner">
    <div class="assess-banner-days">
      <span class="assess-banner-num">${overallRecs[0].r.daysLeft<=1?'tmrw':overallRecs[0].r.daysLeft}</span>
      ${overallRecs[0].r.daysLeft>1?`<span class="assess-banner-dunit">days</span>`:''}
    </div>
    <div class="assess-banner-body">
      <div class="assess-banner-label">Priority assessment</div>
      <div class="assess-banner-name">${esc(overallRecs[0].a.name)}</div>
      <div class="assess-banner-sub">${overallRecs[0].r.daysLeft<=1?'Due tomorrow — review core content now':overallRecs[0].r.daysLeft<=7?`${overallRecs[0].r.daysLeft} days away — increase study frequency`:`${overallRecs[0].r.uncovered.length} topic${overallRecs[0].r.uncovered.length!==1?'s':''} uncovered`}</div>
    </div>
  </div>`:''}
  ${renderDayStrip()}
  ${!upcoming.length&&!overdue.length?`<div class="empty" style="padding-top:32px;"><div class="empty-e">📋</div><div class="empty-t">No upcoming assessments</div><div class="empty-s">Add tests, assignments and exams above.</div></div>`:''}
  ${overdue.length?`<div class="assess-section-hd assess-overdue-hd">Overdue <span class="assess-count assess-count-red">${overdue.length}</span></div>${overdue.map(a=>renderAssessCard(a)).join('')}`:''}
  ${upcoming.length?`<div class="assess-section-hd">Upcoming <span class="assess-count">${upcoming.length}</span></div>${upcoming.map(a=>renderAssessCard(a)).join('')}`:''}
  ${done.length?`<div class="assess-section-hd" style="margin-top:20px;">Recently done</div>${done.map(a=>renderAssessCard(a,true)).join('')}`:''}`;
}

function renderAddAssessModal(){
  const{subjects=[]}=S.data;
  const isEdit=!!S._assessEdit;
  const ea=isEdit?S._assessEdit:{};
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
        <div class="mtitle">${isEdit?'Edit Assessment':'Add Assessment'}</div>
        <div class="msub">Track upcoming tests, assignments and exams.</div>
      </div>
      <div class="modal-body">
        <div class="m-lbl">Name</div>
        <input type="text" id="assess-name" class="team-input" placeholder="e.g. Chemistry Module 3 Test" maxlength="60" value="${esc(ea.name||'')}" autofocus>
        <div class="m-lbl" style="margin-top:14px;">Subject</div>
        <select id="assess-sub" class="team-input">
          <option value="">— none —</option>
          ${subjects.map(s=>`<option value="${s.id}"${ea.subject===s.id?' selected':''}>${esc(s.name)}</option>`).join('')}
        </select>
        <div class="form-row" style="display:flex;gap:10px;margin-top:14px;">
          <div style="flex:1;">
            <div class="m-lbl">Date</div>
            <input type="date" id="assess-date" class="team-input" value="${ea.date||addDays(today(),7)}">
          </div>
          <div style="flex:1;">
            <div class="m-lbl">Type</div>
            <select id="assess-type" class="team-input">
              ${ASSESS_TYPES.map(t=>`<option${ea.type===t?' selected':''}>${t}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="m-lbl" style="margin-top:14px;">Weight % <span style="font-weight:300;color:var(--tx3);">— optional</span></div>
        <input type="number" id="assess-weight" class="team-input" placeholder="e.g. 20" min="1" max="100" value="${ea.weight||''}">
        <div class="m-lbl" style="margin-top:14px;">Notes <span style="font-weight:300;color:var(--tx3);">— optional</span></div>
        <input type="text" id="assess-notes" class="team-input" placeholder="Topics, format, etc." maxlength="120" value="${esc(ea.notes||'')}">
        <button class="m-submit" data-action="save-assess" style="margin-top:20px;">${isEdit?'Save changes':'Add Assessment'}</button>
        ${isEdit?`<button class="m-submit" data-action="assess-del" data-id="${ea.id}" style="margin-top:8px;background:var(--err);opacity:.8;">Delete</button>`:''}
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════
   TO-DO LIST VIEW
════════════════════════════════ */
function renderTodo(){
  const todos=(S.data.todos||[]);
  const{subjects=[]}=S.data;
  const todayStr=today();
  const tomorrowStr=addDays(todayStr,1);

  const pending=todos.filter(t=>!t.done);
  const doneItems=todos.filter(t=>t.done).sort((a,b)=>(b.doneAt||0)-(a.doneAt||0)).slice(0,10);

  const overdue=pending.filter(t=>t.due&&t.due<todayStr).sort((a,b)=>a.due.localeCompare(b.due));
  const todayItems=pending.filter(t=>t.due===todayStr);
  const tomorrowItems=pending.filter(t=>t.due===tomorrowStr);
  const upcomingItems=pending.filter(t=>t.due&&t.due>tomorrowStr).sort((a,b)=>a.due.localeCompare(b.due));
  const nodateItems=pending.filter(t=>!t.due);

  function renderTodoItem(t,showDue=false){
    const sub=subjects.find(s=>s.id===t.subject);
    const c=sub?getSubjColor(sub):{bg:'var(--srf2)',bd:'var(--bdS)',tx:'var(--tx3)'};
    const isOverdue=!!(t.due&&t.due<todayStr&&!t.done);
    return`<div class="ti${t.done?' ti-done':''}${isOverdue?' ti-overdue':''}" data-id="${t.id}">
      <div class="ti-check${t.done?' ti-checked':''}" data-action="todo-toggle" data-id="${t.id}">
        ${t.done?`<svg viewBox="0 0 12 12" fill="none" width="10" height="10"><polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:''}
      </div>
      <div class="ti-body">
        <div class="ti-text">${esc(t.text)}</div>
        ${sub||(showDue&&t.due&&!t.done)?`<div class="ti-meta">
          ${sub?`<span class="assess-sub-tag" style="background:${c.bg};border-color:${c.bd};color:${c.tx};font-size:9px;">${esc(sub.abbr)}</span>`:''}
          ${showDue&&t.due&&!t.done?`<span class="ti-due${isOverdue?' ti-due-late':''}">${fmtDate(t.due)}</span>`:''}
        </div>`:''}
      </div>
      <div class="ti-actions">
        <div class="edit-btn" data-action="todo-edit" data-id="${t.id}" title="Edit">✎</div>
        <div class="del-btn" data-action="todo-del" data-id="${t.id}" title="Delete">✕</div>
      </div>
    </div>`;
  }

  function group(label,items,showDue=false,isOverdue=false){
    if(!items.length)return'';
    return`<div class="tg${isOverdue?' tg-overdue':''}">
      <div class="tg-hd"><span class="tg-label">${label}</span><span class="tg-count${isOverdue?' tg-count-red':''}">${items.length}</span></div>
      ${items.map(t=>renderTodoItem(t,showDue)).join('')}
    </div>`;
  }

  return`<div class="pg-header-row">
    <div class="pg-title">To-Do</div>
  </div>
  <div class="todo-qadd">
    <input type="text" id="todo-new-input" class="todo-qinput" placeholder="New task… press Enter to save" maxlength="120">
    <button class="todo-qadd-btn" data-action="todo-quick-add" aria-label="Add task">
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
    </button>
  </div>
  ${!pending.length&&!doneItems.length?`<div class="empty" style="padding-top:40px;"><div class="empty-e">✓</div><div class="empty-t">All clear!</div><div class="empty-s">Add a task above to get started.</div></div>`:''}
  ${group('Overdue',overdue,true,true)}
  ${group('Today',todayItems)}
  ${group('Tomorrow',tomorrowItems)}
  ${group('Upcoming',upcomingItems,true)}
  ${group('No date',nodateItems)}
  ${doneItems.length?`<div class="tg tg-done">
    <div class="tg-hd"><span class="tg-label tg-label-faded">Completed</span><span class="tg-count tg-count-faded">${doneItems.length}</span></div>
    ${doneItems.map(t=>renderTodoItem(t)).join('')}
  </div>`:''}`;
}

function renderTodoEditModal(){
  const{subjects=[]}=S.data;
  const t=S._todoEdit||{};
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
        <div class="mtitle">Edit task</div>
      </div>
      <div class="modal-body">
        <div class="m-lbl">Task</div>
        <input type="text" id="todo-edit-text" class="team-input" value="${esc(t.text||'')}" maxlength="120" autofocus>
        <div class="form-row" style="display:flex;gap:10px;margin-top:14px;">
          <div style="flex:1;">
            <div class="m-lbl">Due date <span style="font-weight:300;color:var(--tx3);">— optional</span></div>
            <input type="date" id="todo-edit-due" class="team-input" value="${t.due||''}">
          </div>
          <div style="flex:1;">
            <div class="m-lbl">Subject <span style="font-weight:300;color:var(--tx3);">— optional</span></div>
            <select id="todo-edit-sub" class="team-input">
              <option value="">— none —</option>
              ${subjects.map(s=>`<option value="${s.id}"${t.subject===s.id?' selected':''}>${esc(s.name)}</option>`).join('')}
            </select>
          </div>
        </div>
        <button class="m-submit" data-action="todo-save-edit" style="margin-top:20px;">Save</button>
      </div>
    </div>
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
    <div class="sset-t">◉ Account</div>
    <div class="srow"><span class="srow-l">Name</span><input type="text" id="sname" class="srow-v" value="${esc(name)}" maxlength="30" style="text-align:right;border:none;background:transparent;outline:none;font-family:'DM Mono',monospace;font-size:12px;color:var(--tx);"></div>
    <div class="srow"><span class="srow-l">Year</span><select id="syear" style="font-family:'DM Mono',monospace;font-size:12px;color:var(--tx);border:none;background:transparent;outline:none;cursor:pointer;appearance:none;">${[7,8,9,10,11,12].map(y=>`<option value="${y}"${y===year?' selected':''}>Year ${y}</option>`).join('')}</select></div>
    <div class="srow"><span class="srow-l">PIN</span><input type="password" id="spin" class="srow-v" value="${esc(S.data.pin||'')}" maxlength="4" inputmode="numeric" placeholder="••••" style="text-align:right;border:none;background:transparent;outline:none;font-family:'DM Mono',monospace;font-size:12px;color:var(--tx);width:60px;letter-spacing:.15em;"></div>
    <div class="srow"><span class="srow-l">Exam target</span><span class="srow-v">${getExamDate(year).name} · ${Math.max(0,daysUntil(getExamDate(year).date))}d</span></div>
    <div class="settings-stats-row">
      <div class="settings-stat"><div class="settings-stat-v">${sessions.filter(s=>s.subject!=='grace').length}</div><div class="settings-stat-l">sessions</div></div>
      <div class="settings-stat"><div class="settings-stat-v">${fmtDur(totalMins(sessions))}</div><div class="settings-stat-l">study time</div></div>
      <div class="settings-stat"><div class="settings-stat-v">${fmtShort(joined)}</div><div class="settings-stat-l">joined</div></div>
    </div>
    <div class="srow"><span class="srow-l">Dark mode</span><div class="toggle${S.darkMode?' on':''}" data-action="toggle-dark"><div class="toggle-knob"></div></div></div>
    <div class="srow"><span class="srow-l">Streak reminders</span><div class="toggle${'Notification' in window&&Notification.permission==='granted'?' on':''}" data-action="toggle-notif"><div class="toggle-knob"></div></div></div>
    <button class="m-submit" style="font-size:13.5px;padding:11px;" data-action="save-account">Save changes →</button>
  </div>

  <div class="sset">
    <div class="sset-t">☰ Timetable</div>
    <div class="srow" style="flex-direction:column;align-items:flex-start;gap:5px;">
      <span class="srow-l">Import your .ics file from Sentral</span>
      <span style="font-size:12px;color:var(--tx3);font-weight:300;">Settings → Calendar → Download ICS. Re-import whenever your timetable changes. Current: <b style="font-weight:500;">${hasTT?(S.data.timetable.length+' events'):'Not imported'}</b></span>
    </div>
    <label class="import-btn" for="ics-file-input" style="display:flex;margin-top:8px;">↑ ${hasTT?'Re-import':'Import'} ICS file</label>
  </div>

  <div class="sset">
    <div class="sset-t">◇ Subjects</div>
    <div class="subj-mgr">
      ${subjects.map(sub=>`<div class="subj-item"><span class="subj-abb-s">${sub.abbr}</span><span class="subj-nm">${sub.name}</span><span class="srow-v">${sub.target}m/day</span><span class="subj-del" data-action="del-subj" data-id="${sub.id}">✕</span></div>`).join('')}
      <button class="add-subj" data-action="open-add-subj">＋ Add subject</button>
    </div>
  </div>

  <div class="sset">
    <div class="sset-t">◈ Social login</div>
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
      <div style="margin-top:10px;"><strong style="color:var(--tx);">3. Enable Leaderboard (Firestore):</strong></div>
      <ol style="padding-left:16px;margin-top:4px;">
      <li>In your Firebase project → Build → Firestore Database</li>
      <li>Click "Create database" → Start in <strong>test mode</strong> → Done</li>
      <li>That's it — leaderboard will auto-sync when you log sessions</li>
      </ol>
    </div>
  </div>
  <div class="sset">
    <div class="sset-t">↕ Cloud sync</div>
    <div class="jbi-inst"><ol><li>Go to <a href="https://jsonbin.io" target="_blank">jsonbin.io</a> → create free account</li><li>API Keys → copy your Master Key</li><li>Paste below → Save & push</li></ol><div style="margin-top:5px;color:var(--tx3);">On another device: same key → Pull from cloud.</div>${S.googleUser?.uid?`<div style="margin-top:8px;padding:8px 10px;background:rgba(120,200,100,.08);border:1px solid rgba(120,200,100,.2);border-radius:6px;font-size:12px;color:var(--ok);">✓ Google sign-in linked — setting up sync here lets you auto-restore on any device by signing in with Google.</div>`:`<div style="margin-top:8px;font-size:12px;color:var(--tx3);">Tip: set this up + sign in with Google and Meridian can auto-restore your account on any new device.</div>`}</div>
    <div class="srow"><span class="srow-l">API Key</span><input type="password" id="sync-key" placeholder="$2a$10…" value="${sc.apiKey}" maxlength="80" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--tx);border:none;background:transparent;outline:none;text-align:right;width:150px;cursor:text;"></div>
    ${sc.binId?`<div class="srow"><span class="srow-l">Bin ID</span><span class="srow-v">${sc.binId.slice(-10)}…</span></div>`:''}
    <div class="sync-row"><div class="syncd${sc.status==='ok'?' ok':sc.status==='err'?' err':sc.status==='syncing'?' ing':''}"></div><span>${sc.status==='ok'?`Last synced ${sc.lastSynced?new Date(sc.lastSynced).toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'}):'—'}`:sc.status==='err'?'Sync error':'Not configured'}</span></div>
    <div style="display:flex;gap:8px;margin-top:6px;">
      <button class="cpbtn" data-action="save-sync" style="flex:1;">Save & push →</button>
      <button class="cpbtn" data-action="pull-cloud" style="flex:1;">↓ Pull</button>
    </div>
  </div>

  <div class="sset">
    <div class="sset-t">↓ Offline backup</div>
    <div style="display:flex;gap:8px;">
      <button class="cpbtn" style="flex:1;" data-action="export-json">↓ Download backup</button>
      <button class="cpbtn" style="flex:1;" data-action="import-json">↑ Restore backup</button>
    </div>
    <div style="display:flex;gap:8px;margin-top:6px;">
      <button class="cpbtn" style="flex:1;" data-action="toggle-export">${S.showExport?'Hide':'Show'} export code</button>
    </div>
    <input type="file" id="json-import-input" accept=".json" style="display:none;">
    ${S.showExport?`<div style="margin-top:8px;"><div class="syncbox">${exportCode(S.data)}</div><button class="cpbtn" data-action="copy-export">Copy to clipboard</button></div>`:''}
  </div>

  <div class="sset">
    <div class="sset-t">⚠ Danger</div>
    <button class="dbtn" data-action="logout">Log out & clear data</button>
  </div>`;
}

/* ════════════════════════════════
   LEADERBOARD
════════════════════════════════ */
function renderLeaderboard(){
  if(!window.FIREBASE_CONFIG)return`
    <div class="pg-title">Leaderboard</div>
    <div class="empty"><div class="empty-e">🏆</div><div class="empty-t">Firebase not configured</div><div class="empty-s">Set up Firebase in Settings to enable the leaderboard and compete with friends.</div><div class="empty-action" data-action="nav-settings">Open Settings</div></div>`;

  const myId=getLbUserId();
  const rows=S.lbData||[];
  const sortKey=S.lbSort;
  const sortLabel={totalMins:'All-time',weekMins:'This week',streak:'Streak',avgScore:'Test avg'};
  const sortIcons={totalMins:'∑',weekMins:'◷',streak:'🔥',avgScore:'◈'};
  const isPeriodSort=sortKey==='totalMins'||sortKey==='weekMins';
  const period=sortKey==='weekMins'?'week':'alltime'; // used for display logic

  const sorted=[...rows].sort((a,b)=>{
    if(sortKey==='avgScore')return(b.avgScore||0)-(a.avgScore||0);
    return(b[sortKey]||0)-(a[sortKey]||0);
  });

  function fmtLbVal(row,key){
    if(key==='weekMins'||key==='totalMins')return fmtDur(row[key]||0);
    if(key==='streak')return(row[key]||0)+' day'+(row[key]===1?'':'s');
    if(key==='avgScore')return row[key]!=null?row[key]+'%':'—';
    return row[key]||'—';
  }
  function fmtLbValShort(row,key){
    if(key==='weekMins'||key==='totalMins')return fmtDur(row[key]||0);
    if(key==='streak')return(row[key]||0)+'d';
    if(key==='avgScore')return row[key]!=null?row[key]+'%':'—';
    return row[key]||'—';
  }
  function secondaryInfo(r,key){
    if(key==='weekMins') return`${fmtDur(r.totalMins||0)} all-time · ${r.streak||0}d streak`;
    if(key==='totalMins') return`${r.sessCount||0} sessions · ${fmtDur(r.weekMins||0)} this wk`;
    if(key==='streak') return`${fmtDur(r.weekMins||0)} this week · ${fmtDur(r.totalMins||0)} all-time`;
    if(key==='avgScore') return`${r.testCount||0} test${r.testCount===1?'':'s'} · Yr ${r.year||'?'}`;
    return`Yr ${r.year||'?'}`;
  }

  // Last week winner (computed once)
  const lastWeekRows=rows.filter(r=>(r.lastWeekMins||0)>0);
  const lastWeekWinner=lastWeekRows.length?lastWeekRows.reduce((best,r)=>(r.lastWeekMins||0)>(best.lastWeekMins||0)?r:best,lastWeekRows[0]):null;

  // ── Podium for top 3 ──
  function renderPodium(){
    if(sorted.length<2)return'';
    const top3=sorted.slice(0,3);
    const podiumOrder=top3.length>=3?[top3[1],top3[0],top3[2]]:[top3[1]||null,top3[0],null];
    const heights=[68,92,52];
    const places=[2,1,3];
    const medalEmojis=['🥈','🥇','🥉'];
    const isLwWinner=(r)=>lastWeekWinner&&r&&r.userId===lastWeekWinner.userId;

    return`<div class="lb-podium">
      ${podiumOrder.map((r,i)=>{
        if(!r)return`<div class="lb-podium-slot lb-podium-empty"></div>`;
        const isMe=r.userId===myId;
        const place=places[i];
        return`<div class="lb-podium-slot lb-podium-${place}${isMe?' lb-podium-me':''}"${!isMe?` data-action="lb-pick-rival" data-uid="${r.userId}"`:''}">
          ${i===1?'<div class="lb-podium-crown">👑</div>':'<div style="height:26px"></div>'}
          <div class="lb-podium-avatar${isMe?' lb-podium-avatar-me':''}${i===1?' lb-podium-avatar-first':''}">${esc((r.name||'?')[0].toUpperCase())}</div>
          <div class="lb-podium-name">${esc(r.name)}${isMe?' <span class="lb-you">you</span>':''}</div>
          <div class="lb-podium-val">${fmtLbValShort(r,sortKey)}</div>
          ${isLwWinner(r)?'<div class="lb-podium-lwbadge">◆ last wk</div>':''}
          <div class="lb-podium-bar" style="height:${heights[i]}px;">
            <span class="lb-podium-medal">${medalEmojis[i]}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  // ── My stats card ──
  function renderMyStats(){
    const me=rows.find(r=>r.userId===myId);
    if(!me)return'';
    const myRank=sorted.findIndex(r=>r.userId===myId);
    const pctile=sorted.length>1?Math.round(((sorted.length-1-myRank)/(sorted.length-1))*100):100;
    return`<div class="lb-mystats">
      <div class="lb-mystats-rank">
        <div class="lb-mystats-rank-num">#${myRank+1}</div>
        <div class="lb-mystats-rank-of">of ${sorted.length}</div>
      </div>
      <div class="lb-mystats-grid">
        <div class="lb-mystats-item">
          <div class="lb-mystats-v">${fmtDur(me.totalMins||0)}</div>
          <div class="lb-mystats-l">All-time</div>
        </div>
        <div class="lb-mystats-item">
          <div class="lb-mystats-v">${fmtDur(me.weekMins||0)}</div>
          <div class="lb-mystats-l">This week</div>
        </div>
        <div class="lb-mystats-item">
          <div class="lb-mystats-v">${me.streak||0}d</div>
          <div class="lb-mystats-l">Streak</div>
        </div>
        <div class="lb-mystats-item">
          <div class="lb-mystats-v">${me.avgScore!=null?me.avgScore+'%':'—'}</div>
          <div class="lb-mystats-l">Test avg</div>
        </div>
      </div>
      ${pctile>=50?`<div class="lb-mystats-pctile">Top ${100-pctile}% of all students</div>`:''}
    </div>`;
  }

  // ── Rankings tab ──
  function renderRankings(){
    if(S.lbLoading)return`<div class="lb-loading"><div class="lb-spinner"></div><div class="lb-loading-text">Loading leaderboard…</div></div>`;
    if(!rows.length)return`<div class="lb-empty">
      <div class="lb-empty-icon">🏆</div>
      <div class="lb-empty-title">No one on the board yet</div>
      <div class="lb-empty-desc">Log a study session and you'll be the first!</div>
    </div>`;

    const activeCount=rows.filter(r=>(r.weekMins||0)>0).length;
    const rest=sorted.slice(3);

    // Last week champion banner
    const lwBanner=lastWeekWinner?`<div class="lb-lw-card">
      <div class="lb-lw-left">
        <div class="lb-lw-hrs">${fmtDur(lastWeekWinner.lastWeekMins)}</div>
        <div class="lb-lw-sublabel">last week</div>
      </div>
      <div class="lb-lw-divider"></div>
      <div class="lb-lw-right">
        <div class="lb-lw-eyebrow">Last week's champion</div>
        <div class="lb-lw-name">${esc(lastWeekWinner.name)}${lastWeekWinner.userId===myId?' <span class="lb-you">you</span>':''}</div>
      </div>
      <div class="lb-lw-crown">◆</div>
    </div>`:'';

    return`
    <div class="lb-sort-bar">
      ${Object.keys(sortLabel).map(k=>`<div class="lb-sort-chip${sortKey===k?' on':''}" data-action="lb-sort" data-key="${k}"><span class="lb-sort-ic">${sortIcons[k]}</span>${sortLabel[k]}</div>`).join('')}
    </div>
    ${lwBanner}
    <div class="lb-activity-bar">
      <span class="lb-activity-dot"></span>
      <span>${activeCount} active this week · ${sorted.length} on board</span>
    </div>
    ${renderPodium()}
    ${renderMyStats()}
    ${rest.length?`<div class="lb-rest-label">Everyone else</div>
    <div class="lb-list">
      ${rest.map((r,i)=>{
        const isMe=r.userId===myId;
        const myName=(S.data?.name||'').trim().toLowerCase();
        const isDupe=!isMe&&myName&&(r.name||'').trim().toLowerCase()===myName;
        const rank=i+4;
        const isActive=(r.weekMins||0)>0;
        const isLwW=lastWeekWinner&&r.userId===lastWeekWinner.userId;
        return`<div class="lb-row${isMe?' lb-me':''}${!isActive?' lb-inactive':''}"${isMe?'':` data-action="lb-pick-rival" data-uid="${r.userId}"`}>
          <div class="lb-rank"><span class="lb-rank-num">${rank}</span></div>
          <div class="lb-avatar${isMe?' lb-avatar-me':''}">${esc((r.name||'?')[0].toUpperCase())}</div>
          <div class="lb-info">
            <div class="lb-name">${esc(r.name)}${isMe?' <span class="lb-you">you</span>':''}${isDupe?' <span class="lb-you lb-dupe">dupe</span>':''}${isLwW?' <span class="lb-lw-badge">◆ last wk</span>':''}</div>
            <div class="lb-sub">${secondaryInfo(r,sortKey)}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-val">${fmtLbVal(r,sortKey)}</div>
            ${isDupe?`<div class="lb-del-dupe" data-action="lb-del-entry" data-uid="${r.userId}">✕ dupe</div>`:''}
            ${!isMe&&!isDupe?'<div class="lb-challenge-sm" title="Challenge">⚔️</div>':''}
          </div>
        </div>`;
      }).join('')}
    </div>`:''}`;
  }

  // ── Head-to-head tab ──
  function renderH2H(){
    const others=rows.filter(r=>r.userId!==myId);

    if(!S.lbRival){
      if(S.lbLoading)return`<div class="lb-loading"><div class="lb-spinner"></div><div style="margin-top:12px;">Loading…</div></div>`;
      if(!others.length)return`<div class="lb-empty">
        <div style="font-size:40px;margin-bottom:12px;">⚔️</div>
        <div style="font-size:15px;font-weight:500;color:var(--tx);margin-bottom:6px;">No rivals yet</div>
        <div style="font-size:13px;line-height:1.5;">Share Meridian with friends to compete head-to-head!</div>
      </div>`;
      return`
      <div class="lb-h2h-pick">
        <div class="lb-h2h-title">Pick someone to challenge</div>
        <div class="lb-h2h-subtitle">Compare your stats side by side</div>
        <div class="lb-list">
          ${others.map(r=>{
            const rRank=sorted.findIndex(x=>x.userId===r.userId)+1;
            return`<div class="lb-row lb-rival-pick" data-action="lb-pick-rival" data-uid="${r.userId}">
            <div class="lb-avatar" style="background:var(--srf3);color:var(--tx2);">${esc((r.name||'?')[0].toUpperCase())}</div>
            <div class="lb-info">
              <div class="lb-name">${esc(r.name)}</div>
              <div class="lb-sub">#${rRank} · ${fmtDur(r.weekMins||0)} this week · ${r.streak||0}d streak</div>
            </div>
            <div class="lb-challenge">Challenge →</div>
          </div>`}).join('')}
        </div>
      </div>`;
    }

    // Show comparison
    const me=rows.find(r=>r.userId===myId)||buildLbStats(S.data);
    const rival=rows.find(r=>r.userId===S.lbRival);
    if(!rival){S.lbRival=null;return renderH2H();}

    const modes=[['weekMins','Weekly study'],['totalMins','All-time'],['streak','Streak'],['avgScore','Test avg']];
    const modeIcons={weekMins:'◷',totalMins:'∑',streak:'🔥',avgScore:'◈'};

    function makeBar(mv2,rv2){
      const total=(mv2||0)+(rv2||0);
      const mePct=total?Math.round(((mv2||0)/total)*100):50;
      return`<div class="h2h-bar"><div class="h2h-bar-me" data-bw="${mePct}" style="width:0%"></div></div>`;
    }

    function getMyVal(key){return me?me[key]||0:0;}

    let myWins=0,rivalWins=0;
    modes.forEach(([key])=>{
      const mv=getMyVal(key),rv=rival[key]||0;
      if(mv>rv)myWins++;else if(rv>mv)rivalWins++;
    });
    const total=myWins+rivalWins;
    const verdictCls=myWins>rivalWins?'win':rivalWins>myWins?'lose':'tie';

    return`
    <div class="h2h-header">
      <button class="h2h-back" data-action="lb-clear-rival">← Back</button>
      <div class="h2h-score-pill h2h-score-${verdictCls}">
        <span class="h2h-score-me">${myWins}</span>
        <span class="h2h-score-sep">–</span>
        <span class="h2h-score-rival">${rivalWins}</span>
      </div>
    </div>
    <div class="h2h-vs">
      <div class="h2h-player h2h-left">
        <div class="h2h-avatar">${esc((me?.name||'You')[0].toUpperCase())}</div>
        <div class="h2h-pname">${esc(me?.name||'You')}</div>
        <div class="h2h-pstat">${fmtDur(me?.weekMins||0)} / wk</div>
      </div>
      <div class="h2h-versus-wrap">
        <div class="h2h-versus">VS</div>
        <div class="h2h-verdict-mini">${myWins>rivalWins?'You lead':rivalWins>myWins?'They lead':'Tied'}</div>
      </div>
      <div class="h2h-player h2h-right">
        <div class="h2h-avatar h2h-rival-av">${esc((rival.name||'?')[0].toUpperCase())}</div>
        <div class="h2h-pname">${esc(rival.name||'Rival')}</div>
        <div class="h2h-pstat">${fmtDur(rival.weekMins||0)} / wk</div>
      </div>
    </div>
    <div class="h2h-comparison">
      ${modes.map(([key,label])=>{
        const mv=getMyVal(key),rv=rival[key]||0;
        const winner=mv>rv?'me':rv>mv?'rival':'tie';
        return`<div class="h2h-row h2h-${winner}">
          <div class="h2h-row-top">
            <span class="h2h-label"><span class="h2h-label-icon">${modeIcons[key]}</span>${label}</span>
            <span class="h2h-winner-badge">${winner==='me'?'You win':winner==='rival'?'They win':'Tied'}</span>
          </div>
          <div class="h2h-vals">
            <span class="h2h-v ${winner==='me'?'h2h-win':''}">${fmtLbVal({[key]:mv},key)}</span>
            ${makeBar(mv,rv)}
            <span class="h2h-v ${winner==='rival'?'h2h-win':''}">${fmtLbVal({[key]:rv},key)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="h2h-verdict">
      ${(()=>{
        if(myWins>rivalWins)return`<div class="h2h-verdict-card h2h-verdict-win"><span class="h2h-verdict-emoji">💪</span><span>You're winning ${myWins}–${rivalWins}! Keep the pressure on.</span></div>`;
        if(rivalWins>myWins)return`<div class="h2h-verdict-card h2h-verdict-lose"><span class="h2h-verdict-emoji">🔥</span><span>${esc(rival.name)} leads ${rivalWins}–${myWins} — time to grind.</span></div>`;
        return`<div class="h2h-verdict-card h2h-verdict-tie"><span class="h2h-verdict-emoji">⚖️</span><span>All square — next session decides it.</span></div>`;
      })()}
    </div>`;
  }

  // ── Teams tab ──
  function renderTeamsTab(){
    const myTeams=S.lbTeams;
    const myId=getLbUserId();

    // Team vs team comparison
    if(S.lbTeamVs&&S.lbTeamVs.length===2){
      const tA=S.lbTeamData[S.lbTeamVs[0]];
      const tB=S.lbTeamData[S.lbTeamVs[1]];
      if(!tA||!tB){S.lbTeamVs=null;return renderTeamsTab();}

      function teamAgg(team){
        const subj=team.subject||null;
        const mems=(team.members||[]).map(m=>rows.find(r=>r.userId===m.userId)).filter(Boolean);
        let total,avg,bestStreak,avgScore,scored;
        if(subj){
          // Subject-filtered stats
          total=mems.reduce((a,r)=>a+((r.subjectStats?.[subj]?.weekMins)||0),0);
          avg=mems.length?Math.round(total/mems.length):0;
          bestStreak=mems.length?Math.max(...mems.map(r=>r.streak||0)):0;
          scored=mems.filter(r=>r.subjectStats?.[subj]?.avgScore!=null);
          avgScore=scored.length?Math.round(scored.reduce((a,r)=>a+r.subjectStats[subj].avgScore,0)/scored.length):null;
        }else{
          total=mems.reduce((a,r)=>a+(r.weekMins||0),0);
          avg=mems.length?Math.round(total/mems.length):0;
          bestStreak=mems.length?Math.max(...mems.map(r=>r.streak||0)):0;
          scored=mems.filter(r=>r.avgScore!=null);
          avgScore=scored.length?Math.round(scored.reduce((a,r)=>a+r.avgScore,0)/scored.length):null;
        }
        return{total,avg,bestStreak,avgScore,count:mems.length,active:mems.filter(r=>(subj?(r.subjectStats?.[subj]?.weekMins||0):(r.weekMins||0))>0).length};
      }

      const agg={a:teamAgg(tA),b:teamAgg(tB)};
      const metrics=[
        {label:'Weekly total',va:fmtDur(agg.a.total),vb:fmtDur(agg.b.total),na:agg.a.total,nb:agg.b.total},
        {label:'Avg per member',va:fmtDur(agg.a.avg),vb:fmtDur(agg.b.avg),na:agg.a.avg,nb:agg.b.avg},
        {label:'Best streak',va:(agg.a.bestStreak||0)+'d',vb:(agg.b.bestStreak||0)+'d',na:agg.a.bestStreak,nb:agg.b.bestStreak},
        {label:'Active this week',va:agg.a.active+'/'+agg.a.count,vb:agg.b.active+'/'+agg.b.count,na:agg.a.active/(agg.a.count||1),nb:agg.b.active/(agg.b.count||1)},
      ];
      if(agg.a.avgScore!=null||agg.b.avgScore!=null)metrics.push({label:'Avg test score',va:agg.a.avgScore!=null?agg.a.avgScore+'%':'—',vb:agg.b.avgScore!=null?agg.b.avgScore+'%':'—',na:agg.a.avgScore||0,nb:agg.b.avgScore||0});

      let winsA=0,winsB=0;
      metrics.forEach(m=>{if(m.na>m.nb)winsA++;else if(m.nb>m.na)winsB++;});
      const vCls=winsA>winsB?'win':winsB>winsA?'lose':'tie';

      return`
      <div class="h2h-header">
        <button class="h2h-back" data-action="team-clear-vs">← Back</button>
        <div class="h2h-score-pill h2h-score-${vCls}">
          <span class="h2h-score-me">${winsA}</span>
          <span class="h2h-score-sep">–</span>
          <span class="h2h-score-rival">${winsB}</span>
        </div>
      </div>
      <div class="team-vs-header">
        <div class="team-vs-side">
          <div class="team-vs-icon">${esc(tA.name[0])}</div>
          <div class="team-vs-name">${esc(tA.name)}</div>
          <div class="team-vs-count">${agg.a.count} member${agg.a.count!==1?'s':''}</div>
        </div>
        <div class="h2h-versus-wrap"><div class="h2h-versus">VS</div></div>
        <div class="team-vs-side">
          <div class="team-vs-icon team-vs-icon-b">${esc(tB.name[0])}</div>
          <div class="team-vs-name">${esc(tB.name)}</div>
          <div class="team-vs-count">${agg.b.count} member${agg.b.count!==1?'s':''}</div>
        </div>
      </div>
      <div class="h2h-comparison">
        ${metrics.map(m=>{
          const winner=m.na>m.nb?'me':m.nb>m.na?'rival':'tie';
          const total=(m.na||0)+(m.nb||0);
          const aPct=total?Math.round((m.na/total)*100):50;
          return`<div class="h2h-row h2h-${winner}">
            <div class="h2h-row-top">
              <span class="h2h-label">${m.label}</span>
              <span class="h2h-winner-badge">${winner==='me'?esc(tA.name):winner==='rival'?esc(tB.name):'Tied'}</span>
            </div>
            <div class="h2h-vals">
              <span class="h2h-v ${winner==='me'?'h2h-win':''}">${m.va}</span>
              <div class="h2h-bar"><div class="h2h-bar-me" data-bw="${aPct}" style="width:0%"></div></div>
              <span class="h2h-v ${winner==='rival'?'h2h-win':''}">${m.vb}</span>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }

    // Single team detail view
    if(S.lbTeamView){
      const team=S.lbTeamData[S.lbTeamView];
      if(!team){S.lbTeamView=null;return renderTeamsTab();}
      const subj=team.subject||null; // e.g. "Chemistry"
      const isCreator=team.createdBy===myId;

      // Build member stats — subject-filtered if team has a subject
      const members=(team.members||[]).map(m=>{
        const lb=rows.find(r=>r.userId===m.userId);
        if(subj&&lb?.subjectStats?.[subj]){
          const ss=lb.subjectStats[subj];
          return{...m,weekMins:ss.weekMins||0,totalMins:ss.totalMins||0,avgScore:ss.avgScore,testCount:ss.testCount||0,sessCount:ss.sessCount||0,streak:lb?.streak||0};
        }
        return{...m,weekMins:lb?.weekMins||0,totalMins:lb?.totalMins||0,streak:lb?.streak||0,avgScore:lb?.avgScore,testCount:lb?.testCount||0,sessCount:lb?.sessCount||0};
      }).sort((a,b)=>(b.weekMins||0)-(a.weekMins||0));

      const teamTotal=members.reduce((a,m)=>a+(m.weekMins||0),0);
      const teamAvg=members.length?Math.round(teamTotal/members.length):0;
      const active=members.filter(m=>(m.weekMins||0)>0).length;
      const scoredMembers=members.filter(m=>m.avgScore!=null);
      const teamAvgScore=scoredMembers.length?Math.round(scoredMembers.reduce((a,m)=>a+m.avgScore,0)/scoredMembers.length):null;

      // Subject picker for editing (only creator)
      const allSubNames=[...new Set([...(S.data?.subjects||[]).map(s=>s.name),...ALL_PRESET_SUBS.map(s=>s.name)])].sort();

      return`
      <div class="team-detail-header">
        <button class="h2h-back" data-action="team-back">← Teams</button>
        <div class="team-detail-actions">
          <button class="team-share-btn" data-action="team-copy-code" data-code="${team.code}">Share code</button>
          <button class="team-leave-btn" data-action="team-leave" data-id="${S.lbTeamView}">${isCreator&&members.length<=1?'Delete':'Leave'}</button>
        </div>
      </div>
      <div class="team-hero">
        <div class="team-hero-icon">${esc(team.name[0].toUpperCase())}</div>
        <div class="team-hero-name">${esc(team.name)}</div>
        ${subj?`<div class="team-hero-subj">${esc(subj)}</div>`:''}
        <div class="team-hero-code">${team.code}</div>
      </div>
      <div class="team-stats-row">
        <div class="team-stat"><div class="team-stat-v">${fmtDur(teamTotal)}</div><div class="team-stat-l">${subj?esc(subj)+' this wk':'This week'}</div></div>
        ${teamAvgScore!=null?`<div class="team-stat"><div class="team-stat-v">${teamAvgScore}%</div><div class="team-stat-l">Avg score</div></div>`
        :`<div class="team-stat"><div class="team-stat-v">${fmtDur(teamAvg)}</div><div class="team-stat-l">Avg / member</div></div>`}
        <div class="team-stat"><div class="team-stat-v">${members.length}<span style="font-size:11px;color:var(--tx3);">/10</span></div><div class="team-stat-l">${active} active</div></div>
      </div>
      ${isCreator?`<div class="team-subj-section">
        <div class="sec" style="margin:16px 0 8px;"><span class="sec-lbl">Subject</span><span class="sec-link" data-action="team-toggle-subj">${S._editTeamSubj?'Done':'Change'}</span></div>
        ${S._editTeamSubj?`<div class="team-subj-picker">
          <div class="team-subj-chip${!subj?' on':''}" data-action="team-set-subj" data-subj="" data-tid="${S.lbTeamView}">Any</div>
          ${allSubNames.map(n=>`<div class="team-subj-chip${subj===n?' on':''}" data-action="team-set-subj" data-subj="${esc(n)}" data-tid="${S.lbTeamView}">${esc(n)}</div>`).join('')}
        </div>`:`<div class="team-subj-current">${subj?esc(subj):'Any subject — stats show overall totals'}</div>`}
      </div>`:''}
      <div class="sec" style="margin:16px 0 10px;"><span class="sec-lbl">Rankings${subj?' — '+esc(subj):''}</span></div>
      <div class="lb-list">
        ${members.map((m,i)=>{
          const isMe=m.userId===myId;
          const medals=['🥇','🥈','🥉'];
          const secondary=subj
            ?(m.avgScore!=null?m.avgScore+'% avg · ':'')+fmtDur(m.totalMins||0)+' total'
            :(m.streak||0)+'d streak · '+fmtDur(m.totalMins||0)+' total';
          return`<div class="lb-row${isMe?' lb-me':''}">
            <div class="lb-rank"><span class="lb-rank-num">${i<3?medals[i]:i+1}</span></div>
            <div class="lb-avatar" style="background:${isMe?'var(--acc)':'var(--srf3)'};color:${isMe?'#fff':'var(--tx2)'};">${esc((m.name||'?')[0].toUpperCase())}</div>
            <div class="lb-info">
              <div class="lb-name">${esc(m.name)}${isMe?' <span class="lb-you">you</span>':''}</div>
              <div class="lb-sub">${secondary}</div>
            </div>
            <div class="lb-stat"><div class="lb-stat-val">${fmtDur(m.weekMins||0)}</div></div>
          </div>`;
        }).join('')}
      </div>`;
    }

    // Teams list view
    if(S.lbTeamLoading)return`<div class="lb-loading"><div class="lb-spinner"></div><div style="margin-top:12px;">Loading teams…</div></div>`;

    const teamCards=myTeams.map(t=>{
      const team=S.lbTeamData[t.id];
      if(!team)return`<div class="team-card" data-action="team-view" data-id="${t.id}">
        <div class="team-card-icon">${esc((t.name||'?')[0].toUpperCase())}</div>
        <div class="team-card-info"><div class="team-card-name">${esc(t.name)}</div><div class="team-card-meta">Loading…</div></div>
        <div class="team-card-arrow">→</div>
      </div>`;
      const mems=team.members||[];
      const tSubj=team.subject||null;
      const weekTotal=mems.reduce((a,m)=>{
        const lb=rows.find(r=>r.userId===m.userId);
        return a+(tSubj?(lb?.subjectStats?.[tSubj]?.weekMins||0):(lb?.weekMins||0));
      },0);
      const myRank=mems.map(m=>{
        const lb=rows.find(r=>r.userId===m.userId);
        return{userId:m.userId,wm:tSubj?(lb?.subjectStats?.[tSubj]?.weekMins||0):(lb?.weekMins||0)};
      }).sort((a,b)=>b.wm-a.wm).findIndex(x=>x.userId===myId)+1;
      return`<div class="team-card" data-action="team-view" data-id="${t.id}">
        <div class="team-card-icon">${esc(team.name[0].toUpperCase())}</div>
        <div class="team-card-info">
          <div class="team-card-name">${esc(team.name)}${tSubj?` <span class="team-card-subj">${esc(tSubj)}</span>`:''}</div>
          <div class="team-card-meta">${mems.length} member${mems.length!==1?'s':''} · ${fmtDur(weekTotal)} this week${myRank>0?' · You\'re #'+myRank:''}</div>
        </div>
        <div class="team-card-arrow">→</div>
      </div>`;
    }).join('');

    // Compare button if 2+ teams
    const canCompare=myTeams.length>=2;

    return`
    <div class="team-actions-bar">
      <button class="team-action-btn" data-action="team-create">＋ Create</button>
      <button class="team-action-btn team-action-join" data-action="team-join-prompt">Join</button>
    </div>
    ${myTeams.length?`
      <div class="team-list">${teamCards}</div>
      ${canCompare?`<div class="sec" style="margin:18px 0 10px;"><span class="sec-lbl">Compare</span></div>
      <div class="team-compare-grid">
        ${myTeams.map((t,i)=>myTeams.slice(i+1).map(t2=>{
          const tA=S.lbTeamData[t.id];
          const tB=S.lbTeamData[t2.id];
          return`<div class="team-compare-row" data-action="team-vs" data-a="${t.id}" data-b="${t2.id}">
            <span class="team-compare-name">${esc(tA?.name||t.name)}</span>
            <span class="team-compare-vs">vs</span>
            <span class="team-compare-name">${esc(tB?.name||t2.name)}</span>
            <span class="team-compare-go">→</span>
          </div>`;
        }).join('')).join('')}
      </div>`:''}
    `:`<div class="team-empty">
      <div class="team-empty-icon">👥</div>
      <div class="team-empty-title">No teams yet</div>
      <div class="team-empty-text">Create a team for your class and share the code, or join an existing one.</div>
    </div>`}`;
  }

  return`
  <div class="pg-title">Leaderboard</div>
  <div class="lb-tabs">
    <div class="lb-tab${S.lbTab===0?' on':''}" data-action="lb-tab" data-tab="0">🏆 Rankings</div>
    <div class="lb-tab${S.lbTab===1?' on':''}" data-action="lb-tab" data-tab="1">⚔️ Head-to-Head</div>
    <div class="lb-tab${S.lbTab===2?' on':''}" data-action="lb-tab" data-tab="2">👥 Teams</div>
  </div>
  <div class="lb-content">
    ${S.lbTab===0?renderRankings():S.lbTab===1?renderH2H():renderTeamsTab()}
  </div>
  <div class="lb-invite-card">
    <div class="lb-invite-text">Invite friends to compete</div>
    <div class="lb-invite-sub">Share Meridian and study together</div>
    <button class="lb-invite-btn" data-action="lb-share">Share link ↗</button>
  </div>
  <div class="lb-footer">
    <button class="cpbtn" data-action="lb-refresh" style="width:100%;">↻ Refresh leaderboard</button>
  </div>`;
}

/* ════════════════════════════════
   SESSION ROW
════════════════════════════════ */
function renderSessRow(s){
  const sub=S.data.subjects.find(x=>x.id===s.subject)||{name:s.subject,abbr:'?',color:0};
  const c=getSubjColor(sub);
  const dots=Array.from({length:5},(_,i)=>`<div class="cdot${i<s.confidence?' on':''}"></div>`).join('');
  const topicBadge=s.topic?`<span class="sess-topic">${esc(s.topic)}</span>`:'';
  const timeStr=s.ts?fmtTime(new Date(s.ts)):'';
  const noteTrunc=s.note?(s.note.length>40?esc(s.note.slice(0,40))+'…':esc(s.note)):'';
  return`<div class="sess-row">
    <div class="sess-av" style="background:${c.bg};border-color:${c.bd};color:${c.tx};">${sub.abbr}</div>
    <div class="sess-inf">
      <div class="sess-n">${esc(sub.name)}${topicBadge}</div>
      <div class="sess-m">${fmtDate(s.date)}${timeStr?' · '+timeStr:''}${noteTrunc?' · '+noteTrunc:''}</div>
    </div>
    <div class="sess-right"><div class="sess-dur">${fmtDur(s.duration)}</div><div class="cdots">${dots}</div></div>
    <div class="test-actions">
      <div class="edit-btn" data-action="relog" data-id="${s.id}" title="Study again">↻</div>
      <div class="edit-btn" data-action="edit-sess" data-id="${s.id}" title="Edit">✎</div>
      <div class="del-btn" data-action="del-sess" data-id="${s.id}" title="Delete">✕</div>
    </div>
  </div>`;
}

/* ════════════════════════════════
   MODALS
════════════════════════════════ */
function updateLogSubmitText(){
  const effDur=S.logCustom&&parseInt(S.logCustom)>0?parseInt(S.logCustom):S.logDur;
  const selSub=S.data?.subjects.find(s=>s.id===S.logSub);
  const btn=document.querySelector('.log-submit');
  if(btn&&selSub){
    btn.textContent=S.editSessId?`Update ${selSub.name} session`:`Log ${fmtDur(effDur)} of ${selSub.name}`;
    btn.classList.add('ready');
  }
  // Update compact dur display
  const dv=document.querySelector('.log-dur-val');
  if(dv)dv.textContent=fmtDur(effDur);
}

function renderModal(){
  if(S.modal==='log')return renderLogModal();
  if(S.modal==='addsubj')return renderAddSubjModal();
  if(S.modal==='logscore')return renderLogTestModal();
  if(S.modal==='team-create')return renderTeamCreateModal();
  if(S.modal==='team-join')return renderTeamJoinModal();
  if(S.modal==='add-assess')return renderAddAssessModal();
  if(S.modal==='todo-edit')return renderTodoEditModal();
  return'';
}

function renderTeamCreateModal(){
  // Collect all known subject names from user's subjects + all presets
  const allSubNames=[...new Set([...(S.data?.subjects||[]).map(s=>s.name),...ALL_PRESET_SUBS.map(s=>s.name)])].sort();
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
        <div class="mtitle">Create a team</div>
        <div class="msub">Make a team for your class and compete on a specific subject.</div>
      </div>
      <div class="modal-body">
        <div class="m-lbl">Team name</div>
        <input type="text" id="team-name-input" class="team-input" placeholder="e.g. Chem 1, 12ENG-A, Study Squad" maxlength="30" autofocus>
        <div class="team-input-hint">Keep it short — everyone will see this name.</div>
        <div class="m-lbl" style="margin-top:16px;">Subject <span style="font-weight:300;color:var(--tx3);">— optional</span></div>
        <div class="team-subj-picker">
          <div class="team-subj-chip${!S._teamSubject?' on':''}" data-action="team-pick-subj" data-subj="">Any</div>
          ${allSubNames.map(n=>`<div class="team-subj-chip${S._teamSubject===n?' on':''}" data-action="team-pick-subj" data-subj="${esc(n)}">${esc(n)}</div>`).join('')}
        </div>
        <div class="team-input-hint">Pick a subject to compare ${(S.data?.subjects||[]).length?'scores and study time for that subject only':'class performance'}.</div>
        <button class="m-submit" data-action="team-create-submit" style="margin-top:20px;">Create team</button>
      </div>
    </div>
  </div>`;
}

function renderTeamJoinModal(){
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
        <div class="mtitle">Join a team</div>
        <div class="msub">Enter the 6-character code from your team creator.</div>
      </div>
      <div class="modal-body">
        <div class="m-lbl">Team code</div>
        <input type="text" id="team-code-input" class="team-input team-code-field" placeholder="ABC123" maxlength="6" autofocus style="text-transform:uppercase;letter-spacing:.2em;text-align:center;font-size:22px;">
        <button class="m-submit" data-action="team-join-submit" style="margin-top:20px;">Join team</button>
      </div>
    </div>
  </div>`;
}

function renderLogTestModal(){
  const{subjects}=S.data;
  const score=parseFloat(S.testScore)||0;
  const outOf=parseFloat(S.testOutOf)||100;
  const pct=outOf>0&&score>0?Math.round(score/outOf*100):null;
  const grade=pct?getTestGrade(pct):{letter:'—',color:'var(--tx3)'};
  const TEST_TYPES=['Quiz','Test','Assessment','Exam','Assignment','Trial'];
  const selSub=subjects.find(s=>s.id===S.testSub);
  const canSubmit=S.testSub&&score>0;
  const isEdit=!!S.editTestId;
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
        <div class="mtitle">${isEdit?'Edit test score':'Log test score'}</div>
        <div class="msub">${isEdit?'Update your result.':'Record a result to track progress and predict future scores.'}</div>
      </div>
      <div class="modal-body">
        <div class="mlbl">Subject</div>
        <div class="sub-chips-grid" style="margin-bottom:16px;">
          ${subjects.map(sub=>{const c=getSubjColor(sub);return`<div class="sub-chip-item${S.testSub===sub.id?' on':''}" data-action="sel-test-sub" data-sub="${sub.id}">
            <div class="sub-chip-abb" style="${S.testSub===sub.id?'':'background:'+c.bg+';color:'+c.tx+';border-color:'+c.bd+';'}">${sub.abbr}</div>
            <div class="sub-chip-name">${sub.name}</div>
          </div>`;}).join('')}
        </div>

        <div class="test-form-row">
          <div class="test-form-col">
            <div class="mlbl">Test name</div>
            <input class="minp" id="test-name" type="text" placeholder="e.g. Term 2 Assessment" value="${S.testName}" maxlength="60">
          </div>
          <div class="test-form-col test-form-col-sm">
            <div class="mlbl">Date</div>
            <input class="minp" id="test-date" type="date" value="${S.testDate}">
          </div>
        </div>

        <div class="mlbl">Type</div>
        <div class="test-type-grid">
          ${TEST_TYPES.map(t=>`<div class="test-type-btn${S.testType===t?' on':''}" data-action="sel-test-type" data-type="${t}">${t}</div>`).join('')}
        </div>

        <div class="mlbl">Score</div>
        <div class="score-input-wrap">
          <div class="score-input-row">
            <input type="number" id="test-score" placeholder="72" min="0" value="${S.testScore}" inputmode="decimal">
            <div class="score-divider">/</div>
            <input type="number" id="test-outof" placeholder="100" min="1" value="${S.testOutOf}" inputmode="decimal">
          </div>
          <div class="score-preview" style="${pct?'':'display:none;'}">
            ${pct?`<div class="score-preview-pct" style="color:${grade.color};">${pct}%</div>
            <div class="score-preview-grade" style="color:${grade.color};">${grade.letter}</div>`:''}
          </div>
        </div>

        <div class="test-next-section">
          <div class="mlbl" style="margin-bottom:2px;">Next test <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional — enables countdown</span></div>
          <div class="test-form-row">
            <div class="test-form-col">
              <input class="minp" id="test-next-name" type="text" placeholder="e.g. Trial HSC" value="${esc(S.testNextName||'')}" maxlength="60">
            </div>
            <div class="test-form-col test-form-col-sm">
              <input class="minp" id="test-next-date" type="date" value="${S.testNextDate}" min="${today()}">
            </div>
          </div>
        </div>

        ${S.logErr?`<div class="merr">${S.logErr}</div>`:''}
        <button class="log-submit${canSubmit?' ready':''}" data-action="submit-test">${isEdit?(canSubmit&&selSub?`Update ${selSub.name} score`:'Update Score'):(canSubmit&&selSub?`Save ${selSub.name} score`:'Save Score')}</button>
        <div class="mcancel" data-action="close-modal">Cancel</div>
      </div>
    </div>
  </div>`;
}

function renderLogModal(){
  const{subjects,sessions}=S.data;
  const tElap=timerElap>0&&!timerRunning?Math.max(5,Math.ceil(timerElap/60)):null;
  const selSub=subjects.find(s=>s.id===S.logSub);
  const modules=selSub?getModulesForSubject(selSub):[];
  const selMod=modules.find(m=>m.name===S.logModule);
  const effDur=S.logCustom&&parseInt(S.logCustom)>0?parseInt(S.logCustom):S.logDur;
  const isReady=!!S.logSub;
  const subPicked=S.logStep==='detail'||S.logStep==='ready';
  const isEdit=!!S.editSessId;

  function subProgress(sub){
    const m=subMinsToday(sessions,sub.id);
    return m>0?fmtDur(m):'';
  }

  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal log-modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
        <div style="display:flex;align-items:baseline;justify-content:space-between;">
          <div class="mtitle">${isEdit?'Edit session':'Log a session'}</div>
          <div style="font-family:'DM Mono',monospace;font-size:10px;color:var(--tx3);letter-spacing:.08em;">${new Date().toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'})}</div>
        </div>
        ${tElap?`<div class="msub">⏱ Timer ran for <strong>${fmtDur(tElap)}</strong> — duration pre-filled.</div>`:''}
      </div>
      <div class="modal-body log-body">

        ${subPicked&&selSub?`
          <div class="log-sel-pill" data-action="log-change-sub">
            <span class="log-sel-abb" style="background:${getSubjColor(selSub).bg};color:${getSubjColor(selSub).tx};border:1px solid ${getSubjColor(selSub).bd};">${selSub.abbr}</span>
            <span class="log-sel-name">${selSub.name}</span>
            ${S.logModule?`<span class="log-sel-mod">${S.logModule}</span>`:''}
            <span class="log-sel-change">change</span>
          </div>
        `:''}

        <div class="log-section${subPicked&&!isEdit?' collapsed':''}">
          <div class="mlbl">Subject</div>
          <div class="sub-chips-grid">
            ${subjects.map(sub=>{
              const c=getSubjColor(sub);
              const prog=subProgress(sub);
              return`<div class="sub-chip-item${S.logSub===sub.id?' on':''}" data-action="sel-sub" data-sub="${sub.id}">
                <div class="sub-chip-abb" style="${S.logSub===sub.id?'':'background:'+c.bg+';color:'+c.tx+';border-color:'+c.bd+';'}">${sub.abbr}</div>
                <div style="flex:1;min-width:0;">
                  <div class="sub-chip-name">${sub.name}</div>
                  ${prog?`<div class="sub-chip-prog">${prog} today</div>`:''}
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>

        ${subPicked&&selSub&&modules.length?`
          <div class="log-section log-modules">
            <div class="mlbl">Module <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional</span></div>
            <div class="module-grid">
              ${modules.map(m=>`<div class="module-chip${S.logModule===m.name?' on':''}" data-action="sel-module" data-module="${m.name}">${m.name}</div>`).join('')}
            </div>
          </div>
          ${selMod&&selMod.iqs.length?`
            <div class="log-section log-iqs">
              <div class="mlbl">Inquiry Question <span style="color:var(--tx3);font-size:11px;font-weight:300;">optional</span></div>
              <div class="iq-grid">
                <div class="iq-chip${!S.logTopic?' on':''}" data-action="sel-topic" data-topic="">— Any</div>
                ${selMod.iqs.map(iq=>`<div class="iq-chip${S.logTopic===iq?' on':''}" data-action="sel-topic" data-topic="${iq}">${iq}</div>`).join('')}
              </div>
            </div>
          `:''}
        `:''}

      </div>

      <div class="log-footer">
        <div class="log-footer-row">
          <div class="log-dur-compact${S._durOpen?' open':''}" data-action="log-toggle-dur">
            <span class="log-dur-val">${fmtDur(effDur)}</span>
          </div>
          <div class="log-conf-strip">
            ${CE.map((e,i)=>`<div class="log-conf-dot${S.logConf===i+1?' on':''}" data-action="sel-conf" data-conf="${i+1}" title="${CONF[i]}">${e}</div>`).join('')}
          </div>
          <div class="log-extras-toggle${S._extrasOpen?' open':''}" data-action="log-toggle-extras" title="Date & note">···</div>
        </div>

        <div class="log-dur-panel${S._durOpen?' open':''}">
          <div class="dur-grid">
            ${PRESETS.map(d=>`<div class="dur-pill${S.logDur===d&&!S.logCustom?' on':''}" data-action="sel-dur" data-dur="${d}">${fmtDur(d)}</div>`).join('')}
          </div>
          <div class="cust-row" style="margin-top:8px;">
            <input type="number" id="cust-dur" placeholder="Custom" min="1" max="600" value="${S.logCustom}" inputmode="numeric">
            <span>min</span>
          </div>
        </div>

        <div class="log-extras-panel${S._extrasOpen?' open':''}">
          <div class="log-extras-inner">
            <div class="log-extras-row">
              <div style="flex:1;">
                <div class="mlbl" style="margin-bottom:4px;">Date</div>
                <input class="minp" id="log-date" type="date" value="${S.logDate||today()}" max="${today()}" style="margin-bottom:0;">
              </div>
            </div>
            <div style="margin-top:10px;">
              <div class="mlbl" style="margin-bottom:4px;">Note</div>
              <textarea class="noteinp" id="log-note" placeholder="What did you cover?" maxlength="200" style="margin-bottom:0;height:52px;">${S.logNote}</textarea>
            </div>
          </div>
        </div>

        ${S.logErr?`<div class="merr" style="margin-bottom:8px;">${S.logErr}</div>`:''}
        <button class="log-submit${isReady?' ready':''}" data-action="submit-log">${isReady?(isEdit?`Update ${selSub.name} session`:`Log ${fmtDur(effDur)} of ${selSub.name}`):'Select a subject'}</button>
      </div>
    </div>
  </div>`;
}

function renderAddSubjModal(){
  return`<div class="overlay" data-action="close-modal-out">
    <div class="modal">
      <div class="modal-header">
        <div class="mhandle" data-action="close-modal"></div>
        <div class="modal-close-x" data-action="close-modal">✕</div>
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
        <button class="log-submit ready" data-action="save-subj">Add Subject</button>
        <div class="mcancel" data-action="close-modal">Cancel</div>
      </div>
    </div>
  </div>`;
}

/* ════════════════════════════════
   TOAST + FLASH
════════════════════════════════ */
let toastTm=null;
function showToast(msg,icon='✓',html=false){
  const t=document.getElementById('toast');if(!t)return;
  document.getElementById('ti').textContent=icon;
  const tt=document.getElementById('tt');
  if(tt){if(html)tt.innerHTML=msg;else tt.textContent=msg;}
  t.classList.add('show');clearTimeout(toastTm);toastTm=setTimeout(()=>t.classList.remove('show'),4000);
}
let _undoAction=null;
function showUndoToast(msg,undoFn){
  _undoAction=undoFn;
  showToast(`${esc(msg)} <span class="undo-link" id="undo-btn">Undo</span>`,'✕',true);
  // Attach click to undo
  setTimeout(()=>{
    const ub=document.getElementById('undo-btn');
    if(ub)ub.onclick=()=>{if(_undoAction){_undoAction();_undoAction=null;}document.getElementById('toast')?.classList.remove('show');};
  },50);
}
function flashGreen(){const el=document.getElementById('flash');if(!el)return;el.classList.remove('go');requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('go')));}

/* ════════════════════════════════
   SMOOTH CLOSE ANIMATIONS
════════════════════════════════ */
function closeModalSmooth(){
  const overlay=document.querySelector('.overlay');
  const modal=document.querySelector('.modal');
  if(!overlay){S.modal=null;document.body.classList.remove('modal-open');render();return;}
  if(modal){modal.style.transition='transform .22s cubic-bezier(.4,0,1,1)';modal.style.transform='translateY(100%)';}
  overlay.classList.add('closing');
  setTimeout(()=>{S.modal=null;document.body.classList.remove('modal-open');render();},220);
}
function closeMoreSmooth(){
  const sheet=document.getElementById('more-sheet');
  const overlay=document.querySelector('.more-menu-overlay');
  if(!sheet){S.moreMenu=false;render();return;}
  sheet.classList.add('closing');
  if(overlay)overlay.classList.add('closing');
  setTimeout(()=>{S.moreMenu=false;render();},220);
}

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
    if(d.pin!==pin){S.loginErr='Wrong PIN — check caps lock and try again.';render();return;}
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

  'nav-dashboard':()=>{navTo('dashboard');},
  'nav-timetable':()=>{navTo('timetable');},
  'nav-history':()=>{navTo('history');},
  'nav-stats':()=>{navTo('stats');},
  'nav-assess':()=>{navTo('assess');},
  'nav-todo':()=>{navTo('todo');},

  // ── Assessment tracker actions ──
  'open-add-assess':()=>{S._assessEdit=null;S.modal='add-assess';document.body.classList.add('modal-open');render();},
  'assess-edit':(btn)=>{
    const a=(S.data.assessments||[]).find(x=>x.id===btn.dataset.id);
    if(!a)return;
    S._assessEdit={...a};S.modal='add-assess';document.body.classList.add('modal-open');render();
  },
  'save-assess':()=>{
    const name=document.getElementById('assess-name')?.value?.trim();
    const date=document.getElementById('assess-date')?.value;
    if(!name||!date){showToast('Name and date are required.','!');return;}
    const subject=document.getElementById('assess-sub')?.value||null;
    const type=document.getElementById('assess-type')?.value||'Assessment';
    const weightRaw=parseInt(document.getElementById('assess-weight')?.value||'');
    const weight=isNaN(weightRaw)||weightRaw<1||weightRaw>100?null:weightRaw;
    const notes=document.getElementById('assess-notes')?.value?.trim()||'';
    if(!S.data.assessments)S.data.assessments=[];
    if(S._assessEdit){
      const idx=S.data.assessments.findIndex(x=>x.id===S._assessEdit.id);
      if(idx>-1)S.data.assessments[idx]={...S.data.assessments[idx],name,date,subject,type,weight,notes};
    } else {
      S.data.assessments.push({id:uid(),name,date,subject,type,weight,notes,done:false,created:today()});
    }
    saveLocal(S.data);triggerSync();S.modal=null;S._assessEdit=null;document.body.classList.remove('modal-open');render();
    showToast(S._assessEdit?'Assessment updated.':'Assessment added.','✓');
  },
  'assess-done':(btn)=>{
    const a=(S.data.assessments||[]).find(x=>x.id===btn.dataset.id);
    if(!a)return;
    a.done=true;a.doneAt=Date.now();
    saveLocal(S.data);triggerSync();S.modal=null;document.body.classList.remove('modal-open');render();showToast('Marked done!','✓');
  },
  'assess-del':(btn)=>{
    if(!confirm('Delete this assessment?'))return;
    S.data.assessments=(S.data.assessments||[]).filter(x=>x.id!==btn.dataset.id);
    saveLocal(S.data);triggerSync();S.modal=null;document.body.classList.remove('modal-open');render();showToast('Deleted.','✓');
  },

  // ── To-Do actions ──
  'todo-quick-add':()=>{
    const input=document.getElementById('todo-new-input');
    const text=input?.value?.trim();
    if(!text)return;
    if(!S.data.todos)S.data.todos=[];
    S.data.todos.push({id:uid(),text,done:false,created:today(),due:null,subject:null});
    saveLocal(S.data);triggerSync();input.value='';render();
  },
  'todo-toggle':(btn)=>{
    const t=(S.data.todos||[]).find(x=>x.id===btn.dataset.id);
    if(!t)return;
    t.done=!t.done;if(t.done)t.doneAt=Date.now();else delete t.doneAt;
    saveLocal(S.data);triggerSync();render();
  },
  'todo-edit':(btn)=>{
    const t=(S.data.todos||[]).find(x=>x.id===btn.dataset.id);
    if(!t)return;
    S._todoEdit={...t};S.modal='todo-edit';document.body.classList.add('modal-open');render();
  },
  'todo-save-edit':()=>{
    const text=document.getElementById('todo-edit-text')?.value?.trim();
    if(!text)return;
    const due=document.getElementById('todo-edit-due')?.value||null;
    const subject=document.getElementById('todo-edit-sub')?.value||null;
    const idx=(S.data.todos||[]).findIndex(x=>x.id===S._todoEdit?.id);
    if(idx>-1){S.data.todos[idx]={...S.data.todos[idx],text,due:due||null,subject:subject||null};}
    saveLocal(S.data);triggerSync();S.modal=null;S._todoEdit=null;document.body.classList.remove('modal-open');render();
  },
  'todo-del':(btn)=>{
    S.data.todos=(S.data.todos||[]).filter(x=>x.id!==btn.dataset.id);
    saveLocal(S.data);triggerSync();render();
  },
  'skip-break':()=>{skipBreak();},
  'nav-timer':()=>{navTo('timer');},
  'nav-settings':()=>{navTo('settings');},
  'nav-leaderboard':()=>{
    S.view='leaderboard';S.modal=null;S.moreMenu=false;
    if(!S.lbData&&!S.lbLoading){
      S.lbLoading=true;
      const content=document.getElementById('page-content');
      if(content)content.scrollTop=0;
      render();
      lbPush().then(()=>lbGetCached(true)).then(d=>{
        S.lbData=d;S.lbLoading=false;
        // Pre-fetch teams if user has any
        if(S.lbTeams.length&&!Object.keys(S.lbTeamData).length)fetchAllUserTeams().then(()=>{if(S.view==='leaderboard')render();});
        if(S.view==='leaderboard')render();
      });
    } else render();
  },
  'lb-tab':(btn)=>{
    S.lbTab=parseInt(btn.dataset.tab);
    S.lbTeamView=null;S.lbTeamVs=null;
    if(S.lbTab===2&&S.lbTeams.length&&!Object.keys(S.lbTeamData).length){
      S.lbTeamLoading=true;render();
      fetchAllUserTeams().then(()=>{S.lbTeamLoading=false;render();});
    }else render();
  },
  'lb-sort':(btn)=>{S.lbSort=btn.dataset.key;render();},
  'lb-pick-rival':(btn)=>{S.lbRival=btn.dataset.uid;S.lbTab=1;render();},
  'lb-clear-rival':()=>{S.lbRival=null;render();},
  'lb-h2h-mode':(btn)=>{S.lbH2hMode=btn.dataset.key;render();},
  'lb-share':()=>{
    const url=window.location.href;
    if(navigator.share){navigator.share({title:'Meridian — Study Tracker',text:'Join me on Meridian and let\'s compete!',url}).catch(()=>{});}
    else{navigator.clipboard.writeText(url).then(()=>showToast('Link copied','📋')).catch(()=>showToast('Could not copy','!'));}
  },
  'lb-refresh':()=>{
    S.lbLoading=true;render();
    lbPush().then(()=>lbGetCached(true)).then(async d=>{
      S.lbData=d;
      if(S.lbTeams.length)await fetchAllUserTeams();
      S.lbLoading=false;render();showToast('Leaderboard updated','🏆');
    });
  },
  'lb-del-entry':async(btn)=>{
    const uid=btn.dataset.uid;if(!uid)return;
    if(!confirm('Delete this duplicate entry from the leaderboard?'))return;
    try{
      const db=await getFirestoreDb();if(!db)return;
      const{doc,deleteDoc}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
      await deleteDoc(doc(db,'leaderboard',uid));
      S.lbData=(S.lbData||[]).filter(r=>r.userId!==uid);
      render();showToast('Duplicate removed','✕');
    }catch(e){showToast('Failed to delete','!');}
  },

  // ── Teams ──
  'team-create':()=>{
    S.modal='team-create';document.body.classList.add('modal-open');render();
  },
  'team-pick-subj':(btn)=>{
    S._teamSubject=btn.dataset.subj||null;
    document.querySelectorAll('.team-subj-chip').forEach(el=>el.classList.toggle('on',(el.dataset.subj||'')===(S._teamSubject||'')));
  },
  'team-create-submit':async()=>{
    const nameEl=document.getElementById('team-name-input');
    const name=(nameEl?.value||'').trim();
    if(!name){showToast('Enter a team name','!');return;}
    if(name.length>30){showToast('Name too long (max 30)','!');return;}
    const btn=document.querySelector('[data-action="team-create-submit"]');
    if(btn){btn.disabled=true;btn.textContent='Creating…';}
    const team=await createTeam(name,S._teamSubject||null);
    S._teamSubject=null;
    if(team){
      S.modal=null;document.body.classList.remove('modal-open');
      S.lbTab=2;S.lbTeamView=team.id;
      render();showToast('Team created! Code: '+team.code,'👥');
    }else{
      showToast('Failed to create team','!');
      if(btn){btn.disabled=false;btn.textContent='Create team';}
    }
  },
  'team-join-prompt':()=>{
    S.modal='team-join';document.body.classList.add('modal-open');render();
  },
  'team-join-submit':async()=>{
    const codeEl=document.getElementById('team-code-input');
    const code=(codeEl?.value||'').trim().toUpperCase();
    if(!code||code.length!==6){showToast('Enter a 6-character team code','!');return;}
    const btn=document.querySelector('[data-action="team-join-submit"]');
    if(btn){btn.disabled=true;btn.textContent='Joining…';}
    const result=await joinTeam(code);
    if(result.ok){
      S.modal=null;document.body.classList.remove('modal-open');
      S.lbTab=2;S.lbTeamView=result.team.id;
      render();showToast('Joined '+result.team.name+'!','👥');
    }else{
      showToast(result.msg||'Failed to join','!');
      if(btn){btn.disabled=false;btn.textContent='Join team';}
    }
  },
  'team-view':async(btn)=>{
    const id=btn.dataset.id;if(!id)return;
    S.lbTeamView=id;
    if(!S.lbTeamData[id]){
      S.lbTeamLoading=true;render();
      await fetchTeam(id);
      S.lbTeamLoading=false;
    }
    render();
  },
  'team-back':()=>{S.lbTeamView=null;S.lbTeamVs=null;render();},
  'team-copy-code':(btn)=>{
    const code=btn.dataset.code;
    navigator.clipboard?.writeText(code).then(()=>showToast('Code copied: '+code,'📋')).catch(()=>showToast(code,'📋'));
  },
  'team-leave':async(btn)=>{
    const id=btn.dataset.id;if(!id)return;
    const team=S.lbTeamData[id];
    const msg=team?.createdBy===getLbUserId()&&(team.members||[]).length<=1?'Delete this team?':'Leave this team?';
    if(!confirm(msg))return;
    const ok=await leaveTeam(id);
    if(ok){S.lbTeamView=null;render();showToast('Left team','👥');}
    else showToast('Failed to leave team','!');
  },
  'team-toggle-subj':()=>{S._editTeamSubj=!S._editTeamSubj;render();},
  'team-set-subj':async(btn)=>{
    const subj=btn.dataset.subj||null;
    const tid=btn.dataset.tid;
    if(!tid)return;
    const ok=await updateTeamSubject(tid,subj);
    if(ok){
      S._editTeamSubj=false;
      // Update local team list name reference
      const local=S.lbTeams.find(t=>t.id===tid);
      if(local)local.subject=subj;
      saveTeamsList();
      render();showToast(subj?'Subject set to '+subj:'Subject cleared','✓');
    }else showToast('Failed to update subject','!');
  },
  'team-vs':(btn)=>{
    S.lbTeamVs=[btn.dataset.a,btn.dataset.b];render();
  },
  'team-clear-vs':()=>{S.lbTeamVs=null;render();},

  'tt-tab':(btn)=>{S.ttTab=parseInt(btn.dataset.tab);render();},

  'open-log':()=>{
    S.modal='log';S.logNote='';S.logErr='';S.logCustom='';S.logModule=null;S.logTopic=null;S._durOpen=false;S._extrasOpen=false;S.logDate='';S.editSessId=null;S.logConf=3;
    S.logDur=timerElap>0&&!timerRunning?Math.max(5,Math.ceil(timerElap/60)):45;
    S.logSub=S.data.timetable?getSmartSubject(S.data.timetable,S.data.subjects):null;
    S.logStep=S.logSub?'detail':'subject';
    document.body.classList.add('modal-open');render();
  },
  'quick-log':(btn)=>{S.modal='log';S.logSub=btn.dataset.subject;S.logDur=45;S.logConf=3;S.logNote='';S.logErr='';S.logCustom='';S.logModule=null;S.logTopic=null;S._durOpen=false;S._extrasOpen=false;S.logDate='';S.editSessId=null;S.logStep='detail';document.body.classList.add('modal-open');render();},
  'relog':(btn)=>{
    const s=(S.data.sessions||[]).find(x=>x.id===btn.dataset.id);if(!s)return;
    S.modal='log';S.logSub=s.subject;S.logDur=s.duration;S.logConf=s.confidence||3;S.logModule=s.module||null;S.logTopic=s.topic||null;S.logNote='';S.logErr='';S.logCustom='';S._durOpen=false;S._extrasOpen=false;S.logDate='';S.editSessId=null;S.logStep='detail';
    document.body.classList.add('modal-open');render();
  },
  'edit-sess':(btn)=>{
    const s=(S.data.sessions||[]).find(x=>x.id===btn.dataset.id);if(!s)return;
    S.modal='log';S.editSessId=s.id;S.logSub=s.subject;S.logDur=s.duration;S.logConf=s.confidence||3;S.logModule=s.module||null;S.logTopic=s.topic||null;S.logNote=s.note||'';S.logErr='';S.logCustom='';S._durOpen=false;S._extrasOpen=!!(s.note||(s.date&&s.date!==today()));S.logDate=s.date||'';S.logStep='detail';
    document.body.classList.add('modal-open');render();
  },
  'close-modal':()=>{closeModalSmooth();},
  'close-modal-out':(btn,e)=>{if(e.target.classList.contains('overlay'))closeModalSmooth();},

  'sel-sub':(btn)=>{
    S.logSub=btn.dataset.sub;S.logModule=null;S.logTopic=null;S.logStep='detail';
    const overlay=document.querySelector('.overlay');
    if(overlay){overlay.outerHTML=renderLogModal();}
  },
  'log-change-sub':()=>{
    S.logStep='subject';S.logModule=null;S.logTopic=null;
    const overlay=document.querySelector('.overlay');
    if(overlay){overlay.outerHTML=renderLogModal();}
  },
  'log-toggle-dur':()=>{
    S._durOpen=!S._durOpen;
    document.querySelector('.log-dur-panel')?.classList.toggle('open',S._durOpen);
    document.querySelector('.log-dur-compact')?.classList.toggle('open',S._durOpen);
  },
  'log-toggle-extras':()=>{
    S._extrasOpen=!S._extrasOpen;
    document.querySelector('.log-extras-panel')?.classList.toggle('open',S._extrasOpen);
    document.querySelector('.log-extras-toggle')?.classList.toggle('open',S._extrasOpen);
    if(S._extrasOpen)setTimeout(()=>document.getElementById('log-note')?.focus(),100);
  },
  'sel-dur':(btn)=>{
    S.logDur=parseInt(btn.dataset.dur);S.logCustom='';
    document.querySelectorAll('.dur-pill').forEach(el=>el.classList.toggle('on',parseInt(el.dataset.dur)===S.logDur));
    const ci=document.getElementById('cust-dur');if(ci)ci.value='';
    updateLogSubmitText();
    // Auto-close duration panel
    setTimeout(()=>{
      S._durOpen=false;
      document.querySelector('.log-dur-panel')?.classList.remove('open');
      document.querySelector('.log-dur-compact')?.classList.remove('open');
    },250);
  },
  'sel-conf':(btn)=>{
    S.logConf=parseInt(btn.dataset.conf);
    document.querySelectorAll('.log-conf-dot').forEach(el=>el.classList.toggle('on',parseInt(el.dataset.conf)===S.logConf));
  },

  'sel-module':(btn)=>{
    const mod=btn.dataset.module||null;
    S.logModule=S.logModule===mod?null:mod;
    S.logTopic=null;
    const overlay=document.querySelector('.overlay');
    if(overlay){overlay.outerHTML=renderLogModal();}
  },
  'sel-topic':(btn)=>{
    S.logTopic=btn.dataset.topic||null;
    document.querySelectorAll('.iq-chip').forEach(el=>el.classList.toggle('on',el.dataset.topic===btn.dataset.topic));
  },

  'submit-log':()=>{
    if(!S.logSub){
      document.querySelector('.sub-chips-grid,.chips')?.animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-5px)'},{transform:'translateX(0)'}],{duration:280});
      return;
    }
    const note=document.getElementById('log-note')?.value?.trim()||'';
    const cust=document.getElementById('cust-dur')?.value;
    const dur=cust&&parseInt(cust)>0?parseInt(cust):S.logDur;
    const logDate=document.getElementById('log-date')?.value||today();
    if(S.editSessId){
      // Update existing session
      const idx=S.data.sessions.findIndex(x=>x.id===S.editSessId);
      if(idx>=0){
        S.data.sessions[idx]={...S.data.sessions[idx],subject:S.logSub,duration:dur,confidence:S.logConf,note,module:S.logModule||null,topic:S.logTopic||null,date:logDate};
      }
      saveLocal(S.data);triggerSync();triggerLbPush();
      S.modal=null;S.logModule=null;S.logTopic=null;S.editSessId=null;document.body.classList.remove('modal-open');
      render();showToast('Session updated.','✓');
      return;
    }
    const sess={id:uid(),date:logDate,subject:S.logSub,duration:dur,confidence:S.logConf,note,module:S.logModule||null,topic:S.logTopic||null,ts:Date.now()};
    S.data.sessions.push(sess);saveLocal(S.data);triggerSync();triggerLbPush();
    S.modal=null;S.logModule=null;S.logTopic=null;S.editSessId=null;document.body.classList.remove('modal-open');
    const sub=S.data.subjects.find(x=>x.id===S.logSub);
    const modStr=sess.module?` · ${sess.module}`:'';
    const topicStr=sess.topic?` · ${sess.topic}`:'';
    const msgs=[
      `${sub?.name}${modStr} — ${fmtDur(dur)} logged.`,
      `${fmtDur(dur)} of ${sub?.name}. Streak: ${getStreak(S.data.sessions)} days.`,
      `${sub?.name} ✓${topicStr}`,
      `${fmtDur(dur)} closer to 99.95.`
    ];
    render();flashGreen();showToast(msgs[Math.floor(Math.random()*msgs.length)]);
    // Retrieval practice nudge — after every ~3rd session, prompt recall
    const sessCount=S.data.sessions.filter(s=>s.subject!=='grace').length;
    const recallLabel=sess.topic||sess.module;
    if(sessCount%3===0&&recallLabel){
      setTimeout(()=>showToast(`Quick recall: Can you name 3 key things from ${recallLabel}? Just thinking about it boosts retention.`,'🧠'),2500);
    } else {
      // Variable reward — 25% chance of bonus message
      const bonus=getVariableReward();
      if(bonus){setTimeout(()=>showToast(bonus.msg,bonus.type==='challenge'?'🎯':bonus.type==='fact'?'🧠':'✨'),2200);}
    }
  },

  // Auto-login actions
  'auto-login':()=>{
    const d=migrateData(loadLocal());
    if(!d){render();return;}
    localStorage.setItem(AUTH_KEY,'1');
    S.data=d;S.view='dashboard';
    render();startLiveTick();
  },
  'show-pin-entry':()=>{S.showPinEntry=true;S.loginMode='login';render();setTimeout(()=>document.getElementById('li-pin')?.focus(),60);},

  'toggle-more':()=>{
    if(S.moreMenu){closeMoreSmooth();}
    else{S.moreMenu=true;render();}
  },
  'close-more':()=>{closeMoreSmooth();},
  'more-nav':(btn)=>{const v=btn.dataset.view;S.moreMenu=false;S.modal=null;navTo(v);if(v==='papers'&&!S.papersData&&!S.papersLoading){S.papersLoading=true;loadPapersData().then(d=>{S.papersData=d;S.papersLoading=false;if(S.view==='papers')render();});}if(v==='leaderboard'&&!S.lbData&&!S.lbLoading){S.lbLoading=true;render();lbPush().then(()=>lbGetCached(true)).then(d=>{S.lbData=d;S.lbLoading=false;if(S.view==='leaderboard')render();});}},
  'nav-progress':()=>{navTo('progress');},
  'prog-tab':(btn)=>{S.progTab=parseInt(btn.dataset.tab);render();},

  // ── Papers library ──
  'nav-papers':()=>{
    // Kick off load if not cached
    if(!S.papersData && !S.papersLoading){
      S.papersLoading=true;
      loadPapersData().then(d=>{S.papersData=d;S.papersLoading=false;if(S.view==='papers')render();});
    }
    navTo('papers');
    // Render thumbs after paint
    setTimeout(renderPaperThumbs, 200);
  },
  'hist-filter-sub':(btn)=>{S.histSubFilter=btn.dataset.val;render();},
  'hist-filter-conf':(btn)=>{S.histConfFilter=btn.dataset.val;render();},
  'sel-statsRange':(btn)=>{S.statsRange=btn.dataset.val;render();},
  'papers-filter-sub':(btn)=>{S.papersSubFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-filter-yr':(btn)=>{S.papersYrFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-filter-src':(btn)=>{S.papersSrcFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-sort-chip':(btn)=>{S.papersSort=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-filter-type':(btn)=>{S.papersTypeFilter=btn.dataset.val;render();setTimeout(renderPaperThumbs,200);},
  'papers-search':()=>{/* handled by input listener */},
  'papers-clear-filters':()=>{S.papersSubFilter='All';S.papersYrFilter='All';S.papersTypeFilter='All';S.papersSrcFilter='All';S.papersSearch='';render();setTimeout(renderPaperThumbs,200);},
  'papers-reload':()=>{papersCache=null;S.papersData=null;S.papersLoading=true;render();loadPapersData(true).then(d=>{S.papersData=d;S.papersLoading=false;render();setTimeout(renderPaperThumbs,200);});},

  'open-paper-ext':(btn)=>{
    window.open(btn.dataset.url,'_blank','noopener');
  },
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
    S.modal='logscore';S.editTestId=null;
    S.testSub=null;S.testScore='';S.testOutOf=100;
    S.testName='';S.testType='Test';S.testDate=today();
    S.testNextDate='';S.testNextName='';S.logErr='';
    document.body.classList.add('modal-open');render();
  },
  'edit-test':(btn)=>{
    const t=(S.data.tests||[]).find(x=>x.id===btn.dataset.id);
    if(!t)return;
    S.modal='logscore';S.editTestId=t.id;
    S.testSub=t.subject;S.testScore=String(t.score);S.testOutOf=t.outOf||100;
    S.testName=t.name||'';S.testType=t.type||'Test';S.testDate=t.date||today();
    S.testNextDate=t.nextTestDate||'';S.testNextName=t.nextTestName||'';S.logErr='';
    document.body.classList.add('modal-open');render();
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
    if(S.editTestId){
      // Update existing test
      const idx=S.data.tests.findIndex(x=>x.id===S.editTestId);
      if(idx>=0){
        S.data.tests[idx]={...S.data.tests[idx],subject:S.testSub,name,score,outOf,date,type:S.testType,nextTestDate:nextDate||null,nextTestName:nextName||null};
      }
    } else {
      const t={
        id:uid(),subject:S.testSub,name,score,outOf,date,
        type:S.testType,ts:Date.now(),
        nextTestDate:nextDate||null,nextTestName:nextName||null,
      };
      S.data.tests.push(t);
    }
    saveLocal(S.data);triggerSync();triggerLbPush();
    S.modal=null;S.editTestId=null;document.body.classList.remove('modal-open');
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
    const removed=(S.data.tests||[]).find(t=>t.id===btn.dataset.id);if(!removed)return;
    S.data.tests=(S.data.tests||[]).filter(t=>t.id!==btn.dataset.id);
    saveLocal(S.data);triggerSync();render();
    showUndoToast('Score removed.',()=>{if(!S.data.tests)S.data.tests=[];S.data.tests.push(removed);saveLocal(S.data);triggerSync();render();});
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
        if(popupErr.code==='auth/unauthorized-domain'){
          const domain=location.hostname;
          showToast(`Add ${domain} to Firebase → Auth → Authorized domains`,'!');
          return;
        }
        if(popupErr.code==='auth/popup-blocked'||popupErr.code==='auth/cancelled-popup-request'||popupErr.message?.includes('Cross-Origin-Opener-Policy')){
          try{await signInWithRedirect(auth,provider);}catch(redirErr){
            if(redirErr.code==='auth/unauthorized-domain'){showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');return;}
            throw redirErr;
          }
        }else throw popupErr;
      }
    }catch(e){
      if(e.code==='auth/popup-closed-by-user')showToast('Sign-in cancelled.','!');
      else if(e.code==='auth/unauthorized-domain')showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');
      else if(e.message?.includes('INTERNAL ASSERTION'))showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');
      else showToast('Google sign-in failed: '+(e.code||e.message),'!');
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
        if(popupErr.code==='auth/unauthorized-domain'){
          showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');
          return;
        }
        if(popupErr.code==='auth/popup-blocked'||popupErr.code==='auth/cancelled-popup-request'||popupErr.message?.includes('Cross-Origin-Opener-Policy')){
          try{await signInWithRedirect(auth,provider);}catch(redirErr){
            if(redirErr.code==='auth/unauthorized-domain'){showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');return;}
            throw redirErr;
          }
        }else throw popupErr;
      }
    }catch(e){
      if(e.code==='auth/popup-closed-by-user')showToast('Sign-in cancelled.','!');
      else if(e.code==='auth/unauthorized-domain')showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');
      else if(e.message?.includes('INTERNAL ASSERTION'))showToast(`Add ${location.hostname} to Firebase → Auth → Authorized domains`,'!');
      else showToast('GitHub sign-in failed: '+(e.code||e.message),'!');
    }
  },

  'del-sess':(btn)=>{
    const removed=S.data.sessions.find(s=>s.id===btn.dataset.id);if(!removed)return;
    S.data.sessions=S.data.sessions.filter(s=>s.id!==btn.dataset.id);saveLocal(S.data);triggerSync();render();
    showUndoToast('Session removed.',()=>{S.data.sessions.push(removed);saveLocal(S.data);triggerSync();render();});
  },

  'use-grace':()=>{
    if(!confirm('Use your weekly grace day? Streak protected today.'))return;
    S.data.graceUsed=today();
    S.data.sessions.push({id:uid(),date:today(),subject:'grace',duration:0,confidence:3,note:'Grace day',ts:Date.now()});
    saveLocal(S.data);triggerSync();render();showToast('Grace day used. Back at it tomorrow.');
  },

  // Timer
  'set-timer':(btn)=>{timerTarget=parseInt(btn.dataset.dur)*60;resetTimer();render();},
  'timer-start':()=>{startTimer();if(S.timerBg!=='none'&&S.timerAudio)Ambient.play(S.timerBg);render();},
  'timer-pause':()=>{pauseTimer();Ambient.stop();render();},
  'timer-reset':()=>{resetTimer();Ambient.stop();render();},
  'set-timer-font':(btn)=>{
    S.timerFont=btn.dataset.font||'default';
    localStorage.setItem('mer_timer_font',S.timerFont);
    render();
  },
  'timer-enter-focus':()=>{
    S.timerFocus=true;render();
  },
  'timer-exit-focus':()=>{
    S.timerFocus=false;render();
  },
  'set-timer-bg':(btn)=>{
    S.timerBg=btn.dataset.bg||'none';
    localStorage.setItem('mer_timer_bg',S.timerBg);
    if(timerRunning&&S.timerBg!=='none'&&S.timerAudio)Ambient.play(S.timerBg);
    else Ambient.stop();
    render();
  },
  'toggle-timer-audio':()=>{
    S.timerAudio=!S.timerAudio;
    localStorage.setItem('mer_timer_audio',S.timerAudio?'1':'0');
    if(!S.timerAudio)Ambient.stop();
    else if(timerRunning&&S.timerBg!=='none')Ambient.play(S.timerBg);
    render();
  },

  // Settings
  'save-account':()=>{
    const name=document.getElementById('sname')?.value?.trim();
    const year=parseInt(document.getElementById('syear')?.value||'11');
    const pin=document.getElementById('spin')?.value?.trim();
    if(!name)return;
    if(pin!==undefined&&pin!==''){
      if(pin.length!==4||!/^\d{4}$/.test(pin)){showToast('PIN must be 4 digits','!');return;}
      S.data.pin=pin;
    }
    S.data.name=name;S.data.year=year;saveLocal(S.data);triggerSync();triggerLbPush();render();showToast('Settings saved.','✓');
  },

  'open-add-subj':()=>{S.modal='addsubj';S.newName='';S.newAbbr='';S.newTarget=60;S.logErr='';document.body.classList.add('modal-open');render();},
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
    // Keep Firebase up to date so Google sign-in on other devices can restore this account
    if(r.ok&&S.googleUser?.uid)saveUserData(S.googleUser.uid);
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
  'toggle-notif':async()=>{
    if(!('Notification' in window)){showToast('Notifications not supported in this browser.','!');return;}
    if(Notification.permission==='granted'){showToast('Notifications already enabled. Disable in browser settings.','✓');return;}
    const perm=await Notification.requestPermission();
    if(perm==='granted'){showToast('Streak reminders enabled for 9pm.','🔔');render();}
    else showToast('Permission denied. Enable in browser settings.','!');
  },
  'toggle-dark':()=>{
    S.darkMode=!S.darkMode;
    localStorage.setItem('mer_dark',S.darkMode?'1':'0');
    document.documentElement.setAttribute('data-theme',S.darkMode?'dark':'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',S.darkMode?'#141210':'#F5F2EC');
    render();
  },
  'export-json':()=>{
    const blob=new Blob([JSON.stringify(S.data,null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);
    a.download=`meridian-backup-${today()}.json`;a.click();URL.revokeObjectURL(a.href);
    showToast('Backup downloaded.','↓');
  },
  'import-json':()=>{
    const inp=document.getElementById('json-import-input');
    if(!inp)return;
    inp.onchange=e=>{
      const f=e.target.files?.[0];if(!f)return;
      const reader=new FileReader();
      reader.onload=ev=>{
        try{
          const d=JSON.parse(ev.target.result);
          if(!d.sessions||!d.subjects){showToast('Invalid backup file.','!');return;}
          if(!confirm(`Restore backup? This will replace your current data (${S.data.sessions.length} sessions → ${d.sessions.length} sessions).`))return;
          S.data=d;saveLocal(S.data);triggerSync();render();
          showToast(`Restored ${d.sessions.length} sessions.`,'↑');
        }catch(err){showToast('Could not read file.','!');}
      };
      reader.readAsText(f);inp.value='';
    };
    inp.click();
  },
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
    if(e.target.id==='cust-dur'){
      S.logCustom=e.target.value;const v=parseInt(e.target.value);
      if(v>0){document.querySelectorAll('.dur-pill').forEach(el=>el.classList.remove('on'));}
      updateLogSubmitText();
    }
    if(e.target.id==='log-note')S.logNote=e.target.value;
    if(e.target.id==='log-date')S.logDate=e.target.value;
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
  });

  // Global keyboard shortcuts — on document so they always work
  document.addEventListener('keydown',e=>{
    const noInput=!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
    // Enter in todo quick-add field
    if(e.key==='Enter'&&document.activeElement?.id==='todo-new-input'){A['todo-quick-add']();return;}
    if(e.key==='l'&&!S.modal&&S.data&&noInput){A['open-log']();}
    if(e.key==='t'&&!S.modal&&S.data&&noInput){navTo('timer');return;}
    if(e.key==='d'&&!S.modal&&S.data&&noInput){navTo('dashboard');return;}
    if(e.key==='p'&&!S.modal&&S.data&&noInput){navTo('progress');return;}
    if(e.key==='h'&&!S.modal&&S.data&&noInput){navTo('history');return;}
    if(e.key==='f'&&S.view==='timer'&&!S.modal&&S.data&&noInput){S.timerFocus=!S.timerFocus;render();return;}
    if(e.key==='Escape'){
      if(S.timerFocus){S.timerFocus=false;render();return;}
      if(pdfViewerState){A['close-pdf']();return;}
      if(S.modal){closeModalSmooth();return;}
      if(S.moreMenu){closeMoreSmooth();return;}
      if(S.tutStep){S.tutStep=0;document.getElementById('tut-overlay')?.remove();}
    }
  });

  // ICS file input
  const icsInput=document.getElementById('ics-file-input');
  icsInput.addEventListener('change',e=>{const f=e.target.files?.[0];if(f)handleICSFile(f);icsInput.value='';});

  // ── Swipe-to-dismiss modals & more menu on mobile ──
  let swipeStartY=0,swipeEl=null,swipeDelta=0,swipeType=null,swipeLastY=0,swipeLastT=0,swipeVelocity=0;
  root.addEventListener('touchstart',e=>{
    // Check more-menu sheet first
    const moreSheet=e.target.closest('.more-menu');
    if(moreSheet){
      swipeStartY=e.touches[0].clientY;swipeEl=moreSheet;swipeDelta=0;swipeType='more';
      swipeLastY=swipeStartY;swipeLastT=Date.now();swipeVelocity=0;
      return;
    }
    // Then check modals — allow swipe from top 120px, handle, or header
    const modal=e.target.closest('.modal');
    if(!modal)return;
    const rect=modal.getBoundingClientRect();
    const touchY=e.touches[0].clientY;
    const isHandle=e.target.closest('.mhandle')||e.target.closest('.modal-header');
    if(touchY-rect.top>120&&!isHandle)return;
    swipeStartY=e.touches[0].clientY;swipeEl=modal;swipeDelta=0;swipeType='modal';
    swipeLastY=swipeStartY;swipeLastT=Date.now();swipeVelocity=0;
  },{passive:true});
  root.addEventListener('touchmove',e=>{
    if(!swipeEl)return;
    const curY=e.touches[0].clientY;
    const now=Date.now();
    const dt=now-swipeLastT;
    if(dt>0)swipeVelocity=(curY-swipeLastY)/dt; // px/ms
    swipeLastY=curY;swipeLastT=now;
    swipeDelta=curY-swipeStartY;
    if(swipeDelta>0){
      swipeEl.classList.add('swiping');
      const resist=swipeType==='more'?swipeDelta:swipeDelta*0.8;
      swipeEl.style.transform=`translateY(${resist}px)`;
      if(swipeType==='more'){
        const overlay=document.querySelector('.more-menu-overlay');
        if(overlay)overlay.style.opacity=Math.max(0,1-swipeDelta/200);
      }
    }
  },{passive:true});
  root.addEventListener('touchend',()=>{
    if(!swipeEl)return;
    // Dismiss if past threshold OR flicked fast (velocity > 0.4 px/ms)
    const threshold=swipeType==='more'?50:80;
    const flicked=swipeVelocity>0.4;
    if(swipeDelta>threshold||flicked){
      // Calculate remaining distance and match finger velocity
      const elRect=swipeEl.getBoundingClientRect();
      const remaining=window.innerHeight-elRect.top;
      // Duration based on velocity — clamp between 120ms and 300ms
      const speed=Math.max(swipeVelocity,0.5); // min speed so it doesn't hang
      const dur=Math.min(300,Math.max(120,remaining/speed));
      swipeEl.classList.remove('swiping');
      swipeEl.style.transition=`transform ${dur}ms cubic-bezier(.4,0,1,1)`;
      swipeEl.style.transform=`translateY(100%)`;
      if(swipeType==='more'){
        const overlay=document.querySelector('.more-menu-overlay');
        if(overlay){overlay.style.transition=`opacity ${dur}ms ease`;overlay.style.opacity='0';}
        setTimeout(()=>{S.moreMenu=false;render();},dur);
      }else{
        setTimeout(()=>{S.modal=null;document.body.classList.remove('modal-open');render();},dur);
      }
    }else if(swipeEl){
      swipeEl.classList.remove('swiping');
      swipeEl.style.transition='transform .2s cubic-bezier(.32,.72,0,1)';
      swipeEl.style.transform='';
      setTimeout(()=>{if(swipeEl)swipeEl.style.transition='';},200);
      if(swipeType==='more'){
        const overlay=document.querySelector('.more-menu-overlay');
        if(overlay){overlay.style.transition='opacity .2s ease';overlay.style.opacity='';setTimeout(()=>{if(overlay)overlay.style.transition='';},200);}
      }
    }
    swipeEl=null;swipeDelta=0;swipeType=null;
  },{passive:true});
}

// Shared auth result handler (used by popup and redirect flows)
window._meridianHandleAuthResult=async function(result,provider='Google'){
  const user=result.user;
  S.googleUser={name:user.displayName,email:user.email,photo:user.photoURL,uid:user.uid};
  if(S.loginMode==='register'&&!S.loginName){S.loginName=user.displayName?.split(' ')[0]||user.email?.split('@')[0]||'';}

  const d=migrateData(loadLocal());
  if(d){
    // ── Local data exists: sign in normally ──
    localStorage.setItem(AUTH_KEY,'1');
    S.data=d;S.view='dashboard';render();startLiveTick();
    showToast('Signed in with '+provider+'.','✓');
    // In background: save to Firebase so this account is restorable on any device via Google
    saveUserData(user.uid);
  } else {
    // ── No local data: try to restore from Firebase ──
    S._authRestoring=true;render();
    let restored=false;
    try{
      const record=await loadUserData(user.uid);
      if(record?.data){
        const restoredData=migrateData(record.data);
        if(restoredData?.name){
          // Restore the same leaderboard UID so the board entry is consistent across devices
          if(record.lbUid)localStorage.setItem('mer_lb_uid',record.lbUid);
          S.data=restoredData;
          saveLocal(S.data);
          localStorage.setItem(AUTH_KEY,'1');
          S._authRestoring=false;
          S.view='dashboard';render();startLiveTick();
          showToast('Account restored — welcome back!','✓');
          triggerLbPush();
          restored=true;
        }
      }
    }catch(e){console.warn('Auth restore failed:',e);}
    if(!restored){
      // No registry or pull failed — fall through to register flow
      S._authRestoring=false;
      S.loginMode='register';
      S.loginName=user.displayName?.split(' ')[0]||user.email?.split('@')[0]||'';
      S.regStep=2; // skip name step since we got it from Google
      showToast('Signed in with '+provider+'. Complete setup below.','✓');
      render();
    }
  }
};

/* ════════════════════════════════
   INIT
════════════════════════════════ */
(async function init(){
  // Dark mode init
  if(S.darkMode){document.documentElement.setAttribute('data-theme','dark');document.querySelector('meta[name="theme-color"]')?.setAttribute('content','#141210');}
  const d=loadLocal();
  const authed=localStorage.getItem(AUTH_KEY);
  // Localhost: skip login entirely, create default account if needed
  if(IS_LOCAL){
    if(d){
      if(!d.timetable)d.timetable=[];
      if(!d.tests)d.tests=[];
      S.data=d;
    }else{
      S.data=newAccount('Local','0000',11,DEFAULT_SUBS.slice());
      saveLocal(S.data);
    }
    S.view='dashboard';
    localStorage.setItem(AUTH_KEY,'1');
  } else if(d){
    if(!d.timetable)d.timetable=[];
    if(!d.tests)d.tests=[];
    // Auto-login: if authed flag set, go straight to dashboard
    if(authed){
      S.data=d;S.view='dashboard';
    }
    // else: show auto-auth screen (already handled in renderLogin)
  }
  render();attach();
  if(S.data){startLiveTick();if(!IS_LOCAL){lbPush().then(()=>lbGetCached(true)).then(d2=>{if(d2){S.lbData=d2;if(S.view==='dashboard'||S.view==='leaderboard')render();}}).catch(()=>{});}}
  // Check for redirect sign-in result (skip on localhost)
  if(window.FIREBASE_CONFIG&&!IS_LOCAL){
    try{
      const fbApp=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const{getAuth,getRedirectResult}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const app=fbApp.getApps().length?fbApp.getApp():fbApp.initializeApp(window.FIREBASE_CONFIG);
      const result=await getRedirectResult(getAuth(app));
      if(result&&result.user) window._meridianHandleAuthResult(result);
    }catch(e){/* no redirect result */}
  }
  // Auto-pull if on fresh device with no local data (skip on localhost)
  if(!d&&!IS_LOCAL){
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
