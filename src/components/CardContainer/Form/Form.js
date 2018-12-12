import React from "react";
import Axios from "axios";
import type { AxiosPromise } from "axios";

type FormState = {
  username: string
};
class Form extends React.Component<any, FormState> {
  state = { username: "" };
  handleSubmit = (event: any) => {
    event.preventDefault();
    Axios.get(`https://api.github.com/users/${this.state.username}`).then(
      res => {
        this.props.onSubmit(res.data);
        this.setState({ username: "" });
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="github username"
          value={this.state.username}
          onChange={event => this.setState({ username: event.target.value })}
        />
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

export default Form;
