import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter) || '';
  const dispatch = useDispatch();

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
        visibleContacts.map(({ id, name, phone }) => (
          <li className={css.item} key={id}>
            <p className={css.text}>{name}: {phone}</p>
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

ContactList.propTypes = {};