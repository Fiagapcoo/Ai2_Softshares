import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import './setupPassword.css';

const SetupPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            Swal.fire({
                icon: 'warning',
                title: 'Passwords do not match',
                text: 'Please make sure both passwords match.',
            });
            return;
        }

        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/setup-password`, 
                { password }, 
                { headers: { Authorization: 'Bearer ' + token } }
            );

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error setting up password',
                text: 'An error occurred while setting up your password. Please try again.',
            });
            console.log('Error setting up password:', error);
        }
    };

    useEffect(() => {
        document.title = 'SoftShares - Setup Password';

        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (!token) {
            setError('Invalid or missing token');
            setLoading(false);
            return;
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container fluid className="setup-password">
            <Row className="justify-content-center mb-4">
                <Col md="auto">
                    <div className="softshares-wrapper text-center">
                        <h1 className="softshares mt-4">
                            <span>Soft</span>
                            <span className="shares">Shares</span>
                        </h1>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Form className="password-setup-form" onSubmit={handleSubmit}>
                        <div className="mb-4 text-center">
                            <div className="welcome-text">
                                Setup your new password:
                            </div>
                        </div>
                        <Form.Group controlId="formNewPassword" className="mb-3">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="text-center mb-3">
                            <Button className="w-100 setup-button" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SetupPassword;
