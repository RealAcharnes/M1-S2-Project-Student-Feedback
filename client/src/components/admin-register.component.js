import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ce champ est obligatoire !
            </div>
        );
    }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Adresse email non valide.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 3 et 50 charactères.
      </div>
    );
  }
};


export default class AdminRegister extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

    this.state = {
      username: "",
      email: "",
      admin: false,
      teacher: false,
      roles : [],
      successful: false,
      message: "",
      noRoleError: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCheckbox(e) {
    let target = e.target;
    let value = target.checked;
    let name = target.name;
    this.setState({
        [name]: value,
        noRoleError: false
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (!this.state.admin && !this.state.teacher) {
      return (this.setState({
        noRoleError: true
      }))
    }
    else {
      let roles = this.state.roles;
      if (this.state.admin) {
        roles.push("ROLE_ADMIN");
      }
      if (this.state.teacher) {
        roles.push("ROLE_TEACHER")
      }
      this.setState({
        roles
      })
    }

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.adminRegister(
        this.state.username,
        this.state.email,
        this.state.roles,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      name="teacher"
                      checked={this.state.teacher}
                      onChange={this.onChangeCheckbox}
                    />
                    <label className="form-check-label">
                    Professeur
                    </label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      name="admin"
                      checked={this.state.admin}
                      onChange={this.onChangeCheckbox}
                    />
                    <label className="form-check-label">
                    Administrateur
                    </label>
                  </div>

                  {this.state.noRoleError && 
                    <div className="container">
                      <div className="itsanerror">Vous devez sélectionner au moins un rôle</div>
                    </div>
                  }
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Créer le compte</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}