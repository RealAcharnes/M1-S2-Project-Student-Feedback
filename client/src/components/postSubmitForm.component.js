import React, { Component } from "react";

export default class PostSubmitForm extends Component {
    render(){
        return(
            <div>
                <div className="container">
                    <header className="jumbotron">
                        <div className="success">
                            <h3>Formulaire envoyé avec succès !</h3>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}