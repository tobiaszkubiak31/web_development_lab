import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { LockOpen } from "@material-ui/icons";
import AuthService from "../utils/service.js";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    borderStyle: "groove",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "60vh",
    borderRadius: 20,
    background: "white",
  },
  avatar: {
    margin: theme.spacing(1),

    background: "-webkit-linear-gradient(bottom, #0250c5, #d43f8d)",
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1),
    backgroundColor: "#0250c5",
  },
  background: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: "linear-gradient(bottom, #0250c5, #d43f8d)",
  },
}));
export default function SignIn() {
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  var submitLogin = (event) => {
    event.preventDefault();
    AuthService.loginUser(login, password).then((response) => {
      if (response) {
        alert("Sucessfully logged to:" + login + " password: " + password);
        history.push("/dashboard");
      } else {
        alert("Login failed");
      }
    });
  };

  var handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  var handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={classes.background}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitLogin}>
          <TextField
            onChange={handleLoginChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Login"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
