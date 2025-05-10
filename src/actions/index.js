import types from './types';

export const login = (record) => ({
    type: types.LOGIN,
    data: record.data,
})
