import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  runTransaction,
  increment,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  ...(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    ? { measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID }
    : {}),
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    "Missing Firebase config. Copy .env.example to .env and add your keys. See ENV.md."
  );
}

const app = initializeApp(firebaseConfig);

// persistentLocalCache stores all Firestore data in IndexedDB so the app
// works offline — reads return cached data, writes are queued and auto-synced
// when the connection is restored.
// persistentMultipleTabManager allows multiple browser tabs to safely share
// the same local cache without conflicts.
// Falls back silently to memory cache if IndexedDB is unavailable
// (e.g. iOS private browsing).
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  runTransaction,
  increment,
};
