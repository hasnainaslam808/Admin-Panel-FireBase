importScripts('https://www.gstatic.com/firebasejs/10.9.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBCTN6KOIpobVLPcxPCZeUd9rJ4t3uKYqo",
    authDomain: "student-management-4307e.firebaseapp.com",
    projectId: "student-management-4307e",
    storageBucket: "student-management-4307e.appspot.com",
    messagingSenderId: "838485293378",
    appId: "1:838485293378:web:797a98ec95c1b461e570db"
})

const messaging = firebase.messaging();