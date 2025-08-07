import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const logo = newTheme === "light" ? "/logo-black.svg" : "/logo-white.svg";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("logo", logo);

    window.dispatchEvent(new Event("themeChange"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDarkScheme ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <div
      className="transition-all flex gap-2 rounded-full cursor-pointer p-0.5"
      onClick={handleThemeToggle}
    >
      <span className={theme === "light" ? "px-1" : "px-1"}>
        <i
          className={
            theme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill"
          }
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
        ></i>
      </span>
    </div>
  );
}
