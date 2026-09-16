import { checkBotId } from "botid/server";
import { FieldValue } from "firebase-admin/firestore";
import { generateRoomCode, getFirestore } from "./_firebaseAdmin.js";

const MAX_NAME_LEN = 100;
const MAX_CODE_ATTEMPTS = 8;

/**
 * POST /api/create-room
 * Body: { name: string }
 * Creates a room via Admin SDK after BotID verification.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const verification = await checkBotId({
      advancedOptions: { headers: req.headers },
    });

    if (verification.isBot) {
      return res.status(403).json({ error: "Access denied" });
    }

    const name =
      typeof req.body?.name === "string" ? req.body.name.trim() : "";
    if (!name || name.length > MAX_NAME_LEN) {
      return res.status(400).json({ error: "Invalid room name" });
    }

    const db = getFirestore();
    let roomId = null;

    for (let i = 0; i < MAX_CODE_ATTEMPTS; i++) {
      const code = generateRoomCode();
      const ref = db.collection("rooms").doc(code);
      try {
        await ref.create({
          name,
          code,
          createdAt: FieldValue.serverTimestamp(),
        });
        roomId = code;
        break;
      } catch (err) {
        const alreadyExists =
          err?.code === 6 ||
          err?.code === "already-exists" ||
          /ALREADY_EXISTS/i.test(err?.message || "");
        if (!alreadyExists) throw err;
      }
    }

    if (!roomId) {
      return res.status(503).json({ error: "Could not allocate room code" });
    }

    return res.status(201).json({ roomId, name });
  } catch (err) {
    console.error("create-room failed:", err?.message || err);
    const missingCreds = /FIREBASE_SERVICE_ACCOUNT|credential/i.test(
      err?.message || "",
    );
    return res.status(500).json({
      error: missingCreds ? "Server misconfigured" : "Failed to create room",
    });
  }
}
