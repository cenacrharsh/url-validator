import React, { useState } from "react";
import "./style.css";

const UriValidator = () => {
  const [domain, setDomain] = useState("");
  const [path, setPath] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let url = `${domain}/${path.split(" ").join("/")}`;

    const domainRegex = /^www\.[a-zA-Z]+\.[a-zA-Z]+$/;
    if (!domainRegex.test(domain)) {
      setMessage("Invalid URL! Please recheck your URL");
      setMessageClass("error");
      return;
    }

    const pathRegex = /^[a-zA-Z0-9]+((\s[a-zA-Z0-9]+)*)$/;
    if (!pathRegex.test(path)) {
      setMessage(
        "Error in the Path. The path should contain words separated by spaces and the words should only be alphanumeric characters"
      );
      setMessageClass("error");
      return;
    }

    if (method === "POST" || method === "PUT") {
      if (!body) {
        setMessage("Error in the Body");
        setMessageClass("error");
        return;
      }

      const bodyRegex = /^\{("[a-zA-Z]+")\s*:([\s\S]+)\}$/;
      if (!bodyRegex.test(body)) {
        setMessage("Error in the format of the Body");
        setMessageClass("error");
        return;
      }

      const bodyKeyValue = body
        .slice(1, -1)
        .split(":")
        .map((pair) => pair.replace(/"/g, "").trim());
      url += `?${bodyKeyValue[0]}=${bodyKeyValue[1]}`;
    }

    setMessage(`URL: ${url}`);
    setMessageClass("success");
  };

  return (
    <form onSubmit={handleSubmit} data-testid="submit">
      <div>
        <div data-testid="message" className={messageClass}>
          {message}
        </div>
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
      <button type="submit">Validate</button>
    </form>
  );
};

export default UriValidator;
