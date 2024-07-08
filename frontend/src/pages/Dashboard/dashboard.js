import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../components/UsersTable/UsersTable";
import Authentication from "../../Auth.service";
import axios from "axios"; // Added axios import

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser();
      setToken(res);
    };

    document.title = "SoftShares - Dashboard";

    checkCurrentUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-user-by-token`,
            {
              headers: {
                Authorization: `${token}`, // Corrected Authorization header format
              },
            }
          );

          setUser(res.data.user);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    getUser();
  }, [token]);

  return (
    <>
      <Navbar />
      <Container fluid className="Conteudo mt-5">
        <Row className="homepage-grid w-100 h-100">
          <Col xs={12} md={3} className="category-card w-100">
            <div className="center-category">
              {token && user && <UsersTable token={token} user={user} />}
            </div>
            <ButtonWithIcon
              icon={"fas fa-plus plus_icon"}
              text={`Create Area/ Category`}
              onClick={() => {
                navigate("/addArea");
              }}
            />
            <ButtonWithIcon
              icon={"fas fa-plus plus_icon"}
              text={`Create Sub Area/ Activity`}
              onClick={() => {
                navigate("/addSubArea");
              }}
            />
            {user && user.office_id === 0 && ( // Added null check for user
              <ButtonWithIcon
                icon={"fas fa-plus plus_icon"}
                text={`Create Office/ Company`}
                onClick={() => {
                  navigate("/createAdmin");
                }}
              />
            )}
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
