import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import Snackbar from '@material-ui/core/Snackbar';
import * as actions from '../../MainStore/actions/index';

import * as utils from '../../utilities/utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ErrorBar = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);



  const closeHandler = () => {
      props.onClose();
  }

  const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };
  const severityMessage = utils.capitalize(props.severity);

  return (
    <div ref= {ref} className={classes.root}>
      <Snackbar
            anchorOrigin= {anchorOrigin}
            open={props.open} 
            autoHideDuration={props.duration} 
            onClose={closeHandler}
        >
        <Alert onClose={closeHandler} severity={props.severity}>
          <AlertTitle>{severityMessage}</AlertTitle>
            {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
})

const mapStateToProps = (state) => {
    return {
        open: state.error.open,
        severity: state.error.severity,
        message: state.error.message,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onClose: () => dispatch(actions.closeError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar);
