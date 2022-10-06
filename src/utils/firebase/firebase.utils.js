// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyBdmi1ZCjc00VLZHTsWr5-M2LL9gYeBP-0',
   authDomain: 'crwn-clothing-db-6a77a.firebaseapp.com',
   projectId: 'crwn-clothing-db-6a77a',
   storageBucket: 'crwn-clothing-db-6a77a.appspot.com',
   messagingSenderId: '653934773269',
   appId: '1:653934773269:web:4de5c7ecb7e9beca71ba1c',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
   prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid)

   console.log(userDocRef)
}
