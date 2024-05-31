import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PostsCard from '../../components/PostsCard/PostCard';
import Calendar from '../../components/Calendar/Calendar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ButtonWithIcon from '../../components/ButtonWithIcon/ButtonWithIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './PostsOrEvents.css';

const PostsOrEvents = ({ type }) => {
  useEffect(() => {
    document.title = `SoftShares - ${type}`;
  }, [type]);

  return (
    <>
      <Navbar />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid">
          <Col xs={12} md={3} className="category-card w-100 h-100">
            <div className='center-category'>
              <CategoryCard />
            </div>
            <ButtonWithIcon 
            icon={"fas fa-plus plus_icon"}
            text={`Add ${type}`}
            />
            <ButtonWithIcon
            icon={"fas fa-filter filter_icon"}
            text={`Filter ${type}`}
            />
            <div className="center-calendar">
              <Calendar />
            </div>
          </Col>
          <Col xs={12} md={9} className="posts-grid w-100 justify-content-center">
            <PostsCard
              imagealt="Viseu"
              imagePlaceholderChangeIma="https://bolimg.blob.core.windows.net/producao/imagens/entidades/aderentes/ent1389.jpg?v=16"
              title="Teatro Viriato"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.5}
              postedBy="Nathan Drake"
              id='1'
            />
            <PostsCard
              imagealt="Lisbon"
              imagePlaceholderChangeIma="https://example.com/lisbon.jpg"
              title="Lisbon Theatre"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.0}
              postedBy="Elena Fisher"
              id='1'
            />
            <PostsCard
              imagealt="Lisbon"
              imagePlaceholderChangeIma="https://example.com/lisbon.jpg"
              title="Lisbon Theatre"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.0}
              postedBy="Elena Fisher"
              id='1'
            />
            <PostsCard
              imagealt="Lisbon"
              imagePlaceholderChangeIma="https://example.com/lisbon.jpg"
              title="Lisbon Theatre"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.0}
              postedBy="Elena Fisher"
              id='1'
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

PostsOrEvents.propTypes = {
  type: PropTypes.oneOf(['Event', 'Post']).isRequired,
};

export default PostsOrEvents;
