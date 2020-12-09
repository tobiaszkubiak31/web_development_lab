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
import InviteUserModal from "./modals/InviteUserModal";
import ShowUsersModal from "./modals/ShowUsersModal";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router-dom";

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
  const [inviteModalDisplayed, setInviteModalDisplayed] = useState(false);
  const [showUsersDisplayed , setShowUsersDisplayed] = useState(false);
  const history = useHistory();

  var deleteBoard = () => {
    AuthService.deleteBoard(props.boardInfo.name).then((response) => {
      if (response) {
        props.updateBoards();
      } else {
        alert("Delete board failed");
      }
    });
  };

  var displayEditBoardModal = () => {
    setEditModalDisplayed(true);
  };

  var hideEditBoardModal = () => {
    setEditModalDisplayed(false);
  };

  var displayInviteUserToBoard = () => {
    setInviteModalDisplayed(true);
  }

  var hideInviteUserToBoard = () => {
    setInviteModalDisplayed(false);
  }

  var displayShowUsers = () => {
    setShowUsersDisplayed(true);
  }

  var hideShowUsers = () => {
    setShowUsersDisplayed(false);
  }

  return (
    <Card className={classes.card}>
      <EditBoardModal
        isDisplayed={editModalDisplayed}
        hideModal={hideEditBoardModal}
        updateBoards={props.updateBoards}
        boardInfo={props.boardInfo}
      ></EditBoardModal>
      <InviteUserModal
        isDisplayed={inviteModalDisplayed}
        hideModal={hideInviteUserToBoard}
        updateBoards={props.updateBoards}
        boardInfo={props.boardInfo}
      ></InviteUserModal>
      <ShowUsersModal
        isDisplayed={showUsersDisplayed}
        hideModal={hideShowUsers}
        updateBoards={props.updateBoards}
        boardInfo={props.boardInfo}
      ></ShowUsersModal>

      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />

      <CardContent className={classes.cardContent}>
        <ButtonBase
          onClick={() =>
            history.push("/board/" + props.boardInfo.name)
          }
        >
          <Typography gutterBottom variant="h5" component="h2">
            {props.boardInfo.name}
          </Typography>
        </ButtonBase>
        
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
        <Button size="small" color="primary" onClick={displayInviteUserToBoard}>
          Invite
        </Button>
        <Button size="small" color="primary" onClick={displayShowUsers}>
          Users
        </Button>
      </CardActions>
    </Card>
  );
}
