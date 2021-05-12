import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BasicLayout from './basicLayout';

class Layout extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" render={props => <BasicLayout {...props} />} />
      </Switch>
    );
  }
}

export default Layout;
