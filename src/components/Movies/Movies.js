import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../_services/fakeMovie.service";
import Pagination from "../../common/Pagination";
import { paginate } from "../../utils/paginate";
import { getGenres } from "../../_services/fakeGenre.service";
import ListGroup from "../../common/listGroup";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      movies: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: {}
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
    this.setState({ selectedGenre: genre });
  };

  componentDidMount() {
    this.setState({ genres: getGenres(), movies: getMovies() });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies, selectedGenre } = this.state;
    if (count === 0) return <p>There are no movies in database</p>;

    const filtered = selectedGenre
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;

    const localMovies = paginate(filtered, currentPage, pageSize);
    console.log(filtered);

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
          <p> Showing {count} movies </p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genere</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>
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
            </tbody>
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
