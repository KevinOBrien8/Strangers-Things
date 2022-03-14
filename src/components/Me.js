import React, { useState, useEffect } from "react";

export default function Me() {
  const [me, setMe] = useState("");
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
  }, []);
  return (
    <div className="profile">
      <h2>{me}</h2>
    </div>
  );
}
