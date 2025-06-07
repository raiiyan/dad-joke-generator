import React, { useState } from "react";
import "./App.css";


function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setJoke("");
    try {
      const res = await fetch("https://v2.jokeapi.dev/joke/Any");
      const data = await res.json();
      if (data.type === "single") setJoke(data.joke);
      else if (data.type === "twopart") setJoke(`${data.setup}\n${data.delivery}`);
      else setError("Couldn't understand the joke format!");
    } catch (e) {
      setError("Failed to fetch a joke!");
    }
    setLoading(false);
  };

  return (
    
    <div className="funky-bg">
      <div className="container">
        <h1 className="title">Dad Joke Generator</h1>
        <p className="subtitle">Craving a dad joke? Click below to get a classic groaner!</p>
        <button className="funky-btn" onClick={fetchJoke} disabled={loading}>
          {loading ? "Loading..." : "Give me a Dad Joke"}
        </button>
        {joke && (
          <div className="joke-card animate-joke">
            <pre>{joke}</pre>
          </div>
        )}
        {error && <div className="error">{error}</div>}
        <footer>
          <span>
            Made by{" "}
            <a
              href="https://raiyan-hossain.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffff", textDecoration: "underline" }}
            >
              Raiiyan
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;