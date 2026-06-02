import ScrollArrow from "../components/ScrollArrow";
import type { SectionId } from "../components/Header";
import ReactOrganizer from "../assets/images/ReactOrganizer.png";
import ReactEvil from "../assets/images/ReactEvil.png";
import SoundWall from "../assets/images/SounWall.png";
import PetitCahier from "../assets/images/PetitCahier.png";
import styles from "./ProjectsSection.module.css";

const ProjectsSection = ({
	onNavigate,
}: {
	onNavigate: (id: SectionId) => void;
}) => {
	return (
		<section
			id="projects"
			className={styles.projectsSection}
			aria-labelledby="projects-title"
		>
			<div className={styles.textprojects}>
				<h2 id="projects-title">Bienvenue dans ma galerie de projets ! </h2>

				<p>
					J'ai déployé ces applications pour vous permettre de tester mes
					compétences en React en conditions réelles.
				</p>
				<p>
					Que vous soyez ici pour vous détendre ou pour vous organiser, j'ai ce
					qu'il vous faut : Envie de frisson ?
				</p>

				<p>
					Plongez dans notre project collaboratif{" "}
					<strong className={styles.bold}>React Evil</strong> et amusez-vous à
					découvrir cette aventure.
				</p>
				<p>
					Besoin d'ordre ? Planifiez vos prochaines tâches de la journée avec{" "}
					<strong className={styles.bold}>mon Organisateur </strong>& Post-its,
					conçu pour optimiser votre quotidien.{" "}
				</p>
				<p>
					<strong className={styles.bold}>Cliquer</strong> sur la carte du
					projet pour le consulter.
				</p>

				<p>Bonne visite et bonne exploration !</p>
			</div>
			<ul className={styles.cardsProjects}>
				<li>
					<h4>ReactEvil</h4>
					<a
						href="https://react-evil-three.vercel.app/"
						target="_blank"
						rel="noreferrer"
						className={styles.projectsLink}
						aria-label="Ouvrir le projet ReactEvil dans un nouvel onglet"
					>
						<img
							src={ReactEvil}
							alt="Aperçu du projet ReactEvil"
							className={styles.projectsImage}
							loading="lazy"
						/>
					</a>
				</li>
				<li>
					<h4>Mon Organisateur React</h4>
					<a
						href="https://react-organizer.vercel.app/"
						target="_blank"
						rel="noreferrer"
						className={styles.projectsLink}
						aria-label="Ouvrir le projet Mon Organisateur React dans un nouvel onglet"
					>
						<img
							src={ReactOrganizer}
							alt="Aperçu du projet Mon Organisateur React"
							className={styles.projectsImage}
							loading="lazy"
						/>
					</a>
				</li>
				<li>
					<h4>Sound Wall </h4>

					<button
						type="button"
						className={styles.projectsButton}
						onClick={() => onNavigate("soundwall")}
						aria-label="Aller à la section SoundWall"
					>
						<img
							src={SoundWall}
							alt="Aperçu du projet SoundWall"
							className={styles.projectsImage}
							loading="lazy"
						/>
					</button>
				</li>
				<li>
					<h4>Le Petit Cahier</h4>
					
						<a
						href="https://ptit-cahier.fr"
						target="_blank"
						rel="noreferrer"
						className={styles.projectsLink}
						aria-label="Ouvrir le projet Mon Organisateur React dans un nouvel onglet"
					>
						<img
						src={PetitCahier}
						alt="Aperçu du projet Le Petit Cahier"
						className={styles.projectsImage}
						loading="lazy"
					/>
					</a>
				</li>
			</ul>
			<ScrollArrow target="contact" onNavigate={onNavigate} />
		</section>
	);
};

export default ProjectsSection;
