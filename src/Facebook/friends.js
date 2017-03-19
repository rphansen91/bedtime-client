import initFB from './init'

export default (url, token, fields) => 
    initFB().then(FB =>
        new Promise((res, rej) => 
            FB.api(url, Object.assign({ access_token: token }, fields), (response) => {
                console.log(response);
                if (response && !response.error) return res(response);
                res([]);
            })));