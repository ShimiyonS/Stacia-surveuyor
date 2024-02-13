import React, { useState } from 'react'
import Modal from 'react-modal'

export default function AddBoard() {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '25%',
      height: '80%',
      borderRadius: '16px',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.25)',
        zIndex: '999'
    }
  };

  return (
    <>
    <div className='add-board' onClick={openModal}>
        Add another board
    </div>

    <Modal
        isOpen={modal}
        onAfterOpen={openModal}
        onAfterClose={closeModal}
        style={customStyles}
    >
      <div className='create-board-text'>Create board</div>
      
    </Modal>
    </>
  )
}
