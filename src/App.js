import "./App.css";
import React, { Component } from "react";
import Ebook from "./components/ebookTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customer from "./components/customer";
import Register from "./components/register";
import NotFoundPage from "./components/common/notfound";
import LoginForm from "./components/LoginForm";
import BookForm from "./components/BookForm";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/auth";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const {user}=this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute
              path="/books/:id"
              component={BookForm}
            />
            <Route
              render={(props) => <Ebook {...props} user={this.state.user} />}
              path="/books"
            />
            <Route component={LoginForm} path="/login" />
            <Route component={Logout} path="/logout" />
            <Route component={Customer} path="/customer" />
            <Route component={Register} path="/register" />
            <Route component={NotFoundPage} path="/not-found" />
            <Redirect from="/" exact to="/books" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
