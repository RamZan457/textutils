import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextBox(props) {
  const [text, settext] = useState("");

  function handleUpCase() {
    const newText = text.toUpperCase();
    settext(newText);
    props.showAlert("Converted to UpperCase", "success");
  }

  function handleLowerCase() {
    const newText = text.toLowerCase();
    settext(newText);
    props.showAlert("Converted to LowerCase", "success");
  }

  const handleExSpaces = () => {
    const newText = text.split(/[ ]+/);
    settext(newText.join(" "));
    props.showAlert("Extra Spaces Removed", "success");
  };

  function handleCopy() {
    let text = document.getElementById("mybox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied to Clipboard", "success");
  }

  function handleClearCase() {
    const newText = "";
    settext(newText);
    props.showAlert("Textbox Cleared", "success");
  }

  function handleOnChange(event) {
    const newText = event.target.value;
    settext(newText);
  }

  return (
    <div
      className={`container my-3 bg-${props.mode} text-${
        props.mode === "light" ? "dark" : "light"
      }`}
      data-bs-theme={`${props.mode}`}
    >
      <div className="mb-3">
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="mybox"
          rows="8"
          placeholder="Enter text here"
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpCase}>
        Convert into UpperCase
      </button>
      <button className="btn btn-primary m-2" onClick={handleLowerCase}>
        Convert into LowerCase
      </button>
      <button className="btn btn-primary m-2" onClick={handleClearCase}>
        Clear text
      </button>
      <button className="btn btn-primary m-2" onClick={handleCopy}>
        Copy text
      </button>
      <button className="btn btn-primary m-2" onClick={handleExSpaces}>
        Remove Extra Spaces
      </button>

      <div className="my-3">
        <h2>Text Summary</h2>
        <p>
          {text.split(/\s+/).filter(Boolean).length} Words,
          {text.replace(/\s/g, "").length} Charactars
        </p>
        <p>{0.008 * text.split(/\s+/).filter(Boolean).length} Minutes read</p>
        <h2>Preview</h2>
        <p>
          {text.length > 0 ? text : "Enter some text in textbox to preview"}
        </p>
      </div>
    </div>
  );
}

TextBox.propTypes = { heading: PropTypes.string.isRequired };
TextBox.defaultProps = { heading: "Enter text below:" };
