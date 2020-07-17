import {
  call,
  put,
  fork,
  delay,
  take,
  cancel,
  race,
  takeLatest,
  all
} from 'redux-saga/effects';
import { getError } from '../services/Utils';
import { UserPostActions } from '../redux/actions';
import { navigate } from '../navigation/NavigationRefs';
import { Navigations } from '../constants';
import { StaticTypes } from '../redux/types';
import { eventChannel } from 'redux-saga';

function* handleResponse(response, success, filure) {
  if (response.status === 200) {
    yield put(success(response.data));
  } else {
    const error = yield call(getError, response);
    yield put(filure(error));
  }
}

export function* getUserPost(api, action) {
  //Composing Sagas
  const [post, comments] = yield all([
    call(api.getAllPost, action.payload),
    call(api.getAllComments, action.payload)
  ]);
  const response = { ...post, ...comments };
  //Sequencing
  yield* handleResponse(
    response,
    UserPostActions.successUserPost,
    UserPostActions.failedTodos
  );
}

//channel
function clock(falseCount) {
  return eventChannel(emitter => {
    const timer = setInterval(() => {
      emitter(falseCount);
    }, 1000 * 2);
    return () => {
      clearInterval(timer);
    };
  });
}

function log() {
  put(UserPostActions.channelExicution());
}

export function* getLogs() {
  const channel = yield call(clock, 0);
  yield takeLatest(channel, log);
}

//race
function* forkTheTask(api, action) {
  const { response } = yield race({
    response: call(api.getSinglePost, action.payload),
    timeout: delay(500)
  });
  yield delay(2000);
  if (response.status === 200) {
    yield put(UserPostActions.foundSingle(response.data));
    navigate(Navigations.Post);
  } else {
    yield call(getError, response);
  }
}

//fork
export function* getSinglePost(api, action) {
  const task = yield fork(forkTheTask, api, action);
  const ifCancel = yield take(StaticTypes.CANCEL_FORK_REQ);
  if (ifCancel.type === StaticTypes.CANCEL_FORK_REQ) {
    //Task cancellation
    yield cancel(task);
  }
}
