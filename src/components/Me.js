import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";

export default function Me() {
  const [me, setMe] = useState("");
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
          data: { username },
        } = await response.json();
        setMe(username);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMe();
    console.log(me);
  }, []);
  return <h1>{me}</h1>;
}
