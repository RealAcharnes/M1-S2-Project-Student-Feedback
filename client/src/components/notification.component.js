import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {React, useState} from 'react'

const Notification = (props) => {
    const [notify,setnotify] = useState(props);

    return (
        <div>
            <Snackbar
            open={notify.isOpen}
            autoHideDuration={5000}
            >
                <Alert>

                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notification
