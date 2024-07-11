import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './CreateSubArea.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../Auth.service';

const CreateSubArea = () => {
  
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [subAreaName, setSubAreaName] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser(navigate);
      setToken(res);
    };
    
    document.title = "Create SubArea";

    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get-areas`);
        setAreas(response.data.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
    checkCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedArea || !subAreaName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }

    try {
      const formData = {
        areaId: selectedArea,
        title: subAreaName,
      };

      console.log('Create SubArea Data:', formData);
      
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/create-sub-category`,
        formData
      );

      console.log('Create SubArea Response:', response);

      setSelectedArea("");
      setSubAreaName("");

      Swal.fire({
        icon: 'success',
        title: 'SubArea Created',
        text: `SubArea Name: ${subAreaName}`,
      });
    } catch (error) {
      console.error('Error creating subarea:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to create subarea',
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={5} className="bg-light rounded p-5 shadow">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formAreaSelect" className="mb-3">
                <Form.Label>Select Area *</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="" disabled>Select Area</option>
                  {areas.map((area) => (
                    <option key={area.area_id} value={area.area_id}>
                      {area.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSubAreaName" className="mb-3">
                <Form.Label>SubArea Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="SubArea Name"
                  value={subAreaName}
                  onChange={(e) => setSubAreaName(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-50 softinsaButtonn"
                  disabled={!selectedArea || !subAreaName}
                >
                  Create SubArea
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateSubArea;
