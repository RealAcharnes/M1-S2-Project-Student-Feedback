import React from "react";
import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import axios from 'axios';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import PostSubmitForm from "./components/postSubmitForm.component";
import AdminRegister from "./components/admin-register.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
     const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
         <nav className="navbar navbar-expand navbar-dark bg-dark">
           <Link to={"/"} className="navbar-brand">
             Outsmarted
           </Link>
           <div className="navbar-nav mr-auto">
             <li className="nav-item">
               <Link to={"/home"} className="nav-link">
                 Accueil
               </Link>
             </li>

             {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Tableau Administrateur
                  </Link>
                </li>
             )}

             {showAdminBoard && (
               <li className="nav-item">
                 <Link to={"/adminRegister"} className="nav-link">
                   Ajouter un compte
                 </Link>
               </li>
             )}

              {currentUser && (
               <li className="nav-item">
                 <Link to={"/user"} className="nav-link">
                   Utilisateur
                 </Link>
               </li>
              )}
           </div>

           {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Déconnexion
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Se connecter
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Créer un compte
                </Link>
              </li>
            </div>
          )}

          </nav>

          
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/adminRegister" component={AdminRegister} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/postSubmitForm" component={PostSubmitForm} />
          </Switch>
          
         

      </div>
    );

  }
    
}

export default App;