import React, { useState } from 'react';

export default function Modal ( { isOpen, onClose, componentToRender} ) {
    if (!isOpen) return null;

    return(
        <>
            <div key="same-key-overlay" className="modal-overlay" onClick={onClose}></div>
            <div key="same-key-content" className="modal-content">
                { componentToRender }
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </>
    )
}