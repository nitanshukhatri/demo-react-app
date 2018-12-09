import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router";
import { history } from "../_helpers/history";
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    } else {
      return _.get(item, column.path);
    }
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  handleRedirect = item => {
    // console.log(item);
    //history.push('/movie/' + item._id);
    // return (<Redirect to={`/movie/${item._id}`}></Redirect>);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id} onClick={() => this.handleRedirect(item)}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
