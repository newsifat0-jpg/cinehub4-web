/* Cine Hub4 secure data bridge. UI/API shape preserved. */
(function () {
  if (!window.APP_CONFIG) return;
  const cfg = window.APP_CONFIG;
  const firebaseConfig = cfg.firebase || {};
  if (firebaseConfig.apiKey && window.firebase) {
    try { if (!firebase.apps.length) firebase.initializeApp(firebaseConfig); } catch(e) {}
  }
  const db = window.firebase ? firebase.firestore() : null;

  function getUid() {
    try {
      const u = window.Telegram?.WebApp?.initDataUnsafe?.user;
      if (u && u.id != null) return String(u.id);
    } catch(e) {}
    return localStorage.getItem("cinehub4_uid") || "";
  }
  function initData() {
    try { return window.Telegram?.WebApp?.initData || ""; } catch(e) { return ""; }
  }
  function api(action, payload) {
    payload = payload || {};
    payload.action = action;
    payload.initData = initData();
    return fetch(cfg.apiBaseUrl, {
      method:"POST",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
    }).then(r=>r.json()).then(function(x){
      if (!x || x.ok !== true) throw new Error((x && x.error) || "Request failed");
      return x.data;
    });
  }
  function fromMovie(doc) {
    const d=doc.data()||{}, id=doc.id;
    return {
      id:id, tmdb_id:d.tmdb_id||"", title:d.title||"Untitled", original_title:d.original_title||"",
      year:d.year||"", release_date:d.release_date||"", poster:d.poster||"", backdrop:d.backdrop||"",
      overview:d.overview||"", rating:Number(d.rating)||0, vote_count:Number(d.vote_count)||0,
      runtime:Number(d.runtime)||0, duration:d.runtime?(Math.floor(d.runtime/60)+":"+String(d.runtime%60).padStart(2,"0")+":00"):(d.duration||""),
      genre:d.genres||d.genre||"", genres:d.genres||d.genre||"", language:d.language||"",
      manual_movie:!!d.manual_movie, server1:d.server1_link||d.server1||"", server2:d.server2_link||d.server2||"",
      server3:d.server3_link||d.server3||"", server1_link:d.server1_link||d.server1||"",
      server2_link:d.server2_link||d.server2||"", server3_link:d.server3_link||d.server3||"",
      server1_status:d.server1_status!==false, server2_status:d.server2_status!==false, server3_status:d.server3_status!==false,
      category:d.category||(d.genres?String(d.genres).split(",")[0].trim():"All Movies"),
      adult:!!d.adult, type:d.adult?"Adult":(d.type||"Movie"), clicks:Number(d.clicks)||0,
      downloads:Number(d.downloads)||0, likes:Number(d.likes)||0, views:Number(d.views||d.clicks)||0,
      status:d.status||"Published", added_by:d.added_by||"", added_time:Number(d.added_time)||0, updated_time:Number(d.updated_time)||0
    };
  }
  window.CineHubFB = {
    db:db, getUid:getUid,
    loadMovies:function(){ if(!db)return Promise.resolve([]); return db.collection("movies").orderBy("added_time","desc").get().then(s=>{let a=[];s.forEach(d=>a.push(fromMovie(d)));return a;}).catch(()=>[]); },
    listenMovies:function(cb){ if(!db){cb([]);return function(){};} return db.collection("movies").orderBy("added_time","desc").onSnapshot(s=>{let a=[];s.forEach(d=>a.push(fromMovie(d)));cb(a);},()=>cb([])); },
    saveMovie:function(movie){return api("saveMovie",{movie:movie});},
    deleteMovie:function(id){return api("deleteMovie",{id:String(id)});},
    incClicks:function(id){return api("incClicks",{id:String(id)});},
    loadConfig:function(){return api("loadPublicConfig");},
    saveConfig:function(data){return api("saveConfig",{data:data});},
    loadUser:function(uid){return api("loadUser",{uid:String(uid||getUid())});},
    saveUser:function(uid,data){return api("saveUser",{uid:String(uid||getUid()),data:data});},
    updateUserField:function(uid,fields){return api("updateUserField",{uid:String(uid||getUid()),fields:fields});},
    isUnlocked:function(userData,movieId){if(!userData||!userData.unlocks)return false;return Number(userData.unlocks[String(movieId)]||0)>Date.now();},
    setUnlock:function(uid,movieId,hours){return api("setUnlock",{uid:String(uid||getUid()),movieId:String(movieId),hours:Number(hours)||15});},
    loadPayments:function(uid){return api("loadPayments",{uid:String(uid||getUid())});},
    addPayment:function(payment){return api("addPayment",{payment:payment});},
    loadRequests:function(){return api("loadRequests");},
    addRequest:function(req){return api("addRequest",{request:req});},
    loadFavourites:function(uid){return api("loadFavourites",{uid:String(uid||getUid())});},
    toggleFavourite:function(uid,movieId,title){return api("toggleFavourite",{uid:String(uid||getUid()),movieId:String(movieId),title:title||""});},
    searchTmdb:function(query){return api("searchTmdb",{query:String(query||"")});},
    importTmdbMovie:function(tmdbId){return api("importTmdbMovie",{tmdbId:String(tmdbId||"")});}
  };
})();