import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));
  

const MainHeader = props => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography
                align="center"
                color='textPrimary'
                variant="h4">
                Main Header
            </Typography>
            
        </React.Fragment>
    )
}

export default MainHeader;