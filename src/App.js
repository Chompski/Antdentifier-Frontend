import React, { Component } from 'react';
import logo from './ants.gif';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./NotFound"
import Body from "./SearchBody"

class App extends Component {
  state = {
    ants: []
  }
  render() {
 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Body />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" />
            <Route path="*" render={(props) => <NotFound {...props} />} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
