import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../MainStore/actions/index';
import * as utils from '../../utilities/utils';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Spinner from '../UI/Spinner';
import UserCard from '../UI/UserCard';
import FilterBar from '../UI/FilterBar';
import { withTheme } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.default,
        border: 0,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      inline: {
        display: 'inline',
      },
      filterbar: {
        width: '100%',
        maxWidth: '100%',
      },
      list: {
        backgroundColor: theme.palette.background.default,
      },
      nav: {
        backgroundColor: theme.palette.background.default,
      },
      list: {
        backgroundColor: theme.palette.background.default,
      },
      divider: {
        marginBottom: theme.spacing(1)
      }
  }));

    
  const LeftPanel = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const [filter, setFilter] = useState('');
    const [chips, setChips] = useState([])

    useEffect(() => {
        console.log('[LEFTPANEL] - useEffect : ', props.users); 
    },
    [props.users]
    )

    const onChangeHandler = (chips) => {
      setChips(chips);
//      setFilter(search);
    }

    const onRequestSearchHandler = () => {
      console.log('clicked', filter);
    }

    const UserList = () => {
//        const users = props.users.filter(user => utils.userFilter(user, filter));
        const users = props.users.filter(user => utils.filterUserByChips(user, chips));

//        const users = props.users;

        if (props.userListAvailable) {
          return (
            <React.Fragment>
                { 
                    users.map((user, index) => {
                        return (
                        <UserCard 
                            key = {index}
                            user = {user} 
                        >
                        </UserCard>
                        )
                    })
                }
            </React.Fragment>      
    )
        } else {
          return (
            <Spinner />
          )
        }

    }

    return (
      <React.Fragment>
        <FilterBar 
          className={classes.filterbar}
          onFilterChange={(chips) => onChangeHandler(chips)}
          onClick={onRequestSearchHandler}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
          />
        <Divider className={classes.divider}/>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.nav}
          subheader={
            <ListSubheader
              component="div"
              className={classes.div}
              id="nested-list-subheader"
            ></ListSubheader>
          }
          className={classes.list}
        >
          <UserList />
        </List>
      </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        userListAvailable: state.user.userListAvailable,
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
    }
  
  }

export default connect(mapStateToProps, MapDispatchToProps)(LeftPanel);