import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export default class PostSubmitForm extends Component {
    render(){
        if(this.props.location.state === undefined){
            // console.log(this.props.location); 
            return <Redirect to={{pathname:'/home'}}/>
        }
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