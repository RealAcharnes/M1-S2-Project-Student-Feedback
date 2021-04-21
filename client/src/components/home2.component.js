import React, { Component } from "react";

export default class Home2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    this.setState({
      title: "Bienvenue dans votre application de Neuroéducation",
      description: "Cette application permet aux élèves de prendre conscience de leurs stratégies de réussite et des potentielles origines de leurs erreurs"
    })
  }

  render() {
    return (
        <div>
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.title}</h3>
                </header>
            </div>
            <div className="container">
                <h5>{this.state.description}</h5>
                <div className="img-container">
                  <img className="person-img" src="/brain-storming.png" alt="students brainstorming"/>
                </div>
            </div>
        </div>
      
    );
  }
}