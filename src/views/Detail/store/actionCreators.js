import request from '@utils/request';
import { isNumeric } from '@utils/utils';
import { WEEKLY_DETAIL, RESET_DETAIL } from './actionTypes';

const weeklyListUrl = '/api/list';
const tagListUrl = '/api/articles/category';
export const getDetail = detail => ({
  type: WEEKLY_DETAIL,
  payload: { detail },
});

export const resetDetail = () => ({
  type: RESET_DETAIL,
});

export const getDetailEffect = week => (dispatch) => {
  let url = '';
  let params = null;
  if (isNumeric(week)) {
    url = weeklyListUrl;
    params = {
      week,
    };
  } else {
    url = tagListUrl;
    params = {
      category: week,
    };
  }
  return request
    .get(url, {
      params,
    })
    .then((res) => {
      dispatch(getDetail(res.data));
    });
};

/* 服务端请求数据 */
export const detailLoadData = (store, match) => {
  const { week } = match.params;
  return store.dispatch(getDetailEffect(week));
};
