import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));

const MainFooter = props => {

    const classes = useStyles();
    return (
        <React.Fragment>
            {/* <Typography
                align="center"
                color='textPrimary'
                variant="h5">
                Main Footer
            </Typography> */}
            
        </React.Fragment>
    )
}

export default MainFooter;