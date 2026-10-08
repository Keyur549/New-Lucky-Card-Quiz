# જ્ઞાન શોધ — Lucky Card Quiz Championship (Standalone App)

Aa ek standalone Node.js app che — koi pan vyakti (Claude account vagar) direct browser thi kholi shake. Real-time sync Socket.IO thi thaay che, data server ni memory ma rahe che (server restart thay to rooms clear thai jaay — jaruriyat hoy to database (jem ke SQLite/MongoDB) add kari shakay).

## Files
- `server.js` — backend (Express + Socket.IO), badhi game logic (questions, cards, timer, claims, winners) ahi che.
- `public/index.html` — landing page (Host/Player link).
- `public/host.html` — Host dashboard.
- `public/player.html` — Player screen.
- `package.json` — dependencies list.

## Locally Run Karva Mate (testing)
```
npm install
npm start
```
Pachi browser ma `http://localhost:3000` kholo.

## Internet Par Free Deploy Karva Mate (koi pan vyakti access kari shake)
Koi pan Node.js hosting chalse. Sauthi sahelu:

### Option 1: Render.com (free tier)
1. https://render.com par sign up karo, GitHub sathe connect karo (aa folder ne GitHub repo banavo).
2. "New Web Service" → repo select karo.
3. Build Command: `npm install`, Start Command: `npm start`.
4. Deploy thaya pachi tamne ek public URL malshe (jem ke `https://your-app.onrender.com`) — e j link badha players ne aapo.

### Option 2: Railway.app / Replit / Glitch
Aa badha pan free/cheap Node hosting aape che — repo/files upload karo, `npm install && npm start` set karo, public URL malshe.

## Players Potana Mobile Internet Thi Kaise Join Kare (Important)

Players e apna mobile ni internet (data/WiFi, ge pan hoy) thi join karva mate, server **internet par publicly accessible** hovo joiye — matlab fakt `localhost:3000` chalse to fakt host na j WiFi/computer par kaam kare, bahar na koi player thi nahi.

Be rasta che:

### Option A — Ek j event mate zadપી (ngrok, no deployment needed)
Jo aa fakt ek j vaar nu event hoy (jem ke temple satsang), sauthi sahelu:
1. `npm install && npm start` — apna laptop/computer par local server chalu karo.
2. https://ngrok.com par free account banavo, ngrok install karo.
3. Navi terminal ma: `ngrok http 3000`
4. Ngrok ek public link aapshe (jem ke `https://abcd1234.ngrok-free.app`) — **aaj link badha players ne aapo** (potana mobile internet thi khali jashe).
5. **Jaruri:** Event pura thata sudhi tamaru laptop/computer chalu ane internet sathe connected rakhvu — ngrok tunnel band thai jashe jo laptop band karo/sleep thay.

### Option B — Permanent Hosting (recurring use mate, laptop ni jarur nahi)
Upar "Render.com" wala steps follow karo — ek vaar deploy karya pachi link kayam chalu rahe, tamaru computer band hoy to pan.

Banne option ma players fakt link kholi, potanu naam/zone/avatar nakhi, Room Code sathe join kari shakse — potana j mobile data/WiFi thi, host na network sathe judાયેલા hova ni jarur nahi.

## Player Login / Profile / History Setup (Optional)

Player hવે Email + OTP થી Login કરી શકે, Profile (Name + Avatar/Photo) બનાવી શકે, અને Past Games ની History જોઈ શકે. Aa feature **optional** che — setup na karo to pan game barobar chale, fakt login/history disable rahe.

### Step 1 — Free MongoDB Atlas Database Banavo
1. https://www.mongodb.com/cloud/atlas/register par free account banavo.
2. "Build a Database" → **Free (M0)** tier select karo → koi pan region pasand karo → "Create".
3. **Database User** banavo (username + password yaad rakho).
4. **Network Access** ma "Allow Access from Anywhere" (`0.0.0.0/0`) add karo.
5. "Connect" → "Drivers" → connection string copy karo, jem ke:
   `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`
   (`password` ni jagya e tamaru sachu password nakho)

### Step 2 — Free Gmail App Password Banavo (OTP email mokalva mate)
1. https://myaccount.google.com/apppasswords par jaao (2-Step Verification chalu hovu joiye tamara Google account ma).
2. "App Password" banavo (koi pan naam aapo, jem ke "Quiz App").
3. 16-digit code malshe — e copy karo.

### Step 3 — Render/Railway Par Environment Variables Set Karo
Tamara hosting dashboard ma (Render: "Environment" tab, Railway: "Variables" tab) aa 4 umero:
- `MONGODB_URI` = Step 1 no connection string
- `EMAIL_USER` = tamaru Gmail address
- `EMAIL_PASS` = Step 2 no 16-digit App Password
- (`HOST_ID`/`HOST_PW` pehla thi hoy to e pan rakho)

Save karta j service automatically redeploy thashe, ane Player Login/Profile/History chalu thai jashe.

## Host Login
Default: **User ID:** `admin`, **Password:** `gyan2026`
(Change karva mate `server.js` na top par `HOST_ID`/`HOST_PW` badlo, athva environment variables `HOST_ID`/`HOST_PW` set karo.)

## Navaa Questions Add Karva
Room banavta j "Questions" box ma paste karo, format:
```
તમારો પ્રશ્ન?::સાચો જવાબ
```
(ke `Question - Answer` pan chalse). Khali rakho to built-in 36 questions vaparashe.

## Limitations (Important)
- Data server ni RAM ma j store thay che — server restart/redeploy thay to badhi rooms/results clear thai jaay. Moti event pehla ek dry-run test jarur karo.
- 500+ players ek j samaye connect kare to free-tier hosting (Render free) slow/sleep thai shake — paid tier (nano $ plan) ke thodu vadhare resources vado plan lo jo bahu moti event hoy.
- Speech (audio) browser-based che, so tamara players na phone/browser par Gujarati TTS voice hovi jaruri.
