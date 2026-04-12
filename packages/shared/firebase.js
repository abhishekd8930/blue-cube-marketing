import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWc9pn-NOLcVqefBSpBM5roJ5BxTvD5k4",
  authDomain: "blue-cube-system.firebaseapp.com",
  projectId: "blue-cube-system",
  storageBucket: "blue-cube-system.firebasestorage.app",
  messagingSenderId: "306004070240",
  appId: "1:306004070240:web:53e9e393fa6196dacb1805",
  measurementId: "G-HBCFFHJE8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only works in browser environments)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
