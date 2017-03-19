const initializeFB = () => {
    window.FB.init({
        appId: '1730689793909314',
        xfbml: true,
        version: 'v2.8'
    });
    window.FB.AppEvents.logPageView();
}

const addScript = () => {
    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export default () => new Promise((res, rej) => {
    if (window.FB) return res(window.FB);
    addScript();
    window.fbAsyncInit = function() {
        initializeFB();
        res(window.FB);
    };
})