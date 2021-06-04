import { IconContext } from "react-icons";
import { BiCheckCircle } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'

const ModalSuccess = ({ closeModal, description }) => {

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
            value={{ color: '#10a54a', size: '70px' }}
        >
          <div className="modal-icon">
              <BiCheckCircle />
          </div>
        </IconContext.Provider>
        <h3 className="text-center">{description}</h3>
      </div>
    </div>
  )
}

export default ModalSuccess