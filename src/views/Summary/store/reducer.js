import { SUMMARY } from './actionTypes';

const initState = {
  overview: {},
};

export default (state = initState, action) => {
  switch (action.type) {
  case SUMMARY:
    return {
      ...state,
      overview: action.payload.overview,
    };
  default:
    return state;
  }
};
