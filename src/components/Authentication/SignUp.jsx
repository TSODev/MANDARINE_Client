import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

import Spinner from '../UI/Spinner';

import * as actions from "../../store/actions/index";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TSODev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const signUpReducer = (signUpState, action) => {
  switch (action.type) {
    case 'OPEN':
      return {...signUpState, open:true};
    case 'CLOSE' : 
      return { ...signUpState, open:false};
    case 'CHANGE_EMAIL':
      return { ...signUpState, email: action.email};
    case 'CHANGE_PASSWORD':
      return { ...signUpState, password: action.password};  
    case 'CHANGE_FIRSTNAME':
      return { ...signUpState, firstname: action.firstname};
    case 'CHANGE_LASTNAME':
      return { ...signUpState, lastname: action.lastname};
    default:
      throw new Error ('Should not be reached !');
  }
}

export const SignUp = (props) => {
  const classes = useStyles();

  const [signUpState, dispatchSignUp] = useReducer(signUpReducer, 
    {
      open: true,
      email: '',
      password: '',
      firstname: '',
      lastname:'',
    });

  const handleClose = () => {
    dispatchSignUp({type: 'CLOSE'});
  };

  const firstnameChangeHandler = (event) => {
    dispatchSignUp({type: 'CHANGE_FIRSTNAME', firstname: event.target.value});
  }

  const lastnameChangeHandler = (event) => {
    dispatchSignUp({type: 'CHANGE_LASTNAME', lastname: event.target.value});
  }

  const emailChangeHandler = (event) => {
    dispatchSignUp({type: 'CHANGE_EMAIL', email: event.target.value});
  }

  const passwordChangeHandler = (event) => {
    dispatchSignUp({type: 'CHANGE_PASSWORD', password: event.target.value});
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    props.onRegister(signUpState.email, signUpState.password, signUpState.firstname, signUpState.lastname);
  }

  function Loading() {
    if (props.loading) {
      return <Spinner />;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.showmodal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      onBackdropClick={props.onCancel}
      onEscapeKeyDown={props.onCancel}
    >
      <Fade in={props.showmodal}>
        <Container className={classes.container} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Loading />
            <form onSubmit={onSubmitForm} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={firstnameChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={lastnameChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={emailChangeHandler}
                  />
                </Grid>
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
                    onChange={passwordChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
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
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/signin">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    showmodal: state.auth.showSignUpModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (email, password, firstname, lastname) =>
      dispatch(actions.register(email, password, firstname, lastname))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
