import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  logoWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    padding: 0,
    margin: 3,
    backgroundColor: "white",
    borderRadius: "50%",
    marginRight: theme.spacing(2),
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: 0,
    padding: 0,
  },
}));

function LoginButton() {
  const classes = useStyles()
  
  return (
    <Button href="/login" color="inherit" className={classes.button}>
      Login
    </Button>
  )
}

function Header({ user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.logoWrapper}>
          <img
            src="/felix-logo.png"
            alt="Felix News Site Logo"
            className={classes.logo}
          />
        </div>
        <Typography variant="h6" className={classes.title}>
          Felix News Site
        </Typography>
        <Button color="inherit" className={classes.button}>
          News
        </Button>
        <Button color="inherit" className={classes.button}>
          My News
        </Button>
        <div>
        {user.is_authorized ? <IconButton
            onClick={handleMenuOpen}
            aria-haspopup="true"
            color="inherit"
            style={{ padding: 0 }}
          >
             <Avatar className={classes.avatar}>F</Avatar>
          </IconButton>
          : LoginButton()}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
