const GET_ALL_SPOTS = 'spots/getAllSpots'


export const getAllSpotsAction = (spot) =>{
    return{
        type: GET_ALL_SPOTS,
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

const initalState = {}

const spotReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_SPOTS:{
            const newState = {...state}
            action.spot.Spots.forEach(spot => newState[spot.id]= spot)
            // console.log(newState, 'why is this not working');
            return newState
        }
        default:{
            return state
        }
    }
}

export default spotReducer
