import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("username", "Username")}
          {this.renderInputField("email", "Email")}
          {this.renderInputField("password", "Password", "password")}

          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
