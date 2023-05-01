import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: 600,
    width: '100%',
    margin: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const AuthForm = ({ isRegister }) => {
  const classes = useStyles();

  const handleToggle = () => {
    if(isRegister) {
      window.location.href = '/register'
    } else {
      window.location.href = '/login'
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title="Welcome to Felix News" />
        <CardContent>
          {isRegister ? <Login /> : <Register />}
        </CardContent>
        <CardActions>
          <Typography variant="body2">
            {isRegister ? "Don't have an account?": 'Already have an account?'}
          </Typography>
          <Button color="primary" onClick={handleToggle}>
            {isRegister ? 'Register': 'Login' }
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AuthForm;
