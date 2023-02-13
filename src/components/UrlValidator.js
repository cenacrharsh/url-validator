import React, { useState } from "react";

const UriValidator = () => {
  const [domain, setDomain] = useState("");
  const [path, setPath] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let url = `${domain}/${path.split(" ").join("/")}`;
    setMessage(`URL: ${url}`);

    if (method === "POST" || method === "PUT") {
      if (!body) {
        setMessage("Error in the Body");
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="submit">
      <div>
        <label>Domain:</label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          data-testid="domain"
        />
      </div>
      <div>
        <label>Path:</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          data-testid="path"
        />
      </div>
      <div>
        <label>Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          data-testid="method"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      {(method === "POST" || method === "PUT") && (
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            data-testid="body"
          />
        </div>
      )}
      <button type="submit">Submit</button>
      <div data-testid="message">{message}</div>
    </form>
  );
};

export default UriValidator;
