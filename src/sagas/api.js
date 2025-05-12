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

const checkJsonError = (response, json) => {
    if (!response.ok || json.success === false) {
        const errorMessage = json.message || `HTTP ${response.status}`;
        const errorDetails = json.errors || {};
        throw new Error(`${errorMessage}: ${JSON.stringify(errorDetails)}`);
    }
}

const fetchRequest = async (url, method = 'GET', token = null, body = null) => {
    try {
        const response = await fetchWrap(url, method, token, body);
        const json = response.json();
        checkJsonError(response, json);
        return json;
    } catch (e) {
        throw e;
    }
}

export const fetchLogin = async (request, url = loginurl) => {
    return fetchRequest(url, 'POST', null, JSON.stringify(request.body));
}

export const fetchConsumer = (token, url = wsurl) => {
    return createConsumer(`${url}/cable?token=${token}`);
}

export const fetchRegenToken = async (request, url = loginurl) => {
    return fetchRequest(url, 'PUT', request.token);
}

export const fetchAllPictures = async (request, url = picsurl) => {
    return fetchRequest(url, 'GET', request.token);
}

export const fetchViewPicture = async (request, url = picsurl) => {
    return fetchRequest(url, 'PUT', request.token, request.body);
}