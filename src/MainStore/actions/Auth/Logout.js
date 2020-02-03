import axios from '../../../axios-atlas';
import * as actions from '../actionTypes'
//import * as type from '../types/AuthTypes';

export const logoutStart = () => {
    return {
        type: actions.LOGOUT_START
    };
};


export const logoutSuccess = (authData) => {
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

export const error = (error) => {
    return {
        type: actions.ERROR_SHOW,
        error : { severity: error.severity, message: error.message},
    } 
}

export const logOut = () => {
    return (dispatch) => {
        dispatch(logoutStart());
        const logoutInfo = {
        }
        axios.post('/logout', logoutInfo)
            .then(response => {
                dispatch(logoutSuccess(response.data))
            })
            .catch(err => {
                console.log('Error : ', err);
                dispatch(logoutFail(err));
                dispatch(error({severity: "error", message: err.message}));
             } )
    };
};
