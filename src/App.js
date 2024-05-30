import React from 'react'
import { RouterComponents } from './routers'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { Provider } from 'react-redux'
import {getStorage} from 'firebase/storage'
import store from './redux/store'

const firebaseConfig = {
    apiKey: 'AIzaSyBP7wwbFT9wxZbr-JmKi3xhXbheyenmEGo',
    authDomain: 'recipe-organizer-swp391.firebaseapp.com',
    projectId: 'recipe-organizer-swp391',
    storageBucket: 'recipe-organizer-swp391.appspot.com',
    messagingSenderId: '925656558059',
    appId: '1:925656558059:web:3d0fe95ae7fd5b650e11ae',
    measurementId: 'G-GNPR3BQQ2R',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const storage = getStorage(app)
function App() {
    return (
        <Provider store={store}>
            <RouterComponents />
        </Provider>
    )
}

export default App
