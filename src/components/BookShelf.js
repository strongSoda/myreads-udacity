import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ShelfChanger from '../components/ShelfChanger';
import BookCover from '../components/BookCover';



class BookShelf extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleHideLoading: (props.handleHideLoading)
                ? props.handleHideLoading
                : false
        }
    }

    render() {

        let olClasses = classNames({
            'bookshelf-books': true,
            'is-visible': this.props.books.length > 0
        });

        return (
            <div>
                <div className={olClasses}>
                    <ol className="books-grid">
                        {
                            this.props.books.map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <BookCover book={book} />
                                            <ShelfChanger
                                                shelf={book.shelf}
                                                shelfs={this.props.shelfs}
                                                book={book}
                                                onBookMove={this.props.onBookMove}
                                                handleHideLoading={this.state.handleHideLoading} />
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
                {
                    this.props.requestComplete && this.props.books.length === 0 && (
                        <div>There are no books on this list</div>
                    )
                }
            </div>
        )
    }

}

BookShelf.propTypes = {
    shelfs: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onBookMove: PropTypes.func.isRequired,
    requestComplete: PropTypes.bool
};

export default BookShelf