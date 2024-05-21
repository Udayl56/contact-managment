// CreateContact.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact } from '../contact-store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../contact-store/store';

export const CreateContact: React.FC = () => {
    // Extract the ID parameter from the URL, if present
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const contactId = id ? Number(id) : null;

    // Get the list of contacts from the Redux store
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    // Find the contact to edit if the ID is present
    const contactToEdit = contacts.find(contact => contact.id === contactId);

    // Local state for managing form inputs
    const [selectedStatus, setSelectedStatus] = useState<string>(contactToEdit?.status || 'Inactive');
    const [firstname, setFirstname] = useState<string>(contactToEdit?.firstname || '');
    const [lastname, setLastname] = useState<string>(contactToEdit?.lastname || '');

    // Redux dispatch function
    const dispatch: AppDispatch = useDispatch();

    // Update form fields if editing an existing contact
    useEffect(() => {
        if (contactToEdit) {
            setSelectedStatus(contactToEdit.status);
            setFirstname(contactToEdit.firstname);
            setLastname(contactToEdit.lastname);
        }
    }, [contactToEdit]);

    // Handle radio button change for status
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
    };

    // Handle form submission for creating or editing a contact
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (contactId !== null) {
            dispatch(editContact({ id: contactId, firstname, lastname, status: selectedStatus }));
        } else {
            dispatch(addContact({ firstname, lastname, status: selectedStatus }));
        }
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='py-8 text-center'>
                <h1 className='p-2'>{contactId ? 'Edit Contact' : 'Create Contact'}</h1>
            </div>
            <div className='flex justify-center p-2'>
                <div className="border border-sky-300 p-4 md:w-1/2 rounded-lg bg-zinc-100">
                    <div className="flex p-4 gap-4 flex-wrap">
                        <div className="p-2">
                            <label>First Name:</label>
                        </div>
                        <div className="border rounded flex-grow">
                            <input
                                type="text"
                                className="h-full p-2 w-full"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex p-4 gap-4 flex-wrap">
                        <div className="p-2">
                            <label>Last Name:</label>
                        </div>
                        <div className="border rounded flex-grow">
                            <input
                                type="text"
                                className="h-full p-2 w-full"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex p-4">
                        <div className="p-2 basis-1/5 flex justify-center items-center">
                            <label>Status:</label>
                        </div>
                        <div className='p-2'>
                            <div className='p-2'>
                                <label>
                                    <input
                                        type="radio"
                                        value="Active"
                                        checked={selectedStatus === 'Active'}
                                        onChange={handleOptionChange}
                                        className='m-1 p-2'
                                    />
                                    Active
                                </label>
                            </div>
                            <div className='p-2'>
                                <label>
                                    <input
                                        type="radio"
                                        value="Inactive"
                                        checked={selectedStatus === 'Inactive'}
                                        onChange={handleOptionChange}
                                        className='m-1 p-2'
                                    />
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center py-8'>
                <button
                    type="submit"
                    className="px-12 rounded border-solid border-2 p-2 border-sky-500 hover:bg-sky-500 hover:text-white"
                >
                    {contactId ? 'Update Contact' : 'Save Contact'}
                </button>
            </div>
        </form>
    );
};
