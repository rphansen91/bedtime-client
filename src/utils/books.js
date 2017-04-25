import { api } from './env';

const formatResonse = (res) => {
    return res.json()
    .then(books => {
        if (books.err) return []
        return books
    })
}

export const freeBooks = () =>
    fetch(`${api}free`)
    .then(formatResonse)

export const amazonBooks = (keywords) => 
    fetch(`${api}/amazon/search?Keywords=${keywords}`)
    .then(formatResonse)

export default (keywords) => 
    Promise.all([
        freeBooks(),
        amazonBooks(keywords)
    ]).then(res => ({
        'Free Books': res[0],
        'Amazon Books': res[1]
    }))