import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";

export default function Me() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { token } = UseAuth();
  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(
          `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {
          data: { username, messages, posts },
        } = await response.json();
        setUsername(username);
        setMessages(messages);
        setUserPosts(posts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMe();
  }, [token]);

  const activePosts = userPosts.filter((post) => post.active);
  const inactivePosts = userPosts.filter((post) => !post.active);

  async function deletePost(postId) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${postId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { success } = await response.json();

        if (success) {
          const filteredPosts = userPosts.map((post) => {
            if (post._id === postId) {
              post.active = false;
            }
            return post;
          });
          setUserPosts(filteredPosts);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  return (
    <section>
      <div>
        <h1>{username}</h1>
        <h1>Current Messages</h1>
        {messages &&
          messages.map((message) => {
            const { _id, content, post, fromUser } = message;

            return (
              <div key={_id}>
                <p>{content}</p>
                <p>{post.title}</p>
                <p>{fromUser.username}</p>
              </div>
            );
          })}
        <h1>My Posts</h1>
        <h3>Active Posts</h3>
        {activePosts &&
          activePosts.map((post) => {
            const { _id, title, description, price } = post;
            return (
              <div key={_id}>
                <h4>{title}</h4>
                <p>{description}</p>
                <label>Price</label>
                <span>{price}</span>
                <button onClick={() => deletePost(post._id)}>
                  Delete Post
                </button>
              </div>
            );
          })}

        <h3>Inactive Posts</h3>
        {inactivePosts &&
          inactivePosts.map((post) => {
            const { _id, title, description, price } = post;
            return (
              <div key={_id}>
                <h4>{title}</h4>
                <p>{description}</p>
                <label>Price</label>
                <span>{price}</span>
              </div>
            );
          })}
      </div>
    </section>
  );
}
