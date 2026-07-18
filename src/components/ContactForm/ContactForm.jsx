import { useSelector, useDispatch } from 'react-redux';
import { addContact, contactsSelectors } from '../../redux/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  
  const contacts = useSelector(contactsSelectors.selectAll);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" required />
      <input type="tel" name="number" required />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;