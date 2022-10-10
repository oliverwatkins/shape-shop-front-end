import {baseURL} from "../../../api/api";

export const loginUserService = (request) => {
    const LOGIN_API_ENDPOINT = 'http://localhost:4000/api/v1/login';

    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.user)
    };

    return fetch(LOGIN_API_ENDPOINT, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};


export const loginUser2 = async (credentials) => {
    console.info("credentialis " + JSON.stringify(credentials))

    let data = await fetch(baseURL + 'authenticate', {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ''
        },
    }).then(response => {
        console.info("status : " + response.status)

        if (response.status === 403)
            throw new Error("Error Logging in. Name or Password are incorrect")

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    }).then(data => {
        return {
            status:200,
            data: data
        }
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    });
    return data;
}
