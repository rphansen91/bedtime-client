import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import UploadIcon from 'material-ui/svg-icons/navigation/arrow-upward';

import Parallax from '../Display/Parallax';
import { Main } from '../Display/Main';
import { Header, Title } from '../Display/Header';
import { setBookData } from '../../Store/book';
import BookList from './Book/List';

const styles = {
  root: {
    backgroundColor: '#efefef',
    minHeight: '60vh',
    boxShadow: '0 -8px 8px rgba(0,0,0,0.2)',
    textAlign: 'left',
    paddingBottom: 200
  },
  pdfButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      margin: 10,
      zIndex: 101
  },
  pdfInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  }
};

const BookShelf = ({ books, selected, selectedFile }) => 
    <Main>
        <Header img="//bedbyestory.com/library/imgs/header.jpg" height="40vh">
            <Title>They grow up fast...<br/>Play a role in the story!</Title>
        </Header>

        {/*<RaisedButton label="Upload Book"
            labelPosition="before"
            secondary={true}
            icon={<UploadIcon />}
            style={styles.pdfButton}>
            <input type="file" style={styles.pdfInput} onChange={selectedFile} />
        </RaisedButton>*/}

        <Parallax>
            <div style={styles.root}>
                { books.isLoading ? <LinearProgress mode="indeterminate" style={{height: 12,borderRadius: 0}} /> : '' }
                
                { 
                    Object.keys(books.data || {})
                    .map(name => 
                        <BookList 
                        key={name}
                        name={name}
                        items={books.data[name]} 
                        onSelected={selected} />)
                }
            </div>
        </Parallax>
    </Main>

export default connect(
    state => state,
    dispatch => ({
        selected: (book) => {
            if (!book.url.includes('.pdf')) {
                window.open(book.url);
                return;
            }
            dispatch(setBookData(book));
            if (book) dispatch(push('/room'));
        },
        selectedFile: (file) => {
            console.log(file);
        }
    })
)(BookShelf)