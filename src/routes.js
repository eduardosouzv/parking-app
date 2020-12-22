import React from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';

import Home from './pages/entrada';
import Saida from './pages/saida';
import Relatorio from './pages/relatorio';

import './App.css'

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Entrada</Link>
            <Link className="navbar-brand" to="/saida">Saida</Link>
            <Link className="navbar-brand" to="/relatorio">Relatorio</Link>
            <h3 className="navbar-brand ml-auto">Parking App</h3>
        </div>
        <div className="">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/saida" component={Saida} />
          <Route path="/relatorio" component={Relatorio} />
        </Switch>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default Routes;