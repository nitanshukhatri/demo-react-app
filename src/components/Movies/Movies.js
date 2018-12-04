import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../_services/fakeMovie.service";
import Pagination from "../../common/Pagination";
import { paginate } from "../../utils/paginate";
import { getGenres } from "../../_services/fakeGenre.service";
import ListGroup from "../../common/listGroup";
import _ from 'lodash';

import TableHeader from '../../common/TableHeader';
import TableBody from '../../common/TableBody';
class Movies extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      { path: 'title', label: 'Title' },
      { path: 'genre.column', label: 'Genre' },
      { path: 'numberInStock', label: 'NumberInStock' },
      { path: 'dailyRentalRate', label: 'DailyRentalRate' },
      { key: 'delete', content: movie => (<button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>) },
      {}

    ];
    this.state = {
      genres: [],
      movies: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: null,
      sortColumn: { path: '', order: '' }
    };
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleOnPageChange = (e, page) => {
    e.preventDefault();
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.setState({ sortColumn: sortColumn });
  }

  componentDidMount() {
    const genres = [{ name: 'All Generes', _id: '' }, ...getGenres()]
    this.setState({ genres: genres, movies: getMovies() });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies, selectedGenre, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in database</p>;

    const filtered = selectedGenre && selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const localMovies = paginate(sorted, currentPage, pageSize);


    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p> Showing {filtered.length} movies </p>
          <table className="table">
            <TableHeader columns={this.columns} sortColumn={this.state.sortColumn}></TableHeader>
            <TableBody columns={this.columns} data={movies}></TableBody>
            {/* <thead>
              <tr>
                <th onClick={() => this.handleSort('title')}>Title</th>
                <th onClick={() => this.handleSort('genre.name')}>Genere</th>
                <th onClick={() => this.handleSort('numberInStock')}>Stock</th>
                <th onClick={() => this.handleSort('dailyRentalRate')}>Rate</th>
                <th />
              </tr>
            </thead> */}
            {/* <tbody>
              {localMovies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={(e, page) => this.handleOnPageChange(e, page)}
          />
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {};
// }

//export default connect(mapStateToProps)(Movies);
export default Movies;
