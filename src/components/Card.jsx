import { useState, useEffect, useRef } from "react";
import useInView from "../hooks/useInView";

function Card({ anime, index }) {
  const [hovered, setHovered]     = useState(false);
  const [tilt, setTilt]           = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc]       = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const inView  = useInView(wrapRef);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${anime.malId}`)
      .then((r) => r.json())
      .then((d) => {
        const url =
          d?.data?.images?.jpg?.large_image_url ||
          d?.data?.images?.jpg?.image_url;
        if (url) setImgSrc(url);
      })
      .catch(() => {});
  }, [anime.malId]);

  const onMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top)  / r.height - 0.5) * -9,
      y: ((e.clientX - r.left) / r.width  - 0.5) *  9,
    });
  };

  const onMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={wrapRef}
      className={`card-wrapper ${inView ? "in-view" : ""}`}
      style={{ "--delay": `${index * 0.12}s` }}
    >
      <div
        ref={cardRef}
        className={`card ${hovered ? "hovered" : ""}`}
        style={{
          "--accent": anime.accent,
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.025 : 1})`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <div className="card-image">
          {!imgLoaded && <div className="shimmer" />}

          {imgSrc && (
            <img
              src={imgSrc}
              alt={anime.title}
              className={`poster ${imgLoaded ? "loaded" : ""} ${hovered ? "zoomed" : ""}`}
              onLoad={() => setImgLoaded(true)}
            />
          )}

          <div className="image-fade" />
          <div className={`accent-bar ${hovered ? "bright" : ""}`}
            style={{ background: `linear-gradient(180deg, ${anime.accent}, ${anime.accent}44)` }} />

          <span className="tag" style={{ color: anime.accent, borderColor: `${anime.accent}44` }}>
            {anime.tag}
          </span>

          <span className="rating-badge" style={{ background: anime.accent }}>
            {anime.rating}
          </span>

          <div className={`quote-overlay ${hovered ? "visible" : ""}`}
            style={{ background: `linear-gradient(0deg, ${anime.accent}cc 0%, ${anime.accent}55 50%, transparent 100%)` }}>
            <p className={`quote-text ${hovered ? "visible" : ""}`}>
              "{anime.quote}"
            </p>
          </div>
        </div>

        <div className="card-body">
          <div className="meta-row">
            <span className="japanese">{anime.japanese}</span>
            <span className="year-eps">{anime.year} · {anime.episodes}</span>
          </div>

          <h2 className={`anime-title ${hovered ? "glowing" : ""}`}
            style={{ "--accent": anime.accent }}>
            {anime.title}
          </h2>

          <p className="genre">{anime.genre}</p>

          <div className={`rule ${hovered ? "expanded" : ""}`}
            style={{ background: `linear-gradient(90deg, ${anime.accent}, ${anime.accent}33, transparent)` }} />

          <p className="synopsis">{anime.synopsis}</p>

          <div className="card-footer">
            <div className="studio-block">
              <span className="studio-label">STUDIO</span>
              <span className="studio-name">{anime.studio}</span>
            </div>

            <div
              className={`arrow-btn ${hovered ? "active" : ""}`}
              style={{
                borderColor: hovered ? anime.accent : "#252530",
                color: hovered ? anime.accent : "#333340",
                boxShadow: hovered ? `0 0 20px ${anime.accent}44` : "none",
              }}
            >
              →
            </div>
          </div>
        </div>

        <div className={`card-glow ${hovered ? "visible" : ""}`}
          style={{ background: `radial-gradient(ellipse at 60% 0%, ${anime.accent}0d 0%, transparent 60%)` }} />
      </div>
    </div>
  );
}

export default Card;