import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

export default function LoginOrRegister() {
  const { updateAuthStatus } = UseAuth();
  const { pathname } = useLocation();
  const loginOrRegister = pathname.slice(1);
  const history = useHistory();

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
        `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: form }),
        }
      );

      const { success, data } = await response.json();

      if (success) {
        localStorage.st_token = data.token;
        updateAuthStatus();
        history.push("/me");
      } else {
        window.alert("Unrecognized Username or Password");
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
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1>
        {loginOrRegister === "register" ? "Register New User" : "Welcome Back"}
      </h1>
      <div className="userName">
        <label>{loginOrRegister === "register" && "Choose "}Username:</label>
        <input
          className="input"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="password">
        <label>{loginOrRegister === "register" && "Choose "}Password:</label>
        <input
          className="input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input
        className="loginBtn"
        type="submit"
        value={loginOrRegister === "register" ? "Sign Up" : "Login"}
      />
    </form>
  );
}
