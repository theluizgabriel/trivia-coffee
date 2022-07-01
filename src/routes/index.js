import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configuração from '../pages/Configuracao';
import Feedback from '../pages/Feedback';
import Login from '../pages/Login';
import TeladeGames from '../pages/TelaDeGames';
import Feedback from '../pages/Feedback';

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/teladegames" component={ TeladeGames } />
      <Route exact path="/configuracao" component={ Configuração } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}
