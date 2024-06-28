import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './CreatePost.css';

const CreatePost = () => {
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

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
    if (!area || !type || !rooms || !postTitle || !selectedImage|| !description) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Post Created',
      text: `Title: ${postTitle}, Area: ${area}`,
    });
    console.log(area, type, rooms, postTitle, description, selectedImage);
  };

  return (
    <>
      <Navbar />
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={5} className="bg-light rounded p-4 shadow">
            <div className="text-center mb-4">
              <div className="image-placeholder" onClick={handleImageClick} style={{ background: selectedImage ? `url(${selectedImage}) no-repeat center/cover` : '#000' }}>
                {!selectedImage && <span className="text-white">Add +</span>}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formArea" className="mb-3">
                <Form.Label>Area *</Form.Label>
                <Form.Select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="" disabled>Select Area</option>
                  <option value="Housing">Housing</option>
                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formType" className="mb-3">
                <Form.Label>Type *</Form.Label>
                <Form.Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Apartment">Apartment</option>
                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formRooms" className="mb-3">
                <Form.Label>Rooms *</Form.Label>
                <Form.Select
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                >
                  <option value="" disabled>Select Rooms</option>
                  <option value="Studio/T0">Studio/T0</option>
                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formPostTitle" className="mb-3">
                <Form.Label>Post Title *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" className="w-25 softinsaButtonn">
                  Create Post
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreatePost;
