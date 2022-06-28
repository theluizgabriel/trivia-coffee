import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from '../App';
import Login from '../pages/Login';
import TeladeGames from '../pages/TelaDeGames';

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/teladegames" component={ TeladeGames } />
      {/* <Route exact path="/carteira" component={ Wallet } /> */}
    </Switch>
  );
}
