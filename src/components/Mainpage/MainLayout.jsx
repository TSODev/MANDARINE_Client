import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MainHeader from './MainHeader';
import MainContent from './MainContent';
import MainFooter from './MainFooter';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      minHeight: '100vh',
      backgroundColor: '#a1b2c3',
    },
    header: {
      height: '12vh',
      margin: theme.spacing(1,0,0,1),
    },
    content: {
      height: '80vh',
      margin: theme.spacing(0,0,1,1),
    },
    footer: {
        backgroundColor:'lightblue',
        height: '6vh',
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  

const MainLayout = (props) => {

    const classes = useStyles();


    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12}>
                    <Paper className={classes.header}>
                      <MainHeader />
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper className={classes.content}>
                      <MainContent />
                    </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Container className={classes.footer}>
                    <MainFooter />
                    </Container>
                </Grid>
            </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default MainLayout;