// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth/react-native";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlfz5PN3mTszzVQyN_-1b0eBR0fCQrtKY",
    authDomain: "ehealth-services-de86c.firebaseapp.com",
    projectId: "ehealth-services-de86c",
    storageBucket: "ehealth-services-de86c.appspot.com",
    messagingSenderId: "315370506628",
    appId: "1:315370506628:web:7a7a27b5f4e48b9c8d75d1",
    measurementId: "G-CEPLNWW5Q9"
};

var app;
var auth;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} else {
    app = getApp();
    auth = getAuth(app);
}

const db = getFirestore(app)

export { auth, db };


