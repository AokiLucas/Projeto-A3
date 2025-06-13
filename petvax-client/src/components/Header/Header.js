import React from "react";
import styles from "./Header.module.css";

const Header = ({ title = "", showBack = false, onBack }) => (
  <header className={styles["home-header"]}>
    {showBack && (
      <div className={styles["header-left"]}>
        <button
          className={styles["header-btn"]}
          aria-label="Back"
          onClick={onBack || (() => window.history.back())}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className={styles["header-context"]}>Pets</span>
      </div>
    )}
    <span className={styles["header-title"]}>{title}</span>
  </header>
);

export default Header;