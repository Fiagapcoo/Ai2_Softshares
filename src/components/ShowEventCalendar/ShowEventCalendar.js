import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PostsCard from '../PostsCard/PostCard';
import axios from 'axios';

const ShowEventCalendar = ({ show, handleClose, eventIdList, token }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventPromises = eventIdList.map(id => axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/event/get/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }));
        const eventResponses = await Promise.all(eventPromises);
        setEvents(eventResponses.map(response => response.data.data));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (eventIdList && eventIdList.length > 0) {
      fetchEvents();
    }
  }, [eventIdList]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div className="d-flex flex-wrap">
            {events.map((post) => (
              <PostsCard
                key={post.event_id}
                type="E"
                imagealt={post.name}
                imagePlaceholderChangeIma={post.filepath || 'https://via.placeholder.com/150'}
                title={post.name}
                description={post.description}
                content={post.content}
                rating={post.rating}
                postedBy={post.publisher_id}
                id={post.event_id}
                date={formatDate(post.event_date)}
                token={token}
              />
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShowEventCalendar;
