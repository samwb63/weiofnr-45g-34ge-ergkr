import React, { createContext } from 'react'
import app from 'firebase/app'

const FirebaseContext = createContext(null)
export { FirebaseContext }

export default function FirebaseProvider({ children }) {
    if (!app.apps.length) {
        // Initializing our Firebase app
        app.initializeApp({
            apiKey: process.env.REACT_APP_FIREBASE_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
        })
    }
    return (
        <FirebaseContext.Provider value={ app }>
            { children }
        </FirebaseContext.Provider>
    )
}