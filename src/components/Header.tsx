import React, { useState } from "react"; // On importe useState ici
import logo from "../assets/images/logo.png";
import logodark from "../assets/images/logodark.png";
import styles from "./Header.module.css";

export type SectionId = "home" | "about" | "projects" | "contact";

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div
          className={styles.logoContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onNavigate("home")}
        >
          <img
            className={styles.logoImg}
            src={isHovered ? logodark : logo}
            alt="Emeric Mouillat logo"
          />
          <span>Emeric Mouillat</span>
        </div>

        <nav
          className={styles.mainNavigation}
          aria-label="Navigation principale"
        >
          {(["about", "projects", "contact"] as SectionId[]).map((section) => (
            <button
              key={section}
              className={styles.navLink}
              onClick={() => onNavigate(section)}
              aria-current={activeSection === section ? "page" : undefined}
            >
              {section === "about"
                ? "À propos"
                : section === "projects"
                ? "Projets"
                : "Contact"}
            </button>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default React.memo(Header);
