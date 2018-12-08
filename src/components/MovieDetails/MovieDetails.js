import React from 'react';
import queryString from 'query-string';

class MovieDetails extends React.Component {
  render() {
    const { location } = this.props;
    const result = queryString.parse(location.search);

    return (
      <div>
        MovieDetails -{this.props.match.params.id}
        Query Parms - {}
      </div>
    );
  }
}

export default MovieDetails;
