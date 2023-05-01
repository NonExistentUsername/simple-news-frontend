import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
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
}));

let apiManager = new ApiManager();

export default function Register() {
  const classes = useStyles();
  const [username_error, setUsernameError] = React.useState("");
  const [password_error, setPasswordError] = React.useState("");

  const handleApiCallResult = (response) => {
    setUsernameError("");
    setPasswordError("");

    if(response.success === true) {
      window.location.href = "/login";
    } else
    if(response.success === false) {
      if(response.hasOwnProperty("username")) {
        setUsernameError(response.username);
      }
      if(response.hasOwnProperty("password")) {
        setPasswordError(response.password);
      }
    }
  }

  const submitForm = (event) => {
    event.preventDefault();

    console.log(event.target.password.value)

    apiManager.register(event.target.username.value, null, event.target.password.value).then(handleApiCallResult);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* Felix logo goes here */}
          </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {username_error}
              </Typography>
              <TextField
                autoComplete="uname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Typography variant="body2" color="error">
              {password_error}
            </Typography>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeat_password"
                label="Repeat Password"
                type="password"
                id="repeat_password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive news and promotions from Felix News"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
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
}
