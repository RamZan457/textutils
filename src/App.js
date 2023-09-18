import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import from react-router-dom v6
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import TextBox from "./components/TextBox";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.querySelector("body").style.backgroundColor = "white";
      showAlert("Light mode has Enabled", "success");
      document.title = "TextUtils - Light Mode";
    } else {
      setMode("dark");
      document.querySelector("body").style.backgroundColor = "#212529";
      showAlert("Dark mode has Enabled", "success");
      document.title = "TextUtils - Dark Mode";
    }
  };

  return (
    <BrowserRouter>
      <>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <Routes>
          {/* Define routes using Routes component */}
          <Route
            path="/"
            element={<Home mode={mode} showAlert={showAlert} />}
          />
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

function Home({ mode, showAlert }) {
  return (
    <TextBox
      heading="Enter text below to Analyze:"
      mode={mode}
      showAlert={showAlert}
    />
  );
}

export default App;
