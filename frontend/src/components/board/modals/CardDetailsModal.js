import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../../utils/service.js";
import AlarmIcon from "@material-ui/icons/Alarm";
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
          Dodaj nowy termin karty
        </DialogTitle>
        <DialogContent>
          <form className={classes.container} Validate>
            <TextField
              id="date"
              label="Birthday"
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
              backgroundColor="#5aac44"
              size="small"
              onClick={updateTimelimit}
              className={classes.button}
              startIcon={<AlarmIcon />}
            >
              Zapisz termin
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
