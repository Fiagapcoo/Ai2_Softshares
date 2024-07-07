import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ButtonWithIcon from '../../components/ButtonWithIcon/ButtonWithIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../../components/UsersTable/UsersTable';
import Authentication from '../../Auth.service';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser(navigate);
      setToken(res);
    };
    
    document.title = "SoftShares - Dashboard";

    checkCurrentUser();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid w-100 h-100">
          <Col xs={12} md={3} className="category-card w-100">
            <div className='center-category'>
              <UsersTable token={token} />
            </div>
            <ButtonWithIcon 
              icon={"fas fa-plus plus_icon"}
              text={`Create Area/ Category`}
              onClick={() => { navigate('/addArea'); }}
            />
            <ButtonWithIcon 
              icon={"fas fa-plus plus_icon"}
              text={`Create Sub Area/ Activity`}
              onClick={() => { navigate('/addSubArea'); }}
            />
          </Col>
          <Col xs={12} md={9} className="posts-manage-grid w-100">
            {/* Add content here for the posts management */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
