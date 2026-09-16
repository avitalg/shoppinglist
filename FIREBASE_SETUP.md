# Firebase setup — secure room creation

Room **create** is server-only. Clients cannot `setDoc` new rooms; the Vercel API writes with the Admin SDK after BotID checks.

---

## Deploy Firestore rules

Rules live in [`firestore.rules`](./firestore.rules).

```bash
npm i -g firebase-tools   # if needed
firebase login
firebase use <your-project-id>
firebase deploy --only firestore:rules
```

Or paste the file into Firebase Console → Firestore → Rules → Publish.

**Order matters:** deploy rules that deny client `rooms` create **before** (or with) shipping the client that calls `/api/create-room`. If rules deny create while the old client still uses `setDoc`, creates will fail until the new client is live.

---

## Service account (Admin SDK)

1. Firebase Console → Project settings → **Service accounts** → Generate new private key.
2. On Vercel → Project → Settings → Environment Variables, add:

   | Name | Value |
   |---|---|
   | `FIREBASE_SERVICE_ACCOUNT` | Entire JSON key as a **single-line** string (or paste JSON; Vercel accepts multiline secrets) |

   Apply to Production and Preview. Never use a `VITE_*` name for this.

3. Redeploy so `/api/create-room` can initialize Admin.

Local create testing: use `vercel env pull` then `vercel dev` (plain `npm run dev` has no Admin/BotID API).

---

## What clients can still do

- `get` a room by known 6-character code (join)
- Read/write lists and item history under an existing room

Anyone with a room code can still use that room — same product model. Abuse of **mass room creation** is what this setup blocks.
