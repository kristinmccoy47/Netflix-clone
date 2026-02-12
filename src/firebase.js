import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDoJ75hEuudqJFzl-mOAjKX98b9jkzTjcE",
  authDomain: "netflix-clone-f7ff6.firebaseapp.com",
  projectId: "netflix-clone-f7ff6",
  storageBucket: "netflix-clone-f7ff6.firebasestorage.app",
  messagingSenderId: "757331459378",
  appId: "1:757331459378:web:27d99f3aeb0ebcb289ab2b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email,
             password);
             const user = res.user;
             await addDoc(collection(db, "user"), {
                uid: user.uid,
                name,
                authProvder: "local",
                email,
             })
    } catch (error)
     {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));    
    }
}
const login = async (email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}