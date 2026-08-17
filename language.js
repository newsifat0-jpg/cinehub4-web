/* Cine Hub4 complete bilingual UI layer: English default, Bangla optional. */
window.CINEHUB4_LANG=(()=>{
 const KEY="cinehub4_language", SUPPORTED=["en","bn"], DEFAULT="en";
 const D={
 en:{Home:"Home",Movies:"Movies",Search:"Search",Favourites:"Favourites",Profile:"Profile",Settings:"Settings",
 Dashboard:"Dashboard",Users:"Users","Points & Unlocks":"Points & Unlocks","Ads & Rewards":"Ads & Rewards",
 "Daily Tasks":"Daily Tasks","Payments":"Payments","Adult Library":"Adult Library","Movie Requests":"Movie Requests",
 Broadcast:"Broadcast","Categories":"Categories","Admin Panel":"Admin Panel","Open User App":"Open User App",
 "Sign out":"Sign out","Recently Added":"Recently Added",Trending:"Trending","Recently Viewed":"Recently Viewed",
 "Movie Request":"Movie Request","My Points":"My Points",Referral:"Referral","How To Earn":"How To Earn",
 Unlock:"Unlock","Use My Points":"Use My Points","Watch Ad":"Watch Ad",Download:"Download",Server:"Server",
 Overview:"Overview",Rating:"Rating",Genre:"Genre",Year:"Year","Please Wait...":"Please Wait...","Save":"Save",
 Cancel:"Cancel","Back":"Back","Add Movie":"Add Movie","Edit":"Edit","Delete":"Delete","Import from TMDB":"Import from TMDB",
 "Search title...":"Search title...","Total Users":"Total Users","Points Issued":"Points Issued",
 "Pending Payments":"Pending Payments","Platform activity":"Platform activity","Quick controls":"Quick controls",
 "System status":"System status","Movie service":"Movie service","ONLINE":"ONLINE","ACTIVE":"ACTIVE",
 "Add movie":"Add movie","Publish new title":"Publish new title","Payments":"Payments","Review purchases":"Review purchases",
 "Ad settings":"Ad settings","Rewards & limits":"Rewards & limits","Points":"Points","Unlock pricing":"Unlock pricing",
 "Movie":"Movie","Published":"Published","Draft":"Draft","Manage":"Manage","Export CSV":"Export CSV",
 "Bulk action":"Bulk action","Active":"Active","Blocked":"Blocked","Pending":"Pending","Approve":"Approve",
 "Join Telegram channel":"Join Telegram channel","Refer a friend":"Refer a friend","Daily login":"Daily login",
 "Rewarded ad":"Rewarded ad","Adult ads":"Adult ads","Home banner":"Home banner","Rewarded unlock":"Rewarded unlock",
 "Enable adult section":"Enable adult section","18+ confirmation":"18+ confirmation","REQUIRED":"REQUIRED",
 "Broadcast center":"Broadcast center","App settings":"App settings","Security":"Security",
 "Maintenance mode":"Maintenance mode","New registrations":"New registrations","Default language":"Default language"},
 bn:{Home:"হোম",Movies:"মুভি",Search:"সার্চ",Favourites:"ফেভারিট",Profile:"প্রোফাইল",Settings:"সেটিংস",
 Dashboard:"ড্যাশবোর্ড",Users:"ইউজার","Points & Unlocks":"পয়েন্ট ও আনলক","Ads & Rewards":"এড ও রিওয়ার্ড",
 "Daily Tasks":"ডেইলি টাস্ক",Payments:"পেমেন্ট","Adult Library":"অ্যাডাল্ট লাইব্রেরি","Movie Requests":"মুভি রিকোয়েস্ট",
 Broadcast:"ব্রডকাস্ট",Categories:"ক্যাটাগরি","Admin Panel":"এডমিন প্যানেল","Open User App":"ইউজার অ্যাপ খুলুন",
 "Sign out":"সাইন আউট","Recently Added":"সাম্প্রতিক যোগ","Trending":"ট্রেন্ডিং","Recently Viewed":"সম্প্রতি দেখা",
 "Movie Request":"মুভি রিকোয়েস্ট","My Points":"আমার পয়েন্ট",Referral:"রেফার","How To Earn":"কীভাবে আয় করবেন",
 Unlock:"আনলক","Use My Points":"পয়েন্ট দিয়ে আনলক","Watch Ad":"এড দেখুন",Download:"ডাউনলোড",Server:"সার্ভার",
 Overview:"ওভারভিউ",Rating:"রেটিং",Genre:"জেনার",Year:"বছর","Please Wait...":"অপেক্ষা করুন...","Save":"সেভ",
 Cancel:"বাতিল","Back":"পিছনে","Add Movie":"মুভি যোগ করুন","Edit":"এডিট","Delete":"ডিলিট","Import from TMDB":"TMDB থেকে নিন",
 "Search title...":"মুভির নাম খুঁজুন...","Total Users":"মোট ইউজার","Points Issued":"দেওয়া পয়েন্ট",
 "Pending Payments":"অপেক্ষমাণ পেমেন্ট","Platform activity":"প্ল্যাটফর্ম অ্যাক্টিভিটি","Quick controls":"দ্রুত কন্ট্রোল",
 "System status":"সিস্টেম স্ট্যাটাস","Movie service":"মুভি সার্ভিস","ONLINE":"অনলাইন","ACTIVE":"সক্রিয়",
 "Add movie":"মুভি যোগ করুন","Publish new title":"নতুন মুভি প্রকাশ","Payments":"পেমেন্ট","Review purchases":"পেমেন্ট দেখুন",
 "Ad settings":"এড সেটিংস","Rewards & limits":"রিওয়ার্ড ও লিমিট","Points":"পয়েন্ট","Unlock pricing":"আনলক মূল্য",
 "Movie":"মুভি","Published":"প্রকাশিত","Draft":"ড্রাফট","Manage":"ম্যানেজ","Export CSV":"CSV এক্সপোর্ট",
 "Bulk action":"বাল্ক অ্যাকশন","Active":"সক্রিয়","Blocked":"ব্লকড","Pending":"অপেক্ষমাণ","Approve":"অনুমোদন",
 "Join Telegram channel":"টেলিগ্রাম চ্যানেলে যোগ দিন","Refer a friend":"বন্ধুকে রেফার করুন","Daily login":"ডেইলি লগইন",
 "Rewarded ad":"রিওয়ার্ডেড এড","Adult ads":"অ্যাডাল্ট এড","Home banner":"হোম ব্যানার","Rewarded unlock":"রিওয়ার্ডেড আনলক",
 "Enable adult section":"অ্যাডাল্ট সেকশন চালু করুন","18+ confirmation":"১৮+ নিশ্চিতকরণ","REQUIRED":"প্রয়োজনীয়",
 "Broadcast center":"ব্রডকাস্ট সেন্টার","App settings":"অ্যাপ সেটিংস","Security":"সিকিউরিটি",
 "Maintenance mode":"মেইনটেন্যান্স মোড","New registrations":"নতুন রেজিস্ট্রেশন","Default language":"ডিফল্ট ভাষা"}
 };
 function get(){const v=localStorage.getItem(KEY);return SUPPORTED.includes(v)?v:DEFAULT}
 function set(v){if(!SUPPORTED.includes(v))return;localStorage.setItem(KEY,v);document.documentElement.lang=v;window.dispatchEvent(new Event("cinehub4:language"))}
 function t(k){return D[get()][k]||D.en[k]||k}
 function translateDOM(){
   const root=document.body;if(!root)return;
   const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
   const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
   nodes.forEach(n=>{if(n.parentElement&&["SCRIPT","STYLE"].includes(n.parentElement.tagName))return;
     const raw=n.nodeValue, trimmed=raw.trim(); if(!trimmed)return;
     if(D.en[trimmed]&&get()==="bn") n.nodeValue=raw.replace(trimmed,D.bn[trimmed]);
     else if(get()==="en"){for(const k in D.en){if(D.bn[k]&&trimmed===D.bn[k])n.nodeValue=raw.replace(trimmed,k)}}
   });
   document.querySelectorAll("input[placeholder]").forEach(e=>{const p=e.getAttribute("placeholder");if(D.en[p])e.placeholder=t(p)});
 }
 window.addEventListener("cinehub4:language",()=>setTimeout(translateDOM,0));
 document.addEventListener("DOMContentLoaded",()=>{document.documentElement.lang=get();setTimeout(translateDOM,0)});
 return {get,set,t,translateDOM,SUPPORTED,DEFAULT};
})();
