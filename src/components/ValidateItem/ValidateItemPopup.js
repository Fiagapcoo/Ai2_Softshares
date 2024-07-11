import React, { useState } from "react";
import "./ValidateItemPopup.css"; // Importing the CSS file for styling

const ValidateItemPopup = ({ item, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Add your validation logic here

        // Simulate an API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 2000);
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className="popup-header">
                    <img src="./assets/grommet-icons_validate.svg" alt="" />
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <h2>Validate Item?</h2>
                {error && <p className="error">{error}</p>}
                <div className="popup-buttons">
                    <button className="popup-button cancel" onClick={onClose}>
                        No
                    </button>
                    <button className="popup-button validate" onClick={handleSubmit} disabled={isSubmitting}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValidateItemPopup;
