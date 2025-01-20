// plugins/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// firebase anahtarı eklendi
const firebaseConfig = {
  apiKey: "AIzaSyBTkEtKx0iKs91MHfzu7gX6lIn1zeuT91c",
  authDomain: "authentication-1bfc6.firebaseapp.com",
  projectId: "authentication-1bfc6",
  storageBucket: "authentication-1bfc6.firebasestorage.app",
  messagingSenderId: "946483172206",
  appId: "1:946483172206:web:cab06faed16b4916c3277f",
  measurementId: "G-1RL07TXFMC"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
