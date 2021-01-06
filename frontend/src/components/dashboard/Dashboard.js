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
import BoardView from "./BoardView.js";
import AddIcon from "@material-ui/icons/Add";
import CreateBoardModal from "./modals/CreateBoardModal.js";
import TableChartIcon from "@material-ui/icons/TableChart";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { Avatar, colors, IconButton, Tooltip, Zoom } from "@material-ui/core";

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
    minHeight: "80vh",
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

export default function Dashboard() {
  const classes = useStyles();
  const [boards, setBoards] = useState(null);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const history = useHistory();

  var getUserBoards = () => {
    // return mockedUserBoards;
    AuthService.getUserBoards().then((response) => {
      if (response === 401) {
        alert("You was unauthorized, please login again, 401 error");
        history.push("/login");
      }
      if (response) {
        setBoards(response);
      } else {
        alert("Fetch boards failed");
      }
    });
  };

  var logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  var displayAddBoardModal = () => {
    setModalDisplayed(true);
  };

  var hideAddBoardModal = () => {
    setModalDisplayed(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
    getUserBoards();
  }, []);

  return (
    <React.Fragment>
      <CreateBoardModal
        isDisplayed={modalDisplayed}
        hideModal={hideAddBoardModal}
        updateBoards={getUserBoards}
      ></CreateBoardModal>
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
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              ></PowerSettingsNewIcon>
              Logout
            </Button>
          </div>
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
                width: "55px",
                height: "55px",
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
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <>
              {boards && boards.length > 0 ? (
                boards.map((mappedBoard) => (
                  <Grid item key={mappedBoard.id} md={3}>
                    <BoardView
                      boardInfo={mappedBoard}
                      updateBoards={getUserBoards}
                    ></BoardView>
                  </Grid>
                ))
              ) : (
                <h1>You don't have any boards, create them</h1>
              )}
              <Grid md={3}>
                <IconButton onClick={displayAddBoardModal}>
                  <AddBoxOutlinedIcon
                    style={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                    size="large"
                    color="primary"
                  ></AddBoxOutlinedIcon>
                  <div
                    style={{
                      color: "#000000",
                      marginTop: "10px",
                      marginLeft: "10px",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    Add board
                  </div>
                </IconButton>
              </Grid>
            </>
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
        <Typography variant="subtitle1" align="center" component="p">
          Create, delete and edit your boards !
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
