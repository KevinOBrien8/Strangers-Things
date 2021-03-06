import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UseAuth } from "../custom-hooks";
import { useHistory } from "react-router-dom";

export default function Message() {
  const history = useHistory();
  const { postId } = useParams();
  const { token } = UseAuth();
  const [form, setForm] = useState({ content: "" });

  // function to POST new message
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // Post call goes here
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${postId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: form,
          }),
        }
      );
      const { success } = await response.json();
      if (success) {
        history.push("/posts");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="newMessage">
      <form>
        <label>Send Message To Seller</label>
        <input
          id="messageForm"
          className="input"
          type="text"
          name="content"
          value={form.content}
          onChange={handleChange}
        />
        <button id="sendMessage" className="messageLink" onClick={handleSubmit}>
          Send Message
        </button>
      </form>
    </div>
  );
}
