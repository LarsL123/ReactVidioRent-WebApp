import React from "react";

const MoviesFormes = ({ match, history }) => {
  return (
    <div>
      <h1>Movie id: {match.params._id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MoviesFormes;
