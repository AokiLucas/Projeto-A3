import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";

const Header = ({
  title = "",
  showBack = false,
  onBack,
  onLogout,
  darkMode,
  onToggleDarkMode,
  hideMenu = false,
  menuItems // <-- NEW PROP
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles["home-header"]}>
      {showBack && (
        <div className={styles["header-left"]}>
          <button
            className={styles["header-btn"]}
            aria-label="Back"
            onClick={onBack || (() => window.history.back())}
            style={{ display: "flex", alignItems: "center", background: "none", border: "none", padding: 0 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span
              className={styles["header-context"]}
              style={{ cursor: "pointer", marginLeft: 4 }}
            >
              Pets
            </span>
          </button>
        </div>
      )}
      <span className={styles["header-title"]}>{title}</span>
      {/* Right side: edit icon and menu */}
      <div className={styles["header-right"]} ref={menuRef}>
        {!hideMenu && (
          <>
            <button
              className={styles["header-btn"]}
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
              style={{ color: "var(--brand-color-main, #135b5a)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
            {menuOpen && (
              <div className={styles["menu-dropdown"]}>
                {menuItems && menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    className={styles["menu-item"]}
                    onClick={() => {
                      setMenuOpen(false);
                      item.onClick();
                    }}
                  >
                    {item.icon && (
                      <span style={{ marginRight: 8, display: "inline-flex", verticalAlign: "middle" }}>
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                ))}
                {!menuItems && (
                  <>
                    <button
                      className={styles["menu-item"]}
                      onClick={() => {
                        setMenuOpen(false);
                        onToggleDarkMode && onToggleDarkMode();
                      }}
                    >
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      className={styles["menu-item"]}
                      onClick={() => {
                        setMenuOpen(false);
                        onLogout && onLogout();
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;