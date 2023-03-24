import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px - 56px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px - 48px)',
    },
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

const AuthForm = () => {
  const classes = useStyles();
  const [isRegister, setIsRegister] = useState(false);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title="Welcome to Felix News" />
        <CardContent>
          {isRegister ? <Register /> : <Login />}
        </CardContent>
        <CardActions>
          <Typography variant="body2">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </Typography>
          <Button color="primary" onClick={handleToggle}>
            {isRegister ? 'Login' : 'Register'}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AuthForm;
