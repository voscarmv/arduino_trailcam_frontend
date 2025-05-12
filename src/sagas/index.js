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
    fetchAllPictures,
} from './api';
import reducerTypes from '../reducers/types';
import actionTypes from '../actions/types';

function* login(action) {
    yield put({ type: reducerTypes.LOGIN_LOADING });
    try {
        const response = yield call(fetchLogin, { body: action.data });
        const token = response.body.data.token;
        yield fork(actionCableSubscribe, token);
        yield call(regenToken, token); // Regenerate token for better security
    } catch (e) {
        yield put({ type: reducerTypes.LOGIN_ERROR, error: e.message });
    }
}

function getToken(headers){
    return headers.get('Authorization').split(' ')[1]
}

function* regenToken(token) {
    yield put({ type: reducerTypes.REGENTOKEN_LOADING });
    try {
        const response = yield call(fetchRegenToken, { token: token });
        yield put({
            type: reducerTypes.REGENTOKEN_SUCCESS,
            payload: getToken(response.headers)
        });
    } catch (e) {
        yield put({ type: reducerTypes.REGENTOKEN_ERROR, error: e.message });
    }
}

function* newToken(token) {
    yield put({ type: reducerTypes.REGENTOKEN_LOADING });
    try {
        yield put({
            type: reducerTypes.REGENTOKEN_SUCCESS,
            payload: token
        });
    } catch (e) {
        yield put({ type: reducerTypes.REGENTOKEN_ERROR, error: e.message });
    }
}

function* gallery(action) {
    yield put({type:reducerTypes.GALLERY_LOADING});
    try{
        const response = yield call(fetchAllPictures(action));
        yield put({
            type: reducerTypes.GALLERY_SUCCESS,
            payload: JSON.stringify(response.body)
        });
        yield call(newToken, getToken(response.headers));
    } catch (e) {
        yield put({ type: reducerTypes.GALLERY_ERROR, error: e.message });
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

function* actionCableSubscribe(token) {
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

export function* watchNewToken() {
    yield takeEvery(actionTypes.NEWTOKEN, newToken);
}

export function* watchGallery() {
    yield takeEvery(actionTypes.GALLERY, gallery);
}

export default function* rootSaga() {
    yield all([
        call(watchLogin),
        call(watchGallery)
    ])
}