import * as actiontypes from '../actions/actionTypes';

import { updateObject } from '../../utilities/utils';

const initialState = {
    token: '',
    userId: '',
    email: '',
    firstname: '',
    lastname: '',
    company: '',
    roles: [''],
    isAuthenticated: false,
    error: '',
    loading: false,
    showSignInModal: false,
    showSignUpModal: false,
};

//type State = typeof initialState;

const signinShow = (state, action) => {
    return updateObject(state, {showSignInModal: true});
}

const signinClose = (state, actions) => {
    return updateObject(state, { showSignInModal: false});
}

const signinStart = ( state, action ) => {
    return updateObject(state, {error: null, loading: true, showSignInModal: true});
}

const signinSuccess = ( state, action) => {
    return updateObject(state, {
        email: action.authData.email,
        firstname: action.authData.firstname,
        lastname: action.authData.lastname,
        userId: action.authData.user_id,
        roles: action.authData.roles,
        company: action.authData.company,
        isAuthenticated: true,
        error: null,
        loading: false,
        showSignInModal: false,
    });
}

const signinFail = ( state, action ) => {
    return updateObject(state, {
        isAuthenticated: false,
        error: action.error,
        loading: false,
        showSignInModal: false,
    });
}

const signupShow = (state, action ) => {
    return updateObject(state, { showSignUpModal: true});
}

const signupClose = (state, action) => {
    return updateObject(state, { showSignUpModal: false});
}

const signupStart = ( state, action ) => {
    return updateObject(state, {error: null, loading: true, showSignUpModal: true});
}

const signupSuccess = ( state, action ) => {
    return updateObject(state, {
        token: action.authData.user.passwordDigest,
        userId: action.authData.user.user_id,
        isAuthenticated: false,
        error: null,
        loading: false,
        showSignUpModal: false,
    });
}

const signupFail = ( state, action ) => {
    return updateObject(state, {
        isAuthenticated: false,
        error: action.error,
        loading: false,
        showSignUpModal: false,
    });
}

const logoutStart = ( state, action ) => {
    return updateObject(state, {error: null, loading: true});
}

const logoutSuccess = ( state, action ) => {
    return updateObject(state, {
        token: '',
        userId: '',
        isAuthenticated: false,
        error: null,
        loading: false,
        email: '',
        firstname: '',
        lastname: '',
    });
}

const logoutFail = ( state, action ) => {
    return updateObject(state, {
        isAuthenticated: false,
        error: action.error,
        loading: false,
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.SIGNIN_SHOWMODAL: return signinShow(state, action);
        case actiontypes.SIGNIN_START: return signinStart(state, action);
        case actiontypes.SIGNIN_SUCCESS: return signinSuccess(state, action);
        case actiontypes.SIGNIN_FAIL: return signinFail(state, action);
        case actiontypes.SIGNIN_CLOSEMODAL: return signinClose(state, action);
        case actiontypes.SIGNUP_SHOWMODAL: return signupShow(state, action);
        case actiontypes.SIGNUP_START: return signupStart(state, action);
        case actiontypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actiontypes.SIGNUP_FAIL: return signupFail(state, action);
        case actiontypes.SIGNUP_CLOSEMODAL: return signupClose(state, action);
        case actiontypes.LOGOUT_START: return logoutStart(state, action);
        case actiontypes.LOGOUT_SUCCESS: return logoutSuccess(state, action);
        case actiontypes.LOGOUT_FAIL: return logoutFail(state, action);
        default:
            return state;
    }
};

export default reducer;