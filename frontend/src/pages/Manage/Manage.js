import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import PostsCard from '../../components/PostsCard/PostCard';
import Calendar from '../../components/Calendar/Calendar';
import UserComponent from '../../components/UserComponent/UserComponent';
import ButtonWithIcon from '../../components/ButtonWithIcon/ButtonWithIcon';
import ParentComponent from '../../components/ParentComponent/ParentComponent';
import '../../components/ValidateItem/ValidateItemPopup'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Manage.css';

const Manage = () => {
  useEffect(() => {
    document.title = "SoftShares - Manage";
  }, []);

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
            text={`Create Operation Center `}
            />
            <div className="center-calendar">
              <Calendar />
            </div>
          </Col>
          
          <Col xs={12} md={9} className="posts-manage-grid w-100">
          <Row>
            <h1 className="title" >Validate of Posts</h1>
            <div className="d-flex flex-wrap justify-content-start">
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
              imagealt="Viseu"
              imagePlaceholderChangeIma="https://bolimg.blob.core.windows.net/producao/imagens/entidades/aderentes/ent1389.jpg?v=16"
              title="Teatro Viriato"
              description="POI"
              content="Some quick example text to build on the card title."
              rating={4.5}
              postedBy="Nathan Drake"
              id='1'
            />
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
