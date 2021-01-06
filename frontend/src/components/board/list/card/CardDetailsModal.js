import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../../utils/service.js";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button, makeStyles, TextField } from "@material-ui/core";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
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
              style={{
                marginLeft: "2vh",
                fontWeight: "bold",
              }}
              startIcon={<WatchLaterIcon />}
            >
              Save deadline
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={deleteTimeLimit}
              className={classes.button}
              startIcon={<CancelIcon />}
              style={{ marginLeft: "2vh" }}
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
