import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import UserView from '../UI/UserView';
import UserEdit from '../UI/UserEdit';


const RightPanel = (props) => {

    const [user, setUser] = useState([{}]);

    useEffect(() => {
      setUser(props.users[props.index]);      
      console.log('[RIGHTPANEL] - useEffect', user);
    },
    [props.users, props.index]
    )


    return (
      <React.Fragment>
          { props.modeView ? <UserView user={user}/> : <UserEdit user={user} /> }
      </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        modeView: state.user.modeView,
        index: state.user.key,
        users: state.user.users,
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
    }  
  }

export default connect(mapStateToProps, MapDispatchToProps)(RightPanel);