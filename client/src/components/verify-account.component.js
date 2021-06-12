import {useState, useEffect} from 'react'
import AuthService from "../services/auth.service";
import FormCard from './formCard'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from "react-router";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const VerifyAccount = ({match: { params }} ) => {
    const [message, setmessage] = useState('');
    const [successful, setsuccessful] = useState(false);
    const history = useHistory();



    useEffect(() => {
        AuthService.verifyAccount(params.token)
        .then(response=>{
            setmessage(response.data.message);
            setsuccessful(true);
        })
        .catch(error=>{
            console.log(error)
            setmessage(error.response.data.message|| error.response.data);
            setsuccessful(false);
        })
    }, [params.token])


    return (
        <div>
            {message && (
              <div className="form-group">
                <FormCard
                content={
                  <div className="formCardContent" style={{padding: "35px", paddingTop:"50px", paddingBottom:"60px", clear: "both" }}>
                      <p>{message}</p>
                      <button
                    onClick={() =>  history.push({
                      pathname: "/login",
                    })} 
                    className="btnn" style={{backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2","font-size" : "12px", width: "44%"}}
                    >
                      SE CONNECTER
                      </button> 
                  </div>
                }/>
              </div>
            )}
        </div>
    )
}

export default VerifyAccount
