import request from '../../../utils/request';
import { HOME_LIST } from './actionTypes';

const weeklyListUrl = '/api/weeks/list';

export const getList = list => ({
  type: HOME_LIST,
  payload: { list },
});

export const getListEffect = () => (dispatch) => {
  return request.get(weeklyListUrl).then((res) => {
    dispatch(getList(res.data));
  });
};

/* 服务端请求数据 */
export const homeLoadData = (store) => {
  return store.dispatch(getListEffect());
};
