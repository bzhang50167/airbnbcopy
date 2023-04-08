const GET_ALL_SPOTS = 'spots/getAllSpots';
const CREATE_SPOT = 'spots/createSpot'


export const getAllSpotsAction = (spot) =>{
    return{
        type: GET_ALL_SPOTS,
        spot
    }
}

export const createSpotAction = (spot) => {
    return{
        type: CREATE_SPOT,
        spot
    }
}

export const getAllSpotsThunk = (spot) => async dispatch => {

    const res = await fetch('/api/spots')
    // console.log(res,'what is res');

    if(res.ok){
        const data = await res.json()
        // console.log(data, 'what is data');
        dispatch(getAllSpotsAction(data))

        return data
    }
}

export const getOneSpotThunk = (spotId) => async dispatch => {

    const res = await fetch(`/api/spots/${spotId}`)

    if(res.ok){
        const data = await res.json()

        dispatch(getAllSpotsAction(spotId))

        return data
    }
}

export const createSpotThunk = (spot) => async dispatch => {

    const res = await fetch('/api/spots', {
        method: 'POST',
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(spot)
    })

    if(res.ok){

        const data = await res.json()

        console.log(data, '~~~~~~~~~~~~~');

        dispatch(createSpotAction(data))

        return data
    }
}

const initalState = {}

const spotReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_SPOTS:{
            const newState = {...state}
            action.spot.Spots.forEach(spot => newState[spot.id]= spot)
            // console.log(newState, 'why is this not working');
            return newState
        }
        case CREATE_SPOT:{
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        default:{
            return state
        }
    }
}

export default spotReducer
