import React, { Component } from 'react';
import { connect } from 'react-redux';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { actionCreators } from './store';

import './index.less';

@connect(
  state => ({ summaryStore: state.summaryStore }),
  dispatch => ({
    getSummary: () => dispatch(actionCreators.getSummaryEffect()),
  })
)
export default class Summary extends Component {
  componentDidMount() {
    const { overview } = this.props.summaryStore;
    if (!overview.articleTotal) {
      this.props.getSummary().then(() => {
        this.initBarEcharts(this.props.summaryStore.overview);
        this.initCategoryChart(this.props.summaryStore.overview);
      });
    } else {
      this.initBarEcharts(overview);
      this.initCategoryChart(overview);
    }
  }

  initBarEcharts = (overview) => {
    const { weekMap = [], categoryMap = [], monthMap = [] } = overview;
    const xAxis = [];
    const data = [];
    const CategoryAxis = [];
    const CategoryData = [];
    const monthAxis = [];
    const monthData = [];

    weekMap.map((item) => {
      xAxis.push(`第 ${item.week} 周`);
      data.push(item.count);
    });
    categoryMap.map((item) => {
      CategoryAxis.push(`${item.category}`);
      CategoryData.push(item.count);
    });
    monthMap.map((item) => {
      monthAxis.push(`${item.month} 月`);
      monthData.push(item.count);
    });

    const categoryOption = {
      title: {
        text: '小报分类数据',
      },
      tooltip: {},
      xAxis: {
        data: CategoryAxis,
      },
      yAxis: {},
      series: [
        {
          name: '分类统计',
          type: 'bar',
          data: CategoryData,
        },
      ],
    };

    const monthOption = {
      title: {
        text: '小报月度数据',
      },
      tooltip: {},
      xAxis: {
        data: monthAxis,
      },
      yAxis: {},
      series: [
        {
          name: '分类统计',
          type: 'bar',
          data: monthData,
        },
      ],
    };

    const option = {
      title: {
        text: '小报周度数据',
      },
      legend: {
        data: ['bar'],
        align: 'left',
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled'],
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxis,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: '周数:发布文章数',
          type: 'bar',
          data,
          animationDelay(idx) {
            return idx * 10;
          },
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate(idx) {
        return idx * 5;
      },
    };

    const WChart = echarts.init(document.getElementById('bar-chart'));
    WChart.setOption(option);

    const CChart = echarts.init(document.getElementById('category-chart-all'));
    CChart.setOption(categoryOption);

    const MChart = echarts.init(document.getElementById('month-chart'));
    MChart.setOption(monthOption);
  };

  initCategoryChart = (overview) => {
    const { categoryMap = [] } = overview;
    const xAxis = [];
    const data = [];

    categoryMap.slice(0, 6).map((item) => {
      xAxis.push(item.category);
      data.push({
        value: item.count,
        name: item.category,
      });
    });
    const option = {
      title: {
        text: '小报分类排名前六数据',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: xAxis,
      },
      series: [
        {
          name: '分类',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            normal: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center',
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
          },
          data,
        },
      ],
    };

    const myChart = echarts.init(document.getElementById('category-chart'));
    myChart.setOption(option);
  };

  render() {
    const { overview } = this.props.summaryStore;
    return (
      <React.Fragment>
        <h2 className="summary-title">政采云前端小报半年期数据</h2>
        <div className="info-wrapper">
          <span className="info">
            累计文章：
            <span style={{ color: '#222' }}>
              {overview ? ((overview.articleTotal || [])[0] || {}).count : null}
            </span>
            篇
          </span>
          <span className="info">
            累计分类：
            <span style={{ color: '#222' }}>
              {overview
                ? ((overview.categoryTotal || [])[0] || {}).count
                : null}
            </span>
            类
          </span>
        </div>

        <div
          id="bar-chart"
          style={{ width: 1600, height: 400, margin: '0 auto' }}
        />
        <div
          id="month-chart"
          style={{ width: 1600, height: 400, margin: '0 auto' }}
        />
        <div
          id="category-chart-all"
          style={{ width: 1600, height: 400, margin: '0 auto' }}
        />
        <div
          id="category-chart"
          style={{ width: 1600, height: 400, margin: '0 auto' }}
        />
      </React.Fragment>
    );
  }
}
