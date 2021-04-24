import {useState} from "react";
// import CheckButton from "react-validation/build/button";
import FormCard2 from './formCard2'
import AuthService from '../services/auth.service'

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const ModifyPassword = (props) =>{
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confirmNewPw, setConfirmNewPw] = useState('')
    const [message, setmessage] = useState('');
    const [successful, setsuccessful] = useState(false);
    const [email] = useState(props.email)
    const currentUser = props.currentuser;
    const [errors, seterrors] = useState(null);
    const [open, setopen] = useState(false)


    const validate = (email, newPw, confirmNewPw) => {
        if(newPw !== confirmNewPw){
            seterrors(['Nouveau mot de passe non conforme' ])
        }
        if(email==="" || email=== null){
          seterrors([...errors, 'Veuillez vous reconnecter' ])
        }
        else{
          seterrors(null)  
        }
    }

    const ApplyModifications = (e) => {
      e.preventDefault();
      seterrors(null)  
      setmessage('');
      setsuccessful(false);

      validate(newPw, confirmNewPw);

      if(errors){
        setmessage(errors.toString())
        setopen(true)
      }
      else{
        AuthService.changePassword(email, oldPw, newPw, confirmNewPw)
        .then((res) => {
          setmessage("Mot de passe modifié avec succès");
          setsuccessful(true);
          setopen(true)
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
          setopen(true)
        })
      }
    }

    const handleClose = () => {
      setopen(false)
    }
    



return (
    <div >
        <form
          onSubmit={(e) => ApplyModifications(e)}
        >
          <FormCard2
          content={
            <div  className="formCardContent">
              <Snackbar anchorOrigin={{ vertical :'center', horizontal: 'center' }}open={open} autoHideDuration={6000} onClose={()=>handleClose()}>
                <Alert onClose={()=>handleClose()} severity={successful ? "success" : "warning" }>
                  {message}
                </Alert>
              </Snackbar>
              <header className="jumbotron">
                <h3>
                    Profile : <strong>{currentUser.message.firstname}{' '}{currentUser.message.lastname}</strong> 
                </h3>
              </header>

              <div 
              className="row2" 
              style={{margin: "20px", marginTop: "20px", width : "80%",marginBottom:"10px"}}
              >
                <h5>Informations sur le compte</h5>
                </div>  
                <div 
                className="row1" 
                style={{margin: "20px", marginTop: "20px", width : "90%",marginBottom:"10px"}}
                >
                  <label style={{width: "40%"}}>Prenom</label>
                  <input 
                  type="text" 
                  id="firstname" 
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
                  id="lastname" 
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
                  type="email" 
                  id="email" 
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
                  required
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
                  required
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
                  required
                  />    
                </div>

                <center>
                <button
                className="btnn" 
                style={{backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2","font-size" : "12px", float:"right", marginRight: "40px"}}
                >
                Confirmer
                </button>  
                </center>      


            </div>
          }
          />
        </form>  
    </div>
);
}



export default ModifyPassword;
