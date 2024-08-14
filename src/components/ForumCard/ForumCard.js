import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown } from 'react-bootstrap';
import "./ForumCard.css";

const Card = ({ id = null, title = null, content = null, onValidate = false, showOptions = false }) => {
  return (
    <div className="cardF">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{title}</h5>
        </div>
        <p className="card-text">{content}</p>
        <a href={`/forum/${id}`} className="btn2">Go To →</a>
        {onValidate && (
          <button className="btn btn-primary softinsaBackColor mt-2" onClick={() => onValidate(id)}>
            Validate
          </button>
        )}
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        {showOptions && (
          <Dropdown>
            <Dropdown.Toggle variant="link" className="dropdown-toggle-no-caret">
              <i className="fas fa-ellipsis-v"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item className="EditDropdownItem" href={`/editForum/${id}`}>
                <i className="fas fa-pencil-alt"></i> Edit
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  onValidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  showOptions: PropTypes.bool,
};

Card.defaultProps = {
  onValidate: false,
  showOptions: false,
};

export default Card;
