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
import AuthService from "../../utils/service.js";
import { Grow } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import BoardView from "./BoardView.js";

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
var mockedUserBoards = [
  { board: { name: "example_board_1" } },
  { board: { name: "example_board_2" } },
  { board: { name: "example_board_3" } },
  { board: { name: "example_board_4" } },
];
export default function Dashboard() {
  const classes = useStyles();
  const [boards, setBoards] = useState([]);
  const history = useHistory();

  var getUserBoards = () => {
    return mockedUserBoards;
    // AuthService.getUserBoards().then((response) => {
    //   if (response) {
    //     setBoards(response);
    //   } else {
    //     alert("Fetch boards failed");
    //   }
    // });
  };

  var logout = () => {
    sessionStorage.removeItem("token");
    history.push("/login");
  };
  useEffect(() => {
    setBoards(getUserBoards());
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <div style={{ display: "flex" }}>
          <Toolbar style={{ flexGrow: "1" }}>
            <Typography variant="h6" color="inherit" noWrap>
              Trello
            </Typography>
          </Toolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: "1",
            }}
          >
            <Button
              style={{ margin: "10px 50px 10px 0px" }}
              size="large"
              color="white"
              variant="contained"
              onClick={logout}
            >
              Add board
            </Button>

            <Button
              style={{ margin: "10px 50px 10px 0px" }}
              size="large"
              color="white"
              variant="contained"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {boards.map((mappedBoard) => (
              <Grid item key={mappedBoard.id} xs={12} sm={6} md={4}>
                <BoardView boardInfo={mappedBoard}></BoardView>
                {/* <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.board.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
