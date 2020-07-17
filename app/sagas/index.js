import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import Api from '../services/Api';
import { getUserPost, getSinglePost, getLogs } from './userPost';
import { StaticTypes } from '../redux/types';
import { UserPostTypes } from '../redux/actions';

// The API we use is only used from Sagas, so we create it here and pass along
const posts = Api.userPost();

//basic logger
function logger(action) {
  //enable below line to activate logs
  //console.log('action ', action.type);
}

export default function* rootSaga() {
  //Parallel effects
  yield all([
    takeEvery('*', logger),
    takeLatest(UserPostTypes.REQUEST_USER_POST, getUserPost, posts),
    takeLatest(UserPostTypes.GET_SINGLE, getSinglePost, posts),
    takeLatest(StaticTypes.PRINT_LOGS, getLogs)
  ]);
}
