import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Header, Footer } from '@components';
import { links, routesConfig } from '../../router/';
import './index.less';

export default class BasicLayout extends Component {
  render() {
    return (
      <div className="zoo-basic-layout">
        <Header>
          {links.map(l => (
            <NavLink to={l.path} key={l.path}>
              {l.title}
            </NavLink>
          ))}
        </Header>
        <main>
          {routesConfig.map(r => (
            <Route {...r} key={r.path} />
          ))}
        </main>
        <Footer />
      </div>
    );
  }
}
