import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../../utils/service.js";
import { useHistory } from "react-router-dom";
import TableChartIcon from "@material-ui/icons/TableChart";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import List from "./list/List";
import AddIcon from "@material-ui/icons/Add";
import CreateListModal from "./list/CreateListModal";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Avatar, colors, IconButton, Tooltip, Zoom } from "@material-ui/core";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
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
    minHeight: "81vh",
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
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
    background: "-webkit-linear-gradient(right, #1e3c72, #1A2980)",
    padding: theme.spacing(6),
    color: "#FFFFFF",
  },
}));

export default function Board(props) {
  const classes = useStyles();
  const history = useHistory();

  const [lists, setLists] = useState([]);
  const [modalDisplayed, setModalDisplayed] = useState(false);

  var hideAddListModal = () => {
    setModalDisplayed(false);
  };

  var displayAddListModal = () => {
    setModalDisplayed(true);
  };

  var redirecToDashboard = () => {
    history.push("/dashboard");
  };

  var getLists = () => {
    AuthService.getBoardsLists(props.match.params.name).then((response) => {
      if (response === 401) {
        alert("You was unauthorized, please login again, 401 error");
        history.push("/login");
      }
      if (response) {
        console.log(response);
        setLists(response);
      } else {
        alert("Fetch lists failed");
      }
    });
  };

  var logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }

    getLists();
  }, [history]);

  return (
    <React.Fragment>
      <CreateListModal
        isDisplayed={modalDisplayed}
        hideModal={hideAddListModal}
        updateLists={getLists}
        id={props.match.params.name}
      ></CreateListModal>
      <CssBaseline />
      <AppBar
        position="relative"
        style={{
          background: "-webkit-linear-gradient(right, #1e3c72, #1A2980)",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Toolbar style={{ flexGrow: "1" }}>
            <TableChartIcon fontSize="large"></TableChartIcon>
            <Typography variant="h4" color="inherit" noWrap>
              <div style={{ marginLeft: "10px", fontWeight: "bold" }}>
                Trullo
              </div>
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
              style={{
                margin: "10px 30px 10px 0px",
                backgroundColor: "#007EA7",

                background:
                  "-webkit-linear-gradient(bottom, rgb(2, 80, 197), blue)",
              }}
              color="secondary"
              size="large"
              variant="contained"
              onClick={redirecToDashboard}
            >
              <ViewCarouselIcon></ViewCarouselIcon>
              <span
                style={{
                  fontSize: "40",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Dashboards
              </span>
            </Button>

            <Button
              style={{
                margin: "10px 30px 10px 0px",
                fontWeight: "bold",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
              }}
              size="large"
              color="secondary"
              variant="contained"
              onClick={logout}
            >
              <PowerSettingsNewIcon
                fontSize="large"
                style={{ width: "30px", height: "30px", marginRight: "6px" }}
              ></PowerSettingsNewIcon>
              Logout
            </Button>

            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Avatar
                style={{
                  backgroundColor: colors.cyan[800],
                  width: "50px",
                  height: "50px",
                }}
              >
                {localStorage.getItem("authenticatedUser").substring(0, 1) +
                  localStorage
                    .getItem("authenticatedUser")
                    .substring(
                      localStorage.getItem("authenticatedUser").length - 1,
                      localStorage.getItem("authenticatedUser").length
                    )}
              </Avatar>
            </div>
          </div>
        </div>
      </AppBar>

      <main>
        <Container className={classes.cardGrid} maxWidth="xl">
          {console.log("LISTY:" + lists)}
          <Grid container spacing={4}>
            {lists && lists.length > 0 ? (
              lists.map((mappedList) => (
                <Grid item key={mappedList.name} lg={3}>
                  <List
                    name={mappedList.name}
                    id={mappedList.id}
                    getLists={getLists}
                  />
                </Grid>
              ))
            ) : (
              <h1>You don't have any lists, create them</h1>
            )}
            <Grid item>
              <IconButton onClick={displayAddListModal}>
                <PostAddIcon
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                  fontSize="large"
                  color="primary"
                ></PostAddIcon>
                <div
                  style={{
                    color: "#000000",
                    marginTop: "10px",
                    marginLeft: "10px",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  Add list
                </div>
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          style={{ fontWeight: "bold" }}
          variant="h6"
          align="center"
          gutterBottom
        >
          {"logged as " + localStorage.getItem("authenticatedUser")}
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
