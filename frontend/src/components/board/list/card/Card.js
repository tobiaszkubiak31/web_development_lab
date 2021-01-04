import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AuthService from "../../../../utils/service.js";
import { useHistory } from "react-router-dom";
import CardDetailsModal from "./CardDetailsModal.js";
import AlarmIcon from "@material-ui/icons/Alarm";
import EditCardNameModal from "./EditCardNameModal.js";
import { colors, Popover, Tooltip, Zoom } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
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

const cardLabelIds = [1, 2, 3, 4, 5, 6];

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
  const [cardNameModalDisplayed, setCardNameModalDisplayed] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <EditIcon
              style={{ marginLeft: "5px", cursor: "pointer" }}
              size="large"
              onClick={displayNameCardModal}
            ></EditIcon>
          </Tooltip>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {cardLabelIds
            .map((labelId) => mockedLabels.find((obj) => obj.id === labelId))
            .map((labelData) => (
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
            ))}
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
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "1vh" }}
          >
            <Tooltip
              TransitionComponent={Zoom}
              style={{ minHeight: "20px" }}
              title={
                <span style={{ padding: "5px", fontSize: "14px" }}>
                  Set deadline
                </span>
              }
            >
              <WatchLaterIcon
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={displayCardModal}
                fontSize="large"
              ></WatchLaterIcon>
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
              <ListAltIcon
                style={{ marginLeft: "7px", cursor: "pointer" }}
                onClick={displayCardModal}
                fontSize="large"
              ></ListAltIcon>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              style={{ minHeight: "20px" }}
              title={
                <span style={{ padding: "7px", fontSize: "14px" }}>Labels</span>
              }
            >
              <LabelImportantIcon
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={handleClick}
                fontSize="large"
              ></LabelImportantIcon>
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
              <LabelPicker></LabelPicker>
            </Popover>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
}

function LabelPicker({ id }) {
  //functions switch label state
  return (
    <>
      {cardLabelIds
        .map((labelId) => mockedLabels.find((obj) => obj.id === labelId))
        .map((labelData) => (
          <p
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
              {labelData.label_name}
            </span>
          </p>
        ))}
    </>
  );
}
