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

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            }

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? 
                    action.payload : contact),
                loading: false
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null,
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            }

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default: return state;
    }
}