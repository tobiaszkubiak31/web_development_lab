import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../utils/service.js";
import EditBoardModal from "./modals/EditBoardModal.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: "75vh",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "7px",
    backgroundColor: "rgb(0, 52, 89)",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function BoardView(props) {
  const classes = useStyles();
  const [editModalDisplayed, setEditModalDisplayed] = useState(false);

  var deleteBoard = () => {
    AuthService.deleteBoard(props.boardInfo.id).then((response) => {
      if (response) {
        console.log(response);
        props.updateBoards();
      } else {
        alert("Delete board failed");
      }
    });
  };

  var displayEditBoardModal = () => {
    setEditModalDisplayed(true);
    console.log("display modal:" + editModalDisplayed);
  };

  var hideEditBoardModal = () => {
    setEditModalDisplayed(false);
    console.log("display modal:" + editModalDisplayed);
  };

  return (
    <Card className={classes.card}>
      <EditBoardModal
        isDisplayed={editModalDisplayed}
        hideModal={hideEditBoardModal}
        updateBoards={props.updateBoards}
        boardInfo={props.boardInfo}
      ></EditBoardModal>
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />

      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.boardInfo.name}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Button size="small" color="primary" onClick={displayEditBoardModal}>
          Rename
        </Button>
        <Button size="small" color="primary" onClick={deleteBoard}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
