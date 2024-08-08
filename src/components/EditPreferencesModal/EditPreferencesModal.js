import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditPreferencesModal = ({ showModal, handleCloseModal, Areas, Subtopics }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Preferences</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="preferredArea">Preferred Area</label>
                        <select className="form-control" id="preferredArea">
                            <option value="" selected disabled>Select Area</option>
                            {Areas.map((area) => (
                                <option key={area.area_id} value={area.area_id}>{area.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="preferredSubtopics">Preferred Subtopics</label>
                        <select className="form-control" id="preferredSubtopics">
                            <option value="" selected disabled>Select Subtopic</option>
                            {Subtopics.map((subtopic) => (
                                <option key={subtopic.sub_area_id} value={subtopic.sub_area_id}>{subtopic.title}</option>
                            ))}
                        </select>
                    </div>
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
                <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPreferencesModal;
