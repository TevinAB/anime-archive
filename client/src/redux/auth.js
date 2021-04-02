import axios from 'axios';

//Action Types
const VERIFYING_TOKEN = 'VERIFYING_TOKEN';
const TOKEN_VALID = 'TOKEN_VALID';
const TOKEN_INVALID = 'TOKEN_INVALID';
const SIGN_OUT = 'SIGN_OUT';

//Action creators
export const checkTokenIntegrity = (token) => (dispatch) => {
  dispatch({ type: VERIFYING_TOKEN });

  const config = {
    header: {
      'Content-type': 'application/json',
    },
  };

  const body = {
    token,
  };

  axios
    .post('/api/auth', body, config)
    .then((response) => {
      const { email, username, profilePic } = response.data;
      dispatch({
        type: TOKEN_VALID,
        payload: { email, username, profilePic, token },
      });
    })
    .catch(() => dispatch({ type: TOKEN_INVALID }));
};

export const signOut = () => ({
  type: SIGN_OUT,
});

//Reducer
const initialState = {
  email: null,
  username: null,
  profilePic: null,
  isAuthenticated: false,
  verifying: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case VERIFYING_TOKEN:
      return {
        ...state,
        email: null,
        username: null,
        profilePic: null,
        isAuthenticated: null,
        verifying: true,
      };

    case TOKEN_VALID:
      //stash the token in localStorage
      localStorage.setItem('gToken', action.payload.token);

      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        profilePic: action.payload.profilePic,
        isAuthenticated: true,
        verifying: false,
      };

    case TOKEN_INVALID:
      //something is wrong with the token so remove it from local storage if present
      localStorage.removeItem('gToken');

      return {
        ...state,
        email: null,
        username: null,
        profilePic: null,
        isAuthenticated: false,
        verifying: false,
      };

    case SIGN_OUT:
      localStorage.removeItem('gToken');
      return {
        ...state,
        email: null,
        username: null,
        profilePic: null,
        isAuthenticated: false,
        verifying: false,
      };

    default:
      return state;
  }
}
