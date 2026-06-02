import styles from "./NavHamburger.module.css";

interface NavHamburgerProps {
    onClick: () => void;
    isOpen: boolean;
}

const NavHamburger = ({ onClick, isOpen }: NavHamburgerProps) => {
    return (
        <button 
            type="button"
            className={styles.hamburger} 
            onClick={onClick}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
        >
            <span className={`${styles.burgerLine} ${isOpen ? styles.rotate1 : ""}`} />
            <span className={`${styles.burgerLine} ${isOpen ? styles.hide : ""}`} />
            <span className={`${styles.burgerLine} ${isOpen ? styles.rotate2 : ""}`} />
        </button>
    );
};

export default NavHamburger;
