import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './ContactList.module.css';

export default function ContactList() {
  // Безпечно дістаємо дані зі стору. Якщо filter відсутній, ставимо порожній рядок
  const contactsData = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter) || '';
  const dispatch = useDispatch();

  // Захист від undefined: перевіряємо, де саме лежить масив
  // 1. Якщо contactsData це вже масив — беремо його.
  // 2. Якщо це об'єкт і всередині є contacts — беремо його.
  // 3. В іншому випадку повертаємо порожній масив [].
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