import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

export default function Posts() {
  const { isLoggedIn, token } = UseAuth();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const {
          data: { posts },
        } = await response.json();
        setPosts(posts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, [token]);

  return (
    <div className="posts">
      <section>Cool Items For Sale</section>
      {posts &&
        posts.map((post) => {
          const { _id, author, title, description, price, isAuthor, messages } =
            post;

          return (
            <div className="individualPost" key={_id}>
              <h4>{title}</h4>
              <p>{description}</p>
              <label>Price</label>
              <span>{price}</span>
              <p>{author.username}</p>
              {isLoggedIn && !isAuthor && (
                <Link to={`/posts/${post._id}/messages/new`}>Send Message</Link>
              )}
            </div>
          );
        })}
    </div>
  );
}
