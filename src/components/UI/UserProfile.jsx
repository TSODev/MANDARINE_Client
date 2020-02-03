import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";

import Spinner from '../UI/Spinner';

import axios from '../../axios-atlas';
import * as actions from '../../MainStore/actions/actionTypes';
import * as utils from '../../utilities/utils';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  }));

  export const error = (error) => {
    return {
        type: actions.ERROR_SHOW,
        error : { severity: error.severity, message: error.message},
    } 
} 

const profileReducer = (profileState, action) => {
    console.log('[Profile Reducer]',action);
    switch (action.type) {
      case 'QUERY_START':
          return {...profileState, loading: true};
      case 'QUERY_SUCCESS':
          return { 
              ...profileState,
              loading: false, 
              firstname: action.user.firstname,
              lastname: action.user.lastname,
              email: action.user.email,
              };
        case 'QUERY_FAIL':
            return {
                ...profileState,
                loading: false,
                error: { severity: "error", message: action.error},
            }
      default:
        throw new Error ('Should not be reached !');
    }
  }


const UserProfile = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [profileState, dispatchProfile] = useReducer(profileReducer, 
        {
          loading: false,
          error: null,
          firstname: '',
          lastname: '',
          email: '',
        });

    const classes = useStyles();
    const userId = utils.removeStringFromStart(location.pathname,'/user/profile/');
    const [open, setOpen] = React.useState(true);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      history.push('/');
    };

    

    useEffect(
        () => {
            console.log('[User Profile] - useEffect');
            
                dispatchProfile({type: 'QUERY_START'});
                axios.get('/userError/' + userId)
                    .then ( response => dispatchProfile({type: 'QUERY_SUCCESS', user: response.data.user}))
                    .catch ( err  => {
                      dispatchProfile({type: 'QUERY_FAIL', error: err.response.data});
                      props.onError(err);
                      handleClose();
                    })                


        },
        [],
      );

    // useEffect(
    //     () =>       console.log('[User Profile] - State : ',profileState)
    // )



    return (
        <React.Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
          <Container
            className={classes.container}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <div className={classes.paper}>

                   { profileState.loading && <Spinner />}
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Profile
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {profileState.firstname} {profileState.lastname}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {profileState.email}
                        </Typography>
                        <br />
                        <Button  
                            variant="contained" 
                            color="primary"
                            fullWidth
                            onClick= {handleClose}>OK</Button>
            </div>
            </Container>
          </Fade>
        </Modal>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {

  }
}

const MapDispatchToProps = dispatch => {
  return {
    onError: (err) =>  dispatch(error({severity: "error", message: err.message})),
  }

}

export default connect(mapStateToProps, MapDispatchToProps)(UserProfile);