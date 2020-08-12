import React, { Component } from "react";
import { deleteBook } from "../services/ebookService";
import { getGenres } from "./../services/fakeGenres";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { Paginate } from "./../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchbox";
import { getBooks } from "../services/ebookService";
import { toast, ToastContainer } from 'react-toastify';

class Ebook extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectGenre: null,
    searchQuery: "",
  };

  async componentDidMount() {
    let { data: books } = await getBooks();
    this.setState({ books });
    let genres = getGenres();
    let g = [{ _id: "", name: "All Genres" }, ...genres];
    this.setState({ genres: g });
  }

  handleDelete = async (book) => {
    const orignalBooks = this.state.books;

    let books = this.state.books.filter((b) => b._id !== book._id);
    this.setState({ books });

    try {
      await deleteBook(book._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log(ex);
      }
      else if(ex.response && ex.response.status === 403){
        toast.error('Not Authorized');
      }
      else if(ex.response && ex.response.status === 400){
        toast.error('Not Authorized');
      }
      this.setState({ books: orignalBooks });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectGenre: genre, currentPage: 1, searchQuery: "" });
  };

  getPagedData() {
    const currentGenre = this.state.selectGenre;
    const { books: allBooks, searchQuery, selectGenre } = this.state;

    let filteredBooks = allBooks;
    if (searchQuery) {
      filteredBooks = allBooks.filter((b) =>
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectGenre) {
      filteredBooks =
        currentGenre === "All Genres"
          ? this.state.books
          : this.state.books.filter((b) => b.genre.name === currentGenre);
    }

    const paginatedbooks = Paginate(
      filteredBooks,
      this.state.pageSize,
      this.state.currentPage
    );
    return { paginatedbooks, filteredBooks };
  }

  handleChange = (query) => {
    this.setState({ currentPage: 1, searchQuery: query, selectGenre: null });
  };

  render() {
    const count = this.state.books.length;

    if (count === 0) return <p>There are no books in the database.</p>;

    const {
      paginatedbooks: allbooks,
      filteredBooks: books,
    } = this.getPagedData();
    const { user } = this.props;

    return (
      
      <div className="row">
        <ToastContainer/>
        <div className="col-3">
          <ListGroup
            allGenres={this.state.genres}
            selectGenre={this.state.selectGenre}
            onGenreSelect={this.handleGenreSelect}
            selectedGenre={this.state.selectGenre}
          />
        </div>
        <div className="col">
          <p>Showing {books.length} books in the database.</p>

          {user && (
            <Link className="btn btn-primary mg-2" to="/books/new">
              Add Book
            </Link>
          )}

          <SearchBox
            onChange={this.handleChange}
            value={this.state.searchQuery}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Cost</th>
                <th>Purchased By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allbooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    <Link to={`books/${book._id}`}>{book.title}</Link>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.genre.name}</td>
                  <td>{book.cost}</td>
                  <td>{book.purchasedBy}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(book)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pageSize={this.state.pageSize}
            itemsCount={books.length}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Ebook;
