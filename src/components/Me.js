import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";

export default function Me() {
  const [me, setMe] = useState("");
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
        setMe(username);
        setMessages(messages);
        setUserPosts(posts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMe();
    console.log(me);
  }, []);
  return (
    <div>
      <h1>{me}</h1>
      {messages &&
        messages.map((message) => {
          const { _id, content, post, fromUser } = message;
          return (
            <div key={_id}>
              <p>{content}</p>
              <p>{post}</p>
              <p>{fromUser}</p>
            </div>
          );
        })}
      {userPosts &&
        userPosts.map((post) => {
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
  );
}
