import {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import React, { Component } from "react";



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

function ModifyPassword(){
    const [oldPw, setOldPw] = useState('')
const [newPw, setNewPw] = useState('')
const [confirmNewPw, setConfirmNewPw] = useState('')
     return (
        <div>
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
            <button type="button" onClick={ApplyModifications(oldPw,newPw,confirmNewPw)}>Confirmer</button>
        </div>
    );
}

function ApplyModifications(oldPass, newPass, confirmPass){
    if ((oldPass === currentPassword) && (newPass.length >= 6) && (newPass === confirmPass)) {
        // Modif Password
    }
}

export default ModifyPassword;
