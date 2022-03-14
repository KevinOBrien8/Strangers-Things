import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

export default function LoginOrRegister() {
  const { updateAuthStatus } = UseAuth();
  const { pathname } = useLocation();
  const loginOrRegister = pathname.slice(1);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: form }),
        }
      );

      const { success, error, data } = await response.json();

      if (success) {
        localStorage.st_token = data.token;
        updateAuthStatus();
      } else {
        throw new Error(
          `error ${
            loginOrRegister === "login" ? "logging in" : "registering"
          } user`
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="userName">
        <label>{loginOrRegister === "register" && "Choose "}Username:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="password">
        <label>{loginOrRegister === "register" && "Choose "}Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={loginOrRegister === "register" ? "Sign Up" : "Login"}
      />
    </form>
  );
}
