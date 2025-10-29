import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updatePlayer } from "./api";

// Baileys-inspired recommendation data with luxury aesthetic
const recommendationMap = {
  A: {
    title: "The Groove Lover",
    subtitle: "YAMAS",
    lines: [
      "You're all about good vibes, great music, and creamy Baileys cocktails.",
      "Your perfect match: Yamas: where rhythm meets indulgence.",
    ],
    cta: "Complimentary Baileys cocktail treat",
    icon: "🎵",
    decorativeIcon: "♪",
  },
  B: {
    title: "The Indulgent Diner",
    subtitle: "ONZA",
    lines: [
      "You enjoy life's finer things curated meals, laughter, and sophistication.",
      "Your Baileys match: Onza, the home of fine dining and decadent treats.",
    ],
    cta: "Baileys dessert or cocktail pairing",
    icon: "🍽️",
    decorativeIcon: "✦",
  },
  C: {
    title: "The Chill Connoisseur",
    subtitle: "RAFAELO",
    lines: [
      "You love cozy moments, great conversations, and sweet indulgences",
      "Your match: Rafaelo, where Baileys meets coffee, ice cream, and milkshakes.",
    ],
    cta: "Baileys coffee or ice cream treat.",
    icon: "☕",
    decorativeIcon: "❋",
  },
  D: {
    title: "Your matched Cocktail",
    subtitle: "DON MARGARITA",
    lines: ["Classic, zesty, and always a crowd-pleaser."],
    cta: "👉 Cheers to your DON MARGARITA choice!",
    icon: "🍹",
    decorativeIcon: "✧",
  },
};

const Summary = ({ userAnswers, QUESTIONS, setRec }) => {
  const [updateScore, setUpdateScore] = useState({});
  const [applyClass, setApplyClass] = useState(false);

  const navigate = useNavigate();

  // Count skipped answers (unused visually but kept for stats)
  const skippedAnswers = userAnswers.filter((a) => a === null);

  // Count categories A-D
  const choiceCount = { A: 0, B: 0, C: 0, D: 0 };
  const labels = ["A", "B", "C", "D"];
  userAnswers.forEach((ans, i) => {
    if (ans !== null) {
      const idx = QUESTIONS[i].answers.findIndex((opt) => opt === ans);
      if (idx !== -1) choiceCount[labels[idx]]++;
    }
  });

  const mostChosen = Object.keys(choiceCount).reduce((a, b) =>
    choiceCount[a] > choiceCount[b] ? a : b
  );

  // Send update once per category change
  useEffect(() => {
    async function updateFun() {
      const res = await updatePlayer({ score: mostChosen });
      setUpdateScore(res);
    }
    updateFun();
  }, [mostChosen]);

  // Heartbeat animation toggle
  useEffect(() => {
    const interval = setInterval(() => setApplyClass((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  // Pick recommendation data
  const rec = recommendationMap[mostChosen] || {};

  useEffect(() => {
    setRec(rec);
  }, [rec]);

  function handleRestart() {
    navigate("/");
  }

  return (
    <div className="baileys-summary-wrapper">
      {/* Decorative floating elements */}
      <div className="decorative-floaters">
        <div className="floater floater-1">{rec.decorativeIcon}</div>
        <div className="floater floater-2">{rec.decorativeIcon}</div>
        <div className="floater floater-3">{rec.decorativeIcon}</div>
        <div className="floater floater-4">{rec.decorativeIcon}</div>
        <div className="floater floater-5">{rec.decorativeIcon}</div>
      </div>

      {/* Luxury swirl pattern overlay */}
      <div className="luxury-pattern"></div>

      <div className="baileys-summary-container">
        {/* Elegant Header Section */}
        <div className="baileys-header animate__animated animate__fadeIn">
          <div className="header-ornament top-ornament">✦ ✦ ✦</div>
          <div className="icon-circle">
            <span className="main-icon">{rec.icon}</span>
          </div>
          <h1 className="main-title">Your Perfect Match</h1>
          <div className="header-ornament bottom-ornament">✦</div>
        </div>

        {/* Luxury Result Card */}
        <div className="baileys-result-card animate__animated animate__fadeInUp">
          <div className="card-ornament top-left">⟡</div>
          <div className="card-ornament top-right">⟡</div>
          <div className="card-ornament bottom-left">⟡</div>
          <div className="card-ornament bottom-right">⟡</div>

          <div className="card-inner">
            {/* Match Badge */}
            <div className="match-badge">
              <span className="badge-text">Match</span>
              <span className="badge-category">{mostChosen}</span>
            </div>

            {/* Title Section */}
            <div className="title-section">
              <h2 className="persona-title">{rec.title}</h2>
              <div className="divider-line"></div>
              <h3 className="location-subtitle">{rec.subtitle}</h3>
            </div>

            {/* Description */}
            <div className="description-section">
              {rec.lines.map((line, idx) => (
                <p
                  key={idx}
                  className="description-text animate__animated animate__fadeIn"
                  style={{ animationDelay: `${0.3 + idx * 0.15}s` }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* CTA Box */}
            <div className="reward-box">
              <div className="reward-icon">🎁</div>
              <div className="reward-content">
                <p className="reward-label">Your Exclusive Offer</p>
                <p className="reward-text">{rec.cta}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-number">{mostChosen}</span>
                <span className="stat-text">Your Match</span>
              </div>
              <div className="stats-divider">|</div>
              <div className="stat">
                <span className="stat-number">{userAnswers.length}</span>
                <span className="stat-text">Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Restart Button */}
        <button
          onClick={handleRestart}
          className={`baileys-restart-btn animate__animated ${
            applyClass ? "animate__pulse" : ""
          }`}
        >
          <span className="btn-text">Start New Journey</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
