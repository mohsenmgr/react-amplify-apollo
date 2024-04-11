
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

import { BrowserRouter } from 'react-router-dom';
import Content from './Content';
import { Link } from 'react-router-dom';

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              My Main Page
            </Typography>

            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">Login</Link>


          </Toolbar>
        </AppBar>
        <Content />
      </BrowserRouter>

    </div>
  );
}

export default withAuthenticator(App)
