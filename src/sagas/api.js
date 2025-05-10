import fetch from 'node-fetch';
import { createConsumer } from '@rails/actioncable';

const apiurl = process.env.REACT_APP_APIURL;
const wsurl = process.env.REACT_APP_WS;
const loginurl = `${apiurl}/session`;

export const fetchLogin = async (request, url = loginurl) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });
    return await response.json();
}

export const fetchConsumer = (token, url = wsurl) => {
    return createConsumer(`${url}/cable?token=${token}`);
}









export const fetchCreate = async (request) => {
    const response = await fetch(
        request.url,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.data),
        },
    );
    if (response.status !== 200) {
        throw Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
};

export const fetchRead = async (request) => {
    const response = await fetch(
        request.url,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        },
    );
    if (response.status !== 200) {
        throw Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
};

export const fetchUpdate = async (request) => {
    const response = await fetch(
        request.url,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.data),
        },
    );
    if (response.status !== 200) {
        throw Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
};

export const fetchDelete = async (request) => {
    const response = await fetch(
        request.url,
        {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        },
    );
    if (response.status !== 200) {
        throw Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
};

export const fetchList = async (request) => {
    const response = await fetch(
        request.url,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        },
    );
    if (response.status !== 200) {
        throw Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
};
