import * as actions from '../actionTypes'


export const errorShow = (error) => {
    return {
        type: actions.ERROR_SHOW,
        error: error                            // error should be {severity (error, warning, info, success), message}
    }
}

export const errorClose = () => {
    return {
        type: actions.ERROR_CLOSE
    }
}

export const showError = (err) => {
    console.log(err);
    return (dispatch) => {
        const error = {
            severity: err.severity,
            message: err.message,
        }
        dispatch(errorShow(err));
    }
}

export const closeError = () => {
    return (dispatch) => {
        console.log('dispatch Closing');
        dispatch(errorClose());
    }
}
