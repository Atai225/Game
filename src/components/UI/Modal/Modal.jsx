import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

function Modal({children, show}) {
  return (
    <>
      <Backdrop show={show}  />
     <div onClick={(e) => e.stopPropagation()} className={`modalwindow${show ? " on" : ""}`}>
          {children}
     </div>
    </>
  );
}

export default Modal
