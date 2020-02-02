import React, { Component } from 'react';

import NavigationAppBar from './components/Navigation/AppBar/NavigationAppBar';
import ErrorBar from './components/Error/Error';


import { Route } from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';


import './App.css';


class App extends Component {
  render () {
    return (
      <div className='App'>
        <NavigationAppBar appName="MANDARINE"/>
        <ErrorBar duration={4000}/>
      </div>
    );
  }
}

export default App;


