<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Horloge & Temps</title>
  <style>
    :root{
      --bg:#0f172a;
      --card:#111827;
      --primary:#38bdf8;
      --secondary:#22c55e;
      --danger:#ef4444;
      --text:#e5e7eb;
      --muted:#9ca3af;
    }
    *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto}
    body{
      margin:0;min-height:100vh;background:linear-gradient(135deg,#020617,#020617 40%,#020617);
      color:var(--text);display:flex;align-items:center;justify-content:center;padding:20px;
    }
    .app{max-width:1100px;width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
    .card{
      background:rgba(17,24,39,.9);border-radius:18px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,.4)
    }
    h2{margin-top:0;font-size:1.25rem}
    .time{font-size:2.2rem;text-align:center;margin:10px 0}
    .controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
    button{
      background:#020617;border:1px solid #1f2937;color:var(--text);
      padding:10px 14px;border-radius:10px;cursor:pointer
    }
    button.primary{background:var(--primary);border:none;color:#020617}
    button.success{background:var(--secondary);border:none;color:#020617}
    button.danger{background:var(--danger);border:none}
    button:disabled{opacity:.5;cursor:not-allowed}
    input{
      width:100%;padding:10px;border-radius:10px;border:1px solid #1f2937;
      background:#020617;color:var(--text)
    }
    ul{list-style:none;padding:0;margin:10px 0}
    li{padding:6px 0;border-bottom:1px dashed #1f2937;font-size:.9rem}
    .status{font-size:.85rem;color:var(--muted)}
    .alert{
      margin-top:10px;padding:10px;border-radius:10px;background:rgba(34,197,94,.15);
      border:1px solid var(--secondary)
    }
    .alert.danger{background:rgba(239,68,68,.15);border-color:var(--danger)}
  </style>
</head>
<body>
  <div class="app">

    <!-- HORLOGE -->
    <div class="card">
      <h2>Horloge (UTC +1)</h2>
      <div id="clock" class="time">--:--:--</div>
    </div>

    <!-- MINUTEUR -->
    <div class="card">
      <h2>Minuteur</h2>
      <div id="timerDisplay" class="time">00:00</div>
      <div class="controls">
        <button onclick="addTimer(60)">+1 min</button>
        <button onclick="addTimer(-60)">-1 min</button>
      </div>
      <input id="timerInput" type="number" placeholder="Temps en secondes" />
      <div class="controls" style="margin-top:10px">
        <button class="primary" onclick="startStopTimer()">Start / Stop</button>
        <button onclick="resetTimer()">Reset</button>
      </div>
      <div id="timerAlert"></div>
    </div>

    <!-- CHRONOMETRE -->
    <div class="card">
      <h2>Chronomètre</h2>
      <div id="chronoDisplay" class="time">00:00.0</div>
      <div class="controls">
        <button class="primary" onclick="toggleChrono()">Marche / Arrêt</button>
        <button onclick="lapChrono()">Tour</button>
        <button class="danger" onclick="resetChrono()">Reset</button>
      </div>
      <ul id="laps"></ul>
    </div>

    <!-- REVEIL -->
    <div class="card">
      <h2>Réveil</h2>
      <input id="alarmTime" type="time" />
      <input id="alarmText" placeholder="Message de l'alarme" />
      <div class="controls" style="margin-top:10px">
        <button class="success" onclick="addAlarm()">Ajouter alarme</button>
      </div>
      <ul id="alarms"></ul>
      <div id="alarmAlert"></div>
    </div>

  </div>

<script>
/* ================= HORLOGE ================= */
function updateClock(){
  const now = new Date(Date.now() + 60*60*1000);
  const h = String(now.getUTCHours()).padStart(2,'0');
  const m = String(now.getUTCMinutes()).padStart(2,'0');
  const s = String(now.getUTCSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock,1000);updateClock();

/* ================= MINUTEUR ================= */
let timer = 0;
let timerInterval = null;
function formatMMSS(sec){
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${m}:${s}`;
}
function updateTimer(){
  document.getElementById('timerDisplay').textContent = formatMMSS(timer);
}
function addTimer(sec){ timer = Math.max(0,timer+sec); updateTimer(); }
function startStopTimer(){
  const input = document.getElementById('timerInput').value;
  if(!timer && input) timer = parseInt(input);
  if(timerInterval){ clearInterval(timerInterval); timerInterval=null; return; }
  timerInterval = setInterval(()=>{
    if(timer>0){ timer--; updateTimer(); }
    else{
      clearInterval(timerInterval); timerInterval=null;
      document.getElementById('timerAlert').innerHTML = '<div class="alert danger">⏰ Temps écoulé</div>';
    }
  },1000);
}
function resetTimer(){ timer=0; updateTimer(); document.getElementById('timerAlert').innerHTML=''; }
updateTimer();

/* ================= CHRONOMETRE ================= */
let chrono=0, chronoInterval=null;
function updateChrono(){
  const m = String(Math.floor(chrono/60000)).padStart(2,'0');
  const s = String(Math.floor((chrono%60000)/1000)).padStart(2,'0');
  const ms = Math.floor((chrono%1000)/100);
  document.getElementById('chronoDisplay').textContent = `${m}:${s}.${ms}`;
}
function toggleChrono(){
  if(chronoInterval){ clearInterval(chronoInterval); chronoInterval=null; }
  else chronoInterval=setInterval(()=>{ chrono+=100; updateChrono(); },100);
}
function lapChrono(){
  const li=document.createElement('li');
  li.textContent=document.getElementById('chronoDisplay').textContent;
  document.getElementById('laps').appendChild(li);
}
function resetChrono(){ chrono=0; updateChrono(); document.getElementById('laps').innerHTML=''; }

/* ================= REVEIL ================= */
let alarms=[];
function addAlarm(){
  const time=document.getElementById('alarmTime').value;
  const text=document.getElementById('alarmText').value||'Alarme';
  if(!time) return;
  alarms.push({time,text,triggered:false});
  renderAlarms();
}
function renderAlarms(){
  const ul=document.getElementById('alarms'); ul.innerHTML='';
  const now=new Date();
  alarms.forEach(a=>{
    const li=document.createElement('li');
    const [h,m]=a.time.split(':');
    const alarmDate=new Date();
    alarmDate.setHours(h,m,0,0);
    let status='';
    const diff=alarmDate-now;
    if(diff<=0) status='passée';
    else{
      const min=Math.floor(diff/60000);
      status=`dans ${min} min`;
    }
    li.innerHTML=`<strong>${a.time}</strong> – ${a.text} <span class="status">(${status})</span>`;
    ul.appendChild(li);
  });
}
setInterval(()=>{
  const now=new Date();
  alarms.forEach(a=>{
    const [h,m]=a.time.split(':');
    if(!a.triggered && now.getHours()==h && now.getMinutes()==m){
      a.triggered=true;
      document.getElementById('alarmAlert').innerHTML=`<div class="alert">⏰ ${a.text}</div>`;
    }
  });
  renderAlarms();
},30000);
</script>
</body>
</html>
