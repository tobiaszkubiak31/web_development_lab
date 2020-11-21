import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../utils/service.js";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddBoardModal(props) {
  const classes = useStyles();
  const [boardName, setboardName] = useState("");

  var handleBoardNameChange = (event) => {
    setboardName(event.target.value);
  };

  const handleClose = () => {
    props.hideModal();
  };

  var addBoard = () => {
    AuthService.addBoard(boardName, 1).then((response) => {
      if (response) {
        console.log(response);
        handleClose();
      } else {
        alert("Add board failed");
      }
    });
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
