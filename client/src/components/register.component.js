import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import FormCard from './formCard'
import AuthService from "../services/auth.service";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const required = (value) => {
  if (!value) {
      return (
        <Alert  severity={"warning"}>
        Ce champ est obligatoire !
        </Alert>
      );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <Alert  severity={"warning"}>
      Adresse email non valide.
      </Alert>
    );
  }
};

const vlastname = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <Alert  severity={"warning"}>
      Le nom d'utilisateur doit contenir entre 3 et 50 charactères.
      </Alert>
    );
  }
};

const vfirstname = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <Alert  severity={"warning"}>
        Le nom d'utilisateur doit contenir entre 3 et 50 charactères.    
      </Alert>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 50) {
    return (
      <Alert  severity={"warning"}>
      Le mot de passe doit contenir entre 6 et 50 charactères.
      </Alert>
    );
  }
};
const vpasswordConfirmation = value => {
  if (value.length < 6 || value.length > 50) {
    return (
      <Alert  severity={"warning"}>
      Le mot de passe doit contenir entre 6 et 50 charactères.
      </Alert>
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
      message: "",
      open: false
    };
  }

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
            successful: true,
            open: true
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
            message: resMessage,
            open : true
          });
        }
      );
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    })
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
                      <Snackbar anchorOrigin={{ vertical :'center', horizontal: 'center' }}open={this.state.open} autoHideDuration={6000} onClose={()=>this.handleClose()}>
                      <Alert onClose={()=>this.handleClose()} severity={this.state.successful ? "success" : "warning" }>
                        {this.state.message}
                      </Alert>
                    </Snackbar>
                  )}
                  <h2>Bienvenue sur la page d'inscription</h2>

                  <div style={{marginTop: "20px"}}>
                    <div className="form-group">
                      <label htmlFor="firstname" style={{marginTop: "20px", color:"black"}}><strong>Prenom</strong></label>
                      <Input
                          type="text"
                          size="small"
                          name="firstname"
                          value={this.state.firstname}
                          onChange={this.onChangeFirstname}
                          validations={[required, vfirstname]}
                          className="form-control"
                          required 
                      />
                    </div>

                    <div className="form-group">  
                      <label htmlFor="lastname" style={{marginTop: "10px", color:"black"}}><strong>Nom</strong></label>
                      <Input
                            type="text"
                            size="small"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.onChangeLastname}
                            validations={[required, vlastname]}
                            className="form-control"
                            required 
                      />
                    </div>

                    <div className="form-group">    
                      <label htmlFor="email" style={{marginTop: "10px", color:"black"}}><strong>Email</strong></label>
                      <Input
                            type="email"
                            size="small"
                            name="email"
                            onChange={this.onChangeEmail}
                            value={this.state.email}
                            className="form-control"
                            required 
                            validations={[required, email]}
                      />
                    </div> 

                    <div className="form-group">    
                      <label htmlFor="password" style={{marginTop: "10px", color:"black"}}><strong>Mot de passe</strong></label>
                      <Input
                            type="password"
                            size="small"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, vpassword]}
                            className="form-control"
                            required  
                      />
                    </div>

                    <div className="form-group">    
                      <label htmlFor="password_confirmation" style={{marginTop: "10px", color:"black"}}><strong> Confirmer Mot de passe</strong></label>
                      <Input
                            type="password"
                            size="small"
                            name="password_confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.onChangePasswordConfirmation}
                            validations={[required, vpasswordConfirmation]}
                            className="form-control"
                            required  
                      />
                    </div>

                  </div>  

                  <div style={{marginTop: "15px", width: "100%"}} className="form-group">
                    <button
                    onClick={() =>  this.props.history.push({
                      pathname: "/login",
                    })} 
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