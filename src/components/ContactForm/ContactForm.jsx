
import { nanoid } from 'nanoid';
import { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = ({ name, number, id: nanoid() })
    console.log('data.id', data.id)
    onSubmit(data)
 
    reset();
  };
  const reset = () => {
    setName('')
    setNumber('')
    
  };

  return (
    <form onSubmit={handleSubmit} className={css.wrapper}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          required
          onChange={handleChange}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          required
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        />
      </label>
      <button type="submit" className={css.btn}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;

