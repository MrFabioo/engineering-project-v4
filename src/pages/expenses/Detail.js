import React, { useState } from 'react';
import { DetailPopup } from './DetailPopup';

export const Detail = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  return (
    <div>
      <button onClick={() => togglePopup()}>Dodaj</button>
      {popupIsOpen && <DetailPopup togglePopup={togglePopup} />}
    </div>
  );
};
