import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Movie from "./components/movie";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MoviesFormes from "./components/moviesForms";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <div>
            <Switch>
              <Route path="/movies/:_id" component={MoviesFormes} />
              <Route path="/movies" component={Movie} />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
      </React.Fragment>
    );
  }
}

export default App;
