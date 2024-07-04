import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UsersTable.css';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState('');
    const [isEditingOffice, setIsEditingOffice] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/get-users`);
                const filteredUsers = response.data.data.filter(user => user.city !== 'ALL');
                setUsers(filteredUsers);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        };

        const getOffices = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/administration/get-all-centers`);
                const filteredOffices = response.data.data.filter(office => office.city !== 'ALL');
                setOffices(filteredOffices);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        };

        getUsers();
        getOffices();
    }, [refresh]);

    const filteredUsers = users.filter(user =>
        (user.first_name + ' ' + user.last_name).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShowModal = (user) => {
        setSelectedUser(user);
        setSelectedOffice(user.city);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setIsEditingOffice(false);
        
    };

    const handleSaveChanges = async () => {
        if (selectedUser) {
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/update-user-office`, {
                    user_id: selectedUser.user_id,
                    office_id: selectedOffice,
                });
                setRefresh(!refresh);
                setUsers(users.map(user => 
                    user.id === selectedUser.id ? { ...user, city: selectedOffice } : user
                ));
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        }
        handleCloseModal();
    };

    return (
        <div>
            <div className="card" style={{ width: '22rem', borderColor: '#00BFFF', borderWidth: '1px' }}>
                <input
                    type="text"
                    placeholder="Search users"
                    className="form-control mb-3"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="list-group list-group-flush" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {filteredUsers.map((user, index) => (
                        <li 
                            key={index} 
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            onClick={() => handleShowModal(user)}
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{user.first_name + " " + user.last_name}</span>
                        </li>
                    ))} 
                </div>
            </div>

            {selectedUser && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Name:</strong> {selectedUser.first_name + " " + selectedUser.last_name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Office:</strong> {selectedUser.city}</p>
                        <Form.Check 
                            type="checkbox"
                            label="Change Office"
                            checked={isEditingOffice}
                            onChange={() => setIsEditingOffice(!isEditingOffice)}
                        />
                        {isEditingOffice && (
                            <Form.Group controlId="formOfficeSelect">
                                <Form.Label>Select New Office</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    value={selectedOffice} 
                                    onChange={e => setSelectedOffice(e.target.value)}
                                >
                                    {offices.map((office, index) => (
                                        <option key={index} value={office.office_id}>
                                            {office.city}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        {isEditingOffice && (
                            <Button variant="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default UsersTable;
