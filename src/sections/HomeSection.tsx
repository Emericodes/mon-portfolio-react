import Homebackground from "../assets/images/background_home.png";
import Profil from "../assets/images/profil.png";
import styles from "./HomeSection.module.css";

function HomeSection() {
	return (
		<section id="home" className={styles.heroSection}>
			<div className={styles.backgroundWrapper}>
				<img
					src={Homebackground}
					alt="Décoration d'ambiance"
					className={styles.backgroundImage}
					fetchPriority="high"
				/>

				<div className={styles.overlay}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.textWrapper}>
					<h1 className={styles.title}>
						Bienvenue <span className={styles.highlight}>sur mon site</span>
					</h1>
					<h2 className={styles.subtitle}>
						La théorie c'est bien, la pratique c'est mieux. <br />
						<strong className={styles.strongText}>
							Opérationnel aujourd'hui, expert demain.
						</strong>
					</h2>

					<p className={styles.description}>
						Je me forme activement sur <strong>React</strong> et{" "}
						<strong>Node.js</strong> à travers des projets réels. Je suis prêt à
						relever vos défis techniques et à évoluer avec votre équipe.
					</p>
				</div>
				<img
					src={Profil}
					alt="Photo de profil"
					className={styles.profileImage}
					fetchPriority="high"
				/>
				<div className={styles.ctaContainer}>
					<button className={styles.primaryButton}>Voir mes projets</button>
				</div>
			</div>
		</section>
	);
}

export default HomeSection;
