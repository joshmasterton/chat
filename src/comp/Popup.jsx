/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import '../style/Popup.scss';

function Popup({
  popupMessages,
  setPopupMessages,
}) {
  // Remove popup message
  const removeMessage = (objIndex) => {
    // Remove item
    setPopupMessages(popupMessages.filter(
      (obj, index) => index !== objIndex,
    ));
  };

  // Auto remove message after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      if (popupMessages.length > 0) {
        removeMessage(0);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [popupMessages, setPopupMessages]);

  // Render Popup
  return (
    <div id="popup">
      {popupMessages.map((obj, index) => (
        <main
          key={`${index.toString()}`}
        >
          <h2>
            {obj}
          </h2>
          <button
            type="submit"
            aria-label="close"
            onClick={() => removeMessage(index)}
          >
            <IoClose />
          </button>
        </main>
      ))}
    </div>
  );
}

export default Popup;
