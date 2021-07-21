import React, { useReducer } from 'react'
import { v4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import { 
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CLEAR_CURRENT
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts : [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            },
        ],
        current: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact

    const addContact = contact => {

        contact.id = v4();
        dispatch({ type: ADD_CONTACT, payload: contact})

    }

    // Delete contact 

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id})
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

    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact})
    }

    // Filter contacts

    // Clear filter

    return (<ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            updateContact,
            setCurrent,
            clearCurrent
        }}>
        { props.children }
    </ContactContext.Provider>)

}

export default ContactState