import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    //Call the server
    console.log("Register form submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("name", "Name")}
          {this.renderInputField("username", "Username")}
          {this.renderInputField("password", "Password", "password")}

          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
