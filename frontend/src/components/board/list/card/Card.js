import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AuthService from "../../../../utils/service.js";
import CardDetailsModal from "./CardDetailsModal.js";
import AlarmIcon from "@material-ui/icons/Alarm";
import EditCardNameModal from "./EditCardNameModal.js";
import {
  IconButton,
  Popover,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import CheckIcon from "@material-ui/icons/Check";

import TaskListModal from "./taskList/TaskListModal";

// function preventDefault(event) {
//   event.preventDefault();
// }

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

const mockedLabels = [
  {
    id: 1,
    color: "#0079bf", //niebieski
    label_name: "Database",
  },
  {
    id: 2,
    color: "#eb5a46", //red
    label_name: "Serwer",
  },
  {
    id: 3,
    color: "#519839", //green
    label_name: "Klient",
  },
  {
    id: 4,
    color: "#f2d600", //yellow
    label_name: "Meeting",
  },
  {
    id: 5,
    color: "#ff9f1a", //orange
    label_name: "Review",
  },
  {
    id: 6,
    color: "#c377e0", //purple
    label_name: "Migration",
  },
];

export default function Card(props) {
  const classes = useStyles();
  const [cardModalDisplayed, setCardModalDisplayed] = useState(false);
  const [cardNameModalDisplayed, setCardNameModalDisplayed] = useState(false);
  const [taskListDisplayed, setTaskListDisplayed] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setCardLabelIds] = React.useState([1, 3, 4, 6]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const updateLabelIds = (labelIds) => {
    AuthService.updateLabelsIds(props.id, labelIds).then((response) => {
      if (response) {
        props.updateCards();
      } else {
        alert("Update update labels error");
      }
    });
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  var hideCardModal = () => {
    setCardModalDisplayed(false);
  };

  var displayCardModal = () => {
    setCardModalDisplayed(true);
  };

  var hideNameCardModal = () => {
    setCardNameModalDisplayed(false);
  };

  var displayNameCardModal = () => {
    setCardNameModalDisplayed(true);
  };

  let displayTaskList = () => {
    setTaskListDisplayed(true);
  };

  let hideTaskList = () => {
    setTaskListDisplayed(false);
  };

  return (
    <React.Fragment>
      <CardDetailsModal
        isDisplayed={cardModalDisplayed}
        hideModal={hideCardModal}
        updateCards={props.updateCards}
        id={props.id}
      ></CardDetailsModal>
      <EditCardNameModal
        isDisplayed={cardNameModalDisplayed}
        hideModal={hideNameCardModal}
        updateCards={props.updateCards}
        id={props.id}
        name={props.text}
      ></EditCardNameModal>
      <TaskListModal
        isDisplayed={taskListDisplayed}
        hideModal={hideTaskList}
        card_id={props.id}
      ></TaskListModal>

      <Paper elevation={8} className={classes.fixedHeightPaper}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography component="p" variant="h4" style={{ fontWeight: "bold" }}>
            {props.text}
          </Typography>
          <Tooltip
            TransitionComponent={Zoom}
            style={{ minHeight: "20px" }}
            title={
              <span style={{ padding: "5px", fontSize: "14px" }}>
                Edit name
              </span>
            }
          >
            <IconButton>
              <EditIcon
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size="large"
                onClick={displayNameCardModal}
                color="primary"
              ></EditIcon>
            </IconButton>
          </Tooltip>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {props.label_ids !== undefined &&
            props.label_ids
              .map((labelId) =>
                mockedLabels.find((obj) => obj.id === parseInt(labelId))
              )
              .map(
                (labelData) =>
                  labelData !== undefined && (
                    <p
                      style={{
                        borderRadius: "10px",
                        background: labelData.color,
                        padding: "1px",
                        margin: "3px",
                        width: "70px",
                        height: "30px",
                        textAlignLast: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          verticalAlign: "-webkit-baseline-middle",
                        }}
                      >
                        {labelData.label_name}
                      </span>
                    </p>
                  )
              )}
        </div>
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Tooltip
              TransitionComponent={Zoom}
              style={{ minHeight: "20px" }}
              title={
                <span style={{ padding: "5px", fontSize: "14px" }}>
                  Set deadline
                </span>
              }
            >
              <IconButton>
                <WatchLaterIcon
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={displayCardModal}
                  fontSize="large"
                  color="primary"
                ></WatchLaterIcon>
              </IconButton>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              style={{ minHeight: "20px" }}
              title={
                <span style={{ padding: "5px", fontSize: "14px" }}>
                  Task lists
                </span>
              }
            >
              <IconButton>
                <ListAltIcon
                  color="primary"
                  style={{ marginLeft: "7px", cursor: "pointer" }}
                  onClick={displayTaskList}
                  fontSize="large"
                ></ListAltIcon>
              </IconButton>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              style={{ minHeight: "20px" }}
              title={
                <span style={{ padding: "7px", fontSize: "14px" }}>Labels</span>
              }
            >
              <IconButton>
                <LabelImportantIcon
                  color="primary"
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={handleClick}
                  fontSize="large"
                ></LabelImportantIcon>
              </IconButton>
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <LabelPicker
                cardLabelIds={props.label_ids}
                setCardLabelIds={setCardLabelIds}
                handleOpen={handleClick}
                handleClose={handleClose}
                updateLabelIds={updateLabelIds}
              ></LabelPicker>
            </Popover>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
}

function LabelPicker({
  cardLabelIds,
  setCardLabelIds,
  handleOpen,
  handleClose,
  updateLabelIds,
}) {
  //functions switch label state
  // .map((labelId) => mockedLabels.find((obj) => obj.id === labelId))

  const deleteOrAddLabel = (labelId) => {
    if (cardLabelIds === undefined) {
      cardLabelIds = [];
    }
    if (cardLabelIds.includes(labelId)) {
      //JEZELI ISTNIEJE USUN Z LISTY I ZAPISZ
      cardLabelIds = cardLabelIds.filter(function (item) {
        return item !== labelId;
      });
      updateLabelIds(cardLabelIds);
      handleClose();
    }
    //JEZELNI NIE ISTNIEJE DODAJ DO LISTY I ZAPISZ
    else {
      cardLabelIds.push(labelId);
      updateLabelIds(cardLabelIds);
      handleClose();
    }
  };

  return (
    <>
      {mockedLabels.map((labelData) => (
        <p
          onClick={() => deleteOrAddLabel(labelData.id)}
          style={{
            borderRadius: "1px",
            background: labelData.color,
            padding: "1px",
            margin: "5px",
            width: "120px",
            height: "35px",
            textAlignLast: "center",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              verticalAlign: "-webkit-baseline-middle",
            }}
          >
            <div
              style={{
                marginLeft: "3px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {labelData.label_name}
              {cardLabelIds && cardLabelIds.includes(labelData.id) && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <CheckIcon></CheckIcon>
                </div>
              )}
            </div>
          </span>
        </p>
      ))}
    </>
  );
}
