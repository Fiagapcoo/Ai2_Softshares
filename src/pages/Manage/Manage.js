import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "../../components/Navbar/Navbar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import PostCard from "../../components/PostsCard/PostCard";
import Calendar from "../../components/Calendar/Calendar";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import ParentComponent from "../../components/ParentComponent/ParentComponent";
import PostValidationPopup from "../../components/PostValidationPopup/PostValidationPopup";
import EventValidationPopup from "../../components/EventValidationPopup/EventValidationPopup";
import Authentication from "../../Auth.service";
import api from "../../api";
import "./Manage.css";

const isInFuture = (eventDate) => {
  return new Date(eventDate) > new Date();
};

const formatDate = (dateString) => {
  return new Date(dateString)
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("/");
};

const Manage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [usersToValidate, setUsersToValidate] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredArea, setFilteredArea] = useState("");

  useEffect(() => {
    document.title = "SoftShares - Manage";

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
    const params = new URLSearchParams(location.search);
    const area = params.get("area");
    if (area) {
      setFilteredArea(area);
    }
  }, [location]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (token && user) {
        try {
          const response = await api.get("/dynamic/all-content");
          let eventsData = response.data.events;
          let postsData = response.data.posts;

          if (user.office_id !== 0) {
            eventsData = eventsData.filter(
              (event) => event.office_id === user.office_id && !event.validated
            );
            postsData = postsData.filter(
              (post) => post.office_id === user.office_id && !post.validated
            );
          } else {
            eventsData = eventsData.filter((event) => !event.validated);
            postsData = postsData.filter((post) => !post.validated);
          }
          eventsData = eventsData.filter(
            (event) => isInFuture(event.event_date)
          );

          if (filteredArea) {
            const areaNumber = Number(filteredArea);
            eventsData = eventsData.filter(
              (event) =>
                parseInt(event.sub_area_id.toString().slice(0, 3), 10) ===
                  areaNumber || event.area === areaNumber
            );
            postsData = postsData.filter(
              (post) =>
                parseInt(post.sub_area_id.toString().slice(0, 3), 10) ===
                  areaNumber || post.area === areaNumber
            );
          }

          setPosts(postsData);
          setFilteredEvents(eventsData);
          setEvents(eventsData);
        } catch (error) {
          console.error("Error fetching posts", error);
        }
      }
    };

    fetchPosts();
  }, [token, user, filteredArea]);

  useEffect(() => {
    const fetchUsersToValidate = async () => {
      try {
        const response = await api.get("/user/get-users-to-validate");
        console.log("Users to validate", response.data.data);
        setUsersToValidate(response.data.data.filter((user) => user.hashed_password !== null));
      } catch (error) {
        console.log("Error fetching users to validate", error);
      }
    };

    fetchUsersToValidate();
  }, [token, user]);

  const handleValidatePosts = (postId) => {
    setPosts(posts.filter((post) => post.post_id !== postId));
  };

  const handleRejectPosts = (postId) => {
    setPosts(posts.filter((post) => post.post_id !== postId));
  };

  const handleValidateEvents = (eventId) => {
    setEvents(events.filter((event) => event.event_id !== eventId));
  };

  const handleRejectEvents = (eventId) => {
    setEvents(events.filter((event) => event.event_id !== eventId));
  };

  const handleValidateClick = (item, type) => {
    if (type === "post") {
      setSelectedPost(item);
      setShowPostPopup(true);
    } else if (type === "event") {
      setSelectedEvent(item);
      setShowEventPopup(true);
    }
  };

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid w-100 h-100">
          <Col xs={12} md={3} className="category-card w-100">
            <div className="center-category">
              <CategoryCard token={token} />
            </div>
            {user && user.office_id === 0 && (
              <>
            <ButtonWithIcon
              text={`Operational Centers`}
              onClick={() => {
                navigate("/OC");
              }}
            />
            <ButtonWithIcon
              text={`Areas`}
              onClick={() => {
                navigate("/area");
              }}
            />
            <ButtonWithIcon
              text={`SubAreas`}
              onClick={() => {
                navigate("/subArea");
              }}
            />
            
            </>
            )}
            <ButtonWithIcon
              text={`Forums`}
              onClick={() => {
                navigate("/forum");
              }}
            />
            <div className="center-calendar">
              <Calendar token={token} user={user} />
            </div>
          </Col>

          <Col xs={12} md={9} className="posts-manage-grid w-100">
            {posts.length > 0 && (
              <Row>
                <h1 className="title">Validate Publications</h1>
                <div className="d-flex flex-wrap justify-content-start">
                  {posts.map((post) => (
                    <PostCard
                      key={post.post_id}
                      imagealt={post.title}
                      imagePlaceholderChangeIma={post.filepath}
                      title={post.title}
                      description={post.description}
                      content={post.content}
                      rating={post.rating}
                      postedBy={post.publisher_id}
                      id={post.post_id}
                      token={token}
                      showOptions
                      onValidate={() => handleValidateClick(post, 'post')}
                    />
                  ))}
                </div>
              </Row>
            )}
            {filteredEvents.length > 0 && (
              <Row>
                <h1 className="title my-4">Validate Events</h1>
                <div className="d-flex flex-wrap justify-content-start">
                  {filteredEvents.map((event) => (
                    <Col
                      xs={12}
                      md={4}
                      lg={3}
                      key={event.event_id}
                      className="mb-4"
                    >
                      <PostCard
                        key={event.event_id}
                        type="E"
                        imagealt={event.name}
                        imagePlaceholderChangeIma={event.filepath}
                        title={event.name}
                        description={event.description}
                        content={event.content}
                        rating={event.rating}
                        postedBy={event.publisher_id}
                        id={event.event_id}
                        date={formatDate(event.event_date)}
                        token={token}
                        showOptions
                        onValidate={() => handleValidateClick(event, 'event')}
                      />
                    </Col>
                  ))}
                </div>
              </Row>
            )}
            <Row>
              <h1 className="title my-4">Validate Users</h1>
              <div className="d-flex flex-wrap justify-content-start">
                {usersToValidate.map((user) => (
                  <ParentComponent key={user.id} name={`${user.first_name} ${user.last_name}`} picture={user.profile_pic} email={user.email} />
                ))}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <PostValidationPopup
        show={showPostPopup}
        handleClose={handleClose}
        user={user}
        onValidate={handleValidatePosts}
        onReject={handleRejectPosts}
        post={selectedPost}
      />
      <EventValidationPopup
        show={showEventPopup}
        handleClose={handleClose}
        user={user}
        onValidate={handleValidateEvents}
        onReject={handleRejectEvents}
        event={selectedEvent}
      />
    </>
  );
};

export default Manage;
