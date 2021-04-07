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
import AllAnswers from "./components/all-answers.component";
import AllQuestions from './components/allquestions.component';

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
        showAdminBoard: "ROLE_ADMIN",
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
              <div>
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Tableau Administrateur
                  </Link>
                </li>
               </div> 
             )}

            {showAdminBoard && (
              <div>
                <li className="nav-item">
                  <Link to={"/questions"} className="nav-link">
                    Questions Page
                  </Link>
                </li>
               </div> 
             )}

            {showAdminBoard && (
              <div>
                <li className="nav-item">
                  <Link to={"/answers"} className="nav-link">
                    Answers Page
                  </Link>
                </li>
               </div> 
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

          <div className="container mt-3">
           <Switch>
             <Route exact path="/home" component={Home} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/register" component={Register} />
             <Route exact path="/profile" component={Profile} />
             <Route path="/user" component={BoardUser} />
             <Route path="/questions" component={AllQuestions} />
             <Route path="/answers" component={AllAnswers} />
             <Route path="/admin" component={BoardAdmin} />
             <Route path="/postSubmitForm" component={PostSubmitForm} />
           </Switch>
         </div>

      </div>
    );

  }
    
}

export default App;