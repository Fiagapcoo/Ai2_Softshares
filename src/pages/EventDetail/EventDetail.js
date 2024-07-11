import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './EventDetail.css'; // You can create a CSS file to style the EventDetail page
import Authentication from '../../Auth.service';
import Navbar from "../../components/Navbar/Navbar";

const EventDetail = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [subAreas, setSubAreas] = useState([]);
    const [subArea, setSubArea] = useState("");


    useEffect(() => {
        document.title = "SoftShares - Event Detail";
    
        const checkCurrentUser = async () => {
          const res = await Authentication.getCurrentUser();
          if (res) {
            setToken(JSON.stringify(res.token));
          }
        };
    
        checkCurrentUser();
      }, []);

    useEffect(() => {
        const fetchEventDetail = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dynamic/get-event/${event_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvent(response.data.data.event);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetail();
    }, [event_id, token]);

    useEffect(() => {
        const fetchSubAreas = async () => {
            if (!token || !event) return;

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get-sub-areas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSubAreas(response.data.data);
                console.log(event.sub_area_id);
                const matchedSubArea = response.data.data.find(subArea => subArea.sub_area_id === event.sub_area_id);
                setSubArea(matchedSubArea ? matchedSubArea.title : "");
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSubAreas();
    }, [event, token]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">Event Detail</h1>
                {event && (
                    <div className="event-detail">
                        <div className="event-header">
                            <h2>{event.name}</h2>
                            <p className="text-muted">Hosted by {event.Publisher.first_name} {event.Publisher.last_name} ({event.Publisher.email}) on {new Date(event.event_date).toLocaleString()}</p>
                        </div>
                        <div className="event-content">
                            <p>{event.description}</p>
                            {event.filepath && (
                                <img
                                    className="event-image"
                                    loading="lazy"
                                    alt={event.name}
                                    src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${event.filepath}`}
                                />
                            )}
                        </div>
                        <div className="event-footer">
                            {subArea && <p><strong>Sub Area:</strong> {subArea}</p>}
                            {event.event_location && <p><strong>Location:</strong> {event.event_location}</p>}
                            {event.price && <p><strong>Price:</strong> {event.price}</p>}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EventDetail;
