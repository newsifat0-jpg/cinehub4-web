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
    // Support BOTH bot schema (s1/s2/s3) and mini-app schema (server1/server1_link)
    const d = (doc && typeof doc.data === "function") ? (doc.data() || {}) : (doc || {});
    const id = (doc && doc.id != null) ? doc.id : (d.id || "");
    const s1 = d.server1_link || d.server1 || d.s1 || "";
    const s2 = d.server2_link || d.server2 || d.s2 || "";
    const s3 = d.server3_link || d.server3 || d.s3 || "";
    const s1on = d.server1_status != null ? d.server1_status !== false : (d.s1on !== false);
    const s2on = d.server2_status != null ? d.server2_status !== false : (d.s2on !== false);
    const s3on = d.server3_status != null ? d.server3_status !== false : (d.s3on !== false);
    const added = Number(d.added_time || d.created_time || d.updated_time || 0) || 0;
    return {
      id: id, tmdb_id: d.tmdb_id || "", title: d.title || "Untitled", original_title: d.original_title || "",
      year: d.year || "", release_date: d.release_date || "", poster: d.poster || d.poster_url || "",
      backdrop: d.backdrop || "", overview: d.overview || d.plot || "",
      rating: Number(d.rating || d.vote_average) || 0, vote_count: Number(d.vote_count) || 0,
      runtime: Number(d.runtime) || 0,
      duration: d.runtime ? (Math.floor(d.runtime/60)+":"+String(d.runtime%60).padStart(2,"0")+":00") : (d.duration || ""),
      genre: d.genres || d.genre || "", genres: d.genres || d.genre || "", language: d.language || "",
      manual_movie: !!d.manual_movie || d.source === "manual",
      server1: s1, server2: s2, server3: s3,
      server1_link: s1, server2_link: s2, server3_link: s3,
      s1: s1, s2: s2, s3: s3,
      server1_status: s1on, server2_status: s2on, server3_status: s3on,
      s1on: s1on, s2on: s2on, s3on: s3on,
      category: d.category || (d.genres ? String(d.genres).split(",")[0].trim() : "All Movies"),
      adult: !!d.adult, type: d.adult ? "Adult" : (d.type || "Movie"),
      clicks: Number(d.clicks) || 0, downloads: Number(d.downloads) || 0,
      likes: Number(d.likes) || 0, views: Number(d.views || d.clicks) || 0,
      status: d.status || "Published", added_by: d.added_by || "",
      added_time: added, updated_time: Number(d.updated_time) || added,
      source: d.source || (d.manual_movie ? "manual" : "tmdb")
    };
  }
  function normalizeMovieDoc(raw) {
    // API listMovies returns plain objects (already fields), not Firestore snapshots
    if (!raw) return null;
    if (raw.id != null && (raw.title != null || raw.s1 != null || raw.server1 != null)) {
      return fromMovie({ id: raw.id, data: function(){ return raw; } });
    }
    return fromMovie(raw);
  }
  window.CineHubFB = {
    db:db, getUid:getUid,
    loadMovies:function(){
      if(!db)return Promise.resolve([]);
      return db.collection("movies").get().then(s=>{
        let a=[]; s.forEach(d=>a.push(fromMovie(d)));
        a.sort(function(x,y){return Number(y.added_time||0)-Number(x.added_time||0)});
        return a;
      }).catch(function(){ return []; });
    },
    listenMovies:function(cb){
      if(!db){cb([]);return function(){};}
      // No orderBy — works even without composite index; sort client-side
      return db.collection("movies").onSnapshot(function(s){
        let a=[]; s.forEach(function(d){a.push(fromMovie(d));});
        a.sort(function(x,y){return Number(y.added_time||0)-Number(x.added_time||0)});
        cb(a);
      }, function(){ cb([]); });
    },
    saveMovie:function(movie){
      function writeClient(m){
        if(!db) return Promise.reject(new Error("No Firebase client"));
        var id = String(m.id || m.tmdb_id || ("m_" + Date.now())).replace(/\//g, "_");
        var s1 = String(m.server1 || m.server1_link || m.s1 || "");
        var s2 = String(m.server2 || m.server2_link || m.s2 || "");
        var s3 = String(m.server3 || m.server3_link || m.s3 || "");
        var data = {
          title: String(m.title || "Untitled"),
          year: String(m.year || ""),
          poster: String(m.poster || ""),
          overview: String(m.overview || ""),
          rating: Number(m.rating) || 0,
          category: String(m.category || "All Movies"),
          type: String(m.type || (m.adult ? "Adult" : "Movie")),
          adult: !!m.adult,
          status: String(m.status || "Published"),
          manual_movie: m.manual_movie !== false,
          source: String(m.source || "manual"),
          tmdb_id: String(m.tmdb_id || ""),
          server1: s1, server2: s2, server3: s3,
          server1_link: s1, server2_link: s2, server3_link: s3,
          s1: s1, s2: s2, s3: s3,
          s1on: true, s2on: true, s3on: true,
          server1_status: true, server2_status: true, server3_status: true,
          clicks: Number(m.clicks) || 0,
          downloads: Number(m.downloads) || 0,
          views: Number(m.views || m.clicks) || 0,
          added_time: Number(m.added_time) || Date.now(),
          created_time: String(m.created_time || new Date().toISOString()),
          updated_time: Date.now()
        };
        return db.collection("movies").doc(id).set(data, {merge:true}).then(function(){
          return Object.assign({}, data, {id: id});
        });
      }
      // Prefer server API (service account bypasses client rules)
      return api("saveMovie",{movie:movie}).then(function(saved){
        return saved;
      }).catch(function(eApi){
        // If rules temporarily allow client write, try as last resort
        if (!db) throw eApi;
        return writeClient(movie).catch(function(){
          throw eApi;
        });
      });
    },
    deleteMovie:function(id){return api("deleteMovie",{id:String(id)});},
    incClicks:function(id){return api("incClicks",{id:String(id)});},
    loadConfig:function(){return api("loadPublicConfig");},
    saveConfig:function(data){return api("saveConfig",{data:data});},
    loadUser:function(uid){
      var profile = {};
      try {
        var u = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user;
        if (u) {
          profile = {
            first_name: u.first_name || "",
            last_name: u.last_name || "",
            username: u.username || "",
            photo_url: u.photo_url || "",
            language_code: u.language_code || ""
          };
        }
      } catch (e) {}
      return api("loadUser",{uid:String(uid||getUid()), profile: profile});
    },
    processReferral:function(refFrom,config){return api("processReferral",{refFrom:String(refFrom||""),config:config||{}});},
    checkChannelMember:function(channel){return api("checkChannelMember",{channel:String(channel||"")});},
    saveUser:function(uid,data){return api("saveUser",{uid:String(uid||getUid()),data:data});},
    updateUserField:function(uid,fields){return api("updateUserField",{uid:String(uid||getUid()),fields:fields});},
    isUnlocked:function(userData,movieId){if(!userData||!userData.unlocks)return false;return Number(userData.unlocks[String(movieId)]||0)>Date.now();},
    setUnlock:function(uid,movieId,hours){return api("setUnlock",{uid:String(uid||getUid()),movieId:String(movieId),hours:Number(hours)||15});},
    loadPayments:function(uid){return api("loadPayments",{uid:String(uid||getUid())});},
    addPayment:function(payment){return api("addPayment",{payment:payment});},
    listUsers:function(){return api("listUsers",{});},
    deleteUser:function(uid){return api("deleteUser",{targetUid:String(uid)});},
    adminUpdateUser:function(uid,fields){return api("adminUpdateUser",{targetUid:String(uid),fields:fields||{}});},
    listPayments:function(){return api("listPayments",{});},
    updatePayment:function(id,fields){return api("updatePayment",{id:String(id||""),fields:fields||{}});},
    deletePayment:function(id){return api("deletePayment",{id:String(id||"")});},
    listRequests:function(){return api("listRequests",{});},
    updateRequest:function(id,fields){return api("updateRequest",{id:String(id||""),fields:fields||{}});},
    deleteRequest:function(id){return api("deleteRequest",{id:String(id||"")});},
    testFirebase:function(){return api("testFirebase",{});},
    loadRequests:function(){return api("loadRequests");},
    addRequest:function(req){return api("addRequest",{request:req});},
    loadFavourites:function(uid){return api("loadFavourites",{uid:String(uid||getUid())});},
    toggleFavourite:function(uid,movieId,title){return api("toggleFavourite",{uid:String(uid||getUid()),movieId:String(movieId),title:title||""});},
    searchTmdb:function(query){return api("searchTmdb",{query:String(query||"")});},
    refreshTmdbMeta:function(movieId,tmdbId){
      return api("refreshTmdbMeta",{movieId:String(movieId||""),tmdbId:String(tmdbId||"")});
    },
    importTmdbMovie:function(tmdbId){
      // Backend fetches TMDB + saves; if Firebase key broken, search already has data — client will be used by admin importFromSearch
      return api("importTmdbMovie",{tmdbId:String(tmdbId||"")}).catch(function(err){
        // Fallback: build minimal movie from tmdb id only (poster may be missing)
        var m = {
          id: "tmdb_" + String(tmdbId),
          tmdb_id: String(tmdbId),
          title: "TMDB " + tmdbId,
          source: "tmdb",
          manual_movie: false,
          status: "Published",
          category: "All Movies"
        };
        return window.CineHubFB.saveMovie(m).then(function(saved){
          throw new Error((err && err.message ? err.message : err) + " — partial client save used");
        }).catch(function(){ throw err; });
      });
    },
    loadMoviesApi:function(){
      return api("loadMovies",{}).then(function(list){
        return (list||[]).map(function(m){ return normalizeMovieDoc(m); }).filter(Boolean);
      });
    }
  };
})();