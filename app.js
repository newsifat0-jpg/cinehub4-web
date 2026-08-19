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

function howToEarn(){const u=cfg.howToWatchVideo||cfg.telegramBotLink;if(u)openLink(u);else toast(t("How to Watch link not set"));}

/* Build Mini App deep link that OPENS the Mini App (not bot chat).
   Correct format: https://t.me/BotUsername/app?startapp=PARAM
   Wrong (opens bot only): https://t.me/BotUsername?startapp=PARAM
*/
function getBotUsername(){
  let u=(cfg.botUsername||"").replace(/^@/,"").trim();
  if(u) return u;
  const link=(cfg.telegramBotLink||cfg.miniAppLink||"").trim();
  const m=link.match(/t\.me\/([A-Za-z0-9_]+)/i);
  return m?m[1]:"Cinehub4bot";
}
function getMiniAppShortName(){
  // BotFather short name for this project is Hub4 → t.me/Cinehub4bot/Hub4
  const n=(cfg.miniAppName||cfg.miniAppShortName||"Hub4").replace(/^\/+|\/+$/g,"").trim();
  return n||"Hub4";
}
function buildMiniAppLink(startParam){
  // If admin set a full mini app base URL like https://t.me/bot/app — use it
  let base=(cfg.miniAppLink||"").trim().replace(/\/$/,"");
  if(base && /t\.me\//i.test(base)){
    // strip existing query
    base=base.split("?")[0].replace(/\/$/,"");
  }else{
    const bot=getBotUsername();
    const short=getMiniAppShortName();
    base="https://t.me/"+bot+"/"+short;
  }
  if(startParam){
    const p=String(startParam).replace(/[^A-Za-z0-9_\-]/g,"").slice(0,64);
    return base+"?startapp="+encodeURIComponent(p);
  }
  return base;
}
function nativeShare(opts){
  const title=opts.title||"Cine Hub4";
  const text=opts.text||"";
  const url=opts.url||buildMiniAppLink();
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
  const mid=Number(id);
  const m=movies.find(x=>x.id===mid||x.id===id);
  const title=m?(m.title||"").split("|")[0].trim():"Movie";
  // Deep link: opens Mini App → exact movie detail page
  // Format: https://t.me/BotUsername/app?startapp=movie_ID
  const link=buildMiniAppLink("movie_"+mid);
  const text=title+" — watch on Cine Hub4\n"+link;
  nativeShare({title:title+" | Cine Hub4", text:text, url:link});
}
function shareRef(){shareRefLink()}
function shareRefLink(){
  const uid=(function(){try{return String(window.Telegram?.WebApp?.initDataUnsafe?.user?.id||"")}catch(e){return ""}})();
  const param="ref_"+(uid||"friend");
  let link=buildMiniAppLink(param);
  // If profile already shows a link, prefer that only if it already has /app?startapp=
  const el=document.getElementById("refLinkText");
  const shown=(el&&el.textContent?el.textContent.trim():"");
  if(shown && /t\.me\/.+\/.+[?&]startapp=/i.test(shown)) link=shown;
  nativeShare({title:"Cine Hub4 Referral", text:"Join me on Cine Hub4 and earn points!", url:link});
}
function openLink(u){if(!u)return;try{window.Telegram?.WebApp?.openTelegramLink?.(u)||window.Telegram?.WebApp?.openLink?.(u)||window.open(u,"_blank")}catch(e){window.open(u,"_blank")}}
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const defaults={appName:"Cine Hub4",botUsername:"@Cinehub4bot",telegramBotLink:"https://t.me/Cinehub4bot",miniAppName:"Hub4",miniAppLink:"https://t.me/Cinehub4bot/Hub4",telegramChannelLink:"",howToWatchVideo:"",watchTutorialVideo:"",howToWatchText:"Unlock this content using ads or points.",unlockCost:5,unlockHours:15,adsForUnlock:5,downloadServers:3,adReward:2,dailyAdLimit:20,joinBonus:10,referralReward:20,categories:["All Movies","Bangla Moves","Hollywood Movie Hindi"],adultCategories:["All","Adult Movie","Anime"],tickerText:"Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ",adultTickerText:"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ",libraryBadge:"MOVIE ZONE",libraryTitle:"Cinema Library",libraryDesc:"Curated movies, web series and premium entertainment updates.",adultLibraryBadge:"ADULT ZONE",adultLibraryTitle:"Adult Library",adultLibraryDesc:"Curated 18+ content and premium entertainment updates.",howToWatchLabel:"▶ How to Watch",adultHowToWatchLabel:"▶ How to Watch",newMoviesLabel:"New Movies",newMoviesSub:"LATEST UPLOADS",trendingLabel:"Trending",trendingSub:"MOST WATCHED",adultNewLabel:"New Movies",adultNewSub:"LATEST UPLOADS",adultTrendingLabel:"Trending",adultTrendingSub:"MOST WATCHED",packages:[
    {name:"Basic Package",price:0.99,points:110,tag:"SMART CHOICE"},
    {name:"Standard Package",price:4.99,points:550,tag:"STARTER"},
    {name:"Premium Package",price:9.99,points:1200,tag:"BEST VALUE"},
    {name:"Ultimate Package",price:14.99,points:2000,tag:"POPULAR"}
  ],
  wallets:[{name:"USDT TRC20",address:"",network:"TRC20"}],
  tasks:[],
  customPointRate:100,
  adBlocks:{rewarded:"",interstitial:"",banner:"",bannerAdult:"",task:"",adult:""},showMovieBanner:true,showAdultBanner:true,movieBannerImg:"",movieBannerLink:"",adultBannerImg:"",adultBannerLink:""};
let cfg={...defaults,...JSON.parse(localStorage.getItem("cinehub4_settings")||"{}")};
if(!cfg.categories||!cfg.categories.length)cfg.categories=defaults.categories.slice();
if(!cfg.adultCategories||!cfg.adultCategories.length)cfg.adultCategories=defaults.adultCategories.slice();
let movies=[];
let userData={points:1,unlocks:{},ads_today:0,ads_day:"",language:"en",refs:0};
const state={page:localStorage.getItem("cinehub4_page")||"movies",adultOK:false,points:1,query:"",category:"All Movies",mode:"new",adultCategory:"All",adultMode:"new",history:JSON.parse(sessionStorage.getItem("cinehub4_history")||"[]"),unlockProgress:0,buyStep:null,buyOrder:null,moviesLoaded:false,userLoaded:false};
function save(){
  // points & unlocks go to Firebase users/{uid}
  if(window.CineHubFB){
    window.CineHubFB.updateUserField(null,{
      points: state.points,
      unlocks: userData.unlocks || {},
      ads_today: userData.ads_today || 0,
      ads_day: userData.ads_day || "",
      language: userData.language || "en",
      refs: userData.refs || 0
    });
  } else {
    localStorage.setItem("cinehub4_points",state.points);
  }
}
function loadMoviesFromFB(){
  if(!window.CineHubFB){state.moviesLoaded=true;try{render(false)}catch(e){}return}
  var got=false;
  window.CineHubFB.listenMovies(function(list){
    got=true;
    movies=list||[];
    state.moviesLoaded=true;
    try{render(false)}catch(e){console.error(e)}
  });
  // Fallback: if client Firestore returns empty (rules/index), pull via backend API
  setTimeout(function(){
    if(got && movies && movies.length) return;
    if(window.CineHubFB.loadMoviesApi){
      window.CineHubFB.loadMoviesApi().then(function(list){
        if(list&&list.length){
          movies=list;
          state.moviesLoaded=true;
          try{render(false)}catch(e){}
        }
      }).catch(function(){});
    }
  },1800);
}
function loadUserFromFB(){
  if(!window.CineHubFB){state.userLoaded=true;return}
  window.CineHubFB.loadUser().then(function(u){
    userData = u || userData;
    state.points = Number(userData.points) || 1;
    state.userLoaded = true;
    try{render(true)}catch(e){}
  });
}
setTimeout(function(){loadMoviesFromFB();loadUserFromFB()},150);
function toast(t){const x=$("#toast");if(!x)return;x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1600)}
function showPageTransition(cb,opts){
  opts=opts||{};
  const el=document.getElementById("pageTransition");
  if(!el){if(cb)cb();return}
  el.classList.remove("hidden");
  el.style.display="flex";
  el.classList.remove("show");
  el.setAttribute("aria-hidden","false");
  void el.offsetWidth;
  el.classList.add("show");
  try{window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.("light")}catch(e){}
  // Default 300ms for all clicks (user request)
  const hold = opts.hold != null ? opts.hold : 300;
  setTimeout(function(){
    try{if(cb)cb()}catch(e){console.error(e)}
    setTimeout(function(){
      el.classList.remove("show");
      setTimeout(function(){
        el.classList.add("hidden");
        el.style.display="none";
        el.setAttribute("aria-hidden","true");
      },180);
    },80);
  },hold);
}

function nav(p,opts={}){
  if(p==="telegram"){openLink(cfg.telegramBotLink);return}
  if(p===state.page&&!opts.force)return;
  if(!opts.fromBack){
    const mainTabs=["movies","home","series","adult","profile","search"];
    if(mainTabs.includes(p)){
      // Switching main tabs: reset history so home back = leave dialog
      state.history=[];
    }else{
      state.history.push(state.page);
      if(state.history.length>30)state.history.shift();
    }
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
  // Main tabs + movie detail → leave dialog (no history walk)
  const mainTabs=["movies","home","series","adult","profile","search"];
  if(mainTabs.includes(state.page) || state.page==="detail"){
    showLeaveDialog();
    return;
  }
  // Sub pages (tasks, points, buy, settings) → previous page
  let prev=null;
  try{prev=state.history.pop()}catch(e){}
  try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history||[]))}catch(e){}
  if(!prev) prev="movies";
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
/** Banner under scrolling ticker — Adsgram Task or image (admin controlled) */
function bannerSlot(zone){
  loadSharedSettings();
  const isAdult = zone==="adult";
  const show = isAdult ? (cfg.showAdultBanner!==false) : (cfg.showMovieBanner!==false);
  if(!show) return "";
  const blocks = cfg.adBlocks||{};
  const blockId = String(isAdult ? (blocks.bannerAdult||blocks.banner||"") : (blocks.banner||"")).trim();
  const img = isAdult ? (cfg.adultBannerImg||"") : (cfg.movieBannerImg||"");
  const link = isAdult ? (cfg.adultBannerLink||"") : (cfg.movieBannerLink||"");
  const label = isAdult ? "18+ Ad" : "Ad";

  // 1) Adsgram Task format (block-id like task-123) — native component under ticker
  if(blockId && /^task[-_]?/i.test(blockId)){
    const tid = blockId.startsWith("task")?blockId:("task-"+blockId.replace(/^task[-_]?/i,""));
    return `<div class="home-banner home-banner-adsgram" data-zone="${zone}">
      <adsgram-task block-id="${tid.replace(/"/g,"")}" class="adsgram-task-banner"></adsgram-task>
      <span class="home-banner-tag">${label}</span>
    </div>`;
  }

  // 2) Adsgram Reward/Interstitial block ID — clickable native slot
  if(blockId){
    return `<div class="home-banner home-banner-adsgram" data-zone="${zone}" data-ad="${blockId.replace(/"/g,"")}">
      <button type="button" class="adsgram-banner-btn" onclick="showAdsgramBanner('${blockId.replace(/'/g,"\\'")}','${zone}')">
        <span class="hb-ph-ico">▶</span>
        <b>${label} · Adsgram</b>
        <small>ID: ${blockId.replace(/</g,"")}</small>
      </button>
      <span class="home-banner-tag">${label}</span>
    </div>`;
  }

  // 3) Custom image banner
  if(img){
    const inner = `<img src="${img.replace(/"/g,"&quot;")}" alt="banner ad" loading="lazy">`;
    if(link){
      return `<div class="home-banner" data-zone="${zone}">
        <a class="home-banner-link" href="#" onclick="event.preventDefault();openLink('${link.replace(/'/g,"\\'")}');return false;">
          ${inner}<span class="home-banner-tag">${label}</span>
        </a>
      </div>`;
    }
    return `<div class="home-banner" data-zone="${zone}">${inner}<span class="home-banner-tag">${label}</span></div>`;
  }

  // 4) Empty placeholder
  return `<div class="home-banner home-banner-placeholder" data-zone="${zone}" onclick="toast(t('Set Adsgram Block ID in Admin → Ads'))">
    <div class="hb-ph">
      <span class="hb-ph-ico">▦</span>
      <b>${label} Banner</b>
      <small>${t("Set Adsgram Block ID in Admin → Ads")}</small>
    </div>
    <span class="home-banner-tag">${label}</span>
  </div>`;
}
function showAdsgramBanner(blockId, zone){
  if(!blockId){toast(t("Admin has not configured this Ad Block ID"));return}
  if(window.Adsgram && typeof window.Adsgram.init==="function"){
    try{
      const ad = window.Adsgram.init({blockId:String(blockId), debug:!!cfg.adsgramDebug});
      ad.show().then(function(){
        toast(t("Ad completed"));
      }).catch(function(){
        toast(t("Ad closed"));
      });
      return;
    }catch(e){console.warn(e)}
  }
  toast(t("Adsgram loading… try again"));
}
function onBannerClick(zone){
  loadSharedSettings();
  const isAdult = zone==="adult";
  const blocks = cfg.adBlocks||{};
  const blockId = String(isAdult ? (blocks.bannerAdult||blocks.banner||"") : (blocks.banner||"")).trim();
  if(blockId){showAdsgramBanner(blockId, zone);return}
  const link = isAdult ? (cfg.adultBannerLink||"") : (cfg.movieBannerLink||"");
  if(link){openLink(link);return}
  toast(t("Banner ad"));
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
function moviesPage(){const list=listForHome();return primeHeader()+heroPills()+catRow()+libCard()+ticker()+bannerSlot("movies")+list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No movies found.")}</div>`}
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
  return menuOnlyHeader(t("Adult"))+heroPillsAdult()+catRowAdult()+libCardAdult()+tickerAdult()+bannerSlot("adult")+list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No adult content yet. Add from Admin Panel.")}</div>`;
}
function confirmAdult(){state.adultOK=true;render(true)}

function profile(){
  const tg=window.Telegram?.WebApp?.initDataUnsafe?.user;
  const name=tg?(tg.first_name||"")+(tg.last_name?" "+tg.last_name:""):"Cine Hub User";
  const uname=tg?.username?("@"+tg.username):"@user";
  const photo=tg?.photo_url||"";
  const refCode=String(tg?.id||localStorage.getItem("cinehub4_uid")||"1000001");
  if(!localStorage.getItem("cinehub4_uid")) localStorage.setItem("cinehub4_uid",refCode);
  // Mini App deep link (opens app, not bot chat)
  const refLink=buildMiniAppLink("ref_"+refCode);
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
    <button type="button" class="pf-btn tutorial" onclick="openLink(cfg.watchTutorialVideo||cfg.telegramBotLink)">▶ Watch Tutorial</button>
    <button type="button" class="pf-btn buy" onclick="nav('buy')">🛒 Buy Points</button>
  </div>
  <div class="pf-section">⚡ MORE POINT EARNING</div>
  <div class="earn-card">
    <h3>⚡ Watch Ads & Earn Points</h3>
    <p>Complete ads to get rewards and unlock videos with points.</p>
    <div class="earn-tags"><span>✔ Instant Reward</span><span>🪙 More Points</span><span>🔓 Unlock Videos</span></div>
    <button type="button" class="pf-btn wide" onclick="nav('tasks')">⚡ More Point Earning</button>
  </div>`;
}

function copyRefLink(){
  const t=document.getElementById("refLinkText")?.textContent||"";
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(()=>toast("Referral link copied!")).catch(()=>toast(t));
  }else{toast("Referral link copied!");}
}


function points(){return pageBackBar(t("My Points"))+`<div class="section-title"><b>🪙 My Points</b><span>${state.points} points</span></div><div class="panel"><div class="amount">${state.points} <span class="muted">points</span></div><div class="task"><span>📺 Watch Ad & Earn</span><b>+${cfg.adReward}</b><button class="primary cyan" onclick="watchAd('rewarded')">Watch</button></div><div class="task"><span>🛒 Buy Points</span><button class="primary pink" onclick="nav('buy')">Buy</button></div><div class="task"><span>👥 Refer & Earn</span><button class="pill" onclick="shareRef()">Share</button></div></div><div class="panel"><h3>Daily Ad Limit</h3><div class="task"><span>Only for earning points</span><b>${cfg.dailyAdLimit}/day</b></div><div class="muted">${t("Movie unlock is not limited by the daily ad limit.")}</div></div>`}

function getTasks(){
  // Always prefer live admin settings
  try{
    const s=JSON.parse(localStorage.getItem("cinehub4_settings")||"{}");
    if(s.tasks&&s.tasks.length){cfg.tasks=s.tasks;return s.tasks}
  }catch(e){}
  if(cfg.tasks&&cfg.tasks.length) return cfg.tasks;
  return [
    {name:"one click",reward:2,limit:1,type:"countdown",seconds:5,resetHours:24,permanent:false},
    {name:"Watch rewarded ad",reward:cfg.adReward||2,limit:cfg.dailyAdLimit||20,type:"ad",resetHours:24,permanent:false},
    {name:"Join Telegram channel",reward:5,limit:1,type:"link",link:cfg.telegramChannelLink||cfg.telegramBotLink,resetHours:24,permanent:false},
    {name:"Refer a friend",reward:cfg.referralReward||20,limit:10,type:"share",resetHours:24,permanent:false},
    {name:"Daily login",reward:2,limit:1,type:"login",resetHours:24,permanent:false}
  ];
}
/** Whether a task (by index) is currently completed/locked, and the storage key that tracks it.
 *  Permanent tasks stay done forever. Others reset automatically after tk.resetHours (default 24). */
function taskResetInfo(i,tk){
  const key="cinehub4_task_"+i+"_done_at";
  const raw=localStorage.getItem(key);
  if(!raw) return {done:false,key};
  if(tk&&tk.permanent) return {done:true,key};
  const hours=Number(tk&&tk.resetHours);
  const h=(isFinite(hours)&&hours>0)?hours:24;
  const elapsedHours=(Date.now()-Number(raw))/3600000;
  return {done:elapsedHours<h,key};
}
function tasks(){
  loadSharedSettings();
  const watched=Number((userData&&userData.ads_today)||localStorage.getItem("cinehub4_ads_today")||0);
  const limit=Number(cfg.dailyAdLimit||20);
  const rem=Math.max(0,limit-watched);
  const list=getTasks();
  return pageBackBar(t("More Point Earning"))+`
  <div class="earn-hero">
    <div class="earn-hero-ico">⚡</div>
    <div>
      <b>${t("Watch Ads & Earn Points")}</b>
      <p>${t("Complete ads and premium earning tasks to unlock exclusive videos instantly.")}</p>
      <div class="earn-chips">
        <span>✓ ${t("Instant Reward")}</span>
        <span>⏱ ${t("Daily Limit")}</span>
        <span>🔒 ${t("Unlock Videos")}</span>
      </div>
    </div>
  </div>
  <div class="pf-stats">
    <div class="pf-stat"><div><b>${state.points}</b><span>${t("Current Balance")}</span></div><div class="ico coin">🪙</div></div>
    <div class="pf-stat"><div><b>${cfg.adReward||2}</b><span>${t("Points Per Ad")}</span></div><div class="ico gift">🎁</div></div>
    <div class="pf-stat"><div><b>${watched}</b><span>${t("Ads Watched")}</span></div><div class="ico eye">👁</div></div>
    <div class="pf-stat"><div><b>${limit}</b><span>${t("Daily Limit")}</span></div><div class="ico shield">🛡</div></div>
  </div>
  <div class="pf-section">⚙ ${t("EARNING SETTINGS")}</div>
  <div class="pf-panel earn-settings">
    <div class="pf-row"><span>${t("Reward Per Ad")}</span><b>${cfg.adReward||2} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Maximum Daily Ads")}</span><b>${limit}</b></div>
    <div class="pf-row"><span>${t("Remaining Today")}</span><b>${rem}</b></div>
    <div class="progress-bar"><i style="width:${Math.min(100,(watched/Math.max(1,limit))*100)}%"></i></div>
    <div class="muted" style="font-size:11px;margin-top:6px;text-align:center">${watched} / ${limit} ${t("completed today")}</div>
  </div>
  <button type="button" class="watch-ad-now" onclick="watchAd('rewarded')">▶ ${t("Watch Ad Now")}</button>
  <div class="pf-section">🎁 ${t("MORE EARNING BUTTONS")}</div>
  ${list.map((tk,i)=>{
    const st=taskResetInfo(i,tk);
    const statusLabel=st.done?(tk.permanent?t("Completed"):t("completed today")):(tk.permanent?t("One-time task"):t("Daily task"));
    return `<div class="task-row ${st.done?"done":""}">
      <div class="task-ico">🎁</div>
      <div class="task-meta"><b>${tk.name}</b><span>${t("Reward")}: ${tk.reward} pt · ${statusLabel}</span></div>
      ${st.done?`<button type="button" class="task-done" disabled>${t("Done")}</button>`:`<button type="button" class="task-start" onclick="runTask(${i})">${t("Start")}</button>`}
    </div>`;
  }).join("")}`;
}
function runTask(i){
  const t=getTasks()[i];if(!t)return;
  const st=taskResetInfo(i,t);
  if(t.limit===1 && st.done){toast(t.permanent?"Already completed":"Already completed today");return}
  if(t.type==="ad"){watchAd('task');return}
  if(t.type==="link"){
    openLink(t.link||cfg.telegramChannelLink||cfg.telegramBotLink);
    // credit after opening (demo)
    state.points+=Number(t.reward||0);save();
    localStorage.setItem(st.key,String(Date.now()));
    toast("+"+(t.reward||0)+" points");
    render(true);
    return;
  }
  if(t.type==="share"){shareRefLink();return}
  if(t.type==="countdown"||t.type==="oneclick"){
    const secs=Number(t.seconds||t.secs||5);
    showCountdownTask(t.name||"one click",secs,function(){
      state.points+=Number(t.reward||1);save();
      localStorage.setItem(st.key,String(Date.now()));
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
    const paymentObj={
      user:user,
      userId:uid,
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
    };
    if(window.CineHubFB){
      window.CineHubFB.addPayment(paymentObj).catch(function(e){console.error(e)});
    } else {
      const list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
      list.push(Object.assign({id:Date.now()},paymentObj));
      localStorage.setItem("cinehub4_payments",JSON.stringify(list));
    }
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

/* —— Unlock helpers (admin: cost / hours / ads / servers) —— */
function unlockKey(id){return "cinehub4_unlock_"+id}
function progressKey(id){return "cinehub4_uprog_"+id}
function isMovieUnlocked(id){
  try{
    if(userData && userData.unlocks){
      const exp=Number(userData.unlocks[String(id)]||0);
      if(exp>Date.now()) return true;
    }
    // fallback local
    const exp2=Number(localStorage.getItem(unlockKey(id))||0);
    return exp2>Date.now();
  }catch(e){return false}
}
function markMovieUnlocked(id){
  const hours=Number(cfg.unlockHours)||15;
  const exp=Date.now()+hours*3600*1000;
  if(!userData.unlocks) userData.unlocks={};
  userData.unlocks[String(id)]=exp;
  try{localStorage.setItem(unlockKey(id),String(exp))}catch(e){}
  try{localStorage.removeItem(progressKey(id))}catch(e){}
  if(window.CineHubFB) window.CineHubFB.setUnlock(null, id, hours);
  state.unlockProgress=Number(cfg.unlockCost)||5;
  return hours;
}
function getUnlockProgress(id){
  try{return Number(localStorage.getItem(progressKey(id))||0)}catch(e){return 0}
}
function setUnlockProgress(id,n){
  const cost=Number(cfg.unlockCost)||5;
  const v=Math.max(0,Math.min(cost,Number(n)||0));
  try{localStorage.setItem(progressKey(id),String(v))}catch(e){}
  state.unlockProgress=v;
  return v;
}
function serverCount(){return Math.max(1,Math.min(10,Number(cfg.downloadServers)||3))}

function detail(id){
  const m=movies.find(x=>x.id===id);if(!m)return;
  m.clicks=(m.clicks||0)+1;m.views=(m.views||m.clicks);save();
  if(state.page!=="detail"){
    state.history.push(state.page);
    if(state.history.length>30)state.history.shift();
    try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history))}catch(e){}
  }
  state.detailId=id;
  state.unlockProgress=isMovieUnlocked(id)?(Number(cfg.unlockCost)||5):getUnlockProgress(id);
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
  loadSharedSettings();
  const m=movies.find(x=>x.id===state.detailId);if(!m)return moviesPage();
  const cost=Number(cfg.unlockCost)||5;
  const adsNeed=Number(cfg.adsForUnlock)||cost;
  const hours=Number(cfg.unlockHours)||15;
  const title=(m.title||"").split("|")[0].trim();
  const unlocked=isMovieUnlocked(m.id);

  if(unlocked){
    const n=serverCount();
    let servers="";
    for(let i=1;i<=n;i++){
      servers+=`<button type="button" class="server-btn" onclick="openServer(${m.id},${i})">
        <span class="srv-ico">⬇</span>
        <span class="srv-meta"><b>${t("Server")} ${i}</b><small>${t("Download / Watch")}</small></span>
        <span class="srv-go">›</span>
      </button>`;
    }
    const exp=Number(localStorage.getItem(unlockKey(m.id))||0);
    const leftMs=Math.max(0,exp-Date.now());
    const leftH=Math.floor(leftMs/3600000);
    const leftM=Math.floor((leftMs%3600000)/60000);
    return pageBackBar(t("Movie"))+`
    <div class="unlock-page unlocked-page">
      <div class="unlock-notice ok">
        <div class="bell">🔓</div>
        <div>
          <div class="un-title">${t("UNLOCKED")}</div>
          <div class="un-sub">${t("Available for")} ${leftH}h ${leftM}m</div>
          <div class="muted">${t("Watch or download from any server below.")}</div>
        </div>
      </div>
      <div class="demo-player" onclick="playDemoVideo(${m.id})">
        <div class="demo-poster">${posterHTML(m)}</div>
        <div class="demo-play-btn">▶</div>
        <div class="demo-label">${t("Demo / Preview")}</div>
      </div>
      <div class="unlock-actions-top">
        <button type="button" class="share-only" onclick="shareMovie(${m.id})">↗ ${t("Share")}</button>
      </div>
      <div class="unlock-title">${title}</div>
      <div class="unlock-sub">${m.genre||""} • ${m.year||""}</div>
      <div class="pf-section">📡 ${t("Download Servers")}</div>
      <div class="server-list">${servers}</div>
      <button type="button" class="btn-more" onclick="nav('${m.adult?'adult':'movies'}')">🎬 ${t("More Watching")} ›</button>
    </div>`;
  }

  const prog=Math.min(cost, getUnlockProgress(m.id) || state.unlockProgress || 0);
  state.unlockProgress=prog;
  const rem=Math.max(0,cost-prog);
  const my=state.points;
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
        <div class="pc need"><span>${t("Need")}</span><b>${cost}</b></div>
        <div class="pc myp"><span>${t("My Points")}</span><b>${my}</b></div>
        <div class="pc rem"><span>${t("Remaining")}</span><b>${rem}</b></div>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar"><i style="width:${Math.min(100,(prog/Math.max(1,cost))*100)}%"></i></div>
        <div class="progress-text">${t("Progress")}: ${prog}/${cost}<br>${t("Ads needed")}: ${adsNeed} · ${t("Unlock duration")}: ${hours}h</div>
      </div>
      <div class="unlock-actions">
        <button type="button" class="btn-unlock lock" onclick="unlockWithAds()">🔒 ${t("Unlock Video")}</button>
        <button type="button" class="btn-unlock points" onclick="usePointsForUnlock()">🪙 ${t("Use My Points")}</button>
      </div>
    </div>
    <button type="button" class="btn-more" onclick="nav(state.page==='adult'||(movies.find(x=>x.id===state.detailId)||{}).adult?'adult':'movies')">🎬 ${t("More Watching")} ›</button>
  </div>`;
}

function usePointsForUnlock(){
  loadSharedSettings();
  const id=state.detailId;
  if(!id)return;
  if(isMovieUnlocked(id)){toast(t("Already unlocked"));render(false);return}
  const cost=Number(cfg.unlockCost)||5;
  let prog=getUnlockProgress(id);
  const need=Math.max(0,cost-prog);
  if(need<=0){
    const h=markMovieUnlocked(id);
    toast(t("Unlocked for")+" "+h+" "+t("hours"));
    render(false);
    return;
  }
  if(state.points<need){
    toast(t("Not enough points")+" ("+need+" "+t("needed")+")");
    return;
  }
  state.points-=need;
  save();
  setUnlockProgress(id,cost);
  const h=markMovieUnlocked(id);
  toast(t("Unlocked for")+" "+h+" "+t("hours")+" · -"+need+" "+t("Points"));
  render(false);
}
function unlockWithAds(){watchAd("unlock")}
function unlockPoints(){usePointsForUnlock()}

function openServer(movieId,serverNo){
  if(!isMovieUnlocked(movieId)){toast(t("Unlock required"));return}
  const m=movies.find(x=>x.id===movieId||String(x.id)===String(movieId));
  if(!m){toast("Movie not found");return}
  const title=(m.title||"").split("|")[0].trim()||"Movie";
  let url="";
  if(serverNo===1) url=m.server1||m.server1_link||"";
  else if(serverNo===2) url=m.server2||m.server2_link||"";
  else if(serverNo===3) url=m.server3||m.server3_link||"";
  if(!url){toast(t("Server")+" "+serverNo+" unavailable");return}
  // track click
  try{ if(window.CineHubFB) window.CineHubFB.incClicks(m.id); }catch(e){}
  toast(t("Server")+" "+serverNo+" · "+title);
  try{
    if(window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.openLink){
      window.Telegram.WebApp.openLink(url);
      return;
    }
  }catch(e){}
  window.open(url,"_blank");
}
function playDemoVideo(movieId){
  if(!isMovieUnlocked(movieId)){toast(t("Unlock required"));return}
  const m=movies.find(x=>x.id===movieId);
  const demoUrl=(m&&m.videoUrl)||cfg.demoVideoUrl||"https://www.w3schools.com/html/mov_bbb.mp4";
  const ov=document.createElement("div");
  ov.className="modal";
  ov.id="demoVideoModal";
  ov.innerHTML=`<div class="modal-card" style="padding:12px;max-width:520px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <b>${t("Demo / Preview")}</b>
      <button type="button" class="pill" onclick="document.getElementById('demoVideoModal').remove()">✕</button>
    </div>
    <video src="${demoUrl}" controls autoplay playsinline style="width:100%;border-radius:12px;background:#000;max-height:60vh"></video>
    <p class="muted" style="margin:10px 0 0;font-size:12px">${t("Demo video — replace URL from Admin when ready.")}</p>
  </div>`;
  document.body.appendChild(ov);
  ov.addEventListener("click",function(e){if(e.target===ov)ov.remove()});
}
function showCountdownTask(name,secs,onDone){
  const ov=document.createElement("div");
  ov.className="modal earn-modal";
  ov.id="cdModal";
  let left=secs||5;
  const total=left;
  ov.innerHTML=`<div class="modal-card cd-card">
    <div class="cd-ring-wrap">
      <svg class="cd-svg" viewBox="0 0 100 100">
        <circle class="cd-bg" cx="50" cy="50" r="42"/>
        <circle class="cd-fg" id="cdFg" cx="50" cy="50" r="42" style="stroke-dasharray:264;stroke-dashoffset:0"/>
      </svg>
      <div class="cd-play">▶</div>
    </div>
    <b class="cd-title">${name||"one click"}</b>
    <div class="muted cd-sub">${t("Keep this page open until countdown ends.")}</div>
    <div class="cd-num" id="cdNum">${left}s</div>
  </div>`;
  document.body.appendChild(ov);
  const circ=2*Math.PI*42;
  const tick=setInterval(function(){
    left--;
    const el=document.getElementById("cdNum");
    const fg=document.getElementById("cdFg");
    if(el) el.textContent=left+"s";
    if(fg) fg.style.strokeDashoffset=String(circ*(1-Math.max(0,left)/total));
    if(left<=0){
      clearInterval(tick);
      ov.remove();
      if(onDone) onDone();
    }
  },1000);
}
function watchAd(mode){
  loadSharedSettings();
  // All mini-app ads use Adsgram Block IDs from Admin → Ads
  const b=cfg.adBlocks||{};
  let id="";
  if(mode==="adult") id=b.adult||b.rewarded||"";
  else if(mode==="task") id=b.task||b.rewarded||"";
  else if(mode==="unlock") id=b.interstitial||b.rewarded||""; // unlock prefers interstitial
  else if(mode==="banner"||mode==="bannerAdult") id=(mode==="bannerAdult"?b.bannerAdult:b.banner)||b.rewarded||"";
  else id=b.rewarded||""; // rewarded / earn points / Watch Ad Now
  if(!id && mode!=="countdown"){toast(t("Admin has not configured this Ad Block ID"));return}
  // Daily limit only for earning modes
  if(mode!=="unlock" && mode!=="adult"){
    const watched=Number((userData&&userData.ads_today)||localStorage.getItem("cinehub4_ads_today")||0);
    const limit=Number(cfg.dailyAdLimit||20);
    if(watched>=limit){toast(t("Daily ad limit reached"));return}
  }

  function onAdDone(){
    if(mode==="unlock"){
      const mid=state.detailId;
      const needAds=Number(cfg.adsForUnlock)||Number(cfg.unlockCost)||5;
      let prog=getUnlockProgress(mid)+1;
      setUnlockProgress(mid,prog);
      toast("+1 "+t("ad progress")+" ("+prog+"/"+needAds+")");
      if(prog>=needAds){
        const h=markMovieUnlocked(mid);
        toast(t("Unlocked for")+" "+h+" "+t("hours"));
      }
      render(false);
    }else{
      const reward=Number(cfg.adReward||2);
      state.points+=reward;
      const watched=Number((userData&&userData.ads_today)||localStorage.getItem("cinehub4_ads_today")||0)+1;
      if(userData){userData.ads_today=watched;userData.ads_day=new Date().toDateString();}
      localStorage.setItem("cinehub4_ads_today",String(watched));
      localStorage.setItem("cinehub4_ads_day",new Date().toDateString());
      if(window.CineHubFB) window.CineHubFB.updateUserField(null,{ads_today:watched,ads_day:new Date().toDateString()});
      save();
      toast("+"+reward+" "+t("points added"));
      render(true);
    }
  }

  // —— Real Adsgram (partner.adsgram.ai Block ID) ——
  if(id && window.Adsgram && typeof window.Adsgram.init==="function"){
    try{
      const ad=window.Adsgram.init({blockId:String(id), debug:!!cfg.adsgramDebug});
      toast(t("Opening Ad"));
      ad.show().then(function(){ onAdDone(); }).catch(function(){
        // user closed early / error — still allow demo progress only in debug
        if(cfg.adsgramDebug) onAdDone();
        else toast(t("Ad closed"));
      });
      return;
    }catch(e){console.warn("Adsgram",e)}
  }

  // —— Demo fallback when SDK/ID missing ——
  const m=document.createElement("div");
  m.className="modal";
  m.innerHTML=`<div class="modal-card cd-card open-ad-card">
    <div class="cd-ring-wrap">
      <svg class="cd-svg spin-slow" viewBox="0 0 100 100"><circle class="cd-bg" cx="50" cy="50" r="42"/><circle class="cd-fg" cx="50" cy="50" r="42" style="stroke-dasharray:80 184"/></svg>
      <div class="cd-play">▶</div>
    </div>
    <b class="cd-title">${t("Opening Ad")}</b>
    <div class="muted cd-sub">${t("Please wait while ad is loading.")}</div>
  </div>`;
  document.body.appendChild(m);
  setTimeout(function(){
    m.innerHTML=`<div class="modal-card"><div class="video-ad"><div><div class="play">▶</div><b>Ad · Demo</b><div class="muted">Demo — set Adsgram Block ID in Admin</div></div></div><div class="progress-bar" style="margin:12px 0"><i id="adProg" style="width:0%;height:100%;display:block;background:linear-gradient(90deg,#3b82f6,#06b6d4);border-radius:999px"></i></div><div class="muted" id="adPct">0%</div><button class="primary cyan wide" id="completeDemoAd" style="margin-top:10px">Complete Ad</button></div>`;
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
    if(btn) btn.onclick=function(){ m.remove(); onAdDone(); };
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
    if(window.__IS_ADMIN===true) return true;
    try{ if(sessionStorage.getItem("cinehub4_is_admin")==="1") return true; }catch(e){}
    const ids=(window.__ADMIN_IDS||[]);
    const tg=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;
    const uid=tg&&tg.id!=null?String(tg.id):"";
    return !!uid && ids.map(String).includes(uid);
  }catch(e){return false}
}
// Secure admin check: backend verifies Telegram initData. No admin IDs are exposed to the browser.
function loadAdminIdsApp(){
  try{
    if(!window.APP_CONFIG || !window.APP_CONFIG.apiBaseUrl){ console.warn("[admin] no apiBaseUrl"); return; }
    const initData=window.Telegram?.WebApp?.initData||"";
    if(!initData){ console.warn("[admin] initData empty — open via Telegram Mini App button"); return; }
    const doCheck=function(){
      return fetch(window.APP_CONFIG.apiBaseUrl,{
        method:"POST",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify({action:"adminCheck",initData:initData}),
        redirect:"follow"
      }).then(function(r){ return r.text().then(function(t){
        try{ return JSON.parse(t); }catch(e){
          console.warn("[admin] non-JSON response", t.slice(0,200));
          throw new Error("Bad API response");
        }
      }); });
    };
    doCheck().then(function(res){
      var data=res&&res.data?res.data:{};
      var ok=!!(res&&res.ok&&data.isAdmin);
      console.log("[admin] check", {isAdmin:ok, id:data.debugId, verified:data.debugVerified, reason:data.debugReason, adminIds:data.debugAdminIdsRaw});
      if(ok){
        var uid="";
        try{ uid=String(window.Telegram.WebApp.initDataUnsafe.user.id); }catch(e){}
        if(!uid && data.debugId) uid=String(data.debugId);
        window.__ADMIN_IDS=uid?[uid]:["1"];
        window.__IS_ADMIN=true;
        try{ sessionStorage.setItem("cinehub4_is_admin","1"); }catch(e){}
      }else{
        window.__ADMIN_IDS=[];
        window.__IS_ADMIN=false;
        try{ sessionStorage.removeItem("cinehub4_is_admin"); }catch(e){}
      }
      try{setupAdminButton();render(true)}catch(e){}
    }).catch(function(err){
      console.warn("[admin] fetch error", err);
      // retry once after 1.2s (slow network / cold start)
      setTimeout(function(){
        doCheck().then(function(res){
          var data=res&&res.data?res.data:{};
          if(res&&res.ok&&data.isAdmin){
            var uid="";
            try{ uid=String(window.Telegram.WebApp.initDataUnsafe.user.id); }catch(e){}
            if(!uid && data.debugId) uid=String(data.debugId);
            window.__ADMIN_IDS=uid?[uid]:["1"];
            window.__IS_ADMIN=true;
            try{ sessionStorage.setItem("cinehub4_is_admin","1"); }catch(e){}
            try{setupAdminButton();render(true)}catch(e){}
          }
        }).catch(function(){});
      },1200);
    });
  }catch(e){ console.warn("[admin]", e); }
}
setTimeout(loadAdminIdsApp, 200);
setTimeout(loadAdminIdsApp, 1500);

function loadPublicAppConfig(){
  try{
    if(!window.CineHubFB) return;
    window.CineHubFB.loadConfig().then(function(c){
      if(!c) return;
      try{ Object.assign(window.APP_CONFIG,c); }catch(e){}
      // Apply live admin settings into runtime cfg (Firebase is source of truth)
      try{
        Object.keys(c).forEach(function(k){
          if(c[k]!==undefined&&c[k]!==null) cfg[k]=c[k];
        });
        if(c.adBlocks) cfg.adBlocks=Object.assign({},cfg.adBlocks||{},c.adBlocks);
        localStorage.setItem("cinehub4_settings",JSON.stringify(Object.assign({},JSON.parse(localStorage.getItem("cinehub4_settings")||"{}"),c)));
      }catch(e){}
      try{ applyTheme(); }catch(e){}
      try{ render(true); }catch(e){}
    }).catch(function(){});
  }catch(e){}
}
setTimeout(loadPublicAppConfig, 500);
function setupAdminButton(){
  try{
    const btn=document.getElementById("adminPanelBtn");
    if(!btn) return;
    if(isAdminUser()){
      btn.classList.remove("hidden");
      btn.style.display="flex";
      btn.onclick=function(){location.href="admin.html"};
    }else{
      btn.classList.add("hidden");
      btn.style.display="";
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
    let sp="";
    try{sp=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.start_param)||""}catch(e){}
    if(!sp){
      try{
        const q=new URLSearchParams(location.search);
        sp=q.get("tgWebAppStartParam")||q.get("startapp")||q.get("start")||"";
      }catch(e){}
    }
    // Hash fallback: #startapp=movie_1
    if(!sp && location.hash){
      const hm=location.hash.match(/(?:startapp|start)=([A-Za-z0-9_\-]+)/i);
      if(hm) sp=hm[1];
    }
    if(!sp) return false;
    sp=String(sp).trim();
    // movie_123 → open that movie detail
    if(/^movie_/i.test(sp)){
      const id=Number(sp.replace(/^movie_/i,""));
      if(id&&!isNaN(id)){
        state.detailId=id;
        state.page="detail";
        state.history=[];
        try{localStorage.setItem("cinehub4_page","detail")}catch(e){}
        return true;
      }
    }
    // plain number also treated as movie id
    if(/^\d+$/.test(sp)){
      const id=Number(sp);
      if(id){
        state.detailId=id;
        state.page="detail";
        state.history=[];
        try{localStorage.setItem("cinehub4_page","detail")}catch(e){}
        return true;
      }
    }
    // ref_USERID — store referrer for bonus (bot/backend usually handles)
    if(/^ref_/i.test(sp)){
      try{localStorage.setItem("cinehub4_ref_from",sp.replace(/^ref_/i,""))}catch(e){}
    }
  }catch(e){}
  return false;
}
handleStartParam();
// Telegram sometimes fills start_param a moment later
setTimeout(function(){
  if(handleStartParam() && state.page==="detail"){
    try{render(false)}catch(e){}
  }
},400);
setTimeout(function(){
  if(handleStartParam() && state.page==="detail"){
    try{render(false)}catch(e){}
  }
},1200);
bindLeaveGuard();

try{render(false)}catch(e){console.error(e);var s=document.getElementById("screen");if(s)s.innerHTML="<div style=padding:20px;color:#f88>Boot error: "+e.message+"</div>"}
function killSplash(){
  const s=document.getElementById("appSplash");
  if(!s||s.classList.contains("gone"))return;
  s.classList.add("gone");
  setTimeout(function(){try{s.style.display="none";s.remove()}catch(e){}},320);
}
// Keep solid splash covering UI; hide only after short ready delay (no double jump)
setTimeout(killSplash, 1100);
setTimeout(killSplash, 2200);

function showLeaveDialog(){
  if(document.getElementById("leaveOverlay")) return;
  const ov=document.createElement("div");
  ov.id="leaveOverlay";
  ov.className="leave-overlay";
  ov.innerHTML=`<div class="leave-card">
    <div class="leave-icon">↪</div>
    <h2>${t("Do you want to leave?")}</h2>
    <p>${t("Leaving will close the mini app.")}</p>
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
        goBack();
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
        goBack();
      });
    }
  }catch(e){}
}
