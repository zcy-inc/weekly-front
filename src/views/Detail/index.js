import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WithStyles } from '@components';
import request from '@utils/request';
import { isNumeric } from '@utils/utils';
import { Helmet } from 'react-helmet';
import { actionCreators } from './store';
import styles from './index.less';

@WithStyles(styles)
@connect(
  state => ({ detailStore: state.detailStore }),
  dispatch => ({
    getDetail: week => dispatch(actionCreators.getDetailEffect(week)),
    resetDetail: () => dispatch(actionCreators.resetDetail()),
  })
)
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      homeList: [],
      tags: [],
    };
  }

  componentDidMount = () => {
    this.getDate();
    this.getHomeList();
    this.getTags();
    if (!this.props.detailStore.weeklyDetail.length) {
      const { week } = this.props.match.params;
      this.props.getDetail(week);
    }
  };

  componentDidUpdate = (prevProps) => {
    const { week } = this.props.match.params;
    if (week !== prevProps.match.params.week) {
      this.props.getDetail(week);
      this.getDate();
    }
  };

  componentWillUnmount = () => {
    this.props.resetDetail();
  };

  getDate = () => {
    const week = this.props.match.params.week;
    if (!isNumeric(week)) return;
    request
      .get(`/api/weeks/list?count=${this.props.match.params.week}`)
      .then((res) => {
        if (res.data && res.data[0]) {
          this.setState({
            date: new Date(res.data[0].datetime).toLocaleDateString(),
          });
        }
      });
  };

  getHomeList = () => {
    request.get('/api/weeks/list').then((res) => {
      this.setState({
        homeList: res.data,
      });
    });
  };

  getTags = () => {
    request.get('/api/categories/list').then((res) => {
      this.setState({
        tags: res.data,
      });
    });
  };

  renderDetail = (weeklyDetail) => {
    if (!weeklyDetail || !weeklyDetail.length) return '暂无数据';
    return weeklyDetail.map(card => (
      <li key={card.id} className="item">
        <a href={card.link} target="_blank" rel="noopener noreferrer">
          <h4>
            {card.title} <span className="item__tag">{card.category}</span>
          </h4>
        </a>
        <blockquote className="detail-item-content">
          {card.description}
        </blockquote>
      </li>
    ));
  };

  renderHistoryIndex = (homeList) => {
    if (!homeList || !homeList.length) return '暂无数据';
    const reverseList = homeList.slice().reverse().slice(0, 10);
    return reverseList.map(card => (
      <li key={card.count}>
        <Link
          to={`/detail/${card.count}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>{card.title}</h4>
        </Link>
      </li>
    ));
  };

  renderTags = (tags) => {
    if (!tags || !tags.length) return '暂无数据';
    return tags.map(tag => (
      <li key={tag.name}>
        <Link
          to={`/detail/${tag.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>{tag.name}</h4>
        </Link>
      </li>
    ));
  };

  render() {
    const { date, homeList, tags } = this.state;
    const { weeklyDetail } = this.props.detailStore;
    const { week } = this.props.match.params;
    return (
      <div className="detail-container">
        <Helmet>
          {isNumeric(week) ? (
            <title>政采云前端小报第{week}期 - Zoo Weekly!</title>
          ) : (
            <title>{week} - Zoo Weekly! 政采云前端小报</title>
          )}
        </Helmet>
        <div className="detail">
          {isNumeric(week) ? (
            <h2 className="title">
              政采云前端小报第{week}期 <time>♨ {date}</time>
            </h2>
          ) : (
            <h2 className="title">#{week}</h2>
          )}
          <ol className="list">{this.renderDetail(weeklyDetail)}</ol>
        </div>

        <aside>
          <h3 className="aside__title">往期小报</h3>
          <ol className="weekly_list">{this.renderHistoryIndex(homeList)}</ol>

          <h3 className="aside__title">标签集合</h3>
          <ul className="tags">{this.renderTags(tags)}</ul>
        </aside>
      </div>
    );
  }
}
