import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AuthService from "../../utils/service.js";
import { useHistory } from "react-router-dom";
import CardDetailsModal from "./modals/CardDetailsModal.js";
import AlarmIcon from "@material-ui/icons/Alarm";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  fixedHeightPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: 50,
  },
}));

export default function Card(props) {
  const classes = useStyles();
  const history = useHistory();
  console.log(props.time_limit);
  const [cardModalDisplayed, setCardModalDisplayed] = useState(false);

  var hideCardModal = () => {
    setCardModalDisplayed(false);
  };

  var displayCardModal = () => {
    setCardModalDisplayed(true);
  };

  return (
    <React.Fragment>
      <CardDetailsModal
        isDisplayed={cardModalDisplayed}
        hideModal={hideCardModal}
        updateCards={props.updateCards}
        id={props.id}
      ></CardDetailsModal>
      <Paper className={classes.fixedHeightPaper}>
        <Typography component="p" variant="h5">
          {props.text}
        </Typography>

        <div>
          {props.time_limit !== null && (
            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={displayCardModal}
              className={classes.button}
              startIcon={<AlarmIcon />}
            >
              {props.time_limit}
            </Button>
          )}

          <Button size="small" color="primary" onClick={displayCardModal}>
            Dodaj termin
          </Button>
        </div>
      </Paper>
    </React.Fragment>
  );
}
