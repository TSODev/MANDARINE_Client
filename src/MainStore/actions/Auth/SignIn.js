import axios from '../../../axios-atlas';
import * as actions from '../actionTypes'
import * as utils from '../../../utilities/utils';
//import * as type from '../types/AuthTypes';

export const signinShow = () => {
    return {
        type: actions.SIGNIN_SHOWMODAL
    }
}

export const signinClose = () => {
    return {
        type: actions.SIGNIN_CLOSEMODAL
    }
}

export const signinStart = () => {
    return {
        type: actions.SIGNIN_START
    };
};


export const signinSuccess = (authData) => {
    return {
        type: actions.SIGNIN_SUCCESS,
        authData: authData
    };
};

export const userResetMode = () => {
    return {
        type: actions.USER_MODE_VIEW,
    }
}

export const signinFail = (error) => {
    return {
        type: actions.SIGNIN_FAIL,
        error: error
    };
};

export const error = (error) => {
    return {
        type: actions.ERROR_SHOW,
        error : { severity: error.severity, message: error.message},
    } 
}

export const signIn = (email, password) => {
    return (dispatch) => {
        dispatch(signinStart());
        const userInfo = {
            email: email,
            password: password
        }
        axios.post('/login', userInfo)
            .then(response => {
                dispatch(userResetMode());
                dispatch(signinSuccess(response.data))
            })
            .catch(err => {
                dispatch(signinFail(err));
                dispatch(error({severity: "error", message: err.message}));
             } )
    };
};

export const showSignInModal = (show) => {
    return (dispatch) => {
        if (show) {
            dispatch(signinShow())
        } else {
            dispatch(signinClose())
        }
    }
}