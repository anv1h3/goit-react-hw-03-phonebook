import React from 'react';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      this.setState({
        contacts: storedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      return true;
    }
    return false;
  }

  AddingContact = contact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  changeFIlter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizeFilter)
    );
  };

  deleteContacts = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(el => el.id !== contactId),
      };
    });
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm add={this.AddingContact} contacts={contacts} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFIlter} />
          <ContactList
            visibleContact={visibleContact}
            deleteContacts={this.deleteContacts}
          />
        </div>
      </>
    );
  }
}
