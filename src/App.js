import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/trybe-trivia-project/" component={ Login } />
      <Route path="/trybe-trivia-project/jogo" component={ Jogo } />
      <Route path="/trybe-trivia-project/settings" component={ Settings } />
      <Route path="/trybe-trivia-project/feedback" component={ Feedback } />
      <Route path="/trybe-trivia-project/ranking" component={ Ranking } />
    </Switch>
  );
}
