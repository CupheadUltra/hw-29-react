import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, contactsSelectors } from '../../redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  
  const contacts = useSelector(contactsSelectors.selectAll);
  const filter = useSelector(state => state.filter || ''); 

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {visibleContacts.map(({ id, name, phone }) => (
        <li key={id}>
          {name}: {phone}
          <button type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};