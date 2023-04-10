import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const CREATE_A_REVIEW = 'reviews/createAReview'

export const getAllReviewsFromSpotAction = (spotId) => {
    return{
        type: GET_ALL_REVIEWS,
        spotId
    }
}

export const createAReviewAction = (spotId) => {
    return{
        type: CREATE_A_REVIEW,
        spotId
    }
}


export const GetAllReviewsFromSpotThunk = (spotId) => async dispatch => {

    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if(res.ok){
        const data = await res.json();
        // console.log(data, 'data falksdjlaksdjlaskd');

        dispatch(getAllReviewsFromSpotAction(data))
        return data
    }
}

export const CreateAReviewThunk = (spotId, fullReview) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fullReview)
    })

    if(res.ok){
        const data = await res.json()

        console.log(data);

        dispatch(createAReviewAction(data))
    }
}


const initalState = { spot: {}, user:{}};

const reviewReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_REVIEWS:{
            const newState = {...state, spot: {...state.spot}, user: {...state.user}}
            action.spotId.Reviews.forEach( review => {
                return newState.spot[review.id] = review
            });
            return newState
        }
        case CREATE_A_REVIEW:{
            const newState = {...state, spot: {...state.spot}, user: {...state.user}}
            console.log(action);
        }
        default: {
            return state
        }
    }
}

export default reviewReducer
