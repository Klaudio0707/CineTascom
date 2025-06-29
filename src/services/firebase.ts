import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIFIREBASE_KEY,
  authDomain: "cinetascom.firebaseapp.com",
  projectId: "cinetascom",
  storageBucket: "cinetascom.appspot.com",
  messagingSenderId: "125059085567",
  appId: "1:125059085567:web:f38bdf6e9ac441709d48ca"
};


console.log("DEBUG: Configuração do Firebase que está sendo usada:", firebaseConfig );

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


