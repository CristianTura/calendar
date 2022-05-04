import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const axiosSinToken =  ( endPoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endPoint }`;

    if ( method === 'GET' ) {
        return axios.get( url );
    } else {
        return axios({
            method,
            url,
            data
        });
    }
}

const axiosConToken = ( endPoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endPoint }`;
    const token = localStorage.getItem('token')  || '';

    if ( method === 'GET' ) {
        return axios({
            method: 'get',
            url,
            headers: {
                'x-token': token
            }
        });
    } else {
        return axios({
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        });
    }
}

export {
    axiosSinToken,
    axiosConToken
}