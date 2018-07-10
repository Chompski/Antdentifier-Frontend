import React, { Component } from 'react';
import logo from './ants.gif';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./NotFound"
import Body from "./Body"

class App extends Component {
  render() {

    return (
      <div className="App" align="center">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <body className="App-Body" align="center">
          <Body />
        </body>
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
