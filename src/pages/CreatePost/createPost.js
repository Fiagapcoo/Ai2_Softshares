import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../api';
import Authentication from '../../Auth.service';
import './CreatePost.css';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CreatePost = ({ edit = false }) => {
  const navigate = useNavigate();
  const { post_id } = useParams();

  const [subArea, setSubArea] = useState([]);
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [verified, setVerified] = useState(false);
  const [pLocation, setPLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    document.title = "SoftShares - Create Post";

    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser();
      if (res) {
        setToken(JSON.stringify(res.token));
        setUser(res.user);
      }
    };

    checkCurrentUser();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchSubareas = async () => {
        try {
          const response = await api.get('/categories/get-sub-areas');
          setSubArea(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchSubareas();
    }
  }, [token]);

  useEffect(() => {
    if (edit && post_id) {
      const fetchPostData = async () => {
        try {
          const response = await api.get(`/dynamic/get-post/${post_id}`);
          const post = response.data;
          setSelectedSubArea(post.SubArea.sub_area_id);
          setPostTitle(post.title);
          setDescription(post.content);
          setSelectedImage(post.filepath);
          setVerified(post.validated);
          setPLocation({ lat: parseFloat(post.location.lat), lng: parseFloat(post.location.lng) });
        } catch (error) {
          console.error(error);
        }
      };

      fetchPostData();
    }
  }, [edit, post_id]);

  useEffect(() => {
    if (edit && verified) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot edit a validated post!',
      });
      navigate("/posts");
    }
  }, [edit, verified, navigate]);

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

  const handleMapClick = (event) => {
    setPLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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
      photoFormData.append('image', fileInputRef.current.files[0]);

      const uploadResponse = await api.post('/upload/upload', photoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const location = (pLocation.lat && pLocation.lng) ? `${pLocation.lat}, ${pLocation.lng}` : null;

      const formData = {
        subArea: selectedSubArea,
        postTitle,
        description,
        photo: uploadResponse.data.file.filename,
        pLocation: location
      };

      if (edit) {
        await api.patch(`/post/edit/${post_id}`, {
          subAreaId: selectedSubArea,
          officeId: "1",
          publisher_id: user.user_id,
          title: postTitle,
          content: description,
          filePath: formData.photo,
          location: `${pLocation.lat}, ${pLocation.lng}`,
          type: "P",
          rating: 1
        });
        Swal.fire({
          icon: 'success',
          title: 'Post Updated',
          text: `Title: ${postTitle}, Area: ${selectedSubArea}`,
        });
      } else {
        await api.post('/post/create', {
          subAreaId: selectedSubArea,
          officeId: "1",
          publisher_id: user.user_id,
          title: postTitle,
          content: description,
          filePath: formData.photo,
          pLocation: location,
          type: "P",
          rating: 1
        });
        Swal.fire({
          icon: 'success',
          title: 'Post Created',
          text: `Title: ${postTitle}, Area: ${selectedSubArea}`,
        });
      }

      setPostTitle("");
      setSelectedSubArea("");
      setDescription("");
      setSelectedImage(null);
      fileInputRef.current.value = null;
      setPLocation({ lat: 0, lng: 0 });
      navigate("/posts");

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to upload image',
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (selectedImage && !selectedImage.startsWith('data:')) {
      setImageUrl(`${process.env.REACT_APP_BACKEND_URL}/api/uploads/${selectedImage}`);
    } else {
      setImageUrl(selectedImage);
    }
  }, [selectedImage]);

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
                  background: imageUrl ? `url(${imageUrl}) no-repeat center/cover` : '#000',
                  position: 'relative'
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
              <Form.Group controlId="formPLocation" className="mb-3">
                <Form.Label>Post Location *</Form.Label>
                <div style={{ height: "400px", width: "100%" }}>
                  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                      mapContainerStyle={{ height: "100%", width: "100%" }}
                      center={pLocation.lat ? pLocation : { lat: 39.5, lng: -8.0 }}
                      zoom={10}
                      onClick={handleMapClick}
                    >
                      {pLocation.lat && <Marker position={pLocation} />}
                    </GoogleMap>
                  </LoadScript>
                </div>
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" className="w-25 softinsaButtonn">
                  {edit ? 'Update Post' : 'Create Post'}
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
