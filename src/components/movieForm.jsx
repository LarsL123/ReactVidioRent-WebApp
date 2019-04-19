import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
import Form from "../common/form";
import { Redirect } from "react-router-dom";

class MovieForm extends Form {
  state = {
    data: { title: "", numberInStock: "", rate: "" },
    errors: {},

    movieId: {},
    genreId: {}
  };

  componentDidMount() {
    const { _id } = this.props.match.params;

    if (_id) {
      const movie = getMovie(_id);
      if (!movie) {
        this.props.history.push("/not-found");
        return;
      }

      const { title, numberInStock, dailyRentalRate, genre } = movie;

      this.setState({
        data: {
          title: title,
          numberInStock: numberInStock,
          rate: dailyRentalRate
        },
        movieId: _id,
        genreId: genre._id
      });
    } else {
      const genras = getGenres();
      this.setState({ genreId: genras[0]._id });
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
    const { data, genreId, movieId } = this.state;

    const movie = {
      _id: movieId,
      title: data.title,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.rate,
      genreId: genreId
    };

    saveMovie(movie);
    this.props.history.replace("/movies");
  };

  mapGenras(selectedGneraId) {
    const genras = getGenres().map(g => {
      let h = { value: g._id, label: g.name };
      if (g._id === selectedGneraId) {
        h.selected = true;
      }
      return h;
    });
    return genras;
  }

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
            this.mapGenras(this.state.genreId),
            event => this.setState({ genreId: event.target.value })
          )}

          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
