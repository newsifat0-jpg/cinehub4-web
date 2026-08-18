/* bilingual helper — never pass movie titles to t() */

function applyTheme(){
  try{
    const r=document.documentElement;
    if(cfg.themeAccent) r.style.setProperty("--accent", cfg.themeAccent);
    if(cfg.themeAccent2) r.style.setProperty("--accent2", cfg.themeAccent2);
    if(cfg.themeOrange) r.style.setProperty("--orange", cfg.themeOrange);
    if(cfg.themePink) r.style.setProperty("--pink", cfg.themePink);
    if(cfg.themeBg) r.style.setProperty("--bg", cfg.themeBg);
  }catch(e){}
}
function t(k){try{return (window.CINEHUB4_LANG&&window.CINEHUB4_LANG.t)?window.CINEHUB4_LANG.t(k):k}catch(e){return k}}
window.__cinehub_rerender=function(){try{render(false)}catch(e){}};

function howToEarn(){const u=cfg.howToEarnVideo||cfg.telegramBotLink;if(u)openLink(u);else toast(t("How to Watch link not set"));}


function nativeShare(opts){
  const title=opts.title||"Cine Hub4";
  const text=opts.text||"";
  const url=opts.url||(cfg.telegramBotLink||"https://t.me/Cinehub4bot");
  const shareUrl="https://t.me/share/url?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(text||title||"");
  try{
    if(window.Telegram&&window.Telegram.WebApp){
      if(window.Telegram.WebApp.openTelegramLink){
        window.Telegram.WebApp.openTelegramLink(shareUrl);
        return;
      }
      if(window.Telegram.WebApp.openLink){
        window.Telegram.WebApp.openLink(shareUrl);
        return;
      }
    }
  }catch(e){}
  if(navigator.share){
    navigator.share({title:title,text:text,url:url}).catch(function(){
      try{window.open(shareUrl,"_blank")}catch(e){}
    });
    return;
  }
  try{window.open(shareUrl,"_blank")}catch(e){}
  try{if(navigator.clipboard)navigator.clipboard.writeText((text?text+"\n":"")+url)}catch(e){}
  toast(t("Share link ready"));
}
function telegramShare(text,url){
  nativeShare({text:text,url:url});
}
function shareMovie(id){
  const m=movies.find(x=>x.id===id);
  const t=m?(m.title||"").split("|")[0].trim():"Movie";
  const bot=(cfg.telegramBotLink||"https://t.me/Cinehub4bot").replace(/\/$/,"");
  // startapp deep-link opens Mini App directly with movie id
  const link=bot+(bot.includes("?")?"&":"?")+"startapp=movie_"+id;
  const text=t+" — watch on Cine Hub4";
  nativeShare({title:t+" | Cine Hub4", text:text, url:link});
}
function shareRef(){shareRefLink()}
function shareRefLink(){
  const el=document.getElementById("refLinkText");
  let link=(el&&el.textContent?el.textContent.trim():"")||"";
  if(!link){
    const bot=(cfg.telegramBotLink||"https://t.me/Cinehub4bot").replace(/\/$/,"");
    const uid=(function(){try{return String(window.Telegram?.WebApp?.initDataUnsafe?.user?.id||"")}catch(e){return ""}})();
    link=bot+(bot.includes("?")?"&":"?")+"startapp=ref_"+(uid||"friend");
  }
  // Prefer startapp form so Mini App opens
  if(link.indexOf("startapp=")<0 && link.indexOf("start=")>=0){
    link=link.replace("start=","startapp=");
  }
  nativeShare({title:"Cine Hub4 Referral", text:"Join me on Cine Hub4 and earn points!", url:link});
}
function openLink(u){if(!u)return;try{window.Telegram?.WebApp?.openTelegramLink?.(u)||window.Telegram?.WebApp?.openLink?.(u)||window.open(u,"_blank")}catch(e){window.open(u,"_blank")}}
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const defaults={appName:"Cine Hub4",botUsername:"@Cinehub4bot",telegramBotLink:"https://t.me/Cinehub4bot",telegramChannelLink:"",howToEarnVideo:"",howToWatchText:"Unlock this content using ads or points.",unlockCost:5,unlockHours:15,adReward:2,dailyAdLimit:20,joinBonus:10,referralReward:20,categories:["All Movies","Bangla Moves","Hollywood Movie Hindi"],adultCategories:["All","Adult Movie","Anime"],tickerText:"Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ",adultTickerText:"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ",libraryBadge:"MOVIE ZONE",libraryTitle:"Cinema Library",libraryDesc:"Curated movies, web series and premium entertainment updates.",adultLibraryBadge:"ADULT ZONE",adultLibraryTitle:"Adult Library",adultLibraryDesc:"Curated 18+ content and premium entertainment updates.",howToWatchLabel:"▶ How to Watch",adultHowToWatchLabel:"▶ How to Watch",newMoviesLabel:"New Movies",newMoviesSub:"LATEST UPLOADS",trendingLabel:"Trending",trendingSub:"MOST WATCHED",adultNewLabel:"New Movies",adultNewSub:"LATEST UPLOADS",adultTrendingLabel:"Trending",adultTrendingSub:"MOST WATCHED",packages:[
    {name:"Basic Package",price:0.99,points:110,tag:"SMART CHOICE"},
    {name:"Standard Package",price:4.99,points:550,tag:"STARTER"},
    {name:"Premium Package",price:9.99,points:1200,tag:"BEST VALUE"},
    {name:"Ultimate Package",price:14.99,points:2000,tag:"POPULAR"}
  ],
  wallets:[{name:"USDT TRC20",address:"",network:"TRC20"}],
  tasks:[],
  customPointRate:100,
  adBlocks:{rewarded:"43222",interstitial:"",banner:"",task:"",adult:""}};
let cfg={...defaults,...JSON.parse(localStorage.getItem("cinehub4_settings")||"{}")};
if(!cfg.categories||!cfg.categories.length)cfg.categories=defaults.categories.slice();
if(!cfg.adultCategories||!cfg.adultCategories.length)cfg.adultCategories=defaults.adultCategories.slice();
let movies=JSON.parse(localStorage.getItem("cinehub4_movies")||"null")||[
{id:1,title:"PRINCE (প্রিন্স) | Full Movie | Shakib Khan | Tasnia Farin | ফুল মুভি",year:2026,rating:8.7,genre:"Action • Drama",category:"Bangla Moves",clicks:1030,downloads:921,likes:34,duration:"2:27:35",poster:"",views:1030},
{id:2,title:"Taandob (তাণ্ডব) | Official Trailer | Shakib Khan | Jaya | Sabila",year:2026,rating:8.1,genre:"Action",category:"Bangla Moves",clicks:357,downloads:120,likes:6,duration:"2:08:20",poster:"",views:357},
{id:3,title:"SPIDER-MAN: Brand New Day",year:2026,rating:8.5,genre:"Action • Adventure",category:"Hollywood Movie Hindi",clicks:1207,downloads:641,likes:88,duration:"2:15:00",poster:"",views:1207},
{id:4,title:"Demo Adult Title | 18+ Sample",year:2026,rating:7.5,genre:"Adult",category:"Adult Movie",adult:true,clicks:410,downloads:90,likes:12,duration:"0:35:00",poster:"",views:410},
{id:5,title:"Demo Anime Title | 18+ Sample",year:2026,rating:7.8,genre:"Adult",category:"Anime",adult:true,clicks:260,downloads:55,likes:9,duration:"0:24:00",poster:"",views:260}];
const state={page:localStorage.getItem("cinehub4_page")||"movies",adultOK:false,points:Number(localStorage.getItem("cinehub4_points")||1),query:"",category:"All Movies",mode:"new",adultCategory:"All",adultMode:"new",history:JSON.parse(sessionStorage.getItem("cinehub4_history")||"[]"),unlockProgress:0,buyStep:null,buyOrder:null};
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
function goBack(){
  let prev=null;
  try{prev=state.history.pop()}catch(e){}
  try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history||[]))}catch(e){}
  // If no history left (on home / first page) → leave dialog
  if(!prev){
    if(state.page==="movies"||state.page==="home"){showLeaveDialog();return}
    prev="movies";
  }
  const go=function(){
    state.page=prev;
    localStorage.setItem("cinehub4_page",prev);
    render(true);
    try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){}
  };
  showPageTransition(go);
}
function posterHTML(m){if(m.poster)return`<img class="poster-img" src="${m.poster}" alt="">`;return`<div class="poster-fallback"><div class="pt">${(m.title||"").split("|")[0].trim().slice(0,18)}</div></div>`}
function card(m,idx){
  const curMode=state.page==="adult"?state.adultMode:state.mode;
  const top=idx===0&&curMode==="trending"?`<span class="movie-top">TOP 1</span>`:"";
  const title=(m.title||"").split("|")[0].trim();
  return `<article class="movie-card" onclick="detail(${m.id})">
    <div class="poster-wrap">
      <span class="movie-badge">MOVIE</span>${top}
      ${posterHTML(m)}
      ${m.duration?`<span class="movie-dur">4K ${m.duration}</span>`:""}
    </div>
    <div class="movie-body">
      <div class="mtitle">${title}</div>
      <div class="mmeta">
        <button type="button" class="share-btn" onclick="event.stopPropagation();shareMovie(${m.id})">↗ Share</button>
      </div>
    </div>
  </article>`;
}
function pageBackBar(title){return`<div class="page-back-bar"><button type="button" class="page-back-btn" id="pageBackBtn" onclick="goBack()">‹</button><span class="page-back-title">${title||""}</span></div>`}
function menuOnlyHeader(title){return`<div class="page-back-bar"><button type="button" class="menu-ham" id="hamBtn">☰</button><span class="page-back-title">${title||""}</span></div>`}
function bindPageBack(){const b=$("#pageBackBtn");if(b)b.onclick=()=>goBack()}
function primeHeader(){return`<div class="prime-row"><button type="button" class="menu-ham" id="hamBtn">☰</button><div class="prime-title">Cine <span class="scene-pill">Hub4</span></div></div>`}
function heroPills(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.mode==="new"?"active":""}" onclick="setMode('new')"><span class="hp-label">${cfg.newMoviesLabel||"New Movies"}</span><span class="hp-sub">${cfg.newMoviesSub||"LATEST UPLOADS"}</span></button><button type="button" class="hero-pill orange ${state.mode==="trending"?"active":""}" onclick="setMode('trending')"><span class="hp-label">${cfg.trendingLabel||"Trending"}</span><span class="hp-sub">${cfg.trendingSub||"MOST WATCHED"}</span></button></div></div>`}
function catRow(){const cats=cfg.categories||defaults.categories;return`<div class="cat-row">${cats.map(c=>`<button type="button" class="cat-chip ${state.category===c?"active":""}" onclick="filterCat('${String(c).replace(/'/g,"\\'")}')">${c}</button>`).join("")}</div>`}
function libCard(){
  const title=state.mode==="trending"?t("Trending Movies"):(cfg.libraryTitle||t("Cinema Library"));
  return `<div class="lib-card lib-card-sm"><div class="lib-badge"><i></i> ${cfg.libraryBadge||"MOVIE ZONE"}</div><h2>${title}</h2><p class="lib-desc">${cfg.libraryDesc||"Curated movies, web series and premium entertainment updates."}</p><button type="button" class="how-btn" onclick="howToEarn()">${cfg.howToWatchLabel||"▶ How to Watch"}</button></div>`;
}
function ticker(){
  const t=cfg.tickerText||"Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ";
  return `<div class="ticker"><span>${t}${t}</span></div>`;
}
function setMode(m){
  if(state.mode===m)return;
  showPageTransition(function(){state.mode=m;render(true)});
}
function filterCat(c){
  if(state.category===c)return;
  showPageTransition(function(){state.category=c;render(true)});
}
function listForHome(){let list=movies.filter(m=>!m.adult);if(state.category&&state.category!=="All Movies"&&state.category!=="All"){list=list.filter(m=>(m.category||"").toLowerCase().includes(state.category.toLowerCase().replace(" moves","").replace(" movie hindi",""))|| (m.category||"").toLowerCase()===state.category.toLowerCase())}if(state.mode==="trending")list=list.slice().sort((a,b)=>(b.views||b.clicks||0)-(a.views||a.clicks||0));else list=list.slice().sort((a,b)=>b.id-a.id);return list}
function moviesPage(){const list=listForHome();return primeHeader()+heroPills()+catRow()+libCard()+ticker()+list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No movies found.")}</div>`}
function setAdultMode(m){
  if(state.adultMode===m)return;
  showPageTransition(function(){state.adultMode=m;render(true)});
}
function filterAdultCat(c){
  if(state.adultCategory===c)return;
  showPageTransition(function(){state.adultCategory=c;render(true)});
}
function heroPillsAdult(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.adultMode==="new"?"active":""}" onclick="setAdultMode('new')"><span class="hp-label">${cfg.adultNewLabel||"New Movies"}</span><span class="hp-sub">${cfg.adultNewSub||"LATEST UPLOADS"}</span></button><button type="button" class="hero-pill orange ${state.adultMode==="trending"?"active":""}" onclick="setAdultMode('trending')"><span class="hp-label">${cfg.adultTrendingLabel||"Trending"}</span><span class="hp-sub">${cfg.adultTrendingSub||"MOST WATCHED"}</span></button></div></div>`}
function catRowAdult(){const cats=cfg.adultCategories||defaults.adultCategories;return`<div class="cat-row">${cats.map(c=>`<button type="button" class="cat-chip ${state.adultCategory===c?"active":""}" onclick="filterAdultCat('${String(c).replace(/'/g,"\\'")}')">${c}</button>`).join("")}</div>`}
function libCardAdult(){
  const title=state.adultMode==="trending"?"Trending Movies":(cfg.adultLibraryTitle||"Adult Library");
  return `<div class="lib-card lib-card-sm"><div class="lib-badge"><i></i> ${cfg.adultLibraryBadge||"ADULT ZONE"}</div><h2>${title}</h2><p class="lib-desc">${cfg.adultLibraryDesc||"Curated 18+ content and premium entertainment updates."}</p><button type="button" class="how-btn" onclick="howToEarn()">${cfg.adultHowToWatchLabel||"▶ How to Watch"}</button></div>`;
}
function tickerAdult(){
  const t=cfg.adultTickerText||"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ";
  return `<div class="ticker"><span>${t}${t}</span></div>`;
}
function listForAdult(){let list=movies.filter(m=>m.adult);if(state.adultCategory&&state.adultCategory!=="All"){list=list.filter(m=>(m.category||"").toLowerCase()===state.adultCategory.toLowerCase())}if(state.adultMode==="trending")list=list.slice().sort((a,b)=>(b.views||b.clicks||0)-(a.views||a.clicks||0));else list=list.slice().sort((a,b)=>b.id-a.id);return list}
function series(){const list=movies.filter(m=>!m.adult&&(m.category||"").toLowerCase().includes("series"));return menuOnlyHeader(t("Series"))+`<div class="section-title"><b>${t("Series")}</b><span>${t("Complete series")}</span></div>${list.map((m,i)=>card(m,i)).join("")||`<div class="panel">${t("Series not added yet.")}</div>`}`}
function adult(){
  if(!state.adultOK){
    return `<div class="gate-wrap">
      <div class="gate-card">
        <div class="gate-icon">🛡</div>
        <h2>${t("Adult Access Confirmation")}</h2>
        <p>${t("This section is reserved for mature viewers. Please confirm that you are 18 or older before entering the Adult Zone.")}</p>
        <div class="gate-note">${t("✓ I confirm that I am 18 or older")}</div>
        <div class="gate-note muted">${t("🔒 Your choice is remembered for this session only")}</div>
        <div class="gate-actions">
          <button type="button" class="gate-yes" onclick="confirmAdult()">${t("Yes, Enter")}</button>
          <button type="button" class="gate-no" onclick="nav('movies')">${t("No, Watch Movie")}</button>
        </div>
      </div>
    </div>`;
  }
  const list=listForAdult();
  return menuOnlyHeader(t("Adult"))+heroPillsAdult()+catRowAdult()+libCardAdult()+tickerAdult()+list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No adult content yet. Add from Admin Panel.")}</div>`;
}
function confirmAdult(){state.adultOK=true;render(true)}

function profile(){
  const tg=window.Telegram?.WebApp?.initDataUnsafe?.user;
  const name=tg?(tg.first_name||"")+(tg.last_name?" "+tg.last_name:""):"Cine Hub User";
  const uname=tg?.username?("@"+tg.username):"@user";
  const photo=tg?.photo_url||"";
  const refCode=String(tg?.id||localStorage.getItem("cinehub4_uid")||"1000001");
  if(!localStorage.getItem("cinehub4_uid")) localStorage.setItem("cinehub4_uid",refCode);
  const bot=(cfg.telegramBotLink||"https://t.me/Cinehub4bot").replace(/\/$/,"");
  const refLink=bot+(bot.includes("?")?"&":"?")+"startapp="+refCode;
  const refs=Number(localStorage.getItem("cinehub4_refs")||0);
  const cur=(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.get&&window.CINEHUB4_LANG.get())||localStorage.getItem("cinehub4_language")||"en";
  const avatar=photo?`<img src="${photo}" alt="">`:(name[0]||"U").toUpperCase();
  return menuOnlyHeader(t("Profile"))+`
  <div class="pf-card">
    <div class="pf-avatar">${avatar}</div>
    <div class="pf-meta">
      <div class="pf-name">${name} <span class="pf-seed">SEED</span></div>
      <div class="pf-user">${uname}</div>
      <div class="pf-verified">✓ ${t("Verified User")}</div>
    </div>
    <div class="pf-lang-mini">
      <div class="lang-label">A文 ${t("Language")}</div>
      <div class="lang-toggle">
        <button type="button" class="lang-btn ${cur==="bn"?"active":""}" data-lang="bn">🇧🇩 বাংলা</button>
        <button type="button" class="lang-btn ${cur==="en"?"active":""}" data-lang="en">🇺🇸 English</button>
      </div>
    </div>
  </div>
  <div class="pf-section">📊 ${t("OVERVIEW")}</div>
  <div class="pf-stats">
    <div class="pf-stat"><div><b>${state.points}</b><span>${t("My Points")}</span></div><div class="ico">🪙</div></div>
    <div class="pf-stat"><div><b>${refs}</b><span>${t("Total Referrals")}</span></div><div class="ico">👥</div></div>
  </div>
  <div class="pf-section">🔗 ${t("REFERRAL SYSTEM")}</div>
  <div class="pf-panel">
    <div class="pf-row"><span>${t("Per Referral Reward")}</span><b>${cfg.referralReward||20} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Join Bonus")}</span><b>${cfg.joinBonus||10} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Referral Code")}</span><b>${refCode}</b></div>
    <div style="font-size:12px;color:#9aa3b8;margin-top:8px">${t("Your Referral Link")}</div>
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


function points(){return pageBackBar(t("My Points"))+`<div class="section-title"><b>🪙 My Points</b><span>${state.points} points</span></div><div class="panel"><div class="amount">${state.points} <span class="muted">points</span></div><div class="task"><span>📺 Watch Ad & Earn</span><b>+${cfg.adReward}</b><button class="primary cyan" onclick="watchAd('rewarded')">Watch</button></div><div class="task"><span>🛒 Buy Points</span><button class="primary pink" onclick="nav('buy')">Buy</button></div><div class="task"><span>👥 Refer & Earn</span><button class="pill" onclick="shareRef()">Share</button></div></div><div class="panel"><h3>Daily Ad Limit</h3><div class="task"><span>Only for earning points</span><b>${cfg.dailyAdLimit}/day</b></div><div class="muted">Movie unlock-এর সময় ad limit প্রযোজ্য নয়।</div></div>`}

function getTasks(){
  if(cfg.tasks&&cfg.tasks.length) return cfg.tasks;
  return [
    {name:"one click",reward:2,limit:1,type:"countdown",seconds:5},
    {name:"one click ads",reward:1,limit:1,type:"countdown",seconds:5},
    {name:"Watch rewarded ad",reward:cfg.adReward||2,limit:cfg.dailyAdLimit||20,type:"ad"},
    {name:"Join Telegram channel",reward:5,limit:1,type:"link",link:cfg.telegramChannelLink||cfg.telegramBotLink},
    {name:"Refer a friend",reward:cfg.referralReward||20,limit:10,type:"share"},
    {name:"Daily login",reward:2,limit:1,type:"login"}
  ];
}
function tasks(){
  const watched=Number(localStorage.getItem("cinehub4_ads_today")||0);
  const limit=Number(cfg.dailyAdLimit||20);
  const rem=Math.max(0,limit-watched);
  const list=getTasks();
  return pageBackBar(t("Daily Tasks"))+`
  <div class="pf-section">⚡ ${t("EARN & UNLOCK")}</div>
  <div class="pf-stats">
    <div class="pf-stat"><div><b>${state.points}</b><span>${t("Current Balance")}</span></div><div class="ico">🪙</div></div>
    <div class="pf-stat"><div><b>${cfg.adReward||2}</b><span>${t("Points Per Ad")}</span></div><div class="ico">🎁</div></div>
    <div class="pf-stat"><div><b>${watched}</b><span>${t("Ads Watched")}</span></div><div class="ico">👁</div></div>
    <div class="pf-stat"><div><b>${limit}</b><span>${t("Daily Limit")}</span></div><div class="ico">🛡</div></div>
  </div>
  <div class="pf-section">⚙ ${t("EARNING SETTINGS")}</div>
  <div class="pf-panel">
    <div class="pf-row"><span>${t("Reward Per Ad")}</span><b>${cfg.adReward||2} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Maximum Daily Ads")}</span><b>${limit}</b></div>
    <div class="pf-row"><span>${t("Remaining Today")}</span><b>${rem}</b></div>
    <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,(watched/limit)*100)}%"></div></div>
    <div class="muted" style="font-size:11px;margin-top:6px">${watched} / ${limit} completed today</div>
    <button type="button" class="pf-btn wide copy" style="margin-top:12px" onclick="watchAd('rewarded')">▶ ${t("Watch Ad Now")}</button>
  </div>
  <div class="pf-section">🎁 ${t("MORE EARNING BUTTONS")}</div>
  ${list.map((t,i)=>`<div class="task-row">
    <div class="task-ico">🎁</div>
    <div class="task-meta"><b>${t.name}</b><span>Reward: ${t.reward} pt · Daily limit: ${t.limit||1}</span></div>
    <button type="button" class="task-start" onclick="runTask(${i})">${t("Start")}</button>
  </div>`).join("")}`;
}
function runTask(i){
  const t=getTasks()[i];if(!t)return;
  const doneKey="cinehub4_task_"+i+"_"+new Date().toDateString();
  if(t.limit===1 && localStorage.getItem(doneKey)){toast("Already completed today");return}
  if(t.type==="ad"){watchAd('task');return}
  if(t.type==="link"){
    openLink(t.link||cfg.telegramChannelLink||cfg.telegramBotLink);
    // credit after opening (demo)
    state.points+=Number(t.reward||0);save();
    localStorage.setItem(doneKey,"1");
    toast("+"+(t.reward||0)+" points");
    render(true);
    return;
  }
  if(t.type==="share"){shareRefLink();return}
  if(t.type==="countdown"||t.type==="oneclick"){
    const secs=Number(t.seconds||t.secs||5);
    showCountdownTask(t.name||"one click",secs,function(){
      state.points+=Number(t.reward||1);save();
      localStorage.setItem(doneKey,"1");
      toast("+"+(t.reward||1)+" points added");
      render(true);
    });
    return;
  }
  if(t.type==="login"){
    const key="cinehub4_login_"+new Date().toDateString();
    if(localStorage.getItem(key)){toast("Already claimed today");return}
    state.points+=Number(t.reward||2);
    localStorage.setItem("cinehub4_points",String(state.points));
    localStorage.setItem(key,"1");
    toast("+"+(t.reward||2)+" points");
    render(true);
  }
}

function settings(){return pageBackBar("Settings")+`<div class="section-title"><b>⚙ Settings</b></div><div class="panel"><div class="task"><span>Language</span><select class="pill" style="appearance:auto" onchange="CINEHUB4_LANG.set(this.value)"><option value="en" ${CINEHUB4_LANG.get()==="en"?"selected":""}>English</option><option value="bn" ${CINEHUB4_LANG.get()==="bn"?"selected":""}>বাংলা</option></select></div><div class="task"><span>Telegram</span><button class="pill" onclick="openLink(cfg.telegramBotLink)">Open</button></div><div class="task"><span>How To Earn</span><button class="pill" onclick="howToEarn()">Watch Video</button></div></div>`}

function getPackages(){
  const list = (cfg.packages&&cfg.packages.length)?cfg.packages:[
    {name:"Basic Package",tag:"SMART CHOICE",price:0.99,points:110},
    {name:"Standard Package",tag:"STARTER",price:4.99,points:550},
    {name:"Premium Package",tag:"BEST VALUE",price:9.99,points:1200},
    {name:"Ultimate Package",tag:"POPULAR",price:14.99,points:2000}
  ];
  return list.map(p=>({
    name:p.name||"Package",
    tag:p.tag||"",
    price:Number(p.price!=null?p.price:p.usd)||0,
    points:Number(p.points!=null?p.points:p.pts)||0
  }));
}
function getWallets(){
  if(cfg.wallets&&cfg.wallets.length) return cfg.wallets;
  if(cfg.usdtWallet) return [{name:cfg.usdtNetwork||"USDT TRC20",address:cfg.usdtWallet,network:cfg.usdtNetwork||"TRC20"}];
  return [{name:"USDT TRC20",address:"(Set wallet in Admin)",network:"TRC20"}];
}
function startBuy(name,price,points){
  state.buyOrder={name:name,price:Number(price),points:Number(points)};
  state.buyStep="confirm";
  render(true);
}
function confirmBuy(){
  state.buyStep="pay";
  render(true);
}
function cancelBuy(){
  state.buyStep=null;state.buyOrder=null;state.selectedWallet=null;
  render(true);
}
function selectWallet(i){
  const w=getWallets()[i];
  if(!w)return;
  state.selectedWallet=w;
  render(true);
}
function copyWalletAddr(){
  const a=state.selectedWallet&&state.selectedWallet.address;
  if(!a)return;
  try{navigator.clipboard.writeText(a);toast(t("Address copied"))}catch(e){toast(a)}
}
function submitPayment(){
  const order=state.buyOrder;if(!order)return;
  const txid=(document.getElementById("payTxid")||{}).value||"";
  const fileInput=document.getElementById("payShot");
  let proofName="";
  let proofData="";
  const finish=function(){
    const tg=window.Telegram?.WebApp?.initDataUnsafe?.user;
    const user=tg?((tg.first_name||"")+(tg.last_name?" "+tg.last_name:"")):("User "+(localStorage.getItem("cinehub4_uid")||""));
    const uid=String(tg?.id||localStorage.getItem("cinehub4_uid")||"");
    const now=new Date();
    const list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
    list.push({
      id:Date.now(),
      user:user,
      uid:uid,
      pkg:order.name,
      usdt:order.price,
      points:order.points,
      txid:txid,
      proof:proofName||"(screenshot)",
      proofData:proofData,
      wallet:(state.selectedWallet&&state.selectedWallet.name)||"",
      network:(state.selectedWallet&&state.selectedWallet.network)||"",
      status:"pending",
      ts:now.getTime(),
      date:now.toLocaleString(),
      created:now.toISOString()
    });
      localStorage.setItem("cinehub4_payments",JSON.stringify(list));
    state.buyStep=null;state.buyOrder=null;state.selectedWallet=null;
    toast(t("Payment request submitted"));
    nav("profile");
  };
  try{
    if(fileInput&&fileInput.files&&fileInput.files[0]){
      proofName=fileInput.files[0].name;
      const reader=new FileReader();
      reader.onload=function(e){proofData=e.target.result||"";finish()};
      reader.onerror=function(){finish()};
      reader.readAsDataURL(fileInput.files[0]);
      return;
    }
  }catch(e){}
  finish();
}
function updateCustomUsdt(){
  const pts=Number((document.getElementById("customPts")||{}).value||0);
  // rate: ~100 pts per 1 USDT from Ultimate 2000/14.99 ≈ 133; use 100 pts = 1 USDT simple
  const rate=Number(cfg.customPointRate||100);
  const usdt=pts>0?(pts/rate):0;
  const el=document.getElementById("customUsdtShow");
  if(el) el.textContent=usdt.toFixed(2)+" USDT";
}
function buyCustom(){
  const pts=Number((document.getElementById("customPts")||{}).value||0);
  if(pts<=0){toast("Enter points amount");return}
  const rate=Number(cfg.customPointRate||100);
  const price=+(pts/rate).toFixed(2);
  startBuy("Custom "+pts+" Points",price,pts);
}
function buy(){
  if(state.buyStep==="confirm"&&state.buyOrder){
    const o=state.buyOrder;
    return pageBackBar("Buy Points")+`
    <div class="buy-modal">
      <div class="buy-modal-icon">👑</div>
      <h2>Confirm Purchase</h2>
      <div class="pf-panel">
        <div class="pf-row"><span>Package</span><b>${o.name}</b></div>
        <div class="pf-row"><span>$ Pay Amount</span><b>${o.price} USDT</b></div>
        <div class="pf-row"><span>🪙 You Get</span><b>${o.points} Points</b></div>
      </div>
      <p class="muted" style="font-size:12px;line-height:1.45">After confirmation, select a wallet address, send the exact USDT amount, then submit TxID and screenshot for admin approval.</p>
      <div class="pf-actions" style="margin-top:14px">
        <button type="button" class="pf-btn" onclick="cancelBuy()">Cancel</button>
        <button type="button" class="pf-btn copy" onclick="confirmBuy()">Confirm</button>
      </div>
    </div>`;
  }
  if(state.buyStep==="pay"&&state.buyOrder){
    const o=state.buyOrder;
    const wallets=getWallets();
    const sw=state.selectedWallet;
    const walletOpts=wallets.map((w,i)=>`<option value="${i}">${w.name||("Wallet "+(i+1))}</option>`).join("");
    return pageBackBar("Buy Points")+`
    <button type="button" class="pf-btn wide" style="margin-bottom:12px" onclick="cancelBuy()">👑 Purchase Custom Coins</button>
    <div class="pf-section">💳 PAYMENT STEP</div>
    <div class="pf-panel">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div class="stat-mini"><span>PAY AMOUNT</span><b>${o.price} USDT</b></div>
        <div class="stat-mini"><span>YOU GET</span><b>${o.points}</b></div>
      </div>
      <label style="font-size:12px;color:#9aa3b8">Select Wallet</label>
      <select id="walletPick" onchange="selectWallet(this.value)" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#eef1ff">
        <option value="">Choose wallet</option>
        ${walletOpts}
      </select>
      <div class="pf-linkbox" style="display:flex;align-items:center;justify-content:space-between;gap:8px">
        <span style="word-break:break-all;font-size:12px">${sw?sw.address:"Wallet address will appear here."}</span>
        <button type="button" class="primary" style="flex-shrink:0" onclick="copyWalletAddr()">📋</button>
      </div>
      <p class="muted" style="font-size:11px;margin:10px 0">Send the exact USDT amount to the selected address. Then submit your TxID and payment screenshot below.</p>
      <label style="font-size:12px;color:#9aa3b8">Transaction ID / TxID</label>
      <input id="payTxid" type="text" placeholder="Paste your transaction hash / TxID here" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#eef1ff">
      <label style="font-size:12px;color:#9aa3b8">Payment Screenshot</label>
      <input id="payShot" type="file" accept="image/*" style="width:100%;margin:8px 0;color:#9aa3b8">
      <button type="button" class="pf-btn wide copy" style="margin-top:10px" onclick="submitPayment()">✈ Submit Payment Request</button>
    </div>`;
  }
  const pkgs=getPackages();
  const icons=["⚡","⭐","🏅","👑","💎","🔥"];
  return pageBackBar("Buy Points")+`
  <div class="earn-card">
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
      <div class="ico" style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#7c5cff,#5b8cff);display:grid;place-items:center;font-size:22px">🪙</div>
      <div><h3 style="margin:0">Buy Premium Points</h3>
      <p style="margin:4px 0 0;font-size:12px;color:#9aa3b8">Select a package or enter custom USDT amount, then submit your payment proof for admin approval.</p></div>
    </div>
    <button type="button" class="pf-btn wide" style="margin-top:8px" onclick="openLink(cfg.howToBuyVideo||cfg.telegramBotLink)">▶ How to Buy Points</button>
  </div>
  <div class="pf-section">💎 SELECT PACKAGE</div>
  ${pkgs.map((p,i)=>`<div class="pkg-row">
    <div class="pkg-ico">${icons[i%icons.length]}</div>
    <div class="pkg-meta">
      <div class="pkg-name">${p.name} ${p.tag?`<span class="pkg-tag">${p.tag}</span>`:""}</div>
      <div class="pkg-sub">$ ${p.price} USDT · <span style="color:#4ade80">${p.points} Points</span></div>
    </div>
    <button type="button" class="pkg-buy" onclick="startBuy('${p.name.replace(/'/g,"")}',${p.price},${p.points})">🛒 Buy</button>
  </div>`).join("")}
  <div class="pf-section">✦ CUSTOM AMOUNT</div>
  <div class="pf-panel">
    <label style="font-size:12px;color:#9aa3b8">Enter Points Amount</label>
    <input id="customPts" type="number" placeholder="Example: 1000" oninput="updateCustomUsdt()" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#eef1ff">
    <div class="pf-row"><span>Required USDT</span><b id="customUsdtShow">0.00 USDT</b></div>
    <button type="button" class="pf-btn wide copy" style="margin-top:10px" onclick="buyCustom()">👑 Purchase Custom Coins</button>
  </div>`;
}

function detail(id){
  const m=movies.find(x=>x.id===id);if(!m)return;
  m.clicks=(m.clicks||0)+1;m.views=(m.views||m.clicks);save();
  if(state.page!=="detail"){
    state.history.push(state.page);
    if(state.history.length>30)state.history.shift();
    try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history))}catch(e){}
  }
  state.detailId=id;state.unlockProgress=0;
  if(typeof showPageTransition==="function"){
    showPageTransition(function(){
      state.page="detail";
      localStorage.setItem("cinehub4_page","detail");
      render(false);
    });
  }else{
    state.page="detail";
    localStorage.setItem("cinehub4_page","detail");
    render(false);
  }
}

function detailView(){
  const m=movies.find(x=>x.id===state.detailId);if(!m)return moviesPage();
  const cost=Number(cfg.unlockCost)||5;
  const need=cost;
  const my=state.points;
  const rem=Math.max(0,need-state.unlockProgress);
  const prog=state.unlockProgress;
  const title=(m.title||"").split("|")[0].trim();
  return pageBackBar(t("Movie"))+`
  <div class="unlock-page">
    <div class="unlock-notice">
      <div class="bell">🔔</div>
      <div>
        <div class="un-title">${t("UNLOCK NOTICE")}</div>
        <div class="un-sub">${t("MOVIE CONTENT")}</div>
        <div class="muted">${t("Unlock this content using ads or points.")}</div>
      </div>
    </div>
    <div class="unlock-poster">${posterHTML(m)}</div>
    <div class="unlock-actions-top">
      <button type="button" class="share-only" onclick="shareMovie(${m.id})">↗ ${t("Share")}</button>
    </div>
    <div class="unlock-title">${title}</div>
    <div class="unlock-sub">${m.genre||""} • ${m.year||""}</div>
    <div class="points-box">
      <div class="pb-label">● ${t("Unlock this content using ads or points.")}</div>
      <div class="points-row">
        <div class="pc need"><span>${t("Need")}</span><b>${need}</b></div>
        <div class="pc myp"><span>${t("My Points")}</span><b>${my}</b></div>
        <div class="pc rem"><span>${t("Remaining")}</span><b>${rem}</b></div>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar"><i style="width:${Math.min(100,(prog/need)*100)}%"></i></div>
        <div class="progress-text">Progress: ${prog}/${need}<br>Unlock with points or ads.</div>
      </div>
            <div class="unlock-actions">
        <button type="button" class="btn-unlock lock" onclick="unlockWithAds()">🔒 ${t("Unlock Video")}</button>
        <button type="button" class="btn-unlock points" onclick="usePointsForUnlock()">🪙 ${t("Use My Points")}</button>
      </div>
    </div>
    <button type="button" class="btn-more" onclick="nav(state.page==='adult'||(movies.find(x=>x.id===state.detailId)||{}).adult?'adult':'movies')">🎬 More Watching ›</button>
  </div>`;
}
function usePointsForUnlock(){const cost=Number(cfg.unlockCost)||5;if(state.points<1){toast(t("No points available"));return}if(state.unlockProgress>=cost){toast(t("Already unlocked"));return}state.points-=1;state.unlockProgress+=1;save();toast(t("1 point used"));if(state.unlockProgress>=cost){toast(`Unlocked for ${cfg.unlockHours} hours`);}render(false)}
function unlockWithAds(){watchAd("unlock")}
function unlockPoints(){const c=Number(cfg.unlockCost)||5;if(state.points<c){toast("পয়েন্ট যথেষ্ট নেই");return}state.points-=c;save();toast(`Unlocked for ${cfg.unlockHours} hours`)}
function showCountdownTask(name,secs,onDone){
  const ov=document.createElement("div");
  ov.className="modal";
  ov.id="cdModal";
  let left=secs||5;
  ov.innerHTML=`<div class="modal-card cd-card"><div class="cd-ring"><span class="cd-play">▶</span></div><b>${name||"Task"}</b><div class="muted">Keep this page open until countdown ends.</div><div class="cd-num" id="cdNum">${left}s</div></div>`;
  document.body.appendChild(ov);
  const tick=setInterval(function(){
    left--;
    const el=document.getElementById("cdNum");
    if(el) el.textContent=left+"s";
    if(left<=0){
      clearInterval(tick);
      ov.remove();
      if(onDone) onDone();
    }
  },1000);
}
function watchAd(mode){
  const id=mode==="adult"?cfg.adBlocks?.adult:(mode==="task"?cfg.adBlocks?.task:cfg.adBlocks?.rewarded)||cfg.adBlocks?.rewarded;
  if(!id && mode!=="countdown"){toast("Admin has not configured this Ad Block ID");return}
  // Daily limit only for earning modes
  if(mode!=="unlock" && mode!=="adult"){
    const watched=Number(localStorage.getItem("cinehub4_ads_today")||0);
    const limit=Number(cfg.dailyAdLimit||20);
    if(watched>=limit){toast(t("Daily ad limit reached"));return}
  }
  const m=document.createElement("div");
  m.className="modal";
  m.innerHTML=`<div class="modal-card"><div class="video-ad"><div><div class="play">▶</div><b>Opening Ad</b><div class="muted">Please wait while ad is loading.</div><div class="muted" style="margin-top:6px">Ad Block #${id||"—"}</div></div></div></div>`;
  document.body.appendChild(m);
  setTimeout(function(){
    m.innerHTML=`<div class="modal-card"><div class="video-ad"><div><div class="play">▶</div><b>Ad · 18+</b><div class="muted">Demo rewarded advertisement</div></div></div><div class="progress-bar" style="margin:12px 0"><i id="adProg" style="width:0%;height:100%;display:block;background:linear-gradient(90deg,#3b82f6,#06b6d4);border-radius:999px"></i></div><div class="muted" id="adPct">0%</div><button class="primary cyan wide" id="completeDemoAd" style="margin-top:10px">Complete Ad</button></div>`;
    let pct=0;
    const iv=setInterval(function(){
      pct=Math.min(100,pct+25);
      const bar=document.getElementById("adProg");
      const lab=document.getElementById("adPct");
      if(bar) bar.style.width=pct+"%";
      if(lab) lab.textContent=pct+"%";
      if(pct>=100) clearInterval(iv);
    },400);
    const btn=document.getElementById("completeDemoAd");
    if(btn) btn.onclick=function(){
      m.remove();
      if(mode==="unlock"){
        const cost=Number(cfg.unlockCost)||5;
        state.unlockProgress=Math.min(cost,(state.unlockProgress||0)+1);
        toast("1 progress from ad");
        if(state.unlockProgress>=cost){
          // mark unlock with expiry
          try{
            const key="cinehub4_unlock_"+state.detailId;
            const hours=Number(cfg.unlockHours)||15;
            localStorage.setItem(key,String(Date.now()+hours*3600*1000));
          }catch(e){}
          toast("Movie unlocked for "+cfg.unlockHours+" hours");
        }
        render(false);
      }else{
        const reward=Number(cfg.adReward||2);
        state.points+=reward;
        const watched=Number(localStorage.getItem("cinehub4_ads_today")||0)+1;
        localStorage.setItem("cinehub4_ads_today",String(watched));
        localStorage.setItem("cinehub4_ads_day",new Date().toDateString());
        save();
        toast("+"+reward+" points added");
        render(true);
      }
    };
  },900);
}

function startVoiceSearch(){
  try{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){toast("Voice search not supported");return}
    const r=new SR();
    r.lang=(localStorage.getItem("cinehub4_language")==="bn")?"bn-BD":"en-US";
    r.interimResults=false;
    r.maxAlternatives=1;
    const mic=document.getElementById("micBtn");
    if(mic){mic.classList.add("listening");mic.style.background="#ef4444";mic.style.color="#fff";}
    r.onresult=function(ev){
      const t=(ev.results[0]&&ev.results[0][0]&&ev.results[0][0].transcript)||"";
      state.query=t;
      const q=document.getElementById("q");
      if(q) q.value=t;
      doSearch();
    };
    r.onerror=function(){toast("Voice failed");if(mic){mic.classList.remove("listening");mic.style.background="";mic.style.color=""}};
    r.onend=function(){if(mic){mic.classList.remove("listening");mic.style.background="";mic.style.color=""}};
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
  let list=movies.filter(m=>!m.adult);
  if(q) list=list.filter(m=>((m.title||"")+(m.genre||"")+(m.category||"")).toLowerCase().includes(q));
  return `<div class="search-top">
    <button type="button" class="menu-ham" id="hamBtn">☰</button>
    <div class="search-bar-wrap">
      <input id="q" type="search" placeholder="${t("Search movies...")}" value="${(state.query||"").replace(/"/g,"&quot;")}" onkeydown="if(event.key==='Enter')doSearch()">
      <button type="button" class="mic-btn" id="micBtn" title="Voice search" aria-label="Voice search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2"/><path d="M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button type="button" class="search-go" onclick="doSearch()" aria-label="Search">🔍</button>
    </div>
  </div>
  <div class="section-title"><b>${t("Results")}</b><span>${list.length}</span></div>
  ${list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No movies found")}</div>`}`;
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

function bindLangButtons(){
  document.querySelectorAll("[data-lang]").forEach(function(btn){
    btn.onclick=function(e){
      e.preventDefault();e.stopPropagation();
      var lang=btn.getAttribute("data-lang");
      if(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.set){
        window.CINEHUB4_LANG.set(lang);
      }else{
        localStorage.setItem("cinehub4_language",lang);
      }
      try{render(false)}catch(err){}
      try{window.CINEHUB4_LANG&&window.CINEHUB4_LANG.translateDOM()}catch(err){}
    };
  });
}

function render(animate=false){try{const views={movies:moviesPage,search:searchPage,series,adult,profile,points,tasks,settings,buy,detail:detailView,home:moviesPage};const screen=$("#screen");if(!screen){console.error("no #screen");return}const fn=views[state.page]||moviesPage;let html="";try{html=fn()}catch(err){html="<div class=\"panel\" style=\"padding:16px;color:#f88\"><b>Page error</b><pre style=\"font-size:11px;white-space:pre-wrap\">"+String(err.message||err)+"</pre></div>";console.error(err)}screen.innerHTML=html;if(animate){screen.classList.remove("page-enter");void screen.offsetWidth;screen.classList.add("page-enter")}$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===state.page||(state.page==="detail"&&b.dataset.page==="movies")));bindPageBack();bindDrawer();setupAdminButton();window.CINEHUB4_LANG?.translateDOM();
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

function handleStartParam(){
  try{
    const tg=window.Telegram&&window.Telegram.WebApp;
    let sp=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.start_param)||"";
    if(!sp){
      const q=new URLSearchParams(location.search);
      sp=q.get("tgWebAppStartParam")||q.get("startapp")||q.get("start")||"";
    }
    if(!sp) return;
    if(sp.indexOf("movie_")==0){
      const id=Number(sp.replace("movie_",""));
      if(id){state.detailId=id;state.page="detail";}
    }else if(sp.indexOf("ref_")==0){
      // referral handled by bot usually
    }
  }catch(e){}
}
handleStartParam();
bindLeaveGuard();

try{render(false)}catch(e){console.error(e);var s=document.getElementById("screen");if(s)s.innerHTML="<div style=padding:20px;color:#f88>Boot error: "+e.message+"</div>"}
function killSplash(){const s=document.getElementById("appSplash");if(!s)return;s.classList.add("gone");s.style.display="none";try{s.remove()}catch(e){}}
killSplash();
setTimeout(killSplash,400);
setTimeout(killSplash,1200);
setTimeout(killSplash,2000);

function showLeaveDialog(){
  if(document.getElementById("leaveOverlay")) return;
  const ov=document.createElement("div");
  ov.id="leaveOverlay";
  ov.className="leave-overlay";
  ov.innerHTML=`<div class="leave-card">
    <div class="leave-icon">↪</div>
    <h2>${t("Do you want to leave?")}</h2>
    <p>Leaving Cine Hub4 will close your current page.</p>
    <div class="leave-actions">
      <button type="button" class="leave-stay" id="leaveStay">🏠 ${t("Stay here")}</button>
      <button type="button" class="leave-go" id="leaveGo">${t("Leave")}</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
  document.getElementById("leaveStay").onclick=function(){ov.remove()};
  document.getElementById("leaveGo").onclick=function(){
    ov.remove();
    try{
      if(window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.close){
        window.Telegram.WebApp.close();
        return;
      }
    }catch(e){}
    try{window.close()}catch(e){}
  };
}
function bindLeaveGuard(){
  try{
    const tg=window.Telegram&&window.Telegram.WebApp;
    if(tg&&tg.BackButton){
      tg.BackButton.show();
      // avoid double-binding
      try{tg.BackButton.offClick&&tg.BackButton.offClick()}catch(e){}
      tg.BackButton.onClick(function(){
        // Always prefer in-app history first
        if(state.history&&state.history.length){
          goBack();
          return;
        }
        // On detail without history → go movies
        if(state.page==="detail"||state.page==="points"||state.page==="tasks"||state.page==="settings"||state.page==="buy"||state.page==="search"){
          showPageTransition(function(){
            state.page="movies";
            localStorage.setItem("cinehub4_page","movies");
            render(true);
          });
          return;
        }
        // Already on main tabs with empty history → leave confirm
        showLeaveDialog();
      });
    }
  }catch(e){}
  // Android hardware back via popstate
  try{
    if(!window.__cinehub4_popstate){
      window.__cinehub4_popstate=true;
      history.pushState({cinehub:1},"");
      window.addEventListener("popstate",function(ev){
        history.pushState({cinehub:1},"");
        if(state.history&&state.history.length){goBack();return}
        if(state.page&&state.page!=="movies"&&state.page!=="home"){
          showPageTransition(function(){state.page="movies";localStorage.setItem("cinehub4_page","movies");render(true)});
          return;
        }
        showLeaveDialog();
      });
    }
  }catch(e){}
                         }
