import Navbar from '../../components/Navbar/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './CreatePost.css';
import axios from 'axios';

const CreatePost = () => {

  const [subArea, setSubArea] = useState([]);
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const fetchSubareas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get-sub-areas`);
        console.log(response.data.data);
        setSubArea(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubareas();
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
    if (!selectedSubArea || !postTitle || !selectedImage || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }

    try {
      const photoFormData = new FormData();
      photoFormData.append('image', fileInputRef.current.files[0]); // Change field name to 'image'

      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload/upload`,
        photoFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const formData = {
        subArea: selectedSubArea,
        postTitle,
        description,
        photo: uploadResponse.data.file.filename,
      };

      // Send the formData to your server or handle it as needed
      const FilePath = formData.photo;

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/create`, {
        subAreaId: selectedSubArea,
        officeId: "1",
        publisher_id: "13",
        title: postTitle,
        content: description,
        filePath: FilePath,
        type: "P",
        rating: 1
      });

      setPostTitle("");
      setSelectedSubArea("");
      setDescription("");
      setSelectedImage(null);
      fileInputRef.current.value = null;


      console.log(response.data);

      Swal.fire({
        icon: 'success',
        title: 'Post Created',
        text: `Title: ${postTitle}, Area: ${selectedSubArea}`,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to upload image',
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={5} className="bg-light rounded p-4 shadow">
            <div className="text-center mb-4">
              <div
                className="image-placeholder"
                onClick={handleImageClick}
                style={{
                  background: selectedImage ? `url(${selectedImage}) no-repeat center/cover` : '#000'
                }}
              >
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
                <Form.Label>Sub Area *</Form.Label>
                <Form.Select
                  value={selectedSubArea}
                  onChange={(e) => setSelectedSubArea(e.target.value)}
                >
                  <option value="" disabled>Select Sub Area</option>
                  {subArea.map((subarea) => (
                    <option key={subarea.sub_area_id} value={subarea.sub_area_id}>{subarea.title}</option>
                  ))}
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
                <Form.Label>Description *</Form.Label>
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
