import {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import React, { Component } from "react";

import AuthService from '../services/auth.service'



const currentPassword = ""


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

    const ApplyModifications =(email,oldPass, newPass, confirmPass) => {
        console.log(email)
        setmessage('');
        setsuccessful(false);
        AuthService.changePassword(email, oldPass, newPass, confirmPass)
        .then((res) => {
            console.log(res.data);
            setmessage("Password Successfully Changed");
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
    <div className="card card-container">
        
        <strong>Changement de mot de passe</strong>
        <Form>
        <label name="oldPw">Ancien mot de passe</label>
        <Input name="oldPw" value={oldPw} placeholder="******" onChange={(e) => setOldPw(e.target.value)} />
        <label name="newPw">Nouveau mot de passe</label>
        <Input name="newPw" value={newPw} placeholder="******" onChange={(e) => setNewPw(e.target.value)} />
        <label name="confirmNewPw">Confirmer le nouveau mot de passe</label>
        <Input name="confirmNewPw" value={confirmNewPw} placeholder="******" onChange={(e) => setConfirmNewPw(e.target.value)} />
        {/* <CheckButton
            style={{ display: "none" }}
            ref={c => {
            Component.checkBtn = c;
            }}
        /> */}
        </Form>
        <button className="btnn" onClick={() => ApplyModifications(userEmail,oldPw,newPw,confirmNewPw)}>Confirmer</button>

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
