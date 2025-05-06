import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmZgfnaZQyWmj1uTgqu9z20WaO1mDX6Kk", // import.meta.env?.VITE_API_KEY || process.env.API_KEY,
  authDomain: "agenda-collector.firebaseapp.com", // import.meta.env?.VITE_AUTH_DOMAIN || process.env.AUTH_DOMAIN,
  projectId: "agenda-collector", // import.meta.env?.VITE_PROJECT_ID || process.env.PROJECT_ID,
  storageBucket: "agenda-collector.appspot.com", // import.meta.env?.VITE_STORAGE_BUCKET || process.env.STORAGE_BUCKET,
  messagingSenderId: "544972674576", // import.meta.env?.VITE_MESSAGING_SENDER_ID || process.env.MESSAGING_SENDER_ID,
  appId: "1:544972674576:web:6411965f1033e5c4a71c95", // import.meta.env?.VITE_APP_ID || process.env.APP_ID,
  measurementId: "G-9WM64TZ0TW", // import.meta.env?.VITE_MEASUREMENT_ID || process.env.MEASUREMENT_ID || "",
  databaseURL: "https://agenda-collector.firebaseio.com", // import.meta.env?.VITE_DATABASE_URL || process.env.DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// console.log("app:", app);
export { app, db };
