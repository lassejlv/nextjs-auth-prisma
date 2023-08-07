import React from "react";

export default function Container({ session }) {
  return (
    <div className={"container mt-5"}>
      <h1>User Logged In</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
