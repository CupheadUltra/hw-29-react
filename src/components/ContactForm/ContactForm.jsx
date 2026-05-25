import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  // Дістаємо контакти напряму (оскільки в store.js тепер правильний rootReducer)
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Перевірка на дублікат (додано оператор опціонального ланцюжка ?. на випадок пустих значень)
    const isExist = contacts.some(
      contact => contact.name?.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    // Відправляємо екшен для додавання контакту
    dispatch(addContact(name, number));
    
    // Очищаємо інпути форми
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">Add contact</button>
    </form>
  );
}