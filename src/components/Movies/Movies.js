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

class Movies extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        path: "title",
        label: "Title",
        content: movie => (
          <Link to={`/dashboard/movie-details/${movie._id}`}>
            {movie.title}
          </Link>
        )
      },
      { path: "genre.column", label: "Genre" },
      { path: "numberInStock", label: "NumberInStock" },
      { path: "dailyRentalRate", label: "DailyRentalRate" },
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
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleOnPageChange = (e, page) => {
    e.preventDefault();
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ selectedGenre: [], searchQuery: query, currentPage: 1 });
  };

  handleSort = col => {
    console.log(col);
    // const sortColumn = { ...this.state.sortColumn };
    // if (sortColumn.path === path) {
    //   sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    // } else {
    //   sortColumn.path = path;
    //   sortColumn.order = 'asc';
    // }
    this.setState({ sortColumn: col });
  };

  componentDidMount() {
    const genres = [{ name: "All Generes", _id: "" }, ...getGenres()];
    this.setState({ genres: genres, movies: getMovies() });
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
      filtered = movies.filter(m => m.genre._id === selectedGenre._id);
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

// function mapStateToProps(state) {
//   return {};
// }

//export default connect(mapStateToProps)(Movies);
export default Movies;
