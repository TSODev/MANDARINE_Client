import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef702b',              //Mandarine
    },
    secondary: {
      main: '#b5856e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      paper: '#eee',
      grey1: '#aaa',
      grey2: '#888',
      white: '#fff',
    },
  },
});

export default theme;