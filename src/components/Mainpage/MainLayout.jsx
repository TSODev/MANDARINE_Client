import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MainHeader from './MainHeader';
import LeftPanel from './LeftPanel';
import MainFooter from './MainFooter';
import * as actions from '../../MainStore/actions/index';
import RightPanel from './RightPanel';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      justify: 'space-between',
      maxHeight: '100vh',
      alignItems: 'stretch',
    },
    header: {
      height: '12vh',
      margin: theme.spacing(1,0,0,1),
    },
    content: {
      height: '100vh',
      margin: theme.spacing(0,0,1,1),
    },
    footer: {
        backgroundColor:'lightblue',
        height: '6vh',
    },
    control: {
      padding: theme.spacing(2),
    },
    leftside: {
      maxHeight: '100%',
      overflow: 'auto',
      margin: theme.spacing(0,0,1,1),
    },
    rightside: {
      maxHeight: '100%',
      overflow: 'auto',
      margin: theme.spacing(1,1,1,1),
    },
  }));
  

const MainLayout = (props) => {

  function LoadContent(){
    props.onUsersLoad();
    return (
      <LeftPanel />
    )
  }

    const classes = useStyles();
    return (
        <React.Fragment>
              <Grid className={classes.root} container spacing={1}>
                    <Grid className={classes.root} item xs={4}>
                      <Paper className={classes.leftside}>
                          {props.isAuthenticated && <LoadContent /> }
                      </Paper>
                    </Grid>
                    <Grid className={classes.root} item xs={8}>
                      <Paper className={classes.rightside}>
                          {props.isAuthenticated && <RightPanel /> }
                      </Paper>
                    </Grid>
              </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.isAuthenticated,

  }
}

const MapDispatchToProps = dispatch => {
  return {
    onUsersLoad: () => dispatch(actions.listAllUsers())
  }

}

export default connect(mapStateToProps, MapDispatchToProps)(MainLayout);