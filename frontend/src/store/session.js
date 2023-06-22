import { csrfFetch } from "./csrf"

const LOAD_USER_SESSION = 'session/loadUserSession';
const REMOVE_USER_SESSION = 'session/removeUserSession';


export const loadSession = (user) => {
    return{
        type: LOAD_USER_SESSION,
        user
    }
}

export const removeSession = () => {
    return{
        type: REMOVE_USER_SESSION
    }
}

export const login = (user) => async dispatch => {
    const {credential, password} = user;
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
          credential,
          password,
        }),
      });

    if(res.ok){
        const data = await res.json()

        dispatch(loadSession(data.user))
        return res
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(loadSession(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    try {
      const { username, firstName, lastName, email, password } = user;
      const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await response.json();
      dispatch(loadSession(data.user));
      return response;
    } catch (error) {
      const message = await error.json()
      return(message.errors);
    }
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeSession());
    return response;
  };

const initalState = { user:null}

const sessionReducer = (state = initalState, action) => {
    switch(action.type){
        case LOAD_USER_SESSION:{
            const newState = { ...state, entries: {}};
            newState.user = action.user;
            return newState
        }
        case REMOVE_USER_SESSION:{
            const newState = { ...state };
            newState.user = null;
            return newState
        }
        default:{
            return state
        }
    }
}

export default sessionReducer
