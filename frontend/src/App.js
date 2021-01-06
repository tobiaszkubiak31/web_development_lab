import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/LoginForm";
import SignUp from "./components/RegisterForm";
import Dashboard from "./components/dashboard/Dashboard";
import Board from "./components/board/Board";
import { colors, createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#d32f2f",
    },
    warning: {
      main: colors.red.A700,
    },
  },
});

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route path="/register">
              <SignUp />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/board/:name" component={Board} />
            <Route path="/*">
              <SignIn />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
}

export default App;
