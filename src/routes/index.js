import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from '../App';
import Login from '../pages/Login';

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route path="/login" component={ Login } /> */}
      {/* <Route exact path="/carteira" component={ Wallet } /> */}
    </Switch>
  );
}
