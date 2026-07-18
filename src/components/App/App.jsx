import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contactsSlice';
import { ContactList } from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';

// Змінюємо на export default, щоб index.jsx його точно знайшов
const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    // Прибрали css.container, тепер тут просто чистий div зі стилем padding
    <div style={{ padding: 20 }}>
      <h1>Phonebook</h1>
      <ContactForm />
      
      <h2>Contacts</h2>
      <Filter />
      
      {isLoading && !error && <b>Loading contacts...</b>}
      {error && <b>Error: {error}</b>}
      
      <ContactList />
    </div>
  );
};

export default App;