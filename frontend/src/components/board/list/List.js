import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AuthService from "../../../utils/service.js";
import { useHistory } from "react-router-dom";
import Card from "./card/Card";
import EditListModal from "./EditListModal";
import AddCardModal from "./card/AddCardModal";
import EditIcon from "@material-ui/icons/Edit";
import {
  colors,
  IconButton,
  Popover,
  Tooltip,
  Zoom,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
function preventDefault(event) {
  event.preventDefault();
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#d32f2f",
    },
    warning: {
      main: colors.red.A700,
    },
  },
});

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
    width: "87%",
    padding: "25px",
    borderRadius: "20px",
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
      <Paper elevation={24} className={classes.fixedHeightPaper}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography
            component="p"
            variant="h4"
            style={{ fontSize: "44px", fontWeight: "bold" }}
          >
            {props.name}
          </Typography>
          <Tooltip
            TransitionComponent={Zoom}
            style={{ minHeight: "20px" }}
            title={
              <span style={{ padding: "5px", fontSize: "14px" }}>
                Edit list name
              </span>
            }
          >
            <IconButton>
              <EditIcon
                style={{ marginLeft: "5px", cursor: "pointer" }}
                fontSize="large"
                onClick={showEditBoardModal}
                color="primary"
              ></EditIcon>
            </IconButton>
          </Tooltip>
        </div>
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

        <IconButton onClick={showAddBoardModal}>
          <AddToPhotosIcon
            style={{
              marginTop: "12px",
              marginLeft: "2px",
              cursor: "pointer",
              width: "35px",
              height: "35px",
            }}
            color="primary"
          ></AddToPhotosIcon>
          <div
            style={{
              color: "#000000",
              marginTop: "10px",
              marginLeft: "10px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Add card
          </div>
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}
