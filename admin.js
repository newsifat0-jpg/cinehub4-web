const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const DEFAULT={
  appName:"Cine Hub4",
  botUsername:"@Cinehub4bot",
  telegramBotLink:"https://t.me/Cinehub4bot",
  telegramChannelLink:"",
  howToEarnVideo:"",
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
  categories:["All Movies","Bangla Moves","Hollywood Movie Hindi"],
  adultCategories:["All","Adult Movie","Anime"],
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
    {name:"Basic Package",price:0.99,points:110,tag:"SMART CHOICE"},
    {name:"Standard Package",price:4.99,points:550,tag:"STARTER"},
    {name:"Premium Package",price:9.99,points:1200,tag:"BEST VALUE"},
    {name:"Ultimate Package",price:14.99,points:2000,tag:"POPULAR"}
  ],
  adBlocks:{rewarded:"43222",interstitial:"",banner:"",task:"",adult:"",extra:{}}
};
const A={section:"dashboard",settings:{...DEFAULT,...JSON.parse(localStorage.getItem("cinehub4_settings")||"{}")},movies:JSON.parse(localStorage.getItem("cinehub4_movies")||"null")||[{id:1,title:"PRINCE",type:"Movie",year:2026,rating:8.7,clicks:1842,downloads:921,status:"Published",category:"Bangla Moves"},{id:2,title:"ROCKSTAR",type:"Movie",year:2026,rating:8.1,clicks:1421,downloads:702,status:"Published",category:"Bangla Moves"},{id:3,title:"SPIDER-MAN: Brand New Day",type:"Movie",year:2026,rating:8.5,clicks:1207,downloads:641,status:"Draft",category:"Hollywood Movie Hindi"},{id:4,title:"Demo Adult Title | 18+ Sample",type:"Adult",year:2026,rating:7.5,clicks:410,downloads:90,status:"Published",category:"Adult Movie",adult:true},{id:5,title:"Demo Anime Title | 18+ Sample",type:"Adult",year:2026,rating:7.8,clicks:260,downloads:55,status:"Published",category:"Anime",adult:true}],users:12480,points:156240,adultEnabled:true};
A.settings.adBlocks={...DEFAULT.adBlocks,...(A.settings.adBlocks||{})};A.settings.categories=A.settings.categories||DEFAULT.categories;A.settings.adultCategories=A.settings.adultCategories&&A.settings.adultCategories.length?A.settings.adultCategories:DEFAULT.adultCategories;
function el(id){return document.getElementById(id)}
function contentEl(){return el("content")}
function titleEl(){return el("pageTitle")}
const toastEl=$("#toast");
function save(){
  try{
    if(A.settings.wallets&&A.settings.wallets[0]){
      A.settings.usdtWallet=A.settings.wallets[0].address||A.settings.usdtWallet||"";
      A.settings.usdtNetwork=A.settings.wallets[0].network||A.settings.usdtNetwork||"TRC20";
    }
  }catch(e){}
  localStorage.setItem("cinehub4_movies",JSON.stringify(A.movies));
  localStorage.setItem("cinehub4_settings",JSON.stringify(A.settings));
}
function toast(msg){const te=el('toast')||toastEl;if(!te)return;te.textContent=msg;te.classList.add('show');setTimeout(()=>te.classList.remove('show'),1700)}
function money(n){return Number(n).toLocaleString()}
function getTelegramUserId(){try{return window.Telegram?.WebApp?.initDataUnsafe?.user?.id?String(window.Telegram.WebApp.initDataUnsafe.user.id):''}catch(e){return ''}}
function allowedAdminIds(){return (window.APP_CONFIG?.adminIds||[window.APP_CONFIG?.adminDemoId]).map(String)}
function isTelegramAdmin(){const id=getTelegramUserId();return !!id&&allowedAdminIds().includes(id)}
function openAdmin(){localStorage.setItem('cinehub4_admin_session','1');$("#adminGate").classList.add('hidden');$("#adminApp").classList.remove('hidden');wireAdminNav();render()}
function adminLogin(){const telegramId=getTelegramUserId();const v=$("#adminIdInput").value.trim();if(telegramId){if(isTelegramAdmin())openAdmin();else toast('এই Telegram account-এর Admin access নেই');return}if(v&&allowedAdminIds().includes(v))openAdmin();else toast('Admin ID not authorized')}
function boot(){try{window.Telegram?.WebApp?.ready();window.Telegram?.WebApp?.expand()}catch(e){} setTimeout(()=>{if(isTelegramAdmin())openAdmin()},100);setTimeout(()=>{if(isTelegramAdmin())openAdmin()},800)}
function sectionTitle(s){const map={dashboard:'Dashboard',movies:'Movies',categories:'Categories',users:'Users',points:'Points & Unlocks',ads:'Ads & Ad IDs',tasks:'Daily Tasks',payments:'Payments',adult:'Adult Library',requests:'Movie Requests',content:'Links & Videos',broadcast:'Broadcast',settings:'Settings'};return map[s]||s}
function closeSidebar(){const sb=document.querySelector('.sidebar');if(sb)sb.classList.remove('open');const bd=document.getElementById('sideBackdrop');if(bd)bd.classList.add('hidden')}
function openSidebar(){const sb=document.querySelector('.sidebar');if(sb)sb.classList.add('open');const bd=document.getElementById('sideBackdrop');if(bd)bd.classList.remove('hidden')}
function setSection(s){
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
  if(lo) lo.onclick=()=>{localStorage.removeItem('cinehub4_admin_session');location.reload()};
  const bd=document.getElementById('sideBackdrop');
  if(bd) bd.onclick=function(){closeSidebar()};
}
wireAdminNav();
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar()});
function dashboard(){return `<div class="grid stats"><div class="card stat"><span class="label">Total Users</span><div class="num">${money(A.users)}</div><span class="up">↑ 8.4%</span><span class="ico">♙</span></div><div class="card stat"><span class="label">Movies</span><div class="num">${A.movies.length}</div><span class="up">Live library</span><span class="ico">🎬</span></div><div class="card stat"><span class="label">Points Issued</span><div class="num">${money(A.points)}</div><span class="up">Economy active</span><span class="ico">◈</span></div><div class="card stat"><span class="label">Pending Payments</span><div class="num">3</div><span class="up">Needs review</span><span class="ico">৳</span></div></div><div class="grid section-grid"><div class="card"><h3>Platform Activity</h3><div class="muted smalltext">Clicks, downloads and ad rewards</div><div class="chart">${[38,55,48,72,66,91,76].map(x=>`<div class="bar" style="height:${x}%"></div>`).join('')}</div></div><div class="card"><h3>Quick Controls</h3><div class="quick"><button onclick="openMovie()"><b>＋ Add Movie</b>Publish title</button><button onclick="setSection('ads')"><b>◉ Ad IDs</b>Manage every ad block</button><button onclick="setSection('content')"><b>🔗 Links & Video</b>Telegram + How to Earn</button><button onclick="setSection('categories')"><b>▦ Categories</b>Add / rename / delete</button></div></div></div><div class="card" style="margin-top:14px"><h3>System Status</h3><div class="switch"><span>Movie Library</span><span class="badge green">ONLINE</span></div><div class="switch"><span>Points & 15-hour unlock</span><span class="badge green">ACTIVE</span></div><div class="switch"><span>Adult Library</span><span class="badge ${A.adultEnabled?'green':'red'}">${A.adultEnabled?'ENABLED':'DISABLED'}</span></div></div>`}
function movies(){return `<div class="toolbar"><div class="left"><button class="btn primary" onclick="openMovie()">＋ Add Movie</button><button class="btn" onclick="toast('TMDB import UI ready; keep the TMDB secret key off GitHub Pages')">Import TMDB</button></div><input class="search" id="movieSearch" placeholder="Search movie..." oninput="filterMovies()"></div><div class="card table-wrap"><table class="table"><thead><tr><th>Movie</th><th>Category</th><th>Rating</th><th>Clicks</th><th>Downloads</th><th>Status</th><th>Action</th></tr></thead><tbody id="movieBody">${movieRows(A.movies)}</tbody></table></div>`}
function movieRows(ms){return ms.map(m=>`<tr><td><div class="movie-row"><div class="thumb">${(m.title||'?').slice(0,1)}</div><div><b>${m.title}</b><div class="muted">${m.year}</div></div></div></td><td>${m.category||m.type||'Movie'}</td><td>⭐ ${m.rating}</td><td>${money(m.clicks||0)}</td><td>${money(m.downloads||0)}</td><td><span class="badge ${m.status==='Published'?'green':''}">${m.status}</span></td><td class="action-cell"><button type="button" class="btn dots-btn" data-mid="${m.id}" aria-label="Actions">⋮</button><div class="dots-menu hidden" id="dm-${m.id}"><button type="button" onclick="editMovie(${m.id});closeAllDots()">Edit</button><button type="button" class="danger" onclick="deleteMovie(${m.id});closeAllDots()">Delete</button></div></td></tr>`).join('')}
function closeAllDots(){document.querySelectorAll('.dots-menu').forEach(el=>el.classList.add('hidden'))}
function toggleDots(id,btn){const menu=document.getElementById('dm-'+id);if(!menu)return;const wasOpen=!menu.classList.contains('hidden');closeAllDots();if(!wasOpen){menu.classList.remove('hidden');const r=btn.getBoundingClientRect();menu.style.top=(r.bottom+4)+'px';menu.style.right=(window.innerWidth-r.right)+'px'}}
document.addEventListener('click',e=>{const btn=e.target.closest('.dots-btn');if(btn){e.stopPropagation();toggleDots(btn.dataset.mid,btn);return}if(!e.target.closest('.dots-menu'))closeAllDots()});
function filterMovies(){const q=$("#movieSearch").value.toLowerCase();$("#movieBody").innerHTML=movieRows(A.movies.filter(m=>m.title.toLowerCase().includes(q)))}
function categories(){return `<div class="card"><div class="toolbar"><div><h3 style="margin:0">Movie Categories</h3><div class="muted smalltext">User app category tabs are controlled from here.</div></div><button class="btn primary" onclick="openCategory()">＋ Add Category</button></div><div class="tag-list">${A.settings.categories.map((c,i)=>`<div class="tag-item"><span>${c}</span><div><button class="btn" onclick="editCategory(${i})">Edit</button> <button class="btn danger" onclick="deleteCategory(${i})">Delete</button></div></div>`).join('')}</div></div>`}
function users(){
  let list=JSON.parse(localStorage.getItem("cinehub4_users")||"null");
  if(!list){
    list=[
      {id:"demo1",name:"Demo User",points:1240,unlocks:18,ads:7,status:"Active"},
      {id:"demo2",name:"Movie Lover",points:530,unlocks:6,ads:19,status:"Active"}
    ];
    localStorage.setItem("cinehub4_users",JSON.stringify(list));
  }
  return `<div class="toolbar"><div class="left"><button class="btn" onclick="toast('Export ready')">Export CSV</button></div>
  <input class="search" id="userSearch" placeholder="Search user..." oninput="render()"></div>
  <div class="card table-wrap"><table class="table"><thead><tr>
    <th>User</th><th>Points</th><th>Unlocks</th><th>Ads Today</th><th>Status</th><th>Adjust Points</th>
  </tr></thead><tbody>
  ${list.map((u,idx)=>`<tr>
    <td>${u.name||u.id}</td>
    <td><b>${u.points||0}</b></td>
    <td>${u.unlocks||0}</td>
    <td>${u.ads||0}</td>
    <td><span class="badge ${u.status==='Blocked'?'red':'green'}">${u.status||'Active'}</span></td>
    <td style="white-space:nowrap">
      <button class="btn" onclick="adjUserPts(${idx},10)">+10</button>
      <button class="btn" onclick="adjUserPts(${idx},50)">+50</button>
      <button class="btn danger" onclick="adjUserPts(${idx},-10)">-10</button>
      <button class="btn danger" onclick="adjUserPts(${idx},-50)">-50</button>
    </td>
  </tr>`).join("")}
  </tbody></table></div>`;
}
function adjUserPts(idx,delta){
  const list=JSON.parse(localStorage.getItem("cinehub4_users")||"[]");
  if(!list[idx])return;
  list[idx].points=Math.max(0,(list[idx].points||0)+delta);
  localStorage.setItem("cinehub4_users",JSON.stringify(list));
  // if adjusting "current" demo user also bump live points
  if(idx===0){
    const cur=Number(localStorage.getItem("cinehub4_points")||0);
    localStorage.setItem("cinehub4_points",String(Math.max(0,cur+delta)));
  }
  render();toast((delta>0?"+":"")+delta+" points");
}

function points(){return `<div class="grid section-grid"><div class="card"><h3>Points & Unlock Economy</h3><div class="form-grid"><div class="field"><label>Movie unlock cost (points)</label><input id="unlockCost" type="number" value="${A.settings.unlockCost}"></div><div class="field"><label>Unlock duration (hours)</label><input id="unlockHours" type="number" value="${A.settings.unlockHours}"></div><div class="field"><label>Reward per ad</label><input id="adRewardP" type="number" value="${A.settings.adReward}"></div><div class="field"><label>Daily ad earning limit</label><input id="dailyLimitP" type="number" value="${A.settings.dailyAdLimit}"></div><div class="field"><label>New-user bonus</label><input id="bonus" type="number" value="${A.settings.newUserBonus||10}"></div><div class="field"><label>Referral reward</label><input id="ref" type="number" value="${A.settings.referralReward||5}"></div></div><button class="btn primary" style="margin-top:14px" onclick="savePoints()">Save Economy</button></div><div class="card"><h3>Rules</h3><div class="switch"><span>Unlimited movie unlocks while access is active</span><span class="badge green">ON</span></div><div class="switch"><span>Daily ad limit only applies to earning points</span><span class="badge green">ON</span></div><div class="switch"><span>Unlock period</span><span class="badge green">${A.settings.unlockHours} HOURS</span></div></div></div>`}
function savePoints(){A.settings.unlockCost=+$('#unlockCost').value||5;A.settings.unlockHours=+$('#unlockHours').value||15;A.settings.adReward=+$('#adRewardP').value||2;A.settings.dailyAdLimit=+$('#dailyLimitP').value||20;A.settings.newUserBonus=+$('#bonus').value||10;A.settings.referralReward=+$('#ref').value||5;save();render();toast('Points settings saved')}
function ads(){const b=A.settings.adBlocks;return `<div class="grid section-grid"><div class="card"><h3>Ad Block IDs — Full Control</h3><div class="muted smalltext">Every ad ID can be changed here. Add another block with the button below.</div><div class="form-grid" style="margin-top:12px"><div class="field"><label>Rewarded / Unlock Ad Block ID</label><input id="rewardedId" value="${b.rewarded||''}"></div><div class="field"><label>Interstitial Ad Block ID</label><input id="interstitialId" value="${b.interstitial||''}"></div><div class="field"><label>Home Banner Ad Block ID</label><input id="bannerId" value="${b.banner||''}"></div><div class="field"><label>Daily Task Ad Block ID</label><input id="taskId" value="${b.task||''}"></div><div class="field"><label>Adult Ad Block ID — SEPARATE</label><input id="adultId" value="${b.adult||''}"></div></div><button class="btn primary" style="margin-top:14px" onclick="saveAds()">Save All Ad IDs</button></div><div class="card"><h3>Ad Placement</h3><div class="switch"><span>Home banner</span><span class="toggle on" onclick="this.classList.toggle('on')"><i></i></span></div><div class="switch"><span>Rewarded movie unlock</span><span class="toggle on" onclick="this.classList.toggle('on')"><i></i></span></div><div class="switch"><span>Point earning ads</span><span class="toggle on" onclick="this.classList.toggle('on')"><i></i></span></div><div class="switch"><span>Adult ads</span><span class="toggle on" onclick="this.classList.toggle('on')"><i></i></span></div></div></div><div class="card" style="margin-top:14px"><div class="toolbar"><h3 style="margin:0">Extra Ad Blocks</h3><button class="btn primary" onclick="openAdBlock()">＋ Add Ad Block</button></div><div id="extraAds" class="tag-list"></div></div>`}
function saveAds(){const b=A.settings.adBlocks;b.rewarded=$('#rewardedId').value.trim();b.interstitial=$('#interstitialId').value.trim();b.banner=$('#bannerId').value.trim();b.task=$('#taskId').value.trim();b.adult=$('#adultId').value.trim();save();toast('All Ad IDs saved')}
function tasks(){
  if(!A.settings.tasks||!A.settings.tasks.length){
    A.settings.tasks=[
      {name:"Watch rewarded ad",reward:A.settings.adReward||2,limit:A.settings.dailyAdLimit||20,type:"ad"},
      {name:"Join Telegram channel",reward:5,limit:1,type:"link"},
      {name:"Refer a friend",reward:A.settings.referralReward||20,limit:10,type:"share"},
      {name:"Daily login",reward:2,limit:1,type:"login"}
    ];
  }
  const rows=A.settings.tasks.map((t,i)=>`<tr>
    <td><input value="${t.name||""}" onchange="A.settings.tasks[${i}].name=this.value;save()" style="width:100%"></td>
    <td><input type="number" value="${t.reward||0}" onchange="A.settings.tasks[${i}].reward=Number(this.value)||0;save()" style="width:70px"></td>
    <td><input type="number" value="${t.limit||1}" onchange="A.settings.tasks[${i}].limit=Number(this.value)||1;save()" style="width:70px"></td>
    <td>
      <select onchange="A.settings.tasks[${i}].type=this.value;save()">
        <option value="ad" ${t.type==="ad"?"selected":""}>ad</option>
        <option value="link" ${t.type==="link"?"selected":""}>link</option>
        <option value="share" ${t.type==="share"?"selected":""}>share</option>
        <option value="login" ${t.type==="login"?"selected":""}>login</option>
      </select>
    </td>
    <td><button class="btn danger" onclick="A.settings.tasks.splice(${i},1);save();render()">Del</button></td>
  </tr>`).join("");
  return `<div class="toolbar"><button class="btn primary" onclick="A.settings.tasks.push({name:'New Task',reward:2,limit:1,type:'ad'});save();render()">＋ Add Task</button></div>
  <div class="card table-wrap"><table class="table"><thead><tr><th>Task</th><th>Reward</th><th>Daily Limit</th><th>Type</th><th>Action</th></tr></thead>
  <tbody>${rows}</tbody></table></div>
  <p class="muted">Join bonus / referral reward are in Settings. Tasks appear on user Daily Tasks page.</p>`;
}

function payments(){
  let list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
  const s=A.settings||{};
  if(!s.wallets) s.wallets = s.usdtWallet ? [{name:s.usdtNetwork||"USDT TRC20",address:s.usdtWallet,network:s.usdtNetwork||"TRC20"}] : [{name:"USDT TRC20",address:"",network:"TRC20"}];
  const wRows=(s.wallets||[]).map((w,i)=>`<div class="field" style="grid-column:1/-1;display:grid;grid-template-columns:1.2fr 2fr 1fr auto;gap:8px;align-items:end">
    <div><label>Name</label><input data-w="${i}" data-k="name" value="${w.name||""}" onchange="A.settings.wallets[${i}].name=this.value;save()"></div>
    <div><label>Address</label><input data-w="${i}" data-k="address" value="${w.address||""}" onchange="A.settings.wallets[${i}].address=this.value;save()"></div>
    <div><label>Network</label><input data-w="${i}" data-k="network" value="${w.network||"TRC20"}" onchange="A.settings.wallets[${i}].network=this.value;save()"></div>
    <button class="btn danger" onclick="A.settings.wallets.splice(${i},1);save();render()">×</button>
  </div>`).join("");
  return `<div class="card"><h3>USDT Wallets (user chooses one)</h3>
    <div class="form-grid">${wRows||'<div class="muted">No wallets</div>'}
      <button class="btn" onclick="A.settings.wallets=A.settings.wallets||[];A.settings.wallets.push({name:'USDT TRC20',address:'',network:'TRC20'});save();render()">+ Add Wallet</button>
    </div>
    <p class="muted" style="margin-top:8px">Also sync first wallet to legacy fields on save.</p>
  </div>
  <div class="card table-wrap"><h3>Payment Requests</h3><table class="table"><thead><tr>
    <th>User</th><th>Package</th><th>USDT</th><th>Points</th><th>TX / Proof</th><th>Status</th><th>Action</th>
  </tr></thead><tbody>
  ${list.length?list.map((p,i)=>`<tr>
    <td>${p.user||"-"}<br><small>${p.uid||""}</small></td><td>${p.pkg||"-"}</td><td>${p.usdt||0}</td><td>${p.points||0}</td>
    <td>${p.txid||"-"}<br><small>${p.proof||""}</small></td>
    <td><span class="badge ${p.status==="approved"?"green":p.status==="rejected"?"red":"yellow"}">${p.status}</span></td>
    <td>
      <button class="btn primary" onclick="payAction(${i},'approved')">Accept</button>
      <button class="btn danger" onclick="payAction(${i},'rejected')">Reject</button>
      <button class="btn" onclick="payDelete(${i})">Del</button>
    </td>
  </tr>`).join(""):'<tr><td colspan="7" class="muted">No payment requests yet</td></tr>'}
  </tbody></table></div>`;
}
function payAction(i,st){
  const list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
  if(!list[i])return;
  list[i].status=st;
  localStorage.setItem("cinehub4_payments",JSON.stringify(list));
  if(st==="approved"){
    const pts=Number(list[i].points||0);
    // credit current demo/local user points store (same browser)
    const cur=Number(localStorage.getItem("cinehub4_points")||0);
    localStorage.setItem("cinehub4_points",String(cur+pts));
    // per-user ledger
    try{
      const uid=list[i].uid||"local";
      const key="cinehub4_userpts_"+uid;
      const up=Number(localStorage.getItem(key)||0);
      localStorage.setItem(key,String(up+pts));
    }catch(e){}
  }
  render();toast(st==="approved"?"Accepted · points credited":"Rejected");
}
function payDelete(i){
  const list=JSON.parse(localStorage.getItem("cinehub4_payments")||"[]");
  list.splice(i,1);
  localStorage.setItem("cinehub4_payments",JSON.stringify(list));
  render();toast("Deleted");
}

function adult(){return `<div class="grid section-grid"><div class="card"><h3>Adult Library</h3><div class="switch"><span>Enable adult section</span><span class="toggle ${A.adultEnabled?'on':''}" onclick="A.adultEnabled=!A.adultEnabled;render()"><i></i></span></div><div class="switch"><span>Separate adult ad block</span><span class="badge">${A.settings.adBlocks.adult||'NOT SET'}</span></div><div class="switch"><span>18+ confirmation</span><span class="badge green">REQUIRED</span></div><button class="btn primary" style="margin-top:15px" onclick="openAdultMovie()">＋ Add Adult Movie</button></div><div class="card"><h3>Adult Ad Rule</h3><div class="muted smalltext">Adult advertisements use their own Ad Block ID. This is independent from normal rewarded ads.</div><button class="btn" style="margin-top:12px" onclick="setSection('ads')">Configure Adult Ad</button></div></div>
<div class="card" style="margin-top:14px"><div class="toolbar"><div><h3 style="margin:0">Adult Categories</h3><div class="muted smalltext">Separate from Movie Categories — has no connection to regular movies.</div></div><button class="btn primary" onclick="openCategoryAdult()">＋ Add Adult Category</button></div><div class="tag-list">${A.settings.adultCategories.map((c,i)=>`<div class="tag-item"><span>${c}</span><div><button class="btn" onclick="editCategoryAdult(${i})">Edit</button> <button class="btn danger" onclick="deleteCategoryAdult(${i})">Delete</button></div></div>`).join('')}</div></div>
<div class="card" style="margin-top:14px"><h3>Adult Page Text</h3><div class="muted smalltext">Edit labels shown on the Adult page. Colors and layout stay the same as Movies.</div><div class="form-grid" style="margin-top:12px"><div class="field"><label>Badge</label><input id="aLibBadge" value="${A.settings.adultLibraryBadge||''}"></div><div class="field"><label>Title</label><input id="aLibTitle" value="${A.settings.adultLibraryTitle||''}"></div><div class="field"><label>Description</label><input id="aLibDesc" value="${A.settings.adultLibraryDesc||''}"></div><div class="field"><label>Ticker Text</label><input id="aTicker" value="${A.settings.adultTickerText||''}"></div><div class="field"><label>New Label</label><input id="aNewLabel" value="${A.settings.adultNewLabel||''}"></div><div class="field"><label>New Sub</label><input id="aNewSub" value="${A.settings.adultNewSub||''}"></div><div class="field"><label>Trending Label</label><input id="aTrendLabel" value="${A.settings.adultTrendingLabel||''}"></div><div class="field"><label>Trending Sub</label><input id="aTrendSub" value="${A.settings.adultTrendingSub||''}"></div></div><button class="btn primary" style="margin-top:14px" onclick="saveAdultTexts()">Save Adult Page Text</button></div>
<div class="card table-wrap" style="margin-top:14px"><div class="toolbar"><h3 style="margin:0">Adult Movies</h3></div><table class="table"><thead><tr><th>Movie</th><th>Category</th><th>Rating</th><th>Clicks</th><th>Downloads</th><th>Status</th><th>Action</th></tr></thead><tbody>${adultMovieRows(A.movies.filter(m=>m.adult))}</tbody></table></div>`}
function openCategoryAdult(index=null){const old=index===null?'':A.settings.adultCategories[index];showModal(`<div class="modal-head"><h2>${index===null?'Add':'Edit'} Adult Category</h2><button class="btn" onclick="closeModal()">×</button></div><div class="field"><label>Category name</label><input id="catNameAdult" value="${old}"></div><button class="btn primary" style="margin-top:15px" onclick="saveCategoryAdult(${index===null?-1:index})">Save Category</button>`)}
function editCategoryAdult(i){openCategoryAdult(i)}
function saveCategoryAdult(i){const n=$('#catNameAdult').value.trim();if(!n)return;if(i<0)A.settings.adultCategories.push(n);else A.settings.adultCategories[i]=n;save();closeModal();render();toast('Adult category saved')}
function deleteCategoryAdult(i){if(A.settings.adultCategories[i]==='All'){toast('All category cannot be deleted');return}if(confirm('Delete this adult category?')){A.settings.adultCategories.splice(i,1);save();render();toast('Adult category deleted')}}
function saveAdultTexts(){A.settings.adultLibraryBadge=$('#aLibBadge').value.trim();A.settings.adultLibraryTitle=$('#aLibTitle').value.trim();A.settings.adultLibraryDesc=$('#aLibDesc').value.trim();A.settings.adultTickerText=$('#aTicker').value.trim();A.settings.adultNewLabel=$('#aNewLabel').value.trim();A.settings.adultNewSub=$('#aNewSub').value.trim();A.settings.adultTrendingLabel=$('#aTrendLabel').value.trim();A.settings.adultTrendingSub=$('#aTrendSub').value.trim();save();toast('Adult page text saved')}
function adultMovieRows(ms){return ms.length?ms.map(m=>`<tr><td><div class="movie-row"><div class="thumb">${(m.title||'?').slice(0,1)}</div><div><b>${m.title}</b><div class="muted">${m.year}</div></div></div></td><td>${m.category||'Adult'}</td><td>⭐ ${m.rating}</td><td>${money(m.clicks||0)}</td><td>${money(m.downloads||0)}</td><td><span class="badge ${m.status==='Published'?'green':''}">${m.status}</span></td><td class="action-cell"><button type="button" class="btn dots-btn" data-mid="${m.id}" aria-label="Actions">⋮</button><div class="dots-menu hidden" id="dm-${m.id}"><button type="button" onclick="editAdultMovie(${m.id});closeAllDots()">Edit</button><button type="button" class="danger" onclick="deleteMovie(${m.id});closeAllDots()">Delete</button></div></td></tr>`).join(''):`<tr><td colspan="7" class="muted">No adult movies yet. Use “＋ Add Adult Movie” above.</td></tr>`}
function requests(){return `<div class="card table-wrap"><table class="table"><thead><tr><th>User</th><th>Requested Title</th><th>Date</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead><tbody>${[['@demo_user_1','Avengers: Secret Wars','Today','High','Pending'],['@moviefan','Interstellar','Yesterday','Normal','Pending'],['@sifat_demo','Dune: Part Three','Yesterday','Normal','Searching']].map(r=>`<tr><td>${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td><td>${r[3]}</td><td><span class="badge">${r[4]}</span></td><td><button class="btn" onclick="toast('Request manager opened')">Manage</button></td></tr>`).join('')}</tbody></table></div>`}
function contentPage(){return `<div class="grid section-grid"><div class="card"><h3>Telegram & Support Links</h3><div class="field"><label>Bot / Telegram Link</label><input id="botLink" value="${A.settings.telegramBotLink||''}" placeholder="https://t.me/Cinehub4bot"></div><div class="field" style="margin-top:12px"><label>Movie Channel Link</label><input id="channelLink" value="${A.settings.telegramChannelLink||''}" placeholder="https://t.me/yourchannel"></div><button class="btn primary" style="margin-top:14px" onclick="saveLinks()">Save Links</button></div><div class="card"><h3>How To Earn Video</h3><div class="field"><label>Video URL (YouTube/Telegram/MP4)</label><input id="howVideo" value="${A.settings.howToEarnVideo||''}" placeholder="https://...video..."></div><button class="btn primary" style="margin-top:14px" onclick="saveVideo()">Save Video</button><div class="muted smalltext" style="margin-top:10px">User Settings → How To Earn will open this URL.</div></div></div><div class="card" style="margin-top:14px"><h3>App Content Shortcuts</h3><div class="quick"><button onclick="setSection('categories')"><b>▦ Categories</b>Manage all movie categories</button><button onclick="setSection('ads')"><b>◉ Ad IDs</b>Change or add every ad block</button><button onclick="setSection('adult')"><b>18+ Adult</b>Separate library and ad</button><button onclick="setSection('settings')"><b>⚙ Settings</b>Brand, language and controls</button></div></div>`}
function saveLinks(){A.settings.telegramBotLink=$('#botLink').value.trim();A.settings.telegramChannelLink=$('#channelLink').value.trim();save();toast('Telegram links saved')}
function saveVideo(){A.settings.howToEarnVideo=$('#howVideo').value.trim();save();toast('How To Earn video saved')}
function broadcast(){return `<div class="card"><h3>Broadcast Center</h3><div class="form-grid"><div class="field"><label>Audience</label><select><option>All users</option><option>Active users</option><option>Users with points</option></select></div><div class="field"><label>Type</label><select><option>Text</option><option>Movie announcement</option></select></div></div><div class="field" style="margin-top:12px"><label>Message</label><textarea placeholder="Write your broadcast..."></textarea></div><button class="btn primary" style="margin-top:12px" onclick="toast('Broadcast queued in demo')">Send Broadcast</button></div>`}
function settings(){
  const s=A.settings;
  const pkgs=(s.packages||[]).map((p,i)=>`<div class="field" style="grid-column:1/-1;display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:8px;align-items:end">
    <div><label>Package ${i+1}</label><input data-pkg="${i}" data-k="name" value="${p.name||""}"></div>
    <div><label>USDT</label><input data-pkg="${i}" data-k="price" type="number" step="0.01" value="${p.price||0}"></div>
    <div><label>Points</label><input data-pkg="${i}" data-k="points" type="number" value="${p.points||0}"></div>
    <div><label>Tag</label><input data-pkg="${i}" data-k="tag" value="${p.tag||""}"></div>
    <button class="btn danger" onclick="A.settings.packages.splice(${i},1);save();render()">×</button>
  </div>`).join("");
  return `<div class="grid section-grid">
  <div class="card"><h3>Brand & Links</h3>
    <div class="form-grid">
      <div class="field"><label>App Name</label><input id="s_appName" value="${s.appName||""}"></div>
      <div class="field"><label>Bot Username</label><input id="s_botUser" value="${s.botUsername||""}"></div>
      <div class="field"><label>Bot Link</label><input id="s_botLink" value="${s.telegramBotLink||""}"></div>
      <div class="field"><label>Channel Link</label><input id="s_channel" value="${s.telegramChannelLink||""}"></div>
      <div class="field" style="grid-column:1/-1"><label>How to Watch / Unlock message</label><textarea id="s_howWatch" rows="2">${s.howToWatchText||""}</textarea></div>
      <div class="field"><label>How to Earn Video URL</label><input id="s_howEarn" value="${s.howToEarnVideo||""}"></div>
      <div class="field"><label>How to Buy Video URL</label><input id="s_howBuy" value="${s.howToBuyVideo||""}"></div>
    </div>
  </div>

  <div class="card"><h3>Home Page Texts</h3>
    <div class="form-grid">
      <div class="field"><label>New Movies button</label><input id="s_newLabel" value="${s.newMoviesLabel||"New Movies"}"></div>
      <div class="field"><label>New Movies sub</label><input id="s_newSub" value="${s.newMoviesSub||"LATEST UPLOADS"}"></div>
      <div class="field"><label>Trending button</label><input id="s_trendLabel" value="${s.trendingLabel||"Trending"}"></div>
      <div class="field"><label>Trending sub</label><input id="s_trendSub" value="${s.trendingSub||"MOST WATCHED"}"></div>
      <div class="field"><label>Library badge</label><input id="s_libBadge" value="${s.libraryBadge||"MOVIE ZONE"}"></div>
      <div class="field"><label>Library title</label><input id="s_libTitle" value="${s.libraryTitle||"Cinema Library"}"></div>
      <div class="field" style="grid-column:1/-1"><label>Library description</label><textarea id="s_libDesc" rows="2">${s.libraryDesc||""}</textarea></div>
      <div class="field"><label>How to Watch button text</label><input id="s_howLabel" value="${s.howToWatchLabel||"▶ How to Watch"}"></div>
      <div class="field"><label>How to Watch link (video/url)</label><input id="s_howEarn2" value="${s.howToEarnVideo||""}" placeholder="https://..."></div>
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
      <button class="btn" onclick="A.settings.packages=A.settings.packages||[];A.settings.packages.push({name:'New',price:1,points:100,tag:''});save();render()">+ Add Package</button>
    </div>
  </div>
  <div class="card"><h3>Security</h3>
    <div class="switch"><span>Admin-only panel gate</span><span class="badge green">ENABLED</span></div>
    <div class="switch"><span>Adult library</span><span class="toggle ${A.adultEnabled?'on':''}" onclick="A.adultEnabled=!A.adultEnabled;this.classList.toggle('on');save()"><i></i></span></div>
  </div>
  <div class="card" style="grid-column:1/-1">
    <button class="btn primary" style="width:100%;padding:14px;font-size:15px" onclick="saveAllSettings()">💾 Save All Settings</button>
  </div>
</div>`;
}
function saveAllSettings(){
  const g=id=>document.getElementById(id);
  const s=A.settings;
  if(g("s_appName")) s.appName=g("s_appName").value;
  if(g("s_botUser")) s.botUsername=g("s_botUser").value;
  if(g("s_botLink")) s.telegramBotLink=g("s_botLink").value;
  if(g("s_channel")) s.telegramChannelLink=g("s_channel").value;
  if(g("s_howWatch")) s.howToWatchText=g("s_howWatch").value;
  if(g("s_howEarn")) s.howToEarnVideo=g("s_howEarn").value;
  if(g("s_howBuy")) s.howToBuyVideo=g("s_howBuy").value;
  if(g("s_newLabel")) s.newMoviesLabel=g("s_newLabel").value;
  if(g("s_newSub")) s.newMoviesSub=g("s_newSub").value;
  if(g("s_trendLabel")) s.trendingLabel=g("s_trendLabel").value;
  if(g("s_trendSub")) s.trendingSub=g("s_trendSub").value;
  if(g("s_libBadge")) s.libraryBadge=g("s_libBadge").value;
  if(g("s_libTitle")) s.libraryTitle=g("s_libTitle").value;
  if(g("s_libDesc")) s.libraryDesc=g("s_libDesc").value;
  if(g("s_howLabel")) s.howToWatchLabel=g("s_howLabel").value;
  if(g("s_howEarn2") && g("s_howEarn2").value) s.howToEarnVideo=g("s_howEarn2").value;
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
function openMovie(id=null){const m=id?A.movies.find(x=>x.id===id):null;showModal(`<div class="modal-head"><h2>${m?'Edit':'Add'} Movie</h2><button class="btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Title</label><input id="mTitle" value="${m?.title||''}"></div><div class="field"><label>Year</label><input id="mYear" type="number" value="${m?.year||2026}"></div><div class="field"><label>Category</label><select id="mCat">${A.settings.categories.filter(x=>x!=='All').map(c=>`<option ${m?.category===c?'selected':''}>${c}</option>`).join('')}</select></div><div class="field"><label>Rating</label><input id="mRating" type="number" step=".1" value="${m?.rating||8}"></div><div class="field"><label>Poster URL</label><input id="mPoster" value="${m?.poster||''}" placeholder="https://..."></div><div class="field"><label>Server 1 URL</label><input id="s1" value="${m?.server1||''}" placeholder="https://..."></div><div class="field"><label>Server 2 URL</label><input id="s2" value="${m?.server2||''}" placeholder="https://..."></div><div class="field"><label>Server 3 URL</label><input id="s3" value="${m?.server3||''}" placeholder="https://..."></div><div class="field"><label>Adult?</label><select id="mAdult"><option value="0">No</option><option value="1" ${m?.adult?'selected':''}>Yes</option></select></div></div><button class="btn primary" style="margin-top:15px" onclick="saveMovie(${id||0})">Save Movie</button>`)}
function saveMovie(id){const old=id?A.movies.find(m=>m.id===id):null;const x={id:id||Date.now(),title:$('#mTitle').value||'Untitled Movie',type:'Movie',year:+$('#mYear').value||2026,rating:+$('#mRating').value||8,category:$('#mCat').value,poster:$('#mPoster').value.trim(),server1:$('#s1').value.trim(),server2:$('#s2').value.trim(),server3:$('#s3').value.trim(),adult:$('#mAdult').value==='1',clicks:old?.clicks||0,downloads:old?.downloads||0,status:'Published'};if(id)A.movies=A.movies.map(m=>m.id===id?x:m);else A.movies.unshift(x);save();closeModal();render();toast('Movie saved')}
function editMovie(id){openMovie(id)}function deleteMovie(id){if(confirm('Delete this movie?')){A.movies=A.movies.filter(m=>m.id!==id);save();render();toast('Movie deleted')}}
function openCategory(index=null){const old=index===null?'':A.settings.categories[index];showModal(`<div class="modal-head"><h2>${index===null?'Add':'Edit'} Category</h2><button class="btn" onclick="closeModal()">×</button></div><div class="field"><label>Category name</label><input id="catName" value="${old}"></div><button class="btn primary" style="margin-top:15px" onclick="saveCategory(${index===null?-1:index})">Save Category</button>`)}
function editCategory(i){openCategory(i)}function saveCategory(i){const n=$('#catName').value.trim();if(!n)return;if(i<0)A.settings.categories.push(n);else A.settings.categories[i]=n;save();closeModal();render();toast('Category saved')}
function deleteCategory(i){if(A.settings.categories[i]==='All'){toast('All category cannot be deleted');return}if(confirm('Delete this category?')){A.settings.categories.splice(i,1);save();render();toast('Category deleted')}}
function openTask(name=''){showModal(`<div class="modal-head"><h2>${name?'Edit':'Add'} Daily Task</h2><button class="btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Task name</label><input id="taskName" value="${name}"></div><div class="field"><label>Reward points</label><input id="taskReward" type="number" value="5"></div><div class="field"><label>Daily limit</label><input id="taskLimit" type="number" value="1"></div></div><button class="btn primary" style="margin-top:15px" onclick="closeModal();toast('Task saved')">Save Task</button>`)}
function openAdBlock(){showModal(`<div class="modal-head"><h2>Add Ad Block</h2><button class="btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Ad Block Name</label><input id="extraAdName" placeholder="e.g. Home Reward"></div><div class="field"><label>Ad Block ID</label><input id="extraAdId" placeholder="43222"></div></div><button class="btn primary" style="margin-top:15px" onclick="saveExtraAd()">Add Ad Block</button>`)}
function saveExtraAd(){const n=$('#extraAdName').value.trim(),id=$('#extraAdId').value.trim();if(!n||!id)return;A.settings.adBlocks.extra=A.settings.adBlocks.extra||{};A.settings.adBlocks.extra[n]=id;save();closeModal();render();toast('Ad block added')}
function openAdultMovie(id=null){const m=id?A.movies.find(x=>x.id===id):null;const cats=A.settings.adultCategories.filter(x=>x!=='All');showModal(`<div class="modal-head"><h2>${m?'Edit':'Add'} Adult Movie</h2><button class="btn" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Title</label><input id="adultTitle" value="${m?.title||''}" placeholder="Adult title"></div><div class="field"><label>Year</label><input id="adultYear" type="number" value="${m?.year||new Date().getFullYear()}"></div><div class="field"><label>Category</label><select id="adultCat">${cats.map(c=>`<option ${m?.category===c?'selected':''}>${c}</option>`).join('')}</select></div><div class="field"><label>Rating</label><input id="adultRating" type="number" step=".1" value="${m?.rating||0}"></div><div class="field"><label>Poster URL</label><input id="adultPoster" value="${m?.poster||''}" placeholder="https://..."></div><div class="field"><label>Server 1 URL</label><input id="adultS1" value="${m?.server1||''}" placeholder="https://..."></div><div class="field"><label>Server 2 URL</label><input id="adultS2" value="${m?.server2||''}" placeholder="https://..."></div><div class="field"><label>Server 3 URL</label><input id="adultS3" value="${m?.server3||''}" placeholder="https://..."></div></div><button class="btn primary" style="margin-top:15px" onclick="saveAdultMovie(${id||0})">Save Adult Movie</button>`)}
function saveAdultMovie(id){const old=id?A.movies.find(m=>m.id===id):null;const t=$('#adultTitle').value.trim();if(!t)return;const x={id:id||Date.now(),title:t,type:'Adult',year:+$('#adultYear').value||new Date().getFullYear(),rating:+$('#adultRating').value||0,category:$('#adultCat').value,adult:true,poster:$('#adultPoster').value.trim(),server1:$('#adultS1').value.trim(),server2:$('#adultS2').value.trim(),server3:$('#adultS3').value.trim(),clicks:old?.clicks||0,downloads:old?.downloads||0,status:'Published'};if(id)A.movies=A.movies.map(m=>m.id===id?x:m);else A.movies.unshift(x);save();closeModal();render();toast('Adult movie saved')}
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
