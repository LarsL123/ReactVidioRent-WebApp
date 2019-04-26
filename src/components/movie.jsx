import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import Pagination from "../common/pagination";
import ListGroup from "./genres";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchValue: ""
  };

  async componentDidMount() {
    const rawGenres = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...rawGenres];
    console.log(genres);

    const movies = await getMovies();

    this.setState({ genres, movies, selectedGenre: genres[0] });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    //Not needed. Dont know why he has it
    //movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchValue: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = searchString => {
    this.setState({
      searchValue: searchString,
      currentPage: 1,
      selectedGenre: null
    });
  };

  search(movies) {
    return movies.filter(m =>
      m.title.toLowerCase().startsWith(this.state.searchValue.toLowerCase())
    );
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchValue
    } = this.state;

    let filteredMovies;

    if (searchValue === "") {
      filteredMovies =
        selectedGenre && selectedGenre._id
          ? allMovies.filter(m => m.genre._id === selectedGenre._id)
          : allMovies;
    } else {
      filteredMovies = this.search(allMovies);
    }

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (allMovies.length === 0) {
      return <p>There are no movies in the database</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();

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
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <div>
            <h6> There are {totalCount} movies</h6>
          </div>

          <SearchBox
            value={this.state.searchValue}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
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
