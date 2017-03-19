import './db';
import getFacebookData from '../Facebook/friends';
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
        'display': 'popup',
        'scope': 'email,user_friends,user_likes'
    });

    return providerLogin(provider, 'facebook')
    .then((res) => {
        return getFacebookData('/me/friends', res.credential.accessToken)
        .then(friends => {
            res.friends = friends.data;
            return res;
        })
        .catch(err => {
            res.friends = [];
            return res;
        })
    });
}

function providerLogin (provider, name) {
    return firebase.auth().signInWithPopup(provider)
}