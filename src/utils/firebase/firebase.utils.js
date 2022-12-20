import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBz2n_pyM-0ANppoLKSZvSJ_rBSuv9wB8A",
  authDomain: "crwn-clothing-db-14994.firebaseapp.com",
  projectId: "crwn-clothing-db-14994",
  storageBucket: "crwn-clothing-db-14994.appspot.com",
  messagingSenderId: "84518808570",
  appId: "1:84518808570:web:477bb1e7a65024e96f9243",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export  const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log('userDocRef', userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log('userSnapshot', userSnapshot);
    console.log('userSnapshot.exists()',userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}