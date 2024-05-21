// store.ts

import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

// Define the Contact interface to describe the shape of a contact object.
export interface Contacts {
    id: number;
    firstname: string;
    lastname: string;
    status: string;
}

// Define the ContactsState interface to describe the shape of the state for contacts.
interface ContactsState {
    contacts: Contacts[];
    nextId: number;
}

// Initialize the state with an empty contacts array and the nextId set to 1.
const initialState: ContactsState = {
    contacts: [],
    nextId: 1
};

// Create a slice for contacts, which includes reducers to handle adding, deleting, and editing contacts.
const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Reducer to add a new contact.
        addContact: (state, action: PayloadAction<Omit<Contacts, 'id'>>) => {
            state.contacts.push({
                id: state.nextId,
                ...action.payload
            });
            state.nextId += 1; // Increment the nextId for the next contact.
        },
        // Reducer to delete a contact by its id.
        deleteContact: (state, action: PayloadAction<{ id: number }>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
        },
        // Reducer to edit an existing contact by its id.
        editContact: (state, action: PayloadAction<Contacts>) => {
            const { id, firstname, lastname, status } = action.payload;
            const contact = state.contacts.find(contact => contact.id === id);
            if (contact) {
                contact.firstname = firstname;
                contact.lastname = lastname;
                contact.status = status;
            }
        }
    }
});

// Export actions to be used in components .
export const { addContact, deleteContact, editContact } = contactsSlice.actions;

// Configure the Redux store with the contacts slice reducer.
export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer
    }
});

// Export RootState and AppDispatch types for use with TypeScript.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
