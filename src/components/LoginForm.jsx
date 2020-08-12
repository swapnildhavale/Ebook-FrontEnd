import React from "react";
import Joi from "joi-browser";
import Form from './common/form';
import { loginUser, getCurrentUser } from './../services/auth';
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit=async ()=>{
    const {username,password}=this.state.data;
    const user={}
    user.email=username;
    user.password=password;
    try{
      await loginUser(user);

      const {state}=this.props.location;
      window.location=state?state.from.pathname:'/';
    }
    catch(ex){
      if(ex.response && ex.response.status===400){
        const errors={...this.state.errors}
        errors.username=ex.response.data;
        this.setState({errors});
    }
    }
  }

  render() {
    if(getCurrentUser()) return <Redirect to='/'/>

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username','Username','text',true)}
          {this.renderInput('password','Password','password',false)}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
