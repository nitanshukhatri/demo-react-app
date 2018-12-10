import React from "react";
import Form from "../../common/Form";

class CreateMovie extends Form {
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Create Movie</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("number", "NumberInStock")}
          {this.renderInput("dailyRate", "DailyRentalRate")}
          <div className="form-group">{this.renderButton("Submit")}</div>
        </form>
      </div>
    );
  }
}

export default CreateMovie;
