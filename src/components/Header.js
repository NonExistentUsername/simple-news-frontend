import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import React from "react";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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
  menu: {
    marginTop: 40,
    "& li": {
      minWidth: 200,
    },
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

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    window.location.href = "/";
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
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <Button color="inherit" className={classes.button} onClick={() => window.location.href = "/"}>
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
            className={classes.menu}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
