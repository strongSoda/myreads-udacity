import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import BookShelf from '../components/BookShelf';



class List extends React.Component {

    render() {

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            {
                                Object.keys(this.props.shelfs).map((shelfID) => (
                                    <div key={shelfID}>
                                        <h2 className="bookshelf-title">
                                            {this.props.shelfs[shelfID].label}
                                        </h2>

                                        <Loading isVisible={!this.props.myRequestComplete} />
                                        <BookShelf
                                            books={this.props.books.filter(book => book.shelf === shelfID)}
                                            shelfs={this.props.shelfs}
                                            onBookMove={this.props.onBookMove}
                                            requestComplete={this.props.myRequestComplete} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>



                <div className="open-search">
                    <Link to="/search">Add Menu</Link>
                </div>
            </div>
        )
    }
}

List.propTypes = {
    shelfs: PropTypes.object.isRequired,
    myRequestComplete: PropTypes.bool,
    books: PropTypes.array.isRequired,
    onBookMove: PropTypes.func.isRequired
};

export default List
