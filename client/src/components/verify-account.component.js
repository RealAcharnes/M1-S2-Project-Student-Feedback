import {useState, useEffect} from 'react'
import AuthService from "../services/auth.service";
import FormCard from './formCard'
import { useHistory } from "react-router";




const VerifyAccount = ({match: { params }} ) => {
    const [message, setmessage] = useState('');
    const history = useHistory();



    useEffect(() => {
        AuthService.verifyAccount(params.token)
        .then(response=>{
            setmessage(response.data.message);
        })
        .catch(error=>{
            console.log(error)
            setmessage(error.response.data.message|| error.response.data);
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
