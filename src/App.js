import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Search from './pages/search'
import List from './pages/list'
import NotFoundPage from './pages/notFound'
import { getAll, update } from './services/BooksApi'

class BooksApp extends React.Component {
    state = {
        shelfs: {
            currentlyReading: {
                label: 'Currently Reading'
            },
            wantToRead: {
                label: 'Want to Read'
            },
            read: {
                label: 'Read'
            }
        },
        books: [],
        search: {
            query: null,
            books: [],
        },
        bookShelfAssoc: {},
        myRequestComplete: false
    }

    refreshBookList = () => {
        this.setState({
            myRequestComplete: false,
            books: []
        })

        getAll()
            .then((data) => {
                this.setState({
                    books: data,
                    myRequestComplete: true
                })
                this.updateBookShelfAssoc(data);
            });
    }

    updateBookShelfAssoc(books) {
        let bookShelfAssoc = {};
        books.forEach((book) => {
            bookShelfAssoc[book.id] = book.shelf
        });

        this.setState({ bookShelfAssoc });

        this.onSearchUpdate(
            this.state.search.query,
            this.state.search.books
        );
    }

    onBookMove = (book, targetShelf) => {

        return update(book, targetShelf)
            .then(() => this.refreshBookList())

    }

    onSearchUpdate = (query, books) => {

        books.forEach((book) => {
            book.shelf = (this.state.bookShelfAssoc[book.id])
                ? this.state.bookShelfAssoc[book.id]
                : 'none';
        })

        let state = this.state;

        state.search = {
            query: query,
            books: books
        }

        this.setState(state);

    }

    componentDidMount() {
        this.refreshBookList()
    }


    render() {
        return (<div className="app">
            <Switch>
                <Route exact path="/search" render={() => (
                    <Search
                        shelfs={this.state.shelfs}
                        books={this.state.search.books}
                        onBookMove={this.onBookMove}
                        onSearchUpdate={this.onSearchUpdate} />
                )} />
                <Route exact path="/" render={() => (
                    <List
                        myRequestComplete={this.state.myRequestComplete}
                        shelfs={this.state.shelfs}
                        books={this.state.books}
                        onBookMove={this.onBookMove} />
                )} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>)
    }
}

export default BooksApp
