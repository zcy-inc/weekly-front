import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithStyles } from '@components';
import Card from './components/Card';
import styles from './index.less';
import { actionCreators } from './store';

@WithStyles(styles)
@connect(
  state => ({ homeStore: state.homeStore }),
  dispatch => ({
    getHomeList: () => dispatch(actionCreators.getListEffect()),
  })
)
export default class Home extends Component {
  componentDidMount() {
    const { cardList } = this.props.homeStore;
    if (!cardList.length) {
      this.props.getHomeList();
    }
  }

  render() {
    const { cardList } = this.props.homeStore;
    if (!cardList.length) return null;
    const reverseList = cardList.slice().reverse();
    return (
      <div className="card-wrapper">
        <h2 className="hidden-title">Weekly List</h2>
        <ol className="weekly__list" reversed>
          {reverseList.map(card => (
            <Card
              data={card}
              key={card.id}
              staticContext={this.props.staticContext}
            />
          ))}
        </ol>
      </div>
    );
  }
}
