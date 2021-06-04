import { useEffect, useState } from 'react';
import axios from 'axios'

import ModalContact from './components/modal-contact'
import ModalConfirmation from './components/modal-confirmation'
import ModalSuccess from './components/modal-success'

import './App.css';
import './styles/card.css'
import './styles/button.css'
import './styles/modal.css'
import './styles/form.css'

const App = () => {

  const [ listContact, setListContact ] = useState([])
  const [ filteredListContact, setFilteredListContact ] = useState([])
  const [ modalStatus, setModalStatus ] = useState(false)
  const [ deleteModalStatus, setDeleteModalStatus ] = useState(false)
  const [ successModalStatus, setSuccessModalStatus ] = useState(false)
  const [ editStatus, setEditStatus ] = useState(false)
  const [ selectedContact, setSelectedContact ] = useState({})
  const [ successModalDescription, setSuccessModalDescription ] = useState('')
  const [ keyword, setKeyword ] = useState('')

  useEffect(() => {
    loadListConntact()
  }, [])

  const loadListConntact = () => {
    axios.get('https://simple-contact-crud.herokuapp.com/contact')
    .then(res => {
      if (res.status === 200) {
        setListContact(res.data.data)
        setFilteredListContact(res.data.data)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  const editContact = (contact) => {
    setSelectedContact(contact)
    setEditStatus(true)
    setModalStatus(true)
  }

  const deleteContact = () => {
    axios.delete('https://simple-contact-crud.herokuapp.com/contact/' + selectedContact.id)
    .then(res => {
      if (res.status === 202) {
        setDeleteModalStatus(false)
        setSelectedContact({})
        setSuccessModalDescription('Contact deleted successfully')
        setSuccessModalStatus(true)
        loadListConntact()
      }
    }).catch(e => {
      console.log(`e`, e)
    })
  }

  const showSuccessModal = (info) => {
    loadListConntact(); 
    setModalStatus(false)
    setSuccessModalDescription(info)
    setSuccessModalStatus(true)
  }

  const filterContact = () => {
    let tempListContact = [...listContact]
    let tempfilteredListContact = []
    tempListContact.map((contact, index) => {
      if ((contact.firstName.toLowerCase()).includes(keyword) || (contact.lastName.toLowerCase()).includes(keyword)) {
        tempfilteredListContact.push(contact)
      }
    })
    setFilteredListContact([...tempfilteredListContact])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact List</h1>
        <button 
          className="btn primary-btn" 
          onClick={() => {
            setEditStatus(false);
            setModalStatus(true)
          }}>
          Add New Contact
        </button>
      </header>
      <div className="card-container">
        <div className="filter-container">
          <input 
            type="text"
            className="form-input"
            placeholder="Search Contact"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button 
            className="btn primary-btn"
            onClick={() => filterContact()}
          >
            Search
          </button>
        </div>
        {
          filteredListContact.length > 0 && filteredListContact.map((contact) => {
            return (
              <div className="card" key={contact.id}>
                <img src={contact.photo} alt="contact-usr" className="card-image" />
                <div className="card-info">
                  <h3>{contact.firstName} {contact.lastName} ({contact.age} years old)</h3>
                  <div className="card-button">
                    <button 
                      className="card-btn delete-btn"
                      onClick={() => {
                        setSelectedContact({...contact});
                        setDeleteModalStatus(true)
                      }}
                    >
                      Delete
                    </button>
                    <button 
                      className="card-btn edit-btn" 
                      onClick={() => editContact(contact)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        }
        {
          filteredListContact.length === 0 &&
          <label>No Data Available</label>
        }
      </div>
      {
        modalStatus && 
        <ModalContact 
          closeModal={() => setModalStatus(false)} 
          doSuccessAction={(info) => { showSuccessModal(info) }}  
          isEdit={editStatus}
          contact={selectedContact}
        />
      }
      {
        deleteModalStatus && 
        <ModalConfirmation
          closeModal={() => setDeleteModalStatus(false)}
          deleteContact={() => deleteContact()}
        />
      }
      {
        successModalStatus &&
        <ModalSuccess
          closeModal={() => setSuccessModalStatus(false)}
          description={successModalDescription}
        />
      }
    </div>
  );
}

export default App;
