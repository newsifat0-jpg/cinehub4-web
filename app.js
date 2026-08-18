function openLink(u){if(!u)return;try{window.Telegram?.WebApp?.openTelegramLink?.(u)||window.Telegram?.WebApp?.openLink?.(u)||window.open(u,"_blank")}catch(e){window.open(u,"_blank")}}
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const defaults={appName:"Cine Hub4",botUsername:"@Cinehub4bot",telegramBotLink:"https://t.me/Cinehub4bot",telegramChannelLink:"",howToEarnVideo:"",unlockCost:5,unlockHours:15,adReward:2,dailyAdLimit:20,categories:["All Movies","Bangla Moves","Hollywood Movie Hindi"],adBlocks:{rewarded:"43222",interstitial:"",banner:"",task:"",adult:""}};
let cfg={...defaults,...JSON.parse(localStorage.getItem("cinehub4_settings")||"{}")};
if(!cfg.categories||!cfg.categories.length)cfg.categories=defaults.categories.slice();
let movies=JSON.parse(localStorage.getItem("cinehub4_movies")||"null")||[
{id:1,title:"PRINCE (প্রিন্স) | Full Movie | Shakib Khan | Tasnia Farin | ফুল মুভি",year:2026,rating:8.7,genre:"Action • Drama",category:"Bangla Moves",clicks:1030,downloads:921,likes:34,duration:"2:27:35",poster:"",views:1030},
{id:2,title:"Taandob (তাণ্ডব) | Official Trailer | Shakib Khan | Jaya | Sabila",year:2026,rating:8.1,genre:"Action",category:"Bangla Moves",clicks:357,downloads:120,likes:6,duration:"2:08:20",poster:"",views:357},
{id:3,title:"SPIDER-MAN: Brand New Day",year:2026,rating:8.5,genre:"Action • Adventure",category:"Hollywood Movie Hindi",clicks:1207,downloads:641,likes:88,duration:"2:15:00",poster:"",views:1207}];
const state={page:localStorage.getItem("cinehub4_page")||"movies",adultOK:false,points:Number(localStorage.getItem("cinehub4_points")||1),query:"",category:"All Movies",mode:"new",history:JSON.parse(sessionStorage.getItem("cinehub4_history")||"[]"),unlockProgress:0};
function save(){localStorage.setItem("cinehub4_movies",JSON.stringify(movies));localStorage.setItem("cinehub4_points",state.points)}
function toast(t){const x=$("#toast");if(!x)return;x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1600)}
function showPageTransition(cb){
  const el=document.getElementById("pageTransition");
  if(!el){if(cb)cb();return}
  el.classList.remove("hidden");
  el.style.display="flex";
  el.classList.remove("show");
  el.setAttribute("aria-hidden","false");
  void el.offsetWidth;
  el.classList.add("show");
  try{window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.("light")}catch(e){}
  setTimeout(function(){
    try{if(cb)cb()}catch(e){console.error(e)}
    setTimeout(function(){
      el.classList.remove("show");
      setTimeout(function(){
        el.classList.add("hidden");
        el.style.display="none";
        el.setAttribute("aria-hidden","true");
      },350);
    },250);
  },1100);
}

function nav(p,opts={}){
  if(p==="telegram"){openLink(cfg.telegramBotLink);return}
  if(p===state.page&&!opts.force)return;
  if(!opts.fromBack){
    state.history.push(state.page);
    if(state.history.length>30)state.history.shift();
    sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history));
  }
  const go=function(){
    state.page=p;
    localStorage.setItem("cinehub4_page",p);
    try{window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()}catch(e){}
    render(true);
    try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){}
    const sc=document.getElementById("screen");
    if(sc)sc.scrollTop=0;
  };
  if(opts.skipTransition){go();return}
  showPageTransition(go);
}
function goBack(){const prev=state.history.pop();sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history));nav(prev||"movies",{fromBack:true})}
function posterHTML(m){if(m.poster)return`<img class="poster-img" src="${m.poster}" alt="">`;return`<div class="poster-fallback"><div class="pt">${(m.title||"").split("|")[0].trim().slice(0,18)}</div></div>`}
function card(m,idx){const top=idx===0&&state.mode==="trending"?`<span class="movie-top">TOP 1</span>`:"";return`<article class="movie-card" onclick="detail(${m.id})"><div class="poster-wrap"><span class="movie-badge">MOVIE</span>${top}${posterHTML(m)}${m.duration?`<span class="movie-dur">4K ${m.duration}</span>`:""}</div><div class="movie-body"><div class="mtitle">${m.title}</div><div class="mmeta"><span class="views">👁 ${m.views||m.clicks||0}</span><span class="likes">👍 ${m.likes||0}</span><button class="share-btn" onclick="event.stopPropagation();toast('Share link copied')">↗</button></div></div></article>`}
function pageBackBar(title){return`<div class="page-back-bar"><button type="button" class="page-back-btn" id="pageBackBtn">‹</button><span class="page-back-title">${title||""}</span></div>`}
function bindPageBack(){const b=$("#pageBackBtn");if(b)b.onclick=()=>goBack()}
function primeHeader(){return`<div class="prime-row"><button type="button" class="menu-ham" id="hamBtn">☰</button><div class="prime-title">Cine <span class="scene-pill">Hub4</span></div></div>`}
function heroPills(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.mode==="new"?"active":""}" onclick="setMode('new')"><span class="hp-label">New Movies</span><span class="hp-sub">LATEST UPLOADS</span></button><button type="button" class="hero-pill orange ${state.mode==="trending"?"active":""}" onclick="setMode('trending')"><span class="hp-label">Trending</span><span class="hp-sub">MOST WATCHED</span></button></div></div>`}
function catRow(){const cats=cfg.categories||defaults.categories;return`<div class="cat-row">${cats.map(c=>`<button type="button" class="cat-chip ${state.category===c?"active":""}" onclick="filterCat('${String(c).replace(/'/g,"\\'")}')">${c}</button>`).join("")}</div>`}
function libCard(){const title=state.mode==="trending"?"Trending Movies":"Cinema Library";const count=movies.length;return`<div class="lib-card"><div class="lib-badge"><i></i> MOVIE ZONE</div><div class="lib-count"><b>${count}</b><span>VIDEOS</span></div><h2>${title}</h2><p class="lib-desc">Curated movies, web series and premium entertainment updates.</p><button type="button" class="how-btn" onclick="howToEarn()">▶ How to Watch</button></div>`}
function ticker(){return`<div class="ticker"><span>Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • </span></div>`}
function setMode(m){state.mode=m;render(true)}
function filterCat(c){state.category=c;render(true)}
function listForHome(){let list=movies.slice();if(state.category&&state.category!=="All Movies"&&state.category!=="All"){list=list.filter(m=>(m.category||"").toLowerCase().includes(state.category.toLowerCase().replace(" moves","").replace(" movie hindi",""))|| (m.category||"").toLowerCase()===state.category.toLowerCase())}if(state.mode==="trending")list=list.slice().sort((a,b)=>(b.views||b.clicks||0)-(a.views||a.clicks||0));else list=list.slice().sort((a,b)=>b.id-a.id);return list}
function moviesPage(){const list=listForHome();return primeHeader()+heroPills()+catRow()+libCard()+ticker()+list.map((m,i)=>card(m,i)).join("")||`<div class="empty">কোনো মুভি পাওয়া যায়নি।</div>`}
function series(){const list=movies.filter(m=>(m.category||"").toLowerCase().includes("series"));return pageBackBar("Series")+`<div class="section-title"><b>Series</b><span>Complete series</span></div>${list.map((m,i)=>card(m,i)).join("")||`<div class="panel">Series যোগ করা হয়নি।</div>`}`}
function adult(){if(!state.adultOK)return pageBackBar("18+ Adult")+`<div class="adult-warning"><div class="adult-icon">18+</div><h2>Adult Access</h2><p class="muted">এই বিভাগে প্রাপ্তবয়স্ক কনটেন্ট রয়েছে। প্রবেশের আগে বয়স নিশ্চিত করুন।</p><button class="primary pink wide" onclick="confirmAdult()">আমি ১৮+</button><button class="pill wide" onclick="nav('movies')">ফিরে যান</button></div>`;return`<div class="section-title"><b>🔞 Adult Library</b><span>18+</span></div><div class="adbox">Adult Advertisement</div>${movies.filter(m=>m.adult).map((m,i)=>card(m,i)).join("")||`<div class="panel">Adult movies will appear here after admin adds them.</div>`}`}
function profile(){
  const tg=window.Telegram?.WebApp?.initDataUnsafe?.user;
  const name=tg?(tg.first_name||"")+(tg.last_name?" "+tg.last_name:""):"Cine Hub User";
  const uname=tg?.username?("@"+tg.username):"@user";
  const photo=tg?.photo_url||"";
  const refCode=String(tg?.id||localStorage.getItem("cinehub4_uid")||"1000001");
  if(!localStorage.getItem("cinehub4_uid")) localStorage.setItem("cinehub4_uid",refCode);
  const bot=(cfg.telegramBotLink||"https://t.me/Cinehub4bot").replace(/\/$/,"");
  const refLink=bot+(bot.includes("?")?"&":"?")+"start="+refCode;
  const refs=Number(localStorage.getItem("cinehub4_refs")||0);
  const cur=(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.get&&window.CINEHUB4_LANG.get())||localStorage.getItem("cinehub4_language")||"en";
  const avatar=photo?`<img src="${photo}" alt="">`:(name[0]||"U").toUpperCase();
  return `
  <div class="pf-card">
    <div class="pf-avatar">${avatar}</div>
    <div class="pf-meta">
      <div class="pf-name">${name} <span class="pf-seed">SEED</span></div>
      <div class="pf-user">${uname}</div>
      <div class="pf-verified">✓ Verified User</div>
    </div>
    <div class="pf-lang-mini">
      <div class="lang-label">A文 Language</div>
      <div class="lang-toggle">
        <button type="button" class="lang-btn ${cur==="bn"?"active":""}" data-lang="bn">🇧🇩 বাংলা</button>
        <button type="button" class="lang-btn ${cur==="en"?"active":""}" data-lang="en">🇺🇸 English</button>
      </div>
    </div>
  </div>
  <div class="pf-section">📊 OVERVIEW</div>
  <div class="pf-stats">
    <div class="pf-stat"><div><b>${state.points}</b><span>My Points</span></div><div class="ico">🪙</div></div>
    <div class="pf-stat"><div><b>${refs}</b><span>Total Referrals</span></div><div class="ico">👥</div></div>
  </div>
  <div class="pf-section">🔗 REFERRAL SYSTEM</div>
  <div class="pf-panel">
    <div class="pf-row"><span>Per Referral Reward</span><b>${cfg.referralReward||20} Points</b></div>
    <div class="pf-row"><span>Join Bonus</span><b>${cfg.joinBonus||10} Points</b></div>
    <div class="pf-row"><span>Referral Code</span><b>${refCode}</b></div>
    <div style="font-size:12px;color:#9aa3b8;margin-top:8px">Your Referral Link</div>
    <div class="pf-linkbox" id="refLinkText">${refLink}</div>
    <div class="pf-actions">
      <button type="button" class="pf-btn copy" onclick="copyRefLink()">📋 Copy Link</button>
      <button type="button" class="pf-btn share" onclick="shareRefLink()">↗ Share</button>
    </div>
  </div>
  <div class="pf-section">❓ HOW IT WORKS</div>
  <div class="pf-how">
    <div class="pf-how-card"><b>When friend joins</b><span>Points Added</span></div>
    <div class="pf-how-card"><b>More Earning</b><span>Watch ads & earn</span></div>
  </div>
  <div class="pf-actions" style="margin-bottom:12px">
    <button type="button" class="pf-btn tutorial" onclick="openLink(cfg.howToEarnVideo||cfg.telegramBotLink)">▶ Watch Tutorial</button>
    <button type="button" class="pf-btn buy" onclick="nav('buy')">🛒 Buy Points</button>
  </div>
  <div class="pf-section">⚡ MORE POINT EARNING</div>
  <div class="earn-card">
    <h3>⚡ Watch Ads & Earn Points</h3>
    <p>Complete ads to get rewards and unlock videos with points.</p>
    <div class="earn-tags"><span>✔ Instant Reward</span><span>🪙 More Points</span><span>🔓 Unlock Videos</span></div>
    <button type="button" class="pf-btn wide" onclick="nav('points')">⚡ More Point Earning</button>
  </div>`;
}

function copyRefLink(){
  const t=document.getElementById("refLinkText")?.textContent||"";
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(()=>toast("Referral link copied!")).catch(()=>toast(t));
  }else{toast("Referral link copied!");}
}
function shareRefLink(){
  const t=document.getElementById("refLinkText")?.textContent||"";
  if(navigator.share){navigator.share({title:"Cine Hub4",url:t}).catch(()=>copyRefLink())}
  else copyRefLink();
}

function points(){return pageBackBar("My Points")+`<div class="section-title"><b>🪙 My Points</b><span>${state.points} points</span></div><div class="panel"><div class="amount">${state.points} <span class="muted">points</span></div><div class="task"><span>📺 Watch Ad & Earn</span><b>+${cfg.adReward}</b><button class="primary cyan" onclick="watchAd('rewarded')">Watch</button></div><div class="task"><span>🛒 Buy Points</span><button class="primary pink" onclick="nav('buy')">Buy</button></div><div class="task"><span>👥 Refer & Earn</span><button class="pill" onclick="shareRef()">Share</button></div></div><div class="panel"><h3>Daily Ad Limit</h3><div class="task"><span>Only for earning points</span><b>${cfg.dailyAdLimit}/day</b></div><div class="muted">Movie unlock-এর সময় ad limit প্রযোজ্য নয়।</div></div>`}
function tasks(){return pageBackBar("Daily Tasks")+`<div class="section-title"><b>✓ Daily Tasks</b><span>Earn points</span></div><div class="panel"><div class="task"><span>📺 Watch rewarded ad</span><button class="primary" onclick="watchAd('task')">+${cfg.adReward}</button></div><div class="task"><span>📣 Join Telegram</span><button class="pill" onclick="openLink(cfg.telegramChannelLink)">Join</button></div><div class="task"><span>👥 Refer a friend</span><button class="pill" onclick="shareRef()">Share</button></div><div class="task"><span>🎥 How to earn points</span><button class="pill" onclick="howToEarn()">Watch</button></div></div>`}
function settings(){return pageBackBar("Settings")+`<div class="section-title"><b>⚙ Settings</b></div><div class="panel"><div class="task"><span>Language</span><select class="pill" style="appearance:auto" onchange="CINEHUB4_LANG.set(this.value)"><option value="en" ${CINEHUB4_LANG.get()==="en"?"selected":""}>English</option><option value="bn" ${CINEHUB4_LANG.get()==="bn"?"selected":""}>বাংলা</option></select></div><div class="task"><span>Telegram</span><button class="pill" onclick="openLink(cfg.telegramBotLink)">Open</button></div><div class="task"><span>How To Earn</span><button class="pill" onclick="howToEarn()">Watch Video</button></div></div>`}
function buy(){
  return pageBackBar("Buy Points")+`
  <div class="earn-card">
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
      <div class="ico" style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#7c5cff,#5b8cff);display:grid;place-items:center;font-size:22px">🪙</div>
      <div><h3 style="margin:0">Buy Premium Points</h3>
      <p style="margin:4px 0 0;font-size:12px;color:#9aa3b8">Select a package or enter custom USDT amount, then submit payment proof for admin approval.</p></div>
    </div>
    <button type="button" class="pf-btn wide" style="margin-top:8px" onclick="openLink(cfg.howToBuyVideo||cfg.telegramBotLink)">▶ How to Buy Points</button>
  </div>
  <div class="pf-section">💎 SELECT PACKAGE</div>
  ${(cfg.packages||[
    {name:"Basic Package",tag:"SMART CHOICE",usd:0.99,pts:110,icon:"⚡"},
    {name:"Standard Package",tag:"STARTER",usd:4.99,pts:550,icon:"⭐"},
    {name:"Premium Package",tag:"BEST VALUE",usd:9.99,pts:1200,icon:"🏅"},
    {name:"Ultimate Package",tag:"POPULAR",usd:14.99,pts:2000,icon:"👑"}
  ]).map(p=>`<div class="pf-panel" style="display:flex;align-items:center;gap:12px">
    <div style="width:44px;height:44px;border-radius:12px;background:#1a2238;display:grid;place-items:center;font-size:20px">${p.icon||"🪙"}</div>
    <div style="flex:1"><div style="font-weight:800">${p.name} <span style="font-size:10px;color:#fbbf24">${p.tag||""}</span></div>
    <div style="font-size:12px;color:#9aa3b8">$ ${p.usd} USDT · ${p.pts} Points</div></div>
    <button type="button" class="primary" onclick="requestBuy('${p.name}',${p.usd},${p.pts})">Buy</button>
  </div>`).join("")}
  <div class="pf-section">✦ CUSTOM AMOUNT</div>
  <div class="pf-panel">
    <label style="font-size:12px;color:#9aa3b8">Enter Points Amount</label>
    <input id="customPts" type="number" placeholder="Example: 1000" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#fff">
    <div class="pf-row"><span>Required USDT</span><b id="customUsd">0.00 USDT</b></div>
    <button type="button" class="pf-btn wide" onclick="requestCustomBuy()">👑 Purchase Custom Coins</button>
  </div>`;
}
function requestBuy(name,usd,pts){
  const list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
  list.push({id:Date.now(),name,usd,pts,status:"pending",at:new Date().toISOString()});
  localStorage.setItem("cinehub4_payments",JSON.stringify(list));
  toast("Payment request submitted (USDT)");
}
function requestCustomBuy(){
  const pts=Number(document.getElementById("customPts")?.value||0);
  if(pts<=0){toast("Enter points amount");return}
  const usd=(pts*0.01).toFixed(2);
  requestBuy("Custom",Number(usd),pts);
}

function detail(id){
  const m=movies.find(x=>x.id===id);if(!m)return;
  m.clicks=(m.clicks||0)+1;m.views=(m.views||m.clicks);save();
  state.detailId=id;state.unlockProgress=0;
  if(typeof showPageTransition==="function"){
    showPageTransition(function(){
      state.page="detail";
      localStorage.setItem("cinehub4_page","detail");
      render(true);
      try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){}
      const sc=document.getElementById("screen");if(sc)sc.scrollTop=0;
    });
  }else{
    state.page="detail";localStorage.setItem("cinehub4_page","detail");render(true);
  }
}
function detailView(){const m=movies.find(x=>x.id===state.detailId);if(!m)return moviesPage();const cost=Number(cfg.unlockCost)||5;const need=cost;const my=state.points;const rem=Math.max(0,need-state.unlockProgress);const prog=state.unlockProgress;return pageBackBar("Movie")+`<div class="unlock-page"><div class="unlock-notice"><div class="bell">🔔</div><div><b>UNLOCK NOTICE</b><span>MOVIE CONTENT</span><div class="muted" style="margin-top:4px">Unlock this content using ads or points.</div></div></div><div class="unlock-poster">${posterHTML(m)}${m.duration?`<span class="movie-dur">4K ${m.duration}</span>`:""}</div><div class="unlock-stats"><div class="us"><b>👍 ${m.likes||0}</b>Likes</div><div class="us"><b>👁 ${m.views||m.clicks||0}</b>Views</div><div class="us"><b>✈</b>Telegram</div></div><div class="unlock-title">${m.title}</div><div class="unlock-sub">${m.genre||""} • ${m.year||""}</div><div class="points-box"><div class="pb-label">● Unlock this content using ads or points.</div><div class="points-row"><div class="pc need"><span>Need</span><b>${need}</b></div><div class="pc myp"><span>My Points</span><b>${my}</b></div><div class="pc rem"><span>Remaining</span><b>${rem}</b></div></div><div class="progress-wrap"><div class="progress-bar"><i style="width:${Math.min(100,(prog/need)*100)}%"></i></div><div class="progress-text">Progress: ${prog}/${need}<br>Unlock with points or ads.</div></div><div class="unlock-actions"><button type="button" class="btn-unlock lock" onclick="unlockWithAds()">🔒 Unlock Video</button><button type="button" class="btn-unlock points" onclick="usePointsForUnlock()">🪙 Use My Points</button></div></div><button type="button" class="btn-more" onclick="nav('movies')">🎬 More Watching <span>›</span></button></div>`}
function usePointsForUnlock(){const cost=Number(cfg.unlockCost)||5;if(state.points<1){toast("No points available");return}if(state.unlockProgress>=cost){toast("Already unlocked");return}state.points-=1;state.unlockProgress+=1;save();toast("1 point used");if(state.unlockProgress>=cost){toast(`Unlocked for ${cfg.unlockHours} hours`);}render(false)}
function unlockWithAds(){watchAd("unlock")}
function unlockPoints(){const c=Number(cfg.unlockCost)||5;if(state.points<c){toast("পয়েন্ট যথেষ্ট নেই");return}state.points-=c;save();toast(`Unlocked for ${cfg.unlockHours} hours`)}
function watchAd(mode){const id=mode==="adult"?cfg.adBlocks?.adult:cfg.adBlocks?.rewarded;if(!id){toast("Admin has not configured this Ad Block ID");return}const m=document.createElement("div");m.className="modal";m.innerHTML=`<div class="modal-card"><div class="video-ad"><div><div class="play">▶</div><b>Ad Block #${id}</b><div class="muted">Demo rewarded advertisement</div></div></div><button class="primary cyan wide" id="completeDemoAd">Complete Demo Ad</button></div>`;document.body.appendChild(m);$("#completeDemoAd").onclick=()=>{m.remove();if(mode==="unlock"){const cost=Number(cfg.unlockCost)||5;state.unlockProgress=Math.min(cost,state.unlockProgress+1);toast("1 progress from ad");if(state.unlockProgress>=cost)toast("Movie unlocked for "+cfg.unlockHours+" hours");render(false)}else{state.points+=Number(cfg.adReward||0);save();toast("+"+cfg.adReward+" points earned");render()}}}

function startVoiceSearch(){
  try{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){toast("Voice search not supported");return}
    const r=new SR();
    r.lang=(localStorage.getItem("cinehub4_language")==="bn")?"bn-BD":"en-US";
    r.interimResults=false;
    r.maxAlternatives=1;
    const mic=document.getElementById("micBtn");
    if(mic) mic.classList.add("listening");
    r.onresult=function(ev){
      const t=(ev.results[0]&&ev.results[0][0]&&ev.results[0][0].transcript)||"";
      state.query=t;
      const q=document.getElementById("q");
      if(q) q.value=t;
      doSearch();
    };
    r.onerror=function(){toast("Voice failed");if(mic)mic.classList.remove("listening")};
    r.onend=function(){if(mic)mic.classList.remove("listening")};
    r.start();
    toast("Listening...");
  }catch(e){toast("Voice error")}
}
function doSearch(){
  const q=document.getElementById("q");
  state.query=q?q.value:state.query||"";
  state.page="search";
  localStorage.setItem("cinehub4_page","search");
  render(true);
}

function searchPage(){
  const q=(state.query||"").toLowerCase();
  let list=movies.slice();
  if(q) list=list.filter(m=>((m.title||"")+(m.genre||"")+(m.category||"")).toLowerCase().includes(q));
  return `<div class="search-top">
    <button type="button" class="page-back-btn" id="pageBackBtn">‹</button>
    <div class="search-bar-wrap">
      <input id="q" type="search" placeholder="Search movies..." value="${(state.query||"").replace(/"/g,"&quot;")}" onkeydown="if(event.key==='Enter')doSearch()">
      <button type="button" class="mic-btn" id="micBtn" title="Voice search" aria-label="Voice search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2"/><path d="M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button type="button" class="search-go" onclick="doSearch()" aria-label="Search">🔍</button>
    </div>
  </div>
  <div class="section-title"><b>Results</b><span>${list.length}</span></div>
  ${list.map((m,i)=>card(m,i)).join("")||`<div class="empty">No movies found</div>`}`;
}



function closeDrawer(){
  const d=document.getElementById("drawer");
  if(d) d.classList.add("hidden");
}
function openDrawer(){
  const d=document.getElementById("drawer");
  if(d) d.classList.remove("hidden");
}
function syncLangButtons(){
  try{
    const cur=(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.get&&window.CINEHUB4_LANG.get())||localStorage.getItem("cinehub4_language")||"en";
    document.querySelectorAll(".lang-btn").forEach(b=>{
      b.classList.toggle("active", (b.getAttribute("data-lang")||"")==cur);
    });
  }catch(e){}
}
function bindLangSwitch(){
  document.querySelectorAll(".lang-btn").forEach(b=>{
    b.onclick=function(e){
      e.preventDefault();e.stopPropagation();
      const lang=this.getAttribute("data-lang")||"en";
      try{
        if(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.set) window.CINEHUB4_LANG.set(lang);
        else localStorage.setItem("cinehub4_language",lang);
      }catch(err){localStorage.setItem("cinehub4_language",lang)}
      syncLangButtons();
      try{window.CINEHUB4_LANG&&window.CINEHUB4_LANG.translateDOM&&window.CINEHUB4_LANG.translateDOM()}catch(e){}
      render(true);
      toast(lang==="bn"?"ভাষা: বাংলা":"Language: English");
    };
  });
  syncLangButtons();
}
function bindDrawer(){
  bindLangSwitch();
  const ham=document.getElementById("hamBtn");
  if(ham) ham.onclick=function(){openDrawer()};
  const close=document.getElementById("closeDrawer");
  if(close) close.onclick=function(){closeDrawer()};
  const backdrop=document.querySelector(".drawer-backdrop");
  if(backdrop) backdrop.onclick=function(){closeDrawer()};
  document.querySelectorAll("#drawer button[data-page]").forEach(b=>{
    b.onclick=function(){
      const p=this.getAttribute("data-page");
      closeDrawer();
      if(p) nav(p);
    };
  });
  setupAdminButton();
}
function isAdminUser(){
  try{
    const ids=(window.APP_CONFIG&&window.APP_CONFIG.adminIds)||[];
    const demo=(window.APP_CONFIG&&window.APP_CONFIG.adminDemoId)||"";
    const tg=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;
    const uid=tg&&tg.id!=null?String(tg.id):"";
    if(demo&&uid&&String(demo)===uid) return true;
    return ids.map(String).includes(uid);
  }catch(e){return false}
}
function setupAdminButton(){
  try{
    const btn=document.getElementById("adminPanelBtn");
    if(!btn) return;
    if(isAdminUser()){
      btn.classList.remove("hidden");
      btn.onclick=function(){location.href="admin.html"};
    }else{
      btn.classList.add("hidden");
    }
  }catch(e){}
}
function render(animate=false){try{const views={movies:moviesPage,search:searchPage,series,adult,profile,points,tasks,settings,buy,detail:detailView,home:moviesPage};const screen=$("#screen");if(!screen){console.error("no #screen");return}const fn=views[state.page]||moviesPage;let html="";try{html=fn()}catch(err){html="<div class=\"panel\" style=\"padding:16px;color:#f88\"><b>Page error</b><pre style=\"font-size:11px;white-space:pre-wrap\">"+String(err.message||err)+"</pre></div>";console.error(err)}screen.innerHTML=html;if(animate){screen.classList.remove("page-enter");void screen.offsetWidth;screen.classList.add("page-enter")}$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===state.page||(state.page==="detail"&&b.dataset.page==="movies")));bindDrawer();setupAdminButton();window.CINEHUB4_LANG?.translateDOM();
const mic=$("#micBtn");if(mic)mic.onclick=startVoiceSearch;
const qel=$("#q");if(qel){qel.addEventListener("input",()=>{/* live optional */});}
}catch(err){console.error("render",err);const screen=$("#screen");if(screen)screen.innerHTML="<div style=\"padding:20px;color:#f88\">Render failed: "+String(err.message||err)+"</div>"}
}
try{window.Telegram?.WebApp?.ready();window.Telegram?.WebApp?.expand()}catch(e){}
if($("#backBtn"))$("#backBtn").onclick=()=>goBack();
$$(".nav-item").forEach(b=>b.onclick=()=>nav(b.dataset.page));
setupAdminButton();setTimeout(setupAdminButton,250);setTimeout(setupAdminButton,1000);
bindDrawer();

function loadSharedSettings(){
  try{
    const s=JSON.parse(localStorage.getItem("cinehub4_settings")||"{}");
    if(s&&typeof s==="object"){
      Object.keys(s).forEach(k=>{if(s[k]!==undefined&&s[k]!==null)cfg[k]=s[k]});
    }
  }catch(e){}
}
loadSharedSettings();
try{render(false)}catch(e){console.error(e);var s=document.getElementById("screen");if(s)s.innerHTML="<div style=padding:20px;color:#f88>Boot error: "+e.message+"</div>"}
function killSplash(){const s=document.getElementById("appSplash");if(!s)return;s.classList.add("gone");s.style.display="none";try{s.remove()}catch(e){}}
killSplash();
setTimeout(killSplash,400);
setTimeout(killSplash,1200);
setTimeout(killSplash,2000);                       
