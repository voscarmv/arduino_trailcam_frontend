import fetch from 'node-fetch';
import { createConsumer } from '@rails/actioncable';

const apiurl = process.env.REACT_APP_APIURL;
const wsurl = process.env.REACT_APP_WS;
const loginurl = `${apiurl}/session`;
const picsurl = `${apiurl}/photos`;

const fetchWrap = async (url, method = 'GET', token = null, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) { headers['Authorization'] = `Bearer ${token}`; }
    if (body) {
        return fetch(url, {
            method: method,
            headers: headers,
            body: body
        });
    } else {
        return fetch(url, {
            method: method,
            headers: headers,
        });
    }
}

export const fetchLogin = async (request, url = loginurl) => {
    const response = await fetchWrap(url, 'POST', null, JSON.stringify(request.body));
    return await response.json();
}

export const fetchConsumer = (token, url = wsurl) => {
    return createConsumer(`${url}/cable?token=${token}`);
}

export const fetchRegenToken = async (request, url = loginurl) => {
    const response = await fetchWrap(url, 'PUT', request.token);
    return await response.json();
}

export const fetchAllPictures = async (request, url = picsurl) => {
    const response = await fetchWrap(url, 'GET', request.token);
    return await response.json();
}

export const fetchViewPicture = async (request, url = picsurl) => {
    const response = await fetchWrap(url, 'PUT', request.token, request.body);
    return await response.json();
}