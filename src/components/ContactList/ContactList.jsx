import css from './ContactList.module.css'
const ContactList = ({ contacts, onDeleteContact }) => (
  <section>
   
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          {contact.name + ' : ' + contact.number}
          {
            <button className={css.btn}
              type="button"
              name="delete"
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </button>
          }
        </li>
      ))}
    </ul>
  </section>
);
  

export default ContactList