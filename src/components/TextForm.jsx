import { useState } from "react";

function TextForm() {
  // Main text state
  const [text, setText] = useState("");

  // Important word state
  const [importantWord, setImportantWord] = useState("");

  // Replace states
  const [oldWord, setOldWord] = useState("");
  const [newWord, setNewWord] = useState("");

  // 🌙 Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Dark Mode Toggle Function (FULL SCREEN)
  function toggleDarkMode() {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  }

  function removeExtraSpaces() {
  const cleanedText = text.replace(/\s+/g, " ").trim();
  setText(cleanedText);
}





  function handleChange(e) {
    setText(e.target.value);
  }

  function convertToUpper() {
    setText(text.toUpperCase());
  }

  function convertToLower() {
    setText(text.toLowerCase());
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  }

  function replaceWord() {
    if (!oldWord) return;

    const regex = new RegExp(`\\b${oldWord}\\b`, "gi");
    const updatedText = text.replace(regex, newWord);
    setText(updatedText);
  }

  const characterCount = text.length;

  const getHighlightedText = () => {
    if (!importantWord) return text;

    const regex = new RegExp(`\\b${importantWord}\\b`, "gi");

    return text.replace(
      regex,
      (match) => `<strong>${match}</strong>`
    );
  };

  return (
    <div
      className="container mt-4"
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Enter Text Below</h2>

      {/* 🌙 Dark Mode Button */}
      <button
        className="btn btn-dark mt-2 mb-3"
        onClick={toggleDarkMode}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Textarea */}
      <textarea
        className="form-control"
        rows="5"
        value={text}
        onChange={handleChange}
        placeholder="Write something..."
        spellCheck={true}
        style={{
          backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
        }}
      ></textarea>
        
        
      {/* Buttons */}
      <button
        className="btn btn-primary mt-3 me-2"
        onClick={convertToUpper}
      >
        Uppercase
      </button>

      <button
        className="btn btn-secondary mt-3 me-2"
        onClick={convertToLower}
      >
        Lowercase
      </button>
      
      <button
     className="btn btn-warning mt-3 ms-2"
     onClick={removeExtraSpaces}
     >
     Remove Extra Spaces
     </button>





      <button
        className="btn btn-success mt-3 me-2"
        onClick={copyToClipboard}
      >
        Copy
      </button>

      {/* Replace Section */}
      <div className="mt-4">
        <h5>Replace Word</h5>

        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter word to replace"
          value={oldWord}
          onChange={(e) => setOldWord(e.target.value)}
          style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        />

        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter new word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        />

        <button
          className="btn btn-warning mt-2"
          onClick={replaceWord}
        >
          Replace
        </button>
      </div>

      {/* Important Word Section */}
      <div className="mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter important word to bold"
          value={importantWord}
          onChange={(e) => setImportantWord(e.target.value)}
          style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
        />
      </div>

      {/* Character Count */}
      <div className="mt-3">
        <strong>Total Characters:</strong> {characterCount}
      </div>

      {/* Preview Section */}
      <div className="mt-4">
        <h4>Preview</h4>

        <p>
          {text.length > 0 ? text : "Enter your preview text"}
        </p>

        <p
          dangerouslySetInnerHTML={{
            __html: getHighlightedText(),
          }}
        />
      </div>
    </div>
  );
}

export default TextForm;