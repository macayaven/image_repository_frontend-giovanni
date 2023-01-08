const API = process.env.REACT_APP_BACKEND_API;

function getAuthorizationHeaders(token) {
    return {
        'Authorization': 'Token ' + token
    };
}

async function postRequest(url, body, extra_headers = {}, overwrite_headers = false) {

    let default_headers = {
        'Content-Type': 'application/json'
    };

    let headers = {};
    if (!overwrite_headers) {
        headers = Object.assign({}, default_headers, extra_headers);
    } else {
        headers = extra_headers
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    });

}

async function getRequest(url, headers) {

    return fetch(url, {
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

    const response = await getRequest(API + '/images', getAuthorizationHeaders(token));

    if (!response.ok) {
        throw new Error('Failed to get images: ' + response.status);
    }

    return response.json();

}

export async function getImageDetail(imageId, token) {

    const response = await getRequest(API + '/images/' + imageId, getAuthorizationHeaders(token));

    if (!response.ok) {
        throw new Error('Failed to get image ' + imageId + ': ' + response.status);
    }

    return response.json();

}

export async function getStudies(token) {

    const response = await getRequest(API + '/studies', getAuthorizationHeaders(token));

    if (!response.ok) {
        throw new Error('Failed to get studies: ' + response.status);
    }

    return response.json();

}

export async function sendComment(imageId, data, token) {

    const response = await postRequest(API + '/images/' + imageId + '/comments', data, getAuthorizationHeaders(token));

    if (!response.ok) {
        throw new Error('Failed to send comment: ' + response.status);
    }

    return response.json();

}

export async function addImage(data, token) {

    const headers = {
        'Authorization': 'Token ' + token
    }

    let formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('study', data.study);
    formdata.append('file', data.file)

    const response = await fetch(API + '/images', {
        method: 'POST',
        body: formdata,
        headers: headers
    });

    if (!response.ok) {
        throw new Error('Failed to create image: ' + response.status);
    }

    return response.json();
}