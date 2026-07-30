import ContactForm from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter'; 

const ContactsPage = () => {
  return (
    <div>
      <h2>Your Contacts</h2>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;