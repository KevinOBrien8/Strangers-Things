import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

export default function NewPost() {
  const { token } = UseAuth();
  const { history } = useHistory();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // fetch to get a respnse whether our POST action was successful
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post: form }),
        }
      );
      // resolve data
      const { success, data, error } = await response.json();
      // we leverage the history api to shunt our user elsewhere after successful POST Action
      if (success) {
        history.push("/posts");
      } else {
        throw new Error("error creating post");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="title">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="description">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="price">
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Submit New Post" />
    </form>
  );
}
