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
    fetchViewPicture,
} from './api';
import reducerTypes from '../reducers/types';
import actionTypes from '../actions/types';

function* login(action) {
    yield put({ type: reducerTypes.LOGIN_LOADING });
    try {
        const response = yield call(fetchLogin, action);
        const token = response.body.data.token;
        yield fork(actionCableSubscribe, token);
        yield call(regenToken, token); // Regenerate token for better security
    } catch (e) {
        yield put({ type: reducerTypes.LOGIN_ERROR, error: e.message });
    }
}

function getToken(headers) {
    return headers.get('Authorization').split(' ')[1]
}

function* regenToken(token) {
    yield put({ type: reducerTypes.REGENTOKEN_LOADING });
    try {
        const response = yield call(fetchRegenToken, { data: { token: token } });
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
    yield put({
        type: reducerTypes.REGENTOKEN_SUCCESS,
        payload: token
    });
}

function* gallery(action) {
    yield put({ type: reducerTypes.GALLERY_LOADING });
    try {
        const response = yield call(fetchAllPictures, action);
        yield put({
            type: reducerTypes.GALLERY_SUCCESS,
            payload: JSON.stringify(response.body.data)
        });
        yield call(newToken, getToken(response.headers));
    } catch (e) {
        yield put({ type: reducerTypes.GALLERY_ERROR, error: e.message });
    }
}

function* picture(action) {
    yield put({type: reducerTypes.PICTURE_LOADING});
    try{
        const response = yield call(fetchViewPicture, action);
        yield put({
            type: reducerTypes.PICTURE_SUCCESS,
            payload: {
                imgurl: action.data.imgurl,
                response: response.body.data
            }
        });
        yield call(newToken, getToken(response.headers));
    } catch(e) {
        yield put({ type: reducerTypes.PICTURE_ERROR, error: e.message });
    }
}

const subscribe = (token) => {
    const consumer = fetchConsumer(token);
    return eventChannel(emit => {
        const subscription = consumer.subscriptions.create(
            { channel: "NotificationsChannel" },
            {
                connected() {
                    emit({
                        type: reducerTypes.NOTIFICATION_SUCCESS,
                        payload: 'Connected to NotificationsChannel'
                    });
                },
                disconnected() {
                    emit({
                        type: reducerTypes.NOTIFICATION_SUCCESS,
                        payload: 'Disconnected from NotificationsChannel'
                    });
                    emit(END);
                },
                received(data) {
                    emit({
                        type: reducerTypes.NOTIFICATION_SUCCESS,
                        payload: JSON.stringify(data)
                    });
                },
            }
        );
        return () => {
            subscription.unsubscribe();
        };
    });
}

function* actionCableSubscribe(token) {
    yield put({ type: reducerTypes.NOTIFICATION_LOADING });
    let channel;
    try {
        channel = yield call(subscribe, token);
        while (true) {
            const action = yield take(channel);
            yield put(action);
        }
    } catch (e) {
        yield put({ type: reducerTypes.NOTIFICATION_ERROR, error: e.message });
    } finally {
        if (channel) channel.close();
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

export function* watchPicture() {
    yield takeEvery(actionTypes.PICTURE, picture);
}

export default function* rootSaga() {
    yield all([
        call(watchLogin),
        call(watchGallery),
        call(watchPicture)
    ]);
}