import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDsvNQAaLoq2d-ZJGhdzK6s_Jg4ZDoLEoE",
    authDomain: "netflix-clone-485ef.firebaseapp.com",
    projectId: "netflix-clone-485ef",
    storageBucket: "netflix-clone-485ef.firebasestorage.app",
    messagingSenderId: "281314601832",
    appId: "1:281314601832:web:15614c0c08cbffa490c4dd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });


    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));

    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };


