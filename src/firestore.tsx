import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.toString(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.toString(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.toString(),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.toString(),
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.toString(),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.toString(),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.toString(),
});
export const DB = getFirestore(app);
export const DBStorage = getStorage();
