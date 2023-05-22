// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyANo0x2zT4TSU8jcPK8AOaA-0ZMMjGQgvM",
    authDomain: "react-native-b71ad.firebaseapp.com",
    projectId: "react-native-b71ad",
    storageBucket: "react-native-b71ad.appspot.com",
    messagingSenderId: "994784938866",
    appId: "1:994784938866:web:0801ccdb437c0966c06beb",
    measurementId: "G-4ZD0EVJLMR"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);