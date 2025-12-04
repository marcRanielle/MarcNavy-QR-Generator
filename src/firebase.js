import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// --- Firebase Initialization (Required Setup) ---
// Using global variables if available, otherwise defaulting to empty object to avoid crash
const firebaseConfig = typeof window !== 'undefined' && window.__firebase_config ? JSON.parse(window.__firebase_config) : {};
// const appId = typeof window !== 'undefined' && window.__app_id ? window.__app_id : 'default-app-id';

let app, db, auth;

if (Object.keys(firebaseConfig).length > 0) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    console.warn("Firebase config not found. App will run in offline/demo mode.");
}

export { app, db, auth };
