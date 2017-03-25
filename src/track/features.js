import { init } from 'lean-feedback';

module.exports = init({
    url: 'https://lean-feedback.firebaseio.com/bedbyestory/',
    features: [{
        name: 'support',
        assumption: 'How can we help?'
    }, {
        name: 'library',
        assumption: 'Would you like the ability to save books to your library?'
    }, {
        name: 'buy',
        assumption: 'Would you like the ability to buy books direct from bedbyestory?'
    }, {
        name: 'share',
        assumption: 'Are you likely to recommend us to your friends and family?'
    }, {
        name: 'repeat',
        assumption: 'Are you likely to come back for more reading?'
    }]
});