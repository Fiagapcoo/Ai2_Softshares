import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import "./CreateEvent.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const CreateEvent = () => {
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [sub_area, setSub_area] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [event_location, setEvent_location] = useState("");
  const [recurring, setRecurring] = useState("");
  const [recurring_pattern, setRecurring_pattern] = useState("");
  const [max_participants, setMax_participants] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const fileInputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  

  useEffect(() => {
    const fetchSubArea = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/categories/get-sub-areas`
        );
        setSub_area(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubArea();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !selectedImage || !price || !date) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Event Created",
      text: `Name: ${name}`,
    });
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
                  background: selectedImage
                    ? `url(${selectedImage}) no-repeat center/cover`
                    : "#000",
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
                  <option value="" disabled>
                    Select Sub Area
                  </option>
                  {sub_area.map((subarea) => (
                    <option
                      key={subarea.sub_area_id}
                      value={subarea.sub_area_id}
                    >
                      {subarea.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Event Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="recurring" className="mb-3">
                <Form.Label>recurring *</Form.Label>
                <Form.Check
                  type="checkbox"
                  value={recurring}
                  onChange={(e) => setRecurring(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="max_participants" className="mb-3">
                <Form.Label>Max Participants *</Form.Label>
                <Form.Control
                  type="number"
                  value={max_participants}
                  onChange={(e) => setMax_participants(e.target.value)}
                  min={1}
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-25 softinsaButtonn"
                >
                  Create Event
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateEvent;
