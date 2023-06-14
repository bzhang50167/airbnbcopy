import { csrfFetch } from "./csrf"

const GET_ALL_BOOKINGS = 'bookings/getAllBooking';
const CREATE_BOOKING = 'bookings/createBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';
const UPDATE_BOOKING = 'bookings/updateBooking'

const getAllBookingAction = (booking) => {
    return {
        type: GET_ALL_BOOKINGS,
        booking
    }
}

const updateBookingAction = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking
    }
}

const createBookingAction = (data) => {
    return {
        type: CREATE_BOOKING,
        data
    }
}

const deleteBookingAction = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}

export const updateBookingThunk = (id, info) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/bookings/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        if(res.ok){
            const data = await res.json()
            dispatch(updateBookingAction(data))
            dispatch(getAllBookingThunk())
        }
    } catch (error) {
        const message = await error.json()
        return(message);
    }
}

export const createBookingThunk = (spotId, info) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        if(res.ok){
            const data = await res.json()
            dispatch(createBookingAction(data))
        }
    } catch (error) {
        const message = await error.json()
        return(message.errors[0].message);
    }
}
export const deleteBookingThunk = (id) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/bookings/${id}`,{
            method: 'DELETE'
        })
        if(res.ok){
            dispatch(deleteBookingAction(id))
            dispatch(getAllBookingThunk())
        }
    } catch (error) {
        const errorTwo = await error.json()
        return errorTwo.message
    }
}

export const getAllBookingThunk = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current')
    console.log('in the thunk');
    if(res.ok){
        const data = await res.json()
        dispatch(getAllBookingAction(data))
    } else {
        console.log('not okay');
    }
}


const initalState = { booking:{}, allBookings:{}}

const bookingReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_BOOKINGS:{
            const newState = {...state, booking:{}, allBookings:{}}
            action.booking.Booking.forEach(booking => newState.allBookings[booking.id] = booking)
            return newState
        }
        case CREATE_BOOKING:{
            const newState = {...state, booking:{}, allBookings:{...state.allBookings}}
            newState.booking[action.data.booking.id] = action.data
            return newState
        }
        case UPDATE_BOOKING:{
            const newState = {...state, allBookings:{...state.allBookings}}
            console.log(action);
            return newState
        }
        case DELETE_BOOKING:{
            const newState = {...state}
            console.log(action,'action');
            delete newState.allBookings[action.id]
            return newState
        }
        default:{
            return state
        }
    }
}

export default bookingReducer
