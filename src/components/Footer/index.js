import React, { Component, Fragment } from 'react';
import './index.less';

export const whatIsThisData = [
  {
    title: '关于前端小报',
    info: 'Zoo Weekly! 前端小报，是政采云前端团队的周度前端文章推荐汇总。',
  },
  {
    title: '文章来源构成',
    info: ' 前端小报的所有文章来源，都是由政采云的前端同学自发推荐汇总而得。',
  },
  {
    title: '为什么是Zoo',
    info:
      'Z 是政采云拼音首字母，oo 是无穷的符号，结合 Zoo有生物圈的含义，希望后续政采云的前端团队，不论是人才梯队，还是技术体系，都能各面兼备，逐渐成长为一个生态。',
  },
];

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <section className="about">
          <h2 className="hidden-title">About Zoo Weekly</h2>
          {whatIsThisData.map(d => (
            <dl className="footer-item" key={d.title}>
              <dt>
                <h3 className="title">{d.title}</h3>
              </dt>
              <dd className="info">{d.info}</dd>
            </dl>
          ))}
        </section>
        <footer className="zoo-footer">
          <p>
            Copyright © 2018-2019 By{' '}
            <strong className="footer__logo">
              <a
                href="http://zoo.team"
                target="_blank"
                rel="noopener noreferrer"
                className="zoo-team__site"
              >
                Zoo Team
              </a>
            </strong>
          </p>
        </footer>
      </Fragment>
    );
  }
}
