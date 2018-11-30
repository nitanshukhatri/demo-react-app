import React, { Component } from 'react';
import { connect } from "react-redux";
import { getMovies } from '..//../_services/fakeMovie.service';
class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = { movies: getMovies() };
  }
  render() {
    return <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genere</th>
          <th>Stock</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {this.state.movies.map(movie => (
          <tr>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
          </tr>
        ))}

      </tbody>
    </table>
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Movies);



