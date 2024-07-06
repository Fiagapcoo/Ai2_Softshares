import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const SetupPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert('Passwords do not match');
            return;
        }

        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/setup-password`, 
                {
                    password: password
                }, 
                {
                    headers: {
                        Authorization: 'Bearer ' + token 
                    }
                }
            );

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            alert('Error setting up password');
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
        <Form onSubmit={handleSubmit}>
            <h1>Setup Password</h1>
            <p>Enter your new password</p>
            <Form.Group>
                <Form.Label>New Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password2} 
                    onChange={(e) => setPassword2(e.target.value)} 
                />
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

export default SetupPassword;
