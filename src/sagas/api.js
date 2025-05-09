dotenv.config();

const apiurl = process.env.APIURL;
const loginurl = `${apiurl}/login`;

export const login = async (request, url = loginurl) => {
    const response = await fetch(url, {
        method: 'POST', // Use POST or another HTTP method as needed
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        // body: JSON.stringify({ user: { email_address: user, password: password }}) // Send the body as JSON
        body: JSON.stringify(request.data), // Send the body as JSON
      });
    return await response.json();
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
