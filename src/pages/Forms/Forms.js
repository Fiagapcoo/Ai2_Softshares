import React, { useState, useEffect } from 'react';
import './Forms.css';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../api';
import Authentication from '../../Auth.service';
import Swal from 'sweetalert2';  // Import Swal for alerts
import {
    Table,
    Container,
    Button,
    Row,
    Col,
  } from "react-bootstrap";
  import { useNavigate } from 'react-router-dom';

const Forms = () => {
    const navigate = useNavigate();
    const [eventWithForm, setEventWithForm] = useState([]);
    const [user, setUser] = useState(null);  // Initialize user with null to avoid issues with undefined properties

    useEffect(() => {
        document.title = "Forms";
    
        const checkCurrentUser = async () => {
            const res = await Authentication.getCurrentUser();
            if (res) {
                setUser(res.user);
            }
        };
    
        checkCurrentUser();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/form/get-all-event-with-forms');
                const events = response.data.data;

                if (user?.office_id === 0) {
                    setEventWithForm(events);
                } else if (user?.office_id) {
                    setEventWithForm(events.filter(event => event.office_id === user.office_id));
                }
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        if (user) {
            fetchEvents();
        }
    }, [user]);  // Add user as a dependency

    const handleEditClick = (event) => {
        console.log('Edit clicked for event', event);
        navigate('/edit-form', { state: { event } });
    };

    return (
        <>
            <Navbar />
            <Container className="down mt-5">
                <Row className="mb-4">
                    <Col>
                        <h1 className="text-center">Forms</h1>
                    </Col>
                </Row>
                <Table
                    striped
                    bordered
                    hover
                    className="table-responsive"
                    style={{
                        borderColor: "#00b0ff",
                    }}
                >
                    <thead style={{ backgroundColor: "#00b0ff", color: "#fff" }}>
                        <tr>
                            <th>Event</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventWithForm.map((event) => (
                            <tr key={event.event_id}>
                                <td>{event.name}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        onClick={() => handleEditClick(event)}
                                        style={{
                                            backgroundColor: "#00b0ff",
                                            borderColor: "#00b0ff",
                                        }}
                                    >
                                        Edit Form
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "You won't be able to revert this!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Yes, delete it!",
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    try {
                                                        await api.delete(
                                                            `/categories/delete-category/${event.area_id}`
                                                        );
                                                        Swal.fire(
                                                            "Deleted!",
                                                            "The area has been deleted.",
                                                            "success"
                                                        );
                                                        setEventWithForm(prevEvents =>
                                                            prevEvents.filter(
                                                                (ev) => ev.area_id !== event.area_id
                                                            )
                                                        );
                                                    } catch (error) {
                                                        console.error("Error deleting area:", error);
                                                        Swal.fire(
                                                            "Error!",
                                                            error.response?.data?.message || "An error occurred.",
                                                            "error"
                                                        );
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Forms;
