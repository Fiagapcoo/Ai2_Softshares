import React, { useState } from "react";
import UserComponent from "../UserComponent/UserComponent"; // Adjust the import path as needed
import ValidateItemPopup from "../ValidateItem/ValidateItemPopup"; // Adjust the import path as needed
const ParentComponent = ({ name }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            <UserComponent name={name} onClick={handleOpenPopup} />
            {isPopupOpen && <ValidateItemPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default ParentComponent;
