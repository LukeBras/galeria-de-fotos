import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'

console.log(process.env.NEXT_PUBLIC_APP_FIREBASE_STORAGEBUCKET);

const firebaseConfig = {
    apiKey:process.env.NEXT_PUBLIC_APP_FIREBASE_APIKEY,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket:process.env.NEXT_PUBLIC_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSEAGINGSENDEID,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

    

 const firebaseApp  = initializeApp(firebaseConfig);
 export const storage = getStorage(firebaseApp);
  