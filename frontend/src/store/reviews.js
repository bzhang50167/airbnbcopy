import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const GET_USER_REVIEWS = 'reviews/getUserReviews'
const CREATE_A_REVIEW = 'reviews/createAReview';
const DELETE_REVIEW = 'reviews/deleteReview';
const UPDATE_REVIEW = 'reviews/updateReview';

export const getAllReviewsFromSpotAction = (spotId) => {
    return{
        type: GET_ALL_REVIEWS,
        spotId
    }
}

export const getAllUserReviews = (data) => {
    return{
        type: GET_USER_REVIEWS,
        data
    }
}

export const createAReviewAction = (spotId) => {
    return{
        type: CREATE_A_REVIEW,
        spotId
    }
}

export const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const updateReviewAction = (data) => {
    return {
        type: UPDATE_REVIEW,
        data
    }
}

export const UpdateReviewThunk = (reviewId, info) => async dispatch => {
    // console.log(reviewId, info);
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    // console.log(res,'is my code making it here');

    if(res.ok){
        const data = await res.json();

        // console.log(data,'--------------------------');

        dispatch(updateReviewAction(data))
    }
}

export const GetUserReviewThunk = () => async dispatch => {
    const res = await csrfFetch(`/api/reviews/current`)

    if(res.ok){
        const data = await res.json()

        dispatch(getAllUserReviews(data))
    } else {
        console.log('not okay');
    }
}


export const GetAllReviewsFromSpotThunk = (spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(res.ok){
        const data = await res.json();
        // console.log(data, 'data falksdjlaksdjlaskd');

        dispatch(getAllReviewsFromSpotAction(data))
        return data
    }
}

export const CreateAReviewThunk = (spotId, fullReview) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fullReview)
        })

        if(res.ok){
            const data = await res.json()

            dispatch(createAReviewAction(data))
        }
    } catch (error) {
        const message = await error.json()
        return(message.errors);
    }
}

export const DeleteReviewThunk = (reviewId) => async dispatch => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(deleteReviewAction(reviewId))
    }
}

const initalState = { spot: {}, user:{}};

const reviewReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_REVIEWS:{
            const newState = {...state, spot: {}, user: {...state.user}};
            action.spotId.Reviews.forEach( review => {
                return newState.spot[review.id] = review
            });
            return newState
        }
        case GET_USER_REVIEWS:{
            const newState = {...state, spot:{},user:{}}
            console.log(action,'action');
            action.data.Reviews.forEach(review => newState.user[review.id] = review)
            return newState
        }
        case CREATE_A_REVIEW:{
            const newState = {...state, spot: {...state.spot}, user:{...state.user}};
            newState.spot[action.spotId.id] = action.spotId;
            return newState
        }
        case DELETE_REVIEW:{
            const newState = {...state, spot:{...state.spot}};
            delete newState.spot[action.reviewId]
            return newState
        }
        case UPDATE_REVIEW:{
            const newState = {...state, spot:{...state.spot}};
            newState.spot[action.data.id] = action.data
            return newState
        }
        default: {
            return state
        }
    }
}

export default reviewReducer
