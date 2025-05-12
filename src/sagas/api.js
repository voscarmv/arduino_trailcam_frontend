import fetch from 'node-fetch';
import { createConsumer } from '@rails/actioncable';

const apiurl = process.env.REACT_APP_APIURL;
const wsurl = process.env.REACT_APP_WS;
const loginurl = `${apiurl}/session`;
const picsurl = `${apiurl}/photos`;

const fetchWrap = async (url, method = 'GET', token = null, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) { headers['Authorization'] = `Bearer ${token}`; }
    try {
        let response;
        if (body) {
            response = fetch(url, {
                method: method,
                headers: headers,
                body: body
            });
        } else {
            response = fetch(url, {
                method: method,
                headers: headers,
            });
        }
        const json = await response.json();
        // If response is not OK or the API reports success: false
        if (!response.ok || json.success === false) {
            const errorMessage = json.message || `HTTP ${response.status}`;
            const errorDetails = json.errors || {};
            throw new Error(`${errorMessage}: ${JSON.stringify(errorDetails)}`);
        }
        return response;
    } catch (e) {
        throw e;
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
    return {
        headers: response.headers,
        body: await response.json()
    };
}

export const fetchAllPictures = async (request, url = picsurl) => {
    const response = await fetchWrap(url, 'GET', request.token);
    return {
        headers: response.headers,
        body: await response.json()
    };
}

export const fetchViewPicture = async (request, url = picsurl) => {
    const response = await fetchWrap(url, 'PUT', request.token, request.body);
    return {
        headers: response.headers,
        body: await response.json()
    };
}