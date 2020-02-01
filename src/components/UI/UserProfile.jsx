import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DropDown from '../UI/DropDown';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    fontSize: '1rem',
    zIndex: 1,
    position: "relative"
  }
}));




const UserProfile= (props) => {
  const classes = useStyles();
  const [showMenu , setshowMenu] = useState(false);


  const clickHandler = () => {
    setshowMenu(!showMenu)
  }

  function Menu() {
    if (showMenu) {
      return (
        <DropDown></DropDown>
        )
    } else {
      return (
        <React.Fragment></React.Fragment>
        )
    }

  }


  return (
    <div className={classes.root}>
      <Avatar 
        className={classes.avatar}
        onClick={clickHandler}>
              {props.firstname.charAt(0).toUpperCase()}
              {props.lastname.charAt(0).toUpperCase()}
      </Avatar>
      <Menu></Menu>
    </div>
  );
}

export default UserProfile;