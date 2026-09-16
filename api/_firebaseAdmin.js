import admin from "firebase-admin";

/**
 * Initialize Firebase Admin once per serverless isolate.
 * Expects FIREBASE_SERVICE_ACCOUNT = full service-account JSON string.
 */
export function getFirestore() {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) {
      throw new Error("Missing FIREBASE_SERVICE_ACCOUNT env var");
    }
    const serviceAccount = typeof raw === "string" ? JSON.parse(raw) : raw;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.firestore();
}

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateRoomCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => CODE_CHARS[b % CODE_CHARS.length]).join("");
}
