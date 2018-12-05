import React from 'react';

class MovieDetails extends React.Component {
  render() {
    return (
      <div>
        MovieDetails -{this.props.match.params.id}
      </div>
    );
  }
}

export default MovieDetails;
