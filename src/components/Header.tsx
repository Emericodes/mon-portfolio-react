import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import logodark from "../assets/images/logodark.png";
import styles from "./Header.module.css";

export type SectionId = "home" | "about" | "projects" | "contact" | "soundwall";

interface HeaderProps {
	activeSection: SectionId;
	onNavigate: (section: SectionId) => void;
}

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const navLinks: { id: SectionId; label: string }[] = [
		{ id: "about", label: "À propos" },
		{ id: "projects", label: "Projets" },
		{ id: "contact", label: "Contact" },
		{ id: "soundwall", label: "SoundWall" },
	];
	const isNotHome = activeSection !== "home";
	return (
		<div className={styles.headerWrapper}>
			<header className={`${styles.header} ${isNotHome ? styles.lightHeader : ""}`}>

				<button
					type="button"
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
					<span className={styles.siteName}>Emeric Mouillat</span>
				</button>

				<nav className={styles.nav}>
					{navLinks.map((link) => (
						<button
							key={link.id}
							type="button"
							className={`${styles.navLink} ${
								activeSection === link.id ? styles.active : ""
							}`}
							onClick={() => onNavigate(link.id)}
						>
							{link.label}
						</button>
					))}
				</nav>
			</header>
		</div>
	);
};

export default React.memo(Header);
