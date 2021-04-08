import React, { Component } from "react";
import SearchService from "../services/search.service";

import Input from "react-validation/build/input";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ce champ est obligatoire !
            </div>
        );
    }
};

const vsearch = value => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 6 charactères.
      </div>
    );
  }
};

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {
      content: "",
      search: "",
      successful: false,
      message: "",
    };
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  handleSearch(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    // this.form.validateAll();

      SearchService.searchQuiz(
        this.state.search,
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

  componentDidMount() {
    // UserService.getUserBoard().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );
  }

  render() {
    return (
      
      <div className="col-md-12">
        <div className="card card-container">
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="search">Search for Quiz</label>
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChangeSearch}
                    validations={[required, vsearch]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block"  onClick={this.handleSearch}>Search Quiz</button>
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

        </div>
      </div>
    );
  }
}