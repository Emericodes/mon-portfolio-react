import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import Homebackground from "../assets/images/background_home.png";
import Profil from "../assets/images/profil.png";
import type { SectionId } from "../components/Header";
import styles from "./HomeSection.module.css";

const HomeSection = ({
	onNavigate,
}: {
	onNavigate: (id: SectionId) => void;
}) => {
	return (
		<section id="home" className={styles.homeSection}>
			<div className={styles.backgroundHome}>
				<img
					src={Homebackground}
					alt="Décoration d'ambiance"
					className={styles.backgroundImage}
					fetchPriority="high"
				/>
				<div className={styles.overlay}></div>
			</div>

			<div className={styles.presentationContainer}>
				<div className={styles.textHome}>
					<h1 className={styles.title}>
						Bienvenue <span className={styles.highlight}>sur mon site</span>
					</h1>
					<h2 className={styles.subtitle}>
						Développeur Web Fullstack Junior. <br />
						<strong className={styles.strongText}>
							Opérationnel aujourd'hui, en pleine exploration de l'écosystème
							React & Node.js.
						</strong>
					</h2>

					<p className={styles.description}>
						Je construis des projets pour transformer mes connaissances en
						expériences concrètes.
					</p>
					<p className={styles.description}>
						Curieux et motivé, je cherche l'équipe qui me permettra de grandir
						tout en apportant ma pierre à l'édifice.
					</p>
				</div>

				<img
					src={Profil}
					alt="Portrait d'Emeric"
					className={styles.profileImage}
					fetchPriority="high"
				/>

				<div className={styles.iconContainer}>
					<a
						href="https://github.com/Emericodes"
						target="_blank"
						rel="noreferrer"
					>
						<Github className={styles.myIcon} />
					</a>
					<a
						href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
						target="_blank"
						rel="noreferrer"
					>
						<Linkedin className={styles.myIcon} />
					</a>
					<a href="mailto:pro.emeric.m@gmail.com">
						<Mail className={styles.myIcon} />
					</a>
				</div>
			</div>
			<button
				type="button"
				className={styles.arrowButton}
				onClick={() => onNavigate("about")}
			>
				<ChevronDown className={styles.arrow} />
			</button>
		</section>
	);
};

export default HomeSection;
