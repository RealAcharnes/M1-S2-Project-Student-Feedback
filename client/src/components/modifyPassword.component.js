import {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import React, { Component } from "react";
import FormCard2 from './formCard2'

import AuthService from '../services/auth.service'



// const currentPassword = ""


// const required = (value) => {
//     if (!value) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 Ce champ est obligatoire !
//             </div>
//         );
//     }
// };

// const vpassword = value => {
//     if (value.length < 6 || value.length > 50) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           Le mot de passe doit contenir entre 6 et 50 charactères.
//         </div>
//       );
//     }
//   };

//   const vpasswordConfirmation = value => {
//     if (value !== newPw) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           Le nom d'utilisateur doit contenir entre 3 et 50 charactères.
//         </div>
//       );
//     }
//   };

const ModifyPassword = (props) =>{
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confirmNewPw, setConfirmNewPw] = useState('')
    const [message, setmessage] = useState('');
    const [successful, setsuccessful] = useState(false);
    const [userEmail] = useState(props.email)
    const currentUser = props.currentuser

    const ApplyModifications =(email,oldPass, newPass, confirmPass) => {
        setmessage('');
        setsuccessful(false);
        AuthService.changePassword(email, oldPass, newPass, confirmPass)
        .then((res) => {
            setmessage("Mot de passe modifié avec succès");
            setsuccessful(true);
        })
        .catch((error) =>{
            const errMessage =
              (error.response.data.message[0].password || (error.response &&
                error.response.data &&
                error.response.data.message)) ||
              error.message ||
              error.toString();
              console.log(errMessage);
            setmessage(errMessage);
            setsuccessful(false);
        })
    }



return (
    <div >
        {message && (
          <div className="form-group">
            <div
              className={
                successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
         <FormCard2
         content={
           <div  className="formCardContent">
              <header className="jumbotron">
                <h3>
                    Profile : <strong>{currentUser.message.firstname}{' '}{currentUser.message.lastname}</strong> 
                </h3>
              </header>

              <div 
              className="row2" 
              style={{margin: "20px", marginTop: "20px", width : "80%",marginBottom:"10px"}}
              >
              <h5>ACCOUNT INFORMATION</h5>
              </div>  
              <div 
              className="row1" 
              style={{margin: "20px", marginTop: "20px", width : "90%",marginBottom:"10px"}}
              >
                <label style={{width: "40%"}}>Prenom</label>
                <input 
                type="text" 
                id="name" 
                class="input-field" 
                disabled 
                style={{width: "60%"}}
                value={currentUser.message.firstname}
                />    
              </div>

              <div 
              className="row1" 
              style={{margin: "20px", marginTop: "10px", width : "90%",marginBottom:"10px"}}
              >
                <label style={{width: "40%"}}>Nom</label>
                <input 
                type="text" 
                id="name" 
                class="input-field" 
                disabled 
                style={{width: "60%"}}
                value={currentUser.message.lastname}
                />    
              </div>
              <div 
              className="row1" 
              style={{margin: "20px", marginTop: "10px", width : "90%",marginBottom:"10px"}}
              >
                <label style={{width: "40%"}}>Email</label>
                <input 
                type="text" 
                id="name" 
                class="input-field" 
                disabled 
                style={{width: "60%"}}
                value={currentUser.message.email}
                />    
              </div>

              <div 
              className="row2" 
              style={{margin: "20px", marginTop: "20px", width : "90%",marginBottom:"10px"}}
              >
              <h5>Changement de mot de passe</h5>
              </div> 

              <div 
              className="row1" 
              style={{margin: "20px", marginTop: "20px", width : "90%",marginBottom:"10px"}}
              >
                <label style={{width: "40%"}}>Ancien mot de passe</label>
                <input 
                type="password" 
                name="oldPw" 
                value={oldPw} 
                placeholder="******" 
                onChange={(e) => setOldPw(e.target.value)} 
                class="input-field" 
                style={{width: "60%"}}
                />    
              </div>

              <div 
              className="row1" 
              style={{margin: "20px", marginTop: "20px", width : "90%",marginBottom:"10px"}}
              >
                <label style={{width: "40%"}}> Nouveau mot de passe </label>
                <input 
                type="password" 
                name="newPw" 
                value={newPw} 
                placeholder="******" 
                onChange={(e) => setNewPw(e.target.value)} 
                class="input-field" 
                style={{width: "60%"}}
                />    
              </div>

              <div 
              className="row1" 
              style={{margin: "20px", marginTop: "20px", width : "90%",marginBottom:"10px"}}
              >
                <label style={{width: "40%"}}>Confirmer mot de passe</label>
                <input 
                type="password" 
                name="confirmNewPw" 
                value={confirmNewPw} 
                placeholder="******" 
                onChange={(e) => setConfirmNewPw(e.target.value)} 
                class="input-field" 
                style={{width: "60%"}}
                />    
              </div>

              <center>
              <button
              onClick={() => ApplyModifications(userEmail,oldPw,newPw,confirmNewPw)}
              className="btnn" 
              style={{backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2","font-size" : "12px", float:"right", marginRight: "40px"}}
              >
               Confirmer
              </button>  
              </center>      


           </div>
         }
        />
{/*         
        <strong>Changement de mot de passe</strong>
        <Form>
        <label name="oldPw">Ancien mot de passe</label>
        <Input name="oldPw" value={oldPw} placeholder="******" onChange={(e) => setOldPw(e.target.value)} />
        <label name="newPw">Nouveau mot de passe</label>
        <Input name="newPw" value={newPw} placeholder="******" onChange={(e) => setNewPw(e.target.value)} />
        <label name="confirmNewPw">Confirmer le nouveau mot de passe</label>
        <Input name="confirmNewPw" value={confirmNewPw} placeholder="******" onChange={(e) => setConfirmNewPw(e.target.value)} />
        <CheckButton
            style={{ display: "none" }}
            ref={c => {
            Component.checkBtn = c;
            }}
        />
        </Form>
        <button className="btnn" onClick={() => ApplyModifications(userEmail,oldPw,newPw,confirmNewPw)}>Confirmer</button> */}

        {message && (
          <div className="form-group">
            <div
              className={
                successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
    </div>
);
}



export default ModifyPassword;
