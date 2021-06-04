import { IconContext } from "react-icons";
import { FiAlertCircle } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const ModalConfrimation = ({ closeModal, deleteContact }) => {

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
        <IconContext.Provider
            value={{ color: '#ef5350', size: '70px' }}
        >
          <div className="modal-icon">
              <FiAlertCircle />
          </div>
        </IconContext.Provider>
        <h3 className="text-center">Are you sure to delete this contact?</h3>
        <div className="modal-button-container">
          <button className="cancel-btn" onClick={() => closeModal()}>Cancel</button>
          <button className="btn delete-btn" onClick={() => deleteContact()}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfrimation