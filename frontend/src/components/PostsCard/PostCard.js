import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown } from 'react-bootstrap';
import "./PostsCard.css";

const Card = ({ className = "", imagealt, imagePlaceholderChangeIma, title, description, content, rating, postedBy, id }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`card ${className}`}>
      <img
        className="card-img-top"
        loading="lazy"
        alt={imagealt}
        src={imagePlaceholderChangeIma}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{title}</h5>
          <div className="card-rating">
            {renderStars()}
          </div>
        </div>
        <p className="card-text">{description}</p>
        <p className="card-text">{content}</p>
        <a href={`/posts/${id}`} className="btn2">Go To →</a>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <span className="poster">Posted by: {postedBy}</span>
        <Dropdown>
          <Dropdown.Toggle variant="link" className="dropdown-toggle-no-caret">
            <i className="fas fa-ellipsis-v"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item className='DeleteDropdownItem' href="#/delete">
              <i className="fas fa-trash-alt"></i> Delete
            </Dropdown.Item>
            <Dropdown.Item className='EditDropdownItem' href="#/edit">
              <i className="fas fa-pencil-alt"></i> Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  imagealt: PropTypes.string.isRequired,
  imagePlaceholderChangeIma: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  postedBy: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
