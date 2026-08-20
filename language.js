/* Cine Hub4 bilingual UI — English / বাংলা
   Movie titles & admin-entered content are NEVER translated.
   Admin can override any string via settings.uiTexts { en:{}, bn:{} }.
*/
window.CINEHUB4_LANG = (() => {
  const KEY = "cinehub4_language";
  const SUPPORTED = ["en", "bn"];
  const DEFAULT = "en";

  // Complete default dictionary (English key → Bengali)
  const DICT = {
    // Nav & common
    "Movies": "মুভি",
    "Series": "সিরিজ",
    "Search": "সার্চ",
    "Adult": "অ্যাডাল্ট",
    "18+": "১৮+",
    "Profile": "প্রোফাইল",
    "User": "ইউজার",
    "Home": "হোম",
    "Telegram": "টেলিগ্রাম",
    "Language": "ভাষা",
    "Settings": "সেটিংস",
    "Back": "পিছনে",
    "Cancel": "বাতিল",
    "Save": "সেভ",
    "Open": "খুলুন",
    "Close": "বন্ধ",
    "Share": "শেয়ার",
    "Copy": "কপি",
    "Delete": "ডিলিট",
    "Edit": "এডিট",
    "Start": "স্টার্ট",
    "Watch": "দেখুন",
    "Buy": "কিনুন",
    "Earn": "আয় করুন",
    "Join": "যোগ দিন",
    "Submit": "জমা দিন",
    "Yes": "হ্যাঁ",
    "No": "না",
    "Stay here": "এখানে থাকুন",
    "Leave": "বের হোন",
    "Do you want to leave?": "আপনি কি বের হতে চান?",

    // Home / library
    "New Movies": "নতুন মুভি",
    "LATEST UPLOADS": "লেটেস্ট আপলোড",
    "Trending": "ট্রেন্ডিং",
    "MOST WATCHED": "সবচেয়ে বেশি দেখা",
    "MOVIE ZONE": "মুভি জোন",
    "Cinema Library": "সিনেমা লাইব্রেরি",
    "Curated movies, web series and premium entertainment updates.": "নির্বাচিত মুভি, ওয়েব সিরিজ ও প্রিমিয়াম আপডেট।",
    "▶ How to Watch": "▶ কীভাবে দেখবেন",
    "How to Watch": "কীভাবে দেখবেন",
    "Trending Movies": "ট্রেন্ডিং মুভি",
    "No movies found.": "কোনো মুভি পাওয়া যায়নি।",
    "No movies found": "কোনো মুভি পাওয়া যায়নি",
    "Results": "রেজাল্ট",
    "Search movies...": "মুভি সার্চ করুন...",
    "Voice search": "ভয়েস সার্চ",
    "Listening...": "শুনছি...",
    "Voice search not supported": "ভয়েস সার্চ সাপোর্ট করে না",
    "Voice failed": "ভয়েস ব্যর্থ",
    "Voice error": "ভয়েস এরর",

    // Series
    "Complete series": "সম্পূর্ণ সিরিজ",
    "Series not added yet.": "এখনও কোনো সিরিজ যোগ করা হয়নি।",
    "Series যোগ করা হয়নি।": "Series যোগ করা হয়নি।",

    // Adult
    "ADULT ZONE": "অ্যাডাল্ট জোন",
    "Adult Library": "অ্যাডাল্ট লাইব্রেরি",
    "Adult Access": "অ্যাডাল্ট অ্যাক্সেস",
    "Adult Access Confirmation": "অ্যাডাল্ট অ্যাক্সেস নিশ্চিতকরণ",
    "This section is reserved for mature viewers. Please confirm that you are 18 or older before entering the Adult Zone.": "এই বিভাগ প্রাপ্তবয়স্কদের জন্য। অ্যাডাল্ট জোনে প্রবেশের আগে নিশ্চিত করুন আপনার বয়স ১৮ বা তার বেশি।",
    "This section contains adult content. Please confirm your age before entering.": "এই বিভাগে প্রাপ্তবয়স্ক কনটেন্ট রয়েছে। প্রবেশের আগে বয়স নিশ্চিত করুন।",
    "✓ I confirm that I am 18 or older": "✓ আমি নিশ্চিত করছি আমার বয়স ১৮ বা তার বেশি",
    "🔒 Your choice is remembered for this session only": "🔒 আপনার পছন্দ শুধু এই সেশনের জন্য মনে রাখা হবে",
    "Yes, Enter": "হ্যাঁ, প্রবেশ করুন",
    "No, Watch Movie": "না, মুভি দেখুন",
    "I am 18+": "আমি ১৮+",
    "Go Back": "ফিরে যান",
    "No adult content yet. Add from Admin Panel.": "এখনও অ্যাডাল্ট কনটেন্ট নেই। অ্যাডমিন প্যানেল থেকে যোগ করুন।",
    "Curated 18+ content and premium entertainment updates.": "নির্বাচিত ১৮+ কনটেন্ট ও প্রিমিয়াম আপডেট।",

    // Profile
    "Verified User": "ভেরিফায়েড ইউজার",
    "Verified": "ভেরিফায়েড",
    "OVERVIEW": "ওভারভিউ",
    "My Points": "আমার পয়েন্ট",
    "Total Referrals": "মোট রেফারেল",
    "REFERRAL SYSTEM": "রেফারেল সিস্টেম",
    "Per Referral Reward": "প্রতি রেফারেল রিওয়ার্ড",
    "Join Bonus": "জয়েন বোনাস",
    "Referral Code": "রেফারেল কোড",
    "Your Referral Link": "আপনার রেফারেল লিংক",
    "Copy Link": "লিংক কপি",
    "Share Link": "লিংক শেয়ার",
    "Watch Tutorial": "টিউটোরিয়াল দেখুন",
    "Point Center": "পয়েন্ট সেন্টার",
    "Daily Tasks": "ডেইলি টাস্ক",
    "More Point Earning": "আরও পয়েন্ট আয়",
    "Watch Ad Now": "এখন এড দেখুন",
    "MORE EARNING BUTTONS": "আরও আয় বাটন",
    "EARNING SETTINGS": "আয় সেটিংস",
    "Current Balance": "বর্তমান ব্যালেন্স",
    "Points Per Ad": "প্রতি এডে পয়েন্ট",
    "Ads Watched": "এড দেখা",
    "Daily Limit": "ডেইলি লিমিট",
    "Done": "সম্পন্ন",
    "Buy Points": "পয়েন্ট কিনুন",
    "Admin Panel": "এডমিন প্যানেল",
    "A文 Language": "A文 ভাষা",
    "বাংলা": "বাংলা",
    "English": "English",

    // Points & tasks
    "points": "পয়েন্ট",
    "Points": "পয়েন্ট",
    "Watch Ad & Earn": "এড দেখে আয় করুন",
    "Daily Ad Limit": "ডেইলি এড লিমিট",
    "Only for earning points": "শুধু পয়েন্ট আয়ের জন্য",
    "Movie unlock is not limited by the daily ad limit.": "মুভি আনলক করার সময় ডেইলি এড লিমিট প্রযোজ্য নয়।",
    "EARN & UNLOCK": "আয় ও আনলক",
    "Current Balance": "বর্তমান ব্যালেন্স",
    "Points Per Ad": "প্রতি এডে পয়েন্ট",
    "Ads Watched": "এড দেখা হয়েছে",
    "Daily Limit": "ডেইলি লিমিট",
    "EARNING SETTINGS": "আয় সেটিংস",
    "Reward Per Ad": "প্রতি এডে রিওয়ার্ড",
    "Maximum Daily Ads": "সর্বোচ্চ ডেইলি এড",
    "Remaining Today": "আজ বাকি",
    "completed today": "আজ সম্পন্ন",
    "Completed": "সম্পন্ন",
    "One-time task": "ওয়ান-টাইম টাস্ক",
    "Watch Ad Now": "এখন এড দেখুন",
    "MORE EARNING BUTTONS": "আরও আয় বাটন",
    "Reward": "রিওয়ার্ড",
    "Daily limit": "ডেইলি লিমিট",
    "How to earn points": "কীভাবে পয়েন্ট আয় করবেন",
    "Watch rewarded ad": "রিওয়ার্ডেড এড দেখুন",
    "Join Telegram channel": "টেলিগ্রাম চ্যানেলে যোগ দিন",
    "Refer a friend": "বন্ধুকে রেফার করুন",
    "Daily login": "ডেইলি লগইন",
    "one click": "ওয়ান ক্লিক",
    "one click ads": "ওয়ান ক্লিক এডস",
    "Watch Video": "ভিডিও দেখুন",
    "Watch Ads & Earn Points": "এড দেখে পয়েন্ট আয়",
    "Complete ads and premium earning tasks to unlock exclusive videos instantly.": "এড ও প্রিমিয়াম টাস্ক সম্পন্ন করে এক্সক্লুসিভ ভিডিও আনলক করুন।",
    "Instant Reward": "তাত্ক্ষণিক রিওয়ার্ড",
    "Unlock Videos": "ভিডিও আনলক",
    "Daily task": "ডেইলি টাস্ক",
    "Leaving will close the mini app.": "বের হলে মিনি অ্যাপ বন্ধ হয়ে যাবে।",
    "Keep this page open until countdown ends.": "কাউন্টডাউন শেষ না হওয়া পর্যন্ত পেজ খোলা রাখুন।",
    "Opening Ad": "এড খুলছে",
    "Please wait while ad is loading.": "এড লোড হওয়ার জন্য অপেক্ষা করুন।",
    "Already completed today": "আজ ইতিমধ্যে সম্পন্ন",
    "Already claimed today": "আজ ইতিমধ্যে নেওয়া হয়েছে",
    "More Watching": "আরও দেখুন",


    "UNLOCKED": "আনলকড",
    "Available for": "সময় বাকি",
    "Watch or download from any server below.": "নিচের যেকোনো সার্ভার থেকে দেখুন বা ডাউনলোড করুন।",
    "Demo / Preview": "ডেমো / প্রিভিউ",
    "Download Servers": "ডাউনলোড সার্ভার",
    "Server": "সার্ভার",
    "Download / Watch": "ডাউনলোড / দেখুন",
    "Ads needed": "এড প্রয়োজন",
    "Unlock duration": "আনলক সময়কাল",
    "Not enough points": "পর্যাপ্ত পয়েন্ট নেই",
    "needed": "প্রয়োজন",
    "Unlock required": "আগে আনলক করুন",
    "Demo video — replace URL from Admin when ready.": "ডেমো ভিডিও — অ্যাডমিন থেকে URL বসান।",
    "ad progress": "এড প্রোগ্রেস",
    "Set banner in Admin → Ads": "অ্যাডমিন → Ads থেকে ব্যানার সেট করুন",
    "Banner ad": "ব্যানার এড",
    "points added": "পয়েন্ট যোগ হয়েছে",
    "Ad closed": "এড বন্ধ",
    "Ad completed": "এড সম্পন্ন",
    "Adsgram loading… try again": "Adsgram লোড হচ্ছে… আবার চেষ্টা করুন",
    "Set Adsgram Block ID in Admin → Ads": "অ্যাডমিন → Ads এ Adsgram Block ID দিন",

    // Buy points
    "Buy Points with USDT": "USDT দিয়ে পয়েন্ট কিনুন",
    "Select Package": "প্যাকেজ বেছে নিন",
    "Custom Amount": "কাস্টম অ্যামাউন্ট",
    "Enter points amount": "পয়েন্টের পরিমাণ লিখুন",
    "Example: 1000": "উদাহরণ: ১০০০",
    "Wallet Address": "ওয়ালেট অ্যাড্রেস",
    "Network": "নেটওয়ার্ক",
    "Address copied": "অ্যাড্রেস কপি হয়েছে",
    "Transaction ID / TxID": "ট্রানজেকশন আইডি / TxID",
    "Upload Payment Proof": "পেমেন্ট প্রুফ আপলোড",
    "Submit Payment Request": "পেমেন্ট রিকোয়েস্ট জমা দিন",
    "Payment request submitted": "পেমেন্ট রিকোয়েস্ট জমা হয়েছে",
    "SMART CHOICE": "স্মার্ট চয়েস",
    "STARTER": "স্টার্টার",
    "BEST VALUE": "বেস্ট ভ্যালু",
    "POPULAR": "পপুলার",
    "Basic Package": "বেসিক প্যাকেজ",
    "Standard Package": "স্ট্যান্ডার্ড প্যাকেজ",
    "Premium Package": "প্রিমিয়াম প্যাকেজ",
    "Ultimate Package": "আলটিমেট প্যাকেজ",

    // Movie detail / unlock
    "Movie": "মুভি",
    "UNLOCK NOTICE": "আনলক নোটিশ",
    "MOVIE CONTENT": "মুভি কনটেন্ট",
    "Unlock this content using ads or points.": "এড বা পয়েন্ট দিয়ে এই কনটেন্ট আনলক করুন।",
    "Unlock this content using ads or points. Share with friends to earn more.": "এড বা পয়েন্ট দিয়ে আনলক করুন। বন্ধুদের সাথে শেয়ার করে আরও আয় করুন।",
    "Need": "প্রয়োজন",
    "Remaining": "বাকি",
    "Progress": "প্রোগ্রেস",
    "Unlock with points or ads.": "পয়েন্ট বা এড দিয়ে আনলক করুন।",
    "Unlock Video": "ভিডিও আনলক",
    "Use My Points": "আমার পয়েন্ট ব্যবহার করুন",
    "More Movies": "আরও মুভি",
    "No points available": "পয়েন্ট নেই",
    "Already unlocked": "ইতিমধ্যে আনলক",
    "1 point used": "১ পয়েন্ট ব্যবহার হয়েছে",
    "Unlocked for": "আনলক হয়েছে",
    "hours": "ঘণ্টা",
    "পয়েন্ট যথেষ্ট নেই": "পয়েন্ট যথেষ্ট নেই",
    "Daily ad limit reached": "ডেইলি এড লিমিট শেষ",
    "Admin has not configured this Ad Block ID": "অ্যাডমিন এড ব্লক আইডি সেট করেনি",
    "Demo rewarded advertisement": "ডেমো রিওয়ার্ডেড বিজ্ঞাপন",
    "Complete Ad": "এড সম্পন্ন করুন",
    "Complete Demo Ad": "ডেমো এড সম্পন্ন করুন",
    "Ad · 18+": "এড · ১৮+",
    "How to Watch link not set": "হাউ টু ওয়াচ লিংক সেট নেই",
    "Share link ready": "শেয়ার লিংক রেডি",
    "Link copied": "লিংক কপি হয়েছে",

    // Drawer
    "Movie Mini App": "মুভি মিনি অ্যাপ",
    "Premium movie library • fast access • smart unlock": "প্রিমিয়াম মুভি লাইব্রেরি • দ্রুত অ্যাক্সেস • স্মার্ট আনলক",
    "ভাষা পরিবর্তন": "ভাষা পরিবর্তন",

    // Misc toasts
    "Task completed": "টাস্ক সম্পন্ন",
    "Points added": "পয়েন্ট যোগ হয়েছে",
    "Already claimed today": "আজ ইতিমধ্যে নেওয়া হয়েছে",

    // Categories (defaults + common)
    "All Movies": "সব মুভি",
    "Bangla Moves": "বাংলা মুভি",
    "Bangla Movies": "বাংলা মুভি",
    "Hollywood Movie Hindi": "হলিউড মুভি হিন্দি",
    "Hollywood": "হলিউড",
    "Bollywood": "বলিউড",
    "All": "সব",
    "Adult Movie": "অ্যাডাল্ট মুভি",
    "Anime": "অ্যানিমে",
    "Web Series": "ওয়েব সিরিজ",
    "Dual Audio": "ডুয়াল অডিও",
    "South Indian": "সাউথ ইন্ডিয়ান",
    "Korean": "কোরিয়ান",
    "Chinese": "চাইনিজ",
    "Turkish": "তুর্কি",
    "English": "ইংরেজি",

    // Profile / earning extras
    "HOW IT WORKS": "কীভাবে কাজ করে",
    "When friend joins": "বন্ধু জয়েন করলে",
    "Points Added": "পয়েন্ট যোগ হয়",
    "More Earning": "আরও আয়",
    "Watch ads & earn": "এড দেখে আয় করুন",
    "Watch Tutorial": "টিউটোরিয়াল দেখুন",
    "MORE POINT EARNING": "আরও পয়েন্ট আয়",
    "Watch Ads & Earn Points": "এড দেখে পয়েন্ট আয় করুন",
    "Complete ads to get rewards and unlock videos with points.": "রিওয়ার্ড পেতে এড সম্পন্ন করুন এবং পয়েন্ট দিয়ে ভিডিও আনলক করুন।",
    "Instant Reward": "ইনস্ট্যান্ট রিওয়ার্ড",
    "More Points": "আরও পয়েন্ট",
    "Unlock Videos": "ভিডিও আনলক",
    "More Point Earning": "আরও পয়েন্ট আয়",
    "Referral link copied!": "রেফারেল লিংক কপি হয়েছে!",
    "Points": "পয়েন্ট",
    "points": "পয়েন্ট",
    "Watch Ad & Earn": "এড দেখে আয় করুন",
    "Buy Points": "পয়েন্ট কিনুন",
    "Refer & Earn": "রেফার করে আয় করুন",
    "Daily Ad Limit": "ডেইলি এড লিমিট",
    "Only for earning points": "শুধু পয়েন্ট আয়ের জন্য",
    "day": "দিন",
    "Movie unlock is not limited by the daily ad limit.": "মুভি আনলক ডেইলি এড লিমিট দ্বারা সীমাবদ্ধ নয়।",
    "TOP 1": "টপ ১",

    // Ticker defaults
    "Share your favorite content and unlock with points 🚀 • New movies and series added regularly • Watch ads or use points to unlock • ": "পছন্দের কনটেন্ট শেয়ার করুন ও পয়েন্ট দিয়ে আনলক করুন 🚀 • নিয়মিত নতুন মুভি ও সিরিজ • এড বা পয়েন্ট দিয়ে আনলক • ",
    "18+ Adult Zone • New adult content added regularly • Watch ads or use points to unlock • ": "১৮+ অ্যাডাল্ট জোন • নিয়মিত নতুন অ্যাডাল্ট কনটেন্ট • এড বা পয়েন্ট দিয়ে আনলক • ",


    "Confirm Purchase": "কেনাকাটা নিশ্চিত করুন",
    "Package": "প্যাকেজ",
    "Pay Amount": "পেমেন্ট অ্যামাউন্ট",
    "You Get": "আপনি পাবেন",
    "Confirm": "কনফার্ম",
    "Purchase Custom Coins": "কাস্টম কয়েন কিনুন",
    "PAYMENT STEP": "পেমেন্ট স্টেপ",
    "PAY AMOUNT": "পে অ্যামাউন্ট",
    "YOU GET": "আপনি পাবেন",
    "Select Wallet": "ওয়ালেট সিলেক্ট করুন",
    "After confirmation, select a wallet address, send the exact USDT amount, then submit TxID and screenshot for admin approval.": "কনফার্মের পর ওয়ালেট অ্যাড্রেস সিলেক্ট করুন, সঠিক USDT পাঠান, তারপর TxID ও স্ক্রিনশট জমা দিন অ্যাডমিন অ্যাপ্রুভালের জন্য।",
    "Complete ads and premium earning tasks to unlock exclusive videos instantly.": "এক্সক্লুসিভ ভিডিও আনলক করতে এড ও প্রিমিয়াম আয়ের টাস্ক সম্পন্ন করুন।",
    "Daily Limit": "ডেইলি লিমিট",
    "Current Balance": "বর্তমান ব্যালেন্স",
    "Points Per Ad": "প্রতি এডে পয়েন্ট",
    "Ads Watched": "এড দেখা হয়েছে",
    "EARNING SETTINGS": "আয়ের সেটিংস",
    "Reward Per Ad": "প্রতি এডে রিওয়ার্ড",
    "Maximum Daily Ads": "সর্বোচ্চ ডেইলি এড",
    "Remaining Today": "আজ বাকি",
    "completed today": "আজ সম্পন্ন",
    "Watch Ad Now": "এখনই এড দেখুন",
    "MORE EARNING BUTTONS": "আরও আয়ের বাটন",
    "Reward": "রিওয়ার্ড",
    "Completed": "সম্পন্ন",
    "Done": "ডান",
    "One-time task": "ওয়ান-টাইম টাস্ক",
    "Daily task": "ডেইলি টাস্ক",
    "one click": "ওয়ান ক্লিক",
    "Watch rewarded ad": "রিওয়ার্ডেড এড দেখুন",
    "Join Telegram channel": "টেলিগ্রাম চ্যানেলে যোগ দিন",
    "Refer a friend": "বন্ধু রেফার করুন",
    "Daily login": "ডেইলি লগইন",

    "Loading...": "লোড হচ্ছে...",
  };

  const BN_TO_EN = Object.fromEntries(Object.entries(DICT).map(([e, b]) => [b, e]));

  function getOverrides() {
    try {
      const s = JSON.parse(localStorage.getItem("cinehub4_settings") || "{}");
      const ui = s.uiTexts || { en: {}, bn: {} };
      // Admin-defined category translations: { "All Movies": {en:"All Movies", bn:"সব মুভি"}, ... }
      // or flat: categoryLabelsBn: { "All Movies": "সব মুভি" }
      const catBn = s.categoryLabelsBn || s.categoryTranslations || {};
      const catEn = s.categoryLabelsEn || {};
      ui.bn = Object.assign({}, ui.bn || {}, catBn);
      ui.en = Object.assign({}, ui.en || {}, catEn);
      return ui;
    } catch (e) {
      return { en: {}, bn: {} };
    }
  }

  function get() {
    const v = localStorage.getItem(KEY);
    return SUPPORTED.includes(v) ? v : DEFAULT;
  }

  function set(v) {
    if (!SUPPORTED.includes(v)) return;
    localStorage.setItem(KEY, v);
    document.documentElement.lang = v;
    window.dispatchEvent(new Event("cinehub4:language"));
  }

  /** Translate a UI string. Movie titles must NOT be passed here. */
  function t(key) {
    if (key == null || key === "") return key;
    const lang = get();
    const ov = getOverrides();
    if (lang === "bn") {
      if (ov.bn && ov.bn[key]) return ov.bn[key];
      if (DICT[key]) return DICT[key];
      return key;
    }
    // English
    if (ov.en && ov.en[key]) return ov.en[key];
    // if key was Bengali, map back
    if (BN_TO_EN[key]) return (ov.en && ov.en[BN_TO_EN[key]]) || BN_TO_EN[key];
    return key;
  }

  function translateDOM() {
    const bn = get() === "bn";
    const ov = getOverrides();
    const map = bn
      ? { ...DICT, ...(ov.bn || {}) }
      : Object.fromEntries(
          Object.keys(DICT).map((k) => [DICT[k], (ov.en && ov.en[k]) || k])
        );

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const el = n.parentElement;
      if (!el || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(el.tagName)) return;
      // never touch movie titles / poster fallbacks
      if (el.closest && (el.closest(".unlock-title") || el.closest(".pt") || el.closest("[data-no-i18n]"))) return;
      const raw = n.nodeValue;
      const trim = raw.trim();
      if (!trim) return;
      const out = map[trim];
      if (out && out !== trim) n.nodeValue = raw.replace(trim, out);
    });

    document.querySelectorAll("[placeholder]").forEach((e) => {
      const p = e.getAttribute("placeholder");
      const out = bn ? (ov.bn && ov.bn[p]) || DICT[p] : (ov.en && ov.en[p]) || BN_TO_EN[p] || p;
      if (out) e.placeholder = out;
    });

    document.querySelectorAll("[data-i18n]").forEach((e) => {
      const k = e.getAttribute("data-i18n");
      e.textContent = t(k);
    });

    // bottom nav labels
    document.querySelectorAll(".nav-item .nav-lbl").forEach((el) => {
      const page = el.closest(".nav-item")?.dataset?.page;
      const mapNav = { movies: "Movies", series: "Series", search: "Search", adult: "18+", profile: "Profile" };
      if (page && mapNav[page]) el.textContent = t(mapNav[page]);
    });
  }

  window.addEventListener("cinehub4:language", () => {
    try { translateDOM(); } catch (e) {}
    // Skip full re-render if app already did it (prevents double paint / jump)
    if (window.__cinehub_langSwitching) return;
    if (typeof window.__cinehub_rerender === "function") {
      try { window.__cinehub_rerender(); } catch (e) {}
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.lang = get();
    setTimeout(translateDOM, 0);
  });

  return { get, set, t, translateDOM, SUPPORTED, DEFAULT, DICT };
})();
