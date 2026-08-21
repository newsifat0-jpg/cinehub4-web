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
window.__cinehub_rerender=function(){if(window.__cinehub_langSwitching)return;try{render(false)}catch(e){}};

/** Current UI language */
function langIsBn(){try{return (window.CINEHUB4_LANG&&window.CINEHUB4_LANG.get&&window.CINEHUB4_LANG.get())==="bn"}catch(e){return false}}
/** Category key (English) for filtering */
function catKey(c){if(c==null)return"";if(typeof c==="string")return c;return String(c.en||c.name||"")}
/** Category label for display */
function catLabel(c){
  if(c==null)return"";
  if(typeof c==="string") return t(c);
  if(langIsBn() && c.bn) return c.bn;
  return c.en || c.name || t(String(c.en||""));
}
/** Pick EN or BN from settings field pair */
function loc(enVal, bnVal){
  if(langIsBn() && bnVal) return bnVal;
  if(enVal) return langIsBn() ? t(String(enVal)) : String(enVal);
  return "";
}


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
function telegramShare(text,url){
  nativeShare({text:text,url:url});
}
function ensureToastEl(){
  var x = document.getElementById("toast");
  if(x) return x;
  x = document.createElement("div");
  x.id = "toast";
  x.className = "toast";
  document.body.appendChild(x);
  return x;
}
function toast(msg){
  try{
    var x = ensureToastEl();
    x.textContent = String(msg||"");
    x.classList.add("show");
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(function(){ x.classList.remove("show"); }, 2200);
  }catch(e){ try{ console.log(msg); }catch(e2){} }
}
function movieShareLink(id){
  var mid = String(id||"").trim();
  var param = ("movie_"+mid).replace(/[^A-Za-z0-9_\-]/g,"").slice(0,64);
  return buildMiniAppLink(param);
}
function showLinkSheet(link, title){
  // Always-visible fallback so user can long-press copy
  var old = document.getElementById("shareSheet");
  if(old) old.remove();
  var sheet = document.createElement("div");
  sheet.id = "shareSheet";
  sheet.className = "share-sheet";
  sheet.innerHTML =
    '<div class="share-sheet-card">'+
      '<div class="share-sheet-title">'+(title||"Link")+'</div>'+
      '<input class="share-sheet-input" id="shareSheetInput" type="text" readonly value="">'+
      '<div class="share-sheet-actions">'+
        '<button type="button" class="share-sheet-btn" id="shareSheetCopy">Copy</button>'+
        '<button type="button" class="share-sheet-btn primary" id="shareSheetShare">Share</button>'+
        '<button type="button" class="share-sheet-btn ghost" id="shareSheetClose">Close</button>'+
      '</div>'+
    '</div>';
  document.body.appendChild(sheet);
  var inp = document.getElementById("shareSheetInput");
  if(inp){ inp.value = link; try{ inp.focus(); inp.select(); }catch(e){} }
  document.getElementById("shareSheetClose").onclick = function(){ sheet.remove(); };
  sheet.onclick = function(e){ if(e.target===sheet) sheet.remove(); };
  document.getElementById("shareSheetCopy").onclick = function(){
    hardCopy(link, function(){ toast(t("Link copied")); sheet.remove(); });
  };
  document.getElementById("shareSheetShare").onclick = function(){
    openTgShare(link, title||"Cine Hub4");
  };
}
function hardCopy(text, onOk){
  var done = false;
  function success(){
    if(done) return;
    done = true;
    if(onOk) onOk();
    else toast(t("Link copied"));
  }
  // 1) modern clipboard
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(success).catch(function(){ fallback(); });
      // also try fallback after short delay if promise hangs
      setTimeout(function(){ if(!done) fallback(); }, 400);
      return;
    }
  }catch(e){}
  fallback();
  function fallback(){
    if(done) return;
    try{
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly","");
      ta.style.cssText = "position:fixed;top:0;left:0;width:90%;height:40px;opacity:0.01;z-index:99999;";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = false;
      try{ ok = document.execCommand("copy"); }catch(e){}
      document.body.removeChild(ta);
      if(ok){ success(); return; }
    }catch(e){}
    // 2) Telegram popup with link
    try{
      if(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showPopup){
        window.Telegram.WebApp.showPopup({
          title: "Copy Link",
          message: text,
          buttons: [{type:"close"}]
        });
        toast(t("Link copied")+" — long-press to copy");
        done = true;
        return;
      }
    }catch(e){}
    // 3) show sheet
    showLinkSheet(text, "Copy Link");
  }
}
function openTgShare(url, text){
  var shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text||"");
  try{
    var tg = window.Telegram && window.Telegram.WebApp;
    if(tg){
      if(typeof tg.openTelegramLink === "function"){
        tg.openTelegramLink(shareUrl);
        return true;
      }
      if(typeof tg.openLink === "function"){
        tg.openLink(shareUrl);
        return true;
      }
    }
  }catch(e){ console.warn(e); }
  try{
    window.location.href = shareUrl;
    return true;
  }catch(e){}
  return false;
}
function nativeShare(opts){
  opts = opts || {};
  var title = opts.title || "Cine Hub4";
  var text = opts.text || title;
  var url = opts.url || buildMiniAppLink();
  return openTgShare(url, text);
}
function copyMovieLink(id){
  try{
    var mid = String(id||"").trim();
    if(!mid){ toast("ID missing"); return; }
    var m = (typeof movies!=="undefined" && movies) ? movies.find(function(x){ return String(x.id)===mid; }) : null;
    var title = m ? String(m.title||"").split("|")[0].trim() : "Movie";
    var link = movieShareLink(mid);
    if(!link){ toast("Link empty — set Mini App link in Admin → Settings"); return; }
    // Always show sheet so user can see + copy (Telegram WebView clipboard often blocked)
    showLinkSheet(link, title);
    hardCopy(link, function(){ toast(t("Link copied")); });
  }catch(e){
    console.error(e);
    toast("Copy error: "+(e&&e.message?e.message:e));
  }
}
function shareMovie(id){
  try{
    var mid = String(id||"").trim();
    if(!mid){ toast("ID missing"); return; }
    var m = (typeof movies!=="undefined" && movies) ? movies.find(function(x){ return String(x.id)===mid; }) : null;
    var title = m ? String(m.title||"").split("|")[0].trim() : "Movie";
    var link = movieShareLink(mid);
    if(!link){ toast("Link empty — set Mini App link in Admin → Settings"); return; }
    // Show sheet first (always works), then try Telegram share
    showLinkSheet(link, title);
    openTgShare(link, title + " — Cine Hub4");
  }catch(e){
    console.error(e);
    toast("Share error: "+(e&&e.message?e.message:e));
  }
}
// Expose globally (Telegram WebView onclick)
window.copyMovieLink = copyMovieLink;
window.shareMovie = shareMovie;
window.nativeShare = nativeShare;
window.movieShareLink = movieShareLink;

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
const state={page:(sessionStorage.getItem("cinehub4_page")||"movies"),adultOK:false,points:1,query:"",category:"All Movies",mode:"new",adultCategory:"All",adultMode:"new",history:JSON.parse(sessionStorage.getItem("cinehub4_history")||"[]"),unlockProgress:0,buyStep:null,buyOrder:null,moviesLoaded:false,userLoaded:false,firstPaint:true};
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
/* Boot flag: while splash is up, queue one paint only — no intermediate jerks */
window.__cinehub_splashUp = true;
window.__cinehub_needPaint = false;
window.__cinehub_bootFreeze = false;
function safeRender(animate){
  // During splash: queue, but still allow force paints from boot
  if(window.__cinehub_splashUp && !window.__cinehub_forcePaint){
    window.__cinehub_needPaint = true;
    return;
  }
  try{render(false)}catch(e){console.error(e)}
}
function loadMoviesFromFB(){
  if(!window.CineHubFB){state.moviesLoaded=true;safeRender(false);return}
  var got=false;
  window.CineHubFB.listenMovies(function(list){
    got=true;
    movies=list||[];
    state.moviesLoaded=true;
    // Share deep-link: open movie after list arrives
    try{
      var pending=sessionStorage.getItem("cinehub4_detail")||"";
      if(pending && movies.some(function(m){return String(m.id)===String(pending);})){
        state.detailId=pending;
        state.page="detail";
      }
      // re-apply start param if needed
      if(typeof handleStartParam==="function") handleStartParam();
    }catch(e){}
    safeRender(false);
  });
  // Fallback: if client Firestore returns empty (rules/index), pull via backend API
  setTimeout(function(){
    if(got && movies && movies.length) return;
    if(window.CineHubFB.loadMoviesApi){
      window.CineHubFB.loadMoviesApi().then(function(list){
        if(list&&list.length){
          movies=list;
          state.moviesLoaded=true;
          safeRender(false);
        }
      }).catch(function(){});
    }
  },1800);
}
function isUserBlocked(){
  try{
    if(!userData) return false;
    var b = userData.blocked;
    return b === true || b === 1 || b === "true" || b === "1" || b === "yes";
  }catch(e){ return false; }
}
function showBlockedScreen(){
  window.__cinehub_blocked = true;
  var old = document.getElementById("blockedOverlay");
  if(old) old.remove();
  var ov = document.createElement("div");
  ov.id = "blockedOverlay";
  ov.className = "blocked-overlay";
  ov.innerHTML =
    '<div class="blocked-card">'+
      '<div class="blocked-ico" aria-hidden="true">⛔</div>'+
      '<h2 class="blocked-title">'+t("Account Blocked")+'</h2>'+
      '<p class="blocked-msg">'+t("Your account has been blocked by the admin. You cannot use this app right now.")+'</p>'+
      '<p class="blocked-sub">'+t("Contact admin if you think this is a mistake.")+'</p>'+
    '</div>';
  document.body.appendChild(ov);
  try{
    var app = document.getElementById("app");
    if(app) app.style.visibility = "hidden";
    var splash = document.getElementById("appSplash");
    if(splash){ splash.className = "gone"; splash.style.display = "none"; }
  }catch(e){}
  // Poll so Unblock appears without forcing user to restart
  if(!window.__blockPoll){
    window.__blockPoll = setInterval(function(){
      if(!window.CineHubFB || !window.CineHubFB.loadUser) return;
      window.CineHubFB.loadUser().then(function(u){
        userData = u || userData;
        if(!isUserBlocked()){
          hideBlockedScreen();
          state.points = Number(userData && userData.points) || 1;
          safeRender(false);
        }
      }).catch(function(){});
    }, 12000);
  }
}
function hideBlockedScreen(){
  window.__cinehub_blocked = false;
  var old = document.getElementById("blockedOverlay");
  if(old) old.remove();
  try{
    var app = document.getElementById("app");
    if(app) app.style.visibility = "";
  }catch(e){}
  if(window.__blockPoll){
    clearInterval(window.__blockPoll);
    window.__blockPoll = null;
  }
}
function loadUserFromFB(){
  if(!window.CineHubFB){state.userLoaded=true;tryApplyReferralLocal();return}
  window.CineHubFB.loadUser().then(function(u){
    userData = u || userData;
    state.points = Number(userData.points) || 1;
    state.userLoaded = true;
    // Fresh user after admin delete → clear local "already joined" flags so they act like new
    try{
      if(userData && !userData.join_bonus_given){
        localStorage.removeItem("cinehub4_join_bonus_given");
      }
      if(userData && userData.refs!=null) localStorage.setItem("cinehub4_refs",String(userData.refs));
    }catch(e){}
    if(isUserBlocked()){
      showBlockedScreen();
      return;
    }
    hideBlockedScreen();
    applyReferralReward().finally(function(){ safeRender(false); });
  }).catch(function(){ state.userLoaded=true; tryApplyReferralLocal(); });
}
/** Credit join bonus + referrer reward (server). Falls back local if API missing. */
function applyReferralReward(){
  var refFrom="";
  try{ refFrom=String(localStorage.getItem("cinehub4_ref_from")||"").trim(); }catch(e){}
  if(!window.CineHubFB || !window.CineHubFB.processReferral){
    tryApplyReferralLocal();
    return Promise.resolve();
  }
  var cfgSnap={
    joinBonus:Number(cfg.joinBonus||10),
    referralReward:Number(cfg.referralReward||20)
  };
  return window.CineHubFB.processReferral(refFrom, cfgSnap).then(function(res){
    if(!res) return;
    if(res.user){
      userData = Object.assign(userData||{}, res.user);
      if(res.points!=null) state.points = Number(res.points);
      else if(userData.points!=null) state.points = Number(userData.points);
    }
    if(res.joinBonus) toast("+"+res.joinBonus+" "+t("Join Bonus"));
    if(res.applied && res.refReward){
      // invitee sees confirmation; referrer gets points on their account
      toast(t("Welcome via referral"));
    }
    try{ if(refFrom) localStorage.removeItem("cinehub4_ref_from"); }catch(e){}
    save();
  }).catch(function(e){ console.warn("referral", e); tryApplyReferralLocal(); });
}
function tryApplyReferralLocal(){
  // Offline/minimal fallback — only join bonus once
  try{
    if(localStorage.getItem("cinehub4_join_bonus_given")) return;
    var bonus=Number(cfg.joinBonus||10);
    state.points = Number(state.points||0) + bonus;
    localStorage.setItem("cinehub4_join_bonus_given","1");
    if(userData){ userData.points=state.points; userData.join_bonus_given=true; }
    save();
  }catch(e){}
}
setTimeout(function(){loadMoviesFromFB();loadUserFromFB()},150);
/* toast redefined below */
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
    try{sessionStorage.setItem("cinehub4_page",p);localStorage.setItem("cinehub4_page",p)}catch(e){}
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
  // Main tabs (with no saved history) → leave dialog
  const mainTabs=["movies","home","series","adult","profile","search"];
  if(mainTabs.includes(state.page) && (!state.history || state.history.length===0)){
    showLeaveDialog();
    return;
  }
  // Movie detail + sub pages (tasks, points, buy, settings) → go back to where we came from
  let prev=null;
  try{prev=state.history.pop()}catch(e){}
  try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history||[]))}catch(e){}
  if(!prev) prev="movies";
  const go=function(){
    state.page=prev;
    try{sessionStorage.setItem("cinehub4_page",prev);localStorage.setItem("cinehub4_page",prev)}catch(e){}
    render(true);
    try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){}
  };
  showPageTransition(go);
}
function posterURL(m){
  if(!m) return "";
  var u = m.poster || m.poster_url || m.posterUrl || m.image || m.cover || m.thumbnail || m.backdrop || "";
  u = String(u||"").trim();
  if(!u) return "";
  // TMDB relative path support
  if(u.indexOf("/")===0 && u.indexOf("//")!==0) u = "https://image.tmdb.org/t/p/w780"+u;
  if(/^https?:\/\//i.test(u)) return u;
  return "";
}
function posterHTML(m, mode){
  mode = mode || "card";
  var url = posterURL(m);
  var title = ((m&&m.title)||"Movie").split("|")[0].trim().replace(/</g,"").replace(/"/g,"&quot;");
  if(url){
    var cls = mode==="full" ? "poster-img poster-full" : "poster-img";
    return '<img class="'+cls+'" src="'+url.replace(/"/g,"&quot;")+'" alt="'+title+'" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.classList.add(\'poster-broken\');var s=this.parentNode&&this.parentNode.querySelector(\'.poster-fallback\');if(s){s.style.display=\'flex\';this.style.display=\'none\';}">'
      +'<div class="poster-fallback" style="display:none"><div class="pt">'+title.slice(0,18)+'</div></div>';
  }
  return '<div class="poster-fallback"><div class="pt">'+title.slice(0,18)+'</div></div>';
}
function card(m,idx){
  const curMode=state.page==="adult"?state.adultMode:state.mode;
  const top=idx===0&&curMode==="trending"?`<span class="movie-top">TOP 1</span>`:"";
  const title=(m.title||"").split("|")[0].trim();
  const sid=JSON.stringify(String(m.id));
  return `<article class="movie-card" onclick='detail(${sid})'>
    <div class="poster-wrap">
      <span class="movie-badge">${t("Movie")}</span>${top}
      ${posterHTML(m)}
      ${m.duration?`<span class="movie-dur">4K ${m.duration}</span>`:""}
    </div>
    <div class="movie-body">
      <div class="mtitle">${title}</div>
      <div class="mmeta">
        <button type="button" class="share-btn" onclick='event.stopPropagation();shareMovie(${sid})'>↗ ${t("Share")}</button>
      </div>
    </div>
  </article>`;
}
function pageBackBar(title){return`<div class="page-back-bar"><button type="button" class="page-back-btn" id="pageBackBtn" onclick="goBack()">‹</button><span class="page-back-title">${title||""}</span></div>`}
function menuOnlyHeader(title){return`<div class="page-back-bar"><button type="button" class="menu-ham" id="hamBtn">☰</button><span class="page-back-title">${title||""}</span></div>`}
function bindPageBack(){const b=$("#pageBackBtn");if(b)b.onclick=()=>goBack()}
function primeHeader(){return`<div class="prime-row"><button type="button" class="menu-ham" id="hamBtn">☰</button><div class="prime-title">Cine <span class="scene-pill">Hub4</span></div></div>`}
function heroPills(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.mode==="new"?"active":""}" onclick="setMode('new')"><span class="hp-label">${cfg.newMoviesLabel||"New Movies"}</span><span class="hp-sub">${cfg.newMoviesSub||"LATEST UPLOADS"}</span></button><button type="button" class="hero-pill orange ${state.mode==="trending"?"active":""}" onclick="setMode('trending')"><span class="hp-label">${cfg.trendingLabel||"Trending"}</span><span class="hp-sub">${cfg.trendingSub||"MOST WATCHED"}</span></button></div></div>`}
function catRow(){const cats=cfg.categories||defaults.categories;return`<div class="cat-row">${cats.map(c=>{const k=catKey(c);return `<button type="button" class="cat-chip ${state.category===k?"active":""}" onclick="filterCat('${String(k).replace(/'/g,"\\'")}')">${catLabel(c)}</button>`}).join("")}</div>`}
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
  return ""; /* home banner ads removed — stop layout jerk */
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
  const slot = resolveAdSlot(isAdult ? "bannerAdult" : "banner");
  if(slot && String(slot.id||"").trim()){
    playAdNetwork(slot, function(){ toast(t("Ad completed")); });
    return;
  }
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
function moviesPage(){const list=listForHome();return `<div class="home-sticky-top" id="homeSticky">`+primeHeader()+heroPills()+`<div class="home-sticky-line"></div></div>`+catRow()+libCard()+ticker()+(list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No movies found.")}</div>`)}
function setAdultMode(m){
  if(state.adultMode===m)return;
  showPageTransition(function(){state.adultMode=m;render(true)});
}
function filterAdultCat(c){
  if(state.adultCategory===c)return;
  showPageTransition(function(){state.adultCategory=c;render(true)});
}
function heroPillsAdult(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.adultMode==="new"?"active":""}" onclick="setAdultMode('new')"><span class="hp-label">${loc(cfg.adultNewLabel||"New Movies", cfg.adultNewLabelBn)}</span><span class="hp-sub">${loc(cfg.adultNewSub||"LATEST UPLOADS", cfg.adultNewSubBn)}</span></button><button type="button" class="hero-pill orange ${state.adultMode==="trending"?"active":""}" onclick="setAdultMode('trending')"><span class="hp-label">${loc(cfg.adultTrendingLabel||"Trending", cfg.adultTrendingLabelBn)}</span><span class="hp-sub">${loc(cfg.adultTrendingSub||"MOST WATCHED", cfg.adultTrendingSubBn)}</span></button></div></div>`}
function catRowAdult(){const cats=cfg.adultCategories||defaults.adultCategories;return`<div class="cat-row">${cats.map(c=>{const k=catKey(c);return `<button type="button" class="cat-chip ${state.adultCategory===k?"active":""}" onclick="filterAdultCat('${String(k).replace(/'/g,"\\'")}')">${catLabel(c)}</button>`}).join("")}</div>`}
function libCardAdult(){
  const title=state.adultMode==="trending"?t("Trending Movies"):loc(cfg.adultLibraryTitle||"Adult Library", cfg.adultLibraryTitleBn);
  return `<div class="lib-card lib-card-sm"><div class="lib-badge"><i></i> ${loc(cfg.adultLibraryBadge||"ADULT ZONE", cfg.adultLibraryBadgeBn)}</div><h2>${title}</h2><p class="lib-desc">${loc(cfg.adultLibraryDesc||"Curated 18+ content and premium entertainment updates.", cfg.adultLibraryDescBn)}</p><button type="button" class="how-btn" onclick="howToEarn()">${loc(cfg.adultHowToWatchLabel||"▶ How to Watch", cfg.adultHowToWatchLabelBn)}</button></div>`;
}
function tickerAdult(){
  const raw=cfg.adultTickerText||"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ";
  const tx=loc(raw, cfg.adultTickerTextBn);
  return `<div class="ticker"><span>${tx}${tx}</span></div>`;
}
function listForAdult(){let list=movies.filter(m=>m.adult);if(state.adultCategory&&state.adultCategory!=="All"){list=list.filter(m=>(m.category||"").toLowerCase()===state.adultCategory.toLowerCase())}if(state.adultMode==="trending")list=list.slice().sort((a,b)=>(b.views||b.clicks||0)-(a.views||a.clicks||0));else list=list.slice().sort((a,b)=>b.id-a.id);return list}
function series(){const list=movies.filter(m=>!m.adult&&(m.category||"").toLowerCase().includes("series"));return menuOnlyHeader(t("Series"))+`<div class="section-title"><b>${t("Series")}</b><span>${t("Complete series")}</span></div>${list.map((m,i)=>card(m,i)).join("")||`<div class="panel">${t("Series not added yet.")}</div>`}`}
function adult(){
  // Adult library fully off from admin → hide everything on user side
  if(cfg.adultEnabled===false || cfg.adultLibraryEnabled===false){
    return `<div class="empty" style="padding:40px 16px;text-align:center">${t("Adult library is currently unavailable.")}</div>`;
  }
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
  return `<div class="home-sticky-top" id="homeSticky">`+menuOnlyHeader(t("Adult"))+heroPillsAdult()+`<div class="home-sticky-line"></div></div>`+catRowAdult()+libCardAdult()+tickerAdult()+list.map((m,i)=>card(m,i)).join("")||`<div class="empty">${t("No adult content yet. Add from Admin Panel.")}</div>`;
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
  const refs=Number((userData&&userData.refs)!=null?userData.refs:localStorage.getItem("cinehub4_refs")||0);
  const cur=(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.get&&window.CINEHUB4_LANG.get())||localStorage.getItem("cinehub4_language")||"en";
  const avatar=photo?`<img src="${photo}" alt="">`:(name[0]||"U").toUpperCase();
  return menuOnlyHeader(t("Profile"))+`
  <div class="pf-card">
    <div class="pf-avatar">${avatar}</div>
    <div class="pf-meta">
      <div class="pf-name">${name}</div>
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
      <button type="button" class="pf-btn copy" onclick="copyRefLink()">📋 ${t("Copy Link")}</button>
      <button type="button" class="pf-btn share" onclick="shareRefLink()">↗ ${t("Share")}</button>
    </div>
  </div>
  <div class="pf-section">❓ ${t("HOW IT WORKS")}</div>
  <div class="pf-how">
    <div class="pf-how-card"><b>${t("When friend joins")}</b><span>${t("Points Added")}</span></div>
    <div class="pf-how-card"><b>${t("More Earning")}</b><span>${t("Watch ads & earn")}</span></div>
  </div>
  <div class="pf-actions" style="margin-bottom:12px">
    <button type="button" class="pf-btn tutorial" onclick="openLink(cfg.watchTutorialVideo||cfg.telegramBotLink)">▶ ${t("Watch Tutorial")}</button>
    <button type="button" class="pf-btn buy" onclick="nav('buy')">🛒 ${t("Buy Points")}</button>
  </div>
  <div class="pf-section">${t("MORE POINT EARNING")}</div>
  <div class="earn-card">
    <h3>${t("Watch Ads & Earn Points")}</h3>
    <p>${t("Complete ads to get rewards and unlock videos with points.")}</p>
    <div class="earn-tags"><span>✔ ${t("Instant Reward")}</span><span>🪙 ${t("More Points")}</span><span>${t("Unlock Videos")}</span></div>
    <button type="button" class="pf-btn wide" onclick="nav('tasks')">${t("More Point Earning")}</button>
  </div>
  <div id="adminPanelWrap" class="pf-section" style="display:none;margin-top:8px">
    <button type="button" id="adminPanelBtn" class="pf-btn wide" style="background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#fff;font-weight:800;border:0;padding:14px;border-radius:14px;width:100%">
      ⚙ ${t("Admin Panel")||"Admin Panel"}
    </button>
  </div>`;
}

function copyRefLink(){
  const t=document.getElementById("refLinkText")?.textContent||"";
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(()=>toast(t("Referral link copied!"))).catch(()=>toast(t));
  }else{toast(t("Referral link copied!"));}
}


function points(){return pageBackBar(t("My Points"))+`<div class="section-title"><b>🪙 ${t("My Points")}</b><span>${state.points} ${t("points")}</span></div><div class="panel"><div class="amount">${state.points} <span class="muted">${t("points")}</span></div><div class="task"><span>📺 ${t("Watch Ad & Earn")}</span><b>+${cfg.adReward}</b><button class="primary cyan" onclick="watchAd('rewarded')">${t("Watch")}</button></div><div class="task"><span>🛒 ${t("Buy Points")}</span><button class="primary pink" onclick="nav('buy')">${t("Buy")}</button></div><div class="task"><span>👥 ${t("Refer & Earn")}</span><button class="pill" onclick="shareRef()">${t("Share")}</button></div></div><div class="panel"><h3>${t("Daily Ad Limit")}</h3><div class="task"><span>${t("Only for earning points")}</span><b>${cfg.dailyAdLimit}/${t("day")}</b></div><div class="muted">${t("Movie unlock is not limited by the daily ad limit.")}</div></div>`}

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
/** Task progress: supports limit > 1. Shows Done only after required completions.
 *  Permanent tasks stay done forever. Others reset after tk.resetHours (default 24). */
function taskStableId(tk,i){
  // Always include index so two tasks never share the same progress key
  const name=String((tk&&(tk.id||tk.name))||("task")).toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,28);
  const typ=String((tk&&tk.type)||"x").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,12);
  return "t"+String(i)+"_"+name+"_"+typ;
}
function taskResetInfo(i,tk){
  const sid=taskStableId(tk,i);
  const key="cinehub4_task_"+sid+"_done_at";
  const countKey="cinehub4_task_"+sid+"_count";
  const dayKey="cinehub4_task_"+sid+"_day";
  const limit=Math.max(1, Number(tk&&tk.limit)||1);
  let count=Number(localStorage.getItem(countKey)||0);
  if(tk && (tk.type==="share"||tk.type==="refer") && userData && userData.ref_task_count!=null){
    count=Math.max(count, Number(userData.ref_task_count)||0);
  }
  // Permanent: never auto-reset
  if(tk && tk.permanent){
    const done = count >= limit;
    return {done:done,key,countKey,count,limit,sid};
  }
  const raw=localStorage.getItem(key);
  const mode=String((tk&&tk.resetMode)||"hours");
  const today=new Date().toDateString();
  if(mode==="midnight"){
    const storedDay=localStorage.getItem(dayKey)||"";
    if(storedDay && storedDay!==today){
      localStorage.removeItem(key);
      localStorage.removeItem(countKey);
      localStorage.setItem(dayKey, today);
      count=0;
    } else if(!storedDay){
      localStorage.setItem(dayKey, today);
    }
  } else if(raw){
    const hours=Number(tk&&tk.resetHours);
    const h=(isFinite(hours)&&hours>0)?hours:24;
    if((Date.now()-Number(raw))/3600000 >= h){
      localStorage.removeItem(key);
      localStorage.removeItem(countKey);
      count=0;
    }
  }
  // Also reset top ad counter at midnight if configured
  const done = count >= limit;
  return {done:done,key,countKey,count,limit,sid,dayKey};
}
function markTaskProgress(i,tk){
  const st=taskResetInfo(i,tk);
  const next=st.count+1;
  localStorage.setItem(st.countKey,String(next));
  if(st.dayKey) localStorage.setItem(st.dayKey, new Date().toDateString());
  if(next>=st.limit){
    localStorage.setItem(st.key,String(Date.now()));
  }
  // persist on user for cross-device (share tasks)
  try{
    if(window.CineHubFB && tk && (tk.type==="share"||tk.type==="refer")){
      window.CineHubFB.updateUserField(null,{ref_task_count:next});
      if(userData) userData.ref_task_count=next;
    }
  }catch(e){}
  return next>=st.limit;
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
    const prog=st.limit>1?(` · ${st.count}/${st.limit}`):"";
    const statusLabel=st.done?(tk.permanent?t("Completed"):t("Done")):(tk.permanent?t("One-time task"):t("Daily task"))+prog;
    return `<div class="task-row ${st.done?"done":""}">
      <div class="task-ico">🎁</div>
      <div class="task-meta"><b>${langIsBn()&&tk.nameBn?tk.nameBn:t(tk.name||"")}</b><span>${t("Reward")}: ${tk.reward} pt · ${statusLabel}</span></div>
      ${st.done?`<button type="button" class="task-done" disabled>${t("Done")}</button>`:`<button type="button" class="task-start" onclick="runTask(${i})">${t("Start")}</button>`}
    </div>`;
  }).join("")}`;
}
function runTask(i){
  const tk=getTasks()[i];if(!tk)return;
  const st=taskResetInfo(i,tk);
  if(st.done){toast(tk.permanent?t("Already completed"):t("Done"));return}
  const credit=function(opts){
    opts=opts||{};
    // Ad-type: progress each view; reward each view (or only on finish if rewardOnce)
    const rewardEach = (tk.type==="ad" && !tk.rewardOnce);
    const willFinish = (st.count+1) >= st.limit;
    if(tk.type==="ad" && tk.rewardOnce){
      const finished=markTaskProgress(i,tk);
      if(finished){
        state.points+=Number(tk.reward||0);save();
        toast("+"+(tk.reward||0)+" points · "+t("Done"));
      } else {
        toast(t("Ad progress")+" "+(st.count+1)+"/"+st.limit);
      }
      render(false);
      return finished;
    }
    state.points+=Number(tk.reward||0);save();
    const finished=markTaskProgress(i,tk);
    toast("+"+(tk.reward||0)+" points"+(finished?" · "+t("Done"):" · "+(st.count+1)+"/"+st.limit));
    render(false);
    return finished;
  };
  const type=String(tk.type||"login");

  // Daily login — one tap
  if(type==="login"){
    credit();
    return;
  }

  // Telegram join — must be member (bot must be admin in channel)
  if(type==="telegram"||type==="join"){
    const ch=tk.link||tk.channel||cfg.telegramChannelLink||"";
    if(!ch){toast(t("Channel link not set"));return;}
    openLink(ch);
    toast(t("Checking membership…"));
    setTimeout(function(){
      if(!window.CineHubFB||!window.CineHubFB.checkChannelMember){
        toast(t("Join channel then tap Start again"));
        return;
      }
      window.CineHubFB.checkChannelMember(ch).then(function(res){
        if(res&&res.joined){
          credit();
        } else {
          toast(t("Join the channel first")+(res&&res.error?(" · "+res.error):""));
        }
      }).catch(function(e){
        toast(t("Could not verify")+" — "+(e&&e.message?e.message:e));
      });
    }, 2500);
    return;
  }

  // Social media / any URL — NO countdown; Claim or Cancel
  if(type==="social"||type==="visit"){
    const url=(tk.link||"").trim();
    if(!url){toast(t("Link not set"));return;}
    showVisitClaimTask(
      (langIsBn()&&tk.nameBn?tk.nameBn:tk.name)||t("Task"),
      url,
      function(){ credit(); }
    );
    return;
  }

  // Open link + optional countdown (Cancel = no points)
  if(type==="link"||type==="countdown"||type==="oneclick"){
    const url=(tk.link||"").trim();
    if(url) openLink(url);
    const secs=Number(tk.seconds||tk.secs||0);
    if(secs>0){
      showCountdownTask(
        (langIsBn()&&tk.nameBn?tk.nameBn:tk.name)||t("Task"),
        secs,
        function(){ credit(); },
        {sub: url ? t("Link opened — wait for timer") : t("Keep this page open until countdown ends.")}
      );
    } else if(type==="link"){
      // link without timer: require return verify? For plain link without telegram, credit after short confirm countdown default 5
      showCountdownTask(
        (langIsBn()&&tk.nameBn?tk.nameBn:tk.name)||t("Task"),
        5,
        function(){ credit(); },
        {sub:t("Keep this page open until countdown ends.")}
      );
    } else {
      showCountdownTask((langIsBn()&&tk.nameBn?tk.nameBn:tk.name)||"Task", 5, function(){ credit(); });
    }
    return;
  }

  // Watch ads until limit — each completion counts
  if(type==="ad"){
    window.__cinehub_pendingTask = i;
    watchAd("task");
    return;
  }

  // Share referral
  if(type==="share"||type==="refer"){
    shareRefLink();
    // Real multi-ref progress comes from processReferral; optional one share action credit if limit allows
    if(tk.creditOnShare){
      credit();
    } else {
      toast(t("Share your link — points when friends join"));
    }
    return;
  }

  credit();
}

function settings(){return pageBackBar(t("Settings"))+`<div class="section-title"><b>⚙ ${t("Settings")}</b></div><div class="panel"><div class="task"><span>${t("Language")}</span><select class="pill" style="appearance:auto" onchange="CINEHUB4_LANG.set(this.value);render(false)"><option value="en" ${CINEHUB4_LANG.get()==="en"?"selected":""}>English</option><option value="bn" ${CINEHUB4_LANG.get()==="bn"?"selected":""}>বাংলা</option></select></div><div class="task"><span>${t("Telegram")}</span><button class="pill" onclick="openLink(cfg.telegramBotLink)">${t("Open")}</button></div><div class="task"><span>${t("How to Watch")}</span><button class="pill" onclick="howToEarn()">${t("Open")}</button></div></div>`}

function getPackages(){
  const list = (cfg.packages&&cfg.packages.length)?cfg.packages:[
    {name:"Basic Package",tag:"SMART CHOICE",price:0.99,points:110},
    {name:"Standard Package",tag:"STARTER",price:4.99,points:550},
    {name:"Premium Package",tag:"BEST VALUE",price:9.99,points:1200},
    {name:"Ultimate Package",tag:"POPULAR",price:14.99,points:2000}
  ];
  return list.map(p=>({
    name:p.name||"Package",
    nameBn:p.nameBn||"",
    tag:p.tag||"",
    tagBn:p.tagBn||"",
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
function compressProofImage_(dataUrl, maxSide, quality){
  return new Promise(function(resolve){
    try{
      if(!dataUrl || dataUrl.indexOf("data:image")!==0){ resolve(dataUrl||""); return; }
      var img = new Image();
      img.onload = function(){
        try{
          var w = img.width, h = img.height;
          var scale = 1;
          if (Math.max(w,h) > maxSide) scale = maxSide / Math.max(w,h);
          var cw = Math.max(1, Math.round(w * scale));
          var ch = Math.max(1, Math.round(h * scale));
          var canvas = document.createElement("canvas");
          canvas.width = cw; canvas.height = ch;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, cw, ch);
          var out = canvas.toDataURL("image/jpeg", quality || 0.72);
          // If still huge, compress harder
          if (out.length > 400000) {
            out = canvas.toDataURL("image/jpeg", 0.5);
          }
          if (out.length > 400000) {
            out = canvas.toDataURL("image/jpeg", 0.35);
          }
          resolve(out);
        }catch(e){ resolve(dataUrl); }
      };
      img.onerror = function(){ resolve(dataUrl); };
      img.src = dataUrl;
    }catch(e){ resolve(dataUrl||""); }
  });
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
      username: tg && tg.username ? String(tg.username) : user,
      first_name: tg && tg.first_name ? String(tg.first_name) : "",
      pkg:order.name,
      usdt:order.price,
      points:order.points,
      txid:txid,
      trxId:txid,
      proof:proofName||"(screenshot)",
      proofData:proofData,
      wallet:(state.selectedWallet&&state.selectedWallet.name)||"",
      network:(state.selectedWallet&&state.selectedWallet.network)||"",
      method:"USDT",
      status:"pending",
      ts:now.getTime(),
      created_at:now.getTime(),
      date:now.toLocaleString(),
      created:now.toISOString()
    };
    if(window.CineHubFB){
      window.CineHubFB.addPayment(paymentObj).then(function(){
        toast(t("Payment request submitted"));
      }).catch(function(e){
        console.error(e);
        toast("Payment save failed: "+(e&&e.message?e.message:e));
      });
    } else {
      const list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
      list.push(Object.assign({id:Date.now()},paymentObj));
      localStorage.setItem("cinehub4_payments",JSON.stringify(list));
      toast(t("Payment request submitted"));
    }
    state.buyStep=null;state.buyOrder=null;state.selectedWallet=null;
    nav("profile");
  };
  try{
    if(fileInput&&fileInput.files&&fileInput.files[0]){
      proofName=fileInput.files[0].name;
      const reader=new FileReader();
      reader.onload=function(e){
        var raw = e.target.result || "";
        compressProofImage_(raw, 1000, 0.7).then(function(compressed){
          proofData = compressed || "";
          if (proofData && proofData.length > 450000) {
            proofData = "";
            proofName = (proofName||"screenshot") + " (too large)";
          }
          finish();
        });
      };
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
    return `
    <div class="buy-modal">
      <div class="buy-modal-icon">👑</div>
      <h2>${t("Confirm Purchase")}</h2>
      <div class="pf-panel">
        <div class="pf-row"><span>${t("Package")}</span><b>${langIsBn()&&o.nameBn?o.nameBn:t(o.name||"")}</b></div>
        <div class="pf-row"><span>${t("Pay Amount")}</span><b>${o.price} USDT</b></div>
        <div class="pf-row"><span>🪙 ${t("You Get")}</span><b>${o.points} Points</b></div>
      </div>
      <p class="muted" style="font-size:12px;line-height:1.45">${t("After confirmation, select a wallet address, send the exact USDT amount, then submit TxID and screenshot for admin approval.")}</p>
      <div class="pf-actions" style="margin-top:14px">
        <button type="button" class="pf-btn cancel-buy" onclick="cancelBuy()">${t("Cancel")}</button>
        <button type="button" class="pf-btn copy" onclick="confirmBuy()">${t("Confirm")}</button>
      </div>
    </div>`;
  }
  if(state.buyStep==="pay"&&state.buyOrder){
    const o=state.buyOrder;
    const wallets=getWallets();
    const sw=state.selectedWallet;
    const walletOpts=wallets.map((w,i)=>`<option value="${i}">${w.name||("Wallet "+(i+1))}</option>`).join("");
    return pageBackBar(t("Buy Points"))+`
    <button type="button" class="pf-btn wide" style="margin-bottom:12px" onclick="cancelBuy()">👑 ${t("Purchase Custom Coins")}</button>
    <div class="pf-section">💳 ${t("PAYMENT STEP")}</div>
    <div class="pf-panel">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div class="stat-mini"><span>${t("PAY AMOUNT")}</span><b>${o.price} USDT</b></div>
        <div class="stat-mini"><span>${t("YOU GET")}</span><b>${o.points}</b></div>
      </div>
      <label style="font-size:12px;color:#9aa3b8">${t("Select Wallet")}</label>
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
  return pageBackBar(t("Buy Points"))+`
  <div class="earn-card">
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
      <div class="ico" style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#7c5cff,#5b8cff);display:grid;place-items:center;font-size:22px">🪙</div>
      <div><h3 style="margin:0">Buy Premium Points</h3>
      <p style="margin:4px 0 0;font-size:12px;color:#9aa3b8">Select a package or enter custom USDT amount, then submit your payment proof for admin approval.</p></div>
    </div>
    <button type="button" class="pf-btn wide" style="margin-top:8px" onclick="openLink(cfg.howToBuyVideo||cfg.telegramBotLink)">▶ How to Buy Points</button>
  </div>
  <div class="pf-section">💎 SELECT PACKAGE</div>
  ${pkgs.map((p,i)=>`<div class="pkg-row pkg-tone-${(i%6)+1}">
    <div class="pkg-ico">${icons[i%icons.length]}</div>
    <div class="pkg-meta">
      <div class="pkg-name">${langIsBn()&&p.nameBn?p.nameBn:t(p.name||"")} ${p.tag?`<span class="pkg-tag">${langIsBn()&&p.tagBn?p.tagBn:t(p.tag||"")}</span>`:""}</div>
      <div class="pkg-sub">$ ${p.price} USDT · <span style="color:#4ade80">${p.points} Points</span></div>
    </div>
    <button type="button" class="pkg-buy" onclick="startBuy('${p.name.replace(/'/g,"")}',${p.price},${p.points})">🛒 Buy</button>
  </div>`).join("")}
  <div class="pf-section">✦ CUSTOM AMOUNT</div>
  <div class="pf-panel">
    <label style="font-size:12px;color:#9aa3b8">Enter Points Amount</label>
    <input id="customPts" type="number" placeholder="Example: 1000" oninput="updateCustomUsdt()" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#eef1ff">
    <div class="pf-row"><span>Required USDT</span><b id="customUsdtShow">0.00 USDT</b></div>
    <button type="button" class="pf-btn wide copy" style="margin-top:10px" onclick="buyCustom()">👑 ${t("Purchase Custom Coins")}</button>
  </div>`;
}

/* —— Unlock helpers (admin: cost / hours / ads / servers) —— */
function unlockKey(id){return "cinehub4_unlock_"+id}
function progressKey(id){return "cinehub4_uprog_"+id}
function adProgressKey(id){return "cinehub4_uad_"+id}
function isMovieUnlocked(id){
  try{
    if(userData && userData.unlocks){
      const exp=Number(userData.unlocks[String(id)]||0);
      if(exp>Date.now()) return true;
    }
    const exp2=Number(localStorage.getItem(unlockKey(id))||0);
    return exp2>Date.now();
  }catch(e){return false}
}
function markMovieUnlocked(id){
  loadSharedSettings();
  const hours=Number(cfg.unlockHours)||15;
  const exp=Date.now()+hours*3600*1000;
  if(!userData) userData={};
  if(!userData.unlocks) userData.unlocks={};
  userData.unlocks[String(id)]=exp;
  try{localStorage.setItem(unlockKey(id),String(exp))}catch(e){}
  try{localStorage.removeItem(progressKey(id))}catch(e){}
  try{localStorage.removeItem(adProgressKey(id))}catch(e){}
  if(window.CineHubFB) try{window.CineHubFB.setUnlock(null, id, hours)}catch(e){}
  state.unlockProgress=Number(cfg.unlockCost)||5;
  return hours;
}
/** Points contributed toward unlockCost */
function getUnlockProgress(id){
  try{return Number(localStorage.getItem(progressKey(id))||0)}catch(e){return 0}
}
function setUnlockProgress(id,n){
  loadSharedSettings();
  const cost=Math.max(1, Number(cfg.unlockCost)||5);
  const v=Math.max(0,Math.min(cost,Number(n)||0));
  try{localStorage.setItem(progressKey(id),String(v))}catch(e){}
  state.unlockProgress=v;
  return v;
}
/** Ads watched toward adsForUnlock */
function getAdUnlockProgress(id){
  try{return Number(localStorage.getItem(adProgressKey(id))||0)}catch(e){return 0}
}
function setAdUnlockProgress(id,n){
  loadSharedSettings();
  const need=Math.max(1, Number(cfg.adsForUnlock)||5);
  const v=Math.max(0,Math.min(need,Number(n)||0));
  try{localStorage.setItem(adProgressKey(id),String(v))}catch(e){}
  return v;
}
function tryCompleteUnlock(id){
  loadSharedSettings();
  const cost=Math.max(1, Number(cfg.unlockCost)||5);
  const adsNeed=Math.max(1, Number(cfg.adsForUnlock)||5);
  const p=getUnlockProgress(id);
  const a=getAdUnlockProgress(id);
  if(p>=cost || a>=adsNeed){
    const h=markMovieUnlocked(id);
    toast(t("Content unlocked.")+" · "+h+"h");
    return true;
  }
  return false;
}
function serverCount(){return Math.max(1,Math.min(10,Number(cfg.downloadServers)||3))}

function detail(id){
  const m=movies.find(x=>String(x.id)===String(id));if(!m){console.warn("detail: movie not found",id);return;}
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
      try{sessionStorage.setItem("cinehub4_page","detail");localStorage.setItem("cinehub4_page","detail")}catch(e){}
      render(false);
    });
  }else{
    state.page="detail";
    try{sessionStorage.setItem("cinehub4_page","detail");localStorage.setItem("cinehub4_page","detail")}catch(e){}
    render(false);
  }
}


function tickUnlockTimer(){
  var el=document.getElementById("unlockTimer");
  if(!el) return;
  var exp=Number(el.getAttribute("data-exp")||0);
  var left=Math.max(0, exp-Date.now());
  var h=Math.floor(left/3600000), m=Math.floor((left%3600000)/60000), s=Math.floor((left%60000)/1000);
  var pad=function(n){return String(n).padStart(2,"0")};
  el.textContent=pad(h)+":"+pad(m)+":"+pad(s);
  if(left<=0 && state.page==="detail"){ render(false); }
}
if(!window.__unlockTimerIv){
  window.__unlockTimerIv=setInterval(tickUnlockTimer, 1000);
}

function detailView(){
  loadSharedSettings();
  const m=movies.find(x=>String(x.id)===String(state.detailId));if(!m)return moviesPage();
  const cost=Number(cfg.unlockCost)||5;
  const adsNeed=Number(cfg.adsForUnlock)||cost;
  const hours=Number(cfg.unlockHours)||15;
  const title=(m.title||"").split("|")[0].trim();
  const unlocked=isMovieUnlocked(m.id);
  const isAdult=!!m.adult;
  const backPage=isAdult?"adult":"movies";
  const pageLabel=isAdult?(t("Adult")+" · "+t("Movie")):t("Movie");
  const clicks=Number(m.clicks||m.views||0);

  // shared poster header
  function posterBlock(){
    return `<div class="ps-poster">
      <div class="ps-poster-img">${posterHTML(m,"full")}</div>
      <div class="ps-badge">${isAdult?"18+":t("Movie")}</div>
      <div class="ps-dur">★ ${m.rating||8} · ${m.year||""}</div>
    </div>
    <div class="ps-share-row">
      <button type="button" class="ps-share-btn ps-copy" onclick='copyMovieLink(${JSON.stringify(String(m.id))})'>
        <span class="ps-ico-svg" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></span>
        ${t("Copy Link")}
      </button>
      <button type="button" class="ps-share-btn ps-send" onclick='shareMovie(${JSON.stringify(String(m.id))})'>
        <span class="ps-ico-svg" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg></span>
        ${t("Share")}
      </button>
    </div>
    <h1 class="ps-title">${title.replace(/</g,"&lt;")}</h1>
    <div class="ps-sub">${(m.genre||m.category||"").toString().replace(/</g,"")} · ${m.year||""}</div>`;
  }

  if(unlocked){
    const n=serverCount();
    let servers="";
    for(let i=1;i<=n;i++){
      const url = m["server"+i]||m["server"+i+"_link"]||m["s"+i]||"";
      if(!url && i>1) continue;
      servers+=`<button type="button" class="ps-dl-btn" onclick='openServer(${JSON.stringify(String(m.id))},${i})'>
        <span class="ps-dl-ico">⬇</span>
        <span><b>${t("Server")} ${i}</b><small>${t("Download / Watch")}</small></span>
        <span class="ps-dl-go">›</span>
      </button>`;
    }
    if(!servers){
      servers=`<button type="button" class="ps-dl-btn primary" onclick='openServer(${JSON.stringify(String(m.id))},1)'>
        <span class="ps-dl-ico">⬇</span>
        <span><b>${t("Download Now")}</b><small>${t("Watch or download")}</small></span>
        <span class="ps-dl-go">›</span>
      </button>`;
    }
    // expiry from userData or local
    let exp=0;
    try{
      if(userData&&userData.unlocks) exp=Number(userData.unlocks[String(m.id)]||0);
      if(!exp) exp=Number(localStorage.getItem(unlockKey(m.id))||0);
    }catch(e){}
    const leftMs=Math.max(0,exp-Date.now());
    const leftH=Math.floor(leftMs/3600000);
    const leftM=Math.floor((leftMs%3600000)/60000);
    const leftS=Math.floor((leftMs%60000)/1000);
    const pad=n=>String(n).padStart(2,"0");
    const timerStr=pad(leftH)+":"+pad(leftM)+":"+pad(leftS);
    return pageBackBar(pageLabel)+`
    <div class="ps-page unlocked">
      ${posterBlock()}
      <div class="ps-unlock-card ok">
        <div class="ps-ok-head">
          <span class="ps-dot ok"></span>
          <b>${t("Content unlocked successfully")}</b>
        </div>
        <div class="ps-metrics">
          <div class="ps-m need"><span class="ps-m-ico ps-i-key" aria-hidden="true"></span><span class="ps-m-lbl">${t("Required")}</span><b>${cost}</b></div>
          <div class="ps-m myp"><span class="ps-m-ico ps-i-coin" aria-hidden="true"></span><span class="ps-m-lbl">${t("My Points")}</span><b>${state.points||0}</b></div>
          <div class="ps-m rem"><span class="ps-m-ico ps-i-time" aria-hidden="true"></span><span class="ps-m-lbl">${t("Remaining")}</span><b>0</b></div>
        </div>
        <div class="ps-progress">
          <div class="ps-bar"><i style="width:100%"></i></div>
          <div class="ps-prog-txt">${t("Progress")}: ${cost}/${cost}</div>
        </div>
        <div class="ps-timer-box">
          <div class="ps-timer-lbl">${t("Unlock time remaining")}</div>
          <div class="ps-timer" id="unlockTimer" data-exp="${exp}">${timerStr}</div>
          <div class="ps-timer-sub">${t("This content stays unlocked for a limited time.")}</div>
        </div>
        <div class="ps-dl-list">${servers}</div>
      </div>
      <button type="button" class="ps-more" onclick="nav('${backPage}')">${t("More Watching")} ›</button>
    </div>`;
  }

  const prog=Math.min(cost, getUnlockProgress(m.id) || 0);
  state.unlockProgress=prog;
  const adProg=getAdUnlockProgress(m.id);
  const rem=Math.max(0,cost-prog);
  const my=Number(state.points||0);
  // Overall fill: max of points-path% and ads-path%
  const pctPts=Math.min(100,(prog/Math.max(1,cost))*100);
  const pctAds=Math.min(100,(adProg/Math.max(1,adsNeed))*100);
  const pct=Math.max(pctPts, pctAds);
  return pageBackBar(pageLabel)+`
  <div class="ps-page">
    <div class="ps-notice">
      <div class="ps-bell">🔔</div>
      <div>
        <div class="ps-n-title">${t("UNLOCK NOTICE")}</div>
        <div class="ps-n-sub">${isAdult?t("ADULT CONTENT"):t("MOVIE CONTENT")}</div>
        <div class="ps-n-desc">${t("Unlock this content using ads or points.")}</div>
      </div>
    </div>
    ${posterBlock()}
    <div class="ps-unlock-card">
      <div class="ps-ok-head">
        <span class="ps-dot"></span>
        <b>${t("Unlock this content using ads or points.")}</b>
      </div>
      <div class="ps-metrics">
        <div class="ps-m need"><span class="ps-m-ico ps-i-key" aria-hidden="true"></span><span class="ps-m-lbl">${t("Required")}</span><b>${cost}</b></div>
        <div class="ps-m myp"><span class="ps-m-ico ps-i-coin" aria-hidden="true"></span><span class="ps-m-lbl">${t("My Points")}</span><b>${my}</b></div>
        <div class="ps-m rem"><span class="ps-m-ico ps-i-time" aria-hidden="true"></span><span class="ps-m-lbl">${t("Remaining")}</span><b>${rem}</b></div>
      </div>
      <div class="ps-progress">
        <div class="ps-bar"><i style="width:${pct}%"></i></div>
        <div class="ps-prog-txt">${t("Points")}: ${prog}/${cost} · ${t("Ads")}: ${adProg}/${adsNeed} · ${hours}h</div>
      </div>
      <div class="ps-hint">${t("Unlock with points or ads")}</div>
      <button type="button" class="ps-btn lock" onclick="unlockWithAds()">${t("Unlock Video")}</button>
      <button type="button" class="ps-btn points" onclick="usePointsForUnlock()">${t("Use My Points")}</button>
    </div>
    <button type="button" class="ps-more" onclick="nav('${backPage}')">${t("More Watching")} ›</button>
  </div>`;
}

function usePointsForUnlock(){
  loadSharedSettings();
  const id=state.detailId;
  if(!id){toast(t("Open a movie first"));return}
  if(isMovieUnlocked(id)){toast(t("Already unlocked"));render(false);return}
  const cost=Math.max(1, Number(cfg.unlockCost)||5);
  let prog=getUnlockProgress(id);
  const need=Math.max(0, cost-prog);
  if(need<=0){
    markMovieUnlocked(id);
    toast(t("Content unlocked."));
    render(false);
    return;
  }
  const have=Math.max(0, Number(state.points)||0);
  if(have<=0){
    toast(t("Not enough points")+" (0)");
    return;
  }
  // Spend whatever user has (partial OK) — 1 point = 1 progress
  const spend=Math.min(have, need);
  state.points=have-spend;
  save();
  prog=setUnlockProgress(id, prog+spend);
  const rem=Math.max(0, cost-prog);
  if(tryCompleteUnlock(id)){
    render(false);
    return;
  }
  toast("-"+spend+" "+t("Points")+" · "+t("Progress")+": "+prog+"/"+cost+" · "+t("Remaining")+": "+rem);
  render(false);
}
function unlockWithAds(){watchAd("unlock")}
function unlockPoints(){usePointsForUnlock()}

function openServer(movieId,serverNo){
  if(!isMovieUnlocked(movieId)){toast(t("Unlock required"));return}
  const m=movies.find(x=>x.id===movieId||String(x.id)===String(movieId));
  if(!m){toast("Movie not found");return}
  const title=(m.title||"").split("|")[0].trim()||"Movie";
  let url="", on=true;
  if(serverNo===1){ url=m.server1||m.server1_link||m.s1||""; on=m.server1_status!==false&&m.s1on!==false; }
  else if(serverNo===2){ url=m.server2||m.server2_link||m.s2||""; on=m.server2_status!==false&&m.s2on!==false; }
  else if(serverNo===3){ url=m.server3||m.server3_link||m.s3||""; on=m.server3_status!==false&&m.s3on!==false; }
  if(!on){toast(t("Server")+" "+serverNo+" offline");return}
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

/** Social / visit link — no countdown. Open link then Claim or Cancel. */
function showVisitClaimTask(name, url, onClaim){
  const ov=document.createElement("div");
  ov.className="modal earn-modal";
  ov.id="visitModal";
  ov.innerHTML=`<div class="modal-card cd-card" style="text-align:center">
    <b class="cd-title">${name||t("Task")}</b>
    <div class="muted cd-sub" style="margin:10px 0">${t("Open the link, then tap Claim. Cancel = no points.")}</div>
    <button type="button" class="pf-btn copy" id="visitOpenBtn" style="width:100%;margin-bottom:10px">🔗 ${t("Open Link")}</button>
    <div class="pf-actions" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <button type="button" class="pf-btn cancel-buy" id="visitCancelBtn">${t("Cancel")}</button>
      <button type="button" class="pf-btn copy" id="visitClaimBtn">✓ ${t("Claim")}</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
  function close(){ try{ov.remove()}catch(e){} }
  if(url){
    try{ openLink(url); }catch(e){}
  }
  document.getElementById("visitOpenBtn").onclick=function(){ if(url) openLink(url); };
  document.getElementById("visitCancelBtn").onclick=function(){
    close();
    toast(t("Cancelled")+" — "+t("No points"));
  };
  document.getElementById("visitClaimBtn").onclick=function(){
    close();
    if(onClaim) onClaim();
  };
}

function showCountdownTask(name,secs,onDone,opts){
  opts=opts||{};
  const ov=document.createElement("div");
  ov.className="modal earn-modal";
  ov.id="cdModal";
  let left=Math.max(1, Number(secs)||5);
  const total=left;
  let cancelled=false;
  ov.innerHTML=`<div class="modal-card cd-card">
    <div class="cd-ring-wrap">
      <svg class="cd-svg" viewBox="0 0 100 100">
        <circle class="cd-bg" cx="50" cy="50" r="42"/>
        <circle class="cd-fg" id="cdFg" cx="50" cy="50" r="42" style="stroke-dasharray:264;stroke-dashoffset:0"/>
      </svg>
      <div class="cd-play">▶</div>
    </div>
    <b class="cd-title">${name||"Task"}</b>
    <div class="muted cd-sub">${opts.sub||t("Keep this page open until countdown ends.")}</div>
    <div class="cd-num" id="cdNum">${left}s</div>
    <button type="button" class="pf-btn cancel-buy" id="cdCancelBtn" style="margin-top:14px;width:100%">${t("Cancel")}</button>
  </div>`;
  document.body.appendChild(ov);
  const circ=2*Math.PI*42;
  function cleanup(){ try{clearInterval(tick)}catch(e){} try{ov.remove()}catch(e){} }
  document.getElementById("cdCancelBtn").onclick=function(){
    cancelled=true;
    cleanup();
    toast(t("Cancelled")+" — "+t("No points"));
  };
  const tick=setInterval(function(){
    if(cancelled) return;
    left--;
    const el=document.getElementById("cdNum");
    const fg=document.getElementById("cdFg");
    if(el) el.textContent=left+"s";
    if(fg) fg.style.strokeDashoffset=String(circ*(1-Math.max(0,left)/total));
    if(left<=0){
      cleanup();
      if(!cancelled && onDone) onDone();
    }
  },1000);
}
function resolveAdSlot(mode){
  loadSharedSettings();
  const slots = cfg.adSlots || {};
  const b = cfg.adBlocks || {};
  // Map mode → slot key
  let key = "rewarded";
  if(mode==="adult") key="adult";
  else if(mode==="task") key="task";
  else if(mode==="unlock") key="unlock";
  else if(mode==="banner") key="banner";
  else if(mode==="bannerAdult") key="bannerAdult";
  else if(mode==="interstitial") key="interstitial";

  let slot = slots[key];
  if(!slot || (!slot.id && !slot.network)){
    // legacy fallback from adBlocks only
    let id = "";
    if(key==="adult") id=b.adult||b.rewarded||"";
    else if(key==="task") id=b.task||b.rewarded||"";
    else if(key==="unlock") id=b.unlock||b.interstitial||b.rewarded||"";
    else if(key==="banner") id=b.banner||"";
    else if(key==="bannerAdult") id=b.bannerAdult||b.banner||"";
    else id=b.rewarded||"";
    slot = { network: "adsgram", id: id };
  }
  // unlock empty → try interstitial then rewarded
  if(key==="unlock" && !(slot.id||"").trim()){
    const inter = slots.interstitial || {network:"adsgram", id:b.interstitial||""};
    if((inter.id||"").trim()) return inter;
    const rew = slots.rewarded || {network:"adsgram", id:b.rewarded||""};
    return rew;
  }
  if(key==="adult" && !(slot.id||"").trim()){
    return slots.rewarded || {network:"adsgram", id:b.rewarded||""};
  }
  if(key==="task" && !(slot.id||"").trim()){
    return slots.rewarded || {network:"adsgram", id:b.rewarded||""};
  }
  return slot;
}

function loadAdScriptOnce(src, globalCheck){
  return new Promise(function(resolve){
    if(globalCheck && globalCheck()){ resolve(true); return; }
    if(!src){ resolve(false); return; }
    const existing = document.querySelector('script[data-adsrc="'+src+'"]');
    if(existing){
      setTimeout(function(){ resolve(!!(globalCheck && globalCheck())); }, 400);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.setAttribute("data-adsrc", src);
    s.onload = function(){ resolve(true); };
    s.onerror = function(){ resolve(false); };
    document.head.appendChild(s);
  });
}

function openAdLink(url){
  try{
    if(window.Telegram && window.Telegram.WebApp){
      if(window.Telegram.WebApp.openLink){
        window.Telegram.WebApp.openLink(url, {try_instant_view:false});
        return true;
      }
    }
  }catch(e){}
  try{ window.open(url, "_blank"); return true; }catch(e){}
  return false;
}

/** Non-SDK networks: open zone/URL then countdown before reward */
function playLinkAd(slot, onDone){
  const id = String(slot.id||"").trim();
  if(!id){ toast(t("Admin has not configured this Ad Block ID")); return; }
  let url = id;
  // If looks like bare zone id (digits), build common redirect patterns per network
  if(!/^https?:\/\//i.test(id)){
    const net = (slot.network||"").toLowerCase();
    if(net==="monetag"){
      url = "https://otieu.com/4/"+encodeURIComponent(id);
    } else if(net==="onclicka" || net==="propeller" || net==="adexium" || net==="adsonar" || net==="tads" || net==="richads" || net==="aads" || net==="hilltop"){
      // Bare zone IDs need full tracking URL from dashboard — prompt admin
      toast(t("Paste full ad URL for this network")+" ("+net+")");
      return;
    } else {
      toast(t("Paste full ad URL for this network"));
      return;
    }
  }
  if(!/^https?:\/\//i.test(url)){
    toast(t("Invalid ad URL"));
    return;
  }
  openAdLink(url);
  const total = Math.max(5, Math.min(120, Number(cfg.adLinkSeconds)||20));
  let left = total;
  const ov = document.createElement("div");
  ov.className = "modal";
  ov.innerHTML = `<div class="modal-card cd-card open-ad-card">
    <div class="cd-ring-wrap">
      <svg class="cd-svg" viewBox="0 0 100 100"><circle class="cd-bg" cx="50" cy="50" r="42"/><circle class="cd-fg" id="adNetFg" cx="50" cy="50" r="42" style="stroke-dasharray:264;stroke-dashoffset:0"/></svg>
      <div class="cd-play">▶</div>
    </div>
    <b class="cd-title">${t("Watching Ad")}</b>
    <div class="muted cd-sub">${(slot.network||"ad").toUpperCase()} · ${t("Keep this page open until countdown ends.")}</div>
    <div class="cd-num" id="adNetNum">${left}s</div>
    <button type="button" class="btn" style="margin-top:12px" id="adNetCancel">${t("Cancel")}</button>
  </div>`;
  document.body.appendChild(ov);
  const circ = 2*Math.PI*42;
  const tick = setInterval(function(){
    left--;
    const el = document.getElementById("adNetNum");
    const fg = document.getElementById("adNetFg");
    if(el) el.textContent = left+"s";
    if(fg) fg.style.strokeDashoffset = String(circ * (1 - Math.max(0,left)/total));
    if(left <= 0){
      clearInterval(tick);
      ov.remove();
      if(onDone) onDone();
    }
  }, 1000);
  const cancel = document.getElementById("adNetCancel");
  if(cancel) cancel.onclick = function(){ clearInterval(tick); ov.remove(); toast(t("Ad closed")); };
}

function playAdsgram(blockId, onDone){
  if(!blockId){ toast(t("Admin has not configured this Ad Block ID")); return; }
  var loadToastTimer = null;
  var finished = false;
  function clearLoadToast(){
    if(loadToastTimer){ clearTimeout(loadToastTimer); loadToastTimer=null; }
  }
  function finish(ok){
    if(finished) return;
    finished = true;
    clearLoadToast();
    try{ if(onDone) onDone(); }catch(e){ console.warn(e); }
  }
  function tryShow(){
    if(window.Adsgram && typeof window.Adsgram.init==="function"){
      try{
        const ad = window.Adsgram.init({blockId:String(blockId), debug:!!cfg.adsgramDebug});
        // only show "loading" if ad takes >800ms to open
        loadToastTimer = setTimeout(function(){
          if(!finished) toast(t("Ad loading…"));
        }, 800);
        ad.show().then(function(){ finish(true); }).catch(function(){ finish(true); });
        return true;
      }catch(e){ console.warn(e); }
    }
    return false;
  }
  if(tryShow()) return;
  loadToastTimer = setTimeout(function(){
    if(!finished) toast(t("Ad loading…"));
  }, 800);
  loadAdScriptOnce("https://sad.adsgram.ai/js/sad.min.js", function(){ return !!(window.Adsgram && window.Adsgram.init); })
    .then(function(ok){
      if(ok && tryShow()) return;
      clearLoadToast();
      toast(t("Ad failed to load. Try again."));
    });
}

function playMonetag(zoneId, onDone){
  var raw = String(zoneId||"").trim();
  if(!raw){ toast(t("Admin has not configured this Ad Block ID")); return; }
  var id = raw.replace(/^show_/i,"");
  const fnName = "show_"+id;
  var loadToastTimer = null;
  var finished = false;
  function clearLoadToast(){ if(loadToastTimer){ clearTimeout(loadToastTimer); loadToastTimer=null; } }
  function finish(){
    if(finished) return;
    finished = true;
    clearLoadToast();
    try{ if(onDone) onDone(); }catch(e){}
  }
  function tryShow(){
    if(typeof window[fnName]==="function"){
      try{
        var p = window[fnName]();
        if(p && typeof p.then==="function"){
          p.then(function(){ finish(); }).catch(function(){ finish(); });
        } else {
          finish();
        }
        return true;
      }catch(e){ console.warn(e); }
    }
    return false;
  }
  if(tryShow()) return;
  loadToastTimer = setTimeout(function(){ if(!finished) toast(t("Ad loading…")); }, 800);
  if(!document.querySelector('script[data-monetag="'+id+'"]')){
    var s = document.createElement("script");
    s.src = "https://libtl.com/sdk.js";
    s.async = true;
    s.setAttribute("data-zone", id);
    s.setAttribute("data-sdk", fnName);
    s.setAttribute("data-monetag", id);
    document.head.appendChild(s);
  }
  setTimeout(function(){
    if(tryShow()) return;
    clearLoadToast();
    playLinkAd({network:"monetag", id:id}, onDone);
  }, 1200);
}

function playTads(widgetId, onDone){
  const id = String(widgetId||"").trim();
  if(!id){ toast(t("Admin has not configured this Ad Block ID")); return; }
  // TADS uses widget embed — fallback to link/countdown if no global
  if(window.TADS && typeof window.TADS.show==="function"){
    try{
      window.TADS.show(id).then(function(){ if(onDone) onDone(); }).catch(function(){ toast(t("Ad closed")); });
      return;
    }catch(e){}
  }
  playLinkAd({network:"tads", id:id}, onDone);
}

function playAdNetwork(slot, onDone){
  const net = String((slot&&slot.network)||"adsgram").toLowerCase();
  const id = String((slot&&slot.id)||"").trim();
  if(!id){ toast(t("Admin has not configured this Ad Block ID")); return; }
  if(net==="adsgram"){ playAdsgram(id, onDone); return; }
  if(net==="monetag"){ playMonetag(id, onDone); return; }
  if(net==="tads"){ playTads(id, onDone); return; }
  // richads, onclicka, adsonar, propeller, adexium, aads, hilltop, custom → open URL/zone + countdown reward
  playLinkAd(slot, onDone);
}

function resetDailyAdsIfNeeded(){
  const mode=String(cfg.dailyAdResetMode||"midnight");
  const today=new Date().toDateString();
  const stored=localStorage.getItem("cinehub4_ads_day")||(userData&&userData.ads_day)||"";
  if(mode==="midnight"){
    if(stored && stored!==today){
      localStorage.setItem("cinehub4_ads_today","0");
      localStorage.setItem("cinehub4_ads_day",today);
      if(userData){userData.ads_today=0;userData.ads_day=today;}
    }
  } else {
    // hours-based from first ad of cycle
    const start=Number(localStorage.getItem("cinehub4_ads_cycle_start")||0);
    const h=Number(cfg.dailyAdResetHours||24);
    if(start && (Date.now()-start)/3600000 >= h){
      localStorage.setItem("cinehub4_ads_today","0");
      localStorage.setItem("cinehub4_ads_cycle_start",String(Date.now()));
      if(userData){userData.ads_today=0;}
    }
  }
}
function watchAd(mode){
  resetDailyAdsIfNeeded();

  loadSharedSettings();
  const slot = resolveAdSlot(mode);
  const id = String((slot&&slot.id)||"").trim();
  if(!id && mode!=="countdown"){ toast(t("Admin has not configured this Ad Block ID")); return; }

  // Daily limit only for earning modes (not unlock/adult unlock path)
  if(mode!=="unlock" && mode!=="adult"){
    const watched=Number((userData&&userData.ads_today)||localStorage.getItem("cinehub4_ads_today")||0);
    const limit=Number(cfg.dailyAdLimit||20);
    if(watched>=limit){toast(t("Daily ad limit reached"));return}
  }

  function onAdDone(){
    if(mode==="unlock"){
      const mid=state.detailId;
      if(!mid){toast(t("Open a movie first"));return;}
      loadSharedSettings();
      const needAds=Math.max(1, Number(cfg.adsForUnlock)||5);
      let adProg=getAdUnlockProgress(mid)+1;
      adProg=setAdUnlockProgress(mid, adProg);
      toast("+1 "+t("ad progress")+" ("+adProg+"/"+needAds+")");
      if(tryCompleteUnlock(mid)){
        render(false);
        return;
      }
      render(false);
      return;
    }
    // Task ad → complete that task (reward from task, not generic ad reward)
    if(mode==="task" && window.__cinehub_pendingTask!=null){
      const ti=window.__cinehub_pendingTask;
      window.__cinehub_pendingTask=null;
      const tk=getTasks()[ti];
      if(tk){
        state.points+=Number(tk.reward||0);save();
        const finished=markTaskProgress(ti,tk);
        toast("+"+(tk.reward||0)+" points"+(finished?" · Done":""));
        // still count toward daily ad limit
        const watched=Number((userData&&userData.ads_today)||localStorage.getItem("cinehub4_ads_today")||0)+1;
        if(userData){userData.ads_today=watched;userData.ads_day=new Date().toDateString();}
        localStorage.setItem("cinehub4_ads_today",String(watched));
        if(window.CineHubFB) try{window.CineHubFB.updateUserField(null,{ads_today:watched,ads_day:new Date().toDateString()})}catch(e){}
        render(false);
        return;
      }
    }
    // Generic rewarded ad (points page)
    const reward=Number(cfg.adReward||2);
    state.points+=reward;
    const watched=Number((userData&&userData.ads_today)||localStorage.getItem("cinehub4_ads_today")||0)+1;
    if(userData){userData.ads_today=watched;userData.ads_day=new Date().toDateString();}
    localStorage.setItem("cinehub4_ads_today",String(watched));
    localStorage.setItem("cinehub4_ads_day",new Date().toDateString());
    if(window.CineHubFB) window.CineHubFB.updateUserField(null,{ads_today:watched,ads_day:new Date().toDateString()});
    save();
    toast("+"+reward+" "+t("points added"));
    render(false);
  }

  playAdNetwork(slot, onAdDone);
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
      const cur=(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.get&&window.CINEHUB4_LANG.get())||localStorage.getItem("cinehub4_language")||"en";
      if(lang===cur) return;
      // Flag so language.js event does not double-render
      window.__cinehub_langSwitching = true;
      try{
        if(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.set) window.CINEHUB4_LANG.set(lang);
        else localStorage.setItem("cinehub4_language",lang);
      }catch(err){localStorage.setItem("cinehub4_language",lang)}
      // One silent re-render — no page-enter animation (that caused the jump)
      try{render(false)}catch(err){}
      try{window.CINEHUB4_LANG&&window.CINEHUB4_LANG.translateDOM&&window.CINEHUB4_LANG.translateDOM()}catch(e){}
      syncLangButtons();
      window.__cinehub_langSwitching = false;
      // Soft toast only (no layout shift)
      toast(lang==="bn"?"ভাষা: বাংলা":"Language: English");
    };
  });
  syncLangButtons();
}

function markDrawerActive(){
  try{
    const page=state.page==="detail"?"movies":state.page;
    document.querySelectorAll("#drawer button[data-page]").forEach(function(b){
      const p=b.getAttribute("data-page");
      if(p===page){ b.classList.add("active"); b.classList.add("is-active"); }
      else { b.classList.remove("active"); b.classList.remove("is-active"); }
    });
  }catch(e){}
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
    try{
      if(sessionStorage.getItem("cinehub4_is_admin")==="1") return true;
    }catch(e){}
    const ids=(window.__ADMIN_IDS||[]);
    const tg=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;
    const uid=tg&&tg.id!=null?String(tg.id):"";
    return !!uid && ids.length>0 && ids.map(String).includes(uid);
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
        try{ sessionStorage.setItem("cinehub4_is_admin","1"); localStorage.setItem("cinehub4_admin_session","1"); }catch(e){}
        try{ setupAdminButton(); }catch(e){}
        try{ if(state.page==="profile") render(false); }catch(e){}
      }else{
        window.__ADMIN_IDS=[];
        window.__IS_ADMIN=false;
        try{ sessionStorage.removeItem("cinehub4_is_admin"); }catch(e){}
      }
      try{setupAdminButton()}catch(e){}
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
            try{setupAdminButton()}catch(e){}
          }
        }).catch(function(){});
      },1200);
    });
  }catch(e){ console.warn("[admin]", e); }
}
setTimeout(loadAdminIdsApp, 200);
setTimeout(loadAdminIdsApp, 1500);

function loadPublicAppConfig(forceRender){
  try{
    if(!window.CineHubFB) return;
    window.CineHubFB.loadConfig().then(function(c){
      if(!c || typeof c !== "object") return;
      try{ Object.assign(window.APP_CONFIG,c); }catch(e){}
      // Firebase config/main is source of truth for ALL users
      try{
        Object.keys(c).forEach(function(k){
          if(c[k]!==undefined && c[k]!==null) cfg[k]=c[k];
        });
        if(c.adBlocks) cfg.adBlocks=Object.assign({},cfg.adBlocks||{},c.adBlocks);
        if(c.adSlots) cfg.adSlots=Object.assign({},cfg.adSlots||{},c.adSlots);
        if(c.adLinkSeconds!=null) cfg.adLinkSeconds=c.adLinkSeconds;
        // Overwrite local cache with server so admin changes reach everyone
        localStorage.setItem("cinehub4_settings", JSON.stringify(c));
      }catch(e){}
      try{ applyTheme(); }catch(e){}
      // Background config — queue if UI frozen/splash
      if(forceRender !== false && !window.__cinehub_splashUp && !window.__cinehub_bootFreeze){
        try{ render(false); }catch(e){}
      } else if(window.__cinehub_splashUp || window.__cinehub_bootFreeze){
        window.__cinehub_needPaint = true;
      }
    }).catch(function(err){ console.warn("config load", err); });
  }catch(e){}
}
// Load ASAP + retry + periodic refresh so admin changes reach all users
setTimeout(function(){ loadPublicAppConfig(false); }, 400);
setTimeout(function(){ loadPublicAppConfig(false); }, 2000);
setTimeout(function(){ loadPublicAppConfig(false); }, 8000);
setInterval(function(){ loadPublicAppConfig(false); }, 60000);
try{
  document.addEventListener("visibilitychange", function(){
    if(document.visibilityState==="visible"){
      loadPublicAppConfig(false);
      if(window.__cinehub_blocked) loadUserFromFB();
    }
  });
}catch(e){}
function setupAdminButton(){
  try{
    const btn=document.getElementById("adminPanelBtn");
    const wrap=document.getElementById("adminPanelWrap");
    if(!btn && !wrap) return;
    // ONLY show for server-verified admins (Script Properties ADMIN_IDS)
    if(isAdminUser()){
      if(wrap){ wrap.style.display="block"; }
      if(btn){
        btn.classList.remove("hidden");
        btn.style.display="flex";
        btn.onclick=function(e){
          e.preventDefault();
          location.href="admin.html";
        };
      }
    }else{
      if(wrap){ wrap.style.display="none"; }
      if(btn){
        btn.classList.add("hidden");
        btn.style.display="none";
        btn.onclick=null;
      }
    }
  }catch(e){}
}

function bindLangButtons(){
  document.querySelectorAll("[data-lang]").forEach(function(btn){
    btn.onclick=function(e){
      e.preventDefault();e.stopPropagation();
      var lang=btn.getAttribute("data-lang");
      window.__cinehub_langSwitching = true;
      if(window.CINEHUB4_LANG&&window.CINEHUB4_LANG.set){
        window.CINEHUB4_LANG.set(lang);
      }else{
        localStorage.setItem("cinehub4_language",lang);
      }
      try{render(false)}catch(err){}
      try{window.CINEHUB4_LANG&&window.CINEHUB4_LANG.translateDOM()}catch(err){}
      window.__cinehub_langSwitching = false;
    };
  });
}


function bindHomeStickyScroll(){
  const bar=document.getElementById("homeSticky");
  if(!bar) return;
  const onScroll=function(){
    const y=window.scrollY||document.documentElement.scrollTop||0;
    if(y>8) bar.classList.add("is-scrolled");
    else bar.classList.remove("is-scrolled");
  };
  window.removeEventListener("scroll", window.__cinehubStickyScroll);
  window.__cinehubStickyScroll = onScroll;
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();
}

function render(animate=false){
/* Blocked users never see normal UI */
if(window.__cinehub_blocked){ return; }
/* Skip paints while splash is covering the screen (prevents open-time jerk) */
if(window.__cinehub_splashUp && !window.__cinehub_forcePaint){ window.__cinehub_needPaint=true; return; }
try{const views={movies:moviesPage,search:searchPage,series,adult,profile,points,tasks,settings,buy,detail:detailView,home:moviesPage};const screen=$("#screen");if(!screen){console.error("no #screen");return}const fn=views[state.page]||moviesPage;let html="";try{html=fn()}catch(err){html="<div class=\"panel\" style=\"padding:16px;color:#f88\"><b>Page error</b><pre style=\"font-size:11px;white-space:pre-wrap\">"+String(err.message||err)+"</pre></div>";console.error(err)}screen.innerHTML=html;if(animate && !state.firstPaint && !window.__cinehub_noAnim){screen.classList.remove("page-enter");void screen.offsetWidth;screen.classList.add("page-enter")}$$(".nav-item").forEach(b=>{
  b.classList.toggle("active",b.dataset.page===state.page||(state.page==="detail"&&b.dataset.page==="movies"));
  if(b.dataset.page==="adult"){
    const off = (cfg.adultEnabled===false || cfg.adultLibraryEnabled===false);
    b.style.display = off ? "none" : "";
    b.classList.toggle("nav-hidden", !!off);
    const bn = document.getElementById("bottomNav");
    if(bn) bn.classList.toggle("adult-off", !!off);
    if(off && state.page==="adult"){ state.page="movies"; }
  }
});bindPageBack();bindDrawer();markDrawerActive();setupAdminButton();window.CINEHUB4_LANG?.translateDOM();
try{bindHomeStickyScroll()}catch(e){}
const mic=$("#micBtn");if(mic)mic.onclick=startVoiceSearch;
const qel=$("#q");if(qel){qel.addEventListener("input",()=>{/* live optional */});}
}catch(err){console.error("render",err);const screen=$("#screen");if(screen)screen.innerHTML="<div style=\"padding:20px;color:#f88\">Render failed: "+String(err.message||err)+"</div>"}
}
try{
  const tg=window.Telegram&&window.Telegram.WebApp;
  if(tg){
    tg.ready();
    tg.expand();
    try{tg.setHeaderColor&&tg.setHeaderColor("#07090f")}catch(e){}
    try{tg.setBackgroundColor&&tg.setBackgroundColor("#07090f")}catch(e){}
    try{tg.setBottomBarColor&&tg.setBottomBarColor("#0c101c")}catch(e){}
    try{if(tg.disableVerticalSwipes)tg.disableVerticalSwipes()}catch(e){}
  }
}catch(e){}
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
        // movie_<id> → open that movie (id can be number or string like m_123)
    if(/^movie_/i.test(sp)){
      const id=String(sp.replace(/^movie_/i,"")).trim();
      if(id){
        state.detailId=id;
        state.page="detail";
        state.history=[];
        try{
          localStorage.setItem("cinehub4_page","detail");
          sessionStorage.setItem("cinehub4_detail",id);
        }catch(e){}
        return true;
      }
    }
    // plain id (digits or m_xxx / manual_xxx)
    if(/^[\w\-]+$/.test(sp) && !/^ref_/i.test(sp)){
      const id=String(sp).trim();
      if(id && (movies.some(function(m){return String(m.id)===id;}) || /^\d+$/.test(id) || /^m_/.test(id) || /^manual_/.test(id))){
        state.detailId=id;
        state.page="detail";
        state.history=[];
        try{
          localStorage.setItem("cinehub4_page","detail");
          sessionStorage.setItem("cinehub4_detail",id);
        }catch(e){}
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

function killSplash(){
  const s=document.getElementById("appSplash");
  if(!s||s.classList.contains("gone"))return;
  s.classList.add("gone");
  setTimeout(function(){try{s.style.display="none";s.remove()}catch(e){}},450);
}

/* SIMPLE RELIABLE BOOT
   1) Wait min 1.5s (show logo)
   2) Paint UI under splash (force)
   3) Fade splash
   4) Paint again after splash gone (safety)
*/
(function(){
  window.__cinehub_noAnim = true;
  window.__cinehub_forcePaint = false;
  window.__cinehub_splashUp = true;
  const START = Date.now();
  const MIN = 1500;
  const MAX = 5000;

  function paintNow(){
    window.__cinehub_forcePaint = true;
    try{
      // Always land on movies on cold open
      if(!sessionStorage.getItem("cinehub4_booted")){
        state.page = "movies";
        sessionStorage.setItem("cinehub4_booted","1");
      }
      render(false);
    }catch(e){
      console.error("boot paint", e);
      var sc = document.getElementById("screen");
      if(sc) sc.innerHTML = '<div style="padding:24px;color:#f88;text-align:center"><b>Boot error</b><br><small>'+String(e.message||e)+'</small></div>';
    }
    window.__cinehub_forcePaint = false;
    try{
      var sc = document.getElementById("screen");
      if(sc){
        sc.style.opacity = "1";
        sc.style.visibility = "visible";
      }
    }catch(e){}
  }

  function finish(){
    paintNow();
    // 2 frames then lift splash
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        window.__cinehub_splashUp = false;
        state.firstPaint = false;
        killSplash();
        // Safety re-paint after splash fully gone
        setTimeout(function(){
          window.__cinehub_noAnim = false;
          window.__cinehub_needPaint = false;
          try{ render(false); }catch(e){}
          // If still empty, show diagnostic
          setTimeout(function(){
            var sc = document.getElementById("screen");
            if(sc && (!sc.innerHTML || sc.innerHTML.trim().length < 20)){
              sc.innerHTML = '<div style="padding:24px;color:#9ab;text-align:center"><b>Cine Hub4</b><br><small>Loading content…</small><br><button type="button" onclick="location.reload()" style="margin-top:12px;padding:10px 16px;border-radius:10px;border:0;background:#3b82f6;color:#fff">Reload</button></div>';
              try{ render(false); }catch(e){}
            }
          }, 800);
        }, 500);
      });
    });
  }

  (function tick(){
    var elapsed = Date.now() - START;
    var ready = state.moviesLoaded || elapsed >= MAX;
    if(ready && elapsed >= MIN){
      finish();
      return;
    }
    setTimeout(tick, 60);
  })();
})();

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
