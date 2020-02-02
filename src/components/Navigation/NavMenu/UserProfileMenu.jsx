import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


import * as actions from '../../../MainStore/actions/index';
import * as utils from '../../../utilities/utils';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'block',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
        display: "flex",
        alignItems: "center",
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: theme.spacing(4),
      }  ,    
    card: {
        minWidth: 350,
      },
    selected: {
        backgroundColor: theme.palette.background.default,
      },
  }));
  

const UserProfileMenu = (props) => {
    const classes = useStyles();
    
    const disconnectHandler = (event) => {
        props.onLogout();
    }

    const profileMenuHandler = (event) => {
        console.log('Route to Profile Page for user_id : ', props.userId);
        props.onClose();
    }


    function FullName() {
      const first = utils.capitalize(props.firstname);
      const last = utils.capitalize(props.lastname);
      return (
        first.concat(' ').concat(last)
      )
    }

    return (
      <div>
        <Menu
          className={classes.menu}
          id="menu-appbar"
          anchorEl={props.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={props.open}
          onClose={props.onClose}
        >
          <Card>
            <CardContent>
              <Avatar className={classes.avatar}>
                <AccountCircle />
              </Avatar>
              <Typography component="h1" variant="h5">
                <FullName />
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
          <MenuList>
            <MenuItem divider={true} onClick={profileMenuHandler}>Profile</MenuItem>
            <MenuItem onClick={disconnectHandler}> Disconnect</MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logOut())
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileMenu);