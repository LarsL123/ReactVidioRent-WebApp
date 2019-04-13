import React, { Component } from "react";
import "./App.css";
import Movie from "./components/movie";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar />
        <div>
          <Switch>
            <Route path="/movies/:_id?" component={Movie} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
