import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [darkMode, toggleMode] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      toggleMode(true);
    }
  }, []);

  useEffect(() => {
    const userSetting = window.localStorage.getItem("mode");
    userSetting && toggleMode(userSetting === "dark");
  }, []);

  useEffect(() => {
    if (darkMode) {
      window.localStorage.setItem("mode", "dark");
      document.body.classList.add("darkMode");
    } else {
      window.localStorage.setItem("mode", "light");
      document.body.classList.remove("darkMode");
    }
  }, [darkMode]);

  return (
    <div
      className={darkMode ? "darkMode" : ""}
      onClick={() => toggleMode(!darkMode)}
      style={{
        padding: "12px",
        marginBottom: "24px",
        borderRadius: "240px 16px 128px 16px / 16px 200px 16px 192px",
        background: darkMode ? "white" : "black",
        color: darkMode ? "black" : "white",
        fontSize: ".8em",
        display: "inline-block",
      }}
    >
      {darkMode ? "change to ☀️" : "change to 🌙"}
    </div>
  );
};

export default DarkModeSwitch;