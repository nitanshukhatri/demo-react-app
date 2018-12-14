import React from "react";
import Form from "../../common/Form";
import { create } from '../../_actions/movies.actions';
import { connect } from 'react-redux';
import Joi from 'joi-browser';

class CreateMovie extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      stock: 0,
      rate: 0
    },
    submitted: false,
    errors: {}
  }

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    stock: Joi.number().required().label('Stock'),
    rate: Joi.number().required().label('Rate')
  };

  doSubmit = () => {
    this.setState({ submitted: true });
    const { data } = this.state;
    const { dispatch } = this.props;
    this.props.createMovie(data);
    this.props.history.push('/dashboard/movies');


    // if (data.username && data.password) {
    //   dispatch(userActions.login(data.username, data.password));
    // }
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();

  // }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Create Movie</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("stock", "NumberInStock")}
          {this.renderInput("rate", "DailyRentalRate")}
          <div className="form-group">{this.renderButton("Submit")}</div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMovie: (movie) => dispatch(create(movie))
  }
}

export default connect(null, mapDispatchToProps)(CreateMovie);
