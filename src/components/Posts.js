import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

export default function Posts() {
  const { isLoggedIn, token } = UseAuth();

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  function postMatches(post, text) {
    console.log(text);
  }
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div className="posts">
      <h1>Stranger's Things</h1>
      <form>
        <label>Search</label>
        <input
          type="text"
          className="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e)}
        ></input>
      </form>
      {postsToDisplay &&
        postsToDisplay.map((post) => {
          const {
            _id,
            author,
            title,
            description,
            price,
            isAuthor,
            location,
            messages,
            willDeliver,
          } = post;

          return (
            <div className="individualPost" key={_id}>
              <h4>{title}</h4>
              <p>{description}</p>
              <label>Price</label>
              <span>{price}</span>
              <label>Location</label>
              <span>{location}</span>
              {willDeliver && <p>Will Deliver</p>}
              <p>{author.username}</p>

              {isLoggedIn && !isAuthor && (
                <Link
                  className="messageLink"
                  to={`/posts/${post._id}/messages/new`}
                >
                  Send Message
                </Link>
              )}
            </div>
          );
        })}
    </div>
  );
}
