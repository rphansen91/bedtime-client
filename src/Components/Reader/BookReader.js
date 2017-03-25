import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Page from './Page';
import Loader from '../Display/Loader';
import { Error } from '../Display/Error';
import IconButton from 'material-ui/IconButton';
import ActionClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';
import Next from 'material-ui/svg-icons/navigation/arrow-forward';
import Prev from 'material-ui/svg-icons/navigation/arrow-back';
import { pluck } from 'rp-utils';
import { api } from '../../utils/env';

import { Book, Controls } from './Book';
import { setBookData } from '../../Store/book';
import { readBook } from '../../track/books';

let PDFJS;

const pdfjs = () => new Promise((res, rej) => {
    if (window.PDFJS) return res(); 

    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + 'library/js/pdf.min.js';
    script.onload = res;
    script.onerror = rej;
    document.body.appendChild(script);
})

const loadBook = book => 
    pdfjs().then(() => {
        PDFJS = window.PDFJS;
        return PDFJS.getDocument(`${api}pdf?url=${book.url}`);
    });

const loadPages = book => Promise.all(
    Array.apply(null, { length: book.numPages })
    .map((_, i) => book.getPage(i + 1)));

class BookReader extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            pages: [],
            error: null,
            loading: false
        }
    }

    componentDidMount () {
        const { book, url } = this.props;
        if (book) this.loadBook(book)
    }

    componentWillReceiveProps (nextProps) {
        const { book, url } = this.props;

        if (nextProps.url !== url) {
            this.loadBook(nextProps.book);
        }
    }

    loadBook (book) {
        this.setState({ loading: true, pages: [], error: null });

        loadBook(book)
        .then(book => {
            const _this = this;
            (function loadPage (index) {
                if (index > book.numPages) {
                    return _this.setState({ loading: false });
                }
            
                book.getPage(index)
                .then(page => {
                    const pages = _this.state.pages;
                    _this.setState({ pages: [...pages, page] })
                    setTimeout(() => loadPage(++index), 100);
                })
                .catch(err => loadPage(++index))
            })(0)
        })
        .catch(error => this.setState({ error, loading: false }))
    }

    hasNext () {
        const { pages } = this.state;
        const current = this.currPage();
        return current < pages.length - 1;
    }

    hasPrev () {
        const current = this.currPage();
        return current > 0;
    }

    currPage () {
        const { book } = this.props;
        return book.page || 0;
    }

    renderPage (page, i) {
        const current = this.currPage();
        return <Page 
            key={i} 
            page={page} 
            active={current == i} 
            current={current} 
            index={i}
            scale={0.8} />;
    }

    render () {
        const { book, prev, next } = this.props;
        const { pages, error, loading } = this.state;

        if (!book) return <Book><Error>Please Select A Book</Error></Book>

        return (
            <Book>
                <LinearProgress 
                mode={loading?"indeterminate":"determinate"} 
                value={book.page || 0} 
                min={0} 
                max={pages.length - 1} 
                style={{position:'absolute', top: 0, height: 12,borderRadius: 0,zIndex: 5}} />
                { 
                    (pages || [])
                    .map(this.renderPage.bind(this)) 
                }
                <Error>{ error ? error.message ? error.message : error : '' }</Error>
                <Controls.Prev visible={this.hasPrev()}>
                    <IconButton onTouchTap={()=> prev(book, pages.length)}><Prev /></IconButton>
                </Controls.Prev>
                <Controls.Next visible={this.hasNext()}>
                    <IconButton onTouchTap={()=> next(book, pages.length)}><Next /></IconButton>
                </Controls.Next>
            </Book>
        )
    }
}

const handleQuartiles = (function () {

    const handled = {}
    const quartiles = () => [1,25,50,75,100];

    return (book, count) => {
        const bookQuartiles = handled[book.url] || quartiles();
        const percent = (book.page / count) * 100;
        const nextQuartile = bookQuartiles[0];
        console.log(percent, book.url, bookQuartiles);

        if (nextQuartile && percent >= nextQuartile) {
            bookQuartiles.splice(0,1);
            console.log("======READ BOOK "+nextQuartile+"%=====")
            readBook(nextQuartile+'');
        }

        handled[book.url] = bookQuartiles;
    }
})()

export default connect(
    state => ({
        url: pluck(state, 'book.url'),
        page: pluck(state, 'book.page'),
        book: state.book
    }),
    dispatch => ({
        prev: (book) => {
            const page = book.page || 0;
            const lastPage = Object.assign({}, book, {
                page: Math.max(page-1, 0)
            });
            dispatch(setBookData(lastPage));
        },
        next: (book, pageCount) => {
            const page = book.page || 0;
            const nextPage = Object.assign({}, book, {
                page: page+1
            });
            handleQuartiles(nextPage, pageCount-1);
            dispatch(setBookData(nextPage));
        }
    })
)(BookReader)