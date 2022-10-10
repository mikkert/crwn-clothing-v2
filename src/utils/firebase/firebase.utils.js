// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {},
) => {
   if (!userAuth) return

   const userDocRef = doc(db, 'users', userAuth.uid)

   console.log(userDocRef)

   const userSnapshot = await getDoc(userDocRef)
   console.log(userSnapshot)
   console.log(userSnapshot.exists())

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         })
      } catch (err) {
         console.log('Error creating user', err.message)
      }
   }

   return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password)
}
