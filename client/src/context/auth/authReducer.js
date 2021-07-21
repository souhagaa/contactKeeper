import {
    REGISTER_SUCCESS,
    REGISTER_FAIL ,
    USER_LOADED ,
    AUTH_ERROR ,
    LOGIN_SUCCESS ,
    LOGIN_FAIL ,
    LOGOUT ,
    CLEAR_ERRORS
    } from '../types'

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case USER_LOADED:
            return {
                ...state,
            }
        case AUTH_ERROR:
            return {
                ...state,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
            }
        case LOGIN_FAIL:
            return {
                ...state,
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
            }
        default: return state;
    }
}