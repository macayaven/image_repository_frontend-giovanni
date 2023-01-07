const API = process.env.REACT_APP_BACKEND_API;

async function postRequest(url, body, extra_headers) {

    let default_headers = {
        'Content-Type': 'application/json'
    };

    let headers = Object.assign({}, default_headers, extra_headers = {});

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    });

}

async function getRequest(url, headers, query_params = '') {

    return fetch(url + query_params, {
        method: 'GET',
        headers: headers
    });

}

export async function login(data) {

    const response = await postRequest(API + '/login', data)

    if (!response.ok) {
        throw new Error('Failed to login: ' + response.status + ' - ' + response.statusText);
    }

    return response.json();

}

export async function register(data) {

    const response = await postRequest(API + '/register', data);

    if (!response.ok) {
        throw new Error('Failed to register: ' + response.status + ' - ' + response.statusText);
    }

    return response.json();

}

export async function getImages(token) {

    const headers = {
        'Authorization': 'Token ' + token
    }

    const response = await getRequest(API + '/images', headers);

    if (!response.ok) {
        throw new Error('Failed to get images: ' + response.status);
    }

    return response.json();

}