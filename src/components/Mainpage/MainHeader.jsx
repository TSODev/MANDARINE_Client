import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FilterBar from '../UI/FilterBar';
import * as utils from '../../utilities/utils';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));
  

const MainHeader = props => {

    const classes = useStyles();

    const [filter, setFilter] = useState('');
    const [chips, setChips] = useState([])
    const [users, setUsers] = useState(props.users)

    useEffect(() => {
        console.log('[LEFTPANEL] - useEffect : ', props.users); 
        setUsers(utils.filterUserByChips(props.users, chips));
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

    return (
        <React.Fragment>
        <FilterBar 
          className={classes.filter}
          onFilterChange={(chips) => onChangeHandler(chips)}
          onClick={onRequestSearchHandler}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
          />
        </React.Fragment>
    )
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

export default connect(mapStateToProps, MapDispatchToProps)(MainHeader);