import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import FormCard from './formCard'
import TextField from '@material-ui/core/TextField';

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

const vlastname = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 3 et 50 charactères.
      </div>
    );
  }
};

const vfirstname = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 3 et 50 charactères.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit contenir entre 6 et 50 charactères.
      </div>
    );
  }
};
const vpasswordConfirmation = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 3 et 50 charactères.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);

    this.state = {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      password_confirmation: "",
      successful: false,
      message: ""
    };
  }

  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   });
  // }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePasswordConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value
    });
  }
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.password,
        this.state.password_confirmation,
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
          console.log(this.state);
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div >

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>

<FormCard
                  content={
                <div className="formCardContent" style={{padding: "35px", paddingTop:"50px", paddingBottom:"60px", clear: "both" }}>
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
                  <h2>Welcome to the Signup Page</h2>

                  <div style={{marginTop: "20px"}}>
                    <div className="form-group">
                      <label htmlFor="firstname" style={{marginTop: "20px", color:"black"}}><strong>Prenom</strong></label>
                      <TextField
                          size="small"
                          name="firstname"
                          value={this.state.firstname}
                          onChange={this.onChangeFirstname}
                          validations={[required, vfirstname]}
                          variant="outlined"
                          fullWidth
                          required //just adds the asterix
                      />
                    </div>

                    <div className="form-group">  
                      <label htmlFor="lastname" style={{marginTop: "10px", color:"black"}}><strong>Nom</strong></label>
                      <TextField
                            size="small"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.onChangeLastname}
                            validations={[required, vlastname]}
                            variant="outlined"
                            fullWidth
                            required //just adds the asterix
                      />
                    </div>

                    <div className="form-group">    
                      <label htmlFor="email" style={{marginTop: "10px", color:"black"}}><strong>Email</strong></label>
                      <TextField
                            size="small"
                            name="email"
                            onChange={this.onChangeEmail}
                            value={this.state.email}
                            variant="outlined"
                            fullWidth
                            required //just adds the asterix
                            validations={[required, email]}
                      />
                    </div> 

                    <div className="form-group">    
                      <label htmlFor="password" style={{marginTop: "10px", color:"black"}}><strong>Mot de passe</strong></label>
                      <TextField
                            size="small"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, vpassword]}
                            variant="outlined"
                            fullWidth
                            required //just adds the asterix 
                      />
                    </div>

                    <div className="form-group">    
                      <label htmlFor="password_confirmation" style={{marginTop: "10px", color:"black"}}><strong> Confirmer Mot de passe</strong></label>
                      <TextField
                            size="small"
                            name="password_confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.onChangePasswordConfirmation}
                            validations={[required, vpasswordConfirmation]}
                            variant="outlined"
                            fullWidth
                            required //just adds the asterix 
                      />
                    </div>

                  </div>  

                  <div style={{marginTop: "15px", width: "100%"}} className="form-group">
                    <button 
                    className="btnn" style={{backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2","font-size" : "12px", width: "44%"}}
                    disabled={this.state.loading}
                    >
                      {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                      )}
                      SE CONNECTER
                      </button> 
                    <button 
                    className="btnn" 
                    style={{"font-size" : "12px", width: "45%"}} 
                    >
                      CREER EN COMPTE
                      </button>
                  </div>
                </div>
                  }
                  float="right"
                />

                {/* <div className="form-group">
                  <label htmlFor="firstname">Prenom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstname}
                    validations={[required, vfirstname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Nom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChangeLastname}
                    validations={[required, vlastname]}
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
                  <label htmlFor="password">Mot de passe</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirmation">Confirmer Mot de passe</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    value={this.state.password_confirmation}
                    onChange={this.onChangePasswordConfirmation}
                    validations={[required, vpasswordConfirmation]}
                  />
                </div>

                <div className="form-group">
                  <button className="btnn">Créer le compte</button>
                </div> */}
              </div>
            )}

            {/* {this.state.message && (
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
            )} */}
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