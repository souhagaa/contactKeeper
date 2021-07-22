import React, { useReducer } from 'react'

import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL ,
    USER_LOADED ,
    AUTH_ERROR ,
    LOGIN_SUCCESS ,
    LOGIN_FAIL ,
    LOGOUT ,
    CLEAR_ERRORS} from '../types'


const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user check which user is logged in and get it 

    const loadUser = user => {
        //dispatch({ type: USER_LOADED, payload: user })
    }
    // Register user

    const registerUser = async formData => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)
            dispatch({ 
                type: REGISTER_SUCCESS, 
                payload: res.data})
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }

    }

    // Login user

    const loginUser = user => {

    }

    // Logout user

    const logoutUser = user => {

    }

    // Clear errors

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS})

    return (<AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            loadUser,
            registerUser,
            loginUser,
            logoutUser,
            clearErrors
        }}>
        { props.children }
    </AuthContext.Provider>)

}

export default AuthState