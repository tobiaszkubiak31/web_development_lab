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
import List from "./List";

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
      backgroundColor: "#003459",
      padding: theme.spacing(6),
      color: "#FFFFFF",
    }
  }));

export default function Board(props) {
    const classes = useStyles();
    const history = useHistory();

    const [lists, setLists] = useState(null);
  
    // zmieńmy to na listy
    var getLists = () => {

        // return mock data
        return [{id: 1, name: "pierwsza"},
                {id: 2, name: "druga"},
                {id: 3, name: "hehehe"},
                {id: 3, name: "hehehe"},
                {id: 3, name: "hehehe"},
                {id: 3, name: "hehehe"},
                {id: 3, name: "hehehe"}]

      AuthService.getBoardsList(props.match.params.name).then((response) => {
        if (response === 401) {
          alert("You was unauthorized, please login again, 401 error");
          history.push("/login");
        }
        if (response) {
          setLists(response)
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
      if(localStorage.getItem("token") === null) {
        history.push("/login");
      }
      setLists(getLists())
    }, [history]);
  
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative" style={{ backgroundColor: "#003459" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Toolbar style={{ flexGrow: "1" }}>
              <TableChartIcon fontSize="large"></TableChartIcon>
              <Typography variant="h4" color="inherit" noWrap>
                <div style={{ marginLeft: "10px" }}>Trullo</div>
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
                  margin: "10px 50px 10px 0px",
                  fontWeight: "bold",
  
                  background:
                    "-webkit-linear-gradient(bottom, rgb(2, 80, 197), red)",
                }}
                size="large"
                color="secondary"
                variant="contained"
                onClick={logout}
              >
                <PowerSettingsNewIcon
                  style={{ marginRight: "10px" }}
                ></PowerSettingsNewIcon>
                Logout
              </Button>
            </div>
          </div>
        </AppBar>

        <main>
          <Container className={classes.cardGrid} maxWidth="lg">

          <Grid container spacing={4}>
              {lists && lists.length > 0 ? (
                lists.map((mappedList) => (
                  <Grid item key={mappedList.name} xs={12} sm={6} md={3}>
                    <List name={mappedList.name} id={mappedList.id}/>
                  </Grid>
                ))
              ) : (
                <h1>You don't have any lists, create them</h1>
              )}
            </Grid>

            {/* End hero unit
            <Grid container spacing={4}>
              {boards && boards.length > 0 ? (
                boards.map((mappedBoard) => (
                  <Grid item key={mappedBoard.name} xs={12} sm={6} md={4}>
                    <BoardView
                      boardInfo={mappedBoard}
                      updateBoards={getUserBoards}
                    ></BoardView>
                  </Grid>
                ))
              ) : (
                <h1>You don't have any boards, create them</h1>
              )}
            </Grid> */}

          </Container>
        </main>

        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            This is your project!
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }