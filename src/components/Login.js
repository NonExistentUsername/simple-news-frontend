import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { ApiManager } from "../utils";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  badge: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    marginBottom: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

let apiManager = new ApiManager();


const Login = () => {
  const classes = useStyles();
  const [username_error, setUsernameError] = React.useState("");
  const [password_error, setPasswordError] = React.useState("");
  const [non_field_errors, setNonFieldErrors] = React.useState("");

  const handleApiCallResult = (json) => {
    setUsernameError("");
    setPasswordError("");
    setNonFieldErrors("");
    json.success = json.token ? true : false;

    if(json.success === true) {
      window.location.href = "/";
      localStorage.setItem("Authorization", json.token)
    } else
    if(json.success === false) {
      if(json.hasOwnProperty("username")) {
        setUsernameError(json.username);
      }
      if(json.hasOwnProperty("password")) {
        setPasswordError(json.password);
      }
      if(json.hasOwnProperty("non_field_errors")) {
        setNonFieldErrors(json.non_field_errors);
      }
    }
  }
  
  const submitForm = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;

    apiManager.login(username, password).then((json) => {
      handleApiCallResult(json);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          classes={{ badge: classes.badge }}
        >
          <Avatar className={classes.avatar}>
            {/* Felix logo goes here */}
          </Avatar>
        </Badge>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <Typography variant="body2" color="error">
            {non_field_errors}
          </Typography>
          <Typography variant="body2" color="error">
            {username_error}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <Typography variant="body2" color="error">
            {password_error}
          </Typography>
          <TextField
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* Forgot password link */}
            </Grid>
            <Grid item>{/* Sign up link */}</Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Felix News © "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
