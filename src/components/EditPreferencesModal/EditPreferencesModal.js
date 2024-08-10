import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '../../api';

const EditPreferencesModal = ({ showModal, handleCloseModal, Areas, userId = 16 }) => {
    const [preferences, setPreferences] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [selectedSubtopics, setSelectedSubtopics] = useState([]);
    const [allSubtopics, setAllSubtopics] = useState([]);
    const [filteredSubtopics, setFilteredSubtopics] = useState([]);

    useEffect(() => {
        const fetchSubtopics = async () => {
            try {
                const response = await api.get('/categories/get-sub-areas');
                console.log(response.data.data);
                setAllSubtopics(response.data.data);
            } catch (error) {
                console.error("Error fetching subtopics", error);
            }
        };
        fetchSubtopics();
    }, []);

    useEffect(() => {
        if (selectedAreas.length > 0) {
            const filtered = allSubtopics.filter(subtopic =>
                selectedAreas.includes(subtopic.area_id)
            );
            setFilteredSubtopics(filtered);
        } else {
            setFilteredSubtopics([]);
        }
    }, [selectedAreas, allSubtopics]);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await api.get(`/user/get-user-preferences/${userId}`);
                console.log(response.data.data);
                setPreferences(response.data.data);

                if (response.data.data) {
                    setSelectedAreas(response.data.data.areas || []);
                    setSelectedSubtopics(response.data.data.subAreas || []);
                }
            } catch (error) {
                console.error("Error fetching preferences", error);
            }
        };

        if (userId) {
            fetchPreferences();
        }
    }, [userId]);

    const handleSaveChanges = async () => {
        try {
            const payload = {
                areas: selectedAreas,
                subAreas: selectedSubtopics,
                receiveNotifications: true,
            };

            console.log("Saving preferences", payload);

            await api.post(`/user/create-user-preferences/${userId}`, payload);
            console.log("Preferences updated successfully");
            handleCloseModal();
        } catch (error) {
            console.error("Error saving preferences", error);
        }
    };

    const handleAreaChange = (e) => {
        const value = parseInt(e.target.value);
        setSelectedAreas(prevSelectedAreas =>
            prevSelectedAreas.includes(value)
                ? prevSelectedAreas.filter(area => area !== value)
                : [...prevSelectedAreas, value]
        );
    };

    const handleSubtopicChange = (e) => {
        const value = parseInt(e.target.value);
        setSelectedSubtopics(prevSelectedSubtopics =>
            prevSelectedSubtopics.includes(value)
                ? prevSelectedSubtopics.filter(subtopic => subtopic !== value)
                : [...prevSelectedSubtopics, value]
        );
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Your Preferences</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        {Areas.length > 0 && (
                            <>
                                <h5>Preferred Areas</h5>
                                <div className="checkbox-group d-flex flex-wrap">
                                    {Areas.map((area) => (
                                        <div key={area.area_id} className="form-check me-3 mb-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={area.area_id}
                                                id={`area-${area.area_id}`}
                                                checked={selectedAreas.includes(area.area_id)}
                                                onChange={handleAreaChange}
                                            />
                                            <label className="form-check-label" htmlFor={`area-${area.area_id}`}>
                                                {area.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {filteredSubtopics.length > 0 && selectedAreas.length > 0 && (
                        <>
                            <hr />
                            <div className="form-group">
                                <h5>Preferred Subtopics</h5>
                                <div className="checkbox-group d-flex flex-wrap">
                                    {filteredSubtopics.map((subtopic) => (
                                        <div key={subtopic.sub_area_id} className="form-check me-3 mb-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={subtopic.sub_area_id}
                                                id={`subtopic-${subtopic.sub_area_id}`}
                                                checked={selectedSubtopics.includes(subtopic.sub_area_id)}
                                                onChange={handleSubtopicChange}
                                            />
                                            <label className="form-check-label" htmlFor={`subtopic-${subtopic.sub_area_id}`}>
                                                {subtopic.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-group mt-3">
                        <small className="form-text text-muted">
                            Note: You will be notified for every content added in the selected Areas/Subtopics.
                        </small>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPreferencesModal;
