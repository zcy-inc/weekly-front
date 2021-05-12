import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const {
      data: { count = '' },
    } = this.props;
    return (
      <li className="weekly__item">
        <Link
          to={`detail/${count}`}
          className="weekly__item__url"
          target="_blank"
        >
          <img
            src={`/static/images/${count}.png`}
            alt={`第${count}期封面图`}
            className="weekly__item__cover lazy"
          />
          <h3 className="weekly__item__title">前端小报总第 {count} 期</h3>
        </Link>
      </li>
    );
  }
}
