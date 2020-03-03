import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useConfirm } from 'material-ui-confirm';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import * as actions from '../../MainStore/actions/index';
import * as utils from '../../utilities/utils';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        minHeight: '100%',
      },
    container: {
        height: '100vh',
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
      paper: {
          padding: theme.spacing(1),
          boxShadow: 'none',
      },
      icon: {
        height: 40,
      }

  }));

  const userReducer = (userState, action) => {
    switch (action.type) {
      case 'MODE_VIEW':
          return {...userState, modeEdit: false, modeView: true};
      case 'MODE_EDIT':
          return { 
              ...userState,
                modeEdit: true,
                modeView: false,
              };

      default:
        throw new Error ('Should not be reached !');
    }
  }
    
  const UserView = (props) => {

    const classes = useStyles();
    const [userState, dispatchUser] = useReducer(userReducer, 
        {
          modeView: true,
          modeEdit: false,
        });

    useEffect(() => {
        console.log('[USERVIEW] - useEffect', props.users, props.index);
    },
    [props.users]
    )

    const confirm = useConfirm();

    const onEditClickHandler = () => {
        dispatchUser({type: 'MODE_EDIT'});
        props.onModeEdit();
    }


    const onDeleteClickHandler = () => {
        confirm({
            description: 'This action is permanent and remove the user from the database...'
                    }).then(() => {
                                        props.onUserDelete(props.users[props.index].user_id);
                                        props.onUserHide();
                                    }
        ).catch(err => {});

    }


    const onCloseClickHandler = () => {
        dispatchUser({type: 'MODE_VIEW'});
        props.onUserHide();
    }

    const UserRoles = () => {
        if (props.showSelected) {
            const roles = props.users[props.index].roles;
                return (
                    <Grid container direction="row" justify="center" alignItems="center"spacing={2}>

                        {
                                        roles.map((role, index) => {
                                            return (
                                                <Grid item key={index}>
                                                    <Paper className={classes.paper}>
                                                        <Typography variant="body1"> {role} </Typography>
                                                    </Paper>
                                                </Grid>                                            
                                            )
                                        })

                        }

                    </Grid>
                )
        } else {
            return (
                <React.Fragment></React.Fragment>
            )
        }

    }

    const UserDetailsAdminButtons = () => {
        if (utils.isGlobalAdmin(props.loggedUserRoles) || (utils.isLocalAdmin(props.loggedUserRoles))) {
            return (
                <AdminButtons />
            )
        } else {
            return (
                <React.Fragment />
            )
        }
    }


    const AdminButtons = () => {
        return (
          <React.Fragment>
            <Box display={"flex"}>
              <Box p={2} flex={"auto"} className={classes.borderedGridStyles}>
                <Tooltip title="Edit">
                  <IconButton onClick={onEditClickHandler} aria-label="edit">
                    <EditIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={onDeleteClickHandler}
                    aria-label="delete"
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                  <IconButton onClick={onCloseClickHandler} aria-label="close">
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </React.Fragment>
        );
    }

    const EmptyUser = () => {
      return (
        <React.Fragment>
          <Box display={"flex"}>
            <Box p={2} flex={"auto"} className={classes.borderedGridStyles}>
              <Tooltip title="Back">
                <IconButton className={classes.icon}>

                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Card className={classes.card}>
            <CardContent>
              <Avatar className={classes.avatar} />
              <Typography variant="h1" component="h2">
                ______ ______
              </Typography>
              <Typography variant="h5" component="h6">
                ______
              </Typography>
              <Typography className={classes.body} variant="body1"></Typography>
              <Divider light />
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography variant="body1"> ----- </Typography>
                </Paper>
              </Grid>
            </CardContent>
            <Divider light />
            <Box display={"flex"}>
              <Box p={2} flex={"auto"} className={classes.borderedGridStyles}>
                <p className={classes.statLabel}>.</p>
                <p className={classes.statValue}>-</p>
              </Box>
              <Box p={2} flex={"auto"} className={classes.borderedGridStyles}>
                <p className={classes.statLabel}>.</p>
                <p className={classes.statValue}>-</p>
              </Box>
            </Box>
          </Card>
        </React.Fragment>
      );
    }

    const UserDetails = () => {
        const user = props.users[props.index];

        if (props.showSelected) {
            const fullname = utils.fullname(user.firstname, user.lastname)
            return (
                <React.Fragment>
                    <UserDetailsAdminButtons />
                    <Grow in={userState.modeView}>
                    <Card className={classes.card}>
                    <CardContent>
                        <Avatar className={classes.avatar} src={'https://i.pravatar.cc/300'} />
                        <Typography variant="h1" component="h2">{fullname}</Typography>
                        <Typography variant="h5" component="h6">{user.company}</Typography>
                        <Typography className={classes.body} variant="body1">{user.email}</Typography>
                        <Divider light />
                        <UserRoles />
                    </CardContent>
                    <Divider light />
                    <Box display={'flex'}>
                        <Box p={2} flex={'auto'} className={classes.borderedGridStyles}>
                        <p className={classes.statLabel}>id</p>
                        <p className={classes.statValue}>{user.user_id}</p>
                        </Box>
                        <Box p={2} flex={'auto'} className={classes.borderedGridStyles}>
                        <p className={classes.statLabel}>index</p>
                        <p className={classes.statValue}>{user.index}</p>
                        </Box>
                    </Box>
                    </Card>
                    </Grow>
                </React.Fragment>
            )
        } else {
          return (
            <EmptyUser />
          )
        }
    }


    return (
      <React.Fragment>
          <UserDetails />
      </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        loggedUserRoles : state.auth.roles,
        showSelected: state.user.showSelected,
        index: state.user.key,
        users: state.user.users,
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
        onUserHide: (user) => dispatch(actions.hideUser(user)),
        onModeEdit: () => dispatch(actions.modeEdit()),
        onModeView: () => dispatch(actions.modeView()),
        onUserDelete: (id) => dispatch(actions.userDelete(id)),
    }
  
  }

export default connect(mapStateToProps, MapDispatchToProps)(UserView);