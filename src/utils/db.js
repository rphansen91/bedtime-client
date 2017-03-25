import { flow } from 'rp-utils'

module.exports = flow.Safely(() => {
    const firebase = window.firebase;
    firebase.initializeApp({
        apiKey: "AIzaSyB9KHEE9umkBLupQvfJXFhxEeGIdbvED_A",
        authDomain: "bedtime-stories.firebaseapp.com",
        databaseURL: "https://bedtime-stories.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "1064818025045"
    });
    return firebase.database()
})
.fold(e => console.log(e), db => db);