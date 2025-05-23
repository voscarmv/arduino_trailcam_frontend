import types from './types';

export const login = (record) => ({
    type: types.LOGIN,
    data: record.data,
})

export const gallery = (record) => ({
    type: types.GALLERY,
    data: record.data
})

export const picture = (record) => ({
    type: types.PICTURE,
    data: record.data
})
