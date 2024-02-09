/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import '../style/Popup.scss';

function Popup({ isPopup, setIsPopup }) {
  // If popup deactive scroll
  useEffect(() => {
    if (isPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPopup]);

  // Render Popup
  return (
    <div id="popup" className={isPopup ? '' : 'hidden'}>
      <button
        type="button"
        aria-label="popup-off"
        className={isPopup ? '' : 'hidden'}
        onClick={() => setIsPopup(false)}
      />
      <main
        className={isPopup ? '' : 'hidden'}
      >
        <h2>
          Error Messages Goes Here
        </h2>
        <button
          type="submit"
          aria-label="close"
          onClick={() => setIsPopup(false)}
        >
          <IoClose />
        </button>
      </main>
    </div>
  );
}

export default Popup;
