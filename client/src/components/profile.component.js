import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ModifyPassword from "./modifyPassword.component";
import { Redirect } from "react-router-dom"


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showAdminBoard: false,
      showTeacherBoard: false,
    });
    if (!this.state.currentUser) {
      return <Redirect to="/home" />;
    }
  }


  render() {
    const { currentUser } = this.state;



    return (
      <div className="container">
        <ModifyPassword currentuser={currentUser} email={currentUser.message.email} logOut={this.logOut}/>        
      </div>
    );
  }
}
