import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar/Navbar";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import PostsCard from "../../components/PostsCard/PostCard";
import Calendar from "../../components/Calendar/Calendar";
import { Container, Row, Col } from "react-bootstrap";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./PostsOrEvents.css";
import axios from "axios";
import Authentication from '../../Auth.service';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).split('/').join('/');
};

const PostsOrEvents = ({ type, CreateRoute }) => {
  const navigate = useNavigate();
  const [postOrEvent, setPostOrEvent] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser(navigate);
      setToken(res);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/dynamic/all-content`
        );
        if (type === "Post") {
          setPostOrEvent(response.data.posts);
        } else if (type === "Event") {
          setPostOrEvent(response.data.events);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
    checkCurrentUser();

    document.title = `SoftShares - ${type}`;
  }, [type]);

  const handleCreateClick = () => {
    navigate(CreateRoute, { replace: true });
  };

  return (
    <>
      <Navbar />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid">
          <Col xs={12} md={3} className="category-card w-100 h-100">
            <div className="center-category">
              <CategoryCard />
            </div>
            <ButtonWithIcon
              icon="fas fa-plus plus_icon"
              text={`Add ${type}`}
              onClick={handleCreateClick}
            />
            <ButtonWithIcon
              icon="fas fa-filter filter_icon"
              text={`Filter ${type}`}
            />
            <div className="center-calendar">
              <Calendar />
            </div>
          </Col>
          <Col
            xs={12}
            md={9}
            className="posts-grid w-100 justify-content-center"
          >
            {postOrEvent.map((post) =>
              type === "Post" ? (
                <PostsCard
                  key={post.post_id}
                  imagealt={post.title}
                  imagePlaceholderChangeIma={post.filepath}
                  title={post.title}
                  description={post.description}
                  content={post.content}
                  rating={post.rating}
                  postedBy={post.publisher_id}
                  id={post.post_id}
                />
              ) : (
                <PostsCard
                  key={post.event_id}
                  type="E"
                  imagealt={post.name}
                  imagePlaceholderChangeIma={post.filepath}
                  title={post.name}
                  description={post.description}
                  content={post.content}
                  rating={post.rating}
                  postedBy={post.publisher_id}
                  id={post.event_id}
                  date={formatDate(post.event_date)}
                />
              )
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

PostsOrEvents.propTypes = {
  type: PropTypes.oneOf(["Event", "Post"]).isRequired,
  CreateRoute: PropTypes.string.isRequired,
};

export default PostsOrEvents;
