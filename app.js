const C=window.CINEHUB4_CONFIG;
let lang=localStorage.getItem("cinehub4_lang")||C.language;
let points=Number(localStorage.getItem("cinehub4_points")||35);
let movies=[
 {id:"demo1",title:"The Last Horizon",year:"2026",rating:"8.7",genre:"Action • Sci-Fi",poster:"https://image.tmdb.org/t/p/w500/6Wdl9N6dBq0f5bY4c8c2Y7d0G3.jpg",overview:"A demo movie used to test the complete Cine Hub4 movie-details and unlock experience.",downloads:980},
 {id:"demo2",title:"Midnight City",year:"2025",rating:"8.2",genre:"Thriller • Crime",poster:"https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",overview:"Demo movie for testing search, trending and download server screens.",downloads:760},
 {id:"demo3",title:"Ocean Signal",year:"2025",rating:"7.9",genre:"Drama • Mystery",poster:"https://image.tmdb.org/t/p/w500/5qHoazZiaLe7oFBok7XlUhg96f2.jpg",overview:"Demo content for testing the Cine Hub4 Mini App.",downloads:540},
 {id:"demo4",title:"Shadow Protocol",year:"2024",rating:"8.4",genre:"Action • Thriller",poster:"https://image.tmdb.org/t/p/w500/7M1k0B3J2h9z1s6W4y5d8p0Q.jpg",overview:"Demo movie with three server buttons.",downloads:430}
];

const demoAdmin=true;
const adminIds=[String(C.demoAdmin.ownerId),...C.demoAdmin.adminIds.map(String)];
function telegramId(){return String(window.Telegram?.WebApp?.initDataUnsafe?.user?.id||C.demoAdmin.ownerId)}
function isAdmin(){return demoAdmin||adminIds.includes(telegramId())}
function text(bn,en){return lang==="bn"?bn:en}
function save(){localStorage.setItem("cinehub4_lang",lang);localStorage.setItem("cinehub4_points",points)}
function toast(s){const x=document.getElementById("toast");x.textContent=s;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function poster(m){return `<img class="poster" src="${m.poster}" onerror="this.style.display='none'">`}
function movieCard(m){return `<article class="movie-card" onclick="openMovie('${m.id}')">${poster(m)}<div class="movie-card-body"><div class="movie-card-title">${m.title}</div><div class="meta">${m.year} • ★ ${m.rating}</div></div></article>`}
function listCard(m){return `<article class="list-card"><img src="${m.poster}" onerror="this.style.display='none'"><div class="info"><h3>${m.title}</h3><span class="pill">${m.year} • ★ ${m.rating} • ${m.genre}</span><p>${m.overview}</p><button class="btn primary" onclick="openMovie('${m.id}')">${text("মুভি দেখুন","View Movie")} →</button></div></article>`}
function renderHome(){
 document.getElementById("content").innerHTML=`
 <div class="page">
  <section class="hero"><span class="eyebrow">CINE HUB4 ORIGINAL</span><h1>${text("মুভির নতুন জগতে স্বাগতম","Welcome to the new world of movies")}</h1><p>${text("নতুন মুভি খুঁজুন, আনলক করুন এবং আপনার পছন্দের সার্ভার থেকে ডাউনলোড করুন।","Discover, unlock and download movies from your preferred server.")}</p><div><button class="btn primary" onclick="openPage('movies')">▶ ${text("মুভি ব্রাউজ করুন","Browse Movies")}</button> <button class="btn" onclick="openPage('points')">★ ${points}</button></div></section>
  <section class="section"><div class="section-head"><h2>🆕 ${text("Recently Added","Recently Added")}</h2><button onclick="openPage('recent')">${text("সব","View All")} ›</button></div><div class="horizontal">${movies.map(movieCard).join("")}</div></section>
  <section class="section"><div class="section-head"><h2>🔥 ${text("Trending Now","Trending Now")}</h2><button onclick="openPage('trending')">${text("সব","View All")} ›</button></div><div class="horizontal">${[...movies].sort((a,b)=>b.downloads-a.downloads).map(movieCard).join("")}</div></section>
  <section class="section grid"><div class="card"><h3>★ ${text("My Points","My Points")}</h3><strong style="font-size:25px">${points}</strong><p class="muted">${C.unlock.pointsCost} points → ${C.unlock.durationHours}h unlock</p></div><div class="card"><h3>📺 Ads</h3><p class="muted">${C.ads.dailyPointRewardLimit} reward ads/day for points</p></div></section>
 </div>`;
}
function renderMovies(){document.getElementById("content").innerHTML=`<div class="page"><button class="btn" onclick="openPage('home')">‹ ${text("হোম","Home")}</button><section class="section"><h2>🎬 ${text("সব মুভি","All Movies")}</h2>${movies.map(listCard).join("")}</section></div>`}
function renderSearch(){document.getElementById("content").innerHTML=`<div class="page"><button class="btn" onclick="openPage('home')">‹ ${text("হোম","Home")}</button><section class="section"><h2>⌕ ${text("মুভি সার্চ","Search Movies")}</h2><input class="input" id="searchInput" placeholder="${text("মুভির নাম লিখুন...","Type movie title...")}" oninput="searchMovies(this.value)"><div id="searchResults" class="section"></div></section></div>`}
function searchMovies(q){const a=movies.filter(m=>m.title.toLowerCase().includes(q.toLowerCase()));document.getElementById("searchResults").innerHTML=q?a.map(listCard).join(""):`<div class="card muted">${text("সার্চ শুরু করুন","Start searching")}</div>`}
function renderPoints(){document.getElementById("content").innerHTML=`<div class="page"><section class="hero"><span class="eyebrow">WALLET</span><h1>★ ${points} Points</h1><p>${text("মুভি আনলক, ডেইলি টাস্ক ও রেফার থেকে পয়েন্ট ব্যবহার করুন।","Use points for movie unlocks, tasks and referrals.")}</p></section><section class="section grid"><div class="card"><h3>📺 ${text("Ad দেখে Point","Watch Ad for Points")}</h3><p class="muted">${C.ads.rewardPoints} points/ad • ${C.ads.dailyPointRewardLimit} ads/day</p><button class="btn primary" onclick="rewardAd()">Watch Ad</button></div><div class="card"><h3>🎯 Daily Tasks</h3><p class="muted">Earn bonus points from tasks.</p><button class="btn" onclick="toast(text('Tasks backend-এ যুক্ত হবে','Tasks will connect to backend'))">Open</button></div><div class="card"><h3>👥 Referral</h3><p class="muted">Invite friends and earn.</p><button class="btn" onclick="toast(text('Referral backend-এ যুক্ত হবে','Referral will connect to backend'))">Invite</button></div><div class="card"><h3>💳 Buy Points</h3><p class="muted">Payment request + screenshot.</p><button class="btn" onclick="toast(text('Payment system backend-এ যুক্ত হবে','Payment system will connect to backend'))">Buy</button></div></section></div>`}
function getTelegramUser(){
 const u=window.Telegram?.WebApp?.initDataUnsafe?.user;
 return u||{id:C.demoAdmin.ownerId,first_name:"Cine Hub4",last_name:"Demo User",username:"cinehub4_demo",photo_url:""};
}
function renderProfile(){
 const u=getTelegramUser();
 const name=[u.first_name,u.last_name].filter(Boolean).join(" ")||"Telegram User";
 const username=u.username?`@${u.username}`:"Telegram User";
 const photo=u.photo_url||"";
 document.getElementById("content").innerHTML=`<div class="page">
  <section class="profile-cover">
   <div class="profile-glow"></div>
   <div class="profile-avatar">${photo?`<img src="${photo}" alt="Telegram profile">`:`<span>${name.charAt(0).toUpperCase()}</span>`}</div>
   <div class="verified-badge">✓</div>
   <h1>${name}</h1>
   <div class="username">${username}</div>
   <div class="verified-line"><span>✓</span> ${text("Telegram Verified","Telegram Verified")}</div>
  </section>
  <section class="section stat-grid">
   <div class="card stat"><span>★</span><strong>${points}</strong><span class="muted">${text("পয়েন্ট","Points")}</span></div>
   <div class="card stat"><span>🎬</span><strong>${movies.length}</strong><span class="muted">${text("মুভি","Movies")}</span></div>
  </section>
  <section class="section card">
   <div class="profile-row"><span>🆔 ${text("Telegram ID","Telegram ID")}</span><strong>${u.id}</strong></div>
   <div class="profile-row"><span>🟢 ${text("Account Status","Account Status")}</span><strong class="online">${text("Active","Active")}</strong></div>
   <div class="profile-row"><span>🛡️ ${text("Verification","Verification")}</span><strong>${text("Verified","Verified")}</strong></div>
  </section>
  <section class="section card"><h3>🌐 ${text("ভাষা","Language")}</h3><button class="btn ${lang==="bn"?"primary":""}" onclick="changeLang('bn')">বাংলা</button> <button class="btn ${lang==="en"?"primary":""}" onclick="changeLang('en')">English</button></section>
  <section class="section grid">
   <div class="card"><h3>❤️ ${text("Favourite","Favourite")}</h3><p class="muted">${text("আপনার পছন্দের মুভি","Your favourite movies")}</p><button class="btn" onclick="openPage('favourite')">Open</button></div>
   <div class="card"><h3>🕘 ${text("History","History")}</h3><p class="muted">${text("Recently viewed","Recently viewed")}</p><button class="btn" onclick="openPage('recent')">Open</button></div>
  </section>
 </div>`
}
function renderSimple(title,items){document.getElementById("content").innerHTML=`<div class="page"><button class="btn" onclick="openPage('home')">‹ ${text("হোম","Home")}</button><section class="section"><h2>${title}</h2>${items.map(listCard).join("")||`<div class="card muted">${text("কোনো মুভি নেই","No movies found")}</div>`}</section></div>`}
function openMovie(id){
 const m=movies.find(x=>x.id===id);if(!m)return;
 document.getElementById("modalBox").innerHTML=`
 <img class="poster" style="height:280px;border-radius:18px" src="${m.poster}" onerror="this.style.display='none'">
 <h2>${m.title}</h2><span class="pill">${m.year} • ★ ${m.rating} • ${m.genre}</span>
 <p class="muted">${m.overview}</p>
 <div class="card"><h3>🔓 ${text("মুভি আনলক করুন","Unlock Movie")}</h3><p class="muted">★ ${C.unlock.pointsCost} points → ${C.unlock.durationHours} hours</p><button class="btn primary full" onclick="unlockWithPoints('${id}')">★ ${text("My Points দিয়ে Unlock","Unlock with My Points")}</button><br><br><button class="btn success full" onclick="unlockWithAd('${id}')">📺 ${text("Ad দেখে Unlock","Watch Ad & Unlock")}</button></div>
 <h3 class="section">${text("ডাউনলোড সার্ভার","Download Servers")}</h3>
 <div id="serverArea"><div class="server">Server 1 <span class="pill">LOCKED</span></div><div class="server">Server 2 <span class="pill">LOCKED</span></div><div class="server">Server 3 <span class="pill">LOCKED</span></div></div>`;
 document.getElementById("modal").classList.add("open")
}
function unlockWithPoints(){
 if(points<C.unlock.pointsCost){toast(text("পর্যাপ্ত পয়েন্ট নেই","Not enough points"));return}
 points-=C.unlock.pointsCost;save();unlockServers();toast(text("১৫ ঘণ্টার জন্য মুভি আনলক হয়েছে","Movie unlocked for 15 hours"))
}
function unlockWithAd(){toast(text("Demo: Adsgram Ad দেখানোর পর Movie Unlock হবে","Demo: Adsgram ad will unlock this movie after completion"));unlockServers()}
function unlockServers(){
 document.querySelectorAll("#serverArea .server").forEach((x,i)=>{x.innerHTML=`Server ${i+1} <button class="btn primary" onclick="toast('Demo download server ${i+1}')">▶ Download</button>`})
}
function rewardAd(){points+=C.ads.rewardPoints;save();toast(text(`Demo Ad Reward: +${C.ads.rewardPoints} Points`,`Demo Ad Reward: +${C.ads.rewardPoints} Points`));renderPoints()}
function adminPanel(){
 if(!isAdmin())return;
 document.getElementById("content").innerHTML=`<div class="page">
 <section class="hero admin-banner"><span class="eyebrow">CINE HUB4 CONTROL CENTER</span><h1>👨‍💼 Admin Dashboard</h1><p>Demo Admin Mode is ON — সব module check করার জন্য open করা আছে।</p></section>
 <section class="section stat-grid"><div class="card stat">🎬<strong>${movies.length}</strong><span class="muted">Movies</span></div><div class="card stat">★<strong>${points}</strong><span class="muted">Points</span></div><div class="card stat">📺<strong>${C.ads.dailyPointRewardLimit}</strong><span class="muted">Daily Reward Ads</span></div><div class="card stat">⏱️<strong>${C.unlock.durationHours}h</strong><span class="muted">Unlock Duration</span></div></section>
 <section class="section"><div class="admin-toolbar"><button class="btn primary" onclick="adminMovies()">🎬 Movies</button><button class="btn" onclick="adminSettings()">⚙️ Settings</button><button class="btn" onclick="adminAds()">📺 Ads</button><button class="btn" onclick="adminUsers()">👥 Users</button></div><div id="adminArea" class="section"></div></section></div>`;
 adminMovies()
}
function adminMovies(){
 document.getElementById("adminArea").innerHTML=`<div class="card"><div class="section-head"><h2>🎬 Movie Management</h2><button class="btn primary" onclick="adminAddMovie()">＋ Add Movie</button></div><p class="muted">Demo movie database — পরে Firestore-এর একই Movies collection-এর সাথে connect হবে।</p>${movies.map(m=>`<div class="server"><div><strong>${m.title}</strong><div class="muted">${m.year} • ★ ${m.rating} • ${m.downloads} downloads</div></div><button class="btn" onclick="adminEditMovie('${m.id}')">Edit</button></div>`).join("")}</div>`
}
function adminAddMovie(){document.getElementById("adminArea").innerHTML=`<div class="card"><h2>＋ Add Movie</h2><div class="form-row"><input class="input" id="newTitle" placeholder="Movie title"><input class="input" id="newYear" placeholder="Year"><input class="input" id="newPoster" placeholder="Poster URL"><input class="input" id="newS1" placeholder="Server 1 URL"><input class="input" id="newS2" placeholder="Server 2 URL"><input class="input" id="newS3" placeholder="Server 3 URL"></div><button class="btn primary" onclick="saveDemoMovie()">Save Movie</button></div>`}
function saveDemoMovie(){const title=document.getElementById("newTitle").value.trim();if(!title){toast("Movie title required");return}movies.unshift({id:"demo"+Date.now(),title,year:document.getElementById("newYear").value||"2026",rating:"—",genre:"Demo",poster:document.getElementById("newPoster").value||"",overview:"Demo movie added from Admin Panel.",downloads:0});toast("Demo movie added");adminMovies()}
function adminEditMovie(id){const m=movies.find(x=>x.id===id);document.getElementById("adminArea").innerHTML=`<div class="card"><h2>✏️ Edit Movie</h2><div class="form-row"><input class="input" id="editTitle" value="${m.title}"><input class="input" id="editYear" value="${m.year}"><input class="input" id="editPoster" value="${m.poster}"></div><button class="btn primary" onclick="saveEdit('${id}')">Save Changes</button></div>`}
function saveEdit(id){const m=movies.find(x=>x.id===id);m.title=document.getElementById("editTitle").value;m.year=document.getElementById("editYear").value;m.poster=document.getElementById("editPoster").value;toast("Demo movie updated");adminMovies()}
function adminSettings(){document.getElementById("adminArea").innerHTML=`<div class="card"><h2>⚙️ Unlock & Bot Settings</h2><div class="switch"><span>Points Unlock Cost</span><strong>${C.unlock.pointsCost}</strong></div><div class="switch"><span>Unlock Duration</span><strong>${C.unlock.durationHours} Hours</strong></div><div class="switch"><span>Ad Unlock</span><strong>ON</strong></div><div class="switch"><span>Server 1 / 2 / 3</span><strong>ON</strong></div><p class="muted">Production version-এ এখান থেকেই Firestore config/main update হবে।</p></div>`}
function adminAds(){document.getElementById("adminArea").innerHTML=`<div class="card"><h2>📺 Ads Control</h2><div class="switch"><span>Provider</span><strong>${C.ads.provider}</strong></div><div class="switch"><span>Block ID</span><strong>${C.ads.blockId}</strong></div><div class="switch"><span>Reward Points</span><strong>+${C.ads.rewardPoints}</strong></div><div class="switch"><span>Daily Point Reward Limit</span><strong>${C.ads.dailyPointRewardLimit}</strong></div><p class="muted">এই limit শুধুমাত্র points earning-এর জন্য। Movie unlock Ad-এর জন্য নয়।</p></div>`}
function adminUsers(){document.getElementById("adminArea").innerHTML=`<div class="card"><h2>👥 Users</h2><p class="muted">Demo mode: Telegram user data backend connection-এর পরে এখানে আসবে।</p></div>`}
function buildDrawer(){
 let items=[["home","🏠 Home"],["movies","🎬 Movies"],["search","🔎 Search"],["recent","🕘 Recently Viewed"],["trending","🔥 Trending"],["favourite","❤️ Favourite"],["request","📩 Movie Request"],["adult","🔞 Adult"],["points","★ My Points"],["referral","👥 Referral"],["tasks","🎯 Daily Tasks"],["profile","👤 Profile"],["settings","⚙️ Settings"]];
 if(isAdmin())items.push(["admin","👨‍💼 ADMIN PANEL"]);
 document.getElementById("drawerItems").innerHTML=items.map(x=>`<button class="menu-item ${x[0]==="admin"?"admin":""}" onclick="openPage('${x[0]}')">${x[1]}</button>`).join("");
}
function openPage(p){
 closeDrawer();
 if(p==="home")renderHome();
 else if(p==="movies")renderMovies();
 else if(p==="search")renderSearch();
 else if(p==="points")renderPoints();
 else if(p==="profile")renderProfile();
 else if(p==="recent")renderSimple("🕘 Recently Viewed",movies.slice(0,2));
 else if(p==="trending")renderSimple("🔥 Trending",[...movies].sort((a,b)=>b.downloads-a.downloads));
 else if(p==="favourite")renderSimple("❤️ Favourite",[]);
 else if(p==="adult")renderSimple("🔞 Adult",[]);
 else if(p==="request")renderSimple("📩 Movie Request",[]);
 else if(p==="referral")renderSimple("👥 Referral",[]);
 else if(p==="tasks")renderSimple("🎯 Daily Tasks",[]);
 else if(p==="settings")renderProfile();
 else if(p==="admin")adminPanel();
}
function changeLang(x){lang=x;save();document.querySelectorAll("[data-bn]").forEach(e=>e.textContent=e.dataset[x]);openPage("home")}
function closeDrawer(){document.getElementById("drawer").classList.remove("open")}
document.getElementById("menuBtn").onclick=()=>document.getElementById("drawer").classList.add("open");
document.getElementById("drawer").onclick=e=>{if(e.target.id==="drawer")closeDrawer()};
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")document.getElementById("modal").classList.remove("open")};
window.openPage=openPage;window.openMovie=openMovie;window.searchMovies=searchMovies;window.unlockWithPoints=unlockWithPoints;window.unlockWithAd=unlockWithAd;window.rewardAd=rewardAd;window.changeLang=changeLang;window.adminMovies=adminMovies;window.adminAddMovie=adminAddMovie;window.saveDemoMovie=saveDemoMovie;window.adminEditMovie=adminEditMovie;window.saveEdit=saveEdit;window.adminSettings=adminSettings;window.adminAds=adminAds;window.adminUsers=adminUsers;window.closeDrawer=closeDrawer;window.text=text;
if(window.Telegram?.WebApp){window.Telegram.WebApp.ready();window.Telegram.WebApp.expand()}
setTimeout(()=>{document.getElementById("splash").classList.add("hidden");document.getElementById("app").classList.remove("hidden");buildDrawer();renderHome()},1300);
  
