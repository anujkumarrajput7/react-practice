import { useState } from "react";

function TextForm() {
  // Main text state
  const [text, setText] = useState("");

  // Important word state
  const [importantWord, setImportantWord] = useState("");

  // Replace states
  const [oldWord, setOldWord] = useState("");
  const [newWord, setNewWord] = useState("");

  // Handle textarea change
  function handleChange(e) {
    setText(e.target.value);
  }

  // Convert to uppercase
  function convertToUpper() {
    setText(text.toUpperCase());
  }

  // Convert to lowercase
  function convertToLower() {
    setText(text.toLowerCase());
  }

  // Copy text to clipboard
  function copyToClipboard() {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  }

  // ---------------------------
  // REPLACE FUNCTION
  // Replace all occurrences of oldWord with newWord
  // ---------------------------
  function replaceWord() {
    if (!oldWord) return;

    const regex = new RegExp(`\\b${oldWord}\\b`, "gi");
    const updatedText = text.replace(regex, newWord);

    setText(updatedText);
  }

  // Character Count
  const characterCount = text.length;

  // Highlight Important Word (Preview Only)
  const getHighlightedText = () => {
    if (!importantWord) return text;

    const regex = new RegExp(`\\b${importantWord}\\b`, "gi");

    return text.replace(
      regex,
      (match) => `<strong>${match}</strong>`
    );
  };

  return (
    <div className="container mt-4">
      <h2>Enter Text Below</h2>

      {/* Textarea */}
      <textarea
        className="form-control"
        rows="5"
        value={text}
        onChange={handleChange}
        placeholder="Write something..."
        spellCheck={true}
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
        />

        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter new word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
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
        />
      </div>

      {/* Character Count */}
      <div className="mt-3">
        <strong>Total Characters:</strong> {characterCount}
      </div>

      {/* Preview Section */}
      <div className="mt-4">
        <h4>Preview</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: getHighlightedText(),
          }}
        ></p>
      </div>
    </div>
  );
}

export default TextForm;