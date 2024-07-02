import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './CreateOC.css';
import axios from 'axios';

const CreateOC = () => {
  const [location, setLocation] = useState("");
  const [admin, setAdmin] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    document.title = "Create OC";
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/get-user-by-role/CenterAdmin`);
        console.log(response.data.data);
        setAdmins(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdmins();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !admin || !selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }
    try {
      const photoFormData = new FormData();
      photoFormData.append('image', fileInputRef.current.files[0]);

      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload/upload`,
        photoFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const formData = {
        city: location,
        admin: admin,
        photo: uploadResponse.data.file.filename,
      };

      const FilePath = formData.photo;

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/administration/create-center`,
        {
          city: formData.city,
          admin: formData.admin,
          officeImage: FilePath,
        }
      );

      setLocation("");
      setAdmin("");
      setSelectedImage(null);
      fileInputRef.current.value = null;

      console.log(response.data);

      Swal.fire({
        icon: 'success',
        title: 'Center Created',
        text: `Location: ${location}, Admin: ${admin}`,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to create center',
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
            <div className="text-center mb-4">
              <div className="image-placeholder3" onClick={handleImageClick}>
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="img-fluid rounded selected-image" />
                ) : (
                  <span className="white-text">Add +</span>
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
                  {admins.map((admin) => (
                    <option key={admin.user_id} value={admin.user_id}>
                      {admin.name}
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
