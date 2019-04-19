import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
import Form from "../common/form";

class MovieForm extends Form {
  state = {
    data: { movieId: " ", title: "", numberInStock: "", rate: "", genreId: "" },
    errors: {}
  };

  componentDidMount() {
    const { _id } = this.props.match.params;

    if (_id === "new") {
      return;
    }

    const movie = getMovie(_id);
    if (!movie) {
      return this.props.history.replace("/not-found");
    }

    this.setState({ data: this.modelToView(movie) });
  }

  modelToView(movie) {
    return {
      movieId: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate,
      genreId: movie.genre._id
    };
  }

  schema = {
    movieId: Joi.string(),
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
      .label("Rate"),
    genreId: Joi.string()
      .min(1)
      .required()
      .label("Genre id")
  };

  doSubmit = () => {
    const { movieId, title, numberInStock, rate, genreId } = this.state.data;

    const movie = {
      _id: movieId,
      title: title,
      numberInStock: numberInStock,
      dailyRentalRate: rate,
      genreId: genreId
    };

    saveMovie(movie);
    this.props.history.push("/movies");
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
            "genreId",
            "Genres",
            this.mapGenras(this.state.genreId)
          )}

          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

//,event => this.setState({ genreId: event.target.value });

export default MovieForm;
