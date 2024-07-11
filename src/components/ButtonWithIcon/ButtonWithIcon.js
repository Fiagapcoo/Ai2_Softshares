import React from "react";
import { Button } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./ButtonWithIcon.css";

const ButtonWithIcon = ({ icon, text, onClick }) => {
  return (
    <div className="center-custom-button">
      <Button className="btn btn-custom" onClick={onClick}>
         {text} <i className={icon}></i>
      </Button>
    </div>
  );
};

export default ButtonWithIcon;
