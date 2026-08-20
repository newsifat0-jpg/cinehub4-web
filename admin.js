const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const DEFAULT={
  appName:"Cine Hub4",
  botUsername:"@Cinehub4bot",
  telegramBotLink:"https://t.me/Cinehub4bot",
  miniAppName:"Hub4",
  miniAppLink:"https://t.me/Cinehub4bot/Hub4",
  telegramChannelLink:"",
  howToWatchVideo:"",
  watchTutorialVideo:"",
  howToWatchText:"Unlock this content using ads or points. Share with friends to earn more.",
  howToBuyVideo:"",
  unlockCost:5,
  unlockHours:15,
  adReward:2,
  dailyAdLimit:20,
  joinBonus:10,
  referralReward:20,
  downloadServers:1,
  adsForUnlock:5,
  usdtWallet:"",
  usdtNetwork:"TRC20",
  wallets:[{name:"USDT TRC20",address:"",network:"TRC20"}],
  tasks:[],
  customPointRate:100,
  categories:[{en:"All Movies",bn:"সব মুভি"},{en:"Bangla Moves",bn:"বাংলা মুভি"},{en:"Hollywood Movie Hindi",bn:"হলিউড মুভি হিন্দি"}],
  adultCategories:[{en:"All",bn:"সব"},{en:"Adult Movie",bn:"অ্যাডাল্ট মুভি"},{en:"Anime",bn:"অ্যানিমে"}],
  tickerText:"Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ",
  adultTickerText:"18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ",
  libraryBadge:"MOVIE ZONE",
  libraryTitle:"Cinema Library",
  libraryDesc:"Curated movies, web series and premium entertainment updates.",
  adultLibraryBadge:"ADULT ZONE",
  adultLibraryTitle:"Adult Library",
  adultLibraryDesc:"Curated 18+ content and premium entertainment updates.",
  howToWatchLabel:"▶ How to Watch",
  adultHowToWatchLabel:"▶ How to Watch",
  newMoviesLabel:"New Movies",
  newMoviesSub:"LATEST UPLOADS",
  trendingLabel:"Trending",
  trendingSub:"MOST WATCHED",
  adultNewLabel:"New Movies",
  adultNewSub:"LATEST UPLOADS",
  adultTrendingLabel:"Trending",
  adultTrendingSub:"MOST WATCHED",
  packages:[
    {name:"Basic Package",nameBn:"বেসিক প্যাকেজ",price:0.99,points:110,tag:"SMART CHOICE",tagBn:"স্মার্ট চয়েস"},
    {name:"Standard Package",nameBn:"স্ট্যান্ডার্ড প্যাকেজ",price:4.99,points:550,tag:"STARTER",tagBn:"স্টার্টার"},
    {name:"Premium Package",nameBn:"প্রিমিয়াম প্যাকেজ",price:9.99,points:1200,tag:"BEST VALUE",tagBn:"বেস্ট ভ্যালু"},
    {name:"Ultimate Package",nameBn:"আলটিমেট প্যাকেজ",price:14.99,points:2000,tag:"POPULAR",tagBn:"পপুলার"}
  ],
  adBlocks:{rewarded:"",interstitial:"",banner:"",task:"",adult:"",extra:{}},
  // Multi-network slots: each placement can use a different ad network
  adSlots:{
    rewarded:{network:"adsgram",id:""},
    unlock:{network:"adsgram",id:""},
    interstitial:{network:"adsgram",id:""},
    task:{network:"adsgram",id:""},
    banner:{network:"adsgram",id:""},
    bannerAdult:{network:"adsgram",id:""},
    adult:{network:"adsgram",id:""}
  },
  adNetworkDefaults:{
    adsgram:{label:"Adsgram",type:"sdk"},
    monetag:{label:"Monetag",type:"zone"},
    richads:{label:"RichAds",type:"zone"},
    onclicka:{label:"OnClicka",type:"zone"},
    aads:{label:"AADS",type:"zone"},
    hilltop:{label:"HilltopAds",type:"zone"},
    custom:{label:"Custom Link",type:"link"}
  },
  adLinkSeconds:20,

  uiTexts:{en:{},bn:{}},
  themeAccent:"#7c5cff",
  themeAccent2:"#5b8cff",
  themeOrange:"#f59e0b",
  themePink:"#ec4899",
  themeBg:"#0a0c14"
};
const A={section:"dashboard",settings:{...DEFAULT,...JSON.parse(localStorage.getItem("cinehub4_settings")||"{}")},movies:[],users:0,points:0,adultEnabled:true,moviesLoaded:false,payments:[],requests:[],userList:[],statsLoaded:false};
/* Load movies from Firebase */
function loadAdminMovies(){
  if(!window.CineHubFB){A.moviesLoaded=true;try{render()}catch(e){}return}
  window.CineHubFB.listenMovies(function(list){
    var raw=list||[];
    var seen={}, out=[];
    raw.forEach(function(m){
      var id=String(m.id||"");
      if(!id||seen[id]) return;
      seen[id]=1; out.push(m);
    });
    A.movies=out;
    A.moviesLoaded=true;
    try{render()}catch(e){console.error(e)}
  });
}
setTimeout(loadAdminMovies,200);
A.settings.adBlocks={...DEFAULT.adBlocks,...(A.settings.adBlocks||{})};
if(A.settings.adultEnabled===false||A.settings.adultLibraryEnabled===false)A.adultEnabled=false;
else if(A.settings.adultEnabled===true)A.adultEnabled=true;
ensureAdSlots();A.settings.categories=A.settings.categories||DEFAULT.categories;A.settings.adultCategories=A.settings.adultCategories&&A.settings.adultCategories.length?A.settings.adultCategories:DEFAULT.adultCategories;

/* —— Bilingual helpers (EN + BN) —— */
function catEn(c){ if(c==null)return ""; if(typeof c==="string")return c; return String(c.en||c.name||""); }
function catBn(c){ if(c==null)return ""; if(typeof c==="string")return ""; return String(c.bn||""); }
function catLabelAdmin(c){ var e=catEn(c), b=catBn(c); return b? (e+" · "+b) : e; }
function normalizeCategories(list){
  if(!Array.isArray(list)) return [];
  return list.map(function(c){
    if(c && typeof c==="object") return {en:String(c.en||c.name||"").trim(), bn:String(c.bn||"").trim()};
    return {en:String(c||"").trim(), bn:""};
  }).filter(function(c){ return c.en; });
}
function ensureBilingualSettings(){
  var s=A.settings;
  s.categories = normalizeCategories(s.categories||[]);
  s.adultCategories = normalizeCategories(s.adultCategories||[]);
  if(!s.packages) s.packages=[];
  s.packages.forEach(function(p){ if(p && p.nameBn==null) p.nameBn=p.nameBn||""; if(p && p.tagBn==null) p.tagBn=p.tagBn||""; });
  if(!s.tasks) s.tasks=[];
  s.tasks.forEach(function(t){ if(t && t.nameBn==null) t.nameBn=""; });
  s.uiTexts = s.uiTexts || {en:{}, bn:{}};
  // Build categoryLabelsBn from category objects for mini-app t()
  var mapBn={}, mapEn={};
  (s.categories||[]).concat(s.adultCategories||[]).forEach(function(c){
    var e=catEn(c); if(!e) return;
    if(catBn(c)) mapBn[e]=catBn(c);
    mapEn[e]=e;
  });
  s.categoryLabelsBn = Object.assign({}, s.categoryLabelsBn||{}, mapBn);
  s.categoryLabelsEn = Object.assign({}, s.categoryLabelsEn||{}, mapEn);
}

try{ensureBilingualSettings()}catch(e){console.warn(e)}

function el(id){return document.getElementById(id)}
function contentEl(){return el("content")}
function titleEl(){return el("pageTitle")}
const toastEl=$("#toast");
function save(silent){
  try{ensureBilingualSettings()}catch(e){}
  try{
    if(A.settings.wallets&&A.settings.wallets[0]){
      A.settings.usdtWallet=A.settings.wallets[0].address||A.settings.usdtWallet||"";
      A.settings.usdtNetwork=A.settings.wallets[0].network||A.settings.usdtNetwork||"TRC20";
    }
  }catch(e){}
  localStorage.setItem("cinehub4_settings",JSON.stringify(A.settings));
  // Push to Firebase — this is what ALL users receive via loadPublicConfig
  try{
    if(window.CineHubFB){
      window.CineHubFB.saveConfig(A.settings).then(function(){
        if(!silent) toast("✓ Saved — all users will get this update");
      }).catch(function(e){
        console.error(e);
        toast("⚠ Save failed (only this device): "+(e&&e.message?e.message:e));
      });
    } else if(!silent){
      toast("⚠ Offline — saved only on this device");
    }
  }catch(e){
    if(!silent) toast("Save error: "+e);
  }
}
function toast(msg){const te=el('toast')||toastEl;if(!te)return;te.textContent=msg;te.classList.add('show');setTimeout(()=>te.classList.remove('show'),1700)}
function money(n){return Number(n).toLocaleString()}
function getTelegramUserId(){try{return window.Telegram?.WebApp?.initDataUnsafe?.user?.id?String(window.Telegram.WebApp.initDataUnsafe.user.id):''}catch(e){return ''}}
// Admin IDs loaded from Firestore config/main (not in public source)
window.__ADMIN_IDS = window.__ADMIN_IDS || [];

function ensureAdSlots(){
  A.settings.adSlots = A.settings.adSlots || {};
  const b = A.settings.adBlocks || {};
  const slots = ["rewarded","unlock","interstitial","task","banner","bannerAdult","adult"];
  slots.forEach(function(k){
    if (!A.settings.adSlots[k]) {
      A.settings.adSlots[k] = { network: "adsgram", id: String(b[k] || (k==="unlock"?b.interstitial||b.rewarded:"") || "") };
    }
    if (!A.settings.adSlots[k].network) A.settings.adSlots[k].network = "adsgram";
    if (A.settings.adSlots[k].id == null) A.settings.adSlots[k].id = "";
  });
  // Keep legacy adBlocks in sync for older app builds
  A.settings.adBlocks = A.settings.adBlocks || {};
  slots.forEach(function(k){
    if (A.settings.adSlots[k] && A.settings.adSlots[k].id) {
      A.settings.adBlocks[k] = A.settings.adSlots[k].id;
    }
  });
}

function allowedAdminIds(){return (window.__ADMIN_IDS||[]).map(String)}
function isTelegramAdmin(){const id=getTelegramUserId();return !!id&&allowedAdminIds().includes(id)}
function openAdmin(){
  localStorage.setItem('cinehub4_admin_session','1');
  var gate=$("#adminGate");
  var app=$("#adminApp");
  if(gate){ gate.classList.add('hidden'); gate.style.display='none'; }
  if(app){ app.classList.remove('hidden'); app.style.display='block'; }
  wireAdminNav();
  try{
    if(window.CineHubFB){
      window.CineHubFB.loadConfig().then(function(c){
        if(c){ A.settings={...A.settings,...c}; A.settings.adBlocks={...DEFAULT.adBlocks,...(A.settings.adBlocks||{})};
ensureAdSlots(); A.settings.categories=A.settings.categories||DEFAULT.categories; A.settings.adultCategories=A.settings.adultCategories&&A.settings.adultCategories.length?A.settings.adultCategories:DEFAULT.adultCategories; localStorage.setItem("cinehub4_settings",JSON.stringify(A.settings)); render(); }
      }).catch(function(){});
    }
  }catch(e){}
  render();
}

function setGateStatus(msg, isError){
  var el=document.getElementById("adminGateStatus");
  if(!el){
    var gate=document.querySelector(".gate-card")||document.getElementById("adminGate");
    if(gate){
      el=document.createElement("div");
      el.id="adminGateStatus";
      el.style.cssText="margin-top:12px;padding:8px;font-size:12px;line-height:1.45;word-break:break-word;border-radius:8px;background:rgba(0,0,0,.35)";
      gate.appendChild(el);
    }
  }
  if(el){
    el.style.color=isError?"#fca5a5":"#86efac";
    el.innerHTML=msg||"";
  }
}
function openGateNow(){
  try{
    window.__IS_ADMIN=true;
    localStorage.setItem("cinehub4_admin_session","1");
    sessionStorage.setItem("cinehub4_is_admin","1");
  }catch(e){}
  openAdmin();
}
function adminLogin(){
  try{
    var btn=document.querySelector("#adminGate .btn.primary");
    if(btn){ btn.disabled=true; btn.textContent="Checking…"; }
    setGateStatus("⏳ Checking…", false);
    var tgId=getTelegramUserId();
    var initData="";
    try{ initData=window.Telegram.WebApp.initData||""; }catch(e){}
    var api=(window.APP_CONFIG&&window.APP_CONFIG.apiBaseUrl)||"";

    function finishBtn(){
      if(btn){ btn.disabled=false; btn.textContent="Enter Admin Panel"; }
    }
    function clearAdminFlags(){
      try{
        window.__IS_ADMIN=false;
        window.__ADMIN_IDS=[];
        localStorage.removeItem("cinehub4_admin_session");
        sessionStorage.removeItem("cinehub4_is_admin");
      }catch(e){}
    }

    // Must be inside Telegram Mini App with valid backend
    if(!api){
      clearAdminFlags();
      setGateStatus("❌ apiBaseUrl missing in config.js", true);
      finishBtn();
      return;
    }
    if(!initData){
      clearAdminFlags();
      setGateStatus("❌ initData নেই। বট থেকে মিনি অ্যাপ খুলুন। ID: "+(tgId||"—"), true);
      finishBtn();
      return;
    }

    fetch(api,{
      method:"POST",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify({action:"adminCheck",initData:initData}),
      redirect:"follow"
    }).then(function(r){ return r.text(); }).then(function(txt){
      var res=null;
      try{ res=JSON.parse(txt); }catch(e){
        clearAdminFlags();
        setGateStatus("❌ API bad JSON: "+String(txt).slice(0,120), true);
        finishBtn();
        return;
      }
      var d=(res&&res.data)||{};
      console.log("[adminCheck]", d);
      if(res&&res.ok&&d.isAdmin){
        setGateStatus("✓ Verified admin", false);
        finishBtn();
        openGateNow();
        return;
      }
      // Not admin — clear any leftover session
      clearAdminFlags();
      setGateStatus(
        "❌ Access denied<br>Your ID: <b>"+(d.debugId||tgId||"—")+"</b><br>"+
        "reason: <b>"+(d.debugReason||"not in ADMIN_IDS")+"</b><br>"+
        "Server ADMIN_IDS: <b>"+(d.debugAdminIdsRaw||"(empty)")+"</b><br>"+
        "hashMatch: "+String(d.debugHashMatch)+"<br>"+
        "Script Properties → ADMIN_IDS তে আপনার numeric Telegram ID দিন",
        true
      );
      finishBtn();
    }).catch(function(err){
      clearAdminFlags();
      setGateStatus("❌ Network: "+(err&&err.message?err.message:err), true);
      finishBtn();
    });
  }catch(e){
    setGateStatus("Error: "+e, true);
  }
}
window.adminLogin=adminLogin;
function loadAdminIdsFromFB(fromButton){
  if(fromButton) return adminLogin();
  try{
    var initData=window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initData;
    var api=window.APP_CONFIG&&window.APP_CONFIG.apiBaseUrl;
    if(!initData||!api) return Promise.resolve(false);
    return fetch(api,{
      method:"POST",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify({action:"adminCheck",initData:initData}),
      redirect:"follow"
    }).then(function(r){return r.text()}).then(function(txt){
      var res=JSON.parse(txt);
      if(res&&res.ok&&res.data&&res.data.isAdmin){
        openGateNow();
        return true;
      }
      // Not admin: wipe any previous fake session
      try{
        window.__IS_ADMIN=false;
        window.__ADMIN_IDS=[];
        localStorage.removeItem("cinehub4_admin_session");
        sessionStorage.removeItem("cinehub4_is_admin");
      }catch(e){}
      return false;
    }).catch(function(){ return false; });
  }catch(e){ return Promise.resolve(false); }
}
function boot(){
  try{ window.Telegram.WebApp.ready(); window.Telegram.WebApp.expand(); }catch(e){}
  var tgId=getTelegramUserId();
  var inp=document.getElementById("adminIdInput");
  if(inp&&tgId) inp.value=tgId;
  setGateStatus("ID: "+(tgId||"—")+" — শুধু ADMIN_IDS-এ থাকা অ্যাকাউন্ট ঢুকতে পারবে", false);
  // Always re-verify with server (never trust old session alone)
  loadAdminIdsFromFB(false);
}
function sectionTitle(s){const map={dashboard:'Dashboard',movies:'Movies',categories:'Categories',users:'Users',points:'Points & Unlocks',ads:'Ads & Ad IDs',tasks:'Daily Tasks',payments:'Payments',adult:'Adult Library',requests:'Movie Requests',content:'Links & Videos',broadcast:'Broadcast',settings:'Settings'};return map[s]||s}
function closeSidebar(){const sb=document.querySelector('.sidebar');if(sb)sb.classList.remove('open');const bd=document.getElementById('sideBackdrop');if(bd)bd.classList.add('hidden')}
function openSidebar(){const sb=document.querySelector('.sidebar');if(sb)sb.classList.add('open');const bd=document.getElementById('sideBackdrop');if(bd)bd.classList.remove('hidden')}
function setSection(s){ if(s==='payments') window.__payLoaded=false; if(s==='requests') window.__reqLoaded=false; 
  try{
    A.section=s;
    const tt=titleEl();
    if(tt) tt.textContent=sectionTitle(s);
    document.querySelectorAll('#sideNav button').forEach(b=>b.classList.toggle('active',b.dataset.section===s));
    render();
    closeSidebar();
  }catch(err){console.error('setSection',err);toast('Section error: '+err.message)}
}
function wireAdminNav(){
  document.querySelectorAll('#sideNav button[data-section]').forEach(btn=>{
    btn.onclick=function(e){
      e.preventDefault();
      e.stopPropagation();
      setSection(this.getAttribute('data-section'));
    };
  });
  const mm=document.getElementById('mobileMenu');
  if(mm) mm.onclick=function(e){
    e.preventDefault();
    e.stopPropagation();
    const sb=document.querySelector('.sidebar');
    if(sb && sb.classList.contains('open')) closeSidebar();
    else openSidebar();
  };
  const ou=document.getElementById('openUser');
  if(ou) ou.onclick=()=>location.href='index.html';
  const lo=document.getElementById('logout');
  if(lo) lo.onclick=()=>{try{localStorage.removeItem('cinehub4_admin_session');sessionStorage.removeItem('cinehub4_is_admin');window.__IS_ADMIN=false;window.__ADMIN_IDS=[];}catch(e){}location.href='index.html'};
  const bd=document.getElementById('sideBackdrop');
  if(bd) bd.onclick=function(){closeSidebar()};
}
wireAdminNav();
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar()});
function dashboard(){
  if (!A.statsLoaded && window.CineHubFB) {
    A.statsLoaded = true;
    if (window.CineHubFB.listUsers) {
      window.CineHubFB.listUsers().then(function(list){
        A.userList = Array.isArray(list)?list:[];
        A.users = A.userList.length;
        var pts=0; A.userList.forEach(function(u){pts+=Number(u.points||0);});
        A.points = pts;
        if (A.section==="dashboard") render();
      }).catch(function(){});
    }
    if (window.CineHubFB.listPayments) {
      window.CineHubFB.listPayments().then(function(list){
        A.payments = Array.isArray(list)?list:[];
        if (A.section==="dashboard") render();
      }).catch(function(){});
    }
  }
  return `<div class="grid stats"><div class="card stat"><span class="label">Total Users</span><div class="num">${money(A.users)}</div><span class="up">From Firebase</span><span class="ico">♙</span></div><div class="card stat"><span class="label">Movies</span><div class="num">${A.movies.length}</div><span class="up">Live library</span><span class="ico">🎬</span></div><div class="card stat"><span class="label">Points Issued</span><div class="num">${money(A.points)}</div><span class="up">Sum of user points</span><span class="ico">◈</span></div><div class="card stat"><span class="label">Pending Payments</span><div class="num">${(A.payments||[]).filter(p=>(p.status||"pending")==="pending").length}</div><span class="up">Needs review</span><span class="ico">৳</span></div></div><div class="grid section-grid"><div class="card"><h3>Platform Activity</h3><div class="muted smalltext">Clicks, downloads and ad rewards</div><div class="chart">${[38,55,48,72,66,91,76].map(x=>`<div class="bar" style="height:${x}%"></div>`).join('')}</div></div><div class="card"><h3>Quick Controls</h3><div class="quick"><button onclick="openMovie()"><b>＋ Add Movie</b>Publish title</button><button onclick="setSection('ads')"><b>◉ Ad IDs</b>Manage every ad block</button><button onclick="setSection('content')"><b>🔗 Links & Video</b>Telegram + How to Watch</button><button onclick="setSection('categories')"><b>▦ Categories</b>Add / rename / delete</button></div></div></div><div class="card" style="margin-top:14px"><h3>System Status</h3><div class="switch"><span>Movie Library</span><span class="badge green">ONLINE</span></div><div class="switch"><span>Points & 15-hour unlock</span><span class="badge green">ACTIVE</span></div><div class="switch"><span>Adult Library</span><span class="badge ${A.adultEnabled?'green':'red'}">${A.adultEnabled?'ENABLED':'DISABLED'}</span></div></div>`}
function movies(){const list=(A.movies||[]).filter(m=>!m.adult);return `<div class="toolbar"><div class="left"><button class="btn primary" onclick="openMovie()">＋ Add Movie</button><button class="btn" onclick="openTmdbImport()">Import TMDB</button></div><input class="search" id="movieSearch" placeholder="Search movie..." oninput="filterMovies()"></div><div class="card table-wrap"><table class="table"><thead><tr><th>Movie</th><th>Category</th><th>Rating</th><th>Clicks</th><th>Downloads</th><th>Status</th><th>Action</th></tr></thead><tbody id="movieBody">${movieRows(list)}</tbody></table></div>`}
function movieRows(ms){return (ms||[]).map(function(m,idx){
  var id=String(m.id!=null?m.id:("idx_"+idx));
  var title=String(m.title||"Untitled").replace(/</g,"&lt;").replace(/"/g,"&quot;");
  var year=String(m.year||"");
  var cat=String(m.category||m.type||"Movie").replace(/</g,"&lt;");
  var st=String(m.status||"Published");
  return '<tr data-mid="'+id.replace(/"/g,"&quot;")+'">'+
    '<td><div class="movie-row"><div class="thumb">'+(title.slice(0,1)||"?")+'</div>'+
    '<div class="movie-meta"><b class="movie-title">'+title+'</b><div class="muted">'+year+'</div></div></div></td>'+
    '<td>'+cat+'</td>'+
    '<td>⭐ '+(m.rating||0)+'</td>'+
    '<td>'+money(m.clicks||0)+'</td>'+
    '<td>'+money(m.downloads||0)+'</td>'+
    '<td><span class="badge '+(st==="Published"?"green":"")+'">'+st+'</span></td>'+
    '<td class="action-cell"><button type="button" class="btn dots-btn" data-mid="'+id.replace(/"/g,"&quot;")+'" aria-label="Actions">⋮</button>'+
    '<div class="dots-menu hidden" data-menu-for="'+id.replace(/"/g,"&quot;")+'">'+
    '<button type="button" class="dots-edit">Edit</button>'+
    '<button type="button" class="danger dots-del">Delete</button></div></td></tr>';
}).join("")}
function closeAllDots(){document.querySelectorAll('.dots-menu').forEach(el=>el.classList.add('hidden'))}
function toggleDots(id,btn){
  const menu=btn.parentElement&&btn.parentElement.querySelector('.dots-menu');
  if(!menu)return;
  const wasOpen=!menu.classList.contains('hidden');
  closeAllDots();
  if(!wasOpen){
    menu.classList.remove('hidden');
    const r=btn.getBoundingClientRect();
    menu.style.top=(r.bottom+4)+'px';
    menu.style.right=(window.innerWidth-r.right)+'px';
  }
}
document.addEventListener('click',function(e){
  const edit=e.target.closest('.dots-edit');
  if(edit){
    e.stopPropagation();
    const tr=edit.closest('tr');
    const mid=tr && tr.getAttribute('data-mid');
    const isAdult = (edit.getAttribute('data-adult')==='1') || (tr && tr.getAttribute('data-adult')==='1');
    closeAllDots();
    if(mid){ if(isAdult) openAdultMovie(mid); else openMovie(mid); }
    return;
  }
  const del=e.target.closest('.dots-del');
  if(del){
    e.stopPropagation();
    const mid=(del.closest('tr')||{}).getAttribute&&del.closest('tr').getAttribute('data-mid');
    closeAllDots();
    if(mid) deleteMovie(mid);
    return;
  }
  const btn=e.target.closest('.dots-btn');
  if(btn){e.stopPropagation();toggleDots(btn.dataset.mid,btn);return}
  if(!e.target.closest('.dots-menu'))closeAllDots();
});
function filterMovies(){const q=$("#movieSearch").value.toLowerCase();$("#movieBody").innerHTML=movieRows(A.movies.filter(m=>m.title.toLowerCase().includes(q)))}
function categories(){
  ensureBilingualSettings();
  const rows=(A.settings.categories||[]).map((c,i)=>{
    const e=catEn(c).replace(/</g,"&lt;"), b=catBn(c).replace(/</g,"&lt;");
    return `<div class="tag-item"><span><b>${e||"—"}</b>${b?` <span class="muted">/ ${b}</span>`:""}</span><div><button class="btn" onclick="editCategory(${i})">Edit</button> <button class="btn danger" onclick="deleteCategory(${i})">Delete</button></div></div>`;
  }).join("");
  const arows=(A.settings.adultCategories||[]).map((c,i)=>{
    const e=catEn(c).replace(/</g,"&lt;"), b=catBn(c).replace(/</g,"&lt;");
    return `<div class="tag-item"><span><b>${e||"—"}</b>${b?` <span class="muted">/ ${b}</span>`:""}</span><div><button class="btn" onclick="editAdultCategory(${i})">Edit</button> <button class="btn danger" onclick="deleteAdultCategory(${i})">Delete</button></div></div>`;
  }).join("");
  return `<div class="card"><div class="toolbar"><div><h3 style="margin:0">Movie Categories</h3><div class="muted smalltext">Add in <b>English + বাংলা</b> — user sees the language they selected.</div></div><button class="btn primary" onclick="openCategory()">＋ Add Category</button></div><div class="tag-list">${rows||'<div class="muted">No categories</div>'}</div></div>
  <div class="card" style="margin-top:14px"><div class="toolbar"><div><h3 style="margin:0">Adult Categories</h3><div class="muted smalltext">Same bilingual system for 18+ tabs.</div></div><button class="btn primary" onclick="openAdultCategory()">＋ Add Adult Category</button></div><div class="tag-list">${arows||'<div class="muted">No adult categories</div>'}</div></div>`;
}
function users(){
  if (!window.__usersLoaded) {
    window.__usersLoaded = true;
    if (window.CineHubFB && window.CineHubFB.listUsers) {
      window.CineHubFB.listUsers().then(function(list){
        var raw = Array.isArray(list) ? list : [];
        var seen = {}, out = [];
        raw.forEach(function(u){
          var id = String(u.id || u.uid || "");
          if(!id || seen[id]) return;
          seen[id] = 1;
          u.id = id;
          out.push(u);
        });
        A.userList = out;
        A.users = out.length;
        var pts = 0;
        out.forEach(function(u){ pts += Number(u.points||0); });
        A.points = pts;
        try { localStorage.setItem("cinehub4_users", JSON.stringify(A.userList)); } catch(e){}
        if (A.section === "users" || A.section === "dashboard") render();
      }).catch(function(e){
        console.warn(e);
        toast("Users load failed: " + (e && e.message ? e.message : e));
      });
    }
  }
  var list = A.userList && A.userList.length ? A.userList.slice() : [];
  if (!list.length) {
    try { list = JSON.parse(localStorage.getItem("cinehub4_users")||"[]"); } catch(e){ list = []; }
  }
  var q = "";
  try { q = String((document.getElementById("userSearch")||{}).value||"").toLowerCase(); } catch(e){}
  if (q) list = list.filter(function(u){
    return String(u.id||"").toLowerCase().indexOf(q)>=0 || String(u.name||u.username||"").toLowerCase().indexOf(q)>=0;
  });
  var rows = list.length ? list.map(function(u){
    var id = String(u.id||"");
    var name = String(u.name || u.username || ("User "+id)).replace(/</g,"");
    var unlocks = u.unlocks ? Object.keys(u.unlocks).length : 0;
    var ads = u.ads_today || u.ads || 0;
    var st = u.blocked ? "Blocked" : "Active";
    return '<tr>'+
      '<td><b>'+name+'</b><div class="muted smalltext">ID: '+id+'</div></td>'+
      '<td><b>'+(u.points||0)+'</b></td>'+
      '<td>'+unlocks+'</td>'+
      '<td>'+ads+'</td>'+
      '<td><span class="badge '+(st==="Blocked"?"red":"green")+'">'+st+'</span></td>'+
      '<td style="white-space:nowrap">'+
        '<button class="btn" type="button" onclick="openUserDetail(\''+id.replace(/'/g,"\\'")+'\')">Details</button> '+
        '<button class="btn" type="button" onclick="openSetPoints(\''+id.replace(/'/g,"\\'")+'\')">Points</button> '+
        '<button class="btn" type="button" onclick="toggleBlockUser(\''+id.replace(/'/g,"\\'")+'\')">'+(u.blocked?"Unblock":"Block")+'</button> '+
        '<button class="btn danger" type="button" onclick="adminDeleteUser(\''+id.replace(/'/g,"\\'")+'\')">Delete</button>'+
      '</td></tr>';
  }).join("") : '<tr><td colspan="6" class="muted">No users yet — they appear after opening the mini app</td></tr>';
  return '<div class="toolbar"><div class="left"><span class="muted">Total: '+(list.length)+' users</span> <button class="btn" type="button" onclick="window.__usersLoaded=false;render()">↻ Refresh</button></div>'+
    '<input class="search" id="userSearch" placeholder="Search user ID / name..." oninput="render()"></div>'+
    '<div class="card table-wrap"><table class="table"><thead><tr>'+
    '<th>User</th><th>Points</th><th>Unlocks</th><th>Ads Today</th><th>Status</th><th>Actions</th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function openUserDetail(uid){
  var u = (A.userList||[]).find(function(x){ return String(x.id)===String(uid); }) || {};
  var unlocks = u.unlocks ? Object.keys(u.unlocks) : [];
  showModal('<div class="modal-head"><h2>User Details</h2><button class="btn" onclick="closeModal()">×</button></div>'+
    '<div class="pay-meta-row"><span>Name</span><b>'+String(u.name||u.username||"—").replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>Telegram ID</span><b>'+String(uid).replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>Points</span><b>'+(u.points||0)+'</b></div>'+
    '<div class="pay-meta-row"><span>Referrals</span><b>'+(u.refs||u.referralCount||0)+'</b></div>'+
    '<div class="pay-meta-row"><span>Ads today</span><b>'+(u.ads_today||0)+'</b></div>'+
    '<div class="pay-meta-row"><span>Unlocks</span><b>'+unlocks.length+'</b></div>'+
    '<div class="pay-meta-row"><span>Status</span><b>'+(u.blocked?"Blocked":"Active")+'</b></div>'+
    '<div class="muted smalltext" style="margin-top:10px;word-break:break-all">Unlock IDs: '+(unlocks.slice(0,20).join(", ")||"none")+'</div>'+
    '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">'+
    '<button class="btn primary" onclick="closeModal();openSetPoints(\''+String(uid).replace(/'/g,"\\'")+'\')">Edit Points</button>'+
    '<button class="btn" onclick="closeModal();toggleBlockUser(\''+String(uid).replace(/'/g,"\\'")+'\')">'+(u.blocked?"Unblock":"Block")+'</button>'+
    '<button class="btn danger" onclick="closeModal();adminDeleteUser(\''+String(uid).replace(/'/g,"\\'")+'\')">Delete User</button></div>');
}
function openSetPoints(uid){
  var u = (A.userList||[]).find(function(x){ return String(x.id)===String(uid); }) || {};
  showModal('<div class="modal-head"><h2>Set Points</h2><button class="btn" onclick="closeModal()">×</button></div>'+
    '<p class="muted">User ID: '+String(uid).replace(/</g,"")+'</p>'+
    '<div class="field"><label>Points</label><input id="adminPts" type="number" value="'+(u.points||0)+'"></div>'+
    '<button class="btn primary" style="margin-top:12px;width:100%" onclick="saveAdminPoints(\''+String(uid).replace(/'/g,"\\'")+'\')">Save Points</button>');
}
function saveAdminPoints(uid){
  var pts = Number((document.getElementById("adminPts")||{}).value||0);
  if(!window.CineHubFB||!window.CineHubFB.adminUpdateUser){ toast("API missing — redeploy Code.gs"); return; }
  toast("Saving…");
  window.CineHubFB.adminUpdateUser(uid,{points:pts}).then(function(){
    (A.userList||[]).forEach(function(u){ if(String(u.id)===String(uid)) u.points=pts; });
    closeModal(); render(); toast("Points updated");
  }).catch(function(e){ toast("Failed: "+(e&&e.message?e.message:e)); });
}
function toggleBlockUser(uid){
  var u = (A.userList||[]).find(function(x){ return String(x.id)===String(uid); }) || {};
  var blocked = !u.blocked;
  if(!window.CineHubFB||!window.CineHubFB.adminUpdateUser){ toast("API missing — redeploy Code.gs"); return; }
  window.CineHubFB.adminUpdateUser(uid,{blocked:blocked}).then(function(){
    u.blocked = blocked; render(); toast(blocked?"User blocked":"User unblocked");
  }).catch(function(e){ toast("Failed: "+(e&&e.message?e.message:e)); });
}
function adminDeleteUser(uid){
  if(!confirm("Delete user "+uid+" permanently?")) return;
  if(!window.CineHubFB||!window.CineHubFB.deleteUser){ toast("API missing — redeploy Code.gs"); return; }
  window.CineHubFB.deleteUser(uid).then(function(){
    A.userList = (A.userList||[]).filter(function(u){ return String(u.id)!==String(uid); });
    A.users = A.userList.length;
    render(); toast("User deleted");
  }).catch(function(e){ toast("Failed: "+(e&&e.message?e.message:e)); });
}
function points(){return `<div class="toolbar"><div><h2 style="margin:0;font-size:18px">Points & Unlock Control</h2><p class="muted smalltext" style="margin:4px 0 0">Controls the <b>Watch Ad Now</b> block on user Profile (Reward / Daily limit / Remaining). Task list buttons are managed under <b>Daily Tasks</b>.</p></div></div>
<div class="card" style="margin-bottom:14px;border:1px solid #3b82f655;background:linear-gradient(135deg,#0f172a,#1e3a5f22)">
  <div style="display:flex;gap:10px;align-items:flex-start">
    <div style="width:40px;height:40px;border-radius:12px;background:#3b82f6;display:flex;align-items:center;justify-content:center;font-size:18px">▶</div>
    <div>
      <b style="color:#e2e8f0">User app → Watch Ad Now</b>
      <div class="muted smalltext" style="margin-top:4px">Reward Per Ad · Maximum Daily Ads · Remaining Today — all live from these settings. Separate from Daily Tasks cards.</div>
    </div>
  </div>
</div>
<div class="grid section-grid">
  <div class="card"><h3>🔓 Movie Unlock Rules</h3>
    <div class="form-grid">
      <div class="field"><label>Points needed to unlock 1 movie</label><input id="unlockCost" type="number" value="${A.settings.unlockCost}"></div>
      <div class="field"><label>Ads needed to unlock 1 movie</label><input id="adsForUnlockP" type="number" value="${A.settings.adsForUnlock||5}"></div>
      <div class="field"><label>Unlock stays open (hours)</label><input id="unlockHours" type="number" value="${A.settings.unlockHours}"></div>
      <div class="field"><label>Max movies user can unlock per day (0=unlimited)</label><input id="dailyUnlockLimit" type="number" value="${A.settings.dailyUnlockLimit||0}"></div>
      <div class="field"><label>Download servers count (1–10)</label><input id="downloadServersP" type="number" min="1" max="10" value="${A.settings.downloadServers||3}"></div>
    </div>
  </div>
  <div class="card"><h3>🎁 Earn Points</h3>
    <div class="form-grid">
      <div class="field"><label>Points per ad watched</label><input id="adRewardP" type="number" value="${A.settings.adReward}"></div>
      <div class="field"><label>Top Ad section reset</label>
        <select id="dailyAdResetMode">
          <option value="midnight" ${(A.settings.dailyAdResetMode||"midnight")==="midnight"?"selected":""}>Every night 12:00 AM</option>
          <option value="hours" ${A.settings.dailyAdResetMode==="hours"?"selected":""}>After X hours</option>
        </select>
      </div>
      <div class="field"><label>Reset after hours (if hours mode)</label><input id="dailyAdResetHours" type="number" value="${A.settings.dailyAdResetHours||24}"></div>
      <div class="field"><label>Daily ad earning limit</label><input id="dailyLimitP" type="number" value="${A.settings.dailyAdLimit}"></div>
      <div class="field"><label>Join bonus (new user)</label><input id="bonus" type="number" value="${A.settings.joinBonus||A.settings.newUserBonus||10}"></div>
      <div class="field"><label>Referral reward</label><input id="ref" type="number" value="${A.settings.referralReward||20}"></div>
    </div>
  </div>
  <div class="card"><h3>Rules (live)</h3>
    <div class="switch"><span>After unlock expires → must unlock again</span><span class="badge green">ON</span></div>
    <div class="switch"><span>Daily ad limit only for earning (not unlock ads)</span><span class="badge green">ON</span></div>
    <div class="switch"><span>Adult fully separate from Movies</span><span class="badge green">ON</span></div>
    <div class="switch"><span>Unlock period</span><span class="badge green">${A.settings.unlockHours||15} HOURS</span></div>
  </div>
</div>
<button class="btn primary" style="margin-top:14px;width:100%;padding:14px" onclick="savePoints()">💾 Save Unlock & Points Settings</button>`}
function savePoints(){
  const rm=document.getElementById("dailyAdResetMode");
  if(rm) A.settings.dailyAdResetMode=rm.value||"midnight";
  A.settings.dailyAdResetHours=+$('#dailyAdResetHours')?.value||24;
  A.settings.unlockCost=+$('#unlockCost').value||5;A.settings.unlockHours=+$('#unlockHours').value||15;A.settings.adReward=+$('#adRewardP').value||2;A.settings.dailyAdLimit=+$('#dailyLimitP').value||20;A.settings.dailyUnlockLimit=+$('#dailyUnlockLimit').value||0;A.settings.adsForUnlock=+$('#adsForUnlockP').value||5;A.settings.downloadServers=Math.max(1,Math.min(10,+$('#downloadServersP').value||3));A.settings.joinBonus=+$('#bonus').value||10;A.settings.newUserBonus=A.settings.joinBonus;A.settings.referralReward=+$('#ref').value||20;save();render();toast('Points & Unlock settings saved')}
function ads(){
  ensureAdSlots();
  const slots = A.settings.adSlots || {};
  const s = A.settings;
  const AD_NETS = [
    ["adsgram","Adsgram — Rewarded / Interstitial / Task"],
    ["monetag","Monetag — Rewarded Interstitial SDK"],
    ["richads","RichAds — Banner / push-style"],
    ["onclicka","OnClicka — Rewarded + Banner"],
    ["tads","TADS — Native TMA ads"],
    ["adsonar","AdSonar — Multi-network"],
    ["propeller","PropellerAds — Telegram format"],
    ["adexium","Adexium — Banner / Rewarded"],
    ["aads","AADS"],
    ["hilltop","HilltopAds"],
    ["custom","Custom Link / URL"]
  ];
  function netSel(id, cur){
    return '<select id="'+id+'">'+AD_NETS.map(function(n){
      return '<option value="'+n[0]+'"'+(cur===n[0]?' selected':'')+'>'+n[1]+'</option>';
    }).join('')+'</select>';
  }
  function val(slot){ return String((slots[slot]||{}).id||"").replace(/"/g,'&quot;'); }
  function net(slot){ return (slots[slot]||{}).network || "adsgram"; }

  // Main rewarded = rewarded slot; main banner = banner slot
  return `<div class="toolbar"><div>
    <h2 style="margin:0;font-size:18px">Ads & Networks</h2>
    <p class="muted smalltext" style="margin:4px 0 0">মিনি অ্যাপ মুভি বটের জন্য · শুধু Network + ID/লিংক বসান</p>
  </div></div>

  <div class="card" style="border:1px solid #3b82f6;margin-bottom:12px">
    <h3>🎬 মেইন রিওয়ার্ডেড (পয়েন্ট · আনলক · ডেইলি টাস্ক · অ্যাডাল্ট)</h3>
    <p class="muted smalltext">একটা Network + একটা ID দিলেই সব রিওয়ার্ডেড জায়গায় চলবে। নিচে আলাদা ওভাররাইড করতে পারবেন।</p>
    <div class="form-grid" style="margin-top:10px">
      <div class="field"><label>Network</label>${netSel("mainRewNet", net("rewarded"))}</div>
      <div class="field"><label>Block ID / Zone ID / SDK ID</label>
        <input id="mainRewId" value="${val("rewarded")}" placeholder="e.g. Adsgram 43222 · Monetag zone · URL">
      </div>
    </div>
    <label class="switch" style="margin-top:12px;display:flex;gap:10px;align-items:center">
      <input type="checkbox" id="applyRewAll" checked>
      <span>এই ID সব রিওয়ার্ডেড স্লটে কপি করো (Unlock / Task / Adult)</span>
    </label>
  </div>


  <div class="card" style="margin-bottom:12px">
    <h3>⏱ Non-SDK কাউন্টডাউন</h3>
    <p class="muted smalltext">Monetag/RichAds/Custom লিংক মোডে অ্যাড খোলার পর কত সেকেন্ড পর রিওয়ার্ড দেবে</p>
    <div class="field" style="max-width:200px">
      <input id="adLinkSeconds" type="number" min="5" max="120" value="${Number(s.adLinkSeconds)||20}">
    </div>
  </div>

  <details class="card" style="margin-bottom:12px">
    <summary style="cursor:pointer;font-weight:700;padding:4px 0">⚙ অ্যাডভান্সড · প্রতি স্লটে আলাদা নেটওয়ার্ক (ঐচ্ছিক)</summary>
    <p class="muted smalltext" style="margin:8px 0">খালি রাখলে মেইন রিওয়ার্ডেড/ব্যানার ব্যবহার হবে</p>
    ${[
      ["unlock","Movie Unlock"],
      ["interstitial","Interstitial (fallback)"],
      ["task","Daily Task only"],
      ["adult","Adult rewarded only"],
      ["bannerAdult","Adult banner only"]
    ].map(function(row){
      return '<div class="form-grid" style="margin-top:10px;padding-top:10px;border-top:1px solid #1a2236">'+
        '<div class="field"><label>'+row[1]+' · Network</label>'+netSel("net_"+row[0], net(row[0]))+'</div>'+
        '<div class="field"><label>ID / Zone / URL</label><input id="id_'+row[0]+'" value="'+val(row[0])+'" placeholder="খালি = মেইন ব্যবহার"></div>'+
        '</div>';
    }).join("")}
  </details>

  <div class="grid section-grid">
    <button class="btn primary" style="margin-top:14px;width:100%;padding:14px" onclick="saveAds()">💾 Save Ad Settings</button>
  <div class="card" style="margin-top:14px">
    <h3>সাপোর্টেড নেটওয়ার্ক</h3>
    <p class="muted smalltext">
      <b>Adsgram</b> · <b>Monetag</b> · RichAds · OnClicka · TADS · AdSonar · PropellerAds · Adexium · AADS · Hilltop · Custom URL<br>
      মুভি বট: রিওয়ার্ডেড → পয়েন্ট/আনলক/টাস্ক (হোম ব্যানার সরানো হয়েছে)
    </p>
  </div>`;
}
function saveAds(){
  ensureAdSlots();
  A.settings.adSlots = A.settings.adSlots || {};
  A.settings.adBlocks = A.settings.adBlocks || {};

  const mainRewNet = (document.getElementById("mainRewNet")||{}).value || "adsgram";
  const mainRewId = String((document.getElementById("mainRewId")||{}).value || "").trim();
  const mainBanNet = (document.getElementById("mainBanNet")||{}).value || "adsgram";
  const mainBanId = String((document.getElementById("mainBanId")||{}).value || (A.settings.adBlocks&&A.settings.adBlocks.banner) || "").trim();
  const applyRew = (document.getElementById("applyRewAll")||{}).checked !== false;
  const applyBan = (document.getElementById("applyBanAll")||{}).checked !== false;

  // Main rewarded
  A.settings.adSlots.rewarded = { network: mainRewNet, id: mainRewId };
  A.settings.adBlocks.rewarded = mainRewId;

  const rewSlots = ["unlock","interstitial","task","adult"];
  rewSlots.forEach(function(k){
    const netEl = document.getElementById("net_"+k);
    const idEl = document.getElementById("id_"+k);
    let network = netEl ? netEl.value : mainRewNet;
    let id = idEl ? String(idEl.value||"").trim() : "";
    if (applyRew || !id) {
      // use main if empty or apply-all checked
      if (applyRew || !id) {
        network = mainRewNet;
        id = mainRewId;
      }
    }
    // if advanced has explicit id, keep it when applyRew is off
    if (!applyRew && idEl && String(idEl.value||"").trim()) {
      network = netEl ? netEl.value : mainRewNet;
      id = String(idEl.value||"").trim();
    }
    A.settings.adSlots[k] = { network: network, id: id };
    A.settings.adBlocks[k] = id;
  });

  // Main banner
  A.settings.adSlots.banner = { network: mainBanNet, id: mainBanId };
  A.settings.adBlocks.banner = mainBanId;

  const banAdultNetEl = document.getElementById("net_bannerAdult");
  const banAdultIdEl = document.getElementById("id_bannerAdult");
  let banAdultNet = banAdultNetEl ? banAdultNetEl.value : mainBanNet;
  let banAdultId = banAdultIdEl ? String(banAdultIdEl.value||"").trim() : "";
  if (applyBan || !banAdultId) {
    banAdultNet = mainBanNet;
    banAdultId = mainBanId;
  }
  A.settings.adSlots.bannerAdult = { network: banAdultNet, id: banAdultId };
  A.settings.adBlocks.bannerAdult = banAdultId;

  const sec = document.getElementById("adLinkSeconds");
  if (sec) A.settings.adLinkSeconds = Math.max(5, Math.min(120, Number(sec.value)||20));

  try { saveBanners(); } catch(e) {}
  save();
  toast("Ad networks saved — rewarded + banner ready");
}

function tasks(){
  // Only seed defaults once — never force-fill after admin deletes all
  if(!A.settings.tasks){
    A.settings.tasks=[];
  }
  if(!A.settings.tasks.length && !A.settings._tasksCleared){
    A.settings.tasks=[
      {name:"Daily Login",nameBn:"ডেইলি লগইন",reward:2,limit:1,type:"login",seconds:0,link:"",resetHours:24,resetMode:"midnight",permanent:false},
      {name:"Join Telegram channel",nameBn:"টেলিগ্রাম চ্যানেলে যোগ দিন",reward:5,limit:1,type:"telegram",seconds:0,link:A.settings.telegramChannelLink||"",resetHours:24,resetMode:"hours",permanent:true},
      {name:"Open link task",nameBn:"লিংক ওপেন টাস্ক",reward:2,limit:1,type:"link",seconds:15,link:"",resetHours:24,resetMode:"hours",permanent:false},
      {name:"Watch ads task",nameBn:"এড দেখুন",reward:2,limit:5,type:"ad",seconds:0,link:"",resetHours:24,resetMode:"midnight",permanent:false},
      {name:"Refer a friend",nameBn:"বন্ধু রেফার করুন",reward:A.settings.referralReward||20,limit:10,type:"share",seconds:0,link:"",resetHours:24,resetMode:"hours",permanent:false}
    ];
  }
  const cards=A.settings.tasks.map((t,i)=>`
  <div class="card task-admin-card" style="margin-bottom:12px">
    <div class="toolbar" style="margin-bottom:10px">
      <h3 style="margin:0;font-size:15px">🎁 Task #${i+1}</h3>
      <button class="btn danger" onclick="A.settings.tasks.splice(${i},1);if(!A.settings.tasks.length)A.settings._tasksCleared=true;save();render()">🗑 Delete</button>
    </div>
    <div class="form-grid">
      <div class="field"><label>Task Name (English)</label><input value="${(t.name||"").replace(/"/g,"&quot;")}" onchange="A.settings.tasks[${i}].name=this.value;save()"></div>
      <div class="field"><label>টাস্ক নাম (বাংলা)</label><input value="${(t.nameBn||"").replace(/"/g,"&quot;")}" placeholder="বাংলা নাম" onchange="A.settings.tasks[${i}].nameBn=this.value;save()"></div>
      <div class="field"><label>Reward Points</label><input type="number" value="${t.reward||0}" onchange="A.settings.tasks[${i}].reward=Number(this.value)||0;save()"></div>
      <div class="field"><label>Daily Limit</label><input type="number" value="${t.limit||1}" onchange="A.settings.tasks[${i}].limit=Number(this.value)||1;save()"></div>
      <div class="field"><label>Type</label>
        <select onchange="A.settings.tasks[${i}].type=this.value;save();render()">
          <option value="login" ${t.type==="login"?"selected":""}>Daily Login (tap = points)</option>
          <option value="telegram" ${t.type==="telegram"||t.type==="join"?"selected":""}>Telegram Join (must join channel)</option>
          <option value="social" ${t.type==="social"||t.type==="visit"?"selected":""}>Social / any link (NO countdown — Claim)</option>
          <option value="link" ${t.type==="link"?"selected":""}>Open Link + countdown</option>
          <option value="countdown" ${t.type==="countdown"||t.type==="oneclick"?"selected":""}>Countdown only</option>
          <option value="ad" ${t.type==="ad"?"selected":""}>Watch Ads (N times to complete)</option>
          <option value="share" ${t.type==="share"?"selected":""}>Refer friends (counts real joins)</option>
        </select>
      </div>
      <div class="field"><label>Reset mode</label>
        <select onchange="A.settings.tasks[${i}].resetMode=this.value;save()">
          <option value="hours" ${(t.resetMode||"hours")==="hours"?"selected":""}>After X hours</option>
          <option value="midnight" ${t.resetMode==="midnight"?"selected":""}>Every day at 12:00 AM</option>
        </select>
      </div>
      <div class="field"><label>Countdown Seconds</label><input type="number" value="${t.seconds||5}" onchange="A.settings.tasks[${i}].seconds=Number(this.value)||5;save()"></div>
      <div class="field" style="grid-column:1/-1"><label>Link / Channel (t.me/… or -100… for private, or any https:// social link)</label>
        <input value="${(t.link||"").replace(/"/g,"&quot;")}" placeholder="https://t.me/..." onchange="A.settings.tasks[${i}].link=this.value;save()">
      </div>
      <div class="field"><label>Reset Every (Hours)</label><input type="number" min="1" value="${t.resetHours||24}" ${t.permanent?"disabled":""} onchange="A.settings.tasks[${i}].resetHours=Number(this.value)||24;save()" placeholder="e.g. 24"></div>
      <div class="field" style="display:flex;align-items:center;gap:8px;margin-top:22px">
        <input type="checkbox" id="perm-${i}" style="width:16px;height:16px" ${t.permanent?"checked":""} onchange="A.settings.tasks[${i}].permanent=this.checked;save();render()">
        <label for="perm-${i}" style="margin:0">Permanent (one-time, never resets)</label>
      </div>
    </div>
  </div>`).join("");
  return `<div class="toolbar">
    <div><h2 style="margin:0;font-size:18px">Daily Tasks</h2><p class="muted smalltext" style="margin:4px 0 0">User app → <b>MORE EARNING BUTTONS</b> (Start cards). Independent from Watch Ad Now / Points settings.</p></div>
    <button class="btn primary" onclick="A.settings.tasks.push({name:'New Task',nameBn:'',reward:2,limit:1,type:'login',seconds:5,link:'',resetHours:24,resetMode:'hours',permanent:false});save();render()">＋ Add Task</button>
  </div>
  ${cards||'<div class="card muted">No tasks yet. Click Add Task.</div>'}
  <div class="card" style="margin-top:8px"><p class="muted smalltext">User app → Tasks page. Types: <b>Daily Login</b> = one tap points. <b>Telegram Join</b> = points only after bot verifies membership (bot must be admin in channel). <b>Social / any link</b> = Facebook, YouTube, Instagram, Website… no timer; Claim or Cancel. <b>Open Link</b> = URL + countdown. <b>Telegram Join</b> = public or private channel/group (bot must be Admin; private → use chat id -100…). <b>Watch Ads</b> = complete after Limit ads. <b>Refer</b> = real joins count. Top “Watch Ad Now” is separate (Points settings: reward + daily limit + reset). Permanent = stays Done until you delete the task.</p></div>`;
}

function payments(){
  // Trigger async load once
  if (!window.__payLoaded) {
    window.__payLoaded = true;
    if (window.CineHubFB && window.CineHubFB.listPayments) {
      window.CineHubFB.listPayments().then(function(list){
        A.payments = Array.isArray(list) ? list : [];
        try { localStorage.setItem("cinehub4_payments", JSON.stringify(A.payments)); } catch(e){}
        if (A.section === "payments") render();
      }).catch(function(e){
        console.warn("listPayments", e);
        toast("Payments load failed: " + (e && e.message ? e.message : e));
      });
    }
  }
  let list = A.payments;
  if (!list || !list.length) {
    try { list = JSON.parse(localStorage.getItem("cinehub4_payments")||"[]"); } catch(e){ list = []; }
  }
  list = (list || []).map(function(p,i){ p._i = i; return p; });
  list.sort(function(a,b){
    const rank = function(s){ return (s==="pending"||!s)?0:1; };
    const ra = rank(a.status), rb = rank(b.status);
    if (ra !== rb) return ra - rb;
    return (Number(a.created_at||a.time||0) - Number(b.created_at||b.time||0));
  });
  const rows = list.length ? list.map(function(p){
    const uid = p.userId || p.user_id || p.uid || "—";
    const uname = p.user || p.username || "";
    const when = p.date || (p.created_at||p.ts ? new Date(Number(p.created_at||p.ts)).toLocaleString() : "—");
    const pts = p.points || p.amount || 0;
    const method = p.method || p.gateway || "—";
    const trx = p.trxId || p.trx || p.transaction_id || "—";
    const st = p.status || "pending";
    const idAttr = String(p.id || p._i);
    return '<tr>'+
      '<td><b>'+String(uname||uid).replace(/</g,"")+'</b><div class="muted smalltext">'+String(uid).replace(/</g,"")+'</div><div class="muted smalltext">'+String(when).replace(/</g,"")+'</div></td>'+
      '<td>'+pts+'</td>'+
      '<td>'+String(method).replace(/</g,"")+'</td>'+
      '<td class="muted">'+String(trx).replace(/</g,"")+'</td>'+
      '<td><span class="badge '+(st==="approved"?"green":st==="rejected"?"red":"yellow")+'">'+st+'</span></td>'+
      '<td><button class="btn" onclick="payView(\''+idAttr.replace(/'/g,"\\'")+'\')">View</button></td>'+
      '<td>'+((!st||st==="pending")?
        '<button class="btn primary" onclick="payActionId(\''+idAttr.replace(/'/g,"\\'")+'\',\'approved\')">Accept</button> '+
        '<button class="btn danger" onclick="payActionId(\''+idAttr.replace(/'/g,"\\'")+'\',\'rejected\')">Reject</button>':
        '<button class="btn danger" onclick="payDeleteId(\''+idAttr.replace(/'/g,"\\'")+'\')">Delete</button>')+
      '</td></tr>';
  }).join("") : '<tr><td colspan="7" class="muted">No payment requests yet (from Firebase)</td></tr>';
  return '<div class="card table-wrap"><table class="table"><thead><tr><th>User</th><th>Points</th><th>Method</th><th>Trx</th><th>Status</th><th>Proof</th><th>Action</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<p class="muted smalltext" style="margin-top:10px">Payments load from Firebase <code>payments</code> collection via admin API. User submits from Profile → Buy Points.</p>';
}
function payFindById(id){
  var list = A.payments || [];
  var p = list.find(function(x){ return String(x.id)===String(id); });
  if (p) return p;
  try { list = JSON.parse(localStorage.getItem("cinehub4_payments")||"[]"); } catch(e){ list=[]; }
  return list.find(function(x){ return String(x.id)===String(id); }) || list[Number(id)];
}
function payView(id){
  var list = A.payments || [];
  if (!list.length) {
    try { list = JSON.parse(localStorage.getItem("cinehub4_payments")||"[]"); } catch(e){ list=[]; }
  }
  var p = list.find(function(x){ return String(x.id)===String(id); });
  if (!p) { toast("Not found"); return; }
  var img = p.proofData || p.proof || p.image || p.screenshot || "";
  var isImg = img && (String(img).indexOf("data:image")===0 || /^https?:\/\//i.test(img));
  var when = p.date || p.created || "";
  if (!when && (p.created_at || p.ts)) {
    try { when = new Date(Number(p.created_at || p.ts)).toLocaleString(); } catch(e){ when = String(p.created_at||p.ts); }
  }
  var uname = p.user || p.username || p.name || "—";
  var uid = p.userId || p.uid || "—";
  showModal('<div class="modal-head"><h2>Payment Request</h2><button class="btn" onclick="closeModal()">×</button></div>'+
    '<div class="pay-meta-row"><span>Name</span><b>'+String(uname).replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>Telegram ID</span><b>'+String(uid).replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>Package</span><b>'+String(p.pkg||p.package||"—").replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>USDT</span><b>'+String(p.usdt||p.amount_usdt||"—")+'</b></div>'+
    '<div class="pay-meta-row"><span>Points</span><b>'+(p.points||p.amount||0)+'</b></div>'+
    '<div class="pay-meta-row"><span>Wallet</span><b>'+String(p.wallet||"—").replace(/</g,"")+' / '+String(p.network||"").replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>TxID</span><b style="word-break:break-all">'+String(p.txid||p.trxId||p.trx||"—").replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>Time</span><b>'+String(when).replace(/</g,"")+'</b></div>'+
    '<div class="pay-meta-row"><span>Status</span><b class="badge">'+(p.status||"pending")+'</b></div>'+
    (isImg ? '<div class="pay-proof-frame" style="margin-top:10px"><img src="'+String(img).replace(/"/g,"&quot;")+'" alt="proof" style="max-width:100%;border-radius:8px"></div>' :
      (p.proof ? '<div class="muted" style="margin-top:8px">Proof file: '+String(p.proof).replace(/</g,"")+'</div>' : '<div class="muted" style="margin-top:8px">No screenshot attached</div>'))+
    '<div style="margin-top:12px;display:flex;gap:8px">'+
    ((p.status||"pending")==="pending"?
      '<button class="btn primary" onclick="closeModal();payActionId(\''+String(p.id).replace(/'/g,"\\'")+'\',\'approved\')">✓ Accept</button>'+
      '<button class="btn danger" onclick="closeModal();payActionId(\''+String(p.id).replace(/'/g,"\\'")+'\',\'rejected\')">Reject</button>':'')+
    '</div>');
}
function payActionId(id, st){
  if (!window.CineHubFB || !window.CineHubFB.updatePayment) {
    toast("API missing — redeploy Code.gs"); return;
  }
  toast(st==="approved"?"Accepting & adding points…":"Updating…");
  window.CineHubFB.updatePayment(id, {status: st, reviewed_at: Date.now()}).then(function(res){
    window.__payLoaded = false;
    if (A.payments) {
      A.payments.forEach(function(p){
        if (String(p.id)===String(id)) {
          p.status = st;
          if (res && res.points_credited) p.points_credited = true;
        }
      });
    }
    render();
    if (st==="approved") {
      var pts = (res && res.credited_points) || "";
      toast(pts ? ("Accepted · +"+pts+" points to user") : "Accepted · points credited");
    } else if (st==="rejected") {
      toast("Rejected · no points added");
    } else {
      toast("Updated");
    }
  }).catch(function(e){ toast("Failed: "+(e&&e.message?e.message:e)); });
}
function payDeleteId(id){
  if (!confirm("Delete this payment request from Firebase? User points will NOT be removed.")) return;
  if (!window.CineHubFB || !window.CineHubFB.deletePayment) {
    toast("API missing — redeploy Code.gs"); return;
  }
  toast("Deleting…");
  window.CineHubFB.deletePayment(id).then(function(){
    A.payments = (A.payments||[]).filter(function(p){ return String(p.id)!==String(id); });
    window.__payLoaded = false;
    render();
    toast("Payment deleted from Firebase");
  }).catch(function(e){ toast("Delete failed: "+(e&&e.message?e.message:e)); });
}

function requests(){
  if (!window.__reqLoaded) {
    window.__reqLoaded = true;
    if (window.CineHubFB && window.CineHubFB.listRequests) {
      window.CineHubFB.listRequests().then(function(list){
        A.requests = Array.isArray(list) ? list : [];
        if (A.section === "requests") render();
      }).catch(function(e){ console.warn(e); toast("Requests load failed: "+(e&&e.message?e.message:e)); });
    }
  }
  const list = A.requests || [];
  const rows = list.length ? list.map(function(r){
    const user = r.username || r.userId || r.uid || "—";
    const title = r.title || r.movie || r.name || "—";
    const date = r.created_at ? new Date(Number(r.created_at)).toLocaleDateString() : (r.date||"—");
    const pri = r.priority || "Normal";
    const st = r.status || "Pending";
    const id = String(r.id||"");
    return '<tr><td>'+String(user).replace(/</g,"")+'</td><td><b>'+String(title).replace(/</g,"")+'</b></td><td>'+date+'</td><td>'+pri+'</td>'+
      '<td><span class="badge">'+st+'</span></td>'+
      '<td><button class="btn" onclick="reqManage(\''+id.replace(/'/g,"\\'")+'\')">Manage</button> '+
      '<button class="btn danger" onclick="reqDelete(\''+id.replace(/'/g,"\\'")+'\')">Delete</button></td></tr>';
  }).join("") : '<tr><td colspan="6" class="muted">No movie requests yet (from Firebase)</td></tr>';
  return '<div class="card table-wrap"><table class="table"><thead><tr><th>User</th><th>Requested Title</th><th>Date</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function reqManage(id){
  const r = (A.requests||[]).find(function(x){return String(x.id)===String(id);});
  if (!r) { toast("Not found"); return; }
  const st = prompt("Status (Pending / Searching / Done / Rejected):", r.status||"Pending");
  if (st==null) return;
  window.CineHubFB.updateRequest(id, {status: st}).then(function(){
    r.status = st; render(); toast("Updated");
  }).catch(function(e){ toast(e&&e.message?e.message:e); });
}
function reqDelete(id){
  if (!confirm("Delete this request from Firebase?")) return;
  if (!window.CineHubFB || !window.CineHubFB.deleteRequest) {
    toast("API missing — redeploy Code.gs"); return;
  }
  window.CineHubFB.deleteRequest(id).then(function(){
    A.requests = (A.requests||[]).filter(function(x){return String(x.id)!==String(id);});
    window.__reqLoaded = false;
    render(); toast("Request deleted from Firebase");
  }).catch(function(e){ toast(e&&e.message?e.message:e); });
}

function adult(){const adultList=(A.movies||[]).filter(m=>m.adult);return `<div class="grid section-grid">
<div class="card"><h3>Adult Library</h3>
  <div class="switch"><span>Enable adult section (user 18+ tab)</span><span class="toggle ${A.adultEnabled?'on':''}" onclick="A.adultEnabled=!A.adultEnabled;A.settings.adultEnabled=A.adultEnabled;A.settings.adultLibraryEnabled=A.adultEnabled;save();render()"><i></i></span></div>
  <div class="switch"><span>Adult movies in DB</span><span class="badge green">${adultList.length}</span></div>
  <div class="switch"><span>18+ confirmation</span><span class="badge green">REQUIRED</span></div>
  <button class="btn primary" style="margin-top:15px" onclick="openAdultMovie()">＋ Add Adult Movie</button>
</div>
<div class="card"><h3>Adult Ad Rule</h3><div class="muted smalltext">Adult ads use their own Block ID (Ads section).</div>
  <button class="btn" style="margin-top:12px" onclick="setSection('ads')">Configure Adult Ad</button>
  <button class="btn" style="margin-top:8px" onclick="setSection('categories')">Adult Categories (EN+BN)</button>
</div>
</div>
<div class="card table-wrap" style="margin-top:14px"><div class="toolbar"><h3 style="margin:0">Adult Movies</h3><span class="muted">${adultList.length} items</span></div>
<table class="table"><thead><tr><th>Movie</th><th>Category</th><th>Rating</th><th>Clicks</th><th>Downloads</th><th>Status</th><th>Action</th></tr></thead>
<tbody>${adultMovieRows(adultList)}</tbody></table></div>
<div class="card" style="margin-top:14px"><h3>Adult Page Text</h3><div class="muted smalltext">Edit labels shown on the Adult page. Colors and layout stay the same as Movies.</div><div class="form-grid" style="margin-top:12px"><div class="field"><label>Badge</label><input id="aLibBadge" value="${A.settings.adultLibraryBadge||''}"></div><div class="field"><label>Title</label><input id="aLibTitle" value="${A.settings.adultLibraryTitle||''}"></div><div class="field"><label>Description</label><input id="aLibDesc" value="${A.settings.adultLibraryDesc||''}"></div><div class="field"><label>Ticker Text</label><input id="aTicker" value="${A.settings.adultTickerText||''}"></div><div class="field"><label>New Label</label><input id="aNewLabel" value="${A.settings.adultNewLabel||''}"></div><div class="field"><label>New Sub</label><input id="aNewSub" value="${A.settings.adultNewSub||''}"></div><div class="field"><label>Trending Label</label><input id="aTrendLabel" value="${A.settings.adultTrendingLabel||''}"></div><div class="field"><label>Trending Sub</label><input id="aTrendSub" value="${A.settings.adultTrendingSub||''}"></div></div><button class="btn primary" style="margin-top:14px" onclick="saveAdultTexts()">Save Adult Page Text</button></div>`}
function openCategoryAdult(index=null){openAdultCategory(index)}
function editCategoryAdult(i){openAdultCategory(i)}
function saveCategoryAdult(i){const n=$('#catNameAdult').value.trim();if(!n)return;if(i<0)A.settings.adultCategories.push(n);else A.settings.adultCategories[i]=n;save();closeModal();render();toast('Adult category saved')}
function deleteCategoryAdult(i){if(A.settings.adultCategories[i]==='All'){toast('All category cannot be deleted');return}if(confirm('Delete this adult category?')){A.settings.adultCategories.splice(i,1);save();render();toast('Adult category deleted')}}
function saveAdultTexts(){A.settings.adultLibraryBadge=$('#aLibBadge').value.trim();A.settings.adultLibraryTitle=$('#aLibTitle').value.trim();A.settings.adultLibraryDesc=$('#aLibDesc').value.trim();A.settings.adultTickerText=$('#aTicker').value.trim();A.settings.adultNewLabel=$('#aNewLabel').value.trim();A.settings.adultNewSub=$('#aNewSub').value.trim();A.settings.adultTrendingLabel=$('#aTrendLabel').value.trim();A.settings.adultTrendingSub=$('#aTrendSub').value.trim();save();toast('Adult page text saved')}

function adultMovieRows(ms){
  if(!ms||!ms.length) return `<tr><td colspan="7" class="muted">No adult movies yet. Use “＋ Add Adult Movie”.</td></tr>`;
  return ms.map(function(m){
    var id=String(m.id||"");
    var title=String(m.title||"Untitled").replace(/</g,"&lt;");
    return '<tr data-mid="'+id.replace(/"/g,"&quot;")+'" data-adult="1">'+
      '<td><div class="movie-row"><div class="thumb">'+(title.slice(0,1)||"?")+'</div><div><b>'+title+'</b><div class="muted">'+(m.year||"")+'</div></div></div></td>'+
      '<td>'+String(m.category||"Adult").replace(/</g,"")+'</td>'+
      '<td>⭐ '+(m.rating||0)+'</td>'+
      '<td>'+money(m.clicks||0)+'</td>'+
      '<td>'+money(m.downloads||0)+'</td>'+
      '<td><span class="badge green">'+(m.status||"Published")+'</span></td>'+
      '<td class="action-cell"><button type="button" class="btn dots-btn" data-mid="'+id.replace(/"/g,"&quot;")+'" data-adult="1">⋮</button>'+
      '<div class="dots-menu hidden" data-menu-for="'+id.replace(/"/g,"&quot;")+'">'+
      '<button type="button" class="dots-edit" data-adult="1">Edit</button>'+
      '<button type="button" class="danger dots-del">Delete</button></div></td></tr>';
  }).join("");
}

function contentPage(){const s=A.settings;return `<div class="toolbar"><div><h2 style="margin:0;font-size:18px">Links & Videos</h2><p class="muted smalltext" style="margin:4px 0 0">Labels support <b>English + বাংলা</b>. URLs are shared.</p></div></div>
<div class="grid section-grid">
  <div class="card"><h3>▶ How to Watch (Movies)</h3>
    <div class="field"><label>Button label (EN)</label><input id="lnk_howLabel" value="${s.howToWatchLabel||'▶ How to Watch'}"></div>
    <div class="field" style="margin-top:10px"><label>বাটন লেবেল (বাংলা)</label><input id="lnk_howLabelBn" value="${s.howToWatchLabelBn||''}" placeholder="▶ কীভাবে দেখবেন"></div>
    <div class="field" style="margin-top:10px"><label>Link / Video URL</label><input id="lnk_howWatch" value="${s.howToWatchVideo||''}" placeholder="https://..."></div>
  </div>
  <div class="card"><h3>▶ How to Watch (Adult)</h3>
    <div class="field"><label>Button label (EN)</label><input id="lnk_adultHowLabel" value="${s.adultHowToWatchLabel||'▶ How to Watch'}"></div>
    <div class="field" style="margin-top:10px"><label>বাটন লেবেল (বাংলা)</label><input id="lnk_adultHowLabelBn" value="${s.adultHowToWatchLabelBn||''}" placeholder="▶ কীভাবে দেখবেন"></div>
    <div class="field" style="margin-top:10px"><label>Link / Video URL</label><input id="lnk_adultHowWatch" value="${s.adultHowToWatchVideo||''}" placeholder="https://..."></div>
  </div>
  <div class="card"><h3>🛒 How to Buy</h3>
    <div class="field"><label>Link / Video URL</label><input id="lnk_howBuy" value="${s.howToBuyVideo||''}" placeholder="https://..."></div>
  </div>
  <div class="card"><h3>📘 Tutorial (Profile)</h3>
    <div class="field"><label>Watch Tutorial Video URL</label><input id="lnk_tutorial" value="${s.watchTutorialVideo||''}" placeholder="https://..."></div>
  </div>
  <div class="card"><h3>📱 Telegram Links</h3>
    <div class="field"><label>Bot link (menu / Telegram button)</label><input id="lnk_bot" value="${s.telegramBotLink||''}" placeholder="https://t.me/YourBot"></div>
    <div class="field" style="margin-top:10px"><label>Channel link</label><input id="lnk_channel" value="${s.telegramChannelLink||''}" placeholder="https://t.me/channel"></div>
    <div class="field" style="margin-top:10px"><label>Mini App link</label><input id="lnk_mini" value="${s.miniAppLink||''}" placeholder="https://t.me/YourBot/Hub4"></div>
  </div>
</div>
<button class="btn primary" style="margin-top:14px" onclick="saveAllLinks()">Save All Links</button>`}
function saveAllLinks(){
  const g=id=>document.getElementById(id);
  if(g('lnk_howLabel')) A.settings.howToWatchLabel=g('lnk_howLabel').value.trim();
  if(g('lnk_howLabelBn')) A.settings.howToWatchLabelBn=g('lnk_howLabelBn').value.trim();
  if(g('lnk_howWatch')) A.settings.howToWatchVideo=g('lnk_howWatch').value.trim();
  if(g('lnk_adultHowLabel')) A.settings.adultHowToWatchLabel=g('lnk_adultHowLabel').value.trim();
  if(g('lnk_adultHowLabelBn')) A.settings.adultHowToWatchLabelBn=g('lnk_adultHowLabelBn').value.trim();
  if(g('lnk_adultHowWatch')) A.settings.adultHowToWatchVideo=g('lnk_adultHowWatch').value.trim();
  if(g('lnk_howBuy')) A.settings.howToBuyVideo=g('lnk_howBuy').value.trim();
  if(g('lnk_tutorial')) A.settings.watchTutorialVideo=g('lnk_tutorial').value.trim();
  if(g('lnk_bot')) A.settings.telegramBotLink=g('lnk_bot').value.trim();
  if(g('lnk_channel')) A.settings.telegramChannelLink=g('lnk_channel').value.trim();
  if(g('lnk_mini')) A.settings.miniAppLink=g('lnk_mini').value.trim();
  save(); toast('All links saved to Firebase');
}
function saveVideo(){saveAllLinks()}
function broadcast(){return `<div class="card"><h3>Broadcast Center</h3><p class="muted">Bot broadcast is handled from your Telegram Bot (BotBusiness / bot commands). This panel does not send demo messages.</p><div class="field" style="margin-top:12px"><label>Tip</label><p class="muted smalltext">Use your bot admin commands to notify users. Mini App + Firebase data stays shared.</p></div></div>`}
function settings(){
  const s=A.settings;
  const pkgs=(s.packages||[]).map((p,i)=>`<div class="field" style="grid-column:1/-1;border:1px solid #243049;border-radius:12px;padding:12px;margin-bottom:8px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <div><label>Package name (EN)</label><input data-pkg="${i}" data-k="name" value="${(p.name||"").replace(/"/g,"&quot;")}"></div>
      <div><label>প্যাকেজ নাম (বাংলা)</label><input data-pkg="${i}" data-k="nameBn" value="${(p.nameBn||"").replace(/"/g,"&quot;")}" placeholder="বাংলা"></div>
      <div><label>Tag (EN)</label><input data-pkg="${i}" data-k="tag" value="${(p.tag||"").replace(/"/g,"&quot;")}"></div>
      <div><label>ট্যাগ (বাংলা)</label><input data-pkg="${i}" data-k="tagBn" value="${(p.tagBn||"").replace(/"/g,"&quot;")}" placeholder="বাংলা"></div>
      <div><label>USDT price</label><input data-pkg="${i}" data-k="price" type="number" step="0.01" value="${p.price||0}"></div>
      <div><label>Points</label><input data-pkg="${i}" data-k="points" type="number" value="${p.points||0}"></div>
    </div>
    <button class="btn danger" style="margin-top:8px" onclick="A.settings.packages.splice(${i},1);save();render()">× Delete package</button>
  </div>`).join("");
  return `<div class="grid section-grid">
  <div class="card"><h3>Brand & Links</h3>
    <div class="form-grid">
      <div class="field"><label>App Name</label><input id="s_appName" value="${s.appName||""}"></div>
      <div class="field"><label>Bot Username</label><input id="s_botUser" value="${s.botUsername||""}" placeholder="@Cinehub4bot"></div>
      <div class="field"><label>Bot Link</label><input id="s_botLink" value="${s.telegramBotLink||""}" placeholder="https://t.me/Cinehub4bot"></div>
      <div class="field"><label>Channel Link</label><input id="s_channel" value="${s.telegramChannelLink||""}"></div>
      <div class="field"><label>Mini App short name</label><input id="s_miniName" value="${s.miniAppName||"Hub4"}" placeholder="Hub4"></div>
      <div class="field"><label>Mini App full link</label><input id="s_miniLink" value="${s.miniAppLink||"https://t.me/Cinehub4bot/Hub4"}" placeholder="https://t.me/Cinehub4bot/Hub4"></div>
      <div class="field" style="grid-column:1/-1"><label class="muted smalltext">⚠️ BotFather short name = <b>Hub4</b> → share link will be <code>t.me/Cinehub4bot/Hub4?startapp=movie_ID</code></label></div>
      <div class="field" style="grid-column:1/-1"><label>How to Watch / Unlock message (text only)</label><textarea id="s_howWatch" rows="2">${s.howToWatchText||""}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label class="muted smalltext">Video/URL links → use <b>Links & Videos</b> tab (How to Watch, How to Buy, Tutorial, Telegram)</label></div>
    </div>
  </div>

  <div class="card"><h3>Home Page Texts (EN + বাংলা)</h3>
    <div class="form-grid">
      <div class="field"><label>New Movies (EN)</label><input id="s_newLabel" value="${s.newMoviesLabel||"New Movies"}"></div>
      <div class="field"><label>নতুন মুভি (বাংলা)</label><input id="s_newLabelBn" value="${s.newMoviesLabelBn||""}" placeholder="নতুন মুভি"></div>
      <div class="field"><label>New sub (EN)</label><input id="s_newSub" value="${s.newMoviesSub||"LATEST UPLOADS"}"></div>
      <div class="field"><label>সাব (বাংলা)</label><input id="s_newSubBn" value="${s.newMoviesSubBn||""}" placeholder="লেটেস্ট আপলোড"></div>
      <div class="field"><label>Trending (EN)</label><input id="s_trendLabel" value="${s.trendingLabel||"Trending"}"></div>
      <div class="field"><label>ট্রেন্ডিং (বাংলা)</label><input id="s_trendLabelBn" value="${s.trendingLabelBn||""}" placeholder="ট্রেন্ডিং"></div>
      <div class="field"><label>Trending sub (EN)</label><input id="s_trendSub" value="${s.trendingSub||"MOST WATCHED"}"></div>
      <div class="field"><label>সাব (বাংলা)</label><input id="s_trendSubBn" value="${s.trendingSubBn||""}" placeholder="সবচেয়ে বেশি দেখা"></div>
      <div class="field"><label>Library badge (EN)</label><input id="s_libBadge" value="${s.libraryBadge||"MOVIE ZONE"}"></div>
      <div class="field"><label>ব্যাজ (বাংলা)</label><input id="s_libBadgeBn" value="${s.libraryBadgeBn||""}" placeholder="মুভি জোন"></div>
      <div class="field"><label>Library title (EN)</label><input id="s_libTitle" value="${s.libraryTitle||"Cinema Library"}"></div>
      <div class="field"><label>টাইটেল (বাংলা)</label><input id="s_libTitleBn" value="${s.libraryTitleBn||""}" placeholder="সিনেমা লাইব্রেরি"></div>
      <div class="field" style="grid-column:1/-1"><label>Library description (EN)</label><textarea id="s_libDesc" rows="2">${s.libraryDesc||""}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label>বর্ণনা (বাংলা)</label><textarea id="s_libDescBn" rows="2">${s.libraryDescBn||""}</textarea></div>
      <div class="field"><label>How to Watch btn (EN)</label><input id="s_howLabel" value="${s.howToWatchLabel||"▶ How to Watch"}"></div>
      <div class="field"><label>হাউ টু ওয়াচ (বাংলা)</label><input id="s_howLabelBn" value="${s.howToWatchLabelBn||""}" placeholder="▶ কীভাবে দেখবেন"></div>
      <div class="field" style="grid-column:1/-1"><label>Ticker text (EN)</label><textarea id="s_ticker" rows="2">${s.tickerText||""}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label>টিকার (বাংলা)</label><textarea id="s_tickerBn" rows="2">${s.tickerTextBn||""}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label>How to Watch body text (EN)</label><textarea id="s_howWatch" rows="2">${s.howToWatchText||""}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label>হাউ টু ওয়াচ টেক্সট (বাংলা)</label><textarea id="s_howWatchBn" rows="2">${s.howToWatchTextBn||""}</textarea></div>
      <div class="field"><label class="muted smalltext">Link URL → Links & Videos tab</label><span class="muted">—</span></div>
      <div class="field" style="grid-column:1/-1"><label>Scrolling ticker text</label><textarea id="s_ticker" rows="2">${s.tickerText||""}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label>Categories (comma separated)</label><input id="s_cats" value="${(s.categories||[]).join(", ")}"></div>
    </div>
  </div>
  <div class="card"><h3>Unlock & Ads Economy</h3>
    <div class="form-grid">
      <div class="field"><label>Unlock Cost (points)</label><input id="s_unlockCost" type="number" value="${s.unlockCost||5}"></div>
      <div class="field"><label>Lock after (hours)</label><input id="s_unlockHours" type="number" value="${s.unlockHours||15}"></div>
      <div class="field"><label>Ads needed to unlock</label><input id="s_adsForUnlock" type="number" value="${s.adsForUnlock||5}"></div>
      <div class="field"><label>Points per ad</label><input id="s_adReward" type="number" value="${s.adReward||2}"></div>
      <div class="field"><label>Daily ad limit</label><input id="s_dailyAd" type="number" value="${s.dailyAdLimit||20}"></div>
      <div class="field"><label>Download servers count</label><input id="s_servers" type="number" value="${s.downloadServers||1}"></div>
      <div class="field"><label>Join Bonus points</label><input id="s_joinBonus" type="number" value="${s.joinBonus||10}"></div>
      <div class="field"><label>Referral Reward points</label><input id="s_refReward" type="number" value="${s.referralReward||20}"></div>
    </div>
  </div>
  <div class="card"><h3>USDT Payment</h3>
    <div class="form-grid">
      <div class="field"><label>USDT Wallet Address</label><input id="s_usdt" value="${s.usdtWallet||""}"></div>
      <div class="field"><label>Network</label><input id="s_usdtNet" value="${s.usdtNetwork||"TRC20"}"></div>
    </div>
  </div>
  <div class="card"><h3>Point Packages</h3>
    <div class="form-grid">${pkgs||'<div class="muted">No packages</div>'}
      <button class="btn" onclick="A.settings.packages=A.settings.packages||[];A.settings.packages.push({name:'New Package',nameBn:'',price:1,points:100,tag:'',tagBn:''});save();render()">+ Add Package</button>
    </div>
  </div>


  <div class="card"><h3>🎨 Theme Colors (User App)</h3>
    <div class="form-grid">
      <div class="field"><label>Accent (purple)</label><input id="s_cAccent" type="color" value="${s.themeAccent||"#7c5cff"}"></div>
      <div class="field"><label>Accent 2 (blue)</label><input id="s_cAccent2" type="color" value="${s.themeAccent2||"#5b8cff"}"></div>
      <div class="field"><label>Orange</label><input id="s_cOrange" type="color" value="${s.themeOrange||"#f59e0b"}"></div>
      <div class="field"><label>Pink</label><input id="s_cPink" type="color" value="${s.themePink||"#ec4899"}"></div>
      <div class="field"><label>Background</label><input id="s_cBg" type="color" value="${s.themeBg||"#0a0c14"}"></div>
    </div>
  </div>
  <div class="card" style="grid-column:1/-1"><h3>🌐 UI Texts — প্রতিটি অক্ষর (English / বাংলা)</h3>
    <p class="muted" style="margin-bottom:12px">ইউজার মিনি অ্যাপে বাংলা সিলেক্ট করলে বাংলা টেক্সট দেখাবে, ইংরেজি সিলেক্ট করলে ইংরেজি। <b>মুভি টাইটেল/নাম অনুবাদ হয় না</b> — অ্যাডমিন যে নামে এড করে সেটাই থাকে। খালি রাখলে ডিফল্ট ব্যবহার হবে।</p>
    <div style="max-height:420px;overflow:auto;border:1px solid #1e2438;border-radius:12px;padding:8px">
      <table class="table" style="font-size:12px">
        <thead><tr><th style="width:28%">Key (English default)</th><th>English (override)</th><th>বাংলা (override)</th></tr></thead>
        <tbody id="uiTextBody"></tbody>
      </table>
    </div>
    <button type="button" class="btn" style="margin-top:10px" onclick="addUiTextRow()">＋ Add custom key</button>
  </div>
  <div class="card"><h3>Security</h3>
    <div class="switch"><span>Admin-only panel gate</span><span class="badge green">ENABLED</span></div>
    <div class="switch"><span>Adult library</span><span class="toggle ${A.adultEnabled?'on':''}" onclick="A.adultEnabled=!A.adultEnabled;A.settings.adultEnabled=A.adultEnabled;A.settings.adultLibraryEnabled=A.adultEnabled;this.classList.toggle('on');save()"><i></i></span></div>
  </div>
  <div class="card" style="grid-column:1/-1">
    <button class="btn primary" style="width:100%;padding:14px;font-size:15px" onclick="saveAllSettings()">💾 Save All Settings</button>
  </div>
</div>`;
}
function saveAllSettings(){
  try{collectUiTexts()}catch(e){}
  const g=id=>document.getElementById(id);
  const s=A.settings;
  if(g("s_appName")) s.appName=g("s_appName").value;
  if(g("s_botUser")) s.botUsername=g("s_botUser").value;
  if(g("s_botLink")) s.telegramBotLink=g("s_botLink").value;
  if(g("s_channel")) s.telegramChannelLink=g("s_channel").value;
  if(g("s_miniName")) s.miniAppName=(g("s_miniName").value||"Hub4").trim().replace(/^\/+|\/+$/g,"");
  if(g("s_miniLink")) s.miniAppLink=g("s_miniLink").value.trim();
  if(g("s_howWatch")) s.howToWatchText=g("s_howWatch").value;
    if(g("s_watchTutorial")) s.watchTutorialVideo=g("s_watchTutorial").value;
  if(g("s_howBuy")) s.howToBuyVideo=g("s_howBuy").value;
  if(g("s_newLabel")) s.newMoviesLabel=g("s_newLabel").value;

  if(g("s_newLabelBn")) s.newMoviesLabelBn=g("s_newLabelBn").value;
  if(g("s_newSubBn")) s.newMoviesSubBn=g("s_newSubBn").value;
  if(g("s_trendLabelBn")) s.trendingLabelBn=g("s_trendLabelBn").value;
  if(g("s_trendSubBn")) s.trendingSubBn=g("s_trendSubBn").value;
  if(g("s_libBadgeBn")) s.libraryBadgeBn=g("s_libBadgeBn").value;
  if(g("s_libTitleBn")) s.libraryTitleBn=g("s_libTitleBn").value;
  if(g("s_libDescBn")) s.libraryDescBn=g("s_libDescBn").value;
  if(g("s_howLabelBn")) s.howToWatchLabelBn=g("s_howLabelBn").value;
  if(g("s_tickerBn")) s.tickerTextBn=g("s_tickerBn").value;
  if(g("s_howWatchBn")) s.howToWatchTextBn=g("s_howWatchBn").value;

  if(g("s_newSub")) s.newMoviesSub=g("s_newSub").value;
  if(g("s_trendLabel")) s.trendingLabel=g("s_trendLabel").value;
  if(g("s_trendSub")) s.trendingSub=g("s_trendSub").value;
  if(g("s_libBadge")) s.libraryBadge=g("s_libBadge").value;
  if(g("s_libTitle")) s.libraryTitle=g("s_libTitle").value;
  if(g("s_libDesc")) s.libraryDesc=g("s_libDesc").value;
  if(g("s_howLabel")) s.howToWatchLabel=g("s_howLabel").value;
    if(g("s_ticker")) s.tickerText=g("s_ticker").value;
  if(g("s_cats")) s.categories=g("s_cats").value.split(",").map(x=>x.trim()).filter(Boolean);

  if(g("s_unlockCost")) s.unlockCost=Number(g("s_unlockCost").value)||5;
  if(g("s_unlockHours")) s.unlockHours=Number(g("s_unlockHours").value)||15;
  if(g("s_adsForUnlock")) s.adsForUnlock=Number(g("s_adsForUnlock").value)||5;
  if(g("s_adReward")) s.adReward=Number(g("s_adReward").value)||2;
  if(g("s_dailyAd")) s.dailyAdLimit=Number(g("s_dailyAd").value)||20;
  if(g("s_servers")) s.downloadServers=Number(g("s_servers").value)||1;
  if(g("s_joinBonus")) s.joinBonus=Number(g("s_joinBonus").value)||10;
  if(g("s_refReward")) s.referralReward=Number(g("s_refReward").value)||20;
  if(g("s_usdt")) s.usdtWallet=g("s_usdt").value;
  if(g("s_usdtNet")) s.usdtNetwork=g("s_usdtNet").value;
  if(g("s_cAccent")) s.themeAccent=g("s_cAccent").value;
  if(g("s_cAccent2")) s.themeAccent2=g("s_cAccent2").value;
  if(g("s_cOrange")) s.themeOrange=g("s_cOrange").value;
  if(g("s_cPink")) s.themePink=g("s_cPink").value;
  if(g("s_cBg")) s.themeBg=g("s_cBg").value;
  document.querySelectorAll("[data-pkg]").forEach(inp=>{
    const i=Number(inp.getAttribute("data-pkg"));
    const k=inp.getAttribute("data-k");
    if(!s.packages[i]) return;
    s.packages[i][k]=inp.type==="number"?Number(inp.value):inp.value;
  });
  save();
  // also push key settings into shared localStorage keys used by user app
  try{
    const shared={...s};
    localStorage.setItem("cinehub4_settings",JSON.stringify(shared));
  }catch(e){}
  toast("All settings saved");
}

function saveBrand(){A.settings.appName=$('#appName').value.trim()||'Cine Hub4';A.settings.botUsername=$('#botUser').value.trim();save();toast('Brand saved. Refresh user app to see it')}
function catOptionsHtml(isAdult, selected){
  var src = isAdult ? (A.settings.adultCategories||[]) : (A.settings.categories||[]);
  var cats = src.map(function(c){ return catEn(c); }).filter(Boolean);
  if(isAdult){
    cats = cats.filter(function(c){ return c !== "All"; });
    if(!cats.length) cats = ["Adult Movie"];
  } else {
    if(cats.indexOf("All Movies") < 0) cats.unshift("All Movies");
  }
  if(selected && cats.indexOf(selected) < 0) cats.unshift(selected);
  return cats.map(function(c){
    return '<option'+(selected===c?' selected':'')+'>'+String(c).replace(/</g,'')+'</option>';
  }).join('');
}
function syncMovieCatOptions(){
  var adultEl = document.getElementById("mAdult");
  var catEl = document.getElementById("mCat");
  if(!adultEl || !catEl) return;
  var isAdult = adultEl.value === "1";
  var prev = catEl.value;
  catEl.innerHTML = catOptionsHtml(isAdult, prev);
}
function openMovie(id=null){
  const m = id!=null && id!==0 && id!=='' ? A.movies.find(x=>String(x.id)===String(id)) : null;
  if(m && m.adult){ openAdultMovie(id); return; }
  const idArg = m ? JSON.stringify(String(m.id)) : 'null';
  const isAdult = !!(m && m.adult);
  showModal(`<div class="modal-head"><h2>${m?'Edit':'Add'} Movie</h2><button class="btn" onclick="closeModal()">×</button></div>
  <div class="form-grid">
    <div class="field"><label>Title</label><input id="mTitle" value="${(m?.title||'').replace(/"/g,'&quot;')}"></div>
    <div class="field"><label>Year</label><input id="mYear" type="number" value="${m?.year||2026}"></div>
    <div class="field"><label>Adult content?</label>
      <select id="mAdult" onchange="syncMovieCatOptions()">
        <option value="0" ${!isAdult?'selected':''}>No — normal movie</option>
        <option value="1" ${isAdult?'selected':''}>Yes — adult library</option>
      </select>
    </div>
    <div class="field"><label>Category</label><select id="mCat">${catOptionsHtml(isAdult, m?.category||'')}</select></div>
    <div class="field"><label>Rating</label><input id="mRating" type="number" step=".1" value="${m?.rating||8}"></div>
    <div class="field"><label>Poster URL</label><input id="mPoster" value="${(m?.poster||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div>
    <div class="field" style="grid-column:1/-1"><label>Server 1 URL</label><input id="s1" value="${(m?.server1||m?.server1_link||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div>
    <div class="field" style="grid-column:1/-1"><label>Server 2 URL</label><input id="s2" value="${(m?.server2||m?.server2_link||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div>
    <div class="field" style="grid-column:1/-1"><label>Server 3 URL</label><input id="s3" value="${(m?.server3||m?.server3_link||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div>
  </div>
  <button class="btn primary" style="margin-top:15px;width:100%" onclick="saveMovie(${idArg})">💾 Save Movie</button>`);
}
function saveMovie(id){
  if(window.__savingMovie){toast('Already saving…');return;}
  id=(id===0||id===null||id===undefined||id==='')?null:id;
  const old=id!=null?A.movies.find(m=>String(m.id)===String(id)):null;
  const isAdult=$('#mAdult').value==='1';
  let cat=$('#mCat').value;
  if(isAdult){
    const ac=(A.settings.adultCategories||[]).filter(x=>catEn(x)!=='All');
    if(ac.length&&!ac.some(function(x){return catEn(x)===cat;}))cat=catEn(ac[0]);
  }
  const s1=($('#s1')||{}).value?$('#s1').value.trim():'';
  const s2=($('#s2')||{}).value?$('#s2').value.trim():'';
  const s3=($('#s3')||{}).value?$('#s3').value.trim():'';
  const x={
    id:id!=null?String(id):("m_"+Date.now()),
    title:($('#mTitle').value||'Untitled Movie').trim(),
    type:isAdult?'Adult':'Movie',
    year:+$('#mYear').value||new Date().getFullYear(),
    rating:+$('#mRating').value||8,
    category:cat||'All Movies',
    poster:($('#mPoster').value||'').trim(),
    server1:s1, server2:s2, server3:s3,
    server1_link:s1, server2_link:s2, server3_link:s3,
    s1:s1, s2:s2, s3:s3,
    s1on:true, s2on:true, s3on:true,
    adult:isAdult,
    clicks:old?.clicks||0, downloads:old?.downloads||0, views:old?.views||0,
    status:'Published', manual_movie:true, source:'manual',
    added_time:old?.added_time||Date.now()
  };
  toast('Saving...');
  if(!window.CineHubFB){
    if(id!=null)A.movies=A.movies.map(m=>String(m.id)===String(id)?x:m);else A.movies.unshift(x);
    save(true);closeModal();render();toast(isAdult?'Saved as Adult':'Movie saved (local)');
    return;
  }
  const tmo=setTimeout(function(){toast('Still saving… check network / Deploy');},8000);
  window.__savingMovie=true;
  window.CineHubFB.saveMovie(x).then(function(saved){
    window.__savingMovie=false; clearTimeout(tmo);
    if(id!=null){A.movies=A.movies.map(m=>String(m.id)===String(id)?saved:m);}else if(!A.movies.some(m=>String(m.id)===String(saved&&saved.id))){A.movies.unshift(saved);}
    save(true);closeModal();render();
    toast(isAdult?'Saved as Adult (Adult tab)':'Movie saved to Firebase');
  }).catch(function(e){
    window.__savingMovie=false; clearTimeout(tmo);
    console.error(e);
    toast('Save failed: '+(e&&e.message?e.message:String(e)));
  });
}
function editMovie(id){openMovie(id)}
function deleteMovie(id){
  id=String(id||"");
  if(!id){toast("No movie id");return;}
  if(!confirm("Delete this movie from Firebase permanently?")) return;
  toast("Deleting…");
  if(window.CineHubFB && window.CineHubFB.deleteMovie){
    window.CineHubFB.deleteMovie(id).then(function(){
      A.movies=(A.movies||[]).filter(function(m){return String(m.id)!==id;});
      save(true); render();
      toast("Movie deleted from Firebase");
    }).catch(function(e){
      console.error(e);
      toast("Delete failed: "+(e&&e.message?e.message:e)+" — open Admin as Telegram admin & redeploy Code.gs");
    });
  } else {
    A.movies=(A.movies||[]).filter(function(m){return String(m.id)!==id;});
    save(); render(); toast("Movie removed locally only");
  }
}
function openCategory(index=null){
  ensureBilingualSettings();
  const cur=index===null?{en:"",bn:""}:(A.settings.categories[index]||{en:"",bn:""});
  const en=catEn(cur).replace(/"/g,"&quot;"), bn=catBn(cur).replace(/"/g,"&quot;");
  showModal(`<div class="modal-head"><h2>${index===null?"Add":"Edit"} Category</h2><button class="btn" onclick="closeModal()">×</button></div>
  <div class="field"><label>English name</label><input id="catNameEn" value="${en}" placeholder="e.g. Bangla Movies"></div>
  <div class="field" style="margin-top:10px"><label>বাংলা নাম</label><input id="catNameBn" value="${bn}" placeholder="যেমন: বাংলা মুভি"></div>
  <p class="muted smalltext" style="margin-top:8px">User selects language in mini app → matching name is shown. Movies still match by English name.</p>
  <button class="btn primary" style="margin-top:15px" onclick="saveCategory(${index===null?-1:index})">Save Category</button>`);
}
function editCategory(i){openCategory(i)}
function saveCategory(i){
  const en=($('#catNameEn')||{}).value; const bn=($('#catNameBn')||{}).value;
  const e=String(en||"").trim(); if(!e){toast("English name required");return;}
  const obj={en:e, bn:String(bn||"").trim()};
  if(i<0) A.settings.categories.push(obj); else A.settings.categories[i]=obj;
  ensureBilingualSettings(); save(); closeModal(); render(); toast("Category saved");
}
function deleteCategory(i){
  const e=catEn(A.settings.categories[i]);
  if(e==="All"||e==="All Movies"){toast("Default All category should stay");}
  if(confirm("Delete this category?")){A.settings.categories.splice(i,1);ensureBilingualSettings();save();render();toast("Category deleted")}
}
function openAdultCategory(index=null){
  ensureBilingualSettings();
  const cur=index===null?{en:"",bn:""}:(A.settings.adultCategories[index]||{en:"",bn:""});
  const en=catEn(cur).replace(/"/g,"&quot;"), bn=catBn(cur).replace(/"/g,"&quot;");
  showModal(`<div class="modal-head"><h2>${index===null?"Add":"Edit"} Adult Category</h2><button class="btn" onclick="closeModal()">×</button></div>
  <div class="field"><label>English name</label><input id="acatNameEn" value="${en}"></div>
  <div class="field" style="margin-top:10px"><label>বাংলা নাম</label><input id="acatNameBn" value="${bn}"></div>
  <button class="btn primary" style="margin-top:15px" onclick="saveAdultCategory(${index===null?-1:index})">Save</button>`);
}
function editAdultCategory(i){openAdultCategory(i)}
function saveAdultCategory(i){
  const e=String((($('#acatNameEn')||{}).value)||"").trim(); if(!e){toast("English name required");return;}
  const obj={en:e, bn:String((($('#acatNameBn')||{}).value)||"").trim()};
  if(i<0) A.settings.adultCategories.push(obj); else A.settings.adultCategories[i]=obj;
  ensureBilingualSettings(); save(); closeModal(); render(); toast("Adult category saved");
}
function deleteAdultCategory(i){
  if(confirm("Delete this adult category?")){A.settings.adultCategories.splice(i,1);ensureBilingualSettings();save();render();toast("Deleted")}
}
function openTask(name='',idx=null){
  const tasks=A.settings.tasks||[];
  const t=(idx!=null&&tasks[idx])?tasks[idx]:{name:name||'',reward:2,limit:1,type:'countdown',seconds:5,link:'',resetHours:24,permanent:false};
  showModal(`<div class="modal-head"><h2>${idx!=null?'Edit':'Add'} Daily Task</h2><button class="btn" onclick="closeModal()">×</button></div>
  <div class="form-grid">
    <div class="field"><label>Task name</label><input id="taskName" value="${t.name||''}"></div>
    <div class="field"><label>Type</label><select id="taskType">
      <option value="countdown" ${t.type==='countdown'||t.type==='oneclick'?'selected':''}>Countdown (one click)</option>
      <option value="ad" ${t.type==='ad'?'selected':''}>Watch Ad</option>
      <option value="link" ${t.type==='link'?'selected':''}>Open Link</option>
      <option value="share" ${t.type==='share'?'selected':''}>Share Referral</option>
      <option value="login" ${t.type==='login'?'selected':''}>Daily Login</option>
    </select></div>
    <div class="field"><label>Reward points</label><input id="taskReward" type="number" value="${t.reward||2}"></div>
    <div class="field"><label>Daily limit</label><input id="taskLimit" type="number" value="${t.limit||1}"></div>
    <div class="field"><label>Countdown seconds</label><input id="taskSecs" type="number" value="${t.seconds||5}"></div>
    <div class="field"><label>Link (for Open Link type)</label><input id="taskLink" value="${t.link||''}" placeholder="https://t.me/..."></div>
    <div class="field"><label>Reset Every (Hours)</label><input id="taskResetHours" type="number" min="1" value="${t.resetHours||24}"></div>
    <div class="field" style="display:flex;align-items:center;gap:8px;margin-top:22px">
      <input type="checkbox" id="taskPermanent" style="width:16px;height:16px" ${t.permanent?'checked':''}>
      <label for="taskPermanent" style="margin:0">Permanent (one-time, never resets)</label>
    </div>
  </div>
  <button class="btn primary" style="margin-top:15px" onclick="saveTask(${idx!=null?idx:'null'})">Save Task</button>`)}
function saveTask(idx){
  A.settings.tasks=A.settings.tasks||[];
  const x={name:$('#taskName').value.trim()||'Task',type:$('#taskType').value,reward:+$('#taskReward').value||1,limit:+$('#taskLimit').value||1,seconds:+$('#taskSecs').value||5,link:$('#taskLink').value.trim(),resetHours:+$('#taskResetHours').value||24,permanent:!!$('#taskPermanent').checked};
  if(idx!=null&&idx>=0) A.settings.tasks[idx]=x; else A.settings.tasks.push(x);
  save();closeModal();render();toast('Task saved');
}
function openAdBlock(){showModal(`<div class="modal-head"><h2>Add Ad Block</h2><button class="btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Ad Block Name</label><input id="extraAdName" placeholder="e.g. Home Reward"></div><div class="field"><label>Ad Block ID</label><input id="extraAdId" placeholder="43222"></div></div><button class="btn primary" style="margin-top:15px" onclick="saveExtraAd()">Add Ad Block</button>`)}
function saveExtraAd(){const n=$('#extraAdName').value.trim(),id=$('#extraAdId').value.trim();if(!n||!id)return;A.settings.adBlocks.extra=A.settings.adBlocks.extra||{};A.settings.adBlocks.extra[n]=id;save();closeModal();render();toast('Ad block added')}
function openAdultMovie(id=null){const m=id!=null&&id!==0&&id!==''?A.movies.find(x=>String(x.id)===String(id)):null;const cats=(A.settings.adultCategories||[]).filter(x=>catEn(x)!=='All');const idArg=m?JSON.stringify(String(m.id)):'null';showModal(`<div class="modal-head"><h2>${m?'Edit':'Add'} Adult Movie</h2><button class="btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Title</label><input id="adultTitle" value="${(m?.title||'').replace(/"/g,'&quot;')}" placeholder="Adult title"></div><div class="field"><label>Year</label><input id="adultYear" type="number" value="${m?.year||new Date().getFullYear()}"></div><div class="field"><label>Category</label><select id="adultCat">${cats.map(c=>{const k=catEn(c);return `<option ${m?.category===k?'selected':''}>${k}</option>`}).join('')}</select></div><div class="field"><label>Rating</label><input id="adultRating" type="number" step=".1" value="${m?.rating||0}"></div><div class="field"><label>Poster URL</label><input id="adultPoster" value="${(m?.poster||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div><div class="field"><label>Server 1 URL</label><input id="adultS1" value="${(m?.server1||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div><div class="field"><label>Server 2 URL</label><input id="adultS2" value="${(m?.server2||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div><div class="field"><label>Server 3 URL</label><input id="adultS3" value="${(m?.server3||'').replace(/"/g,'&quot;')}" placeholder="https://..."></div></div><button class="btn primary" style="margin-top:15px" onclick="saveAdultMovie(${idArg})">Save Adult Movie</button>`)}
function saveAdultMovie(id){id=(id===0||id===null||id===undefined||id==='')?null:id;const old=id!=null?A.movies.find(m=>String(m.id)===String(id)):null;const t=$('#adultTitle').value.trim();if(!t)return;const x={id:id!=null?String(id):("manual_"+Date.now()),title:t,type:'Adult',year:+$('#adultYear').value||new Date().getFullYear(),rating:+$('#adultRating').value||0,category:$('#adultCat').value,adult:true,poster:$('#adultPoster').value.trim(),server1:$('#adultS1').value.trim(),server2:$('#adultS2').value.trim(),server3:$('#adultS3').value.trim(),server1_link:$('#adultS1').value.trim(),server2_link:$('#adultS2').value.trim(),server3_link:$('#adultS3').value.trim(),clicks:old?.clicks||0,downloads:old?.downloads||0,status:'Published',manual_movie:true,added_time:old?.added_time||Date.now()};toast('Saving...');if(window.CineHubFB){window.CineHubFB.saveMovie(x).then(function(saved){if(id!=null){A.movies=A.movies.map(m=>String(m.id)===String(id)?saved:m);}else if(!A.movies.some(m=>String(m.id)===String(saved&&saved.id))){A.movies.unshift(saved);}save(true);closeModal();render();toast('Adult movie saved')}).catch(function(e){console.error(e);toast('Save failed: '+(e&&e.message?e.message:e))})}else{if(id!=null)A.movies=A.movies.map(m=>String(m.id)===String(id)?x:m);else A.movies.unshift(x);save();closeModal();render();toast('Adult movie saved')}}
function editAdultMovie(id){openAdultMovie(id)}
function showModal(body){$('#modal').innerHTML=`<div class="modal-box">${body}</div>`;$('#modal').classList.remove('hidden')}function closeModal(){$('#modal').classList.add('hidden')}
function render(){
  try{
    const box=contentEl();
    if(!box){console.error('content missing');return}
    const views={dashboard,movies,categories,users,points,ads,tasks,payments,adult,requests,content:contentPage,broadcast,settings};
    const fn=views[A.section];
    if(typeof fn!=='function'){box.innerHTML='<div class="card"><p>Unknown section: '+A.section+'</p></div>';return}
    box.innerHTML=fn();
    if(A.section==='settings'){ try{fillUiTextBody()}catch(e){} }
    if(A.section==='ads'){
      const extra=(A.settings.adBlocks&&A.settings.adBlocks.extra)||{};
      const ea=el('extraAds');
      if(ea){
        const entries=Object.entries(extra);
        ea.innerHTML=entries.length?entries.map(([n,id])=>'<div class="tag-item"><span><b>'+n+'</b> <small>#'+id+'</small></span><button class="btn danger" onclick="deleteExtraAd(\''+String(n).replace(/\\/g,'\\\\').replace(/\'/g,"\\'")+'\')">Delete</button></div>').join(''):'<div class="muted smalltext">No extra ad blocks yet.</div>';
      }
    }
  }catch(err){
    console.error('render error',err);
    const box=contentEl();
    if(box) box.innerHTML='<div class="card" style="padding:20px;color:#ff8a8a"><b>Render error</b><pre style="white-space:pre-wrap;font-size:11px;margin-top:8px">'+String(err&&err.message||err)+'</pre></div>';
  }
}
function deleteExtraAd(n){delete A.settings.adBlocks.extra[n];save();render();toast('Ad block removed')}
boot();


const UI_TEXT_KEYS=[
  "Movies","Series","Search","Adult","18+","Profile","Language","Telegram",
  "New Movies","LATEST UPLOADS","Trending","MOST WATCHED","MOVIE ZONE","Cinema Library",
  "▶ How to Watch","Trending Movies","No movies found.","Results","Search movies...",
  "Complete series","Series not added yet.",
  "ADULT ZONE","Adult Library","Adult Access Confirmation",
  "This section is reserved for mature viewers. Please confirm that you are 18 or older before entering the Adult Zone.",
  "Yes, Enter","No, Watch Movie","✓ I confirm that I am 18 or older",
  "Verified User","OVERVIEW","My Points","Total Referrals","REFERRAL SYSTEM",
  "Per Referral Reward","Join Bonus","Referral Code","Your Referral Link","Copy Link","Share Link",
  "Daily Tasks","Buy Points","Watch Ad & Earn","Watch Ad Now","Start","Done",
  "More Point Earning","Watch Ads & Earn Points",
  "Complete ads and premium earning tasks to unlock exclusive videos instantly.",
  "Instant Reward","Unlock Videos","Daily task","completed today",
  "EARN & UNLOCK","Current Balance","Points Per Ad","Ads Watched","Daily Limit",
  "EARNING SETTINGS","Reward Per Ad","Maximum Daily Ads","Remaining Today","MORE EARNING BUTTONS","Reward",
  "UNLOCK NOTICE","MOVIE CONTENT","Unlock this content using ads or points.",
  "Need","Remaining","Unlock Video","Use My Points","Share","More Movies","More Watching",
  "Do you want to leave?","Stay here","Leave","Leaving will close the mini app.","Points","Back",
  "Keep this page open until countdown ends.","Opening Ad","Please wait while ad is loading."
];
function uiTextRowsHtml(){
  const s=A.settings;
  s.uiTexts=s.uiTexts||{en:{},bn:{}};
  const en=s.uiTexts.en||{}, bn=s.uiTexts.bn||{};
  // merge known keys + any custom
  const keys=Array.from(new Set([...UI_TEXT_KEYS, ...Object.keys(en), ...Object.keys(bn)]));
  return keys.map((k,i)=>{
    const esc=v=>String(v||"").replace(/"/g,"&quot;");
    return `<tr data-uitext="${i}">
      <td><code style="font-size:11px">${k.replace(/</g,"&lt;")}</code><input type="hidden" data-ukey value="${esc(k)}"></td>
      <td><input data-uen value="${esc(en[k]||"")}" placeholder="${esc(k)}" style="width:100%"></td>
      <td><input data-ubn value="${esc(bn[k]||"")}" placeholder="বাংলা..." style="width:100%"></td>
    </tr>`;
  }).join("");
}
function fillUiTextBody(){
  const tb=document.getElementById("uiTextBody");
  if(tb) tb.innerHTML=uiTextRowsHtml();
}
function addUiTextRow(){
  const k=prompt("New UI key (English base text):");
  if(!k)return;
  A.settings.uiTexts=A.settings.uiTexts||{en:{},bn:{}};
  A.settings.uiTexts.en[k]=A.settings.uiTexts.en[k]||"";
  A.settings.uiTexts.bn[k]=A.settings.uiTexts.bn[k]||"";
  fillUiTextBody();
}
function collectUiTexts(){
  const en={}, bn={};
  document.querySelectorAll("#uiTextBody tr").forEach(tr=>{
    const key=(tr.querySelector("[data-ukey]")||{}).value;
    if(!key)return;
    const ev=(tr.querySelector("[data-uen]")||{}).value;
    const bv=(tr.querySelector("[data-ubn]")||{}).value;
    if(ev&&ev.trim()) en[key]=ev.trim();
    if(bv&&bv.trim()) bn[key]=bv.trim();
  });
  A.settings.uiTexts={en,bn};
}


/* —— TMDB Import (key stays on Apps Script only) —— */
function openTmdbImport(){
  showModal(`<div class="modal-head"><h2>Import from TMDB</h2><button class="btn" onclick="closeModal()">×</button></div>
  <div class="field"><label>Search movie title</label><input id="tmdbQ" placeholder="e.g. Inception" onkeydown="if(event.key==='Enter')searchTmdb()"></div>
  <button class="btn primary" style="margin-top:10px" onclick="searchTmdb()">Search TMDB</button>
  <div id="tmdbResults" style="margin-top:14px;max-height:50vh;overflow:auto"></div>
  <p class="muted smalltext" style="margin-top:8px">TMDB API key must be set in Apps Script Script Properties as <b>TMDB_API_KEY</b>.</p>`);
  setTimeout(function(){const q=document.getElementById('tmdbQ');if(q)q.focus()},100);
}
function searchTmdb(){
  const q=(document.getElementById('tmdbQ')||{}).value||'';
  if(!q.trim()){toast('Enter a title');return}
  const box=document.getElementById('tmdbResults');
  if(box)box.innerHTML='<p class="muted">Searching…</p>';
  if(!window.CineHubFB||!window.CineHubFB.searchTmdb){
    if(box)box.innerHTML='<p style="color:#f88">API not ready. Redeploy backend with TMDB support.</p>';
    return;
  }
  window.CineHubFB.searchTmdb(q.trim()).then(function(list){
    window.__tmdbSearchCache = list || [];
    if(!box)return;
    if(!list||!list.length){box.innerHTML='<p class="muted">No results</p>';return}
    box.innerHTML=list.map(function(m,i){
      const poster=m.poster?'<img src="'+m.poster+'" style="width:42px;height:62px;object-fit:cover;border-radius:6px">':'<div style="width:42px;height:62px;background:#222;border-radius:6px"></div>';
      return '<div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid #222"><div>'+poster+'</div><div style="flex:1;min-width:0"><b style="word-break:break-word">'+String(m.title||'').replace(/</g,'')+'</b><div class="muted smalltext">'+(m.year||'')+' · ⭐ '+(m.rating||0)+'</div></div><button class="btn primary" type="button" onclick="importTmdbByIndex('+i+')">Add</button></div>';
    }).join('');
  }).catch(function(e){
    if(box)box.innerHTML='<p style="color:#f88">'+(e&&e.message?e.message:e)+'</p>';
  });
}
function importTmdbByIndex(i){
  const list = window.__tmdbSearchCache || [];
  const m = list[i];
  if(!m){toast('Result missing — search again');return}
  importTmdbMovie(m.tmdb_id, m);
}
function importTmdbMovie(tmdbId, cached){
  toast('Importing…');
  // Prefer client save with search result data (avoids broken FIREBASE_PRIVATE_KEY on backend)
  function fromCache(m){
    return {
      id: "tmdb_" + String(m.tmdb_id || tmdbId),
      tmdb_id: String(m.tmdb_id || tmdbId),
      title: m.title || "Untitled",
      year: m.year || "",
      poster: m.poster || "",
      overview: m.overview || "",
      rating: Number(m.rating) || 0,
      category: "All Movies",
      type: "Movie",
      adult: false,
      status: "Published",
      source: "tmdb",
      manual_movie: false,
      server1: "", server2: "", server3: "",
      clicks: 0, downloads: 0, views: 0,
      added_time: Date.now()
    };
  }
  function afterSaved(saved){
    A.movies = A.movies.filter(function(x){return String(x.id)!==String(saved.id)});
    A.movies.unshift(saved);
    save(true);
    closeModal();
    render();
    toast('Imported — add Server links');
    setTimeout(function(){ openMovie(String(saved.id)); }, 250);
  }
  if(cached && cached.title){
    window.CineHubFB.saveMovie(fromCache(cached)).then(afterSaved).catch(function(e){
      toast('Import failed: '+(e&&e.message?e.message:e));
    });
    return;
  }
  // fallback API path
  window.CineHubFB.importTmdbMovie(String(tmdbId)).then(afterSaved).catch(function(e){
    // last resort: minimal client doc
    if(window.CineHubFB && window.CineHubFB.saveMovie){
      window.CineHubFB.saveMovie(fromCache({tmdb_id:tmdbId,title:"TMDB "+tmdbId})).then(afterSaved).catch(function(e2){
        toast('Import failed: '+(e&&e.message?e.message:e));
      });
    } else {
      toast('Import failed: '+(e&&e.message?e.message:e));
    }
  });
}
