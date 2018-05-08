import React, { Component } from 'react';
import Home from './components/home'
import Dashboard from './components/dashboard'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/home' component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
