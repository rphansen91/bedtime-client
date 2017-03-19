import React from 'react';
import getBooks from '../../utils/books';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Main } from '../Display/Main';
import Parallax from '../Display/Parallax';

const BookReview = ({ book, onAccept }) => (
  <Card>
    <CardHeader
      title={book.title}
      subtitle={book.author}
    />
    <CardMedia><img src={book.img} /></CardMedia>
    <CardActions>
      <FlatButton label="Accept" onTouchTap={onAccept} />
    </CardActions>
  </Card>
);  

export default class extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount () {
        getBooks()
        .then(books => this.setState({ books }));
    }

    render () {
        const { books } = this.state;

        return (
            <Main>
                <Parallax>
                {
                    books.map(book => <BookReview book={book} key={book.url} />)
                }
                </Parallax>
            </Main>
        )
    }
}