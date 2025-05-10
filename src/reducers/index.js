import { combineReducers } from 'redux';
import types from './types';

function login(state = {}, action) {
    switch (action.type) {
        case types.LOGIN_LOADING:
            return {
                loading: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case types.LOGIN_ERROR:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

function notification(state={}, action){
    switch (action.type) {
        case types.NOTIFICATION:
          return action.payload;
        default:
          return state;
      }
}

function gallery(state = {}, action) {
    switch (action.type) {
        case types.GALLERY_LOADING:
            return {
                loading: true,
            };
        case types.GALLERY_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case types.GALLERY_ERROR:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

function picture(state = {}, action) {
    switch (action.type) {
        case types.PICTURE_LOADING:
            return {
                loading: true,
            };
        case types.PICTURE_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case types.PICTURE_ERROR:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default combineReducers({
    loginStore: login,
    notificationStore: notification,
    galleryStore: gallery,
    pictureStore: picture
});