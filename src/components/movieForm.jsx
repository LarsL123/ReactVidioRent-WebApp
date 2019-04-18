import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
import Form from "../common/form";

class MovieForm extends Form {
  state = {
    data: { title: "", numberInStock: "", rate: "" },
    errors: {},

    genre: {}
  };

  componentDidMount() {
    const { _id } = this.props.match.params;

    if (_id !== undefined) {
      const { title, numberInStock, dailyRentalRate, genre } = getMovie(_id);
      const data = {
        title: title,
        numberInStock: numberInStock,
        rate: dailyRentalRate
      };
      this.setState({ data, genre: genre._id });
    } else {
      const genras = getGenres();
      this.setState({ genre: genras[0]._id });
    }
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .required()
      .label("NumberInStock"),
    rate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    const { data, genre } = this.state;

    const movie = {
      title: data.title,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.rate,
      genreId: genre
    };
    console.log(movie);
    saveMovie(movie);
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("title", "Title")}
          {this.renderInputField("numberInStock", "Numbers in Stock")}
          {this.renderInputField("rate", "Rate")}
          {this.renderSelectInputField(
            "Genres",
            getGenres().map(g => g),
            event => this.setState({ genre: event.target.value })
          )}

          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
