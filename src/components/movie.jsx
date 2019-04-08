import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "./../services/fakeGenreService";
import Pagination from "../common/pagination";
import ListGroup from "./genres";
import MovieTable from "./moviesTable";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ genres, movies: getMovies(), selectedGenre: genres[0] });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    //Not needed. Dont know why he has it
    //movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handledelete = index => {
    const movies = this.state.movies.filter((c, i) => i !== index);
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = path => {
    this.setState({ sortColumn: { path, order: "asc" } });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre
    } = this.state;

    if (allMovies.length === 0) {
      return <p>Ther are no movies in the database</p>;
    }

    let filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelected={this.handleGenreChange}
            items={genres}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <h6> There are {filteredMovies.length} movies</h6>

          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handledelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
