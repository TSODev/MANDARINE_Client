import React, { Component } from 'react';

import NavigationAppBar from './components/Navigation/AppBar/NavigationAppBar';


import { Route } from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';


import './App.css';


class App extends Component {
  render () {
    return (
      <div className='App'>
        <NavigationAppBar appName="MANDARINE"/>
      </div>
    );
  }
}

export default App;


