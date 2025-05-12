import fetch from 'node-fetch';
import { createConsumer } from '@rails/actioncable';

const apiurl = process.env.REACT_APP_APIURL;
const wsurl = process.env.REACT_APP_WS;
const loginurl = `${apiurl}/session`;
const picsurl = `${apiurl}/photos`;

const fetchWrap = async (url, id, method = 'GET', token = null, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (id) { url = `${url}/${id}` }
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

const fetchRequest = async (url, id, method = 'GET', token = null, body = null) => {
    try {
        const response = await fetchWrap(url, id, method, token, body);
        const json = await response.json();
        checkJsonError(response, json);
        return {
            headers: response.headers,
            body: json
        };
    } catch (e) {
        throw new Error(`Fetch error [${method} ${url}]: ` + e.message);
    }
}

export const fetchLogin = async (action, url = loginurl) => {
    return fetchRequest(url, null, 'POST', null, JSON.stringify(action.data.body));
}

export const fetchConsumer = (token, url = wsurl) => {
    return createConsumer(`${url}/cable?token=${token}`);
}

export const fetchRegenToken = async (action, url = loginurl) => {
    return fetchRequest(url, null, 'PUT', action.data.token);
}

export const fetchAllPictures = async (action, url = picsurl) => {
    return fetchRequest(url, null, 'GET', action.data.token);
}

export const fetchViewPicture = async (action, url = picsurl) => {
    return fetchRequest(url, action.data.id, 'PUT', action.data.token, JSON.stringify(action.data.body));
}