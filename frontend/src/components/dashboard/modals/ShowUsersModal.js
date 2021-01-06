import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../../utils/service.js";

export default function ShowUsersModal(props) {
  const [users, setUsers] = useState("");

  const handleClose = () => {
    props.hideModal();
  };

  let getUsers = () => {
    AuthService.getUsersFromBoard(props.boardInfo.id).then((response) => {
      if (response) {
        setUsers(response);
      } else {
        alert("error");
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Typography
            variant={"h5"}
            style={{ marginBottom: "4px", fontWeight: "bold" }}
          >
            Participants:
          </Typography>
          <DialogContentText>
            {users && users.length > 0 ? (
              users.map((user) => (
                <Typography
                  variant={"h6"}
                  key={user.email}
                  style={{ fontWeight: "bold" }}
                >
                  {user.email}
                </Typography>
              ))
            ) : (
              <Typography component={"span"} variant={"body2"}>
                error
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
