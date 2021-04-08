import React, { Component } from "react";
import AuthService from "../services/auth.service";

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
        <header className="jumbotron">
          <h3>
          Profile : <strong>{currentUser.message.firstname}{' '}{currentUser.message.lastname}</strong> 
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.message._id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.message.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.message.roles &&
            currentUser.message.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}