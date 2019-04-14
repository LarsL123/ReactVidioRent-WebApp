import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Movie from "./components/movie";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MoviesFormes from "./components/moviesForms";
import LoginForm from "./components/loginForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:_id" component={MoviesFormes} />
            <Route path="/movies" component={Movie} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
