// Contact.tsx
import { ImCross } from 'react-icons/im';
import { NavLink, Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../contact-store/store';
import { deleteContact } from '../contact-store/store';
import { useState } from 'react';
import { Contacts } from '../contact-store/store'; // Import the Contact interface

// Define the Contact component
export function Contact() {
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const dispatch: AppDispatch = useDispatch();

    // Handle delete contact action
    const handleDelete = (id: number, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the onClick event from bubbling up
        dispatch(deleteContact({ id }));
    };

    const [open, setOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState<Contacts | null>(null);

    // Show contact details in the popup
    const showContactDetails = (currentContactId: number) => {
        const contact = contacts.find(contact => contact.id === currentContactId);
        setCurrentContact(contact || null);
        setOpen(true);
    };

    // Close the popup
    const closeModal = () => setOpen(false);

    return (
        <div className="flex flex-col w-full items-center p-2">
            <div className="my-8">
                <NavLink
                    to="/create-contact"
                    className="px-12 rounded border-solid border-2 p-2 border-sky-500 hover:bg-sky-500 hover:text-white"
                >
                    Create Contact
                </NavLink>
            </div>
            {contacts.length === 0 ? (
                <NoContactsFound />
            ) : (
                <ContactList
                    contacts={contacts}
                    onDelete={handleDelete}
                    onShowDetails={showContactDetails}
                />
            )}
            <ContactPopup
                open={open}
                closeModal={closeModal}
                contact={currentContact}
            />
        </div>
    );
}

// Component to display when no contacts are found
function NoContactsFound() {
    return (
        <div className="my-12 md:p-8 p-4 flex border border-2 gap-10 justify-center sm:w-1/2 bg-zinc-100 rounded-lg ">
            <div className="p-1">
                <div className="rounded-full bg-slate-950 p-4">
                    <ImCross color="#ffffff" />
                </div>
            </div>
            <div className="text-xl w-1/2">
                <p>No Contact Found. Please add a contact using the Create Contact button.</p>
            </div>
        </div>
    );
}

// Component to display the contact list
interface ContactListProps {
    contacts: Contacts[];
    onDelete: (id: number, event: React.MouseEvent) => void;
    onShowDetails: (id: number) => void;
}

function ContactList({ contacts, onDelete, onShowDetails }: ContactListProps) {
    return (
        <div className="flex justify-center py-6 w-full">
            <div className="md:w-4/5 w-full">
                <h1 className="text-center p-2 bg-sky-200 w-full">Contact List</h1>
                <ul className="my-2">
                    {contacts.map(contact => (
                        <li
                            key={contact.id}
                            className="border p-2 my-2 flex items-center rounded-lg shadow-lg bg-zinc-50 hover:bg-sky-200 cursor-pointer"
                            onClick={() => onShowDetails(contact.id)}
                        >
                            <div className="flex-grow">
                                {contact.firstname || 'Firstname'} {contact.lastname || 'Lastname'}
                            </div>
                            <div>
                                <button
                                    className="p-1 m-1 border rounded text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                                    onClick={(e) => onDelete(contact.id, e)}
                                >
                                    Delete
                                </button>
                                <Link
                                    className="p-1 m-1 border rounded border-green-600 hover:bg-green-600 hover:text-white"
                                    to={`/edit-contact/${contact.id}`}
                                    onClick={(e) => e.stopPropagation()} // Prevent the onClick event from bubbling up
                                >
                                    Edit
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Component to display the contact details in a popup
interface ContactPopupProps {
    open: boolean;
    closeModal: () => void;
    contact: Contacts | null;
}

function ContactPopup({ open, closeModal, contact }: ContactPopupProps) {
    return (
        <Popup
            open={open}
            closeOnDocumentClick
            onClose={closeModal}
            contentStyle={{ padding: '20px', borderRadius: '8px', width: '50%', textAlign: 'center' }}
            position="top center"
        >
            <div className="my-12 md:p-8 p-4 flex border border-2 gap-10 justify-center bg-sky-100">
                <div className="p-1">
                    <div className="rounded-full bg-slate-950 p-4" onClick={closeModal}>
                        <ImCross color="#ffffff" />
                    </div>
                </div>
                {contact && (
                    <div className="text-xl w-1/2">
                        <h2>Firstname: {contact.firstname}</h2>
                        <h2>Lastname: {contact.lastname}</h2>
                        <span>Status: {contact.status}</span>
                    </div>
                )}
            </div>
        </Popup>
    );
}
