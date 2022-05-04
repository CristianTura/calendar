
import Swal from "sweetalert2";
import { axiosConToken, axiosSinToken } from "../helpers/axios"
import { types } from "../types/types"


export const  startLogin = (email, password) => {
    return async( dispatch ) => {
        try {
            const resp = await axiosSinToken('auth', {email, password}, 'post'); 
            const body = await resp.data;
            
            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
            
                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }));
            } 
            
        } catch (error) {
            Swal.fire('Error', error.response.data.msg , 'error', );
        }

    }
}

export const startRegister = ( email, password, name ) => { 
    return async ( dispatch ) => {
        try {
            const resp = await axiosSinToken('auth/new', {email, password, name}, 'post');
            const body = await resp.data;

            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }));
            }

        } catch (error) {
            Swal.fire('Error', error.response.data.msg , 'error', );
        }

    }
}


export const startChecking = () => {
    return async ( dispatch ) => {

        try {
            const resp = await axiosConToken('auth/renew');
            const body = await resp.data;

            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }));
            }

        } catch (error) {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({ type: types.authChekingFinish })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return ( dispatch )=> {

        localStorage.clear();
        dispatch(logout());
    }
}


const logout = () => ({ type: types.authLogout })   