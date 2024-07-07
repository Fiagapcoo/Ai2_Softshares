import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PostsCard from '../../components/PostsCard/PostCard';
import Calendar from '../../components/Calendar/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Homepage.css';
import axios from 'axios';
import Authentication from '../../Auth.service';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).split('/').join('/');
};

const Homepage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [forum, setForum] = useState([]);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser(navigate);
      setToken(res);
    };

    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/all-content`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setPosts(response.data.posts);
          setEvents(response.data.events);
          setForum(response.data.forums);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };

    document.title = "SoftShares - Home Page";
    checkCurrentUser();
  }, [navigate, token]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/all-content`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setPosts(response.data.posts);
          setEvents(response.data.events);
          setForum(response.data.forums);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <Navbar />
      <img src="./assets/SofinsaRectangle.png" alt="Softinsa" className="w-100" />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid">
          <Col xs={12} md={3} className="category-card w-100 h-100">
            <div className='center-category'>
              <CategoryCard />
            </div>
            <div className="center-calendar">
              <Calendar />
            </div>
          </Col>
          <Col xs={12} md={9} className="posts-grid w-100 justify-content-center">
            {posts.map((post) => (
              <PostsCard
                key={post.post_id}
                imagealt={post.title}
                imagePlaceholderChangeIma={post.filepath}
                title={post.title}
                description={post.description}
                content={post.content}
                rating={post.rating} //TODO: Change to post.rating
                postedBy={post.publisher_id}
                id={post.post_id}
              />
            ))}
            {events.map((event) => (
              <PostsCard
                key={event.event_id}
                type='E'
                imagealt={event.name}
                imagePlaceholderChangeIma={event.filepath}
                title={event.name}
                description={event.description}
                content={event.content}
                rating={event.rating}
                postedBy={event.publisher_id}
                id={event.event_id}
                date={formatDate(event.event_date)}
              />
            ))}
            {/* Uncomment and adjust if forum data is needed */}
            {/* {forum.map((forum) => (
              <PostsCard
                key={forum.id}
                imagealt={forum.city}
                imagePlaceholderChangeIma={forum.image}
                title={forum.title}
                description={forum.description}
                content={forum.content}
                rating={forum.rating}
                postedBy={forum.postedBy}
                id={forum.id}
              />
            ))} */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
