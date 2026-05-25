import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

export default function ContactList() {
  const contactsData = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter) || '';
  const dispatch = useDispatch();

  const contacts = Array.isArray(contactsData)
    ? contactsData
    : contactsData?.contacts && Array.isArray(contactsData.contacts)
    ? contactsData.contacts
    : [];

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name?.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <ul className={css.list}>
      {visibleContacts.length > 0 ? (
        visibleContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            <p className={css.text}>{name}: {number}</p>
            <button
              className={css.button}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <p className={css.text}>No contacts found</p>
      )}
    </ul>
  );
}