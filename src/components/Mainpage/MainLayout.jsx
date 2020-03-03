import React, { useState, useEffect } from 'react';
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
import FilterBar from '../UI/FilterBar';
import * as utils from '../../utilities/utils';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      justify: 'space-between',
      maxHeight: '91vh',
      alignItems: 'stretch',
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 16,
      borderColor: theme.palette.background.primary,
    },
    header: {
      height: '12vh',
      margin: theme.spacing(1,0,0,1),
    },
    maincontainer: {
//      height: '100vh',
      margin: theme.spacing(0,0,1,1),
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    footer: {
        backgroundColor:'lightblue',
        height: '6vh',
    },
    control: {
      padding: theme.spacing(2),
    },
    leftside: {
      maxHeight: '90vh',
      overflow: 'auto',
      margin: theme.spacing(0,0,1,1),
    },
    rightside: {
      maxHeight: '90vh',
      overflow: 'auto',
      margin: theme.spacing(1,1,1,1),
    },
  }));
  

const MainLayout = (props) => {


  const [filter, setFilter] = useState('');
  const [chips, setChips] = useState([])

  // useEffect(() => {
  //     console.log('[MAINLAYOUT] - useEffect : ', props.users); 
  // },
  // [props.users]
  // )

  const onChangeHandler = (chips) => {
    setChips(chips);
//      setFilter(search);
  }

  const onRequestSearchHandler = () => {
    console.log('clicked', filter);
  }


  const Filter = () => {
    return (
      <FilterBar 
      className={classes.filter}
      onFilterChange={(chips) => onChangeHandler(chips)}
      onClick={onRequestSearchHandler}
      style={{
        margin: "0 auto",
        maxWidth: 800
      }}
      />
    )
  }

  const Panels = () => {
    return (
      <Container className={classes.maincontainer}>
        <Grid className={classes.root} container spacing={1}>
          <Grid item xs={4}>
            <div className={classes.leftside}>
              {props.isAuthenticated && <LoadContent />}
            </div>
          </Grid>
          <Grid item xs={8}>
            <Container className={classes.rightside}>
              {props.isAuthenticated && <RightPanel />}
            </Container>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  const LoadContent = () => {
    props.onUsersLoad();
    return (
      <LeftPanel />
    )
  }

    const classes = useStyles();

    return (
      <React.Fragment>
        { props.isAuthenticated && <Panels />}
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