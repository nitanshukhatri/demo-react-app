import React, { Component } from 'react';
import { connect } from "react-redux";
class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Movies);



