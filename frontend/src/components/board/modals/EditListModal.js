import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../utils/service.js";

export default function EditListModal(props) {
  const [listName, setListName] = useState(props.boardInfo.name);

  var handleBoardNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleClose = () => {
    props.hideModal();
  };

  var editBoard = () => {
    AuthService.editBoard(props.boardInfo.id, listName).then((response) => {
      console.log(response);
      if (response) {
        //
        handleClose();
        props.updateLists();
      } else {
        alert("Error");
      }
    });
  };

  var onEnterClicked = (e) => {
    if (e.keyCode === 13) {
      editBoard();
    }
  };

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Board name edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit board, please enter new board name.
          </DialogContentText>
          <TextField
            onChange={handleBoardNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="New board name"
            type="email"
            fullWidth
            value={listName}
            onKeyUp={onEnterClicked}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editBoard} color="primary">
            Edit board name
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
