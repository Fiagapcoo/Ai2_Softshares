import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "./CreateEvent.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';
import Authentication from '../../Auth.service';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [sub_area, setSub_area] = useState([]);
  const [event_location, setEvent_location] = useState({ lat: 0, lng: 0 });
  const [recurring, setRecurring] = useState(false);
  const [havePrice, setHavePrice] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [max_participants, setMax_participants] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const fileInputRef = useRef(null);
  const [token, setToken] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser(navigate);
      setToken(res);
    };
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
    checkCurrentUser();
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

  const handleRecurringChange = (e) => {
    const isChecked = e.target.checked;
    setRecurring(isChecked);
    if (isChecked) {
      setShowModal(true);
    } else {
      setRecurringPattern("");
    }
  };

  const handlePriceChange = (e) => {
    const isChecked = e.target.checked;
    setHavePrice(isChecked);
    if (isChecked) {
      setShowPriceModal(true);
    } else {
      setPrice("");
    }
  };

  const handleCloseModal = () => {
    if (!recurringPattern) {
      setRecurring(false);
    }
    setShowModal(false);
  };

  const handleClosePriceModal = () => {
    setShowPriceModal(false);
  };

  const handleMapClick = (event) => {
    const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setEvent_location(newLocation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !selectedImage ||
      !date ||
      !event_location.lat ||
      !event_location.lng
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }
    try {
      const photoFormData = new FormData();
      photoFormData.append("image", fileInputRef.current.files[0]);

      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload/upload`,
        photoFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const formData = {
        sub_area_id: selectedSubArea,
        name: name,
        description: description,
        event_date: date,
        event_location: event_location.lat + "," + event_location.lng,
        max_participants: max_participants,
        photo: uploadResponse.data.file.filename,
      };

      console.log(formData);

      const FilePath = formData.photo;

      console.log(FilePath);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/event/create`,
        {
          officeId: "1",
          subAreaId: formData.sub_area_id,
          name: formData.name,
          description: formData.description,
          eventDate: formData.event_date,
          maxParticipants: formData.max_participants,
          location: formData.event_location,
          publisher_id: "13",
          filePath: FilePath,
        }
      );

      console.log(response);

      console.log("Recurrence: ", recurring);

      Swal.fire({
        icon: "success",
        title: "Event Created",
        text: `Name: ${name}, Sub Area: ${selectedSubArea}`,
      });
    } catch (error) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to create event",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container className="margin4 min-vh-100 d-flex align-items-center justify-content-center">
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
                <Form.Check
                  type="checkbox"
                  label="Recurring"
                  checked={recurring}
                  onChange={handleRecurringChange}
                />
              </Form.Group>
              <Form.Group controlId="Price" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Price"
                  checked={havePrice}
                  onChange={handlePriceChange}
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
              <Form.Group controlId="eventLocation" className="mb-3">
                <Form.Label>Event Location *</Form.Label>
                <div style={{ height: "400px", width: "100%" }}>
                  <LoadScript googleMapsApiKey={"AIzaSyC52_M68kHm5SfamSKhvujRxyWgl8cSyFU"}>
                    <GoogleMap
                      mapContainerStyle={{ height: "100%", width: "100%" }}
                      center={
                        event_location.lat ? event_location : { lat: 0, lng: 0 }
                      }
                      zoom={10}
                      onClick={handleMapClick}
                    >
                      {event_location.lat && (
                        <Marker position={event_location} />
                      )}
                    </GoogleMap>
                  </LoadScript>
                </div>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Recurring Pattern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formRecurringPattern" className="mb-3">
            <Form.Check
              type="radio"
              label="Weekly"
              name="recurringPattern"
              value="weekly"
              onChange={(e) => setRecurringPattern(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Every 2 Weeks"
              name="recurringPattern"
              value="biweekly"
              onChange={(e) => setRecurringPattern(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Monthly"
              name="recurringPattern"
              value="monthly"
              onChange={(e) => setRecurringPattern(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Annual"
              name="recurringPattern"
              value="annual"
              onChange={(e) => setRecurringPattern(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (recurringPattern) {
                setShowModal(false);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "You must select a recurring pattern!",
                });
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPriceModal} onHide={handleClosePriceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Price *</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={1}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePriceModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (price) {
                setShowPriceModal(false);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "You must enter a price!",
                });
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateEvent;
