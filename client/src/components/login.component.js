import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import FormCard from './formCard'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
          this.props.history.push("/profile");
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
            message: resMessage,
            open: true
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
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
                // <div className="form-group">
                //   <div className="alert alert-danger" role="alert">
                //     {this.state.message}
                //   </div>
                // </div>
                <Snackbar anchorOrigin={{ vertical :'center', horizontal: 'center' }}open={this.state.open} autoHideDuration={6000} onClose={()=>this.handleClose()}>
                  <Alert onClose={()=>this.handleClose()} severity={this.state.successful ? "success" : "warning" }>
                    {this.state.message}
                  </Alert>
                </Snackbar>
              )}
              <h2 style={{marginTop: "30px"}}>Bienvenue sur la page de connexion</h2>
              <p>C'est génial que tu sois de retour</p>

              <div style={{marginTop: "50px"}}>
                <label htmlFor="email" style={{marginTop: "30px", color:"black"}}><strong>Email de l'utilisateur</strong></label>
                <input
                      type="email"
                      size="small"
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      variant="outlined"
                      className="form-control"
                      required 
                  />
                <label htmlFor="password" style={{marginTop: "30px", color:"black"}}><strong>Mot de passe</strong></label>
                <input
                      type="password"
                      size="small"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      variant="outlined"
                      fullWidth
                      required 
                      className="form-control" 
                  />
                </div>  
                <div>
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

            </div>

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