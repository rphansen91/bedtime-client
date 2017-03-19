import './db';
const firebase = window.firebase;

export const email = (data) => {
    return firebase.auth()
    .signInWithEmailAndPassword(data.email, data.password)
}

export const google = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    return providerLogin(provider, 'google');
}

export const facebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });

    return providerLogin(provider, 'facebook');
}

function providerLogin (provider, name) {
    console.log(provider);
    return firebase.auth().signInWithPopup(provider)
}