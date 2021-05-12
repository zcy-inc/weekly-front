import { HOME_LIST } from './actionTypes';

const initState = {
  cardList: [],
};

export default (state = initState, action) => {
  switch (action.type) {
  case HOME_LIST:
    return {
      ...state,
      cardList: [...action.payload.list],
    };
  default:
    return state;
  }
};
