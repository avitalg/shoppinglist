# Secure room creation

Room create goes through [`api/create-room.js`](./api/create-room.js) with Vercel BotID. Client Firestore rules deny room creates (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)).

## Env

| Variable | Where | Purpose |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | Vercel (server only) | Firebase Admin JSON for creating rooms |
| `VITE_FIREBASE_*` | Build / client | Existing web SDK config (join + lists) |

## Firewall rate limit

Stage a per-IP rate limit on `/api/create-room` (log first, then enforce):

```bash
npx vercel link --project shoppinglist   # if needed
npx vercel firewall rules add "Rate limit create-room" \
  --condition '{"type":"path","op":"eq","value":"/api/create-room"}' \
  --action rate_limit \
  --rate-limit-window 60 \
  --rate-limit-requests 10 \
  --rate-limit-keys ip \
  --rate-limit-action log \
  --yes

npx vercel firewall diff
# After reviewing traffic in the dashboard:
npx vercel firewall publish --yes
```

Then edit the rule to `--rate-limit-action deny` (or `challenge`) and publish again.

Optional: Vercel project → Firewall → enable **BotID Deep Analysis** (paid). Basic BotID is free via `checkBotId()` in the API.
