console.log("StudyLens loaded!");

let selectedText = "";

document.addEventListener("mouseup", () => {
  const selection = window.getSelection().toString().trim();

  if (selection) {
    selectedText = selection;

    console.log("Text captured for StudyLens:");
    console.log(selectedText);
  }
});


let studyLensButton = null;
let studyLensPanel = null;

function createStudyLensButton() {
  studyLensButton = document.createElement("button");

  studyLensButton.innerHTML = `
    <span style="font-size:18px;">✦</span>
    <span>StudyLens</span>
  `;

  Object.assign(studyLensButton.style, {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: "2147483647",
    padding: "12px 18px",
    borderRadius: "28px",
    border: "1px solid #d9e4df",
    background: "#fffdf8",
    color: "#111111",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.16)",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif"
  });

  studyLensButton.addEventListener("mouseenter", () => {
    studyLensButton.style.transform = "translateY(-2px)";
  });

  studyLensButton.addEventListener("mouseleave", () => {
    studyLensButton.style.transform = "translateY(0)";
  });

  studyLensButton.addEventListener("click", openStudyLens);

  document.body.appendChild(studyLensButton);
}

function openStudyLens() {

  if (studyLensPanel) {
    studyLensPanel.style.display = "block";
    studyLensButton.style.display = "none";
    return;
  }

  studyLensPanel = document.createElement("div");

  studyLensPanel.innerHTML = `

    <!-- HEADER -->
    <div class="sl-header">

      <div>
        <div class="sl-brand">
          <span>✦</span>
          StudyLens
        </div>

        <div class="sl-subtitle">
          Your learning assistant
        </div>
      </div>

      <button class="sl-close">×</button>

    </div>


    <!-- PAGE STATUS -->
    <div class="sl-status">
      <span class="sl-dot"></span>
      <span>Reading NCERT content</span>
    </div>


    <!-- MAIN CONTENT -->
    <div class="sl-content">

      <div class="sl-question">
        What do you need help with?
      </div>


      <!-- FEATURE CARDS -->
      <div class="sl-grid">

        <button class="sl-card">

          <span class="sl-icon">✦</span>

          <span>
            <strong>Make Simple</strong>
            <small>Easier language</small>
          </span>

        </button>


        <button class="sl-card">

          <span class="sl-icon">?</span>

          <span>
            <strong>Explain</strong>
            <small>Understand concepts</small>
          </span>

        </button>


        <button class="sl-card">

          <span class="sl-icon">≡</span>

          <span>
            <strong>Step-by-Step</strong>
            <small>Break it down</small>
          </span>

        </button>


        <button class="sl-card">

          <span class="sl-icon">🔊</span>

          <span>
            <strong>Listen</strong>
            <small>Read aloud</small>
          </span>

        </button>

      </div>

      <!-- TRANSLATION -->
      <div class="sl-translate-card">

        <div class="sl-translate-title">
          🌐 Translate Page
        </div>

        <div class="sl-translate-subtitle">
          Translate the entire NCERT page
        </div>

        <div class="sl-translate-row">

          <select class="sl-language-select">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="kn">Kannada</option>
          </select>

          <button class="sl-translate-button">
            Translate
          </button>

        </div>

      </div>

      <!-- FOCUS READING -->
      <button class="sl-focus">

        <span class="sl-focus-icon">📖</span>

        <span class="sl-focus-text">

          <strong>Focus Reading</strong>

          <small>
            Distraction-free reading
          </small>

        </span>

        <span class="sl-arrow">→</span>

      </button>

    </div>


    <!-- ACCESSIBILITY -->
    <div class="sl-accessibility">

      <span class="sl-access-title">
        Accessibility
      </span>

      <div class="sl-access-buttons">

        <button>A−</button>
        <button>A</button>
        <button>A+</button>

        <span class="sl-separator"></span>

        <button>☼</button>

      </div>

    </div>
  `;


  /* PANEL */

  Object.assign(studyLensPanel.style, {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    width: "390px",
    maxWidth: "calc(100vw - 40px)",
    zIndex: "2147483647",
    background: "#fffdf8",
    color: "#111111",
    border: "1px solid #ddd9d0",
    borderRadius: "22px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.20)",
    overflow: "hidden",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxSizing: "border-box"
  });


  /* CSS */

  const style = document.createElement("style");

  style.textContent = `

    .sl-header {
      padding: 20px 20px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }


    .sl-brand {
      font-size: 21px;
      font-weight: 700;
      color: #111111;
      display: flex;
      align-items: center;
      gap: 8px;
    }


    .sl-brand span {
      color: #39786a;
    }


    .sl-subtitle {
      margin-top: 5px;
      margin-left: 27px;
      font-size: 12px;
      color: #68736f;
    }


    .sl-close {
      border: none !important;
      background: transparent !important;
      color: #68736f !important;
      font-size: 25px !important;
      line-height: 1 !important;
      padding: 0 !important;
      width: 28px !important;
      height: 28px !important;
      cursor: pointer !important;
    }


    .sl-status {
      margin: 0 20px;
      padding: 11px 13px;
      border-radius: 11px;
      background: #edf5f1;
      color: #477167;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }


    .sl-dot {
      width: 7px;
      height: 7px;
      background: #4f917d;
      border-radius: 50%;
      display: inline-block;
    }


    .sl-content {
      padding: 20px;
    }


    .sl-question {
      font-size: 15px;
      font-weight: 650;
      color: #111111;
      margin-bottom: 14px;
    }


    .sl-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }


    .sl-card {
      min-height: 70px;
      border: 1px solid #deddd7 !important;
      border-radius: 13px !important;
      background: #ffffff !important;
      padding: 12px !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      text-align: left !important;
      cursor: pointer !important;
      color: #111111 !important;
      transition: all 0.18s ease !important;
    }


    .sl-card:hover {
      border-color: #9bbcaf !important;
      background: #f6faf8 !important;
      transform: translateY(-1px);
    }


    .sl-icon {
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      border-radius: 10px;
      background: #edf5f1;
      color: #39786a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 700;
    }


    .sl-card strong {
      display: block;
      font-size: 12px;
      font-weight: 650;
      color: #18231f;
      margin-bottom: 4px;
    }


    .sl-card small {
      display: block;
      font-size: 10px;
      color: #7a8581;
      line-height: 1.25;
    }


    .sl-focus {
      width: 100% !important;
      margin-top: 12px !important;
      padding: 13px !important;
      border: 1px solid #d8e5df !important;
      border-radius: 13px !important;
      background: #f1f7f4 !important;
      display: flex !important;
      align-items: center !important;
      gap: 11px !important;
      text-align: left !important;
      color: #315e53 !important;
      cursor: pointer !important;
    }


    .sl-focus:hover {
      background: #eaf3ef !important;
    }


    .sl-focus-icon {
      font-size: 21px;
    }


    .sl-focus-text {
      flex: 1;
    }


    .sl-focus-text strong {
      display: block;
      font-size: 12px;
      color: #315e53;
      margin-bottom: 3px;
    }


    .sl-focus-text small {
      font-size: 10px;
      color: #71817b;
    }


    .sl-arrow {
      font-size: 19px;
      color: #39786a;
    }


    .sl-accessibility {
      border-top: 1px solid #e7e3db;
      padding: 13px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }


    .sl-access-title {
      font-size: 11px;
      color: #7b8581;
    }


    .sl-access-buttons {
      display: flex;
      align-items: center;
      gap: 5px;
    }


    .sl-access-buttons button {
      min-width: 30px !important;
      height: 28px !important;
      padding: 0 7px !important;
      border: 1px solid #dddeda !important;
      border-radius: 7px !important;
      background: #ffffff !important;
      color: #55645f !important;
      font-size: 10px !important;
      cursor: pointer !important;
    }


    .sl-access-buttons button:hover {
      background: #f1f5f3 !important;
    }


    .sl-separator {
      width: 1px;
      height: 20px;
      background: #deded9;
      margin: 0 5px;
    }

    .sl-result {
  margin-top: 14px;
  padding: 14px;
  border: 1px solid #dce6e1;
  border-radius: 13px;
  background: #f7faf8;

}

.sl-result-title {
  font-size: 13px;
  font-weight: 700;
  color: #315e53;
  margin-bottom: 12px;
}

.sl-result-loading {
  font-size: 12px;
  color: #71817b;
  padding: 8px 0;
}

.sl-original-label,
.sl-simple-label {
  font-size: 10px;
  font-weight: 700;
  color: #7a8581;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 5px;
}

.sl-original {
  font-size: 11px;
  line-height: 1.5;
  color: #59635f;
  background: #ffffff;
  border-radius: 8px;
  padding: 9px;
  margin-bottom: 12px;
}

.sl-simple {
  font-size: 12px;
  line-height: 1.55;
  color: #24352f;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
}

.sl-translate-card {
  margin-top: 12px;
  padding: 13px;
  border: 1px solid #dfe7e4;
  border-radius: 13px;
  background: #ffffff;
}

.sl-translate-title {
  font-size: 13px;
  font-weight: 700;
  color: #24352f;
  margin-bottom: 4px;
}

.sl-translate-subtitle {
  font-size: 10px;
  color: #71807b;
  margin-bottom: 10px;
}

.sl-translate-row {
  display: flex;
  gap: 8px;
}

.sl-language-select {
  flex: 1;
  padding: 9px;
  border: 1px solid #d7dfdc;
  border-radius: 8px;
  background: #ffffff;
  color: #24352f;
  font-size: 11px;
  cursor: pointer;
}

.sl-translate-button {
  padding: 9px 13px !important;
  border: none !important;
  border-radius: 8px !important;
  background: #eaf4f0 !important;
  color: #285f52 !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}

.sl-translate-button:hover {
  background: #dceee8 !important;
}

  `;

  document.head.appendChild(style);
  document.body.appendChild(studyLensPanel);

  studyLensButton.style.display = "none";
  /* TRANSLATION */

  const translateButton =
    studyLensPanel.querySelector(".sl-translate-button");

  const languageSelect =
    studyLensPanel.querySelector(".sl-language-select");

translateButton.addEventListener("click", () => {
  const language = languageSelect.value;

  const resultBox = studyLensPanel.querySelector(".sl-result");

  if (resultBox) {
    resultBox.innerHTML = `
      <div class="sl-result-title">
        🌐 Translate Page
      </div>

      <div class="sl-result-loading">
        Translation will be connected to the language module.
      </div>
    `;
  }

  console.log("Translation requested:", language);
});
  /* CLOSE */

  studyLensPanel
    .querySelector(".sl-close")
    .addEventListener("click", () => {

      studyLensPanel.style.display = "none";
      studyLensButton.style.display = "flex";

    });


/* FEATURE ACTIONS */

const featureCards =
  studyLensPanel.querySelectorAll(".sl-card");

featureCards.forEach((card, index) => {

  card.addEventListener("click", () => {

    // Make Simple
    // Make Simple
if (index === 0) {

  if (!selectedText) {

    alert(
      "Please select some text from the NCERT page first."
    );

    return;
  }

  console.log("Selected NCERT text:");
  console.log(selectedText);

  // Create result area
  let resultBox = studyLensPanel.querySelector(".sl-result");

  if (!resultBox) {

    resultBox = document.createElement("div");

    resultBox.className = "sl-result";

    studyLensPanel
      .querySelector(".sl-content")
      .appendChild(resultBox);
  }

  // Show loading state
  resultBox.innerHTML = `
    <div class="sl-result-title">
      ✦ Make Simple
    </div>

    <div class="sl-result-loading">
      Understanding your text...
    </div>
  `;

// Send selected text to Role 3 AI
fetch("http://localhost:8000/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    page_content: selectedText,
    user_query: "Make this text simple and easy to understand."
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error("AI server error");
  }

  return response.json();
})
.then(data => {

  resultBox.innerHTML = `
    <div class="sl-result-title">
      ✦ Make Simple
    </div>

    <div class="sl-original-label">
      Selected text
    </div>

    <div class="sl-original">
      ${selectedText}
    </div>

    <div class="sl-simple-label">
      Simplified explanation
    </div>

    <div class="sl-simple">
      ${data.summary}
    </div>
  `;

})
.catch(error => {

  console.error("StudyLens AI Error:", error);

  resultBox.innerHTML = `
    <div class="sl-result-title">
      ✦ Make Simple
    </div>

    <div class="sl-result-loading">
      Unable to connect to the StudyLens AI.
      Please make sure the AI server is running.
    </div>
  `;

});

  return;
}
    // Other features for now
    alert(
      "This feature will be connected to the AI next."
    );

  });

});
}


/* START */

if (document.body) {
  createStudyLensButton();
} else {
  window.addEventListener("DOMContentLoaded", createStudyLensButton);
}

function getNCERTPdfUrl() {
  const pdfFrame = document.querySelector("iframe");

  if (!pdfFrame) {
    console.log("No PDF found");
    return null;
  }

  const pdfUrl = pdfFrame.src;

  console.log("NCERT PDF found:", pdfUrl);

  return pdfUrl;
}