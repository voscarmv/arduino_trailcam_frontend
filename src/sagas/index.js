import {
    all,
    call,
    put,
    take,
    takeEvery,
} from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga';
import {
    fetchLogin,
    fetchRegenToken,
    fetchConsumer,
} from './api';
import reducerTypes from '../reducers/types';
import actionTypes from '../actions/types';

function* login(action) {
    yield put({ type: reducerTypes.LOGIN_LOADING });
    try {
        const response = yield call(fetchLogin, action.data);
        yield put({ type: reducerTypes.LOGIN_SUCCESS, payload: JSON.stringify(response) });
    } catch (e) {
        yield put({ type: reducerTypes.LOGIN_ERROR, error: e.message });
    }
}

function* regenToken(action) {
    yield put({ type: reducerTypes.REGENTOKEN_LOADING });
    try {
      const response = yield call(fetchRegenToken, action.data);
      yield put({ type: reducerTypes.REGENTOKEN_SUCCESS, payload: JSON.stringify(response) });
    } catch (e) {
      yield put({ type: reducerTypes.REGENTOKEN_ERROR, error: e.message });
    }
  }

const subscribe = (token) => {
    const consumer = fetchConsumer(token);
    return eventChannel(emit => {
        const subscription = consumer.subscriptions.create(
            { channel: "NotificationsChannel" },
            {
                connected() {
                    console.log("Connected to NotificationsChannel.");
                },
                disconnected() {
                    console.log("Disconnected from NotificationsChannel.");
                    emit(END);
                },
                received(data) {
                    console.log("Received:", data);
                    emit({ type: reducerTypes.NOTIFICATION, payload: data });
                },
            }
        );
        return subscription;
    });
}

// Watches for LOGIN_SUCCESS and starts the WebSocket subscription
function* watchLoginSuccess() {
    while (true) {
      const action = yield take(reducerTypes.LOGIN_SUCCESS);
      const token = JSON.parse(action.payload).data.token; // Adjust based on your response structure
      yield call(handleWebSocketSubscription, token);
      yield put({ type: actionTypes.REGENTOKEN, data: token }); // Regenerate token for better security
    }
  }
  
  // Handles the WebSocket subscription
  function* handleWebSocketSubscription(token) {
    const channel = yield call(subscribe, token);
    try {
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    } finally {
      channel.close();
    }
  }

// function* callCreateBlockChannel(token) {
//     const blockChannel = yield call(subscribe, token);
//     try {
//         while (true) {
//             var event = yield take(blockChannel)
//             yield put(event)
//         }
//     } finally {
//         blockChannel.close()
//     }
// }

export function* watchLogin() {
    yield takeEvery(actionTypes.LOGIN, login);
}

export function* watchRegenToken() {
    yield takeEvery(actionTypes.REGENTOKEN, regenToken);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        call(watchLogin),
        call(watchLoginSuccess),
        call(watchRegenToken)
    ])
}