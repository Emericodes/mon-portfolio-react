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
		<section id="projects" className={styles.projectsSection}>
			<div className={styles.textprojects}>
				<h2>Bienvenue dans ma galerie de projets ! </h2>

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
					>
						<img
							src={ReactEvil}
							alt="Projects Quizz"
							className={styles.projectsImage}
							fetchPriority="high"
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
					>
						<img
							src={ReactOrganizer}
							alt="Projects Quizz"
							className={styles.projectsImage}
							fetchPriority="high"
						/>
					</a>
				</li>
				<li>
					<h4>Sound Wall </h4>

					<img
						src={SoundWall}
						alt="Projects Quizz"
						className={`${styles.projectsInt} ${styles.clickable}`}
						fetchPriority="high"
						onClick={() => onNavigate("soundwall")}
						onKeyUp={(event) => {
							if (event.key === "Enter" || event.key === " ") {
								onNavigate("soundwall");
							}
						}}
					/>
				</li>
				<li>
					<h4>Le Petit Cahier</h4>
					<img
						src={PetitCahier}
						alt="Projects Quizz"
						className={styles.projectsImage}
						fetchPriority="high"
					/>
					<p className={styles.bold}>disponible en Mars</p>
				</li>
			</ul>
			<ScrollArrow target="contact" onNavigate={onNavigate} />
		</section>
	);
};

export default ProjectsSection;
