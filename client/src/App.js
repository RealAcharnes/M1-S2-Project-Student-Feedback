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
import AdminDashboard from "./components/Admin/admin-dashboard";
import TemporaryDrawer from "./components/navbar";

import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
        navList : [
        // {
        //   title : "Accueil",
        //   link : '/home'
        // },
        (user && !user.message.roles.includes("ROLE_TEACHER")) && {
          title : "Utilisateur",
          link : '/user',
          icon: <FindInPageIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        },
        (user.message.roles.includes("ROLE_ADMIN") || user.message.roles.includes("ROLE_TEACHER") ) && {
          title : "Ajouter un Quiz",
          link : '/addQuiz',
          icon: <AddBoxIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        },
        (user.message.roles.includes("ROLE_ADMIN") || user.message.roles.includes("ROLE_TEACHER"))  && {
          title : "Page Questions",
          link : '/questions',
          icon: <SupervisorAccountIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        },
        (user.message.roles.includes("ROLE_ADMIN") || user.message.roles.includes("ROLE_TEACHER"))  && {            
          title : "Page Reponses",
          link : '/answers',
          icon: <AssignmentIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        },
        (user.message.roles.includes("ROLE_ADMIN") || user.message.roles.includes("ROLE_TEACHER"))  && {            
          title : "Page Etudiants",
          link : '/students',
          icon: <RecentActorsIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        },
        user.message.roles.includes("ROLE_ADMIN")  && {
          title : "Admin Dashboard",
          link : '/dashboard',
          icon: <DashboardIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        }

        
      ],
      actions : [user &&  {
          title : (user.message.firstname),
          link : '/profile',
          onclick : '',
          icon: <AccountCircleIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        },
        user &&  {
          title : "Deconnecion",
          link : '/home',
          onclick : this.logOut,
          icon: <ExitToAppIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
        }
      ]
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
  }

  render() {
    //  const { currentUser, showAdminBoard, showTeacherBoard, admin, adminTeacher, allUsers, student, navList } = this.state;
    const { currentUser, admin, adminTeacher, allUsers, studentAdmin, navList } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <nav className="navbar navbar-expand navbar-dark " style={{background:'#4257b2'}}>
            
            {currentUser && 
              <TemporaryDrawer lists = {navList} actions={this.state.actions}></TemporaryDrawer>
              }

            <Link to={"/"} className="navbar-brand">
              Outsmarted
            </Link>
            
            {/* <div className="navbar-nav mr-auto">
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
                    <Button color="primary">Répondre à un quiz</Button>
                  </Link>
                </li>
                )}

                {showAdminBoard  && (
                <li className="nav-item">
                  <Link to={"/dashboard"} className="nav-link">
                    <Button color="primary">TEST</Button>
                  </Link>
                </li>
                )}
            </div> */}

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <Button color="primary" style={{textTransform: "none"}}><AccountCircleIcon style={{color:"white",  float:"right"}} fontSize="large" />{currentUser.message.firstname}</Button>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={"/home"} className="nav-link" onClick={this.logOut}>
                    <Button color="primary">Déconnexion</Button>
                  </Link>
                </li> */}
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <Button color="primary" style={{textTransform: "none"}}>Se Connecter</Button>
                  </Link>
                </li>
                

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <Button color="primary" style={{textTransform: "none", font:"Robotto"}}>Créer un Compte</Button>
                  </Link>
                </li>
              </div>
            )}

            </nav>

            <div className="container pt-3">
              <Switch>
                <Route exact path="/" component={Home2} />
                <Route exact path="/home" component={Home2} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/verifyAccount/:token" component={VerifyAccount} />
                <Route exact path="/postSubmitForm" component={PostSubmitForm}/>
                <ProtectedRoute exact path="/adminRegister" component={AdminRegister} role={admin}/>
                <ProtectedRoute exact path="/profile" component={Profile} role={allUsers}/>
                <ProtectedRoute exact path="/user" component={BoardUser} role={studentAdmin}/>
                <ProtectedRoute exact path="/questions" component={AllQuestions} role={adminTeacher}/>
                <ProtectedRoute exact path="/answers" component={AllAnswers} role={adminTeacher}/>
                <ProtectedRoute exact path="/students" component={AllStudents} role={allUsers}/>
                <ProtectedRoute exact path="/addQuiz" component={BoardAdmin} role={adminTeacher}/>
                <ProtectedRoute exact path="/dashboard" component={AdminDashboard} role={admin}/>
                <ProtectedRoute  component={Home} />
              </Switch>
            </div>
          

        </div>
      </ThemeProvider>
    );

  }
    
}

export default App;
