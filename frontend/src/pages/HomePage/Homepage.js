import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PostsCard from '../../components/PostsCard/PostCard';
import Calendar from '../../components/Calendar/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import './Homepage.css';
import axios from 'axios';
import Authentication from '../../Auth.service';
import Swal from 'sweetalert2';

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
  const [user, setUser] = useState(null);
  const [firstLogin, setFirstLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    document.title = "SoftShares - Home Page";

    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser();
      setToken(res);
    };

    checkCurrentUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/get-user-by-token`, {
            headers: {
              Authorization: token,
            }
          });

          setUser(res.data.user);
          if (res.data.user.last_access === null) {
            setFirstLogin(true);
            setShowModal(true);
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    getUser();
  }, [token]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure the passwords match.',
      });
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/change-password`, {
        password: newPassword
      }, {
        headers: {
          Authorization: token
        }
      });
      console.log(res);
      if(res.status === 200) {
      setShowModal(false);
      setFirstLogin(false);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Password Change Failed',
        text: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/all-content`, {
            headers: {
              Authorization: token,
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
              <Calendar token={token} />
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
                rating={post.rating}
                postedBy={post.publisher_id}
                id={post.post_id}
                token={token}
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
                token={token}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Homepage;
