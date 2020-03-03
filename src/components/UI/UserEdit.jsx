import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useConfirm } from 'material-ui-confirm';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as actions from '../../MainStore/actions/index';
import * as utils from '../../utilities/utils';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        minHeight: '100%',
      },
    container: {
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        margin: theme.spacing(3),
    },
      card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
      },
      avatar: {
        width: 60,
        height: 60,
        margin: 'auto',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
      heading: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginTop: 8,
        marginBottom: 0,
      },
      subheader: {
        fontSize: 14,
        color: theme.palette.grey[500],
        marginBottom: '0.875em',
      },
      statLabel: {
        fontSize: 12,
        color: theme.palette.grey[500],
        fontWeight: 500,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
      },
      statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: '1px',
      },
      borderGridStyles: {
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
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
        alignItems: "center",
        padding: theme.spacing(1),
        boxShadow: 'none',
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
      },
      formControl: {
        margin: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
      }
  }));

  const UserEdit = (props) => {

    const classes = useStyles();
//    const editedUser = {...props.user};

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const companyRef = useRef(null);
    const emailRef = useRef(null);


    const [editedUser, setEditedUser] = useState({...props.user});
    const [focusOn, setFocusOn] = useState(null);
    const [selectionStart, setSelectionStart] = useState();



    useEffect(() => {
        console.log('[USEREDIT] - useEffect', focusOn);
        if (focusOn === null) {
          firstnameRef.current.focus();
        } else {
          focusOn.current.focus();
          focusOn.current.selectionStart = selectionStart;
          focusOn.current.selectionEnd = selectionStart;
        }; 

    },
    [focusOn, editedUser]
    )


    const confirm = useConfirm();

    const onViewClickHandler = () => {
        props.onModeView();
    }

    const onSaveClickHandler = () => {
        props.onUserSave(editedUser);
        props.onModeView();        
    }

    const onCloseClickHandler = () => {
        confirm({
          description: 'Your data has not been save, if you quit now they will be lost...'
                  }).then(() => {
                                    props.onModeView();
                                  }
      ).catch(err => {});
    }

    const onFocus = (ref) => {
      setFocusOn(ref);
      console.log('onFocus : ', ref);
    }

    const firstnameChangeHandler = (event) => {
      setEditedUser({...editedUser, firstname: event.target.value});
      setFocusOn(firstnameRef);
      setSelectionStart(firstnameRef.current.selectionStart);
    }

    const lastnameChangeHandler = (event) => {
      setEditedUser({...editedUser, lastname: event.target.value});
      setFocusOn(lastnameRef);
      setSelectionStart(lastnameRef.current.selectionStart);
    }

    const emailChangeHandler = (event) => {
      setEditedUser({...editedUser, email: event.target.value});
      setFocusOn(emailRef);
      setSelectionStart(emailRef.current.selectionStart);
    }

    const companyChangeHandler = (event) => {
      setEditedUser({...editedUser, company: event.target.value});
      setFocusOn(companyRef);
      setSelectionStart(companyRef.current.selectionStart);
    }

    const roleChangeHandler = (value) => {
      const updatedUserRoles = (utils.switchUserRole(editedUser, value.role))
      setEditedUser({...editedUser, roles: updatedUserRoles});
    }

    const UserEditRoles = () => {
      const predefinedRoles = ['ADMIN', 'LOCALADMIN', 'USER', 'VIEWER'];
      return (
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Roles</FormLabel>
          <FormGroup>
            { predefinedRoles.map((role, index) => {
              const hasThisRole = utils.userHasThisRole(editedUser, role)
              return (
                      <FormControlLabel 
                      key={index}
                      label={role}
                      control={
                        <Checkbox
                          value={role}
                          checked={hasThisRole}
                          onChange={() => roleChangeHandler({role})}
                          color="primary"
                        />
                      }
                    />
              ) 
            })}
          </FormGroup>
        </FormControl>
 
      )
    }

    const UserEditForm = () => {
      return (
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User Edit
        </Typography>
        <Divider />
        <form onSubmit={onSaveClickHandler} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={firstnameRef}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={editedUser.firstname}
                onChange={firstnameChangeHandler}
                // onFocus={(ref) => onFocus(firstnameRef)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={lastnameRef}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                defaultValue={editedUser.lastname}
                autoComplete="lname"
                onChange={lastnameChangeHandler}
                //onFocus={(ref) => onFocus(lastnameRef)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={companyRef}
                variant="outlined"
                required
                fullWidth
                id="company"
                label="company"
                name="company"
                defaultValue={editedUser.company}
                autoComplete="company"
                onChange={companyChangeHandler}
                //onFocus={(ref) => onFocus(companyRef)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={emailRef}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={editedUser.email}
                placeholder='Email Address'
                autoComplete="email"
                onChange={emailChangeHandler}
                //onFocus={(ref) => onFocus(emailRef)}
              />
            </Grid>
            <Grid container component='div'className="paper" alignContent="center" justify="center" alignItems="center">
                <Grid item xs={8} >
                    <UserEditRoles />
                </Grid>
            </Grid>


          </Grid>

        </form>

      </div>
      )
    }

    const UserEditFormWithCommandButtons = (props) => {

            return (
                <React.Fragment>
                    <Box display={'flex'}>
                        <Box p={2} flex={'auto'} className={classes.borderedGridStyles}>
                            <Tooltip title="View">
                                <IconButton onClick={onViewClickHandler} aria-label="edit">
                                    <VisibilityIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Save">
                            <IconButton onClick={onSaveClickHandler} aria-label="close">
                                <SaveIcon fontSize="large" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Close">
                            <IconButton onClick={onCloseClickHandler} aria-label="close">
                                <CloseIcon fontSize="large" />
                            </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Divider light />
                        <UserEditForm />
                </React.Fragment>
            )

    }

    return (
      <React.Fragment>
          { (props.user !== null) ? <UserEditFormWithCommandButtons /> : <React.Fragment /> }
      </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
        onUserHide: (user) => dispatch(actions.hideUser(user)),
        onModeView: () => dispatch(actions.modeView()),
        onUserSave: (user) => dispatch(actions.userSave(user)),
    }
  
  }

export default connect(mapStateToProps, MapDispatchToProps)(UserEdit);