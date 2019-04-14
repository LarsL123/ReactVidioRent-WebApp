import React, { Component } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {
      username: "Username is required"
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Login form submitted");
  };
  //To use this changeHandler, you need to give the <imput> field a name value
  handleChange = ({ currentTarget: imput }) => {
    const account = { ...this.state.account };
    account[imput.name] = imput.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />

          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
