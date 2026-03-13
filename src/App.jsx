import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card   from "./components/Card";
import animeList from "./data/anime";
import "./index.css";

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <div className="page">
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-line" />

      <div className="container">
        <Header mounted={mounted} />

        <div className="grid">
          {animeList.map((anime, i) => (
            <Card key={anime.malId} anime={anime} index={i} />
          ))}
        </div>

        <footer className="site-footer">
          <div className="footer-line" />
          <span className="footer-text">四作品 · FOUR LEGENDS · 四作品</span>
          <div className="footer-line" />
        </footer>
      </div>
    </div>
  );
}

export default App;