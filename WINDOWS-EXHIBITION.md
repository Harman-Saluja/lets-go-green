# Windows exhibition setup

Use the NEW source ZIP, not an older download. Extract it fully first.
Install Node.js 24 LTS if `node --version` is unavailable. No API keys or database are required.

## CMD commands
Open the extracted folder in File Explorer. Click its address bar, type `cmd`, press Enter.
The folder must contain `package.json` and `src`.

```bat
node --version
npm ci
npm test
npm run build
npm run preview
```
Keep CMD open. Open **http://localhost:4173** in Chrome or Edge.
Stop the server with Ctrl+C. Do not double-click index.html or run from inside the ZIP.
For later starts, double-click **START-EXHIBITION.cmd** (builds and starts the same server).

If port 4173 is busy:
```bat
npm run preview -- --port 4174
```
Then open http://localhost:4174. History belongs to the browser AND origin/port;
keep the same port during the exhibition. Do not clear site data if you need saved history.

## Dependable short demonstration
1. Dashboard → Demo reactions → load **Sugar hydrolysis (sucrose)**.
2. Chemistry Lab → Analyze: explain the recorded inputs, metrics and educational Green Score.
3. Optimize → apply the educational alternative → Compare.
4. Show the actual changed values and unchanged atom economy.
5. Save reaction → History → reload it.

The numerical demo assumptions are educational, not measured experimental claims.
Solvent/catalyst reference information is not a laboratory safety or compatibility approval.

## Backup / offline use
Keep this extracted source folder and the deployment ZIP on your laptop and a USB drive.
The app's scripts, fonts, molecular structures, game and illustrations are local; external
reference links need internet. The installed Node runtime is required for the local server.
No npm downloads are required for `npm run build` or `npm run preview` (no package dependencies).
If WebGL has trouble, open **http://localhost:4173/?safe=1#/chemistry-lab/analyze/analysis**. This compatibility mode disables only Cinema 3D and shows the net equation instead. The backup ZIP includes a ready-built copy and START-BACKUP.cmd: no install/build step is needed after Node is installed. Use the short demonstration above.
Cinema includes a text-based fallback when WebGL is unavailable.
This is the same checked application, not a second chemistry implementation.

## Netlify (only after you approve deployment)
Source repository settings: build command `npm run build`, publish directory `build`, Node 24.
For manual deployment, extract the deployment ZIP and upload the folder that directly contains
`index.html`, `serve.json`, `green-rescue.htm` and `cinema-stage.htm`. Do not upload the source folder
as a static build. Do not add a catch-all redirect: the main application uses hash navigation.
The review branch disables Pretty URLs for future Git-based builds and includes three explicit legacy experience redirects. The live deployment was not changed.

## Alternative local server
`npx serve -s build` uses the included build/serve.json. Keep that file with the build.
Prefer `npm run preview` for the exhibition: it requires no download and returns honest 404s.
The new `.htm` embedded pages avoid the legacy `.html` clean-URL/SPA fallback collision.
