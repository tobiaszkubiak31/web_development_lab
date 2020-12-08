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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 200
  }
}));

export default function List(props) {
  const classes = useStyles();
  const history = useHistory();

  const [cards, setCards] = useState(null);

  var getCards = () => {

        // return mock data
        return [{id: 1, text: "pierwsza"},
                {id: 2, text: "druga"},
                {id: 3, text: "hehehe"},
                {id: 4, text: "hehehe"},
                {id: 5, text: "hehehe"},
                {id: 6, text: "hehehe"},
                {id: 7, text: "hehehe"}]

        AuthService.getListsCards(props.id).then((response) => {
            if (response === 401) {
                alert("You was unauthorized, please login again, 401 error");
                history.push("/login");
            }
            if (response) {
                setCards(response)
            } else {
                alert("Fetch lists failed");
            }
        });

    };

    useEffect(() => {
        if(localStorage.getItem("token") === null) {
        history.push("/login");
    }
        setCards(getCards())
    }, [history]);

  return (
    <React.Fragment>
        <Paper className={classes.fixedHeightPaper}>

        <Typography component="p" variant="h5">
            {props.name}
        </Typography>

        <Typography color="textSecondary" className={classes.depositContext}>

        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
            xDDDD
            {/** tutaj musi być card */}
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