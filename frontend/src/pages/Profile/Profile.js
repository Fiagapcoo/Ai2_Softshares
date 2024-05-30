import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css";
import PostsCard from "../../components/PostsCard/PostCard";

const Profile = () => {
    return (
        <>
            <Navbar />
            <div className="banner">
                <img src="./assets/Banner.jpg" alt="banner" className="img-fluid" />
            </div>
            <div className="container my-4 profile-container">
                <div className="row">
                    <div className="col-md-3 profile-sidebar">
                        <div className="profile-pic-container">
                            <img src="./assets/personcircle.svg" alt="profile" className="profile-pic img-fluid rounded-circle" />
                            <a href="/edit-profile" className="edit-profile-icon">
                                <i className="fas fa-pencil-alt"></i>
                            </a>
                        </div>
                        <h2>Peter Parker</h2>
                        <h4>Admin</h4>
                        <div className="contact-info">
                            <p><i className="fas fa-phone"></i> +351 912345678</p>
                            <p><i className="fas fa-envelope"></i> notspiderman23@gmail.com</p>
                            <p><i className="fas fa-map-marker-alt"></i> Queens NY</p>
                            <p><i className="fas fa-user"></i> @username</p>
                            <p><i className="fab fa-linkedin"></i> username</p>
                        </div>
                    </div>
                    <div className="col-md-9 profile-content">
                        <h3>Peter's Posts:</h3>
                        <div className="row">
                            <div className="col-md-4">
                                <PostsCard
                                    className="mb-4"
                                    imagealt="Post Image"
                                    imagePlaceholderChangeIma="https://bolimg.blob.core.windows.net/producao/imagens/entidades/aderentes/ent1389.jpg?v=16"
                                    title="Post Title"
                                    description="Post Description"
                                    content="Post Content"
                                    rating={4}
                                    postedBy="Peter Parker"
                                    id="1"
                                />
                            </div>
                            <div className="col-md-4">
                                <PostsCard
                                    className="mb-4"
                                    imagealt="Post Image"
                                    imagePlaceholderChangeIma="./assets/PostImage.jpg"
                                    title="Post Title"
                                    description="Post Description"
                                    content="Post Content"
                                    rating={4}
                                    postedBy="Peter Parker"
                                    id="2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
