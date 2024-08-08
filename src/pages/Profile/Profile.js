import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css";
import PostsCard from "../../components/PostsCard/PostCard";
import { useNavigate } from 'react-router-dom';
import Authentication from '../../Auth.service';
import api from '../../api';
import Swal from 'sweetalert2';
import EditPreferencesModal from '../../components/EditPreferencesModal/EditPreferencesModal';

const Profile = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [Areas, setAreas] = useState([]);
    const [Subtopics, setSubtopics] = useState([]);

    useEffect(() => {
        document.title = "SoftShares - Profile";

        const checkCurrentUser = async () => {
            const res = await Authentication.getCurrentUser();
            if (res) {
                setToken(JSON.stringify(res.token));
                setUser(res.user);
            }
        };

        checkCurrentUser();
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                Authentication.logout();
                navigate("/login");
            }
        });
    };

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await api.get('/categories/get-areas');
                console.log(response.data.data);
                setAreas(response.data.data);
            } catch (error) {
                console.error("Error fetching areas", error);
            }
        };

        const fetchSubtopics = async () => {
            try {
                const response = await api.get('/categories/get-sub-areas');
                console.log(response.data.data);
                setSubtopics(response.data.data);
            } catch (error) {
                console.error("Error fetching subtopics", error);
            }
        };

        fetchAreas();
        fetchSubtopics();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (token && user) {
                try {
                    const response = await api.get('/dynamic/all-content');
                    setPosts(response.data.posts.filter(post => post.publisher_id === user.user_id));
                } catch (error) {
                    console.error("Error fetching user posts", error);
                }
            }
        };

        fetchUserPosts();
    }, [token, user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container my-4 profile-container">
                <div className="row">
                    <div className="col-md-3 profile-sidebar">
                        <div className="profile-pic-container">
                            <img src="./assets/personcircle.svg" alt="profile" className="profile-pic img-fluid rounded-circle" />
                            <a href="/edit-profile" className="edit-profile-icon">
                                <i className="fas fa-pencil-alt"></i>
                            </a>
                        </div>
                        <h2>{user.first_name} {user.last_name}</h2>
                        <h4>{user.role}</h4>
                        <div className="contact-info">
                            <p><i className="fas fa-envelope"></i> {user.email}</p>
                            <p><a onClick={handleShowModal} className="edit-preferences"><i className="fas fa-cog"></i> Edit Preferences</a></p>
                            <p><a onClick={handleLogout} className="bigger"><i className="fa-solid fa-right-from-bracket"></i></a></p>
                        </div>
                    </div>
                    <div className="col-md-9 profile-content">
                        <h3>{user.first_name}'s Posts:</h3>
                        <div className="row">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <div className="col-md-4" key={post.post_id}>
                                        <PostsCard
                                            className="mb-4"
                                            imagealt={post.title}
                                            imagePlaceholderChangeIma={post.filepath}
                                            title={post.title}
                                            description={post.description}
                                            content={post.content}
                                            rating={post.rating}
                                            postedBy={`${user.user_id}`}
                                            id={post.post_id}
                                            token={token}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No posts available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EditPreferencesModal 
                showModal={showModal} 
                handleCloseModal={handleCloseModal} 
                Areas={Areas} 
                Subtopics={Subtopics} 
            />
        </>
    );
};

export default Profile;
