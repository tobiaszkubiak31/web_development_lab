import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../utils/service.js";

export default function CreateListModal(props) {
  const [listName, setListName] = useState("");

  var handleListNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleClose = () => {
    props.hideModal();
  };

  var addBoard = () => {
    AuthService.addList(listName, props.id).then((response) => {
      if (response) {
        handleClose();
        props.updateBoards();
      } else {
        alert("Add list failed");
      }
    });
  };

  var onEnterClicked = (e) => {
    if (e.keyCode === 13) {
      addBoard();
    }
  };

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">List creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create list, please enter name.
          </DialogContentText>
          <TextField
            onChange={handleListNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="List name"
            type="email"
            fullWidth
            onKeyUp={onEnterClicked}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addBoard} color="primary">
            Add list
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
