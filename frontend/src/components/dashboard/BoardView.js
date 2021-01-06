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
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

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
    padding: "20px",
    borderRadius: "20px",
    background: "-webkit-linear-gradient(right, #3b6cb7, #1A2980)",
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
  const [showUsersDisplayed, setShowUsersDisplayed] = useState(false);
  const history = useHistory();

  var deleteBoard = () => {
    AuthService.deleteBoard(props.boardInfo.id).then((response) => {
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
  };

  var hideInviteUserToBoard = () => {
    setInviteModalDisplayed(false);
  };

  var displayShowUsers = () => {
    setShowUsersDisplayed(true);
  };

  var hideShowUsers = () => {
    setShowUsersDisplayed(false);
  };

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
        onClick={() => history.push("/board/" + props.boardInfo.id)}
        style={{ cursor: "pointer" }}
      />

      <CardContent className={classes.cardContent}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography
            onClick={() => history.push("/board/" + props.boardInfo.id)}
            gutterBottom
            variant="h4"
            component="h2"
            style={{ cursor: "pointer", marginTop: "10px", fontWeight: "bold" }}
          >
            {props.boardInfo.name}
          </Typography>
          <Tooltip
            TransitionComponent={Zoom}
            style={{ minHeight: "20px" }}
            title={
              <span style={{ padding: "5px", fontSize: "14px" }}>
                Edit board name
              </span>
            }
          >
            <IconButton>
              <EditIcon
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={displayEditBoardModal}
                color="primary"
              ></EditIcon>
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
      <CardActions
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Tooltip
          TransitionComponent={Zoom}
          style={{ minHeight: "20px" }}
          title={
            <span style={{ padding: "5px", fontSize: "14px" }}>
              Delete board
            </span>
          }
        >
          <IconButton>
            <DeleteOutlineIcon
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size="large"
              onClick={deleteBoard}
              color="primary"
            ></DeleteOutlineIcon>
          </IconButton>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom}
          style={{ minHeight: "20px" }}
          title={
            <span style={{ padding: "5px", fontSize: "14px" }}>
              Invite user to board
            </span>
          }
        >
          <IconButton>
            <PersonAddOutlinedIcon
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size="large"
              onClick={displayInviteUserToBoard}
              color="primary"
            ></PersonAddOutlinedIcon>
          </IconButton>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom}
          style={{ minHeight: "20px" }}
          title={
            <span style={{ padding: "5px", fontSize: "14px" }}>Show users</span>
          }
        >
          <IconButton>
            <GroupOutlinedIcon
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size="large"
              onClick={displayShowUsers}
              color="primary"
            ></GroupOutlinedIcon>
          </IconButton>
        </Tooltip>

        <Tooltip
          TransitionComponent={Zoom}
          style={{ minHeight: "20px" }}
          title={
            <span style={{ padding: "5px", fontSize: "14px" }}>
              Share link to board
            </span>
          }
        >
          <IconButton>
            <ShareOutlinedIcon
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size="large"
              onClick={displayShowUsers}
              color="primary"
            ></ShareOutlinedIcon>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
