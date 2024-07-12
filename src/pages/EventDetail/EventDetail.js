import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './EventDetail.css'; // You can create a CSS file to style the EventDetail page
import Authentication from '../../Auth.service';
import Navbar from "../../components/Navbar/Navbar";

const EventDetail = () => {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [subAreas, setSubAreas] = useState([]);
  const [subArea, setSubArea] = useState("");
  const [forumComments, setForumComments] = useState([]);
  const [activeTab, setActiveTab] = useState("event");
  const [newComment, setNewComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    document.title = "SoftShares - Event Detail";

    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser();
      if (res) {
        setToken(JSON.stringify(res.token));
        setUser(res.user);
      }
    };

    checkCurrentUser();
  }, []);

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/get-event/${event_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data.data.event);
        console.log(response.data.data.event)

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [event_id, token]);

  useEffect(() => {
    const fetchSubAreas = async () => {
      if (!token || !event) return;

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get-sub-areas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubAreas(response.data.data);
        const matchedSubArea = response.data.data.find(subArea => subArea.sub_area_id === event.sub_area_id);
        setSubArea(matchedSubArea ? matchedSubArea.title : "");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSubAreas();
  }, [event, token]);

  useEffect(() => {
    const fetchForumComments = async () => {
      if (!token || !event) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/comment/get-comment-tree/content/forum/id/${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setForumComments(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchForumComments();
  }, [event, token, event_id]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/get-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data.data);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllUsers();
  }, [token]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchForumComments = async () => {
        if (!token || !event) return;

        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/comment/get-comment-tree/content/forum/id/${event_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setForumComments(response.data.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchForumComments();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [token, event, event_id]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/comment/add-comment`,
        {
          contentID: event_id,
          contentType: 'forum',
          userID: user.user_id,
          commentText: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      // Refresh comments
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/comment/get-comment-tree/content/forum/id/${event_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setForumComments(response.data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const findUserById = (userId) => {
    const user = allUsers.find((user) => user.user_id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${activeTab === "event" ? "active" : ""}`} href="#" onClick={() => setActiveTab("event")}>
              Event
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeTab === "forum" ? "active" : ""}`} href="#" onClick={() => setActiveTab("forum")}>
              Forum
            </a>
          </li>
        </ul>

        {activeTab === "event" && event && (
          <div className="event-detail">
            <div className="event-header">
              <h2>{event.name}</h2>
              <p className="text-muted">Hosted by {findUserById(event.publisher_id)} on {new Date(event.event_date).toLocaleString()}</p>
            </div>
            <div className="event-content">
              <p>{event.description}</p>
              {event.filepath && (
                <img
                  className="event-image"
                  loading="lazy"
                  alt={event.name}
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${event.filepath}`}
                />
              )}
            </div>
            <div className="event-footer">
              {subArea && <p><strong>Sub Area:</strong> {subArea}</p>}
              {event.event_location && <p><strong>Location:</strong> {event.event_location}</p>}
              {event.price && <p><strong>Price:</strong> {event.price}</p>}
            </div>
          </div>
        )}

        {activeTab === "forum" && (
          <div className="forum">
            <h2>Forum</h2>
            <div className="chat-container">
              <div className="messages">
                {forumComments.map(comment => (
                  <div key={comment.comment_id} className="message">
                    <p><strong>{findUserById(comment.publisher_id)}:</strong> {comment.content}</p>
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="button" onClick={handleSendComment}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetail;
