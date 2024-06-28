import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './CreateOC.css';

const CreateOC = () => {
  const [location, setLocation] = useState("");
  const [admin, setAdmin] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const admins = ["Name1", "Name2", "Name3", "Name4", "Name5"];

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !admin || !selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'OC Created',
      text: `Location: ${location}, Admin: ${admin}`,
    });
    console.log(location, admin, selectedImage);
  };

  return (
    <>
      <Navbar />
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={5} className="bg-light rounded p-5 shadow">
            <div className="text-center mb-4">
              <div className="image-placeholder" onClick={handleImageClick}>
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="img-fluid rounded" />
                ) : (
                  <span>Add +</span>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formLocation" className="mb-3">
                <Form.Label>Location *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formAdmin" className="mb-3">
                <Form.Label>Admin *</Form.Label>
                <Form.Select
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <option value="" disabled>Select Admin</option>
                  {admins.map((admin, index) => (
                    <option key={index} value={admin}>
                      {admin}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" className="w-50 softinsaButtonn">
                  Create OC
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateOC;
