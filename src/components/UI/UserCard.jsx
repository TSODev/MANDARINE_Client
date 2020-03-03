import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../MainStore/actions/index';
import * as utils from '../../utilities/utils';


import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
//        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      inline: {
        display: 'inline',
      },
      divider: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
  }));

    
  const UserCard = (props) => {

    const theUser = props.user;

    const fullname = utils.fullname(theUser.firstname, theUser.lastname);

    const classes = useStyles();

    const onItemClickHandler = (user) => {
//        console.log('clicked :', user);
        props.onUserShow(user, user.theUser.index);
    }

    return (
        <React.Fragment>
        <ListItem 
                button 
                className={classes.root}
                alignItems="flex-start" 
                onClick={(user) => onItemClickHandler({theUser})}>
        <ListItemAvatar>
            <Avatar variant="rounded">{props.key}</Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={
            <Typography 
                variant="h6" 
                style={{ color: "textPrimary" }}>
                    {fullname}
            </Typography>}
            secondary={
            <React.Fragment>
                <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                >
                    {theUser.email}
                </Typography>
                    {" — …"}
            </React.Fragment>
            }
        />
        </ListItem>
        <Divider className={classes.divider} variant="inset" component="li" />
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
        onUserShow: (user, key) => dispatch(actions.showUser(user, key)),
    }
  
  }

export default connect(mapStateToProps, MapDispatchToProps)(UserCard);