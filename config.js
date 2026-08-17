/* Cine Hub4 frontend configuration.
   NOTE: Firebase Web config/API key is not a password. Never put TMDB secret keys,
   BotFather token, Firebase Admin SDK JSON, or service-account private keys here. */
window.APP_CONFIG={
  appName:"Cine Hub4",
  botUsername:"@Cinehub4bot",
  adminDemoId:"8895442085",
  adminIds:["8895442085"],
  unlockHours:15,
  unlockCost:5,
  adReward:2,
  dailyAdLimit:20,
  telegramBotLink:"https://t.me/Cinehub4bot",
  telegramChannelLink:"",
  howToEarnVideo:"",
  firebase:{apiKey:"",authDomain:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:""}
};


// Language defaults
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "bn"];
