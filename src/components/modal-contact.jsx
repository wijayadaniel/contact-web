import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { IconContext } from "react-icons";
import { IoClose } from 'react-icons/io5'

const ContactModal = ({contact, isEdit = false, closeModal, doSuccessAction}) => {
  const inputImageRef = useRef(null)
  const [ contactValue, setContactValue ] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: ''
  })
  const [ errorMessage, setErrorMessage ] = useState({})

  useEffect(() => {
    if (isEdit) {
      setContactValue({...contact})
    }
  }, [isEdit, contact])

  const changePhoto = (val) => {
    let input = val.target
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = (e) => {
        setContactValue({...contactValue, photo: e.target.result})
      }
      reader.readAsDataURL(input.files[0])
      val.target.value = null
    }
  }

  const contactValidation = () => {
    let status = true
    let errors = {}
    let listValidation = {
      firstName: 'First name field is required.',
      lastName: 'Last name field is required.',
      age: 'Age field is required.',
      photo: 'Photo is not allowed to be empty'
    }
    for (let key in listValidation) {
      if (contactValue[key] === '') {
        status = false
        errors[key] = listValidation[key]
      }
    }
    if (contactValue['firstName'].length < 3) {
      errors['firstName'] = 'First name length must be at least 3 characters'
      status = false
    }
    if (contactValue['lastName'].length < 3) {
      errors['lastName'] = 'Last name length must be at least 3 characters'
      status = false
    }
    setErrorMessage({...errors})
    return status
  }
  
  const saveContact = () => {
    let method = 'post'
    let url = 'https://simple-contact-crud.herokuapp.com/contact'
    let payload = {...contactValue}
    if (contactValidation()) {
      if (isEdit) {
        method = 'put'
        url = url + '/' + contact.id
        delete payload.id
      }
      axios[method](url, payload)
      .then(res => {
        if (res.status === 201) {
          let message = ''
          if (isEdit) {
            message = 'Contact updated successfully'
          } else {
            message = 'Contact created successfully'
          }
          doSuccessAction(message)
        }
      }).catch(e => {
        console.log(e);
      })
    }
  }

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-close-icon" onClick={closeModal}>
          <IconContext.Provider
              value={{ size: '24px' }}
          >
            <IoClose />
          </IconContext.Provider>
        </div>
        <h3 className="modal-title">{ isEdit? `Edit` : `Add New`} Contact</h3>
        <div className="form-field image-container">
          {
            contactValue.photo !== null && contactValue.photo !== '' &&
            <img 
              className="modal-image-preview" 
              onClick={() => inputImageRef.current.click()} 
              src={contactValue.photo}
              alt="contact-usr"
            />
          }
          {
            (contactValue.photo === null || contactValue.photo === '') &&
            <div 
              className="modal-image-placeholder" 
              onClick={() => inputImageRef.current.click()} 
            >
            Upload Photo
            </div>
          }
          <input 
            type="file"
            accept="image/*"
            ref={inputImageRef}
            className="hidden"
            onChange={(e) => changePhoto(e)}
          />
          {
            errorMessage && errorMessage.photo &&
            <div className="invalid">{errorMessage.photo}</div>
          }
        </div>
        <div className="form-field">
          <label>First Name</label>
          <input 
            type="text" 
            className={`form-input ${errorMessage && errorMessage.firstName ? `invalid-input` : ``}`}
            value={contactValue.firstName}
            onChange={(e) => setContactValue({ ...contactValue, firstName: e.target.value})}
          />
          {
            errorMessage && errorMessage.firstName &&
            <div className="invalid">{errorMessage.firstName}</div>
          }
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input 
            type="text" 
            className={`form-input ${errorMessage && errorMessage.lastName ? `invalid-input` : ``}`}
            value={contactValue.lastName}
            onChange={(e) => setContactValue({ ...contactValue, lastName: e.target.value})}
          />
          {
            errorMessage && errorMessage.lastName &&
            <div className="invalid">{errorMessage.lastName}</div>
          }
        </div>
        <div className="form-field">
          <label>Age</label>
          <input 
            type="number" 
            className={`form-input ${errorMessage && errorMessage.age ? `invalid-input` : ``}`}
            value={contactValue.age}
            onChange={(e) => setContactValue({ ...contactValue, age: e.target.value})}
          />
          {
            errorMessage && errorMessage.age &&
            <div className="invalid">{errorMessage.age}</div>
          }
        </div>
        <button 
          className="btn primary-btn"
          onClick={() => saveContact()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default ContactModal;