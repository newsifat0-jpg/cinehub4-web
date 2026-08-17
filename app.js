(() => {
  const C = window.CINEHUB4_CONFIG;
  const s = document.getElementById("screen");

  // st.history keeps the stack of previously visited pages so "back"
  // always returns to whatever page you actually came from.
  const st = { p: "home", lang: C.language, points: 0, movies: [], history: [] };

  const T = (bn, en) => (st.lang === "bn" ? bn : en);
  const esc = (x) =>
    String(x ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[c]));

  // ---- navigation ----
  function go(p) {
    if (p !== st.p) st.history.push(st.p);
    st.p = p;
    closeMenu();
    render();
  }
  function goBack() {
    const prev = st.history.pop();
    st.p = prev !== undefined ? prev : "home";
    closeMenu();
    render();
  }

  function render() {
    document.getElementById("back").style.visibility = st.history.length ? "visible" : "hidden";
    ({ home, movies, search, points, profile, admin }[st.p] || home)();
  }

  // ---- top-left 3-dot menu (holds what used to be the home grid) ----
  const menuItems = [
    { p: "search",  ic: "🔎", bn: "মুভি সার্চ", en: "Search" },
    { p: "movies",  ic: "🔥", bn: "ট্রেন্ডিং",   en: "Trending" },
    { p: "points",  ic: "⭐", bn: "পয়েন্ট",      en: "Points" },
    { p: "profile", ic: "👤", bn: "প্রোফাইল",    en: "Profile" }
  ];
  function renderMenu() {
    document.getElementById("menuPanel").innerHTML = menuItems
      .map(i => `<button onclick="go('${i.p}')">${i.ic} ${T(i.bn, i.en)}</button>`)
      .join("");
  }
  function toggleMenu() {
    renderMenu();
    document.getElementById("menuPanel").classList.toggle("show");
  }
  function closeMenu() {
    document.getElementById("menuPanel").classList.remove("show");
  }
  // close the menu if the user taps anywhere else
  document.addEventListener("click", (e) => {
    const panel = document.getElementById("menuPanel");
    const btn = document.getElementById("menu");
    if (panel.classList.contains("show") && !panel.contains(e.target) && e.target !== btn) {
      closeMenu();
    }
  });

  // ---- pages ----
  function home() {
    s.innerHTML = `
      <section class="hero">
        <h1>🎬 ${C.botName}</h1>
        <p>${T("আপনার মুভি জগতের সহজ ঠিকানা", "Your movie world in one place")}</p>
        <button class="btn" onclick="go('movies')">🎬 ${T("মুভি দেখুন", "Browse Movies")}</button>
        <button class="btn btn2" onclick="go('points')">⭐ ${st.points}</button>
      </section>
      <div class="notice">🔓 ${T(
        "ডিফল্ট unlock: ১৫ ঘণ্টা। Admin Panel থেকে cost/time পরিবর্তন করা যাবে।",
        "Default unlock: 15 hours. Admin can change cost/time."
      )}</div>`;
  }

  function movies() {
    let a = st.movies.length ? st.movies : [{
      title: "Cine Hub4 Demo Movie", year: "2026", rating: "8.0",
      overview: T("Backend যুক্ত হলে আপনার Firestore-এর আসল movie আসবে।",
                  "Your Firestore movies appear after backend connection.")
    }];
    s.innerHTML = `<h2>🎬 ${T("Movies", "Movies")}</h2>` + a.map((m, i) => `
      <div class="movie">
        <div class="poster">${m.poster ? `<img class="poster" src="${esc(m.poster)}">` : "🎞️"}</div>
        <div class="info">
          <h3>${esc(m.title)}</h3>
          <p class="muted">${esc(m.year)} • ⭐ ${esc(m.rating)}</p>
          <p class="muted">${esc(m.overview)}</p>
          <button class="btn" onclick="unlock(${i})">🔓 Unlock</button>
        </div>
      </div>`).join("");
  }

  function search() {
    s.innerHTML = `
      <h2>🔎 ${T("মুভি সার্চ", "Search Movie")}</h2>
      <input id="q" class="input" placeholder="${T("মুভির নাম লিখুন", "Enter movie name")}">
      <button class="btn" onclick="doSearch()">Search</button>
      <div id="r"></div>`;
  }
  function doSearch() {
    let q = document.getElementById("q").value.trim();
    document.getElementById("r").innerHTML = q
      ? `<div class="notice">🔎 ${T("TMDB/Firestore backend সংযোগ করলে", "After TMDB/Firestore backend connection")} <b>${esc(q)}</b> ${T("এর ফলাফল আসবে।", "results will appear here.")}</div>`
      : "";
  }

  function points() {
    s.innerHTML = `
      <section class="hero"><h2>⭐ ${T("আমার পয়েন্ট", "My Points")}</h2><h1>${st.points}</h1></section>
      <div class="grid">
        <div class="card">📺<h3>Daily Ads</h3><button class="btn" onclick="watchAd()">Watch Ad</button></div>
        <div class="card">🎯<h3>Tasks</h3><p class="muted">Earn points</p></div>
        <div class="card">👥<h3>Referral</h3><button class="btn btn2" onclick="alert('Backend referral system will generate your link.')">Invite</button></div>
        <div class="card">💰<h3>Buy Points</h3><button class="btn btn2" onclick="buy()">Buy</button></div>
      </div>`;
  }

  function profile() {
    s.innerHTML = `
      <h2>👤 ${T("প্রোফাইল", "Profile")}</h2>
      <div class="card">
        <h3>${C.botName}</h3>
        <p>⭐ ${st.points} Points</p>
        <button class="btn" onclick="go('points')">Points Center</button>
      </div>
      <div class="card">
        <h3>🌐 ${T("ভাষা", "Language")}</h3>
        <button class="btn3" onclick="setLang('bn')" ${st.lang === "bn" ? 'style="background:#7180ff;"' : ""}>বাংলা</button>
        <button class="btn3" onclick="setLang('en')" ${st.lang === "en" ? 'style="background:#7180ff;"' : ""}>English</button>
      </div>
      <div class="card">
        <h3>👨‍💼 Admin</h3>
        <button class="btn btn2" onclick="go('admin')">Admin Panel</button>
      </div>`;
  }

  function admin() {
    let x = ["📊 Dashboard","🎬 Movies","➕ Add Movie","✏️ Edit/Delete","🔎 TMDB","⭐ Point Settings",
      "📺 Ads","🎯 Tasks","👥 Referral","💳 Payments","🖼️ Screenshots","🔞 Adult Movies","🔞 Adult Ads",
      "👤 Users","📩 Requests","📢 Broadcast","⚙️ Settings"];
    s.innerHTML = `
      <section class="hero">
        <h2>👨‍💼 ${C.botName} Admin</h2>
        <p>${T("সবকিছু এক জায়গা থেকে কন্ট্রোল", "Control everything from one place")}</p>
      </section>
      <div class="grid">${x.map(v => `<div class="card"><h3>${v}</h3><span class="muted">Secure backend required</span></div>`).join("")}</div>
      <div class="notice">🔐 Firebase private key এই HTML-এ রাখা হবে না। Admin verification backend-এ হবে।</div>`;
  }

  // ---- actions ----
  function unlock() {
    alert(`Unlock cost: ${C.unlock.defaultCostPoints} Points\nDuration: ${C.unlock.defaultHours} Hours\n\nFirestore/backend connection required.`);
  }
  function watchAd() {
    alert(`Adsgram Block ID ${C.adsgram.blockId} configured. Reward verification will be connected in backend.`);
  }
  function buy() {
    alert("Payment ID + screenshot form will be connected to the admin payment system.");
  }
  function setLang(l) {
    st.lang = l;
    render();
  }

  // ---- wire up static controls ----
  document.querySelectorAll("nav button").forEach(b => (b.onclick = () => go(b.dataset.p)));
  document.getElementById("profile").onclick = () => go("profile");
  document.getElementById("back").onclick = () => goBack();
  document.getElementById("menu").onclick = (e) => { e.stopPropagation(); toggleMenu(); };

  // expose the handlers used by inline onclick="" strings generated above
  window.go = go;
  window.unlock = unlock;
  window.watchAd = watchAd;
  window.buy = buy;
  window.doSearch = doSearch;
  window.setLang = setLang;

  render();
})();
