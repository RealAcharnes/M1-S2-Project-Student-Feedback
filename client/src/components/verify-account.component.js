import {useState, useEffect} from 'react'
import AuthService from "../services/auth.service";


const VerifyAccount = ({match: { params }} ) => {
    const [message, setmessage] = useState('');
    const [successful, setsuccessful] = useState(false)

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
    }, [])


    return (
        <div>
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
    )
}

export default VerifyAccount
