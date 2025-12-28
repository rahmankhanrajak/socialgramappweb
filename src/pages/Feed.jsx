import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/posts.api";
import { Link } from "react-router-dom";

export default function Feed() {
  const { user, token, logout } = useAuth();

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setError("");
      const res = await getPosts(token);
      setPosts(res.data);
    } catch (err) {
      console.error("Get posts error:", err);
      setError("Failed to load posts");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setError("");
      await createPost(content, token);
      setContent("");
      loadPosts();
    } catch (err) {
      console.error("Create post error:", err);
      setError("Failed to create post");
    }
  };

  const handleUpdatePost = async (postId) => {
    if (!editingContent.trim()) return;

    try {
      setError("");
      await updatePost(postId, editingContent, token);
      setEditingPostId(null);
      setEditingContent("");
      loadPosts();
    } catch (err) {
      console.error("Update post error:", err);
      setError("Failed to update post");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setError("");
      await deletePost(postId, token);
      loadPosts();
    } catch (err) {
      console.error("Delete post error:", err);
      setError("Failed to delete post");
    }
  };

  return (
    <div>
      <h2>Feed</h2>
      <p>
        Logged in as: <b>{user?.name}</b>
      </p>

      <button onClick={logout}>Logout</button>
      <span style={{ marginLeft: 8 }}>
        <Link to="/chat">Go to Chat</Link>
      </span>

      <hr />

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreatePost}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          cols={40}
        />
        <br />
        <button type="submit">Post</button>
      </form>

      <hr />

      <div>
        {posts.map((p) => {
          const isOwner =
            String(p.user?._id) === String(user?.id);

          return (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                margin: "8px 0",
                padding: 8,
              }}
            >
              <b>{p.user?.name ?? "Unknown"}</b>

              {editingPostId !== p._id && (
                <p>{p.content}</p>
              )}

              {editingPostId === p._id && (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) =>
                      setEditingContent(e.target.value)
                    }
                    rows={3}
                    cols={40}
                  />
                  <br />
                  <button
                    onClick={() => handleUpdatePost(p._id)}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingPostId(null);
                      setEditingContent("");
                    }}
                    style={{ marginLeft: 6 }}
                  >
                    Cancel
                  </button>
                </>
              )}

              <small>
                {new Date(p.createdAt).toLocaleString()}
              </small>

              {isOwner && editingPostId !== p._id && (
                <div style={{ marginTop: 6 }}>
                  <button
                    onClick={() => {
                      setEditingPostId(p._id);
                      setEditingContent(p.content);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(p._id)}
                    style={{ marginLeft: 6 }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
