import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import { 
    GET_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    FILTER_CONTACT,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CURRENT
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts : null,
        current: null,
        filtered : null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    
    // Get contacts from database
       const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts')
            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data})
        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }
    // Add contact

    const addContact = async contact => {
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data})
        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    // Delete contact 

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id})
    }

    // Clear contacts CLEAR_CONTACTS

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // Set current contact

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact})
    }

    // Clear Current contact

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT})
    }

    // Update contact

    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact})
    }

    // Filter contacts

    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text})
    }

    // Clear filter

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER})
    }

    return (<ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            clearContacts,
            updateContact,
            setCurrent,
            clearCurrent,
            filterContact,
            clearFilter
        }}>
        { props.children }
    </ContactContext.Provider>)

}

export default ContactState