import React, { Component } from 'react';
import './index.less';

export default class Header extends Component {
  render() {
    return (
      <header className="zoo-header">
        <h1 className="logo">
          <a href="/">Zoo Weekly! 政采云前端小报</a>
          <span className="router-links">
            <a href="/">首页</a>
            <a href="/summary">数据看板</a>
          </span>
        </h1>
      </header>
    );
  }
}
