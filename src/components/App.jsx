import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactList from './ContactList/ContactList';
// import { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from './App.module.css';
import useLocalStorage from './useLocalStorage';

export const App = () => {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');

  const onSubmitForm = data => {
    const newObj = { ...data, id: nanoid() };

    setContacts(prevContacts => {
      if (isNameNew(prevContacts, newObj) === undefined) {
        return [...prevContacts, newObj];
      } else {
        Notify.warning(`${newObj.name} is already in contacts`, {
          width: '400px',
          position: 'center-center',
          timeout: 3000,
          fontSize: '20px',
        });
        return [...prevContacts];
      }
    });
  };

  const isNameNew = (prevContacts, newObj) => {
    return prevContacts.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };
  const onChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };
  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterContacts = getFilterContacts();

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className={css.container}>
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={onSubmitForm} />
      <h2 className="title">Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} onChangeFilter={onChangeFilter} />
      ) : (
        <div>Your phonebook is empty. Add first contact!</div>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={filterContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </div>
  );
};
