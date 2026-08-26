/* bilingual helper — never pass movie titles to t() */


function paintStaticIcons(){
  try{
    document.querySelectorAll("[data-ico]").forEach(function(el){
      if(el.getAttribute("data-painted")==="1") return;
      var n = el.getAttribute("data-ico");
      if(!n || typeof ico!=="function") return;
      el.innerHTML = ico(n, el.classList.contains("nav-ico")?22:18);
      el.setAttribute("data-painted","1");
    });
  }catch(e){}
}

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

/** Professional SVG icons (stroke) */
function ico(name, size){
  size = size || 20;
  var s = String(size);
  var common = 'width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  var paths = {
    film: '<rect x="2" y="2" width="20" height="20" rx="2.5"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/>',
    tv: '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V4M16 7V4M12 4v3M8 21h8"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    adult: '<circle cx="12" cy="12" r="10"/><path d="M8 15c1.2-1.5 2.5-2.2 4-2.2s2.8.7 4 2.2"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.2-5 8-5s6.5 1.5 8 5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.8"/><path d="M2.5 19.5c1.2-3 3.5-4.5 6.5-4.5s5.3 1.5 6.5 4.5"/><path d="M14.5 15.2c1.6-.4 3.2.1 4.5 1.8"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c.6-.8 1.5-1.2 2.5-1.2 1.7 0 3 1 3 2.5s-1.3 2.5-3 2.5h-1c-1.7 0-3 1-3 2.5s1.3 2.5 3 2.5c1 0 1.9-.4 2.5-1.2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 5"/><path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    share: '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.5 13.4l6.9 3.95M15.5 6.65l-6.9 3.95"/>',
    cart: '<circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none"/><path d="M3 4h2l2.2 11h11.3l2-7H7.2"/>',
    chart: '<path d="M4 19V5M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/>',
    zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    star: '<path d="M12 3l2.4 5.4L20 9.3l-4 4.2.9 5.8L12 16.8 7.1 19.3l.9-5.8-4-4.2 5.6-.9L12 3z"/>',
    medal: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L6 21l6-3 6 3-2.5-7.5"/>',
    crown: '<path d="M3 17h18l-1.5-9-4.5 4L12 5l-3 7-4.5-4L3 17z"/><path d="M5 17h14v2H5z"/>',
    gem: '<path d="M6 3h12l4 7-10 11L2 10l4-7z"/><path d="M2 10h20M12 3v18M8.5 3l-4 7M15.5 3l4 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    send: '<path d="M21 5L3 12.5l5 1.8L18 8l-8 7.2v3.3l2.8-2.5 4.2 3.1L21 5z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>',
    unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0"/>',
    points: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 10h6M9 14h6"/>',
    more: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    fire: '<path d="M12 22c4 0 7-2.8 7-7 0-3.2-1.8-5.2-3.2-6.6-.4 2.2-1.8 3.2-1.8 3.2S13.5 7 13 4c0 0-5 2.5-5 8.5 0 .8.2 1.5.5 2.1C7.2 13.8 6 12 6 10c0 0-1 1.8-1 5 0 4.2 3 7 7 7z"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.5 2.5L16 9"/>',
    telegram: '<path d="M21 5L3 12.5l5 1.8L18 8l-8 7.2v3.3l2.8-2.5 4.2 3.1L21 5z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"/>',
    download: '<path d="M12 4v12M7 12l5 5 5-5M5 20h14"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/>',
    task: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
    overview: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'
  };
  var body = paths[name] || paths.star;
  return '<svg class="ui-ico" '+common+'>'+body+'</svg>';
}
function icoWrap(name, cls){
  return '<span class="ico-svg '+(cls||'')+'" aria-hidden="true">'+ico(name, 18)+'</span>';
}


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
  var mid = String(id||"").trim().replace(/[^A-Za-z0-9_\-]/g,"");
  // Include referrer so new users who open this share get join+ref bonus once (server-side).
  var uid = "";
  try{
    var tg = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user;
    if(tg && tg.id) uid = String(tg.id);
  }catch(e){}
  if(!uid){
    try{ uid = String(localStorage.getItem("cinehub4_uid")||"").replace(/[^0-9]/g,""); }catch(e2){}
  }
  var param = "movie_"+mid;
  if(uid) param += "__r_"+uid;
  // Telegram startapp max ~64 chars
  param = param.replace(/[^A-Za-z0-9_\-]/g,"").slice(0,64);
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

function resolveMovieByParam(rawId){
  var id=String(rawId||"").trim();
  if(!id) return null;
  var list=movies||[];
  var m=list.find(function(x){ return String(x.id)===id; });
  if(m) return m;
  // tmdb_572802 / t_572802 / plain tmdb number
  var tid=id.replace(/^tmdb_/i,"").replace(/^t_/i,"");
  if(tid){
    m=list.find(function(x){
      return String(x.tmdb_id)===String(tid)
        || String(x.id)===String(tid)
        || String(x.id)==="tmdb_"+tid
        || String(x.id)==="t_"+tid;
    });
    if(m) return m;
  }
  m=list.find(function(x){ return String(x.tmdb_id)===id; });
  return m||null;
}
function clearShareSticky(hard){
  try{
    sessionStorage.removeItem("cinehub4_detail");
    if(hard){
      dismissShareCompletely();
    }
  }catch(e){}
}

function dismissShareCompletely(){
  // User closed share / went to list — do not auto-open that movie on reload
  try{
    window.__deeplinkUserNav = true;
    var last=sessionStorage.getItem("cinehub4_last_start")||sessionStorage.getItem("cinehub4_share_pending")||"";
    if(last) sessionStorage.setItem("cinehub4_dismissed_sp", last);
    sessionStorage.removeItem("cinehub4_share_pending");
    sessionStorage.removeItem("cinehub4_last_start");
    sessionStorage.removeItem("cinehub4_detail");
    sessionStorage.removeItem("cinehub4_start_consumed");
    sessionStorage.setItem("cinehub4_share_dismissed","1");
  }catch(e){}
  state.detailId=null;
  state.pendingAdultDetail=null;
}

function openSharedMovie(id){
  id=String(id||"").trim();
  if(!id) return false;
  // User dismissed share or navigated away — do not force movie again
  try{
    if(window.__deeplinkUserNav || sessionStorage.getItem("cinehub4_share_dismissed")==="1") return false;
  }catch(e){ if(window.__deeplinkUserNav) return false; }
  var found=resolveMovieByParam(id);
  var realId=found?String(found.id):id;
  var isAdult=found?!!found.adult:false;
  try{
    sessionStorage.setItem("cinehub4_detail", realId);
    sessionStorage.setItem("cinehub4_share_pending", id);
    sessionStorage.setItem("cinehub4_last_start", "movie_"+id);
  }catch(e){}
  // Movies not loaded yet — remember and wait
  if(!found && (!movies || !movies.length || !state.moviesLoaded)){
    state.detailId=realId;
    state.pendingAdultDetail=isAdult?realId:null;
    state.page=isAdult?"adult":"movies";
    try{
      localStorage.setItem("cinehub4_page", state.page);
      sessionStorage.setItem("cinehub4_page", state.page);
    }catch(e){}
    return true;
  }
  if(!found){
    // List loaded but movie missing — still keep pending; show home of that section
    state.detailId=realId;
    state.page="movies";
    try{
      localStorage.setItem("cinehub4_page","movies");
      sessionStorage.setItem("cinehub4_page","movies");
    }catch(e){}
    return true;
  }
  state.detailId=realId;
  if(isAdult && !state.adultOK){
    state.pendingAdultDetail=realId;
    state.page="adult";
    state.history=[];
    try{
      sessionStorage.setItem("cinehub4_history","[]");
      localStorage.setItem("cinehub4_page","adult");
      sessionStorage.setItem("cinehub4_page","adult");
    }catch(e){}
    return true;
  }
  // Ready: go detail page + show shared landing card
  state.pendingAdultDetail=null;
  state.page="detail";
  state.history=[];
  try{
    sessionStorage.setItem("cinehub4_history","[]");
    localStorage.setItem("cinehub4_page","detail");
    sessionStorage.setItem("cinehub4_page","detail");
  }catch(e){}
  try{ showSharedLanding(found); }catch(e){}
  return true;
}

function closeSharedLanding(){
  var el=document.getElementById("sharedLanding");
  if(el) el.remove();
}
function goSharedWatch(id){
  closeSharedLanding();
  id=String(id||"").trim();
  var found=resolveMovieByParam(id);
  var realId=found?String(found.id):id;
  var isAdult=found?!!found.adult:false;
  try{ sessionStorage.removeItem("cinehub4_share_pending"); }catch(e){}
  // Keep last_start so reload can recover until user leaves
  if(isAdult && !state.adultOK){
    state.pendingAdultDetail=realId;
    state.detailId=realId;
    state.page="adult";
    state.history=[];
    try{ render(false); }catch(e){}
    return;
  }
  // Open unlock/detail page for this movie
  state.pendingAdultDetail=null;
  state.detailId=realId;
  state.page="detail";
  try{
    localStorage.setItem("cinehub4_page","detail");
    sessionStorage.setItem("cinehub4_page","detail");
    sessionStorage.setItem("cinehub4_detail", realId);
  }catch(e){}
  try{ render(false); }catch(e){}
}
function goSharedAllMovies(id){
  closeSharedLanding();
  var found=resolveMovieByParam(id);
  var isAdult=found?!!found.adult:false;
  dismissShareCompletely();
  if(isAdult){
    state.page = "adult";
    // already confirmed this session — show list, not a stuck detail
  }else{
    state.page = "movies";
  }
  try{
    localStorage.setItem("cinehub4_page", state.page);
    sessionStorage.setItem("cinehub4_page", state.page);
  }catch(e){}
  try{ render(true); }catch(e){}
}
function showSharedLanding(m){
  if(!m) return;
  closeSharedLanding();
  var title=(m.title||"").split("|")[0].trim() || "Movie";
  var poster=String(m.poster||m.poster_path||"");
  var dur="";
  try{ dur=movieDurationLabel(m)||""; }catch(e){}
  var isAdult=!!m.adult;
  var mid=String(m.id);
  var bn=false;
  try{ bn=typeof langIsBn==="function"?langIsBn():false; }catch(e){}
  try{ if(!bn && window.CINEHUB4_LANG && CINEHUB4_LANG.get()==="bn") bn=true; }catch(e){}
  var sharedLbl = bn ? "আপনার সাথে শেয়ার করা হয়েছে" : "Shared with you";
  var tip = isAdult
    ? (bn ? "এই এডাল্ট কনটেন্ট দেখতে নিচে Watch / Download বাটনে ক্লিক করুন" : "To watch this adult content, tap Watch / Download below")
    : (bn ? "মুভিটি দেখতে নিচে Watch / Download বাটনে ক্লিক করুন" : "To watch this movie, tap Watch / Download below");
  var watchLbl = bn ? "এখনই দেখুন / ডাউনলোড করুন" : "Watch / Download now";
  var allLbl = isAdult
    ? (bn ? "আরো এডাল্ট মুভি দেখুন" : "More adult movies")
    : (bn ? "সব মুভি দেখুন" : "All movies");
  var shareLbl = bn ? "শেয়ার" : "Share";
  var overlay=document.createElement("div");
  overlay.id="sharedLanding";
  overlay.className="shared-landing";
  var posterHtml = poster
    ? '<img class="sl-poster-img" src="'+poster.replace(/"/g,"&quot;")+'" alt="" onerror="this.parentNode.classList.add(\'no-img\')">'
    : "";
  overlay.innerHTML =
    '<div class="sl-backdrop"></div>'+
    '<div class="sl-wrap">'+
      '<div class="sl-tip"><span class="sl-bell">🔔</span><span>'+tip+'</span></div>'+
      '<div class="sl-card">'+
        '<div class="sl-banner">'+
          '<span class="sl-banner-ico">↗</span> '+sharedLbl+
          '<button type="button" class="sl-x" id="slClose" aria-label="Close">×</button>'+
        '</div>'+
        '<div class="sl-poster'+(poster?"":" no-img")+'">'+posterHtml+
          (dur?'<span class="sl-dur">'+dur+'</span>':'')+
        '</div>'+
        '<div class="sl-body">'+
          '<div class="sl-title">'+String(title).replace(/</g,"&lt;")+'</div>'+
          '<button type="button" class="sl-watch" id="slWatch">▶ '+watchLbl+'</button>'+
          '<div class="sl-row2">'+
            '<button type="button" class="sl-all" id="slAll">🎬 '+allLbl+'</button>'+
            '<button type="button" class="sl-share-btn" id="slShare">🔗 '+shareLbl+'</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(overlay);
  document.getElementById("slClose").onclick=function(){ goSharedAllMovies(mid); };
  document.getElementById("slWatch").onclick=function(){ goSharedWatch(mid); };
  document.getElementById("slAll").onclick=function(){ goSharedAllMovies(mid); };
  document.getElementById("slShare").onclick=function(e){
    e.stopPropagation();
    try{ shareMovie(mid); }catch(err){}
  };
  overlay.querySelector(".sl-backdrop").onclick=function(){ goSharedAllMovies(mid); };
}
window.goSharedWatch=goSharedWatch;
window.goSharedAllMovies=goSharedAllMovies;
window.closeSharedLanding=closeSharedLanding;
/** After movies list loads: if shared id is adult and not verified → 18+ gate */
function applyAdultGateIfNeeded(){
  try{
    if(window.__deeplinkUserNav) return false;
    if(state.adultOK) return false;
    var id = state.pendingAdultDetail || state.detailId || sessionStorage.getItem("cinehub4_detail") || "";
    if(!id) return false;
    var found = resolveMovieByParam(id);
    if(!found || !found.adult) return false;
    state.pendingAdultDetail = String(found.id);
    state.detailId = String(found.id);
    state.page = "adult";
    state.history = [];
    try{
      sessionStorage.setItem("cinehub4_page","adult");
      localStorage.setItem("cinehub4_page","adult");
    }catch(e){}
    return true;
  }catch(e){ return false; }
}

function shareMovie(id){
  try{
    var mid = String(id||"").trim();
    if(!mid){ toast("ID missing"); return; }
    var m = (typeof movies!=="undefined" && movies) ? movies.find(function(x){ return String(x.id)===mid; }) : null;
    var title = m ? String(m.title||"").split("|")[0].trim() : "Movie";
    var poster = m ? String(m.poster||m.poster_path||"") : "";
    var link = movieShareLink(mid);
    if(!link){ toast("Link empty — set Mini App link in Admin → Settings"); return; }
    // Chat message style like Prime Scene: URL then full title
    var text = link + "\n" + (m ? String(m.title||title) : title);
    showSocialShareSheet({ title: title, link: link, text: text, poster: poster, adult: !!(m&&m.adult) });
  }catch(e){
    console.error(e);
    toast("Share error: "+(e&&e.message?e.message:e));
  }
}
function showSocialShareSheet(opts){
  opts = opts || {};
  var title = opts.title || "Cine Hub4";
  var link = opts.link || "";
  var text = opts.text || (title + "\n" + link);
  var poster = opts.poster || "";
  var old = document.getElementById("shareSheet");
  if(old) old.remove();
  var sheet = document.createElement("div");
  sheet.id = "shareSheet";
  sheet.className = "share-sheet social-share-sheet";
  var posterHtml = poster
    ? '<div class="ss-poster"><img src="'+String(poster).replace(/"/g,"&quot;")+'" alt="" onerror="this.parentNode.style.display=\'none\'"></div>'
    : "";
  var apps = [
    {id:"tg", name:"Telegram", color:"#2AABEE", svg:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#fff" d="M9.6 15.4l-.4 4.2c.5 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .5 1.7.2 2-.9L22.8 5c.4-1.5-.5-2.1-1.5-1.7L2.4 10.1C1 10.6 1 11.4 2.1 11.7l5.1 1.6L18.2 7c.6-.4 1.1-.2.7.2L9.6 15.4z"/></svg>'},
    {id:"wa", name:"WhatsApp", color:"#25D366", svg:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#fff" d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.2-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm5.7 14.1c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1.1 1 2 1.3 2.3 1.5.3.1.5.1.7-.1l1-.1.1c.3 1.1.3 1.4 0 1.8z"/></svg>'},
    {id:"fb", name:"Facebook", color:"#1877F2", svg:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#fff" d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>'},
    {id:"msg", name:"Messenger", color:"#00B2FF", svg:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#fff" d="M12 2C6.5 2 2 6.2 2 11.4c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.2 1.9.4 2.9.4 5.5 0 10-4.2 10-9.4S17.5 2 12 2zm1 12.1l-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7z"/></svg>'},
    {id:"x", name:"X / Twitter", color:"#0f1419", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#fff" d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.3-5.6L6 22H3.2l7-8L2 2h6.4l3.9 5.2L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z"/></svg>'},
    {id:"tt", name:"TikTok", color:"#010101", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#25F4EE" d="M16 3c.4 2.3 1.8 3.8 4 4.2v2.3c-1.5 0-2.9-.4-4-1.2v6.2A5.5 5.5 0 1110.2 9v2.3a3.2 3.2 0 103.2 3.2V3h2.6z"/><path fill="#FE2C55" d="M14.6 3c.4 2.3 1.8 3.8 4 4.2v1.5c-1.5 0-2.9-.4-4-1.2"/><path fill="#fff" d="M14.6 8.7v6.2A5.5 5.5 0 119.1 9.3v2.3a3.2 3.2 0 103.2 3.2V8.7h2.3z"/></svg>'},
    {id:"rd", name:"Reddit", color:"#FF4500", svg:'<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#fff" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm6 10.3c0 .1 0 .2-.1.3-1 1.1-2.6 1.8-4.5 2v1.3c1.1-.1 2.2-.4 3.1-.9.2-.1.5 0 .6.2.1.2 0 .5-.2.6-1.1.6-2.4 1-3.8 1.1v.9c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-.9c-1.4-.1-2.7-.5-3.8-1.1-.2-.1-.3-.4-.2-.6.1-.2.4-.3.6-.2.9.5 2 .8 3.1.9v-1.3c-1.9-.2-3.5-.9-4.5-2-.1-.1-.1-.2-.1-.3 0-.6.5-1.1 1.1-1.1.3 0 .6.1.8.3.8-.5 1.8-.9 2.9-1l.5-2.3c0-.2.2-.4.5-.4h.1c.2 0 .4.2.4.4l.5 2.3c1.1.1 2.1.5 2.9 1 .2-.2.5-.3.8-.3.6 0 1.1.5 1.1 1.1z"/></svg>'},
    {id:"more", name:"More", color:"#6366f1", svg:'<svg viewBox="0 0 24 24" width="22" height="22"><circle fill="#fff" cx="6" cy="12" r="2"/><circle fill="#fff" cx="12" cy="12" r="2"/><circle fill="#fff" cx="18" cy="12" r="2"/></svg>'}
  ];
  var moreApps = [
    {id:"imo", name:"imo", color:"#1A9F29", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><circle fill="#fff" cx="12" cy="12" r="8"/><text x="12" y="16" text-anchor="middle" font-size="9" font-weight="800" fill="#1A9F29">imo</text></svg>'},
    {id:"line", name:"LINE", color:"#06C755", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#fff" d="M12 3C7 3 3 6.4 3 10.6c0 3.7 3.3 6.8 7.7 7.4.3 0 .7.2.8.5l.5 1.7c.1.4.5.5.8.3 3.7-1.6 6.2-4.8 6.2-8.3C19 6.4 16.5 3 12 3z"/></svg>'},
    {id:"viber", name:"Viber", color:"#7360F2", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#fff" d="M11.4 2C6.2 2.3 2.2 6.5 2 11.7c-.1 2.6.7 5 2.3 6.9V22l3.5-1.9c1.3.5 2.7.8 4.2.8h.3C17.8 20.7 22 16.4 22 11.4 22 6.1 17.5 1.7 11.4 2zm5.3 13.3c-.2.6-1.1 1.1-1.8 1.2-.5.1-1.1.2-3.2-.7-2.5-1-4.1-3.6-4.2-3.8-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.9.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4l.7 1.8c.1.2 0 .4-.2.5l-.3.4c-.1.1-.2.3-.1.5.3.5 1.1 1.7 2.2 2.6 1.4 1.1 2.5 1.4 2.9 1.6.3.1.5.1.7-.1l.9-1.1c.1-.2.4-.2.6-.1l1.7.8c.2.1.3.2.4.4 0 .2 0 .7-.2 1.2z"/></svg>'},
    {id:"discord", name:"Discord", color:"#5865F2", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#fff" d="M19.3 5.2A16 16 0 0015.5 4l-.3.6c1.5.4 2.8 1 4 1.9A13.5 13.5 0 005 6.5c1.2-.9 2.5-1.5 4-1.9L8.6 4A16 16 0 004.7 5.2C2.3 9 1.7 12.6 2 16.2A16.4 16.4 0 007 19l1-1.3a10.5 10.5 0 01-1.6-.8l.4-.3c3.1 1.4 6.5 1.4 9.5 0l.4.3c-.5.3-1 .6-1.6.8L15 19a16.4 16.4 0 005-2.8c.4-4.1-.6-7.6-2.7-11zm-9.6 8.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm4.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>'},
    {id:"snap", name:"Snapchat", color:"#FFFC00", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#111" d="M12 2c2.5 0 4.2 1.8 4.2 4.5v1.3c.6.2 1.3.2 1.8.7.4.4.3 1-.2 1.3-.6.3-1.2.7-1.2 1.2 0 1.3 1.5 2 2.7 2.5.5.2.7.7.4 1.1-.4.6-1.3 1-2 1.2-.2 1.2-.9 2.2-1.9 2.9-1.1.7-1.6 1.4-1.6 2.1 0 .3-.3.5-.6.5h-2.3c-.3 0-.6-.2-.6-.5 0-.7-.5-1.4-1.6-2.1-1-.7-1.7-1.7-1.9-2.9-.7-.2-1.6-.6-2-1.2-.3-.4-.1-.9.4-1.1 1.2-.5 2.7-1.2 2.7-2.5 0-.5-.6-.9-1.2-1.2-.5-.3-.6-.9-.2-1.3.5-.5 1.2-.5 1.8-.7V6.5C7.8 3.8 9.5 2 12 2z"/></svg>'},
    {id:"mail", name:"Email", color:"#EA4335", svg:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#fff" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/></svg>'}
  ];
  function appBtn(a){
    return '<button type="button" class="ss-app" data-app="'+a.id+'" style="--ss-c:'+a.color+'">'+
      '<span class="ss-ico">'+a.svg+'</span><span class="ss-name">'+a.name+'</span></button>';
  }
  var grid = apps.map(appBtn).join("") + '<div id="ssMoreRow" class="ss-more-row" hidden></div>';
  sheet.innerHTML =
    '<div class="share-sheet-card ss-card">'+
      '<div class="ss-head">'+
        posterHtml+
        '<div class="ss-meta"><div class="ss-title">'+String(title).replace(/</g,"&lt;")+'</div>'+
        '<div class="ss-sub">'+(opts.adult?"18+ · ":"")+'Cine Hub4</div></div>'+
        '<button type="button" class="ss-x" id="shareSheetClose" aria-label="Close">✕</button>'+
      '</div>'+
      '<div class="ss-grid">'+grid+'</div>'+
      '<div class="ss-link-row">'+
        '<input class="share-sheet-input" id="shareSheetInput" type="text" readonly value="">'+
        '<button type="button" class="share-sheet-btn primary" id="shareSheetCopy">Copy</button>'+
      '</div>'+
    '</div>';
  document.body.appendChild(sheet);
  var inp = document.getElementById("shareSheetInput");
  if(inp) inp.value = link;
  document.getElementById("shareSheetClose").onclick = function(){ sheet.remove(); };
  sheet.onclick = function(e){ if(e.target===sheet) sheet.remove(); };
  document.getElementById("shareSheetCopy").onclick = function(){
    hardCopy(link, function(){ toast(t("Link copied")); });
  };
  function openExt(url){
    try{
      var tg = window.Telegram && window.Telegram.WebApp;
      if(tg && typeof tg.openLink === "function"){ tg.openLink(url); return; }
    }catch(e){}
    try{ window.open(url, "_blank"); }catch(e){ location.href = url; }
  }
  function bindAppClicks(root){
    (root||sheet).querySelectorAll(".ss-app").forEach(function(btn){
      if(btn._bound) return;
      btn._bound = true;
      btn.onclick = function(){
        var app = btn.getAttribute("data-app");
        var encU = encodeURIComponent(link);
        var encT = encodeURIComponent(text);
        if(app==="more"){
          var row = document.getElementById("ssMoreRow");
          if(row){
            if(row.hasAttribute("hidden")){
              row.removeAttribute("hidden");
              row.innerHTML = moreApps.map(appBtn).join("");
              bindAppClicks(row);
            } else {
              row.setAttribute("hidden","hidden");
              row.innerHTML = "";
            }
          }
          return;
        }
        if(app==="tg"){ openTgShare(link, title + " — Cine Hub4"); sheet.remove(); return; }
        if(app==="wa"){ openExt("https://wa.me/?text="+encT); sheet.remove(); return; }
        if(app==="fb"){ openExt("https://www.facebook.com/sharer/sharer.php?u="+encU); sheet.remove(); return; }
        if(app==="msg"){ openExt("https://www.facebook.com/dialog/send?link="+encU+"&app_id=966242223397117&redirect_uri="+encU); sheet.remove(); return; }
        if(app==="x"){ openExt("https://twitter.com/intent/tweet?text="+encT+"&url="+encU); sheet.remove(); return; }
        if(app==="tt"){ hardCopy(link, function(){ toast("TikTok · "+t("Link copied")); }); return; }
        if(app==="rd"){ openExt("https://www.reddit.com/submit?url="+encU+"&title="+encodeURIComponent(title)); sheet.remove(); return; }
        if(app==="imo"){ openExt("https://imo.im/"); hardCopy(link, function(){ toast("imo · "+t("Link copied")); }); return; }
        if(app==="line"){ openExt("https://social-plugins.line.me/lineit/share?url="+encU); sheet.remove(); return; }
        if(app==="viber"){ openExt("viber://forward?text="+encT); sheet.remove(); return; }
        if(app==="discord"){ hardCopy(link, function(){ toast("Discord · "+t("Link copied")); }); return; }
        if(app==="snap"){ hardCopy(link, function(){ toast("Snapchat · "+t("Link copied")); }); return; }
        if(app==="mail"){ openExt("mailto:?subject="+encodeURIComponent(title)+"&body="+encT); sheet.remove(); return; }
        try{
          if(navigator.share){ navigator.share({ title: title, text: text, url: link }).catch(function(){}); sheet.remove(); return; }
        }catch(e){}
        openTgShare(link, title + " — Cine Hub4");
        sheet.remove();
      };
    });
  }
  bindAppClicks(sheet);
}
window.showSocialShareSheet = showSocialShareSheet;
function movieDurationLabel(m){
  if(!m) return "";
  var rt = Number(m.runtime || 0);
  if(rt > 0){
    var h = Math.floor(rt / 60), min = rt % 60;
    if(h > 0) return h + "h" + (min ? (" " + min + "m") : "");
    return min + "m";
  }
  var d = String(m.duration || "").replace(/^4K\s*/i,"").trim();
  return d;
}
function movieRatingLabel(m){
  var r = Number(m && (m.rating != null ? m.rating : m.vote_average));
  if(!r || isNaN(r)) return "";
  return (Math.round(r * 10) / 10).toFixed(1);
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
  // text only + single url (no link inside text — Telegram would show it twice)
  var refMsg = langIsBn()
    ? "🎬 Cine Hub4-এ জয়েন করুন!\n✨ সকল প্রকার মুভি ও সিরিজ একদম ফ্রিতে দেখুন\n📥 সহজে ডাউনলোড করুন — সীমাহীন বিনোদন অপেক্ষা করছে 🍿🔥"
    : "🎬 Join Cine Hub4!\n✨ Watch all kinds of movies & series — completely free\n📥 Download easily and enjoy unlimited entertainment 🍿🔥";
  nativeShare({
    title: langIsBn() ? "🎬 Cine Hub4 আমন্ত্রণ" : "🎬 Cine Hub4 Invite",
    text: refMsg,
    url: link
  });
}
function openLink(u){if(!u)return;try{window.Telegram?.WebApp?.openTelegramLink?.(u)||window.Telegram?.WebApp?.openLink?.(u)||window.open(u,"_blank")}catch(e){window.open(u,"_blank")}}
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const CINEHUB_LOGO_DATA="data:image/jpeg;base64,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";
const defaults={appName:"Cine Hub4",menuTitle:"Cine Hub4 Menu",menuTitleBn:"Cine Hub4 মেনু",menuLogoUrl:"assets/logo.jpg",botUsername:"@Cinehub4bot",telegramBotLink:"https://t.me/Cinehub4bot",miniAppName:"Hub4",miniAppLink:"https://t.me/Cinehub4bot/Hub4",telegramChannelLink:"",howToWatchVideo:"",watchTutorialVideo:"",howToWatchText:"Unlock this content using ads or points.",unlockCost:5,unlockHours:15,adsForUnlock:5,adultUnlockCost:3,adultAdsForUnlock:5,adultUnlockHours:15,downloadServers:3,adReward:2,dailyAdLimit:20,joinBonus:10,referralReward:20,welcomeEnabled:true,welcomeTitle:"Welcome to Cine Hub4",welcomeTitleBn:"Cine Hub4-এ স্বাগতম",welcomeBody:"Watch all kinds of movies & series and download for free. Enjoy unlimited entertainment!",welcomeBodyBn:"সকল প্রকার মুভি ও সিরিজ দেখুন এবং ফ্রিতে ডাউনলোড করুন। সীমাহীন বিনোদন উপভোগ করুন!",categories:["All Movies","Bangla Moves","Hollywood Movie Hindi"],adultCategories:["All","Adult Movie","Anime"],tickerText:"Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ",adultTickerText:"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ",tickerTextBn:"প্রিয় কনটেন্ট শেয়ার করুন ও পয়েন্ট দিয়ে আনলক করুন 🚀 • নিয়মিত নতুন মুভি ও সিরিজ • অ্যাড দেখে বা পয়েন্ট দিয়ে আনলক করুন • ",adultTickerTextBn:"১৮+ অ্যাডাল্ট জোন • নিয়মিত নতুন অ্যাডাল্ট কনটেন্ট • অ্যাড দেখে বা পয়েন্ট দিয়ে আনলক করুন • ",libraryBadge:"MOVIE ZONE",libraryTitle:"Cinema Library",libraryDesc:"Curated movies, web series and premium entertainment updates.",adultLibraryBadge:"ADULT ZONE",adultHeaderTitle:"Adult",adultHeaderTitleBn:"অ্যাডাল্ট",adultDetailTitle:"",adultDetailTitleBn:"",movieDetailTitle:"",movieDetailTitleBn:"",moviesHeaderTitle:"",moviesHeaderTitleBn:"",appNameBn:"Cine Hub4",adultLibraryTitle:"Adult Library",adultLibraryDesc:"Curated 18+ content and premium entertainment updates.",howToWatchLabel:"▶ How to Watch",adultHowToWatchLabel:"▶ How to Watch",newMoviesLabel:"New Movies",newMoviesSub:"LATEST UPLOADS",trendingLabel:"Trending",trendingSub:"MOST WATCHED",adultNewLabel:"New Movies",adultNewSub:"LATEST UPLOADS",adultTrendingLabel:"Trending",adultTrendingSub:"MOST WATCHED",packages:[
    {name:"Basic Package",price:0.99,points:110,tag:"SMART CHOICE"},
    {name:"Standard Package",price:4.99,points:550,tag:"STARTER"},
    {name:"Premium Package",price:9.99,points:1200,tag:"BEST VALUE"},
    {name:"Ultimate Package",price:14.99,points:2000,tag:"POPULAR"}
  ],
  wallets:[{name:"USDT TRC20",address:"",network:"TRC20"}],
  tasks:[],
  customPointRate:100,
  adBlocks:{rewarded:"",interstitial:"",banner:"",bannerAdult:"",task:"",adult:""},showMovieBanner:true,showAdultBanner:true,movieBannerImg:"",movieBannerLink:"",adultBannerImg:"",adultBannerLink:"",
  maintenanceMode:false,maintenanceTitle:"🛠 Under Maintenance",maintenanceMessage:"We're updating the app right now. Please check back soon.",maintenanceButtonText:"Join Telegram Channel",maintenanceButtonUrl:"",maintenanceLinkText:"Tap here for updates",maintenanceLinkUrl:"",maintenanceAllowedUsers:""};
let cfg={...defaults,...JSON.parse(localStorage.getItem("cinehub4_settings")||"{}")};
if(!cfg.categories||!cfg.categories.length)cfg.categories=defaults.categories.slice();
if(!cfg.adultCategories||!cfg.adultCategories.length)cfg.adultCategories=defaults.adultCategories.slice();
let movies=[];
let userData={points:0,unlocks:{},ads_today:0,ads_day:"",language:"en",refs:0};
const state={page:(function(){
  try{
    var p=sessionStorage.getItem("cinehub4_page")||localStorage.getItem("cinehub4_page")||"movies";
    if(p==="detail"){
      var did=sessionStorage.getItem("cinehub4_detail")||localStorage.getItem("cinehub4_detail")||"";
      if(!String(did).trim()){
        p=sessionStorage.getItem("cinehub4_page_fallback")||localStorage.getItem("cinehub4_page_fallback")||"movies";
      }
    }
    return p;
  }catch(e){ return "movies"; }
})(),adultOK:(function(){ try{ return sessionStorage.getItem("cinehub4_adult_ok")==="1"; }catch(e){ return false; } })(),detailId:(function(){
  try{ return sessionStorage.getItem("cinehub4_detail")||localStorage.getItem("cinehub4_detail")||null; }catch(e){ return null; }
})(),points:0,query:"",category:"All Movies",mode:"new",adultCategory:"All",adultMode:"new",moviePage:1,adultPage:1,history:JSON.parse(sessionStorage.getItem("cinehub4_history")||"[]"),unlockProgress:0,buyStep:null,buyOrder:null,moviesLoaded:false,userLoaded:false,firstPaint:true};
const MOVIE_PAGE_SIZE=20;
function goMoviePage(n){
  n=Math.max(1, Number(n)||1);
  if(state.page==="adult"){
    state.adultPage=n;
  }else{
    state.moviePage=n;
  }
  try{ render(false); }catch(e){}
  try{
    var el=document.getElementById("appContent")||document.getElementById("app")||document.body;
    if(el&&el.scrollTo) el.scrollTo({top:0,behavior:"smooth"});
    else window.scrollTo(0,0);
  }catch(e){}
}
function renderPager(page, totalPages){
  page=Math.max(1, Number(page)||1);
  totalPages=Math.max(1, Number(totalPages)||1);
  if(totalPages<=1) return "";
  // Window of page numbers around current (like screenshot: up to ~6 visible)
  var windowSize=6;
  var start=Math.max(1, page-Math.floor(windowSize/2));
  var end=Math.min(totalPages, start+windowSize-1);
  if(end-start+1<windowSize) start=Math.max(1, end-windowSize+1);
  var html='<div class="cine-pager" role="navigation" aria-label="Pages">';
  html+='<button type="button" class="cine-page-btn'+(page<=1?" disabled":"")+'" '+(page<=1?"disabled":'onclick="goMoviePage('+(page-1)+')"')+' aria-label="Previous">&lt;</button>';
  for(var i=start;i<=end;i++){
    html+='<button type="button" class="cine-page-btn'+(i===page?" active":"")+'" onclick="goMoviePage('+i+')">'+i+"</button>";
  }
  html+='<button type="button" class="cine-page-btn'+(page>=totalPages?" disabled":"")+'" '+(page>=totalPages?"disabled":'onclick="goMoviePage('+(page+1)+')"')+' aria-label="Next">&gt;</button>';
  html+="</div>";
  return html;
}
function paginateList(list, page){
  list=list||[];
  var total=list.length;
  var totalPages=Math.max(1, Math.ceil(total/MOVIE_PAGE_SIZE));
  page=Math.min(Math.max(1, Number(page)||1), totalPages);
  var start=(page-1)*MOVIE_PAGE_SIZE;
  return {
    page: page,
    totalPages: totalPages,
    total: total,
    items: list.slice(start, start+MOVIE_PAGE_SIZE)
  };
}
function buildUserProgressPatch_(){
  if(userData) userData.points = state.points;
  // Do NOT send refs / referred_users — server-authoritative via processReferral.
  // Client was overwriting them with 0 and admin showed empty referred lists.
  var patch = {
    points: Number(state.points) || 0,
    unlocks: (userData && userData.unlocks) || {},
    ads_today: Number((userData && userData.ads_today) || 0),
    ads_day: (userData && userData.ads_day) || "",
    ads_total: Number((userData && userData.ads_total) || 0),
    language: (userData && userData.language) || "en",
    task_progress: (userData && userData.task_progress) || {},
    unlock_prog: (userData && userData.unlock_prog) || {},
    unlock_ad_prog: (userData && userData.unlock_ad_prog) || {},
    updated_at: Date.now()
  };
  if(userData && userData.ref_task_count!=null) patch.ref_task_count = Number(userData.ref_task_count)||0;
  // Only send referred_by when known — never send null (would clear server)
  if(userData && userData.referred_by) patch.referred_by = String(userData.referred_by);
  return patch;
}
function cacheUserProgressLocal_(){
  try{
    var uid = "";
    try{ uid = String((window.CineHubFB && window.CineHubFB.getUid && window.CineHubFB.getUid()) || ""); }catch(e){}
    if(!uid) try{ uid = String(localStorage.getItem("cinehub4_uid")||""); }catch(e2){}
    var key = "cinehub4_userprog_"+(uid||"guest");
    localStorage.setItem(key, JSON.stringify(buildUserProgressPatch_()));
  }catch(e){}
}
function save(){
  // Always cache locally first so regular users keep progress even if API is slow/fails
  cacheUserProgressLocal_();
  if(!window.CineHubFB || !window.CineHubFB.updateUserField) return;
  var patch = buildUserProgressPatch_();
  function attempt(n){
    window.CineHubFB.updateUserField(null, patch).then(function(){
      try{ window.__cinehub_lastUserSave = Date.now(); }catch(e){}
    }).catch(function(e){
      console.warn("save user", n, e);
      if(n < 3) setTimeout(function(){ attempt(n+1); }, 600*n);
    });
  }
  attempt(1);
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
    try{
      var pend=sessionStorage.getItem("cinehub4_share_pending");
      if(pend && !window.__deeplinkUserNav && !document.getElementById("sharedLanding")){
        var fm=resolveMovieByParam(pend);
        if(fm){
          if(fm.adult && !state.adultOK){
            state.pendingAdultDetail=String(fm.id);
            state.detailId=String(fm.id);
            state.page="adult";
            try{ render(false); }catch(e){}
          }else{
            setTimeout(function(){ try{ showSharedLanding(fm); }catch(e){} }, 80);
          }
        }
      }
    }catch(e){}

    got=true;
    movies=list||[];
    state.moviesLoaded=true;
    // Share deep-link: re-apply when library arrives (ONLY on the first
    // realtime snapshot — later snapshots must never re-trigger this, or
    // any background movie-list update would force the user back Home)
    try{
      if(!window.__cinehub_startHandledOnce && !window.__deeplinkUserNav && typeof handleStartParam==="function"){
        window.__cinehub_startHandledOnce = true;
        handleStartParam();
      }
      // If share still pending and movie now exists → open it
      try{
        var dismissed=false;
        try{ dismissed=sessionStorage.getItem("cinehub4_share_dismissed")==="1"; }catch(e){}
        var sp2=sessionStorage.getItem("cinehub4_share_pending")||"";
        if(sp2 && !window.__deeplinkUserNav && !dismissed){
          var fm2=resolveMovieByParam(sp2);
          if(fm2){
            if(fm2.adult && !state.adultOK){
              state.pendingAdultDetail=String(fm2.id);
              state.detailId=String(fm2.id);
              state.page="adult";
            } else {
              state.detailId=String(fm2.id);
              state.page="detail";
              setTimeout(function(){ try{ showSharedLanding(fm2); }catch(e){} }, 80);
            }
          }
        }
      }catch(e3){}
      if(typeof applyAdultGateIfNeeded==="function") applyAdultGateIfNeeded();
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
          try{
            if(!window.__cinehub_startHandledOnce && !window.__deeplinkUserNav && typeof handleStartParam==="function"){
              window.__cinehub_startHandledOnce = true;
              handleStartParam();
            }
            if(typeof applyAdultGateIfNeeded==="function") applyAdultGateIfNeeded();
          }catch(e){}
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
      '<div class="blocked-ico" aria-hidden="true">'+(typeof ico==="function"?ico("shield",40):"🛡")+'</div>'+
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
          state.points = Number(userData && userData.points) || 0;
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
function escMaintText_(s){
  return String(s==null?"":s).replace(/[&<>"']/g,function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}
function isMaintenanceActive(){
  try{ return !!(cfg && cfg.maintenanceMode === true); }catch(e){ return false; }
}
function isMaintenanceAllowedUser(){
  try{
    if(typeof isAdminUser==="function" && isAdminUser()) return true;
    var uid = "";
    try{ uid = String((window.CineHubFB && window.CineHubFB.getUid && window.CineHubFB.getUid()) || ""); }catch(e){}
    if(!uid) return false;
    var allowed = String((cfg && cfg.maintenanceAllowedUsers) || "").split(",").map(function(x){return x.trim();}).filter(Boolean);
    return allowed.indexOf(uid) !== -1;
  }catch(e){ return false; }
}
function showMaintenanceScreen(){
  window.__cinehub_maintenance = true;
  var old = document.getElementById("maintenanceOverlay");
  if(old) old.remove();
  var fallbackUrl = String((cfg && cfg.telegramChannelLink) || (window.APP_CONFIG && window.APP_CONFIG.telegramChannelLink) || "").trim();
  var btnUrl = String((cfg && (cfg.maintenanceButtonUrl || cfg.maintenanceLinkUrl)) || fallbackUrl || "").trim();
  var linkUrl = String((cfg && cfg.maintenanceLinkUrl) || fallbackUrl || "").trim();
  var btnText = (cfg && cfg.maintenanceButtonText) || "Join Telegram Channel";
  var linkText = (cfg && cfg.maintenanceLinkText) || "";
  var title = (cfg && cfg.maintenanceTitle) || "🛠 Under Maintenance";
  var msg = (cfg && cfg.maintenanceMessage) || "We're updating the app right now. Please check back soon.";
  var btnHtml = btnUrl ? '<a class="primary" href="'+escMaintText_(btnUrl)+'" target="_blank" rel="noopener" style="display:inline-block;margin-top:14px;padding:12px 22px;text-decoration:none">'+escMaintText_(btnText)+'</a>' : '';
  var linkHtml = (linkUrl && linkText) ? '<p class="blocked-sub" style="margin-top:12px"><a href="'+escMaintText_(linkUrl)+'" target="_blank" rel="noopener" style="color:#7c5cff">'+escMaintText_(linkText)+'</a></p>' : '';
  var ov = document.createElement("div");
  ov.id = "maintenanceOverlay";
  ov.className = "blocked-overlay";
  ov.innerHTML =
    '<div class="blocked-card">'+
      '<div class="blocked-ico" aria-hidden="true">🛠</div>'+
      '<h2 class="blocked-title">'+escMaintText_(title)+'</h2>'+
      '<p class="blocked-msg">'+escMaintText_(msg)+'</p>'+
      btnHtml+linkHtml+
    '</div>';
  document.body.appendChild(ov);
  try{
    var app = document.getElementById("app");
    if(app) app.style.visibility = "hidden";
    var splash = document.getElementById("appSplash");
    if(splash){ splash.className = "gone"; splash.style.display = "none"; }
  }catch(e){}
  if(!window.__maintPoll){
    window.__maintPoll = setInterval(checkMaintenanceGate, 15000);
  }
}
function hideMaintenanceScreen(){
  window.__cinehub_maintenance = false;
  var old = document.getElementById("maintenanceOverlay");
  if(old) old.remove();
  try{
    var app = document.getElementById("app");
    if(app) app.style.visibility = "";
  }catch(e){}
  if(window.__maintPoll){
    clearInterval(window.__maintPoll);
    window.__maintPoll = null;
  }
}
/* Re-evaluate maintenance gate whenever config or admin status is (re)loaded */
function checkMaintenanceGate(){
  try{
    if(isMaintenanceActive() && !isMaintenanceAllowedUser()){
      showMaintenanceScreen();
    }else if(window.__cinehub_maintenance){
      hideMaintenanceScreen();
      try{ safeRender(false); }catch(e){}
    }
  }catch(e){}
}
function loadUserFromFB(){
  if(!window.CineHubFB){state.userLoaded=true;tryApplyReferralLocal();return}
  window.CineHubFB.loadUser().then(function(u){
    // Start from server, then merge any newer local progress (covers slow/failed API for normal users)
    userData = Object.assign({
      points:0, unlocks:{}, ads_today:0, ads_total:0, refs:0,
      task_progress:{}, unlock_prog:{}, unlock_ad_prog:{}
    }, u || {});
    if(!userData.task_progress || typeof userData.task_progress!=="object") userData.task_progress={};
    if(!userData.unlock_prog || typeof userData.unlock_prog!=="object") userData.unlock_prog={};
    if(!userData.unlock_ad_prog || typeof userData.unlock_ad_prog!=="object") userData.unlock_ad_prog={};
    if(!userData.unlocks || typeof userData.unlocks!=="object") userData.unlocks={};
    try{
      var uid = String((window.CineHubFB.getUid && window.CineHubFB.getUid()) || "");
      var cached = JSON.parse(localStorage.getItem("cinehub4_userprog_"+(uid||"guest")) || "null");
      if(cached && typeof cached==="object"){
        var serverPts = Number(userData.points)||0;
        var localPts = Number(cached.points)||0;
        // Prefer higher points / newer updated_at so a failed save does not wipe rewards
        if(localPts > serverPts || (Number(cached.updated_at)||0) > (Number(userData.updated_at)||0)){
          if(localPts > serverPts) userData.points = localPts;
          if(cached.task_progress && typeof cached.task_progress==="object"){
            userData.task_progress = Object.assign({}, userData.task_progress, cached.task_progress);
          }
          if(cached.unlock_prog && typeof cached.unlock_prog==="object"){
            userData.unlock_prog = Object.assign({}, userData.unlock_prog, cached.unlock_prog);
          }
          if(cached.unlock_ad_prog && typeof cached.unlock_ad_prog==="object"){
            userData.unlock_ad_prog = Object.assign({}, userData.unlock_ad_prog, cached.unlock_ad_prog);
          }
          if(cached.ads_today != null) userData.ads_today = Number(cached.ads_today)||0;
          if(cached.ads_day) userData.ads_day = cached.ads_day;
          if(cached.ads_total != null) userData.ads_total = Math.max(Number(userData.ads_total)||0, Number(cached.ads_total)||0);
          // Push merged progress back to server
          state.points = Number(userData.points)||0;
          setTimeout(function(){ try{ save(); }catch(e){} }, 400);
        }
      }
    }catch(e){}
    state.points = Number(userData.points) || 0;
    state.userLoaded = true;
    try{
      if(userData && !userData.join_bonus_given){
        localStorage.removeItem("cinehub4_join_bonus_given");
      }
    }catch(e){}
    if(isUserBlocked()){
      showBlockedScreen();
      return;
    }
    hideBlockedScreen();
    applyReferralReward().finally(function(){ safeRender(false); });
  }).catch(function(e){
    console.warn("loadUser failed", e);
    // Offline: restore last local progress so tasks/points still show
    try{
      var uid2 = "";
      try{ uid2 = String((window.CineHubFB && window.CineHubFB.getUid && window.CineHubFB.getUid()) || ""); }catch(e0){}
      var cached2 = JSON.parse(localStorage.getItem("cinehub4_userprog_"+(uid2||"guest")) || "null");
      if(cached2 && typeof cached2==="object"){
        userData = Object.assign(userData||{}, cached2);
        state.points = Number(cached2.points)||0;
      }
    }catch(e2){}
    state.userLoaded=true;
    safeRender(false);
  });
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
setTimeout(function(){loadMoviesFromFB();loadUserFromFB();try{applyDrawerBrand()}catch(e){}},150);
setTimeout(function(){ try{ showWelcomePopup(false); }catch(e){} }, 900);
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


function persistPage(){
  try{
    var p=state.page||"movies";
    sessionStorage.setItem("cinehub4_page", p);
    localStorage.setItem("cinehub4_page", p);
    if(p==="detail" && state.detailId){
      sessionStorage.setItem("cinehub4_detail", String(state.detailId));
      localStorage.setItem("cinehub4_detail", String(state.detailId));
    } else if(p!=="detail"){
      sessionStorage.removeItem("cinehub4_detail");
      localStorage.removeItem("cinehub4_detail");
      sessionStorage.setItem("cinehub4_page_fallback", p);
      localStorage.setItem("cinehub4_page_fallback", p);
    }
  }catch(e){}
}
function nav(p,opts={}){
  if(p==="telegram"){openLink(cfg.telegramBotLink);return}
  if(p===state.page&&!opts.force)return;
  if(!opts.fromBack){
    const mainTabs=["movies","home","series","adult","profile","search"];
    if(mainTabs.includes(p)){
      // Switching main tabs: reset history so home back = leave dialog
      state.history=[];
      // Leaving detail via tab → clear sticky share so reload won't reopen it
      if(state.page==="detail" || p==="adult" || p==="movies"){
        try{
          if(sessionStorage.getItem("cinehub4_share_pending")){
            // User chose list/tab over the shared movie
            if(p!=="detail") dismissShareCompletely();
          }
        }catch(e){}
      }
    }else{
      state.history.push(state.page);
      if(state.history.length>30)state.history.shift();
    }
    sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history));
  }
  const go=function(){
    state.page=p;
    if(p!=="detail"){ try{ state.detailId=null; }catch(e){} }
    persistPage();
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
  try{ clearShareSticky(); }catch(e){}
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
  if(!prev){
    // Adult movie detail → Adult tab; otherwise movies
    prev="movies";
    try{
      if(state.page==="detail" && state.detailId){
        var mm=(movies||[]).find(function(x){return String(x.id)===String(state.detailId)});
        if(mm && mm.adult) prev="adult";
      }
    }catch(e){}
  }
  const go=function(){
    state.page=prev;
    state.detailId=null;
    state.pendingAdultDetail=null;
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
function formatUploadAgo(m){
  var ts=Number((m&&(m.added_time||m.created_time||m.updated_time))||0);
  if(!ts) return "";
  if(ts<1e12) ts=ts*1000;
  var diff=Date.now()-ts;
  if(diff<0) diff=0;
  var mins=Math.floor(diff/60000);
  var hours=Math.floor(diff/3600000);
  var days=Math.floor(diff/86400000);
  var months=Math.floor(days/30);
  var years=Math.floor(days/365);
  var bn=typeof langIsBn==="function"?langIsBn():false;
  try{ if(!bn && window.CINEHUB4_LANG && CINEHUB4_LANG.get()==="bn") bn=true; }catch(e){}
  if(mins<1) return bn?"এইমাত্র":"Just now";
  if(mins<60) return bn?(mins+" মিনিট আগে"):(mins+(mins===1?" min ago":" mins ago"));
  if(hours<24) return bn?(hours+" ঘণ্টা আগে"):(hours+(hours===1?" hour ago":" hours ago"));
  if(days<30) return bn?(days+" দিন আগে"):(days+(days===1?" day ago":" days ago"));
  if(months<12) return bn?(months+" মাস আগে"):(months+(months===1?" month ago":" months ago"));
  return bn?(years+" বছর আগে"):(years+(years===1?" year ago":" years ago"));
}
function card(m,idx){
  const curMode=state.page==="adult"?state.adultMode:state.mode;
  const top=idx===0&&curMode==="trending"?`<span class="movie-top">TOP 1</span>`:"";
  const title=(m.title||"").split("|")[0].trim().replace(/</g,"");
  const year=String(m.year||m.release_year||m.releaseYear||"").trim().replace(/</g,"");
  const uploaded=formatUploadAgo(m);
  const sid=JSON.stringify(String(m.id));
  const rating=movieRatingLabel(m);
  const dur=movieDurationLabel(m);
  return `<article class="movie-card" onclick='detail(${sid})'>
    <div class="poster-wrap">
      ${top}
      ${rating?`<span class="movie-rating">★ ${rating}</span>`:""}
      ${posterHTML(m)}
      ${dur?`<span class="movie-dur"><span class="movie-dur-ico" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>${dur}</span>`:""}
    </div>
    <div class="movie-body">
      <div class="movie-body-row">
        <div class="mtitle-wrap">
          <div class="mtitle">${title}</div>
          <div class="myear-row">${year?`<span class="myear">${year}</span>`:""}${uploaded?`<span class="mupload-inline">${uploaded}</span>`:""}</div>
        </div>
        <button type="button" class="share-btn share-btn-round share-btn-glass" onclick='event.stopPropagation();shareMovie(${sid})' aria-label="Share"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.5 13.4l6.9 3.95M15.5 6.65l-6.9 3.95"/></svg></button>
      </div>
    </div>
  </article>`;
}
function tgUserPhoto(){
  try{
    var u=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;
    if(u&&u.photo_url) return String(u.photo_url);
  }catch(e){}
  return "";
}
function tgUserInitial(){
  try{
    var u=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;
    var n=(u&&(u.first_name||u.username))||"U";
    return String(n).charAt(0).toUpperCase();
  }catch(e){ return "U"; }
}
function headerAvatarBtn(){
  var photo=tgUserPhoto();
  var inner=photo
    ? '<img src="'+String(photo).replace(/"/g,"&quot;")+'" alt="" class="hdr-avatar-img" referrerpolicy="no-referrer">'
    : '<span class="hdr-avatar-letter">'+tgUserInitial()+"</span>";
  return '<button type="button" class="hdr-avatar-btn" onclick="nav(\'profile\')" aria-label="Profile">'+inner+"</button>";
}
function pageBackBar(title, opts){
  opts = opts || {};
  var av = opts.noAvatar ? "" : headerAvatarBtn();
  return '<div class="page-back-bar"><button type="button" class="page-back-btn" id="pageBackBtn" onclick="goBack()">‹</button><span class="page-back-title">'+(title||"")+'</span>'+av+"</div>";
}
function menuOnlyHeader(title, opts){
  opts = opts || {};
  var av = opts.noAvatar ? "" : headerAvatarBtn();
  return '<div class="page-back-bar"><button type="button" class="menu-ham" id="hamBtn">☰</button><span class="page-back-title">'+(title||"")+'</span>'+av+"</div>";
}
function bindPageBack(){const b=$("#pageBackBtn");if(b)b.onclick=()=>goBack()}

function cfgText(enKey, bnKey, fallback){
  loadSharedSettings();
  var en="", bn="";
  try{ en=String((cfg&&cfg[enKey])||"").trim(); }catch(e){}
  try{ bn=String((cfg&&cfg[bnKey])||"").trim(); }catch(e){}
  var isBn=false;
  try{ isBn=typeof langIsBn==="function"?langIsBn():false; }catch(e){}
  if(isBn && bn) return bn;
  if(en) return en;
  if(isBn && fallback) return fallback;
  return en||fallback||"";
}
function formatPrimeTitle(title){
  title=String(title||"Cine Hub4").trim();
  var parts=title.split(/\s+/).filter(Boolean);
  if(parts.length>=2){
    var last=parts.pop();
    return parts.join(" ")+' <span class="scene-pill">'+last.replace(/</g,"&lt;")+"</span>";
  }
  return title.replace(/</g,"&lt;");
}
function primeHeader(){
  loadSharedSettings();
  var title=cfgText("moviesHeaderTitle","moviesHeaderTitleBn","")
    || cfgText("appName","appNameBn","Cine Hub4")
    || "Cine Hub4";
  return '<div class="prime-row"><button type="button" class="menu-ham" id="hamBtn">☰</button><div class="prime-title">'+formatPrimeTitle(title)+'</div>'+headerAvatarBtn()+"</div>";
}
function heroPills(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.mode==="new"?"active":""}" onclick="setMode('new')"><span class="hp-label">${cfg.newMoviesLabel||"New Movies"}</span><span class="hp-sub">${cfg.newMoviesSub||"LATEST UPLOADS"}</span></button><button type="button" class="hero-pill orange ${state.mode==="trending"?"active":""}" onclick="setMode('trending')"><span class="hp-label">${cfg.trendingLabel||"Trending"}</span><span class="hp-sub">${cfg.trendingSub||"MOST WATCHED"}</span></button></div></div>`}
function catRow(){const cats=cfg.categories||defaults.categories;return`<div class="cat-row">${cats.map(c=>{const k=catKey(c);return `<button type="button" class="cat-chip ${state.category===k?"active":""}" onclick="filterCat('${String(k).replace(/'/g,"\\'")}')">${catLabel(c)}</button>`}).join("")}</div>`}
function libCard(){
  const title=state.mode==="trending"?t("Trending Movies"):(cfg.libraryTitle||t("Cinema Library"));
  return `<div class="lib-card lib-card-sm"><div class="lib-badge"><i></i> ${cfg.libraryBadge||"MOVIE ZONE"}</div><h2>${title}</h2><p class="lib-desc">${cfg.libraryDesc||"Curated movies, web series and premium entertainment updates."}</p><button type="button" class="how-btn" onclick="howToEarn()"><span class="how-btn-ico">${ico("play",16)}</span><span>${(cfg.howToWatchLabel||t("How to Watch")).replace(/^▶\s*/,"")}</span></button></div>`;
}
function ticker(){
  const raw=cfg.tickerText||"Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ";
  const bn=cfg.tickerTextBn||"প্রিয় কনটেন্ট শেয়ার করুন ও পয়েন্ট দিয়ে আনলক করুন 🚀 • নিয়মিত নতুন মুভি ও সিরিজ • অ্যাড দেখে বা পয়েন্ট দিয়ে আনলক করুন • ";
  const tx=loc(raw, bn);
  return `<div class="ticker"><span>${tx}${tx}</span></div>`;
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
        <span class="hb-ph-ico">${ico("play",18)}</span>
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
      <span class="hb-ph-ico">${ico("overview",18)}</span>
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
  showPageTransition(function(){state.mode=m;state.moviePage=1;render(true)});
}
function filterCat(c){
  if(state.category===c)return;
  showPageTransition(function(){state.category=c;state.moviePage=1;render(true)});
}
function listForHome(){let list=movies.filter(m=>!m.adult);if(state.category&&state.category!=="All Movies"&&state.category!=="All"){list=list.filter(m=>(m.category||"").toLowerCase().includes(state.category.toLowerCase().replace(" moves","").replace(" movie hindi",""))|| (m.category||"").toLowerCase()===state.category.toLowerCase())}if(state.mode==="trending")list=list.slice().sort((a,b)=>(b.views||b.clicks||0)-(a.views||a.clicks||0));else list=list.slice().sort((a,b)=>b.id-a.id);return list}
function moviesPage(){
  const full=listForHome();
  const pg=paginateList(full, state.moviePage);
  state.moviePage=pg.page;
  const cardsInner=pg.items.map(function(m,i){return card(m,i);}).join("");
  const cards=cardsInner?`<div class="movie-grid">${cardsInner}</div>`:`<div class="empty">${t("No movies found.")}</div>`;
  return `<div class="home-sticky-top" id="homeSticky">`+primeHeader()+heroPills()+catRow()+`<div class="home-sticky-line"></div></div>`+libCard()+ticker()+cards+renderPager(pg.page, pg.totalPages);
}
function setAdultMode(m){
  if(state.adultMode===m)return;
  showPageTransition(function(){state.adultMode=m;state.adultPage=1;render(true)});
}
function filterAdultCat(c){
  if(state.adultCategory===c)return;
  showPageTransition(function(){state.adultCategory=c;state.adultPage=1;render(true)});
}
function heroPillsAdult(){return`<div class="hero-pills-sticky"><div class="hero-pills"><button type="button" class="hero-pill blue ${state.adultMode==="new"?"active":""}" onclick="setAdultMode('new')"><span class="hp-label">${loc(cfg.adultNewLabel||"New Movies", cfg.adultNewLabelBn)}</span><span class="hp-sub">${loc(cfg.adultNewSub||"LATEST UPLOADS", cfg.adultNewSubBn)}</span></button><button type="button" class="hero-pill orange ${state.adultMode==="trending"?"active":""}" onclick="setAdultMode('trending')"><span class="hp-label">${loc(cfg.adultTrendingLabel||"Trending", cfg.adultTrendingLabelBn)}</span><span class="hp-sub">${loc(cfg.adultTrendingSub||"MOST WATCHED", cfg.adultTrendingSubBn)}</span></button></div></div>`}
function catRowAdult(){const cats=cfg.adultCategories||defaults.adultCategories;return`<div class="cat-row">${cats.map(c=>{const k=catKey(c);return `<button type="button" class="cat-chip ${state.adultCategory===k?"active":""}" onclick="filterAdultCat('${String(k).replace(/'/g,"\\'")}')">${catLabel(c)}</button>`}).join("")}</div>`}
function libCardAdult(){
  const title=state.adultMode==="trending"?t("Trending Movies"):loc(cfg.adultLibraryTitle||"Adult Library", cfg.adultLibraryTitleBn);
  return `<div class="lib-card lib-card-sm"><div class="lib-badge"><i></i> ${loc(cfg.adultLibraryBadge||"ADULT ZONE", cfg.adultLibraryBadgeBn)}</div><h2>${title}</h2><p class="lib-desc">${loc(cfg.adultLibraryDesc||"Curated 18+ content and premium entertainment updates.", cfg.adultLibraryDescBn)}</p><button type="button" class="how-btn" onclick="howToEarn()"><span class="how-btn-ico">${ico("play",16)}</span><span>${(loc(cfg.adultHowToWatchLabel||t("How to Watch"), cfg.adultHowToWatchLabelBn)||t("How to Watch")).replace(/^▶\s*/,"")}</span></button></div>`;
}
function tickerAdult(){
  const raw=cfg.adultTickerText||"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ";
  const bn=cfg.adultTickerTextBn||"১৮+ অ্যাডাল্ট জোন • নিয়মিত নতুন অ্যাডাল্ট কনটেন্ট • অ্যাড দেখে বা পয়েন্ট দিয়ে আনলক করুন • ";
  const tx=loc(raw, bn);
  return `<div class="ticker"><span>${tx}${tx}</span></div>`;
}
function listForAdult(){let list=movies.filter(m=>m.adult);if(state.adultCategory&&state.adultCategory!=="All"){list=list.filter(m=>(m.category||"").toLowerCase()===state.adultCategory.toLowerCase())}if(state.adultMode==="trending")list=list.slice().sort((a,b)=>(b.views||b.clicks||0)-(a.views||a.clicks||0));else list=list.slice().sort((a,b)=>b.id-a.id);return list}
function series(){const list=movies.filter(m=>!m.adult&&(m.category||"").toLowerCase().includes("series"));const inner=list.map((m,i)=>card(m,i)).join("");const grid=inner?`<div class="movie-grid">${inner}</div>`:`<div class="panel">${t("Series not added yet.")}</div>`;return menuOnlyHeader(t("Series"))+`<div class="section-title"><b>${t("Series")}</b><span>${t("Complete series")}</span></div>${grid}`}
function adult(){
  // Adult library fully off from admin → hide everything on user side
  if(cfg.adultEnabled===false || cfg.adultLibraryEnabled===false){
    return `<div class="empty" style="padding:40px 16px;text-align:center">${t("Adult library is currently unavailable.")}</div>`;
  }
  if(!state.adultOK){
    return `<div class="gate-wrap">
      <div class="gate-card">
        <div class="gate-icon">${ico("shield",36)}</div>
        <h2>${t("Adult Access Confirmation")}</h2>
        <p>${t("This section is reserved for mature viewers. Please confirm that you are 18 or older before entering the Adult Zone.")}</p>
        <div class="gate-note gate-note-row">${ico("check",14)}<span>${t("I confirm that I am 18 or older")}</span></div>
        <div class="gate-note gate-note-row muted">${ico("shield",12)}<span>${t("Your choice is remembered for this session only")}</span></div>
        <div class="gate-actions">
          <button type="button" class="gate-yes" onclick="confirmAdult()">${t("Yes, Enter")}</button>
          <button type="button" class="gate-no" onclick="nav('movies')">${t("No, Watch Movie")}</button>
        </div>
      </div>
    </div>`;
  }
  const full=listForAdult();
  const pg=paginateList(full, state.adultPage);
  state.adultPage=pg.page;
  const cardsInnerA=pg.items.map(function(m,i){return card(m,i);}).join("");
  const cards=cardsInnerA?`<div class="movie-grid">${cardsInnerA}</div>`:`<div class="empty">${t("No adult content yet. Add from Admin Panel.")}</div>`;
  return `<div class="home-sticky-top" id="homeSticky">`+adultHeaderWithSearch()+heroPillsAdult()+catRowAdult()+`<div class="home-sticky-line"></div></div>`+libCardAdult()+tickerAdult()+cards+renderPager(pg.page, pg.totalPages);
}
function adultHeaderWithSearch(){
  loadSharedSettings();
  var title = cfgText("adultHeaderTitle","adultHeaderTitleBn","")
    || cfgText("adultPageTitle","adultPageTitleBn","")
    || t("Adult");
  title=String(title).replace(/</g,"&lt;");
  return '<div class="page-back-bar adult-head-bar">'+
    '<button type="button" class="menu-ham" id="hamBtn">☰</button>'+
    '<span class="page-back-title">'+title+'</span>'+
    '<button type="button" class="adult-search-btn" onclick="openAdultSearch()" aria-label="Search">'+
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>'+
    '</button>'+
    headerAvatarBtn()+
  '</div>';
}
function openAdultSearch(){
  state.query = state.adultQuery || "";
  state.page = "adultSearch";
  try{ sessionStorage.setItem("cinehub4_page","adultSearch"); }catch(e){}
  render(true);
}
window.openAdultSearch = openAdultSearch;
function adultSearchPage(){
  if(cfg.adultEnabled===false || cfg.adultLibraryEnabled===false){
    return `<div class="empty" style="padding:40px 16px;text-align:center">${t("Adult library is currently unavailable.")}</div>`;
  }
  if(!state.adultOK){
    return adult(); // force gate first
  }
  return `<div class="search-top">
    <button type="button" class="page-back-btn" onclick="nav('adult')" aria-label="Back">‹</button>
    <div class="search-bar-wrap">
      <input id="q" type="search" placeholder="${t("Search movies...")}" value="${(state.query||"").replace(/"/g,"&quot;")}"
        oninput="liveAdultSearchInput(this)" onkeydown="if(event.key==='Enter'){event.preventDefault();doAdultSearch();}">
      <button type="button" class="mic-btn" id="micBtn" title="Voice search" aria-label="Voice search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2"/><path d="M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button type="button" class="search-go" onclick="doAdultSearch()" aria-label="Search">${ico("search",18)}</button>
    </div>
  </div>
  <div id="searchResults" class="search-results">${adultSearchResultsHTML()}</div>`;
}
function adultSearchResultsHTML(){
  var q = (state.query||"").toLowerCase().trim();
  var list = (movies||[]).filter(function(m){ return !!m.adult; });
  if(q) list = list.filter(function(m){ return movieMatchesQuery(m, q); });
  if(q){
    list = list.slice().sort(function(a,b){
      var ta=String(a.title||"").toLowerCase(), tb=String(b.title||"").toLowerCase();
      var pa=ta.indexOf(q), pb=tb.indexOf(q);
      if(pa!==pb) return (pa<0?999:pa)-(pb<0?999:pb);
      return ta.localeCompare(tb);
    });
  }
  if(!list.length){
    return q
      ? `<div class="empty search-empty">${t("No movies found")}</div>`
      : `<div class="empty search-empty muted">${t("Search movies...")}</div>`;
  }
  return list.map(function(m){ return searchResultRow(m); }).join("");
}
function liveAdultSearchInput(el){
  try{
    state.query = (el && el.value) || "";
    state.adultQuery = state.query;
    clearTimeout(window.__adultSearchT);
    window.__adultSearchT = setTimeout(function(){ doAdultSearch(); }, 80);
  }catch(e){ doAdultSearch(); }
}
function doAdultSearch(){
  try{
    var box = document.getElementById("searchResults");
    if(box) box.innerHTML = adultSearchResultsHTML();
  }catch(e){}
}
window.liveAdultSearchInput = liveAdultSearchInput;
window.doAdultSearch = doAdultSearch;
window.adultSearchPage = adultSearchPage;

function confirmAdult(){
  state.adultOK=true;
  try{ sessionStorage.setItem("cinehub4_adult_ok","1"); }catch(e){}
  var pending = state.pendingAdultDetail;
  var sharePend="";
  try{ sharePend=sessionStorage.getItem("cinehub4_share_pending")||sessionStorage.getItem("cinehub4_detail")||""; }catch(e){}
  state.pendingAdultDetail = null;
  function openShareOrDetail(id){
    var fm=resolveMovieByParam(id);
    if(fm){
      state.detailId=String(fm.id);
      state.page="detail";
      try{
        localStorage.setItem("cinehub4_page","detail");
        sessionStorage.setItem("cinehub4_page","detail");
        sessionStorage.setItem("cinehub4_share_pending", String(fm.id));
      }catch(e){}
      try{ render(false); }catch(e){}
      setTimeout(function(){ try{ showSharedLanding(fm); }catch(e){} }, 50);
      return true;
    }
    return false;
  }
  if(sharePend && openShareOrDetail(sharePend)) return;
  if(pending && openShareOrDetail(pending)) return;
  if(pending && sessionStorage.getItem("cinehub4_share_dismissed")!=="1"){
    try{ sessionStorage.setItem("cinehub4_share_pending", String(pending)); }catch(e){}
    state.detailId=String(pending);
  } else {
    // Normal adult enter — show library list, stay on adult after reload
    state.page="adult";
    state.detailId=null;
    try{
      localStorage.setItem("cinehub4_page","adult");
      sessionStorage.setItem("cinehub4_page","adult");
    }catch(e){}
  }
  render(true);
}


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
  return menuOnlyHeader(t("Profile"), {noAvatar:true})+`
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
  <div class="pf-section">${icoWrap("overview","sec")} ${t("OVERVIEW")}</div>
  <div class="pf-stats">
    <div class="pf-stat"><div><b>${state.points}</b><span>${t("My Points")}</span></div><div class="ico ico-coin">${ico("coin",22)}</div></div>
    <div class="pf-stat"><div><b>${refs}</b><span>${t("Total Referrals")}</span></div><div class="ico ico-users">${ico("users",22)}</div></div>
  </div>
  <div class="pf-section">${icoWrap("link","sec")} ${t("REFERRAL SYSTEM")}</div>
  <div class="pf-panel">
    <div class="pf-row"><span>${t("Per Referral Reward")}</span><b>${cfg.referralReward||20} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Join Bonus")}</span><b>${cfg.joinBonus||10} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Referral Code")}</span><b>${refCode}</b></div>
    <div style="font-size:12px;color:#9aa3b8;margin-top:8px">${t("Your Referral Link")}</div>
    <div class="pf-linkbox" id="refLinkText">${refLink}</div>
    <div class="pf-actions">
      <button type="button" class="pf-btn copy" onclick="copyRefLink()">${ico("copy",16)} ${t("Copy Link")}</button>
      <button type="button" class="pf-btn share" onclick="shareRefLink()">↗ ${t("Share")}</button>
    </div>
  </div>
  <div class="pf-section">❓ ${t("HOW IT WORKS")}</div>
  <div class="pf-how">
    <div class="pf-how-card"><b>${t("When friend joins")}</b><span>${t("Points Added")}</span></div>
    <div class="pf-how-card"><b>${t("More Earning")}</b><span>${t("Watch ads & earn")}</span></div>
  </div>
  <div class="pf-actions" style="margin-bottom:12px">
    <button type="button" class="pf-btn tutorial" onclick="openLink(cfg.watchTutorialVideo||cfg.telegramBotLink)">${ico("play",16)} ${t("Watch Tutorial")}</button>
    <button type="button" class="pf-btn buy" onclick="nav('buy')">${ico("cart",16)} ${t("Buy Points")}</button>
  </div>
  <div class="pf-section">${t("MORE POINT EARNING")}</div>
  <div class="earn-card">
    <h3>${t("Watch Ads & Earn Points")}</h3>
    <p>${t("Complete ads to get rewards and unlock videos with points.")}</p>
    <div class="earn-tags"><span>${ico("check",12)} ${t("Instant Reward")}</span><span>${ico("coin",12)} ${t("More Points")}</span><span>${ico("film",12)} ${t("Unlock Videos")}</span></div>
    <button type="button" class="pf-btn wide" onclick="nav('tasks')">${ico("zap",16)} ${t("More Point Earning")}</button>
  </div>
  <div id="adminPanelWrap" class="pf-section" style="display:none;margin-top:8px">
    <button type="button" id="adminPanelBtn" class="pf-btn wide" style="background:linear-gradient(135deg,#1d4ed8,#7c3aed);color:#fff;font-weight:800;border:0;padding:14px;border-radius:14px;width:100%">
      ${ico("shield",16)} ${t("Admin Panel")||"Admin Panel"}
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
    if(Array.isArray(s.tasks)){
      cfg.tasks=s.tasks;
      if(s.tasks.length) return s.tasks;
      if(s._tasksCleared) return []; // admin intentionally deleted all tasks
    }
  }catch(e){}
  if(Array.isArray(cfg.tasks)){
    if(cfg.tasks.length) return cfg.tasks;
    if(cfg._tasksCleared) return []; // admin intentionally deleted all tasks
  }
  return [
    {name:"one click",reward:2,limit:1,type:"countdown",seconds:5,resetHours:24,permanent:false},
    {name:"Watch rewarded ad",reward:cfg.adReward||2,limit:cfg.dailyAdLimit||20,type:"ad",resetHours:24,permanent:false},
    {name:"Join Telegram channel",reward:5,limit:1,type:"link",link:cfg.telegramChannelLink||cfg.telegramBotLink,resetHours:24,permanent:false},
    {name:"Refer a friend",reward:cfg.referralReward||20,limit:10,type:"share",resetHours:24,permanent:false},
    {name:"Daily login",reward:2,limit:1,type:"login",resetHours:24,permanent:false}
  ];
}
/** Task progress in Firebase users/{uid}.task_progress — multi-device sync */
function taskStableId(tk,i){
  // Prefer permanent admin-assigned id so reorder/new tasks never shift progress keys
  if(tk && tk.id){
    return "tid_"+String(tk.id).replace(/[^a-zA-Z0-9_-]/g,"_").slice(0,40);
  }
  const name=String((tk&&tk.name)||("task")).toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,24);
  const typ=String((tk&&tk.type)||"x").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,12);
  const link=String((tk&&(tk.link||tk.adId||""))||"").toLowerCase().replace(/[^a-z0-9]+/g,"").slice(0,16);
  // include reward+limit to distinguish two "New Task" rows
  const sig=String((tk&&tk.reward)||0)+"_"+String((tk&&tk.limit)||1);
  return "t_"+name+"_"+typ+"_"+sig+(link?("_"+link):"")+(i!=null?("_i"+i):"");
}
function getTaskProgMap(){
  if(!userData) userData={};
  if(!userData.task_progress || typeof userData.task_progress!=="object") userData.task_progress={};
  return userData.task_progress;
}
function taskResetInfo(i,tk){
  // Each task uses its own sid + own resetMode / resetHours / resetMinutes — never shared
  const sid=taskStableId(tk,i);
  const limit=Math.max(1, Number(tk&&tk.limit)||1);
  const map=getTaskProgMap();
  let entry=map[sid]||{};
  // merge legacy index-based key if present (older builds)
  try{
    const legacy="t"+String(i)+"_"+String((tk&&tk.name)||"task").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,28)+"_"+String((tk&&tk.type)||"x").toLowerCase().slice(0,12);
    const leg=map[legacy];
    if(leg && (Number(leg.count)||0) > (Number(entry.count)||0)) entry=Object.assign({}, leg);
  }catch(e){}
  let count=Number(entry.count)||0;
  if(tk && (tk.type==="share"||tk.type==="refer") && userData && userData.ref_task_count!=null){
    count=Math.max(count, Number(userData.ref_task_count)||0);
  }
  if(tk && tk.permanent){
    return {done: count>=limit, count:count, limit:limit, sid:sid};
  }

  const mode=String((tk&&tk.resetMode)||"hours").toLowerCase();
  const today=new Date().toDateString();
  // Anchor: when task was last completed or last progressed
  const anchor=Number(entry.done_at)||Number(entry.updated_at)||0;
  let needReset=false;

  if(mode==="midnight"){
    // Reset every calendar day at local midnight
    if(entry.day && entry.day!==today) needReset=true;
    else if(!entry.day && count>0){
      // Legacy entry without day — attach today so it resets tomorrow, not stuck forever
      entry=Object.assign({}, entry, { day: today, count: count });
      map[sid]=entry;
    }
  } else if(mode==="minutes"){
    const mins=Number(tk&&tk.resetMinutes);
    const m=(isFinite(mins)&&mins>0)?mins:60;
    if(count>0){
      if(anchor>0){
        if((Date.now()-anchor)/60000 >= m) needReset=true;
      } else {
        // Completed/progressed but no timestamp (old data) → reset so Done is not stuck
        needReset=true;
      }
    }
  } else {
    // hours (default) — per-task resetHours
    const hours=Number(tk&&tk.resetHours);
    const h=(isFinite(hours)&&hours>0)?hours:24;
    if(count>0){
      if(anchor>0){
        if((Date.now()-anchor)/3600000 >= h) needReset=true;
      } else {
        needReset=true;
      }
    }
  }

  if(needReset){
    count=0;
    entry = mode==="midnight"
      ? { count:0, day:today, updated_at:Date.now() }
      : { count:0, updated_at:Date.now() };
    map[sid]=entry;
    // Clear matching legacy key for this task only
    try{
      const legacy="t"+String(i)+"_"+String((tk&&tk.name)||"task").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,28)+"_"+String((tk&&tk.type)||"x").toLowerCase().slice(0,12);
      if(map[legacy]) map[legacy]=Object.assign({}, entry);
    }catch(e){}
    if(!userData) userData={};
    userData.task_progress=map;
    // Must persist — otherwise Firebase reloads old "Done" state
    try{ setTimeout(function(){ try{ save(); }catch(e){} }, 0); }catch(e){}
  }

  return {done: count>=limit, count:count, limit:limit, sid:sid};
}
function markTaskProgress(i,tk){
  const st=taskResetInfo(i,tk);
  const next=st.count+1;
  const map=getTaskProgMap();
  const now=Date.now();
  const entry={
    count: next,
    day: new Date().toDateString(),
    updated_at: now
  };
  // done_at when limit reached — used by hours/minutes reset for THIS task only
  if(next>=st.limit) entry.done_at=now;
  map[st.sid]=entry;
  // also keep legacy index key so old clients still see progress
  try{
    const legacy="t"+String(i)+"_"+String((tk&&tk.name)||"task").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,28)+"_"+String((tk&&tk.type)||"x").toLowerCase().slice(0,12);
    map[legacy]=entry;
  }catch(e){}
  if(!userData) userData={};
  userData.task_progress=map;
  userData.points = Number(state.points)||0;
  if(tk && (tk.type==="share"||tk.type==="refer")){
    userData.ref_task_count=next;
  }
  // Local cache + Firebase (with retry) — critical for normal users
  try{ save(); }catch(e){}
  return next>=st.limit;
}
function tasks(){
  loadSharedSettings();
  try{ resetDailyAdsIfNeeded(); }catch(e){}
  const watched=Number((userData&&userData.ads_today)||0);
  const limit=Number(cfg.dailyAdLimit||20);
  const rem=Math.max(0,limit-watched);
  const list=getTasks();
  return pageBackBar(t("More Point Earning"))+`
  <div class="earn-hero">
    <div class="earn-hero-ico">${ico("zap",28)}</div>
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
    <div class="pf-stat"><div><b data-live-points class="live-points">${state.points}</b><span>${t("Current Balance")}</span></div><div class="ico coin">${ico("coin",22)}</div></div>
    <div class="pf-stat"><div><b>${cfg.adReward||2}</b><span>${t("Points Per Ad")}</span></div><div class="ico gift">${ico("gem",22)}</div></div>
    <div class="pf-stat"><div><b data-live-watched>${watched}</b><span>${t("Ads Watched")}</span></div><div class="ico eye">${ico("eye",22)}</div></div>
    <div class="pf-stat"><div><b>${limit}</b><span>${t("Daily Limit")}</span></div><div class="ico shield">${ico("shield",22)}</div></div>
  </div>
  <div class="pf-section">${icoWrap("settings","sec")} ${t("EARNING SETTINGS")}</div>
  <div class="pf-panel earn-settings">
    <div class="pf-row"><span>${t("Reward Per Ad")}</span><b>${cfg.adReward||2} ${t("Points")}</b></div>
    <div class="pf-row"><span>${t("Maximum Daily Ads")}</span><b>${limit}</b></div>
    <div class="pf-row"><span>${t("Remaining Today")}</span><b data-live-remaining>${rem}</b></div>
    <div class="progress-bar"><i data-live-earn-bar style="width:${Math.min(100,(watched/Math.max(1,limit))*100)}%"></i></div>
    <div class="muted" style="font-size:11px;margin-top:6px;text-align:center" data-live-earn-txt>${watched} / ${limit} ${t("completed today")}</div>
  </div>
  <button type="button" class="watch-ad-now" onclick="watchAd('rewarded')">${ico("play",16)} ${t("Watch Ad Now")}</button>
  <div class="pf-section">${icoWrap("gem","sec")} ${t("MORE EARNING BUTTONS")}</div>
  ${list.map((tk,i)=>{
    const st=taskResetInfo(i,tk);
    const prog=st.limit>1?(` · ${st.count}/${st.limit}`):"";
    const statusLabel=st.done?(tk.permanent?t("Completed"):t("Done")):(tk.permanent?t("One-time task"):t("Daily task"))+prog;
    return `<div class="task-row ${st.done?"done":""}" data-task-row="${i}">
      <div class="task-ico">${ico("gem",20)}</div>
      <div class="task-meta"><b>${langIsBn()&&tk.nameBn?tk.nameBn:t(tk.name||"")}</b><span data-live-task-status="${i}">${t("Reward")}: ${tk.reward} pt · ${statusLabel}</span></div>
      ${st.done?`<button type="button" class="task-done" disabled data-live-task-btn="${i}">${t("Done")}</button>`:`<button type="button" class="task-start" onclick="runTask(${i})" data-live-task-btn="${i}">${t("Start")}</button>`}
    </div>`;
  }).join("")}`;
}
function runTask(i){
  const tk=getTasks()[i];if(!tk)return;
  const st=taskResetInfo(i,tk);
  if(st.done){toast(tk.permanent?t("Already completed"):t("Done"));return}
  const credit=function(opts){
    opts=opts||{};
    if(tk.type==="ad" && tk.rewardOnce){
      // progress first without points, pay only when finished
      const st2=taskResetInfo(i,tk);
      const next=st2.count+1;
      const willFinish=next>=st2.limit;
      if(willFinish){
        state.points+=Number(tk.reward||0);
        if(userData) userData.points=state.points;
      }
      const finished=markTaskProgress(i,tk);
      if(finished) toast("+"+(tk.reward||0)+" points · "+t("Done"));
      else toast(t("Ad progress")+" "+next+"/"+st2.limit);
      render(false);
      return finished;
    }
    state.points+=Number(tk.reward||0);
    if(userData) userData.points=state.points;
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
    try{
      watchAd("task");
    }catch(e){
      window.__cinehub_pendingTask=null;
      toast(t("Ad failed to load. Try again."));
    }
    // Safety: if ad UI never starts, clear pending after 45s so Start is not stuck
    setTimeout(function(){
      try{
        if(window.__cinehub_pendingTask===i) window.__cinehub_pendingTask=null;
      }catch(e2){}
    }, 45000);
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

function settings(){return pageBackBar(t("Settings"))+`<div class="section-title"><b>${ico("settings",18)} ${t("Settings")}</b></div><div class="panel"><div class="task"><span>${t("Language")}</span><select class="pill" style="appearance:auto" onchange="CINEHUB4_LANG.set(this.value);render(false)"><option value="en" ${CINEHUB4_LANG.get()==="en"?"selected":""}>English</option><option value="bn" ${CINEHUB4_LANG.get()==="bn"?"selected":""}>বাংলা</option></select></div><div class="task"><span>${t("Telegram")}</span><button class="pill" onclick="openLink(cfg.telegramBotLink)">${t("Open")}</button></div><div class="task"><span>${t("How to Watch")}</span><button class="pill" onclick="howToEarn()">${t("Open")}</button></div></div>`}

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
      toast("Payment save failed: Firebase API missing");
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
      <div class="buy-modal-icon">${ico("crown",32)}</div>
      <h2>${t("Confirm Purchase")}</h2>
      <div class="pf-panel">
        <div class="pf-row"><span>${t("Package")}</span><b>${langIsBn()&&o.nameBn?o.nameBn:t(o.name||"")}</b></div>
        <div class="pf-row"><span>${t("Pay Amount")}</span><b>${o.price} USDT</b></div>
        <div class="pf-row"><span class="pf-row-ico">${ico("coin",16)} ${t("You Get")}</span><b>${o.points} ${t("Points")}</b></div>
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
    <button type="button" class="pf-btn wide" style="margin-bottom:12px" onclick="cancelBuy()">${ico("crown",16)} ${t("Purchase Custom Coins")}</button>
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
        <button type="button" class="primary" style="flex-shrink:0" onclick="copyWalletAddr()">${ico("copy",16)}</button>
      </div>
      <p class="muted" style="font-size:11px;margin:10px 0">Send the exact USDT amount to the selected address. Then submit your TxID and payment screenshot below.</p>
      <label style="font-size:12px;color:#9aa3b8">Transaction ID / TxID</label>
      <input id="payTxid" type="text" placeholder="Paste your transaction hash / TxID here" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#eef1ff">
      <label style="font-size:12px;color:#9aa3b8">Payment Screenshot</label>
      <input id="payShot" type="file" accept="image/*" style="width:100%;margin:8px 0;color:#9aa3b8">
      <button type="button" class="pf-btn wide copy" style="margin-top:10px" onclick="submitPayment()">${ico("send",16)} ${t("Submit Payment Request")}</button>
    </div>`;
  }
  const pkgs=getPackages();
  const icons=["zap","star","medal","crown","gem","fire"];
  return pageBackBar(t("Buy Points"))+`
  <div class="earn-card">
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
      <div class="ico ico-head">${ico("coin",24)}</div>
      <div><h3 style="margin:0">${t("Buy Premium Points")}</h3>
      <p style="margin:4px 0 0;font-size:12px;color:#9aa3b8">${t("Select a package or enter custom USDT amount, then submit your payment proof for admin approval.")}</p></div>
    </div>
    <button type="button" class="pf-btn wide" style="margin-top:8px" onclick="openLink(cfg.howToBuyVideo||cfg.telegramBotLink)">${ico("play",16)} ${t("How to Buy Points")}</button>
  </div>
  <div class="pf-section">${icoWrap("gem","sec")} ${t("SELECT PACKAGE")}</div>
  ${pkgs.map((p,i)=>`<div class="pkg-row pkg-tone-${(i%6)+1}">
    <div class="pkg-ico">${ico(icons[i%icons.length],20)}</div>
    <div class="pkg-meta">
      <div class="pkg-name">${langIsBn()&&p.nameBn?p.nameBn:t(p.name||"")} ${p.tag?`<span class="pkg-tag">${langIsBn()&&p.tagBn?p.tagBn:t(p.tag||"")}</span>`:""}</div>
      <div class="pkg-sub">$ ${p.price} USDT · <span style="color:#4ade80">${p.points} ${t("Points")}</span></div>
    </div>
    <button type="button" class="pkg-buy" onclick="startBuy('${String(p.name||"").replace(/'/g,"")}',${p.price},${p.points})">${ico("cart",15)} ${t("Buy")}</button>
  </div>`).join("")}
  <div class="pf-section">${icoWrap("wallet","sec")} ${t("CUSTOM AMOUNT")}</div>
  <div class="pf-panel">
    <label style="font-size:12px;color:#9aa3b8">Enter Points Amount</label>
    <input id="customPts" type="number" placeholder="Example: 1000" oninput="updateCustomUsdt()" style="width:100%;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #2a334d;background:#0c101c;color:#eef1ff">
    <div class="pf-row"><span>Required USDT</span><b id="customUsdtShow">0.00 USDT</b></div>
    <button type="button" class="pf-btn wide copy" style="margin-top:10px" onclick="buyCustom()">${ico("crown",16)} ${t("Purchase Custom Coins")}</button>
  </div>`;
}

/* —— Unlock helpers — progress in Firebase (multi-device) —— */
// Clear points/ads unlock progress for one movie (Firebase maps only)
function clearUnlockProgressFor_(id){
  id=String(id||"");
  if(!id) return false;
  var changed=false;
  try{
    if(!userData) userData={};
    if(userData.unlock_prog && userData.unlock_prog[id]!=null){
      delete userData.unlock_prog[id];
      changed=true;
    }
    if(userData.unlock_ad_prog && userData.unlock_ad_prog[id]!=null){
      delete userData.unlock_ad_prog[id];
      changed=true;
    }
  }catch(e){}
  // Drop any legacy local keys so they cannot override Firebase again
  try{ localStorage.removeItem("cinehub4_uad_"+id); }catch(e){}
  try{ localStorage.removeItem("cinehub4_up_"+id); }catch(e){}
  return changed;
}
// If unlock timer expired, wipe leftover Ads 2/2 · Points x/y so UI resets to 0
function resetExpiredUnlockProgress_(id){
  id=String(id||"");
  if(!id||!userData) return;
  try{
    var exp=Number((userData.unlocks&&userData.unlocks[id])||0);
    if(!(exp>0) || exp>Date.now()) return;
    var changed=clearUnlockProgressFor_(id);
    try{ delete userData.unlocks[id]; changed=true; }catch(e){}
    if(changed){
      try{ setTimeout(function(){ try{ persistUnlockMaps_(); }catch(e){} }, 0); }catch(e){}
    }
  }catch(e){}
}
function isMovieUnlocked(id){
  try{
    resetExpiredUnlockProgress_(id);
    if(userData && userData.unlocks){
      const exp=Number(userData.unlocks[String(id)]||0);
      if(exp>Date.now()) return true;
    }
  }catch(e){}
  return false;
}
function persistUnlockMaps_(){
  if(!userData) return;
  try{
    if(window.CineHubFB){
      window.CineHubFB.updateUserField(null,{
        unlock_prog: userData.unlock_prog||{},
        unlock_ad_prog: userData.unlock_ad_prog||{},
        unlocks: userData.unlocks||{},
        points: Number(state.points)||0,
        updated_at: Date.now()
      }).catch(function(){});
    }
  }catch(e){}
}
function markMovieUnlocked(id){
  loadSharedSettings();
  const rules=getUnlockRules(id);
  const hours=rules.hours;
  const exp=Date.now()+hours*3600*1000;
  if(!userData) userData={};
  if(!userData.unlocks) userData.unlocks={};
  userData.unlocks[String(id)]=exp;
  // Clear in-progress counters after unlock (incl. localStorage fallback)
  clearUnlockProgressFor_(id);
  if(window.CineHubFB){
    try{window.CineHubFB.setUnlock(null, id, hours)}catch(e){}
    persistUnlockMaps_();
  }
  state.unlockProgress=rules.cost;
  return hours;
}
/** Unlock rules: movie vs adult separate (admin controlled) */

function unlockNoticeText(isAdult){
  loadSharedSettings();
  if(isAdult){
    var en = cfg.adultUnlockNoticeText || "Watch ads or use points to unlock. Then you can stream or download this adult content.";
    var bn = cfg.adultUnlockNoticeTextBn || "অ্যাড দেখুন অথবা পয়েন্ট ব্যবহার করে আনলক করুন। এরপর এই অ্যাডাল্ট কনটেন্ট স্ট্রিম বা ডাউনলোড করতে পারবেন।";
    return loc(en, bn);
  }
  var en2 = cfg.unlockNoticeText || "Watch ads or use your points to unlock. After unlock you can watch and download the movie from available servers.";
  var bn2 = cfg.unlockNoticeTextBn || "অ্যাড দেখুন অথবা আপনার পয়েন্ট ব্যবহার করে আনলক করুন। আনলক হলে উপলব্ধ সার্ভার থেকে মুভি দেখতে ও ডাউনলোড করতে পারবেন।";
  return loc(en2, bn2);
}
function unlockNoticeHead(isAdult){
  loadSharedSettings();
  if(isAdult){
    return loc(cfg.adultUnlockNoticeHead || "Unlock adult content with ads or points", cfg.adultUnlockNoticeHeadBn || "অ্যাড বা পয়েন্ট দিয়ে অ্যাডাল্ট কনটেন্ট আনলক করুন");
  }
  return loc(cfg.unlockNoticeHead || "Unlock movie with ads or points", cfg.unlockNoticeHeadBn || "অ্যাড বা পয়েন্ট দিয়ে মুভি আনলক করুন");
}

function isAdultMovie(m){
  if(!m) return false;
  if(m === true) return true;
  if(typeof m === "boolean") return m;
  if(typeof m === "object"){
    if(m.adult === true || m.adult === 1 || m.adult === "1" || m.adult === "true") return true;
    var ty = String(m.type || "").toLowerCase();
    if(ty === "adult" || ty === "18+") return true;
    return false;
  }
  return false;
}
/** Unlock rules: per-movie override → else adult/normal admin defaults */
function getUnlockRules(movieOrAdult){
  // Adult + non-adult: same logic — admin panel defaults, then optional per-movie override if > 0
  loadSharedSettings();
  var isAdult = false;
  var movie = null;
  if(typeof movieOrAdult === "boolean") isAdult = movieOrAdult;
  else if(movieOrAdult && typeof movieOrAdult === "object"){
    movie = movieOrAdult;
    isAdult = isAdultMovie(movieOrAdult);
  }else if(movieOrAdult != null){
    movie = (typeof movies !== "undefined" ? movies : []).find(function(x){ return String(x.id)===String(movieOrAdult); });
    isAdult = isAdultMovie(movie);
  }
  var cost, adsNeed, hours;
  if(isAdult){
    cost = Math.max(1, Number(cfg.adultUnlockCost != null ? cfg.adultUnlockCost : 3) || 3);
    adsNeed = Math.max(1, Number(cfg.adultAdsForUnlock != null ? cfg.adultAdsForUnlock : 5) || 5);
    hours = Math.max(1, Number(cfg.adultUnlockHours != null ? cfg.adultUnlockHours : 15) || 15);
  }else{
    cost = Math.max(1, Number(cfg.unlockCost != null ? cfg.unlockCost : 5) || 5);
    adsNeed = Math.max(1, Number(cfg.adsForUnlock != null ? cfg.adsForUnlock : 5) || 5);
    hours = Math.max(1, Number(cfg.unlockHours != null ? cfg.unlockHours : 15) || 15);
  }
  // Per-movie override only when admin set a positive value on the movie; empty/null = keep defaults above
  if(movie){
    var up = movie.unlock_points;
    var ua = movie.unlock_ads;
    var uh = movie.unlock_hours;
    if(up != null && String(up).trim() !== "" && isFinite(Number(up)) && Number(up) > 0){
      cost = Math.max(1, Math.floor(Number(up)));
    }
    if(ua != null && String(ua).trim() !== "" && isFinite(Number(ua)) && Number(ua) > 0){
      adsNeed = Math.max(1, Math.floor(Number(ua)));
    }
    if(uh != null && String(uh).trim() !== "" && isFinite(Number(uh)) && Number(uh) > 0){
      hours = Math.max(1, Math.floor(Number(uh)));
    }
  }
  return { cost: cost, adsNeed: adsNeed, hours: hours };
}
/** Points toward unlock — Firebase users/{uid}.unlock_prog only */
function getUnlockProgress(id){
  try{ resetExpiredUnlockProgress_(id); }catch(e){}
  try{
    if(userData && userData.unlock_prog){
      return Number(userData.unlock_prog[String(id)]||0);
    }
  }catch(e){}
  return 0;
}
function setUnlockProgress(id,n){
  loadSharedSettings();
  const cost=getUnlockRules(id).cost;
  const v=Math.max(0,Math.min(cost,Number(n)||0));
  if(!userData) userData={};
  if(!userData.unlock_prog) userData.unlock_prog={};
  userData.unlock_prog[String(id)]=v;
  state.unlockProgress=v;
  // Firebase primary
  try{ persistUnlockMaps_(); }catch(e){}
  try{ setTimeout(function(){ try{ save(); }catch(e2){} }, 0); }catch(e){}
  return v;
}
/** Ads toward unlock — Firebase users/{uid}.unlock_ad_prog only (no localStorage) */
function getAdUnlockProgress(id){
  try{ resetExpiredUnlockProgress_(id); }catch(e){}
  try{
    if(userData && userData.unlock_ad_prog){
      return Number(userData.unlock_ad_prog[String(id)]||0);
    }
  }catch(e){}
  return 0;
}
function setAdUnlockProgress(id,n){
  loadSharedSettings();
  const need=getUnlockRules(id).adsNeed;
  const v=Math.max(0,Math.min(need,Number(n)||0));
  if(!userData) userData={};
  if(!userData.unlock_ad_prog) userData.unlock_ad_prog={};
  userData.unlock_ad_prog[String(id)]=v;
  // Strip legacy local key so it cannot fight Firebase
  try{ localStorage.removeItem("cinehub4_uad_"+String(id)); }catch(e){}
  try{ persistUnlockMaps_(); }catch(e){}
  try{ setTimeout(function(){ try{ save(); }catch(e2){} }, 0); }catch(e){}
  return v;
}
function tryCompleteUnlock(id){
  loadSharedSettings();
  const _ur=getUnlockRules(id); const cost=_ur.cost; const adsNeed=_ur.adsNeed;
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
  // Manual open wins over sticky share deep-link
  try{ clearShareSticky(); }catch(e){}
  const m=movies.find(x=>String(x.id)===String(id));if(!m){console.warn("detail: movie not found",id);return;}
  m.clicks=(m.clicks||0)+1;m.views=(m.views||m.clicks);
  try{ if(window.CineHubFB && window.CineHubFB.incClicks) window.CineHubFB.incClicks(m.id); }catch(e){}
  // Adult deep-link / card: confirm 18+ first, then unlock page
  if(m.adult && !state.adultOK){
    state.pendingAdultDetail = String(id);
    state.page = "adult";
    try{ sessionStorage.setItem("cinehub4_page","adult"); }catch(e){}
    render(true);
    return;
  }
  if(state.page!=="detail"){
    var fromPage = state.page;
    // Opening adult content from share/home → ensure back lands on Adult tab
    if(m.adult && fromPage!=="adult" && fromPage!=="adultSearch"){
      fromPage = "adult";
    }
    state.history.push(fromPage);
    if(state.history.length>30)state.history.shift();
    try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history))}catch(e){}
  }else if(m.adult && (!state.history || !state.history.length)){
    state.history = ["adult"];
    try{sessionStorage.setItem("cinehub4_history",JSON.stringify(state.history))}catch(e){}
  }
  state.detailId=id;
  state.unlockProgress=isMovieUnlocked(id)?getUnlockRules(id).cost:getUnlockProgress(id);
  if(typeof showPageTransition==="function"){
    showPageTransition(function(){
      state.page="detail";
      try{ persistPage(); }catch(e){}
      render(false);
    });
  }else{
    state.page="detail";
    try{ persistPage(); }catch(e){}
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
  var m = resolveMovieByParam(state.detailId) || (movies||[]).find(function(x){ return String(x.id)===String(state.detailId); });
  if(!m){
    // Library still loading — don't bounce to home on share deep-link
    if(!state.moviesLoaded || !(movies && movies.length)){
      return '<div class="empty" style="padding:40px 16px;text-align:center"><p>'+t("Loading...")+'</p></div>';
    }
    return moviesPage();
  }
  const isAdult=isAdultMovie(m);
  const rules=getUnlockRules(m);
  const cost=rules.cost;
  const adsNeed=rules.adsNeed;
  const hours=rules.hours;
  const title=(m.title||"").split("|")[0].trim();
  const unlocked=isMovieUnlocked(m.id);
  const backPage=isAdult?"adult":"movies";
  const pageLabel=isAdult
    ? (cfgText("adultDetailTitle","adultDetailTitleBn","") || (t("Adult")+" · "+t("Movie")))
    : (cfgText("movieDetailTitle","movieDetailTitleBn","") || t("Movie"));
  const clicks=Number(m.clicks||m.views||0);

  // shared poster header — TMDB meta on unlock / detail
  function posterBlock(){
    var rating=movieRatingLabel(m);
    var dur=movieDurationLabel(m);
    var genre=String(m.genre||m.genres||m.category||"").replace(/</g,"");
    var overview=String(m.overview||"").replace(/</g,"").slice(0,280);
    var year=String(m.year||"").replace(/</g,"");
    try{
      // Soft refresh rating/runtime from TMDB when opening detail (max once / 6h per movie)
      if(m.tmdb_id && window.CineHubFB && window.CineHubFB.refreshTmdbMeta){
        var k="tmdb_meta_"+m.id;
        var last=Number(sessionStorage.getItem(k)||0);
        if(!last || Date.now()-last>6*3600000){
          sessionStorage.setItem(k,String(Date.now()));
          window.CineHubFB.refreshTmdbMeta(m.id, m.tmdb_id).then(function(upd){
            if(!upd) return;
            var idx=movies.findIndex(function(x){return String(x.id)===String(m.id);});
            if(idx>=0){
              if(upd.rating!=null) movies[idx].rating=upd.rating;
              if(upd.runtime!=null) movies[idx].runtime=upd.runtime;
              if(upd.overview) movies[idx].overview=upd.overview;
              if(upd.genres) movies[idx].genres=upd.genres;
              if(state.page==="detail" && String(state.detailId)===String(m.id)) render(false);
            }
          }).catch(function(){});
        }
      }
    }catch(e){}
    return `<div class="ps-poster">
      <div class="ps-poster-img">${posterHTML(m,"full")}</div>
      <div class="ps-badge">${isAdult?"18+":t("Movie")}</div>
      ${rating?`<div class="ps-rating-badge">★ ${rating}</div>`:""}
      ${dur?`<div class="ps-dur-badge"><span class="ps-dur-ico" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>${dur}</div>`:""}
    </div>
    <div class="ps-share-row ps-share-row-solo">
      <button type="button" class="ps-share-btn ps-send ps-share-big" onclick='shareMovie(${JSON.stringify(String(m.id))})'>
        <span class="ps-share-glow" aria-hidden="true"></span>
        <span class="ps-ico-svg" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 3.9M15.4 6.6l-6.8 3.9"/></svg></span>
        ${t("Share")}
      </button>
    </div>
    <h1 class="ps-title">${title.replace(/</g,"&lt;")}</h1>
    <div class="ps-sub">${[genre,year,rating?("★ "+rating):"",dur].filter(Boolean).join(" · ")}</div>
    ${overview?`<p class="ps-overview">${overview}${String(m.overview||"").length>280?"…":""}</p>`:""}`;
  }

  if(unlocked){
    const n=serverCount();
    let servers="";
    for(let i=1;i<=n;i++){
      const url = m["server"+i]||m["server"+i+"_link"]||m["s"+i]||"";
      if(!url && i>1) continue;
      servers+=`<button type="button" class="ps-dl-btn" onclick='openServer(${JSON.stringify(String(m.id))},${i})'>
        <span class="ps-dl-ico">${ico("download",18)}</span>
        <span><b>${t("Server")} ${i}</b><small>${t("Download / Watch")}</small></span>
        <span class="ps-dl-go">›</span>
      </button>`;
    }
    if(!servers){
      servers=`<button type="button" class="ps-dl-btn primary" onclick='openServer(${JSON.stringify(String(m.id))},1)'>
        <span class="ps-dl-ico">${ico("download",18)}</span>
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
          <div class="ps-m need"><span class="ps-m-ico ps-i-key" aria-hidden="true">${ico("star",14)}</span><span class="ps-m-lbl">${t("Required")}</span><b>${cost}</b></div>
          <div class="ps-m myp"><span class="ps-m-ico ps-i-coin" aria-hidden="true">${ico("coin",14)}</span><span class="ps-m-lbl">${t("My Points")}</span><b>${state.points||0}</b></div>
          <div class="ps-m rem"><span class="ps-m-ico ps-i-time" aria-hidden="true">${ico("clock",14)}</span><span class="ps-m-lbl">${t("Remaining")}</span><b>0</b></div>
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
      <div class="ps-bell">${ico("bell",22)}</div>
      <div>
        <div class="ps-n-title">${t("UNLOCK NOTICE")}</div>
        <div class="ps-n-sub">${isAdult?t("ADULT CONTENT"):t("MOVIE CONTENT")}</div>
        <div class="ps-n-desc">${unlockNoticeText(isAdult)}</div>
      </div>
    </div>
    ${posterBlock()}
    <div class="ps-unlock-card">
      <div class="ps-ok-head">
        <span class="ps-dot"></span>
        <b>${unlockNoticeHead(isAdult)}</b>
      </div>
      <div class="ps-metrics">
        <div class="ps-m need"><span class="ps-m-ico ps-i-key" aria-hidden="true">${ico("star",14)}</span><span class="ps-m-lbl">${t("Required")}</span><b>${cost}</b></div>
        <div class="ps-m myp"><span class="ps-m-ico ps-i-coin" aria-hidden="true">${ico("coin",14)}</span><span class="ps-m-lbl">${t("My Points")}</span><b class="live-points" data-live-points>${my}</b></div>
        <div class="ps-m rem"><span class="ps-m-ico ps-i-time" aria-hidden="true">${ico("clock",14)}</span><span class="ps-m-lbl">${t("Remaining")}</span><b>${rem}</b></div>
      </div>
      <div class="ps-progress ps-progress-split">
        <div class="ps-prog-line">
          <div class="ps-prog-lbl">${t("Points")}: ${prog}/${cost}</div>
          <div class="ps-bar"><i style="width:${pctPts}%"></i></div>
        </div>
        <div class="ps-prog-line">
          <div class="ps-prog-lbl unlock-ads-line" data-live-ads-lbl data-prefix="${t("Ads")}: ">${t("Ads")}: <span data-live-ads>${adProg}/${adsNeed}</span></div>
          <div class="ps-bar ps-bar-ads"><i data-live-ads-bar style="width:${pctAds}%"></i></div>
        </div>
      </div>
      <div class="ps-hint">${t("Unlock with points or ads")}</div>
      <button type="button" class="ps-btn lock" onclick="unlockWithAds()">${ico("unlock",16)} ${t("Unlock Video")}</button>
      <button type="button" class="ps-btn points" onclick="usePointsForUnlock()">${ico("coin",16)} ${t("Use My Points")}</button>
    </div>
    <button type="button" class="ps-more" onclick="nav('${backPage}')">${ico("more",16)} ${t("More Watching")}</button>
  </div>`;
}

function usePointsForUnlock(){
  loadSharedSettings();
  const id=state.detailId;
  if(!id){toast(t("Open a movie first"));return}
  if(isMovieUnlocked(id)){toast(t("Already unlocked"));render(false);return}
  const cost=getUnlockRules(id).cost;
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
function unlockWithAds(){
  var mid=state.detailId;
  var isAdult=false;
  try{
    var m=(movies||[]).find(function(x){return String(x.id)===String(mid);});
    isAdult=isAdultMovie(m);
  }catch(e){}
  watchAd(isAdult?"adult":"unlock");
}
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


function linkCountdownSecs(){
  loadSharedSettings();
  return Math.max(5, Math.min(120, Number(cfg.adLinkSeconds)||20));
}
function backToAppMsg(){
  return t("Time's up! Press Back to return to the app.");
}
/** After countdown: show back hint (selected language), then continue */
function finishCountdownWithBackHint(ov, onDone){
  try{
    var card = ov && (ov.querySelector(".modal-card") || ov.querySelector(".cd-card") || ov);
    if(card){
      card.innerHTML = '<div class="cd-ring-wrap" style="margin:0 auto 8px">'+
        '<div class="cd-play" style="font-size:28px">✓</div></div>'+
        '<b class="cd-title">'+t("Done")+'</b>'+
        '<div class="muted cd-sub" style="margin:10px 0 6px">'+backToAppMsg()+'</div>'+
        '<div class="cd-num" style="font-size:14px;color:#94a3b8">'+t("Then tap Continue")+'</div>'+
        '<button type="button" class="pf-btn copy" id="cdBackContinue" style="margin-top:14px;width:100%">'+t("Continue")+'</button>';
      var btn = document.getElementById("cdBackContinue");
      if(btn){
        btn.onclick = function(){
          try{ ov.remove(); }catch(e){}
          if(onDone) try{ onDone(); }catch(e){}
        };
        return;
      }
    }
  }catch(e){}
  try{ if(ov) ov.remove(); }catch(e){}
  if(onDone) try{ onDone(); }catch(e){}
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
    <div class="muted" style="font-size:11px;margin-top:6px">${t("After timer ends, press Back to return")}</div>
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
      try{clearInterval(tick)}catch(e){}
      if(cancelled){ cleanup(); return; }
      finishCountdownWithBackHint(ov, function(){ if(onDone) onDone(); });
    }
  },1000);
}
function slotHasAds(slot){
  if(!slot) return false;
  if(Array.isArray(slot.networks) && slot.networks.some(function(n){ return n && String(n.id||"").trim(); })) return true;
  return !!(String(slot.id||"").trim());
}
function normalizeSlotNetworks(slot){
  if(!slot) return [];
  var list = [];
  if(Array.isArray(slot.networks) && slot.networks.length){
    slot.networks.forEach(function(n){
      if(!n) return;
      var id = String(n.id||"").trim();
      if(!id) return;
      list.push({ network: String(n.network||"adsgram").toLowerCase(), id: id });
    });
  }
  if(!list.length && String(slot.id||"").trim()){
    list.push({ network: String(slot.network||"adsgram").toLowerCase(), id: String(slot.id).trim() });
  }
  return list;
}
function resolveAdSlot(mode){
  loadSharedSettings();
  const slots = cfg.adSlots || {};
  const b = cfg.adBlocks || {};
  let key = "rewarded";
  if(mode==="adult") key="adult";
  else if(mode==="task") key="task";
  else if(mode==="unlock") key="unlock";
  else if(mode==="banner") key="banner";
  else if(mode==="bannerAdult") key="bannerAdult";
  else if(mode==="interstitial") key="interstitial";

  // Pending task may override with its own networks (NEVER use tk.id — that's the task doc id, not an ad block)
  if(key==="task" && window.__cinehub_pendingTask!=null){
    try{
      var tk = getTasks()[window.__cinehub_pendingTask];
      if(tk){
        var taskNets = Array.isArray(tk.adNetworks) ? tk.adNetworks.filter(function(n){ return n && String(n.id||"").trim(); }) : [];
        var taskAdId = String(tk.adId || "").trim();
        // Reject values that look like internal task ids (task_123..., t123, etc.)
        if(taskAdId && /^task[_-]/i.test(taskAdId)) taskAdId = "";
        if(taskNets.length || taskAdId){
          var tSlot = {
            network: tk.adNetwork || tk.network || "adsgram",
            id: taskAdId,
            mode: tk.adMode || "first",
            networks: taskNets.length ? taskNets : (taskAdId ? [{ network: tk.adNetwork || tk.network || "adsgram", id: taskAdId }] : null)
          };
          if(slotHasAds(tSlot) || normalizeSlotNetworks(tSlot).length) return tSlot;
        }
      }
    }catch(e){}
  }

  let slot = slots[key] ? Object.assign({}, slots[key]) : null;
  if(!slot || !slotHasAds(slot)){
    let id = "";
    if(key==="adult") id=b.adult||b.rewarded||"";
    else if(key==="task") id=b.task||b.rewarded||"";
    else if(key==="unlock") id=b.unlock||b.interstitial||b.rewarded||"";
    else if(key==="banner") id=b.banner||"";
    else if(key==="bannerAdult") id=b.bannerAdult||b.banner||"";
    else id=b.rewarded||"";
    slot = { network: "adsgram", id: id, mode: "first", networks: id ? [{network:"adsgram",id:id}] : [] };
  }
  // empty unlock/adult/task → fall back to rewarded (keep multi-net if present)
  if(!slotHasAds(slot) && (key==="unlock"||key==="adult"||key==="task")){
    var rew = slots.rewarded;
    if(rew && slotHasAds(rew)) return Object.assign({}, rew);
    if(key==="unlock"){
      var inter = slots.interstitial;
      if(inter && slotHasAds(inter)) return Object.assign({}, inter);
    }
    return { network:"adsgram", id: b.rewarded||"", mode:"first", networks: b.rewarded?[{network:"adsgram",id:b.rewarded}]:[] };
  }
  if(!slot.mode) slot.mode = "first";
  if(!Array.isArray(slot.networks) || !slot.networks.length){
    slot.networks = normalizeSlotNetworks(slot);
  }
  return slot;
}


function loadAdScriptOnce(src, globalCheck){
  return new Promise(function(resolve){
    try{
      if(globalCheck && globalCheck()){ resolve(true); return; }
      if(!src){ resolve(false); return; }
      var existing = document.querySelector('script[data-adsrc="'+src+'"]');
      if(existing){
        setTimeout(function(){ resolve(!!(globalCheck && globalCheck())); }, 500);
        return;
      }
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.setAttribute("data-adsrc", src);
      s.onload = function(){ setTimeout(function(){ resolve(!!(globalCheck && globalCheck())); }, 200); };
      s.onerror = function(){ resolve(false); };
      document.head.appendChild(s);
    }catch(e){ resolve(false); }
  });
}

function openAdLink(url){
  try{
    if(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openLink){
      window.Telegram.WebApp.openLink(url, {try_instant_view:false});
      return true;
    }
  }catch(e){}
  try{ window.open(url, "_blank"); return true; }catch(e){}
  return false;
}

function playLinkAd(slot, onDone, onFail){
  var id = String((slot&&slot.id)||"").trim();
  if(!id){ toast(t("Admin has not configured this Ad Block ID")); if(onFail) onFail(); return; }
  var url = id;
  if(!/^https?:\/\//i.test(id)){
    var net = String((slot&&slot.network)||"").toLowerCase();
    if(net==="monetag"){
      url = "https://otieu.com/4/"+encodeURIComponent(id);
    } else {
      // bare id without http — still try as path if monetag-like digits
      if(/^\d+$/.test(id)){
        url = "https://otieu.com/4/"+encodeURIComponent(id);
      } else {
        toast(t("Paste full ad URL for this network"));
        if(onFail) onFail();
        return;
      }
    }
  }
  openAdLink(url);
  var total = (typeof linkCountdownSecs==="function") ? linkCountdownSecs() : Math.max(5, Math.min(120, Number(cfg.adLinkSeconds)||20));
  var left = total;
  var cancelled = false;
  var ov = document.createElement("div");
  ov.className = "modal";
  ov.innerHTML = '<div class="modal-card cd-card open-ad-card">'+
    '<div class="cd-ring-wrap"><svg class="cd-svg" viewBox="0 0 100 100"><circle class="cd-bg" cx="50" cy="50" r="42"/><circle class="cd-fg" id="adNetFg" cx="50" cy="50" r="42" style="stroke-dasharray:264;stroke-dashoffset:0"/></svg><div class="cd-play">▶</div></div>'+
    '<b class="cd-title">'+t("Watching Ad")+'</b>'+
    '<div class="muted cd-sub">'+String((slot&&slot.network)||"ad").toUpperCase()+' · '+t("Keep this page open until countdown ends.")+'</div>'+
    '<div class="cd-num" id="adNetNum">'+left+'s</div>'+
    '<div class="muted" style="font-size:11px;margin-top:6px">'+t("After timer ends, press Back to return")+'</div>'+
    '<button type="button" class="pf-btn cancel-buy ad-cancel-btn" id="adNetCancel">'+t("Cancel")+'</button></div>';
  document.body.appendChild(ov);
  var circ = 2*Math.PI*42;
  var tick = setInterval(function(){
    if(cancelled) return;
    left--;
    var el = document.getElementById("adNetNum");
    var fg = document.getElementById("adNetFg");
    if(el) el.textContent = left+"s";
    if(fg) fg.style.strokeDashoffset = String(circ * (1 - Math.max(0,left)/total));
    if(left <= 0){
      clearInterval(tick);
      if(cancelled) return;
      if(typeof finishCountdownWithBackHint==="function"){
        finishCountdownWithBackHint(ov, function(){ if(onDone) onDone(); });
      } else {
        try{ ov.remove(); }catch(e){}
        if(onDone) onDone();
      }
    }
  }, 1000);
  var cancel = document.getElementById("adNetCancel");
  if(cancel) cancel.onclick = function(){
    cancelled=true; clearInterval(tick); try{ov.remove()}catch(e){}
    toast(t("Ad closed"));
    if(onFail) onFail();
  };
}

function isValidAdsgramBlockId(id){
  id = String(id||"").trim();
  if(!id) return false;
  // Adsgram: pure digits, or int- / task- prefix + digits. Reject internal task doc ids.
  if(/^task_\d+/i.test(id)) return false;
  if(/^[0-9]+$/.test(id)) return true;
  if(/^(int|task)-[0-9]+$/i.test(id)) return true;
  // Allow other official-looking short alphanumerics from Adsgram dashboard
  if(/^[A-Za-z0-9_-]{3,40}$/.test(id) && !/^task[_-]/i.test(id)) return true;
  return false;
}

// Shared early-complete for ALL ad networks in Telegram Mini App WebView.
// Monetag/Adsgram/TADS often resolve their Promise late (backend poll / focus restore).
// When user returns after watching long enough → fire success immediately (same UX for every network + multi-ad sequences).
function createAdReturnGuard(onSuccess, minMs){
  // Monetag backend poll adds ~1.5–4.5s AFTER Continue — detect close ourselves
  minMs = (typeof minMs==="number" && minMs>0) ? minMs : 5500;
  var adShownAt = 0;
  var armed = false;
  var sawHidden = false;
  var sawOverlay = false;
  var peakLayers = 0;
  var pollTimer = null;
  var mo = null;
  function watchedLongEnough(){
    return adShownAt > 0 && (Date.now() - adShownAt) >= minMs;
  }
  function countAdLayers(){
    var n = 0;
    try{
      n += document.querySelectorAll(
        '[id*="monetag" i],[class*="monetag" i],[id*="adsgram" i],[class*="adsgram" i],'+
        '[id*="spot-" i],iframe[src*="libtl"],iframe[src*="monetag"],iframe[src*="otieu"],'+
        'iframe[src*="adsgram"],iframe[src*="vignette"],[class*="tgads" i],[id*="tads" i]'
      ).length;
    }catch(e){
      try{
        n += document.querySelectorAll(
          '[id*="monetag"],[class*="monetag"],[id*="adsgram"],[class*="adsgram"],'+
          'iframe[src*="libtl"],iframe[src*="monetag"],iframe[src*="otieu"],iframe[src*="adsgram"]'
        ).length;
      }catch(e2){}
    }
    try{
      var all = document.body ? document.body.children : [];
      for(var i=0;i<all.length;i++){
        var el = all[i];
        try{
          var st = window.getComputedStyle(el);
          if(!st) continue;
          var z = parseInt(st.zIndex,10);
          if((st.position==="fixed"||st.position==="absolute") && !isNaN(z) && z>=999){
            var r = el.getBoundingClientRect();
            if(r.width > window.innerWidth*0.6 && r.height > window.innerHeight*0.4) n++;
          }
        }catch(e3){}
      }
    }catch(e){}
    try{ n += document.querySelectorAll("iframe").length; }catch(e){}
    return n;
  }
  function disarm(){
    if(!armed) return;
    armed = false;
    try{ document.removeEventListener("visibilitychange", onVis); }catch(e){}
    try{ window.removeEventListener("focus", onFocus); }catch(e){}
    try{ window.removeEventListener("pageshow", onFocus); }catch(e){}
    try{ window.removeEventListener("blur", onBlur); }catch(e){}
    try{ document.removeEventListener("pointerdown", onPointer, true); }catch(e){}
    if(pollTimer){ try{ clearInterval(pollTimer); }catch(e){} pollTimer=null; }
    if(mo){ try{ mo.disconnect(); }catch(e){} mo=null; }
  }
  function fire(){
    if(!armed) return;
    disarm();
    try{ if(onSuccess) onSuccess(); }catch(e){}
  }
  function onBlur(){ if(armed) sawHidden = true; }
  function onVis(){
    if(!armed) return;
    try{
      if(document.visibilityState === "hidden"){ sawHidden = true; return; }
      if(document.visibilityState === "visible" && watchedLongEnough() && (sawHidden || sawOverlay)) fire();
    }catch(e){}
  }
  function onFocus(){
    if(!armed) return;
    if(watchedLongEnough() && (sawHidden || sawOverlay)) fire();
  }
  function onPointer(){
    if(!armed || !watchedLongEnough()) return;
    // Continue / close tap — overlay starts closing; check in ~100ms
    setTimeout(function(){
      if(!armed) return;
      var now = countAdLayers();
      if(sawOverlay && now < peakLayers) fire();
      else if(sawHidden) fire();
    }, 100);
  }
  function arm(){
    if(armed) return;
    armed = true;
    adShownAt = Date.now();
    sawHidden = false;
    sawOverlay = false;
    peakLayers = 0;
    try{ document.addEventListener("visibilitychange", onVis); }catch(e){}
    try{ window.addEventListener("focus", onFocus); }catch(e){}
    try{ window.addEventListener("pageshow", onFocus); }catch(e){}
    try{ window.addEventListener("blur", onBlur); }catch(e){}
    try{ document.addEventListener("pointerdown", onPointer, true); }catch(e){}
    try{
      mo = new MutationObserver(function(){
        if(!armed) return;
        var n = countAdLayers();
        if(n > peakLayers){ peakLayers = n; if(n > 0) sawOverlay = true; }
        if(watchedLongEnough() && sawOverlay && n < Math.max(1, peakLayers)) fire();
      });
      mo.observe(document.documentElement, { childList:true, subtree:true });
    }catch(e){}
    // 100ms poll — critical for TG WebView where events often don't fire
    var polls = 0;
    pollTimer = setInterval(function(){
      polls++;
      if(!armed || polls > 250){ if(pollTimer){ clearInterval(pollTimer); pollTimer=null; } return; }
      var n = countAdLayers();
      if(n > peakLayers){ peakLayers = n; if(n > 0) sawOverlay = true; }
      if(!watchedLongEnough()) return;
      if(sawOverlay && n < Math.max(1, peakLayers)){ fire(); return; }
      if(sawHidden){
        try{ if(document.visibilityState === "visible"){ fire(); return; } }catch(e){}
      }
    }, 100);
  }
  return {
    arm: arm,
    disarm: disarm,
    watchedLongEnough: watchedLongEnough,
    getShownAt: function(){ return adShownAt; }
  };
}

function playAdsgram(blockId, onDone, onFail){
  blockId = String(blockId||"").trim();
  if(!blockId || !isValidAdsgramBlockId(blockId)){
    toast(t("Admin has not configured this Ad Block ID"));
    if(onFail) onFail();
    return;
  }
  var loadToastTimer = null;
  var finished = false;
  var guard = createAdReturnGuard(function(){ finish(true); }, 5500);
  function clearLoadToast(){
    if(loadToastTimer){ clearTimeout(loadToastTimer); loadToastTimer=null; }
  }
  function finish(ok){
    if(finished) return;
    finished = true;
    clearLoadToast();
    try{ guard.disarm(); }catch(e){}
    if(ok){
      try{ if(onDone) onDone(); }catch(e){ console.warn(e); }
    } else {
      toast(t("Ad was not completed. Try again."));
      try{ if(onFail) onFail(); }catch(e){ console.warn(e); }
    }
  }
  function tryShow(){
    if(window.Adsgram && typeof window.Adsgram.init==="function"){
      try{
        var ad = window.Adsgram.init({blockId:String(blockId), debug:!!cfg.adsgramDebug});
        loadToastTimer = setTimeout(function(){
          if(!finished) toast(t("Ad loading…"));
        }, 800);
        guard.arm();
        ad.show().then(function(){ finish(true); }).catch(function(){
          // Early close / no-fill — only reward if user watched long enough (TG WebView quirk)
          if(guard.watchedLongEnough()) finish(true);
          else finish(false);
        });
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
      try{ guard.disarm(); }catch(e){}
      if(!finished){
        finished = true;
        toast(t("Ad failed to load. Try again."));
        try{ if(onFail) onFail(); }catch(e){ console.warn(e); }
      }
    });
}

function playMonetag(zoneId, onDone, onFail){
  var raw = String(zoneId||"").trim();
  if(!raw){ toast(t("Admin has not configured this Ad Block ID")); if(onFail) onFail(); return; }
  var id = raw.replace(/^show_/i,"");
  var fnName = "show_"+id;
  var loadToastTimer = null;
  var finished = false;
  var guard = createAdReturnGuard(function(){ finish(true); }, 5500);
  function clearLoadToast(){ if(loadToastTimer){ clearTimeout(loadToastTimer); loadToastTimer=null; } }
  function finish(ok){
    if(finished) return;
    finished = true;
    clearLoadToast();
    try{ guard.disarm(); }catch(e){}
    if(ok){
      try{ if(onDone) onDone(); }catch(e){}
    } else {
      toast(t("Ad was not completed. Try again."));
      try{ if(onFail) onFail(); }catch(e){}
    }
  }
  function tryShow(){
    if(typeof window[fnName]==="function"){
      try{
        guard.arm();
        var p = window[fnName]();
        if(p && typeof p.then==="function"){
          p.then(function(){ finish(true); }).catch(function(){
            if(guard.watchedLongEnough()) finish(true);
            else finish(false);
          });
        } else {
          setTimeout(function(){ finish(true); }, 300);
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
    try{ guard.disarm(); }catch(e){}
    playLinkAd({network:"monetag", id:id}, onDone, onFail);
  }, 1500);
}

function playTads(widgetId, onDone, onFail){
  var id = String(widgetId||"").trim();
  if(!id){ toast(t("Admin has not configured this Ad Block ID")); if(onFail) onFail(); return; }
  var finished = false;
  var guard = createAdReturnGuard(function(){ finish(true); }, 5500);
  function finish(ok){
    if(finished) return;
    finished = true;
    try{ guard.disarm(); }catch(e){}
    if(ok){
      try{ if(onDone) onDone(); }catch(e){}
    } else {
      toast(t("Ad was not completed. Try again."));
      try{ if(onFail) onFail(); }catch(e){}
    }
  }
  if(window.TADS && typeof window.TADS.show==="function"){
    try{
      guard.arm();
      window.TADS.show(id).then(function(){ finish(true); }).catch(function(){
        if(guard.watchedLongEnough()) finish(true);
        else finish(false);
      });
      return;
    }catch(e){}
  }
  try{ guard.disarm(); }catch(e){}
  playLinkAd({network:"tads", id:id}, onDone, onFail);
}


function playSingleAdUnit(unit, onDone, onFail){
  var net = String((unit&&unit.network)||"adsgram").toLowerCase();
  var id = String((unit&&unit.id)||"").trim();
  if(!id){ if(onFail) onFail(); return; }
  var doneOnce = false;
  function ok(){ if(doneOnce) return; doneOnce=true; try{ if(onDone) onDone(); }catch(e){} }
  function fail(){ if(doneOnce) return; doneOnce=true; try{ if(onFail) onFail(); }catch(e){} }
  try{
    if(net==="adsgram"){ playAdsgram(id, ok, fail); return; }
    if(net==="monetag"){ playMonetag(id, ok, fail); return; }
    if(net==="tads"){ playTads(id, ok, fail); return; }
    playLinkAd({network:net, id:id}, ok, fail);
  }catch(e){ fail(); }
}

function playAdNetwork(slot, onDone){
  var list = normalizeSlotNetworks(slot);
  if(!list.length){
    // legacy single fields
    if(slot && String(slot.id||"").trim()){
      list = [{ network: String(slot.network||"adsgram").toLowerCase(), id: String(slot.id).trim() }];
    }
  }
  // Drop invalid Adsgram block ids (e.g. internal task_… ids) so waterfall can use Monetag/others
  list = list.filter(function(u){
    if(!u) return false;
    var net = String(u.network||"adsgram").toLowerCase();
    var id = String(u.id||"").trim();
    if(!id) return false;
    if(net==="adsgram" && typeof isValidAdsgramBlockId==="function" && !isValidAdsgramBlockId(id)) return false;
    return true;
  });
  if(!list.length){ toast(t("Admin has not configured this Ad Block ID")); return; }

  var mode = String((slot&&slot.mode)||"first").toLowerCase();

  // Single network → direct play; onFail clears task pending so Start can be retried cleanly
  if(list.length===1 && mode!=="sequential" && mode!=="sequence" && mode!=="all"){
    var u = list[0];
    var net = String(u.network||"adsgram").toLowerCase();
    var id = String(u.id||"").trim();
    var failOne = function(){
      try{ if(window.__cinehub_pendingTask!=null) window.__cinehub_pendingTask=null; }catch(e){}
    };
    if(net==="adsgram"){ playAdsgram(id, onDone, failOne); return; }
    if(net==="monetag"){ playMonetag(id, onDone, failOne); return; }
    if(net==="tads"){ playTads(id, onDone, failOne); return; }
    playLinkAd(u, onDone, failOne);
    return;
  }

  if(mode==="sequential" || mode==="sequence" || mode==="all"){
    var i=0;
    function next(){
      if(i>=list.length){ if(onDone) onDone(); return; }
      var unit=list[i++];
      if(list.length>1) toast(t("Ad")+" "+i+"/"+list.length+" · "+String(unit.network||"").toUpperCase());
      playSingleAdUnit(unit, function(){ next(); }, function(){ next(); });
    }
    next();
    return;
  }

  // first-load wins: try each until success
  var j=0;
  function tryNext(){
    if(j>=list.length){
      toast(t("Ad failed to load. Try again."));
      return;
    }
    var unit=list[j++];
    if(list.length>1) toast(String(unit.network||"").toUpperCase()+"…");
    playSingleAdUnit(unit, function(){ if(onDone) onDone(); }, function(){ tryNext(); });
  }
  tryNext();
}

// Ad counters (kept separate on purpose):
// • ads_today  = ONLY "Watch Ad Now" → Daily Limit / Ads Watched / Remaining
// • ads_total  = all ads (rewarded + unlock + task) for admin lifetime stats
// Task / unlock must NOT bump ads_today.
function bumpAdCounters(opts){
  opts = opts || {};
  try{ resetDailyAdsIfNeeded(); }catch(e){}
  if(!userData) userData={};
  var today=new Date().toDateString();
  if(!userData.ads_day) userData.ads_day=today;
  if(opts.countDaily){
    userData.ads_today=Number(userData.ads_today||0)+1;
    userData.ads_day=today;
  }
  if(opts.countTotal !== false){
    userData.ads_total=Number(userData.ads_total||0)+1;
  }
  return {
    ads_today:Number(userData.ads_today||0),
    ads_total:Number(userData.ads_total||0),
    ads_day:userData.ads_day
  };
}

function resetDailyAdsIfNeeded(){
  const mode=String(cfg.dailyAdResetMode||"midnight");
  const today=new Date().toDateString();
  const stored=(userData&&userData.ads_day)||"";
  if(mode==="midnight"){
    if(stored && stored!==today){
      if(userData){userData.ads_today=0;userData.ads_day=today;}
      if(window.CineHubFB) try{window.CineHubFB.updateUserField(null,{ads_today:0,ads_day:today});}catch(e){}
    }
  } else if(mode==="minutes"){
    const start=Number((userData&&userData.ads_cycle_start)||0);
    const m=Number(cfg.dailyAdResetMinutes||60);
    if(!start){
      if(userData) userData.ads_cycle_start=Date.now();
      if(window.CineHubFB) try{window.CineHubFB.updateUserField(null,{ads_cycle_start:Date.now()});}catch(e){}
    } else if((Date.now()-start)/60000 >= m){
      if(userData){userData.ads_today=0;userData.ads_cycle_start=Date.now();}
      if(window.CineHubFB) try{window.CineHubFB.updateUserField(null,{ads_today:0,ads_cycle_start:Date.now()});}catch(e){}
    }
  } else {
    const start=Number((userData&&userData.ads_cycle_start)||0);
    const h=Number(cfg.dailyAdResetHours||24);
    if(!start){
      // Cycle never started (new user, or switched from midnight mode) — start counting from now
      if(userData) userData.ads_cycle_start=Date.now();
      if(window.CineHubFB) try{window.CineHubFB.updateUserField(null,{ads_cycle_start:Date.now()});}catch(e){}
    } else if((Date.now()-start)/3600000 >= h){
      if(userData){userData.ads_today=0;userData.ads_cycle_start=Date.now();}
      if(window.CineHubFB) try{window.CineHubFB.updateUserField(null,{ads_today:0,ads_cycle_start:Date.now()});}catch(e){}
    }
  }
}
// While the "Cine Hub" earning page is open, keep checking the admin-configured
// reset window (minutes/hours/midnight) and auto-flip Ads Watched/Remaining back
// to 0/full the moment it elapses — without requiring the user to leave and
// reopen the page or tap Watch Ad Now first.
function tasksLiveResetTick_(){
  try{
    if(state.page!=="tasks") return;
    const before=Number((userData&&userData.ads_today)||0);
    resetDailyAdsIfNeeded();
    const watched=Number((userData&&userData.ads_today)||0);
    const limit=Number(cfg.dailyAdLimit||20);
    const rem=Math.max(0,limit-watched);
    if(watched!==before){
      paintProgressInstant({watched:watched, remaining:rem, limit:limit});
    }
  }catch(e){}
}
if(!window.__tasksLiveResetPoll){
  window.__tasksLiveResetPoll=setInterval(tasksLiveResetTick_, 3000);
}
function adCooldownKeyForMode(mode){
  if(mode==="adult") return "adult";
  if(mode==="task") return "task";
  if(mode==="unlock") return "unlock";
  if(mode==="banner") return "banner";
  if(mode==="bannerAdult") return "bannerAdult";
  if(mode==="interstitial") return "interstitial";
  return "rewarded";
}
// Admin encoding: "0" = no delay, "0" + digits = that many SECONDS (e.g. "010" = 10s),
// plain digits with no leading 0 = that many MINUTES (e.g. "5" = 5 minutes).
function parseAdCooldownMs(raw){
  const s=String(raw==null?"":raw).trim();
  if(!s || s==="0") return 0;
  if(s.charAt(0)==="0" && s.length>1){
    const secs=parseInt(s.slice(1),10);
    return (isFinite(secs)&&secs>0) ? secs*1000 : 0;
  }
  const mins=parseInt(s,10);
  return (isFinite(mins)&&mins>0) ? mins*60000 : 0;
}
function getAdCooldownMs(key){
  try{
    const slots=cfg.adSlots||{};
    const raw=slots[key]&&slots[key].cooldown;
    return parseAdCooldownMs(raw);
  }catch(e){ return 0; }
}
function markAdCooldown(key){
  try{ localStorage.setItem("cinehub4_adcd_"+key, String(Date.now())); }catch(e){}
}
function formatCooldownRemain(ms){
  const totalSec=Math.max(1, Math.ceil(ms/1000));
  if(totalSec<60) return totalSec+t(" second(s)");
  return Math.ceil(totalSec/60)+t(" minute(s)");
}
// Instant DOM paint after ad reward — no full page rebuild
function paintProgressInstant(opts){
  try{
    opts=opts||{};
    if(opts.points!=null){
      document.querySelectorAll("[data-live-points], .live-points, .my-points-val").forEach(function(el){
        el.textContent=String(opts.points);
      });
    }
    if(opts.watched!=null){
      document.querySelectorAll("[data-live-watched]").forEach(function(el){
        el.textContent=String(opts.watched);
      });
    }
    if(opts.remaining!=null){
      document.querySelectorAll("[data-live-remaining]").forEach(function(el){
        el.textContent=String(opts.remaining);
      });
    }
    if(opts.limit!=null && opts.watched!=null){
      var pctE = opts.limit>0 ? Math.min(100,(opts.watched/opts.limit)*100) : 0;
      document.querySelectorAll("[data-live-earn-bar]").forEach(function(el){
        el.style.width=pctE+"%";
        el.style.transition="width .2s ease";
      });
      document.querySelectorAll("[data-live-earn-txt]").forEach(function(el){
        el.textContent=opts.watched+" / "+opts.limit+" "+t("completed today");
      });
    }
    if(opts.adProg!=null && opts.needAds!=null){
      document.querySelectorAll("[data-live-ads]").forEach(function(el){
        el.textContent=opts.adProg+"/"+opts.needAds;
      });
      var pct = opts.needAds>0 ? Math.min(100, (opts.adProg/opts.needAds)*100) : 0;
      document.querySelectorAll("[data-live-ads-bar]").forEach(function(el){
        el.style.width=pct+"%";
        el.style.transition="width .15s ease";
      });
    }
    // Task row: status text + swap Start → Done
    if(opts.taskIndex!=null){
      var ti=String(opts.taskIndex);
      var finished=!!opts.taskFinished;
      var stLabel="";
      if(opts.taskStatusText) stLabel=opts.taskStatusText;
      else if(finished) stLabel=t("Done");
      document.querySelectorAll('[data-live-task-status="'+ti+'"]').forEach(function(el){
        if(opts.taskReward!=null) el.textContent=t("Reward")+": "+opts.taskReward+" pt · "+(finished?t("Done"):(opts.taskCount!=null&&opts.taskLimit!=null?(opts.taskCount+"/"+opts.taskLimit):stLabel));
        else if(stLabel) el.textContent=el.textContent.replace(/·.*$/," · "+stLabel);
      });
      document.querySelectorAll('[data-live-task-btn="'+ti+'"]').forEach(function(btn){
        if(finished){
          btn.className="task-done";
          btn.disabled=true;
          btn.textContent=t("Done");
          btn.removeAttribute("onclick");
        }
      });
      document.querySelectorAll('[data-task-row="'+ti+'"]').forEach(function(row){
        if(finished) row.classList.add("done");
      });
    }
    // Force Telegram WebView to paint immediately (otherwise numbers lag until next frame)
    try{ void document.body.offsetHeight; }catch(e){}
    try{ window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback && window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"); }catch(e){}
  }catch(e){}
}

function watchAd(mode){
  resetDailyAdsIfNeeded();

  loadSharedSettings();
  const slot = resolveAdSlot(mode);
  if(!slotHasAds(slot) && mode!=="countdown"){ toast(t("Admin has not configured this Ad Block ID")); return; }

  // Per-ad-system cooldown: block until the configured delay has passed since the last ad.
  // For a "task" ad, each task can have its own separate cooldown (falls back to the
  // shared "task" ad slot cooldown when the task doesn't set one of its own).
  let cdKey = adCooldownKeyForMode(mode);
  let cdMs = getAdCooldownMs(cdKey);
  if(mode==="task" && window.__cinehub_pendingTask!=null){
    try{
      const tks=getTasks();
      const tk0=tks[window.__cinehub_pendingTask];
      if(tk0){
        const tid=String(tk0.id||("t"+window.__cinehub_pendingTask)).replace(/[^a-zA-Z0-9_]/g,"");
        cdKey="task_"+tid;
        const perTaskMs=parseAdCooldownMs(tk0.cooldown);
        if(perTaskMs>0) cdMs=perTaskMs;
      }
    }catch(e){}
  }
  if(cdMs>0){
    const last = Number(localStorage.getItem("cinehub4_adcd_"+cdKey))||0;
    const remain = cdMs - (Date.now()-last);
    if(remain>0){
      toast(t("Please try again after")+" "+formatCooldownRemain(remain));
      return;
    }
  }

  // Daily earning limit only for "Watch Ad Now" (rewarded).
  // Unlock / adult unlock / Daily Tasks use their own limits — not blocked by ads_today.
  if(mode!=="unlock" && mode!=="adult" && mode!=="task"){
    const watched=Number((userData&&userData.ads_today)||0);
    const limit=Number(cfg.dailyAdLimit||20);
    if(watched>=limit){toast(t("Daily ad limit reached"));return}
  }

  function onAdDone(){
    // Update progress FIRST (instant UI), heavy save/render deferred
    if(mode==="unlock" || mode==="adult"){
      // Lifetime total only — does NOT touch Daily Limit / Ads Watched (earning UI)
      try{ bumpAdCounters({ countDaily:false, countTotal:true }); }catch(e){}
      const mid=state.detailId;
      if(!mid){toast(t("Open a movie first"));return;}
      loadSharedSettings();
      const needAds=getUnlockRules(mid).adsNeed;
      let adProg=getAdUnlockProgress(mid)+1;
      adProg=setAdUnlockProgress(mid, adProg);
      try{ paintProgressInstant({adProg:adProg, needAds:needAds, points:state.points}); }catch(e){}
      markAdCooldown(cdKey);
      toast("+1 "+t("ad progress")+" ("+adProg+"/"+needAds+")");
      var unlocked=false;
      try{ unlocked=tryCompleteUnlock(mid); }catch(e){}
      setTimeout(function(){
        try{ save(); }catch(e){}
        try{ render(false); }catch(e){}
      }, unlocked?50:100);
      return;
    }
    markAdCooldown(cdKey);
    // Task ad → complete that task (reward from task, not generic ad reward)
    if(mode==="task" && window.__cinehub_pendingTask!=null){
      // Lifetime total only — task Done must not raise "X / Y completed today"
      try{ bumpAdCounters({ countDaily:false, countTotal:true }); }catch(e){}
      const ti=window.__cinehub_pendingTask;
      window.__cinehub_pendingTask=null;
      const tk=getTasks()[ti];
      if(tk){
        const st2=taskResetInfo(ti,tk);
        const next=st2.count+1;
        const willFinish=next>=st2.limit;
        if(tk.rewardOnce){
          if(willFinish){
            state.points+=Number(tk.reward||0);
            if(userData) userData.points=state.points;
          }
        }else{
          state.points+=Number(tk.reward||0);
          if(userData) userData.points=state.points;
        }
        const finished=markTaskProgress(ti,tk);
        try{
          paintProgressInstant({
            points:state.points,
            taskIndex:ti,
            taskCount:next,
            taskLimit:st2.limit,
            taskFinished:finished,
            taskReward:tk.reward
          });
        }catch(e){}
        if(tk.rewardOnce){
          if(finished) toast("+"+(tk.reward||0)+" points · "+t("Done"));
          else toast(t("Ad progress")+" "+next+"/"+st2.limit);
        }else{
          toast("+"+(tk.reward||0)+" points"+(finished?" · "+t("Done"):" · "+t("Progress")));
        }
        setTimeout(function(){
          try{ save(); }catch(e){}
          try{ render(false); }catch(e){}
        }, 80);
        return;
      }
    }
    // Watch Ad Now (rewarded) — ONLY this bumps Daily Limit / Ads Watched / Remaining
    try{ bumpAdCounters({ countDaily:true, countTotal:true }); }catch(e){}
    const reward=Number(cfg.adReward||2);
    state.points+=reward;
    if(userData) userData.points=state.points;
    const watched=Number((userData&&userData.ads_today)||0);
    const limit=Number(cfg.dailyAdLimit||20);
    const rem=Math.max(0,limit-watched);
    try{
      paintProgressInstant({
        points:state.points,
        watched:watched,
        remaining:rem,
        limit:limit
      });
    }catch(e){}
    toast("+"+reward+" "+t("points added"));
    setTimeout(function(){
      try{ save(); }catch(e){}
      try{ render(false); }catch(e){}
    }, 60);
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
    const bar=document.querySelector(".search-bar-wrap");
    if(mic){mic.classList.add("listening");mic.style.background="#ef4444";mic.style.color="#fff";}
    if(bar) bar.classList.add("listening");
    r.onresult=function(ev){
      const t=(ev.results[0]&&ev.results[0][0]&&ev.results[0][0].transcript)||"";
      state.query=t;
      const q=document.getElementById("q");
      if(q) q.value=t;
      if(state.page==="adultSearch") doAdultSearch(); else doSearch();
    };
    r.onerror=function(){toast("Voice failed");if(mic){mic.classList.remove("listening");mic.style.background="";mic.style.color=""} if(bar) bar.classList.remove("listening");};
    r.onend=function(){if(mic){mic.classList.remove("listening");mic.style.background="";mic.style.color=""} if(bar) bar.classList.remove("listening");};
    r.start();
    toast("Listening...");
  }catch(e){toast("Voice error")}
}
function doSearch(){
  const q=document.getElementById("q");
  state.query=q?q.value:state.query||"";
  state.page="search";
  localStorage.setItem("cinehub4_page","search");
  // Live update without heavy page-enter animation
  render(false);
}
function liveSearchInput(el){
  try{
    state.query = el ? String(el.value||"") : "";
    state.page = "search";
    // Keep focus: only re-render results container if present
    var box = document.getElementById("searchResults");
    if(box){
      box.innerHTML = searchResultsHTML();
      return;
    }
    render(false);
    setTimeout(function(){
      var inp=document.getElementById("q");
      if(inp){ try{ inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);}catch(e){} }
    }, 30);
  }catch(e){ doSearch(); }
}
function movieMatchesQuery(m, q){
  if(!q) return true;
  q = String(q).toLowerCase().trim();
  if(!q) return true;
  var title = String((m&&m.title)||"").toLowerCase();
  var genre = String((m&&m.genre)||"").toLowerCase();
  var cat = String((m&&m.category)||"").toLowerCase();
  var year = String((m&&m.year)||"");
  // one character match + flexible (ignore spaces)
  var compact = title.replace(/\s+/g,"");
  var qCompact = q.replace(/\s+/g,"");
  return title.includes(q) || compact.includes(qCompact) || genre.includes(q) || cat.includes(q) || year.includes(q);
}
function searchResultsHTML(){
  var q = (state.query||"").toLowerCase().trim();
  var list = (movies||[]).filter(function(m){ return !m.adult; });
  if(q) list = list.filter(function(m){ return movieMatchesQuery(m, q); });
  // Prefer stronger title prefix matches first
  if(q){
    list = list.slice().sort(function(a,b){
      var ta=String(a.title||"").toLowerCase(), tb=String(b.title||"").toLowerCase();
      var pa=ta.indexOf(q), pb=tb.indexOf(q);
      if(pa!==pb) return (pa<0?999:pa)-(pb<0?999:pb);
      return ta.localeCompare(tb);
    });
  }
  if(!list.length){
    return q
      ? `<div class="empty search-empty">${t("No movies found")}</div>`
      : `<div class="empty search-empty muted">${t("Search movies...")}</div>`;
  }
  return list.map(function(m){ return searchResultRow(m); }).join("");
}
function searchResultRow(m){
  var title = String((m.title||"").split("|")[0]).trim().replace(/</g,"");
  var sid = JSON.stringify(String(m.id));
  var poster = (m.poster||m.poster_path||"").replace(/"/g,"&quot;");
  var thumb = poster
    ? `<img class="sr-thumb" src="${poster}" alt="" loading="lazy" onerror="this.classList.add('broken')">`
    : `<div class="sr-thumb sr-thumb-fallback">${ico("film",28)}</div>`;
  var kind = m.adult ? "ADULT" : "MOVIE";
  return `<button type="button" class="sr-row" onclick='detail(${sid})'>
    ${thumb}
    <div class="sr-meta">
      <div class="sr-title">${title}</div>
      <div class="sr-kind">${kind}</div>
    </div>
  </button>`;
}
function searchPage(){
  return `<div class="search-top">
    <button type="button" class="menu-ham" id="hamBtn">☰</button>
    <div class="search-bar-wrap">
      <input id="q" type="search" placeholder="${t("Search movies...")}" value="${(state.query||"").replace(/"/g,"&quot;")}"
        oninput="liveSearchInput(this)" onkeydown="if(event.key==='Enter'){event.preventDefault();doSearch();}">
      <button type="button" class="mic-btn" id="micBtn" title="Voice search" aria-label="Voice search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2"/><path d="M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button type="button" class="search-go" onclick="doSearch()" aria-label="Search">${ico("search",18)}</button>
    </div>
  </div>
  <div id="searchResults" class="search-results">${searchResultsHTML()}</div>`;
}
window.liveSearchInput = liveSearchInput;
window.doSearch = doSearch;



function closeDrawer(){
  const d=document.getElementById("drawer");
  if(d) d.classList.add("hidden");
}
function resolveAssetUrl(url){
  url=String(url||"").trim();
  if(!url) return "";
  if(/^https?:\/\//i.test(url) || /^data:/i.test(url) || /^blob:/i.test(url)) return url;
  try{ return new URL(url, location.href).href; }catch(e){}
  try{
    var base=(location.origin||"")+(location.pathname||"/").replace(/[^\/]+$/,"");
    return base+url.replace(/^\.\//,"");
  }catch(e2){}
  return url;
}
function applyDrawerBrand(){
  try{
    loadSharedSettings();
    var bn=false;
    try{ bn=typeof langIsBn==="function"?langIsBn():false; }catch(e){}
    var title;
    if(bn){
      title = (cfg && cfg.menuTitleBn) || (cfg && cfg.appNameBn) || (cfg && cfg.menuTitle) || (cfg && cfg.appName) || "Cine Hub4 মেনু";
    }else{
      title = (cfg && cfg.menuTitle) || (cfg && cfg.appName ? (String(cfg.appName)+" Menu") : "Cine Hub4 Menu");
    }
    var logoRaw = (cfg && cfg.menuLogoUrl) || "assets/logo.jpg";
    var candidates = [];
    if(logoRaw) candidates.push(resolveAssetUrl(logoRaw));
    candidates.push(resolveAssetUrl("assets/logo.jpg"));
    candidates.push(resolveAssetUrl("assets/logo.png"));
    if(typeof CINEHUB_LOGO_DATA==="string" && CINEHUB_LOGO_DATA) candidates.push(CINEHUB_LOGO_DATA);
    // unique
    candidates = candidates.filter(function(u,i,a){ return u && a.indexOf(u)===i; });
    var elT = document.getElementById("drawerTitle");
    var elL = document.getElementById("drawerLogo");
    var elF = document.getElementById("drawerLogoFallback");
    if(elT) elT.textContent = title;
    var initials = String((cfg&&cfg.appName)||"CH").trim().split(/\s+/).map(function(w){return w.charAt(0);}).join("").slice(0,2).toUpperCase() || "CH";
    if(elF) elF.textContent = initials;
    function showFallback(){
      if(elL) elL.style.display="none";
      if(elF) elF.style.display="grid";
    }
    function showLogo(){
      if(elL) elL.style.display="";
      if(elF) elF.style.display="none";
    }
    if(elL && candidates.length){
      var idx=0;
      elL.onload=function(){ showLogo(); };
      elL.onerror=function(){
        idx++;
        if(idx<candidates.length){ elL.src=candidates[idx]; }
        else showFallback();
      };
      elL.src=candidates[0];
    } else {
      showFallback();
    }
  }catch(e){}
}
function openDrawer(){
  try{ applyDrawerBrand(); }catch(e){}
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
      try{applyDrawerBrand()}catch(e){}
      syncLangButtons();
      window.__cinehub_langSwitching = false;
      // Soft toast only (no layout shift)
      toast(lang==="bn"?"ভাষা: বাংলা":"Language: English");
    };
  });
  syncLangButtons();
}


/* Facebook-style: hide bottom nav on scroll down, show on scroll up */
(function setupBottomNavScroll(){
  var lastY=0, ticking=false, hidden=false;
  function apply(hide){
    var bn=document.getElementById("bottomNav");
    if(!bn) return;
    if(hide && !hidden){ bn.classList.add("bn-hide"); hidden=true; }
    else if(!hide && hidden){ bn.classList.remove("bn-hide"); hidden=false; }
  }
  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
    var dy=y-lastY;
    if(y<40){ apply(false); }
    else if(dy>6){ apply(true); }
    else if(dy<-6){ apply(false); }
    lastY=y;
    ticking=false;
  }
  function req(){
    if(!ticking){ ticking=true; requestAnimationFrame(onScroll); }
  }
  window.addEventListener("scroll", req, {passive:true});
  document.addEventListener("scroll", req, {passive:true, capture:true});
  document.addEventListener("touchstart", function(e){
    var bn=document.getElementById("bottomNav");
    if(bn && e.target && bn.contains(e.target)) apply(false);
  }, {passive:true});
})();


function markDrawerActive(){
  try{
    const page=state.page==="detail"?"movies":(state.page==="adultSearch"?"adult":state.page);
    document.querySelectorAll("#drawer button[data-page]").forEach(function(b){
      const p=b.getAttribute("data-page");
      if(p===page){ b.classList.add("active"); b.classList.add("is-active"); }
      else { b.classList.remove("active"); b.classList.remove("is-active"); }
    });
    // bottom nav too
    document.querySelectorAll("#bottomNav button[data-page], #bottomNav .nav-item").forEach(function(b){
      const p=b.getAttribute("data-page");
      if(!p) return;
      if(p===page || (page==="home" && p==="movies") || (page==="detail" && p==="movies") || (page==="adultSearch" && p==="adult")){
        b.classList.add("active"); b.classList.add("is-active");
      } else {
        b.classList.remove("active"); b.classList.remove("is-active");
      }
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
  // Only server-verified admin (adminCheck). Never trust client-only session alone.
  try{
    return window.__IS_ADMIN === true;
  }catch(e){ return false; }
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
        try{ sessionStorage.removeItem("cinehub4_is_admin"); localStorage.removeItem("cinehub4_admin_session"); }catch(e){}
      }
      try{setupAdminButton()}catch(e){}
      try{checkMaintenanceGate()}catch(e){}
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
      try{ checkMaintenanceGate(); }catch(e){}
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
    const isAdm = (typeof isAdminUser==="function") ? isAdminUser() : false;
    // Profile page admin wrap
    const wrap=document.getElementById("adminPanelWrap");
    const btn=document.getElementById("adminPanelBtn");
    // Drawer admin button (may share id — query all)
    const drawerBtns=document.querySelectorAll("#drawer #adminPanelBtn, #drawer button.admin-only, button.admin-only");
    if(isAdm){
      if(wrap){ wrap.style.display="block"; }
      if(btn){
        btn.classList.remove("hidden");
        btn.style.display="flex";
        btn.onclick=function(e){ e.preventDefault(); location.href="admin.html"; };
      }
      drawerBtns.forEach(function(b){
        b.style.display="flex";
        b.classList.remove("hidden");
        b.onclick=function(e){ e.preventDefault(); location.href="admin.html"; };
      });
    }else{
      if(wrap){ wrap.style.display="none"; }
      if(btn){ btn.style.display="none"; btn.classList.add("hidden"); }
      drawerBtns.forEach(function(b){
        b.style.display="none";
        b.classList.add("hidden");
      });
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
try{ persistPage(); }catch(e){}
/* Blocked users never see normal UI */
if(window.__cinehub_blocked){ return; }
/* Users blocked by Maintenance Mode never see normal UI */
if(window.__cinehub_maintenance){ return; }
/* Skip paints while splash is covering the screen (prevents open-time jerk) */
if(window.__cinehub_splashUp && !window.__cinehub_forcePaint){ window.__cinehub_needPaint=true; return; }
try{const views={movies:moviesPage,search:searchPage,series,adult,adultSearch:adultSearchPage,profile,points,tasks,settings,buy,detail:detailView,home:moviesPage};const screen=$("#screen");if(!screen){console.error("no #screen");return}const fn=views[state.page]||moviesPage;let html="";try{html=fn()}catch(err){html="<div class=\"panel\" style=\"padding:16px;color:#f88\"><b>Page error</b><pre style=\"font-size:11px;white-space:pre-wrap\">"+String(err.message||err)+"</pre></div>";console.error(err)}screen.innerHTML=html;if(animate && !state.firstPaint && !window.__cinehub_noAnim){screen.classList.remove("page-enter");void screen.offsetWidth;screen.classList.add("page-enter")}$$(".nav-item").forEach(b=>{
  (function(){
  var navPage = state.page;
  if(state.page==="detail"){
    var dm = movies.find(function(x){ return String(x.id)===String(state.detailId); });
    navPage = (dm && dm.adult) ? "adult" : "movies";
  }
  if(state.page==="adultSearch") navPage = "adult";
  b.classList.toggle("active", b.dataset.page===state.page || b.dataset.page===navPage);
})();
  if(b.dataset.page==="adult"){
    const off = (cfg.adultEnabled===false || cfg.adultLibraryEnabled===false);
    b.style.display = off ? "none" : "";
    b.classList.toggle("nav-hidden", !!off);
    const bn = document.getElementById("bottomNav");
    if(bn) bn.classList.toggle("adult-off", !!off);
    if(off && state.page==="adult"){ state.page="movies"; }
  }
});bindPageBack();bindDrawer();try{markDrawerActive();}catch(e){}setupAdminButton();window.CINEHUB4_LANG?.translateDOM();
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
    // Ask Telegram for permission to DM the user (join-bonus / task messages).
    // On first grant, Telegram itself inserts "You allowed this bot to message
    // you when you logged in on <app> app." into the chat — same as PRIME nCENE.
    try{ if(tg.requestWriteAccess) tg.requestWriteAccess(function(){}); }catch(e){}
    try{tg.setBackgroundColor&&tg.setBackgroundColor("#07090f")}catch(e){}
    try{tg.setBottomBarColor&&tg.setBottomBarColor("#0c101c")}catch(e){}
    try{if(tg.disableVerticalSwipes)tg.disableVerticalSwipes()}catch(e){}
  }
}catch(e){}
if($("#backBtn"))$("#backBtn").onclick=()=>goBack();
$$(".nav-item").forEach(b=>b.onclick=()=>nav(b.dataset.page));
  try{paintStaticIcons()}catch(e){}
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


function welcomeSeenKey(){
  var uid="";
  try{
    var tg=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initDataUnsafe&&window.Telegram.WebApp.initDataUnsafe.user;
    if(tg&&tg.id) uid=String(tg.id);
  }catch(e){}
  return "cinehub4_welcome_seen_"+(uid||"guest");
}
function hasSeenWelcome(){
  try{ return localStorage.getItem(welcomeSeenKey())==="1"; }catch(e){ return false; }
}
function markWelcomeSeen(){
  try{ localStorage.setItem(welcomeSeenKey(),"1"); }catch(e){}
}
function closeWelcomePopup(){
  var el=document.getElementById("welcomePopup");
  if(el){
    el.classList.add("wp-out");
    setTimeout(function(){ try{ el.remove(); }catch(e){} }, 280);
  }
  markWelcomeSeen();
}
function showWelcomePopup(force){
  try{
    loadSharedSettings();
    if(cfg.welcomeEnabled===false) return;
    if(!force && hasSeenWelcome()) return;
    if(document.getElementById("welcomePopup")) return;
    // Don't stack over share landing
    if(document.getElementById("sharedLanding")) return;
    var bn=false;
    try{ bn=typeof langIsBn==="function"?langIsBn():false; }catch(e){}
    var title = bn
      ? (cfg.welcomeTitleBn||cfg.welcomeTitle||"Cine Hub4-এ স্বাগতম")
      : (cfg.welcomeTitle||"Welcome to Cine Hub4");
    var body = bn
      ? (cfg.welcomeBodyBn||cfg.welcomeBody||"সকল প্রকার মুভি ও সিরিজ দেখুন এবং ফ্রিতে ডাউনলোড করুন।")
      : (cfg.welcomeBody||"Watch all kinds of movies & series and download for free.");
    var bonus = Number(cfg.joinBonus||10)||0;
    var bonusLine = "";
    if(bonus>0){
      bonusLine = bn
        ? ('🎁 জয়েন বোনাস: <b>+'+bonus+' পয়েন্ট</b> আপনার অ্যাকাউন্টে যোগ হয়েছে!')
        : ('🎁 Join bonus: <b>+'+bonus+' points</b> added to your account!');
    }
    var cancelLbl = bn ? "বাতিল" : "Cancel";
    var okLbl = bn ? "শুরু করুন" : "Get Started";
    var overlay=document.createElement("div");
    overlay.id="welcomePopup";
    overlay.className="welcome-popup";
    overlay.innerHTML =
      '<div class="wp-backdrop" id="wpBackdrop"></div>'+
      '<div class="wp-card" role="dialog" aria-modal="true">'+
        '<div class="wp-glow"></div>'+
        '<div class="wp-icon">🎬</div>'+
        '<h2 class="wp-title">'+String(title).replace(/</g,"&lt;")+'</h2>'+
        '<p class="wp-body">'+String(body).replace(/</g,"&lt;")+'</p>'+
        (bonusLine?'<div class="wp-bonus">'+bonusLine+'</div>':'')+
        '<div class="wp-actions">'+
          '<button type="button" class="wp-cancel" id="wpCancel">'+cancelLbl+'</button>'+
          '<button type="button" class="wp-ok" id="wpOk">'+okLbl+'</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function(){ overlay.classList.add("wp-in"); });
    function dismiss(){ closeWelcomePopup(); }
    document.getElementById("wpCancel").onclick=dismiss;
    document.getElementById("wpOk").onclick=dismiss;
    document.getElementById("wpBackdrop").onclick=dismiss;
    // First tap anywhere on app content also dismisses (after a short grace)
    setTimeout(function(){
      var app=document.getElementById("app")||document.body;
      if(!app) return;
      var once=function(){
        dismiss();
        try{ app.removeEventListener("pointerdown", once, true); }catch(e){}
      };
      app.addEventListener("pointerdown", once, true);
    }, 400);
  }catch(e){ console.error(e); }
}
window.showWelcomePopup=showWelcomePopup;
window.closeWelcomePopup=closeWelcomePopup;


function isNavigationReload_(){
  try{
    var list=performance.getEntriesByType&&performance.getEntriesByType("navigation");
    if(list&&list[0]&&list[0].type==="reload") return true;
  }catch(e){}
  try{
    if(performance.navigation&&performance.navigation.type===1) return true;
  }catch(e){}
  return false;
}
function forceHomeFromEntryLink_(){
  try{
    state.page="movies";
    state.detailId=null;
    state.pendingAdultDetail=null;
    try{
      sessionStorage.setItem("cinehub4_page","movies");
      localStorage.setItem("cinehub4_page","movies");
      sessionStorage.setItem("cinehub4_page_fallback","movies");
      localStorage.setItem("cinehub4_page_fallback","movies");
      sessionStorage.removeItem("cinehub4_detail");
      localStorage.removeItem("cinehub4_detail");
      sessionStorage.removeItem("cinehub4_share_pending");
      sessionStorage.removeItem("cinehub4_last_start");
      sessionStorage.removeItem("cinehub4_start_consumed");
    }catch(e){}
  }catch(e){}
}
function isMovieLikeStart_(spCore){
  spCore=String(spCore||"").trim();
  if(!spCore) return false;
  if(/^movie_/i.test(spCore)) return true;
  if(/^ref_/i.test(spCore) || /^r_/i.test(spCore)) return false;
  if(/^[\w\-]+$/.test(spCore)){
    if(/^\d+$/.test(spCore) || /^m_/.test(spCore) || /^manual_/.test(spCore) || /^tmdb_/i.test(spCore)) return true;
    try{ if(typeof resolveMovieByParam==="function" && resolveMovieByParam(spCore)) return true; }catch(e){}
  }
  return false;
}

function handleStartParam(){
  try{
    if(window.__deeplinkUserNav) return false;
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
    // User dismissed a share — block ONLY that same start param (reload of same link)
    try{
      var dSp=sessionStorage.getItem("cinehub4_dismissed_sp")||"";
      if(sp && dSp && (sp===dSp || sp.indexOf(dSp)>=0 || dSp.indexOf(sp)>=0)){
        return false;
      }
      // No live start_param: do not recover last_start after dismiss
      if(!sp && (sessionStorage.getItem("cinehub4_share_dismissed")==="1" || window.__deeplinkUserNav)){
        return false;
      }
      // Different movie share than dismissed → allow, clear dismiss
      if(sp && dSp && sp!==dSp){
        sessionStorage.removeItem("cinehub4_share_dismissed");
        sessionStorage.removeItem("cinehub4_dismissed_sp");
        window.__deeplinkUserNav=false;
      }
    }catch(e){}
    // Recover sticky share ONLY on reload (not on fresh mini-app / website / refer open)
    if(!sp){
      try{
        if(isNavigationReload_() && sessionStorage.getItem("cinehub4_share_dismissed")!=="1"){
          sp = sessionStorage.getItem("cinehub4_last_start") || "";
        }
      }catch(e){}
    }
    if(!sp){
      try{
        // Reload: keep sticky share recovery / page restore
        if(isNavigationReload_()){
          var pendingOnly = sessionStorage.getItem("cinehub4_share_pending") || "";
          if(pendingOnly && sessionStorage.getItem("cinehub4_share_dismissed")!=="1"){
            return openSharedMovie(pendingOnly);
          }
          return false;
        }
        // Fresh open via mini-app link / website (no startapp) → always HOME
        forceHomeFromEntryLink_();
        return true;
      }catch(e){
        try{ forceHomeFromEntryLink_(); }catch(e2){}
        return true;
      }
    }
    sp=String(sp).trim();
    // Fresh start_param from Telegram link = intentional open → allow share again
    try{
      var prev=sessionStorage.getItem("cinehub4_last_start")||"";
      if(sp && sp!==prev){
        sessionStorage.removeItem("cinehub4_share_dismissed");
        window.__deeplinkUserNav=false;
      }
      sessionStorage.setItem("cinehub4_last_start", sp);
    }catch(e){}

    // Extract optional __r_REFERRER (or _r_REFERRER) from any start param
    var refEmbedded = "";
    var spCore = sp;
    var refMatch = sp.match(/__r_(\d{3,15})$/i) || sp.match(/_r_(\d{3,15})$/i);
    if(refMatch){
      refEmbedded = refMatch[1];
      spCore = sp.slice(0, refMatch.index);
      try{ localStorage.setItem("cinehub4_ref_from", refEmbedded); }catch(e){}
    }

    // If already "consumed" but movie list just arrived and we still have a pending share → re-open
    var already=false;
    try{ already = sessionStorage.getItem("cinehub4_start_consumed")===sp; }catch(e){}
    var needRetry=false;
    try{
      needRetry = !!(sessionStorage.getItem("cinehub4_share_pending") || (state.page==="detail" && state.detailId && !resolveMovieByParam(state.detailId)));
    }catch(e){}
    if(already && !needRetry){
      // Still reopen if share_pending exists and landing not shown
      try{
        var spKeep=sessionStorage.getItem("cinehub4_share_pending")||"";
        if(spKeep && !document.getElementById("sharedLanding")){
          return openSharedMovie(spKeep);
        }
      }catch(e){}
      return false;
    }

    // movie_<id> or movie_<id>__r_<uid> → open unlock/detail
    if(/^movie_/i.test(spCore)){
      const id=String(spCore.replace(/^movie_/i,"")).replace(/_+$/,"").trim();
      if(id){
        var ok=openSharedMovie(id);
        if(ok){
          try{
            // Only mark fully consumed once the movie exists in the library
            // Don't consume until user opens Watch — allow retry on reload
            try{ sessionStorage.setItem("cinehub4_share_pending", id); }catch(e){}
          }catch(e){}
        }
        return ok;
      }
      return false;
    }
    // plain id / tmdb id (ref already stripped into cinehub4_ref_from)
    if(/^[\w\-]+$/.test(spCore) && !/^ref_/i.test(spCore)){
      const id=String(spCore).trim();
      if(id && (resolveMovieByParam(id) || /^\d+$/.test(id) || /^m_/.test(id) || /^manual_/.test(id) || /^tmdb_/i.test(id))){
        var ok2=openSharedMovie(id);
        if(ok2){
          try{ sessionStorage.setItem("cinehub4_share_pending", id); }catch(e){}
        }
        return ok2;
      }
    }
    // ref_USERID — store referrer, open HOME (not last page / not detail)
    if(/^ref_/i.test(spCore) || /^r_/i.test(spCore)){
      try{
        var rid=spCore.replace(/^ref_/i,"").replace(/^r_/i,"");
        if(rid) localStorage.setItem("cinehub4_ref_from", rid);
      }catch(e){}
      if(!isNavigationReload_()){
        forceHomeFromEntryLink_();
        return true; // signal caller to render home
      }
      return false;
    }
    // Non-movie start param (unknown) → home on fresh open
    if(spCore && !isMovieLikeStart_(spCore)){
      if(!isNavigationReload_()){
        forceHomeFromEntryLink_();
        return true;
      }
    }
  }catch(e){}
  return false;
}
handleStartParam();
// Telegram sometimes fills start_param a moment later
setTimeout(function(){
  if(handleStartParam()){
    try{render(false)}catch(e){}
    try{
      var pend=sessionStorage.getItem("cinehub4_share_pending");
      if(pend && !document.getElementById("sharedLanding")){
        var fm=resolveMovieByParam(pend);
        if(fm){
          if(fm.adult && !state.adultOK){
            state.pendingAdultDetail=String(fm.id);
            state.detailId=String(fm.id);
            state.page="adult";
            try{ render(false); }catch(e2){}
          }else{
            showSharedLanding(fm);
          }
        }
      }
    }catch(e){}
  }
},400);
setTimeout(function(){
  if(handleStartParam() && (state.page==="detail"||state.page==="adult")){
    try{render(false)}catch(e){}
  }
},1200);
setTimeout(function(){
  if(handleStartParam() && (state.page==="detail"||state.page==="adult")){
    try{render(false)}catch(e){}
  }
},2500);
bindLeaveGuard();
try{paintStaticIcons()}catch(e){}

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
      // Re-apply share deep-link BEFORE any default home redirect
      try{ if(typeof handleStartParam==="function") handleStartParam(); }catch(e0){}
      var hasDeep=false;
      try{
        if(state.page==="detail"||state.page==="adult") hasDeep=true;
        if(state.detailId||state.pendingAdultDetail) hasDeep=true;
        if(sessionStorage.getItem("cinehub4_detail")) hasDeep=true;
        var tg=window.Telegram&&window.Telegram.WebApp;
        var sp=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.start_param)||"";
        if(/^movie_/i.test(sp)) hasDeep=true;
      }catch(e1){}
      if(!sessionStorage.getItem("cinehub4_booted")){
        sessionStorage.setItem("cinehub4_booted","1");
        // Only default to home when there is NO share/deep link
        if(!hasDeep){ state.page = "movies"; }
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
