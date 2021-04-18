import React from "react";
import { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import axios from 'axios';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Home2 from "./components/home2.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import PostSubmitForm from "./components/postSubmitForm.component";
import AllAnswers from "./components/all-answers.component";
import AllQuestions from './components/allquestions.component';
import AdminRegister from "./components/admin-register.component";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ProtectedRoute from "./components/protected-routes.component";
import AllStudents from "./components/all-students.component";
import VerifyAccount from "./components/verify-account.component";
import UserComponent from "./components/Admin/ADMINPANEL";
import AdminDashboard from "./components/Admin/admin-dashboard";
import IFrame from "./components/Admin/components/iframe";

const theme = createMuiTheme({
  palette:{
    primary: {
      main: "#DCDCDC"
    }
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showTeacherBoard: false,
      currentUser: undefined,
      admin:["ROLE_ADMIN"],
      adminTeacher:["ROLE_ADMIN" , "ROLE_TEACHER"],
      allUsers:["ROLE_ADMIN" , "ROLE_TEACHER" , "ROLE_STUDENT"],
      studentAdmin: ["ROLE_STUDENT", "ROLE_ADMIN"]
    };
  }

  componentDidMount() {

    
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.message.roles.includes("ROLE_ADMIN"),
        showTeacherBoard: user.message.roles.includes("ROLE_TEACHER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showAdminBoard: false,
      showTeacherBoard: false
    })
    if (!this.state.currentUser) {  
      return <Redirect to="/home" />;
    }
    this.forceUpdate();
  }

  render() {
     const { currentUser, showAdminBoard, showTeacherBoard, admin, adminTeacher, allUsers, studentAdmin } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Outsmarted
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  <Button color="primary">Accueil</Button>
                </Link>
              </li>

              {(showAdminBoard || showTeacherBoard) && (
                <div>
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      <Button color="primary">Ajouter un quiz</Button>
                    </Link>
                  </li>
                </div> 
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/adminRegister"} className="nav-link">
                    <Button color="primary">Ajouter un compte</Button>
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <div  className="nav-link">
                    <Button className="nav-link" color="primary"><a  href="http://localhost:5050/admin" target="_blank">ADMIN PAGE</a></Button>
                  </div>
                </li>
              )}

              {(showAdminBoard || showTeacherBoard) && (
                <div>
                  <li className="nav-item">
                    <Link to={"/questions"} className="nav-link">
                      <Button color="primary">Page Questions</Button>
                    </Link>
                  </li>
                </div> 
              )}

              {(showAdminBoard || showTeacherBoard) && (
                <div>
                  <li className="nav-item">
                    <Link to={"/answers"} className="nav-link">
                      <Button color="primary">Page Réponses</Button>
                    </Link>
                  </li>
                </div> 
              )}

              {(showAdminBoard || showTeacherBoard) && (
                <div>
                  <li className="nav-item">
                    <Link to={"/students"} className="nav-link">
                      <Button color="primary">Page Etudiants</Button>
                    </Link>
                  </li>
                </div> 
              )}

                {(currentUser && !showTeacherBoard) && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    <Button color="primary">Utilisateur</Button>
                  </Link>
                </li>
                )}

                {showAdminBoard  && (
                <li className="nav-item">
                  <Link to={"/test"} className="nav-link">
                    <Button color="primary">TEST</Button>
                  </Link>
                </li>
                )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <Button color="primary">{currentUser.message.firstname}</Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link" onClick={this.logOut}>
                    <Button color="primary">Déconnexion</Button>
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <Button color="primary">Se connecter</Button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <Button color="primary">Créer un compte</Button>
                  </Link>
                </li>
              </div>
            )}

            </nav>

            <div className="container pt-3">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home2} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/verifyAccount/:token" component={VerifyAccount} />
                <Route exact path="/postSubmitForm" component={PostSubmitForm}/>
                <Route exact path="/iframe" component={IFrame}/>
                <ProtectedRoute exact path="/adminRegister" component={AdminRegister} role={admin}/>
                <ProtectedRoute exact path="/profile" component={Profile} role={allUsers}/>
                <ProtectedRoute exact path="/user" component={BoardUser} role={studentAdmin}/>
                <ProtectedRoute exact path="/questions" component={AllQuestions} role={adminTeacher}/>
                <ProtectedRoute exact path="/answers" component={AllAnswers} role={adminTeacher}/>
                <ProtectedRoute exact path="/students" component={AllStudents} role={allUsers}/>
                <ProtectedRoute exact path="/admin" component={BoardAdmin} role={adminTeacher}/>
                <ProtectedRoute exact path="/test" component={AdminDashboard} role={admin}/>
                <ProtectedRoute  component={Home} />
              </Switch>
            </div>
          

        </div>
      </ThemeProvider>
    );

  }
    
}

export default App;
