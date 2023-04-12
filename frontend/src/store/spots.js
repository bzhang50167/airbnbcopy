import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';
const CREATE_SPOT = 'spots/createSpot';
const CREATE_SPOT_IMAGE = 'spots/createSpotImage';
const GET_USERS_SPOT = 'spots/getUsersSpot';
const Delete_SPOT = 'spots/deleteSpot';
const UPDATE_SPOT= 'spots/updateSpot';


export const getAllSpotsAction = (spot) => {
    return {
        type: GET_ALL_SPOTS,
        spot
    }
}

export const getOneSpotAction = (spotId) => {
    return {
        type: GET_SINGLE_SPOT,
        spotId
    }
}

export const createSpotAction = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const createImageAction = (spotId, img) => {
    return {
        type: CREATE_SPOT_IMAGE,
        payload: {
            spotId,
            img
        }
    }
}

export const deleteSpotAction = (spotId) => {
    return {
        type: Delete_SPOT,
        spotId
    }
}

export const getUsersSpotsAction = (spots) => {
    return {
        type: GET_USERS_SPOT,
        spots
    }
}

export const updateSpotAction = (spot) => {
    return {
        type:UPDATE_SPOT,
        spot
    }
}

export const getAllSpotsThunk = () => async dispatch => {

    const res = await csrfFetch('/api/spots')
    // console.log(res,'what is res');
    if (res.ok) {
        const data = await res.json()
        // console.log(data, 'what is data');
        dispatch(getAllSpotsAction(data))
    }
}

export const getOneSpotThunk = (spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const data = await res.json()

        dispatch(getOneSpotAction(data))
    }
}

export const createSpotThunk = (spot) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot)
    })


    if (res.ok) {
        const data = await res.json()
        // console.log(data, 'data ~~~~~~~~~~~~~');
        dispatch(createSpotAction(data))
        return data
    }
}

export const createImageThunk = (spotId, url) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url,
            preview: true
        })
    })

    if (res.ok) {
        const data = await res.json()

        dispatch(createImageAction(spotId, data))
        return data
    }
}

export const createNotPreviewImageThunk = (spotId, url) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url,
            preview: false
        })
    })

    if (res.ok) {
        const data = await res.json()

        dispatch(createImageAction(spotId, data))
        return data
    }
}

export const getUserSpotsThunk = (spots) => async dispatch => {

    const res = await csrfFetch(`/api/spots/current`)

    if(res.ok){
        const data = await res.json()

        dispatch(getUsersSpotsAction(data))

        return data
    }
}

export const deleteSpotThunk = (spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })

    if(res.ok){
        const data = await res.json()

        dispatch(deleteSpotAction(spotId))
    }
}

export const updateSpotThunk = (spotId, info) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })

    if(res.ok){

        const data = await res.json()

        dispatch(updateSpotAction(data))
    }
}

const initalState = { allSpots: {}, singleSpot: {} }

const spotReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { ...state, allSpots: {} }
            console.log(action, 'action---------');
            console.log(newState, 'new state -------------');
            action.spot.Spots.forEach(spot => newState.allSpots[spot.id] = spot)
            return newState
        }
        case GET_SINGLE_SPOT: {
            // return { ...state, [action.spots.id]: action.spots };
            const newState = { ...state, singleSpot: {} }
            // console.log(action, 'action---------');
            // console.log(newState, 'new state -------------');
            // sdfs
            newState.singleSpot = action.spotId
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        case GET_USERS_SPOT:{
            const newState = {...state}
            action.spots.Spots.forEach(spot => newState.allSpots[spot.id] = spot)
            // newState.allSpots = action.spots.Spots
            // salkdjlajs
            console.log(action, 'action---------');
            console.log(newState, 'new state -------------');
            return newState
        }
        case Delete_SPOT:{
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            delete newState.allSpots[action.spotId]
            return newState
        }
        case UPDATE_SPOT:{
            const newState = {...state, allSpots:{...state.allSpots}}
            newState[action.spot.id] = action.spot
            newState.spot.allSpots.Spots.forEach(spot => newState.spot.allSpots.Spots[spot.id]= spot)
            return newState
        }
        default: {
            return state
        }
    }
}

export default spotReducer
