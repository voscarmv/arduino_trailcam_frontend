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

export const fetchRegenToken = async (token, url = loginurl) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    return await response.json();
}