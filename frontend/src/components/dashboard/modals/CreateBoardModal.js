import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../utils/service.js";

export default function CreateBoardModal(props) {
  const [boardName, setboardName] = useState("");

  var handleBoardNameChange = (event) => {
    setboardName(event.target.value);
  };

  const handleClose = () => {
    props.hideModal();
  };

  var addBoard = () => {
    AuthService.addBoard(boardName).then((response) => {
      if (response) {
        console.log(response);
        handleClose();
        props.updateBoards();
      } else {
        alert("Add board failed");
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
        <DialogTitle id="form-dialog-title">Board creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create board, please enter board name.
          </DialogContentText>
          <TextField
            onChange={handleBoardNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="Board name"
            type="email"
            fullWidth
            onKeyUp={onEnterClicked}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addBoard} color="primary">
            Add board
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
