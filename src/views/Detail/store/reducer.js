import { WEEKLY_DETAIL, RESET_DETAIL } from './actionTypes';

const initState = {
  weeklyDetail: [],
};

export default (state = initState, action) => {
  switch (action.type) {
  case WEEKLY_DETAIL:
    return {
      ...state,
      weeklyDetail: [...action.payload.detail],
    };
  case RESET_DETAIL:
    return {
      ...state,
      weeklyDetail: [],
    };
  default:
    return state;
  }
};
