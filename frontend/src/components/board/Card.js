import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import AuthService from "../../utils/service.js";
import { useHistory } from "react-router-dom";

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
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 50
  }
}));

export default function Card(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
        <Paper className={classes.fixedHeightPaper}>

        <Typography component="p" variant="h5">
            {props.text}
        </Typography>
        
        <div>
            <Button color="primary" href="#" onClick={preventDefault}>
             Delete
            </Button>
        </div>
                        
        </Paper>
    </React.Fragment>
  );
}