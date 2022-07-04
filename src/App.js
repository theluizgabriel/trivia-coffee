import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configuração from './pages/Configuracao';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/teladegames" component={ Game } />
      <Route exact path="/configuracao" component={ Configuração } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
