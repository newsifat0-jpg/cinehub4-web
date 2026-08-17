/* Cine Hub4 — Complete bilingual UI
   Default: English
   Settings -> Language -> English / বাংলা
*/
window.CINEHUB4_LANG = (() => {
  const KEY="cinehub4_language", DEFAULT="en", SUPPORTED=["en","bn"];
  const D={
    en:{
      "ADMIN PANEL":"ADMIN PANEL","Dashboard":"Dashboard","Movies":"Movies","Users":"Users",
      "Points & Unlocks":"Points & Unlocks","Ads & Rewards":"Ads & Rewards","Daily Tasks":"Daily Tasks",
      "Payments":"Payments","Adult Library":"Adult Library","Movie Requests":"Movie Requests",
      "Broadcast":"Broadcast","Settings":"Settings","Open User App":"Open User App","Sign out":"Sign out",
      "Super Admin":"Super Admin","Verified administrator":"Verified administrator","Live":"Live",
      "Total Users":"Total Users","Points Issued":"Points Issued","Pending Payments":"Pending Payments",
      "Movie":"Movie","Add Movie":"Add Movie","Edit":"Edit","Delete":"Delete","Save":"Save",
      "Cancel":"Cancel","Import from TMDB":"Import from TMDB","Search title...":"Search title...",
      "Rating":"Rating","Clicks":"Clicks","Downloads":"Downloads","Status":"Status","Published":"Published",
      "Draft":"Draft","Add Task":"Add Task","Task name":"Task name","Reward points":"Reward points",
      "Daily limit":"Daily limit","Payment proof":"Payment proof","View":"View","Approve":"Approve",
      "User":"User","Package":"Package","Amount":"Amount","Payment ID":"Payment ID","Pending":"Pending",
      "Approved":"Approved","Adult movie":"Adult movie","Enable adult section":"Enable adult section",
      "18+ confirmation":"18+ confirmation","Broadcast center":"Broadcast center","Audience":"Audience",
      "All users":"All users","Active users":"Active users","Message":"Message","Send Broadcast":"Send Broadcast",
      "App settings":"App settings","App name":"App name","Default language":"Default language",
      "Telegram channel":"Telegram channel","Security":"Security","Maintenance mode":"Maintenance mode",
      "New registrations":"New registrations","English":"English","বাংলা":"বাংলা",
      "Home":"Home","Search":"Search","Favourite":"Favourite","Favourites":"Favourites","Profile":"Profile",
      "Recently Added":"Recently Added","Trending":"Trending","Recently Viewed":"Recently Viewed",
      "Movie Request":"Movie Request","My Points":"My Points","Referral":"Referral","Tasks":"Daily Tasks",
      "How To Earn":"How To Earn","Admin Panel":"Admin Panel","Categories":"Categories",
      "Unlock":"Unlock","Use My Points":"Use My Points","Watch Ad":"Watch Ad","Download":"Download",
      "Server":"Server","Overview":"Overview","Genre":"Genre","Year":"Year","Please Wait...":"Please Wait...",
      "No movies found":"No movies found","Buy Points":"Buy Points","Language":"Language","Back":"Back",
      "Verified":"Verified","Settings saved":"Settings saved"
    },
    bn:{
      "ADMIN PANEL":"এডমিন প্যানেল","Dashboard":"ড্যাশবোর্ড","Movies":"মুভি","Users":"ইউজার",
      "Points & Unlocks":"পয়েন্ট ও আনলক","Ads & Rewards":"এড ও রিওয়ার্ড","Daily Tasks":"ডেইলি টাস্ক",
      "Payments":"পেমেন্ট","Adult Library":"অ্যাডাল্ট লাইব্রেরি","Movie Requests":"মুভি রিকোয়েস্ট",
      "Broadcast":"ব্রডকাস্ট","Settings":"সেটিংস","Open User App":"ইউজার অ্যাপ খুলুন","Sign out":"সাইন আউট",
      "Super Admin":"সুপার অ্যাডমিন","Verified administrator":"ভেরিফাইড অ্যাডমিনিস্ট্রেটর","Live":"লাইভ",
      "Total Users":"মোট ইউজার","Points Issued":"দেওয়া পয়েন্ট","Pending Payments":"পেন্ডিং পেমেন্ট",
      "Movie":"মুভি","Add Movie":"মুভি যোগ করুন","Edit":"এডিট","Delete":"ডিলিট","Save":"সেভ",
      "Cancel":"বাতিল","Import from TMDB":"TMDB থেকে ইমপোর্ট","Search title...":"মুভির নাম খুঁজুন...",
      "Rating":"রেটিং","Clicks":"ক্লিক","Downloads":"ডাউনলোড","Status":"স্ট্যাটাস","Published":"প্রকাশিত",
      "Draft":"ড্রাফট","Add Task":"টাস্ক যোগ করুন","Task name":"টাস্কের নাম","Reward points":"রিওয়ার্ড পয়েন্ট",
      "Daily limit":"দৈনিক সীমা","Payment proof":"পেমেন্ট প্রুফ","View":"দেখুন","Approve":"অনুমোদন",
      "User":"ইউজার","Package":"প্যাকেজ","Amount":"পরিমাণ","Payment ID":"পেমেন্ট আইডি","Pending":"পেন্ডিং",
      "Approved":"অনুমোদিত","Adult movie":"অ্যাডাল্ট মুভি","Enable adult section":"অ্যাডাল্ট সেকশন চালু করুন",
      "18+ confirmation":"১৮+ কনফার্মেশন","Broadcast center":"ব্রডকাস্ট সেন্টার","Audience":"অডিয়েন্স",
      "All users":"সব ইউজার","Active users":"অ্যাকটিভ ইউজার","Message":"মেসেজ","Send Broadcast":"ব্রডকাস্ট পাঠান",
      "App settings":"অ্যাপ সেটিংস","App name":"অ্যাপের নাম","Default language":"ডিফল্ট ভাষা",
      "Telegram channel":"টেলিগ্রাম চ্যানেল","Security":"সিকিউরিটি","Maintenance mode":"মেইনটেন্যান্স মোড",
      "New registrations":"নতুন রেজিস্ট্রেশন","English":"English","বাংলা":"বাংলা",
      "Home":"হোম","Search":"সার্চ","Favourite":"ফেভারিট","Favourites":"ফেভারিট","Profile":"প্রোফাইল",
      "Recently Added":"সাম্প্রতিক যোগ","Trending":"ট্রেন্ডিং","Recently Viewed":"সম্প্রতি দেখা",
      "Movie Request":"মুভি রিকোয়েস্ট","My Points":"আমার পয়েন্ট","Referral":"রেফার","Tasks":"ডেইলি টাস্ক",
      "How To Earn":"কীভাবে আয় করবেন","Admin Panel":"এডমিন প্যানেল","Categories":"ক্যাটাগরি",
      "Unlock":"আনলক","Use My Points":"পয়েন্ট দিয়ে আনলক","Watch Ad":"এড দেখুন","Download":"ডাউনলোড",
      "Server":"সার্ভার","Overview":"ওভারভিউ","Genre":"জেনার","Year":"বছর","Please Wait...":"অপেক্ষা করুন...",
      "No movies found":"কোনো মুভি পাওয়া যায়নি","Buy Points":"পয়েন্ট কিনুন","Language":"ভাষা","Back":"পিছনে",
      "Verified":"ভেরিফাইড","Settings saved":"সেটিংস সেভ হয়েছে"
    }
  };

  function get(){const v=localStorage.getItem(KEY);return SUPPORTED.includes(v)?v:DEFAULT}
  function set(v){if(!SUPPORTED.includes(v))return;localStorage.setItem(KEY,v);document.documentElement.lang=v;apply();window.dispatchEvent(new CustomEvent("cinehub4:language",{detail:{language:v}}))}
  function t(k){return D[get()][k] ?? D.en[k] ?? k}
  function apply(root=document){
    document.documentElement.lang=get();
    root.querySelectorAll("[data-i18n]").forEach(el=>{
      const k=el.dataset.i18n; const val=t(k);
      if(el.matches("input,textarea")) el.placeholder=val; else el.textContent=val;
    });
    root.querySelectorAll("[data-i18n-title]").forEach(el=>el.title=t(el.dataset.i18nTitle));
    root.querySelectorAll("[data-lang-value]").forEach(el=>el.classList.toggle("active",el.dataset.langValue===get()));
  }
  document.addEventListener("DOMContentLoaded",()=>apply());
  window.addEventListener("cinehub4:language",()=>apply());
  return {get,set,t,apply,SUPPORTED,DEFAULT,dict:D};
})();
