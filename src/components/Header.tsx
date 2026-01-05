import { useState } from "react";
import logo from "../assets/images/logo.png";
import logodark from "../assets/images/logodark.png";
import styles from "./Header.module.css";
import NavHamburger from "./NavHamburger";

export type SectionId = "home" | "about" | "projects" | "contact" | "soundwall";

interface HeaderProps {
    activeSection: SectionId;
    onNavigate: (section: SectionId) => void; 
}

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
    const [logoHover, setLogoHover] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { id: "about", label: "À propos" },
        { id: "projects", label: "Projets" },
        { id: "contact", label: "Contact" },
        { id: "soundwall", label: "SoundWall" },
    ];
    
    const isWhiteBackground = activeSection !== "home";

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const clickLogo = () => {
        onNavigate("home");
        setMenuOpen(false); 
    };

    const clickLink = (id: SectionId) => {
        onNavigate(id);
        setMenuOpen(false); 
    };

    return (
        <div className={styles.wrapper}>
            <header className={`${styles.header} ${isWhiteBackground ? styles.light : ""}`}>

                <button
                    type="button"
                    className={styles.logoBtn}
                    onMouseEnter={() => setLogoHover(true)}
                    onMouseLeave={() => setLogoHover(false)}
                    onClick={clickLogo}
                >
                    <img
                        className={styles.logoImg}
                        src={logoHover ? logodark : logo}
                        alt="Logo Emeric Mouillat"
                    />
                    <span className={styles.name}>Emeric Mouillat</span>
                </button>

                <nav className={styles.desktopNav}>
                    {links.map((link) => (
                        <button
                            key={link.id}
                            type="button"
                            className={`${styles.link} ${
                                activeSection === link.id ? styles.active : ""
                            }`}
                            onClick={() => clickLink(link.id as SectionId)}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                <div className={styles.burgerIcon}>
                    <NavHamburger 
                        isOpen={menuOpen} 
                        onClick={toggleMenu} 
                    />
                </div>
            </header>

            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <nav className={styles.mobileNavList}>
                        {links.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                className={`${styles.mobileLink} ${
                                    activeSection === link.id ? styles.active : ""
                                }`}
                                onClick={() => clickLink(link.id as SectionId)}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Header;