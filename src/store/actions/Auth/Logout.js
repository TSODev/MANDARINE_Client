import axios from '../../../axios-atlas';
import * as actions from '../actionTypes'
//import * as type from '../types/AuthTypes';

export const logoutStart = () => {
    return {
        type: actions.LOGOUT_START
    };
};


export const logoutSuccess = (authData) => {
    console.log('Action Success : ', authData);
    return {
        type: actions.LOGOUT_SUCCESS,
        authData: authData
    };
};

export const logoutFail = (error) => {
    return {
        type: actions.LOGOUT_FAIL,
        error: error
    };
};

export const logOut = () => {
    return (dispatch) => {
        dispatch(logoutStart());
        const logoutInfo = {
        }
        axios.post('/logout', logoutInfo)
            .then(response => {
                console.log('logout : ',response.data);
                dispatch(logoutSuccess(response.data))
            })
            .catch(err => {
                console.log('Error : ', err);
                dispatch(logoutFail(err));
             } )
    };
};
