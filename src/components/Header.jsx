function Header({ mounted }) {
  return (
    <header className={`site-header ${mounted ? "mounted" : ""}`}>
      <div className="eyebrow">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">アニメ選集 · DARK CINEMA COLLECTION</span>
        <div className="eyebrow-line long" />
      </div>

      <div className="by-claude">✦ BY SATY</div>

      <h1 className="site-title">
        The Anime<br />
        <span className="title-outline">Hall of Fire</span>
      </h1>

      <p className="site-desc">
        One Piece · Tokyo Revengers · Naruto · Demon Slayer — four worlds that
        will consume you completely. Bankai.
      </p>
    </header>
  );
}

export default Header;