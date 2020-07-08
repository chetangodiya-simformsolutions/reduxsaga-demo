import { combineReducers } from 'redux';
import { userPostReducer } from './reducers/userPost';

export default combineReducers({
  posts: userPostReducer
});
