import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBg9jETSn1Vd08jd1klXB_5o1sggIsuQM",
  authDomain: "teste-60c15.firebaseapp.com",
  projectId: "teste-60c15",
  storageBucket: "teste-60c15.firebasestorage.app",
  messagingSenderId: "287771669947",
  appId: "1:287771669947:web:1ceeb26ce030f457a7009e",
  measurementId: "G-P5JHVLQWCB"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth com persistência em AsyncStorage
// (mantém o usuário logado entre sessões do app)
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

export { app, auth };