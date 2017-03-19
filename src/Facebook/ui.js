import initFB from './init'

initFB()

export default (data) => {
    return initFB()
    .then(FB => {
        const message = FB.ui(data);
        console.log(message);
        return message;
    })
}