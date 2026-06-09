import ScrollArrow from "../components/ScrollArrow";
import type { SectionId } from "../components/Header";
import ReactOrganizer from "../assets/images/ReactOrganizer.png";
import ReactEvil from "../assets/images/ReactEvil.png";
import SoundWall from "../assets/images/SounWall.png";
import PetitCahier from "../assets/images/PetitCahier.png";
import ProjectsBackground from "../assets/images/white2.png";
import { FolderGit2, ExternalLink, Play } from "lucide-react";
import styles from "./ProjectsSection.module.css";

interface ProjectsSectionProps {
  onNavigate: (id: SectionId) => void;
}

const ProjectsSection = ({ onNavigate }: ProjectsSectionProps) => {
  return (
    <section
      id="projects"
      className={styles.projectsSection}
      aria-labelledby="projects-title"
    >
		  <div className={styles.backgroundContainer} aria-hidden="true">
        <img
          src={ProjectsBackground}
          alt=""
          className={styles.backgroundImage}
          fetchPriority="high"
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.bentoGrid}>
        
        <div className={`${styles.bentoCard} ${styles.introCard}`}>
          <div className={styles.titleWithIcon}>
            <FolderGit2 size={28} className={styles.cardIcon} />
            <h2 id="projects-title" className={styles.sectionTitle}>
              Galerie Projets
            </h2>
          </div>
          <h3 className={styles.subtitle}>Applications Live</h3>
          <p className={styles.introText}>
            J'ai déployé ces applications pour vous permettre de tester mes compétences en <strong className={styles.bold}>React</strong> et intégrations en conditions réelles.
          </p>
          <p className={styles.introText}>
            Que vous soyez ici pour vous détendre ou pour vous organiser, plongez dans l'univers de chaque projet.
          </p>
          <div className={styles.tipBadge}>
            <span className={styles.bold}>Astuce :</span> Cliquez directement sur l'image ou l'icône pour explorer l'application.
          </div>
        </div>

        {/* PROJET 1 : React Evil */}
        <div className={styles.bentoCard}>
          <div className={styles.projectHeader}>
            <h4>ReactEvil</h4>
            <a
              href="https://react-evil-three.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className={styles.projectActionLink}
              aria-label="Ouvrir le projet ReactEvil dans un nouvel onglet"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <p className={styles.projectDescription}>Projet collaboratif et aventure interactive immersive.</p>
          <a
            href="https://react-evil-three.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={styles.imageWrapper}
          >
            <img src={ReactEvil} alt="Aperçu ReactEvil" className={styles.projectImage} loading="lazy" />
          </a>
        </div>

        {/* PROJET 2 : Mon Organisateur React */}
        <div className={styles.bentoCard}>
          <div className={styles.projectHeader}>
            <h4>Mon Organisateur</h4>
            <a
              href="https://react-organizer.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className={styles.projectActionLink}
              aria-label="Ouvrir le projet Mon Organisateur React dans un nouvel onglet"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <p className={styles.projectDescription}>Gestionnaire de tâches quotidien optimisé avec Post-its.</p>
          <a
            href="https://react-organizer.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={styles.imageWrapper}
          >
            <img src={ReactOrganizer} alt="Aperçu Organisateur React" className={styles.projectImage} loading="lazy" />
          </a>
        </div>

        {/* PROJET 3 : Sound Wall (Navigation interne) */}
        <div className={styles.bentoCard}>
          <div className={styles.projectHeader}>
            <h4>Sound Wall</h4>
            <button
              type="button"
              className={styles.projectActionButton}
              onClick={() => onNavigate("soundwall")}
              aria-label="Aller à la section SoundWall"
            >
              <Play size={16} fill="currentColor" />
            </button>
          </div>
          <p className={styles.projectDescription}>Expérience et mur sonore interactif.</p>
          <button
            type="button"
            className={styles.imageButtonWrapper}
            onClick={() => onNavigate("soundwall")}
          >
            <img src={SoundWall} alt="Aperçu SoundWall" className={styles.projectImage} loading="lazy" />
          </button>
        </div>

        {/* PROJET 4 : Le Petit Cahier */}
        <div className={styles.bentoCard}>
          <div className={styles.projectHeader}>
            <h4>Le Petit Cahier</h4>
            <a
              href="https://ptit-cahier.fr"
              target="_blank"
              rel="noreferrer"
              className={styles.projectActionLink}
              aria-label="Ouvrir le projet Le Petit Cahier dans un nouvel onglet"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <p className={styles.projectDescription}>Plateforme web sur-mesure et vitrine interactive.</p>
          <a
            href="https://ptit-cahier.fr"
            target="_blank"
            rel="noreferrer"
            className={styles.imageWrapper}
          >
            <img src={PetitCahier} alt="Aperçu Le Petit Cahier" className={styles.projectImage} loading="lazy" />
          </a>
        </div>

      </div>
      <ScrollArrow target="contact" onNavigate={onNavigate} />
    </section>
  );
};

export default ProjectsSection;