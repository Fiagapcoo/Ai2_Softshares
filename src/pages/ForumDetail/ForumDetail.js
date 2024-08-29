import React, { useState, useEffect } from "react";
import api from "../../api";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import "./ForumDetail.css";
import Authentication from "../../Auth.service";

const ForumDetail = () => {
  const { forum_id } = useParams();
  const [forumMessages, setForumMessages] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SoftShares - Forum Detail";

    const checkCurrentUser = async () => {
      try {
        const res = await Authentication.getCurrentUser();
        if (res) {
          setUser(res.user);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    checkCurrentUser();
  }, []);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    try {
      await api.post("/comment/add-comment", {
        contentID: forum_id,
        contentType: "Forum",
        userID: user.user_id,
        commentText: newComment,
      });

      setNewComment("");
      // Refresh comments
      const response = await api.get(`/comment/get-comment-tree/content/forum/id/${forum_id}`);
      setForumMessages(response.data.data);
    } catch (error) {
      alert("Failed to send comment:", error.message);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await api.get('/dynamic/get-users');
        setAllUsers(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllUsers();
  }, []);

  const findUserById = (userId) => {
    const foundUser = allUsers.find((user) => user.user_id === userId);
    return foundUser ? `${foundUser.first_name} ${foundUser.last_name}` : "Unknown User";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendComment();
    }
  };

  useEffect(() => {
    const fetchForumMessages = async () => {
      try {
        const response = await api.get(`/comment/get-comment-tree/content/forum/id/${forum_id}`);
        setForumMessages(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchForumMessages();
  }, [forum_id]);

  return (
    <>
      <Navbar />
      <div className="forum">
        <div className="chat-container">
          <div className="messages">
            {forumMessages.map((comment) => (
              <div key={comment.comment_id} className="message">
                <p>
                  <strong>{findUserById(comment.publisher_id)}:</strong> {comment.content}
                </p>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button type="button" onClick={handleSendComment}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumDetail;
