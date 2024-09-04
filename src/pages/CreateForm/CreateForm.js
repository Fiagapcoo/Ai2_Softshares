import React, { useState } from "react";
import { Form, Button, Row, Col, Modal, InputGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Navbar from "../../components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import './CreateForm.css';
import api from "../../api";

const CreateForm = () => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newField, setNewField] = useState({ type: "", name: "", options: [] });
    const [jsonForm, setJsonForm] = useState([]);

    const addInfo = (label, options, type) => {
        const obj = {
            field_name: label,
            field_type: type,
            field_value: JSON.stringify(options || []),
            max_value: null,
            min_value: null
        };
        setJsonForm(prevJsonForm => [...prevJsonForm, obj]);
    };

    const handleShowModal = (type) => {
        const allowedTypes = ["Text", "Number", "Radio", "Checkbox"];
        if (!allowedTypes.includes(type)) {
            alert("Invalid field type.");
            return;
        }
        setNewField({ type, name: "", options: type === "Radio" ? ["Option 1"] : [] });
        setShowModal(true);
    };

    const handleAddField = () => {
        const allowedTypes = ["Radio", "Checkbox", "Text", "Number"];
        if (!allowedTypes.includes(newField.type)) {
            alert(`Invalid field type: ${newField.type}. Allowed types are Radio, Checkbox, Text, and Number.`);
            return;
        }

        const fieldToAdd = { ...newField, id: Date.now() };
        setFormFields(prevFields => [...prevFields, fieldToAdd]);
        addInfo(newField.name, newField.options, newField.type);
        handleCloseModal();
    };

    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (id, value) => {
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleRadioOptionChange = (optionIndex, value) => {
        setNewField(prevField => ({
            ...prevField,
            options: prevField.options.map((opt, idx) => idx === optionIndex ? value : opt)
        }));
    };

    const handleAddRadioOption = () => {
        setNewField(prevField => ({
            ...prevField,
            options: [...prevField.options, `Option ${prevField.options.length + 1}`]
        }));
    };

    const handleSetName = (name) => {
        setNewField(prevField => ({ ...prevField, name }));
    };

    const createF = async (event) => {
        event.preventDefault();
        try {
            const customFieldsJson = JSON.stringify(jsonForm);
            console.log("Custom fields JSON:", customFieldsJson);
            const res = await api.post('/form/create-form', {
                event_id: 2, // Update this to the actual event id
                customFieldsJson
            });
            console.log("Response from server:", res.data);
        } catch (error) {
            console.error("Error creating form:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 down">
                <h1>Create Form</h1>
                <DropdownButton id="dropdown-basic-button" title="Add a field">
                    <Dropdown.Item onClick={() => handleShowModal("Text")}>Text Field</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowModal("Number")}>Numeric Field</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowModal("Radio")}>Radio Button Group</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowModal("Checkbox")}>Checkbox</Dropdown.Item>
                </DropdownButton>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add {newField.type.charAt(0).toUpperCase() + newField.type.slice(1)} Field</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Field Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter field name"
                                value={newField.name}
                                onChange={(e) => handleSetName(e.target.value)}
                            />
                        </Form.Group>
                        {newField.type === "Radio" && (
                            <div>
                                <Form.Label>Radio Options</Form.Label>
                                {newField.options.map((option, optionIndex) => (
                                    <InputGroup className="mb-2" key={optionIndex}>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Option ${optionIndex + 1}`}
                                            value={option}
                                            onChange={(e) => handleRadioOptionChange(optionIndex, e.target.value)}
                                        />
                                    </InputGroup>
                                ))}
                                <Button variant="secondary" onClick={handleAddRadioOption}>
                                    Add Option
                                </Button>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddField}>
                            Add Field
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Form className="mt-4" onSubmit={createF}>
                    {formFields.map((field) => (
                        <div key={field.id} className="mb-4">
                            {field.type === "Text" && (
                                <Form.Group as={Row} controlId={`text-${field.id}`}>
                                    <Form.Label column sm={2}>{field.name || "Text Field"}:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter text"
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            )}
                            {field.type === "Number" && (
                                <Form.Group as={Row} controlId={`number-${field.id}`}>
                                    <Form.Label column sm={2}>{field.name || "Numeric Field"}:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter a number"
                                            value={formData[field.id] || ""}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            )}
                            {field.type === "Checkbox" && (
                                <Form.Group as={Row} controlId={`checkbox-${field.id}`}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Form.Check
                                            type="checkbox"
                                            label={field.name || "Checkbox"}
                                            checked={formData[field.id] || false}
                                            onChange={(e) => handleInputChange(field.id, e.target.checked)}
                                        />
                                    </Col>
                                </Form.Group>
                            )}
                            {field.type === "Radio" && (
                                <Form.Group as={Row} controlId={`radio-${field.id}`}>
                                    <Form.Label as="legend" column sm={2}>
                                        {field.name || "Radio Buttons"}:
                                    </Form.Label>
                                    <Col sm={10}>
                                        {field.options.map((option, optionIndex) => (
                                            <Form.Check
                                                type="radio"
                                                label={option}
                                                name={`radio-${field.id}`}
                                                value={option}
                                                checked={formData[field.id] === option}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                key={optionIndex}
                                            />
                                        ))}
                                    </Col>
                                </Form.Group>
                            )}
                        </div>
                    ))}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default CreateForm;
