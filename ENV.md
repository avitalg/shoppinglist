# Environment variables

Firebase config is loaded from environment variables at **build time** (via [Vite](https://vitejs.dev/guide/env-and-mode.html)). Values are never committed to git.

---

## Local development

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Open [Firebase Console](https://console.firebase.google.com) → your project → **Project settings** → **Your apps** → web app config.

3. Fill in each `VITE_FIREBASE_*` value in `.env`:

   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

`.env` is listed in `.gitignore` — do not commit it.

---

## Production deploy

Set the same `VITE_FIREBASE_*` variables in your host's dashboard (not in source code):

| Host | Where to add env vars |
|---|---|
| [Netlify](https://docs.netlify.com/environment-variables/overview/) | Site settings → Environment variables |
| [Vercel](https://vercel.com/docs/projects/environment-variables) | Project → Settings → Environment Variables |
| [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/build-configuration/) | Settings → Environment variables |

Then build and deploy:

```bash
npm run build
```

Upload the `dist/` folder, or connect the repo and set the build command to `npm run build` with publish directory `dist`.

---

## Why `VITE_` prefix?

Vite only injects variables that start with `VITE_` into the client bundle. This prevents accidentally exposing server-only secrets (API tokens, service account keys) to the browser.

---

## Security note

Firebase **web** API keys are designed to be included in client apps — they identify your Firebase project, not authenticate privileged access. Real protection comes from **Firestore security rules** (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)).

What env vars give you:

- Keys stay out of git and public repos
- Each developer/deploy environment can use its own Firebase project
- No hardcoded config in `js/firebase.js`

What they do **not** do: hide keys from someone inspecting the built JavaScript in the browser. That is expected for Firebase client SDKs.

**Never** put Firebase Admin SDK credentials, service account JSON, or other true secrets in `VITE_*` variables.

