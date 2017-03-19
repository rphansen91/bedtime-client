const firebase = window.firebase;
const config = {
    apiKey: "AIzaSyB9KHEE9umkBLupQvfJXFhxEeGIdbvED_A",
    authDomain: "bedtime-stories.firebaseapp.com",
    databaseURL: "https://bedtime-stories.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "1064818025045"
};

firebase.initializeApp(config);
module.exports = firebase.database();