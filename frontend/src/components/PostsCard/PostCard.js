import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Dropdown } from 'react-bootstrap';
import "./PostsCard.css";
import axios from 'axios';

const Card = ({ className = "", imagealt, imagePlaceholderChangeIma, title, description, content, rating, postedBy, id, type='P', date }) => {
  const [postedByName, setPostedByName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/user-info/${postedBy}`);
        setPostedByName(response.data.data.first_name + ' ' + response.data.data.last_name);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();

    return () => {
      // Clean-up function if necessary
    };
  }, [postedBy]);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<i key={i} className="softinsa-color fas fa-star"></i>);
      } else if (i < rating) {
        stars.push(<i key={i} className="softinsa-color fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="softinsa-color far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <>
      {type === 'P' ? (
        <div className={`card ${className}`}>
          <img
            className="card-img-top"
            loading="lazy"
            alt={imagealt}
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/`+imagePlaceholderChangeIma}
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
            <span className="poster">Posted by: {postedByName}</span>
            <Dropdown>
              <Dropdown.Toggle variant="link" className="dropdown-toggle-no-caret">
                <i className="fas fa-ellipsis-v"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item className='EditDropdownItem' href="#/edit">
                  <i className="fas fa-pencil-alt"></i> Edit
                </Dropdown.Item>
                <Dropdown.Item className='DeleteDropdownItem' href="#/delete">
                  <i className="fas fa-trash-alt"></i> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ) : (
         <div className={`card ${className}`}>
          <img
            className="card-img-top"
            loading="lazy"
            alt={imagealt}
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/`+imagePlaceholderChangeIma}
          />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">{title}</h5>
            </div>
            <p className="card-text">{description}</p>
            <p className="card-text">{content}</p>
            <a href={`/event/${id}`} className="btn2">Go To →</a>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <span className="poster">{date}</span>
            <Dropdown>
              <Dropdown.Toggle variant="link" className="dropdown-toggle-no-caret">
                <i className="fas fa-ellipsis-v"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item className='EditDropdownItem' href="#/edit">
                  <i className="fas fa-pencil-alt"></i> Edit
                </Dropdown.Item>
               <Dropdown.Item className='DeleteDropdownItem' href="#/delete">
                  <i className="fas fa-trash-alt"></i> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </>
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
  type: PropTypes.string
};

export default Card;
