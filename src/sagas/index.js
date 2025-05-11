import {
    all,
    call,
    fork,
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
        const response = yield call(fetchLogin, { body: action.data });
        // yield put({
        //     type: reducerTypes.LOGIN_SUCCESS,
        //     payload: JSON.stringify(response)
        // });
        const token = response.data.token;
        yield fork(handleWebSocketSubscription, token);
        // yield call(console.log('regen1'));
        yield call(regenToken, token); // Regenerate token for better security
    } catch (e) {
        yield put({ type: reducerTypes.LOGIN_ERROR, error: e.message });
    }
}

function* regenToken(token) {
    yield put({ type: reducerTypes.REGENTOKEN_LOADING });
    try {
        const response = yield call(fetchRegenToken, { token: token });
        yield put({
            type: reducerTypes.REGENTOKEN_SUCCESS,
            payload: JSON.stringify(response)
        });
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
                    emit({
                        type: reducerTypes.NOTIFICATION,
                        payload: JSON.stringify(data)
                    });
                },
            }
        );
        return () => {
            console.log("Unsubscribing from NotificationsChannel.");
            subscription.unsubscribe();
        };
    });
}

function* handleWebSocketSubscription(token) {
    const channel = yield call(subscribe, token);
    try {
        while (true) {
            const action = yield take(channel);
            yield call(console.log, action);
            yield put(action);
        }
    } finally {
        channel.close();
    }
}

export function* watchLogin() {
    yield takeEvery(actionTypes.LOGIN, login);
}

export function* watchRegenToken() {
    yield takeEvery(actionTypes.REGENTOKEN, regenToken);
}

export default function* rootSaga() {
    yield all([
        call(watchLogin),
        call(watchRegenToken)
    ])
}