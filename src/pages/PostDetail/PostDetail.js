import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./PostDetail.css";
import Authentication from "../../Auth.service";
import Navbar from "../../components/Navbar/Navbar";
import MapComponent from "../../components/MapComponent/MapComponent";

const PostDetail = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    document.title = "SoftShares - Post Detail";

    const checkCurrentUser = async () => {
      const res = await Authentication.getCurrentUser();
      if (res) {
        setToken(JSON.stringify(res.token));
      }
    };

    checkCurrentUser();
  }, []);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/dynamic/get-post/${post_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [post_id, token]);

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
        <h1 className="mb-4">Post Detail</h1>
        {post && (
          <div className="post-detail">
            <div className="post-header">
              <h2>{post.title}</h2>
              <p className="text-muted">
                Posted by {post.Publisher.first_name} {post.Publisher.last_name}{" "}
                ({post.Publisher.email}) on{" "}
                {new Date(post.creation_date).toLocaleString()}
              </p>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
              {post.filepath && (
                <img
                  className="post-image"
                  loading="lazy"
                  alt={post.title}
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${post.filepath}`}
                />
              )}
            </div>
            <div className="post-footer">
              <p>
                <strong>Sub Area:</strong> {post.SubArea.title}
              </p>
              {post.price && (
                <p>
                  <strong>Price:</strong> {post.price}
                </p>
              )}
              {post.p_location && (
                <>
                  <p>
                    <strong>Location:</strong> {post.p_location}
                  </p>
                  <MapComponent location={post.p_location} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
