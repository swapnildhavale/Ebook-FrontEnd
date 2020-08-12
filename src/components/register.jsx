import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { registerUser } from './../services/usersService';
import { loginWithJwt } from "../services/auth";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
      const {username,password,name}=this.state.data
    const user={};
    user.password=password;
    user.email=username;
    user.name=name;
    try{
       const response= await registerUser(user);
       loginWithJwt(response.headers['x-auth-token']);
       window.location='/';
    }
    catch(ex){
        if(ex.response && ex.response.status===400){
            const errors={...this.state.errors}
            errors.username=ex.response.data;
            this.setState({errors});
        }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
