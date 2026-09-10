import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("");
  const [result, setResult] = useState("");

  const handleFeature = (feature: string) => {
    setActiveFeature(feature);

    if (feature === "simplify") {
      setResult(
        "Photosynthesis is the process by which plants make their own food using sunlight, water and carbon dioxide."
      );
    }

    if (feature === "explain") {
      setResult(
        "In simple words: plants use sunlight to turn water and carbon dioxide into food. Oxygen is released during this process."
      );
    }

    if (feature === "steps") {
      setResult(
        "1. Plant absorbs sunlight.\n2. Roots absorb water.\n3. Leaves take in carbon dioxide.\n4. The plant produces food."
      );
    }
  };

  const readAloud = () => {
    if (!result) return;

    const speech = new SpeechSynthesisUtterance(result);
    speechSynthesis.speak(speech);
  };

  return (
    <div className="app">

      {/* Floating Button */}
      {!isOpen && (
        <button
          className="floating-button"
          onClick={() => setIsOpen(true)}
        >
          ✦
          <span>StudyLens</span>
        </button>
      )}

      {/* Main Panel */}
      {isOpen && (
        <div className="panel">

          {/* Header */}
          <div className="panel-header">
            <div>
              <div className="brand">
                <span className="brand-icon">✦</span>
                StudyLens
              </div>

              <p>Your learning assistant</p>
            </div>

            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Current Page */}
          <div className="page-info">
            <span className="status-dot"></span>
            Reading NCERT content
          </div>

          <div className="divider"></div>

          {/* Feature Section */}
          {!result && (
            <>
              <h2>What do you need help with?</h2>

              <div className="feature-grid">

                <button
                  className="feature-card"
                  onClick={() => handleFeature("simplify")}
                >
                  <span className="feature-icon">✦</span>
                  <span>
                    <strong>Make Simple</strong>
                    <small>Easier language</small>
                  </span>
                </button>

                <button
                  className="feature-card"
                  onClick={() => handleFeature("explain")}
                >
                  <span className="feature-icon">?</span>
                  <span>
                    <strong>Explain</strong>
                    <small>Understand the concept</small>
                  </span>
                </button>

                <button
                  className="feature-card"
                  onClick={() => handleFeature("steps")}
                >
                  <span className="feature-icon">≡</span>
                  <span>
                    <strong>Step-by-Step</strong>
                    <small>Break it down</small>
                  </span>
                </button>

                <button
                  className="feature-card"
                  onClick={readAloud}
                >
                  <span className="feature-icon">🔊</span>
                  <span>
                    <strong>Listen</strong>
                    <small>Read aloud</small>
                  </span>
                </button>

              </div>

              {/* Reading Mode */}
              <button
                className="reading-mode"
                onClick={() => handleFeature("simplify")}
              >
                <span>📖</span>

                <div>
                  <strong>Focus Reading</strong>
                  <small>Distraction-free reading mode</small>
                </div>

                <span className="arrow">→</span>
              </button>
            </>
          )}

          {/* Result */}
          {result && (
            <div className="result-section">

              <button
                className="back-button"
                onClick={() => {
                  setResult("");
                  setActiveFeature("");
                }}
              >
                ← Back
              </button>

              <div className="result-label">
                {activeFeature === "simplify" && "✦ Simple Version"}
                {activeFeature === "explain" && "? Explained Simply"}
                {activeFeature === "steps" && "≡ Step-by-Step"}
              </div>

              <div className="result-card">
                <p>{result}</p>
              </div>

              <div className="result-actions">

                <button onClick={readAloud}>
                  🔊 Listen
                </button>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(result)
                  }
                >
                  📋 Copy
                </button>

              </div>

              <button
                className="try-again"
                onClick={() => setResult("")}
              >
                ↻ Try another feature
              </button>

            </div>
          )}

          {/* Accessibility */}
          <div className="accessibility">

            <div className="accessibility-title">
              Accessibility
            </div>

            <div className="accessibility-controls">

              <button>A−</button>
              <button>A</button>
              <button>A+</button>

              <span className="divider-small"></span>

              <button>☼</button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default App;