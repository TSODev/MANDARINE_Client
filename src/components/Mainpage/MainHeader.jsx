import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));
  

const MainHeader = props => {

    const classes = useStyles();

    return (
        <React.Fragment>
            {/* <Typography
                align="center"
                color='textPrimary'
                variant="h4">
                Main Header
            </Typography> */}
            <div className={classes.root}>
                {/* <IconButton aria-label="delete">
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton color="secondary" aria-label="add an alarm">
                    <AlarmIcon  fontSize="large" />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon  fontSize="large"/>
                </IconButton> */}
            </div>
            
        </React.Fragment>
    )
}

export default MainHeader;