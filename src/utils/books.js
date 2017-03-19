import { api } from './env';

const freeBooks = () =>
    fetch(`${api}free`)
    .then(res => res.json())

const amazonBooks = (keywords) => 
    fetch(`${api}/amazon/search?Keywords=${keywords}`)
    .then(res => res.json())

export default (keywords) => 
    Promise.all([
        freeBooks(),
        amazonBooks(keywords)
    ]).then(res => ({
        'Free Books': res[0],
        'Amazon Books': res[1]
    }))