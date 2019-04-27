import React from "react";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Joi from "joi-browser";
import Form from "../common/form";

class MovieForm extends Form {
  state = {
    data: {
      _id: " ",
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: ""
    },
    allGenres: [{ _id: null, name: "" }],
    errors: {}
  };

  async populateGenres() {
    const allGenres = await getGenres();
    this.setState({ allGenres });
  }

  async populateMovie() {
    try {
      const { _id } = this.props.match.params;
      if (_id === "new") return;

      const { data: movie } = await getMovie(_id);
      this.setState({ data: this.modelToView(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  modelToView(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id
    };
  }

  schema = {
    _id: Joi.string().optional(),
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .required()
      .label("NumberInStock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Rate"),
    genreId: Joi.string()
      .min(1)
      .required()
      .label("Genre id")
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  mapGenras(selectedGenraId) {
    const genras = this.state.allGenres.map(g => {
      let h = { value: g._id, label: g.name };

      if (g._id === selectedGenraId) {
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
          {this.renderInputField("dailyRentalRate", "Rate")}
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

export default MovieForm;
