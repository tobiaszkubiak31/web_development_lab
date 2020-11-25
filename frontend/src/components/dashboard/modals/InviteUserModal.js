import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../utils/service.js";

export default function InviteUserModal(props) {
    const [userName, setUserName] = useState(props.boardInfo.name);
  
    var handleUserNameChange = (event) => {
      setUserName(event.target.value);
    };
  
    const handleClose = () => {
      props.hideModal();
    };
  
    var inviteUser = () => {
        // AuthService.editBoard(props.boardInfo.id, boardName).then((response) => {
        //   if (response) {
        //     console.log(response);
        //     handleClose();
        //     props.updateBoards();
        //   } else {
        //     alert("Add board failed");
        //   }
        // });
      };

    var onEnterClicked = (e) => {
        if (e.keyCode === 13) {
            inviteUser();
        }
    };

    return (
    <div>
        <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Invite user</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To invite user, please enter his name.
            </DialogContentText>
            <TextField
            onChange={handleUserNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="User name"
            type="email"
            fullWidth
            value={userName}
            onKeyUp={onEnterClicked}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={inviteUser} color="primary">
            Invite
            </Button>
        </DialogActions>
        </Dialog>
    </div>
    );
    
  }