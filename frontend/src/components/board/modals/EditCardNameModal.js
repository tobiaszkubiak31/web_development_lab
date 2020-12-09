import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../utils/service.js";

export default function EditCardNameModal(props) {
  const [cardName, setCardName] = useState(props.name);

  var handleBoardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleClose = () => {
    props.hideModal();
  };

  var editCardName = () => {
    AuthService.updateCardName(props.id, cardName).then((response) => {
      console.log(response);
      if (response) {
        //
        handleClose();
        props.updateCards();
      } else {
        alert("Error");
      }
    });
  };

  var onEnterClicked = (e) => {
    if (e.keyCode === 13) {
      editCardName();
    }
  };

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Card name edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit card name, please enter new card name.
          </DialogContentText>
          <TextField
            onChange={handleBoardNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="New board name"
            type="email"
            fullWidth
            value={cardName}
            onKeyUp={onEnterClicked}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editCardName} color="primary">
            Edit card name
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
