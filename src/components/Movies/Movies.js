import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../_services/fakeMovie.service";
import Pagination from "../../common/Pagination";
import { paginate } from "../../utils/paginate";
import { getGenres } from "../../_services/fakeGenre.service";
import ListGroup from "../../common/listGroup";
import _ from "lodash";

import TableHeader from "../../common/TableHeader";
import TableBody from "../../common/TableBody";
import { Link } from "react-router-dom";
import SearchBox from "../../common/SearchBox";

import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

import withLoader from "../../hoc/WithLoader";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        path: "title",
        label: "Title",
        content: movie => (
          <Link to={`/dashboard/movie-details/${movie.id}`}>{movie.title}</Link>
        )
      },
      { path: "genre", label: "Genre" },
      { path: "stock", label: "NumberInStock" },

      { path: "rate", label: "DailyRentalRate" },
      // {
      //   key: "createdAt",
      //   content: movie => (
      //     <p>
      //       {moment(new Date())}
      //     </p>
      //   ), label: "createdAt"
      // },
      {
        key: "delete",
        content: movie => (
          <button
            onClick={() => this.handleDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      },

      {}
    ];
    this.state = {
      genres: [],
      movies: [],
      pageSize: 4,
      currentPage: 1,
      searchQuery: "",
      selectedGenre: null,
      sortColumn: { path: "", order: "" }
    };
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m.id !== movie.id);
    this.setState({ movies: movies });
  };

  handleOnPageChange = (e, page) => {
    e.preventDefault();
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ selectedGenre: [], searchQuery: query, currentPage: 1 });
  };

  handleSort = col => {
    this.setState({ sortColumn: col });
  };

  componentDidMount() {
    const genres = [{ name: "All Generes", _id: "" }, ...getGenres()];
    this.setState({ genres: genres });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies) {
      this.setState({
        movies: nextProps.movies
      });
    }
  }

  getPagedData() {
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    let filtered = movies;

    if (searchQuery) {
      filtered = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      // filtered = movies.filter(m => m.genre._id === selectedGenre._id);
      //filtered = this.props.movies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const localMovies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: localMovies };
  }

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in database</p>;
    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <Link to="/dashboard/movies/create-movie">CreateMovies</Link>
        <SearchBox onChange={this.handleSearch} />
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p> Showing {totalCount} movies </p>
          <table className="table">
            <TableHeader
              columns={this.columns}
              sortColumn={this.state.sortColumn}
              onSort={this.handleSort}
            />
            <TableBody columns={this.columns} data={data} />
          </table>
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={(e, page) => this.handleOnPageChange(e, page)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.firestore.ordered.movies
  };
}
const mapDispacthToProps = dispatch => {};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "movies" }])
)(Movies);
//export default Movies;
