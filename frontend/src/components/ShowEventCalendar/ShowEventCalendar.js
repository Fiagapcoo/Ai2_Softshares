import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostsCard from '../PostsCard/PostCard';
import axios from 'axios';

const ShowEventCalendar = ({ show, handleClose }) => {
  const [events, setEvents] = useState([]);


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap">
      
            <PostsCard
              type='E'
              imagealt={"Event Name"}
              imagePlaceholderChangeIma={"https://via.placeholder.com/150"}
              title={"Event Name"}
              description={"Event Description"}
              content={"Event Content"}
              rating={"Event Rating"}
              postedBy={1}
              id={2}
              date={/*formatDate(*/"2021-08-01"/*)*/}
            />
    
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShowEventCalendar;
