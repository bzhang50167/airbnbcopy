const GET_ALL_USERS = 'users/getAllUsers';

export const getAllUsersAction = () => {
    return{
        type: GET_ALL_USERS
    }
}

export const getAllUsersThunk = () => async dispatch => {

}

const userReducer = (state , action) =>{
    switch(action.type){
        default:{
            return state
        }
    }
}
