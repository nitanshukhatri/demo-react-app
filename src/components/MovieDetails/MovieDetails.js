import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class MovieDetails extends React.Component {
  render() {
    const { location, movie } = this.props;
    const result = queryString.parse(location.search);
    if (movie) {
      return (<div className="container section">
        <div className="card-content">
          <div className="card-title">MovieDetails -{movie.title}</div>
          Query Parms - {}
        </div>
      </div>);
    } else {
      return (
        <div className="container center">
          <p>Loading Movie...</p>
        </div>
      )
    }


  }
}
const mapStateToProps = (state, ownprops) => {
  const id = ownprops.match.params.id;
  const movies = state.firestore.data.movies;
  const movie = movies ? movies[id] : null;
  return {
    movie: movie
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'movies' }
  ])
)(MovieDetails);
