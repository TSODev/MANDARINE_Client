import axios from '../../../axios-atlas';
import * as actions from '../actionTypes'

export const registerShow = () => {
    return {
        type: actions.SIGNUP_SHOWMODAL
    }
};

export const registerClose = () => {
    return {
        type: actions.SIGNUP_CLOSEMODAL
    }
}

export const registerStart = () => {
    return {
        type: actions.SIGNUP_START
    };
};

export const registerSuccess = (authData) => {
    return {
        type: actions.SIGNUP_SUCCESS,
        authData: authData
    };
};

export const registerFail = (error) => {
    return {
        type: actions.SIGNUP_FAIL,
        error: error
    };
};

export const register = (email, password, firstname, lastname) => {
    return (dispatch) => {
        dispatch(registerStart());
        const authData = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            company: 'EXAMPLE',
            roles: ['USER'],
        }
        axios.post('/signup', authData)
            .then(response => {
                console.log(response.data);
                dispatch(registerSuccess(response.data))
            })
            .catch(err => {
                console.log('Error : ', err);
                dispatch(registerFail(err));
             } )
    };
};

export const showSignUpModal = (show) => {
    return (dispatch) => {
        if (show) {
            dispatch(registerShow())
        } else {
            dispatch(registerClose())
        }
    }
}