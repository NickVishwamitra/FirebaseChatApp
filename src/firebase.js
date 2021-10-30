import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase } from "firebase/database";
import { set, ref, onValue } from "@firebase/database";
import firebaseui from "firebaseui";
export const firebaseConfig = {
  apiKey: "AIzaSyBOQzlOek7_THhlVdgbH0iH5cohuKYWTQM",
  authDomain: "my-chat-app-43f37.firebaseapp.com",
  projectId: "my-chat-app-43f37",
  storageBucket: "my-chat-app-43f37.appspot.com",
  messagingSenderId: "330285039305",
  appId: "1:330285039305:web:9870eeb09d37a2ccef9718",
  measurementId: "G-3WMPZ6YJY0",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase();

export function writeUserData(userId, name, email, imageUrl) {
  set(ref(firebaseDB, "userdata/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
