import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ModifyPassword from "./modifyPassword.component";
import FormCard2 from './formCard2'
import TextField from '@material-ui/core/TextField';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }


  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <ModifyPassword currentuser={currentUser} email={currentUser.message.email}/>        
      </div>
    );
  }
}
