import React, { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`
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
  }, []);

  return (
    <div className="posts">
      <div>Cool Items For Sale</div>
      {posts &&
        posts.map((post) => {
          const { _id, author, title, description, price } = post;
          return (
            <div key={_id}>
              <h4>{title}</h4>
              <p>{description}</p>
              <label>Price</label>
              <span>{price}</span>
              <p>{author.username}</p>
            </div>
          );
        })}
    </div>
  );
}
