import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUEvYILHrD0dIBShvRbyA-9FDgTF6hW0E",
    authDomain: "fittrack-bde05.firebaseapp.com",
    projectId: "fittrack-bde05",
    storageBucket: "fittrack-bde05.firebasestorage.app",
    messagingSenderId: "1080308152893",
    appId: "1:1080308152893:web:9c104563d621b553e94854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;