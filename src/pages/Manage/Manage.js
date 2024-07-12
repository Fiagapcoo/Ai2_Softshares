import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PostsCard from '../../components/PostsCard/PostCard'; // Corrected the import name
import Calendar from '../../components/Calendar/Calendar';
import ButtonWithIcon from '../../components/ButtonWithIcon/ButtonWithIcon';
import ParentComponent from '../../components/ParentComponent/ParentComponent';
import '../../components/ValidateItem/ValidateItemPopup'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Manage.css';
import Authentication from '../../Auth.service';
import axios from 'axios';

const Manage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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
    const fetchPosts = async () => {
      if (token && user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/all-content`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (user.office_id !== 0) {
            setPosts(response.data.posts.filter(post => post.office_id === user.office_id));
          } else {
            setPosts(response.data.posts);
          }
        } catch (error) {
          console.error("Error fetching posts", error);
        }
      }
    };

    fetchPosts();
  }, [token, user]);

  return (
    <>
      <Navbar />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid w-100 h-100">
          <Col xs={12} md={3} className="category-card w-100">
            <div className='center-category'>
              <CategoryCard />
            </div>
            <ButtonWithIcon 
              icon={"fas fa-plus plus_icon"}
              text={`Create Operation Center`}
              onClick={() => {navigate('/createOC');}}
            />
            <div className="center-calendar">
              <Calendar />
            </div>
          </Col>
          
          <Col xs={12} md={9} className="posts-manage-grid w-100">
            <Row>
              <h1 className="title">Validate Posts</h1>
              <div className="d-flex flex-wrap justify-content-start">
                {posts.map(post => (
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
              </div>
              <Button className='w-100 ShowAllButton'>Show All</Button>
            </Row>
            <Row>
              <h1 className="title my-4">Validate Users</h1>
              <div className="d-flex flex-wrap justify-content-start">
                <ParentComponent name="User1" />
                <ParentComponent name="User2" />
                <ParentComponent name="User3" />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Manage;
