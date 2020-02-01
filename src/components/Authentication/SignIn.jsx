import React, { useReducer} from "react";
import { connect } from "react-redux";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

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
import Spinner from "../UI/Spinner";

import * as actions from "../../MainStore/actions/index";

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
    borderRadius: theme.shape.borderRadius
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const signInReducer = (signInState, action) => {
  switch (action.type) {
    case 'OPEN':
      return {...signInState, open:true};
    case 'CLOSE' : 
      return { ...signInState, open:false};
    case 'CHANGE_EMAIL':
      return { ...signInState, email: action.email};
      case 'CHANGE_PASSWORD':
        return { ...signInState, password: action.password};  
    default:
      throw new Error ('Should not be reached !');
  }
}



export const SignIn = props => {
  const classes = useStyles();

  const [signInState, dispatchSignIn] = useReducer(signInReducer, 
    {
      open: true,
      email: '',
      password: '',
    });

  const handleClose = () => {
    dispatchSignIn({type: 'CLOSE'});
  };

  const nameChangeHandler = event => {
    dispatchSignIn({type: 'CHANGE_EMAIL', email: event.target.value});
  };

  const passwordChangeHandler = event => {
    dispatchSignIn({type: 'CHANGE_PASSWORD', password: event.target.value});
  };

  const onSubmitForm = event => {
    event.preventDefault();
    props.onAuth(signInState.email, signInState.password);
  };

  function Loading() {
    if (props.loading) {
      return <Spinner />;
      } else {
      return <React.Fragment></React.Fragment>;
    }
  }

  return (
    <React.Fragment>
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
          <Container
            className={classes.container}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Loading />
              <form onSubmit={onSubmitForm} className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={nameChangeHandler}
                />
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
                  onChange={passwordChangeHandler}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/signup">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    showmodal: state.auth.showSignInModal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.signIn(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
