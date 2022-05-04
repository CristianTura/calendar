import Swal from "sweetalert2";
import { axiosConToken } from "../helpers/axios";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => { 
    return async ( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {
            const resp = await axiosConToken('events', event, 'post');
            const body = await resp.data;

            if ( body.ok) { 
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name : name,
                }
                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            console.log(error);
        }

    
    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});


export const eventStartUpdated = ( event ) => {
    return async ( dispatch ) => {
        try {
            const resp = await axiosConToken(`events/${ event.id }`, event, 'put');
            const body = await resp.data;
      
            if ( body.ok) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
})


export const eventStartDeleted = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await axiosConToken(`events/${ id }`, {}, 'delete');
            const body = await resp.data;

            if ( body.ok) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }
    }
}

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async ( dispatch ) => {

        try {
            const resp = await axiosConToken('events');
            const body = await resp.data;
            
            const events = prepareEvents( body.eventos );
            if ( body.ok ) {
                dispatch( eventLoaded( events ) );
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
})


export const eventLogout = () => ({type: types.eventLogout});