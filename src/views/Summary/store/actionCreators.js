import request from '../../../utils/request';
import { SUMMARY } from './actionTypes';

const weeklySummaryUrl = '/api/summary/overview';

export const getSummary = overview => ({
  type: SUMMARY,
  payload: { overview },
});

export const getSummaryEffect = () => (dispatch) => {
  return request.get(weeklySummaryUrl).then((res) => {
    dispatch(getSummary(res.data));
  });
};

/* 服务端请求数据 */
export const SummaryLoadData = (store) => {
  return store.dispatch(getSummaryEffect());
};
