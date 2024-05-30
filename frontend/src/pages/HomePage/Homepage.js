import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PostsCard from '../../components/PostsCard/PostCard';
import Calendar from '../../components/Calendar/Calendar';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Homepage.css';

const Homepage = () => {
  useEffect(() => {
    document.title = "SoftShares - Home Page";
  }, []);
  return (
    <>
      <Navbar />
      <Row className='Linha-Imagem'>
        <img src="./assets/SofinsaRectangle.png" alt="Softinsa" className="SoftinsaBanner" />
      </Row>
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
            <PostsCard
              imagealt="Viseu"
              imagePlaceholderChangeIma="https://bolimg.blob.core.windows.net/producao/imagens/entidades/aderentes/ent1389.jpg?v=16"
              title="Teatro Viriato"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.5}
              postedBy="Nathan Drake"
            />
            <PostsCard
              imagealt="Lisbon"
              imagePlaceholderChangeIma="https://example.com/lisbon.jpg"
              title="Lisbon Theatre"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.0}
              postedBy="Elena Fisher"
            />
            <PostsCard
              imagealt="Lisbon"
              imagePlaceholderChangeIma="https://example.com/lisbon.jpg"
              title="Lisbon Theatre"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.0}
              postedBy="Elena Fisher"
            />
            <PostsCard
              imagealt="Lisbon"
              imagePlaceholderChangeIma="https://example.com/lisbon.jpg"
              title="Lisbon Theatre"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.0}
              postedBy="Elena Fisher"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
