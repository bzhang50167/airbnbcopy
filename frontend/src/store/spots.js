import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';
const CREATE_SPOT = 'spots/createSpot';
const CREATE_SPOT_IMAGE = 'spots/createSpotImage'


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

export const getAllSpotsThunk = (spot) => async dispatch => {

    const res = await fetch('/api/spots')
    // console.log(res,'what is res');
    if (res.ok) {
        const data = await res.json()
        // console.log(data, 'what is data');
        dispatch(getAllSpotsAction(data))
        return data
    }
}

export const getOneSpotThunk = (spotId) => async dispatch => {

    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const data = await res.json()

        dispatch(getOneSpotAction(data))
        return data
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

const initalState = { allSpots: {}, singleSpot: {} }

const spotReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots } }
            // console.log(action, 'what was it before');
            action.spot.Spots.forEach(spot => newState.allSpots[spot.id] = spot)
            return newState
        }
        case GET_SINGLE_SPOT: {
            // return { ...state, [action.spots.id]: action.spots };
            const newState = { ...state }
            // console.log(action,'aciont~~~~~~~~~~~~');
            newState.singleSpot = action.spotId
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        default: {
            return state
        }
    }
}

export default spotReducer
