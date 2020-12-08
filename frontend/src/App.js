import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/LoginForm";
import SignUp from "./components/RegisterForm";
import Dashboard from "./components/dashboard/Dashboard";
import Board from "./components/board/Board"

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
