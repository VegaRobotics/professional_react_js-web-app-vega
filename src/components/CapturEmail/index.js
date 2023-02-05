import React, { useState, useEffect } from 'react';
import * as S from './styles';

function Modal({ onClose, onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    onClose();
  };

  return (
    <S.Modal>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium mb-4">Please enter your email:</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 p-2 rounded-lg w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 p-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-purple-500 p-2 rounded-lg text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </S.Modal>
  );
}

function CapturEmail() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      setShowModal(true);
      e.preventDefault();
      e.returnValue = '';
    });
    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (email) => {
    console.log(`Email: ${email}`);
  };

  return (
    <S.CapturEmail>
    <div className="p-5">
      <h1 className="text-2xl font-medium">Welcome to my page!</h1>
      {showModal && (
        <Modal onClose={handleClose} onSubmit={handleSubmit} />
      )}
    </div>
    </S.CapturEmail>
  );
}

export default CapturEmail;
