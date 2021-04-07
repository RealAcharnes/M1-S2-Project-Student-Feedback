import axios from "axios";

const API_URL = "https://connect-dublin.heroku.com/api/v3";

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

  adminRegister(username, email, roles) {
    return axios.post(API_URL + "adminsignup", {
      username,
      email,
      roles
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
