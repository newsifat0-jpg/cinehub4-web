# Cine Hub4 — User + Admin Mini App

## Files
- `index.html` — User Mini App
- `admin.html` — Admin Control Center (open directly at `/admin.html`)
- `app.js` — User UI/demo logic
- `admin.js` — Admin controls/demo logic
- `style.css` — User design
- `admin.css` — Admin design
- `config.js` — public frontend configuration only

## Admin controls included
- Movie add/edit/delete, poster, category, 3 server URLs, adult flag
- Category add/edit/delete
- Points, unlock cost, 15-hour duration, ad reward, daily ad limit
- All ad block IDs: rewarded, interstitial, banner, task, adult + extra blocks
- Telegram bot/channel links
- How To Earn video URL
- Daily tasks
- Payment review UI
- Adult library + separate adult ad block
- Requests, broadcast, users, settings

## Demo access
Open `admin.html` and enter the configured demo admin ID from `config.js`.
This is a frontend demo gate, not real security.

## IMPORTANT SECURITY
GitHub Pages is static hosting. Anything shipped to browser can be inspected. Never put these in HTML/JS:
- Telegram Bot token
- Firebase Admin SDK JSON/private key
- TMDB secret key
- service-account credentials

A Firebase Web API key is not a password, but Firestore Security Rules must enforce authorization. For real bot + web + admin synchronization, both clients should read/write the same Firestore collections under authenticated users/admin claims. The Telegram bot's privileged operations should be performed server-side (or through a trusted backend), not by exposing a bot token in the web app.

The current ZIP is a no-cost frontend/demo build. `localStorage` is used so the User App and Admin Panel on the same browser/origin can demonstrate settings and movie changes. It is NOT a shared cloud database yet.


## Admin access inside the Mini App
The user Mini App keeps the existing design. The left menu contains an **Admin Panel** button only when the Telegram WebApp user ID matches `adminIds` in `config.js`. Normal users do not see the button. The button opens the existing professional Admin Control Center (`admin.html`). In a real production deployment, Firebase Authentication + Firestore Rules must enforce the same admin authorization server-side; hiding a button in JavaScript is not a security boundary.

## Admin-controlled content
The Admin Control Center includes controls for movie add/edit/delete, categories, points and 15-hour unlock settings, daily ad earning limit, rewarded/interstitial/banner/task/adult Ad Block IDs, extra Ad Blocks, Telegram links, How To Earn video URL, Adult library, tasks, payments, requests, broadcast and app settings.

## Language
Default language is English. Users can switch to Bangla from Settings. The selected language is stored locally and restored on the next visit.
