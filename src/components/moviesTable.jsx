import React, { useState, useEffect } from "react";
import Like from "../common/like";
import Table from "../common/table";
import Link from "react-router-dom/Link";
import auth from "../services/authService";

const MoviesTable = props => {
  const [columns, setColumns] = useState(null);

  //Create columns:
  useEffect(() => {
    let newColumns = [
      {
        key: "title",
        label: "Title",
        content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => (
          <Like clicked={movie.liked} onClick={() => props.onLike(movie)} />
        )
      }
    ];

    const deleteColumn = {
      key: "delete",
      content: movie => (
        <button
          onClick={() => props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    };

    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      newColumns.push(deleteColumn);
    }
    setColumns(newColumns);
  }, []);

  const { movies, sortColumn, onSort } = props;

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};
// class MoviesTable extends Component {
//   columns = [
//     {
//       key: "title",
//       label: "Title",
//       content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
//     },
//     { path: "genre.name", label: "Genre" },
//     { path: "numberInStock", label: "Stock" },
//     { path: "dailyRentalRate", label: "Rate" },
//     {
//       key: "like",
//       content: movie => (
//         <Like clicked={movie.liked} onClick={() => this.props.onLike(movie)} />
//       )
//     }
//   ];

//   deleteColumn = {
//     key: "delete",
//     content: movie => (
//       <button
//         onClick={() => this.props.onDelete(movie)}
//         className="btn btn-danger btn-sm"
//       >
//         Delete
//       </button>
//     )
//   };

//   //Equal to component did mount
//   // useEffect(()=> {
//   //
//   // }, [])

//   constructor() {
//     super();
//     const user = auth.getCurrentUser();
//     if (user && user.isAdmin) {
//       this.columns.push(this.deleteColumn);
//     }
//   }

//   render() {
//     const { movies, sortColumn, onSort } = this.props;

//     return (
//       <Table
//         columns={this.columns}
//         data={movies}
//         sortColumn={sortColumn}
//         onSort={onSort}
//       />
//     );
//   }
// }

export default MoviesTable;
