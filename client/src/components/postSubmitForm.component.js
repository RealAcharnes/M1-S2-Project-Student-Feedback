import React, { Component } from "react";

export default class PostSubmitForm extends Component {
    render(){
        return(
            <div>
                <div className="container">
                    <header className="jumbotron">
                        <div className="success">
                            <h3>Formulaire envoyé avec succès !</h3>
                            <br></br>
                            <h5>Voici le code du quizz à partager aux élèves :</h5>
                            <p className="quizMdp">{" " + this.props.location.state.quizMdp}</p>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}