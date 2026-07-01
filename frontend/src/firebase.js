
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDdl2oLZ59IG9EAo-lCGCNgZJY8QdEWOhU",
  authDomain: "video-64689.firebaseapp.com",
  projectId: "video-64689",
  storageBucket: "video-64689.firebasestorage.app",
  messagingSenderId: "605292093036",
  appId: "1:605292093036:web:6d0cece362c167fefdc249"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();


export default app;