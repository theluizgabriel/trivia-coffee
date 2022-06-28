import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configuração from '../pages/Configuracao';
import Login from '../pages/Login';
import TeladeGames from '../pages/TelaDeGames';

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/teladegames" component={ TeladeGames } />
      <Route exact path="/configuracao" component={ Configuração } />
    </Switch>
  );
}
