import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import AccountCircle from '@material-ui/icons/AccountCircle';


import { deepOrange, lightBlue } from '@material-ui/core/colors';

import SignIn from '../../Authentication/SignIn';
import SignUp from '../../Authentication/SignUp';
import UserProfileMenu from '../../Navigation/NavMenu/UserProfileMenu';

import * as actions from '../../../MainStore/actions/index';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& > *': {
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  blue: {
    color: theme.palette.getContrastText(lightBlue[500]),
    backgroundColor: lightBlue[500],
  },
  container: {
    backgroundColor: theme.palette.background.default,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const profileReducer = (profileState, action) => {
  switch (action.type) {
    case 'SETANCHOR':
      return { anchorEl: action.anchorEl, open: true};
    case 'OPEN':
      return {...profileState, open:true};
    case 'CLOSE' : 
      return { ...profileState, open:false};
    default:
      throw new Error ('Should not be reached !');
  }
}


const NavigationAppBar = (props) => {
  const classes = useStyles();

  const [profileState, dispatchProfile] = useReducer(profileReducer, 
          {
            anchorEl: null,
            open: false
          });

  const signInButtonHandler = () => {
    props.showSignInModal(true);
    dispatchProfile({type: 'CLOSE'});
  }

  const signUpButtonHandler = () => {
    props.showSignUpModal(true);
  }
  const menuButtonHandler = () => {
    console.log('Menu button has been clicked !');
  }

  const loginCancelHandler = () => {
    props.showSignInModal(false);
  }

  const signUpCancelHandler = () => {
    props.showSignUpModal(false);
  }

  const ProfileHandleMenu = event => {
    dispatchProfile({type: 'SETANCHOR', anchorEl: event.currentTarget});
  };

  const handleClose = () => {
    dispatchProfile({type: 'CLOSE'});
  };

  function LoginPage() {
    if (props.SignInModal) {
      return (
        <Container className={classes.container}>
          <SignIn onCancel={loginCancelHandler}/>
        </Container>
      )
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }
  }  

  function RegisterPage() {
    if (props.SignUpModal) {
      return (
        <Container className={classes.container}>
          <SignUp onCancel={signUpCancelHandler}/>
        </Container>
      )
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }
  } 
  
  function WebAuthentication() {
    if (props.isAuthenticated) {
      return (
        <div>           
          <UserProfileMenu 
              anchorEl={profileState.anchorEl} 
              open={profileState.open} 
              onClose={handleClose}
              firstname= {props.firstname}
              lastname= {props.lastname} />
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <Button className={classes.button}
                  color="secondary"
                  variant="contained"
                  onClick={signInButtonHandler}>SignIn</Button>
          <Button  className={classes.button} 
                  color="inherit"
                  variant="contained"
                  onClick={signUpButtonHandler}>SignUp</Button>
        </React.Fragment>

      )
    }
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
                    id="menu-mobile"
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu"
                    onClick={menuButtonHandler}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.appName}
          </Typography>
          <WebAuthentication />
            <IconButton
              id="account-circle"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={ProfileHandleMenu}
              color="inherit"
            >
              {props.isAuthenticated  && <AccountCircle />}
            </IconButton>
        </Toolbar>
      </AppBar>
      <LoginPage />
      <RegisterPage />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    SignInModal: state.auth.showSignInModal,
    SignUpModal: state.auth.showSignUpModal,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showSignInModal: (show) => dispatch(actions.showSignInModal(show)),
    showSignUpModal: (show) => dispatch(actions.showSignUpModal(show)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(NavigationAppBar);