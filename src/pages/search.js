import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import BookShelf from '../components/BookShelf';
import { search } from '../services/BooksApi';
import { debounce } from 'throttle-debounce';

class Search extends React.Component {


    constructor(props) {
        super(props);
        this.doSearch = debounce(250, this.doSearch);
        this.onBookMove = this.onBookMove.bind(this);

        this.state = {
            query: '',
            loading: false,
            books: []
        }
    }

    showLoading() {
        this.setState({ loading: true })
    }

    hideLoading() {
        this.setState({ loading: false })
    }

    updateSearch = (query) => {
        this.showLoading()
        this.setState({ query });

        if (!query) {
            this.hideLoading()
            this.props.onSearchUpdate(query, [])
        }

        this.doSearch();
    }

    doSearch() {
        if (this.state.query) {
            search(this.state.query.trim(), 5)
                .then((response) => {
                    if (response.error) {
                        throw Error(response.error);
                    }

                    this.props.onSearchUpdate(this.state.query, response)
                    this.hideLoading()


                }).catch((response) => {
                    this.props.onSearchUpdate(this.state.query, [])
                    this.hideLoading()
                })
        }
    }

    onBookMove(book, targetShelf) {
        return this.props.onBookMove(book, targetShelf);
    }

    componentDidMount() {
        this.updateSearch(this.state.query);
    }

    componentWillReceiveProps(props) {
        let newState = {};

        if (props.books) {
            newState.books = props.books;
        }

        this.setState(newState);
    }

    render() {

        let content;

        if (this.state.loading) {
            content = <div className="loading is-visible" />
        } else {
            if (this.state.query && this.props.books.length === 0) {
                let message = `No results were found for '${this.state.query}'`;
                content = <div>{message}</div>
            } else if (!this.state.query) {
                content = <div>Start typing to search for books to add to your list</div>
            } else {
                content = <BookShelf
                    books={this.state.books}
                    shelfs={this.props.shelfs}
                    onBookMove={this.onBookMove}
                    handleHideLoading={true} />
            }
        }


        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input autoFocus type="text"
                            onChange={event => this.updateSearch(event.target.value)}
                            value={this.state.query}
                            placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    {content}
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    shelfs: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onBookMove: PropTypes.func.isRequired,
    onSearchUpdate: PropTypes.func.isRequired
};

export default Search
