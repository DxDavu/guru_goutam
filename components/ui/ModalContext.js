import { createContext, useContext, useState } from 'react';

// Create a Modal Context
const ModalContext = createContext();

// Modal Provider to wrap around your app
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalContent }}>
      {children}
      {modalContent && <Modal>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

// Hook to use the Modal Context
export const useModal = () => {
  return useContext(ModalContext);
};

// Simple Modal Component
const Modal = ({ children }) => {
  const { closeModal } = useModal();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md max-w-md mx-auto">
        <button onClick={closeModal} className="absolute top-2 right-2">X</button>
        {children}
      </div>
    </div>
  );
};
