import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../../utils/service.js";

export default function AddCardModal(props) {
  const [cardName, setCardName] = useState("");

  var handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleClose = () => {
    props.hideModal();
  };

  var addCard = () => {
    AuthService.addCard(cardName, props.id).then((response) => {
      if (response) {
        handleClose();
        props.updateLists();
        props.updateCards();
      } else {
        alert("Add list failed");
      }
    });
  };

  var onEnterClicked = (e) => {
    if (e.keyCode === 13) {
      addCard();
    }
  };

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Card creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create card, please enter name.
          </DialogContentText>
          <TextField
            onChange={handleCardNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="Card name"
            type="email"
            fullWidth
            onKeyUp={onEnterClicked}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addCard} color="primary">
            Add card
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
