import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));

const MainContent = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography
                align="left"
                color='textPrimary'
                variant="h6">
                Main Content
            </Typography>
            
        </React.Fragment>
    )
}

export default MainContent;