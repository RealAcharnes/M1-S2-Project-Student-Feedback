import axios from "axios";

const API_URL = "https://neuroeducation-feedback.herokuapp.com/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        console.log(response.data);

        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, email, password, password_confirmation) {
    return axios.post(API_URL + "signup", {
      firstname, 
      lastname, 
      email, 
      password, 
      password_confirmation
    });
  }

  adminRegister(firstname, lastname, email, roles) {
    return axios
    .post(API_URL + "signup", {
      firstname,
      lastname,
      email,
      roles
    });
  }

  changePassword(email, old_password, password, password_confirmation) {
    return axios
    .post(API_URL + "changePassword", {
      email, 
      old_password, 
      password, 
      password_confirmation
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
