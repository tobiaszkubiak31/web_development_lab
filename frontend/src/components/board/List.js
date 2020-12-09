import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AuthService from "../../utils/service.js";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import EditListModal from "./modals/EditListModal";
import AddCardModal from "./modals/AddCardModal";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: 200,
  },
}));

export default function List(props) {
  const classes = useStyles();
  const history = useHistory();

  const [cards, setCards] = useState(null);
  const [editModalDisplayed, setEditModalDisplayed] = useState(false);
  const [addModalDisplayed, setAddModalDisplayed] = useState(false);

  var getCards = () => {
    AuthService.getListsCards(props.id).then((response) => {
      if (response === 401) {
        alert("You was unauthorized, please login again, 401 error");
        history.push("/login");
      }
      if (response) {
        setCards(response);
      } else {
        alert("Fetch lists failed");
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    setCards(getCards());
  }, [history]);

  var hideEditBoardModal = () => {
    setEditModalDisplayed(false);
  };

  var showEditBoardModal = () => {
    setEditModalDisplayed(true);
  };

  var hideAddBoardModal = () => {
    setAddModalDisplayed(false);
  };

  var showAddBoardModal = () => {
    setAddModalDisplayed(true);
  };

  return (
    <React.Fragment>
      <EditListModal
        isDisplayed={editModalDisplayed}
        hideModal={hideEditBoardModal}
        updateLists={props.getLists}
        name={props.name}
        id={props.id}
      ></EditListModal>
      <AddCardModal
        isDisplayed={addModalDisplayed}
        hideModal={hideAddBoardModal}
        updateLists={props.getLists}
        updateCards={getCards}
        id={props.id}
      ></AddCardModal>
      <Paper className={classes.fixedHeightPaper}>
        <Typography component="p" variant="h5">
          {props.name}
        </Typography>

        <Typography
          color="textSecondary"
          className={classes.depositContext}
        ></Typography>

        {cards && cards.length > 0 ? (
          cards.map((mappedCard) => (
            <Card
              key={mappedCard.name + mappedCard.id}
              text={mappedCard.name}
              id={mappedCard.id}
              time_limit={mappedCard.time_limit}
              updateCards={getCards}
            />
          ))
        ) : (
          <p></p>
        )}

        <div>
          <Button color="primary" href="#" onClick={showEditBoardModal}>
            Edit
          </Button>
          <Button color="primary" href="#" onClick={preventDefault}>
            Delete
          </Button>
          <Button color="primary" href="#" onClick={showAddBoardModal}>
            Add card
          </Button>
        </div>
      </Paper>
    </React.Fragment>
  );
}
