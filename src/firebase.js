import firebase, { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB93S1SMQHOPc4-hHlfc51L85uv47CO26A",
    authDomain: "react-directory-ad226.firebaseapp.com",
    projectId: "react-directory-ad226",
    storageBucket: "react-directory-ad226.appspot.com",
    messagingSenderId: "230407163430",
    appId: "1:230407163430:web:ffec2794ed565d566060e7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);