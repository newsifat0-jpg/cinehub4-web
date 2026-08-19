/* Cine Hub4 secure data adapter.
 * UI files stay unchanged. All private reads/writes go through the secure backend.
 * Movies are public-read; movie writes are backend/admin/bot only.
 */
(function(){
  const cfg=window.APP_CONFIG||{};
  const API=String(cfg.apiBaseUrl||'').replace(/\/$/,'');
  function initData(){try{return window.Telegram&&window.Telegram.WebApp&&window.Telegram.WebApp.initData||''}catch(e){return ''}}
  function uid(){try{const u=window.Telegram.WebApp.initDataUnsafe.user;if(u&&u.id)return String(u.id)}catch(e){} return localStorage.getItem('cinehub4_uid')||''}
  function call(action,extra){
    if(!API||API.indexOf('PASTE_APPS_SCRIPT')===0)return Promise.reject(new Error('Secure backend URL is not configured'));
    const body=Object.assign({action:action,appId:String(cfg.appId||'cinehub4'),initData:initData()},extra||{});
    return fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)}).then(r=>r.json()).then(j=>{if(!j.ok)throw new Error(j.error||'API error');return j.data});
  }
  function normalizeMovie(d){d=d||{};return {id:d.id||'',tmdb_id:d.tmdb_id||'',title:d.title||'Untitled',original_title:d.original_title||'',year:d.year||'',release_date:d.release_date||'',poster:d.poster||'',backdrop:d.backdrop||'',overview:d.overview||'',rating:Number(d.rating)||0,vote_count:Number(d.vote_count)||0,runtime:Number(d.runtime)||0,duration:d.duration||'',genre:d.genres||d.genre||'',genres:d.genres||d.genre||'',language:d.language||'',manual_movie:!!d.manual_movie,server1:d.server1_link||d.server1||'',server2:d.server2_link||d.server2||'',server3:d.server3_link||d.server3||'',server1_link:d.server1_link||d.server1||'',server2_link:d.server2_link||d.server2||'',server3_link:d.server3_link||d.server3||'',server1_status:d.server1_status!==false,server2_status:d.server2_status!==false,server3_status:d.server3_status!==false,category:d.category||'All Movies',adult:!!d.adult,type:d.adult?'Adult':(d.type||'Movie'),clicks:Number(d.clicks)||0,downloads:Number(d.downloads)||0,likes:Number(d.likes)||0,views:Number(d.views||d.clicks)||0,status:d.status||'Published',added_by:d.added_by||'',added_time:Number(d.added_time)||0,updated_time:Number(d.updated_time)||0}}
  const api={
    getUid:uid,
    loadMovies:()=>call('loadMovies').then(a=>(a||[]).map(normalizeMovie)),
    listenMovies:function(cb){let stopped=false;const tick=()=>{if(stopped)return;api.loadMovies().then(cb).catch(e=>console.error(e));};tick();const timer=setInterval(tick,15000);return function(){stopped=true;clearInterval(timer)}},
    saveMovie:m=>call('saveMovie',{movie:m}).then(normalizeMovie),
    deleteMovie:id=>call('deleteMovie',{id:id}),
    incClicks:id=>call('incClicks',{id:id}),
    loadConfig:()=>call('loadConfig'),
    saveConfig:d=>call('adminSaveConfig',{data:d}),
    loadUser:()=>call('loadUser'),
    saveUser:(id,d)=>call('updateUser',{fields:d}),
    updateUserField:(id,d)=>call('updateUser',{fields:d}),
    isUnlocked:(u,id)=>!!(u&&u.unlocks&&Number(u.unlocks[String(id)]||0)>Date.now()),
    setUnlock:(id,movieId,hours)=>call('setUnlock',{movieId:movieId,hours:hours}),
    unlockByPoints:(movieId,cost,hours)=>call('unlockByPoints',{movieId:movieId,cost:cost,hours:hours}),
    unlockByAds:(movieId,needAds,hours)=>call('unlockByAds',{movieId:movieId,needAds:needAds,hours:hours}),
    claimAdReward:(reward,limit)=>call('claimAdReward',{reward:reward,limit:limit}),
    claimTask:name=>call('claimTask',{name:name}),
    loadPayments:()=>call('loadPayments'),
    addPayment:p=>call('addPayment',{payment:p}),
    loadRequests:()=>call('loadRequests'),
    addRequest:r=>call('addRequest',{request:r}),
    loadFavourites:()=>call('loadFavourites'),
    toggleFavourite:(id,movieId,title)=>call('toggleFavourite',{movieId:movieId,title:title})
  };
  window.CineHubFB=api;
})();
