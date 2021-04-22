import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import FormCard from './formCard'
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from "react-router-dom"


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire !
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
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

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        


        <div >
            
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">

            <FormCard
              content={
            <div className="formCardContent" style={{padding: "35px", paddingTop:"70px", paddingBottom:"60px"}}>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <h2 style={{marginTop: "30px"}}>Bienvenue sur la page de connexion</h2>
              <p>C'est génial que tu sois de retour</p>

              <div style={{marginTop: "50px"}}>
                {/* <FormLabel style={{marginTop: "30px", color:"black"}}><strong >Email</strong></FormLabel> */}
                <label htmlFor="email" style={{marginTop: "30px", color:"black"}}><strong>Email de l'utilisateur</strong></label>
                <TextField
                      size="small"
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      variant="outlined"
                      fullWidth
                      required //just adds the asterix
                  />
                {/* <FormLabel style={{marginTop: "30px", color:"black"}}><strong >Password</strong></FormLabel> */}
                <label htmlFor="password" style={{marginTop: "30px", color:"black"}}><strong>Mot de passe</strong></label>
                <TextField
                      type="password"
                      size="small"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      variant="outlined"
                      fullWidth
                      required //just adds the asterix
                      
                  />
                </div>  
                <div>
                {/* <span style={{float:"left", marginTop: "30px", marginBottom: "30px"}}>Remember me?</span> */}
                <span style={{width: "100%", float:"right", marginTop: "30px", marginBottom: "30px"}}>Mot de passe oublié ?</span>
                </div>
                <div style={{marginTop: "15px", width: "100%"}}>
                  <button 
                  className="btnn" style={{"font-size" : "12px", width: "45%"}}
                  disabled={this.state.loading}
                  >
                    {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                    SE CONNECTER
                    </button>
                  <button
                  onClick={() =>  this.props.history.push({
                       pathname: "/register",
                     })}
                  className="btnn" 
                  style={{"font-size" : "12px", backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2", width: "45%"}}>CREER EN COMPTE</button>
                </div>
            </div>
              }
              float="left"
            />

              {/* <label htmlFor="email">Email de l'utilisateur</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
              /> */}
            </div>

            {/* <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div> */}
{/* 
            <div className="form-group">
              <button
                className="btnn"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Se connecter</span>
              </button>
            </div> */}
{/* 
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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