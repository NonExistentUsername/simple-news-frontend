import { Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Felix News</Typography>
          <Typography variant="body2">
            Bringing you the latest news in science and technology.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Developed By</Typography>
          <Typography variant="body2">
            <Link href="https://example.com" target="_blank" rel="noopener">
              John Doe
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
