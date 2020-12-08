import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 500
  }
}));

export default function List(props) {
  const classes = useStyles();

  const [name, setName] = useState("Placeholder");

  return (
    <React.Fragment>
        <Paper className={classes.fixedHeightPaper}>

        <Typography component="p" variant="h5">
            {props.name}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
            
        </Typography>
        <div>
            <Button color="primary" href="#" onClick={preventDefault}>
             Edit
            </Button>
            <Button color="primary" href="#" onClick={preventDefault}>
             Delete
            </Button>
            <Button color="primary" href="#" onClick={preventDefault}>
             Add card
            </Button>
        </div>
                        
        </Paper>
    </React.Fragment>
  );
}