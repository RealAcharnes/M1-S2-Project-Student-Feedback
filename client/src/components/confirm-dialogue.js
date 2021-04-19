import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import {React} from 'react'

const ConfirmDialogue = (props) => {
    const {confirmDialog} = props;
    return (
        <div>
            <Dialog open={confirmDialog.isOpen}>
                <DialogTitle >
                    
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        {confirmDialog.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {confirmDialog.subTitle}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button className="btnn" onClick={confirmDialog.onDiscard}>No</button>
                    <button className="btnn" onClick={confirmDialog.onConfirm}>Yes</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDialogue
