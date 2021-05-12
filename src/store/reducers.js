import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../views/Home/store';
import { reducer as detailReducer } from '../views/Detail/store';
import { reducer as summaryReducer } from '../views/Summary/store';

const reducer = combineReducers({
  homeStore: homeReducer,
  detailStore: detailReducer,
  summaryStore: summaryReducer,
});

export default reducer;
