import React, { Component } from 'react';

import NavigationAppBar from './components/Navigation/AppBar/NavigationAppBar';
import ErrorBar from './components/ErrorBar/ErrorBar';
import UserProfile from './components/UI/UserProfile';
import Main from './components/Mainpage/MainLayout';

import { Route } from 'react-router-dom';

import classes from './App.css';


class App extends Component {
  render () {
    console.log('[App] rendered...');
    return (
      <div className={classes}>

        <NavigationAppBar appName="MANDARINE"/>
        <ErrorBar duration={4000}/>
        <Route path='/' component={Main} />
        <Route path='/user/profile/:id' component={UserProfile} />

       

      </div>
    );
  }
}

export default App ;


