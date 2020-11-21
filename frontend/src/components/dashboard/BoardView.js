import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Grow } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AuthService from "../../utils/service.js";

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
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function BoardView(props) {
  const classes = useStyles();

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

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      {console.log(props.boardInfo)}
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.boardInfo.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Rename
        </Button>
        <Button size="small" color="primary" onClick={deleteBoard}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
