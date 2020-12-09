import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../../utils/service.js";
import AlarmIcon from "@material-ui/icons/Alarm";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button, makeStyles, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    paddingBottom: "5vh",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CardDetailsModal(props) {
  const [timeValue, setTimeValue] = useState("2020-12-10");
  const classes = useStyles();
  const handleClose = () => {
    props.hideModal();
  };

  let updateTimelimit = () => {
    console.log(timeValue);
    AuthService.updateTimeLimitCard(props.id, timeValue).then((response) => {
      if (response) {
        //console.log(response)
        handleClose();
        props.updateCards();
      } else {
        alert("Update timelimit failed");
      }
    });
    handleClose();
  };
  let deleteTimeLimit = () => {
    AuthService.updateTimeLimitCard(props.id, null).then((response) => {
      if (response) {
        //console.log(response)
        handleClose();
        props.updateCards();
      } else {
        alert("Update timelimit failed");
      }
    });
    handleClose();
  };

  useEffect(() => {
    // getCardDetails();
  }, []);

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add new deadline to your card
        </DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Deadline"
              type="date"
              defaultValue="2020-12-10"
              onChange={(e) => setTimeValue(e.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={updateTimelimit}
              className={classes.button}
              style={{ marginLeft: "2vh", backgroundColor: "green" }}
              startIcon={<AlarmIcon />}
            >
              Save deadline
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={deleteTimeLimit}
              className={classes.button}
              startIcon={<CancelIcon />}
              style={{ marginLeft: "2vh", backgroundColor: "red" }}
            >
              Delete
            </Button>
          </form>

          {/* <DialogContentText>
            {users && users.length > 0 ? (
              users.map((user) => (
                <Typography
                  component={"span"}
                  variant={"body2"}
                  key={user.email}
                >
                  {user.email}
                  <br />
                </Typography>
              ))
            ) : (
              <Typography component={"span"} variant={"body2"}>
                error
              </Typography>
            )}
          </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
