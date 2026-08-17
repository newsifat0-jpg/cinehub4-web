/* =========================================================
   CINE HUB4
   MINI APP CONFIGURATION
========================================================= */

const CINEHUB_CONFIG = {

    /* =====================================================
       BRAND
    ===================================================== */

    app: {
        name: "Cine Hub4",
        shortName: "C4",
        version: "2.0.0",
        description: "Movie • Download • Entertainment"
    },


    /* =====================================================
       TELEGRAM
    ===================================================== */

    telegram: {

        botUsername: "Cinehub4bot",

        botName: "Cine Hub4",

        channelId: "-1001538997244",

        channelUsername: "chinehub4"

    },


    /* =====================================================
       FIREBASE
       
       IMPORTANT:
       Do NOT put Firestore secret/API credentials here.
       Production authentication will be handled securely.
    ===================================================== */

    firebase: {

        projectId: "cinehub4-d1773",

        databaseName: "(default)"

    },


    /* =====================================================
       OWNER / ADMIN
    ===================================================== */

    admin: {

        ownerId: "5605543865",

        adminIds: [
            "5605543865",
            "7830499211",
            "1904834862"
        ],

        /*
         * DEMO ADMIN
         *
         * true = browser demo admin panel available
         *
         * Production:
         * false
         *
         * Real admin access must be verified
         * from the backend / Telegram identity.
         */

        demoMode: true,

        demoAdminId: "5605543865"

    },


    /* =====================================================
       LANGUAGE
    ===================================================== */

    language: {

        default: "bn",

        available: [
            "bn",
            "en"
        ]

    },


    /* =====================================================
       MOVIE SYSTEM
    ===================================================== */

    movies: {

        searchResultsPerPage: 10,

        moviesPerPage: 20,

        favouritePerPage: 10,

        recentlyViewedPerPage: 10,

        recentlyAddedPerPage: 10,

        trendingPerPage: 10,

        exactMatchFirst: true

    },


    /* =====================================================
       DOWNLOAD SERVERS
    ===================================================== */

    servers: {

        server1: {
            enabled: true,
            name: "Server 1"
        },

        server2: {
            enabled: true,
            name: "Server 2"
        },

        server3: {
            enabled: true,
            name: "Server 3"
        }

    },


    /* =====================================================
       MOVIE UNLOCK SYSTEM
    ===================================================== */

    unlock: {

        enabled: true,

        /*
         * Once unlocked, movie access remains available
         * for this many hours.
         */

        durationHours: 15,

        /*
         * User can unlock unlimited movies.
         *
         * Daily ad limit does NOT limit movie unlocks.
         */

        unlimitedMovieUnlock: true,

        pointsEnabled: true,

        adsEnabled: true

    },


    /* =====================================================
       POINT SYSTEM
    ===================================================== */

    points: {

        enabled: true,

        currencyName: "Points",

        currencyIcon: "★",

        /*
         * Default points required to unlock a movie.
         * Admin can change this from Admin Panel.
         */

        movieUnlockCost: 10,

        /*
         * Demo starting balance.
         */

        demoStartingBalance: 100,

        /*
         * Daily ad rewards.
         *
         * IMPORTANT:
         * This limit is ONLY for earning points from ads.
         *
         * It does NOT limit movie unlocks.
         */

        dailyAdLimit: 5,

        pointsPerAd: 5,

        /*
         * Referral system
         */

        referralEnabled: true,

        referralReward: 20,

        referredUserReward: 10,

        /*
         * Daily task system
         */

        dailyTasksEnabled: true,

        dailyTaskReward: 10

    },


    /* =====================================================
       AD SYSTEM
    ===================================================== */

    ads: {

        enabled: true,

        provider: "Adsgram",

        /*
         * Your Adsgram placement.
         */

        placementId: "43222",

        /*
         * Ads are used for earning points.
         *
         * Movie unlock:
         * User can use points OR watch an ad,
         * depending on Admin settings.
         */

        rewardAdsEnabled: true,

        unlockAdEnabled: true,

        /*
         * Daily limit applies ONLY to reward ads.
         */

        rewardDailyLimit: 5,

        /*
         * Admin can change these later.
         */

        rewardPointsPerAd: 5,

        unlockAdsRequired: 1

    },


    /* =====================================================
       ADULT MOVIES
    ===================================================== */

    adult: {

        enabled: true,

        /*
         * Adult section exists ONLY inside
         * the Mini App.
         *
         * It is NOT exposed through the Telegram bot.
         */

        webOnly: true,

        separateAds: true,

        separateCategory: true,

        ageConfirmationRequired: true

    },


    /* =====================================================
       HOME PAGE
    ===================================================== */

    home: {

        showHero: true,

        showRecentlyAdded: true,

        showTrending: true,

        showMovieSlider: true,

        showContinueWatching: true,

        showFavourite: true

    },


    /* =====================================================
       TRENDING
    ===================================================== */

    trending: {

        enabled: true,

        /*
         * Trending ranking can later be calculated
         * from Firestore statistics.
         */

        sortBy: "downloads",

        secondarySortBy: "views",

        tertiarySortBy: "recentClicks"

    },


    /* =====================================================
       RECENTLY ADDED
    ===================================================== */

    recentlyAdded: {

        enabled: true,

        sortBy: "createdAt",

        descending: true

    },


    /* =====================================================
       USER FEATURES
    ===================================================== */

    features: {

        profile: true,

        favourites: true,

        search: true,

        searchHistory: true,

        recentlyViewed: true,

        movieRequest: true,

        points: true,

        dailyTasks: true,

        referral: true,

        languageSwitch: true,

        settings: true,

        adult: true

    },


    /* =====================================================
       FORCE JOIN
    ===================================================== */

    forceJoin: {

        enabled: true,

        channelId: "-1001538997244",

        channelUsername: "chinehub4"

    },


    /* =====================================================
       BOT ↔ MINI APP
       
       Both systems are designed around the SAME
       Firestore collections.
    ===================================================== */

    collections: {

        config: "config",

        movies: "movies",

        users: "users",

        favourites: "favourites",

        requests: "requests",

        statistics: "statistics",

        languages: "languages",

        admins: "admins",

        logs: "logs",

        recentSearch: "recentSearch",

        recentViewed: "recentViewed",

        recentAdded: "recentAdded",

        trending: "trending",

        serverStatus: "serverStatus",

        broadcastHistory: "broadcastHistory",

        pointTransactions: "pointTransactions",

        referrals: "referrals",

        dailyTasks: "dailyTasks",

        adRewards: "adRewards",

        unlocks: "unlocks",

        adultMovies: "adultMovies",

        payments: "payments"

    },


    /* =====================================================
       MOVIE DATABASE STRUCTURE
       
       Both Bot and Mini App use the same movie document.
    ===================================================== */

    movieFields: {

        title: "title",

        originalTitle: "originalTitle",

        poster: "poster",

        backdrop: "backdrop",

        tmdbId: "tmdbId",

        year: "year",

        rating: "rating",

        genre: "genre",

        overview: "overview",

        language: "language",

        type: "type",

        server1: "server1",

        server2: "server2",

        server3: "server3",

        server1Enabled: "server1Enabled",

        server2Enabled: "server2Enabled",

        server3Enabled: "server3Enabled",

        downloads: "downloads",

        views: "views",

        clicks: "clicks",

        createdAt: "createdAt",

        updatedAt: "updatedAt",

        featured: "featured",

        trending: "trending",

        adult: "adult",

        active: "active"

    },


    /* =====================================================
       USER DATA
    ===================================================== */

    userFields: {

        telegramId: "telegramId",

        firstName: "firstName",

        lastName: "lastName",

        username: "username",

        photoUrl: "photoUrl",

        language: "language",

        points: "points",

        totalEarned: "totalEarned",

        totalSpent: "totalSpent",

        referralCode: "referralCode",

        referredBy: "referredBy",

        referralCount: "referralCount",

        favouriteCount: "favouriteCount",

        totalDownloads: "totalDownloads",

        totalViews: "totalViews",

        createdAt: "createdAt",

        lastSeen: "lastSeen"

    },


    /* =====================================================
       UNLOCK DATA
    ===================================================== */

    unlockFields: {

        telegramId: "telegramId",

        movieId: "movieId",

        unlockedAt: "unlockedAt",

        expiresAt: "expiresAt",

        method: "method",

        pointsSpent: "pointsSpent",

        adWatched: "adWatched"

    },


    /* =====================================================
       PAYMENT
    ===================================================== */

    payments: {

        enabled: true,

        paymentProofRequired: true,

        paymentIdRequired: true,

        imageProofAllowed: true,

        adminApprovalRequired: true

    },


    /* =====================================================
       ADMIN CONTROL
       
       These values will eventually come from:
       Firestore config/main
       
       This local config is only the initial fallback.
    ===================================================== */

    adminControls: {

        movieUnlockCost: true,

        rewardPointsPerAd: true,

        dailyAdLimit: true,

        referralReward: true,

        referredUserReward: true,

        dailyTaskReward: true,

        unlockDuration: true,

        server1: true,

        server2: true,

        server3: true,

        adsgramPlacement: true,

        adultSection: true,

        adultAds: true,

        forceJoin: true,

        maintenanceMode: true,

        trending: true,

        recentlyAdded: true

    },


    /* =====================================================
       DEFAULT SYSTEM SETTINGS
    ===================================================== */

    system: {

        maintenanceMode: false,

        autoDelete: true,

        searchHistoryEnabled: true,

        trendingEnabled: true,

        recentlyAddedEnabled: true,

        recentlyViewedEnabled: true,

        favouriteEnabled: true,

        broadcastEnabled: true

    }

};


/* =========================================================
   GLOBAL SHORTCUT
========================================================= */

window.CINEHUB_CONFIG = CINEHUB_CONFIG;


/* =========================================================
   DEMO MODE
========================================================= */

window.CINEHUB_DEMO = {

    enabled: CINEHUB_CONFIG.admin.demoMode,

    user: {

        telegramId: "demo_5605543865",

        firstName: "Sifat",

        lastName: "King",

        username: "CineHubUser",

        photoUrl: "",

        language: "bn",

        points: CINEHUB_CONFIG.points.demoStartingBalance,

        totalEarned: 350,

        totalSpent: 120,

        referralCode: "CINE5605",

        referredBy: "",

        referralCount: 7,

        favouriteCount: 4,

        totalDownloads: 38,

        totalViews: 96

    }

};


/* =========================================================
   DEMO MOVIES
========================================================= */

window.CINEHUB_DEMO_MOVIES = [

    {
        id: "demo_001",

        title: "Interstellar",

        originalTitle: "Interstellar",

        poster:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",

        tmdbId: "157336",

        year: "2014",

        rating: "8.7",

        genre: "Sci-Fi",

        overview:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",

        language: "English",

        type: "movie",

        server1:
            "https://example.com/server1",

        server2:
            "https://example.com/server2",

        server3:
            "https://example.com/server3",

        server1Enabled: true,

        server2Enabled: true,

        server3Enabled: true,

        downloads: 1250,

        views: 4830,

        clicks: 3210,

        createdAt: Date.now() - 86400000,

        updatedAt: Date.now(),

        featured: true,

        trending: true,

        adult: false,

        active: true

    },


    {
        id: "demo_002",

        title: "Inception",

        originalTitle: "Inception",

        poster:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",

        tmdbId: "27205",

        year: "2010",

        rating: "8.4",

        genre: "Action • Sci-Fi",

        overview:
            "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",

        language: "English",

        type: "movie",

        server1:
            "https://example.com/server1",

        server2:
            "https://example.com/server2",

        server3:
            "https://example.com/server3",

        server1Enabled: true,

        server2Enabled: true,

        server3Enabled: true,

        downloads: 980,

        views: 3900,

        clicks: 2840,

        createdAt: Date.now() - 172800000,

        updatedAt: Date.now(),

        featured: true,

        trending: true,

        adult: false,

        active: true

    },


    {
        id: "demo_003",

        title: "The Dark Knight",

        originalTitle: "The Dark Knight",

        poster:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/w1280/hkBaDkMWbLaf8B1lsWsKX7Ew3XK.jpg",

        tmdbId: "155",

        year: "2008",

        rating: "8.5",

        genre: "Action • Crime",

        overview:
            "Batman faces a criminal mastermind known as the Joker who throws Gotham into chaos.",

        language: "English",

        type: "movie",

        server1:
            "https://example.com/server1",

        server2:
            "https://example.com/server2",

        server3:
            "https://example.com/server3",

        server1Enabled: true,

        server2Enabled: true,

        server3Enabled: true,

        downloads: 1540,

        views: 6200,

        clicks: 4500,

        createdAt: Date.now() - 259200000,

        updatedAt: Date.now(),

        featured: false,

        trending: true,

        adult: false,

        active: true

    }

];


/* =========================================================
   LANGUAGE DATA
========================================================= */

window.CINEHUB_LANG = {

    bn: {

        home: "হোম",

        movies: "মুভি",

        search: "সার্চ",

        trending: "ট্রেন্ডিং",

        recent: "সম্প্রতি যোগ করা",

        favourite: "ফেভারিট",

        viewed: "সাম্প্রতিক দেখা",

        request: "মুভি রিকোয়েস্ট",

        points: "আমার পয়েন্ট",

        tasks: "ডেইলি টাস্ক",

        referral: "রেফার",

        adult: "Adult",

        profile: "প্রোফাইল",

        settings: "সেটিংস",

        admin: "এডমিন প্যানেল",

        unlock: "আনলক করুন",

        download: "ডাউনলোড",

        server1: "Server 1",

        server2: "Server 2",

        server3: "Server 3",

        myPoints: "আমার পয়েন্ট",

        watchAd: "এড দেখে পয়েন্ট নিন",

        verified: "Telegram Verified",

        recentAdded: "সাম্প্রতিক যোগ করা",

        trendingMovies: "ট্রেন্ডিং মুভি",

        searchMovie: "মুভি সার্চ করুন",

        noMovies: "কোনো মুভি পাওয়া যায়নি",

        pleaseWait: "অনুগ্রহ করে অপেক্ষা করুন..."

    },


    en: {

        home: "Home",

        movies: "Movies",

        search: "Search",

        trending: "Trending",

        recent: "Recently Added",

        favourite: "Favourite",

        viewed: "Recently Viewed",

        request: "Movie Request",

        points: "My Points",

        tasks: "Daily Tasks",

        referral: "Referral",

        adult: "Adult",

        profile: "Profile",

        settings: "Settings",

        admin: "Admin Panel",

        unlock: "Unlock",

        download: "Download",

        server1: "Server 1",

        server2: "Server 2",

        server3: "Server 3",

        myPoints: "My Points",

        watchAd: "Watch Ad & Earn",

        verified: "Telegram Verified",

        recentAdded: "Recently Added",

        trendingMovies: "Trending Movies",

        searchMovie: "Search movies",

        noMovies: "No movies found",

        pleaseWait: "Please wait..."

    }

};
